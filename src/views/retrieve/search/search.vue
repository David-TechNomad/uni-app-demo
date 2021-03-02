<template>
  <section class="wrapprSection">
    <div class="mainTitle">
      <span>档案全文检索结果</span>
    </div>
    <div class="searchKey boxshow contentbox-full">
      <el-form :inline="true" v-model="keywordList">
        <el-form-item>
          <el-input
            placeholder="请输入关键字"
            size="small"
            v-model="keywordList.keyword"
            ref="keywordInput"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-select placeholder="请选择" size="small" v-model="keywordList.scope">
            <el-option
              :label="item.displayText"
              :value="item.code"
              v-for="item in selecData"
              :disabled="userType=='Public' && item.displayText!='本馆公开'"
            ></el-option>
          </el-select> -->
          <el-select  v-if="!fromAssistHandle"  placeholder="请选择" clearable size="small" v-model="keywordList.scope">
              <el-option :label="item.displayText" :value="item.code" v-for="item in selecData" :disabled="userType=='Public' && item.displayText!='本馆公开'"></el-option>                       
          </el-select>
          <!-- 如果从协查办理过来，只能显示本馆受控，不可选 -->
          <el-select  v-if="fromAssistHandle"   size="small" clearable v-model="keywordList.scope">
              <el-option :label="item.displayText" :value="item.code" v-for="item in selecData" :disabled="item.displayText!='本馆受控'"></el-option>                       
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="defaultBtn" @click="gettable">全文检索</el-button>
        </el-form-item>
        <el-form-item style="float:right;">
            <el-button  class="defaultBtn" @click="goBack"> 返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentbox boxshow">
      <div class="searchCon">
        <div class="clear">
          <!-- <el-button class="defaultBtn rt" @click="addjy">
            <i class="fa fa-plus-square" aria-hidden="true"></i> 添加/查看借阅单
          </el-button> -->
            <el-button v-if="fromAssistHandle" class="defaultBtn rt" @click="addAssist"><i class="fa fa-plus-square" aria-hidden="true"></i> 添加/查看借阅单</el-button>
            <el-button v-if="!fromAssistHandle" class="defaultBtn rt" @click="addjy"><i class="fa fa-plus-square" aria-hidden="true"></i> 添加/查看借阅单</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          @selection-change="selectArchive"
          :height="bodyHeight"
          element-loading-text="努力加载中..."
          header-row-class-name="tableHeader"
          stripe
          class="defaultTable"
        >
          <el-table-column type="selection" width="55"></el-table-column>
             <el-table-column  prop="name" label="操作"  width="80">
                  <template slot-scope="scope">                                                 
                      <i class="fa fa-file-text tableIcon" @click="showDialog(scope.row)"></i> 
                  </template>
            </el-table-column>  
          <el-table-column prop="name" label="档案详情" align="left">
            <template slot-scope="scope">
              <div class="tablePlan">
                <h4 class="title">{{scope.row.TITLE}}</h4>
                <div class="attr clear">
                  <span style="margin-right:8%">档号：{{scope.row.ARCHIVAL_CODE}}</span>
                  <span>{{scope.row.archiveAgentName}} |</span>
                  <span>{{scope.row.kindName}} |</span>
                  <span>{{scope.row.YEAR}}年度 |</span>
                  <span>{{scope.row.CONTROL_ID}}</span>
                </div>
                <p v-html="scope.row.fileContent"></p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="clear mt10">
          <pageToolbar
            :total="total"
            :page="page"
            @currentChange="handleCurrentChange"
            @sizeChange="handleSizeChange"
          ></pageToolbar>
        </div>
      </div>
    </div>
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
    import Service from './search.service';
    import { State, Getter, Mutation, } from 'vuex-class';  
    import { Loading } from 'element-ui';
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'
   @Component({
        components: {          
            pageToolbar
        },
    })
    export default class appSuperSearch extends Vue{       
        bodyHeight: number= document.documentElement.clientHeight - 340 ;        
        keywordList:any={
          "keyword":"",
          "searchType":"files",
          "scope":"0"
        };
        selecData:any=[];      
        tableData: any =[];
        loadingInstance:any={};
        total: number = 0;
        formAddfile:any={};
        page: number = 0;
        pageSize: number = 25; 
        userType:String = window.sessionStorage.getItem('userType'); 
        archiveSelection: any = [];
        detailsData:any=[];
        isshowDialog:boolean=false;
        fromAssistHandle: boolean = false;//是否来自协查办理
        from_helpBorrowApply: boolean = false;//是否来自受理登记
        constructor(){
            super();
            this.loadingInstance = null;
            this.formAddfile={};
            this.detailsData = [];
            this.isshowDialog = false;
        };
        selectArchive(val){//文件
            this.archiveSelection = val;
        };
        showDialog(row){   
          //  this.detailsData=row;
            //目录信息左侧配置
            this.getEditField(row);       
            this.isshowDialog=true;
        };
        getCellClass(data) {
            if (data.columnIndex == 0) return 'gtd';
        };
        handleCurrentChange(val:number) {
            this.page = val; 
            this.gettable();                   
        };
        handleSizeChange(val:number) {
            this.pageSize = val;  
            this.gettable();               
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
        gettable(){ 
           let keyword=[]
           if(this.keywordList.keyword !=""){
              keyword = [this.keywordList.keyword]
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
            let parms={
                "scope":this.keywordList.scope,
                "keywordList":keyword,
                "page":this.page,
                "pageSize":this.pageSize
              }
            Service.ContentQuery(parms).then((res) =>{
                if (res.data.succeeded) {                               
                     this.tableData = res.data.data;
                     this.total = res.data.totalRecords; 
                }else{
                    this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                    });
                  }
            })
        };
        goBack(){
            // this['$router'].push({
            //     path:'/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail',
            // });
            this['$router'].go(-1);
        };
        //加入协查
        addAssist(){
            let _this = this;
            for(let archive of this.archiveSelection){
                archive.keyWord = this.keywordList.keyword;
                archive.ATTACHED_FILE_FLAG = 'true';
            }  
            window.sessionStorage.setItem("fromQw_comFiles", JSON.stringify(this.archiveSelection));
            this['$router'].push({
                path:'/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail',
            });
        };
        //目录信息右侧数据
        getEditFieldValueFn(obj) {
            let self = this;
            Service.getEditFieldValue({"archiveAgentCode": obj.archiveAgentCode,"libId": obj.libId,"id":parseInt(obj.archiveId)}).then(res=>{
                if(res.data.succeeded){
                    self.formAddfile = res.data.data; 
                    console.log(self.formAddfile);
                }else{
                    self.getError(res.data.errorMessage)
                }
                self.$nextTick(() => { this.loadingInstance.close();});
            })
        }
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
            Service.getEditField({"phase":2,"libId":obj.libId}).then(res=>{
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
         //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
        addjy(){ 
            if(this.keywordList.scope == "3"){//外馆受控 加入协查数据；其他是待借阅数据
                for(let archive of this.archiveSelection){
                    archive.keyWord = this.keywordList.keyword
                }
                window.sessionStorage.setItem("fromQw_assistFiles", JSON.stringify(this.archiveSelection));
                if(this.from_helpBorrowApply){//受理登记
                    this['$router'].push({
                        path:'/myBorrow/helpBorrow/helpBorrowApply',
                    }); 
                }else{//查阅申请
                    this['$router'].push({
                        path:'/myBorrow/borrowApply/borrowApply',
                    }); 
                }
            }else{//如果没有选择档案信息，也可以跳到借阅单申请界面，因为没有【返回】
                for(let archive of this.archiveSelection){
                    archive.keyWord = this.keywordList.keyword
                    archive.ATTACHED_FILE_FLAG = 'true';
                }  
                window.sessionStorage.setItem("fromQw_comFiles", JSON.stringify(this.archiveSelection));
                if(this.from_helpBorrowApply){//受理登记
                    this['$router'].push({
                        path:'/myBorrow/helpBorrow/helpBorrowApply',
                    }); 
                }else{//查阅申请
                    this['$router'].push({
                        path:'/myBorrow/borrowApply/borrowApply',
                    });
                }
            }
        };
        created(){ 
            this.getSelect();
            this.from_helpBorrowApply = window.sessionStorage.getItem("from_helpBorrowApply")=="1"?true: false; 
            if(this.$route.params.assistId){//如果协查办理Id有值
                this.fromAssistHandle = true;
                this.keywordList.scope = "1";
            }else{
                this.fromAssistHandle = false;
            } 
            if(!(this.$route.params.name && this.$route.params.name=='keep')){
                if(this.$route.params.searchkeyword && this.$route.params.searchkeyword!=""){                                 
                    this.keywordList.keyword = this.$route.params.searchkeyword;
                    this.gettable() 
                }  
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
            this.from_helpBorrowApply = window.sessionStorage.getItem("from_helpBorrowApply")=="1"?true: false; 
            if(this.$route.params.assistId){//如果协查办理Id有值
                this.fromAssistHandle = true;
                this.keywordList.scope = "1";
            }else{
                this.fromAssistHandle = false;
            } 
            if(!(this.$route.params.name && this.$route.params.name=='keep')){
                if(this.$route.params.searchkeyword && this.$route.params.searchkeyword!=""){                                 
                    this.keywordList.keyword = this.$route.params.searchkeyword;
                    this.gettable() 
                }  
            }
                       
        };
    }
</script>

<style lang="scss" scoped>
@import "../../../styles/innerPublic.scss";
@import "../../../styles/retrieve/search";
</style>