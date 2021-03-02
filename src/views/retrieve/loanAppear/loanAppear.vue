
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>查看借阅单</span>
        </div> 
        <div class="boxshow clear pd10 loanAppertext">           
               根据您借阅的文档、所属公司、文件密级和借阅方式拆分成以下 <span class="textBlue">11</span> 条借阅单，请确认后提交。
                <p class="rt">
                    <el-button class="defaultBtn">继续查询档案</el-button>
                    <el-button class="defaultBtn" >查询我的借阅单</el-button>
                </p>
        </div>
        <div class="contentbox contentbox-full "> 
              <div class="tipPlanwrappr">
                <div  class="tipPlan">
                    <div class="tipPlanTitle">
                        <div class="tip">1</div>
                    </div>
                    <div class="tipPlanbody">
                                 <el-tabs v-model="activeName" type="card" class="erpTab">
                                            <el-tab-pane label="借阅单号：2018061708" name="first">   
                                                <div class="boxshow bgwhite">
                                                        <ul class="ulList clear">
                                                            <li>[公众用户]：<b>李四</b></li>
                                                            <li>[工作单位]：<b>李四</b></li>
                                                            <li>[借阅申请日期]：<b>李四</b></li>                        
                                                        </ul>
                                                        <ul class="ulList clear">                                    
                                                            <li>[接待馆]：<b>李四</b></li>
                                                            <li>[借阅目的]：<b>李四</b></li>
                                                            <li>[借阅申请日期]：<b>李四</b></li>
                                                            <li>[借阅结束日期]：<b>李四</b></li>                          
                                                        </ul>  
                                                        <ul class="ulList clear">
                                                            <li>[借阅内容]：李四</li>                                   
                                                        </ul> 
                                                        <ul class="ulList clear"> 
                                                            <li>[备注]：李四</li>                                   
                                                        </ul>                                   
                                                    </div>            
                                            </el-tab-pane>
                                        </el-tabs>
                                        <el-tabs v-model="activeName" type="card" class="erpTab mt10">
                                            <el-tab-pane label="审批流程" name="first">   
                                                <div class="boxshow bgwhite pd10">
                                                    <p>申请人【<b>张三</b>】➜  （江西省档案馆）初审【<b>朱捷</b>】➜  （江西省档案馆）终审【<b>李鹏达</b>】</p>                 
                                                 </div>            
                                            </el-tab-pane>
                                        </el-tabs>
                                        <div class="relative mt10"> 
                                            <div class="TabRBtn tabRtext">
                                                <b class="lt">共l6份文件</b>
                                            </div>                                          
                                            <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                                                    <el-tab-pane label="待借阅文档" name="first">
                                                        <div class="boxshow">   
                                                        <el-table
                                                                :data="tableData"
                                                                border
                                                                height="200"
                                                                element-loading-text="努力加载中..."
                                                                header-row-class-name="tableHeader" 
                                                                stripe 
                                                                class="defaultTable mt0">                                                               
                                                                <el-table-column prop="name" label="门类名称">
                                                                </el-table-column>
                                                                <el-table-column prop="address" label="文档代码">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="address" label="文档题名">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="address" label="馆藏馆名称">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="date" label="控制标识">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="date" label="利用方式">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="date" label="利用数量">                                      
                                                                </el-table-column>               
                                                            </el-table>
                                                        </div> 
                                                    </el-tab-pane>                                                     
                                            </el-tabs> 
                                        </div>              
                                        
                    </div>
                </div>
             </div>
             <div class="tipPlanwrappr mt10">
                <div  class="tipPlan">
                    <div class="tipPlanTitle">
                        <div class="tip">2</div>
                    </div>
                    <div class="tipPlanbody">
                                 <el-tabs v-model="activeName" type="card" class="erpTab">
                                            <el-tab-pane label="借阅单号：2018061708" name="first">   
                                                <div class="boxshow bgwhite">
                                                        <ul class="ulList clear">
                                                            <li>[公众用户]：<b>李四</b></li>
                                                            <li>[工作单位]：<b>李四</b></li>
                                                            <li>[借阅申请日期]：<b>李四</b></li>                        
                                                        </ul>
                                                        <ul class="ulList clear">                                    
                                                            <li>[接待馆]：<b>李四</b></li>
                                                            <li>[借阅目的]：<b>李四</b></li>
                                                            <li>[借阅申请日期]：<b>李四</b></li>
                                                            <li>[借阅结束日期]：<b>李四</b></li>                          
                                                        </ul>  
                                                        <ul class="ulList clear">
                                                            <li>[借阅内容]：李四</li>                                   
                                                        </ul> 
                                                        <ul class="ulList clear"> 
                                                            <li>[备注]：李四</li>                                   
                                                        </ul>                                   
                                                    </div>            
                                            </el-tab-pane>
                                        </el-tabs>
                                        <el-tabs v-model="activeName" type="card" class="erpTab mt10">
                                            <el-tab-pane label="审批流程" name="first">   
                                                <div class="boxshow bgwhite pd10">
                                                    <p>申请人【<b>张三</b>】➜  （江西省档案馆）初审【<b>朱捷</b>】➜  （江西省档案馆）终审【<b>李鹏达</b>】</p>                 
                                                 </div>            
                                            </el-tab-pane>
                                        </el-tabs>
                                        <div class="relative mt10"> 
                                            <div class="TabRBtn tabRtext">
                                                <b class="lt">共l6份文件</b>
                                            </div>                                          
                                            <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                                                    <el-tab-pane label="待借阅文档" name="first">
                                                        <div class="boxshow">   
                                                        <el-table
                                                                :data="tableData"
                                                                border
                                                                height="200"
                                                                element-loading-text="努力加载中..."
                                                                header-row-class-name="tableHeader" 
                                                                stripe 
                                                                class="defaultTable mt0">                                                               
                                                                <el-table-column prop="name" label="门类名称">
                                                                </el-table-column>
                                                                <el-table-column prop="address" label="文档代码">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="address" label="文档题名">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="address" label="馆藏馆名称">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="date" label="控制标识">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="date" label="利用方式">                                      
                                                                </el-table-column>
                                                                <el-table-column prop="date" label="利用数量">                                      
                                                                </el-table-column>               
                                                            </el-table>
                                                        </div> 
                                                    </el-tab-pane>                                                     
                                            </el-tabs> 
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
    import Service from './loanAppear.service';   
    @Component
    export default class appLoanAppear extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 363 ; 
        radio3: string = '1';
        treedata001: any = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      activeName:string = 'first';
      tableData: any =[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };    
        constructor(){
            super();
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };
        created(){            
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 363;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
     @import '../../../styles/innerPublic.scss';
     @import '../../../styles/retrieve/loanAppear';
</style>