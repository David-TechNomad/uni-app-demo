<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>导出列表</span>
            <el-button class="defaultBtn rt mt10" @click="back">返回</el-button>
        </div>       
        <div class="contentbox boxshow">
            <div class="searchCon">                   
                    <el-table
                        :data="tableData"
                        border
                        :height="bodyHeight"
                        element-loading-text="努力加载中..."
                        header-row-class-name="tableHeader" 
                        stripe 
                        class="defaultTable">                
                        <el-table-column prop="nodeName" label="案卷库名称" align="left">                                         
                        </el-table-column>
                        <el-table-column prop="createDate" label="创建任务日期" align="left" :formatter="dateFormat">                                         
                            </el-table-column>
                            <el-table-column prop="status_text" label="导出状态" align="left">                                         
                            </el-table-column>
                            <el-table-column prop="expireDate" label="有效截止日期" align="left" :formatter="dateFormat">                                         
                            </el-table-column>
                        <el-table-column  prop="name" label="操作"  width="180">
                                <template slot-scope="scope">                                                
                                    <el-button class="tabletoolBtn" @click="cancel(scope.row.id)" v-if="scope.row.status_text=='已创建' || scope.row.status_text=='排队中' " >取消任务</el-button> 
                                    <el-button class="tabletoolBtn" @click="downexportAllFile(scope.row.nodeName,scope.row.id,scope.row.status_text)" v-if="scope.row.status_text=='已完成'">下载</el-button> 
                               
                                </template>
                        </el-table-column>

                    </el-table>  
                    <div class="clear mt10"> 
                        <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                    </div> 
            
                   
                </div>
        </div>        
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
   import Service from './taskList.service';  
   import { Loading } from 'element-ui';
   import pageToolbar from '@/components/pageToolbar/pageToolbar.vue';
    import moment from 'moment';
   @Component({
        components: {          
            pageToolbar
        },
    })
    export default class taskList extends Vue{       
      bodyHeight: number= document.documentElement.clientHeight - 230 ;    
      tableData: any =[];
        total: number = 0;
         page: number = 1;
        pageSize: number = 25;  
        constructor(){
            super();
        };
        handleCurrentChange(val:number) {
            this.page = val; 
            this.gettable();                   
        };
        handleSizeChange(val:number) {
            this.pageSize = val;  
            this.gettable();               
        };
         dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
 
         back(){
                this['$router'].go(-1);
            };   
         gettable(){     
             let params={             
                    "page": this.page,
                    "pageSize": this.pageSize,                   
            };
            Service.arrExportlist(params).then((res) =>{
                if (res.data.succeeded) {                               
                     this.tableData = res.data.data
                     this.total=res.data.totalRecords
                }else{
                    this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                    });
                  }
            })
        };
        
         downexportAllFile(excelName,id){ 
                 let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在导出，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.arrExportdownload({'exportTaskId':id}).then(res=>{
                        if(res){
                          window.open(process.env.upload_BASEURL+'/archive/file/downloadExported?exportTaskId='+id)                    
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
            
        };
        cancel(id){
              Service.arrExportcancel(id).then(res=>{
                   if(res.data.succeeded){
                        this['$message']({
                                type: 'success',
                                message: '取消成功'
                            }); 
                         this.gettable(); 
                   }else{
                         this['$message']({
                                type: 'error',
                                message: res.data.errorMessage
                            });  
                    } 

             })
        };
        created(){ 
             this.gettable()      
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 230;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
  @import '../../../../styles/innerPublic.scss';
 .wrapprSection >>>.contentbox{ 
  top:50px;
  left: 10px;
}
</style>