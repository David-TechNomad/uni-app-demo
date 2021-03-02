<template>
    <section>
       <div class="mainTitle">移交档案统计   </div>
        <div class="container">
            <div class="companyContainer">
                <p v-show="dangCount" class="title">移交档案数量统计（统计数据包含案卷数及括号内的档案总数）</p>
                <p v-show="yearsCount" class="title">移交档案数量统计（分别以及集团、公司、档案库为单位，时间级可选择）</p>
                <div class="tree">
                    <p>档案库全宗</p>
                    <el-tree
                            node-key="id"
                            @node-click="NodeClick"
                            :default-expand-all="false"
                            :lazy="true"
                            :load="treeLoad"
                            :props="defaultProps"
                            ref="Companytree"
                    >
                    </el-tree>
                </div>
                    <div class="messageContainer">
                        <el-tabs v-model="activeName" @tab-click="handleClick" >
                            <el-tab-pane label="当前移交档案总数" name="one">
                            </el-tab-pane>
                            <el-tab-pane label="历年移交档案数量" name="two">
                            </el-tab-pane>
                        </el-tabs>
                        <div class='containBox' v-show="dangCount">
                            <div class="counTitles" >
                                <p>
                                    <span> <b>{{fondName}}</b></span>
                                    <span>  移交档案 案卷数量：<b style="color:red">{{AllFileNumber}}  </b>  卷内文件数：<b style="color:red">{{ArchiveNumber}}</b></span>
                                </p>
                                <div style="width:100%;margin-top:10px;">
                                    <el-table border stripe  :data="liveData" v-loading="listLoading" class="indexTable containTable" :height="bodyHeight">
                                        <el-table-column  prop="treeName" label="案卷库">
                                        </el-table-column>
                                        <el-table-column prop="fileCount" label="案卷数">
                                        </el-table-column>
                                        <el-table-column  prop="archiveCount" label="卷内文件数">
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div style="position:absolute;z-index:999;left:57%;top:29%">
                                    <el-form :model="liveFilters" :inline="true">
                                            <el-form-item label="" class="SelectItem checkName">
                                                <el-select v-model="liveFilters.role" @change="selectGet" style="width:85%">
                                                    <el-option label="案卷数" value="1"></el-option>
                                                    <el-option label="卷内文件数" value="2"></el-option>
                                                </el-select>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <div style="width:50%;height:100%;float:left" v-show="dangCount">
                                    <div ref='myEchart' style="width:100%;height:100%;"></div>
                            </div>
                     </div>
                        <div class="counTitle" v-show="yearsCount">
                            <div class="messageItemTitle">
                                <span><b>{{fondName}}</b><span>选择统计年份</span></span>
                                <div>
                                    <el-date-picker
                                            class="messageItemTime"
                                            v-model="time1"
                                            type="year"
                                            :picker-options="begintime"
                                            placeholder="选择年份">
                                    </el-date-picker>
                                    至
                                    <el-date-picker
                                            class="messageItemTime"
                                            v-model="time2"
                                            type="year"
                                            :picker-options="endtime"
                                            placeholder="选择年份">
                                    </el-date-picker>
                                    <el-button class="checkWay" @click="transforBefore">筛选</el-button>
                                </div>
                                <span style="float:right;height:40px;line-height: 40px">移交档案数量  <b style="color: red">{{allnumber}}</b></span>
                            </div>
                            <div class='chartBox1'>
                                <el-table border stripe  :data="yearsData" :height="windowHeight" v-loading="listLoading" class="indexTable containTable">
                                    <el-table-column  prop="name" label="案卷库">
                                    </el-table-column>
                                    <template v-for="son in yearArr">
                                        <el-table-column  :prop="son.pro" :label="son.lab">
                                        </el-table-column>
                                    </template>
                                    <el-table-column  prop="total" label="总计">
                                    </el-table-column>
                                </el-table>
                                <el-form :model="liveFilters" :inline="true">
                                            <el-form-item label="" class="SelectItem checkName">
                                                <el-select v-model="liveFilters.role1" placeholder="请选择角色" @change="selectGet1" style="width:85%">
                                                    <el-option label="案卷数" value="1"></el-option>
                                                    <el-option label="卷内文件数" value="2"></el-option>
                                                </el-select>
                                        </el-form-item>
                                </el-form>
                                 <div class='chartBox' style="width:100%;height:100%;">
                                    <div v-show="yearsCount" ref='cutChart' style="width:100%;height:60%;"></div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './transferedFiles.service';
    import { Loading } from 'element-ui';
    import moment from 'moment';
    import echarts from 'echarts'
    @Component
    export default class personCount extends Vue{
        windowHeight: number;
        bodyHeight:number;
        listLoading:boolean;
        activeName: string;
        dangCount:boolean;
        yearsCount:boolean;
        defaultProps:any={};
        liveData:any = [];
        liveFilters:any = {};
        chart:any = null;
        cutCharts:any = null;
        Allyears:any = {};
        yearsData:any = [];
        fondId:number;
        AllFileNumber:number;
        ArchiveNumber:number;
        yearArr:any=[];
        time1:string;
        time2:string;
        begintime:any;
        endtime:any;
        fondName:string;
        olddata:any=[];
        allnumber:number;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight-500;
            this.bodyHeight = document.documentElement.clientHeight-250;
            this.listLoading = false;
            this.activeName = 'one';
            this.yearsCount = false;
            this.dangCount = true;
            this.defaultProps={
                isLeaf: 'hasChildren',
                label: 'fondName',
                id: 'id'
            }
            this.liveData = [];
            this.liveFilters = {
                role:"1",
                role1:"1"
            };
            this.Allyears = {};
            this.yearsData = [];
            this.AllFileNumber = null;
            this.ArchiveNumber = null;
            this.yearArr = [];
            this.time1 = null;
            this.time2= null;
            this.fondName = null;
            this.olddata = [];
            this.allnumber = null;
        }
        //档案树 点击
        NodeClick(data){
            this.activeName = 'one';
            this.yearsCount = false;
            this.dangCount = true;
            this.liveData = [];
            this.liveFilters = {
                role:"1",
                role1:"1"
            };
            this.Allyears = {};
            this.yearsData = [];
            this.AllFileNumber = null;
            this.ArchiveNumber = null;
            this.fondId = data.id;
            this.fondName = data.fondName;
            this.transforNow();
        }
        //懒加载树
        treeLoad(node, resolve) {
            if (node.level === 0) {
                Service.getSonUrl({}).then(res => {
                    if (res.data.succeeded) {
                        let treeData = [];
                        let data = res.data.data;
                        for (var item of data) {
                            let leaf = item.hasChildren;
                            item.hasChildren = !leaf;
                        }
                        ;
                        data.forEach(item => {
                            item.fondName = item.fondName;
                            treeData.push(item)
                        });
                        resolve(treeData);
                    } else {
                        this.getError(res.data.errorMessage);
                    }  ;
                });
            } else {
                var id = node.data.id;
                Service.getFondChild(id).then(res => {
                    if (res.data.succeeded) {
                        let treeData = [];
                        let data = res.data.data;
                        for (var item of data) {
                            let leaf = item.hasChildren;
                            item.hasChildren = !leaf;
                        }
                        ;
                        data.forEach(item => {
                            item.fondName = item.fondName;
                            treeData.push(item)
                        });
                        resolve(treeData);
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                })
            }
        };
        /************************************图形*******************************************************/
        //饼图
        initChart(){
            this.chart = echarts.init(this['$refs']['myEchart']);
            var arr = [];
            if(this.liveFilters.role=='1'){
                for(var son of this.liveData){
                    var obj = {
                        name:son.treeName,
                        value:son.fileCount,
                    };
                    arr.push(obj);
                }
            }else{
                for(var son of this.liveData){
                    var obj = {
                        name:son.treeName,
                        value:son.archiveCount,
                    };
                    arr.push(obj);
                }
            }
            this.chart.setOption({
                tooltip : {
                        trigger: 'item'
                    },
                 series : [
                            {
                                name: '',
                                type: 'pie',
                                radius: '55%',
                                center:['50%','50%'],
                                label:{
                                    normal:{
                                        formatter:"{a}{b}:{c}({d}%)"
                                    }
                                },
                                data:arr
                            }
                        ]
            })
        };
        /***********************************折线图*******************************************/
        formatter(val){
            return val.name.split('').join('\n')
        }
        //折线
        initcutChart(){
            var yarr = [];
            for(var son of this.yearArr){
                yarr.push(son.lab)
            };
            var valuearr = [];
            for(var son of this.olddata){
                var obj = {name:son.treeName};
                for(var item of this.yearArr){
                    if(item.lab in son){
                        if(this.liveFilters.role1=='1'){
                            obj[item.lab] = son[item.lab].fileCount;
                        }else{
                            obj[item.lab] = son[item.lab].archiveCount;
                        }
                    }else{
                        obj[item.lab] = 0;
                    };
                };
                valuearr.push(obj);
            };
            var linearr = [];
            for(var ind of valuearr){
                var str = [];
                for(var key in ind){
                    if(key!='name'){
                        str.push(ind[key]);
                    };
                };
                var obj ={
                    name:ind.name,
                    type:'line',
                    stack: '总量',
                    data:str
                };
                linearr.push(obj);
            }
            this.cutCharts = echarts.init(this['$refs']['cutChart']);
            this.cutCharts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '6%',
                        top:'6%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: yarr
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: linearr
            })
        }
        //当前档案与历年档案切换
        handleClick(tab){
            if(tab.name =='one'){
                this.dangCount = true;
                this.yearsCount = false;
                 setTimeout(()=>{
                     this.chart();
                    this.chart.resize();
                    window.onresize = this.chart.resize;
                },300)
            }else if(tab.name =='two'){
                this.dangCount = false;
                this.yearsCount = true;
                 setTimeout(()=>{ 
                    this.initcutChart();
                    this.cutCharts.resize();
                    window.onresize = this.cutCharts.resize;
                },300);
            }

        }
        selectGet(value){
            this.initChart();
        }
        selectGet1(){
            this.initcutChart();
        }
         /****************************************当前借出统计*******************************************/
         transforNow(){
             this.listLoading = true;
             Service.currentTransferArchiveCount({fondsId:this.fondId}).then(res=>{
                   if(res.data.succeeded){
                       this.listLoading = false;
                       this.liveData = res.data.data.treeInfoList;
                       this.AllFileNumber = res.data.data.fileTotal;
                       this.ArchiveNumber = res.data.data.archiveTotal;
                       this.initChart()
                   }else{
                       this.getError(res.data.errorMessage);
                   }
             })
         }
        /*****************************************历年借出统计******************************************/
        transforBefore(){
            if(this.time1!=null&&this.time2!=null){
                var time1 = this.time1.toLocaleString().substr(0,4);
                var time2 = this.time2.toLocaleString().substr(0,4);
                this.yearArr = [];
                this.yearsData =[];
                this.olddata = [];
                for(var i=time1;i<=time2;i++){
                    var ii = i+'';
                    this.yearArr.push({lab:ii,pro:ii});
                }
                Service.historyTransferArchiveCount({
                    "fondsId":this.fondId,
                    "yearBegin":time1/1,
                    "yearEnd":time2/1,
                }).then(res=>{
                    if(res.data.succeeded){
                        let data=JSON.stringify(res.data.data.historyTransferList);
                        this.olddata = JSON.parse(data);
                        this.allnumber = res.data.data.fileTotal;
                        for(var son of res.data.data.historyTransferList){
                            var obj = {name:son.treeName};
                            var str1 =0;
                            var str2 =0;
                            for(var item of this.yearArr){
                                if(item.lab in son){
                                    obj[item.lab] = son[item.lab].fileCount+'('+son[item.lab].archiveCount+')';
                                    str1 = str1+son[item.lab].fileCount;
                                    str2 = str2+son[item.lab].archiveCount;
                                }else{
                                    obj[item.lab] = 0+'('+0+')';
                                    str1 = str1+0;
                                    str2 = str2+0;
                                };
                            };
                            obj['total'] = str1+'('+str2+')';
                            this.yearsData.push(obj)
                        }
                        this.initcutChart();
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }
        }
        /*****************************************时间************************************************/
        beginDate(){
            const self = this;
            return {
                disabledDate(time){
                    if (self.time2) {  //如果结束时间不为空，则小于结束时间
                        return new Date(self.time2).getTime() < time.getTime()
                    } else {
                        return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
                    }
                }
            }
        };
        endDate(){
            const  self = this;
            return {
                disabledDate(time) {
                    if (self.time1) {  //如果开始时间不为空，则结束时间大于开始时间
                        return new Date(self.time1).getTime() > time.getTime()
                    } else {
                        return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
                    }
                }
            }
        };
        /*****************************************信息************************************************/

        //警告信息
        Warn(message: string) {
            this['$message']({
                type: 'warning',
                message
            });
        };
        //请求失败
        getError(message: string) {
            this["$message"]({
                message,
                type: 'error'
            });
        };
        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };
        created(){
            this.begintime = this.beginDate();
            this.endtime = this.endDate();
        }
        mounted(){
        var that = this;
         this.initChart()
        window.addEventListener('resize',() => {
            return (() => {
                this.bodyHeight = document.documentElement.clientHeight-250;
                this.windowHeight = document.documentElement.clientHeight-500;
            })()
        })
         window.addEventListener('resize',that.chart.resize)
    };
    }
</script>

<style scoped lang="scss">
@import '../../styles/static/transferedFiles.scss';
</style>