<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>意见审核</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true" v-model="searchKey"> 
                  <el-form-item label="主题：">
                    <el-input placeholder="请输入" size="small" v-model="searchKey.name"></el-input>
                </el-form-item> 
                <el-form-item label="意见状态：">
                    <el-select v-model="searchKey.recordStatus" placeholder="请选择状态">
                        <el-option :label="itme.displayText" :value="itme.code" v-for="itme in selecData"></el-option>                       
                        </el-select>
                </el-form-item> 
                <el-form-item>
                    <el-button class="defaultBtn" @click="getList">检索</el-button>
                </el-form-item>
             </el-form>
        </div>
        <div class="contentbox boxshow">
            <div class="searchCon"> 
                    <div class="clear">
                        <!--<el-button class="defaultBtn rt ml10" @click="setoverll()">置已完结</el-button> -->
                        <!--<el-button class="defaultBtn rt" @click="delAll()">删除</el-button> -->
                    </div>
                    <el-table
                        :data="tableData"
                        border
                        :height="bodyHeight"
                        element-loading-text="努力加载中..."
                        header-row-class-name="tableHeader" 
                        stripe 
                        @selection-change="handleShiftSelect"
                        class="defaultTable">
                        <el-table-column type="selection"  width="55">
                        </el-table-column>                                        
                        <el-table-column prop="originalFileName" label="附件" >
                        </el-table-column>
                        <el-table-column prop="postTitle" label="主题" >
                        </el-table-column>
                        <el-table-column prop="postTime" label="创建时间" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column prop="postStatus" label="意见状态">
                            <template slot-scope="scope"> 
                                  <span v-if="scope.row.postStatus==0">未回复</span>
                                  <span v-if="scope.row.postStatus==1">已回复</span>
                                  <span v-if="scope.row.postStatus==2">已完结</span>
                             </template>
                        </el-table-column>
                        <el-table-column prop="updatePerson" label="最新修改人">
                        </el-table-column>
                        <el-table-column prop="updateDate" label="最新修改时间" :formatter="dateFormat">
                        </el-table-column>
                     
                        <el-table-column  prop="name" label="操作"  width="280">
                                <template slot-scope="scope"> 
                                    <el-button class="tabletoolBtn" @click="showEidt(scope.row)" v-if="scope.row.postStatus != 0">查看</el-button>                                                 
                                    <el-button class="tabletoolBtn" @click="addReplay(scope.row)" v-if="scope.row.postStatus==0">回复</el-button> 
                                    <el-button class="tabletoolBtn" v-show="scope.row.postStatus==0" @click="del(scope.row)">删除</el-button>
                                    <!--<el-button class="tabletoolBtn" @click="setover(scope.row)" v-if="scope.row.postStatus!=2">置已完结</el-button>-->
                                </template>
                        </el-table-column>
                    </el-table>  
                    <div class="clear mt10"> 
                        <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                    </div> 
                   
                </div>
        </div> 
       <eidt ref="edit"></eidt>
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
   import Service from './OpinionAudit.service';
   import eidt from './eidt.vue';
   import pageToolbar from '@/components/pageToolbar/pageToolbar.vue';
   import moment from 'moment';
   @Component({
        components: {          
            pageToolbar,
             eidt
        },
    }) 
    export default class opinionAudit extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 320 ; 
        searchKey: any = {
              "name":"",           
              "recordStatus":""
             
        }
        archiveAgentCode: any = [{}]; 
        tableData: any =[];
        selecData: any =[];
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;
        selection:any =[];
        constructor(){
            super();
        };
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
        showEidt(val){           
           this.$refs.edit.eidtVisible=true;  
            this.$refs.edit.id=val.id        
           this.$refs.edit.getContent()
        };
        addReplay(val){
           this.$refs.edit.id=val.id;
           this.$refs.edit.eidtVisible=true; 
           this.$refs.edit.getContent() 
        };
        handleShiftSelect(val){ 
             this.selection = val;
                    
        }
        getList(){           
          let  parmes = {
                    "postTitle":this.searchKey.name,
                    "postStatus":this.searchKey.recordStatus,
                    "posterId":"",
                    "page":this.page,
                    "pageSize":this.pageSize
                }               
             Service.getList(parmes).then((res) =>{
               if(res.data.succeeded){                   
                  this.tableData = res.data.data;
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }
            });
        };
        getSelect(){          
            Service.getDictlistsurl(83).then((res) =>{
                if (res.data.succeeded) {                               
                     this.selecData= res.data.data
                }else{
                    this['$message']({
                        message: '获取状态失败',
                        type: 'error'
                    });
                  }
            })
        }; 
      del(val){
           Service.systemdelete({idStr:val.id+''}).then((res) =>{
                if (res.data.succeeded) {  
                    this['$message']({
                            message: '删除成功',
                            type: 'success'
                    });
                    this.getList();
                }else{
                    this['$message']({
                        message: '删除失败',
                        type: 'error'
                    });
                }
            })
      };
      setover(val){
           Service.setover({idStr:val.id+''}).then((res) =>{
                if (res.data.succeeded) {  
                    this['$message']({
                            message: '置顶成功',
                            type: 'success'
                    });
                    this.getList();
                }else{
                    this['$message']({
                        message: '置顶失败',
                        type: 'error'
                    });
                }
            })
      };
      setoverll(){
         let  that = this
          if(this.selection.length>0){ 
                    this['$confirm']("确认要置顶所选文件吗", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => { 
                       let selection ;
                       for(let key in that.selection){
                           if(selection){
                               selection=selection+','+that.selection[key].id
                           }else{
                               selection=that.selection[key].id
                           }                          
                       }                         
                       this.setover({'id':selection})
                    })
                }else{                    
                    this['$message']({
                            type: 'warning',
                            message: '请选择要删除的数据'
                    });
                } 
      };
      delAll(){
         let  that = this
          if(this.selection.length>0){ 
                    this['$confirm']("确认要删除所选文件吗", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => { 
                       let selection ;
                       for(let key in that.selection){
                           if(selection){
                               selection=selection+','+that.selection[key].id
                           }else{
                               selection=that.selection[key].id
                           }                          
                       }                         
                       this.del({'id':selection})
                    })
                }else{                    
                    this['$message']({
                            type: 'warning',
                            message: '请选择要删除的数据'
                    });
                } 
      };
        handleCurrentChange(val:number) {
            this.page = val;
            this.getList();    
        };
        handleSizeChange(val:number) {
            this.pagesize = val;
            this.getList(); 
        };

        created(){ 
          this.getSelect();
          this.getList();       
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 320;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
    @import '../../../styles/retrieve/search';
</style>