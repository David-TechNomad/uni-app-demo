<template>
    <section>
        <!-- <div class="mainTitle">上传档案</div> -->
         <div class="titleBlue">
            <b></b>
            <span>项目管理</span>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow mainBorrowTop">
                 <div class="formData">
                    <el-form :inline="true" :model="checkFiler" class="doneForm topParamsForm">
                        <el-form-item  class="company" label="项目编号：" >
                            <el-input class="checkName" v-model="checkFiler.number" placeholder="项目编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item  class="company" label="项目名称：" >
                            <el-input class="checkName" v-model="checkFiler.title" placeholder="项目名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item  class="company" label="所属城市：" >
                            <el-input class="checkName" v-model="checkFiler.city" placeholder="所属城市" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="checkGetFiles">检索</el-button>
                            <el-button class="checkWay" @click="qingKong">清空</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!--列表(正在上传)-->
                <el-button class="checkWay" type="primary" style="position:absolute;right:20px;top:10px" @click="newAdd">新增</el-button>
                <el-button class="checkWay" type="primary" style="position:absolute;right:100px;top:10px" @click="LivedaoLive">导出</el-button>
                <div class="borderTable" style="top:45px">
                    <el-table border @row-dblclick="ChnageRow" tooltip-effect="dark" :height="bodyHeight" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <!-- <el-table-column :show-overflow-tooltip="true" prop="number" label="项目编号">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="title" label="项目名称">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="person" label="所属城市">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="person" label="项目状态">
                        </el-table-column>
                          <el-table-column :show-overflow-tooltip="true" prop="person" label="备注">
                        </el-table-column> -->
                         <el-table-column :key="item.id" :prop="item.prop" :label="item.title" v-for='item in tableData'>
                        </el-table-column>
                        <!-- <el-table-column label="操作" width="180">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="ChnageRow(scope.row)">修改</span>
                                <span class="addBtn" @click="closeLists(scope.row,scope.$index)" v-if="scope.row.projectStatus==='经营期'">结束</span>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[30,40,50]" :page-size="limit" :total="total" style="float:right;" :current-page.sync="currentPage">
                            </el-pagination>
                    </el-col>
                </div>
            </div>
        </div>

        <!-- 新增 -->
        <el-dialog
            title="新增项目"
            :visible.sync="centerDialogVisible"
            class="clsmyDialog"
            :close-on-click-modal="true"
            :modal-append-to-body="dioLoading"
            >
            <!-- <el-form>
              <el-form-item>
                      <span class="titleSpan">名称：</span><el-input class="checkName" v-model="newAddFile.title" clearable style="width:85%;margin-bottom:3px;"></el-input>
              </el-form-item>
              <el-form-item>
                              <span class="titleSpan">备注：</span><el-input class="checkName" v-model="newAddFile.titleNode" clearable style="width:85%;;"></el-input>
              </el-form-item>
            </el-form> -->

            </el-form>

             <div class="DioformList" style="height:97%">
                 <el-form  class="addfile" :model="addfile" label-width="110px" ref="addfile">
                <!-- <el-row> -->
                  <!-- <el-col :span="10"><div class="grid-content bg-purple" style="border-top:1px solid #ccc"><span class="span1"><b style="color:rgb(224, 57, 57);position:absolute;top:5px;left:-9px;font-size:16px">*</b>所属城市：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-top:1px solid #ccc">
                               <el-autocomplete
                                class="autocomp"
                                v-model="accountSearchs"
                                :fetch-suggestions="accounQuerySearchAsync"
                                @select="accountHandleSelect"
                                placeholder="请输入城市名称"
                                sytle="width:100%"
                            >
                            </el-autocomplete>
                </div></el-col> -->
                 <el-form-item  label='所属城市：'>
                           <b style='color:#f56c6c;position:absolute;left:-85px;top:2px'>*</b>
                           <el-autocomplete
                                class="autocomp"
                                v-model="accountSearchs"
                                :fetch-suggestions="accounQuerySearchAsync"
                                @select="accountHandleSelect"
                                placeholder="请输入城市名称"
                                sytle="width:100%"
                            >
                            </el-autocomplete>

                </el-form-item>
                <!-- </el-row> -->
                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">项目编号：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                      <el-input type="" readonly="true" v-model="Addxmbh.Addxmbhs"></el-input>
                </div></el-col>
                </el-row> -->
                 <el-form-item  label='项目编号：'>
                     <b style='color:#f56c6c;position:absolute;left:-85px;top:2px'>*</b>
                    <el-input type=""  v-model="Addxmbh.Addxmbhs"></el-input>
                </el-form-item>



                   <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1"><b style="color:rgb(224, 57, 57);position:absolute;top:5px;left:-9px;font-size:16px">*</b>项目名称：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                      <el-input type="text" v-model = "AddProjectName"></el-input>
                  </div></el-col>
                </el-row> -->

                <el-form-item  label='项目名称：'>
                    <b style='color:#f56c6c;position:absolute;left:-85px;top:2px'>*</b>
                    <el-input type="text" v-model = "AddProjectName"></el-input>
                </el-form-item>

                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">保管期限：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                        <el-select @change="selectGetData" placeholder="保管期限" v-model="ModelTemplate.code" style="border:0;width:100%">
                        <el-option v-for="item in ModelTemplate" :label="item.displayText" :value="item.code"></el-option>
                        </el-select>
                </div></el-col>
                </el-row> -->
                <!-- <el-form-item  label='保管期限：'>
                    <el-select @change="selectGetData" placeholder="保管期限" v-model="ModelTemplateCode">
                        <el-option v-for="item in ModelTemplate" :key="item.code" :label="item.displayText" :value="item.code"></el-option>
                    </el-select>
                </el-form-item> -->

                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">密级：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                      <el-select @change="selectGetMi" placeholder="密级" v-model="ModelTemplateData.code" style="border:0;width:100%">
                        <el-option v-for="item in ModelTemplateData" :label="item.displayText" :value="item.code"></el-option>
                      </el-select>
                  </div></el-col>
                </el-row> -->

                <!-- <el-form-item  label='密级：'>
                      <el-select @change="selectGetMi" placeholder="密级" v-model="ModelTemplateDataCode">
                        <el-option v-for="item in ModelTemplateData" :key="item.code" :label="item.displayText" :value="item.code"></el-option>
                      </el-select>
                </el-form-item> -->


                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">所属全宗：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                    <el-select @change="selectGet" placeholder="所属全宗" v-model="ModelTemplateQuan.id" style="border:0;width:100%">
                        <el-option v-for="item in ModelTemplateQuan" :label="item.templateName" :value="item.id"></el-option>
                      </el-select>
                  </div></el-col>
                </el-row> -->
                <el-form-item  label='所属全宗：'>
                       <!-- <el-select filterable @change="selectGet" placeholder="所属全宗" v-model="ModelTemplateQuanId">
                        <el-option v-for="item in ModelTemplateQuan" :key="item.id" :label="item.fondName" :value="item.id"></el-option>
                      </el-select> -->

                      <el-select class="checkName" placeholder="所属全宗" v-model="ModelTemplateQuanId" filterable remote reserve-keyword  :remote-method="remoteMethodfond" :loading="searchLoading">
                            <el-option v-for="item in ModelTemplateQuan" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                     </el-select>
                </el-form-item>

                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">备注：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                      <textarea name="" id="" cols="30" rows="" style="border:0" v-model="AddTextArea"></textarea>
                </div></el-col>
                </el-row> -->
                <el-form-item  label='备注：'>
                        <el-input type="textarea" v-model="AddTextArea" style="width:260px"></el-input>
                </el-form-item>

                </el-form>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleSure()"  @dblclick="centerDialogVisibleSure()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog
            title="编辑项目"
            :visible.sync="centerDialogVisibleBianJi"
            class="clsmyDialog"
            :close-on-click-modal="true"
            :modal-append-to-body="false"
            >
            <!-- <el-form>
              <el-form-item>
                      <span class="titleSpan">名称：</span><el-input class="checkName" v-model="newAddFile.title" clearable style="width:85%;margin-bottom:3px;"></el-input>
              </el-form-item>
              <el-form-item>
                              <span class="titleSpan">备注：</span><el-input class="checkName" v-model="newAddFile.titleNode" clearable style="width:85%;;"></el-input>
              </el-form-item>
            </el-form> -->
             <div class="DioformList" style="height:97%">
                  <el-form  class="addfile" :model="addfile" label-width="110px" ref="addfile">
                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple" style="border-top:1px solid #ccc"><span class="span1">所属城市：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-top:1px solid #ccc">
                         <el-input class="checkName" v-model="accountSearchBianJi" readOnly></el-input>
                </div></el-col>
                </el-row> -->
                 <el-form-item  label='所属城市：'>
                       <b style='color:#f56c6c;position:absolute;left:-85px;top:2px'>*</b>
                       <el-input class="checkName" v-model="accountSearchBianJi" readOnly disabled></el-input>
                </el-form-item>




                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">项目编号：</span>
                  </div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                       <el-input class="checkName" v-model="xmbhBianJI" readOnly></el-input>
                </div></el-col>
                </el-row> -->
                  <el-form-item  label='项目编号：'>
                      <b style='color:#f56c6c;position:absolute;left:-85px;top:2px'>*</b>
                       <el-input class="checkName" v-model="xmbhBianJI" readOnly disabled></el-input>
                  </el-form-item>

                   <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">项目名称：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                      <el-input class="checkName" v-model="xmmchengBianJI" clearable></el-input>
                  </div></el-col>
                </el-row> -->
                  <el-form-item  label='项目名称：'>
                      <b style='color:#f56c6c;position:absolute;left:-85px;top:2px'>*</b>
                      <el-input class="checkName" v-model="xmmchengBianJI" clearable style="width:260px"></el-input>
                  </el-form-item>


                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">保管期限：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                       <el-input class="checkName" v-model="bgqxBianJI" readOnly></el-input> -->
                        <!-- 注释过的 <el-select @change="selectGet" placeholder="保管期限" v-model="ModelTemplateBianji.id" style="border:0;width:100%">
                        <el-option v-for="item in ModelTemplateBianji" :label="item.templateName" :value="item.id"></el-option>
                        </el-select> -->
                <!-- </div></el-col>
                </el-row> -->
                 <!-- <el-form-item  label='保管期限：'>
                      <el-input class="checkName" v-model="bgqxBianJI" readOnly></el-input>
                 </el-form-item> -->



                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">密级：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                      <el-input class="checkName" v-model="mjBianJI" readOnly></el-input> -->
                      <!-- 注释过的<el-select @change="selectGet" placeholder="密级" v-model="ModelTemplateDataBianji.id" style="border:0;width:100%">
                        <el-option v-for="item in ModelTemplateDataBianji" :label="item.templateName" :value="item.id"></el-option>
                      </el-select> -->
                  <!-- </div></el-col>
                </el-row> -->
                <!-- <el-form-item  label='密级：'>
                     <el-input class="checkName" v-model="mjBianJI" readOnly></el-input>
                 </el-form-item> -->


                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">所属全宗：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                    <el-select @change="selectGet" placeholder="所属全宗" v-model="ModelTemplateQuanBianji.id" style="border:0;width:100%">
                        <el-option v-for="item in ModelTemplateQuanBianji" :label="item.templateName" :value="item.id"></el-option>
                      </el-select>
                  </div></el-col>
                </el-row> -->
                 <el-form-item  label='所属全宗：'>
                     <!-- <el-select @change="selectGet" placeholder="所属全宗" v-model="ModelTemplateQuanBianjiId">
                        <el-option v-for="item in ModelTemplateQuanBianji" :key="item.id" :label="item.fondName" :value="item.id"></el-option>
                      </el-select> -->

                       <el-select class="checkName" placeholder="所属全宗" v-model="ModelTemplateQuanBianjiId" filterable remote reserve-keyword  :remote-method="remoteMethodfond1" :loading="searchLoading">
                            <el-option v-for="item in ModelTemplateQuanBianji" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                     </el-select>
                 </el-form-item>

                <!-- <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">备注：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0">
                      <textarea name="" id="" cols="30" rows="" style="border:0" v-model="bzBianJi"></textarea>
                </div></el-col>
                </el-row> -->
                 <el-form-item  label='备注：'>
                     <el-input type="textarea" v-model="bzBianJi" style="width:260px"></el-input>
                 </el-form-item>

                </el-form>
                </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibleBianJi = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleBianjiSure()" class="el-button checkWay" @dblclick="centerDialogVisibleBianjiSure()">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './classScheme.service';
    @Component
    export default class appBorrowHistory extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        closeBtns :  boolean;
        listLoading: boolean;
        Addxmbh : any = {};
        mjBianJI : string;
        seleShow :  boolean;
        bzBianJi: string;
        cityDict : any = [];
        centerDialogVisible: boolean;
        centerDialogVisibleBianJi : boolean;
        AddProjectName : string;
        bgqxBianJI : string;
        accountSearchBianJi :string;
        xmmchengBianJI : string;
        xmbhBianJI: string;
        AddTextArea : string;
        start: number;
        total: number;
        page: number;
        ModelTemplate :any = [];
        ModelTemplateData :  any = [];
        ModelTemplateQuan : any = [];
        ModelTemplateBianji :any = [];
        tableData : any = [];
        ModelTemplateDataBianji :  any = [];
        ModelTemplateQuanBianji : any = [];
        limit: number;
        activeName: string;
        accountSearchsCode : string;
        filters: any = {};
        documentTableData: any = [];
        borrowTableData: any = [];
        powerTableData:any = [];
        data: any = [];
        accountSearchs : string;
        newAddFile:any = {}
        documentShow: boolean;
        borrowShow: boolean;
        powerShow: boolean;
        formSelect: boolean;
        formInput: boolean;
        Gbgqx : number;
        xzmj:number;
        fondId:number;
        ModelTemplateQuanBianjiId:string;
        ModelTemplateCode:string;
        ModelTemplateDataCode:string;
        ModelTemplateQuanId:string;
        cityCode:string;
        retentionPeriodCode:number;
        securitLevelCode:string;
        editId:number;
        searchLoading:boolean;
        checkFiler:any = {};
        qianId:string;
        currentPage:number;
        dioLoading:boolean;
        counts:number;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 223 ;
            this.nameHeight = null;
            this.timer = false;
            this.seleShow = false;
            this.closeBtns = true;
            this.start = 0;
            this.total = 0;
            this.page = 0;
            this.accountSearchs = ''
            this.accountSearchBianJi = ''
            this.accountSearchsCode = ''
            this.mjBianJI = ''
            this.xmmchengBianJI = ''
            this.bgqxBianJI = ''
            this.xmbhBianJI = ''
            this.bzBianJi = ''
            this.Addxmbh = {
                Addxmbhs:''
            }
            this.AddProjectName = '';
            this.AddTextArea = '';
            this.limit = 30;
            this.activeName = '0';
            this.listLoading = false;
            this.documentShow = true;
            this.borrowShow = false;
            this.powerShow = false;
            this.centerDialogVisibleBianJi = false;
            this.formSelect = true;
            this.formInput = true;
            this.centerDialogVisible = false;
            this.data = [];
            this.tableData =[
                 {
                    title:'项目编号',
                    prop:'projectCode'
                },
                {
                    title:'项目名称',
                    prop:'projectName'
                },
                {
                    title:'所属城市',
                    prop:'city'
                },
                {
                    title:'备注',
                    prop:'comments'
                },
                {
                    title:'所属全宗',
                    prop:'fondName'
                    
                }
            ]
            this.ModelTemplate = [
                // {
                //     "id":1,
                //     "templateName":'活动课'
                // },
                //  {
                //     "id":2,
                //     "templateName":'英语课'
                // }
            ]
            this.ModelTemplateData = [
                // {
                //     "id":1,
                //     "templateName":'公开'
                // },
                //  {
                //     "id":2,
                //     "templateName":'销毁'
                // }
            ]
            this.ModelTemplateQuan = [
                // {
                //     "id":1,
                //     "templateName":'1'
                // },
                //  {
                //     "id":2,
                //     "templateName":'2'
                // }
            ]

            this.ModelTemplateBianji = [
                {
                    "id":1,
                    "templateName":'活动课'
                },
                 {
                    "id":2,
                    "templateName":'英语课'
                }
            ]
            this.ModelTemplateDataBianji = [
                {
                    "id":1,
                    "templateName":'公开'
                },
                 {
                    "id":2,
                    "templateName":'销毁'
                }
            ]
            this.ModelTemplateQuanBianji = [
                // {
                //     "id":1,
                //     "templateName":'1'
                // },
                //  {
                //     "id":2,
                //     "templateName":'2'
                // }
            ]
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
                state:'',
                project:'',
                createDateStart:'',
                createDateEnd:'',
            };
            this.newAddFile = {
                title:"",
                titleNode:""
            }
            this.documentTableData = [];
            this.ModelTemplateQuanBianjiId = '';
            this.ModelTemplateCode = '';
            this.ModelTemplateDataCode = '';
            this.ModelTemplateQuanId = '';
            this.cityCode = '';
            this.retentionPeriodCode = 0;
            this.securitLevelCode = '';
            this.Gbgqx = 0;
            this.searchLoading = false;
            this.dioLoading = false;
            this.checkFiler = {
                number:'',
                title:'',
                city:''
            }
            this.currentPage = 1;
            this.counts = 0;
        };
        accounQuerySearchAsync(queryString, callback){//模糊搜索 取值
            this.accountSearchs = queryString;
            Service.findByDictIdAndText({
                        "dictId":450,
                        "displayText":this.accountSearchs
                    }).then(res=>{
                    this.cityDict = res.data.data;
                      let data = this.cityDict;
                        for(var item of data){
                            //list.push({"value":item.displayText,"id":item.code});
                            item.value = item.displayText
                        }
                        callback(this.cityDict);
            })

        }
        accountHandleSelect(item){//赋值
            console.log(item)
            this.accountSearchs = item.value
            this.accountSearchsCode = item.code;
            // this.accountSearch = item.value
            //Addxmbh
            Service.getProjectCode(this.accountSearchsCode).then(res=>{
                this['$set'](this.Addxmbh,"Addxmbhs",res.data.data);
            })
            console.log(this.Addxmbh)

        }
        selectGetData(value){//保管期限
            console.log(value)
            this.Gbgqx = value;
        }
        selectGetMi(value){//密级
            console.log(value)
            this.xzmj = value;
        }
        centerDialogVisibleBianjiSure(){//编辑的确定
            if(this.xmbhBianJI == '' ||this.xmmchengBianJI == ''){
                this["$message"]({
                    message:"请填写必填项！",
                    type: 'warning'
                });
                this.centerDialogVisibleBianJi = true;
            }else{ 
                let number;
                if(this.ModelTemplateQuanBianjiId != this.qianId){
                    number = this.ModelTemplateQuanBianjiId
                }else{
                    number = this.ModelTemplateQuanId
                }
                  Service.xbglSave({
                    "projectName":this.xmmchengBianJI,
                    "projectCode":this.xmbhBianJI,
                    "fondId":number,
                    "comments":this.bzBianJi,
                    'city':this.cityCode,
                    'id':this.editId
           }).then(res=>{
              if(res.data.succeeded == true){
                this.centerDialogVisibleBianJi = false;
                 this["$message"]({
                    message:"保存成功",
                    type: 'success'
                });
                this.getFiles();
              }else{
                  this["$message"]({
                    message:"保存失败",
                    type: 'error'
                });
            }
        })
        }
        }
        centerDialogVisibleSure(){
            this.counts ++;
            if(this.accountSearchsCode == '' ||this.AddProjectName == '' || this.Addxmbh.Addxmbhs == ''){
                this["$message"]({
                    message:"请填写必填项！",
                    type: 'warning'
                });
                this.centerDialogVisible = true;
            }else{
                // let a = this.Addxmbh.Addxmbhs.indexOf('·');
                // let b = this.Addxmbh.Addxmbhs.substr(0,a);
                // let c = this.Addxmbh.Addxmbhs.substr(a+1);
                var str = new RegExp(/^\d+\·\d+$/);
                var sub =str.test(this.Addxmbh.Addxmbhs);
                if(!sub){
                        this["$message"]({
                        message:"项目编号填写格式错误，例如：1101·1",
                        type: 'warning'
                    });
                }else{
                       if(this.counts == 1){
                          Service.getCode(
                            this.Addxmbh.Addxmbhs
                            ).then(res=>{
                            if(res.data.succeeded == true){
                                Service.xbglSave({
                                    "city":this.accountSearchsCode,
                                    "projectName":this.AddProjectName,
                                    "projectCode":this.Addxmbh.Addxmbhs,
                                    // "retentionPeriod":this.Gbgqx,
                                    // "securitLevel":this.xzmj,
                                    "fondId":this.ModelTemplateQuanId,
                                    "comments":this.AddTextArea,

                            }).then(res=>{
                                if(res.data.succeeded == true){
                                    this.centerDialogVisible = false;
                                    this["$message"]({
                                        message:"保存成功",
                                        type: 'success'
                                    });
                                        this.checkFiler.city = this.accountSearchs;
                                        this.getFiles();
                                        this.dioLoading = false;
                                    }else{
                                        this["$message"]({
                                            message:"保存失败",
                                            type: 'error'
                                        });
                                    }
                                })
                            }else{
                                this["$message"]({
                                            message:res.data.errorMessage,
                                            type: 'warning'
                                        });
                            }
                        })
                       }
                     
                }
             
            }
        }
        closeLists(row,index){
            console.log(row);
            console.log(index);
            Service.closeList(row.id).then(res=>{
                if(res.data.succeeded == true){
                       this.getFiles();
                       this.closeBtns = false;
                }
            })
        }
        ChnageRow(row){//修改
        console.log(row)
            this.centerDialogVisibleBianJi = true;
            // this.ModelTemplateQuanBianji[0].id = 1;
            // Service.getAllFonds({}).then(res=>{
            //     this.ModelTemplateQuanBianji = res.data.data;
            // })
            
            Service.SavegetEdit(row.id).then(res=>{
                console.log(res.data.data)
                this.accountSearchBianJi = res.data.data.cityText
                this.xmbhBianJI = res.data.data.projectCode;
                this.xmmchengBianJI = res.data.data.projectName;
                // this.bgqxBianJI = res.data.data.retentionPeriodText;
                // this.mjBianJI = res.data.data.securitLevelText;
                this.bzBianJi = res.data.data.comments;
                this.ModelTemplateQuanBianjiId = res.data.data.fondName;
                this.cityCode = res.data.data.cityCode;
                // if(res.data.data.retentionPeriodCode){
                //      this.retentionPeriodCode = res.data.data.retentionPeriodCode;
                // }else{
                //     this.retentionPeriodCode = 0;
                // }
               
                // this.securitLevelCode = res.data.data.securitLevelCode;
                this.ModelTemplateQuanId = res.data.data.fondId;
                this.editId = res.data.data.id;
                this.qianId = res.data.data.fondName;
            })
        }
        focusAdd(){
        //    this.seleShow = true;
        }
        newAdd(){//新增
            //全宗号
            this.accountSearchs = '';
            this.Addxmbh.Addxmbhs = '';
            this.AddProjectName = '';
            this.ModelTemplateDataCode = '';
            this.ModelTemplateCode = '';
            this.ModelTemplateQuanId = '';
            this.AddTextArea = '';
            this.Gbgqx = 0;
            this.counts = 0;
            // Service.getAllFonds({}).then(res=>{
            //     this.ModelTemplateQuan = res.data.data;
            //     console.log(this.ModelTemplateQuan)
            // })
            Service.getPrepareData({}).then(res=>{
                if(res.data.succeeded == true){
                    this.centerDialogVisible = true;
                    this.ModelTemplate = res.data.data.retentionPeriodDict;
                    this.ModelTemplateData = res.data.data.securitLevelDict;

                    // this.cityDict = res.data.data.cityDict;
                    // for(var key in res.data.data.cityDict){
                    //     var items = res.data.data.cityDict[key];
                    //     var op=document.createElement("option");
                    //     op.setAttribute("label",items.displayText);
                    //     op.setAttribute("value",items.code);
                    //     // document.getElementById('lists').append(op);
                    //     var aa= document.getElementsByClassName('lists')
                    //     aa.append(op);
                    //     console.log(aa)

                    // }
                }
            })
        }
        handleCurrentChange(val) {
            this.page = val-1;
            this.start = (val-1)*(this.limit);
            this.getFiles();
        };
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page);
            this.getFiles();
        };
        goBack(){
             this['$router'].go(-1);
        }
        // 表格初始化
        getFiles(){
            this.listLoading = true;
            Service.searchProjectList({
                    'projectName':this.checkFiler.title,
                    'projectCode':this.checkFiler.number,
                    'cityName':this.checkFiler.city,
                	"page":this.page,
                    "pageSize":this.limit,
                    "sort":"city asc,serialNumber asc"
            }).then((res) =>{
            this.listLoading = false;
               console.log(res.data)
               if(res.data.succeeded == true){
                  this.documentTableData = res.data.data;
                  this.total = res.data.totalRecords;
               }
            })
        };
        cityCodes(params){
            Service.getCode(params).then(res=>{
                
            })
        }
        selectGet(value){
            this.fondId = value;
            console.log(value)
        }
        created(){

        };
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 203;
                })()
            };
            this.getFiles();
        };
        addfile(){

        }
        computed(){};
            // 远程搜索全宗
        remoteMethodfond(query) {
            if (query !== '') {
                this.searchLoading = true;
                Service.getKeyName(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.ModelTemplateQuan = data.map(item => {
                            return { value: item.id, label: '['+item.fondCode+']'+item.fondName,fondCode:item.fondCode};
                        });
                        setTimeout(() => {
                            this.searchLoading = false;
                            this.ModelTemplateQuan = this.ModelTemplateQuan.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
                        this['$message']({
                            message: '查询全宗联想错误！',
                            type: 'error'
                        });
                    }
                });

            } else {
                this.ModelTemplateQuan = [];
            }
        }
        //检索
        checkGetFiles(){
              this.listLoading = true;
              this.page = 0;
            Service.searchProjectList({
                    'projectName':this.checkFiler.title,
                    'projectCode':this.checkFiler.number,
                    'cityName':this.checkFiler.city,
                	"page":this.page,
                    "pageSize":this.limit,
                    "sort":"city asc,serialNumber asc"
            }).then((res) =>{
            this.listLoading = false;
               console.log(res.data)
               if(res.data.succeeded == true){
                  this.documentTableData = res.data.data;
                  this.total = res.data.totalRecords;
                  this.currentPage = res.data.page;
               }
            })
        }
        remoteMethodfond1(query) {
            if (query !== '' && query != undefined) {
                this.searchLoading = true;
                Service.getKeyName(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.ModelTemplateQuanBianji = data.map(item => {
                            return { value: item.id, label: '['+item.fondCode+']'+item.fondName,fondCode:item.fondCode};
                        });
                        setTimeout(() => {
                            this.searchLoading = false;
                            this.ModelTemplateQuanBianji = this.ModelTemplateQuanBianji.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
                        this['$message']({
                            message: '查询全宗联想错误！',
                            type: 'error'
                        });
                    }
                });

            } else {
                this.ModelTemplateQuanBianji = [];
            }
        }

        qingKong(){
            this.checkFiler.number = '';
            this.checkFiler.title = '';
            this.checkFiler.city = '';
        }

         LivedaoLive(){
            let parame = {
                'projectName':this.checkFiler.title,
                'projectCode':this.checkFiler.number,
                'cityName':this.checkFiler.city,
                "page":this.page,
                "pageSize":this.limit,
                "sort":"city asc,serialNumber asc"
            };
            Service.exportProjectList(parame).then(res=>{
                let data = res;
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    var csvData =  new Blob([data]);
                    window.navigator.msSaveOrOpenBlob(csvData, name + '.');
                }else{
                    let url = window.URL.createObjectURL(new Blob([data]));
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    link.setAttribute('download', '项目管理.xlsx');
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
            })
         }

    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/classScheme/classScheme';
</style>