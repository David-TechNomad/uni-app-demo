<template>
    <section>
        <div class="mainTitle">
            创建全宗申请
            <el-button class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">基本信息</div>
                <el-form :model="basicForm0" class="basicForm topParamsForm fileApplyForm" label-width="120px" :rules="basicFormRules0" ref="basicForm0">
                    <div class="formItem topTitle">
                        <el-form-item label="标题：" ref="title" prop="title">
                            <el-input class="checkName percentName" placeholder="最多输入50字" maxlength="50" v-model.trim="basicForm0.title"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="申请人：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName" readonly v-model="basicForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company">
                            <el-input class="checkName percentName" readonly v-model="basicForm.company"></el-input>
                        </el-form-item>
                    </div>
                    <div class="evenTitle">
                        <el-form-item class="things" label="创建事由：" ref="cause"  prop="cause">
                            <el-input type="textarea" class="checkName percentName" placeholder="最多输入1000字" maxlength="1000" v-model.trim="basicForm0.cause"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">全宗信息</div>
                <el-form :model="basicForm1" class="basicForm topParamsForm fileApplyForm" label-width="150px" :rules="basicFormRules1" ref="basicForm1">
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="全宗号：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName" readonly="readonly" v-model="basicForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="全宗名：" ref="fondName" class="lt basicItem" prop="fondName">
                            <el-input class="checkName percentName" v-model.trim="basicForm1.fondName"></el-input>
                        </el-form-item>
                        <el-form-item label="上级公司：" ref="higherFondName" class="lt basicItem" prop="higherFondName">
                            <el-input class="checkName percentName" readonly v-model="basicForm1.higherFondName"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="higherFond"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>

                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item class="lt" label="万信对应公司：" ref="checkCompany" prop="checkCompany">
                            <el-input class="checkName percentName" readonly v-model="basicForm1.checkCompany"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="seniorWdorg"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="是否项目公司：" ref="isProjectCompany" >
                            <el-radio-group v-model="basicForm1.isProjectCompany" @change="regionIsOrNot">
                              <el-radio disabled label="true">是</el-radio>
                              <el-radio disabled label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="所属分区：" ref="region" prop="region" v-if="shiFouXianShi">
                            <el-select class="checkName percentName" v-model="basicForm1.region">
                                  <el-option v-for="item in dictListByDictId" :key="item.code" :label="item.displayText" :value="item.code">
                                  </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="全宗类型：" ref="fondType" >
                            <el-radio-group v-model="basicForm1.fondType">
                              <el-radio label='1'>集团</el-radio>
                              <el-radio label='2'>地方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>

                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item class="lt" :label="item.roleName+'：'" :ref="'checkPeople'+index" :prop="'checkPeople'+index" :rules="[{required:item.biTian,message:'请选择',trigger:['blur','change']}]" v-for="(item,index) in roleSelect" :key="index" lable-width="200px">
                            <el-input class="checkName percentName" readonly v-show="false" v-model="basicForm1['bumen'+index]"></el-input>
                            <el-input class="checkName percentName" readonly v-show="false" v-model="basicForm1['zhiwu'+index]"></el-input>
                            <el-input class="checkName percentName" readonly  v-show="false" v-model="basicForm1['check'+index]"></el-input>
                            <el-input class="checkName percentName" readonly ref="'check'+index" v-model="basicForm1['checkPeople'+index]"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="choosePerson1(index,item)"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                        <el-form-item class="checkThings" label="备注：" ref="comments" prop="comments">
                            <el-input class="checkName percentName" placeholder="最多输入1000字" maxlength="1000" v-model.trim="basicForm1.comments" type="textarea"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    审批信息
                </div>
                <el-form :rules="basicFormRules2" :model="basicForm2" class="basicForm topParamsForm fileApplyForm" label-width="135px" ref="basicForm2">
                    <div class="formItem topTitle">
                        <el-form-item class="checkThings" label="依次选择审批人：" ref="auditNames" prop="auditNames">
                            <el-input readonly class="checkName percentName" v-model="basicForm2.AppvoalUsers" v-show="false"></el-input>
                            <el-input readonly class="checkName percentName redFont" v-model="basicForm2.auditNames"></el-input>
                            <el-button class="checkSearch choosePerson" :disabled="dBt" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="formItem evenTitle whiteTitle" v-show="cc">
                        <el-form-item class="checkThings" label="选择抄送人：" prop="ccUserName" ref="ccUserName">
                            <el-input readonly class="checkName percentName" v-model="basicForm2.ccUserId" v-show="false"></el-input>
                            <el-input readonly class="checkName percentName" v-model="basicForm2.ccUserName"></el-input>
                            <el-button class="checkSearch choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                        <el-form-item class="checkThings" label="签字：" prop="AppvoalContext" ref="AppvoalContext">
                            <el-input type="textarea" class="checkName percentName" placeholder="最多输入1000字" maxlength="1000" v-model.trim="basicForm2.AppvoalContext"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit('basicForm0','basicForm1','basicForm2')">提交申请</el-button>
            </div>

        </div>
        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true" :before-close="handleClose">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell" @submit.native.prevent>
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
                                <el-table  @row-dblclick="dblNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="userID" label="userID" v-if="false">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomLeft">
                            <el-table tooltip-effect="dark" @row-dblclick="dblNameRow" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table tooltip-effect="dark" @row-click="leafClickRow1" @row-dblclick="celldblClick" stripe :height = "oaHeight" @selection-change="selsChange1" :data="dataCompany" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="nodeName" label="节点名称">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="userId" label="ID">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkDefault" @click="peopleVisible = false;node.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone" >确定</el-button>
            </div>
        </el-dialog>

        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible1" :close-on-click-modal="true" :modal-append-to-body="false" :before-close="handleClose1">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell">
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName" v-show="false"></el-input>
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName"  @keyup.enter.native="searchName(checkNameForm.checkName)"></el-input>
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
                                <label>常用联系人</label><span>(双击选择)</span>
                                <span class="rt" @click="clearPeople" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table  @row-dblclick="dblNameRow1"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomAll">
                            <el-table tooltip-effect="dark" @row-dblclick="dblNameRow1" @row-click="oaClickRow1" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
            <div slot="footer" class="dialog-footer">
                <el-button class="checkDefault" @click="peopleVisible1 = false;node1.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>


        <el-dialog class="fixModal" title="选择对应公司" :visible.sync="fileVisible" :close-on-click-modal="true" :before-close="handleClose">
            <div class="scrollCon">
                <div class="tableCon">
                    <el-tree v-loading="treeLoading"
                             :load="loadNode"
                             node-key="id"
                             @node-click = "fondClick"
                             :props="defaultTrees"
                             lazy
                             :render-content="renderContent">
                    </el-tree>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button class="checkWay" @click="submitForm1('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="fixModal" title="上级公司" :visible.sync="fileFondVisible" :close-on-click-modal="true">
            <div class="scrollCon formDiv">
                <div class="tableCon">
                    <el-tree node-key="id"
                             v-loading="treeLoading"
                             :data="fondData"
                             @node-click = "higherFondClick"
                             :props="defaultFondTrees"
                             :render-content="renderContent">
                    </el-tree>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="checkWay" @click="submitForm2('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="checkModal" title="选择用户" :visible.sync="writorVisible" :close-on-click-modal="true" :before-close="handleClose2">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell" @submit.native.prevent>
                                    <el-form-item class="" label="姓名/OA账号：">
                                        <el-input type="input" class="checkName" v-model="checkNameForm.checkName"  @keyup.enter.native="searchName(checkNameForm.checkName)"></el-input>
                                        <el-button class="checkWay" @click.enter="searchName(checkNameForm.checkName)">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="topCheckTree oaTree">
                                <el-tree node-key="id"
                                         v-loading="treeLoading"
                                         ref="tree"
                                         :load="loadNode2"
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
                                <el-table  @row-dblclick="dbChaolNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
                                    <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                    </el-table-column>
                                    <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                    </el-table-column>
                                    <el-table-column :show-overflow-tooltip="true" prop="userID" label="userID" v-if="false">
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomLeft">
                            <el-table tooltip-effect="dark" @row-click="chaoOaClickRow" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                                <el-table-column :show-overflow-tooltip="true" prop="userID" label="userID" v-if="false">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkDefault" @click="writorVisible = false;node2.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseWritorDone" >确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './quanzong.service';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        a:any = {};
        b:any = {};
        c:any = {};
        d:any = {};
        e:any = {};
        node: any = {};
        resolve: any = {};
        node1: any = {};
        resolve1: any = {};
        node2: any = {};
        resolve2: any = {};
        dataChao: any = [];//抄送人数据
        cc:boolean;
        nameHeight: number;
        sign: number;
        treeParamsId: number;
        index: number;
        timer: boolean;
        shiFouXianShi: boolean;
        listLoading: boolean;
        peopleVisible: boolean;
        peopleVisible1: boolean;
        writorVisible: boolean;
        fileVisible: boolean;
        fileFondVisible: boolean;
        treeLoading: boolean;
        comLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        dataCompany: any = [];
        fondData: any = [];
        checkNameForm: any = {};
        chaoOaClickRowNameDouble: any = {};
        oaClickRowNameDouble:any = {};
        nodeClickRowName:any = {};
        nodeClickRowName1:any = {};
        filters: any = {};
        basicForm: any = {};
        basicForm0: any = {};
        basicForm1: any = {};
        basicForm2: any = {};
        baseForm: any = [];
        treeData: any = [];
        list: any = [];
        list1: any = [];
        data: any = [];
        dictListByDictId: any = [];
        dataOa: any = [];
        tableHeadArrs:any = [];
        dataName: any = [];
        roleSelect: any = [];
        tree: any = [];
        leafName: any = [];
        companyTree: any = [];
        defaultProps: any = {};
        defaultTrees: any = {};
        defaultFondTrees: any = {};
        basicFormRules0: any = {};
        basicFormRules1: any = {};
        basicFormRules2: any = {};
        oaClickRowName: any = {};
        oaClickRowName1: any = {};
        auditDisplay: any = {};
        obj: any = {};
        fondId:string;
        fondName:string;
        dBt:boolean;
        t:number;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280 ;
            this.nameHeight = null;
            this.timer = false;
            this.peopleVisible = false;
            this.peopleVisible1 = false;
            this.writorVisible = false;
            this.fileVisible = false;
            this.fileFondVisible = false;
            this.treeLoading = false;
            this.comLoading = false;
            this.shiFouXianShi = true;
            this.cc = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.listLoading = false;
            this.sign = 0;
            this.list = [];
            this.fondData = [];
            this.dataChao = [];
            this.list1 = [];
            this.dataOa = [];
            this.treeData = [];
            this.leafName = [];//节点姓名
            this.checkNameForm = {
                checkName:''
            };
            this.basicForm2 = {
                AppvoalUsers:'',
                auditNames:'',
                ccUserId:'',
                ccUserName:'',
                AppvoalContext:''
            };
            this.obj = {
                userID:'',
                unitname:'',
                fullName:'',
                jobname:''
            };
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.defaultProps = {
                children: 'children',
                label: 'nodeName',
                id:'orgID'
            };
            this.defaultTrees = {
                children: 'children',
                label: 'shortName',
                id:'orgID'
            };
            this.defaultFondTrees = {
                children: 'children',
                label: 'fondName',
                id:'id'
            };
            this.a = {

            };
            this.auditDisplay ={
                auditIds:'',
                ccUserId:'',
                signature:''
            };
            this.b = {
                role:{"id":0},
                user:{"userId":0}
            };
            this.dataCompany = [
            ];
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
            };
            this.basicForm = {
                company:'',
                userName:'',
            }
            this.basicForm1 = {
                isProjectCompany:true,
                fondType:'2',
            }
            this.baseForm = {
                title:'',
                cause:'',
                fondName:'',
                orgId:0,
                isProjectCompany:true,
                region:0,
                comments:'',
                fondsMaster:{

                },
                fondsApprovalRoleUserList:[],
                appUsers:'',
                ccUserId:'',
                appContext:'',
                fondType:1
            };
            this.basicFormRules0 = {
                title: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                cause: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
            };
            this.basicFormRules1 = {
                fondName: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                higherFondName: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                checkCompany: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                checkThings:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                region:[
                    { required: true, message: '请选择', trigger: 'change' }
                ],
            };
            this.basicFormRules2 = {
                auditNames:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                AppvoalContext:[
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
            };
            this.data =  [];
            this.tableHeadArrs = [];
            this.dataName = [];
            this.fondName = '';
            this.fondId = '';
            this.dBt = false;
            this.t = 0;
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            this.getFiles();
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);
            this.getFiles();
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
            // Service.getCarData({}).then((res) =>{
            //
            // })
        };
        // 删除
        deleteFile(row: any = {}){
            this['$confirm']('确认删除选中文件吗？', {
                type: 'warning'
            }).then(() => {
                let arr = [];
                for(let item of this.data){
                    if(item.id !== row.id){
                        arr.push(item)
                    }
                }
                this.data = arr;
            });
        }
        // 批量删除
        deleteAllFiles(){
            let params = { id : '' };
            params.id = this.list.map(item => item.id).toString();
            this['$confirm']('确认删除选中文件吗？', {
                type: 'warning'
            }).then(() => {
                let arr = [];
                for(let item of this.data){
                    let att = [];
                    for(let li of this.list){
                        if(item.id === li.id){
                           att.push(item.id)
                        }
                    }
                    if(att.length===0){
                        arr.push(item)
                    }
                }
                this.data = arr;
                // Service.getCarData(params).then((res) =>{
                //     if(res['result']){
                //         this['$message']({
                //             message: '删除成功',
                //             type: 'success'
                //         });
                //     }else{
                //         this['$message']({
                //             message: '删除失败',
                //             type: 'error'
                //         });
                //     }
                // })
            });
        };

        // 点击选择审批人
        choosePerson():void{
            if(this.sign ==1){
                this['$message']({
                    message: '审批人员未配置，流程无法发起。请联系' + this.fondName + '的行政部档案员。',
                    type: 'warning'
                });
            }else if(this.sign ==2){
                this['$message']({
                    message: '无法找到所属产业集团，请联系系统管理员。',
                    type: 'warning'
                });
            }else{
                //this.nameList(this.fondId);
                if(this.basicForm1.higherFondName=='' || this.basicForm1.higherFondName==null){
                    this['$message']({
                        message: '请先选择上级公司！',
                        type: 'warning'
                    });
                }
                if(this.basicForm1.higherFondName!='' && this.basicForm1.higherFondName!=null){
                    this.peopleVisible = true;
                    this.loadNode(this.node,this.resolve);
                    this.userPeople();
                }
            }
        };

        // 点击选择审批人（单选）
        choosePerson1(index,item):void{
            this.index = index;
            this.peopleVisible1 = true;
            this.loadNode1(this.node1,this.resolve1);
            //回显
            if(this.basicForm1['checkPeople'+index] != '' && this.basicForm1['checkPeople'+index] != undefined){
                this.obj.fullName = this.basicForm1['checkPeople'+index];
                this.obj.userID = this.basicForm1['check'+index];
                this.obj.unitname = this.basicForm1['bumne'+index];
                this.obj.jobname = this.basicForm1['zhiwu'+index];
                let attr = [];
                attr.push(this.obj);
                this.dataOa = attr;
            }else{
                this.dataOa = [];
            }
            this.userPeople();
        }
        // 点击左侧OA表格行（单选）
        oaClickRow1(row){
            this.obj = row;//回显
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
            this.oaClickRowName.bumen = row.unitname;
            this.oaClickRowName.zhiwu = row.jobname;
        };

        // 审批人确定（单选）
        chooseDone1(){
            this.$set(this.basicForm1,'bumne'+this.index,this.oaClickRowName.bumen);//部门
            this.$set(this.basicForm1,'zhiwu'+this.index,this.oaClickRowName.zhiwu);//职务
            this.$set(this.basicForm1,'check'+this.index,this.oaClickRowName.uid);
            this.$set(this.basicForm1,'checkPeople'+this.index,this.oaClickRowName.uName);

            this.peopleVisible1 = false;
            this.saveContacts(this.oaClickRowName.uid);
            this.dataOa = [];
            this.oaClickRowName = {};
            this.node1.childNodes = [];
            this.checkNameForm.checkName = '';
        };

        //
        chooseWritor():void{
            this.writorVisible = true;
            this.loadNode2(this.node2,this.resolve2);
            this.userPeople();
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

        // 创建全宗提交
        applySubmit(basicForm0,basicForm1,basicForm2):void{
            if(this.sign == 1){
                this['$message']({
                    message: '审批人员未配置，流程无法发起。请联系' + this.fondName + '的行政部档案员。',
                    type: 'warning'
                });
            }else if(this.sign ==2){
                this['$message']({
                    message: '无法找到所属产业集团，请联系系统管理员。',
                    type: 'warning'
                });
            }else{
                let flag = false;
                if(this.dataCompany.length >= 2 && this.dataCompany[this.dataCompany.length-1].userId == this.dataCompany[this.dataCompany.length-2].userId){
                    flag = true
                }
                if(flag){
                    this['$message']({
                        message: '所选审批人重复，该流程无法发起！',
                        type: 'warning'
                    });
                }else{
                    let valid0 = false;
                    let valid1 = false;
                    let valid2 = false;
                    this['$refs'][basicForm0]['validate']((valid)=>{
                        if (valid) {
                            valid0 = true;
                        }
                    });
                    this['$refs'][basicForm1]['validate']((valid)=>{
                        if (valid) {
                            valid1 = true;
                        }
                    });

                    this['$refs'][basicForm2]['validate']((valid)=>{
                        if (valid) {
                            valid2 = true;
                        }
                    });
                    if(!valid0){
                        this['$message']({
                            message: '请完善基本信息！',
                            type: 'warning'
                        });
                    }else if(this.basicForm2.auditNames == '' || this.basicForm2.auditNames == undefined){
                        this['$message']({
                            message: '请选择审批人！',
                            type: 'warning'
                        });
                    }else if(this.basicForm2.AppvoalContext == '' || this.basicForm2.auditNames == undefined){
                        this['$message']({
                            message: '请填写签字意见！',
                            type: 'warning'
                        });
                    }
                    if (valid0 && valid1 && valid2) {
                        let loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在提交中，请稍候',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        this.baseForm.fondsApprovalRoleUserList = [];
                        for(let i = 0;i<this.roleSelect.length;i++){
                            let id = this.roleSelect[i].id;
                            let d = {"id":id};
                            let b = {role:{"id":''},user:{userId:''}};
                            b.role = d;
                            let c = {"userId":this.basicForm1['check'+i]};
                            b.user = c;
                            if(this.basicForm1['check'+i] != '' && this.basicForm1['check'+i] != null){
                                this.baseForm.fondsApprovalRoleUserList.push(b);
                            }
                        }
                        this.baseForm.title = this.basicForm0.title;
                        this.baseForm.cause = this.basicForm0.cause;
                        this.baseForm.fondName = this.basicForm1.fondName;
                        this.baseForm.orgId = this.basicForm1.orgId;
                        if(this.basicForm1.isProjectCompany == "false"){
                            this.baseForm.isProjectCompany = false;
                        }else if(this.basicForm1.isProjectCompany == "true"){
                            this.baseForm.isProjectCompany = true;
                        }
                        this.baseForm.fondType = parseInt(this.basicForm1.fondType);
                        if(this.shiFouXianShi == true){
                            this.baseForm.region = this.basicForm1.region;
                        }
                        this.baseForm.comments = this.basicForm1.comments;
                        this.baseForm.fondsMaster = {"id":this.e.id};
                        this.baseForm.appUsers = this.basicForm2.AppvoalUsers;
                        this.baseForm.ccUserId = this.basicForm2.ccUserId;
                        this.baseForm.appContext = this.basicForm2.AppvoalContext;
                        let params = this.baseForm;
                        Service.fondsApprovalSave(params).then((res) =>{
                            this.$nextTick(() => {
                                loadingInstance.close();
                            });
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '创建全宗成功！',
                                    type: 'success'
                                });
                                window.sessionStorage.setItem('QDchangQuanTransDetail', JSON.stringify(res.data.data));
                                this['$router'].push({
                                    path:'/selfTip/transferDetail/quanTransDatil',
                                    name:'档案全宗详情',
                                    params:{
                                        id:res.data.data,
                                        stepId:'',
                                        routerType:'r2'
                                    }
                                });

                                window.sessionStorage.setItem('examState', '2');
                                //this['$router'].go(-1);
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        });
                    }
                }
            }
        };

         // 选择抄送人确定
            chooseWritorDone(){
                if(this.dataChao.length>0){
                    let arr = [];
                    let ids = [];
                    for(let data of this.dataChao){
                        arr.push(data.fullName);
                        ids.push(data.userID);
                    }
                    let a = ids.join(",");
                    let b = arr.join("，");
                    this.basicForm2.ccUserId = a;
                    this.basicForm2.ccUserName = b;
                    this.writorVisible = false;
                    this.saveContacts(a);
                    this.node2.childNodes = [];
                    this.dataOa = [];
                    this.checkNameForm.checkName = '';
                }else{
                    this.basicForm2.ccUserId = '';
                    this.basicForm2.ccUserName = '';
                    this.writorVisible = false;
                    this.node2.childNodes = [];
                    this.dataOa = [];
                    this.checkNameForm.checkName = '';
                }
            };

        // 依次选择审批人确定
        chooseDone(){
            let arr = [];
            let ids = [];
            for(let data of this.dataCompany){
                if(data.fullName != '' && data.fullName != null){
                    arr.push(data.fullName);
                    ids.push(data.userId);
                }
            }
            if(arr.length === this.dataCompany.length){
                this.basicForm2.auditNames = arr.join('->');
                this.basicForm2.AppvoalUsers = ids.join(',');
                this.peopleVisible = false;
                this.saveContacts(this.basicForm2.AppvoalUsers);
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
            for(let com of this.dataCompany){
                if(!com.fullName){
                   com.fullName = row.fullName;
                   com.userId = row.userID;
                   return false;
                }
            }
        };

        // 双击常联系人添加
        dblNameRow1(row){
            this.$set(this.basicForm1,'bumne'+this.index,row.unitname);//部门
            this.$set(this.basicForm1,'zhiwu'+this.index,row.jobname);//职务
            this.$set(this.basicForm1,'check'+this.index,row.userID);
            this.$set(this.basicForm1,'checkPeople'+this.index,row.fullName);
            this.saveContacts(row.userID);
            this.peopleVisible1 = false;
            this.node1.childNodes = [];
            //let ids = [];
            //if(this.dataOa.length == 0){
            //    this.dataOa.push(row);
            //}else{
            //    for(let child of this.dataOa){
            //        ids.push(child.userID);
            //    }
            //    if(ids.indexOf(row.userID) < 0){
            //        this.dataOa.push(row);
            //    }
            // }
        };

        // 点击节点表格删除
        celldblClick(row:any){
            console.log(row)
               if(row.fullName && row.select) {
                   row.fullName = '';
               }else if(!row.select){
                    this['$message']({
                        message: '节点不能更改！',
                        type: 'warning'
                    });
               }
        }

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
            let go = this;
            treeChange(this.tree);
            let id = this['$route'].params.id;
            if(id==='1'){
                this.tableHeadArrs = JSON.parse(window.sessionStorage.getItem('headList'));
            }else if(id==='2'){
                this.tableHeadArrs = JSON.parse(window.sessionStorage.getItem('headList'));
            }
            document.onkeydown = function(e) {
                let key = window.event['keyCode'];
                if(key ===13){
                    go.searchName(go.checkNameForm.checkName);
                }
            };
        };

        //对应公司
        seniorWdorg(){
            this.fileVisible = true;
            this.loadNode(this.node,this.resolve);
        }

        //上级全宗
        higherFond(){
            this.t+=1;
            if(this.t == 1){
                this.treeLoading = true;
                Service.getAllFondsTreeData({}).then((res) =>{
                    this.treeLoading = false;
                    if(res.data.succeeded){
                        this.fondData = res.data.data;
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }
            this.fileFondVisible = true;
        }

        // 懒加载树
        loadNode(node,resolve) {
            this.treeData = [];
            if(node.level === 0){
                this.node = node;
                this.resolve = resolve;
                this.treeLoading = true;
                Service.seniorWdorg(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = this.treeData;
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
                Service.seniorWdorg(this.treeParamsId).then((res) =>{
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

        // 懒加载树(单选)
        loadNode1(node,resolve) {
            this.treeData = [];
            if(node.level === 0){
                this.node1 = node;
                this.resolve1 = resolve;
                this.treeLoading = true;
                Service.seniorWdorg(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = this.treeData;
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
                Service.seniorWdorg(this.treeParamsId).then((res) =>{
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

         // 懒加载树(抄送人)
        loadNode2(node,resolve) {
            this.treeData = [];
            if(node.level === 0){
                this.node2 = node;
                this.resolve2 = resolve;
                this.treeLoading = true;
                Service.seniorWdorg(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = this.treeData;
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
                Service.seniorWdorg(this.treeParamsId).then((res) =>{
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

        // 点击子节点
        fondClick(data){//对应公司
            this.a = data;
        };

        // 点击子节点
        higherFondClick(data){//上级全宗
            this.e = data;
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

        submitForm1(formName) {//选择公司确定
            this.$set(this.basicForm1,'checkCompany',this.a.shortName);
            //this.basicForm1.checkCompany = this.a.shortName;
            this.basicForm1.orgId = this.a.orgID;
            this.node.childNodes = [];
            this.fileVisible = false;
        };

        submitForm2(formName) {//上级全宗确定
            if(this.e.parentId == 0){
                this['$message']({
                    message: '请不要选择根全宗！',
                    type: 'warning'
                });
                return;
            };
            this.$set(this.basicForm1,'higherFondName',this.e.fondName);
            this.fileFondVisible = false;
            this.node.childNodes = [];
            this.nameList(this.e.id);
            this.fondId = this.e.id;
            if(this.e.isProjectCompany){
                this.basicForm1.isProjectCompany = "true";
                this.shiFouXianShi = true;
            }else{
                this.basicForm1.isProjectCompany = "false";
                this.shiFouXianShi = false;
            }

        };

        // 点击左侧OA表格行
        oaClickRow(row){
            this.oaClickRowNameDouble = row;
        };
        // 点击左侧OA表格行
        chaoOaClickRow(row){
            this.chaoOaClickRowNameDouble = row;
        };
        // 点击节点名称列表
        leafClickRow(row){
            this.nodeClickRowName = row;
        };

        // 点击节点名称列表
        leafClickRow1(row){
            this.nodeClickRowName1 = row;
        };

        // 右转左
        rightToLeft(){
            let data = this.nodeClickRowName1;
            for(let com of this.dataCompany){
               if(data.id===com.id && com.select){
                   com.fullName = '';
               }
            }
        }

        // 左转右
        leftToRight(){
            let data = this.oaClickRowNameDouble;
            for(let com of this.dataCompany){
                if(com.select && com.fullName == ''){
                    com.fullName = data.fullName;
                    com.userId = data.userID;
                    return false;
                }
            }
        }

        // 节点表格
        nameList(id){
            Service.getApprovalPerson(id).then((res) =>{
                let flag = false;
                if(res.data.succeeded){
                    if(res.data.data == null || res.data.data.length == 0){
                        let b = document.querySelector(".redFont .el-input__inner");
                        b["style"].color = 'red';
                        this.basicForm2.auditNames = "无法找到所属产业集团，请联系系统管理员。";
                        this.sign = 2;
                        this.dBt = true;
                        flag = true;
                    }else{
                        this.dataCompany = res.data.data;
                        for(let child of this.dataCompany){
                            if(!child.select && child.fullName == ''){
                                this.fondName = child.fondName;
                                let b = document.querySelector(".redFont .el-input__inner");
                                b["style"].color = 'red';
                                this.basicForm2.auditNames = "审批人员未配置，流程无法发起。请联系" + this.fondName + "的行政部档案员。";
                                this.sign = 1;
                                this.dBt = true;
                                flag = true;
                            }
                        };
                        if(!flag){
                            this.dBt = false;
                            this.sign = 0;
                            this.basicForm2.auditNames = '';
                            let b = document.querySelector(".redFont .el-input__inner");
                            b["style"].color = '#606266';
                        }
                    }
                }else{
                    this['$message']({
                        message: '节点名称列表加载失败！',
                        type: 'error'
                    });
                    this.dBt = true;
                }
            });
        };

        //控制所属分区是否显示
        regionIsOrNot(obj){
            if(obj == "true"){
                this.shiFouXianShi = true;
            }else if(obj == "false"){
                this.shiFouXianShi = false;
            }
        }

        // 抄送右转左
        chaoRightToLeft(){
            let data1 = this.nodeClickRowName;
            let arr = [];
            for(let data of this.dataChao){
                if(data1.fullName!==data.fullName){
                    arr.push(data)
                }
            };
            this.dataChao = arr;
        }

        // 抄送左转右
        chaoLeftToRight(){
            if(this.dataOa.length>0){
                let data1 = this.chaoOaClickRowNameDouble;
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

        // 全部抄送右转左
        chaoAllRightToLeft(){
            this.dataChao = [];
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

        // 常用联系人
        userPeople(){
            Service.getContacts({}).then((res) =>{
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

        saveContacts(ids){
            Service.saveContacts(ids).then((res) =>{

            });
        }

        handleClose(){
            this.fileVisible  =false;
            this.peopleVisible  =false;
            this.node.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

        handleClose1(){
            this.peopleVisible1  =false;
            this.node1.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

        handleClose2(){
            this.writorVisible  =false;
            this.node2.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }

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

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };
            let id = this['$route'].params.id;
            if(id==='1'){
                this.data = JSON.parse(window.sessionStorage.getItem('dataList'));
            }else if(id==='2'){
                this.data = JSON.parse(window.sessionStorage.getItem('dataList'));
            }

            this.basicForm1.isProjectCompany = "true";

            // this.getFiles();

            //获取全宗角色
            Service.getFondRoleList({}).then((res) =>{
                this.roleSelect = res.data.data;
                for(let child of this.roleSelect){
                    if(child.id == 99){
                        child.biTian = false;
                    }else{
                        child.biTian = true;
                    }
                }
            });
            //获取所属分区下拉选数据
            let parame = 443;
            Service.getDictListByDictId(parame).then((res) =>{
                this.dictListByDictId = res.data.data;
            });
            //控制选择抄送人是否显示
            Service.getApprovalSave({}).then((res) =>{
                this.cc = res.data.data.cc;
            });
            //常用联系人
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });

            //获取当前登录人
            Service.getUserUrl({}).then((res) =>{
                this.basicForm.userName = res.data.data.LogonUserFullName;
                this.basicForm.company = res.data.data.LogonOrgName;
            });

 //           window.onbeforeunload = function (e) {
 //             e = e || window.event;
 //             // 兼容IE8和Firefox 4之前的版本
 //             if (e) {
 //               e.returnValue = '关闭提示';
 //            }
 //             // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
 //             return '关闭提示';
 //           };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/borrowdetails/quanzong';
</style>