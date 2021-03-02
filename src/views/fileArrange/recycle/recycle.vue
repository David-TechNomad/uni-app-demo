<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>回收站</span>
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
                            ref="tree"><!--:load="gettreeNum" lazy -->
                            <span slot-scope="{node,data}" style="width: 100%;white-space: normal;">                             
                                <span>{{ node.label }}</span>                                                    
                            </span>
					           </el-tree>
            </div>
        </div>
        <div class="contentbox"> 
                      <el-tabs v-model="activeName" type="card" class="erpTab" @tab-click="tabClick">                                                  
                            <el-tab-pane label="案卷级" name="file" v-if="isshowfile">                                               
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
                                <el-button class="blueBtn" @click="restore">恢复</el-button>
                                <el-button class="redBtn" @click="BatchDelete">删除</el-button> 
                              </div>
                              <recycleTable  @handfileSelected="fileSelected" ref="recycleTable" @handSfileSelected="handleSelection"></recycleTable>                            
                              <div class="clear mt10"> 
                                <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                              </div>  
                         </div>                
        </div>  
     </section>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import { Loading } from 'element-ui';
    import Service from './recycle.service'  
    import recycleTable from './table/recycleTable' 
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'
    var treeNum = []
    @Component({
        components: { 
            recycleTable,           
            pageToolbar
        },
        filters: {          
            filtertreeNum(value: any) {                             
              for(let item in treeNum){
                 if(treeNum[item].kindId === value.kindId)
                      return  treeNum[item].anJuanCount
              }
            }
        }

    })
    export default class recycle extends Vue{
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
        selectedArchiveList: any = [];//所选档案条目，鉴定申请界面使用
        treedata: any = [];
        libId:any;   
        activeName:string = 'file'; 
        searchKey:string = '';         
        total: number = 0;
        page: number = 0;
        pageSize: number = 100;
        ajtm:any;
        exportType:string='';
        exportVisible:Boolean=false;
         isshowfile:Boolean=true;
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
               let params={ "archiveAgentCode": "0" }
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
               return false;
            };         
              let params={ 
                  "archiveAgentCode": this.archiveAgentCode;
                  "kindIds":arr
                  };
               Service.getTreeNum(params).then(res=>{               
                     if(res.data.succeeded){                     
                          data.isgetnum=true;                        
                          for( let i in res.data.data){
                             treeNum.push((res.data.data)[i]);
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
        //获取libid 
        getlibId(val){
               let params={"kindId":val};
               Service.getlibId(params).then(res=>{               
                     if(res.data && res.data.succeeded){
                        this.libId =  res.data.data;
                         if(this.libId.length>1){
                            this.isshowfile=true;
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
             let kindId = data
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
            this.$refs['recycleTable'].getDispField(this.libId,this.activeName);
         };
         //选中的的值
          handleSelection(val){            
              var arr=[];
                 for(var item of val){
                 arr.push(item.id)
               };
              this.selection = arr;
              this.selectedArchiveList = val;
          };  
          //删除
          BatchDelete():void{          
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
                    let obj={
                        archiveAgentCode: this.archiveAgentCode,
                        archiveIds:this.selection,
                        libId:id[0].id
                    };
                    this['$confirm']                                                                                         ('您确定彻底删除所选文件吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.BatchDelete(obj).then(res=>{
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
            //恢复
            restore():void{          
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
                    let obj={
                        archiveAgentCode: this.archiveAgentCode,
                        archiveIds:this.selection,
                        libId:id[0].id
                    };
                    this['$confirm']('您确定恢复所选文件吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.RecycleRestore(obj).then(res=>{
                            if(res.data.succeeded){                              
                                this['$message']({
                                        type: 'success',
                                        message: '恢复成功。'
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
                            message: '请选择要恢复的数据'
                    });
                } 
           
        };
        created(){
            
                
        };

        mounted(){           
            window.onresize = () => {
                return (() => {
                    this.$refs.recycleTable.bodyHeight = document.documentElement.clientHeight - 363;
                })()
            };
              this.getTree();
           
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
    @import '../../../styles/fileManage/arrange.scss';
</style>
