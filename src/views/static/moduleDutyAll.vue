<template>
    <section>
    <div class="mainTitle">项目档案权属档案录入任务</div>
    <div class="mainDoc">
            <div class="formData" id="formData">
                <el-form :inline="true" :model="filters" class="topParamsForm doubleForm">
                     <el-form-item class="company" label="项目名称：" ref="fullName">
                         <el-input class="checkName" v-model="filters.projectName" placeholder="单行输入"></el-input>
                     </el-form-item>
                     <el-form-item class="year" label="完成时间：" ref="year" label-width="70px">
                         <el-date-picker type="date"  @change="changeDateA" :picker-options="pickerOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filters.completeBegin"></el-date-picker>
                         <span style="margin:0 10px">至</span>
                         <el-date-picker type="date"  @change="changeDateA1" :picker-options="dateOptions1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filters.completeEnd" ref="endDate"></el-date-picker>
                     </el-form-item>
                     <el-form-item class="company" label="负责人：" ref="userName">
                         <el-input class="checkName" v-model="filters.userName" placeholder="单行输入"></el-input>
                     </el-form-item>
                     <el-form-item label="状态：" prop="completeType" ref="completeType">
                           <el-select class="checkName" v-model="filters.completeType">
                                <el-option v-for="item in selectAttr" :key="item.code" :label="item.displayText" :value="item.code">
                                </el-option>
                           </el-select>
                     </el-form-item>
                     <el-form-item>
                         <el-button class="checkWay" @click="searchList(1)">检索</el-button>
                     </el-form-item>
                </el-form>
            </div>
            <div class="borderTable">
               <el-table tooltip-effect="dark" border :height="bodyHeight" :data="tableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                    <el-table-column :show-overflow-tooltip="true" prop="" label="" width="50">
                        <template slot-scope="scope">
                            <span v-if="scope.row.gq == 1" class="redLight"></span>
                        </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="completeDate" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.completeDate == null">未完成</span>
                            <span v-else>已完成</span>
                        </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="projectName" label="项目名称">
                        <template slot-scope="scope">
                            <span v-if="scope.row.completeDate == null">{{scope.row.projectName}}</span>
                            <span v-else class="superChange" @click="lendModalOut(scope.row)">{{scope.row.projectName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fileContent" label="描述">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="userName" label="负责人">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="count" label="文件数量">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="createDate" label="接收日期" :formatter="dateFormat1">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="planDate" label="截止日期" :formatter="dateFormat1">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="completeDate" label="实际完成日期" :formatter="dateFormat1">
                    </el-table-column>
               </el-table>
               <!--工具条分页-->
               <el-col :span="24" class="pager">
                   <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                   </el-pagination>
               </el-col>
            </div>
    </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './modeleDutyAll.service';
    import moment from 'moment';
    @Component
    export default class appborrow extends Vue{
        fileVisible: boolean;
        bodyHeight: number;
        start: number;
        total: number;
        page: number;
        limit: number;
        a: any = {};
        b: any = {};
        fileForm: any = {};
        ruleForm: any = {};
        openForm: any = {};
        filters: any = {};
        tableData: any = [];
        selectAttr：any = [];
        roleSelect: any = [];
        error: any = {};
        tableParams: any = {};
        title:'';
        fullName:'';
        jobname:'';
        unitname:'';
        loginName:'';
        date:string;
        a:boolean;
        b:boolean;
        c:string;
        d:string;
        dateOptions1:any = {};
        pickerOptions1: any = {};
        constructor(){
            super();
            this.fileVisible = false;
            this.fileForm = {
                roleIds:[],
                userId:''
            };
            this.openForm = {

            };
            this.a = {
                roleIds:[],
                userId:''
            };
            this.b = {
                fullName:'',
                loginName:'',
                page:'0',
                pageSize:'25'
            };
            this.limit = 10;
            this.filters = {
                projectName:'',
                userName:'',
                completeType:'',
                listType:'',
                completeBegin:'',
                completeEnd:'',
                page:0,
                pageSize:10,
                sort:''
            };
            this.ruleForm = {
                jobname: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                unitname: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                loginName: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                roleName: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                roleIds: [
                    { required: true, message: '请选择', trigger: 'change' }
                ]
            };

            this.tableData = [];
            this.roleSelect = [];
            this.tableParams = {
                  userId:'',
                  roleIds:'',
            };
            this.selectAttr = [
                {code:null,displayText:'所有'},
                {code:1,displayText:'已完成'}
                {code:2,displayText:'未完成'}
            ];
            this.date = '';
            this.dateOptions1 = {};
            this.pickerOptions1 = {};
        };

        handleCurrentChange(val) {
            this.filters.page = val-1;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.filters.pageSize = val;
            this.getFiles();
        };

        searchList(i){
            this.getFiles(i);
        }

        //获取用户信息


        // 提交任务详情页
        lendModalOut(obj):void{
            window.sessionStorage.setItem('z_Module',JSON.stringify(obj));
            if(obj.completeDate == null){//未完成
                this['$router'].push({
                    path:'/selfTip/moduleDuty/moduleDutyDetail',
                })
            }else{//已完成
                this['$router'].push({
                    path:'/selfTip/moduleDuty/yiBanmoduleDuty',
                })
            }
        };

        renderheader(h, { column, $index }) {
             return h('span', {}, [
                h('span', {}, column.label.split('|')[0]),
                h('br'),
                h('span', {}, column.label.split('|')[1])
             ])
        }

        getFiles(i){
            if(i == 1){
                this.filters.page = 0;
            }
            let parames = {
                projectName:this.filters.projectName,
                userName:this.filters.userName,
                completeType:this.filters.completeType,
                listType:null,
                completeBegin:this.filters.completeBegin,
                completeEnd:this.filters.completeEnd,
                page:this.filters.page,
                pageSize:this.filters.pageSize,
                sort:''
            };
            Service.list(parames).then((res) =>{
                if(res.data.succeeded){
                    let riQi = this.dateFormat(this.date);//当前日期
                    this.tableData = res.data.data;
                    for(let child of this.tableData){
                        let riQi1 = this.dateFormat(child.planDate);//截止日期
                        let riQi2 = this.dateFormat(child.completeDate);//实际完成时间
                        if(riQi > riQi1 && child.completeDate == null){
                            child.gq = 1;
                        }else if(child.completeDate != null && riQi1 < riQi2){
                            child.gq = 1;
                        }else{
                            child.gq = 2;
                        }
                    }
                    this.total = res.data.totalRecords;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        }

        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        }

        //时间格式化
        dateFormat(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }

        // 同步借阅日期初始
        changeDateA(){
            let date = new Date(this.filters.completeBegin);
            this.dateOptions1 = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600);
                    let timer = time.setTime(time.getTime() + 3600 * 1000 * 24);
                    return timer< date;
                }
            };
        };

        // 同步借阅日期结束
        changeDateA1(){
            if(!this.filters.completeEnd){
                this.pickerOptions1 = {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.filters.completeEnd);
                this.pickerOptions1 = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        return timer > date;
                    }
                };
            }
        };

        created(){
            this.getFiles();
            let shiJian = new Date();
            this.date = shiJian.toString();
        }

         mounted(){
              let height = document.getElementById("formData").offsetHeight;
              this.bodyHeight = document.documentElement.clientHeight-173-height;
         };

    };


</script>

<style lang="scss" scoped>
    @import '../../styles/system/projectManagement/projectManagement.scss';
</style>