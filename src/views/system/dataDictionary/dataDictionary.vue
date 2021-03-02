<template>
    <section>
         <div class="titleBlue">
            <b></b>
            <span>数据字典</span>
        </div>
        <div class="bigbox">
            <p class="fontClass">
                    <i class="fa fa-plus-square" @click="AddFile()"></i>
                    <i class="fa fa-eyedropper" @click="ChangeName()"></i>
                    <i class="fa fa-times-rectangle" @click="Delete()"></i>
            </p>
            <div class="left">
                <div class="maskDic">
                    <!-- <div style="width:100%;height:30px;">
                        <p>数据字典</p>
                        <p style="padding-left:20px">备注</p>
                    </div> -->
                     <!-- <ul class="listUls">
                      <li v-for="(item,index) in listData" @click="AddColor(index,item)"  :key='item.id' :class="index==selectIndex?'active':''">
                          <span>{{item.name}}</span>
                          <span>{{item.comments}}</span>
                      </li>
                    </ul> -->
                    <el-table @cell-click="AddColor" :height="bodyHeight-20" :data="listData" style="width: 100%" class="indexTable containTable">
                        <el-table-column prop="name" label="数据字典">
                        </el-table-column>
                        <el-table-column prop="comments" label="备注">
                    </el-table-column>
                    </el-table>   
                </div>
            </div>
            <div class="right" v-show="tableShow">
                    <p class="addBtns">
                        <el-button type="primary" class="el-button checkWay" @click="AddMask()">新增</el-button>
                    </p>
                    <div class="borderTable">
                    <el-table border tooltip-effect="dark" :height="bodyHeight+4"  :data="DangList" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                            <el-table-column  prop='displayText' label="字典值">
                            </el-table-column>
                            <el-table-column  prop='code' label="字典编码">
                            </el-table-column>
                            <el-table-column  prop='comments' label="备注">
                            </el-table-column>
                           <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="editTable(scope.$index, scope.row)">编辑</span>
                                <span class="addBtn" @click="deleteTable(scope.$index, scope.row)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 数据字典新增 -->
        <el-dialog
            title="新增数据字典"
            :visible.sync="centerDialogVisible"
            class="myDialog"
            :close-on-click-modal="true">
            <el-form class="addDiog" ref='addFiles' :model="addFiles" :rules="addFilesRules">
              <el-form-item ref="title" prop="title" label="数据字典：">
                      <el-input class="checkName" v-model.trim="addFiles.title" clearable style="width:80%;margin-bottom:3px;"></el-input>
              </el-form-item>
              <el-form-item ref="titleNode" prop="titleNode" label="备注：" style="margin-left:38px;">
                    <el-input class="checkName" v-model="addFiles.titleNode" clearable style="width:88%;;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleEvent()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 数据字典编辑 -->
        <el-dialog
            title="编辑数据字典"
            :visible.sync="EditcenterDialogVisible"
            class="myDialog"
            :close-on-click-modal="true">
            <el-form class="addDiog" ref="editFiles" :model="editFiles" :rules="editFilesRules">
              <el-form-item ref="title" prop="title" label="数据字典：">
                      <el-input class="checkName" v-model.trim="editFiles.title" clearable style="width:80%;margin-bottom:3px;"></el-input>
              </el-form-item>
              <el-form-item ref="titleNode" prop="titleNode" label="备注：" style="margin-left:38px;">
                    <el-input class="checkName" v-model="editFiles.titleNode" clearable style="width:88%;;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="EditcenterDialogVisible = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="EditcenterDialogVisibleEvent()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 表格字典值新增 -->
        <el-dialog
            title="新增字典值"
            :visible.sync="AddTableMask"
            class="myDialog"
            :close-on-click-modal="true">
            <el-form class="addDiog" ref='AddTableFile' :model="AddTableFile" :rules="AddTableFileRules">
              <el-form-item ref="title" prop="title" label="字典值：" style="margin-left:15px;">
                      <el-input class="checkName" v-model.trim="AddTableFile.title" clearable style="width:83%;margin-bottom:3px;"></el-input>
              </el-form-item>
               <el-form-item ref="title" prop="code" label="字典编码：">
                      <el-input class="checkName" v-model.trim="AddTableFile.code" clearable style="width:80%;margin-bottom:3px;"></el-input>
              </el-form-item>
              <el-form-item ref="titleNode" prop="titleNode" label="备注：" style="margin-left:38px;">
                    <el-input class="checkName" v-model="AddTableFile.titleNode" clearable style="width:88%;;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="AddTableMask = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="AddTableMaskEvent()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 表格字典值编辑 -->
        <el-dialog
            title="编辑字典值"
            :visible.sync="EditTableMask"
            class="myDialog"
            :close-on-click-modal="true">
            <el-form class="addDiog" ref='EditTableFile' :model='EditTableFile' :rules="EditTableFileRules">
              <el-form-item ref="title" prop="title" label="字典值：" style="margin-left:15px;">
                      <el-input class="checkName" v-model.trim="EditTableFile.title" clearable style="width:83%;margin-bottom:3px;"></el-input>
              </el-form-item>
               <el-form-item ref="title" prop="title" label="字典编码：">
                      <el-input class="checkName" readOnly v-model.trim="EditTableFile.code"  style="width:80%;margin-bottom:3px;"></el-input>
              </el-form-item>
              <el-form-item ref="titleNode" prop="titleNode" label="备注：" style="margin-left:38px;">
                    <el-input class="checkName" v-model="EditTableFile.titleNode" clearable style="width:88%;;"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="EditTableMask = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="EditTableMaskEvent()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Service from './dataDictionary.service'
    @Component
    export default class dataDictionary extends Vue{
         windowHeight: number;
         bodyHeight: number;
         DangList:any = [];
         listLoading:boolean;
         centerDialogVisible:boolean;
         EditcenterDialogVisible:boolean;
         AddTableMask:boolean;
         EditTableMask:boolean;
         addFiles:any = {};
         editFiles:any = {};
         AddTableFile:any = {};
         EditTableFile:any = {};
         listData:any = [];
         selectIndex:number;
         AddTableFileRules:any = {};
         EditTableFileRules:any = {};
         addFilesRules:any ={};
         editFilesRules:any = {};
         itemData:any = {};
         tableShow:boolean;
         tableIndex:number;
         constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight-140;
            this.listLoading = false;
            this.centerDialogVisible = false;
            this.EditcenterDialogVisible = false;
            this.AddTableMask = false;
            this.EditTableMask = false;
            this.tableShow = false;
            this.selectIndex = -1;
            this.DangList = [
               
            ]
            this.addFiles = {
                title:'',
                titleNode:''
            }
            this.editFiles = {
                title:'',
                titleNode:''
            }
            this.AddTableFile={
                title:'',
                code:'',
                titleNode:''
            }
            this.EditTableFile = {
                title:'',
                code:'',
                titleNode:''
            }
            this.listData = [];
            this.addFilesRules = {
                title: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
            this.editFilesRules = {
                title: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
            this.AddTableFileRules = {
                 title: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                code:[
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
            this.EditTableFileRules = {
                 title: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                code:[
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
            this.itemData = {};


         }
         //新增数据字典
         AddFile(){
             this.centerDialogVisible = true;
         }
         //新增的确定
         centerDialogVisibleEvent(){
             Service.dicSave({
                 "name":this.addFiles.title,
	             "comments":this.addFiles.titleNode
             }).then(res=>{
                
                 if(this.addFiles.title == ''){
                     this['$message']({message:"请完善数据。",type:'warning'})
                 }else{
                      if(res.data.succeeded == true){
                          this['$message']({message:"保存成功。",type:'success'})
                          this.centerDialogVisible = false;
                          this.dicFindLists();
                          this.addFiles.title='';
	                      this.addFiles.titleNode='';
                    }
                 }
                
             })
         }
         //编辑数据字典
         ChangeName(){
             if(this.selectIndex == -1){
                 this['$message']({message:"请选择要编辑的数据。",type:'warning'})
             }else{
                 this.EditcenterDialogVisible = true;
                 this.editFiles.titleNode = this.itemData.comments;
                 this.editFiles.title = this.itemData.name;
             }
             
         }
         //编辑的确定
         EditcenterDialogVisibleEvent(){
             if(this.editFiles.title == ''){
                 this['$message']({message:"请完善数据。",type:'warning'})
             }else{
                 Service.dicSave({
                    "name":this.editFiles.title,
                    "comments":this.editFiles.titleNode,
                    "id":this.itemData.id
                 }).then(res=>{
                     if(res.data.succeeded == true){
                          this['$message']({message:"保存成功。",type:'success'})
                          this.EditcenterDialogVisible = false;
                          this.dicFindLists();
                    }
                 })
             }
         }
         //删除数据字典
         Delete(){
             if(this.itemData.id== undefined){
                 this['$message']({message:"请选择要删除的数据。",type:'warning'})
             }else{
                this['$confirm']('确认删除选中数据吗？', {
                    type: 'warning'
                }).then(res=>{
                     Service.dicDelete(
                         this.itemData.id,
                    ).then(res=>{
                        if(res.data.succeeded == true){
                            this['$message']({message:"删除成功。",type:'success'});
                            this.dicFindLists();
                        }
                    })
                })
             }
         }
         //表格的编辑
         editTable(index,row){
             console.log(row)
             this.EditTableMask = true;
             this.EditTableFile.title = row.displayText;
             this.EditTableFile.titleNode = row.comments;
             this.EditTableFile.code = row.code;
            //  this.tableIndex = row.id;
         }
         //表格编辑的确定
         EditTableMaskEvent(){
             if(this.EditTableFile.title == '' ||this.EditTableFile.titleNode == ''){
                 this['$message']({message:"请完善数据。",type:'warning'})
             }else{
                 Service.dicDataUpSave({
                    "dictId":this.itemData.id,
                    "displayText":this.EditTableFile.title,
                    "code":this.EditTableFile.code,
                    "comments":this.EditTableFile.titleNode
                }).then(res=>{
                    if(res.data.succeeded == true){
                          this['$message']({message:"保存成功。",type:'success'})
                          this.EditTableMask = false;
                          this.colorServer();
                    }
                })
             }
             
         }
         //表格的删除
         deleteTable(index,row){
              this['$confirm']('确认删除选中数据吗？', {
                    type: 'warning'
                }).then(res=>{
                     Service.dicDatadelete({
                         "dictId":this.itemData.id,
	                     "code":row.code
                    }).then(res=>{
                        if(res.data.succeeded == true){
                            this['$message']({message:"删除成功。",type:'success'});
                            this.colorServer();
                        }
                    })
                })
            
         }
         //新增字典值
         AddMask(){
            this.AddTableMask = true;
         }
         //表格新增确定
         AddTableMaskEvent(){
               if(this.AddTableFile.title == '' || this.AddTableFile.code== ''){
                     this['$message']({message:"请完善数据。",type:'warning'})
                 }else{
                     Service.dicDataSave({
                        "dictId":this.itemData.id,
                        "displayText":this.AddTableFile.title,
                        "code":this.AddTableFile.code,
                        "comments":this.AddTableFile.titleNode
                    }).then(res=>{
                            if(res.data.succeeded == true){
                                this['$message']({message:"保存成功。",type:'success'})
                                this.AddTableMask = false;
                                this.colorServer();
                                this.AddTableFile.title = '';
                                this.AddTableFile.code='';
                                this.AddTableFile.titleNode='';
                            }else{
                                this['$message']({message:res.data.errorMessage,type:'warning'})
                            }
                    })
                 }
         }
         AddColor(row){
             console.log(row)
             this.selectIndex = row.id;
             this.itemData = row;
             if(this.selectIndex == -1){

             }else{
                 this.colorServer();
                 this.tableShow = true;
             }
         }
         //表格数据
         colorServer(){
             Service.dicgetDictListByDictId(this.itemData.id).then(res=>{
                     if(res.data.succeeded == true){
                         this.DangList = res.data.data;
                     }
                     
                 })
         }
         //左侧数据
         dicFindLists(){
             Service.dicFindList({}).then(res=>{
                this.listData = res.data;
            })
         }
         mounted() {
                window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight -279;
                })()
            };
            this.dicFindLists();
         }
         
    }
    
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/dataDictionary/dataDictionary.scss';
</style>