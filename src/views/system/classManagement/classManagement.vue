<template>
    <div class="main" @click="()=>{this.classShow = false;}">
        <div class="left">
            <div class="left top">
                <span>分类管理</span>
                <p class="fontClass">
                    <i class="fa fa-plus-square" @click.stop="AddRole()"></i>
                    <i class="fa fa-eyedropper" @click="BJgroup"></i>
                    <i class="fa fa-times-rectangle" @click="deleteGroup()"></i>
                </p>
                <ul v-show="classShow">
                    <li @click="addGroup">新增分类组</li>
                    <li @click="addClass">新增分类</li>
                </ul>
            </div>
            <div class="left bottom">
                <div class="classManageTree CMMTree">
                    <el-tree node-key="id"
                             v-loading="treeLoading"
                             ref="tree"
                             :data="treeData"
                             accordion
                             :props="defaultTrees"
                             @node-click="handleNodeClick"

                            >
                        <!--:render-content="renderContent"-->
                    </el-tree>
                </div>
            </div>
        </div>
        <div class="right" v-show="RightShow">
            <div class="right top">
                <span class="right top littleTop">著录项列表</span>
                <div class="nthDivthree">
                    <el-button type="primary" class="el-button checkWay" @click="AddItem">新增</el-button>
                    <el-button type="primary" class="el-button checkWay" @click="deleteField">删除</el-button>
                    <el-button type="primary" class="el-button checkWay" @click="EditCreation">定制画面编辑</el-button>
                    <el-button type="primary" class="el-button checkWay" @click='ListSetting'>一览设置</el-button>
                    <!-- <el-button type="primary" class="el-button checkWay" @click="SerachOptions">设置检索项</el-button> -->
                    <el-button type="primary" class="el-button checkWay" @click="printTemplate">打印模板</el-button>
                    <div style="width:85px;line-height:30px;float:right;margin-left:10px" type="primary" class="NumberManage toolButtons mybuttons" @click.stop="menuShow">
                        规则设置
                        <ul v-if="ul_show" >
                            <li @click="ordinationRule">档号规则</li>
                            <!-- <li @click="importNumber">流水号规则</li> -->
                            <li @click="exportNumber">批量挂接规则</li>
                        </ul>
                        <span class="span">
                        </span>
                    </div>
                </div>
            </div>
            <div class="right bottom">
                <div class="borderTable">
                   <el-table tooltip-effect="dark" :height="bodyHeight" :data="tableData" highlight-current-row   @selection-change="selectionChange"  class="indexTable containTable">
                        <el-table-column type="selection" width="30" label="#"></el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="caption" label="中文名称">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="typeName" label="类型">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fieldLength" label="长度">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true"  label="可空">
                            <template slot-scope="scope">{{scope.row.isNull?'是':'否'}}</template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="dictionaryName" label="数据字典">
                        </el-table-column>
                        <!--<el-table-column :show-overflow-tooltip="true" prop="telephone" label="是否使用">-->
                            <!--<template slot-scope="scope">{{scope.row.null?'是':'否'}}</template>-->
                        <!--</el-table-column>-->
                        <el-table-column :show-overflow-tooltip="true" prop="comments" label="备注">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="lendModalOut1(scope.row)">编辑</span>
                            </template>
                        </el-table-column>
                   </el-table>
                </div>
            </div>
        </div>
       <!--新增分类分类组-->
        <el-dialog :title="addgroup?'新增分类组':'新增分类'" :visible.sync="addClassShow" class="myDialog" :close-on-click-modal="false" :modal-append-to-body='false'>
           <div class="addgroup" v-show="addgroup">
               <div class="addgruopname">
                   <p>分类组名称</p>
                   <el-input style="width:270px;float: left" class="addgruopnameInput" v-model.trim="groupNum.name"></el-input>
               </div>
               <div class="addgruoplog">
                   <p>备注</p>
                   <el-input type="textarea" style="width:270px;float: left;" class="addgruopnametextarea" v-model.trim="groupNum.log"></el-input>
               </div>
           </div>
            <div class="addgroup" v-show="!addgroup">
                <div class="addgruopname">
                    <p>分类名称</p>
                    <el-input style="width:270px;float: left" class="addgruopnameInput" v-model.trim="classNum.name"></el-input>
                </div>
                <div class="addgruopselect" >
                    <p>选择模板</p>
                    <div>
                        <el-select  style="width:270px;float: left" class="addgruopnameselect" v-model.trim="classNum.model">
                           <template v-for="item in classModel">
                               <el-option :label="item.name" :value="item.id" :key="item.id"></el-option>
                           </template>
                        </el-select>
                    </div>
                </div>
                <div class="addgruoplog">
                    <p>备注</p>
                    <div>
                    <el-input type="textarea" style="width:270px" class="addgruopnametextarea" v-model.trim="classNum.log"></el-input>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" v-show="addgroup"><el-button class="checkWay" @click="saveGroup">保存</el-button></div>
            <div slot="footer" class="dialog-footer" v-show="!addgroup"><el-button class="checkWay" @click="saveClass">保存</el-button></div>
        </el-dialog >
        <!--编辑分类组-->
        <el-dialog :title="EditgroupTitle?'编辑分类组':'编辑分类'" :visible.sync="EditClassShow" class="myDialog" :close-on-click-modal="false" :modal-append-to-body='false'>
            <div class="addgroup">
                <div class="addgruopname">
                    <p>{{EditgroupTitle?'分类组名称':'分类名称'}}</p>
                    <el-input style="width:270px;float: left" class="addgruopnameInput" v-model.trim="EditgroupNum.name"></el-input>
                </div>
                <div class="addgruoplog">
                    <p>备注</p>
                    <el-input type="textarea" style="width:270px;float: left;" class="addgruopnametextarea" v-model="EditgroupNum.log"></el-input>
                </div>
            </div>
            <!--<div class="addgroup" v-show="!Editgroup">-->
            <!--<div class="addgruopname">-->
            <!--<p>分类组名称</p>-->
            <!--<el-input style="width:270px;float: left" class="addgruopnameInput" v-model="EditclassNum.name"></el-input>-->
            <!--</div>-->
            <!--<div class="addgruopselect" >-->
            <!--<p>选择模板</p>-->
            <!--<div>-->
            <!--<el-select  style="width:270px;float: left" class="addgruopnameselect" v-model="EditclassNum.model">-->
            <!--<template v-for="item in classModel">-->
            <!--<el-option :label="item.name" :value="item.id" :key="item.id"></el-option>-->
            <!--</template>-->
            <!--</el-select>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="addgruoplog">-->
            <!--<p>备注</p>-->
            <!--<div>-->
            <!--<el-input type="textarea" style="width:270px" class="addgruopnametextarea" v-model="EditclassNum.log"></el-input>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div slot="footer" class="dialog-footer" v-show="EditgroupTitle"><el-button class="checkWay" @click="EditGroup">保存</el-button></div>
            <div slot="footer" class="dialog-footer" v-show="!EditgroupTitle"><el-button class="checkWay" @click="EditClass">保存</el-button></div>
        </el-dialog >        <!--新增著录项-->
        <el-dialog :title="Edittrue?'新增著录项':'编辑著录项'" :visible.sync="AddItemShow" class="myDialogItem" :close-on-click-modal="false" :modal-append-to-body='false'>
            <el-form  class="addfile" :model="ItemNum" label-width="100px" ref="ItemNum">
                <el-form-item  label="中文名称 :" prop="caption" :rules="[{required:true,message:'请填写中文名称',trigger:'blur'}]">
                    <el-input  v-model="ItemNum.caption"></el-input>
                </el-form-item>
                <!--<el-form-item  label="列名 :">-->
                    <!--<el-input  v-model="ItemNum.fieldName"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item  label="类型 :" prop="type" :rules="[{required:true,message:'请选择类型',trigger:'change'}]">
                    <el-select v-model="ItemNum.type">
                        <el-option v-for="ind in typeData" :label="ind.displayText" :value="ind.code" :key="ind.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="长度 :" prop="fieldLength" :rules="[{required:true,message:'请填写长度',trigger:'blur'},{validator:numbervalidator,trigger:'blur'}]">
                    <el-input type="number" v-model.number="ItemNum.fieldLength"  min="0"></el-input>
                </el-form-item>
                <el-form-item  label="小数位数 :" prop="decimalDigits" :rules="[{validator:numbervalidator,trigger:'blur'}]">
                    <el-input type="number" v-model.number="ItemNum.decimalDigits" ></el-input>
                </el-form-item>

                <el-form-item  label="默认值 :">
                    <el-input  v-model="ItemNum.defaultValue"></el-input>
                </el-form-item>
                <el-form-item  label="全文索引类型 :">
                    <el-select v-model="ItemNum.solrMode">
                        <el-option v-for="ind in typeArr" :label="ind.modeText" :value="ind.mode" :key="ind.mode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="可批量修改 :">
                    <el-select v-model="ItemNum.isBatchEdit">
                        <el-option  label="是" :value="true"></el-option>
                        <el-option  label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="唯一 :">
                    <el-select v-model="ItemNum.isUnique">
                        <el-option  label="是" :value="true"></el-option>
                        <el-option  label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="可空 :">
                    <el-select v-model="ItemNum.isNull">
                        <el-option  label="是" :value="true"></el-option>
                        <el-option  label="否" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="数据字典 :">
                    <el-select v-model="ItemNum.dictionaryId" filterable>
                        <el-option v-for="ind in dicData" :label="ind.name" :value="ind.id" :key="ind.id"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item  label="是否使用 :">-->
                <!--<el-radio-group style="margin-left: 5px" v-model="ItemNum.use">-->
                <!--<el-radio :label="true">是</el-radio>-->
                <!--<el-radio :label="false">否</el-radio>-->
                <!--</el-radio-group>-->
                <!--</el-form-item>-->
                <el-form-item  label="备注 :" class="textareaItem">
                    <el-input class="textareaItem" type="textarea" v-model="ItemNum.comments" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer"><el-button class="checkWay" @click="SaveItems('ItemNum')">保存</el-button></div>
        </el-dialog >
        <!-- 设置搜索项 -->
        <el-dialog title="设置搜索项" :visible.sync="SerachOption" class="myDialogItem" :close-on-click-modal="false" :modal-append-to-body='false'>
                <el-table  v-show = "tableShow" :data="SearchData" stripe highlight-current-row  class="indexTable containTable">
                    <el-table-column :show-overflow-tooltip="true" prop="fieldName" label="著录项">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="caption" label="显示名称">
                    </el-table-column>
                    <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="addBtn" @click="deletBtn(scope.$index,scope.row)">删除</el-button>
                            </template>
                    </el-table-column>
                </el-table>

                <el-table :data="data" :show-header="false"  tooltip-effect="dark" class="indexTable containTable">
                <el-table-column :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-select @change="selectGet" v-model="valueOptions.fieldName" placeholder="请选择">
                                    <el-option v-for="item in valueOptions" :key="item.fieldName" :label="item.caption" :value="item.fieldName">
                                    </el-option>
                                </el-select>
                            </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                    <el-input class="checkName" placeholder="" v-model='projectOption.project'></el-input>
                            </template>
                </el-table-column>
                <el-table-column>
                            <template slot-scope="scope">
                                <!-- <el-button class="addBtn" @click="deletBtn(scope.row)">删除</el-button> -->
                                <el-button class="addBtn" @click="AddBtn(scope.row)">新增</el-button>
                            </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer"><el-button class="checkWay" @click="SerachSure">确定</el-button></div>
        </el-dialog>

        <!-- 打印模板 -->
        <el-dialog title="选择报表模板" :visible.sync="printTemplates" class="myDialogItem" :close-on-click-modal="false" :modal-append-to-body='false'>
        <el-table  ref='pendingTables'  :data="printTempData" stripe highlight-current-row  class="indexTable containTable" @selection-change="printTempDataSelect">
            <el-table-column type="selection" width="55" label="#">
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="reportName" label="报表名称">
            </el-table-column>
        </el-table>
         <div slot="footer" class="dialog-footer"><el-button class="checkWay" @click="printTempSure">确定</el-button></div>
        </el-dialog>

        <!-- 档号规则 -->
        <el-dialog title="档号规则" :visible.sync="ordinationRules" class="myDialogItems" :close-on-click-modal="false" :modal-append-to-body='false'  :before-close="handleClose2">
            <div class='dangTitle'>
                <p style="line-height:25px"><b>当前规则：</b>{{rencetRules}}</p>
            </div>

             <el-table :data="ordinationData" stripe highlight-current-row  class="indexTable containTable">
                    <el-table-column :show-overflow-tooltip="true" prop="valueType" label="选项">
                         <template slot-scope="scope">
                               <span v-if="scope.row.valueType === 1">表字段</span>
                               <span v-if="scope.row.valueType === 2">固定字符</span>
                        </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="fieldCaption" label="显示字符">
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" prop="formatString" label="格式化">
                    </el-table-column>

                    <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="addBtn" @click="OrdeletBtn(scope.$index,scope.row)">删除</el-button>
                            </template>
                    </el-table-column>
            </el-table>
            <el-table :data="data" :show-header="false"  tooltip-effect="dark" class="indexTable containTable">
                <el-table-column :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-select @change="ordinationSelect1" v-model="ordinationOption1s.valueType" placeholder="请选择" >
                                    <el-option v-for="item in ordinationOption1" :key="item.valueType" :label="item.Value" :value="item.valueType">
                                    </el-option>
                                </el-select>
                            </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-select v-show='!GuStr' @change="ordinationSelect2" v-model="ordinationOption2s.fieldName" placeholder="请选择">
                                    <el-option v-for="item in ordinationOption2" :key="item.fieldName" :label="item.caption" :value="item.fieldName">
                                    </el-option>
                                </el-select>
                                <el-input v-show='GuStr' type='text' v-model='GuObj.value'></el-input>
                            </template>
                </el-table-column>
                 <el-table-column :show-overflow-tooltip="true">
                 <template slot-scope="scope">
                        <el-input type='text' v-model='exam.formatString'></el-input>
                </template>
                </el-table-column>
                <el-table-column>
                            <template slot-scope="scope">
                                <el-button class="addBtn" @click="OrAddBtn(scope.row)">新增</el-button>
                            </template>
                </el-table-column>
            </el-table>
             <div slot="footer" class="dialog-footer"><el-button class="checkWay" @click="ordinationSure">确定</el-button></div>
        </el-dialog>

        <!-- 批量挂接规则 -->
        <el-dialog title="批量挂接规则" :visible.sync="exportNumbers" class="myDialogItems" :close-on-click-modal="false" :modal-append-to-body='false' :before-close="handleClose1">
            <div class='GUi'>
                <p>
                    <b>规则列表</b>
                   <el-button type="primary" class="el-button checkWay" @click="newAdd" style="float:right">新增</el-button>
                </p>
            </div>
            <el-table :data="RulesData" :max-height='150' stripe highlight-current-row  class="indexTable containTable">
                 <el-table-column prop='ruleName' label="规则名称">
                            <!-- <template slot-scope="scope">
                                <el-input class="checkName" placeholder="" v-model='Rules.name'></el-input>
                            </template> -->
                </el-table-column>
                <el-table-column prop='matchType' width='100' label="规则匹配">
                          <template slot-scope="scope">
                               <span v-if="scope.row.matchType === 1">等于</span>
                               <span v-if="scope.row.matchType === 2">包含</span>
                         </template>
                </el-table-column>
                 <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="addBtn" @click="ruleEdit(scope.$index,scope.row)">编辑</el-button>
                                <el-button class="addBtn" @click="ruleDelete(scope.$index,scope.row)">删除</el-button>
                            </template>
                </el-table-column>

            </el-table>

             <div style="margin-top:15px;position:absolute;top:190px" v-show="exporShow">
                     <p style='line-height:10px'>
                        <b style="padding-top:10px;display:inline-block">{{EdittrueTitle}}</b>
                    </p>
             </div>
            <div class="GrLE" style="position:absolute;bottom:0;width:100%;height:280px;overflow-y:scroll" v-show='exporShow'>
                <!-- <div style="border-top:1px solid #ccc;margin-bottom:15px">
                     <p style='line-height:10px'>
                        <b style="padding-top:10px;display:inline-block">{{EdittrueTitle}}</b>
                    </p>
                </div> -->
                <div style="padding:10px;border:1px solid #ccc">
                      <el-form :model="Rules">
                            <el-form-item label="规则名称：" style="width:45%;float:left" prop="name" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                                <el-input style="width:50%;margin-bottom:3px;" class="checkName" placeholder="" v-model='Rules.name' :title='Rules.name'></el-input>
                            </el-form-item>
                             <el-form-item label="匹配类型：" style="width:54%;float:right" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                                 <el-select  style="width:55%" @change="ruleTypes" v-model="ruleTypeDatas.matchType" placeholder="请选择" >
                                    <el-option v-for="item in ruleTypeData" :key="item.matchType" :label="item.Value" :value="item.matchType">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-form>
                            <el-form-item label="文件名预处理规则：" style="width:52%;float:left;clear:both">
                                 <el-select  style="width:55%" @change="fileTypes" v-model="fileDatas.fileNameProceedType" placeholder="请选择" >
                                    <el-option v-for="item in fileData" :key="item.fileNameProceedType" :label="item.Value" :value="item.fileNameProceedType">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="按位截取规则：" style="width:44%;float:right;" v-show = 'NWflag'>
                                <el-input style="width:50%;margin-bottom:3px;" class="checkName" placeholder="" v-model='NWName.name' ></el-input>
                            </el-form-item>
                            <el-form-item label="按分隔符选取规则：" style="width:46%;float:right;" v-show = 'FGflag'>
                                <el-input style="width:50%;margin-bottom:3px;" class="checkName" placeholder="" v-model='NWName.name' ></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form>
                            <el-form-item label="备注：" style="clear:both">
                                <el-input style="width:50%;margin-bottom:3px;" class="checkName" placeholder="" v-model='PLcomment' ></el-input>
                            </el-form-item>
                        </el-form>
                   
                    <p style='line-height:25px;clear:both'>
                        <b>规则定义</b>
                    </p>
                    <el-table :data="exportNumberData" stripe highlight-current-row  :max-height='120' class="indexTable containTable">
                        <el-table-column :show-overflow-tooltip="true" prop="valueType" label="选项">
                            <template slot-scope="scope">
                               <span v-if="scope.row.valueType === 1">表字段</span>
                               <span v-if="scope.row.valueType === 2">固定字符</span>
                         </template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fieldCaption" label="文件名称字符">
                        </el-table-column>
                        <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button class="addBtn" @click="ExdeletBtn(scope.$index,scope.row)">删除</el-button>
                                </template>
                        </el-table-column>
                </el-table>
                <el-table :data="data" :show-header="false"  tooltip-effect="dark" class="indexTable containTable">
                    <el-table-column :show-overflow-tooltip="true">

                                 <template slot-scope="scope">
                                <el-select  @change="exportSelect1" v-model="exportOptRule.valueType" placeholder="请选择" >
                                    <el-option v-for="item in exportOption1" :key="item.valueType" :label="item.Value" :value="item.valueType">
                                    </el-option>
                                </el-select>

                                </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                <el-select v-show='!PlStr' @change="exportSelect2" v-model="exportOptions2.fieldName" placeholder="请选择">
                                    <el-option v-for="item in exportOption2" :key="item.fieldName" :label="item.caption" :value="item.fieldName">
                                    </el-option>
                                </el-select>
                                <el-input v-show='PlStr' type='text' v-model='PlObj.value'></el-input>
                            </template>
                    </el-table-column>
                    <el-table-column>
                                <template slot-scope="scope">
                                    <el-button class="addBtn" @click="ExAddBtn(scope.row)">新增</el-button>
                                </template>
                    </el-table-column>
                </el-table>
                </div>
            </div>
         <div slot="footer" class="dialog-footer"><el-button v-show = 'pLbuttonSave' class="checkWay" @click="exportNumberSure">保存</el-button></div>
        </el-dialog>
        <!-- 一览设置 -->
        <el-dialog title="一览设置" :visible.sync="ListSettings" class="chaokuandialog" :close-on-click-modal="false" :modal-append-to-body='false'>
            <div class='SetAll'>
                <div class='SetLeft'>
                    <div class='Dsel'>待选项</div>
                    <ul class='leftOption' style="position:absolute;top: 36px;bottom:0;width:30%;overflow-y:auto">
                        <li v-for='(item,index) in ListSetData' @click="leftY(index)" :class="index==selectIndexY?'active':''">{{item.caption}}</li>
                    </ul>
                </div>
                <div class='BigIcon'>
                     <span class="fa fa-angle-right fa-2x" @click='toRight'></span>
                     <span class="fa fa-angle-double-right fa-2x" @click='toAllRight'></span>
                     <span class="fa fa-angle-left fa-2x" @click='toLeft'></span>
                     <span class="fa fa-angle-double-left fa-2x" @click='toAllLeft'></span>
                </div>
                <div class='SetRight'>
                    <div class='Dsel'>已选项
                        <p class='iconAll'>
                            <span class="fa fa-angle-double-up" @click='ArriveTop'></span>
                            <span class="fa fa-angle-up" @click='toUp'></span>
                            <span class="fa fa-angle-down" @click='toNext'></span>
                            <span class="fa fa-angle-double-down" @click='Arrivebottom'></span>
                        </p>
                        <div class='listName' style="height:35px;">
                            <span style="float: left;">显示名称</span>
                            <span>宽度</span>
                        </div>
                    </div>
                    <ul class='RightOption' style=" position: absolute; top: 71px; bottom: 0; width: 54%; overflow-y: auto;">
                        <div v-for='(item,index) in ListRightData' @click="rightY(index)">
                             <li class='lis' @click="leftYR(index)" :class="index==selectIndexYR?'active':''"><input type='text' v-model="item.caption"></li>
                             <p class='pli'><input type='text' v-model="item.width"></p>
                        </div>
                    </ul>
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="ListSettingSuer">确定</el-button>
                <el-button class="checkWay" @click="repeatSet">重置</el-button>
            </div>
        </el-dialog>
        <!--定制画面编辑-->
        <el-dialog title="定制画面编辑" :visible.sync="EditCreationTrue" class="myDialogItem smalldialog" :close-on-click-modal="false" :modal-append-to-body='false'>
            <div class='SetAll'>
                <div class='SetLeftTwo'>
                    <div class='Dsel'>待选项</div>
                    <ul class='leftOptionTwo'>
                        <li v-for='(item,index) in outList' :key='item.fieldName' @click="outClick(item,index)" :class="{'active':outIndex==index}">{{item.caption}}</li>
                    </ul>
                </div>
                <div class='BigIcon BigIconTwo'>
                    <span class="fa fa-angle-right fa-2x" @click="outleft"></span>
                    <span class="fa fa-angle-double-right fa-2x" style="padding:5px 8px" @click="outall"></span>
                    <span class="fa fa-angle-left fa-2x" @click="ownright"></span>
                    <span class="fa fa-angle-double-left fa-2x" style="padding:5px 8px" @click="ownall"></span>
                </div>
                <div class='SetRightTwo'>
                    <div class='Dsel'>已选项
                        <p class='iconAll'>
                            <span class="fa fa-angle-double-up" @click="owntop"></span>
                            <span class="fa fa-angle-up" @click="ownup"></span>
                            <span class="fa fa-angle-down" @click="owndown"></span>
                            <span class="fa fa-angle-double-down" @click="ownbottom"></span>
                        </p>
                        <div class='listNameTwo'>
                            <span>显示名称</span>
                        </div>
                    </div>
                    <ul class='RightOptionTwo' style="top:59px;">
                        <li style="width:100%;margin-right:0" v-for='(item,index) in ownList' :key='item.fieldName' @click="ownClick(item,index)" class='lis' :class="{'active':ownIndex==index}">{{item.caption}}</li>
                    </ul>
                </div>
                <div class='SetRightThr'>
                    <div class='DselThr'>
                        {{ownsrc.caption}}:属性编辑
                    </div>
                    <el-form label-width="116px" class="smallForm">
                        <el-form-item label="名称" >
                            <el-input v-model.trim="ownsrc.caption" ></el-input>
                        </el-form-item>
                        <el-form-item label="默认值" >
                            <el-input v-model.trim="ownsrc.defaultValue" ></el-input>
                        </el-form-item>
                        <el-form-item label="控件类型">
                            <el-select v-model="ownsrc.editControl" >
                                <el-option v-for="item in editTypeArr"  :value="item.code" :label="item.displayText" :key="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="显示格式" >
                            <el-input v-model.trim="ownsrc.displayFormat" ></el-input>
                        </el-form-item>
                        <el-form-item label="允许为空">
                            <el-select v-model="ownsrc.allowBlank" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="允许编辑">
                            <el-select v-model="ownsrc.allowEdit" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="继承父字段">
                            <el-select v-model="ownsrc.isInheritParent" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="继承上一条">
                            <el-select v-model="ownsrc.isInherit" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="最大长度" >
                            <el-input v-model.trim="ownsrc.maxLength" ></el-input>
                        </el-form-item>
                        <el-form-item label="文件管理阶段显示">
                            <el-select v-model="ownsrc.isFileTableShow" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="整理编目阶段显示">
                            <el-select v-model="ownsrc.isArrangeTableShow" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="档案管理阶段显示">
                            <el-select v-model="ownsrc.isManageTableShow" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否隐藏">
                            <el-select v-model="ownsrc.hidden" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="ConfirmEdit">确定</el-button>
                <el-button class="checkWay" @click="repeatSetTwo">重置</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './classManagement.service'
    @Component
    export default class appclassManagement extends Vue{
        treeData:any=[];
        SearchData:any = [];
        data:any = [];
        valueOptions:any = [];
        projectOption:any = {};
        defaultTrees:any={};
        treeLoading:boolean;
        classShow:boolean;
        bodyHeight:number;
        ul_show:boolean;
        tableData: any=[];
        addClassShow:boolean;//新增
        addgroup:boolean;//新增组
        groupNum:any = {};//分组信息
        classNum:any = {};//分类信息
        classModel:any = [];//分类模板
        classId:number;//分类ID
        keyType:string;//节点类型
        isChildren:boolean;
        ClickObj:any={};点击的对象
        selection:any = [];//列表选中项
        EditClassShow:boolean;//编辑分类组
        Editgroup:boolean;//控制分类组
        EditgroupNum:any={};
        EditclassNum:any={};
        ItemNum:any={};
        AddItemShow:boolean;
        SerachOption:boolean;
        tableShow:boolean;
        selectOption:string;
        selectOptionKey:string;
        allTable:any = [];
        Edittrue:boolean;
        printTemplates:boolean;
        printTempData:any = [];
        ordinationRules:boolean;
        ordinationData:any = [];
        ordinationOption1:any = [];
        ordinationOption1s:any = {};
        ordinationOption2:any = [];
        ordinationOption2s:any = {};
        ordinations:any = {};
        exportNumbers:boolean;
        exportNumberData:any = [];
        exportOption1:any = [];
        exportOption2:any = [];
        RulesData:any = [];
        RuleDele:any = [];
        Rules:any = {};
        exportObj = {};
        ListSettings:boolean;
        ListSetData:any = [];
        selectIndexY:number;
        ListRightData:any = [];
        listWidth:any = {};
        selectIndexYR:number;
        GuStr:boolean;
        GuObj:any = {};
        PlObj:any = {};
        exam:any  ={};
        dangTable:any = [];
        int :number;
        exporShow:boolean;
        PlStr:boolean;
        ruleTable:any = [];
        ruleTypeData:any = [];  
        ruleTypeDatas:any = {};
        EditCreationTrue:boolean;
        nape:string;
        ownList:any = [];//已具有的著录项
        outList:any = [];//为具有的著录项
        outIndex:number;//选中项
        ownIndex:number;//选中项
        outsrc:any={};
        ownsrc:any={};
        oldsrc:any={};//著录项编辑时重置
        ItemConfig:any={};//配置每一项
        exportArr:any = [];
        matType:number;
        bState:number;
        bStateId:number;   
        exportOptRule:any = {};
        exportOptions2:any = {};
        bianIndex:number;
        bianData:any = [];
        editTypeArr:any=[];
        EditgroupTitle:boolean;
        dicData:any=[];
        typeData:any=[];
        oldRow:any={};
        srcoldRow:any={};
        typeArr:any=[];
        deleIndex:number;
        ExdeletBtnIndex:number;
        exportNewData:any = [];
        exFlg:boolean;
        NWflag:boolean;
        FGflag:boolean;
        NWName:any = {};
        FGName:any = {};
        fileData:any = [];
        fileDatas:any = {};
        fileNameProceedType:number;
        fileNameProceedData:string;
        PLcomment:string;
        oldListSetting:any=[];
        printTempId:any = [];
        RightShow:boolean;
        EdittrueTitle:string;
        checkedArrs:any = [];
        rencetRules:string;
        pLbuttonSave:boolean;
        constructor(){
            super();
            this.treeData = [];
            this.defaultTrees = {
                label:'name',
                children:'children'
            };
            this.classShow=false;
            this.bodyHeight = document.documentElement.clientHeight - 152 ;
            this.ul_show=false;
            this.tableData = [];
            this.RuleDele = [];
            this.addClassShow = false;
            this.addgroup = true;
            this.exporShow = false;
            this.PlStr = false;
            this.groupNum = {
                name : null,
                log: null
            };
            this.classNum={
                name : null,
                model:null,
                log: null
            };
            this.classModel = [];
            this.classId = 0;
            this.keyType = 'ok';
            this.selection = [];
            this.EditClassShow = false;
            this.Editgroup = true;
            this.EditgroupNum = {
                name : null,
                log: null
            };
            this.EditclassNum={
                name : null,
                model:null,
                log: null
            };
            this.AddItemShow = false;
            this.GuStr = false;
            this.ItemNum={
                caption:null,
                type:null,
                fieldLength:null,
                comments:null,
                dictionaryId:null,
                decimalDigits:null,
                defaultValue:null,
                solrMode:null,
                isBatchEdit:null,
                isUnique:null,
                isNull:null
            };
            this.SerachOption = false;
            this.SearchData = [
                // {
                //     "name":'123',
                //     "project":'456'
                // }
            ]
            this.valueOptions = [];
            this.projectOption={
                project:''
            }
            this.data = [
                 {
                    name:'123',
                    project:'456'
                }
            ];
            this.tableShow = true;
            this.selectOption = '';
            this.selectOptionKey = '';
            this.Edittrue = true;
            this.printTemplates = false;
            this.ordinationRules = false;
            this.exportNumbers = false;
            this.printTempData = [
              
            ];
            this.ordinationData = [
                {
                    valueType:'',
                    fieldValue:'',
                    formatString:''
                }
            ];
            this.exam={
                formatString:''
            }
            this.ordinationOption1 = [
                {
                    valueType:1,
                    Value:'表字段'
                },
                {
                    valueType:2,
                    Value:'固定字符'
                }
            ];
            this.ordinationOption1s = {
                valueType:''
            }
            this.ruleTypeData = [
                {
                    matchType:2,
                    Value:'包含'
                },
                {
                    matchType:1,
                    Value:'等于'
                }
            ]
            this.ruleTypeDatas = {
                matchType : ''
            }
            this.ordinationOption2 = [
                
            ];
            this.ordinationOption2s = {
                valueType:""
            }
                
            

            this.ordinations = {
                valueType:'',
                Value:'',
                fileName2:'',
                caption2:''
            };
            this.exportObj = {
                valueType:'',
                Value:'',
                fileName2:'',
                caption2:''
            }
            this.exportNumberData = [

            ];
            this.exportOption1 = [
                {
                    valueType:1,
                    Value:'表字段'
                },
                {
                    valueType:2,
                    Value:'固定字符'
                }
            ];
            this.exportOption2 = [

            ];
            this.RulesData = [

            ];
            this.Rules = {
                name:''
            };
            this.GuObj = {
                value:"-"
            }
            this.PlObj = {
                value:'-'
            }
            this.ListSettings = false;
            this.ListSetData = [];
            this.selectIndexY = 0;
            this.selectIndexYR = 0;
            this.ListRightData = [];
            this.listWidth = {};
            this.dangTable = [];
            this.ruleTable = [];
            this.int = 0;
            this.EditCreationTrue = false;
            this.nape = '';
            this.ownList=[];
            this.outList=[];
            this.outIndex=0;
            this.ownIndex=0;
            this.outsrc={};
            this.ownsrc={};
            this.ItemConfig={
                caption:null,//名称
                defaultValue:null,//默认值
                editControl:null,//控件类型
                displayFormat:null,//显示格式
                allowBlank:null,//允许为空
                allowEdit:null,//允许编辑
                isInheritParent:null,//继承父子段
                maxLength:null,//最大长度
                isInherit:null,//继承上一条
                isFileTableShow:null,//文件管理阶段显示
                isArrangeTableShow:null,//整理编目阶段显示
                isManageTableShow:null,//档案管理阶段显示
            };
            this.exportArr = [];
            this.oldsrc = {};
            this.editTypeArr=[];
            this.EditgroupTitle = true;
            this.dicData = [];
            this.typeData = [];
            this.oldRow={};
            this.typeArr=[];
            this.exFlg = false;
            this.NWflag = false;
            this.FGflag = false;
            this.fileData = [
                {
                    fileNameProceedType:1,
                    Value:'不处理'
                },
                {
                    fileNameProceedType:2,
                    Value:'按位截取'
                },
                {
                    fileNameProceedType:3,
                    Value:'按分隔符选取'
                } 
            ];
            this.fileDatas={
                fileNameProceedType:'不处理'
            };
            this.fileNameProceedData = '';
            this.PLcomment = '';
            this.fileNameProceedType = 1;
            this.oldListSetting = [];
            this.printTempId = [];
            this.RightShow = false;
            this.srcoldRow = null;
            this.EdittrueTitle = '';
            this.rencetRules = '';
            this.pLbuttonSave = false;
        }
         //树节点的点击
        handleNodeClick(data){
            this.classShow = false;
            this.classId = data.id;
            if(data.children==null){
                this.isChildren = false;
            }else{
                this.isChildren = true;
            };
            // if(data.type=='folder'){
            this.keyType = data.type;
            this.ClickObj = data;
            if(data.type=='lib'){
                this.RightShow = true;
                this.ManagementArclib(this.classId);
            }else{
                this.RightShow = false;
            }
        };
        //动态菜单
       menuShow(){
           this.ul_show=!this.ul_show
           if(this.ul_show)
               document.querySelector(".span")["style"].transform = "rotate(180deg)"
           else
               document.querySelector(".span")["style"].transform = "rotate(0deg)"
       };
       //列表选中
        selectionChange(selection){
            this.selection = selection;
        }
        // 新增分类分类组
        AddRole():void{
            if(this.keyType=='folder'||this.keyType=='ok'){
                this.classShow = !this.classShow;
                this.addgroup = true;
            }else{
                this['$message']({
                    message:'当前节点不能新增组或分类。',
                    type: 'error'
                });
            }
        };
        //编辑著录项
        lendModalOut1(row){
            this.Edittrue = false;
            this.AddItemShow = true;
            this.srcoldRow = row;
            var str = JSON.stringify(row);
            this.oldRow = JSON.parse(str);
            this.ItemNum={
                caption:row.caption,
                type:row.type,
                fieldLength:row.fieldLength,
                comments:row.comments,
                dictionaryId:row.dictionaryId,
                decimalDigits:row.decimalDigits,
                defaultValue:row.defaultValue,
                solrMode:row.solrMode,
                isBatchEdit:row.isBatchEdit,
                isUnique:row.isUnique,
                isNull:row.isNull
            };
//获取类
            Service.DataTypeCandidates({}).then(res=>{
                if(res.data.succeeded){
                    this.typeData = [];
                    for(var item of res.data.data){
                        var obj = {
                            code:item.code/1,
                            displayText:item.displayText
                        };
                        this.typeData.push(obj)
                    }
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                };
            });
            //获取字典
            Service.DictionaryCandidates({}).then(res=>{
                if(res.data.succeeded){
                    this.dicData = res.data.data;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                };
            });
            //获取索引类型
            Service.solrModeCandidates().then(res=>{
                if(res.data.succeeded){
                    this.typeArr = res.data.data;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                };
            })

        };
        //新增类
        addClass():void{
           this.classNum.name = null;
           this.classNum.model = null;
           this.classNum.log = null;
            this.addClassShow = true;
            this.addgroup = false;
            Service.TemplateList({}).then(res=>{
                if(res.data.succeeded){
                    this.classModel = res.data.data;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            })
        };
//新增类
        saveClass():void{
            if(this.classNum.name!=null&&this.classNum.model!=null&&this.classNum.name!=''){
                this.addClassShow = false;
                Service.ArckindCreate({kindFolderId:this.classId,name:this.classNum.name,templateId:this.classNum.model,comment:this.classNum.log}).then(res=>{
                    if(res.data.succeeded){
                        if(this.classId==0){
                            Service.Arckind({}).then(res=>{this.treeData = res.data.data;})
                        }else{
                            if(this.isChildren){
                                this.ClickObj.children.push(res.data.data);
                            }else{
                                this.ClickObj.children = [res.data.data];
                            };
                        };
                        this['$message']({
                            message: '新增成功',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }else{
                this['$message']({
                    message: '请填写新分类的名称和所使用的模板',
                    type: 'error'
                });
            }
        };
        //新增组
        addGroup(){
            this.groupNum.name = null;
            this.groupNum.log = null;
            this.addClassShow =true;
            this.addgroup = true;
        };

        //保存新增组
        saveGroup():void{
            if(this.groupNum.name!=null&&this.groupNum.name!=''){
                this.addClassShow = false;
                Service.ArckindSave({parentId:this.classId,name: this.groupNum.name,comment:this.groupNum.log}).then(res=>{
                    if(res.data.succeeded){
                        if(this.classId==0){
                            Service.Arckind({}).then(res=>{this.treeData = res.data.data;})
                        }else{
                            if(this.isChildren){
                                this.ClickObj.children.push(res.data.data);
                            }else{
                                this.ClickObj.children = [res.data.data];
                            };
                        };
                        this['$message']({
                            message: '新增成功',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }else{
                this['$message']({
                    message: '请填写新增分类组的名称',
                    type: 'error'
                });
            }
        };

        //编辑发分类组
        //编辑发分类组
        BJgroup(){
            if(this.keyType=='folder'||this.keyType=='kind'){
                this.EditClassShow = true;
                if(this.keyType=='folder'){
                    this.EditgroupTitle = true;
                }else{
                    this.EditgroupTitle = false;
                }
                // if(this.keyType=='folder'){
                this.Editgroup = true;
                this.EditgroupNum.name = this.ClickObj.name;
                this.EditgroupNum.log = this.ClickObj.comment;
                // }else{
                //     this.Editgroup = false;
                //     Service.TemplateList({}).then(res=>{
                //         if(res.data.succeeded){
                //             this.classModel = res.data.data;
                //         }else{
                //             this['$message']({
                //                 message: res.data.errorMessage,
                //                 type: 'error'
                //             });
                //         }
                //     })
                //     this.EditclassNum.name = this.ClickObj.name;
                //     this.EditclassNum.log = this.ClickObj.comment;
                //     this.EditclassNum.model= this.ClickObj.name;
                // }
            }else{
                this['$message']({
                    message: '该档案库不可被编辑',
                    type: 'error'
                });
            }
        };
        //组编辑之后的保存
        EditGroup(){
            if(this.EditgroupNum.name!=null&&this.EditgroupNum.name!=''){
                var str = JSON.stringify(this.ClickObj);
                var obj = JSON.parse(str);
                obj.name = this.EditgroupNum.name;
                obj.comment =  this.EditgroupNum.log;
                Service.ArckindSave(obj).then(res=>{
                    if(res.data.succeeded){
                        this.ClickObj.name = res.data.data.name;
                        this.ClickObj.comment = res.data.data.comment;
                        this.EditClassShow = false;
                        this['$message']({
                            message: '成功',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    };
                });
            }else{
                this['$message']({
                    message: '请填写分类组的名称',
                    type: 'error'
                });
            }
        };
        //类编辑之后的保存
        EditClass(){
            var str = JSON.stringify(this.ClickObj);
            var obj = JSON.parse(str);
            // obj.name = this.EditgroupNum.name;
            // obj.comment =  this.EditgroupNum.log;
            Service.arckindmodify({id:obj.id,name:this.EditgroupNum.name,comments:this.EditgroupNum.log}).then(res=>{
                if(res.data.succeeded){
                    this.ClickObj.name = res.data.data.name;
                    this.ClickObj.comment = res.data.data.comment;
                    this.EditClassShow = false;
                    this['$message']({
                        message: '成功',
                        type: 'success'
                    });
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                };
            })
        }
        //删除组或分类
        deleteGroup(){
            if(this.keyType=='folder'||this.keyType=='kind'){
                if(this.keyType=='folder'){
                    var strTitle = '是否删除该分类组'
                }else{
                    var strTitle = '是否删除该分类'
                }
                this['$confirm'](strTitle, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.keyType=='folder'){
                        Service.FolderRemove(this.classId).then(res=>{
                            if(res.data.succeeded){
                                this.tableData = [];
                                this['$message']({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                Service.Arckind({}).then(res=>{
                                    if(res.data.succeeded){
                                        this.treeData = res.data.data;
                                    }
                                })
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
                    }else{
                        Service.ClassRemove(this.classId).then(res=>{
                            if(res.data.succeeded){
                                this.tableData = [];
                                this['$message']({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                Service.Arckind({}).then(res=>{
                                    if(res.data.succeeded){
                                        this.treeData = res.data.data;
                                    }
                                })
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
                    }
                        }).catch(() => {
                    this['$message']({
                        message: '已取消删除。',
                        type: 'info'
                    });
                });
            }else if(this.keyType=='ok'){
                this['$message']({
                    message: '请选择要删除的档案库。',
                    type: 'error'
                });
            }else{
                this['$message']({
                    message: '该档案库不能删除。',
                    type: 'error'
                });
            }

        }

        //取著录项列表
        ManagementArclib(params){
            Service.ManagementArclib(params).then(res=>{
                if(res.data.succeeded){
                    this.tableData = res.data.data;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            }).catch(function (err) {
                    console.log(err);
            })
        };

        //新增著录项
        AddItem(){
            if(this.classId!=0){
                this.AddItemShow = true;
                this.Edittrue = true;
                //获取类
                Service.DataTypeCandidates({}).then(res=>{
                    if(res.data.succeeded){
                        this.typeData = res.data.data;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    };
                });
                //获取字典
                Service.DictionaryCandidates({}).then(res=>{
                    if(res.data.succeeded){
                        this.dicData = res.data.data;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    };
                });
                //获取索引类型
                Service.solrModeCandidates().then(res=>{
                    if(res.data.succeeded){
                        this.typeArr = res.data.data;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    };
                });
                this.ItemNum={
                    caption:null,
                    type:null,
                    fieldLength:null,
                    comments:null,
                    dictionaryId:null,
                    decimalDigits:null,
                    defaultValue:null,
                    solrMode:null,
                    isBatchEdit:null,
                    isUnique:null,
                    isNull:null
                }
            }
            this['$refs']['ItemNum']['resetFields']();
        };
        //著录项新增保存
        SaveItems(form){
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                    if(this.Edittrue){
                        var obj = this.ItemNum;
                        obj.isFixed = false;
                        obj.itemState = 1;
                    }else{
                        var obj = {};
                        for(var key in this.oldRow){
                            if(this.ItemNum[key]){
                                obj[key]=this.ItemNum[key]
                            }else{
                                obj[key] = this.oldRow[key]
                            }
                        }
                        obj['itemState'] = 2;
                    }
                    Service.ArclibSave({libId:this.classId,data:obj}).then(res=>{
                        if(res.data.succeeded){
                            this.AddItemShow = false;
                            if(!this.Edittrue){
                                for(var key in res.data.data){
                                    if(key in this.srcoldRow){
                                        this.srcoldRow[key] = res.data.data[key]
                                    }
                                }
                            }else{
                                this.tableData.push(res.data.data);
                            }
                            this['$message']({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.ItemNum={
                                caption:null,
                                type:null,
                                fieldLength:null,
                                comments:null,
                                dictionaryId:null,
                                decimalDigits:null,
                                defaultValue:null,
                                solrMode:null,
                                isBatchEdit:null,
                                isUnique:null,
                                isNull:null
                            };
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                };
            });
        }
        //删除著录项
        deleteField(){
            if(this.selection.length>0){
                this['$confirm']('是否删除选中的著录项', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                     var arr = [];
                     for(var item of this.selection){
                         if(!item.isFixed){
                             arr.push(item.fieldName);
                         };
                     };
                     Service.FieldRemove({libId:this.classId,fieldsName:arr}).then(res=>{
                         if(res.data.succeeded){
                             this['$message']({
                                 message: '删除成功',
                                 type: 'success'
                             });
                             this.ManagementArclib(this.classId);
                         }else{
                             this['$message']({
                                 message: res.data.errorMessage,
                                 type: 'error'
                             });
                         }
                     })
                }).catch(()=>{
                    this['$message']({
                        message: '已取消',
                        type: 'info'
                    });
                })
            }else{
                this['$message']({
                    message: '请选择你要删除的著录项',
                    type: 'error'
                });
            }
        };
        EditCreation(){
            if(this.keyType!='ok'){
                this.ownList = [];
                this.outList = [];
                Service.ManagementList(this.classId).then(res=>{
                    if(res.data.succeeded){
                        this.ownList = res.data.data;
                        this.ownsrc = this.ownList[this.ownIndex];
                        var strs = JSON.stringify(this.ownList[this.ownIndex]);
                        this.oldsrc = JSON.parse(strs);
                        Service.ManagementCandidates(this.classId).then(res=>{
                            if(res.data.succeeded){
                                let data = res.data.data;
                                for(let item of data){
                                    var ind = 0;
                                    for(var son of this.ownList){
                                        if(item.fieldName==son.fieldName){
                                            ind=1;
                                        };
                                    };
                                    if(ind==0){
                                        this.outList.push(item);
                                    };
                                };
                                this.outsrc = this.outList[0];
                                Service.ManagementControl().then(res=>{
                                    if(res.data.succeeded){
                                        this.editTypeArr = res.data.data;
                                    }else{
                                        this['$message']({
                                            message: res.data.errorMessage,
                                            type: 'error'
                                        });
                                    }
                                })
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
                this.EditCreationTrue = true;
            }
        };
        //选中项
        outClick(item,index){
            this.outIndex = index;
            this.outsrc = item;
        };
        //选中项
        ownClick(item,index){
            this.ownIndex = index;
            this.ownsrc = item;
            var str = JSON.stringify(item);
            this.oldsrc = JSON.parse(str);
        };
        //选中项向右
        outleft(){
            if(this.outList.length>0){
                var str = JSON.stringify(this.outList[this.outIndex]);
                var obj = JSON.parse(str);
                if(Object.keys(obj).length<=2){
                    obj.defaultValue=null;
                    obj.editControl='1';
                    obj.displayFormat=null;
                    obj.allowBlank=false;
                    obj.allowEdit=false;
                    obj.isInheritParent=false;
                    obj.maxLength=null;
                    obj.isInherit=false;
                    obj.isFileTableShow=false;
                    obj.isArrangeTableShow=false;
                    obj.isManageTableShow=false;
                    obj.hidden=false;
                };
                if(this.ownList.length==0){
                    this.ownIndex = 0;
                }
                this.ownList.push(obj);
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
                this.outList.splice(this.outIndex,1);
                if(this.outIndex>=this.outList.length-1){
                    this.outIndex = this.outList.length-1;
                    if(this.outIndex<0){
                        this.outIndex = 0;
                    }
                }
            }
        }
        //全部向右
        outall(){
            if(this.outList.length>0){
                if(this.ownList.length==0){
                    this.ownIndex=0;
                    this.ownsrc = {
                        caption:null,//名称
                        defaultValue:null,//默认值
                        editControl:null,//控件类型
                        displayFormat:null,//显示格式
                        allowBlank:null,//允许为空
                        allowEdit:null,//允许编辑
                        isInheritParent:null,//继承父子段
                        maxLength:null,//最大长度
                        isInherit:null,//继承上一条
                        isFileTableShow:null,//文件管理阶段显示
                        isArrangeTableShow:null,//整理编目阶段显示
                        isManageTableShow:null,//档案管理阶段显示
                        hidden:false
                    };
                }
                for(var item of this.outList){
                    if(Object.keys(item).length<=2){
                        item.defaultValue=null;
                        item.editControl=null;
                        item.displayFormat=null;
                        item.allowBlank=false;
                        item.allowEdit=false;
                        item.isInheritParent=false;
                        item.maxLength=null;
                        item.isInherit=false;
                        item.isFileTableShow=false;
                        item.isArrangeTableShow=false;
                        item.isManageTableShow=false;
                        item.hidden = false;
                    };
                    this.ownList.push(item);
                };
                this.ownsrc = this.ownList[this.ownIndex];
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(str);
            }
            this.outList = [];
            this.outIndex = 0;
        };
        //向左
        ownright(){
            if(this.ownList.length>0){
                this.outList.push( this.ownList[this.ownIndex]);
                this.ownList.splice(this.ownIndex,1);
                if(this.ownIndex>=this.ownList.length-1){
                    if(this.ownList.length<=0){
                        this.ownIndex = 0;
                        this.ownsrc ={
                            caption:null,//名称
                            defaultValue:null,//默认值
                            editControl:null,//控件类型
                            displayFormat:null,//显示格式
                            allowBlank:null,//允许为空
                            allowEdit:null,//允许编辑
                            isInheritParent:null,//继承父子段
                            maxLength:null,//最大长度
                            isInherit:null,//继承上一条
                            isFileTableShow:null,//文件管理阶段显示
                            isArrangeTableShow:null,//整理编目阶段显示
                            isManageTableShow:null,//档案管理阶段显示
                            hidden:false
                        };
                        this.oldsrc = {
                            caption:null,//名称
                            defaultValue:null,//默认值
                            editControl:null,//控件类型
                            displayFormat:null,//显示格式
                            allowBlank:null,//允许为空
                            allowEdit:null,//允许编辑
                            isInheritParent:null,//继承父子段
                            maxLength:null,//最大长度
                            isInherit:null,//继承上一条
                            isFileTableShow:null,//文件管理阶段显示
                            isArrangeTableShow:null,//整理编目阶段显示
                            isManageTableShow:null,//档案管理阶段显示
                            hidden:false,
                        };
                    }else{
                        this.ownIndex = this.ownList.length-1;
                        this.ownsrc = this.ownList[this.ownIndex];
                        var strs = JSON.stringify(this.ownList[this.ownIndex]);
                        this.oldsrc = JSON.parse(strs);
                    }
                }else{
                    this.ownsrc = this.ownList[this.ownIndex];
                    var strs = JSON.stringify(this.ownList[this.ownIndex]);
                    this.oldsrc = JSON.parse(strs);
                };
            }
        };
        //全部向左
        ownall(){
            if(this.outList.length==0){
                this.outIndex=0;
            }
            this.outList=this.outList.concat(this.ownList);
            this.ownList = [];
            this.ownIndex = 0;
            this.ownsrc = {
                caption:null,//名称
                defaultValue:null,//默认值
                editControl:null,//控件类型
                displayFormat:null,//显示格式
                allowBlank:null,//允许为空
                allowEdit:null,//允许编辑
                isInheritParent:null,//继承父子段
                maxLength:null,//最大长度
                isInherit:null,//继承上一条
                isFileTableShow:null,//文件管理阶段显示
                isArrangeTableShow:null,//整理编目阶段显示
                isManageTableShow:null,//档案管理阶段显示
                hidden:false
            };
            this.oldsrc = {
                caption:null,//名称
                defaultValue:null,//默认值
                editControl:null,//控件类型
                displayFormat:null,//显示格式
                allowBlank:null,//允许为空
                allowEdit:null,//允许编辑
                isInheritParent:null,//继承父子段
                maxLength:null,//最大长度
                isInherit:null,//继承上一条
                isFileTableShow:null,//文件管理阶段显示
                isArrangeTableShow:null,//整理编目阶段显示
                isManageTableShow:null,//档案管理阶段显示
                hidden:false,
            };
        };
        //上移
        ownup(){
            if(this.ownIndex>0){
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                var obj = JSON.parse(str);
                this.ownList.splice(this.ownIndex,1);
                this.ownIndex--;
                this.ownList.splice(this.ownIndex,0,obj);
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //置顶
        owntop(){
            if(this.ownIndex>0){
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                var obj = JSON.parse(str);
                this.ownList.splice(this.ownIndex,1);
                this.ownList.unshift(obj);
                // this.ownsrc = this.ownList[0];
                this.ownIndex = 0;
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //下移
        owndown(){
            if(this.ownIndex<this.ownList.length-1){
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                var obj = JSON.parse(str);
                this.ownList.splice(this.ownIndex,1);
                this.ownIndex++;
                this.ownList.splice(this.ownIndex,0,obj);
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //置底
        ownbottom(){
            if(this.ownIndex!=this.ownList.length-1){
                this.ownList.splice(this.ownIndex,1);
                this.ownList.push(this.ownsrc);
                this.ownIndex = this.ownList.length-1;
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //属性编辑的重置
        repeatSetTwo(){
            if(this.ownList.length>0){
                var obj = this.ownList[this.ownIndex];
                for(var key in this.oldsrc){
                    if(this.oldsrc[key]||this.oldsrc[key]==null){
                        obj[key]=this.oldsrc[key];
                    };
                };
            };
        };
        //属性编辑后的提交
        ConfirmEdit(){
            if(this.ownList.length>0){
                Service.ManagementSave({libId:this.classId,data:this.ownList}).then(res=>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.EditCreationTrue = false;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            };
        }
        //设置检索项
        SerachOptions(){
            if(this.classId!=0){
                this.SerachOption = true;
                 Service.queryconditionGet(this.classId).then(res=>{
                    if(res.data.succeeded == true){
                        this.SearchData = res.data.data;
                        if(this.SearchData.length == 0){
                            this.tableShow = false;
                        }else{
                            this.tableShow = true;
                        }
                    }

                })
            Service.candidates(this.classId).then(res=>{
                    if(res.data.succeeded == true){
                        this.valueOptions = res.data.data;
                    }
                })
            }else{
                 this['$message']({
                    message: '请选择树的节点。',
                    type: 'error'
                });
            }



        }
        //匹配设置项
        selectGet(value){
            console.log(value)
            let obj = {};
            obj = this.valueOptions.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.fieldName === value;//筛选出匹配数据
            })

            this.projectOption.project = obj.caption;
            this.selectOption = obj.caption;
            this.selectOptionKey = obj.fieldName;
        }
        //搜索设置项确定
        SerachSure(){
            Service.queryconditionSave({
                'libId':this.classId,
                'data':this.allTable
            }).then(res=>{
                if(res.data.succeeded == true){
                    this.SerachOption = false;
                    this.allTable = [];
                    this.projectOption.project='';
                }
            })
        }
        //新增设置项
        AddBtn(){
            if(this.projectOption.project == ''){
                this['$message']({
                    message: '请填写项目名称。',
                    type: 'error'
                });
            }else{
                    var params = {};
                    params.fieldName = this.selectOption;
                    params.caption = this.projectOption.project;
                    params.itemState = 1;
                    params.id = '';
                    this.allTable.push(params)
                    this.SearchData.push(params);
                    if(this.SearchData.length == 0){
                            this.tableShow = false;
                    }else{
                            this.tableShow = true;
                        }
            }

        }
        //删除设置项
        deletBtn(index,row){
            this.SearchData.splice(index,1);
            var params = {};
            params.fieldName = row.fieldName;
            params.caption = row.caption;
            params.id = row.id;
            params.itemState = 3;
            this.allTable.push(params)
            console.log(this.allTable)
        }
        //打印模板
        printTemplate(){
            let that = this;
            if(this.classId!=0){
                this.printTemplates = true;
                this.checkedArrs = [];
                Service.getReportTempListByLibId({
                    libId:this.classId
                }).then(res=>{
                    this.printTempData = res.data.data;
                    this.printTempData.filter((item)=>{
                        if(item.isBind == true){
                            this.checkedArrs.push(item)
                        }
                    })
                }).then(res=>{
                    this.checked();
                })
            }else{
                this['$message']({
                    message: '请选择树的节点。',
                    type: 'error'
                });
            }
        }
        checked(){
             this.checkedArrs.filter(item=>{
                this['$refs']['pendingTables']['toggleRowSelection'](item,true)
            })
            
            
        }
        printTempDataSelect(data:any){
            console.log(data);
            this.printTempId = [];
            for(let int of data){
                this.printTempId.push(int.id)
            }
        }
        //打印模板 确定
        printTempSure(){
            Service.updateReportByLibId({
                "libId":this.classId,
	            "tempIds":this.printTempId
            }).then(res=>{
                if(res.data.succeeded == true){
                     this.printTemplates = false;
                     this['$message']({
                        message: '保存成功。',
                        type: 'success'
                    });
                }else{
                     this.printTemplates = true;
                     this['$message']({
                        message: '保存失败。',
                        type: 'error'
                     });
                }
            })
        }
        //档号规则
        ordinationRule(){
            if(this.classId!=0){
                this.ordinationRules = true;
                Service.nosettings(this.classId).then(res=>{
                    this.ordinationData = res.data.data;
                    console.log(res.data.data)
                    this.ordinationData.filter(item=>{
                        this.rencetRules +=  item.fieldCaption;
                    })
                    // this.rencetRules
                    Service.candidates(this.classId).then(res=>{
                        this.ordinationOption2 = res.data.data;
                    })
                })
            }else{
                this['$message']({
                    message: '请选择树的节点。',
                    type: 'error'
                });
            }
        }
        //档号规则 确定
        ordinationSure(){
            Service.SaveNosettings({
                 'libId':this.classId,
                 'data':this.dangTable
            }).then(res=>{
                 if(res.data.succeeded == true){
                    this.ordinationRules = false;
                    this.dangTable = [];
                    this.ordinationOption1s.valueType = '';
                    // this.ordinationOption2s.fieldName ='';
                    this.ordinations.caption2 = '';
                    this.exam.formatString = '';
                    this.GuObj.value = '-';
                    this.rencetRules = '';
                    this['$message']({
                    message: '保存成功。',
                    type: 'success'
                    });
                }
            })
        }
        //档号规则 选择1
        ordinationSelect1(value){
             console.log(value)
            let obj = {};
            obj = this.ordinationOption1.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.valueType === value;//筛选出匹配数据
            })
            this.ordinations.valueType = obj.Value;
            this.ordinations.Value = obj.valueType;
            if(value == 1){
                this.GuStr = false;
            }else if(value ==2){
                this.GuStr = true;
            }


        }
        //档号规则 选择2
        ordinationSelect2(value){
            console.log(value)
            let obj = {};
            obj = this.ordinationOption2.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.fieldName === value;//筛选出匹配数据
            })
            this.ordinations.fileName2 = obj.fieldName;
            this.ordinations.caption2 = obj.caption;


        }
        //档号规则 新增
        OrAddBtn(){
                    if(this.ordinationOption1s.valueType == ''){
                         this['$message']({
                            message: '请选择选项',
                            type: 'warning'
                            });
                    }else if(this.ordinationOption1s.valueType == 1){
                         if(this.ordinationOption2s.fieldName == undefined ||this.ordinationOption2s.fieldName == ''){
                                 this['$message']({
                                    message: '请选择显示字符',
                                    type: 'warning'
                                    });
                            }else{
                                    this.ordinationOption2s.fieldName = '';
                                    this.ordinationOption1s.valueType = '';
                                    var params = {};
                                    params.valueType = this.ordinations.Value;
                                    params.formatString = this.exam.formatString;
                                    params.itemState = 1;
                                    params.no = this.ordinationData.length+1;
                                    if(this.GuStr){
                                        params.fieldValue= this.GuObj.value;
                                        params.fieldCaption = this.GuObj.value;
                                    }else{
                                        params.fieldValue = this.ordinations.fileName2;
                                        params.fieldCaption = this.ordinations.caption2;
                                    }
                                    this.ordinationData.push(params)
                                    this.exam.formatString = '';
                                    if(this.GuStr){
                                        this.GuObj.value= '-';
                                    }
                                    this.dangTable.push(params)
                                    this.rencetRules +=this.ordinations.caption2
                            }
                    }else if(this.ordinationOption1s.valueType == 2){
                        if(this.GuObj.value == ''){
                            this['$message']({
                                message: '请填写显示字符',
                                type: 'warning'
                            });
                        }else{
                                    this.ordinationOption1s.valueType = '';
                                    var params = {};
                                    params.valueType = this.ordinations.Value;
                                    params.formatString = this.exam.formatString;
                                    params.itemState = 1;
                                    params.no = this.ordinationData.length+1;
                                    if(this.GuStr){
                                        params.fieldValue= this.GuObj.value;
                                        params.fieldCaption = this.GuObj.value;
                                    }else{
                                        params.fieldValue = this.ordinations.fileName2;
                                        params.fieldCaption = this.ordinations.caption2;
                                    }
                                    this.ordinationData.push(params)
                                    this.exam.formatString = '';
                                    if(this.GuStr){
                                        this.GuObj.value= '-';
                                    }
                                    this.dangTable.push(params)
                                    this.rencetRules +=this.GuObj.value
                            }
                    }else if(this.ordinationOption2s.fieldName == undefined ||this.ordinationOption2s.fieldName == ''){
                         this['$message']({
                            message: '请选择显示字符',
                            type: 'warning'
                        });
                    }else{  
                            this.ordinationOption1s.valueType = '';
                            this.ordinationOption2s.fieldName = '';
                            var params = {};
                            params.valueType = this.ordinations.Value;
                            params.formatString = this.exam.formatString;
                            params.itemState = 1;
                            params.no = this.ordinationData.length+1;
                            if(this.GuStr){
                                params.fieldValue= this.GuObj.value;
                                params.fieldCaption = this.GuObj.value;
                            }else{
                                params.fieldValue = this.ordinations.fileName2;
                                params.fieldCaption = this.ordinations.caption2;
                            }
                            this.ordinationData.push(params)
                            this.exam.formatString = '';
                            if(this.GuStr){
                                this.GuObj.value= '-';
                            }
                            this.dangTable.push(params)
                    }
                    console.log(this.dangTable)

        }
         //档号规则 删除
        OrdeletBtn(index,row){
            this.ordinationData.splice(index,1);
            let params = {};
            params.valueType = row.valueType;
            params.fieldValue = row.fieldValue;
            params.formatString = this.exam.formatString;
            params.id = row.id;
            params.itemState = 3;
            this.dangTable.push(params)
            console.log(this.ordinationData);
            var str = '';
            this.ordinationData.filter(item=>{
                str+= item.fieldCaption;
            })
            this.rencetRules = str;
        }
        //批量挂接规则
        exportNumber(){
            if(this.classId!=0){
                 this.exportNumbers = true;
                 this.pLbuttonSave = false;
                Service.getRule(this.classId).then(res=>{
                    // RulesData
                    // exportNumberData
                    this.RulesData = res.data.data;
                    // let obj = {};
                    // for(var i=0;i<this.RulesData.length;i++){
                        
                    // }
                     Service.candidates(this.classId).then(res=>{
                        this.exportOption2 = res.data.data;
                    })

                })
            }else{
                this['$message']({
                    message: '请选择树的节点。',
                    type: 'error'
                });
            }
        }
        //批量挂接规则 确定
        exportNumberSure(){
            if(this.exporShow == false)
            this['$message']({
                            message: '保存成功。',
                            type: 'success'
                        });
            let arr = [];
            let brr = [];
            console.log(this.ruleTable)
            for(let table of this.ruleTable){
                  let obj = {
                    createDate: null,
                    createPerson: "",
                    createPersonId: null,
                    deleteDate: null,
                    deletePerson: "",
                    deletePersonId: null,
                    id: null,
                    recordStatus: false,
                    ruleId: null,
                    seq: 0,
                    updateDate: null,
                    updatePerson: "",
                    updatePersonId: null,
                };
                obj['valueType'] = table.valueType;
                obj['itemState'] = table.itemState;
                obj['fieldValue'] = table.fieldValue;
                arr.push(obj)
            }
            let itemState;
            let ids = null;
            // console.log(this.RuleDele)
            console.log(arr)
            if(this.bState == 1){
                itemState = 1
                this.fileNameProceedData = this.NWName.name;
                if(this.Rules.name == '' || this.ruleTypeDatas.matchType == ''){
                    this['$message']({
                                message: '请填写必填项。',
                                type: 'warning'
                        });
                    this.exporShow = true;
                }else{
                    Service.saveRule({
                    items:arr,
                    ruleName:this.Rules.name,
                    matchType:this.matType,
                    itemState:itemState,
                    createDate: null,
                    createPerson: "",
                    createPersonId: null,
                    deleteDate: null,
                    deletePerson: "",
                    deletePersonId: null,
                    id: ids,
                    libId: this.classId,
                    recordStatus: false,
                    updateDate: null,
                    updatePerson: "",
                    updatePersonId:'',
                    fileNameProceedType:this.fileNameProceedType,
                    fileNameProceedData:this.fileNameProceedData,
                    comment:this.PLcomment
                    }).then(res=>{
                        if(res.data.succeeded == true){
                        //   this.RulesData = res.data.data;
                             this.RulesData.push(res.data.data);
                             this['$message']({
                                message: '保存成功。',
                                type: 'success'
                            });
                            this.exporShow = false;
                            this.pLbuttonSave = false;
                        }
                    })
                }
            
                 
            }else if(this.bState == 2){//编辑
                itemState = 2;
                if(this.Rules.name == '' || this.ruleTypeDatas.matchType == ''){
                    this['$message']({
                                message: '请填写必填项。',
                                type: 'warning'
                        });
                    this.exporShow = true;
                }else{
                    if(this.bianData.length == 0 && this.exportNumberData.length == 0){//本身没有数据 && 不添加数据
                        let crr = [];
                        ids = this.RuleDele.id;
                        for(let i= 0; i<this.ruleTable.length;i++){
                            let obj = {
                                createDate: null,
                                createPerson: "",
                                createPersonId: null,
                                deleteDate: null,
                                deletePerson: "",
                                deletePersonId: null,
                                id: null,
                                recordStatus: false,
                                ruleId: null,
                                seq: 0,
                                updateDate: null,
                                updatePerson: "",
                                updatePersonId: null,
                            };
                                obj['valueType'] = this.ruleTable[i].valueType;
                                obj['itemState'] = this.ruleTable[i].itemState;
                                obj['fieldValue'] = this.ruleTable[i].fieldValue;
                                crr.push(obj)
                        }
                        Service.saveRule({
                            items:crr,
                            ruleName:this.Rules.name,
                            matchType:this.matType,
                            itemState:itemState,
                            createDate: null,
                            createPerson: "",
                            createPersonId: null,
                            deleteDate: null,
                            deletePerson: "",
                            deletePersonId: null,
                            id: ids,
                            libId: this.classId,
                            recordStatus: false,
                            updateDate: null,
                            updatePerson: "",
                            updatePersonId:'',
                            fileNameProceedType:this.fileNameProceedType,
                            fileNameProceedData:this.NWName.name,
                            comment:this.PLcomment
                        }).then(res=>{
                            if(res.data.succeeded == true){
                            this.ruleTable = [];
                            this.RulesData.splice(this.bianIndex,1,res.data.data);
                                this['$message']({
                                    message: '保存成功。',
                                    type: 'success'
                                });
                            }
                        })
                    }else if(this.exportNewData.length!=0 && this.exFlg == true){//本身没有数据 +  新增的数据
                        console.log(this.ruleTable)
                        let brr=[]
                        for(let i= 0; i<this.exportNewData.length;i++){
                            let obj = {
                                createDate: null,
                                createPerson: "",
                                createPersonId: null,
                                deleteDate: null,
                                deletePerson: "",
                                deletePersonId: null,
                                id: null,
                                recordStatus: false,
                                ruleId: null,
                                seq: 0,
                                updateDate: null,
                                updatePerson: "",
                                updatePersonId: null,
                            };
                                obj['valueType'] = this.exportNewData[i].valueType;
                                obj['itemState'] = this.exportNewData[i].itemState;
                                obj['fieldValue'] = this.exportNewData[i].fieldValue;
                                brr.push(obj)
                        }
                        console.log(brr)
                        ids = this.RuleDele.id;
                        Service.saveRule({
                            items:brr,
                            ruleName:this.Rules.name,
                            matchType:this.matType,
                            itemState:itemState,
                            createDate: null,
                            createPerson: "",
                            createPersonId: null,
                            deleteDate: null,
                            deletePerson: "",
                            deletePersonId: null,
                            id: ids,
                            libId: this.classId,
                            recordStatus: false,
                            updateDate: null,
                            updatePerson: "",
                            updatePersonId:''
                        }).then(res=>{
                            if(res.data.succeeded == true){
                            this.RulesData.splice(this.bianIndex,1,res.data.data);
                                this['$message']({
                                    message: '保存成功。',
                                    type: 'success'
                                });
                            }
                        })
                    }else{//本身有数据 + 新增的数据
                        console.log(this.RuleDele)
                        console.log(this.ruleTable)
                        if(this.RuleDele.items.length==0){//本身没有数据  进行删除
                            ids = this.RuleDele.id;
                            let err = [];
                            for(var i=0;i<this.ruleTable.length;i++){
                                let obj = {
                                    createDate: null,
                                    createPerson: "",
                                    createPersonId: null,
                                    deleteDate: null,
                                    deletePerson: "",
                                    deletePersonId: null,
                                    id: null,
                                    recordStatus: false,
                                    ruleId: null,
                                    seq: 0,
                                    updateDate: null,
                                    updatePerson: "",
                                    updatePersonId: null
                                }
                                
                                obj['valueType'] = this.ruleTable[i].valueType;
                                obj['itemState'] = this.ruleTable[i].itemState;
                                obj['fieldValue'] = this.ruleTable[i].fieldValue;
                                err.push(obj)
                            }
                            this.fileNameProceedData = this.NWName.name;
                            Service.saveRule({
                                items:err,
                                ruleName:this.Rules.name,
                                matchType:this.matType,
                                itemState:itemState,
                                createDate: null,
                                createPerson: "",
                                createPersonId: null,
                                deleteDate: null,
                                deletePerson: "",
                                deletePersonId: null,
                                id: ids,
                                libId: this.classId,
                                recordStatus: false,
                                updateDate: null,
                                updatePerson: "",
                                updatePersonId:'',
                                fileNameProceedType:this.fileNameProceedType,
                                fileNameProceedData:this.fileNameProceedData,
                                comment:this.PLcomment
                                }).then(res=>{
                                    if(res.data.succeeded == true){
                                        this.ruleTable = [];
                                        console.log(res.data.data.items)
                                        this.exportNumberData = res.data.data.items;
                                        this.RulesData.splice(this.bianIndex,1,res.data.data);
                                        this['$message']({
                                            message: '保存成功。',
                                            type: 'success'
                                            });
                                    }
                                })


                        }else{//进行数据的删除 或新增
                            ids = this.RuleDele.id;
                            let crr = [];
                            console.log(this.ruleTable)
                            for(var i=0;i<this.exportNumberData.length;i++){
                                let obj = {
                                    createDate: null,
                                    createPerson: "",
                                    createPersonId: null,
                                    deleteDate: null,
                                    deletePerson: "",
                                    deletePersonId: null,
                                    id: null,
                                    recordStatus: false,
                                    ruleId: null,
                                    seq: 0,
                                    updateDate: null,
                                    updatePerson: "",
                                    updatePersonId: null,
                                }
                                obj['valueType'] = this.exportNumberData[i].valueType;
                                obj['itemState'] = this.exportNumberData[i].itemState;
                                obj['fieldValue'] = this.exportNumberData[i].fieldValue;
                                crr.push(obj)
                            }
                            Service.saveRule({
                                items:crr,
                                ruleName:this.Rules.name,
                                matchType:this.matType,
                                itemState:itemState,
                                createDate: null,
                                createPerson: "",
                                createPersonId: null,
                                deleteDate: null,
                                deletePerson: "",
                                deletePersonId: null,
                                id: ids,
                                libId: this.classId,
                                recordStatus: false,
                                updateDate: null,
                                updatePerson: "",
                                updatePersonId:'',
                                fileNameProceedType:this.fileNameProceedType,
                                fileNameProceedData:this.NWName.name,
                                comment:this.PLcomment
                                }).then(res=>{
                                    if(res.data.succeeded == true){
                                        this.ruleTable = [];
                                        console.log(res.data.data.items)
                                        // this.exportNumberData = res.data.data.items;
                                        this.exportNumberData = this.exportNumberData;
                                        this.RulesData.splice(this.bianIndex,1,res.data.data);
                                        this['$message']({
                                            message: '保存成功。',
                                            type: 'success'
                                            });
                                    }
                            })
                        }
                    }
                    this.exporShow = false;
                }
            }else if(this.bState == 3){//删除
                itemState = 3;
                ids = this.RuleDele.id;
                this.RuleDele.items[0].id = this.RuleDele.id;
                this.matType = this.RuleDele.matchType;
                this.Rules.name = this.RuleDele.ruleName
                ids = this.RuleDele.id;
                if(this.ruleTable.length==0){
                    arr.push(obj);
                }
                  Service.saveRule({
                    items:arr,
                    ruleName:this.Rules.name,
                    matchType:this.matType,
                    itemState:itemState,
                    createDate: null,
                    createPerson: "",
                    createPersonId: null,
                    deleteDate: null,
                    deletePerson: "",
                    deletePersonId: null,
                    id: ids,
                    libId: this.classId,
                    recordStatus: false,
                    updateDate: null,
                    updatePerson: "",
                    updatePersonId:'',
                    fileNameProceedType:this.fileNameProceedType,
                    fileNameProceedData:this.NWName.name,
                    comment:this.PLcomment
                    }).then(res=>{
                        if(res.data.succeeded == true){
                                    this['$message']({
                                        message: '删除成功。',
                                        type: 'success'
                                        });
                        }
                    })
                    this.exporShow = false;
            }
            // this.exporShow = false;
        }
        //批量挂接规则 规则定义
        ruleTypes(value){
            let obj = {};
            obj = this.ruleTypeData.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.matchType === value;//筛选出匹配数据
            })
            this.matType = value;
            this.ruleTypeDatas.matchType = this.matType;

        }
        //批量挂接规则 列表删除
        ExdeletBtn(index,row){
            var  obj = {};
            var  brr = [];
            this.bState = 2;
            this.ExdeletBtnIndex = index;
            obj.valueType = this.exportNumberData[index].valueType;
            obj.itemState = this.exportNumberData[index].itemState;
            obj.fieldValue= this.exportNumberData[index].fieldValue;
            obj.fieldCaption = this.exportNumberData[index].fieldCaption;
            obj.no = this.exportNumberData[index].fieldCaption.no;
            this.exportNumberData[index].itemState = 3;
            obj.itemState = this.exportNumberData[index].itemState;
            brr.push(obj)
            this.ruleTable = this.ruleTable.concat(brr) ;//拼接删除的数据
            console.log(this.ruleTable)
            this.exportNumberData.splice(index,1);

        }
        //批量挂接规则 列表新增
        ExAddBtn(){ 
                    this.exFlg = false;
                    // this.exportOptRule.valueType = ''
                    // this.exportOptions2.fieldName = '';
                    var params = {};
                    params.valueType = this.exportObj.Value;
                    params.itemState = 1;
                    params.no = this.exportNumberData.length+1;
                     if(this.PlStr){
                         params.fieldValue= this.PlObj.value;
                         params.fieldCaption = this.PlObj.value;
                    }else{
                        params.fieldValue = this.exportObj.fileName2;
                        params.fieldCaption = this.exportObj.caption2;
                    }
                    if(this.exportNumberData.length == 0){//当前数据为空  点击新增之后出现数据
                        this.exportNumberData.push(params)
                        this.exportNewData = this.exportNumberData;
                    }else{
                        this.exportNewData = [];
                        this.exportNumberData.push(params)
                    }
                    
                    if(this.PlStr){
                         this.PlObj.value= '-';
                    }
                    this.ruleTable.push(params);
                    console.log(this.ruleTable)
                    console.log(this.exportNumberData)

        }
        //批量挂接规则 编辑
        ruleEdit(index,row){
            // this.exportNumberData = [];
            this.pLbuttonSave = true;
            this.EdittrueTitle = '编辑规则'
            this.ruleTable = []
            this.bianIndex = index;
            this.bianData = row.items;
            console.log(row)
            if(row.items.length == 0){
                this.exporShow = true;
                this.exportNumberData = [];
                this.RuleDele = row;
                this.bState = 2;//编辑
                this.Rules.name = row.ruleName;
                this.ruleTypeDatas.matchType = row.matchType;
                this.matType = row.matchType;
                this.fileDatas.fileNameProceedType = row.fileNameProceedType;
                if(row.fileNameProceedType == 2){
                   this.NWflag = true;
                   this.FGflag = false;
                }else if(row.fileNameProceedType == 3){
                    this.FGflag = true;
                    this.NWflag = false;
                }else if(row.fileNameProceedType == 1){
                    this.FGflag = false;
                    this.NWflag = false;
                }
                 this.NWName.name = row.fileNameProceedData;
                 this.PLcomment = row.comment;

            }else{
                this.exportNumberData = [];
                this.RuleDele = row;
                this.exporShow = true;
                this.bState = 2;//编辑
                console.log(row);
                let obj= {};
                let crr = [];
                this.Rules.name = row.ruleName;
                this.ruleTypeDatas.matchType = row.matchType;
                this.matType = row.matchType;
                this.fileDatas.fileNameProceedType = row.fileNameProceedType;
                 if(row.fileNameProceedType == 2){
                   this.NWflag = true;
                   this.FGflag = false;
                }else if(row.fileNameProceedType == 3){
                    this.FGflag = true;
                    this.NWflag = false;
                }else if(row.fileNameProceedType == 1){
                    this.FGflag = false;
                    this.NWflag = false;
                }
                this.NWName.name = row.fileNameProceedData;
                this.PLcomment = row.comment;
                for(var i=0;i<row.items.length;i++){
                     this.exportNumberData.push(row.items[i]);
                }

                console.log(this.exportNumberData)

            }



        }
        //批量挂接规则 删除;
        ruleDelete(index,row){
            this.exFlg = false;
            this.bianIndex = index;
            this.bStateId = row.id;
            this.deleIndex = index;
            console.log(row)
            this.RuleDele = row;
            this.bState = 4;//删除
            this.RulesData.splice(index,1);
             Service.saveRule({
                    itemState:3,
                    id:row.id
                }).then(res=>{
                    if(res.data.succeeded == true){
                        this.exporShow = false;
                        this['$message']({
                            message: '删除成功。',
                            type: 'success'
                    });
                    
                    }
            })
        }
        //批量挂接规则 选择1
        exportSelect1(value){
            let obj = {};
            obj = this.exportOption1.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.valueType === value;//筛选出匹配数据
            })
            this.exportObj.valueType = obj.Value;
            this.exportObj.Value = obj.valueType;
            if(value == 1){
                this.PlStr = false;
            }else if(value == 2){
                this.PlStr = true;
            }
        }
        //批量挂接规则 选择2
        exportSelect2(value){
            console.log(value)
            let obj = {};
            obj = this.exportOption2.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.fieldName === value;//筛选出匹配数据
            })
            this.exportObj.fileName2 = obj.fieldName;
            this.exportObj.caption2 = obj.caption;
        }
        //批量挂接规则 新增
        newAdd(){
            this.exporShow = true;
            this.pLbuttonSave = true;
            this.EdittrueTitle = '新增规则'
            this.exportNumberData = [];
            this.Rules.name = '';
            this.bState = 1;//新增
            // this.exportOptions2.fieldName = '';
            this.ruleTypeDatas.matchType = ''
            // this.exportOptRule.valueType = ''
            this.NWName.name = '';
            this.fileDatas.fileNameProceedType  = '不处理'
            this.fileNameProceedType =1;
            this.PLcomment = '';
            this.NWflag =false;
            this.FGflag = false;
            
        }
        //文件名预处理规则
        fileTypes(value){
            let obj = {};
            obj = this.fileData.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.fileNameProceedType === value;//筛选出匹配数据
            })
            this.fileNameProceedType = value;
            if(value == 2){
                this.NWflag =true;
                this.FGflag = false;
            }else if(value == 3){
                this.FGflag = true;
                this.NWflag = false;
            }
        }
        //批量挂接 点击x 清空数据
        handleClose1(){
            this.RulesData = [];
            this.exporShow = false;
            this.exportNumbers = false;
        }
        //档号规则 点击x 清空数据
        handleClose2(){
            this.ordinationRules = false;
            this.ordinationOption1s.valueType = '';
            this.ordinationOption2s.fieldName ='';
            this.exam.formatString = '';
            this.GuObj.value = '-';
            this.rencetRules = '';
        }   
        //一览设置
        ListSetting(){
            if(this.keyType!='ok'){
                Service.ManagementDispList(this.classId).then(res=>{
                    if(res.data.succeeded){
                        this.ListSettings = true;
                        this.ListSetData = [];
                        this.selectIndexY = 0;
                        this.selectIndexYR = 0;
                        this.ListRightData = res.data.data;
                        for(var item of this.tableData){
                            var key = false;
                            for(var son of this.ListRightData){
                                if(son['fieldName'] == item['fieldName']){
                                    key = true;
                                };
                            };
                            if(!key){
                                applyTo: 1
                                caption: "状态"
                                fieldName: "ARCHIVE_STATUS"

                                width: 60
                                var obj = {
                                    applyTo: 1,
                                    caption: item.caption,
                                    fieldName: item.fieldName,
                                    isArrangeTableShow: null,
                                    isFileTableShow: null,
                                    isManageTableShow: null,
                                    itemState: 0,
                                    libId: this.classId,
                                    sortSeq: 0,
                                    width: null,
                                };
                                this.ListSetData.push(obj);
                            };
                        };
                        var data = JSON.stringify(res.data.data);
                        this.oldListSetting = JSON.parse(data)
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    };
                });
            }
        }
        leftY(i){
            this.selectIndexY = i;
        }
        leftYR(i){
            this.selectIndexYR = i;
        }
        rightY(i){
            this.selectIndexYR = i;
        }
        //向右
        toRight(){
            if(this.ListSetData.length>0){
                this.ListRightData.push( this.ListSetData[this.selectIndexY]);
                this.ListSetData.splice(this.selectIndexY,1);
                if(this.selectIndexY>=this.ListSetData.length&&this.selectIndexY>0){
                    this.selectIndexY-=1
                }
            }
        }
        toAllRight(){
            // this.ListRightData = this.ListSetData;
            if(this.ListSetData.length>0){
                for(var son of this.ListSetData){
                    this.ListRightData.push(son)
                }
                this.ListSetData = [];
            };
        }
        toLeft(){
            if(this.ListRightData.length>0){
                this.ListSetData.push(this.ListRightData[this.selectIndexYR])
                this.ListRightData.splice(this.selectIndexYR,1);
                if(this.selectIndexYR>=this.ListRightData.length&&this.selectIndexYR>0){
                    this.selectIndexYR-=1
                }
            }
        }
        toAllLeft(){
            if(this.ListRightData.length>0){
                for(var son of this.ListRightData){
                    this.ListSetData.push(son)
                }
                this.ListRightData = [];
            }
            // this.ListSetData = this.ListRightData;
        }
        //一览设置 重置
        repeatSet(){
            this.selectIndexYR = 0;
            this.selectIndexY = 0;
            this.ListSetting();
            // this.ListSetData = this.oldListSetting;
            // this.ListRightData = [];
        }
        ArriveTop(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR>0){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR=0;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }

        }
        toUp(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR>0){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR-=1;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }
        }
        toNext(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR<this.ListRightData.length-1){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR+=1;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }
        }
        Arrivebottom(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR<this.ListRightData.length-1){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR=this.ListRightData.length;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }
        }
        //一览设置 确定
        ListSettingSuer(){
            if(this.ListRightData.length>0){
                var arr = [];
                for(var key in this.ListRightData){
                    this.ListRightData[key].width = this.ListRightData[key].width/1;
                    this.ListRightData[key].sortSeq = key/1+1;
                    arr.push(this.ListRightData[key])
                }
                Service.ManagementSave({libId:this.classId,data:arr}).then(res=>{
                    if(res.data.succeeded){
                        this.ListSettings = false;
                        this.ListRightData = [];
                        this.selectIndexYR = 0;
                        this['$message']({
                            message: '保存成功',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }
        }

        mounted(){
            window["addEventListener"]("resize",()=>{
                this.bodyHeight = document.documentElement.clientHeight - 152 ;
            });
            this.treeLoading = true;
            Service.Arckind({}).then(res=>{
                if(res.data.succeeded){
                    this.treeData = res.data.data;
                    this.treeLoading = false;
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            })
        };
        numbervalidator(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]*$');
            if(value!=null){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正整数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/classManagement/classManagement.scss';
</style>