<template>
    <section class="wrapprSection casesManagementView">
         <div class="mainTitle">
            <span>全宗管理</span>
            </div>        
            <div class="treeOne tree ">
                <div class="treeTitle boxshow textBlue">
                    <el-form ref="form" class="mt5 relative">
                        <el-form-item label="" class ="">
                            <el-input size="small" placeholder="单行输入" v-model="filterText"></el-input>
                            <i class="el-icon-search absolute" style="top: 13px;right: 10px;cursor: pointer;"></i>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="treeCon boxshow icontree">
                    <p class="treeTitle">所有档案馆</p>
                        <el-tree class="filter-tree" 
                                :data="treedata001"                                                 
                                node-key="id"                           
                                @node-click="handleNodeClick"
                                 :props="defaultProps"
                                 :filter-node-method="filterNode"
                                 v-loading="treeLoading"
                                ref="tree1">
                        </el-tree>
                </div>
            </div>
            <div class="contentbox">
                <div class="searchKey boxshow">           
                    <el-form :inline="true" class="d-ib"> 
                        <el-form-item label="全宗号">
                            <el-input placeholder=" " size="small" v-model="filters.fondCode"></el-input>
                        </el-form-item>              
                        <el-form-item label="全宗名称">
                            <el-input placeholder=" " size="small" v-model="filters.fondName"> </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="defaultBtn" @click="searchFond()">检索</el-button>
                        </el-form-item>
                    </el-form>
                </div> 
                
                <!-- <span class="tableTitle">原文列表</span> -->
                <div class="pd10 boxshow bgwhite mt10">
                    <div class="text-right">     
                        <el-button class="blueBtn"  @click="addCases()">创建全宗</el-button> 
                        <el-button class="defaultBtn" @click="importCases()">导入</el-button>
                        <el-button class="defaultBtn" @click="upLoads()">导出</el-button>
                    </div>
                    <el-table border stripe :height="bodyHeight" :empty-text="emptyText" @selection-change="handleSelectionChange" v-loading="tableLoading" :data="fondSearchData" highlight-current-row class="defaultTable mt10" header-row-class-name="tableHeader">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column type="index" width="50" label="序号"></el-table-column>
                        <el-table-column  label="操作"  width="150">
                            <template slot-scope="scope">
                                <el-button class="tabletoolBtn"  @click="editCases(scope.row)">编辑</el-button>
                                <el-button class="tabletoolBtn"  @click="delCases(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="fondCode" label="全宗号">
                        </el-table-column>
                        <el-table-column  prop="fondName" label="全宗名称">
                        </el-table-column>
                        <el-table-column  prop="organizationCode" label="组织机构代码">
                        </el-table-column>
                        <el-table-column  prop="rank" label="组合层次">
                        </el-table-column>
                        <el-table-column  prop="fondFormat" label="全宗形式">
                        </el-table-column>
                    </el-table>
                        <!--<div class="clear mt10">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, next, jumper"
                            :total="400">
                            </el-pagination>
                        </div>   -->
                </div> 
            </div>
        <el-dialog class="myDialogCenter addCasesManagementDialog" top="5%" :title="dialogTitle" :visible.sync="fileVisible" :close-on-click-modal="true" :before-close="handleClose">
                <div class="scrollCon formDiv">
                    <div class="tableCon addCasesDialog">
                        <el-form :model="fileForm1" :rules="ruleForm1" ref="fileForm1" label-width="155px">
                            <table class="el-table defaultTable" style="max-height:500px;">
                                <tbody  class="el-table__body">
                                    <tr class="el-table__row"> 
                                        <td colspan="4" >                
                                            <el-form-item label="所属档案馆：" class="SelectItem checkName">
                                                <el-input readonly class="checkName percentName" size="small" readonly v-model="treeObj.archiveAgentName"></el-input>
                                                <!--<el-select v-else v-model="fileForm1.archivesAgentCode" placeholder="请选择" style="width: 600px;">
                                                    <el-option style="overflow-y: auto;height: 220px" :label="archiveAgentName" :value="archiveAgentCode" :key="archiveAgentCode">
                                                        <el-tree class="filter-tree"
                                                                 default-expand-all
                                                                 :data="treedata001"
                                                                 node-key="archiveAgentCode"
                                                                 @node-click="handleNodeClick1"
                                                                 :props="defaultProps"
                                                                 ref="tree">
                                                        </el-tree>
                                                    </el-option>
                                                </el-select>-->

                                                <!--<el-dropdown class="checkName" trigger="click">
                                                <span class="el-dropdown-link" @click="triggerOut" style="cursor:pointer;display:block;">
                                                    sssssss
                                                    <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                                                </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-tree class=""
                                                             :data="treedata001"
                                                             node-key="id"
                                                             @node-click="handleNodeClick"
                                                             :props="defaultProps"
                                                             ref="tree">
                                                    </el-tree>
                                                </el-dropdown-menu>
                                                </el-dropdown>-->

                                               <!-- <el-popover
                                                        trigger="click">
                                                    <el-tree class=""
                                                             :data="treedata001"
                                                             node-key="id"
                                                             @node-click="handleNodeClick"
                                                             :props="defaultProps"
                                                             ref="tree">
                                                    </el-tree>
                                                    <el-input slot="reference">click 激活</el-input>
                                                </el-popover>-->

                                                <!--<el-input class="checkName percentName" size="small" readonly v-model="fileForm1.archivesAgentCode"></el-input>-->
                                            </el-form-item>
                                        </td>     
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="2" >                
                                            <el-form-item label="全宗号：" prop="fondCode">
                                                <el-input :readonly="dialogTitle=='编辑全宗'" class="checkName percentName" size="small" v-model="fileForm1.fondCode"></el-input>
                                            </el-form-item>
                                        </td>
                                        <td colspan="2">                 
                                            <el-form-item label="全宗名称：" prop="fondName">
                                                    <el-input class="checkName percentName" size="small" v-model="fileForm1.fondName"></el-input>
                                            </el-form-item>
                                        </td>          
                                    </tr> 
                                    <tr class="el-table__row"> 
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
                                    </tr> 
                                    <tr class="el-table__row"> 
                                        <td colspan="2" >                
                                            <el-form-item label="时间：">
                                                <el-date-picker type="date" size="small" placeholder="选择日期" v-model="fileForm1.fondPeriod" style="width: 100%;"></el-date-picker>
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
                                            <el-form-item label="全宗形式：">
                                                 <el-input class="checkName percentName" size="small" v-model="fileForm1.fondFormat"></el-input>
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
                                        <td colspan="2">                 
                                            <el-form-item label="组织机构代码：">
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.organizationCode"></el-input>
                                            </el-form-item>
                                        </td>          
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
                                                <el-input class="checkName percentName" size="small" v-model="fileForm1.organizationEvolution"></el-input><i class="fa fa-search big" @click="updateOrgOut()" v-show="updateOrg"></i>
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
                    <el-button type="primary" v-if="dialogTitle == '新增全宗'" class="defaultBtn" @click="sureAddFondsAndUser('fileForm1')">保存</el-button>
                    <el-button type="primary" v-else class="defaultBtn" @click="sureUpdateFondsAndUser('fileForm1')">保存</el-button>
                    <el-button class="defaultBtn" @click="fileVisible = false">取消</el-button>
                </div>
            </el-dialog>

            <!--导入弹框-->
            <importCases ref="importCasesDialogRef" :archivesAgentCode="treeObj.archiveAgentCode"></importCases>
    </section>
</template>

<script lang="ts">
        import Vue from 'vue';
        import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
        import Component from 'vue-class-component';
        import Service from './casesManagement.service';
        import mockData from '@/mock/data/mockData';
        import { Loading } from 'element-ui';
        import importCases from './importCases/importCases';
        @Component({
            components:{
                importCases
            }
        })
        export default class appborrow extends Vue{
            b: any = {};
            c: any = {};
            mockList: any = [];
            page: number;
            loadingInstance:any={};
            dialogTitle: string = '';
            searchLoading: boolean;
            superFilterShow:boolean;
            superTableShow:boolean;
            defaultLeftOpen: any = [];
            defaultRightOpen: any = [];
            treedata001: any = [];
            nameLoading:boolean;
            fondSearchData: any = [];
            ruleForm1: any = {};
            filters: any = {};
            fileForm: any = {};
            fileForm1: any = {};
            fileForm2: any = {};
            checkNameForm: any = {};
            roleSelect: any = [];
            tableData: any = [];
            defaultTrees: any = {};
            searchOptions: any = [];//远程搜索条目
            peopleVisible1: boolean;
            dataCompany: any = [];
            leafName: any = [];
            basicForm: any = {};
            aloneTree: any = {};
            allTree: any = {};
            fondMove: any = {};
            defaultArr: any = {};
            dataName: any = [];
            data: any = [];
            roleList: any = [];
            multipleSelection:any = [];
            fondTreeName: any = {};
            oaClickRowName: any = {};
            updateFonds: any = {};
            oaClickRowName1: any = {};
            defaultProps: any = {};
            fileVisible: boolean;
            lazyTreeShow:boolean;
            searchTreeShow:boolean;
            fileVisibleMove: boolean;
            fileVisibleMove1: boolean;
            peopleVisible: boolean;
            tree: any = [];
            filterText:string;
            fileVisibleMoveUpdate: boolean;
            treeLoading: boolean;
            comLoading: boolean;
            treeParamsId: number;
            index: number;
            bodyHeight: number= document.documentElement.clientHeight - 323 ;
            emptyText:string;
            kuandu:number;
            exWidth:number;
            archiveAgentCode:string;
            tableLading: boolean;
            node: any = {};
            resolve: any = {};
            i: number;
            j: number;
            updateOrg: boolean;
            duiYingGongSi: boolean;
            a:any = {};
            dangAnYuanVisible:boolean;
            dangAnYuanData:any = {};
            str:string;
            expands:any = [];
            childData: any = [];
            ids: any = [];
            parentId:string;
            duiXiang: any = {};
            dataAttr: any = [];
            tableLoading:boolean;
            item:any = {};
            treeObj:any = {};
            fondObj:any = {};
            archiveAgentName:string;
            archiveAgentCode:string;
            baseUrl1:any= process.env.API_BASEURL2;
            $refs: { changeVaL: HTMLFormElement ,getFiles: HTMLFormElement};
            constructor(){
                super();
                this.filterText = '';
                this.fileVisible = false;
                this.fileVisibleMove = false;
                this.fileVisibleMove1 = false;
                this.archiveAgentName = '';
                this.archiveAgentCode = '';
                this.emptyText = '请先选择档案馆';
                this.mockList = mockData;
                this.bodyHeight = document.documentElement.clientHeight - 323 ;
                this.peopleVisible = false;
                this.superFilterShow = true;
                this.superTableShow = false;
                this.searchLoading = false;
                this.searchTreeShow = false;
                this.nameLoading = false;
                this.page = 0;
                this.fileVisibleMoveUpdate = false;
                this.treeLoading = false;
                this.comLoading = false;
                this.lazyTreeShow = true;
                this.roleList = [];
                this.tableLoading = false;
                this.multipleSelection = [];
                this.fondObj = {};
                this.filters = {
                    fondName:'',
                    fondCode:'',
                    archiveAgentCode:''
                };
                this.searchOptions = [];
                this.fileForm = {
                    roleIds:'',
                    userId:'',
                    roleId:''
                };
                this.ruleForm1 = {
                    fondName:[
                        { required: true, message: '请填写全宗名称', trigger: 'blur' }
                    ],
                    fondCode:[
                        { required: true, message: '请填写全宗号', trigger: 'blur' }
                    ],
                };
                this.defaultLeftOpen = [];
                this.defaultRightOpen = [];
                this.defaultProps = {
                    children: 'children',
                    label: 'archiveAgentName',
                    id:'archiveAgentCode'
                };
                this.fondMove = {
                    parentId:0,
                    children:""
                };
                this.fondTreeName = {
                    name:'所有部门案卷库',
                    id:''
                };
                this.b = {
                    fullName:'',
                    loginName:'',
                };
                this.dataName = [

                ];
                this.tree = [];
                this.defaultArr = [];
                this.dataCompany = [

                ];
                this.oaClickRowName = {
                    uid:'',
                    uName:''
                };
                this.allTree = {};
                this.aloneTree = {name:''};
                this.oaClickRowName1 = {};
                this.checkNameForm = {
                    checkName:''
                };
                this.defaultTrees = {
                    children: 'children',
                    label: 'shortName',
                    id:'orgId'
                };
                this.fileForm1 = {
                    fondCode:'',
                    fondName:'',
                    sortSeq:0,
                    fondNameOld:'',
                    archivesAgentCode:this.archiveAgentCode,
                    fondPeriod:'',
                    rank:'',
                    formedName:'',
                    organizationEvolution:'',
                    archiveHistoryEvolution:'',
                    arrangeMethod:'',
                    content:'',
                    searchTool:'',
                    fondCodeOld:'',
                    catalogDataSituation:'',
                    fullTextDataSituation:'',
                    receiverExpected:'',
                    identificationInformation:'',
                    inputSituation:'',
                    fondFormat:'',
                    outputSituation:'',
                    recordInformation:'',
                    comments:'',
                    organizationCode:'',
                };
                this.fileForm2 = {
                    fondId:''
                };
                this.basicForm = {

                };
                this.tableLading = false;
                this.i = 0;
                this.j = 0;
                this.updateOrg = false;
                this.duiYingGongSi = false;
                this.a = {};
                this.dangAnYuanVisible = false;
                this.dangAnYuanData = {};
                this.str = '';
                this.expands = [];
                this.childData = [];
                this.ids = [];
                this.parentId = 0;
                this.duiXiang = {};
                this.dataAttr = [];
                this.item = {};
                this.treeObj = {};
            };

         handleCurrentChange(val:number) {

         };
        importCases() {
            if (Object.keys(this.treeObj).length === 0) {
                this['$message']({
                    message: '请先选择档案馆！',
                    type: 'warning'
                });
                return ; // 如果为空,返回
            }

            this.$nextTick(() => {
                this.$refs['importCasesDialogRef'].importListAddSetVisible = true;
            });
        }

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

            upLoads(){
                if (Object.keys(this.treeObj).length === 0) {
                    this['$message']({
                        message: '请先选择档案馆！',
                        type: 'warning'
                    });
                    return ; // 如果为空,返回
                }
                let xinXi = '';
                if(this.multipleSelection.length == 0){
                    xinXi = '您是否要导出所选档案馆的全部全宗';
                }else{
                    xinXi = '您是否要导出所选全宗';
                }
                this['$confirm'](xinXi, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let attr = [];
                    for(let i = 0;i < this.multipleSelection.length;i++){
                        attr.push(this.multipleSelection[i].id);
                    };
                    //window.location.href = this.baseUrl1+'archive/exporter/fondExport?idStr='+attr.join(",")+'&fondName='+this.filters.fondName+'&fondCode='+this.filters.fondCode+'&agentCode='+this.filters.archiveAgentCode
                    Service.fondExport({
                        "idStr":attr.join(","),
                        "fondName":this.filters.fondName,
                        "fondCode":this.filters.fondCode,
                        "agentCode":this.filters.archiveAgentCode
                    }).then((res) =>{
                        let csvData = new Blob([res]);
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveBlob(csvData,"全宗管理.xls");
                        }else{
                            let url = window["URL"].createObjectURL(new Blob([csvData]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link["href"] = url;
                            link.setAttribute('download',"全宗管理.xlsx");
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window["URL"].revokeObjectURL(url);
                        }
                    });
                });

            }

             addCases(obj){
                 if (Object.keys(this.treeObj).length === 0) {
                     this['$message']({
                         message: '请先选择档案馆！',
                         type: 'warning'
                     });
                     return ; // 如果为空,返回
                 }
                 this.fileForm1.fondCode='';
                 this.fileForm1.fondName='';
                 this.fileForm1.sortSeq=0;
                 this.fileForm1.fondNameOld='';
                 this.fileForm1.archivesAgentCode='';
                 this.fileForm1.fondPeriod='';
                 this.fileForm1.rank='';
                 this.fileForm1.formedName='';
                 this.fileForm1.organizationEvolution='';
                 this.fileForm1.archiveHistoryEvolution='';
                 this.fileForm1.arrangeMethod='';
                 this.fileForm1.content='';
                 this.fileForm1.searchTool='';
                 this.fileForm1.fondCodeOld='';
                 this.fileForm1.catalogDataSituation='';
                 this.fileForm1.fullTextDataSituation='';
                 this.fileForm1.receiverExpected='';
                 this.fileForm1.identificationInformation='';
                 this.fileForm1.inputSituation='';
                 this.fileForm1.fondFormat='';
                 this.fileForm1.outputSituation='';
                 this.fileForm1.recordInformation='';
                 this.fileForm1.comments='';
                 this.fileForm1.organizationCode='';
                this.fileVisible = true;
                this.dialogTitle = '新增全宗'
                //this.$refs.fileForm1.resetFields();
                 console.log(this.fileForm1);
             };
             editCases(obj){
                this.fondObj = obj;
                this.fileVisible = true;
                this.dialogTitle = '编辑全宗'
                //this.$refs.fileForm1.resetFields();
                //编辑回显
                 for(let item in obj) {
                     for(let item2 in this.fileForm1) {
                         if(item === item2) {
                             this.fileForm1[item2] = obj[item];
                         }
                     }
                 }
                 /*Service.findFondsByName({fondName:obj.fondName,fondCode:obj.fondCode,archiveAgentCode:this.archiveAgentCode}).then((res) =>{
                     if(res.data.succeeded){
                         //this.fileForm1.id = res.data.data[0].id;
                         for(let item in res.data.data[0]) {
                             for(let item2 in this.fileForm1) {
                                 if(item === item2) {
                                     this.fileForm1[item2] = res.data.data[0][item];
                                 }
                             }
                         }
                     }else{
                         this['$message']({
                             message: res.data.errorMessage,
                             type: 'error'
                         });
                     }
                 });*/
             };
            delCases(row) {
                this['$confirm']('您是否要删除所选全宗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Service.deleteFond({"fondId":row.id}).then((res) =>{
                        if(res.data.succeeded){
                            this['$message']({
                                message: "删除成功",
                                type: 'success'
                            });
                            this.searchFond();
                        }else{
                            this['$message']({
                                message: res.data.errorMessage,
                                type: 'error'
                            });
                        }
                    });
                });
            }
            // 新增全宗
            addSaveFond() {
                this['$refs'][form]['validate']((valid)=>{
                    if (valid) {
                        Service.addSaveFond(params).then((res) =>{
                            if(res.data.succeeded){
                               
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
            searchFond() {
                let self = this;
                /*let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在获取数据，请稍等',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );*/
                this.tableLoading = true;
                Service.findFondsByName(self.filters).then((res) =>{
                    if(res.data.succeeded){
                        self.fondSearchData = res.data.data;
                    }else{
                        self['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                    this.tableLoading = false;
                    /*self.$nextTick(() => { loadingInstance.close();});*/
                });
            }

            sureUpdateFondsAndUser(form){
                let self = this;
                this['$refs'][form]['validate']((valid)=>{
                    if (valid) {
                        let loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在保存数据，请稍等',
                                // spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        let obj = {"id":this.fondObj.id};
                        Object.assign(obj, this.fileForm1);
                        Service.saveFond(obj).then((res) =>{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '编辑成功！',
                                    type: 'success'
                                });
                                this.fileVisible = false;
                                self.searchFond();
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                            self.$nextTick(() => { loadingInstance.close();});
                        });
                    }
                });
            }

             //新增保存全宗
            sureAddFondsAndUser(form){
                this.fileForm1.archivesAgentCode = this.treeObj.archiveAgentCode;
                 let self = this;
                this['$refs'][form]['validate']((valid)=>{
                    if (valid) {
                        let loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在保存数据，请稍等',
                                // spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        Service.saveFond(this.fileForm1).then((res) =>{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '保存成功！',
                                    type: 'success'
                                });
                                this.fileVisible = false;
                                self.searchFond();
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                            self.$nextTick(() => { loadingInstance.close();});
                        });
                    }
                });
             }

            //删除全宗
            deleteFonds(obj){
                this['$confirm']('确认删除吗？', {
                    type: 'warning'
                }).then(() => {
                    Service.deleteFonds(obj.fondId).then((res) =>{
                       if(res.data.succeeded){
                           this['$message']({
                               message: '成功！',
                               type: 'success'
                           });
                           this.expands = [];
                           //this.getFiles();
                       }else{
                            this['$message']({
                               message: res.data.errorMessage,
                               type: 'error'
                           });
                       }
                   });
                });
            }

            getArchiveAgenterTree(){
                this.treeLoading = true;
                Service.archiveAgenterTree({"scope":"4"}).then((res) =>{
                    if(res.data.succeeded){
                        this.treedata001 = res.data.data;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                    this.treeLoading = false;
                });
            }

            handleNodeClick1(data){
                this.archiveAgentCode = data.archiveAgentCode;
                this.archiveAgentName = data.archiveAgentName;
                this.fileForm1.archivesAgentCode = data.archiveAgentCode;
            }

            handleNodeClick(data){
                this.emptyText = '暂无数据';
                this.treeObj = data;
                this.filters.archiveAgentCode = this.treeObj.archiveAgentCode;
                this.searchFond();
            }

            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            }

            filterNode(value, data) {
                if (!value) return true;
                return data.archiveAgentName.indexOf(value) !== -1;
            }

            @Watch('filterText')
            showDialog () {
                this.$refs.tree1.filter(this.filterText);
            }



            created(){
                this.getArchiveAgenterTree();
            }

            mounted(){
                this.bodyHeight = document.documentElement.clientHeight-323;
                // this.getFiles();
            };
        };


</script>

<style lang="scss" scoped>
@import '../../../styles/innerPublic.scss';
@import '../../../styles/system/casesManagement/casesManagement.scss';
    .wrapprSection {
        .casesManagementView{
            >>>.tree, >>>.contentbox{ 
            top:50px;
            }
            >>>.tree .treeCon{
                top:60px;
            }
            >>>.contentbox.contentbox-full{ 
                left: 10px;
                overflow-y: auto;
            }
        }
    } 
.TabRBtn i{
  color: #78c500;
  margin-right: 5px;
}
body >>>.searchKey{
  margin-bottom:10px; 
}
    .cloudListView {
        .fontClass{
            i{
                font-size: 25px;
                color: #2b87c6;
                vertical-align: middle;
                cursor: pointer;
            }
        }
        .tableTitle {
            padding-top: 10px;
            float: left;
        }
    }
    body {
       .uploader-list{
            margin: 10px 0;
            padding: 0 10px;
            min-height: 100px;
            max-height: 200px;
            overflow-y: auto;
            border: 1px solid #ccc;
        }
  } 
  .casesManagementView .treeCon .treeTitle {
      height: 30px;
      line-height: 30px;
      background: rgba(86, 151, 227, 0.29)
  }
  .addCasesDialog{
        max-height: 600px;
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