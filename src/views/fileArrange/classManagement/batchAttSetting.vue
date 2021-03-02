<template>    
   <el-dialog title="批量挂接规则" :visible.sync="exportNumbers" class="myDialogItems" :close-on-click-modal="false" :modal-append-to-body='false' :before-close="handleClose1">
           
            <div style="clear:both;overflow: hidden;">
                <b>规则列表</b>
                <el-button  class="defaultBtn" @click="newAdd" style="float:right">新增</el-button>
            </div>          
          
             <el-table :data="RulesData" 
                :max-height='150' 
                stripe highlight-current-row  
                header-row-class-name="tableHeader"  
                class="defaultTable">
                 <el-table-column prop='ruleName' label="规则名称">                        
                </el-table-column>
                <el-table-column prop='matchType' width='100' label="规则匹配">
                          <template slot-scope="scope">
                               <span v-if="scope.row.matchType === 1">等于</span>
                               <span v-if="scope.row.matchType === 2">包含</span>
                         </template>
                </el-table-column>
                 <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="defaultBtn" @click="ruleEdit(scope.$index,scope.row)">编辑</el-button>
                                <el-button class="defaultBtn" @click="ruleDelete(scope.$index,scope.row)">删除</el-button>
                            </template>
                </el-table-column>

            </el-table>

             <div style="position:absolute;bottom:340px" v-show="exporShow">
                     <p style='line-height:10px'>
                        <b style="padding-top:10px;display:inline-block">{{EdittrueTitle}}</b>
                    </p>
             </div>
            <div style="position:absolute;bottom:50px;width:100%;height:280px;overflow-y:scroll" v-show='exporShow'>
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
                    <el-table :data="exportNumberData" stripe highlight-current-row  :max-height='120'  header-row-class-name="tableHeader"  
                class="defaultTable">
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
                                    <el-button class="tabletoolBtn" @click="ExdeletBtn(scope.$index,scope.row)">删除</el-button>
                                </template>
                        </el-table-column>
                </el-table>
                <el-table :data="data" :show-header="false"  tooltip-effect="dark"  class="defaultTable">
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
                                    <el-button class="tabletoolBtn" @click="ExAddBtn(scope.row)">新增</el-button>
                                </template>
                    </el-table-column>
                </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer"><el-button v-show = 'pLbuttonSave' class="defaultBtn" @click="exportNumberSure">保存</el-button></div>
        </el-dialog>
        
</template>
<script lang="ts">
    import { Component, Vue,Prop , Watch } from 'vue-property-decorator';   
    import Service from './classManagement.service';  
    @Component({})
    export default class atuoSort extends Vue{       
        classId：number = 0;
        exportNumbers:boolean = false; 
        ruleTable:any = [];
        RulesData:any = [];
        exportOption2:any = [];
        exporShow:boolean= false;
        EdittrueTitle:string="";
        bState:number;
        bStateId:number;   
        Rules:any = {
                name:''
            };
        ruleTypeDatas:any = {
                matchType : ''
            };
        ruleTypeData:any = [
                {
                    matchType:2,
                    Value:'包含'
                },
                {
                    matchType:1,
                    Value:'等于'
                }
        ]; 
        fileDatas:any ={
                fileNameProceedType:'不处理'
          };
        fileData:any =[
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
        pLbuttonSave:boolean = false;
        NWflag:boolean = false;
        FGflag:boolean = false;
         NWName:any = {};
        FGName:any = {};
        PLcomment:string="";
        exportNumberData:any = [];
        data:any = [];
        constructor(){
            super();           
        };      
        //批量挂接规则
        exportNumber(){                     
            this.exportNumbers = true;
            let params = {
                 libId:this.classId,                      
            }              
            Service.getRule(params).then(res=>{                 
                this.RulesData = res.data.data;                 
                Service.candidates(params).then(res=>{
                    this.exportOption2 = res.data.data;
                })

            })
            
        };
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
        };
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
        };
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
        //批量挂接规则 规则定义
        ruleTypes(value){
            let obj = {};
            obj = this.ruleTypeData.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.matchType === value;//筛选出匹配数据
            })
            this.matType = value;
            this.ruleTypeDatas.matchType = this.matType;

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
        //批量挂接 点击x 清空数据
            handleClose1(){
                this.RulesData = [];
                this.exporShow = false;
                this.exportNumbers = false;
            } 
    }
    
</script>

<style lang="scss" scoped>
    @import '../../../styles/classManagement/classManagement';
</style>