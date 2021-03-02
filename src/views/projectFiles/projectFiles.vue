<template>
    <section>
        <!-- <div class="mainTitle">库房管理</div> -->
        <div class="titleBlue">
            <b></b>
            <span>库房管理</span>
        </div>
            <div class="mainDoc">
            <div class="mainCon mainBorrow">
               <div class="boxTit">
                    <div class="projectTit">
                        <span>项目/部门名称：{{this['$route'].params.objName}}</span>
                        <span> </span>
                        <!-- <span>库房信息：{{this.projectHouseName}}</span> -->
                        <span></span>
                    </div>
                    <div class="copyUpload" style="float:right;margin-top:-5px">
                            <el-form>
                             <el-form-item>
                                    <el-button type="primary" class="el-button checkWay" @click="goBack">返回</el-button>
                                    <el-button type="primary" class="el-button checkWay">导出</el-button>
                                    <el-button type="primary" class="el-button checkWay">打印</el-button>
                                </el-form-item>
                            </el-form>
                            
                    </div>
                   
               </div>
                <!--列表-->
                <div class="borderTable" v-show="documentShow">
                    <el-table tooltip-effect="dark" :height="bodyHeight" style="width:100%" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                    <!-- <el-table-column :show-overflow-tooltip="true" :prop="item.fieldName" :label="item.caption" v-for='item in projectList'>
                    </el-table-column> -->
                     <!-- <template  v-for='(item,index) in projectList'>
                            <el-table-column :prop="item.fieldName" :label="item.caption" v-if="item.fieldName != 'ID'" :width='item.width'>
                            <template slot-scope="scope">
                                    <span v-if="scope.row.fieldName === 1">公开</span>
                                    <span v-if="scope.row.fieldName === 2">限制</span>
                                    <span v-if="scope.row.fieldName === 3">秘密</span>
                                    <span v-if="scope.row.fieldName === 4">机密</span>
                                    <span v-if="scope.row.fieldName === 5">绝密</span>
                                </template>
                            </el-table-column>
                        </template> -->
                       <el-table-column  prop="2" label="档号"></el-table-column>
                       <el-table-column  prop="3" label="案卷题名" width="200"></el-table-column>
                       <el-table-column  prop="4" label="项目名称"></el-table-column>
                       <el-table-column  prop="5" label="所属部门"></el-table-column>
                       <el-table-column  prop="6" label="年度" width="50"></el-table-column>
                       <el-table-column  prop="7" label="密级" width="50">
                          
                           <template slot-scope="scope">
                               {{myMJ(scope.row[7])}}
                                    <!-- <span v-if="scope.row.prop == 1">公开</span>
                                    <span v-if="scope.row.prop === 2">限制</span>
                                    <span v-if="scope.row.prop === 3">秘密</span>
                                    <span v-if="scope.row.prop=== 4">机密</span>
                                    <span v-if="scope.row.prop=== 5">绝密</span> -->
                                </template>
                       </el-table-column>
                       <el-table-column  prop="8" label="所在位置"></el-table-column>
            
                           
                            
                    </el-table> 
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './projectFiles.service';
    @Component
    export default class appBorrowHistory extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        listLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        activeName: string;
        projectHouseName :string;
        filters: any = {};
        documentTableData: any = [];
        borrowTableData: any = [];
        powerTableData:any = [];
        projectList :any = [];
        data: any = [];
        documentShow: boolean;
        borrowShow: boolean;
        powerShow: boolean;
        formSelect: boolean;
        formInput: boolean;
        
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight -240 ;
            this.nameHeight = null;
            this.timer = false;
            this.start = 0;
            this.total = 0;
            this.page = 0;
            this.limit = 25;
            this.projectHouseName = ''
            this.activeName = '0';
            this.listLoading = false;
            this.documentShow = true;
            this.borrowShow = false;
            this.powerShow = false;
            this.formSelect = true;
            this.formInput = true;
            this.data = [];
            this.projectList = [];
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
                state:'',
                project:'',
                createDateStart:'',
                createDateEnd:'',
            };
            this.documentTableData = [];
            this.borrowTableData = [];
            this.powerTableData = [];
              this.projectList = [
                  {
                      "caption":"档号",
                      "fieldName":"0"
                  },
                  {
                      "caption":"案卷号",
                      "fieldName":"1"
                  },
                  {
                      "caption":"案卷题名",
                      "fieldName":"2"
                  },
                  {
                      "caption":"项目名称",
                      "fieldName":"3"
                  },
                  {
                      "caption":"项目编号",
                      "fieldName":"4"
                  },
                  {
                      "caption":"所属部门",
                      "fieldName":"5"
                  },
                  {
                      "caption":"年度",
                      "fieldName":"6"
                  },
                  {
                      "caption":"密级",
                      "fieldName":"7"
                  },
                  {
                      "caption":"所在位置",
                      "fieldName":"8"
                  }
              ]
        };
        //密级
        myMJ(num){
            console.log(num)
            if(num == 1) {
               return  num = "公开";
                
            }else if(num == 2){
                 return num = "限制";
            }else if(num == 3){
                 return num = "秘密";
            }else if(num == 4){
                 return num = "机密";
            }else if(num == 5){
                 return num = "绝密";
            }else{
                return null;
            }
        }
        goBack(){
            this['$router'].push({
              path:'/warehouse/houseManagement'
            })
        }
        handleCurrentChange(val) {
            this.page = val-1;
            this.start = (val-1)*(this.limit);
            this.getFiles();
        };
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page);
            this.getFiles();
        };

        // 表格初始化
        getFiles(){
            this.projectHouseName =this['$route'].params.projectName;
            let params =  Object.assign({},this.filters);
            this.listLoading = true;
        //        Service.houseListTitle({}).then(res=>{
        //        if(res.data.succeeded == true){
        //                 this.projectList = res.data.data
        //                 console.log(res.data.data)
        //                this.listLoading = false;
                   
                   
        //         }else{
        //             this.listLoading = false;
        //         }
        //    })
            Service.projectAllList({
                "projectName":this['$route'].params.objName,
                "keyword":"",
                "wareId":this['$route'].params.wareId,
                "start":this.start,
                "limit":this.limit
            }).then(res=>{
                if(res.data.succeeded == true){
                   if(res.data.data.list == null ||res.data.data.list==undefined || res.data.data.list == '' ){
                       this.documentTableData = []
                       this.listLoading = false;
                   }else{
                        this.documentTableData = res.data.data.list;
                        console.log(this.documentTableData)
                        this.total = res.data.data.totalRecords;
                        this.listLoading = false;
                        console.log(this.documentTableData)
                   }
                }else{
                    this.listLoading = false;
                }
            })
        };

        // 查看详情
        findDetails(row){
            // let searchKey = row;
            // this['$router'].push({
            //     path:'/selfTip/borrowDetails/borrowDetails',
            //     name:'借阅单详情',
            //     params:{ id: searchKey }
            // });
        };
        // 删除
        deleteRow(row){

        };

        // 修改
        modifyRow(row){

        };
        created(){

        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 240;
                })()
            };
            this.getFiles();
        };
        computed(){};
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/wareProject/projectFileSearch.scss';
    @import '../../styles/wareProject/projectSuper.scss';
</style>