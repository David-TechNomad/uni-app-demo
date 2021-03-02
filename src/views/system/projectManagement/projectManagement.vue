<template>
    <section>
    <div class="mainTitle">项目档案目录汇总</div>
    <div class="mainDoc">
        <div class="formData">
            <el-form :inline="true" :model="filters" class="doneForm topParamsForm">
                 <el-form-item class="company" label="项目名称：" ref="fullName">
                     <el-input class="checkName" v-model="filters.fullName" placeholder="单行输入"></el-input>
                 </el-form-item>
                 <el-form-item class="fondName" label="项目公司：" ref="loginName">
                     <el-input class="checkName" v-model="filters.loginName" placeholder="单行输入"></el-input>
                 </el-form-item>
                 <el-form-item class="fondName" label="万信号：" ref="loginName">
                      <el-input class="checkName" v-model="filters.loginName" placeholder="单行输入"></el-input>
                 </el-form-item>
                 <el-form-item>
                     <el-button class="checkWay" @click="searchList">检索</el-button>
                 </el-form-item>
            </el-form>
            <div class="btnDiv1">
                <el-button class="checkWay" @click="fondsMove">新增</el-button>
                <el-button class="checkWay" @click="batchUpdateFondsUser">打印</el-button>
                <el-button class="checkWay" @click="fondsMove">导出</el-button>
            </div>
        </div>
        <div class="borderTable">
           <el-table tooltip-effect="dark" border :height="bodyHeight" :data="tableData" highlight-current-row v-loading="listLoading"  class="indexTable reportTable">
                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="序号">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="loginName" label="分区">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="roleName" label="项目公司">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="城市公司|行政经理/主管" :render-header="renderheader" width="120px">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="万信号">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="telephone" label="项目名称">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="万达广场|行政经理/主管" :render-header="renderheader" width="120px">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="loginName" label="万信号">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="roleName" label="是否移交集团|总部经营期档" :render-header="renderheader" width="120px">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="案卷数量">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="类型">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="telephone" label="开业时间">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="telephone" label="结束时间">
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="telephone" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                       <el-button class="checkBtn" @click="lendModalOut(scope.row)">角色配置</el-button>
                    </template>
                </el-table-column>
           </el-table>
           <!--工具条分页-->
           <el-col :span="24" class="pager">
               <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
               </el-pagination>
           </el-col>
        </div>
    </div>
    <el-dialog class="fixModal" title="用户角色设定" :visible.sync="fileVisible" :close-on-click-modal="true">
        <div class="scrollCon formDiv">
            <div class="tableCon">
                <el-form :model="fileForm" label-width="100px" :rules="ruleForm" ref="fileForm" class="userForm">
                    <el-form-item label="userId：" class="basicItem" ref="userId" prop="userId" v-show="false">
                        <el-input class="checkName percentName" v-model="fileForm.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名：" class="basicItem" ref="fullName" prop="fullName">
                        <span>{{fullName}}</span>
                    </el-form-item>
                    <el-form-item label="部门：" class="basicItem">
                        <span>{{unitname}}</span>
                    </el-form-item>
                    <el-form-item label="职务：" class="basicItem">
                        <span>{{jobname}}</span>
                    </el-form-item>
                    <el-form-item label="万信号：" class="basicItem">
                        <span>{{loginName}}</span>
                    </el-form-item>
                    <el-form-item label="角色：" class="basicItem " ref="roleIds" prop="roleIds">
                        <el-select class="checkName percentName" multiple v-model="fileForm.roleIds">
                              <el-option v-for="item in roleSelect" :key="item.id" :label="item.roleName" :value="item.id">
                              </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div slot="footer" class="dialog-footer diaFoot">
            <el-button type="primary" class="checkWay" @click="submitForm('fileForm')">确定</el-button>
        </div>
    </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './userManagement.service';
    import cookieConfig from '@/utils/getCookie';
    @Component
    export default class appborrow extends Vue{
        fileVisible: boolean;
        bodyHeight: number;
        start: number;
        total: number;
        page: number;
        limit: number;
        a: any = {};
        b: any = {};
        fileForm: any = {};
        ruleForm: any = {};
        openForm: any = {};
        filters: any = {};
        tableData: any = [];

        roleSelect: any = [];
        error: any = {};
        tableParams: any = {};
        title:'';
        fullName:'';
        jobname:'';
        unitname:'';
        loginName:'';
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight-245;
            this.fileVisible = false;
            this.fileForm = {
                roleIds:[],
                userId:''
            };
            this.openForm = {

            };
            this.a = {
                roleIds:[],
                userId:''
            };
            this.b = {
                fullName:'',
                loginName:'',
                page:'0',
                pageSize:'25'
            };
            this.limit = 25;
            this.filters = {
                loginName:'',
                fullName:''
            };
            this.ruleForm = {
                jobname: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                unitname: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                loginName: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                roleName: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                roleIds: [
                    { required: true, message: '请选择', trigger: 'change' }
                ]
            };

            this.tableData = [];
            this.roleSelect = [];
            this.tableParams = {
                  userId:'',
                  roleIds:'',
            };
        };

        handleCurrentChange(val) {
            this.b.page = val-1;
            this.getFiles();
        };
        handleSizeChange(val) {
            this.b.pageSize = val;
            this.getFiles();
        };

        searchList(){
            this.b.page = 0;
            this.getFiles();
        }

        //角色下拉框数据
        getRoleSelectData(obj):void{
            let params =  1;
            Service.getRoleSelectData(params).then((res) =>{
                this.roleSelect = res.data.data;
                this.fileForm.roleIds = [];
                if(obj.roleName != undefined){
                   let attr = [];
                   attr = obj.roleName.split(",");
                   for(let child of this.roleSelect){
                       for(let child1 of attr){
                            if(child1 == child.roleName){
                              this.fileForm.roleIds.push(child.id);
                            }
                       }
                   }
               }
               this.fileVisible = true;
               this.fileForm.userId = obj.userId;
               this.fullName = obj.fullName;
               this.jobname = obj.jobname;
               this.unitname = obj.unitname;
               this.loginName = obj.loginName;
			})
        };

        //获取用户信息


        // 角色配置弹出框
        lendModalOut(obj):void{
           this.getRoleSelectData(obj);



        };

        renderheader(h, { column, $index }) {
             return h('span', {}, [
                h('span', {}, column.label.split('|')[0]),
                h('br'),
                h('span', {}, column.label.split('|')[1])
             ])
        }

         mounted(){
              window.onresize = () => {
                  return (() => {
                      this.bodyHeight = document.documentElement.clientHeight-266;
                  })()
              };
         };

    };


</script>

<style lang="scss" scoped>
    @import '../../../styles/system/projectManagement/projectManagement.scss';
</style>