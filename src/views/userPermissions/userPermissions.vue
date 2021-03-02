<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>用户权限设置</span>
        </div>
        <div class="searchKey boxshow">           
              <el-form :inline="true" >               
                <el-form-item label="姓名">
                    <el-input placeholder="请输入姓名" size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名" size="small"></el-input>
                </el-form-item>
                <el-form-item label="所属档案馆">
                      <el-select  placeholder="请选择" size="small">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                     </el-select>
                </el-form-item>  
                <el-form-item label="全宗名称">
                    <el-input placeholder="请输入全宗名称" size="small"></el-input>
                </el-form-item>  
                <el-form-item label="用户状态">
                      <el-select  placeholder="请选择" size="small">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                     </el-select>
                </el-form-item>            
                <el-form-item class="rt">
                    <el-button type="primary" class="defaultBtn">查询</el-button>
                </el-form-item>
             </el-form>
        </div>  
        <div class="contentbox boxshow userPermissionsView">
          <div class="clear">
            <el-button @click="permissionsSetVisible = true" type="primary" class="userPermissionsBtn defaultBtn">设置权限</el-button>
          </div>
            <div class="searchCon">                     
                                 <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight - 30"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader" 
                                        stripe 
                                        class="defaultTable">
                                         <el-table-column
                                            type="selection"
                                            width="55">
                                          </el-table-column>
                                         <el-table-column type="index" width="50" label="序号">
                                          </el-table-column>
                                        <el-table-column  prop="name" label="操作"  width="100">
                                            <template slot-scope="scope">
                                              <el-button class="tabletoolBtn" @click="permissionsSetVisible = true">设置权限</el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="姓名">
                                        </el-table-column>
                                         <el-table-column prop="name" label="性别">                                      
                                        </el-table-column>
                                         <el-table-column prop="name" label="用户名">                                      
                                        </el-table-column>
                                         <el-table-column prop="name" label="手机">                                      
                                        </el-table-column>
                                        <el-table-column prop="name" label="所属档案馆">                                      
                                        </el-table-column>
                                        <el-table-column prop="name" label="用户类型">                                      
                                        </el-table-column>
                                        <el-table-column prop="name" label="全宗号">                                      
                                        </el-table-column>
                                        <el-table-column prop="name" label="全宗名称">                                      
                                        </el-table-column>
                                        <el-table-column prop="name" label="全宗权限">                                      
                                        </el-table-column>
                                        <el-table-column prop="date" label="密级权限">                                      
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
        </div> 
        <superSearch ref="superSearch"></superSearch> 
        <el-dialog
          title="设置权限"
          :visible.sync="permissionsSetVisible"
          width="28.1%"
          :before-close="handleClose">
          <p style="line-height:30px;padding-left:5px;background: rgb(60, 120, 212);color: #fff;">控制标识</p>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="padding-left:20px">
                  <el-form-item prop="checkedType" class="superSearchChecked">
                      <el-checkbox label="公开" name="type"></el-checkbox>
                      <el-checkbox label="受控" name="type"></el-checkbox>  
                  </el-form-item>
          </el-form>
          <p style="line-height:30px;padding-left:5px;background: rgb(60, 120, 212);color: #fff;">全宗权限</p>
          <div class="el-transfer-shell">
            <el-transfer v-model="transferValue" :data="transferData" :titles="['全宗列表', '已赋权的全宗']"></el-transfer>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="permissionsSetVisible = false" class="defaultBtn">取 消</el-button>
            <el-button type="primary" @click="permissionsSetVisible = false" class="defaultBtn">确 定</el-button>
          </span>
        </el-dialog>
       </section>
       
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './notice.service';
    import { State, Getter, Mutation, } from 'vuex-class';                             
    import superSearch from '@/components/superSearch/superSearch.vue';
   @Component({
        components: { 
            superSearch
        },
    })
    export default class appSuperSearch extends Vue{
        @State catNum :number;
        @Mutation('SET_CATNUM') SET_isShow: () => void;
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 300 ; 
        radio3: string = '1';
        permissionsSetVisible: boolean;
        transferData: any = [{key: '1', label: "内容1"},{key: 2, label: "内容2"},{key: 3, label: "内容3"},{key: 4, label: "内容4"}];
        transferValue:any = [1,4];
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
        },{
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
            this.permissionsSetVisible = false;
        };
        superSearchShow(){
           this.$nextTick(() => {
             this.$refs.superSearch.superSearchVisible=true;           
           })          
        };
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
          .catch(_ => {});
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
                    this.bodyHeight = document.documentElement.clientHeight - 300;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>  
   @import '../../styles/innerPublic.scss';
   .wrapprSection >>>.contentbox{ 
      top:110px;
      left: 10px;
    }
    .tablePlan{
      text-align: left;
      .attr{
        color: #999;
        span{
          margin-right:0 10px;
        }
      }
    }
    .userPermissionsView {
      background: #ffffff;
      .userPermissionsBtn{
          float: right;
          margin: 10px 20px 0 0;
        }
    }
</style>