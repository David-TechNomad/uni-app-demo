<template>
    <section class="wrapprSection classLevelDescriptionView">
        <div class="mainTitle">
           <span>类别级著录</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true" :model="fondForm">
                <el-form-item label="定位全宗：">
                    <treeselect v-model="fondForm.archivesAgentCode" style="max-width: 250px;" :clearable="false" placeholder="请选择" :searchable="false" :options="options" :normalizer="normalizer" /></treeselect>
                </el-form-item>
                  <el-form-item label="">
                      <el-select v-model="fondForm.fondCode" placeholder="全部" size="small" style="width: 250px">
                          <el-option :label="item.fondName" :value="item.fondCode" :key="item.fondCode" v-for="item in fondAttr"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="defaultBtn" @click="dingWei">定位</el-button>
                </el-form-item>
             </el-form>
        </div>
        <div class="contentbox boxshow">
            
            <div class="searchCon"> 
                <div class="ta-r">     
                    <el-button class="blueBtn" @click="addClassLevel()">新增</el-button> 
                    <el-button class="redBtn" @click="delClassLevel()">删除</el-button>
                </div>
                                   <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader" 
                                        row-key="id"
                                        stripe
                                        @selection-change="handleSelectionChange"
                                        class="defaultTable mt10">
                                        <el-table-column type="selection"  width="55">
                                        </el-table-column>  
                                        <el-table-column  prop="name" label="操作"  width="250">
                                             <template slot-scope="scope">
                                                 <el-button class="tabletoolBtn" @click="editClassLevel(scope.row)">编辑</el-button>
                                                <!--<el-button class="tabletoolBtn" @click="delClassLevel(scope.row)">删除</el-button>-->
                                                <!--<el-button class="tabletoolBtn" @click="addChildNode(scope.row)">新增子节点</el-button>-->
                                              </template>
                                        </el-table-column>
                                        <el-table-column prop="name" label="题名" align="left">                                           
                                        </el-table-column>
                                        <el-table-column prop="archivalCode" label="档号" align="left">
                                        </el-table-column>
                                       <el-table-column prop="categoryName" label="档案门类" align="left">
                                       </el-table-column>
                                       <!--<el-table-column prop="archivesAgentCode" label="档案馆代码" align="left">
                                       </el-table-column>
                                       <el-table-column prop="rank" label="组合层次" align="left">
                                       </el-table-column>
                                       <el-table-column prop="period" label="时间" align="left">
                                       </el-table-column>
                                       <el-table-column prop="fondCode" label="全宗号" align="left">
                                       </el-table-column>
                                       <el-table-column prop="fondName" label="全宗名称" align="left">
                                       </el-table-column>-->
                                    </el-table>  
                                    <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[10, 20, 30, 40]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev,pager, next, jumper"
                                        :total="total">
                                        </el-pagination>
                                    </div>     
                                 
                         
                   
                </div>
        </div> 
        <el-dialog class="myDialogCenter" top="1%" :title="dialogText" :visible.sync="fileVisible" :close-on-click-modal="true">
                <div class="scrollCon formDiv">
                    <div class="tableCon addLevelDescriptionDialog">
                        <el-form :model="fileForm1" :rules="ruleForm1" ref="fileForm1" label-width="155px">
                            <table class="el-table defaultTable">
                                <tbody  class="el-table__body">
                                    <!--<tr class="el-table__row">
                                        <td colspan="4" >                
                                            <el-form-item label="所属档案馆：" class="SelectItem checkName">
                                                <el-input class="checkName percentName" size="small" readonly v-model="fileForm1.archivesAgentCode"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr>-->
                                    <tr class="el-table__row">
                                        <td colspan="2" >
                                            <el-form-item label="档号：" prop="">
                                                <el-input class="checkName percentName" readonly placeholder="不可编辑，自动生成" size="small" v-model="fileForm1.archivalCode"></el-input>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">
                                            <el-form-item label="题名：" prop="">
                                                <el-input class="checkName percentName" readonly placeholder="不可编辑，自动生成" size="small" v-model="fileForm1.name"></el-input>
                                            </el-form-item>
                                        </td>
                                    </tr>
                                    <tr class="el-table__row">
                                        <td colspan="2" >
                                            <el-form-item label="所属档案馆：" prop="archivesAgentCode">
                                                <el-input class="checkName percentName" v-show="false" readonly size="small" v-model="fileForm1.archivesAgentCode"></el-input>
                                                <el-input class="checkName percentName" v-show="true" readonly size="small" v-model="fileForm1.archivesAgentName"></el-input>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">
                                            <el-form-item label="档案门类代码：" prop="categoryCode">
                                                <el-select v-model="fileForm1.categoryCode" :disabled="dialogText == '编辑类别级著录'" style="width: 100%" placeholder="" size="small" @change="changeMenLei">
                                                    <el-option :label="lable(item)" :value="item.code" :key="item.code" v-for="item in nameAttr"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </td>
                                    </tr>
                                    <tr class="el-table__row"> 
                                        <td colspan="2" >                
                                            <el-form-item label="全宗号：" prop="fondCode">
                                                <el-input class="checkName percentName" readonly size="small" v-model="fileForm1.fondCode"></el-input>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">                 
                                            <el-form-item label="全宗名称：" prop="fondName">
                                                    <el-input class="checkName percentName" readonly size="small" v-model="fileForm1.fondName"></el-input>
                                            </el-form-item>
                                        </td>          
                                    </tr> 
                                    <!--<tr class="el-table__row">
                                        <td colspan="2" >                
                                            <el-form-item label="原全宗号：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.fondCodeOld"></el-input>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">                 
                                            <el-form-item label="全宗曾用名：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.fondNameOld"></el-input>
                                            </el-form-item>
                                        </td>          
                                    </tr> -->
                                    <tr class="el-table__row"> 
                                        <td colspan="2" >                
                                            <el-form-item label="时间：">
                                                <el-date-picker type="date" size="small" placeholder="选择日期" v-model="fileForm1.period" style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">                 
                                            <el-form-item label="组合层次：">
                                               <el-input class="checkName percentName" size="small" v-model="fileForm1.rank"></el-input>
                                            </el-form-item>
                                        </td>          
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="2" >                
                                            <el-form-item label="形成者名称：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.formedName"></el-input>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">
                                            <el-form-item label="原档号：">
                                                 <el-input class="checkName percentName" size="small" v-model="fileForm1.archivalCodeOld"></el-input>
                                            </el-form-item>
                                        </td>
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="2" >                
                                            <el-form-item label="整理体系：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.arrangeMethod"></el-input>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">                 
                                            <el-form-item label="全文数据情况：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.fullTextDataSituation"></el-input>
                                            </el-form-item>
                                        </td>          
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="2" >                
                                            <el-form-item label="新增接收预期：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.receiverExpected"></el-input>
                                            </el-form-item>
                                        </td>
                                        <!--<td colspan="2">
                                            <el-form-item label="组织机构代码：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.fondCompositeCode"></el-input>
                                            </el-form-item>
                                        </td>       -->
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="检索工具：" class="basicItem" ref="parentName" prop="parentName">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.searchTool"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="目录数据情况：" class="basicItem" ref="level" prop="level">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.catalogDataSituation"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="机构沿革或生平传记：" class="basicItem" ref="isProjectCompany" prop="isProjectCompany">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.organizationEvolution"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="档案历史沿革：" class="basicItem" ref="isProjectCompany" prop="isProjectCompany">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.archiveHistoryEvolution"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="范围和内容：" class="basicItem" ref="region" prop="region">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.content"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="鉴定信息：" class="basicItem" ref="region" prop="region">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.identificationInformation"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="收进情况：" class="basicItem" ref="region" prop="region">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.inputSituation"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="移出情况：" class="basicItem" ref="region" prop="region">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.outputSituation"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="著录信息：" class="basicItem" ref="region" prop="region">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.recordInformation"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="备注：" class="basicItem" ref="comments" prop="comments" style="margin-top:10px">
                                                <el-input type="textarea" class="checkName percentName" v-model="fileForm1.comments"></el-input>
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                </tbody>
                            </table>
                        </el-form>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer diaFoot">
                    <el-button type="primary" class="defaultBtn" @click="sureFondsAndUser('fileForm1')">保存</el-button>
                    <el-button class="defaultBtn" @click="fileVisible = false">取消</el-button>
                </div>
            </el-dialog>
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
   import Service from './classLevelDescription.service';
   import Treeselect from '@riophae/vue-treeselect'
   import '@riophae/vue-treeselect/dist/vue-treeselect.css'
   @Component({
       components:{
           Treeselect
       }
   })
    export default class appSuperSearch extends Vue{  
            windowHeight: number= document.documentElement.clientHeight;;
            bodyHeight: number= document.documentElement.clientHeight - 320 ;
            radio3: string = '1';
            fileVisible: boolean;
            ruleForm1: any = {};
            dialogText: string = '';
            fondObj:any = {};
            fileForm1: any = {};
            options:any = [];
            nameAttr:any = [];
            fondAttr:any = [];
            treedata001: any = [];
            fondForm:amy = {};
            activeName:string = 'first';
            tableData: any =[];
            total: number = 0;
            page: number = 0;
            pageSize:number = 10;
            defaultProps: any = {
                children: 'children',
                label: 'name'
            };
            cateObj:any = {};
            multipleSelection:any = [];
            constructor(){
                super();
                this.fileVisible = false;
                 this.fileForm1 = {
                     parentId:0,
                     archivalCode:'',
                     name:'',
                     archivesAgentCode:'',
                     fondCode :'',
                     fondName:'',
                     categoryCode:'',
                     period:'',
                     rank:'',
                     formedName:'',
                     archivalCodeOld:'',
                     arrangeMethod:'',
                     fullTextDataSituation:'',
                     receiverExpected:'',
                     searchTool:'',
                     catalogDataSituation:'',
                     organizationEvolution:'',
                     archiveHistoryEvolution:'',
                     content:'',
                     identificationInformation:'',
                     inputSituation:'',
                     outputSituation:'',
                     recordInformation:'',
                     comments:''
                };
                 this.fondForm = {
                     archivesAgentCode:null,
                     fondCode:''
                 };
                    this.ruleForm1 = {
                        fondName:[
                            { required: true, message: '请填写全宗名称', trigger: ['blur','change'] }
                        ],
                        fondCode:[
                            { required: true, message: '请填写全宗号', trigger: ['blur','change'] }
                        ],
                        archivalCode:[
                            { required: true, message: '请填写档号', trigger: ['blur','change'] }
                        ],
                        name:[
                            { required: true, message: '请填写全题名', trigger: ['blur','change'] }
                        ],
                        archivesAgentCode:[
                            { required: true, message: '请选择所属档案馆', trigger: 'blur' }
                        ],
                        categoryCode:[
                            { required: true, message: '请择档案门类代码', trigger: ['blur','change'] }
                        ]
                    };
                    this.options = [
                        {
                            key: 'archiveAgentCode',
                            name: 'archiveAgentName',
                            children: [ {
                                key: 'archiveAgentCode',
                                name: 'archiveAgentName',
                            } ],
                        }
                    ];
                    this.nameAttr = [];
                    this.fondAttr = [];
                    this.fondObj = {};
                    this.cateObj = {};
                    this.multipleSelection = [];
            };
 
            handleCurrentChange(val:number) {
                this.page = val;
                this.dingWei();
            };
            handleSizeChange(val:number) {
                this.pageSize = val;
                this.dingWei();
            };
            addClassLevel(obj){
                if(this.fondForm.archivesAgentCode == '' || this.fondForm.fondCode == ''){
                    this['$message']({
                        message: "请先选择所属档案馆和全宗",
                        type: 'warning'
                    });
                    return;
                }
                for(let child in this.fileForm1){
                    this.fileForm1[child] = '';
                }
                if(obj){
                    this.fileForm1.parentId = obj.id;
                }
                this.fileForm1.fondCode = this.fondForm.fondCode;
                for(let child of this.fondAttr){
                    if(child.fondCode == this.fileForm1.fondCode){
                        this.fileForm1.fondName = child.fondName;
                        break;
                    }
                }
                this.diGuiTree1(this.options);
                this.fileForm1.archivesAgentCode = this.fondObj.archiveAgentCode;
                this.fileForm1.archivesAgentName = this.fondObj.archiveAgentName;
                this.dialogText = '新增类别级著录';
                this.fileVisible = true;
            };
            addChildNode(obj){
                this.addClassLevel(obj);
                this.dialogText = '新增子节点'
                //this.fileVisible = true;
            };
            editClassLevel(obj){
                this.cateObj = obj;
                this.fileForm1.archivesAgentName = obj.archiveAgentName;
                Service.findOne({"id":obj.id}).then((res) =>{
                    if(res.data.succeeded){
                        for(let item in res.data.data){
                            for(let item2 in this.fileForm1) {
                                if(item === item2) {
                                    if(item == 'categoryCode'){
                                        this.fileForm1[item2] = res.data.data[item].toString();
                                    }else{
                                        this.fileForm1[item2] = res.data.data[item];
                                    }
                                }
                            }
                        }
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
                this.dialogText = '编辑类别级著录'
                this.fileVisible = true;
            };
            delClassLevel() {
                if(this.multipleSelection.length == 0){
                    this['$message']({
                        message: "请先选择数据",
                        type: 'warning'
                    });
                    return;
                }
                this['$confirm']('您是否要删除所选数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let attr = [];
                    for(let child of this.multipleSelection){
                        attr.push(child.id);
                    }
                    Service.deleteCate({
                        "idStr":attr.join(",")
                    }).then((res) =>{
                        if(res.data.succeeded){
                            this['$message']({
                                message: "删除成功",
                                type: 'success'
                            });
                            this.dingWei();
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                });
            }

           normalizer(node) {
               return {
                   id: node.archiveAgentCode,
                   label: node.archiveAgentName,
                   children: node.children
               }
           }

           diGuiTree(item) {  //递归档案馆树结构
               item.forEach(item => {
                   item.children.length == 0 ?
                       delete item.children : this.diGuiTree(item.children);
               })
           }

           diGuiTree1(item) {  //递归档案馆树结构
               for(let child of item){
                   if(child.archiveAgentCode == this.fondForm.archivesAgentCode){
                       this.fondObj =  child;
                       break;
                   }else{
                       if(child.children){
                           this.diGuiTree1(child.children);
                       }
                   }
               }
           }

            //获取档案馆相应全宗、
           getAppraisalFondList(){
               Service.appraisalFondList({"archivesAgentCode":this.fondForm.archivesAgentCode}).then((res) =>{
                   if(res.data.succeeded){
                       this.fondAttr = res.data.data;
                   }else{
                       this['$message']({
                           message: res.data.errorMessage,
                           type: 'error'
                       });
                   }
               });
           }

           dingWei(){
               if(this.fondForm.archivesAgentCode == '' || this.fondForm.fondCode == ''){
                   this['$message']({
                       message: "请先选择所属档案馆和全宗",
                       type: 'warning'
                   });
                   return;
               }
               Service.treelist({
                   "page":this.page,
                   "pageSize":this.pageSize,
                   "archivesAgentCode":this.fondForm.archivesAgentCode,
                   "fondCode":this.fondForm.fondCode
               }).then((res) =>{
                   if(res.data.succeeded){
                        this.tableData = res.data.data;
                        this.total = res.data.totalRecords;
                   }else{
                       this['$message']({
                           message: res.data.errorMessage,
                           type: 'error'
                       });
                   }
               });
           }

            lable(item){
               return item.useValue+" "+item.displayText;
            }

            changeMenLei(val){
                for(let child of this.nameAttr){
                    if(child.code == val){
                        this.fileForm1.archivalCode = this.fileForm1.fondCode+"-"+child.useValue;
                        this.fileForm1.name = this.fileForm1.fondName+"-"+child.displayText;
                        break;
                    }
                }
            }

            sureFondsAndUser(fileForm1){
                if(this.dialogText == '编辑类别级著录'){
                    this.updateLeiBieJi(fileForm1);
                }else {
                    this.saveLeiBieJi(fileForm1);
                }
            }

            updateLeiBieJi(fileForm1){
                this['$refs'][fileForm1]['validate']((valid)=>{
                    if (valid) {
                        let obj = {id:this.cateObj.id};
                        this.fileForm1.parentId = this.cateObj.parentId
                        Object.assign(obj, this.fileForm1);
                        Service.update(obj).then((res) =>{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: "编辑成功",
                                    type: 'success'
                                });
                                this.dingWei();
                                this.fileVisible = false;
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        });
                    }
                });
            }

            saveLeiBieJi(fileForm1){
                this['$refs'][fileForm1]['validate']((valid)=>{
                    if (valid) {
                        this.fileForm1.parentId = 0;
                        Service.add(this.fileForm1).then((res) =>{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: "新增成功",
                                    type: 'success'
                                });
                                this.dingWei();
                                this.fileVisible = false;
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        });
                    }
                });
            }

           handleSelectionChange(val){
               this.multipleSelection = val;
           }

            created(){
                //获取档案馆
                Service.archiveAgenterTree({}).then((res) =>{
                    if(res.data.succeeded){
                        this.options = res.data.data;
                        this.diGuiTree(this.options);
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
                //档案门类
                Service.namelist({}).then((res) =>{
                    if(res.data.succeeded){
                        this.nameAttr = res.data.data;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
            };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 320;
                })()
            };
        };

       @Watch('fondForm.archivesAgentCode')
       fondChange(val) {
           this.fondForm.fondCode = '';
           this.getAppraisalFondList();
       }
   }
</script>

<style lang="scss" scoped>
@import '../../../styles/innerPublic.scss';
@import '../../../styles/system/classLevelDescription/classLevelDescription.scss';
  .addLevelDescriptionDialog{
        max-height: 750px;
        overflow-y: auto;
        padding: 5px;
        .el-table {
            width: 99%;
            overflow: inherit !important;
            td{
            border: none;
            }
        }
        .el-table::before{
                height: 0px;
        }
        .el-form-item {
            margin-top: 8px;
        }
    }
</style>