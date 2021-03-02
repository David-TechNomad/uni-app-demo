<template>
    <section>
       <div class="wrapprSection allProvinceCatalogQueryResultsView">
           <div class="mainTitle">
                <span>全省档案资料检索</span>
            </div>
            <div class="searchKey boxshow">           
                <el-form :inline="true" >   
                    <el-form-item>
                        <el-select  placeholder="请选择" size="small">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item prop="checkedType" class="superSearchChecked">
                        <el-checkbox label="在结果中检索" name="type"></el-checkbox>
                    </el-form-item>             
                    <el-form-item>
                        <el-input placeholder="单行输入" size="small"></el-input>
                    </el-form-item>
                    <el-form-item class="rt">
                        <el-button type="primary" class="defaultBtn">检索</el-button>
                        <el-button type="primary" class="defaultBtn">高级检索</el-button>
                    </el-form-item>
                    </el-form>
            </div> 
            <div class="contentView mainBorrow">
                <div class="left lt boxshow">
                    <el-table ref="processTypeDataTable" stripe tooltip-effect="dark" :height="bodyHeight-30" :data="processTypeData" highlight-current-row :v-loading="typeListLoading" @row-click="getProcessTypeByList" :show-header="false"  class="containTable">
                        <el-table-column :show-overflow-tooltip="true" prop="name" label="流程类型名称">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="right rt pd10 boxshow bgwhite">
                    <div class="formData">
                        <div class="lt">
                            <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="erpTab">
                                <el-tab-pane label="文件列表(共234条检索结果)" name="0"></el-tab-pane>
                                <el-tab-pane label="案卷列表(共12条检索结果)" name="1"></el-tab-pane>
                            </el-tabs>
                        </div>
                        <el-form class="doneForm topParamsForm rt">
                            <el-form-item class="rt">
                                <el-button class="defaultBtn"  @click="dataCheckeds" type="primary">打印</el-button>
                            </el-form-item>
                        </el-form>
                        <dir class="clear"></dir>
                    </div>
                
                    <!--列表(文件列表)-->
                    <div class="borderTable" v-show="documentList">
                        <el-table border stripe :height="bodyHeight-140" :data="processTypeData2" highlight-current-row v-loading="listLoading" class="defaultTable" header-row-class-name="tableHeader">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column type="index" width="50" label="序号"></el-table-column>
                            <el-table-column  label="操作"  width="80">
                                <template slot-scope="scope">
                                   <i class="fa fa-file-text" style="color:rgb(86, 151, 227);font-size:15px;"></i>
                                </template>
                            </el-table-column>
                            <el-table-column label="原文">
                                <template slot-scope="scope">
                                    <i class="fa fa-link" style="color:rgb(110, 120, 130);font-size:15px;"></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="档号">
                            </el-table-column>
                            <el-table-column  prop="address" label="全宗号">
                            </el-table-column>
                            <el-table-column  prop="address" label="年度">
                            </el-table-column>
                            <el-table-column   prop="address" label="题名">
                            </el-table-column>
                            <el-table-column  prop="address" label="保管期限">
                            </el-table-column>
                            <el-table-column   prop="address" label="密级">
                            </el-table-column>
                            <el-table-column   prop="address" label="全宗名称">
                            </el-table-column>
                            <el-table-column   prop="address" label="页数（110）">
                            </el-table-column>
                            <el-table-column   prop="address" label="档案馆名称及代码">
                            </el-table-column>
                        </el-table>
                        <!--工具条分页-->
                        <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="400">
                                        </el-pagination>
                                    </div>  
                    </div>
                    <!--列表(案卷列表)-->
                    <div class="borderTable" v-show="borrowList">
                        <el-table border stripe :height="bodyHeight-140" :data="processTypeData2" highlight-current-row v-loading="listLoading"  class="defaultTable" header-row-class-name="tableHeader">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column type="index" width="50" label="序号"></el-table-column>
                            <el-table-column label="操作" width="80">
                                <template slot-scope="scope">
                                    <i class="fa fa-file-text" style="color:rgb(86, 151, 227);font-size:15px;"></i>
                                </template>
                            </el-table-column>
                            <el-table-column label="原文">
                                <template slot-scope="scope"> 
                                    <i class="fa fa-link" style="color:rgb(110, 120, 130);font-size:15px;"></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="档号">
                            </el-table-column>
                            <el-table-column  prop="name" label="全宗号">
                            </el-table-column>
                            <el-table-column  prop="name" label="年度">
                            </el-table-column>
                            <el-table-column   prop="name" label="题名">
                            </el-table-column>
                            <el-table-column  prop="name" label="保管期限">
                            </el-table-column>
                            <el-table-column   prop="name" label="密级">
                            </el-table-column>
                            <el-table-column   prop="name" label="全宗名称">
                            </el-table-column>
                            <el-table-column   prop="name" label="页数（110）">
                            </el-table-column>
                            <el-table-column   prop="name" label="档案馆名称及代码">
                            </el-table-column>
                        </el-table>
                        <!--工具条分页-->
                        <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="400">
                                        </el-pagination>
                                    </div>  
                    </div> 
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    // import Service from './processCon.service';
    @Component
    export default class appprocessCon extends Vue{
        tableData: any = null;
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;
        activeName:string = '0';
        documentList: boolean;  
        borrowList:boolean;
        processTypeData: any = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        processTypeData2: any = [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        tableSettingData: any = [
            {
                    step:1,
                    name:'',
                    roleId:'',
                    role:{},
                    roleName:'',
                    forward:false,
                    select:false,
                    additionalSignature:false,
                    isInput:true,
                    id:null,
                    processId:null,
                }
        ];
        fondRoleData:any = [];
        processTypeVisible:boolean=false;
        processVisible:boolean = false;
        typeListLoading:boolean = false;
        listLoading:boolean = false;
        listSettingLoading:boolean = false;
        processTypeTitle:string = '新增流程分类';
        processTitle:string = '新增流程';
        processTypeForm: any = {//新增流程分类
            displayText:'',
            comments:''
        };
        arcAscriptionOption: any = [
            {'id':1,'name':'集团'},
            {'id':2,'name':'地方'}
        ];
        arcLevelOption: any = [
            {'id':1,'name':'公开'},
            {'id':2,'name':'秘密'},
            {'id':3,'name':'机密'}
        ];
        processForm:any = {//新增流程
            processTypeName:'',
            processType:'',
            processName:'',
            arcAscription:'',
            arcLevel:'',
            cc:false,
            id:null,

        };
        processSettingForm:any={
            step: 1,
            name: '',
            role: '',
            forward: false,
            select:false,
            additionalSignature:false,
        };
        tableDataRow:any = null;
        ruleProcessTypeForm: any = {
             displayText: [
                { required: true, message: '请输入流程分类名称', trigger: 'blur' }
              ]
        };
        ruleProcessForm:any = {
            processName: [
                { required: true, message: '请输入流程名称', trigger: 'blur' }
            ]
        }
        $refs: { resetFields: HTMLFormElement};
        selectFlag:boolean = false;
        selectFlag1:boolean = false;
        bodyHeight: number = document.documentElement.clientHeight - 183;
        selectData:any = {};
        docAcr:string = '';
        docMj:string = '';
        initTable:any = {};
        constructor(){
            super();
            this.documentList = true;
            this.borrowList = false;
        };
        getProcessTypeData(){
            let dictId = 230;
            this.typeListLoading = true;
            Service.getProcessTypeData({'dictId':dictId}).then((res) =>{
                    this.processTypeData = res.data;
                    this.typeListLoading = false;
            });
        };
        // 切换移交申请和创建全宗申请 档案员权限申请
             handleClick(tab){
                 if(tab.name == 0){
                    this.documentList = true;
                    this.borrowList = false;
                 }else if(tab.name == 1) {
                    this.borrowList = true;
                    this.documentList = false;
                 }
             };
        getProcessTypeByList(row){
            console.log(row)
            this.listLoading = true;
            this.tableDataRow = row;
            Service.getProcessTypeByList({'processType':row.code}).then((res) =>{
                    this.tableData = res.data;
                    this.listLoading = false;
            });
        };
        saveSetting(row){
            console.log(this.processSettingForm)
            if(this.processSettingForm.name== ''||this.processSettingForm.name==null){
                this['$message']({
                    message: '节点名称不能为空',
                    type: 'warning'
                });
                
            }else if(this.selectFlag == false){
                console.log(this.processSettingForm)
                if(this.processSettingForm.role.roleName == '' ||this.processSettingForm.role.roleName==null){
                      this['$message']({
                            message: '请选择节点角色。',
                            type: 'warning'
                        });
                }else{
                    row.step = this.processSettingForm.step;
                    row.name = this.processSettingForm.name;
                    row.roleId = this.processSettingForm.role.id;
                    row.roleName = this.processSettingForm.role.roleName;
                    row.forward = this.processSettingForm.forward;
                    row.select= this.processSettingForm.select;
                    row.additionalSignature= this.processSettingForm.additionalSignature;
                    row.role = this.processSettingForm.role; 
                    // for(var i=0;i<this.tableSettingData.length;i++){
                    //     this.tableSettingData[this.tableSettingData.length-1].step = this.processSettingForm.step;
                    //     this.tableSettingData[this.tableSettingData.length-1].name = this.processSettingForm.name;
                    //     this.tableSettingData[this.tableSettingData.length-1].roleId = this.processSettingForm.role.id;
                    //     this.tableSettingData[this.tableSettingData.length-1].roleName = this.processSettingForm.role.roleName
                    //     this.tableSettingData[this.tableSettingData.length-1].forward =this.processSettingForm.forward 
                    //     this.tableSettingData[this.tableSettingData.length-1].select = this.processSettingForm.select
                    //     this.tableSettingData[this.tableSettingData.length-1].additionalSignature = this.processSettingForm.additionalSignature;
                    // }
                    console.log(this.tableSettingData);
                    var brr = JSON.stringify(this.tableSettingData);
                    var crr =JSON.parse(brr)
                    for(let i=0;i< crr.length;i++){
                        if(crr[i].id==row.id){
                            console.log(1)
                            //  this.tableSettingData[i].isInput = false;
                            // this.$set(this.tableSettingData[i],'isInput',false)
                            crr[i].isInput = false
                        }
                    }
                    this.tableSettingData = crr;
                }
               
            }else{
                    row.step = this.processSettingForm.step;
                    row.name = this.processSettingForm.name;
                    row.roleId = this.processSettingForm.role.id;
                    row.roleName = this.processSettingForm.role.roleName;
                    row.forward = this.processSettingForm.forward;
                    row.select= this.processSettingForm.select;
                    row.additionalSignature= this.processSettingForm.additionalSignature;
                    row.role = this.processSettingForm.role; 
                    // for(var i=0;i<this.tableSettingData.length;i++){
                    //     this.tableSettingData[this.tableSettingData.length-1].step = this.processSettingForm.step;
                    //     this.tableSettingData[this.tableSettingData.length-1].name = this.processSettingForm.name;
                    //     this.tableSettingData[this.tableSettingData.length-1].roleId = this.processSettingForm.role.id;
                    //     this.tableSettingData[this.tableSettingData.length-1].roleName = this.processSettingForm.role.roleName
                    //     this.tableSettingData[this.tableSettingData.length-1].forward =this.processSettingForm.forward 
                    //     this.tableSettingData[this.tableSettingData.length-1].select = this.processSettingForm.select
                    //     this.tableSettingData[this.tableSettingData.length-1].additionalSignature = this.processSettingForm.additionalSignature;
                    // }
                    console.log(this.tableSettingData);
                    var brr = JSON.stringify(this.tableSettingData);
                    var crr =JSON.parse(brr)
                    for(let i=0;i< crr.length;i++){
                        if(crr[i].id==row.id){
                            console.log(1)
                            //  this.tableSettingData[i].isInput = false;
                            // this.$set(this.tableSettingData[i],'isInput',false)
                            crr[i].isInput = false
                        }
                    }
                    this.tableSettingData = crr;
            }
            
            // if(this.processSettingForm.role == ''||this.processSettingForm.role==null){
            //     this['$message']({
            //         message: '节点角色不能为空',
            //         type: 'warning'
            //     });
            //     return;
            // }
            // row.step = this.processSettingForm.step;
            // row.name = this.processSettingForm.name;
            // row.roleId = this.processSettingForm.role.id;
            // row.roleName = this.processSettingForm.role.roleName;
            // row.forward = this.processSettingForm.forward;
            // row.select= this.processSettingForm.select;
            // row.additionalSignature= this.processSettingForm.additionalSignature;
            // row.role = this.processSettingForm.role;
            // for(let i=0;i< this.tableSettingData.length;i++){
            //     if(this.tableSettingData[i].id==row.id){
            //         this.$set(this.tableSettingData[i],'isInput',false)
            //         //  this.tableSettingData[i].isInput = false;
            //     }
            // }
            // for(let i in this.tableSettingData){
            //     if()
            // }
        };
        editSetting(row){
            console.log(row)
            console.log(this.tableSettingData)
            for(let i=0;i< this.tableSettingData.length;i++){
                    if(this.tableSettingData[i].isInput){
                        this['$message']({
                            message: '请先保存节点',
                            type: 'warning'
                        });
                        return;
                    }
            }
            let arr = [];
            var brr = JSON.stringify(this.tableSettingData);
            var crr = JSON.parse(brr)
            for(let i=0;i< crr.length;i++){
                if(crr[i].id==row.id&&crr[i].isInput){
                   arr.push(i)
                //    crr[i].isInput = false;
                //    this.$set(crr[i],'isInput',false)
                }
            }
            if(arr.length>0){
                 this['$message']({
                        message: '请先保存节点',
                        type: 'warning'
                    });
            }else{
            if(row.role == null){
                row.role = {};
                row.role.roleName = '';
            }
            let role = {
                'id':row.role.id,
                'roleName':row.role.roleName,
                'value':row.role.id,
            }
            let processSettingForm = {};
            this.processSettingForm = {
                'step':row.step+'',
                'name':row.name,
                'forward':row.forward,
                'select':row.select,
                'additionalSignature':row.additionalSignature,
                'role':role,
            }
            if(row.select){
                this.selectFlag = true;
            }else{
                this.selectFlag = false;
            }
            for(let i=0;i<crr.length;i++){
                if(crr[i].id==row.id){
                    //  this.tableSettingData[i].isInput = true;
                    // this.$set(this.tableSettingData[i],'isInput',true)
                    crr[i].isInput = true;
                    }
                }
               this.tableSettingData = crr;
               console.log(this.tableSettingData)
            }
        };
        deleteSetting(index){
            // for(let i=0;i< this.tableSettingData.length;i++){
            //     if(this.tableSettingData[i].isInput){
            //         this['$message']({
            //             message: '请先保存节点',
            //             type: 'warning'
            //         });
            //         return;
            //     }
            // }
            this['$confirm']('您确认移除此节点吗？', {
                type: 'warning'
            }).then(() => {
                this.tableSettingData.splice(index, 1);
                for(let i=0;i< this.tableSettingData.length;i++){
                    let step = Number(i)+1;
                    this.tableSettingData[i].step = step;
                }
            });
            console.log(this.tableData[0].settings);
            console.log(this.tableSettingData)
        };
        addProcessSetting(){
            for(let i=0;i< this.tableSettingData.length;i++){
                if(this.tableSettingData[i].isInput){
                    this['$message']({
                        message: '请先保存节点',
                        type: 'warning'
                    });
                    return;
                }
            }
            this.selectFlag = false;
            let step = this.tableSettingData.length+1;
            this.tableSettingData.push(
                {
                    step:step,
                    name:'',
                    roleId:'',
                    reoleName:'',
                    forward: false,
                    select:'',
                    additionalSignature:false,
                    isInput:true
                }
            );
            this.processSettingForm={
                step: step,
                name: '',
                role: '',
                forward: false,
                select:'',
                additionalSignature:false,
            };
            console.log(this.tableSettingData)
            console.log(this.processSettingForm)
        };
        aaa(){
            if(this.processSettingForm.select == true){
                    this.selectFlag = true;
                    // this.processSettingForm.role.roleName = '';
                    this.processSettingForm.role = ''

            }else{
                this.selectFlag = false;
            }
        }
        bbb(data){
            console.log(data)
            this.selectData = data;
        }
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        saveProcess(){
            this.$refs['processForm']['validate']((valid) => {
              if (valid) {
                for(let i=0;i< this.tableSettingData.length;i++){
                    if(this.tableSettingData[i].isInput){
                        this['$message']({
                            message: '请先保存节点',
                            type: 'warning'
                        });
                        return;
                    }
                }
                let settings = [];
                for(let i=0;i< this.tableSettingData.length;i++){
                    let data = this.tableSettingData[i];
                    let setting =  {
                        'step':data.step,
                        'roleId':data.roleId,
                        'forward':data.forward,
                        'select':data.select,
                        'additionalSignature':data.additionalSignature,
                        'name':data.name,
                        'id':data.id,
                        'processId':data.processId,
                    };
                    settings.push(setting);
                }

                this.processForm.settings = settings;
                this.processForm.arcAscription = this.initTable.arcAscriptionNum;
                this.processForm.arcLevel = this.initTable.arcLevelNum;
                this.processForm.id = this.initTable.id
                Service.saveProcess(this.processForm).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: res.data.data.message,
                            type: 'success'
                        });
                        if(res.data.data.code == '2'){
                            this.processVisible = false;
                            this.getProcessTypeByList(this.tableDataRow);
                        }
                        
                    }
                });
              }
            });
        };
       
        closeDialog(){
            this.processVisible = false;
            this.tableSettingData = [];
            this.processForm = {};
        };
        showEditProcess(row){
            console.log(row)
            this.initTable = row;
            this.processVisible = true;
            this.processTitle = '修改流程配置';
            // this.processForm = row;
            this.docAcr = row.arcAscription
            this.docMj = row.arcLevel
            this.processForm.processTypeName = this.tableDataRow.displayText;
            this.tableSettingData = row.settings;
            this.processForm.processName = row.processName;
            this.processForm.processType = row.processType;
            this.processForm.id = row.id;
            this.processForm.cc = row.cc;
            for(let i=0;i< this.tableSettingData.length;i++){
                if(this.tableSettingData[i].role == null){
                    this.tableSettingData[i].roleName = '';
                }else{
                    this.tableSettingData[i].roleName = this.tableSettingData[i].role.roleName;
                }
                this.tableSettingData[i].isInput = false;
                this.tableSettingData[i].processId = row.id;
            }
            this.processForm.settings = this.tableSettingData;
        };
        showAddProcess(){
            if(this.tableDataRow == null){
                this['$message']({
                    message: '请先选择流程分类',
                    type: 'warning'
                });
                return;
            }
             this.processVisible = true;
             this.processTitle = '新增流程分类';
             this.processForm = {//新增流程
                processTypeName:'',
                processType:'',
                processName:'',
                arcAscription:'',
                arcLevel:'',
                cc:false,
                id:null,

            };
             this.processForm.processTypeName = this.tableDataRow.displayText;
             this.processForm.processType = Number(this.tableDataRow.code);
             this.tableSettingData = [];
            console.log(this.processForm);
        };
        
        deleteProcess(row){

            this['$confirm']('您确认删除此流程吗？', {
                type: 'warning'
            }).then(() => {
                Service.deleteProcess({'processId':row.id}).then((res) =>{
                    if(res.data){
                        this['$message']({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getProcessTypeByList(this.tableDataRow);
                    }else{
                        this['$message']({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })
            });
        };

        deleteProcessType(){
            if(this.tableDataRow == null){
                this['$message']({
                    message: '请选择您要删除的流程分类',
                    type: 'warning'
                });
                return;
            }
            if(this.tableData.length>0){
                this['$message']({
                    message: '请先删除流程列表数据',
                    type: 'warning'
                });
                return;
            }
            this['$confirm']('您确认删除此流程分类吗？', {
                type: 'warning'
            }).then(() => {
                Service.deleteProcessType(this.tableDataRow.keys).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getProcessTypeData();
                    }else{
                        this['$message']({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })
            });
        };
        showAddProcessType(){
            this.processTypeVisible = true;
            this.processTypeTitle = '新增流程分类';
            this.$nextTick(()=>{
               this.$refs['processTypeForm'].resetFields();
            })
        };
        showEditProcessType(){
            if(this.tableDataRow == null){
                this['$message']({
                    message: '请选择您要编辑的流程分类',
                    type: 'warning'
                });
                return;
            }
            this.processTypeVisible = true;
            this.processTypeTitle = '编辑流程分类';
            // this.processTypeForm = this.tableDataRow;
            this.processTypeForm.displayText = this.tableDataRow.displayText;
            this.processTypeForm.comments = this.tableDataRow.comments;
        };
        saveProcessTypeForm(form){
           this.$refs['processTypeForm']['validate']((valid) => {
              if (valid) {
                if(this.processTypeTitle == '编辑流程分类'){
                    console.log(this.processTypeForm)
                    let codes = [];
                    let data = this.$refs['processTypeDataTable']['data'];
                    data.forEach(item => {
                        codes.push(Number(item.code))
                    });
                    let code = 0;
                    if(codes.length>1){
                        code = Math.max.apply(Math,codes)+1;
                    }else{
                        code = 1;
                    }
                    this.processTypeForm.dictId = 230;
                    // this.processTypeForm.code = code;
                    // this.processTypeForm.sortSeq = code;
                    console.log(this.processTypeForm)
                    this.processTypeForm.code = this.tableDataRow.code;
                    this.saveEdit(this.processTypeForm)
                }else{
                    this.saveEdit(this.tableDataRow)
                }
                // this.processTypeForm = this.tableDataRow;
                // Service.saveProcessType(this.processTypeForm).then((res) =>{
                //     if(res.data.succeeded){
                //         this['$message']({
                //             message: '成功！',
                //             type: 'success'
                //         });
                //         this.processTypeVisible = false;
                //         this.getProcessTypeData();
                //     }
                // });
              }
            });

        };
        saveEdit(params){
            Service.dicDataUpSave({
                code: params.code,
                comments: params.comments,
                dictId: params.dictId,
                displayText:params.displayText
            }).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '保存成功！',
                            type: 'success'
                        });
                        this.processTypeVisible = false;
                        this.getProcessTypeData();
                    }
                });
        }
        getFondRoleList(){
            Service.getFondRoleList({}).then((res) =>{
                    this.fondRoleData = res.data.data;
                    for(let i in this.fondRoleData){
                        this.fondRoleData[i].value = this.fondRoleData[i].id;
                    }
            });
        };
        handleClose1(){
            for(var i=0;i<this.tableSettingData.length;i++){
                if(this.tableSettingData[this.tableSettingData.length-1].roleName == undefined ||this.tableSettingData[this.tableSettingData.length-1].roleName == ''){
                    this.tableSettingData = this.tableSettingData.pop()
                }
            }
            this.tableSettingData = [];//在修改时重新赋值
            console.log(this.tableData)
            // this.tableData.settings = this.initTable;
            console.log(this.tableData);
            Service.getProcessTypeByList({'processType':this.tableDataRow.code}).then((res) =>{
                    this.tableData = res.data;
                    this.listLoading = false;
            });
            // this.tableSettingData
            // console.log(this.tableSettingData)
            // for(let i in this.tableSettingData){
            //     this.tableSettingData[i].isInput = false;
            // }
            this.processVisible = false;
        }
        mounted():void{
             window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 183;
                })()
            };
        };
        created(){
            // this.getProcessTypeData();
            // this.getFondRoleList();
        };
    }

</script>

<style lang="scss" scoped>
@import '../../styles/innerPublic.scss';
   .allProvinceCatalogQueryResultsView{
       .contentView{
           margin-top: 10px;
           .left{
               width: 15%;
           }
           .right {
               width: 84%;
               .formData {
                   margin-top: -11px;
               }
               .cardTab {
                   background: #fff;
                   height: 40px;
               }
           }
       }
   }
</style>