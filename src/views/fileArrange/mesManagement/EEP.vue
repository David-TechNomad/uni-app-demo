<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>EEP阅读器</span>
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
                            ref="tree">
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
                       <div class="searchKey boxshow overflowXa">           
                            <el-form :inline="true" :model="form">  
                                <div style="min-width:1170px;">
                                    <el-form-item label="题名：" prop="tm">
                                    <el-input placeholder="题名" size="small" v-model="form.tm"></el-input>
                                    </el-form-item>
                                    <el-form-item label="年度：" prop="nd">
                                        <el-input placeholder="年度" size="small" v-model="form.nd"></el-input>
                                    </el-form-item>
                                    <el-form-item label="档号：" prop="dh">
                                        <el-input placeholder="档号" size="small" v-model="form.dh"></el-input>
                                    </el-form-item>              
                                    <el-form-item label="是否有最新修订：">
                                        <el-select v-model="form.isUpdate" clearable placeholder="请选择">
                                                <el-option label="是" value="true"></el-option>
                                                <el-option label="否" value="false"></el-option>
                                        </el-select>
                                    
                                    </el-form-item>               
                                    <el-form-item>
                                        <el-button class="defaultBtn" @click="search()">检索</el-button> 
                                    </el-form-item>
                                </div>   
                            </el-form>
                        </div>
                          <div class="pd10 boxshow bgwhite">                           
                               <el-table
                                    class="defaultTable"
                                     :height="bodyHeight"  
                                    :data="tableData" 
                                    border                                   
                                    v-loading="listLoading"       
                                    element-loading-text="努力加载中..."
                                    header-row-class-name="tableHeader"
                                    :empty-text="libId && libId.length>0?'暂无数据':'请选择案卷库'">
                                        <el-table-column prop="ARCHIVAL_CODE"  label="档号">
                                        </el-table-column>
                                        <el-table-column prop="TITLE"  label="题名">
                                        </el-table-column>
                                        <el-table-column prop="YEAR"  label="年度">
                                        </el-table-column>
                                        <el-table-column prop="EEP_EXPORT_DATE"  label="EEP最新创建时间">
                                              <template slot-scope="scope"> 
                                                {{scope.row.EEP_EXPORT_DATE | dateFormat}}                                                
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="UPDATE_DATE"  label="档案最近更新时间">
                                            <template slot-scope="scope"> 
                                                {{scope.row.UPDATE_DATE | dateFormat}}                                                
                                            </template>
                                        </el-table-column>                                      
                                        <el-table-column prop="name"  label="操作">
                                            <template slot-scope="scope"> 
                                                 <el-button class="tabletoolBtn" @click="gopage(scope.row)">查看</el-button>                                                 
                                                 <el-button class="tabletoolBtn" @click="exporttake(scope.row)">下载</el-button>                                                 
                                              </template>
                                        </el-table-column>
                                </el-table>
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
                <el-button type="primary" >确 定</el-button>
            </span>
        </el-dialog>
       
     </section>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import { Loading } from 'element-ui';
    import Service from './EEP.service'
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'

    var treeNum = []
    @Component({
        components: { 
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
    export default class EEP extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 334 ;
        archiveAgentCode:string = window.sessionStorage.getItem('archiveAgentCode');
        defaultProps: any = {
            children: 'children',
            label: 'nodeName',
            isLeaf:function(data, node){
              return data.children!=null ?false:true
            }
        }; 
        listLoading:Boolean=false;
        treedata: any = [];
        libId:any=[];   
        activeName:string = 'file';
        total: number = 0;
        page: number = 1;
        pageSize: number = 25;
        exportType:string='';
        exportVisible:Boolean=false;
        tableData:any = [];  
        isshowfile:Boolean=true;
        isshowUngroup:Boolean=true;
        form:any ={
            tm:"",
            nd:"",
            dh:"",
            isUpdate:null
        }
        constructor(){
            super();
        };
        handleCurrentChange(val:number) {
            this.page = val; 
            this.search();                   
        };
        handleSizeChange(val:number) {
            this.page = 1;
            this.pageSize = val;  
            this.search();               
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
             let kindId = data
             if(kindId.nodeType!=1){
                  this.getlibId(kindId.kindId);  
             } 
          };  
         tabClick(){
            if(!this.libId)
               return false;
               this.search();
         }; 
         search(){          
                let id;           
                if(this.activeName=='file'){ 
                    this.libId.forEach(row =>{
                    if(row.rank == 3){
                        id = row.id
                    }
                    })  
                }else if(this.activeName=='Ungroup'){
                    this.libId.forEach(row =>{
                    if(row.rank == 4){
                        id = row.id
                    }
                    
                    }) 
                };              
               let params={
                        "libId":id,
                        "page":this.page-1,
                        "pageSize":this.pageSize,
                        "sort":""
                    };
                   
                 params={...params,...this.form};  
                  if(this.form.isUpdate=="true") {
                      params.isUpdate=true
                  } else if(this.form.isUpdate=="fasle")  {
                      params.isUpdate=false;
                  }     
               Service.getList(params).then(res=>{               
                     if(res.data && res.data.succeeded){
                        this.tableData =  res.data.data; 
                        this.total = res.data.totalRecords
                     }else{
                       this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                       })
                     }
               });
         };
         exporttake(row){ 
            
                let id;           
                if(this.activeName=='file'){ 
                    this.libId.forEach(row =>{
                    if(row.rank == 3){
                        id = row.id
                    }
                    })  
                }else if(this.activeName=='Ungroup'){
                    this.libId.forEach(row =>{
                    if(row.rank == 4){
                        id = row.id
                    }
                    
                    }) 
                };                
            let  params= {
                    libId:id
                    id:row.id
                    archiveAgentCode:this.archiveAgentCode
                }            
            Service.exportAip(params).then(res=>{                
                if(res){  
                   window.open(process.env.upload_BASEURL+'file/simple/exportAip?libId='+id+'&&id='+row.id+'&&archiveAgentCode='+this.archiveAgentCode)
                }else{
                      this['$message']({
                            type: 'error',
                            message: res.data.errorMessage
                        });
                }
               
            });
    
         }; 
         gopage(row){ 
               let id;           
                if(this.activeName=='file'){ 
                    this.libId.forEach(row =>{
                    if(row.rank == 3){
                        id = row.id
                    }
                    })  
                }else if(this.activeName=='Ungroup'){
                    this.libId.forEach(row =>{
                    if(row.rank == 4){
                        id = row.id
                    }
                    
                    }) 
                }; 
                this.$router.push({
                    path:'/fileArrange/mesManagement/eeplist/eeplist',
                    name:'EEPList',
                    params: {
                        current: row ,
                        libId: id                    
                    }
                });
             
         }
        created(){
            
                
        };
    
        mounted(){           
            window.onresize = () => {
                return (() => {
                   this.bodyHeight = document.documentElement.clientHeight - 334;
                })()
            };
              this.getTree();
           
        };
    }
</script>
<style lang="scss" scoped >
    @import '../../../styles/innerPublic.scss';
    @import '../../../styles/fileManage/arrange.scss';
</style>
