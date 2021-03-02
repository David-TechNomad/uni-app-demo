<template>
    <section class="wrapprSection workFileManagementView">
        <div class="mainTitle">
           <span>工作文档著录</span>
        </div> 
        <div class="fileShowView boxshow">
             <el-table :height="(bodyHeight + 10) / 2" :data="handMockList" :highlight-current-row="hand" v-loading="listLoading1" class="defaultTable" header-row-class-name="tableHeader">
                <el-table-column  prop="name" label="手工管理">
                    <template slot-scope="scope">
                          <p @click="changeTable('hand',scope.row)"><span class="pdr-10">{{scope.$index + 1}}</span> <span>{{scope.row.className}}</span></p>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :height="(bodyHeight + 10)  / 2" :data="autoMockList" :highlight-current-row="auto" v-loading="listLoading1" class="defaultTable" header-row-class-name="tableHeader">
                <el-table-column  prop="name" label="自动生成">
                    <template slot-scope="scope">
                          <p @click="changeTable('auto',scope.row)"><span class="pdr-10">{{scope.$index + 1}}</span> <span>{{scope.row.className}}</span></p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="contentbox"> 
            <div class="searchKey boxshow">
                <el-form  :inline="true" :model="filters" class="doneForm topParamsForm">
                    <el-form-item label="工作文档号：">
                        <el-input placeholder="单行输入" size="small" v-model="filters.workDocumentNo"></el-input>
                    </el-form-item>
                    <el-form-item label="年度：">
                        <el-input placeholder="单行输入" size="small" v-model="filters.year"></el-input>
                    </el-form-item>
                    <el-form-item label="责任者：">
                        <el-input placeholder="单行输入" size="small" v-model="filters.author"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="defaultBtn"  @click="dataCheckeds" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="mainCon basicList pd10 boxshow bgwhite mt10">
                <div class="text-right" v-show="hand">     
                    <el-button class="blueBtn" @click="addRecode()">新增</el-button>
                    <!--<el-button class="redBtn" @click="gotopage('appraisal')">删除</el-button>  -->
                    <el-button class="defaultBtn" @click="findUploadList1()">挂接</el-button>
                </div>
                <!--<div class="text-right" v-show="auto">
                    <el-button class="defaultBtn" @click="findUploadList()">挂接</el-button> 
                    <el-button class="defaultBtn" @click="daYin">打印</el-button>
                </div>-->
                <el-table border stripe @selection-change="handleSelectionChange" :show-header="true" :height="bodyHeight - 120" :data="wordFieldData" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                    <el-table-column
                        type="selection"
                        v-if="tableHeaderAttr.length>0"
                        width="55">
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号" v-if="tableHeaderAttr.length>0"></el-table-column>
                    <el-table-column  label="操作"  width="150" v-if="tableHeaderAttr.length>0">
                        <template slot-scope="scope">
                            <div v-show="hand">
                                <el-button class="tabletoolBtn" @click="bianJi(scope.row)">编辑</el-button>
                                <el-button class="tabletoolBtn" @click="shanChu(scope.row)">删除</el-button>
                            </div>
                            <div v-show="auto">
                                <el-button class="tabletoolBtn" @click="findUploadList(scope.row)">挂接</el-button>
                                <el-button class="tabletoolBtn" @click="daYin(scope.row)">打印</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :prop="item.fieldName" :label="item.text" v-for="item in tableHeaderAttr">
                        <template slot-scope="scope">
                            <span v-if="item.userType == 5">{{dateFormat(scope.row,item)}}</span>
                            <span v-else-if="item.text == '原文'">
                                <span v-show="scope.row[item.fieldName]">
                                    <i class="fa fa-paperclip tableIcon"></i>
                                </span>
                            </span>
                            <span v-else>{{scope.row[item.fieldName]}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                    <!--工具条分页-->
                <div class="clear" style="margin-top:10px">                         
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="filters.pageSize"
                    layout="total, sizes, prev,pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog
                :title = "fieldTitle"
                :visible.sync="fieldAddSetVisible"
                :closeOnClickModal="true"
                :closeOnPressEscape="false"
                :before-close="handleClose"
                top="4%"
                width="50%" class="myDialogCenter">
            <el-form :model="fieldForm" ref="fieldForm" label-width="130px" :rules="fieldRules">
                <el-form-item :label="item.caption" :prop="item.propertyName" v-for="item in docAttr">
                    <el-select v-model="fieldForm[item.propertyName]" placeholder="请选择" clearable v-if="item.userType=='3'" style="width: 220px">
                        <el-option
                                v-for="it in attrObj[item.caption+'Attr']"
                                :key="it.code"
                                :label="it.displayText"
                                :value="it.code">
                        </el-option>
                    </el-select>
                    <el-select v-model="fieldForm[item.propertyName]"  v-else-if="item.userType=='4'" placeholder="" style="width:100%" size="small">
                        <el-option label="是" :value="boolValue.tr"></el-option>
                        <el-option label="否" :value="boolValue.fl"></el-option>
                    </el-select>
                    <el-input-number size="small" v-else-if="item.userType=='2'" v-model="fieldForm[item.propertyName]" style="width: 220px"></el-input-number>
                    <el-date-picker size="small" v-else-if="item.userType=='5'" v-model="fieldForm[item.propertyName]" type="date" placeholder="选择日期" style="width: 220px">
                    </el-date-picker>
                    <el-input size="small" v-else v-model="fieldForm[item.propertyName]" style="width: 220px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-show="fieldTitle == '新增'" @click="addField('fieldForm')" class="defaultBtn">保存</el-button>
                <el-button type="primary" v-show="fieldTitle == '编辑'" @click="updateField('fieldForm')" class="defaultBtn">保存</el-button>
                <el-button @click="fieldAddSetVisible = false;fieldForm = {};" class="defaultBtn">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title = "挂接原文"

                :visible.sync="fieleUploadSetVisible"
                :closeOnClickModal="false"
                :closeOnPressEscape="false"
                top="4%"
                width="80%" class="myDialogCenter">
            <div style="width: 100%;border: 1px solid black;" v-loading="dialogLoading">
                <div style="width: 40%;height: 600px;display: inline-block;border-right: 1px solid black;overflow:scroll">
                    <div style="height: 50px;width: auto;border-bottom: 1px solid black;text-align: center;margin-top: 10px;">
                        <el-button class="blueBtn" @click="guaJie">挂接原文</el-button>
                        <el-button class="blueBtn" @click="deleteYanWen">删除</el-button>
                        <el-button class="blueBtn" @click="reLoad">刷新</el-button>
                    </div>
                    <div v-for="(item,index) in fileAttr" :class='{selectPdfColor:index==nowIndex}'>
                        <div @click="getPdf(item.id,index)" v-if="item.isOk" style="border-bottom: 1px solid #b2b2b2"><img  :src="item.url"  width="200px" height="250px"  style="cursor:pointer;"/><span style="display: block;margin-left: 10px">{{item.name}}</span></div>
                        <div @click="getPdf(item.id,index)" v-else style="border-bottom: 1px solid #b2b2b2"><img  src="../../../imgs/noPic.jpg" width="200px" height="250px" style="cursor:pointer;"/><span style="display: block;margin-left: 10px">{{item.name}}</span></div>
                    </div>
                </div>
                <div style="height: 600px;width:59%;display: inline-block">
                    <iframe id='previewPdf' :src="file" height="100%" v-show="showIframe"
                            width="100%">
                    </iframe>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <!--<el-button type="primary" v-show="fieldTitle == '新增'" @click="addField('fieldForm')" class="defaultBtn">保存</el-button>
                <el-button type="primary" v-show="fieldTitle == '编辑'" @click="updateField('fieldForm')" class="defaultBtn">保存</el-button>-->
                <el-button @click="fieleUploadSetVisible = false;" class="defaultBtn">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title = "挂接原文"
                :visible.sync="uploadSetVisible"
                :closeOnClickModal="false"
                :closeOnPressEscape="false"
                top="4%"
                width="50%" class="myDialogCenter">
            <el-upload
                    class="upload-demo"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleDeviceSuccess"
                    :before-remove="beforeRemove"
                    :before-upload="beforeUpload"
                    :show-file-list = "false"
                    :file-list="fileList">
                <el-button size="small" class="defaultBtn">选择文件</el-button>
                <span>{{fileName}}</span>
            </el-upload>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFile()" class="defaultBtn">上传</el-button>
                <el-button @click="uploadSetVisible = false;" class="defaultBtn">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog :show-close = 'false' class="fileModal processModal" :visible.sync="fileVisible1" :close-on-click-modal="false">
            <div>
                <el-progress type="circle" :stroke-width="12" :percentage="process" color="rgb(146,176,0)"></el-progress>
            </div>
        </el-dialog>

     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './recordManagement.service' 
    import mockData from '@/mock/data/mockData';
    import moment from 'moment';
    import axios from 'axios';
    @Component()
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 202 ; 
        addPreCleanSetVisible:Boolean = false;
        auto:Boolean = false;
        fieleUploadSetVisible:boolean;
        uploadSetVisible:boolean;
        fileVisible1:boolean;
        hand:Boolean = true;
        radio3: string = '1';
        listLoading:boolean;
        mockList:any = [];
        treedata001: any = [];
        objFile:any = {};
        activeName:string = 'file';
        showIframe:boolean;
        tableData: any =[];
        total: number = 0;
        page: number = 0;
        pageSize: number = 25;
        nowIndex: number;
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };
        boolValue:any = {};
        listLoading1:boolean;
        dialogLoading:boolean;
        fieldForm:any = {};
        handMockList:any = [];
        autoMockList:any = [];
        tableHeaderAttr:any = [];
        filters:any = {};
        wordFieldData:any = [];
        wordObj:any = {};
        fieldAddSetVisible:boolean;
        docAttr:any = [];
        dictAttr:any = [];
        typeAttr:any = [];
        attrObj:any = {};
        fieldTitle:string;
        multipleSelection:any = [];
        fileName:string;
        fileAttr:any = [];
        file:any;
        fileUrl:string;
        guaJieObj:any = {};
        process: number = 0;
        baseUrl:any= process.env.API_BASEURL;
        baseUrl1:any= process.env.API_BASEURL2;
        defaultImg: string //默认图地址
        yuanWenId:number;
        constructor(){
            super();
            this.listLoading1 = false;
            this.showIframe = false;
            this.nowIndex = -1;
            this.mockList = [];
            this.handMockList = [];
            this.objFile = {};
            this.autoMockList = [];
            this.tableHeaderAttr = [];
            this.filters = {
                workDocumentNo:"",
                year:"",
                author:"",
                page:0,
                pageSize:10
            };
            this.fileVisible1 = false;
            this.wordFieldData = [];
            this.listLoading = false;
            this.wordObj = {};
            this.fieldAddSetVisible = false;
            this.fieldForm = {

            };
            this.fileUrl = '';
            this.guaJieObj = {};
            this.docAttr = [];
            this.dictAttr = [];
            this.typeAttr = [];
            this.attrObj = {};
            this.fieldTitle = '';
            this.multipleSelection = [];
            this.fieleUploadSetVisible = false;
            this.uploadSetVisible = false;
            this.dialogLoading = false;
            this.fileName = "";
            this.fileAttr = [];
            this.defaultImg = 'this.src=../../../imgs/noPic.jpg"';
            this.yuanWenId = 0;
            this.boolValue = {
                tr:true,
                fl:false
            };
        };
        handleCurrentChange(val:number) {
            this.filters.page = val-1;
            this.queryWkDocGridDatas();
        };
        goBack() {
            this['$router'].go(-1);//返回上一层
        };
        handleSizeChange(val:number) {
            this.filters.pageSize = val;
            this.queryWkDocGridDatas();
        };

        changeTable(val,row) {
            this.listLoading = true;
            if(val === 'hand') {
                this.hand = true;
                this.auto = false;
            } else {
                this.hand = false;
                this.auto = true;
            }
            this.wordObj = row;
            Service.queryWkDocGridColumns({"classNo":row.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.tableHeaderAttr = res.data.data;
                    this.queryWkDocGridDatas();
                } else {
                    this.Warn(res.data.errorMessage);
                }
                this.listLoading = false;
            });
        };

        queryWkDocGridDatas(){
            Service.queryWkDocGridDatas({
                "classNo":this.wordObj.classNo,
                "workDocumentNo":this.filters.workDocumentNo,
                "year":this.filters.year,
                "author":this.filters.author,
                "page":this.filters.page,
                "pageSize":this.filters.pageSize
            }).then((res) =>{
                if(res.data.succeeded) {
                    this.wordFieldData = res.data.data;
                    this.total = res.data.totalRecords;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        dataCheckeds(){
            if(Object.keys(this.wordObj).length == 0){
                /*if(this.multipleSelection.length != 1){
                    this.Warn("请选择文档类型");
                    return;
                }*/
                return;
            }
            this.queryWkDocGridDatas();
        }

        //文档类别列表
        queryWkDocClassNos(){
            this.listLoading1 = true;
            Service.queryWkDocClassNos({}).then((res) =>{
                if(res.data.succeeded) {
                    this.mockList = res.data.data;
                    this.handMockList = [];
                    this.autoMockList = [];
                    for(let i = 0;i < this.mockList.length;i++){
                        if(this.mockList[i].wkDocType == 0){
                            this.handMockList.push(this.mockList[i]);
                        }else if(this.mockList[i].wkDocType == 1){
                            this.autoMockList.push(this.mockList[i]);
                        }
                    }
                } else {
                    this.Warn(res.data.errorMessage);
                }
                this.listLoading1 = false;
            })
        }

        daYin(row){
            Service.workPrint({
                "classNo":this.wordObj.classNo,
                "infoId":row.id
            }).then((res) =>{
                console.log(res)
                if(res.type=='application/json') {
                    let that = this;
                    let reader = new FileReader();
                    reader.readAsText(res);
                    reader.onload = function(event) {
                        // 文件里的文本会在这里被打印出来
                        let str = JSON.parse(event.target.result)
                        that.Warn(str.errorMessage);
                    };
                } else {
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        let csvData = new Blob([res],{type: 'application/pdf'});
                        window.navigator.msSaveOrOpenBlob(csvData,'document.pdf');
                    }else{
                        let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
                        window.open(url);
                    }
                }
            });
            /*if(this.multipleSelection.length == 0 || this.multipleSelection.length > 1) {
                this.Warn("请选择一条数据");
                return;
            }
            Service.workPrint({
                "classNo":this.wordObj.classNo,
                "infoId":this.multipleSelection[0].id
            }).then((res) =>{
                if(res.data.succeeded) {
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        let csvData = new Blob([res],{type: 'application/pdf'});
                        window.navigator.msSaveOrOpenBlob(csvData,'document.pdf');
                    }else{
                        let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
                        window.open(url);
                    }
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });*/
        }

        addRecode(j){
            if(Object.keys(this.wordObj).length == 0){
                if(this.multipleSelection.length != 1){
                    this.Warn("请选择文档类型");
                    return;
                }
            }
            Service.queryWkDocEditorControls({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.docAttr = res.data.data;
                    for(let i = 0;i < this.docAttr.length;i++){
                        if(j != 1){
                            this.$set(this.fieldForm,this.docAttr[i].propertyName,"");
                            this.fieldTitle = '新增';
                        }
                        if(this.docAttr[i].userType == 3){
                            Service.getDictListByDictId(this.docAttr[i].dictionaryId).then((res) =>{
                                if(res.data.succeeded) {
                                    this.$set(this.attrObj,this.docAttr[i].caption + 'Attr',res.data.data)
                                } else {
                                    this.Warn(res.data.errorMessage);
                                }
                            });
                        }
                    }
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
            this.fieldAddSetVisible = true;
        }

        addField(){
            for(let item in this.fieldForm){
                this.fieldForm[item] == 'true'?true:false
            }
            let obj = {"classNo":this.wordObj.classNo};
            Object.assign(obj, this.fieldForm);
            console.log(this.fieldForm)
            Service.wordAdd(obj).then((res) =>{
                if(res.data.succeeded) {
                    this.Suces("新增成功");
                    this.fieldAddSetVisible = false;
                    this.fieldForm = {};
                    this.queryWkDocGridDatas();
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        updateField(){
            Service.wordUpdate(this.fieldForm).then((res) =>{
                if(res.data.succeeded) {
                    this.Suces("编辑成功");
                    this.fieldAddSetVisible = false;
                    this.fieldForm = {};
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        bianJi(row){
            this.fieldTitle = '编辑';
            this.addRecode(1);
            Service.queryWkDocGridData({"infoId":row.id}).then((res) =>{
                if(res.data.succeeded) {
                    this.fieldForm = res.data.data;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        shanChu(row){
            Service.wordDelete({"id":row.id}).then((res) =>{
                if(res.data.succeeded) {
                    this.Suces("删除成功");
                    this.changeTable('hand',this.wordObj);
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        // 转化文件流
        getObjectURL(file) {
            let url = null;
            if (window['createObjectURL'] != undefined) { // basic
                url = window['createObjectURL'](file);
            } else if (window['webkitURL'] != undefined) { // webkit or chrome
                url = window['webkitURL']['createObjectURL'](file);
            } else if (window['URL'] != undefined) { // mozilla(firefox)
                url = window['URL']['createObjectURL'](file);
            }
            return url;

        };

        getPdf(id,index){
            this.nowIndex = index;
            this.showIframe = true;
            this.yuanWenId = id;
            /*let fileUrl = this.baseUrl1+'/workdoc/downWorkDocFile?type=0&id='+id;
            let url = encodeURIComponent(fileUrl);
            this.file = 'static/pdf/web/viewer.html?file=' + url;
            document.getElementById('previewPdf').setAttribute('src',this.file)*/
            Service.downWorkDocFile({
                "id":id,
                "type":0
            }).then((res) =>{
                debugger;
                let blob = new Blob([res],{type: 'application/pdf'});
                this.fileUrl = this.getObjectURL(blob);
                console.log(this.fileUrl)
                this.file = 'static/pdf/web/viewer.html?file=' + this.fileUrl;
                document.getElementById('previewPdf').setAttribute('src',this.file);
            });
        }

        reLoad(){
            this.dialogLoading = true;
            if(this.hand){
                this.findUploadList1(1);
            }else{
                this.findUploadList(this.guaJieObj);
            }

        }

        async findUploadList(row){
            //this.showIframe = false;
            this.nowIndex = -1;
            this.guaJieObj = row;
            var that = this;
            that.fileAttr = [];
            await Service.wordAttachedList({"infoId":this.guaJieObj.id}).then((res) =>{
                if(res.data.succeeded) {
                    this.getDownWorkDocFile(res.data.data);
                    /*for (let i = 0;i < res.data.data.length;i++){
                        let obj = {
                            id:res.data.data[i].id,
                            name:res.data.data[i].originalFileName,
                            url:"",
                            isOk:false
                        };
                        Service.downWorkDocFile({
                            "id":res.data.data[i].id,
                            "type":1
                        }).then((res1) =>{
                            if(res1.type == 'image/jpeg'){
                                let blob = new Blob([res1],{type: 'application/pdf'});
                                obj.url = this.getObjectURL(blob);
                                obj.isOk = true;
                            }
                            that.fileAttr.push(obj);
                        });
                    }
                    this.fieleUploadSetVisible = true;*/
                    this.fieleUploadSetVisible = true;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        async getDownWorkDocFile(attr){
            for (let i = 0;i < attr.length;i++){
                let obj = {
                    id:attr[i].id,
                    name:attr[i].originalFileName,
                    url:"",
                    isOk:false
                };
                await Service.downWorkDocFile({
                    "id":attr[i].id,
                    "type":1
                }).then((res1) =>{
                    debugger;
                    if(res1.type == 'image/jpeg'){
                        let blob = new Blob([res1],{type: 'application/pdf'});
                        obj.url = this.getObjectURL(blob);
                        obj.isOk = true;
                    }
                    this.fileAttr.push(obj);
                });
            }
            this.dialogLoading = false;
        }

        async findUploadList1(){
            if(this.multipleSelection.length != 1){
                this.Warn("请选择一条数据");
                return;
            }
            //this.showIframe = false;
            this.nowIndex = -1;
            var that = this;
            that.fileAttr = [];
            await Service.wordAttachedList({"infoId":this.multipleSelection[0].id}).then((res) =>{
                if(res.data.succeeded) {
                    this.getDownWorkDocFile(res.data.data);
                    /*for (let i = 0;i < res.data.data.length;i++){
                        let obj = {
                            id:res.data.data[i].id,
                            name:res.data.data[i].originalFileName,
                            url:"",
                            isOk:false
                        };
                        Service.downWorkDocFile({
                            "id":res.data.data[i].id,
                            "type":1
                        }).then((res1) =>{
                            if(res1.type == 'image/jpeg'){
                                let blob = new Blob([res1],{type: 'application/pdf'});
                                obj.url = this.getObjectURL(blob);
                                obj.isOk = true;
                            }
                            that.fileAttr.push(obj);
                        });


                    }
                    this.fieleUploadSetVisible = true;*/
                    this.fieleUploadSetVisible = true;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        deleteYanWen(){
            Service.deleteWorkAttached({"id":this.yuanWenId}).then((res) =>{
                if(res.data.succeeded) {
                    this.Suces("删除成功");
                    window.URL.revokeObjectURL(this.fileUrl);
                    this.reLoad();
                    this.showIframe = false;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        guaJie(){
            this.fileName = "";
            this.uploadSetVisible = true;
        }

        submitFile(){
            if(Object.keys(this.objFile).length == 0){
                this.Warn("请先选择文件！");
                return;
            }
            let id = 0;
            if(this.multipleSelection.length == 0){
                id=this.guaJieObj.id;
            }else{
                id=this.multipleSelection[0].id;
            }
            this.fileVisible1 = true;
            var Form = new FormData();
            Form.append('file',this.objFile)
            Form.append('infoId', id);
            axios({
                url: this.baseUrl1 + '/workdoc/uploadAttach',
                method: 'post',
                withCredentials:true,//携带cookie
                data: Form,
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    // progressEvent.loaded:已上传文件大小
                    // progressEvent.total:被上传文件的总大小
                    this.process = Math.round((progressEvent.loaded / progressEvent.total * 100))
                }
            }).then(res => {
                if(this.process == 100){
                    this.fileVisible1 = false;
                    this.uploadSetVisible = false;
                    this.reLoad();
                    this.objFile = {};
                }
            });
        }

        // 表格内时间格式化
        dateFormat(row,item) {
            var date = row[item.fieldName];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        };

        created(){
            this.queryWkDocClassNos();
            Service.getDictListByDictId(255).then((res) =>{
                if(res.data.succeeded) {
                    this.dictAttr = res.data.data;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });

            Service.allSupportedTypes({}).then((res) =>{// 支持上传的文件类型
                if(res.data.succeeded) {
                    let partTypeAttr = res.data.data;
                    for (let child of partTypeAttr){
                        if(child.value1 == 'Document' || child.value1 == 'Image'){
                            for(let child1 of child.value2){
                                this.typeAttr.push(child1);
                            }
                        }
                    }
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 202;
                })()
            };
        };

        beforeUpload(file){
            let fileFormat = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
            if(this.typeAttr.indexOf(fileFormat.toLowerCase()) < 0){
                this.Warn("不支持该文件类型，请重新选择！");
                return;
            }
            this.objFile = file;
            this.fileName = file.name;
        }

        handleSelectionChange(val) {
            this.multipleSelection = val;
        }

        handleClose(){
            this.fieldAddSetVisible = false;
            this.fieldForm = {};
        }

        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };
        //失败信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
    .workFileManagementView >>>.tree{
        top:-8px;
    }
    .workFileManagementView{
        .fileShowView{
            width: 250px;
            left: 10px;
            position: absolute;
            top: 50px;
            background: #fff;
            padding: 10px;
        }
        .contentbox.boxshow{
                left: 575px;
                background: #fff;
                padding: 10px;
                .retrievalView {
                    padding: 15px 0 5px 20px;
                }
            }
    }

    .el-table {
    td{
        border: none;
    }
    }

</style>
