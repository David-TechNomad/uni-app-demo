<template>
    <section>
        <div class="mainTitle">
            <span>全宗创建申请</span>
            <el-button class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">基本信息</div>
                <el-form :model="detailData" class="basicForm topParamsForm fileApplyForm" label-width="120px" :rules="basicFormRules" ref="cell">
                    <div class="formItem topTitle">
                        <el-form-item label="标题：" ref="title" prop="title">
                            <el-input class="checkName percentName" v-model="detailData.title"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="申请人：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName" v-model="detailData.createPerson"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company">
                            <el-input class="checkName percentName" readonly v-model="detailData.createOrgName"></el-input>
                        </el-form-item>
                    </div>
                    <div class="evenTitle">
                        <el-form-item class="things" label="创建事由：" ref="cause"  prop="cause">
                            <el-input type="textarea" class="checkName percentName" v-model="detailData.cause"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">全宗信息</div>
                <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" label-width="150px" ref="cell">
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="全宗号：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName" v-model="detailData.fondCode"></el-input>
                        </el-form-item>
                        <el-form-item label="全宗名：" ref="fondName" class="lt basicItem" prop="fondName">
                            <el-input class="checkName percentName" readonly v-model="detailData.fondName"></el-input>
                        </el-form-item>
                        <el-form-item label="上级全宗：" ref="date" class="lt basicItem" prop="orgName">
                            <el-input class="checkName percentName" readonly v-model="detailData.parentFondsName"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="higherFond"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>

                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item class="lt" label="对应公司：" ref="things" >
                            <el-input class="checkName percentName" v-model="detailData.orgName"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="seniorWdorg"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="是否项目公司：" ref="isProjectCompany" >
                            <el-radio-group v-model="detailData.isProjectCompany">
                              <el-radio label="true">是</el-radio>
                              <el-radio label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="所属分区：" ref="region">
                            <el-select class="checkName percentName" v-model="detailData.region">
                                  <el-option v-for="item in dictListByDictId" :key="item.code" :label="item.displayText" :value="item.code">
                                  </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item class="lt" :label="item.roleName+'：'" ref="things" :key="index" v-for="(item,index) in roleSelect">
                            <el-input class="checkName percentName" readonly v-show="false" v-model="detailData['check'+index]"></el-input>
                            <el-input class="checkName percentName" readonly v-model="detailData['checkPeople'+index]"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="choosePerson3(index,item)"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                        <el-form-item class="checkThings" label="备注：">
                            <el-input class="checkName percentName" v-model="detailData.comments" type="textarea"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    审批流程
                    <div class="titleSect"></div>
                </div>
                <div class="basicList1">
                    <el-row>
                        <el-col :span="22">
                            <div class="grid-content2 bg-purple-light">
                                <span class="span3">
                                    <span v-for="(item,index) in stepMap">
                                        {{item.stepName}}【{{item.userName}}<span v-if="item.stepType==1"><i class="fa fa-check" style="color:green;font-size:15px;"></i> </span>】<span v-if="index != stepMap.length-1">→</span>
                                    </span>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    审批意见
                    <div class="titleSect"></div>
                </div>
                <div class="basicList" style="padding:10px 0 15px">
                    <el-row>
                       <el-col :span="7"  v-show="jiaqian">
                            <el-form :model="checkFilters" class="topParamsForm superLeftForm ">
                                <el-form-item class="" label="加签人：" label-width="90px">
                                    <el-input class="checkName percentName" readonly="readonly" v-model="checkFilters.jiaqianren" placeholder=""></el-input>
                                    <el-button class="checkSearch choosePerson thisInp" @click="jiaqianOut(3)"><i class="fa fa-search"></i></el-button>
                                </el-form-item>
                            </el-form>
                       </el-col>
                        <el-col :span="22">
                            <el-form :model="checkFilters" class="topParamsForm superLeftForm ">
                                <el-form-item class="title" label="审批意见：" ref="title" label-width="90px">
                                    <el-select class="checkName percentName" v-model="checkFilters.title" placeholder="请选择">
                                        <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="" label="意见说明：" label-width="90px">
                                    <el-input class="" type="textarea" v-model="checkFilters.others" placeholder=""></el-input>
                                </el-form-item>
                                <!--<div class="">1234</div>-->
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit(1)">重新提交</el-button>
            </div>
            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        审批记录
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe :height="bodyHeight-100" :data="dataCheck" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column prop="stepName" label="步骤">
                            </el-table-column>
                            <el-table-column prop="ApprovalContext" label="审批意见">
                            </el-table-column>
                            <el-table-column prop="stepUserName" label="审批人2">
                            </el-table-column>
                            <el-table-column prop="auditDate" :formatter="dateFormat" label="审批时间" width="120">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible1" :close-on-click-modal="true">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell">
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
                                <label>常联系人</label><span>(双击选择)</span>
                                <span class="rt" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table  @row-dblclick="dblNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table tooltip-effect="dark" @row-click="oaClickRow1" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="peopleVisible = false">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>

        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible2" :close-on-click-modal="true">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell">
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
                                <label>常联系人</label><span>(双击选择)</span>
                                <span class="rt" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table  @row-dblclick="dblNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table tooltip-effect="dark" @row-click="oaClickRow1" :height = "oaHeight" stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="peopleVisible = false">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="fixModal" title="上级全宗" :visible.sync="fileFondVisible" :close-on-click-modal="true">
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

        <el-dialog class="fixModal" title="选择对应公司" :visible.sync="fileVisible" :close-on-click-modal="true">
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

    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './fondCheck.service';
    import moment from 'moment';
    import treeChange from '../../../utils/treeChange';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        nameHeight: number;
        timer: boolean;
        fondCode: String;
        dataDetail : any = [];
        dataCheck: any = [];
        listLoading: boolean;
        peopleVisible1:boolean;
        peopleVisible2:boolean;
        peopleVisible3:boolean;
        fileVisible: boolean;
        treeLoading: boolean;
        zhuanfa:boolean;
        jiaqian:boolean;
        comLoading: boolean;
        showFondCode:boolean;
        fileFondVisible: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        index: number;
        qufen: number;
        treeParamsId: number;
        defaultTrees: any = {};
        oaClickRowName: any = {};
        dataCompany: any = [];
        leafName: any = [];
        searchOptions: any = [];
        checkNameForm: any = {};
        row: any = {};
        filters: any = {};
        basicForm: any = {};
        pickerOptions: any = {};
        checkFilters: any = {};
        dateOptions: any = {};
        allParams:any = {};
        list: any = [];
        list1: any = [];
        data: any = [];
        dataOa: any = [];
        tableHeadArrs: any = [];
        dataName: any = [];
        tree: any = [];
        dictListByDictId: any = [];
        defaultProps: any = {};
        defaultFondTrees: any = {};
        basicFormRules: any = {};
        checkFormRules: any = {};
        detailData:any = {};
        roleSelect: any = [];
        stepMap: any = [];
        fondData: any = [];
        e:any = {};
        a:any = {};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.fondCode = '';
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.treeParamsId = 0;
            this.listLoading = false;
            this.peopleVisible1 = false;
            this.peopleVisible2 = false;
            this.peopleVisible3 = false;
            this.treeLoading = false;
            this.comLoading = false;
            this.fileVisible = false;
            this.showFondCode = false;
            this.fileFondVisible = false;
            this.dataDetail = [];
            this.dataCheck = [];
            this.row = {};
            this.oaClickRowName = {
                uName:'',
                uid:'',
            };
            this.tableHeadArrs = [];
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
            this.searchOptions = [
                { label:'同意',value:'1'},
                { label:'不同意',value:'2'},
                { label:'收到',value:'3'}
            ];
            this.checkFilters = {
                title:'',
                others:''
            }
        }

        back():void{
            this['$router'].go(-1);
        };

        //时间格式化
        dateFormat1(date) {
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
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        // 查询档案列表
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

            };
            Service.borrowFileTable(params).then((res) =>{
                if(res.data.succeeded){
                    this.dataDetail = res.data.data;
                }else{
                    this['$message']({
                        message: '加载档案列表失败！',
                        type: 'error'
                    });
                }
            })
        }

        // 查询审核列表
        borrowCheckTable(){
            let params = {

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

        // 详情
        electricBorrowDetail(){
            // this['$router'].push({
            //     path:'/selfTip/eleTransforDetail/eleTransferDetail',
            //     name:'单个档案详情',
            // })
        }

        // 批准
        applySubmit(a){
            let b;
            b = this.oaClickRowName.uid;
            let params = {
                id:this.row[6],
                auditResult:a,
                addUserId:b,
                auditRemark:this.checkFilters.others,
                fondCode:this.fondCode,
            };

            Service.fondsApproval(params).then((res) =>{
                if(res.data.succeeded){
                    this['$message']({
                        message: '审批成功！',
                        type: 'success'
                    });
                    this['$router'].push({
                        path:'/selfTip/examination',
                    });
                }else{
                    this['$message']({
                        message: '审批失败！',
                        type: 'error'
                    });
                }
                this.oaClickRowName.uName = '';
                this.oaClickRowName.uid = '';
            });
        };
        // 转发
        applyTransfer(){
            this.peopleVisible2 = true;
        };

        created(){
            this.row =  JSON.parse(window.sessionStorage.getItem('fondCheckData'));
        };

        fenqu(num){
            if(num == 1){
                return "北区";
            }else if(num == 2){
                return "中区";
            }else if(num == 3){
                return "南区";
            }
        }
        isOrNoCompany(bool){
            if(bool == true){
                return "是";
            }else if(bool == false){
                return "否";
            }
        }

        //加签选人弹出框
        jiaqianOut(obj){
            this.qufen = 1;
            this.peopleVisible1 = true;
        }

        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
                this.treeLoading = true;
                Service.seniorWdorg(1).then((res) =>{
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

        // 点击左侧OA表格行（单选）
        oaClickRow1(row){
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
        };

        // 审批人确定（单选）
        chooseDone1(){
            if(this.qufen === 1){
                this.checkFilters.jiaqianren = this.oaClickRowName.uName;
            }else if(this.qufen === 3){
                this.chooseDone3();
            }
            this.peopleVisible1 = false;
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

        // 点击选择审批人（单选）
        choosePerson3(index,item):void{
            this.qufen = 3;
            this.index = index;
            this.peopleVisible1 = true;
        }

        // 审批人确定（单选）
        chooseDone3(){
            this.detailData['check'+this.index] = this.oaClickRowName.uid;
            this.detailData['checkPeople'+this.index] = this.oaClickRowName.uName;
            this.dataOa = [];
            this.oaClickRowName = {};
        };

        //上级全宗
        higherFond(){
            Service.getAllFondsTreeData({}).then((res) =>{
                if(res.data.succeeded){
                    this.fondData = res.data.data;
                }else{
                    this['$message']({
                        message: '树节点数据错误！',
                        type: 'error'
                    });
                }
            });
            this.fileFondVisible = true;
        }

        // 点击子节点
        higherFondClick(data){//上级全宗
            this.e = data;
        };

        submitForm2(formName) {//上级全宗确定
            this.detailData.parentFondsName = this.e.fondName;
            this.fileFondVisible = false;
        };

        //对应公司
        seniorWdorg(){
            this.fileVisible = true;
        }

        // 点击子节点
        fondClick(data){//对应公司
            this.a = data;
        };

        submitForm1(formName) {//选择公司确定
            this.detailData.orgName = this.a.shortName;
            this.detailData.orgId = this.a.orgID;
            this.fileVisible = false;
        };

        mounted(){
            this.getHeader();
            this.borrowCheckTable();

            //获取全宗审批数据详情
            let id = this.row[0];
            let stepId = this.row[6];
            let parame = {id:id,stepId:stepId};
            Service.getFondsApprovalInfo(parame).then((res) =>{
                if(res.data.succeeded){
                    this.detailData = res.data.data;
                    this.roleSelect = this.detailData.fondsApprovalRoleUserList;
                    this.stepMap = this.detailData.stepMap;
                    this.dataCheck = this.detailData.Approval;
                    this.zhuanfa = this.detailData.forward;
                    this.jiaqian = this.detailData.additionalSignature;
                    this.showFondCode = this.detailData.showFondCode;
                    this.detailData.isProjectCompany = this.detailData.isProjectCompany.toString();
                    this.detailData.region = this.detailData.region.toString();
                    for(let i = 0;i < this.roleSelect.length; i++){
                        this.detailData['check'+i] = this.roleSelect[i].userId;
                        this.detailData['checkPeople'+i] = this.roleSelect[i].userName;
                    }
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });



            //常用联系人
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });

            //获取所属分区下拉选数据
            let parame1 = 443;
            Service.getDictListByDictId(parame1).then((res) =>{
                this.dictListByDictId = res.data.data;
            });
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/transferDetail/fondDetail';
</style>