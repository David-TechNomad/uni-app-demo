<template>
    <section style="padding:0 10px;height:100%;overflow-y:hidden;height:100%;">
    <div class="main">
        <div class="left">
            <div class="left top">
                <span>选择全宗</span>
            </div>
            <div class="treeTitle" style="margin-top:40px;">
                <el-form :inline="true" :model="treeFilters" class="topParamsForm superLeftForm">
                    <el-form-item v-for="" class="title" label="" ref="title">
                        <el-select class="checkName" v-model="treeFilters.title" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethodfond" :loading="searchLoading">
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
            <div class="left bottom">
                <span class="bottomLittleTop">档案库全宗</span>
                <div class="myTree CMMTree" style="bottom:0;overflow-y: auto"><!--topCheckTree oaTree-->
                    <el-tree
                             :data="fonddata"
                             node-key="id"
                             ref="tree"
                             :default-expanded-keys="defaultexpandedkeys"
                             :props="defaultTrees"
                             @node-click="handleNodeClick"
                             accordion
                             >
                    </el-tree>
                </div>
            </div>
        </div>
        <div class="right" v-show="MainShow">
            <div class="right top">
                <span>分组及案卷库列表</span>
                <div class="nthDivthree">
                    <el-button type="primary" class="el-button checkWay" @click="fondTransfer">案卷库迁移</el-button>
                    <el-button type="primary" class="el-button checkWay" @click="addFenZu">增加分组</el-button>
                </div>
            </div>
            <div class="right bottom">
                <div class="borderTable">
                   <el-table
                           tooltip-effect="dark"
                           :height="bodyHeight"
                           :data="tableData"
                           highlight-current-row
                           class="indexTable containTable myIndextable expandTable"
                           :header-cell-class-name="headercellclassname"
                           :row-class-name="tableRowClassName"
                           row-key="id"
                           @select="selectionchange"
                           ref="kutable"
                   >
                       <el-table-column type="selection" :width="SLW"></el-table-column>
                       <el-table-column type="expand" width="100%">
                           <template slot-scope="scope">
                               <div v-if="scope.row.children!= null?true:false" class="expand_div" style="width: 101%">
                                   <fileSon ref="MySonApp" @EditStore="EditStore" @deleteStore="deleteStore" @addArchivesStore="addArchivesStore" :childrenData ="scope.row.children" :SLW="SLW" :width1="width1" :width2="width2"  @Sonselection="Sonselection" ></fileSon>
                               </div>
                           </template>
                       </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="nodeName" label="档案库名称" :width="width1">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" label="档案分类" prop="kindText" :width="width1">
                        </el-table-column>
                       <el-table-column prop="categoryNumber" label="分类号" :width="width1" column-key="id">
                       </el-table-column>
                        <el-table-column label="操作" :width="width2">
                            <template slot-scope="scope">
                                <span class="addBtn" v-if="scope.row.nodeType==1" @click="addArchivesStore(scope.row)">增加案卷库</span>
                                <span class="addBtn" @click="EditStore(scope.row)">编辑</span>
                                <span class="addBtn" @click="deleteStore(scope.row)">删除</span>
                            </template>
                        </el-table-column>
                   </el-table>
                </div>
            </div>
        </div>
    </div>
    <el-dialog class="fixModal" :title="EditGroup?'新增分组':'编辑分组'" :visible.sync="fileVisible" :close-on-click-modal="false" :modal="false" :lock-scroll="false" :modal-append-to-body="false">
            <div class="scrollCon formDiv">
                <div class="tableCon">
                    <el-form :model="addgroup" label-width="100px"  ref="addgroup">
                        <el-form-item label="分组名称：" class="basicItem verifyInput" ref="name" prop="name" :rules="[{required:true,message:'请填写分组名称',trigger:'blur'}]">
                            <el-input class="checkName percentName" v-model.trim="addgroup.name"></el-input>
                        </el-form-item>
                        <el-form-item label="分类号：" class="basicItem verifyInput">
                            <el-input class="checkName percentName" v-model.trim="addgroup.flh" placeholder="请填写"></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" class="basicItem">
                            <el-input type="textarea" class="checkName percentName" v-model.trim="addgroup.log"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="checkWay" @click="addgroupTrue('addgroup')">确定</el-button>
            </div>
        </el-dialog>
    <el-dialog class="fixModal" :title="EditStores?'新增案卷库':'编辑案卷库'" :visible.sync="archivesVisible" :close-on-click-modal="false" :modal="false" :modal-append-to-body="false">
            <div class="scrollCon formDiv">
                <div class="tableCon">
                    <el-form :model="fileForm" label-width="100px" ref="fileForm">
                        <el-form-item label="档案库名称：" class="basicItem verifyInput" prop="name" :rules="[{required:true,message:'请填写案卷库名称',trigger:'blur'}]">
                            <el-input class="checkName percentName" v-model="fileForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="档案分类：" class="basicItem verifyInput"  prop="type" :rules="[{required:true,message:'请选择档案分类',trigger:['blur','change']}]">
                            <el-input class="checkName percentName" v-model="fileForm.type" @focus="getDAF(EditStores)" ></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="oneDiv">
                        <p class="oneP">档案分类选择说明：</p>
                        <p class="twoP">工程类案卷库请选择工程档案</p>
                        <p class="twoP">合同类案卷库请选择合同档案</p>
                        <p class="twoP">-------</p>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="checkWay" @click="addStoreTrue('fileForm')">确定</el-button>
            </div>
        </el-dialog>
    <el-dialog class="companyManagedialog" title="案卷库迁移" :visible.sync="transferVisible" :close-on-click-modal="false" :modal="false" :lock-scroll="false" :modal-append-to-body="false">
            <div class="scrollCon formDiv">
               <div class="presentStore lt">
                   <p>需要迁移的案卷库</p>
                   <div class="presentTree zebraTree">
                       <el-tree
                               :data="presentTreeData"
                               node-key="id"
                               :props="fieldType"
                               accordion
                               show-checkbox
                               checkStrictly
                               ref="presentTree"
                               :renderContent = "renderContent"
                               @check-change="presentCheck"
                       >
                       </el-tree>
                   </div>
               </div>
                <div class="targetDiv rt">
                    <p>选择目标分组</p>
                    <div class="targetCompany">
                        <el-tree
                                 node-key="id"
                                 v-loading="treeLoading"
                                 ref="companytree"
                                 :load="treeLoad"
                                 :props="defaultTrees"
                                 lazy
                                 @node-click="targetCompanyClick"
                                 accordion
                        >
                        </el-tree>
                    </div>
                    <div class="targetStore zebraTree cycleTree">
                        <el-tree
                                :data="targetStoreData"
                                node-key="id"
                                :props="targetfieldType"
                                accordion
                                show-checkbox
                                ref="targetTree"
                                checkStrictly
                                :renderContent = "renderContent"
                                @check="targetCheck"
                        >
                        </el-tree>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="checkWay" @click="migrant">确定迁移</el-button>
            </div>
        </el-dialog>
    <el-dialog class="fixModal" title="案卷库重命名" :visible.sync="resetnametrue" :close-on-click-modal="false" :modal="false" :lock-scroll="false" :modal-append-to-body="false">
            <div class="scrollCon formDiv myformDiv">
                <p class="resetnamePone">已成功迁移{{resetNum}}案卷库!!</p>
                <p class="resetnamePtwo"><span>!</span>下列案卷库与目标分组里的案卷库重名,请先重命名再迁移!</p>
                <div class="resetnamediv">
                <div class="resettitle">
                    <p class="resettitlepOne">原案卷库名称</p>
                    <p class="resettitlepTwo">重命名案卷库名称</p>
                </div>
                    <div class="resetdiv">
                      <p v-for="item in NameArr">
                          <span>{{item.nodeName}}</span><el-input v-model="resetObj['value'+item.id]"></el-input>
                      </p>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="checkWay" @click="resetNameOk">确定</el-button>
            </div>
            <!--<div class="treeDiv">-->
            <!--<div class="spanDiv">-->
            <!--<span class="mySpan">匹配部门</span>-->
            <!--</div>-->
            <!--<div class="innerTreeDiv">-->
            <!--<span class="mysSpan">ehr组织架构</span>-->
            <!--<div class="topCheckTree oaTree myTree">-->
            <!--<el-tree node-key="orgID"-->
            <!--v-loading="treeLoading"-->
            <!--ref="Ehrshu"-->
            <!--:load="treeLoad1"-->
            <!--:props="ehrdefaultTrees"-->
            <!--lazy-->
            <!--@check="handleNodeClick1"-->
            <!--show-checkbox="true"-->
            <!--check-strictly="true"-->
            <!--&gt;-->
            <!--</el-tree>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
        </el-dialog>
    <el-dialog class="fileModal flhdialog" :visible.sync="FlhTrue" title="档案分类" :modal-append-to-body="false">
            <el-tree
                    :data="FLhArr"
                    node-key="categoryNumber"
                    :default-expand-all="false"
                    :props="flhType"
                    @node-click="flhclick"
                    ref="treeku"
                    accordion
            >
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="FlhTrue=false">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './companyManagement.service'
    import fileSon from "./fileson";
@Component({
    components: {fileSon}
})
export default class appcompanyManagement extends Vue{
            defaultTrees:any={};
            treeLoading:boolean;
            tableData: any=[];
            fileVisible:boolean;
            archivesVisible:boolean;
            transferVisible:boolean;
            roleSelect:any=[];
            kuandu:number;
            exWidth:number;
            bodyHeight:number;
            fileForm:any={};
            TypeArr :any=[];
            ehrdefaultTrees:any={};
            addgroup:any={};//新增分组
            SLW:number;//复选框的宽度
            width1:number;
            width2:number;
            selection:any=[];
            fondId:number;
            $refs: { clearSelections: HTMLFormElement};
            EditGroup:boolean;//编辑分组
            SrcObj:any={};//新增案卷时的父
            EditStores:boolean;//编辑案卷库
            EditoldSrc:any={};
            presentTreeData:any=[];
            fieldType:any={};
            presentTreeobj:any=[];//需要移交的被选中的库
            targetcompanyobj:any={};//目标公司
            targetStoreData:any=[];//目标公司下的库
            targetfieldType:any={};
            targetStoreObj:any={};//目标库
            targetfondId:number;//目标公司的id
            targetparentId:number;//目标组的id
            NameArr:any=[];//需要重名名的在案卷库
            resetnametrue:boolean;
            resetNum:number;
            resetObj:any={};
            MainShow:boolean;
            FlhTrue:boolean;
            flhType:any = {};
            FLhArr:any=[];
            ZUFlhTrue:boolean;
            ZUFLhArr:any=[];
            ZUflhType:any={};
            hasCheck:any=[];
            treeFilters:any={};
            searchOptions:any=[];
            searchLoading:boolean;
            fonddata:any=[];
            defaultexpandedkeys:any=[];
            constructor(){
                super();
                this.defaultTrees = {
                    label: 'fondName',
                    children: 'children'
                };
                this.ehrdefaultTrees={
                    label: 'shortName',
                    id:'orgID',
                    isLeaf: 'hasChildren'
                };
                this.treeLoading = false;
                this.tableData = [];
                this.fileVisible = false;
                this.archivesVisible = false;
                this.transferVisible = false;
                this.roleSelect = [];
                this.kuandu = 200;
                this.exWidth = 100;
                this.bodyHeight = document.documentElement.clientHeight - 153;
                this.fileForm = {
                    name:null,
                    type:null,
                    type1:null
                };
                this.TypeArr = [];
                this.addgroup={
                    name:null,
                    log:null,
                    flh:null,
                };
                this.SLW = 55;
                this.width1 = 213;
                this.width2 = 250;
                this.selection=[];
                this.EditGroup = true;
                this.SrcObj = {};
                this.EditStores = true;
                this.EditoldSrc = {};
                this.presentTreeData = [];
                this.fieldType={
                    children:"children",
                    label:'nodeName'
                };
                this.presentTreeobj = null;
                this.targetcompanyobj = null;
                this.targetStoreData = [];
                this.targetfieldType={
                    children:"children",
                    label:'nodeName',
                    disabled:'disabledTrue'
                };
                this.targetStoreObj = null;
                this.NameArr = [{
                    nodeName:'hello'
                }];
                this.resetnametrue = false;
                this.resetObj = {};
                this.MainShow = false;
                this.FlhTrue = false;
                this.flhType = {
                    children: "children",
                    label: "name"
                };
                this.FLhArr=[];
                this.resetNum = null;
                this.ZUFlhTrue=false;
                this.ZUFLhArr = [];
                this.ZUflhType={
                    children: "children",
                    label: "categoryNumberText"
                };
                this.hasCheck = [];
                this.treeFilters = {
                    title:''
                };
                this.searchOptions = [];
                this.searchLoading = false;
                this.fonddata = [];
                this.defaultexpandedkeys = [];
            }
            //懒加载树
            treeLoad(node,resolve){
                if(node.level===0){
                    this.treeLoading;
                    Service.getSonUrl({}).then(res=>{
                        if(res.data.succeeded){
                            let treeData = [];
                            let data = res.data.data;
                            for (var item of data){
                                let leaf = item.hasChildren;
                                item.hasChildren = !leaf;
                            };
                            data.forEach(item => {
                                item.fondName = '[ '+item.fondCode+' ]'+item.fondName;
                                treeData.push(item)
                            });
                            resolve(treeData);
                        }else{
                            this.getError(res.data.errorMessage);
                        };
                    });
                }else{
                    var id = node.data.id;
                    Service.getFondChild(id).then(res=>{
                        if(res.data.succeeded){
                            let treeData = [];
                            let data=res.data.data;
                            for(var item of data){
                                let leaf = item.hasChildren;
                                item.hasChildren = !leaf;
                            };
                            data.forEach(item => {
                                item.fondName = '[ '+item.fondCode+' ]'+item.fondName;
                                treeData.push(item)
                            });
                            resolve(treeData);
                        }else{
                            this.getError(res.data.errorMessage)
                        }
                    })
                }
            };
    // 远程搜索全宗
    remoteMethodfond(query) {
        if (query !== '') {
            this.searchLoading = true;
            Service.getKeyName(query).then((res) =>{
                if(res.data.succeeded){
                    let data = res.data.data;
                    this.searchOptions = data.map(item => {
                        return { value: item.id, label: '['+item.fondCode+']'+item.fondName,fondCode:item.fondCode,isProjectCompany:item.isProjectCompany};
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
                        message: '查询全宗联想错误！',
                        type: 'error'
                    });
                }
            });

        } else {
            this.searchOptions = [];
        }
    }
    // 定位全宗
    enterSearch(){
        for(var son of this.searchOptions){
            if(this.treeFilters.title==son.value){
                var data = son;
            }
        };
        this.$refs['tree'].setCurrentKey(data.value);
        this.defaultexpandedkeys = [data.value];
        this.selection=[];
        this.fondId = data.value;
        if(!this.MainShow){
            this.MainShow = true;
        }
        Service.archiveNowFile(data.value).then(res=>{
            if(res.data.succeeded){
                this.tableData = res.data.data;
            }else{
                this.getError(res.data.errorMessage)
            }
        })
    };

    //树节点的点击
            handleNodeClick(data: any, node: any, tree: any){
                this.selection=[];
                this.fondId = data.id;
                if(!this.MainShow){
                    this.MainShow = true;
                }
                Service.archiveNowFile(data.id).then(res=>{
                    if(res.data.succeeded){
                        this.tableData = res.data.data;
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            };

            //增加分组
            addFenZu(){
                this.addgroup = {
                    name:null,
                    log:null,
                    flh:null,
                };
                if(this.selection.length==1){
                    if(this.selection[0].nodeType==1){
                        this.EditGroup = true;
                        this.fileVisible = true;
                        this.$nextTick(()=>{
                            this['$refs']['addgroup']['resetFields']();
                        });
                    }else{
                        this.Warn('该节点下不能增加分组。')
                    }
                }else if(this.selection.length==0){
                    this.EditGroup = true;
                    this.fileVisible = true;
                    this.$nextTick(()=>{
                        this['$refs']['addgroup']['resetFields']();
                    });
                }
            };
            //新增分组
            addgroupTrue(form){
                this.$refs[form]['validate']((valid)=>{
                    if(valid){
                        if(this.EditGroup){
                            this['$confirm']('是否保存新的分组', '提示', {
                                confirmButtonText: '保存',
                                cancelButtonText: '不保存',
                                type: 'warning'
                            }).then(() => {
                                this.KeepGroup();
                            }).catch(() => {
                                this.Warn('已取消。')
                            });
                        }else{
                            this['$confirm']('是否修改分组', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                Service.modifyFolderNode({id:this.EditoldSrc.id,name:this.addgroup.name,comment: this.addgroup.log,categoryNumber:this.addgroup.flh}).then(res=>{
                                    if(res.data.succeeded){
                                        this.Suces('编辑成功');
                                        this.ReturnEdit(this.tableData,this.EditoldSrc,res.data.data);
                                        this.EditoldSrc = null;
                                        this.fileVisible = false;
                                    }else{
                                        this.getError(res.data.errorMessage)
                                    }
                                })
                            }).catch(() => {
                                this.Warn('已取消。')
                            });
                        };
                    }else{
                        this.Warn('请填写分组名称。')
                    }
                })
            };

            //保存分组
            KeepGroup(){
                if(this.selection.length==1){
                    var obj = {
                        fondId:this.fondId,
                        parentId:this.selection[0].id,
                        name:this.addgroup.name,
                        comment:this.addgroup.log,
                        categoryNumber:this.addgroup.flh
                    }
                }else if(this.selection.length==0){
                    var obj = {
                        fondId:this.fondId,
                        parentId:0,
                        name:this.addgroup.name,
                        comment:this.addgroup.log,
                        categoryNumber:this.addgroup.flh
                    }
                }
                Service.createFolderNode(obj).then(res=>{
                    if(res.data.succeeded){
                        this.Suces('新增分组成功');
                        this.fileVisible = false;
                        Service.archiveNowFile(this.fondId).then(res=>{
                            if(res.data.succeeded){
                                this.selection = [];
                                this.tableData = res.data.data;
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                        // if(this.selection.length==1){
                        //     if(this.selection[0].children==null){
                        //         this.selection[0].children = [res.data.data];
                        //     }else{
                        //         this.selection[0].children.push(res.data.data);
                        //     }
                        // }else if(this.selection.length==0){
                        //     this.tableData.push(res.data.data);
                        // }
                             
                    }else{
                        this.getError(res.data.errorMessage);
                    }
                })
            }

            //编辑分组
        EditStore(obj){
        this.EditoldSrc = obj;
        if(obj.nodeType==1){
            this.$nextTick(()=>{
                this['$refs']['addgroup']['resetFields']();
            });
            this.addgroup = {
                name:null,
                log:null,
                flh:null,
            };
            this.EditGroup = false;
            this.fileVisible = true;
            this.addgroup.name=obj.nodeName;
            this.addgroup.log=obj.comments;
            this.addgroup.flh = obj.categoryNumber;
        }else{
            this.$nextTick(()=>{
                this['$refs']['fileForm']['resetFields']();
            });
            this.archivesVisible = true;
            this.EditStores=false;
            this.fileForm.name = null;
            this.fileForm.type = null;
            Service.listWithoutLib(this.fondId).then(res=>{
                if(res.data.succeeded){
                    this.fileForm.name = obj.nodeName;
                    this.fileForm.type1 = obj.kindId;
                    this.getFIleType(res.data.data,obj.kindId,this.fileForm.type);
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        }
    };
            //分类号递归
             returnFLH(data,id){
                 for(var son of data){
                     if(son.categoryNumber===id){
                         this.addgroup.flh = son.categoryNumberText
                     }else if(son.children!==null){
                         this.returnFLH(son.children,id)
                     }
                 }
             }
            //档案分类递归
     getFIleType(obj,ID,name){
         for(var son of obj){
             if(son.id ===ID){
                 this.fileForm.type = son.name;
             }else if(son.children!==null){
                 this.getFIleType(son.children,ID,name)
             }
         }
     }
       //编辑后的递归
        ReturnEdit(data,obj,result){
        for(var son of data){
            if(son.id===obj.id){
                for(var key in obj){
                    if(key in result){
                        obj[key] = result[key];
                    }
                }
            }else if(son.children!=null){
                this.ReturnEdit(son.children,obj,result)
            }
        }
    }
            //增加案卷库
            addArchivesStore(obj){
                this.archivesVisible = true;
                this.EditStores = true;
                this.SrcObj = obj;
                this.fileForm = {
                    name:null,
                    type:null,
                    type1:null
                };
                Service.listWithoutLib(this.fondId).then(res=>{
                    if(res.data.succeeded){
                        this.FLhArr = res.data.data;
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
                this.$nextTick(()=>{
                    this['$refs']['fileForm']['resetFields']();

                });
            };
             getDAF(value){
                 if(value){
                     this.$nextTick(()=>{
                         this.FlhTrue = true;
                     });
                 }
             };
            flhclick(data){
                 if(data.type!='folder'){
                     this.fileForm.type = data.name;
                     this.fileForm.type1 = data.id;
                 }
            }
            //新增案卷库
            addStoreTrue(form){
                 this.$refs[form]['validate'](valid=>{
                     if(valid){
                         if(this.EditStores){
                             this['$confirm']('是否保存新的案卷库', '提示', {
                                 confirmButtonText: '确定',
                                 cancelButtonText: '取消',
                                 type: 'warning'
                             }).then(() => {
                                var obj = {
                                    fondId:this.fondId,
                                    parentId:this.SrcObj.id,
                                    name:this.fileForm.name,
                                    kindId:this.fileForm.type1,
                                    comment:''
                                };
                                 this.addStore(obj);
                             }).catch(() => {
                                 this.Warn('已取消。')
                             });
                         }else{
                             this['$confirm']('是否更改案卷库', '提示', {
                                 confirmButtonText: '确定',
                                 cancelButtonText: '取消',
                                 type: 'warning'
                             }).then(() => {
                                 this.EditStoreKep();
                             }).catch(() => {
                                 this.Warn('已取消。')
                             });
                         }
                     }
                 })

            };

            //新增案卷库
            addStore(obj){
                Service.createKindNode(obj).then(res=>{
                    if(res.data.succeeded){
                      this.Suces('新增案卷库成功');
                       this.archivesVisible = false;
                      if(this.SrcObj.children!=null){
                          this.SrcObj.children.push(res.data.data);
                      }else{
                          this.SrcObj.children=[res.data.data];
                      }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            };

            //编辑案卷库之后的保存
            EditStoreKep(){
                Service.modifyKindNode({id:this.EditoldSrc.id,kindId:this.EditoldSrc.kindId,name:this.fileForm.name}).then(res=>{
                    if(res.data.succeeded){
                        this.Suces('案卷库修改成功');
                        this.archivesVisible = false;
                        this.EditStores = false;
                        this.ReturnEdit(this.tableData,this.EditoldSrc,res.data.data);
                        this.EditoldSrc = null;
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            };

            //删除分组或库
            deleteStore(obj){
                     if(obj.nodeType==1){
                         var str = '你是否要删除分类组'
                     }else{
                         var str = '你是否要删除案卷库'
                     };
                     this['$confirm'](str, '提示', {
                         confirmButtonText: '确定',
                         cancelButtonText: '取消',
                         type: 'warning'
                     }).then(() => {
                         Service.removeNode({id:obj.id}).then(res=>{
                             if(res.data.succeeded){
                                 this.Suces('删除成功');
                                 if(this.selection[0].id===obj.id){
                                     this.selection = [];
                                 }
                                 this.ReturnSon(this.tableData,obj);
                             }else{
                                 this.getError(res.data.errorMessage)
                             }
                         })
                     }).catch(() => {
                         this.Warn('已取消。')
                     });
                 };

            //删除后递归节点
            ReturnSon(data,obj){
                for(var key in data){
                    if(data[key].id===obj.id){
                        data.splice(key,1);
                    }else if(data[key].children!=null){
                        this.ReturnSon(data[key].children,obj)
                    }
                }
            };

            //案卷库迁移
            fondTransfer(){
                this.targetfondId = null;
                this.targetparentId = null;
                this.presentTreeobj = [];
                this.targetStoreData = [];
                this.resetObj = {};
                Service.archiveNowFile(this.fondId).then(res=>{
                    if(res.data.succeeded){
                        this.presentTreeData = res.data.data;
                        this.getTreeName(this.presentTreeData)
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                });
                this.transferVisible = true;
            };
             //当前被选中的库
             presentCheck(data,checkTrue){
                 if(checkTrue){
                     this.hasCheck = [];
                     var str = this.$refs['presentTree'].getCheckedNodes();
                     if(data.children!=null){
                         this.chenckChild(data.children)
                     };
                     var checkeedarr = [];
                     for(var son of str){
                         checkeedarr.push(son.id);
                     };
                     var arr = checkeedarr.concat(this.hasCheck);
                     this.$refs['presentTree']['setCheckedKeys'](arr);
                 }
                 var strSS = this.$refs['presentTree'].getCheckedNodes();
                 this.presentTreeobj = strSS;
             };
             //选中之后递归子节点使其被选中
             chenckChild(data){
                 for(var son of data){
                   this.hasCheck.push(son.id);
                     if(son.children!==null){
                          this.chenckChild(son.children)
                     }
                 }
             }
             //目标公司
             targetCompanyClick(data,node){
                 // this.targetcompanyobj = data;
                 this.targetfondId = data.id;
                 Service.archiveNowFile(data.id).then(res=>{
                     if(res.data.succeeded){
                         this.targetStoreData = res.data.data;
                         this.$refs['targetTree'].setCheckedKeys([]);
                         this.getTreeName(this.targetStoreData);
                     }else{
                         this.getError(res.data.errorMessage)
                     }
                 })
             };

             //目标库的选中
             targetCheck(data,obj){
                 if(this.targetStoreObj===null){
                     this.targetStoreObj = data;
                     this.targetparentId = data.id;
                     this.$refs['targetTree'].setCheckedKeys([data.id]);
                 }else{
                     if(this.targetStoreObj.id===data.id){
                         this.$refs['targetTree'].setCheckedKeys([]);
                         this.targetparentId = null;
                         this.targetStoreObj = null;
                     }else{
                         this.$refs['targetTree'].setCheckedKeys([]);
                         this.$refs['targetTree'].setCheckedKeys([data.id]);
                         this.targetparentId = data.id;
                         this.targetStoreObj = data;
                     }
                 }
             };

             //确定迁移
             migrant(){
                 if(this.presentTreeobj.length>0){
                     if(this.targetparentId==null){
                         this.Warn('请选择要迁往的案卷库')
                     }else{
                         this['$confirm']('是否要进行案卷库的迁移', '提示', {
                             confirmButtonText: '确定',
                             cancelButtonText: '取消',
                             type: 'warning'
                         }).then(() => {
                            var arr = [];
                            for(var son of this.presentTreeobj){
                                arr.push(son.id);
                            };
                            Service.checkBeforeMigrateKindNode({sourceIds:arr,targetFondId:this.targetfondId,targetParentId:this.targetparentId}).then(res=>{
                                if(res.data.succeeded){
                                   let data = res.data.data;
                                   if(data.pass){
                                       this.beginmigrant();
                                   }else{
                                       this.NameArr = data.result;
                                       for(var son of data.result){
                                           this['$set'](this.resetObj,'value'+son.id,null)
                                       }
                                       this.resetNum = arr.length - data.result.length;
                                       this.transferVisible = false;
                                       this.resetnametrue = true;
                                   }
                                }else{
                                    this.getError(res.data.errorMessage)
                                }
                            })
                         }).catch(() => {
                             this.Warn('已取消。')
                         })
                     }
                 }else{
                     this.Warn('请选择要迁移的案卷库');
                 }
             };
             //进行迁移
             beginmigrant(){
                 var arr = [];
                 for(var son of this.presentTreeobj){
                     arr.push(son.id);
                 };
                 Service.migrateKindNode({sourceIds:arr,targetFondId:this.targetfondId,targetParentId:this.targetparentId}).then(res=>{
                     if(res.data.succeede){
                         this.Suces('迁移成功');
                         this.transferVisible = false;
                     }else{
                         this.getError(res.data.errorMessage)
                     }
                 })
             };

             //重命名
             resetNameOk(){
                 var arr=[];
                 for(var key in this.resetObj){
                     if(this.resetObj!=null){
                         var id = key.slice(5)/1;
                         var str = this.resetObj[key];
                         var obj ={
                             value1:id,
                             value2:str
                         };
                         arr.push(obj)
                     }
                 };
                 if(arr.length>0){
                     Service.rename(arr).then(res=>{
                         if(res.data.succeeded){
                             this.resetnametrue = false;
                             for(var son of this.presentTreeobj){
                                 arr.push(son.id);
                             };
                             Service.checkBeforeMigrateKindNode({sourceIds:arr,targetFondId:this.targetfondId,targetParentId:this.targetparentId}).then(res=>{
                                 if(res.data.succeeded){
                                     let data = res.data.data;
                                     if(data.pass){
                                         this.beginmigrant();
                                     }else{
                                         this.NameArr = data.result;
                                         for(var son of data.result){
                                             this['$set'](this.resetObj,'value'+son.id,null)
                                         }
                                         this.resetNum = arr.length - data.result.length;
                                         this.transferVisible = false;
                                         this.resetnametrue = true;
                                     }
                                 }else{
                                     this.getError(res.data.errorMessage)
                                 }
                             })
                         }else{
                             this.getError(res.data.errorMessage)
                         }
                     })
                 }
             }
            //表格的点击
            cellClick(row, column, cell, event){
                console.log(row, column, cell, event)
            }
            //表格的选中
            selectionchange(obj,row){
                 console.log(this.selection)
                 if(this.selection.length>0){
                     if(this.selection[0].id===row.id){
                         this.selection = [];
                     }else{
                         var childS = true;
                         for(var son of this.tableData){
                             if(son.id===this.selection[0].id){
                                 childS = false;
                             };
                         };
                         if(!childS){
                             this['$refs']['kutable']['clearSelection']();
                             this['$refs']['kutable']['toggleRowSelection'](row);
                         }else{
                             if(this['$refs']['MySonApp']){
                                 this['$refs']['MySonApp'].clearSelections()
                             }
                         }
                         this.selection = [row];
                     };
                 }else{
                     this.selection = [row];
                 }
            };

            //子表格的选中
           Sonselection(obj){
             if(this.selection.length>0) {
                 this['$refs']['kutable']['clearSelection']();
             }
             this.selection = [obj]

           };
            //递归公司
            returnCompany(data){
                for(var item of data){
                    item.fondName = '[ ' + item.fondCode + ' ]' + item.fondName;
                    if(item.children!=null){
                        this.returnCompany(item.children)
                    }
                }
            }
            mounted(){
                Service.getLogonUserRelatedFondsTree({}).then(res=>{
                    if(res.data.succeeded){
                        this.fonddata = res.data.data;
                        this.returnCompany(this.fonddata)
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                });
                window.onresize = ()=>{
                    return  this.bodyHeight = document.documentElement.clientHeight - 153;
                };

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
        tableRowClassName(row){
            if(row.row.nodeType==1){
                if(row.row.children==null||row.row.children.length===0){
                    return 'row-expand-null';
                }else{
                    return '';
                }
            }else{
                return 'row-expand-null SelectCell';
            }
        };
        headercellclassname({row, column, rowIndex, columnIndex}){
           return 'SelectCell'
        }

                // 自定义节点图标

            renderContent(createElement, { node, data,store }) {
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
                                'img',
                                {
                                    attrs:{
                                        'src':data.srcName
                                    },
                                    style:{
                                        'margin': '1px 5px 0 2px ',
                                        'float': 'left',
                                        'margin-left':data.marginLeft
                                    }
                                    },
                            ),
                            createElement(
                                'span',
                                {
                                    style:{
                                        'margin-top':'3px',
                                        'display':'block'
                                    }
                                    },
                                [
                                    createElement('span',node.label)
                                ]
                            ),
                        ]
                    )
                };

                // 递归节点 增加className

            getTreeName(tree){
                for(let grass of tree){
                    if(grass.nodeType===1){
                        // grass.className = 'fa fa-plus-square-o';
                        grass.srcName = 'static/imgs/allTree/fileTreeTitle.png';
                        grass.marginLeft = '0';
                        grass.disabledTrue = false;
                        if(grass.children!=null){
                            this.getTreeName(grass.children);
                        }
                    }else if(grass.nodeType===2){
                        grass.disabledTrue = true;
                        grass.srcName = 'static/imgs/allTree/folderFiles.png';
                        grass.marginLeft = '5px';
                    };
                }
            };
        }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/companyManagement/companyManagement.scss';
</style>