<template>
    <div style="height:100%;padding:10px 10px 0;position:relative">
       <div class="infileHeader">
           <span style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;">文件管理</span>
           <p>案卷题名 :
               <el-tooltip class="item" effect="dark" :visible-arrow='false' :content="Title" placement="bottom"><i>{{Title}}</i></el-tooltip>
           </p>
           <div>
               <el-button class="checkWay">卷内文件列表</el-button>
               <el-button class="checkWay" @click="Goback">返回</el-button>
           </div>
       </div>
        <div class="infiledivTwo" style="background: #ffffff;">
            <el-form :model="searchkeyOne" @submit.native.prevent class="stagesupersearch">
                <el-form-item>
                    <el-input v-model="searchkeyOne.key" @keyup.enter.native="searchKey"></el-input>
                    <div class="rt">
                        <el-button class="indexWay" @click="searchKey" style="margin-left:15px;">检索</el-button>
                        <el-button class="indexWay" @click="clearSearch">清空</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <!--<el-form :model="searchform"  class="LIneFeedForm">-->
                <!--<template v-for="item in searchConfig">-->
                    <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
                        <!--<el-select v-model="searchform['value'+item.id]" >-->
                            <!--<el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'">-->
                        <!--<el-input v-model.trim="searchform['value'+item.id]"></el-input>-->
                    <!--</el-form-item>-->
                <!--</template>-->
                <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="searchKey">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
            <!--</el-form>-->
        </div>
        <div class="infilerowThr">
            <div class="adjustpositions">
                <el-button type="primary" class="checkWay" @click="positionUp"><i></i></el-button>
                <el-button type="primary" class="checkWay" @click="positionDown"><i></i></el-button>
            </div>
            <div class="infileButton">
                <div style="width: 100px;float: right;line-height:30px;" type="primary" class="toolButton-one mybuttons" @click.stop="pull_down_menu=!pull_down_menu">=
                    <ul v-show="pull_down_menu" @click="showFalse">
                        <li class="buttonlis"><el-button class="checkWay" type="primary" @click="NewAddFile">新增</el-button></li>
                        <li class="buttonlis"><el-button class="checkWay" type="primary">删除</el-button></li>
                        <!--<li class="buttonlis"><el-button class="checkWay" type="primary" >移出</el-button></li>-->
                        <li class="buttonlis"><el-button class="checkWay" type="primary" @click="goAdjust">生成顺序号</el-button></li>
                        <li class="buttonlis"><el-button class="checkWay" type="primary">批量修改</el-button></li>
                        <li class="buttonlis" @click.stop="BoxmenuShowTwo"><button class="mybuttons myboxspan" type="primary">移卷
                            <span class="spansTwo">
                            </span>
                        </button></li>
                        <li class="buttonlis"><el-button class="checkWay" @click="ConcateFile(this.Id)" type="primary">批量挂接</el-button></li>
                        <li class="buttonlis"><el-button class="checkWay" @click="modelPrint" type="primary">模板打印</el-button></li>
                        <li class="buttonlis" @click.stop="BoxmenuShow"><button type="primary" class="box_ul  mybuttons">
                            数据管理
                            <span class="spans">
                            </span>
                        </button></li>
                    </ul>
                    <ul v-if="box_ul_show">
                        <li @click="loadNumberModel()">数据模板下载</li>
                        <li @click="importNumber">导入数据</li>
                        <li @click="exportNumTrue=true">导出数据</li>
                        <li @click="goCheck">档号筛查</li>
                        <li @click="NumTopage">页数转页次</li>
                        <li @click="pageToNum">页次转页数</li>
                        <!--<li>日期格式校对</li>-->
                    </ul>
                    <ul v-if="box_ul_showTwo">
                        <li>生成新卷</li>
                        <li>移到现有卷</li>
                        <li>移到未整理</li>
                    </ul>
                </div>
            </div>
            <div class="infilenthDivthree">
                <el-button type="primary" class="toolButtons checkWay " @click="BZPosition"><></el-button>
                <el-button type="primary" class="toolButtons checkWay addButton" @click="NewAddFile">新增</el-button>
                <el-button type="primary" class="toolButtons checkWay deleteButton" @click="deleteFile">删除</el-button>
                <!--<el-button type="primary" class="toolButtons checkWay" @click="removeFile">移出</el-button>-->
                <el-button type="primary" class="toolButtons checkWay" @click="goAdjust">生成顺序号</el-button>
                <el-button type="primary" class="toolButtons checkWay" @click="revampMany">批量修改</el-button>
                <span style="display: inline-block;position: relative;float: left;">
                <div style="width: 50px;float: right;line-height:30px;margin-left:5px;position: static" class="NumberManage mybuttons toolButtons"  @click.stop="transformClick" >移卷
                    <ul v-if="transformFile">
                        <li @click="goremoveNew">生成新卷</li>
                        <li @click="goremoveOld">移到现有卷</li>
                        <li @click="removeFile">移到未整理</li>
                    </ul>
                    <span class="myspan"></span>
                </div>
                </span>
                <el-button type="primary" class="toolButtons checkWay" @click="ConcateFile(this.Id)">批量挂接</el-button>
                <el-button class="checkWay toolButtons" type="primary" @click="modelPrint">模板打印</el-button>
                <span style="display: inline-block;position: relative;float: left;">
                <div style="width: 80px;float:right;line-height:30px;margin-left:5px;" class="NumberManage toolButtons mybuttons" @click.stop="menuShow">
                    数据管理
                    <ul v-if="ul_show" >
                        <li @click="loadNumberModel()">数据模板下载</li>
                        <li @click="importNumber">导入数据</li>
                        <li @click="exportNumTrue=true">导出数据</li>
                        <li @click="goCheck">档号筛查</li>
                        <li @click="NumTopage">页数转页次</li>
                        <li @click="pageToNum">页次转页数</li>
                        <!--<li @click="checkTime">日期格式校对</li>-->
                    </ul>
                    <span class="span"></span>
                </div>
                </span>
            </div>
        </div>
        <div class="tableContainer">           
            <el-table
                    :data="data"
                    style="width:100%"
                    :stripe="true"
                    :height="FiletableHeight"
                    v-loading="isloading"
                    class="containTable indexTable lineTable"
                    @selection-change="selectionChange"
                    @row-dblclick="RowDblclick"
                    border                   
                    @sort-change="headerclick"
                    >
                <el-table-column type="selection" width="55" ></el-table-column>
                <el-table-column prop="Serial" label="序号"></el-table-column>
                <!--<el-table-column width="85">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button-->
                                <!--size="mini"-->
                                <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <template  v-for="item in tableHeader">
                <el-table-column :width="item.width" :prop="item.dictData===null?item.fieldName:item.fieldName+'_Text'" :label="item.caption"  v-if="!item.hidden&&item.fieldName!='BZ'&&item.fieldName!='BZ1'" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                    <el-table-column v-if="!item.hidden&&item.fieldName=='BZ'&&!headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                    <el-table-column v-if="!item.hidden&&item.fieldName=='BZ1'&&headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>

                </template>
            </el-table>
        </div>
        <div class="infilepager">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[500,800,1000]" :page-size="limit" :total="total" :current-page="page" :pager-count="5" style="float: right;"></el-pagination>
        </div>
        <el-dialog title="批量修改" :visible.sync="repalceMany" class="myDialog" :close-on-click-modal="false" :modal-append-to-body='false'>
            <el-container>
                <el-row class="poptabs rightCenter Manyamend">
                    <el-col>
                        <el-tabs v-model="activenames" type="card" @tab-click="AmendTabClick">
                            <el-tab-pane label="按内容替换" name="one">
                                <el-form :model="form" label-width="120px">
                                    <el-form-item label="著录项 : ">
                                        <el-select v-model="form.region" class="longInput" @change="elSelectChange">
                                            <el-option v-for='ind in formArr' :label="ind.caption" :value="ind.fieldName" :key="ind.fieldName" v-if="ind?ind.type!=3:true"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="要替换的值 :">
                                        <el-input v-model.trim="form.replaceValue" class="longInput" v-show="ElSelectTrue||form.region=='XMBH'||form.region=='XMMCNEW'"></el-input>
                                        <el-select v-model="form.replaceValue" class="longInput" v-show="!ElSelectTrue&&form.region!='XMBH'&&form.region!='XMMCNEW'">
                                            <el-option v-for='ind in formSelectArr' :label="ind.text" :value="ind.code" :key="ind.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="替换为 :">
                                        <el-input v-model.trim="form.replaceTo" class="longInput" v-show="ElSelectTrue"></el-input>
                                        <el-select v-model="form.replaceTo" filterable class="longInput" v-show="!ElSelectTrue">
                                            <el-option v-for='item in formSelectArr' :label="item.text" :value="item.code" :key="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="按位置替换" name="two">
                                <el-form :model="Addrform" label-width="120px">
                                    <el-form-item label="著录项 :">
                                        <el-select v-model="Addrform.region" placeholder="请选择" class="longInput">
                                            <el-option v-for="item in addArr" :label="item.caption" :value="item.fieldName" :key="item.fieldName" v-if="item?item.type!=3:true"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="要替换的字符位置 :" class="shortInput">
                                        <el-input v-model.trim="Addrform.startNumber"></el-input>
                                        至
                                        <el-input v-model.trim="Addrform.endNumber"></el-input>
                                    </el-form-item>
                                    <el-form-item label="替换为 :">
                                        <el-input v-model.trim="Addrform.replaceTo" class="longInput"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="合并著录项" name="three">
                                <el-form :model="combineform" label-width="120px">
                                    <el-form-item label="著录项A :">
                                        <el-select v-model="combineform.itemA" placeholder="请选择" class="longInput">
                                            <el-option v-for='item in formArr' :label="item.caption" :value="item.fieldName" :key="item.fieldName"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="连接符 :">
                                        <el-input v-model.trim="combineform.connectSign" class="longInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="著录项B :">
                                        <el-select v-model="combineform.itemB" placeholder="请选择" class="longInput">
                                            <el-option v-for='item in formArr' :label="item.caption" :value="item.fieldName" :key="item.fieldName"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="合并到著录项 :">
                                        <el-select v-model="combineform.concatTo" placeholder="请选择" class="longInput">
                                            <el-option v-for='item in formArr' :label="item.caption" :value="item.fieldName" :key="item.fieldName" v-if="item?item.type!=3:true"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </el-container>
            <div slot="footer" class="dialog-footer"><el-button class="checkWay" @click="SaveReplace">保存</el-button></div>
        </el-dialog>
        <!--<el-dialog title="日期格式校对" :visible.sync="checkTimeShow" class="myDialog" :close-on-click-modal="false">-->
        <!--</el-dialog>-->
        <el-dialog class="fileModal NumberModel" :visible.sync="NumberModelTrue" title="数据模板下载" :close-on-click-modal="false" :modal-append-to-body='false'>
            <el-radio v-model="checkNumberModel" label="xls">xls</el-radio>
            <el-radio v-model="checkNumberModel" label="xlsx">xlsx</el-radio>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="LoadingNumberModelOne">取 消</el-button>
                <el-button class="checkWay" @click="LoadingNumberModelTwo">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="ChoseFile importNumber" :visible.sync="commitDialogTrue" title="导入数据" :close-on-click-modal="false" :modal-append-to-body='false'>
            <div class="fileBox">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        :before-upload="BeforeUpload"
                        action=""action=""
                        :file-list="upList"
                        :limit="limitNumber"
                        accept="xls,xlsx"
                        :on-change="excelChange"
                        :on-remove="uploadOnRemove"
                        :on-exceed="Onexceed"
                        :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">请选择你要导入的Excel文件</div>
                    <div style="float:right" v-show="sheetNumberTrue">
                        <p style="margin-bottom:10px">请选择要上传的sheet表</p>
                        <el-select v-model="sheetSelc" placeholder="请选择">
                            <el-option
                                    v-for="item in sheetAll"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </el-upload>
                <div>
                    <span>上传版本 :</span>
                    <el-radio v-model="checkNumberModels" label="xls">xls</el-radio>
                    <el-radio v-model="checkNumberModels" label="xlsx">xlsx</el-radio>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="ConcelCommitNumber">取 消</el-button>
                <el-button class="checkWay" @click="ConfirmCommitNumber">上 传</el-button>
                <!--<el-button class="checkWay" @click="Confirmsheet" v-show="sheetNumberTrue">确 定</el-button>-->

            </div>
        </el-dialog>
        <el-dialog title="数据导出" :visible.sync="exportNumTrue" class="myDialog" :close-on-click-modal="false" :modal-append-to-body='false'>
            <el-row>
                <div class="exportrong">
                    选择导出范围
                </div>
                <div class="exportType">
                    <el-radio v-model="exportrong" label="1">所选数据</el-radio>
                    <el-radio v-model="exportrong" label="2">全部数据</el-radio>
                </div>
            </el-row>
            <el-row>
                <div class="exportrong">
                    选择导出内容
                </div>
                <div class="exportType">
                    <el-radio v-model="exportcontent" label="3">卷内</el-radio>
                </div>
            </el-row>
            <el-row>
                <div class="exportrong">
                    选择导出形式
                </div>
                <div class="exportType">
                    <el-radio v-model="exportStyle" label="1">目录</el-radio>
                    <el-radio v-model="exportStyle" label="2">目录及原文</el-radio>
                </div>
            </el-row>
            <el-row>
                <div class="exportrong">
                    选择导出类型
                </div>
                <div class="exportType">
                    <el-radio v-model="ExportType" label="xls">xls</el-radio>
                    <el-radio v-model="ExportType" label="xlsx">xlsx</el-radio>
                </div>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="confirmExport">确定导出</el-button>
            </div>
        </el-dialog>
        <!--批量挂接-->
        <el-dialog class="ConcateFile" :visible.sync="ConcateVisible" title="批量挂接" :modal-append-to-body='false'>
            <div class="selectPan">
                <span>选择挂接规则：</span>
                <!--<el-select v-model="ConcateType">
                    <el-option label="文件标题" :value="ConcateObj.title"></el-option>
                    <el-option label="文件标题+顺序号" :value="ConcateObj.titleNum"></el-option>
                </el-select>-->
                <el-select class="checkName" v-model="ConcateType" placeholder="请选择" @change = "changeType">
                    <el-option v-for="item in ConcateObj" :key="item.id" :label="item.ruleName" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <p style="font-size:12px;color:red;">备注说明：{{commit}}</p>
            <!--<p>选择云盘目录 :</p>-->
            <div class="ConcateTree">
                <div class="ConcateTreeTop" style="overflow-y: auto;">
                    <el-tree
                            :load="loadNode"
                            node-key="id"
                            lazy
                            :props="YPdefaultProps"
                            :expand-on-click-node="false"
                            @node-click = "setDataToTrees"
                    >
                    </el-tree>
                </div>
                <div class="ConcateTreeDown" style="overflow-y: auto;">
                    <div v-if="existFile&&!matchedCount" style="padding:10px;">
                        所选云盘共 <span style="font-size:15px;color:green;">{{dec}}</span> 份原文,请先匹配原文
                        <el-button class="checkWay rt" @click="checkOldFiles">匹配原文</el-button>
                    </div>
                    <div v-if="!existFile" style="padding:10px;">
                        所选云盘暂无原文，请先上传原文
                        <el-button class="checkWay rt" @click="fileUpBook">上传原文</el-button>
                    </div>
                    <div v-if="existFile&&matchedCount"  style="padding:10px;">
                        匹配成功 <span style="font-size:15px;color:green;">{{matchedCount}}</span> 条数据,可以开始挂接
                        <el-button class="checkWay rt" @click="checkOldFiles">匹配原文</el-button>
                    </div>
                    <div  style="padding:10px;" v-if="errorMacth&&errorMacth.length>0">
                        <div class="borderTable">
                            <el-table style="width: 100%" stripe :height="mathHeight" :data="errorMacth" highlight-current-row class="indexTable containTable">
                                <el-table-column prop="cloudFileName" label="文件名称" >
                                </el-table-column>
                                <el-table-column prop="matchCount" label="数量" >
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="beginCF">开始挂接</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './infile.service';
    import HttpRequest from '@/api/request';
    import { Loading } from 'element-ui';
    import XLSX from 'xlsx';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class infile extends Vue{
        sortable:string='custom';
        Title:string;//题名
        FiletableHeight:number;
        commit:string = '';
        libId:number;//卷内文件库libId
        fondId:number;
        YPdefaultProps:any={};
        parentId:number;
        dec:string;  //批量挂接的描述
        Id:number;
        treesId:number;
        qzh : string;
        kindId:number;
        data:any=[];
        tableHeight:number;
        taskId:number;
        tableHeader:any=[];
        ConcateObj:any = {};//挂接类型选择
        ul_show:boolean;
        pull_down_menu:boolean;
        box_ul_show:boolean;
        mathHeight:number;
        start:number;
        ConcateVisible:boolean;
        autoMatchParams:any={}; //自动匹配的参数
        total:number;
        page:number;
        anJuanId:any;
        arvhiveId : number;//列表行id
        wenId : number;//案卷库libId
        limit:number;
        searchConfig:any=[];//搜索项配置
        searchform:any={}
        searchContent:any=[]//搜索的内容
        transformFile:boolean//移卷
        box_ul_showTwo:boolean
        selection:any =[];//表格选中项
        repalceMany:boolean;//批量修改
        activenames:string;
        ConcateType :string;//挂接类型
        form:any={};
        formArr:any=[];
        Addrform:any={};
        addArr:any=[];
        riGuajie :boolean;
        combineform:any={};
        combineArr:any=[];
        combinefile:boolean;
        formSelectArr:any = [];
        ElSelectTrue:boolean;
        checkTimeShow:boolean;
        NumberModelTrue:boolean;
        checkNumberModel:string;
        Url:string;
        commitDialogTrue:boolean;
        checkNumberModels:string;
        upList:any = [];//上传的数组
        limitNumber:number;//上传文件的个数控制
        exportNumTrue:boolean;
        exportrong:string;
        exportcontent:string;
        exportStyle:string;
        ExportType:string;
        isProjectCompany:boolean;
        existFile:boolean;
        storeName:string;
        AJH:number;
        storeArr:any=[];
        errorMacth:any=[];
        loadingInstance:any;
        fondCode:string;
        matchedCount:any;
        // sort1:boolean;
        exchangeSeqUp:boolean;
        exchangeSeqDow:boolean;
        searchkeyOne:any={};
        searchValue:any;
        isloading:boolean;
        headBz:boolean;
        dqqzh:string;
        sheetNumberTrue:boolean;
        sheetAll:any=[];
        sheetSelc:number;
        sortStr:string;
        sortSort:string;
       constructor(){
           super();           
           this.treesId = null;
           this.FiletableHeight=document.documentElement.clientHeight-289;
           this.matchedCount = null;
           this.existFile = false;
           this.errorMacth = [];
           this.anJuanId = null;
           this.taskId = null;
           this.Title="";
           this.qzh = "";
           this.data=[];
           this.mathHeight = (document.documentElement.clientHeight - 152)/2-60;
           this.tableHeight=document.documentElement.clientHeight-201;
           this.tableHeader=[];
           this.YPdefaultProps = {
               isLeaf: 'hasChildren',
               label: 'name',
               id:'id'
           };
           this.autoMatchParams = {
               "wenJianLibId": '',
               "anJuanId": '',
               "fondId": '',
               "cloudDirectoryId": '',
               "matchRuleId": ''
           };
           this.ConcateType = '';
           this.ul_show=false;
           this.ConcateVisible = false;
           this.pull_down_menu=false;
           this.box_ul_show=false;
           this.total=0;
           this.page=1;
           this.limit=500;
           this.searchform={};
           this.searchContent=[];
           this.transformFile=false;
           this.box_ul_showTwo=false;
           this.selection = [];
           this.repalceMany = false;
           this.activenames='one';
           this.riGuajie = true;
           this.ConcateObj = {
//            title:1,
//            titleNum:2
           };
               this.form={
                   region:null,
                   replaceValue:null,
                   replaceTo:''
               };
           this.formArr=[];
           this.Addrform={
               region:null,
               startNumber:null,
               endNumber:null,
               replaceTo:''
           };
           this.addArr=[];
           this.combineform={
               itemA:null,
               connectSign:null,
               itemB:null,
               concatTo:null
           };
           this.combineArr=[];
           this.formSelectArr = [];
           this.ElSelectTrue = true;
           this.checkTimeShow = false;
           this.NumberModelTrue = false;
           this.checkNumberModel = 'xls';
           this.Url = HttpRequest['URLS'];
           this.commitDialogTrue = false;
           this.checkNumberModels = 'xls';
           this.upList = [];
           this.limitNumber=1;//上传文件的个数控制
           this.exportNumTrue = false;
           this.exportrong = '1';
           this.exportcontent = '3';
           this.exportStyle = '1';
           this.ExportType='xls';
           this.storeArr=[];
           // this.sort1 = true;
           this.exchangeSeqUp = true;
           this.exchangeSeqDow = true;
           this.searchkeyOne = {
               key:null
           };
           this.searchValue = null;
           this.isloading = false;
           this.headBz = false;
           this.sheetNumberTrue = false;
           this.sheetAll=[];
           this.sheetSelc=0;
           this.sortStr = '';
           this.sortSort = '';
       };
        changeType(){
            for(let a of this.ConcateObj){
                if(a.id === Number(this.ConcateType)){
                    this.commit = a.comment
                }
            }
        };
        NewAddFile(){
            var obj = {
                libId:this.libId,
                id: this.Id,
                qzh : this.qzh,
                fondId: this.fondId,
                kinId : this.kindId,
                wenId:this.wenId,
                isProjectCompany:this.isProjectCompany
            };
            window.sessionStorage.setItem('addInfile',JSON.stringify(obj))
             this['$router'].push({
                path:'/views/fileArrange/fileManagement/infile/addInfile',
                name:'文件管理新增页面'});
       }
        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
                Service.getUserUrl({}).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        var obj = {id:0,name:res.data.data.LogonFondName}
                        treeData.push(obj);
                        resolve(treeData);
                        // this.treesId = res.data.data[0].id;
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.treesId = node.data.id;
                Service.getLounTile(this.treesId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                            console.log(item)
                        });
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }
        };
        RowDblclick(row){
            this.arvhiveId = row.id;
            var obj = {
                libId:this.libId,
                arvhiveId : this.arvhiveId,
                fondId: this.fondId,
                isProjectCompany:this.isProjectCompany
            }
            window.sessionStorage.setItem('BianJiInfile',JSON.stringify(obj))
            this['$router'].push({
                path:'/views/fileArrange/fileManagement/infile/BianJiInfile',
                name:'文件管理新增编辑页面'});
        };
        selectionChange(selection){
            this.selection = selection;
        };
        handleDelete(index,row){
            console.log(index,row)
        };
        Goback():void{
            sessionStorage.setItem("targetId",this.Id.toString());
            this['$router'].push({
                path:'/fileArrange/fileManagement'
            });
        };
        //分页
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page-1);
            this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort}});
        };
        handleCurrentChange(val) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort}});

        };

        //获取搜索项
        Getquerycondition(libId:number){
            Service.Getquerycondition(libId).then(res=>{
               if(res.data.succeeded){
                   if(res.data.data.length>4){
                       document.getElementsByClassName('tableContainer')[0]['style'].top="192px"
                   }
                   this.searchConfig=res.data.data;
                   for(var item of res.data.data){
                       this['$set'](this.searchform,'value'+item.id,null)
                   };
               }else{
                   this.getError(res.data.errorMessage);
               };
            });
        };

        //搜索按钮
        searchKey(){
            // this.searchContent=[];
            // for(var key in this.searchform){
            //     if(this.searchform[key]!=null&&this.searchform[key]!=""){
            //         var Name = key.slice(5);
            //         var str = parseInt(Name)
            //         var obj = {
            //             id:str,
            //             value:this.searchform[key]
            //         };
            //         this.searchContent.push(obj)
            //     };
            // };
            this.limit = 500;
            this.searchValue = this.searchkeyOne.key;
            this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:1, pageSize:500,sort:this.sortSort}});        }

        //清空搜索项
        clearSearch(){
            // for(var key in this.searchform){
            //     this.searchform[key] = null;
            // };
            this.searchkeyOne.key = null;
            this.searchValue = null;
        }
        //获取表格头部设置
        getDispField(libId:number){
            Service.getDispField(libId).then(res=>{
                if(res.data.succeeded){
                    var arr = res.data.data;
                    var haveBZ = false;
                    for(var son of arr){
                        if(son.fieldName=='BZ'){
                            var str = JSON.stringify(son);
                            var obj = JSON.parse(str);
                            obj.fieldName = 'BZ1';
                            haveBZ = true;
                        };
                    };
                    if(haveBZ){
                        arr.splice(1,0,obj)
                    }
                    this.tableHeader=arr;
                    // var arr=[];
                    // arr.push((this['$route'].query.id/1));
                    this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort}});
                }else{
                    this.getError(res.data.errorMessage);
                }
            });
        };
    //获取卷内文件
    getInfilePapers(params:any){
        this.isloading = true;
        Service.searchJuanNei(params).then(res=>{
            if(res.data.succeeded){
                this.sortStr = res.data.sort;
                var olddata = res.data.data;
                for(let i=0;i<olddata.length;i++){
                    if('BZ' in olddata[i]){
                        olddata[i]['BZ1'] = olddata[i]['BZ'];
                    };
                    olddata[i].Serial = this.limit*(this.page-1)+i+1;
                };
                this.data=olddata;
                this.page=res.data.page;
                this.total=res.data.totalRecords;
                this.$nextTick(()=>{
                    this.isloading = false;
                });
            }else{
                this.getError(res.data.errorMessage);
            }
        })
        };

    //删除
        deleteFile(){
            if(this.selection.length>0){
                this['$confirm']('是否要删除选中的数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  var arr = [];
                  for(var ind of this.selection){
                      arr.push(ind.id)
                  }
                  Service.BatchDelete({libId:this.libId,ids:arr}).then(res=>{
                      if(res.data.succeeded){
                          var num  = Math.ceil(this.total/this.limit);
                          if(this.page==num&&this.page>1){
                              this.page-=1;
                          }
                          // this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                          this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort}});

                      }else{
                          this.getError(res.data.errorMessage)
                      }
                  })
                }).catch(() => {
                    this['$message']({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }else{
                this.Warn("请选择你要删除的文件")
            }
        };

        //移除文件
        removeFile(){
            if(this.selection.length>0){
                var arr = [];
                for(var ind of this.selection){
                    arr.push(ind.id)
                }
                this['$confirm']('您是否要移出所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  Service.moveOutWenJian({kindId:this.kindId,wenJianId:arr}).then(res=>{
                      if(res.data.succeeded){
                          this.Suces("移出成功");
                          if(this.data.length==this.selection.length){
                              var num = Math.ceil(this.total/this.limit);
                                  if(this.page==num&&this.page>1){
                                      this.page-=1;
                              }
                          }
                          this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort}});
                      }else{
                          this.getError(res.data.errorMessage)
                      }
                  })
                }).catch(() => {
                    this['$message']({
                        type: 'info',
                        message: '已取消移出'
                    });
                });
            }else{
                this.Warn("请选择你要移出的文件")
            }
        };

        //调整顺序号
        goAdjust(){
           if(this.selection.length>0){
               this['$confirm']('您是否要保存并生成顺序号?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
               }).then(() => {
                   var arr = [];
                   for(var item of this.data){
                       for(var son of this.selection){
                           if(item.id==son.id){
                               arr.push(item.id);
                           };
                       };
                   };
                   // for(var son of this.selection){
                   //     arr.push(son.id);
                   // };
                   this.generateDHs({libId:this.libId,archiveIds:arr})
               }).catch(()=>{
                   this['$message']({
                       type: 'info',
                       message: '已取消'
                   });
               });
           }else{
               this.Warn('请选择数据。')
           }
            // var obj = {
            //     lib:this.libId,
            //     fond:this.fondId,
            //     id:this.Id,
            //     wenId:this.wenId,
            //     kind:this.kindId
            // }
            // window.sessionStorage.setItem('infileAdjust',JSON.stringify(obj))
            // this['$router'].push({
            //     path:"/fileArrange/fileManagement/infileAdjust"})
        };
        generateDHs(params){
            Service.generateDHs(params).then(res=>{
                if(res.data.succeeded){
                    this.Suces("生成顺序号成功");
                    let data = res.data.data;
                    for(let item of  this.data){
                        for(let ind of data){
                            if(ind.id == item.id){
                                for(let key in item){
                                    if(ind[key]){
                                        item[key] = ind[key];
                                    };
                                };
                            };
                        };
                    };
                }else{
                    this.Warn(res.data.errorMessage)
                }
            })
        }
        //批量修改
        revampMany(){
           this.getBatchModifiableFields(this.libId)
        };
        //取得可批量修改的字段
        getBatchModifiableFields(params){
            this.form={region:null,replaceValue:null,replaceTo:''};
            this.Addrform={region:null,startNumber:null,endNumber:null,replaceTo:''};
            this.combineform={itemA:null,connectSign:null,itemB:null,concatTo:null};
            if(this.selection.length) {
                Service.getBatchModifiableFields(params).then(res => {
                    if (res.data.succeeded) {
                        var data = JSON.stringify(res.data.data)
                        this.formArr = JSON.parse(data);
                        this.addArr = JSON.parse(data);
                        this.repalceMany = true;
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                this.Warn("请选择要修改的文件")
            }
        };

        //按内容替换著录项发生改变
        elSelectChange(data){
            this.form.replaceValue = null;
            this.form.replaceTo = '';
            for(var item of this.formArr){
                if(item.fieldName==data){
                    if(item.dictData){
                        this.formSelectArr=[];
                        this.formSelectArr = item.dictData;
                        this.ElSelectTrue=false;
                    }else if(item.fieldName=='XMBH'&&this.isProjectCompany){
                        this.ElSelectTrue=false;
                        Service.findByFond({}).then(res=>{
                            if(res.data.succeeded){
                                this.formSelectArr=[];
                                this.storeArr = [];
                                this.storeArr = res.data.data;
                                var str = JSON.stringify(res.data.data);
                                var data = JSON.parse(str);
                                for(var item of data){
                                    this.formSelectArr.push({text:item.projectCode,code:item.projectCode})
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else if(item.fieldName=='XMMCNEW'&&this.isProjectCompany){
                        this.ElSelectTrue=false;
                        Service.findByFond({}).then(res=>{
                            if(res.data.succeeded){
                                this.formSelectArr=[];
                                this.storeArr = [];
                                this.storeArr = res.data.data;
                                var str = JSON.stringify(res.data.data);
                                var data = JSON.parse(str);
                                for(var item of data){
                                    this.formSelectArr.push({text:item.projectName,code:item.projectCode})
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            };
                        });
                    }else{
                        this.ElSelectTrue=true;
                    }
                };
            };
        };

        //保存替换
        SaveReplace(){
            var arr=[];
                for (var item of this.selection){
                    arr.push(item.id);
                };
            if(this.activenames=='one'){
                if(this.form.region!=null){
                        if(this.isProjectCompany&&this.form.region=='XMBH'){
                            // var replaceValue1 = '' ;
                            // var replaceTo1 = '';
                            // for(var ind of this.storeArr){
                            //     if(ind.projectCode==this.form.replaceValue){
                            //         this.form.replaceValue = ind.projectCode;
                            //         replaceValue1 = ind.projectName;
                            //     };
                            // };
                            for(var ind of this.storeArr){
                                if(ind.projectCode==this.form.replaceTo){
                                    this.form.replaceTo = ind.projectCode;
                                    // replaceTo1 = ind.projectName;
                                };
                            };
                            var obj = {
                                libId:this.libId,
                                ids:arr,
                                mode:1,
                                fieldName:this.form.region,
                                replaceSrc:this.form.replaceValue,
                                replaceWith:this.form.replaceTo
                            };
                            // var obj1 = {
                            //     libId:this.libId,
                            //     ids:arr,
                            //     mode:1,
                            //     fieldName:'XMMCNEW',
                            //     replaceSrc:replaceValue1,
                            //     replaceWith:replaceTo1
                            // };
                            // Service.BatchModify(obj1).then(res=>{
                            //     if(res.data.succeeded){
                                    this.BatchModify(obj);
                            //     }else{
                            //         this.Warn(res.data.errorMessage)
                            //     }
                            // })
                        }else if(this.isProjectCompany&&this.form.region=='XMMCNEW'){
                            // var replaceValue2 = '' ;
                            // var replaceTo2 = '';
                            // for(var ind of this.storeArr){
                            //     if(ind.projectCode==this.form.replaceValue){
                            //         this.form.replaceValue = ind.projectName;
                            //         replaceValue2 = ind.projectCode;
                            //     };
                            // };
                            for(var ind of this.storeArr){
                                if(ind.projectCode==this.form.replaceTo){
                                    this.form.replaceTo = ind.projectName;
                                    // replaceTo2 = ind.projectCode;
                                };
                            };
                            var obj = {
                                libId:this.libId,
                                ids:arr,
                                mode:1,
                                fieldName:this.form.region,
                                replaceSrc:this.form.replaceValue,
                                replaceWith:this.form.replaceTo
                            };
                            // var obj2 = {
                            //     libId:this.libId,
                            //     ids:arr,
                            //     mode:1,
                            //     fieldName:'XMBH',
                            //     replaceSrc:replaceValue2,
                            //     replaceWith:replaceTo2
                            // };
                            // Service.BatchModify(obj2).then(res=>{
                            //     if(res.data.succeeded){
                                    this.BatchModify(obj);
                            //     }else{
                            //         this.Warn(res.data.errorMessage)
                            //     }
                            // })
                        }else{
                            var obj = {
                                libId:this.libId,
                                ids:arr,
                                mode:1,
                                fieldName:this.form.region,
                                replaceSrc:this.form.replaceValue,
                                replaceWith:this.form.replaceTo
                            };
                            this.BatchModify(obj);
                        }
                }else{
                    this.Warn('请选择著录项。');
                }
            }else if(this.activenames=='two'){
                if(this.Addrform.region!=null){
                    if(this.Addrform.startNumber!=null&&this.Addrform.startNumber!=''){
                        if(this.Addrform.endNumber!=null&&this.Addrform.endNumber!=''){
                            var objs = {
                                libId:this.libId,
                                ids:arr,
                                mode:2,
                                fieldName:this.Addrform.region,
                                replaceStartPos:this.Addrform.startNumber,
                                replaceEndPos:this.Addrform.endNumber,
                                replaceWith:this.Addrform.replaceTo
                            };
                            this.BatchModify(objs)
                        }else{
                            this.Warn('请填写结束位置。');
                        }
                    }else{
                        this.Warn('请填写起始位置。');
                    }
                }else{
                    this.Warn('请选择著录项。');
                }

            }else if(this.activenames=='three'){
                if(this.combineform.itemA!=null){
                    if(this.combineform.connectSign!=null&&this.combineform.connectSign!=''){
                        if(this.combineform.itemB!=null){
                            if(this.combineform.concatTo!=null){
                                var objss= {
                                    libId:this.libId,
                                    ids:arr,
                                    mode:3,
                                    fieldName:this.combineform.itemA,
                                    connector:this.combineform.connectSign,
                                    fieldName2:this.combineform.itemB,
                                    targetFieldName:this.combineform.concatTo
                                };
                                this.BatchModify(objss)
                            }else{
                                this.Warn('请选择目标著录项。');
                            }
                        }else{
                            this.Warn('请选择著录项B。');
                        }
                    }else{
                        this.Warn('请填写连接符。');
                    }
                }else{
                    this.Warn('请选择著录项A。');
                };
            };
        };
        //修改后的保存
        BatchModify(params){
            Service.BatchModify(params).then(res=>{
                if(res.data.succeeded){
                    this.repalceMany = false;
                    this.Suces("成功");
                    this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort}});
                }else{
                    this.Warn(res.data.errorMessage)
                }
            })
        }
        //批量修改的tabs方法
        AmendTabClick(){
            this.form={
                region:null,
                replaceValue:null,
                replaceTo:''
            };
            this.Addrform={
                region:null,
                startNumber:null,
                endNumber:null,
                replaceTo:''
            };
            this.combineform={
                itemA:null,
                connectSign:null,
                itemB:null,
                concatTo:null
            };
        }

        //移卷移到新卷
        goremoveNew(){
            if(this.selection.length>0){
                var ids = [];
                for(var son of this.selection){
                    ids.push(son.id)
                }
                Service.checkBeforeMergeWenJians({wenJianLibId:this.libId,wenJianIds:ids}).then(res=>{
                    if(res.data.succeeded){
                        var arr = this.selection;
                        window.sessionStorage.setItem('CombineFile',JSON.stringify(arr));
                        var obj = {
                            lib:this.libId,
                            kind:this.kindId,
                            fond:this.fondId,
                            wenId:this.wenId,
                            qzh:this.qzh,
                            isProjectCompany:this.isProjectCompany,
                            value:res.data.data
                        };
                        window.sessionStorage.setItem('removeNew',JSON.stringify(obj))
                        this['$router'].push({path:'/fileArrange/fileManagement/removeNew'})
                    }else{
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '不保存',
                            showCancelButton: false,
                            type: 'warning',
                            center: true
                        });
                    };
                });
            }else{
                this.Warn("请选择你要移动的文件")
            }
        };

        goremoveOld(){
            if(this.selection.length>0){
                var arr = this.selection;
                window.sessionStorage.setItem('CombineExistFile',JSON.stringify(arr));
                var obj = {
                    lib:this.libId,
                    kind:this.kindId,
                    fond:this.fondId,
                    wenId:this.wenId,
                    isProjectCompany:this.isProjectCompany
                };
                window.sessionStorage.setItem('removeOld',JSON.stringify(obj))
                this['$router'].push({
                    path:'/fileArrange/fileManagement/removeOld'})
            }else{
                this.Warn("请选择你要移动的文件")
            }
        };

        //档号筛查
        goCheck(){
            if(this.searchContent.length>0){
                var str = JSON.stringify(this.searchContent);
                var obj = {kind:this.kindId,fond:this.fondId,search:str,id:this.Id}
                window.sessionStorage.setItem('infilecheck',JSON.stringify(obj))
                this['$router'].push({path:'/fileArrange/fileManagement/infilecheck'});
            }else{
                var objs = {kind:this.kindId,fond:this.fondId,id:this.Id}
                window.sessionStorage.setItem('infilecheck',JSON.stringify(objs))
                this['$router'].push({path:'/fileArrange/fileManagement/infilecheck'});
            };
        };

        //页数转页次
        NumTopage(){
            this['$confirm']('是否对要进行页数转页次操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Service.PageTranslate({
                    libId:this.libId,
                    fondId:this.fondId,
                    data:this.data
                }).then(res=>{
                    if(res.data.succeeded){
                        this.Suces("转换成功");
                        this.data = res.data.data;
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }).catch(() => {

            });
        };
        //页数转页次
        pageToNum(){
            this['$confirm']('是否对要进行页次转页数操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Service.NumTranslate({
                    libId:this.libId,
                    fondId:this.fondId,
                    data:this.data
                }).then(res=>{
                    if(res.data.succeeded){
                        this.Suces("转换成功");
                        this.data = res.data.data;
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }).catch(() => {

            });
        };

        // //日期格式校对
        // checkTime():void{
        //     this.checkTimeShow = true;
        // };
        //数据模板下载
        loadNumberModel(){
            this.NumberModelTrue = true;
        };
        LoadingNumberModelOne(){
            this.NumberModelTrue = false;
            this.checkNumberModel = 'xls'
        };
        LoadingNumberModelTwo(){
            this.NumberModelTrue = false;
            this.DownLoadTemps({libId:this.libId,type:this.checkNumberModel,name:this.storeName,rank:4,phase:1,fondId:this.fondId})
            // var str = encodeURIComponent(this.storeName)
            //     window.location.href = this.Url+'/dataImporter/downLoadTemp?libId='+this.libId+'&type='+this.checkNumberModel+'&name='+str+'&rank=4'+'&phase='+1+'&fondId='+this.fondId;
        };
        //数据模板下载
        DownLoadTemps(params){
            var name=params['name']+'-卷内';
            // params['name']=encodeURIComponent(params['name']);
            Service.DownLoadTemps(params).then(res=>{
                if(res){
                    if(res['type']=='application/json'){
                        this.getError('下载模板有误，请联系管理员！');
                    }else{
                        let data = res;
                        if(window.navigator && window.navigator.msSaveOrOpenBlob){
                            var csvData =  new Blob([data]);
                            window.navigator.msSaveOrOpenBlob(csvData, name + '.' + params['type']);
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            link.setAttribute('download',name+'.'+params['type']);
                            document.body.appendChild(link);
                            link.click();
                        };
                    }
                }
            })
        }
        //导入数据选定文件
        BeforeUpload(file){
            var num = file.name.lastIndexOf('.');
            num = -num;
            var str = file.name.substr(-num);
            if(str.toLowerCase()=='.'+this.checkNumberModels){
                var ID = this.libId+'';
                var Form = new FormData();
                Form.append('file',file);
                Form.append('libId',ID);
                Form.append('type',this.checkNumberModels);
                Form.append('phase','1');
                Form.append('fondCode',this.dqqzh);
                Form.append('parentId',this.Id+'');
                Form.append('AJH',this.AJH+'');
                var name = encodeURIComponent(this.storeName);
                Form.append('nodeName',name);
                Form.append('sheetIndex',this.sheetSelc.toString())
                this.loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在导入，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                Service.DataImportXL(Form).then(res=>{
                    if (res.data.succeeded) {
                        this.Suces("导入成功");
                        this.commitDialogTrue = false;
                        this.getInfilePapers({
                            kindId: this.kindId,
                            fondId: this.fondId,
                            anJuanId: this.Id,
                            searchKey:this.searchValue,
                            pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortSort}
                        });
                    } else {
                        this.commitDialogTrue = false;
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '',
                            showCancelButton: false,
                            type: 'error',
                            center:true
                        });
                    };
                    this.$nextTick(() => {
                        this.loadingInstance.close();})
                });
                return file;
            }else{
                this.commitDialogTrue = false;
                this['$confirm']('请选择对应格式的文件进行上传', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '',
                    showCancelButton: false,
                    type: 'warning',
                    center:true
                });
                return false;
            };
        };
        //移除文件的钩子
        uploadOnRemove(){
            this.sheetNumberTrue = false;
            this.sheetAll = [];
            this.sheetSelc = 0;
        }
        Confirmsheet(){
            if(this.sheetSelc!=null){
                var arr = [];
                arr.push(this.sheetSelc);
                this.loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在保存中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                var str = JSON.stringify(arr);
                Service.DataImportXL(str).then(res=>{
                    if(res.data.succeeded){
                        this.Suces("导入成功");
                        this.commitDialogTrue = false;
                        this.sheetNumberTrue = false;
                        this.sheetAll = [];
                        this.sheetSelc = 0;
                        this.getInfilePapers({
                            kindId: this.kindId,
                            fondId: this.fondId,
                            anJuanId: this.Id,
                            searchKey:this.searchValue,
                            pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortSort}
                        });
                    }else{
                        this.commitDialogTrue = false;
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '',
                            showCancelButton: false,
                            type: 'error',
                            center:true
                        });
                    };
                    this.$nextTick(() => {
                        this.loadingInstance.close();
                    })
                })
            }else{
                this.Warn('请选择sheet表');
            }

        };
        //选取的文件超出个数时的钩子
        Onexceed(files, fileList){
            this.Warn("你每次只能上传一个文件")
        };
        //导入数据取消文件选择
        ConcelCommitNumber(){
            this.commitDialogTrue=false;
        };
        ConfirmCommitNumber(){
            var File = document.getElementsByClassName('el-upload__input')[0]['files'];
            if(File.length==0){
                this.Warn('请选择导入的文件')
            }else{
                this['$refs'].upload['submit']();
            }

        };
        //读取文件
        excelChange(file){
            this.sheetNumberTrue = false;
            this.sheetAll = [];
            var that = this;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = ev.target['result'];
                    if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                        var exceltype = 'buffer';
                    }else{
                        var exceltype = 'binary';
                    }
                    const workbook = XLSX.read(data, {
                        type: exceltype
                    });
                    const sheetarr = workbook.SheetNames;

                    for(var key in sheetarr){
                        that.sheetAll.push({value:sheetarr[key],key:key/1});
                    }
                    that.$nextTick(()=>{
                        this.sheetNumberTrue = true;
                        that.sheetSelc = 0;
                    });
                } catch (e) {
                    return false;
                }
            };
            if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                reader.readAsArrayBuffer(file.raw);
            }else{
                reader.readAsBinaryString(file.raw);
            }
        }
        //导入数据
        importNumber(){
            this.commitDialogTrue=true;
            this.sheetNumberTrue = false;
            this.sheetAll = [];
            this.sheetSelc = 0;
            if(this['$refs']['upload']){
                this['$refs'].upload['clearFiles']()
            }
        };
        mounted(){
           var that=this;
           this.pageSize();
           // window['addEventListener']('resize',()=>{
           //     this.pageSize()
           // });
           window['addEventListener']('click',()=>{
               this.box_ul_show=false;
               this.box_ul_showTwo=false;
               that.ul_show=false;
               if(document.querySelector(".span")){
                   document.querySelector(".span")["style"].transform = "rotate(0deg)";
               }
              if(document.querySelector(".myspan")){
                  document.querySelector(".myspan")["style"].transform = "rotate(0deg)"
              }
               that.transformFile=false;
           });
            window.onresize = () => {
                this.pageSize();
                return (() => {
                    this.FiletableHeight = document.documentElement.clientHeight - 289;
                    this.mathHeight = (document.documentElement.clientHeight - 152)/2-60;
                })()
            };
       };
        created(){
            var str = window.sessionStorage.getItem('Toinfile');
            var obj = JSON.parse(str);
            this.libId = obj.lib/1;
            this.wenId = obj.wenId/1;
            this.fondId = obj.fond/1;
            this.Id = obj.id/1;
            this.kindId = obj.kind/1;
            this.Title = obj.title;
            this.qzh = obj.qzh;
            this.storeName = obj.storeName;
            this.isProjectCompany = obj.isProjectCompany;
            this.AJH = obj.AJH;
            this.fondCode = obj.fondCode;
            this.dqqzh = obj.dqqzh;
           // this.Getquerycondition(this.libId);
           this.getDispField(this.libId);
       };
       //动态菜单
        menuShow(){
            this.ul_show=!this.ul_show
            if(this.ul_show)
                document.querySelector(".span")["style"].transform = "rotate(180deg)"
            else
                document.querySelector(".span")["style"].transform = "rotate(0deg)"
        };
        transformClick(){
            this.transformFile=!this.transformFile
            if(this.transformFile)
                document.querySelector(".myspan")["style"].transform = "rotate(180deg)"
            else
                document.querySelector(".myspan")["style"].transform = "rotate(0deg)"
        }
        BoxmenuShow():void{
            this.box_ul_showTwo=false;
            this.box_ul_show=!this.box_ul_show
            if(this.box_ul_show)
                document.querySelector(".spans")["style"].transform = "rotate(180deg)"
            else
                document.querySelector(".spans")["style"].transform = "rotate(0deg)"
        };
        BoxmenuShowTwo(){
            this.box_ul_show = false;
            this.box_ul_showTwo=!this.box_ul_showTwo
            if(this.box_ul_showTwo)
                document.querySelector(".spansTwo")["style"].transform = "rotate(180deg)"
            else
                document.querySelector(".spansTwo")["style"].transform = "rotate(0deg)"
        };
        showFalse(){
            this.box_ul_showTwo=false;
            this.box_ul_show=false;
        };
        // 模板打印
        modelPrint(){
            if(this.selection.length>0){
                var arr = [];
                for(let item of this.selection){
                    arr.push(item)
                }
                window.sessionStorage.setItem('rank', window.sessionStorage.getItem('rankIn'));
                window.sessionStorage.setItem('printArray1',JSON.stringify(arr));
                window.sessionStorage.setItem('typePrint','2');
                this['$router'].push({path:'/fileArrange/fileManagement/modelPrint'});
            }else{
                this.Warn("请选择要打印的文件")
            }
        };
        pageSize():void{
            var Arr=document.querySelectorAll(".toolButtons")
            var buttonArr=Array.from(Arr)
            var Li=document.querySelectorAll(".buttonlis")
            var boxbutton=Array.from(Li)
            var len=document.querySelector(".infilerowThr")["offsetWidth"]
            if(len===0){
                document.querySelector(".toolButton-one")["style"].display="none";
                buttonArr.forEach(function(item){
                    item["style"].display="block"
                })
            } else if(len<=692){
                var ind=1
                document.querySelector(".toolButton-one")["style"].display="block";
                if(len<=692&&len>633){
                    ind=2
                } else if(len<=633&&len>553){
                    ind=3
                }else if(len<=553&&len>487){
                    ind=4
                }else if(len<=487&&len>=433){
                    ind=5
                }else if(len<433&&len>367){
                     ind=6
                }else if(len<=367&&len>301){
                     ind=7
                }else{
                     ind=8
                }
                for(var i=0;i<9;i++){
                    if(i<=ind){
                        buttonArr[i]["style"].display="none"
                        boxbutton[i]["style"].display="block"
                    }else{
                        buttonArr[i]["style"].display="block"
                        boxbutton[i]["style"].display="none"
                    }

                }
            }else{
                document.querySelector(".toolButton-one")["style"].display="none";
                buttonArr.forEach(function(item){
                    item["style"].display="block"
                })
            }
        };

        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };

        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };

        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };
        // beforeRouteEnter(to,from,next){
        //     next(vm=>{
        //         if(from.name=='移到已有卷第二步'){
        //             vm.getInfilePapers({kindId:vm.kindId,fondId:vm.fondId,anJuanId:vm.Id,conditions:vm.searchContent,pageCondition:{page:vm.page, pageSize:vm.limit,sort:""}});
        //         }
        //     })
        // };
        //数据导出
        confirmExport(){
            var IdArr = [];
            for(var item of this.selection){
                IdArr.push(item.id)
            }
            // var str = encodeURIComponent(this.storeName)
            if(IdArr.length>0){
                var Idstr = IdArr.join(',');
                if(this.exportrong=='1'){
                    var obj = {libId:this.libId,arcIds:Idstr,dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:1,parentId:this.Id,fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr}
                    // var UrlStr='libId='+this.libId+'&arcIds='+Idstr+'&dataType='+this.exportrong+'&contentType='+this.exportcontent+'&type='+this.ExportType+'&isAtta='+this.exportStyle+'&phase='+1+'&parentId='+this.Id+'&fondCode='+this.fondCode+'&nodeName='+str
                }else{
                    var obj = {libId:this.libId,arcIds:'',dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:1,parentId:this.Id,fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr}
                    // var UrlStr='libId='+this.libId+'&arcIds='+""+'&dataType='+this.exportrong+'&contentType='+this.exportcontent+'&type='+this.ExportType+'&isAtta='+this.exportStyle+'&phase='+1+'&parentId='+this.Id+'&fondCode='+this.fondCode+'&nodeName='+str
                }
                if(this.exportStyle == '2'){
                    delete obj.isAttr;
                    delete obj.isAtta;
                    obj.contentType = obj.contentType/1;
                    obj.dataType = obj.dataType/1;
                    if(obj.parentId===""){
                        obj.parentId = null;
                    }else{
                        obj.parentId = obj.parentId/1;
                    }
                    this.DataImporterExportYW(obj)
                }else{
                    this.DataImporterExport(obj)
                }
                this.exportNumTrue = false;
            }else{
                this.Warn('请选择要导出的数据')
            }
        };
        //数据导出
        DataImporterExport(params){
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在导出，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.DataImporterExport(params).then(res=>{
                if(res){
                    if(res['type']=='application/json'){
                        this.getError('所选文件无电子原文！');
                    }else{
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            if(params['isAtta']=='2'){
                                window.navigator.msSaveOrOpenBlob(csvData,params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                window.navigator.msSaveOrOpenBlob(csvData, excelName + '.' + params['type']);
                            };
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            if(params['isAtta']=='2'){
                                link.setAttribute('download',params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                link.setAttribute('download',excelName+'.'+params['type']);
                            };
                            document.body.appendChild(link);
                            link.click();
                        }
                    }
                }
                this.$nextTick(() => {
                    loadingInstance.close();
                })
            });
        }
        //数据导出目录及原文
        DataImporterExportYW(obj){
            Service.DataImporterExportYW(obj).then(res=>{
                if(res.data.succeeded){
                    Service.ExporttaskStart(res.data.data.id).then(res=>{
                        if(res.data.succeeded){
                            this['$confirm']('导出任务已创建，请到[任务列表]的[导出任务]中查看数据导出状态', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '不保存',
                                showCancelButton: false,
                                type: 'success',
                                center: true
                            });
                        }else{
                            this.getError(res.data.errorMessage)
                        }
                    })
                }else{
                    this['$confirm'](res.data.errorMessage, '提示', {
                        confirmButtonText: '关闭',
                        cancelButtonText: '不保存',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                }
                // var that = this;
                // let reader = new FileReader();
                // reader.readAsText(res);
                // reader.onload = function(event) {
                //     // 文件里的文本会在这里被打印出来
                //     let str = JSON.parse(event.target.result);
                //     if(str.succeeded){
                //         Service.ExporttaskStart(str.data.id).then(res=>{
                //             if(res.data.succeeded){
                //                 that.Suces('请前往任务列表下载。')
                //             }else{
                //                 that.getError(res.data.errorMessage)
                //             }
                //         })
                //     }else{
                //         that['$confirm'](str.errorMessage, '提示', {
                //             confirmButtonText: '关闭',
                //             cancelButtonText: '不保存',
                //             showCancelButton: false,
                //             type: 'warning',
                //             center: true
                //         });
                //     }
                //
                // };
            })
        }

        //批量挂接***************************************************************************
        //批量挂接
        ConcateFile(a):void{
            this.anJuanId = a;
            // 挂接云盘目录
            Service.GetMatchRules(this.libId).then(res=>{
                if(res.data.succeeded){
                    this.ConcateObj=[];
                    if(res.data.data){
                        this.ConcateObj=res.data.data;
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            });
            this.matchedCount = null;
            this.existFile = false;
            this.errorMacth = [];
            this.riGuajie = false;
            this.ConcateType = '';
            this.commit = '';
            this.ConcateVisible = true;
        };
//
        // 批量挂接树 中文件夹下文件总数的统计。
        setDataToTrees(treeData){
            // 根级的全宗不可选择
            if(treeData.id!==0){
                this.treesId = treeData.id;
                this.getFiles();
                this.riGuajie = false;
                this.errorMacth = [];
            }
        }

        // 树结构下 文件夹中文件的总数
        getFiles():void{
            Service.getFileCount(this.treesId).then((res) =>{
                if(res.data.succeeded == true){
                    let count = res.data.data;
                    if(count>0){
                        this.existFile = true;
                        this.dec = count
                    }else{
                        this.existFile = false;
                    }

                }else{
                    this.getError(res.data.errorMessage);
                }
            })
        };

        // 检测是否可以匹配
        checkOldFiles():void{
            let params = {
                fondId: this.fondId,
                cloudDirectoryId: this.treesId
            };
            Service.checkIsFinished(params).then(res=>{
                if(res.data.succeeded){
                    if(!res.data.data){
                        this.checkDeal();
                    }else{
                        this['$message']({
                            message: '所选云盘目录下已有挂接任务，请到任务列表的批量挂接中删除或启动任务！',
                            type: 'warning'
                        });
                    }
                }else{
                    this['$message']({
                        message: '检测匹配失败！',
                        type: 'warning'
                    });
                }
            })
        };

        // 挂接匹配
        checkDeal():void{
            if(this.ConcateType){
                this.autoMatchParams = {
                    "wenJianLibId": this.libId,
                    "anJuanId": this.Id,
                    "fondId": this.fondId,
                    "cloudDirectoryId": this.treesId,
                    "matchRuleId": this.ConcateType
                };
                Service.autoFileUp(this.autoMatchParams).then(res=>{
                    if(res.data.succeeded){
                        this.riGuajie = true;
                        this.taskId = res.data.data.taskId;
                        this.matchedCount = res.data.data.matchedCount;
                        if(res.data.data.errorMatch&&res.data.data.errorMatch.length>0){
                            this.errorMacth = res.data.data.errorMatch;
                            if(!res.data.data.taskId){
                                this.Warn('一个原文匹配到多条目录数据，无法进行挂接。')
                            }
                        }else{
                            this.errorMacth = [];
                        }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
        };

        // 开始挂接
        beginCF():void{
            if(this.ConcateType){
                if(this.riGuajie){
                    if(this.taskId){
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在上传中，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.fileUpStart(this.taskId).then(res=>{
                        if(res.data.succeeded){
                            this.$nextTick(() => {
                                loadingInstance.close();
                            });
                               this['$alert']('原文挂接中,请到任务列表批量挂接中查看任务进度', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {}
                                });
                                // this['$message']({
                                //     message: '挂接成功！',
                                //     type: 'success'
                                // });
                            this.searchKey();
                            this.ConcateVisible = false;
                        }else{
                            this.$nextTick(() => {
                                loadingInstance.close();
                            });
                            this.getError(res.data.errorMessage)
                        }
                    })
                    }else{
                        this['$message']({
                            message: '一个原文匹配到多条目录数据，无法进行挂接。',
                            type: 'warning'
                        });
                    }
                }else{
                    this['$message']({
                        message: '请先匹配原文！',
                        type: 'warning'
                    });
                }
            }else{
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
        };

        // 若无原文 上传原文
        fileUpBook(){
            this.ConcateVisible = false;
            this['$router'].push({path:'/fileArrange/cloudManagement'});
        };

        //案卷号
        myAJH(num){
            if(num){
                if(num!==null) {
                    num = num+"";
                    if (num.length == 1) {
                        return '000'+num;
                    } else if (num.length == 2) {
                        return '00'+num;
                    } else if (num.length == 3) {
                        return '0'+num;
                    } else {
                        return num;
                    }
                }else{
                    return null;
                }
            }else{
                return null
            }

        };
        beforeRouteEnter(to,from,next){
            next(vm=>{
                if(from.name=='文件管理新增编辑页面'){
                    var str = window.sessionStorage.getItem('WJBres');
                    var obj = JSON.parse(str);
                    for(var item of vm.data){
                        if(item.id == obj.id){
                            for(var key in obj){
                                item[key]=obj[key];
                            };
                        };
                    };
                }else if(from.name=='移到已有卷第二步'){
                    vm.getInfilePapers({kindId:vm.kindId,fondId:vm.fondId,anJuanId:vm.Id,conditions:vm.searchContent,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort}});
                };
            });
        };
        //上移
        positionUp(){
            if(this.selection.length>1){
                this.Warn('每次只能移动一条数据。');
            }else if(this.selection.length==1){
                var data = this.selection[0];
                var ind = null;
                for(var key in this.data){
                    if(data.id==this.data[key].id){
                        ind = key;
                    };
                };
                if(ind==0){
                    this.Warn('所选数据已经是第一条。');
                }else{
                    if(this.exchangeSeqUp){
                        this.exchangeSeqUp = false;
                        var id1 = this.data[ind].id;
                        var id2 = this.data[ind-1].id;
                        Service.exchangeSeqs({libId:this.libId,id1,id2}).then(res=>{
                            if(res.data.succeeded){
                                this.data.splice(ind,1);
                                this.data.splice(ind-1,0,data);
                                this.exchangeSeqUp = true;
                            }else{
                                this.getError('数据移动失败');
                                this.exchangeSeqUp = true;
                            }
                        });
                    }
                }
            }
        }
        //下移
        positionDown(){
            if(this.selection.length>1){
                this.Warn('每次只能移动一条数据。');
            }else if(this.selection.length==1){
                var data = this.selection[0];
                var ind = null;
                for(var key in this.data){
                    if(data.id==this.data[key].id){
                        ind = key;
                    };
                };

                if(ind==this.data.length-1){
                    this.Warn('所选数据已经是最后一条。');
                }else{
                    if(this.exchangeSeqDow){
                        var id1 = this.data[ind].id;
                        var id2 = this.data[ind/1+1].id;
                        this.exchangeSeqDow = false;
                        Service.exchangeSeqs({libId:this.libId,id1,id2}).then(res=>{
                            if(res.data.succeeded){
                                this.data.splice(ind/1,1);
                                this.data.splice(ind/1+1,0,data);
                                this.exchangeSeqDow = true;
                            }else{
                                this.getError('数据移动失败');
                                this.exchangeSeqDow = true;
                            }
                        })
                    }

                }
            }
        }
        headerclick(data){      
            var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC'    
            var name = data.column.label;
            var str = '';
            for(var son of this.tableHeader){
                if(son.caption==name){
                    str = son.fieldName;
                };
            };
            if(str){
                this.sortSort = str+" "+sortSting;
                // if(this.sort1){
                //     this.sort1 = !this.sort1;
                    this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort}});
                // }else{
                //     this.sort1 = !this.sort1;
                //     this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.Id,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:str+"  "+sortSting}});                }
            }
        }
        BZPosition(){
            this.headBz =!this.headBz;
            console.log(this.headBz)
        }
    }
</script>

<style scoped lang="scss">
@import '../../../../styles/fileManage/infileStyle.scss';
</style>