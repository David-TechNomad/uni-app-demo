<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>我的借阅</span>
        </div>
        <div class="contentbox "> 
                      <el-tabs v-model="activeName" type="card" class="erpTab">                           
                            <el-tab-pane label="审批通过" name="first">
                                  <div class="searchKey boxshow">           
                                <el-form :inline="true" > 
                                    <el-form-item label="申请单号">
                                            <el-input placeholder="请输入申请单号" size="small"></el-input>
                                    </el-form-item>              
                                    <el-form-item label="申请日期">
                                         <el-input
                                                placeholder="请选择日期"
                                                suffix-icon="el-icon-date"
                                                >
                                            </el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button class="defaultBtn" >检索</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                             <div class="searchCon boxshow">                                
                                   <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader" 
                                        stripe 
                                        class="defaultTable">
                                           <el-table-column type="selection"  width="55">
                                            </el-table-column>
                                        <el-table-column  prop="name" label="操作"  width="120">
                                             <template slot-scope="scope">                                                 
                                                 <el-button class="tabletoolBtn">详情</el-button>
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="借阅单号">
                                        </el-table-column>
                                         <el-table-column prop="address" label="文档数量">                                      
                                        </el-table-column>
                                         <el-table-column prop="address" label="接待机构">                                      
                                        </el-table-column>
                                         <el-table-column prop="address" label="查阅方式">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="申请日期">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="借阅结束日期">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="状态">                                      
                                        </el-table-column>                                                                     
                                    </el-table>  
                                    <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="400">
                                        </el-pagination>
                                    </div>  
                                    </div>                      
                            </el-tab-pane>
                            <el-tab-pane label="审批部分通过" name="second">                                   
                            </el-tab-pane>
                              <el-tab-pane label="未审批" name="3">                                   
                            </el-tab-pane>
                              <el-tab-pane label="已驳回" name="4">                                   
                            </el-tab-pane>
                              <el-tab-pane label="已取消" name="5">                                   
                            </el-tab-pane>
                              <el-tab-pane label="全部" name="6">                                   
                            </el-tab-pane>           
                       </el-tabs> 
                                 
                         
                   
                
        </div>    
       </section>
</template>
<script lang="ts">
     import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrow.service';
    @Component
    export default class appBorrow extends Vue{
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
    @import '../../../styles/selfTip/borrow.scss';
</style>