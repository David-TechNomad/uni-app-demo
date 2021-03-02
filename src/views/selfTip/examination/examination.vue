<template>
    <section>
        <div class="mainTitle">
            <div class="mainTitle">
                <span>审批事项</span>
            </div>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow mainBorrowTop">
                <div class="formData">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                        <el-tab-pane name="0">
                            <span slot="label">档案借阅审批
                                <span class="checkNum" v-if="numData[0]!==0">{{this.numData[0]}}</span>
                            </span>
                        </el-tab-pane>
                        <el-tab-pane name="1">
                            <span slot="label">档案移交审批<span class="checkNum" v-if="numData[1]!==0">{{this.numData[1]}}</span></span>
                        </el-tab-pane>
                        <el-tab-pane name="2">
                            <span slot="label">借阅人变更审批<span class="checkNum" v-if="numData[2]!==0">{{this.numData[2]}}</span></span>
                        </el-tab-pane>
                        <el-tab-pane name="3">
                            <span slot="label">档案员权限审批<span class="checkNum" v-if="numData[3]!==0">{{this.numData[3]}}</span></span>
                        </el-tab-pane>
                        <el-tab-pane name="4">
                            <span slot="label">全宗创建审批<span class="checkNum" v-if="numData[4]!==0">{{this.numData[4]}}</span></span>
                        </el-tab-pane>
                    </el-tabs>
                    <el-form :inline="true" :model="filters" class="topParamsForm doubleForm" v-show="filterShow1">
                        <el-form-item label="审批状态：" label-width="70px">
                            <el-select class="checkName" v-model="state" >
                                <!--@change="examSearch('1')"-->
                                <el-option label="待审批" value="1"></el-option>
                                <el-option label="已审批" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-for="" class="project" label-width="70px" label="标题：" ref="project">
                            <el-input class="checkName" v-model="filters.title" clearable placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year" label-width="70px">
                            <el-date-picker type="date"  @change="changeDateA" :picker-options="pickerOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filters.appStartDate"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date"  @change="changeDateA1" :picker-options="dateOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filters.appEndDate" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-for="" class="fondName" label="申请人：" ref="fondName" label-width="70px">
                            <el-input class="checkName" v-model="filters.userName" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="examSearch('1')">检索</el-button>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true" :model="filtersFile" class="topParamsForm doubleForm" v-show="filterShow2">
                        <el-form-item label="审批状态：" label-width="70px">
                            <el-select class="checkName" v-model="filtersFile.status">
                                <el-option label="待审批" value="1"></el-option>
                                <el-option label="已审批" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-for="" class="project" label-width="70px" label="标题：" ref="project">
                            <el-input class="checkName" v-model="filtersFile.title" clearable placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year" label-width="70px">
                            <el-date-picker type="date"  @change="changeDateB" :picker-options="pickerOptions2" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filtersFile.beginTime"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date" @change="changeDateB1" :picker-options="dateOptions2" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filtersFile.endTime" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-for="" class="fondName" label="申请人：" ref="fondName" label-width="70px">
                            <el-input class="checkName" v-model="filtersFile.applyUser" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="examSearch('2')">检索</el-button>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true" :model="filtersPeople" class="topParamsForm doubleForm" v-show="filterShow3">
                        <el-form-item label="审批状态：" label-width="70px">
                            <el-select class="checkName" v-model="filtersPeople.status">
                                <el-option label="待审批" value="0"></el-option>
                                <el-option label="已审批" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-for="" class="project" label-width="70px" label="标题：" ref="title">
                            <el-input class="checkName" v-model="filtersPeople.title" clearable placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year" label-width="70px">
                            <el-date-picker type="date"  @change="changeDateC" :picker-options="pickerOptions3" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filtersPeople.startCreateDate"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date" @change="changeDateC1" :picker-options="dateOptions3" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filtersPeople.endCreateDate" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-for="" class="fondName" label="申请人：" ref="fondName" label-width="70px">
                            <el-input class="checkName" v-model="filtersPeople.createUserName" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="examSearch('3')">检索</el-button>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true" :model="filtersPower" class="topParamsForm doubleForm" v-show="filterShow4">
                        <el-form-item label="审批状态：" label-width="70px">
                            <el-select class="checkName" v-model="filtersPower.status">
                                <el-option label="待审批" value="5"></el-option>
                                <el-option label="已审批" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-for="" class="project" label-width="70px" label="标题：" ref="project">
                            <el-input class="checkName" v-model="filtersPower.title" clearable placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year" label-width="70px">
                            <el-date-picker type="date"  @change="changeDateD" :picker-options="pickerOptions4" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filtersPower.appStartDate"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date"  @change="changeDateD1" :picker-options="dateOptions4" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filtersPower.appEndDate" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-for="" class="fondName" label="申请人：" ref="fondName" label-width="70px">
                            <el-input class="checkName" v-model="filtersPower.applyUserName" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="examSearch('4')">检索</el-button>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true" :model="filtersTransfer" class="topParamsForm doubleForm" v-show="filterShow5">
                        <el-form-item label="审批状态：" label-width="70px">
                            <el-select class="checkName" v-model="filtersTransfer.dealttype">
                                <el-option :key="1" label="待审批" value="1"></el-option>
                                <el-option :key="2" label="已审批" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-for="" class="project" label-width="70px" label="标题：" ref="project">
                            <el-input class="checkName" v-model="filtersTransfer.title" clearable placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year" label-width="70px">
                            <el-date-picker type="date"  @change="changeDateE" :picker-options="pickerOptions5" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filtersTransfer.startDate"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date"  @change="changeDateE1" :picker-options="dateOptions5" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filtersTransfer.endDate" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-for="" class="fondName" label="申请人：" ref="fondName" label-width="70px">
                            <el-input class="checkName" v-model="filtersTransfer.createUser" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="examSearch('5')">检索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!--列表(1)-->
                <div class="borderTable" v-show="documentShow" style="margin-left:-10px;">
                    <appBorrowExamination ref="examination" :bodyHeight = "bodyHeight" :filters ="filters" :start="start1" :state="state" v-model="getFiles"></appBorrowExamination>
                </div>

                <!--列表(2)-->
                <div class="borderTable" v-show="borrowShow" style="margin-left:-10px;">
                    <appFileExamination ref="examinationFile" :bodyHeight = "bodyHeight" :filters ="filtersFile"></appFileExamination>
                </div>

                <!--列表(3)-->
                <div class="borderTable" v-show="powerShow" style="margin-left:-10px;">
                    <appBorrowPeopleExamination ref="examinationPeople" :bodyHeight = "bodyHeight" :filters ="filtersPeople" :state="state" v-model="getFiles"></appBorrowPeopleExamination>
                </div>

                <!--列表(4)-->
                <div class="borderTable" v-show="rightShow" style="margin-left:-10px;">
                    <appPowerExamination ref="examinationPower" :bodyHeight = "bodyHeight" :filters ="filtersPower" :state="state" v-model="getFiles"></appPowerExamination>
                </div>

                <!--列表(5)-->
                <div class="borderTable" v-show="companyShow" style="margin-left:-10px;">
                    <appFondsExamination ref="examinationFonds" :bodyHeight = "bodyHeight" :filters ="filtersTransfer"></appFondsExamination>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './examination.service';
    import appBorrowExamination from './borrowExamination';
    import appBorrowPeopleExamination from './borrowPeopleExamination';
    import appPowerExamination from './powerExamination';
    import appFondsExamination from './fondsExamination';
    import appFileExamination from './fileExamination';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component({
        components:{
            appBorrowExamination,
            appBorrowPeopleExamination,
            appPowerExamination,
            appFondsExamination,
            appFileExamination
        }
    })
    export default class appExamination extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        numOne: boolean;
        numTwo: boolean;
        numThree: boolean;
        numFour: boolean;
        numFive: boolean;
        filterShow1: boolean;
        filterShow2: boolean;
        filterShow3: boolean;
        filterShow4: boolean;
        filterShow5: boolean;
        listLoading: boolean;
        start: number;
        start1: number;
        total: number;
        limit: number;
        activeName: string;
        state: string;
        dateOptions1: any = {};
        pickerOptions1: any = {};
        dateOptions2: any = {};
        pickerOptions2: any = {};
        dateOptions3: any = {};
        pickerOptions3: any = {};
        dateOptions4: any = {};
        pickerOptions4: any = {};
        dateOptions5: any = {};
        pickerOptions5: any = {};
        filters: any = {};
        filtersFile: any = {};
        filtersPeople: any = {};
        filtersPower: any = {};
        filtersTransfer: any = {};
        documentTableData: any = [];
        borrowTableData: any = [];
        powerTableData:any = [];
        numData:any = [];
        data: any = [];
        documentShow: boolean;
        borrowShow: boolean;
        powerShow: boolean;
        rightShow: boolean;
        companyShow: boolean;
        $refs: { getFiles: HTMLFormElement,geProptFiles: HTMLFormElement };
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 313 ;
            this.nameHeight = null;
            this.numOne = false;
            this.numTwo = false;
            this.numThree = false;
            this.numFour = false;
            this.numFive = false;
            this.timer = false;
            this.start = 0;
            this.start1 = 0;
            this.total = 0;
            this.limit = 25;
            this.activeName = '0';
            this.state = '1';
            this.filterShow1 = true;
            this.filterShow2 = false;
            this.filterShow3 = false;
            this.filterShow4 = false;
            this.filterShow5 = false;
            this.listLoading = false;
            this.documentShow = true;
            this.borrowShow = false;
            this.powerShow = false;
            this.rightShow = false;
            this.companyShow = false;
            this.data = [];
            this.numData = [0,0,0,0,0];
            this.dateOptions1 = {};
            this.pickerOptions1 = {};
            this.dateOptions2 = {};
            this.pickerOptions2 = {};
            this.dateOptions3 = {};
            this.pickerOptions3 = {};
            this.dateOptions4 = {};
            this.pickerOptions4 = {};
            this.dateOptions5 = {};
            this.pickerOptions5 = {};
            this.filters = {
                userName:'',
                title:'',
                appStartDate:'',
                appEndDate:'',
            };

            this.filtersTransfer = {
                createUser:'',
                dealttype:'1',
                title:'',
                startDate:'',
                endDate:'',
                start:0,
                limit:25,
            };
            this.filtersFile = {
                applyUser:'',
                status:'1',
                title:'',
                beginTime:'',
                endTime:'',
                page:1,
                pageSize:25,
            };
            this.filtersPeople = {
                createUserName:'',
                status:'0',
                title:'',
                startCreateDate:'',
                endCreateDate:'',
                page:0,
                pageSize:25,
            };
            this.filtersPower = {
                applyUserName:'',
                status:'5',
                title:'',
                appStartDate:'',
                appEndDate:'',
                page:'0',
                pageSize:'25',
            };
            this.documentTableData = [

            ];
            this.borrowTableData = [

            ];
            this.powerTableData = [

            ];
        };

        // 档案审批刷新
        beforeRouteEnter(to, from, next) {
            next(vm =>{
                vm.getCount();
                vm.examSearch('1');
                if (from.name === '档案审批'||from.name === '借阅档案审批详情'||from.name === '借阅档案审批签收') {
                    vm.examSearch('1');
                }else if(from.name === '全宗创建审批'){
                    vm.examSearch('5');
                }else if(from.name === '借阅人变更审批'){
                    vm.examSearch('3');
                }else if(from.name === '驳回借阅人变更审批'){
                    vm.examSearch('3');
                }else if(from.name === '档案移交审批' || from.name === '档案移交申请修改' || from.name === '相关档案的跨全宗修改'){
                    vm.examSearch('2');
                }else if(from.name === '档案员权限审批' || from.name === '档案员权限开通修改' || from.name === '档案员变更申请修改'){
                    vm.examSearch('4');
                }else{
                    let state = window.sessionStorage.getItem('examState');
                    if(state&&state==='1'){
                        vm.examSearch(1);
                        window.sessionStorage.setItem('examState','0');
                    }else if(state&&state==='2'){
                        vm.examSearch('5');
                        window.sessionStorage.setItem('examState','0');
                    }
                    else if(state&&state==='3'){
                        vm.examSearch('3');
                    }
                }
            });
            next();
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

        // 同步借阅日期初始
        changeDateB(){
            let date = new Date(this.filtersFile.beginTime);
            this.dateOptions2 = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600);
                    let timer = time.setTime(time.getTime() + 3600 * 1000 * 24);
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        };
        // 同步借阅日期结束
        changeDateB1(){
            if(!this.filtersFile.endTime){
                this.pickerOptions2 = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.filtersFile.endTime);
                this.pickerOptions2 = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                        return timer > date;
                    }
                };
            }
        };

        // 同步借阅日期初始
        changeDateC(){
            let date = new Date(this.filtersPeople.startCreateDate);
            this.dateOptions3 = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600);
                    let timer = time.setTime(time.getTime() + 3600 * 1000 * 24);
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        };
        // 同步借阅日期结束
        changeDateC1(){
            if(!this.filtersPeople.endCreateDate){
                this.pickerOptions3 = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.filtersPeople.endCreateDate);
                this.pickerOptions3 = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                        return timer > date;
                    }
                };
            }
        };

        // 同步借阅日期初始
        changeDateD(){
            let date = new Date(this.filtersPower.appStartDate);
            this.dateOptions4 = {
                disabledDate(time) {
                    //date.setTime(date.getTime() - 3600);
                    //let timer =  time.getTime();
                    let timer = time.setTime(time.getTime() + 3600 * 1000 * 24);
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer < date;
                }
            };
        };
        // 同步借阅日期结束
        changeDateD1(){
            if(!this.filtersPower.appEndDate){
                this.pickerOptions4 = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.filtersPower.appEndDate);
                this.pickerOptions4 = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                        return timer > date;
                    }
                };
            }
        };

        // 同步借阅日期初始
        changeDateE(){
            let date = new Date(this.filtersTransfer.startDate);
            this.dateOptions5 = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600);
                    let timer = time.setTime(time.getTime() + 3600 * 1000 * 24);
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        };
        // 同步借阅日期结束
        changeDateE1(){
            if(!this.filtersTransfer.endDate){
                this.pickerOptions5 = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.filtersTransfer.endDate);
                this.pickerOptions5 = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                        return timer > date;
                    }
                };
            }
        };

        // 点击查询
        examSearch(obj){
            if(obj === '1'){
                if(this.state==='1'){
                    this.start1 = 0;
                    this.$refs["examination"].getFiles();
                }else if(this.state==='2'){
                    this.start1 = 0;
                    this.$refs["examination"].geProptFiles();
                }
            }else if(obj === '2'){
                this.$refs["examinationFile"].getFiles();
            }else if(obj === '3'){
                this.$refs["examinationPeople"].getFiles();
            }else if(obj === '4'){
                this.$refs["examinationPower"].getFiles();
            }else if(obj === '5'){
                this.$refs["examinationFonds"].getFiles();
            }
        };

        handleClick(){
            if(this.activeName === '0'){
                this.documentShow = true;
                this.filterShow1 = true;
                this.filterShow2 = false;
                this.filterShow3 = false;
                this.filterShow4 = false;
                this.filterShow5 = false;
                this.borrowShow = false;
                this.powerShow = false;
                this.rightShow = false;
                this.companyShow = false;
            }else if(this.activeName === '1'){
                this.filterShow1 = false;
                this.filterShow2 = true;
                this.filterShow3 = false;
                this.filterShow4 = false;
                this.filterShow5 = false;
                this.documentShow = false;
                this.borrowShow = true;
                this.powerShow = false;
                this.rightShow = false;
                this.companyShow = false;
                this.$refs["examinationFile"].getFiles();
            }else if(this.activeName === '2'){
                this.filterShow1 = false;
                this.filterShow2 = false;
                this.filterShow3 = true;
                this.filterShow4 = false;
                this.filterShow5 = false;
                this.documentShow = false;
                this.borrowShow = false;
                this.powerShow = true;
                this.rightShow = false;
                this.companyShow = false;
                this.$refs["examinationPeople"].getFiles();
            }
            else if(this.activeName === '3'){
                this.filterShow1 = false;
                this.filterShow2 = false;
                this.filterShow3 = false;
                this.filterShow4 = true;
                this.filterShow5 = false;
                this.documentShow = false;
                this.borrowShow = false;
                this.powerShow = false;
                this.rightShow = true;
                this.companyShow = false;
                this.$refs["examinationPower"].getFiles();
            }else if(this.activeName === '4'){
                this.filterShow1 = false;
                this.filterShow2 = false;
                this.filterShow3 = false;
                this.filterShow4 = false;
                this.filterShow5 = true;
                this.documentShow = false;
                this.borrowShow = false;
                this.powerShow = false;
                this.rightShow = false;
                this.companyShow = true;
                this.$refs["examinationFonds"].getFiles();
            }
            this.start = 0;
            this.start1 = 0;
            // this.getFiles();
        };

        // 删除
        deleteRow(row){

        };

        created(){

        };

        // 调取数量
        getCount(){
            // 加载数据个数
            Service.getEachCount({}).then(res=>{
                if(res.data.succeeded){
                    if(res.data.data&&res.data.data.length>0){
                        this.numData = [];
                        for(let i=0;i<5;i++){
                            if(i===0){
                                let arr = [];
                                for(let da of res.data.data){
                                    if(da[1]==='档案借阅审批'){
                                        this.numData.push(da[0]);
                                        arr.push(da[0])
                                    }
                                };
                                if(arr.length===0){
                                    this.numData.push(0)
                                }
                            }else if(i===1){
                                let arr = [];
                                for(let da of res.data.data){
                                    if(da[1]==='档案移交审批'){
                                        this.numData.push(da[0]);
                                        arr.push(da[0])
                                    }
                                };
                                if(arr.length===0){
                                    this.numData.push(0)
                                }
                            }else if(i===2){
                                let arr = [];
                                for(let da of res.data.data){
                                    if(da[1]==='借阅人变更审批'){
                                        this.numData.push(da[0]);
                                        arr.push(da[0])
                                    }
                                };
                                if(arr.length===0){
                                    this.numData.push(0)
                                }
                            }else if(i===3){
                                let arr = [];
                                for(let da of res.data.data){
                                    if(da[1]==='档案员权限审批'){
                                        this.numData.push(da[0]);
                                        arr.push(da[0])
                                    }
                                };
                                if(arr.length===0){
                                    this.numData.push(0)
                                }
                            }else if(i===4){
                                let arr = [];
                                for(let da of res.data.data){
                                    if(da[1]==='全宗创建审批'){
                                        this.numData.push(da[0]);
                                        arr.push(da[0])
                                    }
                                };
                                if(arr.length===0){
                                    this.numData.push(0)
                                }
                            }
                        }
                    }
                }else{
                    this['$message']({
                        message: '查询待办数量错误！',
                        type: 'error'
                    });
                }
            })
        }

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 313;
                })()
            };
            // this.getCount();
        };
        computed(){};
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/borrow.scss';
</style>