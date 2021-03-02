<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>填写借阅单</span>
        </div> 
        <div class="contentbox contentbox-full ">      
                 <el-tabs v-model="activeName" type="card" class="erpTab">
                      <el-tab-pane label="借阅单号：2018061708" name="first">   
                           <div class="boxshow bgwhite clear">
                               <div class="list lt">
                                   <h4 class="textBlue listtitle">借阅人信息</h4>
                                    <ul class="ulList clear">
                                        <li>[公众用户]：<b>李四</b></li>
                                        <li>[身份证]：<b>13045682254545454</b></li>
                                        <li>[工作单位]：<b>工作单位</b></li> 
                                        <li>[证明文件]：<b> <el-button class="tabletoolBtn">查看</el-button></b></li>                                                       
                                    </ul>  
                                </div> 
                                <el-form ref="form"  label-width="100px" class="lt pd10" >
                                    <el-form-item label="接待馆" class ="lt">
                                        <b>接待馆</b>
                                    </el-form-item>
                                    <el-form-item label="借阅目的" class ="lt">
                                        <el-input size="small"></el-input>
                                    </el-form-item>
                                     <el-form-item label="借阅结束时间" class ="lt" label-width="150px"> 
                                        <el-date-picker type="date" placeholder="选择日期" size="small"></el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="借阅内容">
                                        <el-input type="textarea" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="备注">
                                        <el-input type="textarea" ></el-input>
                                    </el-form-item>
                                </el-form>                                   
                            </div>            
                      </el-tab-pane>
                 </el-tabs>
                 <div class="relative" style="padding-top:10px"> 
                        <div class="TabRBtn">
                            <el-button class="defaultBtn"><i class="fa fa-plus-square" aria-hidden="true"></i> 新增文件</el-button>
                        </div>                                    
                      <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                            <el-tab-pane label="待借阅文档" name="first">
                                 <div class="boxshow bgwhite">   
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
                  <div class="textCenter mt10">
                        <el-button class="defaultBtn">取消</el-button> <el-button class="defaultBtn">提交借阅申请</el-button>
                   </div>
        </div>    
       </section>
</template>     
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './loanSlip.service';
    @Component
    export default class loanSlip extends Vue{
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
    @import '../../../styles/retrieve/loanSlip';
</style>