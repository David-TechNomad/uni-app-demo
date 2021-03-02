
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>鉴定详情</span>
           <el-button class="defaultBtn rt mt10" @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full "> 
                  <el-tabs v-model="activeName" type="card" class="erpTab mt10">                      
                        <el-tab-pane label="基本信息" name="first">
                            <div class="boxshow bgwhite pd10">
                             <el-form label-width="120px">
                              <table class="defaultTable" >
                                <tr>
                                     <td>
                                   <el-form-item label="鉴定任务名称">
                                           <span class="lt"> 项目文件鉴定  </span>
                                    </el-form-item>
                                 </td>
                                <td>
                                   <el-form-item label="鉴定类型">
                                        <span class="lt">江西档案馆(136001) </span>
                                    </el-form-item>
                                </td>
                                 <td>
                                   <el-form-item label="鉴定类型" >
                                       <span class="lt"> 保管期限 </span>
                                    </el-form-item>
                                 </td>
                                 <td>
                                   <el-form-item label="鉴定状态" >
                                        <span class="lt">鉴定中</span>
                                    </el-form-item>
                                 </td>
                               
                                 </tr>
                                  <tr>                                  
                                 <td>
                                   <el-form-item label="鉴定创建人">
                                      <span class="lt">鉴定创建人</span>
                                    </el-form-item>
                                 </td>
                                    <td>
                                   <el-form-item label="计划鉴定数量">
                                     <span class="lt">20190222</span>
                                    </el-form-item>
                                 </td>
                                  <td>
                                   <el-form-item label="实际鉴定数量">
                                       <span class="lt">2019222</span>
                                      </el-form-item>
                                 </td>
                                 </tr>
                                  <tr>
                                     <td>
                                   <el-form-item label="鉴定开始时间">
                                     <span class="lt">20190222</span>
                                    </el-form-item>
                                 </td>
                                  <td>
                                   <el-form-item label="预计结束时间">
                                      <span class="lt"> 2019222</span>
                                       </el-form-item>
                                 </td>
                                 <td>
                                  
                                 </td>
                                 </tr>
                                  <tr>
                                  <td colspan="3">
                                   <el-form-item label="申请说明">
                                       <span class="lt">申请说明</span>
                                    </el-form-item>
                                 </td>
                                 
                                 </tr>
                              </table>                            
                                
                              </el-form>                                                      
                            </div>
                        </el-tab-pane>                     
                 </el-tabs>
                 <div class="relative mt10"> 
                    <div class="TabRBtn tabRtext">
                         <b class="lt">共2份文档</b>                         
                    </div>                                          
                      <el-tabs v-model="activeName" type="card" class="erpTab">                                                    
                            <el-tab-pane label="需要鉴定的文档" name="first">
                                 <div class="boxshow">   
                                   <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader" 
                                        stripe 
                                        class="defaultTable mt0">
                                           <el-table-column type="selection"  width="55">
                                            </el-table-column>
                                        <el-table-column  prop="name" label="操作"  width="180">
                                             <template slot-scope="scope">                                                 
                                                 <el-button class="tabletoolBtn">文件详情</el-button>
                                                 <el-button class="tabletoolBtn">鉴定详情</el-button>
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="门类名称">
                                        </el-table-column>
                                         <el-table-column prop="address" label="文档代码">                                      
                                        </el-table-column>
                                         <el-table-column prop="address" label="文档题名">                                      
                                        </el-table-column>
                                         <el-table-column prop="address" label="馆藏馆蒙城">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="控制标识">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="利用方式">                                      
                                        </el-table-column>
                                         <el-table-column prop="date" label="利用改数量">                                      
                                        </el-table-column>                                                                             
                                    </el-table>
                                </div> 
                            </el-tab-pane>                                                     
                       </el-tabs> 
                       <div class="footBtn">
                          <el-button class="defaultBtn" @click="Gobacks">取消</el-button>
                           <el-button class="defaultBtn" @click="Gobacks">保存</el-button>
                            <el-button class="defaultBtn" @click="keepAndback">提交鉴定审批</el-button>
                           
                        </div>
                  </div>               
                 
        </div>    
       </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './identificationTask.service';   
    @Component
    export default class appraisal extends Vue{
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 580 ; 
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
        Goback(){
            this['$router'].go(-1);
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
                    this.bodyHeight = document.documentElement.clientHeight - 580;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';   
</style>