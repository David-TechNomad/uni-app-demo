<template>
    <section>
        <header>借阅档案统计</header>
        <!--<p>档案数量统计(分别以集团,公司,档案库为单位,事件段可选择)</p>-->
        <div class="container">
            <div class="companyContainer">
                <p>档案库全宗</p>
                <div class="tree">
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
            </div>
            <div class="messageContainer">
                <div class="mainCon mainBorrow mainBorrowTops" style="position:relative;">
                    <el-tabs v-model="activeName" @tab-click="handleClick" >
                        <el-tab-pane label="当前借出档案数量" name="one">
                        </el-tab-pane>
                        <el-tab-pane label="历年借出数量统计" name="two">
                        </el-tab-pane>
                    </el-tabs>
                    <div class="childrenCount" v-show="activeName=='two'">包含子全宗
                        <el-checkbox v-model="childrenCount" @change="childchange"></el-checkbox>
                    </div>
                </div>
                <div class="messageItem" v-show="activeName=='one'">
                    <div class="messageItemContainer">
                        <p><b>{{fondName}}</b><span>  </span><i>  截止目前共    借出档案  <b style="color:red">  {{borrowCount}}</b>  份</i><i>超期未还档案  <b style="color:red">  {{initBorrowCount}}  </b>  份</i></p>
                        <el-table
                                :data="StoreData"
                                style="width:100%"
                                ref="table"
                                :stripe="true"
                                :max-height="tableHeight"
                                class="containTable indexTable"
                        >
                            <el-table-column prop="fondsName"  label="全宗"></el-table-column>
                            <el-table-column prop="borrowCount" label="借出"></el-table-column>
                            <el-table-column prop="timeOutCount" label="超期"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="messageItem" v-show="activeName=='two'">
                    <div class="messageItemTitle">
                        <b>{{fondName}}<b>选择统计年份</b></b>
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
                            <el-button class="checkWay" @click="beforeBorrow">筛选</el-button>
                        </div>
                    </div>
                    <div class="messageItemContainer messageItemContainersss" style="top: 45px;">
                        <el-table
                                :data="StoreData1"
                                style="width:100%"
                                ref="table"
                                :stripe="true"
                                :height="tableHeights"
                                class="containTable indexTable"
                        >
                            <el-table-column prop="Name"  :label="childrenCount?'全总名':'案卷库'"></el-table-column>
                            <template v-for="son in yearArr">
                                <el-table-column :prop="son.pro" :label="son.lab"></el-table-column>
                            </template>
                            <el-table-column prop="total"  label="总计"></el-table-column>
                        </el-table>
                        <div class="lineChartss" ref="lineChart"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import echarts from 'echarts';
    import Service from './CountBorrow.Service'
    @Component
    export default class CountBorrow extends Vue{
        defaultProps:any={};
        activeName:string;
        fondName:string;//全宗名称
        fondId:number;//全宗ID
        childrenCount:boolean;//是否携带子全宗
        time1:string;
        time2:string;
        begintime:any;
        endtime:any;
        StoreData:any=[];
        StoreData1:any = [];
        tableHeight:number;
        tableHeights:number;
        tableHeightss:number;
        lineChart:any=null;
        borrowCount:number;
        initBorrowCount:number;
        yearArr:any=[];
        Xdata:any=[];
        Ydata:any=[];
        Coldata:any=[]
        constructor(){
            super();
            this.defaultProps={
                isLeaf: 'hasChildren',
                label: 'fondName',
                id: 'id'
            };
            this.activeName = 'one';
            this.fondName = '';
            this.childrenCount = false;
            this.time1 = '';
            this.time2 = '';
            this.StoreData = [];
            this.StoreData1 = [];
            this.tableHeight = (document.documentElement.clientHeight-246)/2;
            this.tableHeights =  (document.documentElement.clientHeight-246)/2;
            this.tableHeightss = document.documentElement.clientHeight-278;
            this.borrowCount = 0;
            this.initBorrowCount = 0;
            this.yearArr = [];
            this.Xdata=[];
            this.Ydata = [];
            this.Coldata = [];
        };
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
                            treeData.push(item)
                        });
                        resolve(treeData);
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                })
            }
        };

        //公司树的点击
        NodeClick(data){
            this.activeName = 'one';
            this.fondName = '';
            this.childrenCount = false;
            this.time1 = '';
            this.time2 = '';
            this.StoreData = [];
            this.StoreData1 = [];
            this.fondName = data.fondName;
            this.fondId = data.id;
            if(this.activeName == "one"){
                this.borrowSumOfFile(this.fondId);
            }else if(this.activeName == "two"){
            }
        }
        //tab页的替换
        handleClick(tab){
            if(tab.name=='two'){
                setTimeout(()=>{
                    this.initlineChart();
                    var that = this;
                    that.lineChart.resize();
                    window.addEventListener('resize',that.lineChart.resize);
                },0);
            }else if(tab.name=='one'){
                var that = this;
                window['removeEventListener']('resize',that.lineChart.resize);
                this.borrowSumOfFile(this.fondId)
            }
        }
        childchange(){
            if(this.time1!=''&&this.time2!=''){
                this.beforeBorrow();
            };
        };
         /**********************历史借出统计*****************************/
        borrowSumOfFile(id){
            Service.currentBorrowArchiveCount({
                fondId:id
            }).then(res=>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    this.StoreData = data;
                    this.borrowCount = data[0].borrowCount;
                    this.initBorrowCount = data[0].timeOutCount;
                }else{
                    this.Warn(res.data.errorMessage);
                }
            })
        }
        /******************************************************/

        /****************时间的选择*************************************/
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

        beforeBorrow(){
            this.Xdata = [];
            this.Ydata = [];
            this.yearArr = [];
            this.Coldata = [];
            this.StoreData1 = [];
            var beginTime = new Date(this.time1).getFullYear();
            var endTime = new Date(this.time2).getFullYear();
            for(var i= beginTime;i<=endTime;i++){
                this.yearArr.push({lab:i+'',pro:i+''});
                this.Xdata.push(i+'')
            };
            Service.getAllDateOfYear({fondsId:this.fondId,yearBegin:beginTime,yearEnd:endTime,childrenCount:this.childrenCount}).then(res=>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    for(var son of data){
                        var obj = {
                            Name:son.fondsName,
                            total:son.total
                        };
                       for(var item of this.yearArr){
                           if(item.lab in son){
                               obj[item.lab] = son[item.lab]
                           }else{
                               obj[item.lab] = 0;
                           }
                       };
                       this.Ydata.push(son.fondsName);
                       this.StoreData1.push(obj)
                    };
                     for(var son of this.Ydata){
                         var datas= [];
                         for(var item of this.StoreData1){
                             if(item.Name===son){
                                 for(var key in item){
                                     if(key!=='total'&&key!=='Name'){
                                         datas.push(item[key]);
                                     };
                                 };
                             };
                         };
                         var obj =  {
                             name: son,
                             type: 'bar',
                             stack: '总量',
                             label: {
                                 normal: {
                                     show: true,
                                     position: 'insideRight'
                                 }
                             },
                             data: datas
                         };
                         this.Coldata.push(obj);
                     }
                     console.log(this.Coldata)
                    this.initlineChart();
                }else{
                    this.Warn(res.data.errorMessage);
                }
            })

        }
        /**************************抓取数据*************************************/

        /*________________echart的初始化____________________________________________*/
        //折线
        initlineChart(){
            this.lineChart = echarts.init(this['$refs']['lineChart']);
            var Xdata = this.Xdata;
            var Ydata = this.Ydata;
            var Coldata = this.Coldata;
            this.lineChart.setOption( {
                    tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: Ydata
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'category',
                    data: Xdata
                },
                yAxis: {
                    type: 'value',
                    
                },
                series: Coldata
            })
        }

        created(){
            this.begintime = this.beginDate();
            this.endtime = this.endDate();
            this.borrowSumOfFile(null);
        }
        mounted(){
            window.addEventListener('resize',()=>{
                return (()=>{
                    this.tableHeight = (document.documentElement.clientHeight-246)/2;
                    this.tableHeights =(document.documentElement.clientHeight-246)/2;
                    this.tableHeightss = document.documentElement.clientHeight-278;
                })()
            });
            var that = this;
        }
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
    }
</script>

<style scoped lang="scss">
    @import '../../styles/static/CountBorrow.scss';
</style>