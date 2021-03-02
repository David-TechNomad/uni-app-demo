
<template>
    <section class="fileTurnOver">
        <div class="fileTurnOverHeader">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">档案管理</p>

            <span>跨全宗移交</span>
            <el-button class="checkWay" @click="goback">返回</el-button>
        </div>
        <div class="fileTurnOverContain">
            <div class="fileTurnOverL">
                <div class="fileTurnOverLheader">
                    <span>要移动的目录</span>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="删除原目录" ></el-checkbox>
                    </el-checkbox-group>
                    <div class="fileTurnOverLButton">
                        <el-button class="checkWay" @click="addFile">添加档案</el-button>
                        <el-button class="checkWay" @click="removeFile">移出档案</el-button>
                    </div>
                </div>
                <div class="fileTurnOverLTable">
                    <el-table
                            :data="tabledata"
                            style="width: 100%"
                            :stripe="true"
                            :height="filetableHeight"
                            tooltip-effect="dark"
                            class="containTable indexTable"
                            border
                            @selection-change="selectionChange">
                        <el-table-column type="selection" width="55" ></el-table-column>
                        <template v-for="item in tableHeader">
                            <el-table-column v-if="!item.hidden"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>
                        </template>
                        <!--<el-table-column v-for="item in tableHeader" :width="item.width" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :label="item.caption" :show-overflow-tooltip="true"></el-table-column>-->
                    </el-table>
                </div>
            </div>
            <div class="fileTurnOverR">
                <div class="fileTurnOverRT">
                    <span>目标部门</span>
                    <el-button class="checkWay" @click="applyTo">下一步</el-button>
                </div>
                <div class="treeL">
                    <div class="treeOne tree">
                        <div class="treeTitle">
                            <el-form :inline="true" :model="treeFilters" class="topParamsForm superLeftForm">
                                <el-form-item class="title" label="" ref="title">
                                    <el-select class="checkName" v-model="treeFilters.title" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethod" :loading="searchLoading" @change="changeValue">
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
                        <!--show-checkbox-->
                        <div class="treeCon" v-show="lazyTreeShow">
                            <el-tree node-key="id"
                                     ref="tree"
                                     :data="fondTree"
                                     :props="defaultProps"
                                     v-loading="treeloading"
                                     @node-click="handleNodeClick"
                                     :render-content="renderContent">
                            </el-tree>
                        </div>
                        <div class="treeCon searchNameTree" v-show="searchTreeShow">
                            <el-tree node-key="id"
                                     ref="treeBox"
                                     v-loading = "nameLoading"
                                     :data="tree"
                                     :props="defaultProps"
                                     :default-expanded-keys="defaultArr"
                                     @node-click="handleNodeClick"
                                     :render-content="renderContent"
                                     :default-checked-keys="choosedRole"
                                     :check-strictly="true">
                            </el-tree>
                        </div>
                    </div>
                </div>
                <!--档案库树-->
                <div class="treeR zebraTree ">
                    <el-tree
                            :data="kutree"
                            node-key="nodeName"
                            :default-expand-all="true"
                            :props="fieldType"
                            @node-click="pageType"
                            ref="fileKu"
                    >
                    </el-tree>
                </div>
            </div>
        </div>
        <el-dialog class="checkModal fileTransferApplyAdd" title="选择需要移交的档案" :show-close="true" :visible.sync="tableVisible">
            <div class="addTablesearch">
                <div class="addTablesearchForm">
                    <!--<el-form :model="searchForm" class="fileTransferApplyForm LIneFeedForm">-->
                    <!--<template v-for="item in searchConfig">-->
                    <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
                    <!--<el-select v-model="searchForm['value'+item.id]" >-->
                    <!--<el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'">-->
                    <!--<el-input v-model.trim="searchForm['value'+item.id]"></el-input>-->
                    <!--</el-form-item>-->
                    <!--</template>-->
                    <!--<el-form-item class="buttonItem">-->
                    <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="beginSearch">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
                    <!--</el-form-item>-->
                    <!--</el-form>-->
                    <el-form :model="searchkeyOne" class="stagesupersearch">
                        <el-form-item>
                            <el-input v-model="searchkeyOne.key" @keyup.enter.native="searchKey"></el-input>
                            <div class="rt">
                                <el-button class="indexWay" @click="beginSearch" style="margin-left:15px;">检索</el-button>
                                <el-button class="indexWay" @click="clearSearch">清空</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <el-button class="checkWay" @click="confirmAdd">确定添加</el-button>
            </div>
            <di class="tableContainer">
                <el-table border tooltip-effect="dark" stripe :height="YJHeight" :data="searchData" highlight-current-row ref="searchTable" class="indexTable containTable expandTable" @selection-change="selectionNum" :row-class-name="getRowClass">
                    <el-table-column type="selection" width="30" label="#">
                    </el-table-column>
                    <template v-for="item in tableArr">
                        <!--<el-table-column v-if="item.fieldName=='ARCHIVE_STATUS'"  :width="item.width" :label="item.caption">-->
                        <!--<template slot-scope="scope">-->
                        <!--<span v-if="scope.row.ARCHIVE_STATUS===0"></span>-->
                        <!--<span v-if="scope.row.ARCHIVE_STATUS===1"><i class="fa fa-file-archive-o" title="文件移交中"></i></span>-->
                        <!--<span v-if="scope.row.ARCHIVE_STATUS===2"><i class="fa fa-file-pdf-o" title="跨全宗移交中"></i></span>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column v-if="!item.hidden"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>
                    </template>
                    <!--<template v-for="item in tableArr">-->
                    <!--<el-table-column :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :label="item.caption" :width="item.width">-->
                    <!--</el-table-column>-->
                    <!--</template>-->
                </el-table>
            </di>
            <div class="pager">
                <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[500,800,1000]" :page-size="limit" :total="total" pager-count="5" :current-page="page"></el-pagination>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './fileTurnOver.service'
    @Component
    export default class fileTurnOver extends Vue{
        checkList:boolean;
        kindId:number;
        libId:number;
        fondId:number;
        IdArr:any=[];
        tableHeader:any = [];
        tabledata:any=[];
        data:any=[];
        selection:any=[];
        tableVisible:boolean;
        treeFilters:any={};
        lazyTreeShow:boolean;
        searchTreeShow:boolean;
        nameLoading:boolean;
        tree:any = [];
        defaultArr:any =[];
        treeParamsId: number;
        defaultProps:any={};
        searchOptions:any=[];
        searchLoading:boolean;
        start:number;
        total:number;
        page:number;
        limit:number;
        searchConfig:any=[];
        tableArr:any=[];
        searchData:any=[];
        searchForm:any={};
        choosedRole:any=[];
        companyName:any={};
        fieldType:any={};
        kutree:any=[];
        choosedKu:any=[];
        searchContent:any=[];
        selectionObj:any=[];
        cy:string;
        cot:string;
        targetId:number;
        targetfond:number;
        active:number;
        fondTree:any = [];
        fromStore:string;
        targetStore:string;
        treeloading:boolean;
        searchkeyOne:any={};
        searchValue:any;
        fondCode:any;
        filetableHeight:number;
        YJHeight:number;
        constructor(){
            super();
            this.checkList=false;
            this.tableVisible=false;
            this.treeFilters = {
                title:''
            };
            this.lazyTreeShow=true;
            this.searchTreeShow=false;
            this.nameLoading=false;
            this.tree=[];
            this.defaultArr=[];
            this.treeParamsId=0;
            this.defaultProps = {
                label: 'fondName',
                id: 'id',
                isLeaf: 'hasChildren'
            };
            this.searchLoading=false;
            this.total=0;
            this.page=1;
            this.limit=500;
            this.searchConfig=[];
            this.tableArr=[];
            this.searchData=[];
            this.searchForm={};
            this.choosedRole=[];
            this.tabledata=[];
            this.companyName={};
            this.fieldType={
                children:"children",
                label:"nodeName"
            };
            this.kutree=[];
            this.choosedKu=[];
            this.searchContent=[];
            this.selectionObj=[];
            this.cy='';
            this.cot='';
            this.targetId=null;
            this.fondTree=[];
            this.fromStore='';
            this.targetStore='';
            this.searchkeyOne = {
                key:null
            };
            this.searchValue = null;
            this.filetableHeight = document.documentElement.clientHeight - 181;
            this.YJHeight = document.documentElement.clientHeight - 241;
        };
        goback(){
            this['$router'].go(-1)
        };
        selectionChange(selection){
            this.selection = selection;
        };
        //取列配置
        getListConfig(libId){
            Service.getListConfig(this.libId).then(res=>{
                if(res.data.succeeded){
                    this.tableHeader = res.data.data;
                    this.QueryFileTransferApply({libId:this.libId,ids:this.IdArr})
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        //获取移交的档案
        QueryFileTransferApply(params){
            Service.QueryFileTransferApply(params).then(res=>{
                if(res.data.succeeded){
                    this.tabledata = res.data.data;
                }else{
                    this.getError(res.data.errorMessage)
                };
            });
        };
        //移出档案
        removeFile(){
            if(this.selection.length>0){
                this['$confirm']('您是否要移除所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var arr = [];
                    for(var item of this.tabledata){
                        var i = 0;
                        for(var ind of this.selection){
                            if(ind.id==item.id){
                                i = 1;
                            };
                        };
                        if(i==0){
                            arr.push(item)
                        };
                    };
                    this.tabledata = arr;
                }).catch(() => {
                    this['$message']({
                        type: 'info',
                        message: '已取消移出'
                    });
                });
            }else{
                this.Warn("请选择你要移出的档案。")
            }
        };
        // 左侧顶部检索
        enterSearch(){
            this.targetfond = this.treeFilters.title;
            if(!this.targetfond){
                this['$message']({
                    message: '请输入正确公司名称！',
                    type: 'error'
                });
                this.nameLoading = false;
            }else{
                this.data = [];
                this.lazyTreeShow = false;
                this.searchTreeShow = true;
                this.nameLoading = true;
                Service.getKeyTree(this.treeFilters.title).then((res) =>{
                    if(res.data.succeeded){
                        this.cy=this.companyName.label;
                        this.tree = res.data.data;
                        this.defaultArr = [this.treeFilters.title];
                        // this.choosedRole=[{id:this.treeFilters.title,label:this.companyName.label}];
                        this.nameLoading = false;
                        // this['$refs']['treeBox']['setCheckedKeys'](this.choosedRole);
                        if(this.active==0){
                            Service.archivesTree(this.treeFilters.title).then(res=>{
                                if(res.data.succeeded){
                                    this.kutree=res.data.data;
                                    // let data = res.data.data;
                                    // var name = data[0].children[0].nodeName;
                                    // this.cot = data[0].nodeName;
                                    // this.targetId = data[0].children[0].kindId;
                                    // this.choosedKu.push(name);
                                    // this['$refs']['fileKu']['setCheckedKeys'](this.choosedKu);
                                }else{
                                    this.getError(res.data.errorMessage)
                                }
                            })
                        }else{
                            Service.matterTree(this.treeFilters.title).then(res=>{
                                if(res.data.succeeded){
                                    this.kutree=res.data.data;
                                    // let data = res.data.data;
                                    // var name = data[0].children[0].nodeName;
                                    // this.cot = data[0].nodeName;
                                    // this.targetId = data[0].children[0].kindId;
                                    // this.choosedKu.push(name);
                                    // this['$refs']['fileKu']['setCheckedKeys'](this.choosedKu);
                                }else{
                                    this.getError(res.data.errorMessage)
                                }
                            })
                        }
                        // Service.archiveNowFile(this.treeFilters.title).then(res=>{
                        //     if(res.data.succeeded){
                        //         this.kutree=res.data.data;
                        //         let data = res.data.data;
                        //         var name = data[0].children[0].nodeName;
                        //         this.targetId = data[0].children[0].kindId;
                        //         this.cot=data[0].nodeName;
                        //         this.choosedKu.push(name);
                        //         this['$refs']['fileKu']['setCheckedKeys'](this.choosedKu);
                        //     }else{
                        //         this.getError(res.data.errorMessage)
                        //     }
                        // })
                    }else{
                        this.nameLoading = false;
                        this['$message']({
                            message: '查询全宗树失败！',
                            type: 'error'
                        });
                    }
                });
            }
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
                            message: '查询全宗联想错误！',
                            type: 'error'
                        });
                    }
                });

            } else {
                this.searchOptions = [];
            }
        }
        //获取label值
        changeValue(value){
            var str = {};
            str = this.searchOptions.find((item)=>{
                return item.value === value;
            })
            this.companyName = str;
        };
        // 懒加载树
        // loadNode(node,resolve) {
        //     if(node.level === 0){
        //         Service.getTree({}).then((res) =>{
        //             if(res.data.succeeded){
        //                 let treeData = [];
        //                 let leaf = res.data.data.hasChildren;
        //                 res.data.data.hasChildren = !leaf;
        //                 treeData.push(res.data.data);
        //                 resolve(treeData);
        //                 this.treeParamsId = res.data.data.id;
        //             }else{
        //                 this['$message']({
        //                     message: '树节点数据错误！',
        //                     type: 'error'
        //                 });
        //             }
        //         });
        //     }else{
        //         this.treeParamsId = node.data.id;
        //         Service.getTreeChildren(this.treeParamsId).then((res) =>{
        //             if(res.data.succeeded){
        //                 let treeData = [];
        //                 let data = res.data.data;
        //                 for(let child of data){
        //                     let leaf = child.hasChildren;
        //                     child.hasChildren = !leaf;
        //                 }
        //                 data.forEach(item => {
        //                     treeData.push(item)
        //                 });
        //                 resolve(treeData);
        //             }else{
        //                 this['$message']({
        //                     message: '树节点数据错误！',
        //                     type: 'error'
        //                 });
        //             }
        //         });
        //     };
        // };
        // 点击对应子集
        handleNodeClick(data){
            this.cy=data.fondName;
            this.targetfond=data.id;
            // Service.archiveNowFile(data.id).then(res=>{
            //     if(res.data.succeeded){
            //         this.kutree=res.data.data;
            //         let data = res.data.data;
            //         var name = data[0].children[0].nodeName;
            //         this.cot = data[0].nodeName;
            //         this.targetId = data[0].children[0].kindId;
            //         this.choosedKu.push(name);
            //         this['$refs']['fileKu']['setCheckedKeys'](this.choosedKu);
            //     }else{
            //         this.getError(res.data.errorMessage)
            //     }
            // })
            if(this.active==0){
                Service.archivesTree(data.id).then(res=>{
                    if(res.data.succeeded){
                        this.kutree=res.data.data;
                        // let data = res.data.data;
                        // var name = data[0].children[0].nodeName;
                        // this.cot = data[0].nodeName;
                        // this.targetId = data[0].children[0].kindId;
                        // this.choosedKu.push(name);
                        // this['$refs']['fileKu']['setCheckedKeys'](this.choosedKu);
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                Service.matterTree(data.id).then(res=>{
                    if(res.data.succeeded){
                        this.kutree=res.data.data;
                        // let data = res.data.data;
                        // var name = data[0].children[0].nodeName;
                        // this.cot = data[0].nodeName;
                        // this.targetId = data[0].children[0].kindId;
                        // this.choosedKu.push(name);
                        // this['$refs']['fileKu']['setCheckedKeys'](this.choosedKu);
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }
        };
        mounted(){
            window.onresize = ()=>{
                return (()=>{
                    this.filetableHeight = document.documentElement.clientHeight - 175;
                    this.YJHeight = document.documentElement.clientHeight - 241;
                })()
            }
        }
        //档案库的点击
        pageType(data,node){
            if(data.nodeType==1){
                this.cot=data.nodeName;
            }else{
                this.targetId = data.kindId;
                this.targetStore = data.nodeName;
                for(var item of this.kutree){
                    if(item.children!=null){
                        for(var ind of item.children){
                            if(ind.children!=null){
                                for(var ind of item.children){
                                    if(ind.children!=null){
                                        for(var ind of item.children){
                                            if(ind.children!=null){
                                                for(var ind of item.children){
                                                    if(ind.children!=null){
                                                        for(var ind of item.children){
                                                            if(ind.children!=null){
                                                            }else{
                                                                if(ind.id==data.id){
                                                                    this.cot=item.nodeName;
                                                                }
                                                            }
                                                        }
                                                    }else{
                                                        if(ind.id==data.id){
                                                            this.cot=item.nodeName;
                                                        }
                                                    }
                                                }
                                            }else{
                                                if(ind.id==data.id){
                                                    this.cot=item.nodeName;
                                                }
                                            }
                                        }
                                    }else{
                                        if(ind.id==data.id){
                                            this.cot=item.nodeName;
                                        }
                                    }
                                }
                            }else{
                                if(ind.id==data.id){
                                    this.cot=item.nodeName;
                                }
                            }
                        }
                    }
                }
            }
        }
        // 展开列表
        handleNodeExpand(){
            console.log(document.querySelector(".is-expanded"));
        };
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
        //添加档案
        addFile(){
            this.tableVisible = true;
            // this.Getquerycondition(this.libId);
            Service.getListConfig(this.libId).then(res=>{
                if(res.data.succeeded){
                    this.tableArr = res.data.data;
                    this.page = 1;
                    if(this.active==0){
                        this.FileSearch({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:1, pageSize:this.limit,sort:""}})
                    }else{
                        this.searchwenjian({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:1, pageSize:this.limit,sort:""}})
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        selectionNum(selection){
            this.selectionObj=selection;
        };
        //确定添加
        confirmAdd(){
            if(this.selectionObj.length>0){
                for(var item of this.selectionObj){
                    if(item.ARCHIVE_STATUS==2){
                        this.Warn('所选数据中部分数据正在跨全宗移交审批中，请重新选择。');
                        break;
                    }else{
                        var i = 0;
                        for(var ind of this.tabledata){
                            if(ind.id===item.id){
                                i=1;
                                break;
                            }
                        }
                        if(i==0){
                            this.tabledata.push(item)
                        }
                    }
                };
                this.tableVisible=false;
            }else{
                this.Warn("请选择你要添加的档案。")
            }
        };
        handleCurrentChange(val) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            // this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
            if(this.active==0){
                this.FileSearch({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
            }else{
                this.searchwenjian({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
            }
        };
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page-1);
            // this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
            if(this.active==0){

                this.FileSearch({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
            }else{
                this.searchwenjian({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
            }
        };
        Getquerycondition(params){
            Service.Getquerycondition(params).then(res=>{
                if(res.data.data.length>4){
                    document.getElementsByClassName('tableContainer')[0]['style'].top='115px';
                }else{
                    document.getElementsByClassName('tableContainer')[0]['style'].top='90px';
                }
                this.searchConfig = res.data.data;
                for(var item of res.data.data){
                    this['$set'](this.searchForm,'value'+item.id,null)
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
        //取文件级
        searchwenjian(params){
            Service.WenjianSearch(params).then(res=>{
                if(res.data.succeeded){
                    this.searchData=res.data.data;
                    this.page = res.data.page;
                    this.total = res.data.totalRecords;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        }
        //检索
        beginSearch(){
            // this.searchContent=[];
            // for(var key in this.searchForm){
            //     if(this.searchForm[key]!=null&&this.searchForm[key]!=""){
            //         var Name = key.slice(5);
            //         var str = parseInt(Name)
            //         var obj = {
            //             id:str,
            //             value:this.searchForm[key]
            //         };
            //         this.searchContent.push(obj)
            //     };
            // };
            this.searchValue = this.searchkeyOne.key;
            if(this.active==0){
                this.FileSearch({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:1, pageSize:this.limit,sort:""}})
            }else{
                this.searchwenjian({kindId:this.kindId,fondId:this.fondId,searchKey:this.searchValue,pageCondition:{page:1, pageSize:this.limit,sort:""}})
            }
            // this.FileSearch({kindId:this.kindId,fondId:this.fondId,conditions:this.searchContent,pageCondition:{page:1, pageSize:10,sort:""}})
        };
        //清空搜索框
        clearSearch(){
            // for(var key in this.searchForm){
            //     this.searchForm[key] = null;
            // };
            this.searchValue = null;
            this.searchkeyOne.key = null;
        };
        //提交申请
        applyTo(){
            if(this.targetId!=null){
                //Service.TransferToOtherFond({libId:this.libId,targetKindId:this.targetId}).then(res=>{
                    //if(res.data.succeeded){
                        // if(res.data.data.result){
                            if(this.cot!=''&&this.cy!=''){
                                var arr = [];
                                for(var item of this.tabledata){
                                    arr.push(item.id)
                                };
                                var obj = {
                                    kind:this.kindId,
                                    lib:this.libId,
                                    fond:this.fondId,
                                    ids:arr,
                                    ct:this.cot,
                                    cy:this.cy,
                                    targetId:this.targetId,
                                    targetfond:this.targetfond,
                                    check:this.checkList,
                                    active:this.active
                                    // type:'1'
                                };
                                // if(this.checkList.length>0){
                                //     obj['check']=1;
                                // };
                                // if(this.active==1){
                                //     obj['active']=1;
                                // }else{
                                //     obj['active']=0;
                                // };
                                window.sessionStorage.setItem('recordTransferApply',JSON.stringify(obj));
                                this['$router'].push({
                                    path:'/fileArrange/archiveManagement/recordTransferApply',
                                    // query:obj
                                });
                            }else{
                                this.Warn('请选择目标案卷库。')
                            };
                        // }else{
                        //     if(this.cot!=''&&this.cy!=''){
                        //         var arr = [];
                        //         for(var item of this.tabledata){
                        //             arr.push(item.id)
                        //         };
                        //         var objs = {
                        //             kind:this.kindId,
                        //             lib:this.libId,
                        //             fond:this.fondId,
                        //             ids:arr,
                        //             ct:this.cot,
                        //             cy:this.cy,
                        //             targetId:this.targetId,
                        //             targetfond:this.targetfond,
                        //             fromStore:this.fromStore,
                        //             targetStore:this.targetStore
                        //         };
                        //         if(this.checkList.length>0){
                        //             objs['check']=1;
                        //         };
                        //         if(this.active==1){
                        //             objs['active']=1;
                        //             window.sessionStorage.setItem('srcFields',JSON.stringify(res.data.data.wenjianSrcFields));
                        //             window.sessionStorage.setItem('targetFields',JSON.stringify(res.data.data.wenjianTargetFields));
                        //         }else{
                        //             objs['active']=0;
                        //             window.sessionStorage.setItem('srcFields',JSON.stringify(res.data.data.anjuanSrcFields));
                        //             window.sessionStorage.setItem('targetFields',JSON.stringify(res.data.data.anjuanTargetFields));
                        //             window.sessionStorage.setItem('WJSrcFields',JSON.stringify(res.data.data.wenjianSrcFields));
                        //             window.sessionStorage.setItem('WJTargetFields',JSON.stringify(res.data.data.wenjianTargetFields));
                        //         };
                        //         window.sessionStorage.setItem('contrastItem',JSON.stringify(objs))
                        //         this['$router'].push({
                        //             path:'/fileArrange/archiveManagement/contrastItem',/*'/fileArrange/archiveManagement/recordTransferApply'*/
                        //             // query:objs
                        //         });
                        //     }else{
                        //         this.Warn('请选择目标案卷库。')
                        //     };
                        // }
                    // }else{
                    //     this.getError(res.data.errorMessage)
                    // }
                //})
            }else{
                this.Warn('请选择目标库。')
            }
        };
        getFontTree(){
            Service.getKeyTree({}).then(res=>{
                if(res.data.succeeded){
                    this.fondTree = res.data.data;
                    this.treeloading = false;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        }
        created(){
            this.treeloading = true;
            this.getFontTree();
            var str = window.sessionStorage.getItem('fileTurnOver');
            var obj = JSON.parse(str);
            this.kindId = obj.kind/1;
            this.libId = obj.lib/1;
            this.fondId = obj.fond/1;
            this.active = obj.active;
            this.fromStore = obj.fromStore;
            this.IdArr = obj.ids;
            this.getListConfig(this.libId);
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
        //案卷号
        myAJH(num){
            if(num!==null) {
                num = num+"";
                if (num.length == 1) {
                    return '000'+num;
                } else if (num.length == 2) {
                    return '00'+num;
                } else if (num.length == 3) {
                    return '0'+num;
                } else {
                    return num;
                }
            }else{
                return null;
            }
        }
        getRowClass(row: any = {}) {
            if (row.row.ARCHIVE_STATUS == 2) {
                return 'row-yijiao';
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../../../styles/archiveManage/fileTurnOverStyle.scss';
</style>