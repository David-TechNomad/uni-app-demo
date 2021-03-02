
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>借阅审批</span>
        </div> 
        <div class="contentbox contentbox-full "> 
           <div class="SPsteps">
                 <div class="el-steps el-steps--horizontal" style="overflow-x: auto;">
                        <div class="el-step is-horizontal" style="flex-basis: 200px; margin-right: 0px;">                      
                           <div class="el-step__head is-success">
                            <div class="el-step__line" style="margin-right: 0px;">
                                <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i>
                            </div>
                            <div class="el-step__icon is-text">申请</div>
                            </div>
                            <div class="el-step__main">
                                <div class="el-step__title is-success">申请人:11</div>
                                <div class="el-step__description is-success">申请人所在部门</div>
                            </div>
                        </div>
                        <div class="el-step is-horizontal" style="flex-basis: 200px; margin-right: 0px;" >
                            <div class="el-step__head is-success">
                                <div class="el-step__line" style="margin-right: 0px;">
                                    <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i>
                                </div>
                                <div class="el-step__icon is-text">同意</div>
                            </div>
                            <div class="el-step__main">
                                <div class="el-step__title is-success">审批人:<span >111</span></div>
                                <div class="el-step__description is-success">申请人所在职位</div>
                            </div>
                        </div>
                        <div class="el-step is-horizontal" style="flex-basis: 200px; margin-right: 0px;"  >
                            <div class="el-step__head is-error">
                            <div class="el-step__line" style="margin-right: 0px;">
                                <i class="el-step__line-inner" style="transition-delay: -150ms; border-width: 0px; width: 0%;"></i>
                            </div>
                            <div class="el-step__icon is-text">
                                驳回
                            </div>
                            </div>
                            <div class="el-step__main">
                            <div class="el-step__title is-error">审批人:<span >1111</span></div>
                            <div class="el-step__description is-error">申请人所在职位</div></div>
                        </div>
                        <div  class="el-step is-horizontal" style="flex-basis: 200px; margin-right: 0px;"  >
                            <div class="el-step__head is-finish ">
                            <div class="el-step__line" style="margin-right: 0px;">
                                <i class="el-step__line-inner" style="transition-delay: -300ms; border-width: 0px; width: 0%;"></i>
                            </div>
                            <div class="el-step__icon is-text">
                                待审批
                            </div>
                            </div>
                            <div class="el-step__main">
                            <div class="el-step__title is-process ">审批人:<span >1111</span></div>
                            <div class="el-step__description is-process ">申请人所在职位</div></div>
                        </div>                      
                        <div class="el-step is-horizontal" style="flex-basis: 200px; max-width: 20%;" >
                            <div class="el-step__head is-wait">
                                <div class="el-step__line">
                                    <i class="el-step__line-inner"></i>
                                </div>
                                <div class="el-step__icon is-text">
                                    未审批
                                </div>
                            </div>
                            <div class="el-step__main">
                                <div class="el-step__title is-wait">审批人:<span >111</span></div>
                                <div class="el-step__description is-wait">申请人所在职位</div>
                            </div>
                        </div>
                 </div>
            </div>
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
                 <div class="relative mt10"> 
                    <div class="TabRBtn tabRtext">
                         <b class="lt">共l6份文件</b>
                          <span class="rt">                
                                      批量审批：
                                     <el-radio-group v-model="radio">
                                        <el-radio :label="3">全部通过</el-radio>
                                        <el-radio :label="6">全部驳回</el-radio>
                                    </el-radio-group>
                         </span>  
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
                                           <el-table-column type="selection"  width="55">
                                            </el-table-column>
                                        <el-table-column  prop="name" label="操作"  width="120">
                                             <template slot-scope="scope">                                                 
                                                 <el-button class="tabletoolBtn">查看卷内文件</el-button>
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="档号">
                                        </el-table-column>
                                         <el-table-column prop="address" label="全宗号">                                      
                                        </el-table-column>
                                         <el-table-column prop="address" label="年度">                                      
                                        </el-table-column>
                                         <el-table-column prop="address" label="题名">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="保管期限">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="控制标识">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="全宗名称">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="档案馆">                                      
                                         </el-table-column>
                                         <el-table-column prop="date" label="档案馆代码">                                      
                                         </el-table-column>                                        
                                    </el-table>
                                </div> 
                            </el-tab-pane>                                                     
                       </el-tabs> 
                  </div>               
                  <el-tabs v-model="activeName" type="card" class="erpTab mt10">                      
                        <el-tab-pane label="审批意见" name="first"> 
                            <div class="pd10 boxshow bgwhite">  
                                <el-input  type="textarea"  :rows="5" placeholder="请输入内容" > </el-input>
                            </div>
                        </el-tab-pane>                     
                 </el-tabs>
        </div>    
       </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './examCheck.service';   
    @Component
    export default class examCheck extends Vue{
           windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 563 ; 
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
                    this.bodyHeight = document.documentElement.clientHeight - 563;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
    @import '../../../styles/retrieve/examcheck.scss';
</style>