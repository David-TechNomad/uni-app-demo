<template>
    <section>
    <div class="mainTitle">存储管理</div>
    <div class="mainDoc">
        <div class="mainCon mainBorrow">
         <div class="btnDiv">
            <el-button class="checkWay" @click="lendModalOut">新增</el-button>
         </div>
           <div class="borderTable" v-show="true">
               <el-table tooltip-effect="dark" border :height="bodyHeight" :data="tableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                    <el-table-column :show-overflow-tooltip="true" prop="storageId" label="序号">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="type" label="文件类型">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">云盘文件</span>
                            <span v-if="scope.row.type == 2">档案原文</span>
                            <span v-if="scope.row.type == 3">断点续传文件</span>
                            <span v-if="scope.row.type == 4">常用文件</span>
                            <span v-if="scope.row.type == 5">通知文件</span>
                            <span v-if="scope.row.type == 6">报表模板文件</span>
                        </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="diskPath" label="文件路径">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="isDefault" label="默认"><div slot-scope="scope">{{scope.row.isDefault === true?"是":"否"}}</div>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="comment" label="备注">
                    </el-table-column>
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <span class="addBtn" @click="lendModalOut1(scope.row)">修改</span>
                        </template>
                    </el-table-column>
               </el-table>
               <!--工具条分页-->
              <el-col :span="24" class="pager">
                  <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[4,10, 15, 20, 25,30]" :page-size="pageSize" :total="total" style="float:right;">
                  </el-pagination>
              </el-col>
            </div>
        </div>
    </div>
    <el-dialog class="fixModal" title="新增存储管理" :visible.sync="fileVisible" :close-on-click-modal="true" :model="ruleForm">
        <div class="scrollCon formDiv">
            <div class="tableCon">
                <el-form :model="fileForm" label-width="100px" :rules="ruleForm" ref="fileForm">
                   <el-form-item label="文件类型：" class="basicItem" ref="type" prop="type">
                       <el-select class="checkName" v-model="fileForm.type">
                             <el-option v-for="item in typeSelect" :key="item.code" :label="item.displayText" :value="item.code">
                             </el-option>
                       </el-select>
                   </el-form-item>
                    <el-form-item label="最大存储量：" class="basicItem" ref="volume" prop="volume">
                        <el-input class="checkName percentName" v-model.number="fileForm.volume"></el-input>
                    </el-form-item>
                    <el-form-item label="文件路径：" class="basicItem" ref="diskPath" prop="diskPath">
                        <el-input class="checkName percentName" v-model="fileForm.diskPath"></el-input>
                    </el-form-item>
                    <el-form-item label="默认：" class="basicItem" ref="isDefault" prop="isDefault">
                        <el-radio-group v-model="fileForm.isDefault">
                          <el-radio label="true">是</el-radio>
                          <el-radio label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：" class="basicItem" ref="comment" prop="comment">
                        <el-input class="checkName percentName" v-model="fileForm.comment"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div slot="footer" class="dialog-footer diaFoot">
            <el-button type="primary" class="checkWay" @click="submitForm('fileForm')">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog class="fixModal" title="修改存储管理" :visible.sync="fileVisible1" :close-on-click-modal="true">
        <div class="scrollCon formDiv">
            <div class="tableCon">
            <el-form :model="fileForm1" label-width="100px" :rules="ruleForm1" ref="fileForm1">
                <el-form-item label="id：" class="basicItem" ref="storageId" prop="storageId" v-show="false">
                    <el-input class="checkName percentName" v-model="fileForm1.storageId"></el-input>
                </el-form-item>
                <el-form-item label="文件类型：" class="basicItem" ref="type" prop="type">
                    <el-select class="checkName" v-model="fileForm1.type">
                          <el-option v-for="item in typeSelect" :key="item.code" :label="item.displayText" :value="item.code">
                          </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="最大存储量：" class="basicItem" ref="volume" prop="volume">
                    <el-input class="checkName percentName" v-model.number="fileForm1.volume"></el-input>
                </el-form-item>
                <el-form-item label="文件路径：" class="basicItem" ref="diskPath" prop="diskPath">
                    <el-input class="checkName percentName" v-model="fileForm1.diskPath"></el-input>
                </el-form-item>
                <el-form-item label="默认：" class="basicItem" ref="isDefault" prop="isDefault">
                    <el-radio-group v-model="fileForm1.isDefault">
                      <el-radio label="true">是</el-radio>
                      <el-radio label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" class="basicItem" ref="comment" prop="comment">
                    <el-input class="checkName percentName" v-model="fileForm1.comment"></el-input>
                </el-form-item>
            </el-form>
            </div>
        </div>
        <div slot="footer" class="dialog-footer diaFoot">
            <el-button type="primary" class="checkWay" @click="submitForm1('fileForm1')">确定</el-button>
        </div>
    </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './storeManagement.service';
    @Component
    export default class appstoreManagement extends Vue{
        fileVisible: boolean;
        fileVisible1: boolean;
        isDefault:boolean;
        bodyHeight: number;
        total: number;
        start: number;
        page: number;
        limit: number;
        fileForm: any = {};
        fileForm1: any = {};
        ruleForm: any = {};
        ruleForm1: any = {};
        tableData: any = [];
        tableParams: any = {};
        typeSelect: any = [];
        a: any = {};
        b: any = {};
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight-235;
            this.fileVisible = false;
            this.fileVisible1 = false;
            this.fileForm = {
                type:'',
                volume:'',
                diskPath:'',
                comment:'',
                isDefault:''
            };
            this.fileForm1 = {
                type:'',
                volume:'',
                diskPath:'',
                comment:'',
                isDefault:true,
                storageId:''
            };
            this.a = {
                type:'',
                volume:'',
                diskPath:'',
                comment:'',
                isDefault:''
             };
             this.b = {
                 page:'0',
                 pageSize:'25'
              };
            this.ruleForm = {
                type: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                volume: [
                    { required: true, message: '请填写', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],
                diskPath: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                isDefault: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                comment: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ]
            };
            this.ruleForm1 = {
                type: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                volume: [
                    { required: true, message: '请填写', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值'}
                ],
                diskPath: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                isDefault: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                comment: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ]
            };
            this.tableParams = {

            };
        };


        // 新增弹出框
        lendModalOut():void{
           this.fileVisible = true;
        };

        // 修改弹出框
        lendModalOut1(obj):void{
           if(obj.storageId != undefined){
                Service.getVirtualDiskConfig(obj.storageId).then((res) =>{
                    this.fileForm1.storageId = res.data.data.storageId;
                    this.fileForm1.type = res.data.data.type.toString();
                    this.fileForm1.volume = res.data.data.volume;
                    this.fileForm1.diskPath = res.data.data.diskPath;
                    this.fileForm1.isDefault = res.data.data.isDefault.toString();
                    this.fileForm1.comment = res.data.data.comment;
                })
           }
           this.fileVisible1 = true;
        };

         submitForm(fileForm) {//新增表单保存
            this['$refs'][fileForm]['validate']((valid)=>{
                if (valid) {
                    Service.saveOrUpdate(this.fileForm).then((res) =>{
                        if(res.data.succeeded){
                            this.fileVisible = false;
                            this.getFiles();
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }

                    })
                }
            });

         };
         submitForm1(fileForm1) {//修改表单保存
            if(this.fileForm1.isDefault === 'true'){
                   this.fileForm1.isDefault = true;
            }else{
                this.fileForm1.isDefault = false;
            }
            this['$refs'][fileForm1]['validate']((valid)=>{
                if (valid) {
                    Service.saveOrUpdate(this.fileForm1).then((res) =>{
                         this.fileVisible1 = false;
                         this.getFiles();
                     })
                }
            });

          };

          handleCurrentChange(val) {
              this.b.page = val-1;
              this.getFiles();
          };
          handleSizeChange(val) {
              this.b.pageSize = val;
              this.getFiles();
          };

         // 初始化表格
         getFiles():void{
             Service.getVirtualDiskConfigList(this.b).then((res) =>{
                 this.tableData = res.data.data
                 this.total = res.data.totalRecords
             });
         };

         mounted(){
             this.getFiles();

             //文件类型数据
             Service.getDictListByDictId(444).then((res) =>{
                this.typeSelect = res.data.data;
             });


             window.onresize = () => {
                 return (() => {
                     this.bodyHeight = document.documentElement.clientHeight-235;
                 })()
             };
         };
    };


</script>

<style lang="scss" scoped>
    @import '../../../styles/system/storeManagement/storeManagement.scss';
</style>