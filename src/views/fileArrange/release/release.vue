<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>整编发布</span>
           <el-button class="defaultBtn rt mt10" @click="activeName='file';search()" v-if="activeName=='Ingroupfile'">返回</el-button>        
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
                          <b>案卷题名：{{ajtm.TM}}</b>
                      </div>    
                      <el-tabs v-model="activeName" type="card" class="erpTab" v-if="activeName=='Ingroupfile'"> 
                           <el-tab-pane label="卷内文件列表" name="Ingroupfile" >                                   
                            </el-tab-pane>  
                      </el-tabs> 
                      <el-tabs v-model="activeName" type="card" class="erpTab" @tab-click="tabClick" v-else >                                                  
                            <el-tab-pane label="案卷级" name="file" >                                               
                            </el-tab-pane>
                            <el-tab-pane label="文件级" name="Ungroup">                                   
                            </el-tab-pane> 
                       </el-tabs> 
                          <div class="searchKey boxshow">           
                              <el-form :inline="true" >                                   
                                  <el-form-item>
                                      <el-input placeholder="请输入关键字" size="small" v-model="searchKey"></el-input>
                                  </el-form-item>
                                  <el-form-item>
                                      <el-button class="defaultBtn" @click="search">检索</el-button>
                                  </el-form-item>
                              </el-form>
                          </div>
                          <div class="pd10 boxshow bgwhite">
                              <div class="text-right">
                                <el-button class="grenBtn" @click="releasePublish">整编发布</el-button>
                              </div>
                              <releaseTable  @handfileSelected="fileSelected" ref="releaseTable" @handSfileSelected="handleSelection"></releaseTable>                            
                              <div class="clear mt10"> 
                                <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                              </div>  
                         </div>                
        </div>   
        <el-dialog
            title="导出类型"
            :visible.sync="exportVisible"
            width="30%">
            <el-radio-group v-model="exportType">
                <el-radio label="1">案卷目录</el-radio>
                <el-radio label="2">案卷目录及卷内</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="DataImporterExport(exportType,selection)">确 定</el-button>
            </span>
        </el-dialog>
     </section>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import { Loading } from 'element-ui';
    import Service from './release.service'  
    import releaseTable from './table/releaseTable'    
   import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'
    var treeNum = []
    @Component({
        components: { 
            releaseTable,
            pageToolbar         
        },
        filters: {          
            filtertreeNum(value: any) {                             
              for(let item in treeNum){
                 if(treeNum[item].kindId === value.kindId)
                    if(treeNum[item].isAnJuan) {
                        return  treeNum[item].anJuanCount
                    } else {
                        return  treeNum[item].wenJianCount
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
        selection:any = [];
        getTreeNumData:any = [];
        selectedArchiveList: any = [];//所选档案条目，鉴定申请界面使用
        treedata: any = [];
        fromBatchMount: string = 'arrange';
        libId:any;   
        activeName:string = 'file'; 
        searchKey:string = '';         
        total: number = 0;
        page: number = 0;
        pageSize: number = 100;
        ajtm:any;
        exportType:string='';
        exportVisible:Boolean=false;
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
        fileSelected(row){            
           this.activeName='Ingroupfile';
           this.ajtm = row;
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
                  "archiveAgentCode":  window.sessionStorage.getItem('archiveAgentCode');
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
                      resolve(data.children);
               });
        };
        releasePublish() {
            
        }
        //获取libid 
        getlibId(val){
               let params={"kindId":val};
               Service.getlibId(params).then(res=>{               
                     if(res.data && res.data.succeeded){
                        this.libId =  res.data.data;        
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
             if(kindId.nodeType!=1){
                  this.getlibId(kindId.kindId);  
             } 
          };
         //点击tab切换   
         tabClick(){
            if(!this.libId)
               return false;
            this.search();
         };
         search(){
            this.$refs['releaseTable'].getDispField(this.libId,this.activeName);
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
                                    this['$message']({
                                            type: 'error',
                                            message: res.data.errorMessage
                                    });
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
        
        created(){           
                
        };

        mounted(){           
            window.onresize = () => {
                return (() => {
                    this.$refs.releaseTable.bodyHeight = document.documentElement.clientHeight - 363;
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
