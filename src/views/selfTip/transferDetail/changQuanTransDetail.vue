<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            创建全宗申请
            <el-button v-show="fanhui" class="checkWay rt" @click="back">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">申请单号：{{quanData.processNo}}</div>
                <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" :rules="basicFormRules" ref="basicForm">
                    <div class="formItem topTitle">
                        <el-form-item label="标题：" ref="title" prop="title" label-width="120px" >
                            <el-input class="checkName percentName" v-model.trim="basicForm.title" maxlength="50" placeholder="最多填写50个字"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="申请人：" ref="name" class="lt" prop="name" label-width="120px" >
                            <el-input class="checkName percentName" readonly v-model="basicForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="申请人部门：" ref="company" class="lt basicItem" prop="company" label-width="120px">
                            <el-input class="checkName percentName" readonly v-model="basicForm.company"></el-input>
                        </el-form-item>
                        <el-form-item label="申请时间：" ref="createDate" class="lt basicItem" prop="createDate" label-width="120px">
                            <el-input class="checkName percentName" readonly v-model="basicForm.createDate"></el-input>
                        </el-form-item>
                    </div>
                    <div class="evenTitle">
                        <el-form-item class="things" label="创建事由：" ref="cause"  prop="cause" label-width="120px">
                            <el-input type="textarea" maxlength="1000" placeholder="最多填写1000个字" class="checkName percentName" v-model.trim="basicForm.cause"></el-input>
                        </el-form-item>
                    </div>
                <!-- </el-form> -->
            <!-- </div>
            <div class="mainCon basicList"> -->
                <div class="loanTipTitle">全宗信息</div>
                <!-- <el-form :model="basicForm" class="basicForm topParamsForm fileApplyForm" label-width="150px" ref="basicForm"> -->
                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item label="全宗号：" ref="name" class="lt" prop="name" label-width="150px">
                            <el-input class="checkName percentName" readonly="readonly" v-model="basicForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="全宗名：" ref="fondName" class="lt basicItem" prop="fondName" label-width="150px">
                            <el-input class="checkName percentName" v-model.trim="basicForm.fondName" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="上级公司：" ref="date" class="lt basicItem" prop="orgName" label-width="150px">
                            <el-input class="checkName percentName" readOnly v-model="basicForm.higherFondName"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="higherFond"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>

                    <div class="clear formItem evenTitle whiteTitle">
                        <el-form-item class="lt" label="万信对应公司：" ref="things" label-width="150px">
                            <el-input class="checkName percentName" v-model="basicForm.checkCompany"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="seniorWdorg"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="是否项目公司：" ref="isProjectCompany" label-width="150px">
                            <el-radio-group v-model="basicForm.isProjectCompany" @change="regionIsOrNot">
                              <el-radio disabled label="true">是</el-radio>
                              <el-radio disabled label="false">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="所属分区：" prop = 'region' ref="region" v-if="shiFouXianShi" label-width="150px">
                            <el-select class="checkName percentName" v-model="basicForm.region">
                                  <el-option v-for="item in dictListByDictId" :key="item.code" :label="item.displayText" :value="item.code">
                                  </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="lt basicItem" label="全宗类型：" ref="fondType" label-width="150px">
                            <el-radio-group v-model="basicForm.fondType">
                              <el-radio label='1'>集团</el-radio>
                              <el-radio label='2'>地方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="clear formItem evenTitle whiteTitle">
                        <!-- <el-form-item class="lt" :label="item.roleName+'：'" ref="things"  :key="index" v-for="(item,index) in roleSelect" :rules="[{required:true,message:'请填写',trigger:'blur'}]" :prop="'checkPeople'+index">
                            <el-input class="checkName percentName" readonly v-show="false" v-model="basicForm['check'+index]"></el-input>
                            <el-input class="checkName percentName" readonly v-model="basicForm['checkPeople'+index]"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="choosePerson1(index,item)"><i class="fa fa-search"></i></el-button>
                        </el-form-item> -->
                         <el-form-item class="lt" :label="item.roleName+'：'" :ref="'checkPeople'+index" :prop="'checkPeople'+index" :rules="[{required:true,message:'请填写',trigger:['blur','change']}]" v-for="(item,index) in roleSelect" :key="index" label-width="150px">
                            <el-input class="checkName percentName" readonly v-show="false" v-model="basicForm['bumen'+index]"></el-input>
                            <el-input class="checkName percentName" readonly v-show="false" v-model="basicForm['zhiwu'+index]"></el-input>
                            <el-input class="checkName percentName" readonly  v-show="false" v-model="basicForm['check'+index]"></el-input>
                            <el-input class="checkName percentName" readonly ref="'check'+index" v-model="basicForm['checkPeople'+index]"></el-input>
                            <el-button class="checkSearch choosePerson thisInp" @click="choosePerson1(index,item)"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                        <el-form-item class="checkThings" label="备注：" :model="basicForm" ref="basicForm" prop="comments" label-width="150px">
                            <el-input class="checkName percentName" placeholder="最多填写1000个字" v-model.trim="basicForm.comments" maxlength="1000" type="textarea"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    审批信息
                </div>
                <el-form  class="basicForm topParamsForm fileApplyForm" label-width="135px" :model="auditDisplay" :rules="auditDisplayRules" ref="auditDisplay">
                    <div class="formItem topTitle">
                        <el-form-item class="checkThings" label="选择审批人：" ref="auditNames" prop="auditNames">
                            <el-input readonly class="checkName percentName" v-model="auditDisplay.AppvoalUsers" v-show="false"></el-input>
                            <el-input readonly class="checkName percentName redFont" v-model="auditDisplay.auditNames"></el-input>
                            <el-button class="checkSearch choosePerson" :disabled="dBt" @click="choosePerson"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="formItem evenTitle whiteTitle" v-show="cc">
                        <el-form-item class="checkThings" label="选择抄送人：" prop="ccUserId">
                            <el-input readonly class="checkName percentName" v-model="auditDisplay.ccUserId" v-show="false"></el-input>
                            <el-input readonly class="checkName percentName" v-model="auditDisplay.ccUserName"></el-input>
                            <el-button class="checkSearch choosePerson" @click="chooseWritor"><i class="fa fa-search"></i></el-button>
                        </el-form-item>
                    </div>
                    <div class="topTitle">
                            <el-form-item class="checkThings" label="签字：" prop="AppvoalContext" ref="AppvoalContext" >
                                <el-input type="textarea" class="checkName percentName" placeholder="最多填写1000个字"  maxlength="1000" v-model.trim="auditDisplay.AppvoalContext"></el-input>
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
                            <el-table-column prop="stepName" label="审批节点">
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
                                    <span v-if="scope.row.auditResult === 5">提交审批</span>
                                    <span v-if="scope.row.auditResult === 6">批注</span>
                                    <span v-if="scope.row.auditResult === 7">关闭</span>
                                    <span v-if="scope.row.auditResult === 8">提交审批</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="stepUserName" label="接收人" width="120">
                            </el-table-column>
                        </el-table>
                </div>
                </div>
            </div>
            <div class="applyDone">
                <el-button class="checkWay" @click="applySubmit('basicForm','auditDisplay')">重新提交</el-button>
                <el-button class="checkWay" @click="backs">关闭流程</el-button>
            </div>

        </div>
        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人" :visible.sync="peopleVisible" :close-on-click-modal="true" :before-close="handleClose1">
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
                                <el-table border @row-dblclick="dblNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table border tooltip-effect="dark" @row-click="oaClickRow"  @row-dblclick="dblNameRow" stripe  :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="unitname" label="所属部门">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="jobname" label="职务">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="2" style="height:48%;margin-top:8%;">
                        <div>
                             <el-button @click="rightToLeft" type="primary" icon="el-icon-arrow-left" circle class="direction"></el-button>
                             <el-button @click="leftToRight" type="primary" icon="el-icon-arrow-right" circle class="direction"></el-button>
                             <!-- <el-button @click="allRightToLeft" type="primary" icon="el-icon-d-arrow-left" circle class="direction"></el-button>
                             <el-button @click="allLeftToRight" type="primary" icon="el-icon-d-arrow-right" circle class="direction"></el-button> -->
                        </div>
                    </el-col>
                    <el-col :span="11" style="height:48%;margin-top:1%;">
                        <div class="checkArea checkBottom checkBottomRight">
                            <el-table border tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="celldblClick" stripe  @selection-change="selsChange1" :data="dataCompany" highlight-current-row v-loading="listLoading" class="indexTable containTable">
                                <el-table-column :show-overflow-tooltip="true" prop="nodeName" label="节点名称">
                                </el-table-column>
                                <el-table-column :show-overflow-tooltip="true" prop="fullName" label="姓名">
                                </el-table-column>
                                <el-table-column v-if = "false" :show-overflow-tooltip="true" prop="userID" label="ID">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkDefault" @click="peopleVisible = false;loadNode(node1,resolve1);node1.childNodes = [];dataOa = [];checkNameForm.checkName=''">取消</el-button>
                <el-button class="checkWay" @click="chooseDone" >确定</el-button>
            </div>
        </el-dialog>

        <el-dialog v-dialogDrag class="checkModal" title="选择相关审批人11" :visible.sync="peopleVisible1" :close-on-click-modal="true" :before-close="handleClose3">
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
                                <el-table  border @row-dblclick="dblNameRow1"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table border tooltip-effect="dark" @row-click="oaClickRow1"  @row-dblclick="dblNameRow1" stripe :data="dataOas" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                <el-button class="checkDefault" @click="peopleVisible1 = false;loadNode(node1,resolve1);node1.childNodes = [];dataOa = [];checkNameForm.checkName = ''">取消</el-button>
                <el-button class="checkWay" @click="chooseDone1" >确定</el-button>
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
                                <el-table  border @row-dblclick="dbChaolNameRow"  :show-header = 'false' tooltip-effect="dark" stripe :data="dataName" highlight-current-row class="indexTable">
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
                            <el-table border tooltip-effect="dark" @row-click="chaoOaClickRow"  stripe :data="dataOa" highlight-current-row v-loading="comLoading" class="indexTable containTable">
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
                            <el-table border tooltip-effect="dark" @row-click="leafClickRow" @row-dblclick="cellChaodblClick"  stripe :data="dataChao" highlight-current-row class="indexTable containTable">
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
                <el-button class="checkDefault" @click="writorVisible = false;loadNode(node1,resolve1);node1.childNodes =[];dataOa = [];checkNameForm.checkName = ''">取消</el-button>
                <el-button class="checkWay" @click="chooseWritorDone" >确定</el-button>
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
    import Service from './quanZongChange.server';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    import base from '@/scrollLoad';
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
        dataChao: any = [];//抄送人数据
        auditDisplayRules:any = {};
        cc:boolean;
        nameHeight: number;
        treeParamsId: number;
        index: number;
        parameOne:number;
        qids:number;
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
        fanhui:boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        processId:number;
        marginSize:number;
        dataCompany: any = [];
        fondData: any = [];
        checkNameForm: any = {};
        chaoOaClickRowNameDouble: any = {};
        oaClickRowNameDouble:any = {};
        nodeClickRowName:any = {};
        loadingInstance:any = {};
        quanData : any = {};
        fondsApprovalRoleUserList : any = [];
        dataDetail : any = [];
        filters: any = {};
        selectModel : number;
        basicForm: any = {};
        baseForm: any = [];
        treeData: any = [];
        qId : number;
        list: any = [];
        list1: any = [];
        data: any = [];
        dictListByDictId: any = [];
        dataOa: any = [];
        dataOas : any = [];
        tableHeadArrs:any = [];
        dataName: any = [];
        roleSelect: any = [];
        tree: any = [];
        titleId : number;
        leafName: any = [];
        companyTree: any = [];
        defaultProps: any = {};
        defaultTrees: any = {};
        defaultFondTrees: any = {};
        basicFormRules: any = {};
        oaClickRowName: any = {};
        oaClickRowName1: any = {};
        auditDisplay: any = {};
        dyId : number;
        node1:any = {};
        resolve1:any = {};
        obj:any = {};
        centerDialogVisibejob:boolean;
        titleNode:string;
        initdataChao:any = [];
        sign: number;
        fondName:string;
        dBt:boolean;
        t:number;
        y:number;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280 ;
            this.nameHeight = null;
            this.loadingInstance = null;
            this.timer = false;
            this.peopleVisible = false;
            this.peopleVisible1 = false;
            this.writorVisible = false;
            this.fileVisible = false;
            this.fileFondVisible = false;
            this.treeLoading = false;
            this.comLoading = false;
            this.shiFouXianShi = true;
            this.fanhui = false;
            this.start = 0;
            this.total = 0;
            this.qId = -1;
            this.page = 1;
            this.limit = 25;
            this.processId = 0;
            this.dyId = -1;
            this.titleId = 0;
            this.selectModel = -1;
            this.treeParamsId = 0;
            this.parameOne = 0;
            this.marginSize = 0;
            this.listLoading = false;
            this.list = [];
            this.fondData = [];
            this.dataChao = [];
            this.list1 = [];
            this.dataOa = [];
            this.dataOas = [];
            this.treeData = [];
            this.leafName = [];//节点姓名
            this.checkNameForm = {
                checkName:''
            };
            this.oaClickRowName = {};
            this.obj = {
                userID:'',
                unitname:'',
                fullName:'',
                jobname:''
            };
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
            this.cc = true;
            this.a = {

            };
            this.auditDisplay ={
                auditIds:'',
                ccUserId:'',
                auditNames:'',
                ccUserName:'',
                AppvoalUsers:'',
                AppvoalContext:''
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
                region:"",
                isProjectCompany:true,
                fondType:'2',
                AppvoalContext:'',
                title:''
            };
            this.baseForm = {
                title:'',
                cause:'',
                fondName:'',
                orgId:0,
                isProjectCompany:true,
                region:"",
                comments:'',
                auditNames:'',
                fondsMaster:{

                },
                fondsApprovalRoleUserList:[],
                appUsers:'',
                ccUserId:'',
                appContext:'',
                quanId:"",
                fondType:1
            };
            this.auditDisplayRules = {
                 auditIds: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                auditNames: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                AppvoalUsers: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                AppvoalContext:[
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
            this.basicFormRules = {
                title: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                appStartDate: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                appEndDate: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                days: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                lookupDescription: [
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                date:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                company:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                userName:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                auditNames:[
                    { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                AppvoalContext:[
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ],
                auditIds:[
                     { required: true, message: '请选择', trigger: ['blur','change'] }
                ],
                region:[
                    { required: true, message: '请选择', trigger: 'change' }
                ],
            };
            
                
            this.data =  [];
            this.tableHeadArrs = [];
            this.dataName = [];
            this.node1 = {};
            this.resolve1 = {};
            this.centerDialogVisibejob = false;
            this.titleNode = '';
            this.initdataChao = [];
            this.sign = 0;
            this.fondName = '';
            this.dBt = false;
            this.t = 0;
            this.y = 0;
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            this.getFiles();
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
        allRightToLeft(){
  
        }
        allLeftToRight(){

        }
        //全部抄送右转右左
        chaoAllRightToLeft(){
            this.dataChao = [];
        }
        //全部抄送左转右
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
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);
            this.getFiles();
        };
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
        backs(){
            //  this['$confirm']('您确定要关闭此条记录？', {
            //         type: 'warning'
            //     }).then(() => {
            //       this['$router'].go(-1);
            //     })

             this.centerDialogVisibejob = true;
             this.titleNode = '';
            //  this['$confirm']('您确定要关闭此条记录？', {
            //         type: 'warning'
            //     }).then(() => {
            //        Service.closeApproval(this.qids).then(res=>{
            //         //    this['$router'].go(-1);
            //         if(this.processId == 0){
            //             this['$router'].push({
            //                 path:'/selfTip/transfer',
            //             })
            //         }else{
            //             window.close();
            //         }

            //     })

            //     });
        }
        centerDialogVisibejobEvent(){
            Service.closeApproval({id:this.qids,auditRemark:this.titleNode}).then(res=>{
                      if(res.data.succeeded == true){
                           this.centerDialogVisibejob = false;
                        // this['$router'].push({
                        //     path:'/selfTip/transfer'
                        // })
                            if(this.processId == 0){
                                this['$router'].go(-1);
                            }else{
                                window.close();
                            }
                      }else if(res.data.succeeded == false){
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                      }
                })
        }
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
            //     for(let item of this.dataCompany){
            //         if(!item.select && item.userId == ''){
            //              this.peopleVisible = false;
            //             this['$message']({
            //             message: '所选档案的全宗没有配置全宗角色所属人员，该流程无法发起！',
            //             type: 'error'
            //         });
            //     }else{
            //         alert(777)
            //          this.peopleVisible = true;
            //     }
            // }

            // for(let item of this.dataCompany){
            //        if(!item.select && item.userId == ''){
            //            this.peopleVisible = false;
            //            this['$message']({
            //            message: '所选档案的全宗没有配置全宗角色所属人员，该流程无法发起！',
            //            type: 'error'
            //        });
            //    }else if(item.select){
            //        this.peopleVisible = true;
            //    }
            //}
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
                if(this.y == 0){
                    this.nameList(this.e.id);
                }
                this.peopleVisible = true;
                this.node1.childNodes = [];
                this.loadNode(this.node1,this.resolve1)
            }

        }
        saveContacts(ids){
            Service.CsaveContacts(ids).then((res) =>{

            });
        }
        // 点击选择审批人（单选）
        choosePerson1(index,item):void{
            this.index = index;
            this.peopleVisible1 = true;
            this.loadNode(this.node1,this.resolve1);
            //回显
            if(this.basicForm['checkPeople'+index] != '' && this.basicForm['checkPeople'+index] != undefined){
                this.obj.fullName = this.basicForm['checkPeople'+index];
                this.obj.userID = this.basicForm['check'+index];
                this.obj.unitname = this.basicForm['bumne'+index];
                this.obj.jobname = this.basicForm['zhiwu'+index];
                let attr = [];
                attr.push(this.obj);
                this.dataOas = attr;
            }else{
                this.dataOas = [];
            }
            this.userPeople();
        }
        // 点击下面OA表格行（单选）
        oaClickRow1(row){
            this.obj = row;//回显
            this.oaClickRowName.uName = row.fullName;
            this.oaClickRowName.uid = row.userID;
            this.oaClickRowName.bumen = row.unitname;
            this.oaClickRowName.zhiwu = row.jobname;
        };

        // 审批人确定（单选）
        chooseDone1(){
            this.basicForm['bumne'+this.index] = this.oaClickRowName.bumen;//部门
            this.basicForm['zhiwu'+this.index] = this.oaClickRowName.zhiwu;//职务
            this.basicForm['check'+this.index] = this.oaClickRowName.uid;
            this.basicForm['checkPeople'+this.index] = this.oaClickRowName.uName;
            this.peopleVisible1 = false;
            this.dataOa = [];
            this.oaClickRowName = {};
            this.node1.childNodes = [];
            this.checkNameForm.checkName = '';
            this.CsaveContacts(this.basicForm['check'+this.index].toString())
        };

        // 点击选择抄送人
        chooseWritor():void{
            this.writorVisible = true;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
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
        applySubmit(form,form1):void{
            this['$refs'][form]['validate']((valid) => {
               if (valid) {
                   this['$refs'][form1]['validate']((valid)=>{})
                if(this.auditDisplay.auditNames == ''){
                     this['$message']({
                                message: '请选择审批人', 
                                type: 'warning'
                            });
                }else if(this.auditDisplay.AppvoalContext == ''){
                   this['$message']({
                                message: '请填写签字信息。',
                                type: 'warning'
                            });
                    }else{

                   // for(let item of this.dataCompany){
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
                                this.loadingInstance = Loading.service(
                                    {
                                        lock: true,
                                        text: '文件正在提交，请稍候',
                                        spinner: 'el-icon-loading',
                                        background: 'rgba(0, 0, 0, 0.7)'
                                    }
                                );
                                let params = this.baseForm;
                                this.baseForm.fondsApprovalRoleUserList = [];
                                console.log(this.quanData.orgId)
                                for(let i = 0;i<this.roleSelect.length;i++){
                                    let id = this.roleSelect[i].roleId;
                                    let d = {"id":id};
                                    // let b = {role:{"id":''},user:{userId:''},fondsApproval:{id:this.titleId}};
                                    let b = {role:{"id":''},user:{userId:''},id:this.roleSelect[i].id,fondsApproval:{id:this.titleId}};
                                    b.role = d;
                                    console.log(this.roleSelect)
                                    console.log(this.basicForm['check'+i])
                                    let c = {"userId":this.roleSelect[i].userId};
                                    b.user = c;
                                    this.baseForm.fondsApprovalRoleUserList.push(b);

                                }
                                this.baseForm.title = this.basicForm.title;
                                this.baseForm.cause = this.basicForm.cause;
                                this.baseForm.fondName = this.basicForm.fondName;
                                this.baseForm.orgId = this.basicForm.orgId;
                                this.baseForm.id = this.titleId;
                                this.baseForm.createOrgId = this.quanData.createOrgId;
                                this.baseForm.createOrgName = this.quanData.createOrgName;
                                this.baseForm.createDate = this.quanData.createDate;
                                this.baseForm.createPerson = this.quanData.createPerson;
                                this.baseForm.createPersonId = this.quanData.createPersonId;
                                this.baseForm.utilizeProcessId = this.quanData.utilizeProcessId;
                                this.baseForm.processNo = this.quanData.processNo;
                                if(this.basicForm.isProjectCompany == "false"){
                                    this.baseForm.isProjectCompany = false;
                                }else if(this.basicForm.isProjectCompany == "true"){
                                    this.baseForm.isProjectCompany = true;
                                }
                                if(this.shiFouXianShi == true){
                                    this.baseForm.region = this.basicForm.region;
                                }
                                this.baseForm.comments = this.basicForm.comments;
                                this.baseForm.fondsMaster = {"id":this.e.id};
                                this.baseForm.orgId = this.quanData.orgId;
                                this.baseForm.appUsers = this.auditDisplay.AppvoalUsers;
                                // this.baseForm.ccUserId = this.auditDisplay.ccUserId;
                                this.baseForm.appContext = this.auditDisplay.AppvoalContext;
                                this.baseForm.fondType = parseInt(this.basicForm.fondType);
                                this.basicForm.id = this.titleId;
                                this.basicForm.dyId = this.dyId;
                                    var CCarr = [];
                                    console.log(this.dataChao)
                                    for(let data of this.dataChao){
                                        CCarr.push(data.userID);
                                    }
                                    var CCstr
                                    if(CCarr.length!=0){
                                        CCstr = CCarr.join(',')

                                    }else{
                                        CCstr =this.initdataChao.join(',');
                                    }
                                    console.log(CCarr)
                                    console.log(CCstr)
                                   this.baseForm.ccUserId = CCstr;
                                Service.fondsApprovalNewSave(params).then((res) =>{
                                    if(res.data.succeeded){
                                        // this['$message']({
                                        //     message: '全宗申请提交成功！',
                                        //     type: 'info'
                                        // });
                                        this['$confirm']('全宗申请提交成功！', '提示', {
                                                    confirmButtonText: '确定',
                                                    cancelButtonText: '取消',
                                                    showCancelButton:false,
                                                    type: 'info'
                                                }).then(()=>{
                                                if(this.processId == 0){
                                                    window.sessionStorage.setItem('examState', '2');
                                                        this['$router'].go(-1);
                                                    }else{
                                                        window.close();
                                                    }
                                                })
                            }else if(res.data.succeeded == false){
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                            this.$nextTick(() => { this.loadingInstance.close();});
                        });
                            }

                }
           // }
        }

        }else{
                this['$message']({
                    message: '请完善基本信息。',
                    type: 'warning'
                });
               }
            }     
        };

         // 选择抄送人确定
            chooseWritorDone(){
                // if(this.dataChao.length>0){
                    let arr = [];
                    let ids = [];
                    for(let data of this.dataChao){
                        arr.push(data.fullName);
                        ids.push(data.userID);
                    }
                    let a = ids.join(",");
                    let b = arr.join("，");
                    this.auditDisplay.ccUserId = a;
                    this.auditDisplay.ccUserName = b;
                    this.writorVisible = false;
                    this.node1.childNodes = [];
                    this.loadNode(this.node1,this.resolve1)
                    this.dataOa = [];
                    this.checkNameForm.checkName = '';
                // }else{
                //     this['$message']({
                //         message: '请选择抄送人！',
                //         type: 'warning'
                //     });
                // }
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
            console.log(this.dataCompany)
            console.log(ids)
            if(arr.length===this.dataCompany.length){
                this.auditDisplay.auditNames = arr.join('->');
                this.auditDisplay.AppvoalUsers = ids.join();
                console.log(this.auditDisplay.AppvoalUsers);
                this.peopleVisible = false;
                this.node1.childNodes = [];
                this.dataOa = [];
                this.checkNameForm.checkName = '';
                this.CsaveContacts(this.auditDisplay.AppvoalUsers)
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
                    this.dataOas = res.data.data;
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
            console.log(row)
            console.log(this.dataCompany)
            // for(let com of this.dataCompany){
            //     if(!com.name){
            //        com.name = row.fullName;
            //        com.userID = row.userID;
            //        return false;
            //     }
            // }
            let data = this.dataCompany;
            var i = 0;
            for(let ind of data){
                if(ind.userID==row.userID){
                    i = 1;
                };
            };
            if(i==0){
                for(let com of data){
                    if(!com.fullName && com.select){
                        com.fullName = row.fullName;
                        // com.userID = row.userID;
                         com.userId = row.userID;
                        break;
                    };
                };
                this.dataCompany = data;
            };
        };

        // 双击常联系人添加
        dblNameRow1(row){
            this.basicForm['bumne'+this.index] = row.unitname;//部门
            this.basicForm['zhiwu'+this.index] = row.jobname;//职务
            this.basicForm['check'+this.index] = row.userID;
            this.basicForm['checkPeople'+this.index] = row.fullName;
            this.peopleVisible1 = false;
            this.node1.childNodes = [];
            console.log(this.basicForm['check'+this.index].toString())
            this.saveContacts(this.basicForm['check'+this.index].toString());
        };

        // 点击节点表格删除
        celldblClick(row:any){
            if(!row.select){
                this['$message']({
                        message: '节点不能更改！',
                        type: 'error'
                    });
            }else if(row.fullName) {
                for(let data of this.dataCompany){
                    if(data.fullName===row.fullName){
                        data.fullName = '';
                        delete data.userID;

                    }
                }
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

        //对应公司
        seniorWdorg(){
            this.fileVisible = true;
        }

        //上级全宗
        higherFond(){
            this.t+=1;
            if(this.t == 1){//只第一次加载
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
            }
            this.fileFondVisible = true;
        }

        // 懒加载树
        loadNode(node,resolve) {
            this.treeData = [];
            if(node.level === 0){
                this.node1 = node;
                this.resolve1 = resolve;
                this.treeLoading = true;
                Service.seniorWdorg(1).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = this.treeData;
                        let data = res.data.data;
                        console.log(data);
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
            this.dyId = this.a.orgID;
            
        };

        // 点击子节点
        higherFondClick(data){//上级全宗
            this.e = data;
            console.log(this.e)
        };

        // 点击子节点
        handleNodeClick(data){
            console.log(data)
            this.oaPerson(data.orgID);
        };

        // 组织架构选人
        oaPerson(id){
            this.comLoading = true;
            Service.findOaList(id).then((res) =>{
                if(res.data.succeeded){
                    this.dataOa = res.data.data;
                    this.dataOas = res.data.data;
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
            this.basicForm.checkCompany = this.a.shortName;
            this.basicForm.orgId = this.a.orgID;
            this.fileVisible = false;
        };

        submitForm2(formName) {//上级全宗确定
            if(this.e.parentId == 0){
                this['$message']({
                    message: '请不要选择根全宗！',
                    type: 'warning'
                });
                return;
            }
            this.y+=1;
            this.basicForm.higherFondName = this.e.fondName;
            this.fileFondVisible = false;
            this.nameList(this.e.id);
            if(this.e.isProjectCompany){
                this.basicForm.isProjectCompany = "true";
                this.shiFouXianShi = true;
            }else{
                this.basicForm.isProjectCompany = "false";
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
            console.log(row)
            this.nodeClickRowName = row;
        };

        // 右转左
        rightToLeft(){
            console.log(this.dataCompany)
            let data = this.nodeClickRowName;
            for(let com of this.dataCompany){
               if(data.fullName===com.fullName && com.select && data.id === com.id){
                   com.fullName = '';
                   delete data.userID;
               }
            }
            
           
           
            
        }

        // 左转右
        leftToRight(){
            let data = this.oaClickRowNameDouble;
            for(let com of this.dataCompany){
                if(!com.fullName && com.select){
                    com.fullName = data.fullName;
                    com.userId = data.userID;
                    return false;
                }
            }

            // let data = this.oaClickRowNameDouble;
            // var i = 0;
            // for(let item of this.dataCompany){
            //     if(item.userId == data.userID){
            //         i = 1;
            //     };
            // };
            // if(i==0){
            //     for(let com of this.dataCompany){
            //         if(!com.fullName && com.select ){
            //             com.fullName = data.fullName;
            //             com.userId = data.userID;
            //             break;
            //         };
            //     };
            // };
        }

        // 节点表格
        nameList(id){
            Service.getApprovalPerson(id).then((res) =>{
                let flag = false;
                if(res.data.succeeded){
                    if(res.data.data == null || res.data.data.length == 0){
                        let b = document.querySelector(".redFont .el-input__inner");
                        b["style"].color = 'red';
                        this.auditDisplay.auditNames = "无法找到所属产业集团，请联系系统管理员。";
                        this.sign = 2;
                        this.dBt = true;
                        flag = true;
                    }else{
                        this.dataCompany = res.data.data;
                        for(let item of res.data.data){
                            if(!item.select && item.userId == ''){
                                 this.fondName = item.fondName;
                                 this.peopleVisible = false;
                                 let b = document.querySelector(".redFont .el-input__inner");
                                 b["style"].color = 'red';
                                 this.auditDisplay.auditNames = '审批人员未配置，流程无法发起。请联系 "'+item.fondName+'" 的行政部档案员。'
                                // this.peopleVisible = true;
                                this.sign = 1;
                                this.dBt = true;
                                flag = true;
                            }
                        };
                        if(!flag){
                            this.dBt = false;
                            this.auditDisplay.auditNames = '';
                            this.sign = 0;
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
           console.log(obj)
            if(obj == "true"){
                this.shiFouXianShi = true;
            }else if(obj == "false"){
                this.shiFouXianShi = false;
            }
        }
        CsaveContacts(params){//常用联系人 确定调用
            Service.CsaveContacts(params).then(res=>{
                if(res.data.succeeded == true){
                    this.userPeople();
                }
                
            })
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
        handleClose1(){
            this.peopleVisible = false;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }
        handleClose2(){
            this.writorVisible = false;
            this.node1.childNodes = [];
            this.loadNode(this.node1,this.resolve1)
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }
        handleClose3(){
            this.peopleVisible1  =false;
            this.node1.childNodes = [];
            this.dataOa = [];
            this.checkNameForm.checkName = '';
        }
        created(){
            treeChange(this.tree);

            let id = JSON.parse(window.sessionStorage.getItem('QchangQuanTransDetail'))
            if(id==='1'){
                this.tableHeadArrs = JSON.parse(window.sessionStorage.getItem('headList'));
            }else if(id==='2'){
                this.tableHeadArrs = JSON.parse(window.sessionStorage.getItem('headList'));
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
                    this.parameOne = parseInt(b);
                }
                this.qids = this.parameOne;//从OA过来的
                this.marginSize = -50;
            }else{
                this.processId = 0;
                this.fanhui = true;
                this.qids = JSON.parse(window.sessionStorage.getItem('QchangQuanTransDetail'))//正常过来的
            }
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                })()
            };
            let id = JSON.parse(window.sessionStorage.getItem('QchangQuanTransDetail'));
            if(id==='1'){
                this.data = JSON.parse(window.sessionStorage.getItem('dataList'));
            }else if(id==='2'){
                this.data = JSON.parse(window.sessionStorage.getItem('dataList'));
            }

            this.basicForm.isProjectCompany = "true";

            // this.getFiles();

            //获取全宗角色
            // Service.getFondRoleList({}).then((res) =>{
            //     this.roleSelect = res.data.data;
            // });
            //获取所属分区下拉选数据
            let parame = 443;
            Service.getDictListByDictId(parame).then((res) =>{
                this.dictListByDictId = res.data.data;
                console.log(this.dictListByDictId);
                let parames;
                if(this.processId == 0){
                    parames = JSON.parse(window.sessionStorage.getItem('QchangQuanTransDetail'));
                }else{
                    parames = this.parameOne;
                }

                //this.qId = this['$route'].params.id;
                // this.baseForm.quanId = qId;
                Service.getFondsApprovalInfo({id:parames}).then(res=>{
                    console.log(res.data)
                    this.quanData = res.data.data;
                    this.basicForm.title = res.data.data.title;
                    this.basicForm.userName = res.data.data.createPerson;
                    this.basicForm.company = res.data.data.createOrgName;
                    this.basicForm.createDate = moment(res.data.data.createDate).format("YYYY-MM-DD");
                    this.basicForm.cause = res.data.data.cause;
                    this.basicForm.fondName = res.data.data.fondName;
                    this.basicForm.higherFondName = res.data.data.parentFondsName;
                    this.basicForm.checkCompany = res.data.data.orgShortName;
                    //this.basicForm.isProjectCompany = res.data.data.isProjectCompany;
                    if(!res.data.data.isProjectCompany){
                        this.basicForm.isProjectCompany = "false";
                        this.shiFouXianShi = false;
                    }else if(res.data.data.isProjectCompany){
                        this.basicForm.isProjectCompany = "true";
                        this.shiFouXianShi = true;
                    }
                    this.basicForm.fondType = res.data.data.fondType.toString();
                    this.fondsApprovalRoleUserList = res.data.data.fondsApprovalRoleUserList;
                    this.roleSelect = res.data.data.fondsApprovalRoleUserList;
                    this.titleId = res.data.data.id;
                    for(let i = 0;i < this.roleSelect.length; i++){
                        this.basicForm['check'+i] = this.roleSelect[i].roleId;
                        this.basicForm['checkPeople'+i] = this.roleSelect[i].userName;
                    }
                    this.basicForm.comments = res.data.data.comments;
                    this.e.id = res.data.data.parentFondsId;
                    this.e.fondName = res.data.data.parentFondsName;
                    // this.basicForm.auditNames = res.data.data.region
                    this.selectModel = res.data.data.region;
                    if(this.selectModel == 1){
                        this.basicForm.region = this.dictListByDictId[0].code
                    }else if(this.selectModel == 2){
                        this.basicForm.region = this.dictListByDictId[1].code
                    }else if(this.selectModel == 3){
                        this.basicForm.region = this.dictListByDictId[2].code
                    }
                    // this.basicForm.region = res.data.data.regionName;
                    console.log(this.fondsApprovalRoleUserList)
                    this.dataDetail = res.data.data.Approval;
                    this.auditDisplay.AppvoalContext = res.data.data.appContext;
                    let brr = [];
                        for(let item in res.data.data.cc){
                            this.initdataChao.push(res.data.data.cc[item].userId)
                            brr.push(res.data.data.cc[item].userName)
                        }
                    this.auditDisplay.ccUserName = brr.join("，")
                    console.log(this.initdataChao)
                })
            });
            //控制选择抄送人是否显示
            Service.getApprovalSave({}).then((res) =>{
                this.cc = res.data.data.cc;
            });
            //常用联系人
            Service.getContacts({}).then((res) =>{
                this.dataName = res.data.data;
            });
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/borrowdetails/quanzong';
</style>