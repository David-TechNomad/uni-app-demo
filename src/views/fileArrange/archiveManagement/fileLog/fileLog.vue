<template>
    <section class="fileLog">
        <div class="fileLogHeader">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">档案管理</p>

            <span>档案日志</span>
            <el-button class="checkWay" @click="back">返回</el-button>
        </div>
        <div class="fileLogContain">
            <div class="fileLogContainForm">
                <el-form :model="searchform" class="WFform">
                    <el-form-item label="标题 :">
                        <el-input v-model="searchform.title"></el-input>
                    </el-form-item>
                    <el-form-item label="操作事项 :">
                        <el-select v-model="searchform.matter" >
                            <el-option v-for="ind in dictData" :label="ind.typeText" :value="ind.type" :key="ind.type"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="操作时间段 :" class="timeItem">
                        <el-date-picker placeholder="年/月/日" v-model="searchform.timestart" :picker-options="dateOptions" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" ref="timestart" @change="selectEndTime"></el-date-picker>
                        <el-date-picker placeholder="年/月/日" v-model="searchform.timeend"  :picker-options="dateOptionsA" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" ref="timeend" @change="selectEndTime1"></el-date-picker>
                    </el-form-item>
                    <el-button class="checkWay" @click="search">检索</el-button>
                </el-form>
            </div>
            <div class="fileLogContainTable">
                <el-table
                        :data="data"
                        style="width:100%"
                        ref="tableOne"
                        :stripe="true"
                        height="100%"
                        width="100%"
                        border
                        class="containTable indexTable"
                >
                    <el-table-column prop="rankType" width="90px" label="类型"></el-table-column>
                    <el-table-column prop="dh" width="265px" label="(案卷/文件)档号"></el-table-column>
                    <el-table-column prop="tm" width="420px" label="(案卷/文件)标题"></el-table-column>
                    <el-table-column prop="operationTypeText" width="90px" label="操作事项"></el-table-column>
                    <el-table-column prop="createPerson" width="90px" label="操作人"></el-table-column>
                    <el-table-column prop="createDate" width="170px" label="操作时间"></el-table-column>
                </el-table>
            </div>
            <div class="logpage">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[500,800,1000]" :page-size="limit" :total="total"   :current-page="page"></el-pagination>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './fileLog.service';
    @Component
    export default class fileLog extends Vue{
        searchform:any = {};
        dictData:any = [];
        data:any = [];
        libid:number;
        fondCode:string;
        page:number;
        start:number;
        limit:number;
        total:number;
        dateOptionsA:any={};
        dateOptions:any={}
       constructor(){
           super();
           this.searchform={
               title:null,
               matter:null,
               timestart:null,
               timeend:null
           };
           this.dictData=[];
           this.data = [];
           this.page = 1;
           this.limit = 500;
           this.total = 0;
           this.dateOptionsA={};
           this.dateOptions={};
       };

        handleCurrentChange(val) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            this.searchArchiveLog({libId:this.libid,qzh:this.fondCode,tm:this.searchform.title,operationType:this.searchform.matter,startDate: this.searchform.timestart,endDate: this.searchform.timeend,pageNo:this.page,pageSize:this.limit})
        };
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page-1);
            this.searchArchiveLog({libId:this.libid,qzh:this.fondCode,tm:this.searchform.title,operationType:this.searchform.matter,startDate: this.searchform.timestart,endDate: this.searchform.timeend,pageNo:this.page,pageSize:this.limit})
        };
        // 日期开始 任务列表
        selectEndTime(){
            let date = new Date(this.searchform.timestart);
            this.dateOptionsA = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600)
                    let timer =  time.getTime();
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date;
                }
            };
        };

        selectEndTime1(){
            if(!this.searchform.timeend){
                this.dateOptions= {
                    disabledDate() {
                        return null
                    }
                };
            }else{
                let date = new Date(this.searchform.timeend);
                this.dateOptions = {
                    disabledDate(time) {
                        date.setTime(date.getTime() - 3600)
                        let timer =  time.getTime();
                        return timer > date;
                    }
                };
            }
        }
       //获取档案日志
        searchArchiveLog(params){
            Service.searchArchiveLog(params).then(res=>{
                if(res.data.succeeded){
                    this.data = res.data.data;
                    this.page = res.data.page;
                    this.total = res.data.totalRecords
                }else{
                   this.getError(res.data.errorMessage);
                };
            });
        };
        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
        search(){
            this.searchform={
                title:this.searchform.title,
                matter:this.searchform.matter,
                timestart:this.searchform.timestart,
                timeend:this.searchform.timeend
            };
            this.searchArchiveLog({libId:this.libid,qzh:this.fondCode,tm:this.searchform.title,operationType:this.searchform.matter,startDate: this.searchform.timestart,endDate: this.searchform.timeend,pageNo:1,pageSize:100})
        }
        created(){
           var str = window.sessionStorage.getItem('TofileLog');
           var obj = JSON.parse(str);
           this.libid = obj.libId;
           this.fondCode = obj.fondCode;
            this.searchArchiveLog({libId:this.libid,qzh:this.fondCode,tm:this.searchform.title,operationType:this.searchform.matter,startDate: this.searchform.timestart,endDate: this.searchform.timeend,pageNo:this.page,pageSize:this.limit})
           Service.operationTypes({}).then(res=>{
               if(res.data.succeeded){
                   this.dictData=res.data.data;
               }else{
                   this.getError(res.data.errorMessage);
               }
           })
        };
        back():void{
            this['$router'].go(-1);
        };
    }
</script>

<style scoped lang="scss">
    @import '../../../../styles/archiveManage/fileLogStyle.scss';
</style>