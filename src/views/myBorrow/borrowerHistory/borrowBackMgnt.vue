<template>
        <section class="wrapprSection">
            <div class="mainTitle">
               <span>出入库管理</span>
            </div>
            <div class="contentbox contentbox-full "> 
                <el-tabs v-model="activeName" type="card" class="erpTab"  @tab-click="handleClick">                           
                    <el-tab-pane label="借出登记" name="1" >
                    </el-tab-pane>
                    <el-tab-pane label="归还登记" name="2">                                   
                    </el-tab-pane>
                </el-tabs> 
                <div class="searchKey boxshow">           
                    <el-form :inline="true" :model="searchFormModel" size="small"> 
                        <el-form-item label="查阅人:">
                            <el-input v-model="searchFormModel.borrowOperatorName"   ></el-input>
                        </el-form-item>              
                        <el-form-item label="申请日期:">
                            <el-date-picker v-model="searchFormModel.startDate"  type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker v-model="searchFormModel.endDate"   type="date"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期"  ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="defaultBtn" @click="searchResult">检索</el-button>
                        </el-form-item>
                        <el-form-item style="float:right;">
                             <el-button class="defaultBtn" v-if="activeName=='1'" @click="lendFn()">借出</el-button>
                            <el-button class="defaultBtn" v-if="activeName=='2'" @click="returnFn()">归还</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="searchBorrowCon">                                
                        <el-table
                            :data="tableDataList"
                            border
                            :height="bodyHeight"
                            element-loading-text="努力加载中..."
                            header-row-class-name="tableHeader" 
                            @selection-change="handleSelectionChange"
                            v-loading="loading"
                            stripe 
                            class="defaultTable">
                            <el-table-column type="selection"  width="55">
                            </el-table-column>
                            <el-table-column  prop="name" label="操作"  width="150">
                                <template slot-scope="scope">                                                 
                                    <el-button class="tabletoolBtn" @click="showDetail(scope.row)">查阅单详情</el-button>
                                    <el-button class="tabletoolBtn" v-if="activeName=='1'" @click="printing(scope.row)">打印</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="applicationNo" label="查阅单号">
                            </el-table-column>
                            <el-table-column prop="archiveDH" label="档号">
                            </el-table-column>
                            <el-table-column prop="archiveTM" label="文档标题">  
                            </el-table-column>
                            <el-table-column prop="receivedPersonName" label="取件人" width="90">                                      
                            </el-table-column>
                            <el-table-column prop="controlId" label="控制标识" width="90">                                      
                            </el-table-column>
                            <el-table-column prop="appDate" label="申请日期" :formatter="BorrowUtils.dateFormat" width="120">                                      
                            </el-table-column>
                            <el-table-column prop="description" label="查阅内容">                                      
                            </el-table-column>
                        </el-table>  
                        <div class="clear" style="margin-top:10px">                         
                            <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                        </div>  
                    </div> 
                  </div>
            </div>    
        </section>
    </template>
    <script lang="ts">
        import Vue from 'vue';
        import Component from 'vue-class-component';
        import Service from './borrowBackMgnt.service';
        import { Loading } from 'element-ui';
        import BorrowUtils from '@/views/myBorrow/utils/borrowUtilsApi.js';
        Vue.prototype.BorrowUtils = BorrowUtils;
        @Component
        export default class appBorrow extends Vue{
            bodyHeight: number= document.documentElement.clientHeight - 303 ; 
            activeName: string = '1';
            searchFormModel: any = {
                'borrowOperatorName':'',
                'startDate':'',
                'endDate':''
            };
            tableDataList: any =[];
            total: number = 0;
            chooseIdS: any =[];
            loading: Boolean= false;
            page: number = 1;
            pageSize: number = 25;                  
            
            searchResult(){
                let params = {
                    page: this.page -1,
                    pageSize: this.pageSize,
                    arcStatus: Number(this.activeName)
                };
                let _this = this;
                params = Object.assign(params,this.searchFormModel);
                this.loading = true;
                Service.findBorrowUtilizeInfo(params).then(res=>{
                    if(res.data.succeeded){
                        this.total = res.data.data.totalElements;
                        this.tableDataList = res.data.data.content;
                        for(let data of this.tableDataList){
                            data.archiveTM = _this.BorrowUtils.removeEM(data.archiveTM);
                            data.archiveDH = _this.BorrowUtils.removeEM(data.archiveDH);
                        }
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this['$message']({
                                message: '获取列表失败',
                                type: 'error'
                            });
                    }
                });
            };
        
            //   显示查阅单详情
            showDetail(row){
                window.sessionStorage.setItem('borrowBackMgnt_activeName', this.activeName); 
                window.sessionStorage.setItem('borrowDetail_returnPath', '/myBorrow/borrowerHistory/borrowBackMgnt');
                window.sessionStorage.setItem('borrowDetail_applicationNo', row.applicationNo);
                this['$router'].push({
                    path:"/myBorrow/borrowDetail/borrowDetail",
                })
            };
            // 打印
            printing(row){
                let loadingInstance = Loading.service({
                    lock: true,
                    text: '正在提交，请稍等',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                Service.printODO({
                    "applicationNo": row.applicationNo
                }).then((res) =>{
                    loadingInstance.close();
                    if(res.type=='application/json') {
                        let that = this;
                        let reader = new FileReader();
                        reader.readAsText(res);
                        reader.onload = function(event) {
                            // 文件里的文本会在这里被打印出来
                            let str = JSON.parse(event.target.result)
                            that.Warn(str.errorMessage);
                        };
                    } else {
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            let csvData = new Blob([res],{type: 'application/pdf'});
                            window.navigator.msSaveOrOpenBlob(csvData,'document.pdf');
                        }else{
                            let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
                            window.open(url);
                        }
                    }
                });
            }
            handleClick(){
                this.page = 1;
                this.total = 0;
                this.searchResult();
            };
            handleSelectionChange(val) {
                this.chooseIdS = [];
                for(let item of val) {
                    this.chooseIdS.push(item.id);
                }
            }
            returnFn() {
                let self = this;
                if(this.chooseIdS.length !== 0) {
                    self['$confirm']('您是否要归还?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        let params = {
                            arcStatus: 3,//接收改为3
                            ids: this.chooseIdS
                        };
                        Service.updateUtilizeInfoArcstatus(params).then(res => {
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '归还成功！',
                                    type: 'success'
                                });
                                this.searchResult();
                            }else{
                                this['$message']({
                                    message: '归还失败！',
                                    type: 'error'
                                });
                            }
                        });
                    });
                } else {
                    this.Warn("请选择要归还的数据");
                }
            };
            lendFn() {
                let self = this;
                if(this.chooseIdS.length !== 0) {
                    self['$confirm']('您是否要借出?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading = true;
                        let params = {
                            arcStatus: 5,// 1:未借出，2：待归还，3：已归还,4:已取消，5：待接收
                            ids: this.chooseIdS
                        };
                        Service.updateUtilizeInfoArcstatus(params).then(res => {
                            this.loading = false;
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '借出成功！',
                                    type: 'success'
                                });
                                this.searchResult();
                            }else{
                                this['$message']({
                                    message: '借出失败！',
                                    type: 'error'
                                });
                            }
                        });
                    });
                } else {
                    this.Warn("请选择要借出的数据");
                }
            };
            handleCurrentChange(val:number) {
                this.page = val;   
                this.searchResult();       
            };
            handleSizeChange(val:number) {
                this.pageSize = val; 
                this.searchResult();    
            };
                //成功
            Suces(message){
                this['$message']({
                    type: 'success',
                    message
                })
            };
            //警告信息
            Warn(message:string){
                this['$message']({
                    type: 'warning',
                    message
                });
            };
            created(){            
            };
        
            mounted(){
                this.activeName = window.sessionStorage.getItem('borrowBackMgnt_activeName') || this.activeName;
                this.searchResult();
                window.sessionStorage.removeItem('borrowBackMgnt_activeName');
                window.onresize = () => {
                    return (() => {
                        this.bodyHeight = document.documentElement.clientHeight - 303;
                    })()
                };
            };
        }
    </script>
    <style lang="scss" scoped>
        @import '../../../styles/myBorrow/borrow.scss';
    </style>