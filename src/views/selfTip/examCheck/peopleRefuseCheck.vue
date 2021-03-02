<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <span>借阅人变更申请</span>
            <el-button v-show="fanhui && !guanBiButton" class="checkWay rt" @click="back">返回</el-button>
            <el-button v-show="fanhui && guanBiButton" class="checkWay rt" @click="back">关闭</el-button>
            <el-button class="checkWay rt" v-show="!xianshi1&&type=='history'" @click="dayin">打印</el-button>
            <!--<el-button class="checkWay rt" v-if="type!='history'" @click="clickJCBtn">借出</el-button>-->
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{detailData.processNo}}
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" label-width="120px" :rules="basicFormRules" ref="cell">
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple"><span v-show="xianshi" class="span1" style="color:red;">* </span><span class="span1">标题</span></div></el-col>
                            <el-col :span="21"><div class="grid-content bg-purple-light">
                            <span class="span2">
                                <el-input class="checkName percentName" maxlength="50" placeholder="最多填写50个字" style="margin:-8px" v-model.trim="detailData.title" v-show="xianshi"></el-input><span v-show="!xianshi">{{detailData.title}}</span>
                             </span></div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userName}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请人部门</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userDept}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">申请时间</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat(detailData.createDate)}}</span></div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅日期</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(detailData.appStartDate)}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划归还日期</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{dateFormat(detailData.appEndDate)}}</span></div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">计划借阅天数</span></div></el-col>
                            <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{detailData.days}} 天</span></div></el-col>
                        </el-row>
                        <el-row v-if="shenpiliucheng">
                            <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">变更后借阅人</span></div></el-col>
                            <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;">{{detailData.updateUserFullName }}</div></el-col>
                        </el-row>
                        <el-row v-if="shenpiliucheng">
                            <el-col :span="3"><div class="grid-content bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">原流程</span></div></el-col>
                            <el-col :span="21"><div class="grid-content bg-purple-light" style="padding:10px 0 0 10px;"><span class="superTarget" @click="findBorrowDetails">{{detailData.oldTitle}}</span></div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span v-show="xianshi" class="span1" style="color:red;">* </span><span class="span1">变更事由</span></div></el-col>
                            <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">
                                <el-input class="checkName percentName" type="textarea" maxlength="1000" placeholder="最多输入1000字" style="margin:-13px" v-model.trim="detailData.desc" v-show="xianshi"></el-input><span v-show="!xianshi">{{detailData.desc}}</span>
                            </div></el-col>
                        </el-row>
                    </el-form>
                </ul>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        待借阅文档
                        <div class="titleSect"></div>
                        <el-button class="checkWay rt" style="margin:5px 0" @click="toAgine" v-show="allShow1">续借</el-button>
                        <el-button class="checkWay rt" style="margin:5px 10px" @click="changePeople" v-show="allShow1">变更借阅人</el-button>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" @selection-change="selsChange" style="width: 100%" max-height="300" stripe :data="data" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <template v-for="file in tableHeadArrs">
                                <el-table-column :width="file.width" v-if = "file.fieldName==='CFWZ'" :prop="file.fieldName" :label="file.caption">
                                    <template slot-scope="scope">
                                        <el-popover trigger="hover" placement="top" v-if = "scope.row.CFWZ">
                                            <p>档案存放地</p>
                                            <p>{{ scope.row.CFWZ }}</p>
                                            <p>{{ scope.row.tooltipContent }}</p>
                                            <div slot="reference" class="name-wrapper">
                                                <div>{{ scope.row.CFWZ}}</div>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width" v-if = "file.fieldName==='TM'" :label="file.caption">
                                    <template slot-scope="scope">
                                        <span class="superTarget" @click="electricBorrowDetail(scope.row)">{{scope.row.TM}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column :width="file.width"  v-if="file.fieldName!=='TM'&&file.fieldName!=='CFWZ'" :prop="file.fieldName" :label="file.caption" >
                                </el-table-column>
                            </template>
                            <el-table-column v-if="tableHeadArrs.length>0 && xianshi" label="操作" width="80">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="deleteAgine(scope.row,scope.$index)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>

            <div class="mainCon basicList" v-show="shenpiliucheng">
                <div class="loanTipTitle">
                    审批流程
                    <div class="titleSect"></div>
                </div>
                <div class="basicList1">
                    <el-row>
                        <el-col :span="22">
                            <div class="grid-content2 bg-purple-light">
                                <span class="span3">
                                    <span v-for="(item,index) in stepMap" v-show="!showTiShi">
                                        {{item.taskNodeName}}【{{item.auditUserName}}<span v-if="item.auditResult==1"><i class="fa fa-check" style="color:lightgreen;font-size:15px;"></i> </span><span v-if="item.auditResult==2"><i class="fa fa-close" style="color:red;font-size:15px;"></i> </span>】<span v-if="index != stepMap.length-1"><img style="width:20px;height:20px;vertical-align: top;" src="../../../imgs/arrow.png"></span>
                                    </span>
                                    <span v-show="showTiShi">
                                        {{tishi}}
                                    </span>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="mainCon basicList" v-show="shenpixinxi">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批信息
                        <div class="titleSect"></div>
                    </div>
                    <el-form :rules="checkFormRules" :model="auditDisplay" class="basicForm topParamsForm fileApplyForm" label-width="135px" ref="cell">
                        <div class="formItem topTitle">
                            <el-form-item class="checkThings" label="依次选择审批人：" ref="things" prop="auditIds" :rules="[{required:true,message:'请选择',trigger:['blur','change']}]">
                                <el-input readonly class="checkName percentName" v-model="auditDisplay.auditIds"></el-input>
                                <el-button class="checkSearch choosePerson" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                            </el-form-item>
                        </div>
                        <div class="formItem evenTitle whiteTitle" v-show="cc">
                            <el-form-item class="checkThings" label="选择抄送人：" prop="ccUserId">
                                <el-input readonly class="checkName percentName" v-model="auditDisplay.ccUserId"></el-input>
                                <el-button class="checkSearch choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                            </el-form-item>
                        </div>
                        <div class="topTitle">
                            <el-form-item class="checkThings" label="签字：" prop="signature" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                                <el-input class="checkName percentName" type="textarea" maxlength="1000" placeholder="最多输入1000字" v-model.trim="auditDisplay.signature"></el-input>
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
                        <el-table tooltip-effect="dark" style="width: 100%" stripe :data="recordData" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{recordData.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="taskNodeName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="dateFormat1" label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="type" label="操作">
                            </el-table-column>
                            <el-table-column prop="nextNodeUserName" label="接收人">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>

            <div class="applyDone" v-show="xianshi1">
                <el-button class="checkWay" @click="applySubmit()">重新提交</el-button>
                <el-button class="checkWay" @click="guanbi()">关闭流程</el-button>
            </div>
        </div>
        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true" :before-close="handleClose1">
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
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="100px" ref="cell" @submit.native.prevent>
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName" @keyup.enter.native="searchName(checkNameForm.checkName)"></el-input>
                                        <el-button class="checkWay" @click.enter="searchName(checkNameForm.checkName)">查询</el-button>
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
                    <el-col :span="2" style="height:48%;margin-top:7%;">
                        <div>
                            <el-button @click="rightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="leftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="celldblClick" stripe :height = "oaHeight" @selection-change="selsChange1" :data="dataCompany" v-loading="listLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="nodeName" label="节点名称">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="userId" label="ID">
                                </el-table-column>
                                <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="id" label="">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer" style="margin-top:10px;">
                <el-button class="checkDefault" @click="peopleVisible = false;node.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone" >确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="checkModal" title="选择抄送人" :visible.sync="writorVisible" :close-on-click-modal="true" :before-close="handleClose2">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="100px" ref="cell" @submit.native.prevent>
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName" @keyup.enter.native="searchName(checkNameForm.checkName)"></el-input>
                                        <el-button class="checkWay" @click.enter="searchName(checkNameForm.checkName)">查询</el-button>
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
                                <label>常联系人</label><span>(双击选择)</span>
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
                <el-button class="checkDefault" @click="writorVisible = false;node1.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="fileModal closeModal" title="关闭流程" :visible.sync="peopleVisible0" :close-on-click-modal="true">
            <el-form :model="mitForm" label-width="55px" ref="fileForm">
                <el-form-item class="things" label="说明：" ref="date">
                    <el-input :rows="5" placeholder="最多输入1000字" type="textarea" maxlength="1000" class="checkName percentName" v-model="yijian"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="guanbiSure">确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './peopleRefuseCheck.service';
    import moment from 'moment';
    import base from '@/scrollLoad';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        marginSize:number;
        timer: boolean;
        applicationNo:string;
        type:string = '';
        node:String;
        dataDetail : any = [];
        dataCheck: any = [];
        recordData; any = [];
        defaultTrees: any = {};
        listLoading: boolean;
        treeLoading: boolean;
        fanhui:boolean;
        xianshi:boolean;
        xianshi1:boolean;
        shenpixinxi:boolean;
        shenpiliucheng:boolean;
        peopleVisible0:boolean;
        cc:boolean;
        tishi:String;
        showTiShi: boolean;
        guanBiButton : boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        processId: number;
        treeParamsId: number;
        a:number;
        yijian:string;
        dataCompany: any = [];
        stepMap: any = [];
        leafName: any = [];
        auditDisplay: any = {};
        checkNameForm: any = {};
        row: any = {};
        filters: any = {};
        basicForm: any = {};
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
        detailData: any = {};
        dataChao: any = [];//抄送人数据
        peopleVisible: boolean;
        writorVisible: boolean;
        comLoading: boolean;
        defaultProps: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        oaClickRowName: any = {};
        oaClickRowName1: any = {};
        auditForm: any = {};
        i: number;
        j: number;
        node: any = {};
        resolve: any = {};
        node1: any = {};
        resolve1: any = {};
        allShow: boolean;
        rect:string;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.peopleVisible = false;
            this.writorVisible = false;
            this.comLoading = false;
            this.treeLoading = false;
            this.xianshi = true;
            this.xianshi1 = false;
            this.shenpixinxi = true;
            this.shenpiliucheng = true;
            this.fanhui = false;
            this.guanBiButton = false;
            this.peopleVisible0 = false;
            this.cc = true;
            this.tishi = '';
            this.yijian = '';
            this.processId = 0;
            this.marginSize = 0;
            this.showTiShi = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.a = 0;
            this.listLoading = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.list = [];
            this.recordData = [];
            this.data = [];
            this.dataOa = [];
            this.dataChao = [];
            this.row = {};
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.tableHeadArrs = [];
            this.auditForm = {
                auditIds:{},
                ccUserId:{},
                signature:''
            };
            this.defaultTrees = {
                children: 'children',
                id:'orgID',
                label: 'shortName',
            };
            this.basicForm = {
                title:'',
                againDays:'',
                lookupDescription:'',
                userId:'',
                userName:'',
                appDate:'',
                userDept:'',
                appStartDate:'',
                appEndDate:'',
                days:'',
            };
            this.auditDisplay ={
                auditIds:'',
                ccUserId:'',
                signature:'',
                ccUsers:''
            };
            this.i = 0;
            this.j = 0;
            this.checkNameForm = {
                checkName:''
            };
            this.allShow = false;
            this.rect = '';
        }
        // 借出
        clickJCBtn(){
            // window.sessionStorage.setItem('_type', '');
            this['$router'].push({
                name:'借出档案管理借出页面'
            });
        }

        back():void{
            if((window.sessionStorage.getItem('node') == "3" || window.sessionStorage.getItem('node') == "4")
                &&window.sessionStorage.getItem('backFile')!='1'&&window.sessionStorage.getItem('backFile')!='4'
                &&window.sessionStorage.getItem('backFile')!='3'&&window.sessionStorage.getItem('backFile')!='5'
                &&window.sessionStorage.getItem('backFile')!='6'&&window.sessionStorage.getItem('backFile')!='7'){
                this['$router'].push({
                    path:'/selfTip/borrow',
                });
                window.sessionStorage.removeItem('node');
            }else if(window.sessionStorage.getItem('backFile')=='1'){
                this['$router'].push({
                    path:'/fileArrange/archivesManagent',
                });
            }else if(window.sessionStorage.getItem('backFile')=='3'){
                this['$router'].push({
                    path:'/fileArrange/fileManagement',
                });
            }else if(window.sessionStorage.getItem('backFile')=='4'){
                this['$router'].push({
                    path:'/fileArrange/arrange',
                });
            }else if(window.sessionStorage.getItem('backFile')=='5'){//档案借出管理
                this['$router'].push({
                    path:'/selfTip/borrowHistory',
                })
            }else if(window.sessionStorage.getItem('backFile')=='6'){//借阅人变更申请
                this['$router'].push({
                    path:'/selfTip/borrowerApply',
                })
            }else if(window.sessionStorage.getItem('backFile')=='7'){//审批事项
                this['$router'].push({
                    path:'/selfTip/examination',
                })
            }
        };

        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
                this.node = node;
                this.resolve = resolve;
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

        // 懒加载树
        loadNode1(node,resolve) {
            if(node.level === 0){
                this.node1 = node;
                this.resolve1 = resolve;
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
                    this.data = this.detailData.archiveList;
                }else{
                    this['$message']({
                        message: '加载表格列配置失败！',
                        type: 'error'
                    });
                }
            })
        };

        // 查询审核列表
        borrowCheckTable(){
            let params = {
                applicationNo:this.detailData.applicationNo
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
            let params = this.detailData.fondsId;
            Service.getTaskNodeList(params).then((res) =>{
                this.dataCompany = res.data.data;
                for(let child of this.dataCompany){
                    if(!child.select && child.fullName == ''){

                    }
                }
            });
        };

        // 点击选择审批人
        choosePerson():void{
            if(this.data.length===0){
                this['$message']({
                    message: '待借阅文档列表为空，无法选择审批人！',
                    type: 'warning'
                });
            }else{
                this.i+=1;
                this.peopleVisible = true;
                if(this.i != 1){
                    this.loadNode(this.node,this.resolve);
                }
                this.userPeople();
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
                this.j+=1;
                this.writorVisible = true;
                if(this.j != 1){
                    this.loadNode1(this.node1,this.resolve1);
                }
                this.userPeople();
            }
        };

        // 审批人确定
        chooseDone(){
            let arr = [];
            let ids = [];
            for(let data of this.dataCompany){
                if(data.fullName != ''){
                    arr.push(data.fullName);
                    ids.push(data.userId);
                }
            }
            if(arr.length===this.dataCompany.length){
                this.auditDisplay.auditIds  = arr.join('->');
                let id = ids.join(',');
                for(let i=0;i<this.leafName.length;i++){
                    for(let j in this.leafName[i]){
                        this.leafName[i][j] = this.dataCompany[i].userID
                    }
                }
                this.peopleVisible = false;
                this.saveContacts(id);
                this.node.childNodes = [];
                this.dataOa = [];
                this.checkNameForm.checkName = '';
            }else{
                this['$message']({
                    message: '审核人姓名未选择完整！',
                    type: 'warning'
                });
            }
        };

        saveContacts(id){
            Service.saveContacts(id).then((res) =>{

            });
        }

        // 抄送人确定
        chooseDone1(){
            if(this.dataChao.length>0){
                let arr = [];
                let ids = [];
                for(let data of this.dataChao){
                   arr.push(data.fullName);
                   ids.push(data.userID);
                }
                this.auditDisplay.ccUserId  = arr.join('，');
                this.auditDisplay.ccUsers  = ids.join(',');
                let a = ids.join(",");
                this.writorVisible = false;
                this.saveContacts(a);
                this.node1.childNodes = [];
                this.dataOa = [];
                this.checkNameForm.checkName = '';
            }else{
                this.writorVisible = false;
                this.auditDisplay.ccUserId  = '';
                this.auditDisplay.ccUsers  = '';
                this.node1.childNodes = [];
                this.dataOa = [];
                this.checkNameForm.checkName = '';
            }
        };

        // 双击常联系人添加
        dblNameRow(row){
            //let data = this.dataCompany;
            //for(let com of data){
            //    if(!com.name){
            //        com.name = row.fullName;
            //        com.userID = row.userID;
            //    }
            // }
            // this.dataCompany = data;
            for(let com of this.dataCompany){
                if(!com.fullName){
                   com.fullName = row.fullName;
                   com.userId = row.userID;
                   return false;
                }
            }
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
            if(row.fullName && row.select) {
               row.fullName = '';
            }else if(!row.select){
                this['$message']({
                    message: '节点不能更改！',
                    type: 'warning'
                });
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
                if(com.select && com.fullName == ''){
                    com.fullName = data.fullName;
                    com.userId = data.userID;
                    return false;
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
                if(data.id===com.id && com.select){
                    com.fullName = '';
                }
            }
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

        // 全部抄送左转右
        chaoAllLeftToRight(){
            if(this.dataOa.length>0){
                for(let child of this.dataOa){
                    if(this.dataChao.length == 0){
                        this.dataChao.push(child)
                    }else{
                        let attr = [];
                        for(let child1 of this.dataChao){
                            attr.push(child1.userID);
                        }
                        let result = attr.indexOf(child.userID);
                        if(result < 0){
                            this.dataChao.push(child)
                        }
                    }
                }
            }
        }

        // 点击子节点
        handleNodeClick(data){
            this.oaPerson(data.orgID);
        };

        // 提交借阅人变更申请
        applySubmit():void{
            for(let child of this.dataCompany){
                if(!child.select && child.fullName == ''){
                    this.tishi = "所选档案的全宗还没有配置全宗角色所属人员，该流程无法发起。";
                    this.showTiShi = true;
                    this['$message']({
                        message: '所选档案的全宗还没有配置全宗角色所属人员，该流程无法发起。',
                        type: 'warning'
                    });
                    return;
                }
            }

            if(!this.detailData.title){
                this['$message']({
                    message: '请完善基本信息。',
                    type: 'warning'
                });
            }else if(!this.detailData.desc){
                this['$message']({
                    message: '请完善基本信息。',
                    type: 'warning'
                });
            }else if(!this.auditDisplay.auditIds){
                this['$message']({
                    message: '请选择审批人。',
                    type: 'warning'
                });
            }else if(!this.auditDisplay.signature){
                this['$message']({
                    message: '请填写签字意见。',
                    type: 'warning'
                });
            }else{

                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在提交中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );

                let utilizeLookup = {applicationNo:this.detailData.applicationNo}
                let title = this.detailData.title;
                let description = this.detailData.desc;
                let fonds = {id:this.detailData.fondsId};
                let updateBorrowInfoList = [];
                for(let child of this.data){
                    let obj = {libId:child.libId,objectId:child.id};
                    updateBorrowInfoList.push(obj);
                };
                let updateBorrowProcessList = [];
                for(let child of this.dataCompany){
                    let auditUser = {userId:child.userId};
                    let obj = {auditStep:child.step,taskNodeName:child.nodeName,auditUser:auditUser,forward:child.forward,additionalSignature:child.additionalSignature};
                    updateBorrowProcessList.push(obj);
                };
                let auditRemark = this.auditDisplay.signature;
                let parames = {
                                id:this.detailData.id,
                                utilizeLookup:utilizeLookup,
                                title:title,
                                description:description,
                                fonds:fonds,
                                updateBorrowInfoList:updateBorrowInfoList,
                                updateBorrowProcessList:updateBorrowProcessList,
                                ccUsers:this.auditDisplay.ccUsers,
                                auditRemark:auditRemark
                              };
                Service.saveOrUpdatePeople(parames).then((res) =>{

                    this.$nextTick(() => {
                        loadingInstance.close();
                    });

                    if(res.data.succeeded){
                        this['$message']({
                            message: '成功！',
                            type: 'success'
                        });
                        if(this.processId == 0){
                            this['$router'].push({
                                path:'/selfTip/examination',
                            });
                        }else{
                            window.opener = null;
                   　　　　 window.close();
                        }
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                    window.sessionStorage.setItem('examState', '3');
                });
            }
        };

        // 删除
        deleteAgine(row,index){
            this.data.splice(index,1);
        }

        //获取详情
        getInfo(){
            this.node =  window.sessionStorage.getItem('node');
            let id =  window.sessionStorage.getItem('myId');
            let routerT =  window.sessionStorage.getItem('routerT');
            let borrowToData = JSON.parse(window.sessionStorage.getItem('borrowToData'));
            let params;
            let isUtilize = false;
            if(this.processId != 0){
                params = this.a;
            }else{
                if(this.node === '1'){
                    params =  window.sessionStorage.getItem('processId');
                }else if(this.node === '2'){
                    params =  window.sessionStorage.getItem('processId');
                    this.shenpixinxi = false;
                    this.xianshi = false;
                }else if(this.node === '0'){
                    params = this.row.processId;
                }else if(this.node === '3'){
                    params = id;
                }else if(this.node === '4'){
                    params = borrowToData.updateId;
                    isUtilize = true;
                }
            }
            let flag = isNaN(params);
            if(!flag){
               params = parseInt(params);
            }
            let canshu = {};
            if(this.node === '4'){
                canshu = {borrowId:params,processId:null,isUtilize:isUtilize};
            }else{
                canshu = {borrowId:null,processId:params,isUtilize:isUtilize};
            }
            Service.getInfo(canshu).then((res) =>{
                this.detailData = res.data.data;
                this.recordData = this.detailData.approvalRecordList;
                this.stepMap = this.detailData.approvalFlowList;
                this.nameList();
                this.getHeader();
                this.borrowCheckTable();

                if(this.detailData.auditStatus != 3){
                    this.shenpixinxi = false;
                    this.xianshi = false;
                }

                if((this.detailData.type == 5 || this.detailData.type == 8) && this.detailData.isApprovalNode === true){
                    this.shenpiliucheng = false;
                    this.xianshi1 = true;
                }else{
                    if(this.node === '2' || window.sessionStorage.getItem('routerType') == "r1"){
                        this.xianshi1 = false;
                    }
                    this.shenpiliucheng = true;
                }
                //回显抄送人和签字
                let ids = [];
                let names = [];
                if(this.detailData.ccUserList.length != 0){
                    for(let child of this.detailData.ccUserList){
                        ids.push(child.userId);
                        names.push(child.fullName);
                    }
                    this.auditDisplay.ccUserId = names.join("，");
                    this.auditDisplay.ccUsers = ids.join(",");
                }
                if(this.detailData.auditRemark != null){
                    this.auditDisplay.signature = this.detailData.auditRemark;
                }
            });
        }

        //关闭弹框
        guanbi(){
            this.peopleVisible0 = true;
        }

        // 关闭
        guanbiSure(){
            let processId;
            if(this.processId == 0){
                processId = this.row.processId;
            }else{
                processId = this.a;
            }
            //this['$confirm']('确认关闭吗？', {
            //    type: 'warning'
            //}).then(() => {

                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在提交中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                let parame = {processId:processId,auditRemark:this.yijian};
                Service.closeProcess(parame).then((res) =>{

                    this.$nextTick(() => {
                        loadingInstance.close();
                    });

                    if(res.data.succeeded){
                        this['$message']({
                            message: '关闭成功！',
                            type: 'success'
                        });
                        if(this.processId == 0){
                            this['$router'].push({
                                path:'/selfTip/examination',
                            });
                        }else{
                            window.close();
                        }

                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            //});
        };

        findBorrowDetails(){
            window.sessionStorage.setItem('applicationNo',this.detailData.applicationNo);
            window.sessionStorage.setItem('rectState', 'right');
            window.sessionStorage.setItem('z_check', 2);
            this['$router'].push({
                path:'/selfTip/borrowDetails/borrowDetails',
                name:'实体借阅单详情',
            });
         };
        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
        electricBorrowDetail(row){
            if(this.detailData.auditStatus===1||this.detailData.auditStatus===4){
                Service.waterMarkTime({ appNo:this.detailData.applicationNo,borrowId:this.detailData.id}).then(res=>{
                    if(res.data.succeeded){
                        if(!res.data.data){
                            let obj = {appNo:this.detailData.applicationNo,archiveId:row.id,libId:row.libId,MJ:'1',borrowId:this.detailData.id}
                            window.sessionStorage.setItem('XiangDetail',JSON.stringify(obj));
                            this['$router'].push({
                                path:'/@/views/fileArrange/fileManagement/infile/XiangDetail',
                            })
                        }else{
                            let obj = {appNo:this.detailData.applicationNo,archiveId:row.id,libId:row.libId,MJ:row.MJ}
                            window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj));
                            this['$router'].push({
                                path:'/retrieve/searchDetail/searchDetail',
                            })
                        }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                let obj = {appNo:this.detailData.applicationNo,archiveId:row.id,libId:row.libId,MJ:row.MJ}
                window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj));
                this['$router'].push({
                    path:'/retrieve/searchDetail/searchDetail',
                })
            }
        }

        dayin(){
            let parames = {id:this.detailData.id,type:3};
            Service.printProcess(parames).then((res) =>{
                if (res) {
                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        let csvData = new Blob([res],{type: 'application/pdf'});
                        window.navigator.msSaveOrOpenBlob(csvData,'document.pdf');
                    }else{
                        let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
                        window.open(url);
                    }
                }else{
                    this['$message']({
                        message: '打印失败！',
                        type: 'error'
                    });
                }
            });
    }

        handleClose1(){
            this.peopleVisible  =false;
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

        handleClose2(){
            this.writorVisible = false;
            this.node1.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

        // 续借
        toAgine(){
            if(this.list.length===0){
                this.list = this.data
            }
            let arr = [];
            for(let li of this.list){
                if(!li.isAgained&&!li.isUpdate){
                    arr.push(li)
                }
            };
            if(arr.length===this.list.length){
                window.sessionStorage.setItem('borrowAgineTable', JSON.stringify(this.list));
                this['$router'].push({
                    path:'/selfTip/borrowAgine/borrowAgine',
                });
            }else{
                this['$message']({
                    message: '该申请内所有档案已被变更或续借，无法进行续借操作。',
                    type: 'warning'
                });
            }
        }

        // 变更借阅人
        changePeople(){
            if(this.list.length===0){
                this.list = this.dataDetail
            }
            let arr = [];
            for(let li of this.list){
                if(!li.isAgained&&!li.isUpdate){
                    arr.push(li)
                }
            };
            if(arr.length===this.list.length){
                window.sessionStorage.setItem('borrowPeopleData', JSON.stringify(this.row));
                if(this.list.length == 0){
                    this.list = this.dataDetail;
                }
                window.sessionStorage.setItem('list', JSON.stringify(this.list));
                this['$router'].push({
                    path:'/selfTip/borrowAgine/changeBorrowPeople',
                });
            }else{
                this['$message']({
                    message: '该申请内所有档案已被变更或续借，无法进行变更借阅人操作。',
                    type: 'warning'
                });
            }
        }

        // 选择数目
        selsChange(list:any = {}){
            this.list = list;
        };

        created(){
            this.row =  JSON.parse(window.sessionStorage.getItem('examCheckData'));
            this.applicationNo =  window.sessionStorage.getItem('applicationNo');
            this.rect = window.sessionStorage.getItem('rectState');
            if(window.sessionStorage.getItem('routerT') == "r1"){
                this.guanBiButton = true;
            }else{
                this.guanBiButton = false;
            }

            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("nodeId") > 0){
                this.processId = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2]);
                    let pb = bb.substr(bb.indexOf("=")+1);
                    let b = base['base64'].decode(
                        JSON.stringify(pb)
                    );
                    this.a = parseInt(b);
                }
                this.marginSize = -50;
            }else{
                this.processId = 0;
                this.fanhui = true;
            }
        };

        mounted(){
            this.type = window.sessionStorage.getItem('_type');
            this.getInfo();
            //续借和变更借阅人按钮的显示和隐藏
            if(this.row.auditStatus===1&&this.rect==='left'){
                this.allShow = true;
            }else{
                this.allShow = false;
            }
            Service.isCC({}).then((res) =>{
                this.cc = res.data.data.cc;
            });
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/transferDetail';
</style>