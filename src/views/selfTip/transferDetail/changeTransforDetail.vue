<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            档案移交申请
            <el-button v-show="fanhui" class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号：{{AllData.transferLookup.applicationNo}}
                    <span style="color:red">  审批到线下移交归档节点时，需将实体档案进行线下移交</span>
                    <div class="titleSect"></div>
                </div>
                <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm validForm" label-width="120px" :rules="basicFormRules" ref="basicForm">
                    <div class="formItem topTitle">
                        <el-form-item label="标题：" ref="title" prop="title">
                            <el-input class="checkName percentName" v-model.trim="basicForm.title"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="申请人：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName" readonly v-model="basicForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company">
                            <el-input class="checkName percentName" readonly v-model="basicForm.company"></el-input>
                        </el-form-item>
                        <el-form-item label="申请时间：" ref="date" class="lt basicItem" prop="date">
                            <el-input class="checkName percentName" readonly v-model="basicForm.date"></el-input>
                        </el-form-item>
                    </div>
                     <div class="formItem topTitle" v-show="false">
                        <el-form-item label="移交数量：" ref="moveCount" prop="moveCount">
                            <el-input class="checkName percentName" v-model="basicForm.moveCount"></el-input>
                        </el-form-item>
                    </div>
                    <div class="evenTitle">
                        <el-form-item class="things" label="移交说明：" ref="things"  prop="things">
                            <el-input type="textarea" class="checkName percentName" v-model.trim="basicForm.things"></el-input>
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
                        <el-button class="checkWay" @click="addFile">添加档案</el-button>
                        <el-button class="checkWay" @click="removeFile">移出档案</el-button>
                    </div>
                </div>
                <!--列表-->
                <div class="borderTable">
                    <el-table border tooltip-effect="dark" stripe max-height="300" :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" class="indexTable containTable expandTable">
                         <el-table-column type="selection" width="55" label="#"></el-table-column>
                         <el-table-column  :prop="item.fieldName" :label="item.caption" :key="item.fieldName" v-for='item in tableList'>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                         <template slot-scope="scope">
                                <span class="addBtn" @click="electricBorrowDetail(scope.row)">详情</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">审批信息
                    <div class="titleSect"></div>
                </div>
                <el-form :model="auditDisplay" class="basicForm topParamsForm fileApplyForm" label-width="120px" ref="auditDisplay" :rules="auditDisplayRule">
                    <div class="formItem topTitle">
                        <el-form-item class="checkThings" label="选择审批人：" ref="auditIds" prop="auditIds">
                            <el-input readonly class="checkName percentName" v-model="auditDisplay.auditIds"></el-input>
                            <el-button class="checkWay choosePerson" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="formItem evenTitle whiteTitle">
                        <el-form-item class="checkThings" label="选择抄送人：">
                            <el-input readonly class="checkName percentName" v-model="auditDisplay.ccUserId" readOnly></el-input>
                            <el-button class="checkWay choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                        <el-form-item class="checkThings" label="签字：" prop="Signature">
                            <el-input type="textarea" maxlength="1000" placeholder="最多填写1000个字" class="checkName percentName" v-model.trim="auditDisplay.Signature" ></el-input>
                        </el-form-item>
                        <!-- <el-form-item class="checkThings" label="签字：">
                            <el-input class="checkName percentName" v-model="Signature"></el-input>
                        </el-form-item> -->
                    </div>
                </el-form>
            </div>
                        <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                       <div class="borderTable waitTable">
                    <!-- <el-table tooltip-effect="dark" style="width: 100%" stripe :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                        <el-table-column width="55" fixed>
                        </el-table-column>
                        <el-table-column  :label="item.title" :prop="item.prop" v-for='item in listData'>
                        </el-table-column>
                    </el-table> -->
                     <el-table border tooltip-effect="dark" style="width: 100%" stripe max-height="300" :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                             <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{dataDetail.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="stepName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="ApprovalContext" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="createPersion" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate"  label="审批时间" width="200">
                            </el-table-column>
                            <el-table-column prop="auditResult" label="操作" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.auditResult === 0">审批通过</span>
                                    <span v-if="scope.row.auditResult === 1">驳回</span>
                                    <span v-if="scope.row.auditResult === 2">转发</span>
                                    <span v-if="scope.row.auditResult === 3">加签</span>
                                    <span v-if="scope.row.auditResult === 4">抄送</span>
                                    <span v-if="scope.row.auditResult === 5">发起</span>
                                    <span v-if="scope.row.auditResult === 6">批注</span>
                                    <span v-if="scope.row.auditResult === 7">关闭</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepUserName" label="接收人" width="120">
                            </el-table-column> -->
                             <el-table-column prop="stepName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="ApprovalContext" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="stepUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate"  label="审批时间" :formatter="dateFormat" width="200" >
                            </el-table-column>
                            <el-table-column prop="auditOperate" label="操作" width="120">
                            </el-table-column>
                            <el-table-column prop="nextAduitPerson" label="接收人" width="120">
                            </el-table-column>
                        </el-table>
                </div>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit('basicForm','auditDisplay')">重新提交</el-button>
                <el-button class="checkWay" @click="closeBtns('basicForm')">关闭流程</el-button>
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
                                <el-table border @row-dblclick="dblNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table border tooltip-effect="dark" @row-dblclick="dblNameRow" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa"  v-loading="comLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="2" style="height:48%;margin-top:9%;">
                        <div>
                            <el-button @click="rightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="leftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                            <!-- <el-button @click="allRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>
                            <el-button @click="allLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button> -->
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
                <el-button class="checkDefault" @click="peopleVisible = false;loadNode(node1,resolve1);node1.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
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
                                <el-table  border @row-dblclick="dbChaolNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                        <div>
                            <el-button @click="chaoRightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                            <el-button @click="chaoLeftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                            <el-button @click="chaoAllRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>
                            <el-button @click="chaoAllLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button>
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
                <el-button class="checkDefault" @click="writorVisible = false;loadNode(node1,resolve1);node1.childNodes = [];dataOa = [];checkNameForm.checkName = ''">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="checkModal fileTransferApplyAdd" title="选择需要移交的档案" :show-close="true" :visible.sync="tableVisible">
            <div class="addTablesearch">
                <div class="addTablesearchForm">
                    <el-form :model="searchForm" class='el-form'>
                        <!-- <template v-for="item in searchConfig">
                            <el-form-item v-if="item.controlType==3" :label="item.caption+' :'">
                                <el-select v-model="searchForm['value'+item.id]" >
                                    <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="item.controlType==9"  :label="item.caption+' :'">
                                <el-input v-model.trim="searchForm['value'+item.id]"></el-input>
                            </el-form-item>
                        </template>
                        <el-form-item class="buttonItem">
                            <el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="beginSearch">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>
                        </el-form-item> -->

                        <el-form-item>
                            <el-input  class = "checkName2" :title='searchkeyOne.key' v-model="searchkeyOne.key" @keyup.enter.native="beginSearch" style="width:25%;float:left;margin-right:20px"></el-input>
                            <div style="float:left;margin-right:20px">
                                <el-button  class="indexWay" @click="beginSearch">检索</el-button>
                                <el-button class="indexWay" @click="clearSearch">清空</el-button>
                            </div>
                           <el-button class="indexWay" @click="confirmAdd" style="float:right;margin-top:36px">确定添加</el-button>
                        </el-form-item>
                    </el-form>
            </div>
                <!-- <el-button class="checkWay" @click="confirmAdd">确定添加</el-button> -->
            </div>
            <div class="tableContainer" style="top:70px">
                <el-table border tooltip-effect="dark" stripe :height="bodyHeight+25" :data="searchData" highlight-current-row ref="searchTable" class="indexTable containTable expandTable" @selection-change="selectionChange2" :row-class-name="getRowClass1">
                    <el-table-column type="selection" width="30" label="#">
                    </el-table-column>
                    <template v-for="item in tableArr">
                        <el-table-column :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :label="item.caption" :width="item.width" v-if="!item.hidden">
                        </el-table-column>
                        <!-- <el-table-column v-if="item.fieldName=='ARCHIVE_STATUS'"  :width="item.width">
                            <template slot-scope="scope">
                                <span v-if="scope.row.ARCHIVE_STATUS===0"></span>
                                <span v-if="scope.row.ARCHIVE_STATUS===1"><i class="fa fa-file-archive-o" title="文件移交中"></i></span>
                                <span v-if="scope.row.ARCHIVE_STATUS===2"><i class="fa fa-file-pdf-o" title="跨全宗移交中"></i></span>
                            </template>
                        </el-table-column> -->
                    </template>
                </el-table>
            </div>
            <div class="pager">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100,200,500]" :page-size="limit" :total="total" pager-count="5" :current-page="page"></el-pagination>
            </div>
        </el-dialog>

         <!-- <el-dialog
            title="关闭流程"
            :visible.sync="centerDialogVisibejob"
            width="40%"
            center>
            <el-form class="basicForm topParamsForm fileApplyForm validForm">
                <el-form-item class="things" label="说明：" ref="things">
                            <el-input type="textarea" class="checkName percentName" v-model="titleNode" placeholder="最多填写1000个字" maxlength="1000"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibejob = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibejobEvent()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog> -->
        <el-dialog class="fileModal closeModal" title="关闭流程" :visible.sync="centerDialogVisibejob" :close-on-click-modal="true">
            <el-form :model="mitForm" label-width="55px" ref="fileForm">
                <el-form-item class="things" label="说明：" ref="date">
                    <el-input :rows="5" placeholder="最多输入1000字" type="textarea" maxlength="1000" class="checkName percentName" v-model="titleNode"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="centerDialogVisibejobEvent">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './changeTransforDetail.server';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    import base from '@/scrollLoad';
    import { Loading } from 'element-ui';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        listLoading: boolean;
        peopleVisible: boolean;
        writorVisible: boolean;
        transferType : number;
        transferId:number;
        parameOne:number;
        parameTow:number;
        listData :  any = [];
        tableVisible:boolean;
        dataDetail: any = [];
        start:number;
        total:number;
        rank:number;
        page:number;
        limit:number;
        dataCompany: any = [];
        checkNameForm: any = {};
        filters: any = {};
        basicForm: any = {};
        list: any = [];
        list1: any = [];
        data: any = [];
        AllData : any = [];
        dataName: any = [];
        tree: any = [];
        loadingInstance:any={};
        defaultProps: any = {};
        basicFormRules: any = {};
        searchData: any = [];//添加数据的表格数据
        searchForm: any = {};//搜索
        kindId:number;//档案分类ID
        libId:number;//档案库分类ID
        fondId:number;//申请人ID
        acceptFondId:number;//接收人ID
        tableArr:any = [];//表格的配置数组
        IdArr: any = [];//返回的ID数组
        searchConfig: any = [];//搜索框的配置
        clickOne:boolean;//第一次点击
        selection: any = [];//选中项
        searchArr: any = [];//搜索的内容
        treeLoading:boolean;//树的加载
        treeParamsId: number;
        processId:number;
        marginSize:number;
        fanhui:boolean;
        oaHeight:number;
        dataOa:any = [];
        comLoading:boolean;
        defaultTrees:any = {};
        auditDisplay:any ={};
        leafName:any = [];
        oaClickRowName:any = {};
        oaClickRowName1:any ={};
        dataChao:any = [];
        tableList : any = [];
        UserId:number;
        Signature:string;
        usersId : number;
        transferTypeid : number;
        auditDisplayRule:any = {};
        node1:any = {};
        resolve1:any = {};
        centerDialogVisibejob:boolean;
        titleNode:string;
        initdataChao:any = [];
        searchkeyOne:any={};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280 ;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.peopleVisible = false;
            this.writorVisible = false;
            this.transferType = 0;
            this.tableVisible = false;
            this.loadingInstance = null;
            this.usersId = -1;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 100;
            this.processId = 0;
            this.parameOne = 0;
            this.parameTow = 0;
            this.marginSize = 0;
            this.fanhui = false;
            this.listLoading = false;
            this.list = [];
            this.list1 = [];
            this.treeLoading = false;
            this.transferTypeid = -1;
            this.dataOa = [];
            this.AllData = [];
            this.dataDetail = []
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
                date:''
            };
            this.basicFormRules = {
                title: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                moveCount: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                createDateStart: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                createDateEnd: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                day: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                things: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                date:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                company:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                name:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ]
            };
            this.data =  [];
            this.dataName = [];
            this.searchForm = {};
            this.tableArr= [];
            this.IdArr = [];
            this.tableList = [];
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
                name:'',
                Signature:''
            };
            this.auditDisplayRule = {
                 auditIds: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                Signature:[
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
            this.leafName = [];//节点姓名
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.dataChao = [];
            this.auditDisplay.Signature="";

            this.node1 = {};
            this.resolve1 = {};
            this.centerDialogVisibejob = false;
            this.titleNode = '';
            this.initdataChao = [];
            this.searchkeyOne = {
                key:null
            };
        };
        getRowClass1(row: any = {}) {
            if (row.row.ARCHIVE_STATUS == 1) {
                return 'row-yijiao';
            }
        }
        back():void{
            // this['$router'].go(-1);
            if(this['$route'].params.routerType == "r1"){
                this['$router'].push({
                        path:'/selfTip/examination',
                })
            }else{
                this['$router'].push({
                        path:'/selfTip/transfer',
                })
            }

        };
        selsChange(list:any = {}){
            this.list = list;
        };
        selsChange1(list:any = {}){
            this.list1 = list;
        };
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
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
            return 'row-expand-cell';
        };
        // // 展开次级列表
        // // getChildrenData(row){
        // //     if(!row.children){
        // //         for(let data of this.data){
        // //             if(row.id === data.id){
        // //                 data.children = [];
        // //                 data.children.push(
        // //                     {
        // //                         year: '2016-05-02',
        // //                         planName: '1234567',
        // //                         displayName: '项目立项批文',
        // //                         fondsCode: '京通国用[2013]第425号',
        // //                         auther: '北京万方置业有限公司',
        // //                         otherAuther: '通州区人民政府，北京市国土资源局',
        // //                         attachment: '北京市住房和城乡',
        // //                         projectName: '北京通州万达广场',
        // //                         archiveCount: 'BJ4',
        // //                         department: '行政部',
        // //                     }
        // //                 )
        // //             }
        // //         }
        // //     }
        // // };
        // // 删除
        // deleteFile(row: any = {}){
        //     let params = { id : row.id.toString() };
        //     this['$confirm']('确认删除选中文件吗？', {
        //         type: 'warning'
        //     }).then(() => {
        //         // Service.getCarData(params).then((res) =>{
        //         //     if(res['result']){
        //         //         this['$message']({
        //         //             message: '删除成功',
        //         //             type: 'success'
        //         //         });
        //         //     }else{
        //         //         this['$message']({
        //         //             message: '删除失败',
        //         //             type: 'error'
        //         //         });
        //         //     }
        //         // })
        //     });
        // }
        closeBtns(){//确认关闭
            let transferId;
            if(this.processId == 0){
                transferId = this['$route'].params.id;
            }else{
                transferId = this.parameOne;
            }
            this.centerDialogVisibejob = true;
            this.titleNode = '';
            // this['$confirm']('您确定要关闭此流程?', '提示', {
            //       confirmButtonText: '确定',
            //       cancelButtonText: '取消',
            //       type: 'warning'
            //   }).then(() => {
            //       Service.closeFileTransfer({"transferId":this.transferId}).then(res=>{
            //           if(res.data.succeeded == true){
            //             this['$router'].go(-1);
            //           }
            //         })

            //   }).catch(() => {
            //       this['$message']({
            //           type: 'info',
            //           message: '已取消关闭。'
            //       });
            //   })

        }
        centerDialogVisibejobEvent(){
             let transferId;
            if(this.processId == 0){
                transferId = this['$route'].params.id;
            }else{
                transferId = this.parameOne;
            }
            Service.closeFileTransfer({"transferId":this.transferId,closeSign:this.titleNode}).then(res=>{
                      if(res.data.succeeded == true){
                          this.centerDialogVisibejob = false;
                        //this['$router'].push({
                        //    path:'/selfTip/transfer'
                        //})
                        if(this.processId == 0){
                            this['$router'].go(-1);
                        }else{
                            window.close();
                        }
                      }
                })
        }
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
                        message: '组织架构列表加载失败。',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };
        // 点击选择审批人
        choosePerson():void{
            this.peopleVisible = true;
            this.userPeople();
            if(!this.auditDisplay.auditIds){
                this.nameList();
                this.node1.childNodes = [];
                this.loadNode(this.node1,this.resolve1)
            }
        };

        // 懒加载树
        loadNode(node,resolve) {
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
                            message: '树节点数据错误。',
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
                            message: '树节点数据错误。',
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
                        message: '常用联系人加载失败。',
                        type: 'error'
                    });
                }
            });
        }

        // 审批人角色
        nameList(){
            this.dataCompany = [];
            Service.GetSelectRole({
                fondId:this.acceptFondId,
                transferType:this.transferType
            }).then(res=>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    for(var ind of data){
                        if(ind.userName){
                            this.dataCompany.push({ leafName:ind.name,name:ind.userName,select:ind.select })
                        }else{
                            this.dataCompany.push({ leafName:ind.name,name:'',select:ind.select})
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
            this.userPeople();
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
        };

        // 点击节点名称列表
        leafClickRow(row){
            this.oaClickRowName1 = row;
        };

        // 全部左转右
        allLeftToRight(){
            let arr = this.dataOa;
            for(let i=0;i<this.dataCompany.length;i++){
                if(!this.dataCompany[i].name && this.dataCompany[i].select){
                    this.dataCompany[i].name = arr[i].fullName;
                    this.dataCompany[i].userID = arr[i].userID;
                };
            };
        };

        // 全部右转左
        allRightToLeft(){
            for(let com of this.dataCompany){
                if(com.name && com.select ){
                    com.name = '';
                    delete com.userID
                }
            }
        };

        // 右转左
        rightToLeft(){
            let data = this.oaClickRowName1;
            for(let com of this.dataCompany){
                if(data.userID===com.userID && com.select ){
                    com.name = '';
                    delete data.userID;
                }
            }
        };

        // 左转右
        leftToRight(){
            let data = this.oaClickRowName;
            console.log( this.oaClickRowName.userID)
            console.log(this.dataCompany)
            var i = 0;
            // for(let item of this.dataCompany){
            //     if(item.userID==data.userID){
            //         i = 1;
            //     };
            // };
            if(i==0){
                for(let com of this.dataCompany){
                    if(!com.name && com.select ){
                        com.name = data.fullName;
                        com.userID = data.userID;
                        break;
                    };
                };
            };
            console.log(this.dataCompany)
        };

        // 清除常用联系人
        clearPeople(){
            this['$confirm']('确认全部清除吗？', {
                type: 'warning'
            }).then(() => {
                Service.clearOaPerson({}).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '删除成功。',
                            type: 'success'
                        });
                        this.userPeople();
                    }else{
                        this['$message']({
                            message: '删除失败。',
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
            console.log(row);
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
        electricBorrowDetail(row){
            console.log(row)
            if(this.rank == 4){// 文件级详情
            var obj = {
                Srclib:this.libId;
                SrcId:row.id,
                type:1 // 移交详情 type: 2//跨全宗详情
            }
            window.sessionStorage.setItem('ToWjDetail',JSON.stringify(obj));
            this['$router'].push({
                        path:'/selfTip/WjDetail',
                        })
            }else if(this.rank == 3){//案卷级详情
             var obj = {
                libId:this.libId,
                fondId:this.fondId,
                kindId:this.kindId,
                SrcId:row.id,
                type:1 // 移交详情 type: 2//跨全宗详情
            }
            window.sessionStorage.setItem('Tofiledetail',JSON.stringify(obj));
                 this['$router'].push({
                        path:'/selfTip/fileDetail',
                        })
            }


        }

        // 提交借阅申请
        applySubmit(form,form1){
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '文件正在提交，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                        let transferId;
                        if(this.processId == 0){
                            transferId = this['$route'].params.id;
                        }else{
                            transferId = this.parameOne;
                        }
                        var CCarr = [];
                        for(var item of this.dataChao){
                            console.log(item)
                            CCarr.push(item.userID)
                        };
                           var CCstr;
                        if(CCarr.length!=0){
                            CCstr = CCarr.join(',')
                                    
                        }else{
                            CCstr =this.initdataChao.join(',');
                        }
                        console.log(CCarr)
                        console.log(CCstr)
                        // var CCstr = CCarr.join(',') 
                        var Auditarr = [];
                        for(var item of this.dataCompany){
                            Auditarr.push(item.userID)
                                if(item.select){
                                Auditarr.push(item.userID)
                            }
                        };
                        var auditStr = Auditarr.join(',')
                        var NumArr = [];
                        for(var ind of this.data){
                            NumArr.push(ind.id)
                        }
                        var idsArr = []
                        for(var ind of this.AllData.archives){
                            idsArr.push(ind.id)
                        }
                        console.log(this.AllData)

                        var auditStr = Auditarr.join(',')
                        this['$refs'][form1]['validate']((valid)=>{})
                    if(this.auditDisplay.auditIds == ''){
                         this.Warn("请选择审批人。")
                        this.$nextTick(() => { this.loadingInstance.close();});
                    }else if(this.auditDisplay.Signature == ''){
                        this.Warn("请填写签字意见。")
                        this.$nextTick(() => { this.loadingInstance.close();});
                    }else{
                        if(idsArr.length == 0){
                            this.Warn("要移交的目录不能为空。")
                            this.$nextTick(() => { this.loadingInstance.close();});
                            }else{
                            Service.reissueFileTransfer({
                                transferType:this.transferType,
                                title:this.basicForm.title,
                                userId:this.usersId,
                                userDept:this.basicForm.company,
                                transferApplyDate:this.basicForm.date,
                                ccUserIds:CCstr,
                                auditUserId:auditStr,
                                transferMemo:this.basicForm.things,
                                libId:this.libId,
                                ids:idsArr,
                                signature:this.auditDisplay.Signature,
                                transferId:this.transferId
                            }).then(res=>{
                                if(res.data.succeeded){
                                    this['$confirm']('文件移交申请发起成功。', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        showCancelButton:false,
                                        type: 'info'
                                    }).then(()=>{
                                        if(this.processId == 0){
                                            this['$router'].go(-1);
                                        }else{
                                            window.close();
                                        }
                                    })
                                }else{
                                    this.getError(res.data.errorMessage);
                                }
                                this.$nextTick(() => { this.loadingInstance.close();});
                                    });
                            }
                                }
                }else{
                    this.Warn("请完善基本信息。")
                    this.$nextTick(() => { this.loadingInstance.close();});
                };
            });
        };

        // 审批人确定
        chooseDone(){
            //this.writorVisible = false;
            let arr = this.dataCompany;
            //判断是否选择审批人
            let num = 0;
            for(let items of this.dataCompany){
                if(items.name == ''){
                  num ++;
                }
                if(num>0){
                    this['$message']({
                        message: '请选择审批人。',
                        type: 'warning'
                    });
                }else{
                    this.peopleVisible = false;
                    let arrs = [];
                    let nameArr = [];
                    for(let item of arr){
                        // if(item.userID && item.select){
                            arrs.push(item.userID);
                            nameArr.push(item.name);
                        // };
                    };
                    if(arrs.length>0){
                        this.auditDisplay.auditIds = nameArr.join("->");
                        var str = arrs.join(",");
                        this.addLinkMan(str);
                        this.node1.childNodes = [];
                        this.loadNode(this.node1,this.resolve1)
                        this.dataOa = [];
                        this.checkNameForm.checkName = '';
                    }else{
                        this['$message']({
                            message: '请选择审批人。',
                            type: 'warning'
                        });
                    }
                }
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
                        message: '检索失败。',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };

        // 双击常联系人添加
        dblNameRow(row){
            let data = this.dataCompany;
            console.log(row)
            console.log(data)
            var i = 0;
            // for(let ind of data){
            //     if(ind.userID==row.userID){
            //         i = 1;
            //     };
            // };
            if(i==0){
                for(let com of data){
                    if(!com.name && com.select ){
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
            // if(this.dataChao.length>0){
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
                this.auditDisplay.ccUserId  = arr.join('，');
                this.writorVisible = false;
            // }else{
            //     this['$message']({
            //         message: '请选择抄送人。',
            //         type: 'warning'
            //     });
            // }
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
            console.log(this.selection)
        }

        //获取用户信息
        getUserInfo(params){
            Service.getUserInfo(params).then(res=>{
                if(res.data.succeeded){
                    this.basicForm.name = res.data.data.LogonUserFullName;
                    this.basicForm.company = res.data.data.LogonOrgName;
                    this.UserId =  res.data.data.LogonUserId
                    var myDate = new Date();
                    // this.basicForm.date = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()
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

            //数据表头信息
            Service.getListConfig(this.libId).then(res=>{
                if(res.data.succeeded){
                    this.tableArr=res.data.data;
                    this.QueryFileTransferApply({libId:this.libId,ids:this.IdArr})
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
            this.searchkeyOne.key = '';
        };

        //添加数据时获取数据列表
        FileSearch(params:any){
            if(this.rank == 3){//档案
                Service.FileSearch(params).then(res=>{
                if(res.data.succeeded){
                    this.searchData=res.data.data;
                    this.page = res.data.page;
                    this.total = res.data.totalRecords;
                    console.log(this.searchData)
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
          }else if(this.rank == 4){//文件
            Service.WenjianSearch(params).then(res=>{
                if(res.data.succeeded){
                    this.searchData=res.data.data;
                    this.page = res.data.page;
                    this.total = res.data.totalRecords;
                    console.log(this.searchData)
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
          }

        };
        //获取搜索框配置
        Getquerycondition(params){
            Service.Getquerycondition(params).then(res=>{
                if(res.data.data.length>4){
                    document.getElementsByClassName('tableContainer')[0]['style'].top='70px';
                }
                this.searchConfig = res.data.data;
                for(var item of res.data.data){
                    this['$set'](this.searchForm,'value'+item.id,null)
                }
            })
        }

        //搜索按钮
        beginSearch(){
        //   var arr = [];
        //   for(var key in this.searchForm){
        //       if(this.searchForm[key]!=null&&this.searchForm[key]!=''){
        //           var str = key.slice(5,key.length);
        //           var name = parseInt(str)
        //           var obj = {
        //               id:name,
        //               value:this.searchForm[key]
        //           };
        //           arr.push(obj);
        //       };
        //   };

            //   this.searchArr = arr;
              this.FileSearch({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchkeyOne.key,pageCondition:{page:1, pageSize:this.limit,sort:""}});
        };

        //清空按钮
        clearSearch(){
            // for(var key in this.searchForm){
            //     this.searchForm[key] = null;
            // };
            this.searchkeyOne.key = '';
        };
        //确定添加按钮
        confirmAdd(){
            if(this.selection.length>=1){
                this.tableVisible=false;
                this.searchArr = [];
                for(var ind of this.selection){
                    if(ind.ARCHIVE_STATUS==1){
                        this.Warn("所选数据中部分数据正在文件移交审批中，请重新选择。")
                    }else if(ind.ARCHIVE_STATUS==2){
                        this.Warn("所选数据中部分数据正在跨全宗移交审批中，请重新选择。")
                    }else{
                         var i = 0;
                        for(var item of this.AllData.archives){
                            if(item.id==ind.id){
                                i = 1;
                            };
                        };
                        if(i==0){
                            if(ind.ARCHIVE_STATUS != 1){
                                this.AllData.archives.push(ind);
                            }

                            this.listData = this.AllData.archives;
                            var obj={
                                list:this.listData,
                                libId:this.libId
                            }
                            console.log(this.listData)
                            window.sessionStorage.setItem('getAddFileList',JSON.stringify(obj));
                            this.basicForm.moveCount = this.AllData.archives.length

                        };
                    }
                   
                }
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
                  for(var item of this.AllData.archives){
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
                  this.AllData.archives = arr;
                  this.listData = this.AllData.archives;
                      var obj={
                            list:this.listData,
                            libId:this.libId
                        }
                  window.sessionStorage.setItem('getAddFileList',JSON.stringify(obj));
                  this.basicForm.moveCount = this.AllData.archives.length

              }).catch(() => {
                  this['$message']({
                      type: 'info',
                      message: '已取消移出。'
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
        handleClose1(){
            this.peopleVisible = false;
            this.node1.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }
        handleClose2(){
            this.writorVisible = false;
            this.node1.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }
        created(){
            treeChange(this.tree);
            // this.kindId = this['$route'].query.kind/1;
            // this.libId = this['$route'].query.lib/1;
            // this.fondId = this['$route'].query.fond/1;
            // console.log(this['$route'].query.ids,3333333)
            this.getUserInfo({})
            // Service.getListConfig(this.libId).then(res=>{
            //     if(res.data.succeeded){
            //         this.tableArr=res.data.data;
            //         this.QueryFileTransferApply({libId:this.libId,ids:this.IdArr})
            //     }else{
            //         this.getError(res.data.errorMessage)
            //     }
            // })

            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("transferId") > 0){
                this.processId = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2]).split("&")[0];
                    let pb = bb.substr(bb.indexOf("=")+1);
                    let b = base['base64'].decode(
                        JSON.stringify(pb)
                    );
                    let cc = (url.split('?')[2]).split("&")[1];
                    let pc = cc.substr(cc.indexOf("=")+1);
                    let c = base['base64'].decode(
                        JSON.stringify(pc)
                    );
                    this.parameOne = parseInt(b);//参数1
                    this.parameTow = parseInt(c);//参数2
                }
                this.marginSize = -50;
            }else{
                this.processId = 0;
                this.fanhui = true;
            }

        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };
            var typs = JSON.parse(window.sessionStorage.getItem('YchangeTransforDetail'))


            let transferId;
            if(this.processId == 0){
                this.transferType = typs.transferType;
                this.transferId = typs.id;
            }else{
                this.transferType = this.parameTow;
                this.transferId = this.parameOne;
            }

            Service.fileTransfer({
                "transferId":this.transferId,
                "transferStatus":1
            }).then(res=>{
                console.log(res.data)
                this.AllData = res.data.data;
                this.basicForm.title = res.data.data.transferLookup.title;
                this.basicForm.name = res.data.data.transferLookup.applyPerson;
                this.basicForm.company = res.data.data.transferLookup.applyDept;
                this.basicForm.date = res.data.data.transferLookup.applyDate;
                this.basicForm.moveCount = res.data.data.transferLookup.transferCount;
                this.basicForm.things = res.data.data.transferLookup.transferMemo;
                this.tableList = res.data.data.listColumns;
                this.auditDisplay.Signature = res.data.data.transferLookup.signature;
                // 选择抄送人初始值
                let brr = [];
                for(let item in res.data.data.ccUsers){
                    this.initdataChao.push(res.data.data.ccUsers[item].userId)
                    brr.push(res.data.data.ccUsers[item].userName)
                }
                this.auditDisplay.ccUserId = brr.join("，")
                // alert(this.auditDisplay.Signature)
                // this.listData = res.data.data.archives;
                this.dataDetail = res.data.data.Approval;
                this.usersId = res.data.data.transferLookup.applyUserId;
                this.fondId = res.data.data.fondId;
                this.kindId = res.data.data.kindId;
                this.libId = res.data.data.libId;
                this.rank = res.data.data.rank;
                this.acceptFondId = res.data.data.acceptFondId;
                console.log(this.listData)
                if(this.processId == 1){
                    this.listData = res.data.data.archives;
                    if(window.sessionStorage.getItem('getAddFileList')!='{}'){
                            this.listData = JSON.parse(window.sessionStorage.getItem('getAddFileList')).list
                    }else{
                        this.listData = res.data.data.archives;
                    }
                }else if(this.processId == 0){
                    if(window.sessionStorage.getItem('getAddFileList')!='{}'){
                    console.log('有志')
                        this.listData = JSON.parse(window.sessionStorage.getItem('getAddFileList')).list
                        console.log(this.listData)
                    }else{
                        console.log('fouze')
                        this.listData = res.data.data.archives;
                    }
                }
                
                
            })

            //this.getFiles();

        };
           //路由的拦截
        beforeRouteEnter(to,from,next){
            next(vm=>{
               if(from.name=='移交详情'||from.name == null){
                   console.log(window.sessionStorage.getItem('getAddFileList'))
                   var listData = window.sessionStorage.getItem('getAddFileList');
                   var aaa = JSON.parse(listData)
                   vm.listData = aaa.list;
                   console.log(aaa);

               }else{
                   var transferId = JSON.parse(window.sessionStorage.getItem('YchangeTransforDetail')).id
                        Service.fileTransfer({
                        "transferId":transferId,
                        "transferStatus":1
                        }).then(res=>{
                            vm.listData = res.data.data.archives;
                            window.sessionStorage.setItem('getAddFileList',JSON.stringify({}));


                        })
               }
            })
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
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/retrieve/loanSlip';
</style>