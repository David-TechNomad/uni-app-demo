<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>整理编目</span>
           <el-button class="defaultBtn rt mt10" @click="activeName='file';search();" v-if="activeName=='Ingroupfile'">返回</el-button>        
        </div>        
        <div class="treeOne tree ">
            <div class="treeTitle boxshow textBlue">              
                 档案库              
            </div>           
            <div class="treeCon boxshow icontree">
                    <el-tree class="filter-tree" 
                            :data="treedata"                                                 
                            node-key="id"
                             :props="defaultProps"                           
                             @node-click="handleNodeClick" 
                            ref="tree"
                            :load="gettreeNum"
                            lazy>
                            <span slot-scope="{node,data}" style="width: 100%;white-space: normal;">                             
                                <span>{{ node.label }}</span>
                                <span style="color:red" v-if="data.nodeType==2">[{{ data | filtertreeNum}}]</span>                       
                            </span>
					           </el-tree>
            </div>
        </div>
        <div class="contentbox"> 
                      <div class="TabRBtn mt10" v-if="activeName=='Ingroupfile'">
                          <b>案卷题名：{{ajtm.TITLE}}</b>
                      </div>    
                      <el-tabs v-model="activeName" type="card" class="erpTab" v-if="activeName=='Ingroupfile'"> 
                           <el-tab-pane label="卷内文件列表" name="Ingroupfile" >   
                                <div class="searchKey boxshow">           
                                        <el-form :inline="true" >                                   
                                            <el-form-item>
                                                <el-input placeholder="请输入关键字" size="small" v-model="searchKey3"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button class="defaultBtn" @click="page=1;search()">检索</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>                                 
                            </el-tab-pane>  
                      </el-tabs> 
                      <el-tabs v-model="activeName" type="card" class="erpTab" @tab-click="tabClick" v-else >                                                  
                            <el-tab-pane label="案卷级" name="file" v-if="isshowfile">  
                                <div class="searchKey boxshow">           
                                    <el-form :inline="true" >                                   
                                        <el-form-item>
                                            <el-input placeholder="请输入关键字" size="small" v-model="searchKey1"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button class="defaultBtn" @click="page=1;search()">检索</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>                                             
                            </el-tab-pane>
                            <el-tab-pane label="文件级" name="Ungroup">  
                                <div class="searchKey boxshow">           
                                        <el-form :inline="true" >                                   
                                            <el-form-item>
                                                <el-input placeholder="请输入关键字" size="small" v-model="searchKey2"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button class="defaultBtn" @click="page=1;search()">检索</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </div>                                 
                            </el-tab-pane> 
                       </el-tabs> 
                          
                          <div class="pd10 boxshow bgwhite">
                              <div class="text-right">
                                <el-button class="grenBtn" @click="Publish">发布档案</el-button>
                                <el-button class="blueBtn" v-if="activeName=='file'" @click="gotopage2('newly/newlywenjian','file')">新增</el-button>
                                <el-button class="blueBtn" v-else-if="activeName=='Ingroupfile'" @click="gotopage2('newly/newlywenjian','Ingroupfile')">新增</el-button>
                                <el-button class="blueBtn" v-else @click="gotopage2('newly/newlywenjian','documents')">新增</el-button>
                                <el-button class="redBtn" @click="BatchDelete">删除</el-button> 
                               <!-- <el-button class="defaultBtn" v-if="activeName=='file'" @click="gotopage('modelStamp')">模板打印</el-button>-->
                                <el-button class="defaultBtn" v-if="activeName!=='file'" @click="showBatchMount">批量挂接</el-button>  
                                <el-button class="defaultBtn" @click="showBatchEdit">批量修改</el-button>                                 
                                <el-button class="defaultBtn" v-if="activeName=='file'" @click="unmerge">拆卷</el-button> 
                                <el-button class="defaultBtn" v-if="activeName=='Ungroup'" @click="AutoAssemble">组卷</el-button>                         
                                <!--<el-button class="defaultBtn">AIP封装</el-button>  -->  
                                <!-- 只有档案管理员可以鉴定申请，需要做判断                                -->
                                <!-- <el-button class="defaultBtn" @click="gotopage('appraisal')">鉴定申请</el-button>  -->
                                <el-dropdown>
										<el-button class="defaultBtn">
											鉴定<i class="el-icon-arrow-down el-icon--right"></i>
										</el-button>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item @click.native="gotopage('appraisal')">鉴定申请</el-dropdown-item>
											<el-dropdown-item @click.native="joinAppraisal()">加入已有鉴定申请</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown> 
                                    <el-dropdown>
										<el-button class="defaultBtn">
											导出<i class="el-icon-arrow-down el-icon--right"></i>
										</el-button>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item @click.native="isExport">导出</el-dropdown-item>
											<el-dropdown-item @click.native="toExporttask">导出列表</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown> 
                              </div>
                              <arrangeTable  @handfileSelected="fileSelected" ref="arrangeTable" @handSfileSelected="handleSelection"></arrangeTable>                            
                              <div class="clear mt10"> 
                                <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                              </div>  
                         </div>                
        </div>  
        <addFilesDialog ref="addFilesDialogRef" ></addFilesDialog>
        <yijuanDialog ref="yijuanDialogRef"></yijuanDialog>
        <batchEditDialog ref="batchEditDialogRef"></batchEditDialog>
        <batchMountDialog ref="batchMountDialogRef" ></batchMountDialog>
        <el-dialog
            title="导出设置"
            :visible.sync="exportVisible"
            width="30%">          
           <el-checkbox label="导出原文" v-model="isExportFileB"></el-checkbox><br><br>
           <span v-if="this.activeName=='file'">
                导出类型:
                <el-radio-group v-model="exportType">
                    <el-radio label="1">案卷目录</el-radio>
                    <el-radio label="2">案卷目录及卷内</el-radio>
                </el-radio-group>
                </span>
            <span slot="footer" class="dialog-footer">                
                <el-button type="primary" @click="isExportFile(exportType,selection)">确 定</el-button>
                <el-button @click="exportVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--加入已有鉴定申请-->
		<yiyoujiandingDialog ref="yiyoujiandingDialogRef"></yiyoujiandingDialog>
     </section>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import { Loading } from 'element-ui';
    import Service from './arrange.service'  
    import arrangeTable from './table/arrangeTable'     
    import addFilesDialog from './operateDialog/addFilesDialog'
    import yijuanDialog from './operateDialog/yijuanDialog'
    import batchEditDialog from './operateDialog/batchEditDialog'
    import batchMountDialog from '@/views/common/bathMountDialog/batchMountDialog.vue'
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'
    import yiyoujiandingDialog from './operateDialog/yiyoujiandingDialog.vue';
    var treeNum = []
    @Component({
        components: { 
            arrangeTable,
            addFilesDialog,
            yijuanDialog,           
            batchEditDialog,
            batchMountDialog,
            pageToolbar,
            yiyoujiandingDialog
        },
        filters: {          
            filtertreeNum(value: any) {  
              for(let item in treeNum){
                 if(treeNum[item].kindId === value.kindId) {
                        if(treeNum[item].isAnJuan) {
                            return  treeNum[item].anJuanCount
                        } else {
                            return  treeNum[item].wenJianCount
                        }
                    }  
                }
            }
        }

    })
    export default class arrange extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 363 ;
        archiveAgentCode:string = window.sessionStorage.getItem('archiveAgentCode');
        defaultProps: any = {
            children: 'children',
            label: 'nodeName',
            isLeaf:function(data, node){
              return data.children!=null ?false:true
            }
        }; 
        isExportFileB:Boolean=false;
        selection:any = [];
        getTreeNumData:any = [];
        selectedArchiveList: any = [];//所选档案条目，鉴定申请界面使用
        treedata: any = [];
        fromBatchMount: string = 'arrange';
        libId:any;   
        activeName:string = 'file'; 
        searchKey:string = ''; 
        searchKey1:string = '';   
        searchKey2:string = ''; 
        searchKey3:string = '';           
        total: number = 0;
        page: number = 1;
        pageSize: number = 25;
        ajtm:any;
        exportType:string='1';
        exportVisible:Boolean=false;
         isshowfile:Boolean=true;
        isshowUngroup:Boolean=true;
        constructor(){
            super();
        };
        handleCurrentChange(val:number) {
            this.page = val; 
            this.search();                   
        };
        handleSizeChange(val:number) {
            this.pageSize = val;  
            this.search();               
        };
        //鉴定案卷级文件
        identifyAnJuan(libArr){
            let anJuanIdArr = [];
            let juanNeiList = [];
            for(let anjuanObj of this.selectedArchiveList){
                anJuanIdArr.push(anjuanObj.id);
            }

            let params = {
                "phase": 2,
                "archiveAgentCode": this.archiveAgentCode,               
                "anJuanLibId": libArr[0].id,
                "anJuanIds": anJuanIdArr
            }
            Service.searchJuanNei(params).then(res=>{                
                if(res.data.data.succeeded){
                    juanNeiList = res.data.data.data;   
                    let params = {
                        'archiveList': juanNeiList,
                        'libId': libArr[0].id
                    };
                    window.sessionStorage.setItem("identifyApply_passedParams",JSON.stringify(params));
                    this.$router.push({ path:'/myIdentify/identifyApply/identifyApply'});
                }
            })
        };
        toExporttask(){
            this.$router.push({ path:'/fileArrange/arrange/exportList/taskList'});
        };
        gotopage(page){
            if(page=='appraisal'){//鉴定申请
                if(this.selection.length>0){  
                    let libArr = [];
                    if(this.activeName=="file"){//案卷级的
                        libArr = this.libId.filter(function (item) {return item.rank === 3;});
                        this.identifyAnJuan(libArr);
                    }else{//文件级
                        libArr = this.libId.filter(function (item) {return item.rank === 4;});
                        let params = {
                            'archiveList': this.selectedArchiveList,
                            'activeName': this.activeName,
                            'libId': libArr[0].id
                        };
                        window.sessionStorage.setItem("identifyApply_passedParams",JSON.stringify(params));
                        this.$router.push({ path:'/myIdentify/identifyApply/identifyApply'});
                    }
                }else{                    
                    this['$message']({
                        type: 'warning',
                        message: '请选择需要鉴定的数据'
                    });
                    return;
                } 
            }else{
                this.$router.push({ path:'/fileArrange/arrange/'+page});
            }            
        }; 
        // 加入已有鉴定
        joinAppraisal(){
            if(this.selection.length == 0){
				this.Warn("请选择你要鉴定的文件");
				return;
            }
            let libArr = [];
            if(this.activeName=="file"){//案卷级的
                libArr = this.libId.filter(function (item) {return item.rank === 3;});
            }else{//文件级
                libArr = this.libId.filter(function (item) {return item.rank === 4;});
            }

            let _this = this;
			this.$nextTick(() => {
				_this.$refs['yiyoujiandingDialogRef'].detailsAppralVisible = true;
                _this.$refs['yiyoujiandingDialogRef'].selection = _this.selectedArchiveList;
                _this.$refs['yiyoujiandingDialogRef'].libId = libArr[0].id;
                
			})
        }
        gotopage2(page,type,name){
            if(!this.libId) {
                this['$message']({
                        type: 'warning',
                        message: '请选择案卷库'
                });
                return false;
            }
            let id,anJuanLibId; 
            anJuanLibId =  this.libId.filter(function (item) {
                        return item.rank === 3;
                    });              
            if(this.activeName=="file"){
                id=this.libId.filter(function (item) {
                        return item.rank === 3;
                    });
            }else{
                id=this.libId.filter(function (item) {
                        return item.rank === 4;
                });
            } 
            this.$router.push({
                path:'/fileArrange/arrange/'+page,
                name:'整理编目新增文件页面',
                params: {
                    from: type,
                    libId:id.length !== 0 && id[0].id,
                    categoryCodeValue:id[0].categoryCodeValue,
                    anJuanLibId:anJuanLibId.length !== 0 && anJuanLibId[0].id,
                    anJuanId:this.$refs['arrangeTable'].IngroupfileID[0],
                }
            });
        }; 
        showMgroup(){ 
          this.$nextTick(() => {
            this.$refs['yijuanDialogRef'].yijuanVisible = true;           
          });
        };      
        showAddFiles(){ 
          this.$nextTick(() => {
            this.$refs['addFilesDialogRef'].addFilesVisible = true;           
          });
        };
        //批量修改
        showBatchEdit(){
            if(this.selection.length>0){   
                    let id;                
                    if(this.activeName=="file"){
                        id=this.libId.filter(function (item) {
                                return item.rank === 3;
                            });
                    }else{
                        id=this.libId.filter(function (item) {
                                return item.rank === 4;
                        });
                    } 
                    this.$nextTick(() => {
                        this.$refs['batchEditDialogRef'].selectionIDs = this.selection; 
                        this.$refs['batchEditDialogRef'].batchEditVisible = true; 
                        this.$refs['batchEditDialogRef'].libId = id[0].id; 
                        //取得可批量修改的字段
                        this.$refs['batchEditDialogRef'].getBatchModifiableFields({"libId":id[0].id});         
                    });
                }else{                    
                    this['$message']({
                            type: 'warning',
                            message: '请选择要修改的数据'
                    });
                } 
        };
        showBatchMount(){
            if(!(this.libId && this.libId.length>0)){
                    this['$message']({
                                type: 'warning',
                                message: '请选择案卷库'
                    });
                    return false;
             };
             let id;                
            if(this.activeName=="file"){
                id=this.libId.filter(function (item) {
                        return item.rank === 3;
                    });
            }else{
                id=this.libId.filter(function (item) {
                        return item.rank === 4;
                });
            }
            this.$nextTick(() => {
                this.$refs['batchMountDialogRef'].batchMountVisible = true;
                this.$refs['batchMountDialogRef'].getMatchRules(id[0].id);
                // this.$refs['batchMountDialogRef'].getFiles(id[0].id);
                this.$refs['batchMountDialogRef'].wenJianLibId = id[0].id;
                this.$refs['batchMountDialogRef'].libId = id[0].id;
                this.$refs['batchMountDialogRef'].autoMatchParams.mode = 0;
                // this.$refs['batchMountDialogRef'].getLounTile();
            });
        };
        fileSelected(row){ 
           this.activeName='Ingroupfile';
           this.ajtm = row;
           this.searchKey3 ='';
        }; 
        //获取左侧列表
        getTree(){         
               let params={ "archiveAgentCode": '0' }
               Service.getTree(params).then(res=>{               
                     if(res){
                        this.treedata =  res.data.data;
                     }else{
                       this['$message']({
                        message: '查询案卷库失败！',
                        type: 'error'
                       })
                     }
               });
        };
        //获取左侧列表数量
        gettreeNum(node, resolve){
            let self = this;
            let data = node.data 
            if(data.length<0) 
              return false;                 
            if(data.isgetnum)      
              return false;  
            let arr=[];
            if(data.children && data.children.length>0){
               for(let child in data.children){
                  if(data.children[child].nodeType==2){
                      arr.push(data.children[child].kindId)
                  }
               }
            };
            if(arr.length==0){
                setTimeout(() => {  
                         data.isgetnum=true; 
                         if(data.children !== void (0)) {
                             resolve(data.children);
                         } 
                }, 500);
               return false;
            };         
              let params={ 
                  "archiveAgentCode":  window.sessionStorage.getItem('archiveAgentCode'),
                  "kindIds":arr
                  };
               Service.getTreeNum(params).then(res=>{               
                     if(res.data.succeeded){          
                          data.isgetnum=true; 
                          self.getTreeNumData = res.data.data                 
                          for( let i in self.getTreeNumData){
                              Service.containsAnJuan({kindId:self.getTreeNumData[i].kindId}).then(res=>{               
                                if(res.data.succeeded){
                                    if(res.data.data) {
                                        self.getTreeNumData[i].isAnJuan = true;
                                    } else {
                                        self.getTreeNumData[i].isAnJuan = false;
                                    }
                                    treeNum.push((self.getTreeNumData)[i]);
                                    resolve(data.children);
                                }else{
                                    self['$message']({
                                        message: res.data.errorMessage,
                                        type: 'error'
                                    })
                                }
                            });
                          }
                     }else{
                       this['$message']({
                        message: '查询数量失败！',
                        type: 'error'
                       })
                     }
                      
               });
        };
        //获取libid 
        getlibId(val){
               let params={"kindId":val};
               Service.getlibId(params).then(res=>{               
                     if(res.data && res.data.succeeded){
                        this.libId =  res.data.data;
                        if(this.libId.length>1){
                            this.isshowfile=true;
                            this.isshowUngroup=true;
                            this.activeName='file'
                        }else{
                            this.isshowfile=false;
                            this.activeName='Ungroup'
                        }               
                        this.search();
                     }else{
                       this['$message']({
                        message: '查询档案库信息失败！',
                        type: 'error'
                       })
                     }
               });
        };        
         handleNodeClick (data){ 
             let kindId = data;
             this.searchKey ='';
             this.searchKey1 ='';
             this.searchKey2 ='';
             if(kindId.nodeType!=1){
                  this.getlibId(kindId.kindId);  
             } 
            
          };
         //点击tab切换   
         tabClick(){
            if(!this.libId)
               return false;            
            this.search();
            this.page=1
         };
         search(){            
              if(this.activeName == 'file'){                               
                     this.searchKey = this.searchKey1;                          
                }else if(this.activeName == 'Ingroupfile'){
                        this.searchKey = this.searchKey3;                      
                }else if(this.activeName == 'Ungroup'){
                     this.searchKey = this.searchKey2; 
                 }
            this.$refs['arrangeTable'].getDispField(this.libId,this.activeName);
         };
         //选中的的值
          handleSelection(val){            
              var arr=[];
                 for(var item of val){
                 arr.push(item.id)
               };
              this.selection = arr;
              this.selectedArchiveList = val;
          }
         //批量删除
          BatchDelete():void{                     
                if(this.selection.length>0){   
                    let id,alerttext,obj;                
                    if(this.activeName=="file"){
                        id=this.libId.filter(function (item) {
                                return item.rank === 3;
                            }); 
                        alerttext="您是否要删除所选文件及其卷内文件?"
                         obj={
                            archiveAgentCode: this.archiveAgentCode,
                            anJuanIds:this.selection,
                            anJuanLibId:id[0].id
                        };  
                    }else{
                        id=this.libId.filter(function (item) {
                                return item.rank === 4;
                        }); 
                        alerttext="您是否要删除所内文件?"
                        obj={
                            archiveAgentCode: this.archiveAgentCode,
                            ids:this.selection,
                            libId:id[0].id
                        };
                    }  
                    this['$confirm'](alerttext, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {    
                        let filedelService;
                        if(this.activeName=="file"){
                            filedelService= Service.unmergeAndDelete(obj)                           
                        }else{
                            filedelService= Service.BatchDelete(obj)                                                  
                        }
                        filedelService.then(res=>{
                                if(res.data.succeeded){                              
                                    this['$message']({
                                            type: 'success',
                                            message: '删除成功。'
                                    });
                                    this.search()
                                }else{
                                    this['$message']({
                                            type: 'error',
                                            message: res.data.errorMessage
                                    });
                                }
                        })      
                    })
                }else{                    
                    this['$message']({
                            type: 'warning',
                            message: '请选择要删除的数据'
                    });
                } 
           
        };
          //组卷
          AutoAssemble(){         
            if(this.selection.length>0){          
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在组卷，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    let id=this.libId.filter(function (item) {
                                return item.rank === 4;
                            }); 
                    let params={
                            "archiveAgentCode": this.archiveAgentCode,
                            "phase" : 2,
                            "wenJianLibId": id[0].id,
                            "wenJianIds": this.selection
                    } ;                
                    Service.autoAssemble(params).then(res => {
                        if (res.data.succeeded) {
                                this['$message']({
                                        type: 'success',
                                       // message: '组卷成功'+res.data.data+'条！'
                                        message: '组卷成功'
                                });  
                                  this.search()                          
                        } else {
                            if(res.data.errorType=='SHOW_OK'){
                                this['$confirm'](res.data.errorMessage, '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '',
                                    showCancelButton: false,
                                    type: 'error',
                                    center:true
                                });
                            }else{
                                 this['$message']({
                                        type: 'error',
                                        message: res.data.errorMessage
                                });
                            }
                        }
                        this.$nextTick(() => {
                            loadingInstance.close();
                        })
                    })
           
            }else{                    
                    this['$message']({
                            type: 'warning',
                            message: '请选择要组卷的数据'
                    });
            } 
        };
        //拆卷
         unmerge(){         
            if(this.selection.length>0){          
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在拆卷，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    let id=this.libId.filter(function (item) {
                                return item.rank === 3;
                            }); 
                    let params={
                            "archiveAgentCode": this.archiveAgentCode,
                            "anJuanLibId": id[0].id,    
                            "anJuanIds": this.selection
                    } ; 
                    Service.unmerge(params).then(res => {
                        if (res.data.succeeded) {
                                this['$message']({
                                       type: 'success',
                                       // message: '拆卷成功'+res.data.data+'条！'
                                       message: '拆卷成功'
                                });  
                                  this.search()                          
                        } else {
                            if(res.data.errorType=='SHOW_OK'){
                                this['$confirm'](res.data.errorMessage, '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '',
                                    showCancelButton: false,
                                    type: 'error',
                                    center:true
                                });
                            }else{
                                 this['$message']({
                                        type: 'error',
                                        message: res.data.errorMessage
                                });
                            }
                        }
                        this.$nextTick(() => {
                            loadingInstance.close();
                        })
                    })
           
            }else{                    
                    this['$message']({
                            type: 'warning',
                            message: '请选择要拆卷的案卷'
                    });
            } 
        };
        //案卷发布
         Publish():void{          
                if(this.selection.length>0){   
                    let params,id,alerttext;                
                    if(this.activeName=="file"){
                        id=this.libId.filter(function (item) {
                                return item.rank === 3;
                        });                        
                        params={
                            archiveAgentCode: this.archiveAgentCode,
                            anJuanIds:this.selection,
                            anJuanLibId:id[0].id
                        };
                        this['$confirm']("您是否要发布所选案卷及其卷内文件?", '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            Service.anjuanPublish(params).then(res=>{
                                if(res.data.succeeded){                              
                                    this['$message']({
                                            type: 'success',
                                            message: '案卷发布成功。'
                                    });
                                }else{
                                    this['$message']({
                                            type: 'error',
                                            message: res.data.errorMessage
                                    });
                                }
                            })
                        })
                    }else{
                        id=this.libId.filter(function (item) {
                                return item.rank === 4;
                        });
                        params={
                            archiveAgentCode: this.archiveAgentCode,
                            wenJianLibId: id[0].id,
                            wenJianIds:this.selection
                        }
                        this['$confirm']('您是否要发布所选文件?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            Service.weijianPublish(params).then(res=>{
                                if(res.data.succeeded){                              
                                    this['$message']({
                                            type: 'success',
                                            message: '文件发布成功。'
                                    });
                                }else{
                                     if(res.data.errorType=='SHOW_OK'){
                                            this['$confirm'](res.data.errorMessage, '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '',
                                                showCancelButton: false,
                                                type: 'error',
                                                center:true
                                            });
                                        }else{
                                             this['$message']({
                                                        type: 'error',
                                                        message: res.data.errorMessage
                                                });
                                        }
                                }
                            })
                        })
                    } 
         
                }else{                    
                    this['$message']({
                            type: 'warning',
                            message: '请选择要发布的数据'
                    });
                } 
           
        };
        
        //导出
         isExport(){
             
             if(!(this.libId && this.libId.length>0)){
                    this['$message']({
                                type: 'warning',
                                message: '请选择案卷库'
                    });
                    return false;
             };
             let ids=[]          
             if(this.selection.length<=0){ 
                     this.$confirm('您是否要导出全部', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {  
                                this.exportVisible=true;
                                this.isExportFileB=false;                      
                        if(this.activeName == 'file'){                               
                                this.exportType = "1"                            
                        }else if(this.activeName == 'Ingroupfile'){
                               this.exportType = "3" 
                               // this.DataImporterExport(3,ids)
                        }else if(this.activeName == 'Ungroup'){
                                this.exportType = "6" 
                               // this.DataImporterExport(6,ids)
                        }
                    }).catch(() => {
                        this['$message']({
                                type: 'warning',
                                message: '请选择要导出的数据'
                        });
                    });
             }else{
                        this.exportVisible=true 
                        if(this.activeName == 'file'){
                               // this.exportVisible=true  
                               this.exportType = "1"                            
                        }else if(this.activeName == 'Ingroupfile'){
                               this.exportType = "3"
                               // this.DataImporterExport(3,this.selection)
                        }else if(this.activeName == 'Ungroup'){
                               this.exportType = "6"
                              //  this.DataImporterExport(6,this.selection)
                        }
             }
         };
         DataImporterExport(type,ids){
             
            let lib,ajid;
            this.exportVisible=false;
            if(this.activeName=="file"){
                  lib = this.libId.filter(function (item) {return item.rank === 3;})                   
            }else{
                  lib = this.libId.filter(function (item) {return item.rank === 4;})
            }
             if(this.activeName == 'Ingroupfile'){
                   ajid = this.ajtm.id
              }else{
                  ajid=null
              }
         
            let  params= {
                    "excelType": "xls",
                    "contentType": parseInt(type),
                    "archiveAgentCode": this.archiveAgentCode,
                    "libId": lib[0].id,
                    "archiveIds": ids,
                    "phase": 2,
                    "parentId": ajid,
                    "nodeName": lib[0].displayName,
                    "sort": ""
                }
             let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在导出，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.DataImporterExport(params).then(res=>{                
                if(res){               
                        let data = res;
                        let excelName = params['nodeName'];
                        switch (parseInt(params['contentType'])) {
                            case 1:
                                excelName=excelName+"_案卷目录";
                                break;
                            case 3:
                                excelName=excelName+"_卷内目录";
                                break;                                  
                            case 6:
                                excelName=excelName+"_卷内目录";
                                break;
                        }
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            window.navigator.msSaveOrOpenBlob(csvData,excelName+'.'+params['excelType']);                            
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;                                                        
                            link.setAttribute('download',excelName+'.'+params['excelType']);
                            document.body.appendChild(link);
                            link.click();                
                            document.body.removeChild(link);
                         }
                }else{
                      this['$message']({
                            type: 'error',
                            message: res.data.errorMessage
                        });
                }
                 this.$nextTick(() => {
                        loadingInstance.close();
                 })
            });
        } ;   
        //是否导出原文
        isExportFile(exportType,selection){           
            if(!this.isExportFileB){               
               this.DataImporterExport(exportType,selection)
            }else{
               this.exportAllFile(exportType,selection)
            }
                
         }; 
        exportAllFile(type,ids){          
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在导出，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            let lib,ajid;
            this.exportVisible=false;
            if(this.activeName=="file"){
                  lib = this.libId.filter(function (item) {return item.rank === 3;})                   
            }else{
                  lib = this.libId.filter(function (item) {return item.rank === 4;})
            }
             if(this.activeName == 'Ingroupfile'){
                   ajid = this.ajtm.id
              }else{
                  ajid=null
              }
             let  params= {
                    "excelType": "xls",
                    "contentType": parseInt(type),
                    "archiveAgentCode": this.archiveAgentCode,
                    "libId": lib[0].id,
                    "archiveIds": ids,
                    "phase": 2,
                    "parentId": ajid,
                    "nodeName": lib[0].displayName,
                    "sort": ""
                }
            Service.arrcreateExportTask(params).then(res=>{
                  if(res['type']=='application/json'){
                            this['$message']({
                                type: 'warning',
                                message: '所选文件无电子原文！'
                            });
                            retrun false;
                   }  
                  if(res.data.succeeded){                      
                        let excelName = params['nodeName'];                        
                        this.startexportAllFile(res.data.data.id)
                   }else{
                         this['$message']({
                                type: 'error',
                                message: res.data.errorMessage
                            });  
                  }   
                    this.$nextTick(() => {
                        loadingInstance.close();
                    })
             })
            
        } ;
        startexportAllFile(id){
             Service.arrExportstart(id).then(res=>{
                   if(res.data.succeeded){                              
                       this.$confirm('已创建导出任务, 前往任务列表下载?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                              this.toExporttask()
                        }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });          
                        });
                   }else{
                         this['$message']({
                                type: 'error',
                                message: res.data.errorMessage
                         });  
                  } 

             })
            
        };
      
        created(){           
                
        };

        mounted(){           
            window.onresize = () => {
                return (() => {
                    this.$refs.arrangeTable.bodyHeight = document.documentElement.clientHeight - 363;
                })()
            };
              this.getTree();
           
        };
        activated(){
           if(this.$route.params && this.$route.params.from && this.$route.params.from=="addArrangeData"){
               this.search();
           }
            
        };
    }
</script>
<style lang="scss" scoped >
    @import '../../../styles/innerPublic.scss';
    @import '../../../styles/fileManage/arrange.scss';
</style>
