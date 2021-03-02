<template>
    <section>
         <div class="titleBlue">
            <b></b>
            <span>借出档案管理</span>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow mainBorrowTop">
                <div class="formData">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="cardScreen">
                        <el-tab-pane label="借阅登记" name="0">
                        </el-tab-pane>
                        <el-tab-pane label="归还登记" name="1">
                        </el-tab-pane>
                        <el-tab-pane label="档案借阅历史" name="2">
                        </el-tab-pane>
                    </el-tabs>
                    <div class="more" v-if="activeName!='2'">
                        <el-radio-group v-model="tabPosition" @change = "tabClickRight">
                            <el-radio-button label="left">按借阅单查看</el-radio-button>
                            <el-radio-button label="right">按档案列表查看</el-radio-button>
                        </el-radio-group>
                    </div>
                    <el-form v-if="tabPosition=='left' && (activeName=='0' || activeName=='1')" :inline="true" :model="filters" class="doneForm topParamsForm doubleForm">
                        <el-form-item v-for="" class="fondName" label="借阅人："  v-if="activeName!='2'" >
                            <el-input class="checkName" style="width:125px !important" v-model="filters.userName" clearable  ></el-input>
                        </el-form-item>
                        <el-form-item class="fondName" label="标题：" >
                            <el-input class="checkName" style="width:125px !important" v-model="filters.title" clearable  ></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" v-if="activeName=='0' && tabPosition=='left'" ref="year">
                            <el-date-picker type="date" @change="changeDateA" :picker-options="pickerOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  placeholder="开始日期" class="checkName" v-model="filters.appStartDate"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date"  @change="changeDateA1" :picker-options="dateOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filters.appEndDate"  ></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="clickSearchBtn">检索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-form v-if="tabPosition=='right' && (activeName=='0' || activeName=='1')" :inline="true" :model="byArchiveCodeFilters" class="doneForm topParamsForm doubleForm">
                        <el-form-item v-for="" class="fondName" label="借阅人："  v-if="activeName!='2'" >
                            <el-input class="checkName" style="width:125px !important" v-model="byArchiveCodeFilters.userName" clearable  ></el-input>
                        </el-form-item>
                        <el-form-item class="fondName" label="标题：" >
                            <el-input class="checkName" style="width:125px !important" v-model="byArchiveCodeFilters.WJBT" clearable  ></el-input>
                        </el-form-item>
                        <el-form-item v-if="tabPosition=='right' || activeName=='2'" class="project" label="项目名称：" >
                            <el-input class="checkName" style="width:115px !important" v-model="byArchiveCodeFilters.XMMCNEW" clearable placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="clickSearchBtn">检索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-form v-if="activeName=='2'"  :inline="true" :model="JYFilters" class="doneForm topParamsForm doubleForm">
                        <el-form-item class="fondName" label="标题：" >
                            <el-input class="checkName" style="width:125px !important" v-model="JYFilters.WJBT" clearable  ></el-input>
                        </el-form-item>
                        <el-form-item  class="project" label="项目名称：" >
                            <el-input class="checkName" style="width:115px !important" v-model="JYFilters.XMMCNEW" clearable placeholder=""></el-input>
                        </el-form-item>
                         <el-form-item class="project" label="文件编号：" >
                            <el-input class="checkName" style="width:115px !important" v-model="JYFilters.WJBH" clearable placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="clickSearchBtn">检索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="jcBtn" v-if="(activeName=='0')&&(tabPosition=='right')">
                    <el-button type="primary"  class="checkWay" @click="clickBatchJCBtns()" >借出</el-button>
                </div>
                <div class="ghBtn" v-if="(activeName=='1')&&(tabPosition=='right')">
                    <el-button type="primary" class="checkWay" @click="clickBatchGhBtn()"  >归还</el-button>
                </div>
                <!--    1_1借阅列表，（按借阅单列表）(借阅登记)-->
                <div class="borderTable" v-show="tab1_1Show" style="margin-top:-35px">
                    <el-table border tooltip-effect="dark" :height="bodyHeight+25" :data="tab1_1TableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column  prop="applicationNo" label="借阅单号" width="250">
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" class="superTarget" v-if="scope.row.processNo" @click="showDetailOfListByUtilizeNo(scope.row)">{{scope.row.processNo}}</a>
                                <a href="javascript:void(0);" class="superTarget" v-else @click="showDetailOfListByUtilizeNo(scope.row)">{{scope.row.applicationNo}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="title" label="标题"  >
                        </el-table-column>
                        <el-table-column  prop="appStartDate" label="计划借阅日期" width="120" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column  prop="appEndDate" label="计划归还日期" width="120" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column  prop="fileNum" label="文档数量" width="100">
                        </el-table-column>
                        <el-table-column  prop="userName" label="借阅人" width= "80">
                        </el-table-column>
                             <el-table-column  prop="appDate" label="申请日期" width="120" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column label="操作" width="70">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="giveFilesToUser(scope.row)">借出</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange1_1" @current-change="handleCurrentChange1_1" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit1_1" :total="total1_1" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
                <!--   1_2借阅登记 按照档号查看-->
                <div class="borderTable" v-show="tab1_2Show" >
                    <el-table border tooltip-effect="dark" :height="bodyHeight-5" :data="tab1_2TableData" @selection-change="selsChange1_2"  highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column type="selection" width="55" label="#">
                        </el-table-column>
                        <el-table-column  prop="archiveDH" label="档号" width="250">
                        </el-table-column>
                        <el-table-column  prop="archiveTM" label="文件标题" >
                        </el-table-column>
                        <el-table-column  prop="archiveXMMCNEW" label="项目名称" width="155">
                        </el-table-column>
                        <el-table-column  prop="" label="借阅人" width="155">
                            <template slot-scope="scope">
                                 <span v-if="scope.row.changeUserName != null">{{scope.row.changeUserName}}</span>
                                 <span v-else>{{scope.row.up.userName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="借阅单号" width="155">
                             <template slot-scope="scope">
                                 <a href="javascript:void(0);" v-if="scope.row.processNo" @click="showDetailOfListByUtilizeNo1(scope.row)">{{scope.row.processNo}}</a>
                                 <a href="javascript:void(0);" v-else @click="showDetailOfListByUtilizeNo1(scope.row)">{{scope.row.applicationNo}}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange1_2" @current-change="handleCurrentChange1_2" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit1_2" :total="total1_2" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
                 <!--  2_1  归还登记列表 按照借阅单-->
                <div class="borderTable" v-show="tab2_1Show" style="margin-top:-35px">
                    <el-table border tooltip-effect="dark" :height="bodyHeight+25" :data="tab2_1TableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column  width="25">
                            <template slot-scope="scope">
                                <span v-if="scope.row.daysOfLight===0" class="redLight"></span>
                                <span v-if="scope.row.daysOfLight===1" class="yellowLight"></span>
                                <span v-if="scope.row.daysOfLight===2" class="greenLight"></span>
                            </template>
                            <!--<template slot-scope="scope">-->
                                <!--<span v-show="scope.row.daysOfLight<=0" class="redLight"></span>-->
                                <!--<span v-show="scope.row.daysOfLight>0  && scope.row.daysOfLight<=10" class="yellowLight"></span>-->
                                <!--<span v-show="scope.row.daysOfLight>10" class="greenLight"></span>-->
                            <!--</template>-->
                        </el-table-column>
                        <el-table-column  prop="applicationNo" label="借阅单号"  width="250">
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" class="superTarget" v-if="scope.row.processNo" @click="clickBackAppNoHref(scope.row)">{{scope.row.processNo}}</a>
                                <a href="javascript:void(0);" class="superTarget" v-else @click="clickBackAppNoHref(scope.row)">{{scope.row.applicationNo}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="title" label="标题" >
                        </el-table-column>
                        <el-table-column prop="appStartDate" label="计划借阅日期" width="120" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column  prop="appEndDate" label="计划归还日期" width="120" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column  prop="fileNum" label="文档数量"  width="100">
                        </el-table-column>
                        <el-table-column  prop="userName" label="借阅人" width= "80">
                        </el-table-column>
                        <el-table-column label="操作" width="70">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="backFileToDept(scope.row)">归还</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange2_1" @current-change="handleCurrentChange2_1" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit2_1" :total="total2_1" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
                <!--  2_2  归还登记列表 按照档号-->
                <div class="borderTable" v-show="tab2_2Show" >
                    <el-table border tooltip-effect="dark" :height="bodyHeight-5" :data="tab2_2TableData" @selection-change="selsChange2_2" highlight-current-row v-loading="listLoading"  class="indexTable containTable"  >
                        <el-table-column  width="25">
                            <template slot-scope="scope">
                                <span v-if="scope.row.up.daysOfLight===0" class="redLight"></span>
                                <span v-if="scope.row.up.daysOfLight===1" class="yellowLight"></span>
                                <span v-if="scope.row.up.daysOfLight===2" class="greenLight"></span>
                            </template>
                            <!--<template slot-scope="scope">-->
                                <!--<span v-show="scope.row.daysOfLight<=0" class="redLight"></span>-->
                                <!--<span v-show="scope.row.daysOfLight>0  && scope.row.daysOfLight<=10" class="yellowLight"></span>-->
                                <!--<span v-show="scope.row.daysOfLight>10" class="greenLight"></span>-->
                            <!--</template>-->
                        </el-table-column>
                        <el-table-column type="selection" width="55" label="#">
                        </el-table-column>
                        <el-table-column  prop="archiveDH" label="档号" width="250">
                        </el-table-column>
                        <el-table-column  prop="archiveTM" label="文件标题" >
                        </el-table-column>
                        <el-table-column  prop="archiveXMMCNEW" label="项目名称" width="155">
                        </el-table-column>
                        <el-table-column  prop="userName" label="借阅人" width="155" >
                        </el-table-column>
                        <el-table-column  prop="borrowOperatorDate"  label="计划归还日期" width="155" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column label="借阅单号" width="155">
                            <template slot-scope="scope">
                                <a href="javascript:void(0);" v-if="scope.row.processNo" @click="clickBackAppNoHref1(scope.row)">{{scope.row.processNo}}</a>
                                <a href="javascript:void(0);" v-else @click="clickBackAppNoHref1(scope.row)">{{scope.row.applicationNo}}</a>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange2_2" @current-change="handleCurrentChange2_2" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit2_2" :total="total2_2" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
                <!--档案借阅历史-->
                <div class="borderTable" v-show="showJYHistory" style="margin-top:-35px">
                    <el-table border tooltip-effect="dark" :height="bodyHeight+30" :data="borrowHistoryTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column  prop="archiveDH" label="档号" width="290">
                        </el-table-column>
                        <el-table-column  prop="archiveTM" label="标题" >
                        </el-table-column>
                        <el-table-column  prop="archiveWJBH" label="文件编号" width="155">
                        </el-table-column>
                        <el-table-column  prop="archiveXMMCNEW" label="项目名称" width="220">
                        </el-table-column>
                        <el-table-column label="历史借阅记录" width="130">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="showBorrowHistoryDetail(scope.row)">查看</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit3" :total="total3" style="float:right;">
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
    import Service from './borrowerHistory.service';
    import moment from 'moment';
    Component.registerHooks([
        'beforeRouteEnter'
    ]);
    @Component
    export default class appBorrowHistory extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        listLoading: boolean;
        pickerOptions1: any = {};

        start1_1: number;
        start1_2: number;
        start2_1: number;
        start2_2: number;
        start3: number;
        page1_1: number;
        page1_2: number;
        page2_1: number;
        page2_2: number;
        page3: number;
        limit1_1: number;
        limit1_2: number;
        limit2_1: number;
        limit2_2: number;
        limit3: number;
        total1_1: number;
        total1_2: number;
        total2_1: number;
        total2_2: number;
        total3: number;
        sels1_2: any=[];
        sels2_2: any=[];
        activeName: string;
        tabPosition: string;
        filters: any = {};
        JYFilters: any = {};
        byArchiveCodeFilters: any = {};
        documentTableData: any = [];
        borrowHistoryTableData: any = [];
        powerTableData:any = [];
        tab1_1Show: boolean;
        tab1_2Show: boolean;
        tab2_1Show: boolean;
        tab2_2Show: boolean;
        tab1_1TableData: any;
        tab1_2TableData: any;
        tab2_1TableData: any;
        tab2_2TableData: any;
        showJYHistory: boolean;
        formSelect: boolean;
        formInput: boolean;
        currentDate: any = {};
        dateOptions1: any = {};
        constructor(){
            super();
            this.pickerOptions1 = {};
            this.dateOptions1 = {};
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight-300;
            this.nameHeight = null;
            this.timer = false;
            this.start1_1 = 0;
            this.start1_2 = 0;
            this.start2_1 = 0;
            this.start2_2 = 0;
            this.start3 = 0;
            this.total1_1 = 0;
            this.total1_2 = 0;
            this.total2_1 = 0;
            this.total2_2 = 0;
            this.total3 = 0;
            this.page1_1 = 0;
            this.page1_2 = 0;
            this.page2_1 = 0;
            this.page2_2 = 0;
            this.page3 = 0;
            this.limit1_1 = 25;
            this.limit1_2 = 25;
            this.limit2_1 = 25;
            this.limit2_2 = 25;
            this.limit3 = 25;
            
            this.activeName = '0';
            this.tabPosition = 'left';
            this.listLoading = false;
            this.tab1_1Show = true;
            this.tab1_2Show = false;
            this.tab2_1Show = false;
            this.tab2_2Show = false;
            this.tab1_1TableData = [];
            this.tab1_2TableData = [];
            this.tab2_1TableData = [];
            this.tab2_2TableData = [];
            this.showJYHistory = false;
            this.formSelect = true;
            this.formInput = true;
            this.filters = {
                userName:'',
                title: '',//标题
                userDept:'',//借阅部门
                appStartDate:'',
                appEndDate:'',
            };
            this.JYFilters = {
                WJBT: '',//文件标题 WJBT 
                WJBH: '',//文件编号WJBH
                XMMCNEW: ''//项目名称XMMCNEW
            };
            this.byArchiveCodeFilters = {
                userName: '',
                WJBT: '',
                XMMCNEW: ''
            };
            this.currentDate = new Date();
        };

        // 同步借阅日期初始
        changeDateA(){
            let date = new Date(this.filters.appStartDate);
            this.dateOptions1 = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600);
                    let timer = time.setTime(time.getTime() + 3600 * 1000 * 24);
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        };
        // 同步借阅日期结束
        changeDateA1(){
            if(!this.filters.appEndDate){
                this.pickerOptions1 = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.filters.appEndDate);
                this.pickerOptions1 = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                        return timer > date;
                    }
                };
            }
        };

        clickSearchBtn(){//查询按钮
            if(this.activeName == '2'){
                this.getJYHistory();
            }else{
                if(this.tabPosition == 'left'){
                    this.getLeftDataByUtilizeNo();
                }else{
                    this.getRightDataByArchiveCode();
                }
            }
        };
        //1_1  单个 借出按钮
        giveFilesToUser(row){
            window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
            window.sessionStorage.setItem('_type', 'single');
            this['$router'].push({
                // path:'/selfTip/borrowerHistory/borrowHistoryJun',
                name:'借出档案管理借出页面'
            });
        };
        //批量借出
        clickBatchJCBtns(row,index){//借阅申请  借出按钮
            if(this.sels1_2.length == 0){
                this['$message']({
                    message: '请选择至少一条档案数据！',
                    type: 'warning'
                });
                return;
            }
            window.sessionStorage.setItem('selectionsByArchiveNo', JSON.stringify(this.sels1_2));
            window.sessionStorage.setItem('_type', 'batch1');
            this['$router'].push({
                // path:'/selfTip/borrowerHistory/borrowHistoryJun',
                name:'借出档案管理借出页面'
            });
        }
        //2_1 归还按钮
        backFileToDept(row){
            window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
            window.sessionStorage.setItem('_type', 'single');
            this['$router'].push({
                // path:'/selfTip/borrowerHistory/borrowHistoryJun',
                name:'归还档案管理详细页面'
            });
        };
        
        clickBatchGhBtn(){//归还登记 【归还】按钮跳转
            if(this.sels2_2.length == 0){
                this['$message']({
                    message: '请选择至少一条档案数据！',
                    type: 'warning'
                });
                return;
            }
            window.sessionStorage.setItem('selectionsByArchiveNo', JSON.stringify(this.sels2_2));
            window.sessionStorage.setItem('_type', 'batch');
            this['$router'].push({
                name:'归还档案管理详细页面'
            });
        };
        clickBackAppNoHref(row){//点击归还登记 借阅单超链接
            window.sessionStorage.setItem('_type', 'detail');
            window.sessionStorage.setItem('type', 'twoLeft');
            window.sessionStorage.setItem('applicationNo',row.applicationNo);
            if(row.parentAppNo){
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/selfTip/borrowDetails/borrowDetailsBackList',
                    });
                }
            }else{
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/views/selfTip/borrowerHistory/backListWin',
                    });
                }
            }
        };
        clickBackAppNoHref1(row){//点击归还登记 借阅单超链接
            window.sessionStorage.setItem('_type', 'detail');
            window.sessionStorage.setItem('type', 'twoRight');
            window.sessionStorage.setItem('applicationNo',row.applicationNo);
            if(row.up.parentAppNo){
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/selfTip/borrowDetails/borrowDetailsBackList',
                    });
                }
            }else{
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/views/selfTip/borrowerHistory/backListWin'
                    });
                }
            }
        };
        showDetailOfListByUtilizeNo(row){//查看借出详情页
            window.sessionStorage.setItem('_type', 'detail');
            window.sessionStorage.setItem('type', 'oneLeft');
            window.sessionStorage.setItem('applicationNo',row.applicationNo);
            if(row.parentAppNo){
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/selfTip/borrowDetails/borrowDetailsHistory',
                    });
                }
            }else{
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/views/selfTip/borrowerHistory/borrowHistoryLen',
                    });
                }
            }
        };
        showDetailOfListByUtilizeNo1(row){//查看借出详情页
            window.sessionStorage.setItem('_type', 'detail');
            window.sessionStorage.setItem('type', 'oneRight');
            window.sessionStorage.setItem('applicationNo',row.applicationNo);
            if(row.parentAppNo){
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/selfTip/borrowDetails/borrowDetailsHistory',
                    });
                }
            }else{
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/views/selfTip/borrowerHistory/borrowHistoryLen',
                    });
                }
            }
        };
        showBorrowHistoryDetail(row){
            window.sessionStorage.setItem('clickedShowHistoryRow', JSON.stringify(row));
            window.sessionStorage.setItem('_type', 'history');
            window.sessionStorage.setItem('type', 'oneLeft');
            window.sessionStorage.setItem('typeOnly', 'only');
            window.sessionStorage.setItem('applicationNo',row.applicationNo);
            if(row.processNo){
                window.sessionStorage.setItem('node','4');
                window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                window.sessionStorage.setItem('backFile','5');
                this['$router'].push({
                    path:'/selfTip/examCheck/peopleRefuseCheck',
                });
            }else{
                window.sessionStorage.setItem('clickedRow', JSON.stringify(row));
                this['$router'].push({
                    name:'借阅历史详情页面'
                });
            }
        };
        selsChange1_2(sels){//借阅申请多选框
            this.sels1_2 = sels;
        }
        selsChange2_2(sels){
            this.sels2_2 = sels;
        }
        handleCurrentChange1_1(val) {
            this.page1_1 = val-1;
            this.start1_1 = val-1;
            this.getLeftDataByUtilizeNo();
        };
        handleCurrentChange1_2(val) {
            this.page1_2 = val-1;
            this.start1_2 = val-1;
            this.getRightDataByArchiveCode();
        };
        handleCurrentChange2_1(val) {
            this.page2_1 = val-1;
            this.start2_1 = val-1;
            this.getLeftDataByUtilizeNo();
        };
        handleCurrentChange2_2(val) {
            this.page2_2 = val-1;
            this.start2_2 = val-1;
            this.getRightDataByArchiveCode();
        };
        handleCurrentChange3(val) {
            this.page3 = val-1;
            this.start3 = val-1;
            this.getJYHistory();
        };
        handleSizeChange1_1(val) {
            this.limit1_1 = val;
            this.start1_1 = 0;
            this.page1_1 = 0;
            this.getLeftDataByUtilizeNo();
        };
        handleSizeChange1_2(val) {
            this.limit1_2 = val;
            this.start1_2 = 0;
            this.page1_2 = 0
            this.getRightDataByArchiveCode();
        };
        handleSizeChange2_1(val) {
            this.limit2_1 = val;
            this.start2_1 = 0;
            this.page2_1=0;
            this.getLeftDataByUtilizeNo();
        };
        handleSizeChange2_2(val) {
            this.limit2_2 = val;
            this.start2_2 = 0;
            this.page2_2=0;
            this.getRightDataByArchiveCode();
        };
        handleSizeChange3(val) {
            this.limit3 = val;
            this.start3 = 0;
            this.page3=0;
            this.getJYHistory();
        };
        //时间格式化
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        }
        DateMinus(endDate){ 
          　var edate = new Date(endDate); 
          　var now = this.currentDate;//
            var days = edate.getTime() - now.getTime(); 
            var day = Number(days / (1000 * 60 * 60 * 24)); 
          　return day; 
          }
        getLeftDataByUtilizeNo(){
            let param = {
                appType: 2 ,
                auditStatus: 0,
                start: 0,
                limit: 25
            };
            if(this.activeName == '0'){
                param.auditStatus = 7;//待借出
                param.start = this.start1_1;
                param.limit = this.limit1_1;
            }
            if(this.activeName == '1'){
                param.auditStatus = 8;//待归还
                param.start = this.start2_1;
                param.limit = this.limit2_1;
            }
            let me = this;
            let params = Object.assign({}, param, this.filters);
            Service.getBorrowReturnListByUtilizeNo(params).then((res) =>{
                if(res && res.data && res.data.succeeded){
                    if(me.activeName == '0'){
                        me.total1_1 = res.data.totalRecords;
                        me.tab1_1TableData = res.data.data;
                    }else{
                        me.total2_1 = res.data.totalRecords;
                        me.tab2_1TableData = res.data.data;//.content;
                    }
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        };
        getRightDataByArchiveCode(){
            let param = {
                appType: 2 ,
                auditStatus: 0,
                start: 0,
                limit: 25
            };
            if(this.activeName == '0'){
                param.auditStatus = 7;
                param.start = this.start1_2;
                param.limit = this.limit1_2;
            }
            if(this.activeName == '1'){
                param.auditStatus = 8;
                param.start = this.start2_2;
                param.limit = this.limit2_2;
            }
            let me = this;
            let params = Object.assign({}, param, this.byArchiveCodeFilters);
            Service.getBorrowReturnListByArchiveCode(params).then((res) =>{
                if(res && res.data && res.data.succeeded){
                    if(me.activeName == '0'){
                        me.total1_2 = res.data.totalRecords;
                        me.tab1_2TableData = res.data.data;
                    }else{
                        me.total2_2 = res.data.totalRecords;
                        let redAttr = [];//红
                        let yellowAttr = [];//黄
                        let greenAttr = [];//绿
                        let otherAttr = [];//其他
                        res.data.data.forEach(function(item){
                            item.borrowOperatorDate = item.up.appEndDate;
                            if(item.up.daysOfLight == 0){
                                redAttr.push(item);
                            }else if(item.up.daysOfLight == 1){
                                yellowAttr.push(item);
                            }else if(item.up.daysOfLight == 2){
                                greenAttr.push(item);
                            }else{
                                otherAttr.push(item);
                            }
                        });
                        me.tab2_2TableData = [];
                        redAttr.sort(function(a,b){
                            return Date.parse(a.borrowOperatorDate) - Date.parse(b.borrowOperatorDate);//时间正序
                        });
                        yellowAttr.sort(function(a,b){
                            return Date.parse(a.borrowOperatorDate) - Date.parse(b.borrowOperatorDate);//时间正序
                        });
                        greenAttr.sort(function(a,b){
                            return Date.parse(a.borrowOperatorDate) - Date.parse(b.borrowOperatorDate);//时间正序
                        });
                        otherAttr.sort(function(a,b){
                            return Date.parse(a.borrowOperatorDate) - Date.parse(b.borrowOperatorDate);//时间正序
                        });
                        //me.tab2_2TableData = res.data.data;
                        redAttr.forEach(function(item){
                            me.tab2_2TableData.push(item);
                        });
                        yellowAttr.forEach(function(item){
                            me.tab2_2TableData.push(item);
                        });
                        greenAttr.forEach(function(item){
                            me.tab2_2TableData.push(item);
                        });
                        otherAttr.forEach(function(item){
                            me.tab2_2TableData.push(item);
                        });
                    }
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        };

        getJYHistory(){
            let param = {
                appType: 2 ,
                start: this.start3,
                limit: this.limit3
            };
            let me = this;
            let params = Object.assign({}, param, this.JYFilters);//
            Service.getBorrowHistoryDataList(params).then((res) =>{
                if(res && res.data && res.data.succeeded){
                    me.total3 = res.data.totalRecords;//totalRecords;
                    me.borrowHistoryTableData= res.data.data;
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        };

        // 切换状态
        tabClickRight(){//内层两个tab
            if(this.tabPosition==='left'){
                if(this.activeName == '0'){
                    this.tab1_1Show = true;
                    this.tab1_2Show = false;
                    // if(this.tab1_1TableData.length == 0){
                        this.getLeftDataByUtilizeNo();
                    // }
                }
                else{
                    this.tab2_1Show = true;
                    this.tab2_2Show = false;
                    // if(this.tab2_1TableData.length == 0){
                        this.getLeftDataByUtilizeNo();
                    // }
                }
            }else{
                if(this.activeName == '0'){
                    this.tab1_1Show = false;
                    this.tab1_2Show = true;
                    // if(this.tab1_2TableData.length == 0){
                        this.getRightDataByArchiveCode();
                    // }
                }
                else{
                    this.tab2_1Show = false;
                    this.tab2_2Show = true;
                    // if(this.tab2_2TableData.length == 0){
                        this.getRightDataByArchiveCode();
                    // }
                }
            }
        };

        handleClick(){//外层3个tab
            this.tabPosition = 'left';
            if(this.activeName == '0'){
                this.tab1_1Show = true;
                this.tab1_2Show = false;
                this.tab2_1Show = false;
                this.tab2_2Show = false;
                this.showJYHistory = false;
                // if(this.tab1_1TableData.length==0){
                    this.getLeftDataByUtilizeNo();
                // }
            }else if(this.activeName == '1'){
                this.tab1_1Show = false;
                this.tab1_2Show = false;
                this.tab2_1Show = true;
                this.tab2_2Show = false;
                this.showJYHistory = false;
                // if(this.tab2_1TableData.length==0){
                    this.getLeftDataByUtilizeNo();
                // }
            }else {
                this.tab1_1Show = false;
                this.tab1_2Show = false;
                this.tab2_1Show = false;
                this.tab2_2Show = false;
                this.showJYHistory = true;
                if(this.borrowHistoryTableData.length==0){
                    this.getJYHistory();
                }
            }
        };
        beforeRouteEnter(to,from,next){
           next(vm=>{
               // if(from.name=='借出档案管理借出页面'||from.name=='归还档案管理详细页面' ){
                   vm.getLeftDataByUtilizeNo();
                   vm.getRightDataByArchiveCode();
                   vm.getJYHistory();
               // }
           })
        }
        
        created(){

        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 300;
                    if(document.documentElement.clientWidth<700){
                        this.bodyHeight = document.documentElement.clientHeight-340;
                    }
                })()
            };
            this.getLeftDataByUtilizeNo();//借阅登记表格初始化
        };
        computed(){};
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/borrowHistory.scss';
</style>