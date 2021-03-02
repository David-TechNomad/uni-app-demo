<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            档案员权限申请
            <el-button class="checkWay rt" @click="back" v-show="fanhui">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    申请单号： <b>{{allData.archivist.applyNum}}</b>
                    <div class="titleSect"></div>
                </div>
                <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm validForm" label-width="120px" :rules="basicFormRules" ref="basicForm">
                    <div class="formItem topTitle">
                        <el-form-item label="标题：" ref="title" prop="title">
                            <el-input class="checkName percentName" v-model.trim="basicForm.title" maxlength="50" placeholder="最多填写50个字"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="申请人：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName"  readOnly v-model="basicForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company">
                            <el-input class="checkName percentName"  readOnly v-model="basicForm.company"></el-input>
                        </el-form-item>
                        <el-form-item label="申请时间：" ref="date" class="lt basicItem" prop="date">
                            <el-input class="checkName percentName"  readOnly v-model="basicForm.date"></el-input>
                        </el-form-item>
                    </div>
                    <div class="formItem evenTitle">
                        <el-form-item class="checkThings" label="权限范围：" ref="things" prop="quanxian">
                            <el-input class="checkName percentName" v-model="basicForm.quanxian" readOnly></el-input>
                            <el-button class="checkWay choosePerson" @click="chooseFanwei"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="evenTitle">
                        <el-form-item class="things" label="申请说明：" ref="things"  prop="things">
                            <el-input type="textarea" class="checkName percentName" v-model.trim="basicForm.things"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">审批信息
                    <div class="titleSect"></div>
                </div>
                <el-form :model="auditDisplay" class="basicForm topParamsForm fileApplyForm" label-width="120px" ref="auditDisplay" :rules="auditDisplayRule">
                    <div class="formItem topTitle">
                        <el-form-item class="checkThings" label="依次选择审批人"  prop="auditIds">
                            <el-input class="checkName percentName" :class="{checkProcess:!checkProcessTrue}" v-model="auditDisplay.auditIds" :placeholder="checkProcess" readOnly></el-input>
                            <el-button class="checkWay choosePerson" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="formItem evenTitle whiteTitle">
                        <el-form-item class="checkThings" label="选择抄送人" prop="ccUserId">
                            <el-input class="checkName percentName" v-model="auditDisplay.ccUserId" readOnly></el-input>
                            <el-button class="checkWay choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                        <el-form-item class="checkThings" label="签字" prop="Signature">
                            <el-input class="checkName percentName" type="textarea" v-model.trim="auditDisplay.Signature" placeholder="最多填写1000个字" maxlength="1000"></el-input>
                        </el-form-item>
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
                    <el-table border tooltip-effect="dark" style="width: 100%" stripe :data="dataDetail" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{dataDetail.length-scope.$index}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepName" label="审批节点">
                            </el-table-column>
                            <el-table-column prop="auditRemark" label="签字意见">
                            </el-table-column>
                            <el-table-column prop="auditUserName" label="审批人">
                            </el-table-column>
                            <el-table-column prop="auditDate"  label="审批时间" :formatter="dateFormat" width="200">
                            </el-table-column>
                            <el-table-column prop="businessType" label="操作" width="120">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.businessType === '0'">审批</span>
                                    <span v-if="scope.row.businessType === '1'">转发</span>
                                    <span v-if="scope.row.businessType === '2'">申请</span>
                                    <span v-if="scope.row.businessType === '3'">加签</span>
                                    <span v-if="scope.row.businesstype === '4'">批注</span>
                                    <span v-if="scope.row.businesstype === '5'">加签审核</span>
                                    <span v-if="scope.row.businessType === '6'">抄送</span>
                                    <span v-if="scope.row.businesstype === '7'">重新提交</span>
                                    <span v-if="scope.row.businessType === '8'">驳回</span>
                                    <span v-if="scope.row.businessType === '10'">关闭</span>
                                </template> 
                            </el-table-column>
                            <el-table-column prop="receiveUserName" label="接收人" width="120">
                            </el-table-column>
                        </el-table>
                </div>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit('basicForm','auditDisplay')">重新提交</el-button>
                <el-button class="checkWay" @click="closeDone('basicForm')">关闭流程</el-button>
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
                                <el-table  border @row-dblclick="dblNameRow" :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table tooltip-effect="dark" @row-dblclick="dblNameRow" @row-click="oaClickRow" :height = "oaHeight" stripe :data="dataOa"  v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="peopleVisible = false;node1.childNodes = [];dataOa = [];checkNameForm.checkName = ''">取消</el-button>
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
                <el-button class="checkDefault" @click="writorVisible = false;node1.childNodes = [];dataOa = [];checkNameForm.checkName = ''">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
            </div>
        </el-dialog>
        

        <!-- 选择权限范围 -->
        <!-- <el-dialog class="fixModalArea" title="档案员权限范围" :visible.sync="quanxianFanwei" :close-on-click-modal="true">
            <div class="scrollCon">
                <div class="tableCon" style="float:left;width:50%;">          
                  <div class="topCheckCon">
                    <p style="line-height:20px;padding-left:5px">选择权限范围</p>
                     <el-form :model="checkNameForm" class="topParamsForm" ref="cell">
                        <el-form-item class="" style="">
                            <el-input type="input" class="checkName" style="width:110px;height:30px !important;line-height:30px !important"></el-input>
                            <el-button class="checkWay">查询</el-button>
                        </el-form-item>
                    </el-form>
                  </div>
                    <el-tree v-loading="treeLoading"
                             :load="loadNode"
                             node-key="id"
                             @node-click = "fondClick"
                             :props="defaultTrees"
                             lazy
                             :render-content="renderContent"
                             style="width:100%"
                             >
                    </el-tree>
                </div>
                 <div class="tableCon" style="float:right;width:50%;">
                       <div class="topCheckCon">
                    <p style="line-height:20px;padding-left:5px">选择权限范围</p>
                     <el-form :model="checkNameForm" class="topParamsForm" ref="cell">
                        <el-form-item class="" style="">
                            <el-input type="input" class="checkName" style="width:110px;height:30px !important;line-height:30px !important"></el-input>
                            <el-button class="checkWay">查询</el-button>
                        </el-form-item>
                    </el-form>
                  </div>
                    <el-tree v-loading="treeLoading"
                             :load="loadNode"
                             node-key="id"
                             @node-click = "fondClick"
                             :props="defaultTrees"
                             lazy
                             :render-content="renderContent"
                             style="width:100%"
                             >
                    </el-tree>
                </div>
            </div> 
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button class="checkWay" @click="submitForm1('ruleForm')">确定</el-button>
            </div>
        </el-dialog> -->

            <el-dialog class="fixModalArea" title="权限范围" :visible.sync="quanxianFanwei" :close-on-click-modal="true" style="max-height:100%;">
                  <div class="treeTitle" style="float:left;margin-left:30px;margin-right:185px">
                        <el-form :inline="true" :model="treeFilters" class="topParamsForm superLeftForm">
                            <el-form-item v-for="" class="title" label="" ref="title">
                                <el-select class="checkName" v-model="treeFilters.title" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethod" :loading="searchLoading">
                                    <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="searchBtn">
                                <el-button class="checkWay" @click="enterSearch">定位公司</el-button>
                            </el-form-item>
                            <!--<div class="">1234</div>-->
                        </el-form>
                    </div>
                  <div class="treeTitle thisTitle">
                        <el-form :inline="true" :model="rightFondForm" class="topParamsForm superLeftForm" style="margin-left:5px">
                            <el-form-item class="title" label="" ref="name">
                                <el-form-item class="title" label="" ref="name">
                                    <!-- <el-select class="checkName" v-model="rightFondForm.id" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethod" :loading="searchLoading">
                                        <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select> -->
                                    <el-input class="checkName" style="width:268px;height:20px;position:absolute;left:0px;top:0px;z-index:999"  clearable placeholder="请输入" v-model="rightFondName"></el-input>
                                    <el-button class="checkWay" style="position:absolute;left:158px;top:4px;z-index:999">
                                        <i class="fa fa-search thisBig" @click="rightFond"></i>
                                    </el-button>
                                    
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                    </div>
                <div class="scrollCon formDiv" style="width:400px"> 
                    <div class="tableCon" style="width:400px;">
                        <!-- <div class="left" style="width:50%;float:left">
                        <span style="line-height:20px;padding-left:5px">选择权限范围</span>
                            <div class="treeTitle thisTitle">
                            
                                <el-form :model= "leftFondForm" ref="" class="keywordForm topParamsForm">
                                    <el-form-item ref="word">
                                        
                                        <el-input class="checkName" style="width:268px;height:20px;position:absolute;left:0px;top:0px;z-index:999"  clearable placeholder="请输入" v-model="leftFondName"></el-input>
                                       <el-button class="checkWay" style="position:absolute;left:157px;top:4px;z-index:999" @click="leftFond">
                                        <i class="fa fa-search thisBig"></i>
                                    </el-button>
                                    </el-form-item>
				                </el-form>
                            </div>
                            <el-tree node-key="id"
                                     :data="leftData"
                                     class="leftTree"
                                     ref="tree"
                                     :default-expanded-keys="defaultLeftOpen"
                                     :props="defaultProps"
                                     v-loading="leftTreeLoading"
                                     @node-click="handleNodeClick1"
                                     v-show="leftFondTree1"
                                     style="margin-top:40px"
                                     :render-content="renderContent">
                            </el-tree>

                        </div> -->
                            <div class="treeOne tree" style="width:400px">
                            <!--show-checkbox-->
                            <div class="treeCon searchNameTree" v-show="lazyTreeShow">
                                <el-tree node-key="id"
                                        class="superTree superTree1"
                                        ref="tree"
                                        v-loading = "nameLoading"
                                        :data="treeLoadData"
                                        :props="defaultPropsSerch"
                                        :default-expanded-keys="defaultArr1"
                                        @node-click="handleNodeClickSerch"
                                        :render-content="renderContentserch">
                                </el-tree>
                            </div>
                            <div class="treeCon searchNameTree" v-show="searchTreeShow">
                                <el-tree node-key="id"
                                        class="superTree superTree1"
                                        ref="treeBox"
                                        v-loading = "nameLoading"
                                        :data="treeLoadData"
                                        @node-expand = "handleNodeExpand"
                                        :props="defaultPropsSerch1"
                                        :default-expanded-keys="defaultArr"
                                        @node-click="handleNodeClickSerch"
                                        :render-content="renderContentserch">
                                </el-tree>
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="right scrollCon" style="position:relative;left:400px;top:-92%;height:92%;overflow:auto;width:350px;">
                            <!-- <span style="line-height:20px;padding-left:5px">选择权限范围</span> -->
                            <el-tree node-key="id"
                                     ref="treeForm"
                                     :data="rightData"
                                     :props="defaultPropsRight"
                                     show-checkbox
                                     v-loading="rightTreeLoading"
                                     :default-expanded-keys="defaultRightOpen"
                                     @check-change="handleClick"
                                     @node-click="radioClick"
                                     :check-strictly="false"
                                     v-show="rightFondTree1"
                                     check-on-click-node
                                     :render-content="renderContent"
                                     class='treeAudit'
                                     >
                            </el-tree>
                            <!-- <el-tree node-key="id"
                                     ref="treeForm"
                                     :data="rightData"
                                     :props="defaultPropsRight"
                                     show-checkbox
                                     v-loading="rightTreeLoading"
                                     :default-expanded-keys="defaultRightOpen"
                                     @check-change="handleClick2"
                                     @node-click="radioClick"
                                     check-strictly = "true"
                                     v-show="rightFondTree"
                                     :render-content="renderContent">
                            </el-tree> -->
                        </div>
                <div slot="footer" class="dialog-footer diaFoot">
                    <el-button type="primary" class="checkWay" @click="getCheckedNodes(leafOnly, includeHalfChecked)">确定</el-button>
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
    import Service from './chaneShenTransDetail.service';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    import base from '@/scrollLoad';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        parentids:number;
        leftFondForm: any = {};
        timer: boolean;
        listLoading: boolean;
        peopleVisible: boolean;
        writorVisible: boolean;
        tableVisible:boolean;
        quanxianFanwei : boolean;
        leftTreeLoading : boolean;
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
        defaultProps: any = {};
        defaultPropsRight : any = {};
        basicFormRules: any = {};
        auditDisplayRule: any = {};
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
        sign: number;
        parameOne: string;
        parameTwo:string;
        marginSize:number;
        fanhui:boolean;
        dataOa:any = [];
        rightFondName:string;
        comLoading:boolean;
        rightTreeLoading : boolean;
        defaultTrees:any = {};
        auditDisplay:any ={};
        leafName:any = [];
        leftData: any = [];
        rightData : any = [];
        defaultLeftOpen: any = [];
        oaClickRowName:any = {};
        oaClickRowName1:any ={};
        rightFondForm: any = {};
        dataChao:any = [];
        initdataChao:any = [];
        defaultRightOpen :any = [];
        searchOptions: any = [];//远程搜索条目
        UserId:number;
        Signature:string;
        searchLoading: boolean;
        fondMove : any = {};
        fondsId :  string;
        shenperson : string;
        shenBumen : string;
        shenTime : string;
        treeList : any = [];
        fondNames : string;
        shenId:number;
        allData : any = {};
        leftIds : any = [];
        dataDetail : any = []
        tree1: any = [];
        tree:any = [];
        logonFondCode:string;
        superTableShow:boolean;
        nameLoading:boolean;
        lazyTreeShow:boolean;
        superFilterShow:boolean;
        searchTreeShow:boolean;
        rightFondTree1:boolean;
        treeFilters: any = {};
        treeLoadData: any = [];
        chooseArr: any = {};
        defaultArr1: any = [];
        defaultArr2: any = [];
        isExpand:boolean;
        fondData: any = {};
        defaultArr: any = [];
        fondTreeName: any = {};
        defaultPropsSerch:any = {};
        defaultPropsSerch1:any = {};
        node1:any = {};
        resolve1:any = {};
        centerDialogVisibejob:boolean;
        titleNode:string;
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
            this.quanxianFanwei = false;
             this.searchLoading = false;
            this.writorVisible = false;
            this.tableVisible = false;
            this.rightTreeLoading = false;
            this.leftTreeLoading = false;
            this.rightFondTree1 = true;
            this.sign = 0;
            this.parameOne = '';
            this.parameTwo = '';
            this.marginSize = 0;
            this.fanhui = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 10;
            this.listLoading = false;
            this.fondNames = ''
            this.list = [];
            this.dataDetail = [];
            this.list1 = [];
            this.treeLoading = false;
            this.shenperson = '';
            this.shenBumen = ''; 
            this.shenTime = '';
            this.dataOa = [];
            this.checkNameForm = {
                checkName:''
            };
            this.defaultProps = {
                children: 'children',
                label: 'fondName',
                id:'id'
            };
            this.defaultPropsRight = {
                children: 'children',
                label: 'nodeName',
                id:'id'
            }
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
                quanxian:''
            };
            this.auditDisplayRule = {
                 auditIds: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                Signature:[
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
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
                quanxian:[
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
            this.treeList = [];
            this.dataName = [];
            this.searchForm = {};
            this.tableArr= [];
            this.allData = {};
            this.IdArr = [];
            this.leftIds = [];
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
            this.fondMove = {
                    parentId:0,
                    children:""
                };
            this.auditDisplay ={
                auditIds:'',
                ccUserId:'',
                name:'',
                Signature:''
            };

            
            this.leafName = [];//节点姓名
            this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.dataChao = [];
            this.initdataChao = [];
            this.auditDisplay.Signature=""
            this.fondsId = ''

            //全宗树的变量
            this.superFilterShow = true;
            this.nameLoading = false;
            this.logonFondCode = null;
            this.lazyTreeShow = true;
            this.searchLoading = false;
            this.superTableShow = false;
            this.defaultArr = [];
            this.defaultArr1 = [];
            this.defaultArr2 = [];
            this.treeLoadData  =[];
            this.isExpand = false;
            this.tree = [];
            this.tree1 = [];
            this.chooseArr = {};
            this.searchTreeShow = false;
            this.treeFilters = {
                title:''
            };
            this.fondData = {

            };
            this.fondTreeName = {
                name:'所有部门案卷库',
                id:''
            };
            this.defaultPropsSerch = {
                label: 'newName',
                id: 'id',
                isLeaf: 'hasChildren'
            };
            this.defaultPropsSerch1 = {
                label: 'newName',
                id: 'id',
                isLeaf: 'hasChildren'
            };
            this.node1={};
            this.resolve1={};
            this.centerDialogVisibejob = false;
            this.titleNode = '';
            this.checkProcess = '';
            this.checkProcessTrue = true;
        };
        radioClick(){

        }
        handleClick(data){
           
        }
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
        handleNodeClick(data){//点击子节点
             this.oaPerson(data.orgID);
        }
        handleNodeClick1(node){
            console.log(node)
            this.rightTreeLoading = true;
            this.fondsId = node.id.toString();
            this.fondNames= node.fondName;
            console.log(typeof this.fondsId)
            Service.getArchiveTreeListByFondsId({fondId:this.fondsId,nodeName:this.rightFondName}).then(res=>{
                if(res.data.succeeded == true){
                    this.rightData = res.data.data;
                    this.rightTreeLoading = false;
                }else{
                    this['$message']({
                        message: '组织架构列表加载失败。',
                        type: 'error'
                    });
                }
            })

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
                        message: '组织架构列表加载失败。',
                        type: 'error'
                    });
                    this.comLoading = false;
                }
            });
        };
        getCheckedNodes(leafOnly, includeHalfChecked){
                let leftCheckedTree = this.fondsId;
                let rightCheckedTree = this['$refs'].treeForm['getCheckedNodes']();
                this.leftIds = [];
                let nameList = [];
                  let parentName = ''
                let parentIds
                let lens 
                console.log(leftCheckedTree)
                console.log(rightCheckedTree)
                if(rightCheckedTree.length>0){
                    parentIds = rightCheckedTree[0].parentId;
                    console.log(this.rightData)
                    for(var i=0;i<this.rightData.length;i++){
                        if(this.rightData[i].id ==parentIds ){
                            parentName=this.rightData[i].nodeName;
                            lens = this.rightData[i].children.length
                        }
                    }

                }
                if(rightCheckedTree.length == 0){
                     this['$message']({
                            message: '请选择权限范围。',
                            type: 'warning'
                        });
                    this.quanxianFanwei = true;
                  
                }else{
                    for(let child of rightCheckedTree){
                    this.leftIds.push({foundId:this.fondsId,archivTreeId:child.id,foundName:this.fondNames,archivTreeName:child.nodeName,parentId:child.parentId});
                    nameList.push(child.nodeName);
                    }

                // if(rightCheckedTree.length == 0){
                //     this.basicForm.quanxian = this.fondNames;
                // }else{
                //     if(rightCheckedTree.length == lens){
                //         this.basicForm.quanxian = this.fondNames+"【"+nameList.join("，")+"】"
                //     }else{
                //          this.basicForm.quanxian = this.fondNames+"【"+parentName+'，'+nameList.join("，")+"】"
                //     }
                    
                // }
                console.log(nameList)
                for(let child of rightCheckedTree){
                    this.parentids = child.parentId;
                }
                if(this.parentids == 0){
                   
                }else{
                    this.treeList = this.leftIds;
                }
                console.log(this.rightData)
                Service.findArchiveTreeByID({
                    archiveTreeId:this.parentids.toString()
                }).then(res=>{

                })
                 for(let child of rightCheckedTree){
                    this.parentids = child.parentId;
                }
                 var arr=[]
                for(var i = 0; i< rightCheckedTree.length; i++){
                    // if(rightCheckedTree[i].nodeName.indexOf('-案卷库')!==-1){
                    //     arr.push(rightCheckedTree[i].nodeName)
                    // }
                     if(rightCheckedTree[i].parentId!==0){
                        arr.push(rightCheckedTree[i].nodeName)
                    }
                }
                this.basicForm.quanxian = this.fondNames+"【"+arr.join("，")+"】"
                    //this.basicForm.quanxian = this.fondNames+"【"+nameList.join("，")+"】"
                    this.treeList = this.leftIds;
                    this.quanxianFanwei = false;
                    console.log(this.leftIds)
                }
                
                // this.fondMove.children = leftIds.join(",");
                // this.fondMove.parentId = rightCheckedTree[0].id;

                // Service.fondsMove(this.fondMove).then((res) =>{
                //     if(res.data.succeeded){
                //           Service.getAllFondsTreeData({}).then((res) =>{
                //               if(res.data.succeeded){
                //                   this.leftData = res.data.data;
                //               }else{
                //                   this['$message']({
                //                       message: '树节点数据错误。',
                //                       type: 'error'
                //                   });
                //               }
                //           });
                //     }
                // });
            }
        //全宗迁移（左边放大镜）
            leftFond(){
                this.leftTreeLoading = true;
                Service.getAllFondsTreeData({}).then((res) =>{
                    if(res.data.succeeded){
                        this.leftData = res.data.data;
                        this.defaultLeftOpen = [];
                        this.defaultLeftOpen.push(this.leftFondForm.id);
                        this.leftTreeLoading = false;
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                        this.leftTreeLoading = false;
                    }
                });
            }
            //权限范围（右边放大镜）
            rightFond(){
                // this.rightTreeLoading = true;
                // Service.getAllFondsTreeData({}).then((res) =>{
                //     if(res.data.succeeded){
                //         this.leftData = res.data.data;
                //         this.defaultRightOpen = [];
                //         this.defaultRightOpen.push(this.rightFondForm.id);
                //         this.rightTreeLoading = false;
                //     }else{
                //         this['$message']({
                //             message: '树节点数据错误。',
                //             type: 'error'
                //         });
                //         this.rightTreeLoading = false;
                //     }
                // });
                Service.getArchiveTreeListByFondsId({fondId:this.fondsId,nodeName:this.rightFondName}).then(res=>{
                    if(res.data.succeeded == true){
                        // this.rightFondTree = true;
                        this.rightData = res.data.data;
                        this.rightTreeLoading = false;
                    }else{
                        this['$message']({
                            message: '组织架构列表加载失败。',
                            type: 'error'
                        });
                    }
                })
            }
        back():void{
            //this['$router'].push({
            //    path:'/selfTip/transfer',
            //})
            this['$router'].go(-1);
        };
        closeDone(){//确认关闭
            Service.getRecordById({
                id:this.shenId.toString()
            }).then(res=>{
                if(res.data.succeeded == true){
                    if(res.data.data.archivist.status == 3){
                            this.centerDialogVisibejob = true;
                            this.titleNode = '';
                    }else if(res.data.data.archivist.status == 4){
                        this['$message']({
                            message: '当前业务已关闭。',
                            type: 'warning'
                        });
                    }
                }
            })
            //  this.centerDialogVisibejob = true;
            //  this.titleNode = '';
            // this['$confirm']('您确定要关闭此条记录？', {
            //         type: 'warning'
            //     }).then(() => {
            //        Service.shutdown({
            //             archivistId:this.shenId.toString()
            //         }).then(res=>{
            //             if(res.data.succeeded == true){
            //                 // this['$router'].push({
            //                 //     path:'/selfTip/transfer',
            //                 // })
            //                 this['$router'].go(-1);
            //             }
            //         })
            //     });

        }
        centerDialogVisibejobEvent(){
            Service.shutdown({archivistId:this.shenId.toString(),closeSign:this.titleNode}).then(res=>{
                      if(res.data.succeeded == true){
                          this.centerDialogVisibejob = false;
                        // this['$router'].push({
                        //     path:'/selfTip/transfer'
                        // })
                        if(this.sign == 0){
                            this['$router'].go(-1);
                        }else{
                            window.close();
                        }

                      }
                })
        }
        fondClick(){

        }
        selsChange(list:any = {}){
            this.list = list;
        };
        selsChange1(list:any = {}){
            this.list1 = list;
        };
        submitForm1(){//权限范围 确定
            this.quanxianFanwei = false;
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
        //权限范围
        chooseFanwei(){
            this.quanxianFanwei = true;
            //  Service.getLogonUserRelatedFonds({}).then((res) =>{
            //      console.log(res.data.data)
            //         if(res.data.succeeded){
            //             this.leftData = res.data.data;
            //         }else{
            //             this['$message']({
            //                 message: '树节点数据错误。',
            //                 type: 'error'
            //             });
            //         }
            //     });
            
            this.treeInt();
            Service.getUserInfo({}).then(res=>{
                if(res.data.succeeded){
                    this.logonFondCode = res.data.data.LogonFondCode
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        
          
            // this.logonFondCode = window.sessionStorage.getItem('LogonFondCode');
            // alert(this.logonFondCode)    
        }
       
        // 点击选择审批人
        choosePerson():void{
            this.peopleVisible = true;
            this.userPeople();
            if(!this.auditDisplay.auditIds){
                this.nameList();
                this.node1.childNodes = [];
                this.loadNode(this.node1,this.resolve1);
            }
        };

        // 懒加载树
        loadNode(node,resolve) {
            if(node.level === 0){
                this.node1= node;
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
            //点击审批人 查询
            Service.selectAuditprocess({processId:"13"}).then(res=>{
                if(res.data.succeeded){
                  if(res.data.data == null){
                    this.checkProcess = '审批人员未配置，流程无法发起。请联系管理员。'
                    this.checkProcessTrue = false;
                    }else{
                        this.checkProcessTrue = true;
                        this.checkProcess = '';
                        let data = res.data.data;
                        var forward
                        var additionalSignature
                        console.log(res.data);
                        for(var ind of data){
                        if(ind.auditUserName){
                            if(ind.forward == true){
                                forward=1
                            }else if(ind.forward == false){
                                forward=0
                            }
                            if(ind.additionalSignature == true){
                                additionalSignature = 1;
                            }else if(ind.additionalSignature == false){
                                additionalSignature = 0;
                            }
                            this.dataCompany.push({ leafName:ind.name,name:ind.auditUserName,select:ind.select,step: ind.step,auditUserId:ind.auditUserId,roleId: ind.roleId,forward:forward,additionalSignature:additionalSignature})
                        }else{
                            if(ind.forward == true){
                                forward=1
                            }else if(ind.forward == false){
                                forward=0
                            }
                            if(ind.additionalSignature == true){
                                additionalSignature = 1;
                            }else if(ind.additionalSignature == false){
                                additionalSignature = 0;
                            }
                            this.dataCompany.push({ leafName:ind.name,name:'',select:ind.select,step: ind.step,auditUserId:ind.auditUserId,roleId: ind.roleId,forward:forward,additionalSignature:additionalSignature })
                        }
                            //this.dataCompany.push({ leafName:ind.name,name:'',select:ind.select})
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
                if(com.name && com.select){
                    com.name = '';
                    delete com.userID;
                }
            }
        };

        // 右转左
        rightToLeft(){
            let data = this.oaClickRowName1;
            for(let com of this.dataCompany){
                if(data.userID===com.userID && com.select){
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
                    if(!com.name && com.select){
                        com.name = data.fullName;
                        com.userID = data.userID;
                        com.auditUserId = data.userID;
                        break;
                    };
                    console.log(this.dataCompany)
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

              // 递归查询的树
        leftTreeProps1(data){
            let that = this;
            data.forEach(function(item){
                item.newName = '['+item.fondCode+']'+item.fondName;
                if(item.id == that.treeFilters.title){
                    item.classColor = 'siteColor';
                }
                if(item.children&&item.children.length>0){
                    that.leftTreeProps1(item.children)
                }
            });
        }
        leftTreeProps2(data){
            let that = this;
            data.forEach(function(item){
                item.classColor = '';
                if(item.children&&item.children.length>0){
                    that.leftTreeProps2(item.children)
                }
            });
        }
         // 递归初始化的树
        leftTreeProps(data){
            let that = this;
            data.forEach(function(item){
                item.newName = '['+item.fondCode+']'+item.fondName;
                if(item.fondCode == that.logonFondCode){
                    item.classColor = 'siteColor';
                }
                if(item.children&&item.children.length>0){
                    that.leftTreeProps(item.children)
                }
            });
        }
        // 展开列表
        handleNodeExpand(){
            console.log(document.querySelector(".is-expanded"));
        }
           // 点击对应子集
        handleNodeClickSerch(data){
            console.log(data)
            this.rightTreeLoading = true;
            this.fondsId = data.id.toString();
            this.fondNames= data.fondName;
            if(this.sign == 0){
                this.fondsId = data.id.toString();
            }else{
                this.fondsId = this.parameTwo
            }

            Service.getArchiveTreeListByFondsId({fondId:this.fondsId,nodeName:this.rightFondName}).then(res=>{
                if(res.data.succeeded == true){
                    this.rightData = res.data.data;
                    this.rightTreeLoading = false;
                }else{
                    this['$message']({
                        message: '组织架构列表加载失败。',
                        type: 'error'
                    });
                }
            })



            this.isExpand = !this.isExpand;
            data.isExpand = this.isExpand;
            if(data.className === 'fa fa-plus-square-o'){
                data.className = 'fa fa-minus-square-o';
            }else if( data.className === 'fa fa-minus-square-o'){
                data.className = 'fa fa-plus-square-o';
            }
            if(data.srcName === 'static/imgs/allTree/folderClose.png'){
                data.srcName = 'static/imgs/allTree/folderOpen.png';
            }else if( data.srcName === 'static/imgs/allTree/folderOpen.png'){
                data.srcName = 'static/imgs/allTree/folderClose.png';
            };
            if(this.lazyTreeShow){
                if(data.id!==this.defaultArr1[0]){
                    this.leftTreeProps2(this.treeLoadData);
                }
            }else{
                if(data.id!==this.defaultArr[0]){
                    this.leftTreeProps2(this.treeLoadData);
                }
            }
            this.fondData = data;
            // if(data.hasChildren){
            this.superFilterShow = false;
            this.superTableShow = true;
            // 获取下拉框条目
            Service.getFondTree(data.id).then((res) =>{
                if(res.data.succeeded){
                    if(res.data.data||res.data.data!==[]){
                        let arr = [{
                            containsAnJuan: true,
                            id: 0,
                            kindId: 0,
                            nodeName: "所有部门案卷库",
                            parentId: 0,
                            nodeType:1,
                            children:[]
                        }];
                        this.tree1 = [...arr,...res.data.data];
                        this.getTreeName1(this.tree1);
                    }else{
                        this.tree1 = [];
                    }
                }else{
                    this['$message']({
                        message: '查询档案分类树失败。',
                        type: 'error'
                    });
                }
            });
            this.fondTreeName.name = '所有部门案卷库';
            if(this.fondTreeName.name === '所有部门案卷库'){
                // this.getHeaderAll(data);
            }
            // }
        };
             // 递归节点 增加className
        getTreeName1(tree){
            for(let grass of tree){
                if(grass.nodeType===1){
                    grass.className = 'fa fa-plus-square-o';
                    grass.srcName = 'static/imgs/allTree/fileTreeTitle.png';
                    grass.marginLeft = '0';
                    this.getTreeName(grass.children);
                }else if(grass.nodeType===2){
                    grass.srcName = 'static/imgs/allTree/folderFiles.png';
                    grass.marginLeft = '5px';
                }
            }
        };

         // 递归节点 增加子集节点的样式
        getTreeName(tree){
            for(let grass of tree){
                if(grass.children&&grass.children.length>0){
                    grass.className = 'fa fa-plus-square-o';
                    grass.srcName = 'static/imgs/allTree/folderClose.png';
                    grass.marginLeft = '5px';
                    this.getTreeName(grass.children);
                }else{
                    grass.srcName = 'static/imgs/allTree/folderFiles.png';
                    grass.marginLeft = '17px';
                }
            }
        };
        // 递归展开树
        expandLogin(data){
            for(let da of data){
                if(this.logonFondCode===da.fondCode){
                    this.defaultArr1.push(da.id);
                    this.defaultArr2.push(da.parentId);
                    this.chooseArr = da;
                }
            }
            if(this.defaultArr1.length===0){
                for(let da of data){
                    if(da.children&&da.children.length>0){
                        this.expandLogin(da.children)
                    }
                }
            }
        }

        // 递归展开查询树
        expandLogin1(data){
            for(let da of data){
                if(this.defaultArr[0]===da.id){
                    this.defaultArr2.push(da.parentId);
                    this.chooseArr = da;
                }
            }
            if(this.defaultArr2.length===0){
                for(let da of data){
                    if(da.children&&da.children.length>0){
                        this.expandLogin1(da.children)
                    }
                }
            }
        }
          // 递归节点 增加子集节点的样式
        defaultExpand(data){
            for(let da of data){
                if(da.children&&da.children.length>0){
                    if(this.defaultArr2[0]===da.id){
                        da.isExpand = this.isExpand;
                        da.className = 'fa fa-minus-square-o';
                        da.srcName = 'static/imgs/allTree/folderOpen.png';
                        if(da.parentId!=0){
                            this.defaultArr2[0] = da.parentId;
                            this.defaultExpand(this.treeLoadData);
                        }
                    }
                    this.defaultExpand(da.children)
                }
            }
        }
        // 自定义节点图标
        renderContentserch(createElement, { node, data }){
              return createElement(
                'span',
                {
                    attrs:{
                        'class':'custom-tree-node',
                    },
                    style:{
                        'padding': '11px 0',
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
                                'font-size': '16px',
                                'float':'left',
                                'margin-top': '0px'
                            }
                        },
                    ),
                    createElement(
                        'img',
                        {
                            attrs:{
                                'src':data.srcName
                            },
                            style:{
                                'margin': '-1px 5px 0 0',
                                'float': 'left',
                                'width': '19px',
                                'margin-left':data.marginLeft
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-left':'2px'
                            },
                            attrs:{
                                'class':data.classColor
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ]
            )
        }
        // 左侧顶部检索
        enterSearch(){
            this.isExpand = false;
            this.superFilterShow = true;
            this.superTableShow = false;
            this.fondTreeName = {
                name:'所有部门案卷库',
                id:''
            };
            this.data = [];
            this.lazyTreeShow = false;
            this.searchTreeShow = true;
            this.nameLoading = true;
            Service.getKeyTree(this.treeFilters.title).then((res) =>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    console.log(data)
                    this.leftTreeProps1(data);
                    this.getTreeName(data);
                    this.defaultArr = [this.treeFilters.title];
                    this.defaultArr2 = [];
                    this.treeLoadData = data;
                    this.expandLogin1(data);
                    this.defaultExpand(data);
                    this.nameLoading = false;
                    this.handleNodeClickSerch(this.chooseArr);
                }else{
                    this.nameLoading = false;
                    this['$message']({
                        message: '查询全宗树失败。',
                        type: 'error'
                    });
                }
            });
        };
        // 初始化树
        treeInt(){
            this.nameLoading = true;
            Service.getKeyTree({}).then((res) =>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    this.leftTreeProps(data);
                    this.getTreeName(data);
                    // 默认展开节点
                    this.defaultArr1 = [];
                    this.defaultArr2 = [];
                    this.treeLoadData = data;
                    this.expandLogin(data);
                    this.defaultExpand(data);
                    this.nameLoading = false;
                    this.handleNodeClickSerch(this.chooseArr);
                }else{
                    this.nameLoading = false;
                    this['$message']({
                        message: '查询全宗树失败。',
                        type: 'error'
                    });
                }
            });
        }

     // 远程搜索项目
        remoteMethod(query) {
               if (query !== '') {
                this.searchLoading = true;
                Service.getKeyName(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.searchOptions = data.map(item => {
                            return { value: item.id, label: '['+item.fondCode+']'+item.fondName};
                        });
                        setTimeout(() => {
                            this.searchLoading = false;
                            this.searchOptions = this.searchOptions.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
                        this['$message']({
                            message: '查询全宗联想错误。',
                            type: 'error'
                        });
                    }
                });

            } else {
                this.searchOptions = [];
            }
        }



        // 提交借阅申请
        applySubmit(form,form1){
            this['$refs'][form]['validate']((valid)=>{
                this['$refs'][form1]['validate']((valid)=>{})
                if (this.auditDisplay.auditIds == ''){
                    this.Warn("请选择审批人。")
                }else if(this.auditDisplay.Signature == ''){
                    this.Warn("请填写签字意见。")
                }else{
                        if(valid){
                        var CCarr = [];
                        for(var item of this.dataChao){
                            console.log(item)
                            CCarr.push(item.userID)
                        };
                       
                        var CCstr
                        if(CCarr.length!=0){
                           CCstr = CCarr.join(',')
                             
                        }else{
                            CCstr =this.initdataChao.join(',');
                        }
                        var Auditarr = [];
                        var brrr= [];
                        console.log(this.dataCompany)
                        for(var item of this.dataCompany){
                            Auditarr.push({stepName:item.leafName,setp:item.step,auditUserId:item.auditUserId,roleId:item.roleId,auditfullName:item.name,forward:item.forward,additionalSignature:item.additionalSignature})
                        };
                        console.log(this.dataCompany)
                        console.log(Auditarr)
                        console.log(brrr)
                         var auditStr = Auditarr.join(',')
                        var NumArr = [];
                        for(var ind of this.data){
                            NumArr.push(ind.id)
                        }
                        var auditStr = Auditarr.join(',')
                        Service.modify({
                            applyPartId:1,//部门id
                            applyReason:this.basicForm.things,
                            title:this.basicForm.title,
                            applyTime:this.basicForm.date,
                            copyPeople:CCstr,
                            approver:Auditarr,
                            sign:this.auditDisplay.Signature,
                            role:"1",
                            treeList:this.treeList,
                            type:"0",
                            id:this.shenId
                        }).then(res=>{
                            if(res.data.succeeded){
                                if(res.data.data == 'false'){
                                    this.getError('该代办已被办理！')
                                }else{
                                        this['$confirm']('档案员权限申请发起成功。', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        showCancelButton:false,
                                        type: 'info'
                                    }).then(()=>{
                                    if(this.sign == 0){
                                        this['$router'].go(-1)
                                    }else{
                                        window.close();
                                    }

                                    })
                                }
                                // this['$confirm']('档案员权限申请发起成功。', '提示', {
                                //     confirmButtonText: '确定',
                                //     cancelButtonText: '取消',
                                //     showCancelButton:false,
                                //     type: 'info'
                                // }).then(()=>{
                                // if(this.sign == 0){
                                //     this['$r outer'].go(-1)
                                // }else{
                                //     window.close();
                                // }

                                // })
                            }else{
                                this.getError(res.data.errorMessage);
                            }
                        });
                    }else{
                        this.Warn("请完善基本信息。")
                    };
                }
            });
        };

        // 审批人确定
        chooseDone(){
           this.peopleVisible = false;
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
                    let arrs = [];
                    let nameArr = [];
                    for(let item of arr){
                            arrs.push(item.userID);
                            nameArr.push(item.name);
                    };
                    console.log(nameArr)
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
            console.log(this.dataCompany)
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
            var i = 0;
            for(let ind of data){
                if(ind.userID==row.userID){
                    i = 1;
                };
            };
            if(i==0){
                for(let com of data){
                    if(!com.name && com.select){
                        com.name = row.fullName;
                        com.auditUserId = row.userID;
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
                this.node1.childNodes = [];
                this.loadNode(this.node1,this.resolve1)
                this.dataOa = [];
                this.checkNameForm.checkName = '';
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

        //获取用户信息
        getUserInfo(params){
            Service.getUserInfo(params).then(res=>{
                if(res.data.succeeded){
                    this.basicForm.name = res.data.data.LogonUserFullName;
                    this.basicForm.company = res.data.data.LogonOrgName;
                    this.UserId =  res.data.data.LogonUserId
                    var myDate = new Date();
                    this.basicForm.date = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
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
        // Getquerycondition(params){
        //     Service.Getquerycondition(params).then(res=>{
        //         if(res.data.data.length>4){
        //             document.getElementsByClassName('tableContainer')[0]['style'].top='115px';
        //         }
        //         this.searchConfig = res.data.data;
        //         for(var item of res.data.data){
        //             this['$set'](this.searchForm,'value'+item.id,null)
        //         }
        //     })
        // }

        //搜索按钮
        beginSearch(){
          var arr = [];
          for(var key in this.searchForm){
              if(this.searchForm[key]!=null&&this.searchForm[key]!=''){
                  var str = key.slice(-1);
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
              this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchArr,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
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
            // treeChange(this.tree);
            // this.kindId = this['$route'].query.kind/1;
            // this.libId = this['$route'].query.lib/1;
            // this.fondId = this['$route'].query.fond/1;
            // console.log(this['$route'].query.ids,3333333)
            // for(var item of this['$route'].query.ids){
            //     this.IdArr.push(item/1)
            // }
            // this.getUserInfo({})
            // Service.getListConfig(this.libId).then(res=>{
            //     if(res.data.succeeded){
            //         this.tableArr=res.data.data;
            //         this.QueryFileTransferApply({libId:this.libId,ids:this.IdArr})
            //     }else{
            //         this.getError(res.data.errorMessage)
            //     }
            // })
            this.nameList()
            Service.getUserUrl({}).then(res=>{
                console.log(res.data.data)
                this.basicForm.name = res.data.data.LogonUserFullName;
                this.basicForm.company = res.data.data.LogonOrgName;
                // this.basicForm.date = new Date().toLocaleDateString();
                // alert(this.basicForm.date)
            });

            //OA跳转来的，从路径拿参数
            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("archivistId") > 0){
                this.sign = 1;
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

                    this.parameOne = b;
                    this.parameTwo = c;
                }
                this.marginSize = -50;
            }else{
                this.sign = 0;
                this.fanhui = true;
            }

        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };
            var str = ''
            var str1 = ''
            var str2 = ''
            if(this.sign == 0){
                this.shenId = JSON.parse(window.sessionStorage.getItem('SchaneShenTransDetail'))
            }else{
                this.shenId = this.parameOne;
            }

            Service.getRecordById({
                id:this.shenId.toString()
            }).then(res=>{
                if(res.data.succeeded == true ){
                    console.log(res.data.data)
                    this.allData = res.data.data;
                    this.basicForm.title = res.data.data.archivist.title;
                    this.auditDisplay.Signature = res.data.data.archivist.sign;
                    // initdataChao
                    let brr = [];
                    for(let item in res.data.data.copyPeopleList){
                        this.initdataChao.push(res.data.data.copyPeopleList[item].auditUserId)
                        brr.push(res.data.data.copyPeopleList[item].auditUserName)
                    }
                    this.auditDisplay.ccUserId = brr.join("，")
                    console.log(this.initdataChao)
                    //权限范围 提交数据
                    for(let item in res.data.data.archiveTreeReletions){
                        str = res.data.data.archiveTreeReletions[0].foundName;
                        str1+= ' ，'+res.data.data.archiveTreeReletions[item].archiveTreeName
                        this.leftIds.push({foundId:res.data.data.archiveTreeReletions[0].foundId,archivTreeId:res.data.data.archiveTreeReletions[item].archiveTreeId,foundName:res.data.data.archiveTreeReletions[0].foundName,archivTreeName:res.data.data.archiveTreeReletions[item].archiveTreeName,parentId:res.data.data.archiveTreeReletions[item].parentId})
                    }
                    str1=str1.slice(2,str1.length)
                    str2 = str+"【"+str1+"】";
                    this.basicForm.quanxian = str2;
                    this.basicForm.things = res.data.data.archivist.applyReason
                    this.treeList = this.leftIds;
                    this.dataDetail = res.data.data.allProcessList;
                    this.basicForm.date = moment(res.data.data.archivist.applyTime).format("YYYY-MM-DD")

                    
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