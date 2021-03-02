<template>
    <section>
        <div class="mainTitle">
            档案跨全宗移交申请
            <el-button class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle"><span style="float: left;">基本信息</span>
                    <p style="float: left;margin-left:10px;font-size:12px;color: red;">审批到线下移交归档节点时，需将实体档案进行线下移交</p>
                    <div class="titleSect"></div>
                </div>
                <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm validForm loadslipform" label-width="120px" :rules="basicFormRules" ref="basicForm">
                    <div class="formItem topTitle">
                        <el-form-item label="标题：" ref="title" prop="title">
                            <el-input class="checkName percentName" v-model.trim="basicForm.title"  maxlength="50" placeholder="最多输入50字"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="申请人：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName" readonly v-model="basicForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company">
                            <el-input class="checkName percentName" readonly v-model="basicForm.company"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="申请时间：" ref="date" class="lt basicItem" prop="date">-->
                        <!--<el-input class="checkName percentName" readonly v-model="basicForm.date"></el-input>-->
                        <!--</el-form-item>-->
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="接收单位：" ref="DW" class="lt basicItem" prop="DW">
                            <el-input class="checkName percentName" v-model="basicForm.DW" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="接收部门：" ref="BM" class="lt basicItem" prop="BM">
                            <el-input class="checkName percentName" v-model="basicForm.BM" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="移交数量：" ref="SL" class="lt" prop="SL" readonly>
                            <el-input class="checkName percentName" v-model="basicForm.SL"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">

                    </div>
                    <div class="evenTitle loadslipformOne">
                        <el-form-item class="things" label="移交说明：" ref="things"  prop="things">
                            <el-input type="textarea" class="checkName percentName" v-model.trim="basicForm.things"  maxlength="1000" placeholder="最多输入1000字"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon">
                <div class="clear">
                    <div class="listTitle lt">要移动的目录</div>
                    <!--<p class="rt">-->
                    <!--<el-button class="checkWay" :disabled="this.list.length===0" @click="deleteAllFiles"><i class="fa fa-close" style="margin-right:5px;"></i>批量删除</el-button>-->
                    <!--</p>-->
                    <div class="rt">
                        <!--<el-button class="checkWay" @click="addFile">添加档案</el-button>-->
                        <el-button class="checkWay" @click="removeFile">移出档案</el-button>
                    </div>
                </div>
                <!--列表-->
                <div class="borderTable">
                    <el-table border tooltip-effect="dark" stripe max-height="300" :data="data" highlight-current-row v-loading="listLoading" @selection-change="selsChange" class="indexTable containTable expandTable">
                        <el-table-column type="selection" width="30" label="#"></el-table-column>
                        <template v-for="item in tableArr">
                            <el-table-column v-if="!item.hidden"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">审批信息
                    <div class="titleSect"></div>
                </div>
                <el-form :model="basicForm2" class="basicForm topParamsForm fileApplyForm" label-width="140px" ref="basicForm2">
                    <div class="formItem topTitle">
                        <el-form-item class="checkThings validposition" label="依次选择审批人：" prop="auditIds" :rules="[{required:true,message:'请选择',trigger:['blur','change']}]">
                            <el-input class="checkName percentName" :class="{checkProcess:!checkProcessTrue}" v-model="basicForm2.auditIds" readonly :placeholder="checkProcess"></el-input>
                            <el-button class="checkWay choosePerson" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="formItem evenTitle whiteTitle">
                        <el-form-item class="checkThings" label="选择抄送人：">
                            <el-input class="checkName percentName" v-model="auditDisplay.ccUserId" readonly></el-input>
                            <el-button class="checkWay choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                        <el-form-item class="checkThings validposition validposition2" label="签字：" prop="Signature" :rules="[{required:true,message:'请填写签字意见',trigger:'blur'}]">
                            <!--<el-input class="checkName percentName" v-model="Signature"  maxlength="50" placeholder="最多输入50字"></el-input>-->
                            <el-input type="textarea" class="checkName percentName" v-model.trim="basicForm2.Signature"  maxlength="1000" placeholder="最多输入1000字"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit('basicForm','basicForm2')">提交申请</el-button>
            </div>
        </div>
        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true" :modal-append-to-body="false">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="100px" ref="cell">
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName"></el-input>
                                        <el-button class="checkWay" @click="searchName(checkNameForm.checkName)">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="topCheckTree oaTree">
                                <el-tree node-key="id"
                                         v-loading="treeLoading"
                                         ref="tree"
                                         :load="loadNode"
                                         :props="defaultTrees"
                                         lazy
                                         @node-click="handleNodeClick"
                                         :render-content="renderContent">
                                </el-tree>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopRight checkTop">
                            <div class="topCheckCon">
                                <label>常用联系人</label><span>(双击选择)</span>
                                <span class="rt" @click="clearPeople" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table border  @row-dblclick="dblNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomLeft">
                            <el-table border tooltip-effect="dark" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa"  v-loading="comLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="2" style="height:48%;margin-top:1%;">
                        <div style="padding-top:60px;">
                            <el-button @click="rightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="leftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                            <!--<el-button @click="allRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>-->
                            <!--<el-button @click="allLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button>-->
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table border tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="celldblClick" stripe :height = "oaHeight" @selection-change="selsChange1" :data="dataCompany" v-loading="listLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="leafName" label="节点名称">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="name" label="姓名">
                                </el-table-column>
                                <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="userID" label="ID">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button class="checkDefault" @click="peopleVisible = false">取消</el-button>
                <el-button class="checkWay" @click="chooseDone" >确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="checkModal" title="选择抄送人" :visible.sync="writorVisible" :close-on-click-modal="true" :modal-append-to-body="false">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="100px" ref="cell">
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName"></el-input>
                                        <el-button class="checkWay" @click="searchName(checkNameForm.checkName)">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="topCheckTree oaTree">
                                <el-tree node-key="id"
                                         v-loading="treeLoading"
                                         ref="tree"
                                         :load="loadNode1"
                                         :props="defaultTrees"
                                         lazy
                                         @node-click="handleNodeClick"
                                         :render-content="renderContent">
                                </el-tree>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopRight checkTop">
                            <div class="topCheckCon">
                                <label>常用联系人</label><span>(双击选择)</span>
                                <span class="rt" @click="clearPeople" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table border @row-dblclick="dbChaolNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                    <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomLeft">
                            <el-table border tooltip-effect="dark" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="2" style="height:48%;margin-top:1%;">
                        <div style="padding-top:60px;">
                            <el-button @click="chaoRightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="chaoLeftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                            <!--<el-button @click="chaoAllRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>-->
                            <!--<el-button @click="chaoAllLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button>-->
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table border tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="cellChaodblClick" :height = "oaHeight" stripe :data="dataChao" highlight-current-row class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button class="checkDefault" @click="writorVisible = false">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>
        <!--<el-dialog class="checkModal fileTransferApplyAdd" title="选择需要移交的档案" :show-close="true" :visible.sync="tableVisible">-->
        <!--<div class="addTablesearch">-->
        <!--<div class="addTablesearchForm">-->
        <!--<el-form :model="searchForm" class="fileTransferApplyForm LIneFeedForm">-->
        <!--<template v-for="item in searchConfig">-->
        <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
        <!--<el-select v-model="searchForm['value'+item.id]" >-->
        <!--<el-option v-for="ind in item.dictData" :key="ind.code" :label="ind.text" :value="ind.code"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'">-->
        <!--<el-input v-model.trim="searchForm['value'+item.id]"></el-input>-->
        <!--</el-form-item>-->
        <!--</template>-->
        <!--<el-form-item class="buttonItem">-->
        <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="beginSearch">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--<el-button class="checkWay" @click="confirmAdd">确定添加</el-button>-->
        <!--</div>-->
        <!--<di class="tableContainer">-->
        <!--<el-table tooltip-effect="dark" stripe height="100%" :data="searchData" highlight-current-row ref="searchTable" class="indexTable containTable expandTable" @selection-change="selectionChange2">-->
        <!--<el-table-column type="selection" width="30" label="#">-->
        <!--</el-table-column>-->
        <!--<template v-for="item in tableArr">-->
        <!--<el-table-column :key="ind.caption" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :label="item.caption" :width="item.width">-->
        <!--</el-table-column>-->
        <!--</template>-->
        <!--</el-table>-->
        <!--</di>-->
        <!--<div class="pager">-->
        <!--<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" pager-count="5" :current-page="page"></el-pagination>-->
        <!--</div>-->
        <!--</el-dialog>-->
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './recordTransferApply.service';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';

    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        listLoading: boolean;
        peopleVisible: boolean;
        writorVisible: boolean;
        tableVisible:boolean;
        start:number;
        total:number;
        page:number;
        limit:number;
        dataCompany: any = [];
        checkNameForm: any = {};
        filters: any = {};
        basicForm: any = {};
        list: any = [];
        list1: any = [];
        data: any = [];
        dataName: any = [];
        tree: any = [];
        defaultProps: any = {};
        basicFormRules: any = {};
        searchData: any = [];//添加数据的表格数据
        searchForm: any = {};//搜索
        kindId:number;//档案分类ID
        libId:number;//档案库分类ID
        fondId:number;//全宗ID
        tableArr:any = [];//表格的配置数组
        IdArr: any = [];//返回的ID数组
        searchConfig: any = [];//搜索框的配置
        clickOne:boolean;//第一次点击
        selection: any = [];//选中项
        searchArr: any = [];//搜索的内容
        treeLoading:boolean;//树的加载
        treeParamsId: number;
        oaHeight:number;
        dataOa:any = [];
        comLoading:boolean;
        defaultTrees:any = {};
        auditDisplay:any ={};
        leafName:any = [];
        oaClickRowName:any = {};
        oaClickRowName1:any ={};
        dataChao:any = [];
        dataChaoArr:any=[];
        UserId:number;
        //Signature:string;
        Date:string;
        WJmap:any=[];
        AJmap:any=[];
        checked:number;
        targetId:number;
        targetfond:number;
        active:number;
        type:string;
        basicForm2:any={};
        loadingInstance:any;
        Treeresolve:any;
        isFirst:boolean;
        Treenode:any;
        Treeresolve1:any;
        isFirst1:boolean;
        Treenode1:any;
        checkProcess:string;
        checkProcessTrue:boolean;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280 ;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.peopleVisible = false;
            this.writorVisible = false;
            this.tableVisible = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 10;
            this.listLoading = false;
            this.list = [];
            this.list1 = [];
            this.treeLoading = false;
            this.dataOa = [];
            this.checkNameForm = {
                checkName:''
            };
            this.defaultProps = {
                children: 'children',
                label: 'nodeName'
            };
            this.tree = [];
            this.dataCompany = [];
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
            };
            this.basicForm = {
                title:'',
                createDateStart:'',
                createDateEnd:'',
                day:'',
                things:'',
                name:'',
                company:'',
                date:'',
                DW:'',
                BM:'',
                SL:''
            };
            this.basicFormRules = {
                title: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                createDateStart: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                createDateEnd: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                day: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                things: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                date:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                company:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                name:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                BM:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                DW:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                SL:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            };
            this.data =  [];
            this.dataName = [];
            this.searchForm = {};
            this.tableArr= [];
            this.IdArr = [];
            this.searchConfig = [];
            this.searchData = [];
            this.clickOne = true;
            this.selection = [];
            this.searchArr = [];
            this.treeParamsId = 0;
            this.comLoading = false;
            this.defaultTrees = {
                children: 'children',
                id:'orgID',
                label: 'shortName',
            };
            this.auditDisplay ={
                auditIds:'',
                ccUserId:'',
                name:''
            };
            this.leafName = [];//节点姓名
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.dataChao = [];
            this.dataChaoArr=[];
            //this.Signature="";
            this.checked = 0;
            this.WJmap=[];
            this.AJmap=[];
            this.basicForm2={
                Signature:'',
                auditIds:''
            };
            this.isFirst1 = true;
            this.isFirst = true;
            this.checkProcess = '';
            this.checkProcessTrue = true;
        };
        back():void{
            this['$router'].go(-1);
        };
        selsChange(list:any = {}){
            this.list = list;
        };
        selsChange1(list:any = {}){
            this.list1 = list;
        };
        // 表格初始化
        getFiles(){
            // let params =  Object.assign({},this.filters);
            // this.listLoading = true;
            // let params =  Object.assign({},param);
            // Service.getCarData(1).then((res) =>{
            //     console.log(res);
            // })
        };
        // 改变行class
        getRowClass(row:any = {}):string{
            if(row.row.parentId === '0'){
                return 'row-expand-cover';
            }else{
                return 'row-expand-null';
            }
        };
        // 改变单元格class
        getCellClass():string{
            return 'row-expand-basicForm2';
        };

        // 点击子节点
        handleNodeClick(data){
            this.oaPerson(data.orgID);
        };

        // 组织架构选人
        oaPerson(id){
            this.comLoading = true;
            Service.findOaList(id).then((res) =>{
                if(res.data.succeeded){
                    this.dataOa = res.data.data;
                    this.comLoading = false;
                }else{
                    this['$message']({
                        message: '组织架构列表加载失败！',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };
        // 点击选择审批人
        choosePerson():void{
            if(this.checkProcessTrue){
                this.peopleVisible = true;
                this.dataOa = [];
                this.checkNameForm.checkName = null;
                this.userPeople();
                if(!this.basicForm2.auditIds){
                    this.nameList();
                }
                if(!this.isFirst){
                    this.Treenode.childNodes = [];
                    this.loadNode(this.Treenode,this.Treeresolve);
                }
            }
        };

        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
                if(this.isFirst){
                    this.Treeresolve = resolve;
                    this.Treenode = node;
                    this.isFirst = false;
                }
                this.treeLoading = true;
                Service.findOaData(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                        });
                        resolve(treeData);
                        this.treeLoading = false;
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.treeParamsId = node.data.orgID;
                Service.findOaData(this.treeParamsId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        };
                        data.forEach(item => {
                            treeData.push(item)
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
        }
        // 懒加载树
        loadNode1(node,resolve) {
            if(node.level === 0){
                if(this.isFirst1){
                    this.Treeresolve1 = resolve;
                    this.Treenode1 = node;
                    this.isFirst1 = false;
                }
                this.treeLoading = true;
                Service.findOaData(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                        });
                        resolve(treeData);
                        this.treeLoading = false;
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.treeParamsId = node.data.orgID;
                Service.findOaData(this.treeParamsId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        };
                        data.forEach(item => {
                            treeData.push(item)
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
        }
        // 常用联系人
        userPeople(){
            Service.findOaPerson({}).then((res) =>{
                if(res.data.succeeded){
                    this.dataName = res.data.data;
                }else{
                    this['$message']({
                        message: '常用联系人加载失败！',
                        type: 'error'
                    });
                }
            });
        }

        // 审批人角色
        nameList(){
            this.dataCompany = [];
            Service.GetSelectRole({fondId:this.targetfond,transferType:2}).then(res=>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    for(var ind of data){
                        if(ind.userName){
                            this.dataCompany.push({ leafName:ind.name,name:ind.userName,select:ind.select })
                        }else{
                            this.dataCompany.push({ leafName:ind.name,name:'',select:ind.select })
                        }
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };


        // 点击选择抄送人
        chooseWritor():void{
            this.writorVisible = true;
            this.checkNameForm.checkName = null;
            this.dataOa = [];
            this.userPeople();
            if(!this.isFirst1){
                this.Treenode1.childNodes = [];
                this.loadNode(this.Treenode1,this.Treeresolve1);
            }
        };

        // 点击节点名称列表
        leafClickRow(row){
            this.oaClickRowName1 = row;
        };

        // 全部左转右
        allLeftToRight(){
            let arr = this.dataOa;
            for(let i=0;i<this.dataCompany.length;i++){
                if(!this.dataCompany[i].name&&this.dataCompany[i].select){
                    this.dataCompany[i].name = arr[i].fullName;
                    this.dataCompany[i].userID = arr[i].userID;
                };
            };
        };

        // 全部右转左
        allRightToLeft(){
            for(let com of this.dataCompany){
                if(com.name&&com.select){
                    com.name = '';
                    delete com.userID;
                }
            }
        };

        // 右转左
        rightToLeft(){
            let data = this.oaClickRowName1;
            for(let com of this.dataCompany){
                if(data.userID===com.userID&&com.select){
                    com.name = '';
                    delete com.userID;
                }
            }
        };

        // 左转右
        leftToRight(){
            let data = this.oaClickRowName;
            var i = 0;
            for(let item of this.dataCompany){
                if(item.userID==data.userID){
                    i = 1;
                };
            };
            if(i==0){
                for(let com of this.dataCompany){
                    if(!com.name&&com.select){
                        com.name = data.fullName;
                        com.userID = data.userID;
                        break;
                    };
                };
            };
        };

        // 清除常用联系人
        clearPeople(){
            this['$confirm']('确认全部清除吗？', {
                type: 'warning'
            }).then(() => {
                Service.clearOaPerson({}).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.userPeople();
                    }else{
                        this['$message']({
                            message: '删除失败！',
                            type: 'error'
                        });
                    }
                });
            });
        };

        // 点击左侧OA表格行
        oaClickRow(row){
            this.oaClickRowName = row;
        };


        // 点击节点表格删除
        celldblClick(row:any){
            if(!row.select){
                this.Warn("节点不能更改")
            }else if(row.name) {
                for(let data of this.dataCompany){
                    if(data.name===row.name){
                        data.name = '';
                        delete data.userID;
                    }

                }
            }
        };

        // 审批人确定
        chooseDone(){
            //this.writorVisible = false;
            let arr = this.dataCompany;
            let arrs = [];
            let nameArr = [];
            for(let item of arr){
                if(item.userID&&item.select){
                    arrs.push(item.userID);
                };
            };
            for(let item of arr){
                if(item.name){
                    nameArr.push(item.name);
                };
            };
            if(arrs.length>0){
                this.peopleVisible = false;
                this.basicForm2.auditIds = nameArr.join("->");
                var str = arrs.join(",");
                this.addLinkMan(str);
            }else{
                this['$message']({
                    message: '请选择审批人！',
                    type: 'warning'
                });
            }
        };

        // 查询姓名/OA
        searchName(name):void{
            let params = name?name:{};
            this.comLoading = true;
            Service.searchOaList(params).then((res) =>{
                if(res.data.succeeded){
                    this.dataOa = res.data.data;
                    this.comLoading = false;
                }else{
                    this['$message']({
                        message: '检索失败！',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };

        // 双击常联系人添加
        dblNameRow(row){
            let data = this.dataCompany;
            var i = 0;
            for(let ind of data){
                if(ind.userID==row.userID){
                    i = 1;
                };
            };
            if(i==0){
                for(let com of data){
                    if(!com.name&&com.select){
                        com.name = row.fullName;
                        com.userID = row.userID;
                        break;
                    };
                };
                this.dataCompany = data;
            };
        };

        // 双击抄送常联系人添加
        dbChaolNameRow(row){
            if(this.dataChao.length>0){
                let arr = [];
                for(let data of this.dataChao){
                    if(data.userID === row.userID){
                        arr.push(row.userID);
                    }
                }
                if(arr.length===0){
                    this.dataChao.push({
                        fullName:row.fullName,
                        userID:row.userID,
                        unitname:row.unitname,
                        jobname:row.jobname,
                    });
                }
            }else{
                this.dataChao.push({
                    fullName:row.fullName,
                    userID:row.userID,
                    unitname:row.unitname,
                    jobname:row.jobname,
                });
            }
        };

        // 抄送右转左
        chaoRightToLeft(){
            let data1 = this.oaClickRowName1;
            let arr = [];
            for(let data of this.dataChao){
                if(data1.fullName!==data.fullName){
                    arr.push(data)
                }
            };
            this.dataChao = arr;
        };

        // 抄送左转右
        chaoLeftToRight(){
            if(this.dataOa.length>0){
                let data1 = this.oaClickRowName;
                if(this.dataChao.length>0){
                    let arr = [];
                    for(let data of this.dataChao){
                        if(data1.userID === data.userID){
                            arr.push(data.userID);
                        }
                    }
                    if(arr.length===0){
                        this.dataChao.push({
                            fullName:data1.fullName,
                            userID:data1.userID,
                            unitname:data1.unitname,
                            jobname:data1.jobname,
                        });
                    }
                }else{
                    this.dataChao.push({
                        fullName:data1.fullName,
                        userID:data1.userID,
                        unitname:data1.unitname,
                        jobname:data1.jobname,
                    });
                }
            }
        };

        // 全部抄送右转左
        chaoAllRightToLeft(){
            this.dataChao = [];
        };

        // 全部抄送左转右
        chaoAllLeftToRight(){
            console.log(this.dataOa,this.dataChao)
            var arr = this.dataOa;
            for(let item of arr){
                var i = 0;
                for(let ind of this.dataChao){
                    if(ind.userID==item.userID){
                        i = 1;
                    };
                };
                if(i==0){
                    this.dataChao.push(item);
                }
            }
            //this.dataChao
            // if(this.dataOa.length>0){
            //     var obj = JSON.stringify(this.dataOa)
            //     this.dataChao = JSON.parse(obj);
            // }
        };

        // 点击抄送人节点表格删除
        cellChaodblClick(row:any){
            if(row.fullName) {
                let arr = [];
                for(let data of this.dataChao){
                    if(data.fullName!==row.fullName){
                        arr.push(data)
                    }
                };
                this.dataChao = arr;
            }
        };

        // 抄送人确定
        chooseDone1(){
            this.writorVisible = false;
            if(this.dataChao.length>0){
                let arr = [];
                let arrs = [];
                for(let data of this.dataChao){
                    for(let i in data){
                        if(i==='fullName'){
                            arr.push(data[i]);
                        }else if(i==='userID'){
                            arrs.push(data[i]);
                        };
                    };
                };
                var str = arrs.join(",");
                this.addLinkMan(str);
                this.auditDisplay.ccUserId  = arr.join(' ');
                var arr1 = JSON.stringify(this.dataChao);
                this.dataChaoArr = JSON.parse(arr1)

            }else{
                // this['$message']({
                //     message: '请选择抄送人！',
                //     type: 'warning'
                // });
            }
        };

        //添加常用联系人
        addLinkMan(ids){
            Service.saveContacts(ids).then(res=>{
            })
        };

        //分页
        handleCurrentChange(val) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchArr,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});

        };
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page-1);
            this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchArr,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
        };
        //添加列表选中项
        selectionChange2(selection){
            this.selection=selection;
        }

        //获取用户信息
        getUserInfo(params){
            Service.getUserInfo(params).then(res=>{
                if(res.data.succeeded){
                    this.basicForm.name = res.data.data.LogonUserFullName;
                    this.basicForm.company = res.data.data.LogonOrgName;
                    this.UserId =  res.data.data.LogonUserId
                    var myDate = new Date();
                    this.basicForm.date = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
                    this.Date = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+':'+myDate.getSeconds();
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //添加文件
        addFile(){
            this.searchArr=[];
            this.tableVisible = true;
            this.Getquerycondition(this.libId);
            // if(this.clickOne){
            this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchArr,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
            //     this.clickOne = false;
            // };
            // this['$refs']['searchTable']['clearSelection']();
            this.selection = [];
        };

        //添加数据时获取数据列表
        FileSearch(params:any){
            Service.FileSearch(params).then(res=>{
                if(res.data.succeeded){
                    this.searchData=res.data.data;
                    this.page = res.data.page;
                    this.total = res.data.totalRecords;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //获取搜索框配置
        Getquerycondition(params){
            Service.Getquerycondition(params).then(res=>{
                if(res.data.data.length>4){
                    document.getElementsByClassName('tableContainer')[0]['style'].top='115px';
                }else{
                    document.getElementsByClassName('tableContainer')[0]['style'].top='90px';
                }
                this.searchConfig = res.data.data;
                for(var item of res.data.data){
                    this['$set'](this.searchForm,'value'+item.id,null)
                }
            })
        }

        //搜索按钮
        beginSearch(){
            var arr = [];
            for(var key in this.searchForm){
                if(this.searchForm[key]!=null&&this.searchForm[key]!=''){
                    var str = key.slice(5);
                    var name = parseInt(str)
                    var obj = {
                        id:name,
                        value:this.searchForm[key]
                    };
                    arr.push(obj);
                };
            };
            // if(arr.length>0){
            this.searchArr = arr;
            this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchArr,pageCondition:{page:1, pageSize:10,sort:""}});
            // }else{
            //     this.Warn('请输入要搜索的内容');
            // }
        };

        //清空按钮
        clearSearch(){
            for(var key in this.searchForm){
                this.searchForm[key] = null;
            };
        };
        //确定添加按钮
        confirmAdd(){
            if(this.selection.length>=1){
                this.tableVisible=false;
                this.searchArr = [];
                for(var ind of this.selection){
                    var i = 0;
                    for(var item of this.data){
                        if(item.id==ind.id){
                            i = 1;
                        };
                    };
                    if(i==0){
                        this.data.push(ind);
                    };
                };
                this.basicForm.SL = this.data.length;
            }else{
                this.Warn("请选择你要添加的文件")
            }
        };

        //移出档案
        removeFile(){
            if(this.list.length<1){
                this.Warn("请选择要移出的档案")
            }else{
                this['$confirm']('您是否要移除所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var arr = [];
                    for(var item of this.data){
                        var i = 0;
                        for(var ind of this.list){
                            if(ind.id==item.id){
                                i = 1;
                            };
                        };
                        if(i==0){
                            arr.push(item)
                        };
                    };
                    this.data = arr;
                    this.basicForm.SL = this.data.length;
                }).catch(() => {
                    this['$message']({
                        type: 'info',
                        message: '已取消移出'
                    });
                });
            };
        };
        //获取移交表格的数据
        QueryFileTransferApply(params){
            Service.QueryFileTransferApply(params).then(res=>{
                if(res.data.succeeded){
                    this.data = res.data.data;
                }else{
                    this.getError(res.data.errorMessage)
                };
            });
        };
        // 重置tree
        renderContent(createElement, { node, data }) {
            return createElement(
                'span',
                {
                    attrs:{
                        'class':'custom-tree-node',
                    },
                    style:{
                        'padding': '11px 0',
                        'border-left':'3px solid #3c78d4'
                    }
                },
                [
                    createElement(
                        'i',
                        {
                            attrs:{
                                'class':data.className
                            },
                            style:{
                                'font-size': '12px',
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-left':'7px'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ]
            )
        };
        created(){
            treeChange(this.tree);
            this.getUserInfo({});
            var str = window.sessionStorage.getItem('recordTransferApply');
            var obj = JSON.parse(str);
            this.kindId = obj.kind/1;
            this.libId = obj.lib/1;
            this.fondId = obj.fond/1;
            this.IdArr = obj.ids;
            this.basicForm.DW = obj.cy;
            this.basicForm.BM = obj.ct;
            this.basicForm.SL = this.IdArr.length;
            this.targetId = obj.targetId/1;
            this.targetfond = obj.targetfond/1;
            // this.type = obj.type;
            this.active=obj.active;
            if(obj.check){
                this.checked = 1;
            }else{
                this.checked = 0;
            };

            // if(obj.check){
            //     this.checked = 1;
            // };
            // if(this.type=='2'){
            //     if(this.active==0) {
            //         var str = window.sessionStorage.getItem('AJmap');
            //         this.AJmap = JSON.parse(str)
            //         var str = window.sessionStorage.getItem('WJmap');
            //         this.WJmap = JSON.parse(str)
            //     }else if(this.active==1){
            //         var str = window.sessionStorage.getItem('WJmap');
            //         this.WJmap = JSON.parse(str)
            //     }
            // };
            Service.checkProcess({fondId:this.targetfond,transferType:2}).then(res=>{
                if(res.data.errorCode==-1){
                    this.checkProcess = res.data.errorMessage;
                    this.checkProcessTrue = false;
                }else{
                    this.checkProcessTrue = true;
                    this.checkProcess = '';
                };
            });
            Service.getColumns({libId:this.libId}).then(res=>{
                if(res.data.succeeded){
                    this.tableArr=res.data.data.listColumns;
                    this.QueryFileTransferApply({libId:this.libId,ids:this.IdArr})
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        // 提交借阅申请
        applySubmit(form,form1){
            if(this.data.length>0){
                this['$refs'][form]['validate']((valid)=>{
                    if(valid) {
                        this['$refs'][form1]['validate']((valid)=>{})
                        var CCarr = [];
                        for (var item of this.dataChaoArr) {
                            CCarr.push(item.userID)
                        }
                        ;
                        var CCstr = CCarr.join(',');
                        var Auditarr = [];
                        for (var item of this.dataCompany) {
                            if (item.select) {
                                Auditarr.push(item.userID)
                            }
                        }
                        ;
                        var auditStr = Auditarr.join(',');
                        var NumArr = [];
                        for (var ind of this.data) {
                            NumArr.push(ind.id)
                        }
                        var auditStr = Auditarr.join(',');
                        if (Auditarr.length > 0) {
                            if (this.basicForm2.Signature.length > 0) {
                                this.loadingInstance = Loading.service(
                                    {
                                        lock: true,
                                        text: '申请提交中，请稍等',
                                        spinner: 'el-icon-loading',
                                        background: 'rgba(0, 0, 0, 0.7)'
                                    }
                                );
                                Service.saveTransferLookup({
                                    transferType: 2,
                                    title: this.basicForm.title,
                                    userId: this.UserId,
                                    userDept: this.basicForm.company,
                                    // transferApplyDate: this.Date,
                                    ccUserIds: CCstr,
                                    auditUserId: auditStr,
                                    transferMemo: this.basicForm.things,
                                    libId: this.libId,
                                    ids: NumArr,
                                    signature: this.basicForm2.Signature,
                                    targetKindId: this.targetId,
                                    // anJuanFieldMappings: this.AJmap,
                                    // wenJianFieldMappings: this.WJmap,
                                    targetFondId: this.targetfond,
                                    acceptDept: this.basicForm.BM,
                                    deleteSrc: this.checked,
                                    fondId: this.fondId
                                }).then(res => {
                                    this.$nextTick(() => {
                                        this.loadingInstance.close();
                                    });
                                    if (res.data.succeeded) {
                                        var Id = res.data.data.transferId;
                                        this['$confirm']('跨全宗移交申请发起成功', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            showCancelButton: false,
                                            type: 'success'
                                        }).then(() => {
                                            var obj = {
                                                id:Id,
                                                type:2
                                            };
                                            window.sessionStorage.setItem('KQkuaQuanZongDetails',JSON.stringify(obj));
                                            this['$router'].push({path: '@/views/selfTip/kuaQuanZongDetails/kuaQuanZongDetails',name: '跨全总档案移交详情'})
                                        })
                                    }else {
                                        if(res.data.errorType=='SHOW_OK'){
                                            this['$confirm'](res.data.errorMessage, '提示', {
                                                confirmButtonText: '确定',
                                                cancelButtonText: '取消',
                                                showCancelButton: false,
                                                type: 'error'
                                            })
                                        }else{
                                            this.getError(res.data.errorMessage)
                                        }
                                    }
                                });
                            }else{
                                this.Warn('请填写签字意见')
                            };
                        } else {
                            this.Warn('请选择审批人')
                        }
                    }else{
                        this.Warn("请完善基本信息")
                    };
                });
            }else{
                this.Warn('请选择你要移交的文件')
            }
        };
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };

            //this.getFiles();

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
        //案卷号
        myAJH(num){
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
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/retrieve/loanSlip';
</style>