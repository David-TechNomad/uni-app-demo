<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>档案检索结果</span>
        </div>
        <div class="searchKey boxshow">           
              <el-form :inline="true" :model="keywordList" ref="ruleForm">
                <el-form-item prop="keyword">
                    <el-input placeholder="请输入关键字" size="small" v-model="keywordList.keyword"></el-input>
                </el-form-item>
                <el-form-item prop="scope">
                    <!-- 需要根据权限设置，判断是否显示本馆公开， 本馆受控  -->
                    <el-select   size="small" v-model="keywordList.scope">
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
                </el-form-item>
                <el-form-item  style="float:right;">
                    <el-button class="defaultBtn" @click="toZlmlHome">返回</el-button>
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
                    empty-text="暂无数据"                   
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
            </div>
        </div>
        <div class="contentbox boxshow">
            <div class="searchCon"> 
                     <div class="TabRBtn" style="z-index:100">
                        <el-button  class="defaultBtn"  @click="exportExcel"> 导出</el-button>
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
                                           <el-table-column :prop="title.fieldName" :label="title.caption" :width="title.width" v-for="title,index in tableTitle" :key="index" v-if="!(title.hidden)">
                                                <template slot-scope="scope">                                                 
                                                      <span v-if="title.fieldName=='ATTACHED_FILE_FLAG'"> <i class="fa fa-paperclip tableIcon" v-if="scope.row.ATTACHED_FILE_COUNT>0"></i> </span> 
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
                                           <el-table-column :prop="title.fieldName" :label="title.caption" :width="title.width" v-for="title,index in tableTitle2" :key="index" v-if="!(title.hidden)">
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
       </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './zlmlSuperSearch.service';
    import { State, Getter, Mutation, } from 'vuex-class';                             
    import superSearch from '@/components/superSearch/superSearch.vue'; 
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue';
    import { Loading } from 'element-ui';
   @Component({
        components: { 
            superSearch,
            pageToolbar
        },
    })
    export default class appSuperSearch extends Vue{            
        bodyHeight: number= document.documentElement.clientHeight - 340 ; 
        conditionList:any=[]       
        treedata: any = [];
        activeName:string = 'archive';           
        selecData: any =[];
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

        constructor(){
            super();
        };
        superSearchShow(){
            if(this.selecData.length == 0){
                this['$message']({
                    message: '请先设置权限',
                    type: 'warning'
                });
                return;
            }
           this.$nextTick(() => {
             this.$refs.superSearch.superSearchVisible=true;
             this.$refs.superSearch.getCriteria(this.keywordList.searchType);
             this.$refs.superSearch.resetForm('ruleForm'); 
           })          
        }
        toZlmlHome(){
            this['$router'].push({
                path:'/zlmlCenter/zlmlHome',
            });
        }
         handleCurrentChange(val:number) {
            if(this.activeName=='archive'){
                this.page = val; 
            }else if(this.activeName=='files'){                      
                this.page2 = val; 
            } 
            this.search(this.activeName);                   
        };
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
            };
            getSelect(){          
                Service.getDictlistsurl(442).then((res) =>{
                    if (res.data.succeeded) {                               
                        this.selecData = [];//res.data.data;
                        let userId = window.sessionStorage.userId;
                        Service.findUserFondByUserId(userId).then(res1 => {
                            if(res.data.succeeded){
                                let controls = res1.data.data.controlType;//获得用户的权限，设置下拉菜单为 本馆公开，还是本馆受控
                                if(controls){
                                    for(let sel of res.data.data){
                                        let flag1 = controls.includes('0');//本馆公开
                                        let flag2 = controls.includes('1');//本馆受控
                                        if(sel.displayText == "本馆公开" && flag1){
                                            this.selecData.push(sel);
                                        }else if(sel.displayText == "本馆受控" && flag2){
                                            this.selecData.push(sel);
                                        }
                                    }
                                }else{
                                    this['$message']({
                                        message: '请先设置权限',
                                        type: 'warning'
                                    });
                                }
                            }
                        });
                    }else{
                        this['$message']({
                            message: '获取范围失败',
                            type: 'error'
                        });
                    }
                })
            }; 
            gettree(){  
                if(this.selecData.length == 0){
                    this['$message']({
                        message: '请先设置权限',
                        type: 'warning'
                    });
                    return;
                }
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
                                    "dictId":dictId
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
                    } 
                    this.search('archive')                     
                }                  
            }
        }; 
        // 高级检索窗口按钮提交
        superSearchF(){
            this.page=1;   
            this.pageSize=25; 
            this.type=1;          
            this.gettree();  
        }
        selectArchive(val){//文件
            this.archiveSelection = val;
        };
        selectFiles(val){
            this.filesSelection = val;
        }
        exportExcel(){//必须选择，才能导出
            if(this.activeName == "archive" ){
                if(this.archiveSelection.length==0){
                    this['$message']({
                        message: '请选择要导出的文件',
                        type: 'warning'
                    });
                }else{
                    this.exportFile(0);
                }
            }else if(this.activeName == "files"  ){
                if(this.filesSelection.length==0){
                    this['$message']({
                        message: '清选择要导出的案卷',
                        type: 'warning'
                    });
                }else{
                    this.exportFile(0);
                }
            }
            // this.$confirm(msg, '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => { 
            //     this.exportFile(1); 
            // })
        }
        giveArcIdsStr(){
            let idArr = [];
            if(this.activeName == "archive"){
                for(let ac of this.archiveSelection){
                    idArr.push(ac.id);
                }
            }
            if(this.activeName == "files"){
                for(let ac of this.filesSelection){
                    idArr.push(ac.id);
                }
            }
            return idArr.toString();
        }
        exportFile(exportType){ 
            //exportType 0:部分 , 1:全部         
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在导出，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            let parme;
            let arcIds = this.giveArcIdsStr();

            if(this.activeName=='archive'){
                parme ={
                    "libId":this.libId.wenjianLibId,
                    "keywordList":[this.keywordList.keyword],
                    "searchType": this.activeName,
                    "scope": this.keywordList.scope,
                    "kindId": this.kindId,
                    "conditionList":[],
                    "arcIds": exportType==1? "" : arcIds,
                    "libId":  this.libId.anjuanLibId
                }
                if(exportType==0){//部分
                    parme.arcIds = arcIds;
                }
            }else if(this.activeName=='files'){                      
                parme ={
                    "libId":this.libId.anjuanLibId,
                    "keywordList":[this.keywordList.keyword],
                    "searchType":this.activeName,
                    "scope":this.keywordList.scope,
                    "kindId":this.kindId,
                    "conditionList":[],
                    "arcIds": exportType==1? "" : arcIds,
                    "libId":  this.libId.wenjianLibId
                }
                if(exportType==0){//部分
                    parme.arcIds = arcIds; 
                }
            }
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
            Service.exportZlmlArchiveList(parme).then((res) =>{
                loadingInstance.close();
                debugger;
                let blob = new Blob([res], { type: 'application/vnd.ms-excel' });
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                let fileName = '';
                if(this.activeName=='archive'){
                    fileName = "文件列表";
                }else{
                    fileName = "案卷列表";
                }
                link.setAttribute('download', fileName+'.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })

            
            // if(this.activeName=="file"){
            //       lib = this.libId.filter(function (item) {return item.rank === 3;})                   
            // }else{
            //       lib = this.libId.filter(function (item) {return item.rank === 4;})
            // }
            //  if(this.activeName == 'Ingroupfile'){
            //        ajid = this.ajtm.id
            //   }else{
            //       ajid=null
            //   }
            //  let  params= {
            //         "excelType": "xls",
            //         "contentType": parseInt(type),
            //         "archiveAgentCode": this.archiveAgentCode,
            //         "libId": lib[0].id,
            //         "archiveIds": ids,
            //         "phase": 2,
            //         "parentId": ajid,
            //         "nodeName": lib[0].displayName,
            //         "sort": ""
            //     }
            // Service.arrcreateExportTask(params).then(res=>{
            //       if(res['type']=='application/json'){
            //                 this['$message']({
            //                     type: 'warning',
            //                     message: '所选文件无电子原文！'
            //                 });
            //                 retrun false;
            //        }  
            //       if(res.data.succeeded){                      
            //             let excelName = params['nodeName'];                        
            //             this.startexportAllFile(res.data.data.id)
            //        }else{
            //              this['$message']({
            //                     type: 'error',
            //                     message: res.data.errorMessage
            //                 });  
            //       }   
            //         this.$nextTick(() => {
            //             loadingInstance.close();
            //         })
            //  })
            
        } ;
        created(){   
            this.getSelect();   
            if(this.$route.params.word && this.$route.params.word!=''){
                this.keywordList.keyword=this.$route.params.word
                this.gettree();  
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
                if(this.$route.params.word && this.$route.params.word!=''){  
                    this.keywordList.keyword=this.$route.params.word
                    this.gettree();  
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