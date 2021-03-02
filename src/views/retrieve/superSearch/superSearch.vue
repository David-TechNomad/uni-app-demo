<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>档案检索结果</span>
        </div>
        <div class="searchKey boxshow">           
              <el-form :inline="true" :model="keywordList" ref="ruleForm">
                <el-form-item prop="keyword">
                    <el-input placeholder="请输入关键字" size="small" v-model="keywordList.keyword" ref="keywordInput"></el-input>
                </el-form-item>
                <el-form-item prop="scope">
                    <el-select  v-if="!fromAssistHandle"  clearable placeholder="请选择" size="small" v-model="keywordList.scope">
                        <el-option :label="item.displayText" :value="item.code" v-for="item in selecData" :disabled="userType=='Public' && item.displayText!='本馆公开'"></el-option>                       
                    </el-select>
                    <!-- 如果从协查办理过来，只能显示本馆受控，不可选 -->
                    <el-select  v-if="fromAssistHandle"   clearable size="small" v-model="keywordList.scope">
                        <el-option :label="item.displayText" :value="item.code" v-for="item in selecData" :disabled="item.displayText!='本馆受控'"></el-option>                       
                    </el-select>
                </el-form-item>
                <el-form-item prop="searchType">
                    <el-radio-group  size="small"  class="radioTab" v-model="keywordList.searchType">
                        <el-radio label="archive" border>只检索文件</el-radio>
                        <el-radio label="files" border>只检索案卷</el-radio>
                        <el-radio label="all" border>检索文件及案卷</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button class="defaultBtn" @click="type=0;gettree();page=1;page2=1">检索</el-button>
                      <el-button class="defaultBtn" @click="superSearchShow">高级检索</el-button>
                       <!-- <el-button class="defaultBtn" @click ="tosearch">全文检索</el-button> -->
                </el-form-item> 
                <el-form-item style="float:right;">
                     <el-button  class="defaultBtn" @click="goBack"> 返回</el-button>
                </el-form-item> 
             </el-form>
        </div>
         <div class="treeOne tree ">
            <div class="treeTitle boxshow textBlue">              
                 档案目录              
            </div>           
            <div class="treeCon boxshow "> 
                <el-tree class="filter-tree" 
                        :data="treedata"                                                 
                        node-key="kindId"        
                        :empty-text="publicAssistBtnVisible? '':'暂无数据'"                   
                            @node-click="handleNodeClick" 
                        ref="tree"  v-loading="treeloading"  >
                        <span slot-scope="{ node ,data}">
                            <span>{{ data.kindName }}</span>
                            <span style="color:red" v-if="!isFiles && !isAll">({{data.archiveCount}}件)</span>
                            <span style="color:red" v-if="isFiles && !isAll">({{data.filesCount}}卷)</span>
                            <span style="color:red" v-if="isAll && data.anjuanLibId">({{data.archiveCount}}件/{{data.filesCount}}卷)</span>
                            <span style="color:red" v-if="isAll && !data.anjuanLibId">({{data.archiveCount}}件)</span>
                        </span>
                </el-tree>  
                <!-- publicAssistBtnVisible? '':( libId && Object.keys(libId).length>0?'暂无数据':'请选择案卷库') -->
                <div v-if="publicAssistBtnVisible">
                    <span style="line-height: 30px;">如果需要协助查找本馆受控档案，请点击下方协助查阅按钮</span>
                    <div style="text-align: center;">
                        <el-button class="defaultBtn" @click ="showApplyAssist">协助查阅</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentbox boxshow">
            <div class="searchCon"> 
                     <div class="TabRBtn" style="z-index:100">
                        <!-- <el-button v-if="cancelAssistHandle" class="defaultBtn" @click="cancelSubmit"> 驳回协查办理</el-button> -->
                        <el-button v-if="fromAssistHandle" class="defaultBtn" @click="addAssist"><i class="fa fa-plus-square" aria-hidden="true"></i> 添加/查看借阅单</el-button>
                        <el-button v-if="!fromAssistHandle" class="defaultBtn" @click="addjy"><i class="fa fa-plus-square" aria-hidden="true"></i> 添加/查看借阅单</el-button>
                     </div>
                      <el-tabs v-model="activeName" type="card" class="erpTab">
                            <el-tab-pane label="文件列表" name="archive"  v-if="!isFiles || isAll">  
                                   <el-table
                                        :data="tableData"
                                        border
                                        @selection-change="selectArchive"
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader"
                                        :empty-text="libId && Object.keys(libId).length>0?'暂无数据':'请选择案卷库'"
                                        v-loading="loading"  
                                        stripe 
                                        class="defaultTable">
                                           <el-table-column type="selection"  width="55" v-if="tableTitle.length>0">
                                           </el-table-column>
                                            <el-table-column  prop="name" label="操作"  width="80" v-if="tableTitle.length>0">
                                                    <template slot-scope="scope">                                                 
                                                        <i class="fa fa-file-text tableIcon" @click="showDialog(scope.row)"></i> 
                                                    </template>
                                             </el-table-column>
                                           <el-table-column :prop="title.fieldName" :label="title.caption" :width="title.width" v-for="title,index in tableTitle" :key="index" v-if="!(title.hidden)&& title.fieldName!='PUBLISH_STATUS'">
                                                <template slot-scope="scope">                                                 
                                                      <span v-if="title.fieldName=='ATTACHED_FILE_FLAG'"> <i class="fa fa-paperclip tableIcon" v-if="scope.row.ATTACHED_FILE_FLAG && ((scope.row.ATTACHED_FILE_FLAG).replace('<em>','')).replace('</em>','') === 'true' && scope.row.ATTACHED_FILE_COUNT && ((scope.row.ATTACHED_FILE_COUNT).replace('<em>','')).replace('</em>','')>0"></i> </span> 
                                                      <span v-else v-html="scope.row[title.fieldName]"></span>                         
                                                  </template>
                                            </el-table-column>                                     
                                    </el-table>  
                                    <div class="clear mt10" v-if="keywordList.scope!='3' && total "> 
                                        <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                                    </div>                                                       
                            </el-tab-pane>
                            <el-tab-pane label="案卷列表" name="files" v-if="isAll && libId.anjuanLibId ? true : isFiles">  
                                 <el-table
                                        :data="tableData2"
                                        border
                                        @selection-change="selectFiles"
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader"
                                        :empty-text="libId && Object.keys(libId).length>0?'暂无数据':'请选择案卷库'"
                                        v-loading="loading"  
                                        stripe 
                                        class="defaultTable">
                                           <el-table-column type="selection"  width="55" v-if="tableTitle2.length>0">
                                           </el-table-column>
                                             <el-table-column  prop="name" label="操作"  width="80" v-if="tableTitle2.length>0">
                                                    <template slot-scope="scope">                                                 
                                                        <i class="fa fa-file-text tableIcon" @click="showDialog(scope.row)"></i> 
                                                    </template>
                                             </el-table-column>  
                                           <el-table-column :prop="title.fieldName" :label="title.caption" :width="title.width" v-for="title,index in tableTitle2" :key="index" v-if="!(title.hidden)&& title.fieldName!='PUBLISH_STATUS'">
                                                <template slot-scope="scope">                                                 
                                                      <span v-if="title.fieldName=='ATTACHED_FILE_FLAG'"> <i class="fa fa-paperclip tableIcon" v-if="scope.row.ATTACHED_FILE_COUNT>0"></i> </span> 
                                                      <span v-else v-html="scope.row[title.fieldName]"></span>                         
                                                  </template>
                                            </el-table-column>                                     
                                    </el-table>  
                                    <div class="clear mt10" v-if="keywordList.scope!='3' && total2"> 
                                        <pageToolbar :total="total2" :page="page2"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                                    </div>          
                            </el-tab-pane>                           
                       </el-tabs>                    
                </div>
        </div> 
        <superSearch ref="superSearch" @superSearch="superSearchF"></superSearch> 
        <pAssistDig ref="pAssistDigRef" @applyAssist="applyAssist"> </pAssistDig>
          <el-dialog
            title="目录信息"
            :visible.sync="isshowDialog"
            top="3%"
            class="myDialogCenter" :append-to-body='true'>        
              <table  border="1" class="el-table defaultTable el-table--border" >                    
                    <tbody class="el-table__body">
                        <tr class="el-table__row" v-for="item in detailsData">
                            <td class="gtd" width="180"><div class="cell text-left" v-if="!item.hidden">{{item.caption}}</div> </td> 
                            <td v-if="formAddfile && item.dictData !== null && !item.hidden"><div class="cell text-left">{{formAddfile[item.fieldName + '_Text']}}</div> </td> 
                            <td v-else-if="formAddfile && item.dictData === null && !item.hidden"><div class="cell text-left">{{formAddfile[item.fieldName]}}</div> </td>
                            <td v-else><div class="cell text-left"></div> </td>
                        </tr>
                    </tbody>
                </table>  
                <span slot="footer" class="dialog-footer">
                    <el-button class="defaultBtn" @click="isshowDialog= false;">关闭</el-button>
                </span>          
          </el-dialog> 
       </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './superSearch.service';
    import { State, Getter, Mutation, } from 'vuex-class';                             
    import superSearch from '@/components/superSearch/superSearch.vue'; 
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue';
    import pAssistDig from '@/views/myBorrow/borrowApply/pUserAssistApplyDialog.vue';
    import { Loading } from 'element-ui';
   @Component({
        components: { 
            superSearch,
            pageToolbar,
            pAssistDig
        },
    })
    export default class appSuperSearch extends Vue{            
        bodyHeight: number= document.documentElement.clientHeight - 340 ; 
        conditionList:any=[]       
        treedata: any = [];
        activeName:string = 'archive';           
        selecData: any =[];
        loadingInstance:any={};
        formAddfile:any={};
        detailsData:any=[];
        type:number = 0;
        libId:any={};
        kindId:number;        
        keywordList:any={
          "keyword":"",
          "searchType":"archive",
          "scope":"0"
        };
        tableTitle: any =[];   
        tableData: any =[];  
        loading:Boolean = false;
        treeloading:Boolean = false;
        total: number = 0;
         page: number = 1;
        pageSize: number = 25;
        tableTitle2: any =[];   
        tableData2: any =[];  
        loading2:Boolean = false;
        total2: number = 0;
         page2: number = 1;
        pageSize2: number = 25;  
        isFiles:Boolean = false;
        isAll:Boolean = false
        filesSelection: any = [];
        archiveSelection: any = [];
        userType:String = window.sessionStorage.getItem('userType');	
        publicAssistBtnVisible = false;
        fromAssistHandle: boolean = false;//是否来自协查办理
        from_helpBorrowApply: boolean = false;//是否来自受理登记
        cancelAssistHandle: boolean = false;//驳回协查办理按钮显隐
        isshowDialog:boolean=false;
        constructor(){
            super();
            this.loadingInstance = null;
            this.formAddfile={};
            this.detailsData = [];
            this.isshowDialog = false;
        };
        showDialog(row){   
        //    this.detailsData=row; 
           //目录信息左侧配置
            this.getEditField(row);          
           this.isshowDialog=true;
        };
        goBack(){
            this['$router'].go(-1);
            // this['$router'].push({
            //     path:'/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail',
            // });
        };
       
        superSearchShow(){
           this.$nextTick(() => {
             this.$refs.superSearch.superSearchVisible=true;
             this.$refs.superSearch.getCriteria(this.keywordList.searchType);
             this.$refs.superSearch.resetForm('ruleForm'); 
           })          
        }
         handleCurrentChange(val:number) {
            if(this.activeName=='archive'){
                this.page = val; 
            }else if(this.activeName=='files'){                      
                this.page2 = val; 
            } 
            this.search(this.activeName);                   
        };
         //目录信息右侧数据
        getEditFieldValueFn(obj) {
            let self = this;
            Service.getEditFieldValue({"archiveAgentCode": obj.archiveAgentCode,"libId": parseInt(obj.libId),"id":parseInt(obj.id)}).then(res=>{
                if(res.data.succeeded){
                    self.formAddfile = res.data.data; 
                    console.log(self.formAddfile);
                }else{
                    self.getError(res.data.errorMessage)
                }
                self.$nextTick(() => { this.loadingInstance.close();});
            })
        }
         //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
         //目录信息左侧配置
        getEditField(obj) {
            var self = this;
            self.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在加载，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'hsla(0,0%,100%,.9)'
                        }
                    );
            Service.getEditField({"phase":2,"libId":parseInt(obj.libId)}).then(res=>{
                if(res.data.succeeded){
                    self.detailsData=res.data.data;
                    console.log(self.detailsData);
                    self.getEditFieldValueFn(obj);
                }else{
                    self.getError(res.data.errorMessage)
                }
                // self.$nextTick(() => { self.loadingInstance.close();});
            })   
        }
        handleSizeChange(val:number) {
            if(this.activeName=='archive'){
                this.pageSize = val; 
            }else if(this.activeName=='files'){                      
               this.pageSize2 = val; 
            }  
            this.search(this.activeName);               
        }; 
      getDispField(active,id){          
          let params;         
            params={"phase":2,"libId":id};
            this.loading = true;
            this.tableTitle=[] 
            this.tableTitle2=[]        
            Service.getDispField(params).then(res=>{               
                  if(res.data && res.data.succeeded){                     
                    if(active=='archive'){
                        this.tableTitle =  res.data.data;
                        this.search('archive')
                    }else if(active=='files'){                      
                        this.tableTitle2 =  res.data.data;
                        this.search('files')
                    }                    
                    
                  }else{
                    this['$message']({
                      message: '查询列表表头库失败！',
                      type: 'error'
                    })
                  }
                 
            });
            
               
        };
        //获取检索列表  
        search(active){
          this.loading = true;            
          let parme
          if(active=='archive'){
                   parme ={
                    "keywordList":[this.keywordList.keyword],
                    "searchType":active,
                    "scope":this.keywordList.scope,
                    "kindId":this.kindId,
                    "page":this.page-1,
                    "pageSize":this.pageSize,
                    "conditionList":[]
                  }
          }else if(active=='files'){                      
               parme ={
                "keywordList":[this.keywordList.keyword],
                "searchType":active,
                "scope":this.keywordList.scope,
                "kindId":this.kindId,
                "page":this.page2-1,
                "pageSize":this.pageSize2,
                 "conditionList":[]
              }
          }else if(active=='all'){                      
               parme ={
                "keywordList":[this.keywordList.keyword],
                "searchType":active,
                "scope":this.keywordList.scope,
                "kindId":this.kindId,
                "page":0,
                "pageSize":25,
                 "conditionList":[]
              }
          } ;
        if(this.type===1){  
            let criteriaOptions=[],addCriterias=[]            
            addCriterias = this.$refs.superSearch.ruleForm.addCriterias;
            for(let val in addCriterias){   
                if(addCriterias[val].checked){           
                        let  addC= this.$refs.superSearch.criteriaOptions.filter(function (item) {
                                return item.fieldName === addCriterias[val].fieldName;
                        }); 
                        let fieldName,operatorCode,value,type,dictId
                            fieldName=addC[0].fieldName;              
                            operatorCode = addCriterias[val].code;
                            value=addCriterias[val].value;              
                        if(addCriterias.fieldName!=""){
                                type=addC[0].type;              
                                dictId= addC[0].dictId;                 
                        }else{
                                type =""
                                dictId =""
                        } 
                        criteriaOptions.push({                                   
                            "fieldName":fieldName,              
                            "operatorCode":operatorCode,
                            "value":value,
                            "type":type,        
                            "dictId":dictId,
                        }) 
                }
            }  
            parme.conditionList = criteriaOptions
        } 
        this.tableData2 =[];
        this.tableData=[];
        this.total=0;
        this.total2=0;
            if(this.type===1){
                Service.getsuperSearchUrl(parme).then((res) =>{
                    if (res.data.succeeded) { 
                        if(active=='archive'){
                            this.tableData= res.data.data.archive.data
                            this.total = res.data.data.archive.totalRecords
                        }else if(active=='files'){                      
                            this.tableData2= res.data.data.files.data
                            this.total2 = res.data.data.files.totalRecords
                        }else if(active=='all'){ 
                            this.tableData= res.data.data.archive.data
                            this.total = res.data.data.archive.totalRecords                     
                            this.tableData2= res.data.data.files.data
                            this.total2 = res.data.data.files.totalRecords
                        }                  
                    }else{
                        this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                    }
                   this.loading = false;
                })
            }else{
                  Service.getSearchUrl(parme).then((res) =>{
                    if (res.data.succeeded) { 
                        if(active=='archive'){
                            this.tableData= res.data.data.archive.data
                            this.total = res.data.data.archive.totalRecords
                        }else if(active=='files'){                      
                            this.tableData2= res.data.data.files.data
                            this.total2 = res.data.data.files.totalRecords
                        }else if(active=='all'){ 
                            this.tableData= res.data.data.archive.data
                            this.total = res.data.data.archive.totalRecords                     
                            this.tableData2= res.data.data.files.data
                            this.total2 = res.data.data.files.totalRecords
                        }                  
                    }else{
                        this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                    }
                     this.loading = false;
                })
            }

        };
        getSelect(){          
            Service.getDictlistsurl(442).then((res) =>{
                if (res.data.succeeded) {                               
                     this.selecData= res.data.data
                }else{
                    this['$message']({
                        message: '获取范围失败',
                        type: 'error'
                    });
                  }
            })
        }; 
         gettree(){  
             this.archiveSelection = [];
             this.filesSelection = [];
                let criteriaOptions=[],checkedType=[],addCriterias=[],keyword=[]
                if(this.type===1){
                    checkedType = this.$refs.superSearch.ruleForm.checkedType,
                    addCriterias = this.$refs.superSearch.ruleForm.addCriterias;
                    for(let val in addCriterias){ 
                         if(addCriterias[val].checked){
                                let  addC= this.$refs.superSearch.criteriaOptions.filter(function (item) {
                                    return item.fieldName === addCriterias[val].fieldName;;
                                }); 
                                let fieldName,operatorCode,value,type,dictId
                                 fieldName=addC[0].fieldName;              
                                 operatorCode = addCriterias[val].code;
                                 value=addCriterias[val].value;              
                                if(addCriterias.fieldName!=""){
                                     type=addC[0].type;              
                                     dictId= addC[0].dictId;                 
                                }else{
                                     type =""
                                     dictId =""
                                } 
                                criteriaOptions.push({                                   
                                    "fieldName":fieldName,             
                                    "operatorCode":operatorCode,
                                    "value":value,
                                    "type":type,            
                                    "dictId":dictId,
                                })
                        }             
                        
                    }  
                } else{
                        if(this.keywordList.keyword!="" && this.type!=1){
                                keyword=[this.keywordList.keyword];
                                this.treeloading=true   
                        }else{
                                this['$message']({
                                    type: 'warning',
                                    message: '请输入关键字'
                                });
                                  this.$nextTick(() => {
                                        this.$refs.keywordInput.focus();
                                    })
                                return false;
                        }
                }           
          
              
               let params = {
                    "keywordList":keyword,
                    "searchType":this.keywordList.searchType,
                    "scope":this.keywordList.scope,
                    "kindIdList":checkedType,
                    "type":this.type,
                    "conditionList": criteriaOptions
                }
            Service.gettree(params).then((res) =>{
                if (res.data.succeeded) {                   
                     this.treedata= res.data.data;
                      this.treeloading=false;
                      
                      //设置协助查阅按钮的显隐
                      this.$nextTick(()=>{
                        if(window.sessionStorage.userType=="Public" && res.data.data.length==0){
                            this.publicAssistBtnVisible = true;
                        }else{
                            this.publicAssistBtnVisible = false;
                        }
                        if(this.fromAssistHandle && res.data.data.length==0){//如果来自协查办理界面，同时按照关键字未查出数据，显示驳回按钮
                            this.cancelAssistHandle = true;
                        }else{
                            this.cancelAssistHandle = false;
                        }
                      });
                }else{
                    this['$message']({
                        message: '获取目录列表失败',
                        type: 'error'
                    });
                  }
               if(this.keywordList.searchType=='all'){               
                       this.isAll = true;
                       this.activeName='archive'
                }else if(this.keywordList.searchType == 'files'){
                     this.isFiles = true;
                     this.isAll = false 
                     this.activeName='files'      
                }else if(this.keywordList.searchType=='archive'){
                     this.isFiles = false;
                     this.isAll = false;
                     this.activeName='archive'   
                }
                 this.libId={};
                 this.tableTitle=[];
                 this.tableTitle2=[];
                 this.tableData=[];
                 this.tableData2=[]
            })
        }; 
        handleNodeClick(data){
            this.archiveSelection = [];
            this.filesSelection = [];
             if (data && Object.keys(data).length>0) {
                    this.libId=data
                    this.kindId = data.kindId 
                    }    
            if(!(this.keywordList.scope=='3')){                       
                    if(this.keywordList.searchType == 'files'){
                    this.getDispField('files',this.libId.anjuanLibId)
                    }else if(this.keywordList.searchType=='archive'){
                    this.getDispField('archive',this.libId.wenjianLibId)
                    }else if(this.keywordList.searchType=='all'){  
                        if(this.libId.anjuanLibId) {
                              this.getDispField('files',this.libId.anjuanLibId) 
                        }else{
                            this.activeName='archive'
                        } 
                        this.getDispField('archive',this.libId.wenjianLibId)
                      
                    }
            }else{
                  this.tableTitle = [{                      
                        caption: "档案馆名称"                        
                        fieldName: "archiveAgentName"                       
                  },{
                        caption: "数量"                        
                        fieldName: "count"  
                  }];
                  this.tableTitle2 = [{                      
                        caption: "档案馆名称"                        
                        fieldName: "archiveAgentName"                       
                  },{
                        caption: "数量"                        
                        fieldName: "count"  
                  }];
                  if(this.keywordList.searchType == 'files'){
                           this.search('files')
                    }else if(this.keywordList.searchType=='archive'){
                           this.search('archive')                   
                    }else if(this.keywordList.searchType=='all'){                       
                        if(this.libId.anjuanLibId) {
                           this.search('files')                               
                        }else{
                            this.activeName='archive'
                        }  
                        this.search('archive')                     
                    }                  
                  
            }
             
        }; 
        superSearchF(){
            this.page=1;   
            this.pageSize=25; 
            this.type=1;          
            this.gettree();  
        }
        tosearch():void{           
            this['$router'].push({
                path:'/retrieve/search',
                name:'关键字检索',
                params:{ searchkeyword: this.keywordList}
            });
        }; 
        selectArchive(val){//文件
            this.archiveSelection = val;
        };
        selectFiles(val){
            this.filesSelection = val;
        }
        //驳回协查办理
        cancelSubmit(){
            let passedObj = JSON.parse(window.sessionStorage.getItem("helpSearchAndApplyDetail_passedObj"));; 
            let params = {
                appNo: passedObj.applicationNo
            };
            Service.rejectAsistSelectByAppno(params).then(res => {
                if(res.data.succeeded){
                    window.sessionStorage.removeItem("myHelpSearchAndApply_activeName");
                    window.sessionStorage.removeItem("helpSearchAndApplyDetail_passedObj");
                    window.sessionStorage.removeItem("helpSearchAndApplyDetail_returnPath");
                }else{
                    this['$message']({
                        message: '驳回失败',
                        type: 'error'
                    });
                }
            });

        };
        // 协查办理，添加到借阅
        addAssist(){
            let _this = this;
            let kindName = this.libId.kindName;
            if(this.activeName == "archive"){//文件级
                    for(let archive of this.archiveSelection){
                        archive.keyWord = this.keywordList.keyword;
                    }  
                    window.sessionStorage.setItem("fromSp_comFiles", JSON.stringify(this.archiveSelection));
                    this['$router'].push({
                        path:'/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail',
                    });
            } else if(this.activeName == "files"){//案卷级 6
                let params = [];
                for(let sel of this.filesSelection){
                    let pa = {
                        "archiveAgentCode": sel.archiveAgentCode,
                        "libId": sel.libId,
                        "fileId": sel.id
                    }
                    params.push(pa)
                }
                // params = [{"archiveAgentCode":"436001","libId":30,"fileId":1615815},{"archiveAgentCode":"436001","libId":30,"fileId":1608576}];
                Service.getArchiveFilesByJuan(params).then(res=>{
                    if (res.data.succeeded) {   
                        let filesOfJuan = res.data.data;   
                        for(let file of filesOfJuan){
                            file.kindName = kindName;
                            file.archiveAgentName = file.ARCHIVAL_CODE;
                            file.keyWord = this.keywordList.keyword;
                        }    
                        window.sessionStorage.setItem("fromSp_comFiles", JSON.stringify(filesOfJuan));                  
                        this['$router'].push({
                            path:'/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail',
                        });
                    }else{
                        this['$message']({
                            message: '获取档案失败',
                            type: 'error'
                        });
                    }
                });
            }
        }
        // 添加到借阅
        addjy(){    
            let _this = this;
            let kindName = this.libId.kindName;
            if(this.keywordList.scope == "3"){//外馆受控 加入协查数据；其他是待借阅数据
                let selection = [];
                if(this.activeName == "archive"){
                    for(let archive of this.archiveSelection){
                        archive.keyWord = this.keywordList.keyword;
                    }
                    selection = this.archiveSelection;
                }else{
                    for(let sel of this.filesSelection){
                         sel.keyWord = this.keywordList.keyword;
                    }
                    selection = this.filesSelection;
                }
                
                if(this.from_helpBorrowApply){//受理登记
                    window.sessionStorage.setItem("fromSp_assistFiles", JSON.stringify(selection));
                    this['$router'].push({
                        path:'/myBorrow/helpBorrow/helpBorrowApply',
                    }); 
                }else{//查阅申请
                    window.sessionStorage.setItem("fromSp_assistFiles", JSON.stringify(selection));
                    this['$router'].push({
                        path:'/myBorrow/borrowApply/borrowApply',
                        name:'查阅单填写',
                        params:{ word: ''}
                    }); 
                }
            }else{//如果没有选择档案信息，也可以跳到借阅单申请界面，因为没有【返回】
                if(this.activeName == "archive"){//文件级
                    for(let archive of this.archiveSelection){
                        archive.keyWord = this.keywordList.keyword
                    }  
                    
                    if(this.from_helpBorrowApply){//受理登记
                        window.sessionStorage.setItem("fromSp_comFiles", JSON.stringify(this.archiveSelection));
                        this['$router'].push({
                            path:'/myBorrow/helpBorrow/helpBorrowApply',
                        }); 
                    }else{//查阅申请
                        window.sessionStorage.setItem("fromSp_comFiles", JSON.stringify(this.archiveSelection));
                        this['$router'].push({
                            path:'/myBorrow/borrowApply/borrowApply',
                            name:'查阅单填写',
                            params:{ word: ''}
                        });
                    }
                } else if(this.activeName == "files"){//案卷级 6
                    let params = [];
                    for(let sel of this.filesSelection){
                        let pa = {
                            "archiveAgentCode": sel.archiveAgentCode,
                            "libId": sel.libId,
                            "fileId": sel.id
                        }
                        params.push(pa)
                    }
                    // params = [{"archiveAgentCode":"436001","libId":30,"fileId":1615815},{"archiveAgentCode":"436001","libId":30,"fileId":1608576}];
                    Service.getArchiveFilesByJuan(params).then(res=>{
                        if (res.data.succeeded) {   
                            let filesOfJuan = res.data.data;   
                            for(let file of filesOfJuan){
                                file.kindName = kindName;
                                file.archiveAgentName = file.archiveAgentName;
                                file.keyWord = this.keywordList.keyword
                            }    
                            
                            if(this.from_helpBorrowApply){//受理登记
                                window.sessionStorage.setItem("fromSp_comFiles", JSON.stringify(filesOfJuan));
                                this['$router'].push({
                                    path:'/myBorrow/helpBorrow/helpBorrowApply',
                                }); 
                            }else{//查阅申请
                                window.sessionStorage.setItem("fromSp_comFiles", JSON.stringify(filesOfJuan));                  
                                this['$router'].push({
                                    path:'/myBorrow/borrowApply/borrowApply',
                                    name:'查阅单填写',
                                    params:{ word: ''}
                                });
                            }
                        }else{
                            this['$message']({
                                message: '获取档案失败',
                                type: 'error'
                            });
                        }
                    });
                }
            }
        }; 
        showApplyAssist(){
            // 弹框需要用户填写查阅目的和查阅结束日期
            this.$refs.pAssistDigRef.dialogVisible = true;
        };
        //协助查阅
        applyAssist(formData){
            let loadingInstance = Loading.service({
                lock: true,
                text: '正在获取数据，请稍等',
                background: 'rgba(0, 0, 0, 0.7)'
            });

            let params = {
               "applyUserId": window.sessionStorage.userId,
               "applyUserNo": "",
               "applyUserName": window.sessionStorage.username,
               "applyUserType": window.sessionStorage.userType=="System"? 1: 0,
               "type": window.sessionStorage.userType=="System"? 1: 0, //0代表公众用户提交，1代表馆内用户提交
               "applyType": formData.appType, 
               "endDate": formData.date,
               "publicUserKeyWord": this.keywordList.keyword,//公众用户
            }
            Service.applyAsistSelect(params).then(res => {
                loadingInstance.close();
                this.$refs.pAssistDigRef.dialogVisible = false;
                if(res.data.succeeded){
                    this['$message']({
                        message: '申请成功',
                        type: 'success'
                    });
                    //询问是否跳转；
                    //成功后跳到我的协查单列表
                    this['$confirm']('是否跳转到我的协查单列表？', '提示', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {
                        window.sessionStorage.setItem("borrow_activeName", "2");
                        this['$router'].push({
                            path:'/myBorrow/borrow',
                        });
                    }).catch(() => {
                        //清空树和数据
                        this.publicAssistBtnVisible = false;
                        this.treedata  = [];
                        this.tableData = [];
                        this.tableData2 = []; 
                    });
                }else{
                    this['$message']({
                        message: '申请失败',
                        type: 'error'
                    });
                }
            });
        } 
        created(){   
            this.getSelect(); 
            this.from_helpBorrowApply = window.sessionStorage.getItem("from_helpBorrowApply")=="1"?true: false; 
            if(this.$route.params.assistId){//如果协查办理Id有值
                this.fromAssistHandle = true;
                this.keywordList.scope = "1";
            }else{
                this.fromAssistHandle = false;
            }           
            if(this.$route.params.word && this.$route.params.word!=''){
                this.keywordList.keyword=this.$route.params.word
                this.gettree();  
            }else{//清空树 和 结果
                this.treedata  = [];
                this.tableData = [];
                this.tableData2 = []; 
            }  
                      
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 340;
                })()
            }; 
        };

        activated(){
            if(!(this.$route.params.name && this.$route.params.name=='keep')){
                this.getSelect();          
                this.$refs.ruleForm.resetFields();  
                if(this.$route.params.assistId){//如果协查办理Id有值
                    this.fromAssistHandle = true;
                    this.keywordList.scope = "1";
                }else{
                    this.fromAssistHandle = false;
                }                
                if(this.$route.params.word && this.$route.params.word!=''){  
                    this.keywordList.keyword=this.$route.params.word
                    this.gettree();  
                }else{//清空树 和 结果：用于查阅申请 【取消】 
                    this.treedata  = [];
                    this.tableData = [];
                    this.tableData2 = []; 
                }
            }            
        };
    }
</script>

<style lang="scss" scoped>  
    @import '../../../styles/retrieve/superSearch';
    .radioTab .el-radio{
      margin-right: 0;
    }
</style>