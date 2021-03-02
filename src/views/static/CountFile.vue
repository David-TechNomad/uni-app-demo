<template>
    <section>
       <header>档案数量统计</header>
       <p>档案数量统计(分别以集团,公司,档案库为单位,事件段可选择)</p>
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
                        <el-tab-pane label="各库档案数量" name="one">
                        </el-tab-pane>
                        <el-tab-pane label="历年新增档案数量" name="two">
                        </el-tab-pane>
                        <el-tab-pane label="未整理档案数量" name="three">
                        </el-tab-pane>
                    </el-tabs>
                    <div class="childrenCount" v-show="activeName=='one'">包含子全宗
                        <el-checkbox v-model="childrenCount1" @change="childChange1"></el-checkbox>
                    </div>
                    <div class="childrenCount" v-show="activeName=='two'">包含子全宗
                        <el-checkbox v-model="childrenCount2" @change="childChange2"></el-checkbox>
                    </div>
                    <div class="childrenCount" v-show="activeName=='three'">包含子全宗
                        <el-checkbox v-model="childrenCount3" @change="childChange3"></el-checkbox>
                    </div>
                </div>
                <div class="messageItem" v-show="activeName=='one'">
                    <p>{{fondName}}</p>
                    <div class="messageItemContainer">
                        <div class="messageItemContainerL lt">
                            <p>档案数量<span>{{totalNumber}}</span></p>
                            <el-table
                                    :data="StoreData"
                                    style="width:100%"
                                    ref="table"
                                    :stripe="true"
                                    :max-height="tableHeight"
                                    class="containTable indexTable"
                                    >
                                    <el-table-column prop="name"  label="案卷库"></el-table-column>
                                    <el-table-column prop="value" label="档案数量"></el-table-column>
                                    <el-table-column prop="value1" label="卷内文件数"></el-table-column>
                            </el-table>
                            <!--子全宗档案数量总计{{SontotalNumber}}-->
                            <p style="margin-top:10px;" v-show="childrenCount1">
                            <span>{{SontotalNumber}}</span>个公司 <span>{{SontotalNumber1}}</span>案卷数 <span>{{SontotalNumber2}}</span>卷内文件数</p>
                        </div>
                        <div class="messageItemContainerR lt" ref="pieChart"></div>
                    </div>
                </div>
                <div class="messageItem MessageItemScroll" v-show="activeName=='two'">
                    <div class="messageItemTitle">
                        <span>{{fondName}}<span>选择统计年份</span></span>
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
                            <el-button class="checkWay" @click="FindYear">筛选</el-button>
                        </div>
                    </div>
                    <div class="messageItemContainer messageItemContainersss">
                            <el-table
                                    :data="StoreData2"
                                    style="width:100%"
                                    ref="table"
                                    :stripe="true"
                                    :height="tableHeights"
                                    show-summary
                                    class="containTable indexTable"
                            >
                                <el-table-column prop="Name"  :label="childrenCount2?'全宗名':'案卷库'"></el-table-column>
                                <template v-for="son in yearArr">
                                    <el-table-column :prop="son.pro" :label="son.lab" :key="son.lab"></el-table-column>
                                </template>
                                <el-table-column prop="total" label="合计"></el-table-column>
                            </el-table>
                        <div class="lineChartss" ref="lineChart"></div>
                    </div>
                </div>
                <div class="messageItem" v-show="activeName=='three'">
                    <p>{{fondName}}</p>
                    <div class="unmerginL lt">
                        <p>文件管理中未整理档案数量<span>{{total3}}</span></p>
                        <el-table
                                :data="StoreData3"
                                style="width:100%"
                                ref="table"
                                :stripe="true"
                                :max-height="tableHeightss"
                                class="containTable indexTable"
                        >
                            <el-table-column prop="Name"  :label="childrenCount3?'全宗名':'案卷库'"></el-table-column>
                            <el-table-column prop="Number" label="档案数量"></el-table-column>
                        </el-table>
                    </div>
                    <div class="unmerginR lt">
                        <p>整理编目中的档案数量<span>{{total4}}</span></p>
                        <el-table
                                :data="StoreData4"
                                style="width:100%"
                                ref="table"
                                :stripe="true"
                                :max-height="tableHeightss"
                                class="containTable indexTable"
                        >
                            <el-table-column prop="Name"  :label="childrenCount3?'全宗名':'案卷库'"></el-table-column>
                            <el-table-column prop="Number" label="档案数量"></el-table-column>
                        </el-table>
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
    import Service from './CountFile.Service';
    @Component
    export default class CountFile extends Vue{
        defaultProps:any={};
        activeName:string;
        fondName:string;//全宗名称
        fondId:number;//全宗ID
        childrenCount1:boolean;//是否携带子全宗
        childrenCount2:boolean;//是否携带子全宗
        childrenCount3:boolean;//是否携带子全宗
        time1:string;
        time2:string;
        begintime:any;
        endtime:any;
        StoreData:any=[];
        totalNumber:number;
        SontotalNumber:number;
        SontotalNumber1:number;
        SontotalNumber2:number;
        tableHeight:number;
        tableHeights:number;
        tableHeightss:number;
        chart:any = null;
        lineChart:any=null;
        StoreData2:any=[];
        beginYear:any;
        endYear:any;
        yearArr:any=[];
        StoreData3:any=[];
        StoreData4:any=[];
        total3:number;
        total4:number;
        Ydata:any = [];
        Rowdata:any=[];
        lengedName:any=[];
        constructor(){
            super();
            this.defaultProps={
                isLeaf: 'hasChildren',
                label: 'fondName',
                id: 'id'
            };
            this.activeName = 'one';
            this.fondName = null;
            this.childrenCount1 = false;
            this.childrenCount2 = false;
            this.childrenCount3 = false;
            this.time1 = null;
            this.time2 = null;
            this.StoreData = [];
            this.totalNumber =null;
            this.SontotalNumber = null;
            this.SontotalNumber1 = null;
            this.SontotalNumber2 = null;
            this.tableHeight = (document.documentElement.clientHeight-316);
            this.tableHeights =  (document.documentElement.clientHeight-246)/2;
            this.tableHeightss = document.documentElement.clientHeight-278;
            this.StoreData2 = [];
            this.beginYear = '';
            this.endYear = '';
            this.yearArr = [];
            this. StoreData3=[];
            this. StoreData4=[];
            this.total3 = 0;
            this.total4 = 0;
            this.Ydata = [];
            this.Rowdata = [];
            this.lengedName = [];
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
                            // item.fondName = '[ ' + item.fondCode + ' ]' + item.fondName;
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
                            // item.fondName = '[ ' + item.fondCode + ' ]' + item.fondName;
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
            this.fondName = data.fondName;
            this.fondId = data.id;
            this.activeName='one';
            this.childrenCount1 = false;
            this.childrenCount2 = false;
            this.childrenCount3 = false;
            this.time1 = null;
            this.time2 = null;
            this.StoreData = [];
            this.totalNumber =null;
            this.SontotalNumber = null;
            this.StoreData2 = [];
            this.beginYear = '';
            this.endYear = '';
            this.yearArr = [];
            this. StoreData3=[];
            this. StoreData4=[];
            this.total3 = 0;
            this.total4 = 0;
            this.Ydata = [];
            this.Rowdata = [];
            this.FileNumber();
        }
        //tab页的替换
        handleClick(tab){
            if(tab.name=='two'){
                setTimeout(()=>{
                    this.initlineChart();
                    var that = this;
                    that.lineChart.resize();
                    window['removeEventListener']('resize',that.chart.resize);
                    window.addEventListener('resize',that.lineChart.resize);
                },0);
            }else if(tab.name=='one'){
                this.initechart();
                var that = this;
                setTimeout(()=>{
                    that.chart.resize();
                },0);
                window['removeEventListener']('resize',that.lineChart.resize);
                window.addEventListener('resize',that.chart.resize);
            }else{
                var that = this;
                this.StoreData3 = [];
                this.StoreData4 = [];
                this.getUnsortfile({fondsId:this.fondId,rank:4,phase:1,parentId:0,childrenCount:this.childrenCount3});
                this.getUnsortfile({fondsId:this.fondId,rank:3,phase:2,childrenCount:this.childrenCount3});
                window['removeEventListener']('resize',that.chart.resize);
                window['removeEventListener']('resize',that.lineChart.resize);
            }
        }


        childChange1(){
            this.FileNumber();
        };
        childChange2(){
            if(this.beginYear!=''&&this.endYear!=''){
                this.FindYear();
            }
        };
        childChange3(){
            this.getUnsortfile({fondsId:this.fondId,rank:4,phase:1,parentId:0,childrenCount:this.childrenCount3});
            this.getUnsortfile({fondsId:this.fondId,rank:3,phase:2,childrenCount:this.childrenCount3});
        };
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
   /**************************历年数量统计**********************************/
   FindYear(){
       this.beginYear = this.time1.toLocaleString().substr(0,4);
       this.endYear = this.time2.toLocaleString().substr(0,4);
       this.Ydata = [];
       this.yearArr = [];
       this.Rowdata = [];
       this.lengedName = [];
       for(var i=this.beginYear;i<=this.endYear;i++){
           var ii = i+'';
           this.yearArr.push({lab:ii,pro:ii});
           this.Ydata.push(ii);
       }
       this.StoreData2 = [];
       Service.groupCountLibIdAndYearByFondsId({fondsId:this.fondId,yearBegin:this.beginYear,yearEnd:this.endYear,childrenCount:this.childrenCount2}).then(res=>{
           if(res.data.succeeded){
               var data = res.data.data.treeMap;
              for(var key in data){
                  var obj = {};
                  if(data[key]!=null){
                      for(var son of this.yearArr){
                          var numbers = son['lab'];
                          if(numbers in data[key]){
                              obj[numbers] = data[key][numbers];
                          }else{
                              obj[numbers] = 0;
                          }
                      }
                      obj['total'] = data[key]['total'];
                  }else{
                      for(var son of this.yearArr){
                          var numbers = son['lab'];
                          obj[numbers] = 0;
                      }
                      obj['total'] = 0;
                  }
                  obj['Name'] = key;
                 this.StoreData2.push(obj)
              };
              if(this.childrenCount2){
                  var obj = {
                      Name:'子全宗'
                  };
                  for(var son of this.yearArr){
                      if(son.lab in res.data.data.totalMap){
                          obj[son.lab] = res.data.data.totalMap[son.lab]
                      }else{
                          obj[son.lab] = 0;
                      };
                  };
                  this.StoreData2.push(obj)
              }
              for(var son of this.StoreData2){
                  this.lengedName.push(son.Name);
              }
              for(var key in this.lengedName){
                  var datas = [];
                  for(var val in  this.StoreData2[key]){
                     if(val!=='Name'&&val!=='total'){
                         datas.push(this.StoreData2[key][val]);
                     };
                  };
                  var obj = {
                      name:this.lengedName[key],
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
               this.Rowdata.push(obj);
              }
             this.initlineChart()
           }else{
               this.getError(res.data.errorMessage)
           }
       })
   }
   /**************************抓取数据*************************************/
    //各库档案数量
        FileNumber(){
            this.StoreData = [];
            Service.groupCountLibIdByFondsId({fondsId:this.fondId,childrenCount:this.childrenCount1}).then(res=>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    for(var son of data.treeList){
                        this.StoreData.push({name:son.name,value:son.fileCount,value1:son.archiveCount});
                    };
                    this.initechart();
                    this.totalNumber = data.fondsFileCount;
                    if(this.childrenCount1){
                        this.SontotalNumber = data.childrenInfo.fondsCount;
                        this.SontotalNumber1 = data.childrenInfo.fileCount;
                        this.SontotalNumber2 = data.childrenInfo.archiveCount;
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        /**************************************未整理档案数量统计****************/
        getUnsortfile(obj){
            this.StoreData3 = [];
            this.StoreData4 = [];
            Service.groupCountLibIdByUnfinished(obj).then(res=>{
                if(res.data.succeeded){
                    let data = res.data.data;
                     if(obj['rank']===4){
                         this.total3 =data.total;
                         if(this.childrenCount3){
                             var maps = data.childrenFondsList
                         }else{
                             var maps = data.treeMap
                         }
                         for(var key in maps){
                             var son = {Name:key,Number:maps[key]};
                             this.StoreData3.push(son)
                         }
                     }else {
                         this.total4 =data.total;
                         if(this.childrenCount3){
                             var maps = data.childrenFondsList
                         }else{
                             var maps = data.treeMap
                         }
                         for(var key in maps){
                             var son = {Name:key,Number:maps[key]};
                             this.StoreData4.push(son)
                         }
                     }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        }
   /*________________echart的初始化____________________________________________*/
         initechart(){
       this.chart = echarts.init(this['$refs']['pieChart']);
       let data = this.StoreData;
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
                           formatter:"{a}{b}: {c} ({d}%)"
                       }
                   },
                   data:data
               }
           ]
       });
   };
        //折线
        initlineChart(){
            this.lineChart = echarts.init(this['$refs']['lineChart']);
            var Ydata = this.Ydata;
            var Rowdata = this.Rowdata;
            var lengedName = this.lengedName;
            this.lineChart.setOption(  {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis:  {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: Ydata
                },
                series: Rowdata
            })
        }

        created(){
            this.begintime = this.beginDate();
            this.endtime = this.endDate();

        }
        mounted(){
            this.initechart();
            window.addEventListener('resize',()=>{
                return (()=>{
                    this.tableHeight = (document.documentElement.clientHeight-316);
                    this.tableHeights =(document.documentElement.clientHeight-246)/2;
                    this.tableHeightss = document.documentElement.clientHeight-278;
                })()
            });
            var that = this;
            window.addEventListener('resize',that.chart.resize);
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
@import '../../styles/static/CountFileStyle.scss';
</style>