<template>
    <section>
        <div class="mainTitle">
            档案员变更申请
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
                        <el-form-item label="标题：" ref="title" prop="title" >
                            <el-input class="checkName percentName" v-model.trim="basicForm.title"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="原申请人：" ref="name" class="lt" prop="name">
                            <el-input class="checkName percentName"  readOnly v-model="basicForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company">
                            <el-input class="checkName percentName"  readOnly v-model="basicForm.company"></el-input>
                        </el-form-item>
                        <el-form-item label="申请时间：" ref="date" class="lt basicItem" prop="date">
                            <el-input class="checkName percentName" readOnly v-model="basicForm.date"></el-input>
                        </el-form-item>
                    </div>
                      <div class="formItem topTitle">
                        <el-form-item label="变更后档案员：" class="checkThings" ref="changPerson" prop="changPerson">
                            <el-input class="checkName percentName" v-model="basicForm.changPerson" readOnly></el-input>
                             <el-button class="checkWay choosePerson" @click="changPersonChoose"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="evenTitle">
                        <el-form-item class="things" label="变更事由：" ref="things"  prop="things">
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
                        <el-form-item class="checkThings" label="选择上级审批人"  prop="auditIds">
                            <el-input class="checkName percentName" v-model="auditDisplay.auditIds" readOnly></el-input>
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
                            <el-input class="checkName percentName" type="textarea" v-model.trim="auditDisplay.Signature" maxlength="1000" placeholder="最多填写1000个字"></el-input>
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
                                    <span v-if="scope.row.businesstype === '4'">转发批注</span>
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
        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true" :before-close="handleClose2">
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
                            <el-table tooltip-effect="dark" @row-click="oaClickRow" @row-dblclick="dblNameRow" :height = "oaHeight" stripe :data="dataOa"  v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="peopleVisible = false;loadNode(node1,resolve1);node1.childNodes = [];dataOa = [];checkNameForm.checkName = '';">取消</el-button>
                <el-button class="checkWay" @click="chooseDone" >确定</el-button>
            </div>
        </el-dialog>
        <el-dialog class="checkModal" title="选择抄送人" :visible.sync="writorVisible" :close-on-click-modal="true" :before-close="handleClose3">
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

            <el-dialog class="fixModalArea" title="权限范围" :visible.sync="quanxianFanwei" :close-on-click-modal="true">
                <div class="scrollCon formDiv">
                    <div class="tableCon">
                        <div class="left" style="width:50%;float:left">
                        <span style="line-height:20px;padding-left:5px">选择权限范围</span>
                            <div class="treeTitle thisTitle">
                                <el-form :inline="true" :model="leftFondForm" class="topParamsForm superLeftForm">
                                    <el-form-item class="title" label="" ref="name">
                                        <el-select class="checkName" v-model="leftFondForm.id" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethod" :loading="searchLoading">
                                            <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-button class="checkWay">
                                        <i class="fa fa-search thisBig" @click="leftFond"></i>
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
                                     :render-content="renderContent">
                            </el-tree>
                        </div>
                        <div class="right" style="width:50%;float:left">
                            <span style="line-height:20px;padding-left:5px">选择权限范围</span>
                            <div class="treeTitle thisTitle">
                                <el-form :inline="true" :model="rightFondForm" class="topParamsForm superLeftForm" style="margin-left:5px">
                                    <el-form-item class="title" label="" ref="name">
                                        <el-form-item class="title" label="" ref="name">
                                            <el-select class="checkName" v-model="rightFondForm.id" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethod" :loading="searchLoading">
                                                <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-button class="checkWay">
                                                <i class="fa fa-search thisBig" @click="rightFond"></i>
                                            </el-button>
                                            
                                        </el-form-item>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-tree node-key="id"
                                     ref="treeForm"
                                     :data="rightData"
                                     :props="defaultPropsRight"
                                     show-checkbox
                                     v-loading="rightTreeLoading"
                                     :default-expanded-keys="defaultRightOpen"
                                     @check-change="handleClick"
                                     @node-click="radioClick"
                                     check-strictly = "true"
                                     :render-content="renderContent">
                            </el-tree>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer diaFoot">
                    <el-button type="primary" class="checkWay" @click="getCheckedNodes(leafOnly, includeHalfChecked)">确定</el-button>
                </div>
            </el-dialog>

        <!-- 变更后审批人  选择 -->
         <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible1" :close-on-click-modal="true" :before-close="handleClose1">
            <div class="checkCon">
                <el-row style="height:100%">
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopLeft checkTop">
                            <div class="topCheckCon">
                                <el-form :model="checkNameForm" class="topParamsForm" label-width="115px" ref="cell" @submit.native.prevent>
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
                                         @node-click="handleNodeClick3"
                                         :render-content="renderContent">
                                </el-tree>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12" style="height:49%">
                        <div class="checkArea checkTopRight checkTop">
                            <div class="topCheckCon">
                                <label>常用联系人</label><span>(双击选择)</span>
                                <span class="rt" style="color:#3c78d4;cursor:pointer;">全部清除</span>
                            </div>
                            <div class="topCheckTree" style="padding:0">
                                <el-table border  @row-dblclick="dblNameRowShen"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table border tooltip-effect="dark" @row-click="oaClickRow1" :height = "oaHeight" stripe :data="dataOas" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="peopleVisible1= false;loadNode(node1,resolve1);node1.childNodes = [];dataOas = [];checkNameForm.checkName = ''">取消</el-button>
                <el-button class="checkWay" @click="chooseDone2" >确定</el-button>
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
    import Service from './changPersonTransDetail.service';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    import base from '@/scrollLoad';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        leftFondForm: any = {};
        checkFilters: any = {};
        dataDetail:any = [];
        timer: boolean;
        listLoading: boolean;
        peopleVisible: boolean;
        peopleVisible1 : boolean;
        peopleVisible0 :boolean;
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
        tree: any = [];
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
        dataOa:any = [];
        dataOas : any = [];
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
        defaultRightOpen :any = [];
        searchOptions: any = [];//远程搜索条目
        UserId:number;
        Signature:string;
        searchLoading: boolean;
        fondMove : any = {};
        fondsId :  string;
        treeList : any = [];
        shenperson : string;
        shenBumen : string;
        shenTime : string;
        personId:number;
        allData: any = {};
        node1:any = {};
        resolve1:any = {};
        sign: number;
        parameOne: string;
        marginSize:number;
        fanhui:boolean;
        centerDialogVisibejob:boolean;
        titleNode:string;
        initdataChao:any = []
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280 ;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.nameHeight = null;
            this.timer = false;
            this.shenperson ='';
            this.shenBumen = '';
            this.shenTime = '';
            this.peopleVisible = false;
            this.peopleVisible0 = false;
            this.peopleVisible1 = false;
            this.quanxianFanwei = false;
             this.searchLoading = false;
            this.writorVisible = false;
            this.tableVisible = false;;
            this.rightTreeLoading = false;
            this.leftTreeLoading = false;
            this.sign = 0;
            this.marginSize = 0;
            this.fanhui = false;
            this.allData = {};
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 10;
            this.listLoading = false;
            this.list = [];
            this.list1 = [];
            this.dataDetail = []
            this.treeLoading = false;
            this.dataOa = [];
            this.dataOas = [];
            this.initdataChao = [];
            this.checkNameForm = {
                checkName:''
            };
            this.checkFilters={

            }
            this.oaClickRowName = {
                uName:'',
                uid:'',
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
                quanxian:'',
                changPerson:''
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
                ],
                changPerson:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ]
            };
            this.sign = 0;
            this.parameOne = '',
            this.marginSize = 0;
            this.fanhui = false;
            this.data =  [];
            this.treeList = [];
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
            // this.oaClickRowName = {};
            this.oaClickRowName1 = {};
            this.dataChao = [];
            this.auditDisplay.Signature="";
            this.fondsId = '';
            this.node1 = {};
            this.resolve1 = {};
            this.centerDialogVisibejob = false;
            this.titleNode = ''
        };
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
        closeDone(){//确认关闭
            Service.getRecordById({
                id:this.personId.toString()
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
            // this['$confirm']('您确定要关闭此条记录？', {
            //         type: 'warning'
            //     }).then(() => {
            //        Service.shutdown({
            //             archivistId:this.personId.toString()
            //         }).then(res=>{
            //             if(res.data.succeeded == true){
            //                 //this['$router'].push({
            //                  //   path:'/selfTip/transfer',
            //             //})
            //             this['$router'].go(-1);
            //             }
            //         })
            //     });
        }
        centerDialogVisibejobEvent(){
            Service.shutdown({archivistId:this.personId.toString(),closeSign:this.titleNode}).then(res=>{
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
        changPersonChoose(){//选择变更后档案员
            this.peopleVisible1 = true;
            this.userPeople();
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1);
            

        }
        // 点击左侧OA表格行（单选）
        oaClickRow1(row){
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
        }
        chooseDone2(){
            this.basicForm.changPerson = this.oaClickRowName.uName;
            this.peopleVisible1 = false;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
            this.dataOas = [];
            this.checkNameForm.checkName = '';
            this.CsaveContacts(this.oaClickRowName.uid);
        };
        radioClick(){

        }
        handleClick(data){
           
        }
        handleNodeClick(data){//点击子节点
             this.oaPerson(data.orgID);
        }
        handleNodeClick3(data){//点击子节点
             this.oaPersons(data.orgID);
        }
        handleNodeClick1(node){
            console.log(node)
            this.rightTreeLoading = true;
            this.fondsId = node.id.toString();
            console.log(typeof this.fondsId)
            Service.getArchiveTreeListByFondsId({fondId:this.fondsId}).then(res=>{
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
        // 组织架构选人
        oaPersons(id){
            this.comLoading = true;
            Service.findOaList(id).then((res) =>{
                if(res.data.succeeded){
                    this.dataOas = res.data.data;
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
                let leftIds = [];
                let nameList = [];
                console.log(leftCheckedTree)
                console.log(rightCheckedTree)
                for(let child of rightCheckedTree){
                    leftIds.push({foundId:this.fondsId,archivTreeId:child.id});
                    nameList.push(child.nodeName);
                
                }
                this.basicForm.quanxian = nameList.join(",")
                this.treeList = leftIds;
                this.quanxianFanwei = false;
                console.log(leftIds)
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
                this.rightTreeLoading = true;
                Service.getAllFondsTreeData({}).then((res) =>{
                    if(res.data.succeeded){
                        this.leftData = res.data.data;
                        this.defaultRightOpen = [];
                        this.defaultRightOpen.push(this.rightFondForm.id);
                        this.rightTreeLoading = false;
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                        this.rightTreeLoading = false;
                    }
                });
            }
        back():void{
            //this['$router'].push({
            //    path:'/selfTip/transfer',
            //})
            this['$router'].go(-1);
        };
                    // 远程搜索项目
        remoteMethod(query) {
                if (query !== '') {
                    this.searchLoading = true;
                    Service.getKeyName(query).then((res) =>{
                        if(res.data.succeeded){
                            let data = res.data.data;
                            this.searchOptions = data.map(item => {
                                return { value: item.id, label: item.fondName};
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
             Service.getLogonUserRelatedFonds({}).then((res) =>{
                 console.log(res.data.data)
                    if(res.data.succeeded){
                        this.leftData = res.data.data;
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
                
        }
        // 点击选择审批人
        choosePerson():void{
            this.peopleVisible = true;
            this.userPeople();
            if(!this.auditDisplay.auditIds){
                this.nameList();
                this.node1.childNodes = [];
                this.loadNode(this.node1,this.resolve1);
                this.dataOa= [];
                this.checkNameForm.checkName = '';
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
        dblNameRowShen(row){//变更审批人  常用联系人 弹框
               console.log(row)
            console.log(this.dataOa)
           if(this.dataOas.length>0){
                let arr = [];
                for(let data of this.dataOas){
                    if(data.userID === row.userID){
                        arr.push(row.userID);
                    }
                }
                if(arr.length===0){
                    this.dataOas.unshift({
                        fullName:row.fullName,
                        userID:row.userID,
                        unitname:row.unitname,
                        jobname:row.jobname,
                    });
                }
            }else{
                this.dataOas.push({
                    fullName:row.fullName,
                    userID:row.userID,
                    unitname:row.unitname,
                    jobname:row.jobname,
                });
            
        }
            this.peopleVisible1 = false;
            this.node1.childNodes = [];
            this.dataOas = [];
            this.checkNameForm.checkName = '';
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
            this.basicForm.changPerson = this.oaClickRowName.uName;
            //回显
            let obj = {
                        userID:this.oaClickRowName.uid,
                        fullName:this.oaClickRowName.uName,
                        unitname:row.unitname,
                        jobname:row.jobname
                    };
            let attr = [];
            attr.push(obj);
            if(obj.fullName == ''){
                this.dataOas = [];
            }else{
                this.dataOas = attr;
            }
        }

        // 审批人角色
        nameList(){
            this.dataCompany = [];
            //点击审批人 查询
            Service.selectAuditprocess({processId:"13"}).then(res=>{
                if(res.data.succeeded){
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
                        this.dataCompany.push({ leafName:ind.name,name:ind.auditUserName,select:ind.select,step: ind.step,auditUserId:ind.auditUserId,roleId: ind.roleId,additionalSignature:additionalSignature, forward:forward})
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
                        this.dataCompany.push({ leafName:ind.name,name:'',select:ind.select,step: ind.step,auditUserId:ind.auditUserId,roleId: ind.roleId,additionalSignature:additionalSignature, forward:forward })
                    }
                        //this.dataCompany.push({ leafName:ind.name,name:'',select:ind.select})
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

        // 提交借阅申请
        applySubmit(form,form1){
            this['$refs'][form]['validate']((valid)=>{
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
                        for(var item of this.dataCompany){
                            Auditarr.push({stepName:item.leafName,setp:item.step,auditUserId:item.auditUserId,roleId:item.roleId,auditfullName:item.name,additionalSignature:item.additionalSignature, forward:item.forward})
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
                        this['$refs'][form1]['validate']((valid)=>{})
                        if(this.auditDisplay.auditIds == ''){
                              this.Warn("请选择审批人。")
                        }else if(this.auditDisplay.Signature == ''){
                              this.Warn("请填写签字意见。")
                        }else{
                                Service.modify({
                                applyPartId:1,//部门id
                                applyReason:this.basicForm.things,
                                title:this.basicForm.title,
                                applyTime:this.basicForm.date,
                                copyPeople:CCstr,
                                approver:Auditarr,
                                sign:this.auditDisplay.Signature,
                                role:"1",
                                type:1,
                                changeUserId:this.oaClickRowName.uid,
                                changeUserName:this.oaClickRowName.uName,
                                id:this.personId
                            }).then(res=>{
                                if(res.data.succeeded){
                                    if(res.data.data == 'false'){
                                        this.getError('该代办已被办理！')
                                    }else{
                                        this['$confirm']('档案员变更申请发起成功。', '提示', {
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
                              
                                }else{
                                    this.getError(res.data.errorMessage);
                                }
                            });
                        }
                       
                }else{
                    this.Warn("请基本完善信息。")
                };
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
                            arrs.push(item.auditUserId);
                            nameArr.push(item.name);
                    };
                    console.log(nameArr)
                    if(arrs.length>0){
                        this.auditDisplay.auditIds = nameArr.join("->");
                        var str = arrs.join(",");
                        this.addLinkMan(str);
                        this.node1.childNodes = [];
                        this.loadNode(this.node1,this.resolve1);
                        this.dataOa=[];
                        this.checkNameForm.checkName = ''
                        var str1 = arrs.join()
                        this.CsaveContacts(str1);

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
                    this.dataOas = res.data.data;
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
            console.log(row)
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
                console.log(this.dataCompany)
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
                this.dataOa= [];
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
            this.peopleVisible1 = false;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
            this.dataOas = [];
            this.checkNameForm.checkName = '';
        }
        handleClose2(){
            this.peopleVisible = false;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
            this.dataOa= [];
            this.checkNameForm.checkName = '';
        }
        handleClose3(){
            this.writorVisible = false;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
            this.dataOa= [];
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
            Service.getUserUrl({}).then(res=>{
                console.log(res.data.data)
                this.basicForm.name = res.data.data.LogonUserFullName;
                this.basicForm.company = res.data.data.LogonOrgName;
                this.basicForm.date = new Date().toLocaleDateString();

            })

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
                    this.parameOne = b;
                }
                this.marginSize = -50;
            }else{
                this.sign = 0;
                this.fanhui = true;
            }

        };
        CsaveContacts(params){//常用联系人 确定调用
            Service.CsaveContacts(params).then(res=>{
                if(res.data.succeeded == true){
                    this.userPeople();
                }
                
            })
        }

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };

             if(this.sign == 0){
                 this.personId = JSON.parse(window.sessionStorage.getItem('PchangPersonTransDetail'));
             }else{
                 this.personId = this.parameOne;
             }
            Service.getRecordById({
                id:this.personId.toString()
            }).then(res=>{
                if(res.data.succeeded == true ){
                    console.log(res.data.data)
                    this.allData = res.data.data;
                    this.basicForm.title = res.data.data.archivist.title;
                    this.basicForm.changPerson = res.data.data.archivist.changeUserName;
                    this.basicForm.things = res.data.data.archivist.applyReason;
                    this.oaClickRowName.uName = res.data.data.archivist.changeUserName;
                    this.oaClickRowName.uid = res.data.data.archivist.changeUserId;
                    this.dataDetail = res.data.data.allProcessList;
                    this.basicForm.date = res.data.data.archivist.applyTime;
                    this.auditDisplay.Signature = res.data.data.archivist.sign;

                    let brr = [];
                    for(let item in res.data.data.copyPeopleList){
                        this.initdataChao.push(res.data.data.copyPeopleList[item].auditUserId)
                        brr.push(res.data.data.copyPeopleList[item].auditUserName)
                    }
                        this.auditDisplay.ccUserId = brr.join("，")
                        console.log(this.initdataChao)
                    
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