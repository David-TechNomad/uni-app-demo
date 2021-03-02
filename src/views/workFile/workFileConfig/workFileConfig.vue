<template>
    <section class="wrapprSection workFileConfigView">
        <div class="mainTitle">
           <span>工作文档配置</span>
        </div> 
        <div class="fileShowView boxshow">
            <div style="width: 228px;height: 28px;background-color: #2b87c6;display: table-cell;vertical-align:middle;color: white;padding-left: 5px;font-weight: bolder">手工管理<i class="fa fa-pencil" @click="changeHandTable" style="cursor:pointer;margin-left: 140px;"></i></div>
             <el-table :height="(bodyHeight + 10) / 2" :show-header ="false" :data="handMockList" highlight-current-row v-loading="listLoading1" class="defaultTable" header-row-class-name="tableHeader">
                <el-table-column  prop="name" label="手工管理">
                     <template slot-scope="scope">
                          <p @click="handClick(scope.row)"><span class="pdr-10">{{scope.$index + 1}}</span> <span>{{scope.row.className}}</span></p>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width: 228px;height: 28px;background-color: #2b87c6;display: table-cell;vertical-align:middle;color: white;padding-left: 5px;font-weight: bolder">自动生成<i class="fa fa-pencil" @click="changeAutoTable" style="cursor:pointer;margin-left: 140px;"></i></div>
            <el-table :height="(bodyHeight + 10)  / 2" :show-header ="false" :data="autoMockList" highlight-current-row v-loading="listLoading2" class="defaultTable" header-row-class-name="tableHeader">
                <el-table-column  prop="name" label="自动生成">
                    <template slot-scope="scope">
                          <p @click="autoClick(scope.row)"><span class="pdr-10">{{scope.$index + 1}}</span> <span>{{scope.row.className}}</span></p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="contentbox"> 
            <div class="searchKey boxshow"> 
                <el-form :inline="true">    
                   <el-form-item> 
                       著录项列表
                    </el-form-item>
                    <div class="rt">
                        <el-form-item>
                            <el-button class="blueBtn" @click="wordFieldUpdateUp" style="position: relative;bottom: 10px;">
                                上移
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="blueBtn" @click="wordFieldUpdateDown" style="position: relative;bottom: 10px;">
                                下移
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="blueBtn" @click="xinZengField" style="position: relative;bottom: 10px;">
                                    新增
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="blueBtn" @click="workNoField" style="position: relative;bottom: 10px;">
                                文档号规则
                            </el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="blueBtn" @click="workAutoField" style="position: relative;bottom: 10px;">
                                件号规则
                            </el-button>
                        </el-form-item>
                         <!--<el-form-item>
                            <el-button class="redBtn">
                                        删除
                            </el-button>
                         </el-form-item>-->
                         <!--<el-form-item>
                            <el-dropdown>
                                <el-button class="defaultBtn">
                                    文件中心<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">                                      
                                    <el-dropdown-item @click.native="findSettingField(2,1)">定制画面</el-dropdown-item>
                                    <el-dropdown-item @click.native="findSettingField(1,1)">一览设置</el-dropdown-item>
                                    <el-dropdown-item @click.native="getbulkChanges(1)">批量修改规则</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                          </el-form-item>
                          <el-form-item>
                               <el-dropdown>
                                <el-button class="defaultBtn">
                                    档案中心<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown"> 
                                        <el-dropdown-item @click.native="findSettingField(2,4)">定制画面</el-dropdown-item>                                     
                                        <el-dropdown-item @click.native="findSettingField(1,4)">一览设置</el-dropdown-item>
                                        <el-dropdown-item @click.native="getbulkChanges(4)">批量修改规则</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> 
                          </el-form-item>
                          <el-form-item>                              
                            <el-dropdown>
                                <el-button class="defaultBtn">
                                    门类设置<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="getfilesNoChanges">档号规则设置</el-dropdown-item>
                                    <el-dropdown-item @click.native="getatuoSort">自动排序规则设置</el-dropdown-item>
                                    <el-dropdown-item @click.native="getSorting">排序规则设置</el-dropdown-item>
                                    <el-dropdown-item @click.native="getBatchAttSetting">批量挂接规则设置</el-dropdown-item>
                                    <el-dropdown-item @click.native="getRuleofNumber">流水号规则</el-dropdown-item>                                        
                                    <el-dropdown-item @click.native="getSearchChanges">设置检索项</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>  
                         </el-form-item>       -->
                        </div> 
                    </el-form>  
                    
                </div>
                <div class="pd10 boxshow bgwhite mt10">
                        <el-table 
                         ref="clssTableRef"
                         border
                        :data="wordFieldData"
                        :height="bodyHeight - 90"
                        highlight-current-row
                        @row-click="fieldClick"
                         v-loading="listLoading"
                        header-row-class-name="tableHeader"  
                        element-loading-text="努力加载中..." 
                        @selection-change="handleShiftSelect"
                        stripe 
                        class="defaultTable">
                            <el-table-column label="操作" fixed="left" width="150">
                                <template slot-scope="scope">
                                    <el-button class="tabletoolBtn" @click="eidtField(scope.row)">编辑</el-button>
                                    <el-button class="tabletoolBtn" v-show="scope.row.isCustomized" @click="deleteField(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="reportFieldName" label="报表字段名">
                            </el-table-column>
                            <el-table-column  prop="isCustomized" label="是否自定义">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.isCustomized">是</span>
                                    <span v-show="!scope.row.isCustomized">否</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="caption" label="中文名">
                            </el-table-column>
                            <el-table-column  prop="userType" label="字段类型"  width="85">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.userType == 1">字符型</span>
                                    <span v-show="scope.row.userType == 2">整数型</span>
                                    <span v-show="scope.row.userType == 3">列表型</span>
                                    <span v-show="scope.row.userType == 4">是/否型</span>
                                    <span v-show="scope.row.userType == 5">日期型</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="fieldLength" label="长度" width="90">
                            </el-table-column>
                            <el-table-column  prop="isEdit" label="可否编辑" width="90">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.isEdit">是</span>
                                    <span v-show="!scope.row.isEdit">否</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="isNull" label="可空" width="90">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.isNull">是</span>
                                    <span v-show="!scope.row.isNull">否</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="isUnique" label="唯一" width="90">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.isUnique">是</span>
                                    <span v-show="!scope.row.isUnique">否</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="isShow" label="是否显示" width="90">
                                <template slot-scope="scope">
                                    <span v-show="scope.row.isShow">是</span>
                                    <span v-show="!scope.row.isShow">否</span>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="fieldWidth" label="列表宽度" width="90">
                            </el-table-column>
                            <el-table-column  prop="comments" label="备注">
                            </el-table-column>
                        </el-table>
                        <!--<div class="clear mt10">
                            <pageToolbar :total="mockList" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar>
                        </div>-->
                   </div>
            </div>

        <el-dialog
          title = "修改文档类别"
          :visible.sync="wordAddSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
          :before-close="handleClose"
         top="4%"
          width="50%" class="myDialogCenter">
          <el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
              <el-form-item label="类别名称：" prop="className" style="margin-bottom: 18px;">
                      <el-input placeholder="单行输入" size="small" v-model="ruleForm.className"></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="comments">
                  <el-input type="textarea" v-model="ruleForm.comments"></el-input>
              </el-form-item>
              <el-form-item label="报表上传：" v-show="uploadShow">
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :data="uploadType"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleDeviceSuccess"
                    :before-remove="beforeRemove"
                    :before-upload="beforeUpload"
                    :show-file-list = "false"
                    :file-list="fileList">
                    <el-button size="small" class="defaultBtn">选择文件</el-button>
                      <span>{{ruleForm.reportTempName}}</span>
                    <!--<span slot="tip" class="el-upload__tip ml20">文件大小不能超过100M</span>-->
                  </el-upload>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveWord('ruleForm')" class="defaultBtn">保存</el-button>
            <el-button @click="wordAddSetVisible = false;fileList=[];$refs['ruleForm'].resetFields();" class="defaultBtn">关闭</el-button>
          </div>
        </el-dialog>

        <el-dialog
                :title = "fieldTitle"
                :visible.sync="fieldAddSetVisible"
                :closeOnClickModal="false"
                :closeOnPressEscape="false"
                top="4%"
                width="50%" class="myDialogCenter">
            <el-form :model="fieldForm" ref="fieldForm" label-width="110px" :rules="fieldRules">
                <table class="el-table defaultTable">
                    <tr class="el-table__row">
                        <td>
                            <div class=" ">
                                <el-form-item label="中文名：" prop="caption">
                                    <el-input size="small" v-model="fieldForm.caption"></el-input>
                                </el-form-item>
                            </div>
                        </td>
                        <td>
                            <div class=" ">
                                <el-form-item label="报表字段名：">
                                    <el-input size="small" :readonly="fieldTitle=='修改字段'" v-model="fieldForm.reportFieldName"></el-input>
                                </el-form-item>
                            </div>
                        </td>
                    </tr>
                    <tr class="el-table__row">
                        <td>
                            <div class=" ">
                                <el-form-item label="长度：" prop="fieldLength">
                                    <el-input-number size="small" :disabled="fieldTitle=='修改字段'" v-model="fieldForm.fieldLength" :min="0" style="width:100%"></el-input-number>
                                </el-form-item>
                            </div>
                        </td>
                        <td>
                            <div class=" ">
                                <el-form-item label="字段类型：" prop="userType">
                                    <el-select v-model="fieldForm.userType" :disabled="fieldTitle=='修改字段'" placeholder="请选择字段类型" style="width:100%" size="small">
                                        <el-option :key="item.code" :label="item.displayText" :value="item.code" v-for="item in options"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </td>
                    </tr>
                    <tr class="el-table__row">
                        <td>
                            <div class=" ">
                                <el-form-item label="唯一：" prop="isUnique">
                                    <el-select v-model="fieldForm.isUnique" :disabled="fieldTitle=='修改字段'" placeholder="" style="width:100%" size="small">
                                        <el-option label="是" value="true"></el-option>
                                        <el-option label="否" value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </td>
                        <td>
                            <div class=" ">
                                <el-form-item label="可空：" prop="isNull">
                                    <el-select v-model="fieldForm.isNull" :disabled="fieldTitle=='修改字段'" placeholder="" style="width:100%" size="small">
                                        <el-option label="是" value="true"></el-option>
                                        <el-option label="否" value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </td>
                    </tr>
                    <tr class="el-table__row">
                        <td>
                            <div class=" ">
                                <el-form-item label="可否编辑：" prop="isEdit" :rules="[{required:fieldTitle=='新增字段'?true:false,message:'请选择可否编辑',trigger:'blur'}]">
                                    <el-select v-model="fieldForm.isEdit" :disabled="fieldTitle=='修改字段'" placeholder="" style="width:100%" size="small">
                                        <el-option label="是" :value="tr"></el-option>
                                        <el-option label="否" :value="fl"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </td>
                        <td>
                            <div class=" ">
                                <el-form-item label="列表宽度：" prop="fieldWidth">
                                    <el-input-number size="small" v-model="fieldForm.fieldWidth" :min="0" style="width:100%"></el-input-number>
                                </el-form-item>
                            </div>
                        </td>
                    </tr>
                    <tr class="el-table__row">
                        <td>
                            <div class=" ">
                                <el-form-item label="是否显示：" prop="isShow">
                                    <el-select v-model="fieldForm.isShow" :disabled="fieldTitle=='修改字段'" placeholder="" style="width:100%" size="small">
                                        <el-option label="是" value="true"></el-option>
                                        <el-option label="否" value="false"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </td>
                        <td>
                            <div class=" ">
                                <el-form-item label="数据字典：" prop="dictionaryId" :rules="[{required:fieldForm.userType=='3'?true:false,message:'请选择数据字典',trigger:'blur'}]">
                                    <el-select v-model="fieldForm.dictionaryId" :disabled="fieldForm.userType!='3'" placeholder="请选择数据字典" style="width:100%" size="small">
                                        <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in dictList"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </td>
                    </tr>
                    <tr class="el-table__row">
                        <td colspan="2">
                            <div class=" ">
                                <el-form-item label="备注：">
                                    <el-input type="textarea" v-model="fieldForm.comments"></el-input>
                                </el-form-item>
                            </div>
                        </td>
                    </tr>
                </table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-show="fieldTitle=='修改字段'" @click="updateField('fieldForm')" class="defaultBtn">保存</el-button>
                <el-button type="primary" v-show="fieldTitle=='新增字段'" @click="addField('fieldForm')" class="defaultBtn">保存</el-button>
                <el-button @click="fieldAddSetVisible = false" class="defaultBtn">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title = "文档号规则"
                :visible.sync="wordNoSetVisible"
                :closeOnClickModal="false"
                :closeOnPressEscape="false"
                top="4%"
                width="50%" class="myDialogCenter">
            <el-button class="blueBtn" @click="addWorkNoField" style="float: right;margin-bottom: 5px;">
                新增
            </el-button>
            <el-table :data="workNoList" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                <el-table-column  prop="valueType" label="类型">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.valueType" placeholder="请选择">
                            <el-option label="固定字符" :value=2></el-option>
                            <el-option label="表中字段" :value=1></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="value" label="值">
                    <template slot-scope="scope">
                        <el-input class="cusInput" v-if="scope.row.valueType=='2'" v-model="scope.row.value" placeholder="请输入内容" style="width: 100%"></el-input>
                        <el-select v-model="scope.row.value" placeholder="请选择" v-else style="width: 100%">
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button class="tabletoolBtn" @click="delWorkNo(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveWordNo()" class="defaultBtn">保存</el-button>
                <el-button @click="wordNoSetVisible = false;" class="defaultBtn">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title = "件号规则"
                :visible.sync="workAutoSetVisible"
                :closeOnClickModal="false"
                :closeOnPressEscape="false"
                top="4%"
                width="85%" class="myDialogCenter">
            <el-table :data="workAutoList" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                <el-table-column  prop="fieldName" label="流水号字段">
                </el-table-column>
                <el-table-column  prop="formatString" label="格式化">
                    <template slot-scope="scope">
                        <el-input class="cusInput" v-model="scope.row.formatString" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName01" label="依赖字段1">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName01" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName02" label="依赖字段2">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName02" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName03" label="依赖字段3">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName03" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName04" label="依赖字段4">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName04" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName05" label="依赖字段5">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName05" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName06" label="依赖字段6">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName06" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName07" label="依赖字段7">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName07" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName08" label="依赖字段8">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName08" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName09" label="依赖字段9">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName09" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  prop="fieldName10" label="依赖字段10">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.fieldName10" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in workInfoAttr"
                                    :key="item.caption"
                                    :label="item.fieldName"
                                    :value="item.fieldName">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveWordAuto()" class="defaultBtn">保存</el-button>
                <el-button @click="workAutoSetVisible = false;" class="defaultBtn">关闭</el-button>
            </div>
        </el-dialog>

     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './workFileConfig.service' 
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue';
    import threeMemberManagementDialog from '@/views/system/operateDialog/threeMemberManagement/threeMemberManagement.vue';
    import mockData from '@/mock/data/mockData';
    @Component({
        components: {
            pageToolbar,
            threeMemberManagementDialog
        },
    })
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 202 ;
        addPreCleanSetVisible:Boolean = false;
        auto:Boolean = false;
        hand:Boolean = true;
        workAutoSetVisible:boolean;
        radio3: string = '1';
        mockList:any = [];
        handMockList:any = [];
        autoMockList:any = [];
        workObj:any = {};
        ruleForm:any = {};
        wordAddSetVisible:boolean;
        rules: any = {};
        fileList:any = [];
        options:any = [];
        dictList:any = [];
        uploadUrl: string =  process.env.upload_BASEURL + '/file/simple/upload';
        uploadType:any = {
            type:6
        };
        tr:boolean = true;
        fl:boolean = false;
        uploadShow:boolean;
        activeName:string = 'file';
        tableData: any =[];
        total: number = 1;
        page: number = 0;
        pageSize: number = 25;
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };
        wordFieldData:any = [];
        wordObj:any = {};
        fieldObj:any = {};
        listLoading: Boolean= false;
        listLoading1:boolean = false;
        listLoading2:boolean = false;
        fieldTitle:string;
        fieldAddSetVisible:boolean;
        fieldForm:any = {};
        fieldRules:any = {};
        wordNoSetVisible:boolean;
        workNoList:any=[];
        workAutoList:any=[];
        workInfoAttr:any = [];
        constructor(){
            super();
            this.mockList = [];
            this.handMockList = [];
            this.autoMockList = [];
            this.workObj = {};
            this.ruleForm = {
                reportTempId:"",
                classNo:"",
                className:"",
                comments:"",
                reportTempName:""
            };
            this.workAutoSetVisible = false;
            this.wordAddSetVisible = false;
            this.rules = {
                className: [
                    { required: true, message: '请填写类别名称', trigger: 'blur' }
                ]
            };
            this.fieldRules = {
                caption: [
                    { required: true, message: '请填写类别名称', trigger: 'blur' }
                ],
                reportFieldName: [
                    { required: true, message: '请填写报表字段名', trigger: 'blur' }
                ],
                fieldLength: [
                    { required: true, message: '请填写长度', trigger: 'blur' }
                ],
                userType: [
                    { required: true, message: '请选择字段类型', trigger: 'blur' }
                ],
                isUnique: [
                    { required: true, message: '请选择是否唯一', trigger: 'blur' }
                ],
                isNull: [
                    { required: true, message: '请选择是否为空', trigger: 'blur' }
                ],
                dictionaryId: [
                    { required: true, message: '请选择数据字典', trigger: 'blur' }
                ],
                isShow: [
                    { required: true, message: '请选择是否显示', trigger: 'blur' }
                ]
            };
            this.fileList = [];
            this.uploadShow = false;
            this.fieldObj = {};
            this.wordFieldData = [];
            this.wordObj = {
                classNo:""
            };
            this.fieldTitle = "";
            this.fieldAddSetVisible = false;
            this.fieldForm = {
                classNo:'',
                tableName:'',
                fieldName:'',
                caption:'',
                reportFieldName:'',
                fieldLength:0,
                isUnique:'',
                isNull:'',
                isShow:'',
                comments:'',
                userType:'',
                dictionaryId:'',
                fieldWidth:0,
                isEdit:''
            };
            this.options = [];
            this.dictList = [];
            this.wordNoSetVisible = false;
            this.workNoList = [];
            this.workAutoList = [];
            this.workInfoAttr = [];
        };
        handleCurrentChange(val) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };

        goBack() {
            this['$router'].go(-1);//返回上一层
        };
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };

        // 文件上传成功回调
        handleDeviceSuccess(res, file) {
            this.ruleForm.reportTempId = res.data;
        };

        beforeUpload(file){
            this.ruleForm.reportTempName = file.name;
        }
        handClick(row){
            this.wordObj = row;
            this.wordFieldList();
        }
        autoClick(row){
            this.wordObj = row;
            this.wordFieldList();
        }

        //文档类别编辑
        saveWord(ruleForm){
            this.$refs[ruleForm].validate((valid)=>{
                if(valid){
                    Service.wordClassUpdate({
                        "classNo":this.ruleForm.classNo,
                        "className":this.ruleForm.className,
                        "reportTempId":this.ruleForm.reportTempId,
                        "comments":this.ruleForm.comments
                    }).then((res) =>{
                        if(res.data.succeeded) {
                            this.wordAddSetVisible = false;
                            this.Suces("保存成功");
                            this.queryWkDocClassNos();
                        } else {
                            this.Warn(res.data.errorMessage);
                        }
                    })
                    this.fileList = [];
                }
            })
        }

        handleClose(){
            this.$refs['ruleForm'].resetFields();
            this.wordAddSetVisible = false;
        }

        //获取文档类别详情
        changeHandTable(){
            if (this.wordObj.classNo == "") {
                this.Warn("请选择文档类型");
                return;
            }
            this.uploadShow = false;
            Service.wordClassObject({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.ruleForm.classNo = res.data.data.classNo;
                    this.ruleForm.className = res.data.data.className;
                    this.ruleForm.comments = res.data.data.comments;
                    this.ruleForm.reportTempId = "";
                    this.ruleForm.reportTempName = "";
                    this.fileList = [];
                    this.wordAddSetVisible = true;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            })
        }

        //获取文档类别详情
        changeAutoTable(){
            if (this.wordObj.classNo == "") {
                this.Warn("请选择文档类型");
                return;
            }
            this.uploadShow = true;
            Service.wordClassObject({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.ruleForm.classNo = res.data.data.classNo;
                    this.ruleForm.className = res.data.data.className;
                    this.ruleForm.comments = res.data.data.comments;
                    this.ruleForm.reportTempId = res.data.data.reportTempId;
                    this.ruleForm.reportTempName = res.data.data.reportTempName;
                    if(this.ruleForm.reportTempId != "" && this.ruleForm.reportTempId != null){
                        let obj = {};
                        obj.reportTempName = this.ruleForm.reportTempName;
                        this.fileList.push(obj);
                    }else{
                        this.fileList = [];
                    }
                    this.wordAddSetVisible = true;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            })
        }

        //文档类别列表
        queryWkDocClassNos(){
            this.listLoading1 = true;
            Service.queryWkDocClassNos({}).then((res) =>{
                if(res.data.succeeded) {
                    this.mockList = res.data.data;
                    this.handMockList = [];
                    this.autoMockList = [];
                    for(let i = 0;i < this.mockList.length;i++){
                        if(this.mockList[i].wkDocType == 0){
                            this.handMockList.push(this.mockList[i]);
                        }else if(this.mockList[i].wkDocType == 1){
                            this.autoMockList.push(this.mockList[i]);
                        }
                    }
                } else {
                    this.Warn(res.data.errorMessage);
                }
                this.listLoading1 = false;
            })
        }

        //文档字段列表
        wordFieldList(){
            this.listLoading = true;
            Service.wordFieldList({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.wordFieldData = res.data.data;
                } else {
                    this.Warn(res.data.errorMessage);
                }
                this.listLoading = false;
            })
        }

        fieldClick(row){
            this.fieldObj = row;
        }

        //上移
        wordFieldUpdateUp(){
            if (this.wordObj.classNo == "") {
                this.Warn("请选择文档类型");
                return;
            }
            if(Object.keys(this.fieldObj ).length==0){
                this.Warn("请选择要移动的数据！");
                return;
            }
            for(let i = 0;i < this.wordFieldData.length;i++){
                if(this.equalKey(this.wordFieldData[i])){
                    if(i == 0){
                        this.Warn("已经在最顶！");
                        break;
                    }else{
                        Service.wordFieldUpdateSort({
                            "classNo1": this.fieldObj.classNo,
                            "tableName1": this.fieldObj.tableName,
                            "fieldName1": this.fieldObj.fieldName,
                            "classNo2": this.wordFieldData[i-1].classNo,
                            "tableName2": this.wordFieldData[i-1].tableName,
                            "fieldName2": this.wordFieldData[i-1].fieldName
                        }).then((res) =>{
                            if(res.data.succeeded) {
                                this.Suces("上移成功");
                                this.wordFieldList();
                            } else {
                                this.Warn(res.data.errorMessage);
                            }
                        });
                        break;
                    }
                }
            }
        }

        equalKey(row){
            return row.keys.classNo == this.fieldObj.classNo && row.keys.tableName == this.fieldObj.tableName && row.keys.fieldName == this.fieldObj.fieldName
        }

        //下移
        wordFieldUpdateDown(){
            if (this.wordObj.classNo == "") {
                this.Warn("请选择文档类型");
                return;
            }
            if(Object.keys(this.fieldObj ).length==0){
                this.Warn("请选择要移动的数据！");
                return;
            }
            for(let i = 0;i < this.wordFieldData.length;i++){
                if(this.equalKey(this.wordFieldData[i])){
                    if(i == this.wordFieldData.length-1){
                        this.Warn("已经在最底！");
                        break;
                    }else{
                        Service.wordFieldUpdateSort({
                            "classNo1": this.fieldObj.classNo,
                            "tableName1": this.fieldObj.tableName,
                            "fieldName1": this.fieldObj.fieldName,
                            "classNo2": this.wordFieldData[i+1].classNo,
                            "tableName2": this.wordFieldData[i+1].tableName,
                            "fieldName2": this.wordFieldData[i+1].fieldName
                        }).then((res) =>{
                            if(res.data.succeeded) {
                                this.Suces("下移成功");
                                this.wordFieldList();
                            } else {
                                this.Warn(res.data.errorMessage);
                            }
                        });
                        break;
                    }
                }
            }
        }

        workAutoField(){
            if (this.wordObj.classNo == "") {
                this.Warn("请选择文档类型");
                return;
            }
            Service.workAutoNoList({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.workAutoList = [];
                    this.workAutoList.push(res.data.data);
                    this.workAutoSetVisible = true;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });

            Service.workInfoFieldList({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.workInfoAttr = res.data.data;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });

        }

        saveWordAuto(){
            Service.workAutoNoAdd(this.workAutoList[0]).then((res) =>{
                if(res.data.succeeded) {
                    this.Suces("保存成功");
                    this.workAutoSetVisible = false;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        workNoField(){
            if (this.wordObj.classNo == "") {
                this.Warn("请选择文档类型");
                return;
            }
            Service.workNoSetingList({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.workNoList = res.data.data;
                    this.wordNoSetVisible = true;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
            Service.workInfoFieldList({"classNo":this.wordObj.classNo}).then((res) =>{
                if(res.data.succeeded) {
                    this.workInfoAttr = res.data.data;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        xinZengField(row){
            if (this.wordObj.classNo == "") {
                this.Warn("请选择文档类型");
                return;
            }
            this.fieldForm.classNo='';
            this.fieldForm.tableName='';
            this.fieldForm.fieldName='';
            this.fieldForm.caption='';
            this.fieldForm.reportFieldName='';
            this.fieldForm.fieldLength=0;
            this.fieldForm.isUnique='';
            this.fieldForm.isNull='';
            this.fieldForm.isShow='';
            this.fieldForm.comments='';
            this.fieldForm.userType='';
            this.fieldForm.dictionaryId='';
            this.fieldForm.fieldWidth=0;
            this.fieldForm.isEdit='';
            this.fieldTitle = "新增字段";
            if(this.$refs['fieldForm']){
                this.$refs['fieldForm'].resetFields();
            }
            this.fieldAddSetVisible = true;
        }

        //删除字段
        deleteField(row){
            Service.wordFieldDelete({
                "classNo":row.classNo,
                "tableName": row.tableName,
                "fieldName": row.fieldName
            }).then((res) =>{
                if(res.data.succeeded) {
                    this.Suces("删除成功");
                    this.wordFieldList();
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        //修改字段
        eidtField(row){
            this.fieldTitle = "修改字段";
            if(this.$refs['fieldForm']){
                this.$refs['fieldForm'].resetFields();
            }
            this.fieldAddSetVisible = true;
            this.fieldForm.classNo=row.classNo;
            this.fieldForm.tableName=row.tableName;
            this.fieldForm.fieldName=row.fieldName;
            this.fieldForm.caption=row.caption;
            this.fieldForm.reportFieldName=row.reportFieldName;
            this.fieldForm.fieldLength=row.fieldLength;
            this.fieldForm.isUnique=row.isUnique.toString();
            this.fieldForm.isNull=row.isNull.toString();
            this.fieldForm.isShow=row.isShow.toString();
            this.fieldForm.comments=row.comments;
            this.fieldForm.userType=row.userType.toString();
            this.fieldForm.dictionaryId=row.dictionaryId?row.dictionaryId:null;
            this.fieldForm.fieldWidth=row.fieldWidth;
            this.fieldForm.isEdit=row.isEditw.toString();
        }

        updateField(fieldForm){
            this.$refs[fieldForm].validate((valid)=>{
                if(valid){
                    Service.wordFieldUpdate({
                        "classNo": this.fieldForm.classNo,
                        "tableName": this.fieldForm.tableName,
                        "fieldName": this.fieldForm.fieldName,
                        "caption": this.fieldForm.caption,
                        "reportFieldName": this.fieldForm.reportFieldName,
                        "fieldLength": this.fieldForm.fieldLength,
                        "isNull": this.fieldForm.isNull == "true"?true:false,
                        "isUnique": this.fieldForm.isUnique == "true"?true:false,
                        "comments": this.fieldForm.comments,
                        "fieldWidth":this.fieldForm.fieldWidth,
                        "isShow":this.fieldForm.isShow == "true"?true:false,
                        "dictionaryId":this.fieldForm.dictionaryId,
                        "isEdit":this.fieldForm.isEdit== "true"?true:false
                    }).then((res) =>{
                        if(res.data.succeeded) {
                            this.fieldAddSetVisible = false;
                            this.Suces("修改成功");
                            this.wordFieldList();
                        } else {
                            this.Warn(res.data.errorMessage);
                        }
                    })
                }
            })
        }

        addField(fieldForm){
            this.$refs[fieldForm].validate((valid)=>{
                if(valid){
                    Service.wordFieldAdd({
                        "classNo": this.wordObj.classNo,
                        "fieldName": this.fieldForm.fieldName,
                        "caption": this.fieldForm.caption,
                        "userType": this.fieldForm.userType,
                        "reportFieldName": this.fieldForm.reportFieldName,
                        "fieldLength": this.fieldForm.fieldLength,
                        "isNull": this.fieldForm.isNull == "true"?true:false,
                        "isUnique": this.fieldForm.isUnique == "true"?true:false,
                        "comments": this.fieldForm.comments,
                        "fieldWidth":this.fieldForm.fieldWidth,
                        "isShow":this.fieldForm.isShow == "true"?true:false,
                        "dictionaryId":this.fieldForm.dictionaryId,
                        "isEdit":this.fieldForm.isEdit
                    }).then((res) =>{
                        if(res.data.succeeded) {
                            this.fieldAddSetVisible = false;
                            this.Suces("新增成功");
                            this.wordFieldList();
                        } else {
                            this.Warn(res.data.errorMessage);
                        }
                    })
                }
            })
        }

        addWorkNoField(){
            let obj = {
                valueType:1,
                value:""
            };
            this.workNoList.push(obj);
        }

        delWorkNo(row,index){
            this.workNoList.splice(index,1);
        }

        saveWordNo(){
            Service.workNoSetingAdd(this.workNoList).then((res) =>{
                if(res.data.succeeded) {
                    this.wordNoSetVisible = false;
                    this.Suces("保存成功");
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
        }

        created(){
            this.queryWkDocClassNos();
            this.wordFieldList();
            Service.getDictlistsurl(210).then((res) =>{
                if(res.data.succeeded) {
                    this.options = res.data.data;
                } else {
                    this.Warn(res.data.errorMessage);
                }
            });
            Service.dicFindList({}).then((res) =>{
                this.dictList = res.data;
            });
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 202;
                })()
            };
        };

        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };
         //失败信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
    .workFileConfigView >>>.tree{
        top:-8px;
    }
    .workFileConfigView{
        .fileShowView{
            width: 250px;
            left: 10px;
            position: absolute;
            top: 50px;
            background: #fff;
            padding: 10px;
        }
        .contentbox.boxshow{
                left: 575px;
                background: #fff;
                padding: 10px;
                .retrievalView {
                    padding: 15px 0 5px 20px;
                }
            }
    }

    .el-table {
        td{
             border: none;
         }
    }
    .el-form-item {
        margin-top: 10px;
    }

    .cusInput.el-input__inner{
        height: 28px !important;
    }

</style>
