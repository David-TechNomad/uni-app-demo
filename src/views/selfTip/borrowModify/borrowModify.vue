<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span>档案修改申请</span>
            <el-button class="checkWay rt" @click="back" v-show="fanhui">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    借阅单号：{{row.applicationNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" label-width="130px" :rules="basicFormRules" ref="basicForm">
                        <div class="formItem topTitle">
                            <el-form-item label="标题：" ref="title" prop="title">
                                <el-input placeholder="最多输入50字" class="checkName percentName" maxlength="50" v-model.trim="basicForm.title"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clear formItem evenTitle whiteTitle">
                            <el-form-item label="申请人：" ref="name" class="lt" prop="userName">
                                <el-input class="checkName percentName" readonly v-model="basicForm.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="userDept">
                                <el-input class="checkName percentName" readonly v-model="basicForm.userDept"></el-input>
                            </el-form-item>
                            <el-form-item label="申请时间：" ref="date" class="lt basicItem nowDate" prop="appDate">
                                <el-date-picker type="date" readonly format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName percentName" v-model="basicForm.appDate"></el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clear formItem topTitle">
                            <el-form-item class="lt" v-if="row.parentAppNo" label="原计划借用日期：" prop="appStartDate">
                                <el-date-picker
                                        @change="changeDate"
                                        :picker-options="pickerOptions"
                                        ref="startDate"
                                        type="date"
                                        :disabled="true"
                                        placeholder="开始日期"
                                        class="checkName percentName"
                                        v-model="basicForm.appStartDate"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item class="lt" v-if="!row.parentAppNo" label="计划借用日期：" prop="appStartDate">
                                <el-date-picker
                                        @change="changeDate"
                                        :picker-options="pickerOptions"
                                        ref="startDate"
                                        type="date"
                                        placeholder="开始日期"
                                        class="checkName percentName"
                                        v-model="basicForm.appStartDate"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item class="lt basicItem" v-if="row.parentAppNo" label="原计划归还日期：" prop="appEndDate">
                                <el-date-picker
                                        @change="changeDay"
                                        :picker-options="dateOptions"
                                        type="date"
                                        :disabled="true"
                                        v-model="basicForm.appEndDate"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        class="checkName percentName"
                                        placeholder="结束日期"
                                        ref="endDate"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item class="lt basicItem" v-if="!row.parentAppNo" label="计划归还日期：" prop="appEndDate">
                                <el-date-picker
                                        @change="changeDay"
                                        :disabled="!basicForm.appStartDate"
                                        :picker-options="dateOptions"
                                        type="date"
                                        v-model="basicForm.appEndDate"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        class="checkName percentName"
                                        placeholder="结束日期"
                                        ref="endDate"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item class="lt basicItem" v-if="row.parentAppNo" label="原计划借阅天数：" ref="date" >
                                <el-input readonly class="checkName percentName" v-model="basicForm.days"></el-input>
                                <!--<span>天</span>-->
                            </el-form-item>
                            <el-form-item class="lt basicItem" v-if="!row.parentAppNo" label="计划借阅天数：" ref="date">
                                <el-input readonly class="checkName percentName" v-model="basicForm.days"></el-input>
                                <!--<span>天</span>-->
                            </el-form-item>
                        </div>
                        <div class="evenTitle" v-if="row.parentAppNo">
                            <el-form-item class="things" label="续借天数：" prop="againDays">
                                <el-input-number v-model="basicForm.againDays" readonly class="checkName percentName" controls-position="right"  :min="1" :max="60"></el-input-number>
                            </el-form-item>
                        </div>
                        <div class="evenTitle">
                            <el-form-item class="things" label="调阅事由：" prop="lookupDescription">
                                <el-input placeholder="最多输入1000字" type="textarea" maxlength="200" class="checkName percentName" v-model.trim="basicForm.lookupDescription"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        待借阅档案
                        <div class="titleSect"></div>
                        <p class="rt">
                            <el-button class="checkWay addButton" @click="oldFiles">重置</el-button>
                        </p>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table border tooltip-effect="dark" style="width: 100%" stripe :max-height="300" :data="data" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <template v-for="file in tableHeadArrs">
                                <el-table-column :width="file.width" v-if = "file.fieldName==='HOUSETYPE'" :prop="file.fieldName" :label="file.caption">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.HOUSETYPE===1||scope.row.HOUSETYPE==='1'">在库</span>
                                        <span v-if="scope.row.HOUSETYPE===2||scope.row.HOUSETYPE==='2'">借出</span>
                                        <span v-if="scope.row.HOUSETYPE!==1&&scope.row.HOUSETYPE!==2&&scope.row.HOUSETYPE!=='1'&&scope.row.HOUSETYPE!=='2'">无实体</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width" v-if = "file.fieldName!=='HOUSETYPE'" :prop="file.fieldName" :label="file.caption" >
                                </el-table-column>
                            </template>
                            <el-table-column v-if="tableHeadArrs.length>0" label="操作" width="80">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="deleteAgine(scope.row)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批信息
                        <div class="titleSect"></div>
                    </div>
                    <el-form :rules="checkFormRules" :model="auditDisplay" class="basicForm topParamsForm fileApplyForm" label-width="135px" ref="auditDisplay">
                        <div class="formItem topTitle">
                            <el-form-item class="checkThings" label="依次选择审批人：" ref="things" prop="auditIds">
                                <!--<span style="color: #f56c6c;position: absolute;left: -122px;top: -2px;">*</span>-->
                                <el-input readonly class="checkName percentName" v-model="auditDisplay.auditIds"></el-input>
                                <el-button class="checkSearch choosePerson" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                            </el-form-item>
                        </div>
                        <div class="formItem evenTitle whiteTitle" v-if="isCc">
                            <el-form-item class="checkThings" label="选择抄送人：" prop="ccUserId">
                                <el-input readonly class="checkName percentName" v-model="auditDisplay.ccUserId"></el-input>
                                <el-button class="checkSearch choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                            </el-form-item>
                        </div>
                        <div class="topTitle">
                            <el-form-item class="checkThings" label="签字：" prop="signature">
                                <!--<span style="color: #f56c6c;position: absolute;left: -52px;top: -2px;">*</span>-->
                                <el-input type="textarea" placeholder="最多输入1000字" class="checkName percentName" v-model.trim="auditDisplay.signature"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table border tooltip-effect="dark" style="width: 100%" stripe :data="dataCheck" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{dataCheck.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="auditUserRole" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="dateFormat1" label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="typeName" label="操作">
                            </el-table-column>
                            <el-table-column prop="receiveUserName" label="接收人">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit('basicForm','auditDisplay')">重新提交</el-button>
                <el-button class="checkWay" @click="applyClose()">关闭流程</el-button>
            </div>
        </div>
        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true">
            <!--<el-form :model="fileForm" label-width="125px" ref="fileForm">-->
            <!--<el-form-item prop="fileName">-->
            <!---->
            <!--</el-form-item>-->
            <!--</el-form>-->
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
                                <el-table  @row-dblclick="dblNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table tooltip-effect="dark" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa"  v-loading="comLoading" class="indexTable containTable">
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
                        <div>
                            <el-button @click="rightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="leftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                            <!--<el-button @click="allRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>-->
                            <!--<el-button @click="allLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button>-->
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="celldblClick" stripe :height = "oaHeight" @selection-change="selsChange1" :data="dataCompany" v-loading="listLoading" class="indexTable containTable">
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
        <el-dialog class="checkModal" title="选择抄送人" :visible.sync="writorVisible" :close-on-click-modal="true">
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
                                <el-table  @row-dblclick="dbChaolNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table tooltip-effect="dark" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                        <div>
                            <el-button @click="chaoRightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="chaoLeftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                            <el-button @click="chaoAllRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>
                            <el-button @click="chaoAllLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="cellChaodblClick" :height = "oaHeight" stripe :data="dataChao" highlight-current-row class="indexTable containTable">
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
        <el-dialog class="fileModal closeModal" title="关闭流程" :visible.sync="mitVisible" :close-on-click-modal="true">
            <el-form :model="mitForm" label-width="55px" ref="fileForm">
                <el-form-item class="things" label="说明：" ref="date">
                    <el-input :rows="5" placeholder="最多输入1000字" type="textarea" maxlength="1000" class="checkName percentName" v-model="mitForm.words"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="mitSub">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowModify.service';
    import moment from 'moment';
    import { Loading } from 'element-ui';
    import base from '@/scrollLoad';
    import treeChange from '../../../utils/treeChange';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        marginSize: number;
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        mitVisible: boolean;
        dataDetail : any = [];
        dataCheck: any = [];
        defaultTrees: any = {};
        rowFlag: any = {};
        listLoading: boolean;
        treeLoading: boolean;
        fanhui:boolean;
        isCc: boolean;
        start: number;
        total: number;
        page: number;
        a: string;
        b: any;
        processId:number;
        limit: number;
        treeParamsId: number;
        dataCompany: any = [];
        oldData: any = [];
        leafName: any = [];
        auditDisplay: any = {};
        checkNameForm: any = {};
        row: any = {};
        filters: any = {};
        basicForm: any = {};
        basicForm1: any = {};
        detailData1: any = {};
        pickerOptions: any = {};
        dateOptions: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        tableHeadArrs: any = [];
        dataName: any = [];
        tree: any = [];
        data: any = [];
        dataOa: any = [];
        dataChao: any = [];//抄送人数据
        peopleVisible: boolean;
        writorVisible: boolean;
        comLoading: boolean;
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        oaClickRowName: any = {};
        oaClickRowName1: any = {};
        leafNameForm: any = {};
        mitForm:any={};
        auditForm: any = {};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.fanhui = true;
            this.processId = 0;
            this.marginSize= 0;
            this.mitVisible = false;
            this.mitForm = {
                words:''
            };
            this.rowFlag = {};
            this.pickerOptions = {
                disabledDate(time) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    return time.getTime() < date;
                }
            };
            this.detailData1 = {};
            this.isCc = false;
            this.dateOptions = {

            };
            this.timer = false;
            this.peopleVisible = false;
            this.writorVisible = false;
            this.comLoading = false;
            this.treeLoading = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.listLoading = false;
            this.oldData = [];
            this.dataDetail = [];
            this.dataCheck = [];
            this.list = [];
            this.data = [];
            this.dataOa = [];
            this.dataChao = [];
            this.row = {};
            this.leafNameForm = {};
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.tableHeadArrs = [];
            this.auditForm = {
                auditIds:{},
                ccUserId:'',
                signature:''
            };
            this.defaultTrees = {
                children: 'children',
                id:'orgID',
                label: 'shortName',
            };
            this.basicFormRules = {
                title: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                appStartDate: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                appEndDate: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                days: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                lookupDescription: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                againDays:[
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                userDept:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                userName:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                appDate:[
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
            };
            this.checkFormRules = {
                auditIds:[
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                signature:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ]
            };
            this.basicForm = {
                title:'',
                lookupDescription:'',
                userId:'',
                userName:'',
                appDate:'',
                userDept:'',
                appStartDate:'',
                appEndDate:'',
                days:'',
                againDays:''
            };
            this.basicForm1 = {
                againDays:'',
            };
            this.auditDisplay ={
                auditIds:'',
                ccUserId:'',
                signature:''
            };
        }

        back():void{
            this['$router'].go(-1);
        };

        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
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
                        }
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
        };

        //时间格式化
        dateFormat(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }

        // 下载
        electricDownLoad(){

        };

        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        // 查询档案头
        getHeader():void{
            Service.borrowFileHead({}).then((res) =>{
                if(res.data.succeeded){
                    this.tableHeadArrs = res.data.data;
                    this.borrowFileTable();
                }else{
                    this['$message']({
                        message: '加载表格列配置失败！',
                        type: 'error'
                    });
                }
            })
        };
        // 查询档案列表
        borrowFileTable(){
            let params = {
                applicationNo:this.row.applicationNo
            };
            Service.borrowFileTable(params).then((res) =>{
                if(res.data.succeeded){
                    this.data = res.data.data;
                    this.oldData = res.data.data;
                }else{
                    this['$message']({
                        message: '加载档案列表失败！',
                        type: 'error'
                    });
                }
            })
        }

        // 回显时间转换
        dateFormatter(str){
            var d = new Date(str);
            var year = d.getFullYear();
            var month = (d.getMonth()+1)<10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1);
            var day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
            return [year, month, day].join('-');
        }

        // 查询审核列表
        borrowCheckTable(){
            let app;
            if(this.processId == 0){
                app = this.row.applicationNo;
            }else{
                app = this.a;
            }
            let params = {
                applicationNo:app
            };
            Service.borrowCheckTable(params).then((res) =>{
                if(res.data.succeeded){
                    this.dataCheck = res.data.data;
                }else{
                    this['$message']({
                        message: '加载审批列表失败！',
                        type: 'error'
                    });
                }
            })
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
        }

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

        // 节点表格
        nameList(){
            let params = {
                archives : this.data
            };
            Service.findNameList(params).then((res) =>{
                if(res.data.succeeded){
                    this.leafName = res.data.data;
                    let leafData = [];
                    for(let data of res.data.data){
                        for(let i in data){
                            leafData.push({ leafName:data[i],name:'' });
                        }
                    }
                    this.dataCompany = leafData;
                }else{
                    this['$message']({
                        message: '节点名称列表加载失败！',
                        type: 'error'
                    });
                }
            });
        };

        // 点击选择审批人
        choosePerson():void{
            if(this.data.length===0){
                this['$message']({
                    message: '待借阅档案列表为空，无法选择审批人！',
                    type: 'warning'
                });
            }else{
                this.peopleVisible = true;
                this.userPeople();
                if(this.dataCompany.length===0){
                    this.nameList();
                }
            }
        }

        // 点击选择抄送人
        chooseWritor():void{
            if(this.data.length===0){
                this['$message']({
                    message: '待借阅档案列表为空，无法选择抄送人！',
                    type: 'warning'
                });
            }else{
                this.writorVisible = true;
                // this.dataChao = [];
                this.userPeople();
            }
        };

        // 审批人确定
        chooseDone(){
            let arr = [];
            for(let data of this.dataCompany){
                for(let i in data){
                    if(i==='name'&&data[i]){
                        arr.push(data[i]);
                    }
                }
            }
            if(arr.length===this.dataCompany.length){
                this.auditDisplay.auditIds  = arr.join('- >');
                let leafNameArr = [];
                for(let i=0;i<this.leafName.length;i++){
                    for(let j in this.leafName[i]){
                        leafNameArr.push(this.leafName[i][j])
                    }
                }
                for(let i=0;i<leafNameArr.length;i++){
                    this.leafNameForm[leafNameArr[i]] = this.dataCompany[i].userID
                }
                let ids = this.dataCompany.map(function(item){return item.userID}).join(',');
                // 添加常联系人
                Service.addContacts(ids).then((res) =>{
                    if(!res.data.succeeded){
                        this['$message']({
                            message: '添加常用联系人失败！',
                            type: 'error'
                        });
                    }
                });
                this.peopleVisible = false;
            }else{
                this['$message']({
                    message: '审核人姓名未选择完整！',
                    type: 'warning'
                });
            }
        };

        // 抄送人确定
        chooseDone1(){
            if(this.dataChao.length>0){
                let arr = [];
                for(let data of this.dataChao){
                    for(let i in data){
                        if(i==='fullName'){
                            arr.push(data[i]);
                        }
                    }
                }
                this.auditDisplay.ccUserId  = arr.join('，');
                let ids = this.dataChao.map(function(item){return item.userID}).join(',');
                this.auditForm.ccUserId = this.dataChao.map(item => item.userID).toString();
                // 添加常联系人
                Service.addContacts(ids).then((res) =>{
                    if(!res.data.succeeded){
                        this['$message']({
                            message: '添加常用联系人失败！',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.auditDisplay.ccUserId = '';
                this.auditForm.ccUserId = '';
            }
            this.writorVisible = false;
                // else{
            //     this['$message']({
            //         message: '请选择抄送人！',
            //         type: 'warning'
            //     });
            // }
        };

        // 双击常联系人添加
        dblNameRow(row){
            let data = this.dataCompany;
            for(let com of data){
                if(!com.name){
                    com.name = row.fullName;
                    com.userID = row.userID;
                    return false;
                }
            }
            this.dataCompany = data;
            console.log(this.dataCompany)
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

        // 点击节点表格删除
        celldblClick(row:any){
            if(row.name) {
                row.name = '';
            }
        }

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
        }

        // 点击左侧OA表格行
        oaClickRow(row){
            this.oaClickRowName = row;
        };

        // 左转右
        leftToRight(){
            let data = this.oaClickRowName;
            for(let com of this.dataCompany){
                if(!com.name){
                    com.name = data.fullName;
                    com.userID = data.userID;
                    return;
                }
            }
        }

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
        }

        // 点击节点名称列表
        leafClickRow(row){
            this.oaClickRowName1 = row;
        };
        // 右转左
        rightToLeft(){
            let data = this.oaClickRowName1;
            for(let com of this.dataCompany){
                if(data.userID===com.userID){
                    com.name = '';
                }
            }
        }

        // 删除档案
        deleteAgine(row){
            let arr = [];
            for(let data of this.data){
                if(data.id!==row.id){
                    arr.push(data)
                }
            }
            this.data = arr;
        }

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
        }

        // 全部右转左
        allRightToLeft(){
            for(let com of this.dataCompany){
                if(com.name){
                    com.name = '';
                }
            }
        };

        // 全部左转右
        allLeftToRight(){
            let arr = this.dataOa;
            for(let i=0;i<this.dataCompany.length;i++){
                if(!this.dataCompany[i].name){
                    this.dataCompany[i].name = arr[i].fullName;
                    this.dataCompany[i].userID = arr[i].userID;
                }
            }
        };

        // 全部抄送右转左
        chaoAllRightToLeft(){
            this.dataChao = [];
        }

        chaoAllLeftToRight(){
            if(this.dataOa.length>0){
                if( this.dataChao.length>0){
                    let att = [];
                    for(let a of this.dataChao){
                        let arr = [];
                        for(let b of this.dataOa){
                            if(a.userID===b.userID){
                                arr.push(a)
                            }
                        }
                        if(arr.length===0){
                            att.push(a)
                        }
                    }
                    this.dataChao = att.concat(this.dataOa)
                }else{
                    this.dataChao = this.dataOa
                }
            }
        }

        // 点击子节点
        handleNodeClick(data){
            this.oaPerson(data.orgID);
        };

        clearDate(){
            this.basicForm.appEndDate = null;
            this.basicForm.days = null;
        }
        anaDate(){
            let date = new Date(this.basicForm.appStartDate);
            let date1 = new Date(this.basicForm.appStartDate);
            this.dateOptions = {
                disabledDate(time) {
                    date.setTime(date.getTime() - 3600);
                    date1.setTime(date.getTime() + 3600 * 1000 * 24 * 59);
                    let timer =  time.getTime();
                    // let date2 = date.setTime(date.getTime() - 3600 * 1000 *24);
                    return timer< date || date1 <timer;
                }
            };
        }
        // 同步借阅日期
        changeDate(){
            if(this.basicForm.appStartDate){
                this.clearDate();
                this.anaDate();
            }
        };
        // 计算借阅天数
        changeDay(){
            this.anaDate();
            if(this.basicForm.appEndDate){
                let dateA = new Date(this.basicForm.appStartDate).getTime();
                let dateB  = new Date(this.basicForm.appEndDate).getTime();
                let datetime = 1000*60*60*24; //一天时间的毫秒值

                if(Math.floor(((dateB-dateA)/datetime))>1){
                    this.basicForm.days =   (Number(Math.floor(((dateB-dateA)/datetime)))+1).toString();
                    // Math.floor(((dateB-dateA)/datetime)).toString();
                }else{
                    this.basicForm.days = '1';
                }
            }
        };

        // 提交借阅申请
        applySubmit(basicForm,auditDisplay):void{
            let a = false;
            let b = false;
            this['$refs'][basicForm]['validate']((valid)=>{
                if (valid) {
                    a = true;
                }
            });
            this['$refs'][auditDisplay]['validate']((valid)=>{
                if (valid) {
                    b = true;
                }
            });
            if(a&&b){
                    if(this.data.length>0){
                        if(this.auditDisplay.auditIds){
                            if(this.auditDisplay.signature){
                                if(this.leafName.length>0){
                                    this.allParams = this.leafNameForm;
                                }else{
                                    this.allParams = null
                                }
                                this.auditForm.auditIds = this.allParams;
                                // if(!this.auditForm.ccUserId){
                                //     if(this.dataChao.length>0){
                                //         this.auditForm.ccUserId = this.dataChao.map(item => item.userID).toString();
                                //     }else{
                                //         this.auditForm.ccUserId = '';
                                //     }
                                // }

                                this.auditForm.signature = this.auditDisplay.signature;
                                let param = {
                                    archives:[]
                                };
                                param.archives = this.data;
                                this.row.title = this.basicForm.title;
                                this.row.lookupDescription = this.basicForm.lookupDescription;
                                let allParams = {};
                                if(this.row.parentAppNo){
                                    if(this.basicForm.againDays) {
                                        let params = {
                                            againDays:this.basicForm.againDays
                                        }
                                        allParams = Object.assign({}, this.row, this.auditForm, param,params);
                                        let loadingInstance = Loading.service(
                                            {
                                                lock: true,
                                                text: '正在提交中，请稍候',
                                                spinner: 'el-icon-loading',
                                                background: 'rgba(0, 0, 0, 0.7)'
                                            }
                                        );
                                        Service.applyModify(allParams).then((res) =>{
                                            if(res.data.succeeded){
                                                this.$nextTick(() => {
                                                    loadingInstance.close();
                                                });
                                                this['$message']({
                                                    message: '借阅申请发起成功！',
                                                    type: 'success'
                                                });
                                                if(this.processId == 0){
                                                    this['$router'].go(-1);
                                                }else{
                                                    window.close();
                                                }
                                            }else{
                                                this['$message']({
                                                    message: res.data.errorMessage,
                                                    type: 'error'
                                                });
                                                this.$nextTick(() => {
                                                    loadingInstance.close();
                                                });
                                            }
                                        });
                                    }else{
                                        this['$message']({
                                            message: '续借天数不能为空！',
                                            type: 'warning'
                                        });
                                    }
                                }else{
                                    this.row.startDate = this.basicForm.appStartDate;
                                    this.row.endDate = this.basicForm.appEndDate;
                                    this.row.days = this.basicForm.days;
                                    allParams  = Object.assign({},this.row,this.auditForm,param);
                                    let loadingInstance = Loading.service(
                                        {
                                            lock: true,
                                            text: '正在提交中，请稍候',
                                            spinner: 'el-icon-loading',
                                            background: 'rgba(0, 0, 0, 0.7)'
                                        }
                                    );
                                    Service.applyModify(allParams).then((res) =>{
                                        if(res.data.succeeded){
                                            this.$nextTick(() => {
                                                loadingInstance.close();
                                            });
                                            this['$message']({
                                                message: '借阅申请发起成功！',
                                                type: 'success'
                                            });
                                            if(this.processId == 0){
                                                this['$router'].go(-1);
                                            }else{
                                                window.close();
                                            }
                                        }else{
                                            this['$message']({
                                                message:  res.data.errorMessage,
                                                type: 'error'
                                            });
                                            this.$nextTick(() => {
                                                loadingInstance.close();
                                            });
                                        }
                                    });
                                }
                            }else {
                                this['$message']({
                                    message: '请填写签字意见。',
                                    type: 'warning'
                                });
                            }
                        }else{
                            this['$message']({
                                message: '请选择审批人。',
                                type: 'warning'
                            });
                        }
                    }else{
                        this['$message']({
                            message: '请选择待借阅档案。',
                            type: 'warning'
                        });
                    }
            }else if(!a&&!b){
                this['$message']({
                    message: '请完善基本信息。',
                    type: 'warning'
                });
            }else if(!a&&b){
                this['$message']({
                    message: '请完善基本信息。',
                    type: 'warning'
                });
            }else if(a&&!b){
                if(!this.auditDisplay.auditIds){
                    this['$message']({
                        message: '请选择审批人。',
                        type: 'warning'
                    });
                }else if(!this.auditDisplay.signature){
                    this['$message']({
                        message: '请填写签字意见',
                        type: 'warning'
                    });
                }
            }
        };

        // 关闭申请
        applyClose(){
            this.mitVisible = true;
        }

        // 确认关闭
        mitSub(){
                let params = {
                    applicationNo:this.row.applicationNo,
                    closeRemark:this.mitForm.words
                };
                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在关闭中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                Service.borrowCloseDone(params).then((res) =>{
                    if(res.data.succeeded){
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                        if(this.processId == 0){
                            this['$router'].go(-1);
                        }else{
                            window.opener = null;
                            window.close();
                        }
                        this['$message']({
                            message: '关闭成功！',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                        this.$nextTick(() => {
                            loadingInstance.close();
                        });
                    }
                });
        }

        // 重置
        oldFiles(){
            this.data = this.oldData;
        };

        created(){
            this.row =  JSON.parse(window.sessionStorage.getItem('examCheckData'));
            let auditId;
            if(this.row){
                auditId = this.row.auditId;
            }
            // 接入OA
            let url = window.location.href;
            url = unescape(url);
            if(url.indexOf("applicationNo") > 0){
                this.processId = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2].split('&')[0]);
                    let bb1 = (url.split('&')[1]);
                    let cc = bb.substr(bb.indexOf("=")+1);
                    let cc1 = bb1.substr(bb1.indexOf("=")+1);
                    let dd = base['base64'].decode(
                        JSON.stringify(cc)
                    );
                    let dd1 = base['base64'].decode(
                        JSON.stringify(cc1)
                    );
                    this.a = dd;
                    this.b = Number(dd1);
                    this.fanhui = false;
                }
            }else{
                this.b = Number(this.row.auditId);
                this.processId = 0;
                this.fanhui = true;
            }
            // 调整样式
            if(this.processId != 0){
                this.marginSize = -50;
            }
            let app;
            if(this.processId == 0){
                app = this.row.applicationNo;
            }else{
                app = this.a;
            }
            Service.getUtilizeLookup({ applicationNo:app }).then((res) =>{
                if(res.data.succeeded){
                    this.row = res.data.data;
                    Service.applyFlagInfo({ processId:this.b }).then((res) =>{
                        if(res.data.succeeded){
                            if(res.data.data.flag){
                                this.rowFlag = res.data.data;
                                window.sessionStorage.setItem('examCheckData1', JSON.stringify(this.row));
                                window.sessionStorage.setItem('auditIdIf','2');
                                window.sessionStorage.setItem('auditId',auditId);
                                this['$router'].push({
                                    path:'/selfTip/examination/borrowExaminationDetail/borrowExaminationDetail',
                                });
                            }
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            })
                        }
                    });
                    if(this.row.parentAppNo){
                        let parame = {applicationNo:this.row.parentAppNo};
                        Service.getUtilizeLookup(parame).then((res) =>{
                            if(res.data.succeeded){
                                this.detailData1 = res.data.data;
                                this.row.startDate = this.row.appStartDate;
                                this.row.endDate = this.row.appEndDate;
                                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                    this.basicForm.appStartDate = this.dateFormat(this.detailData1.appStartDate);
                                    this.basicForm.appEndDate = this.dateFormat(this.detailData1.appEndDate);
                                }else{
                                    this.basicForm.appStartDate = this.dateFormatter(this.detailData1.appStartDate);
                                    this.basicForm.appEndDate = this.dateFormatter(this.detailData1.appEndDate);
                                }
                                this.basicForm.againDays = this.detailData1.days;
                                this.basicForm.days = this.basicForm.againDays;
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        });
                    }else{
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            this.basicForm.appStartDate = this.dateFormat(this.row.appStartDate);
                            this.basicForm.appEndDate = this.dateFormat(this.row.appEndDate);
                        }else{
                            this.basicForm.appStartDate = this.dateFormatter(this.row.appStartDate);
                            this.basicForm.appEndDate = this.dateFormatter(this.row.appEndDate);
                        }
                        this.basicForm.days = this.row.days;
                    }
                    this.basicForm.title = this.row.title;
                    this.basicForm.lookupDescription = this.row.lookupDescription;
                    this.basicForm.userId = this.row.userId;
                    this.basicForm.userName = this.row.userName;
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        this.basicForm.appDate = this.dateFormat(this.row.appDate);
                    }else{
                        this.basicForm.appDate = new Date(this.row.appDate);
                    }
                    this.basicForm.userDept = this.row.userDept;
                    // 回显签字
                    this.auditDisplay.signature = this.row.signature?this.row.signature:'';
                    // 检测是否可抄送
                    Service.isWrite({ processId:this.row.processId }).then((res) =>{
                        if(res.data.succeeded){
                            this.isCc = res.data.data;
                            if(this.isCc){
                                // 回显抄送人
                                this.auditDisplay.ccUserId = this.row.ccUser&&this.row.ccUser.length>0?this.row.ccUser.map(item => item.fullName).join(', '):'';
                                // 提交抄送人
                                this.auditForm.ccUserId = this.row.ccUser&&this.row.ccUser.length>0?this.row.ccUser.map(item => item.userID).toString():'';
                            }
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                    this.getHeader();
                    this.borrowCheckTable();
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });
        };

        mounted(){
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            