<template>
    <section class="enterstore">
        <div class="conbinefile">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">档案管理</p>
            <span>归入库位</span>
            <el-button class="checkWay" @click="goBack">返回</el-button>
        </div>
        <div class="combinetable">
            <div class="combinetableL">
                <div class="sort">
                    <span>档案列表</span>
                    <el-button class="checkWay" @click="removeOut">移出</el-button>
                </div>
                <div class="enterstoreTable">
                    <el-table
                            :data="enterData"
                            style="width:100%"
                            ref="tableOne"
                            :stripe="true"
                            :height="tableHeight"
                            :check-strictly="true"
                            class="containTable indexTable"
                            @selection-change="selectionChange"
                            heighlight-current-row
                            border
                    >
                        <el-table-column type="selection" width="55"></el-table-column>
                        <template v-for="item in tableHeader">
                            <el-table-column v-if="!item.hidden"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>
                        </template>
                        <!--<el-table-column v-for="item in tableHeader" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>-->
                    </el-table>
                </div>
            </div>
            <div class="combinetableR">
                <p>选择目标库位</p>
                <div class="enterTree">
                    <el-tree
                            class="checkTree"
                            :load="loadNodes"
                            node-key="id"
                            :check-strictly="true"
                            lazy
                            show-checkbox
                            :props="defaultProps"
                            :render-content="renderContent"
                            @node-click = "checkoutZuan"
                            ref="checkTrees"
                    >
                    </el-tree>
                    <!--show-checkbox-->
                </div>
                <div class="combinetableRB">
                    <el-input class="storeInput" v-model="componentStr" placeholder="填写项目/部门名称"></el-input>
                    <p>填写项目/部门信息可以帮助你整理库房时更准确的定位档案</p>
                    <el-button class="checkWay" @click="enterFile">归入库位</el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './enterStore.service';
    import { Loading } from 'element-ui';
    @Component
    export default class enterStore extends Vue{
        enterData:any = [];
        libId:number;
        selection:any = [];
        tableHeader:any = [];
        childTreeDatas : any = [];
        treesId:number;
        treeType:number;
        defaultProps: any = {};
        componentStr : string;
        loadingInstance:any;
        tableHeight:number;
        constructor(){
          super();
            this.enterData = [];
            this.selection = [];
            this.tableHeader = [];
            this.childTreeDatas = [];
            this.treesId = 0;
            this.treeType = 0;
            this.defaultProps = {
                isLeaf: 'hasChildren',
                label: 'wareName',
                id:'id',
                disabled:'Isdisabled'
            };
            this.componentStr = '';
            this.tableHeight = document.documentElement.clientHeight-178;
        };
        selectionChange(selection){
            this.selection = selection;
        }
        removeOut(){
            if(this.selection.length>0){
                this['$confirm']('是否要移出选中的档案', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var arr = [];
                    for(var item of this.enterData){
                        var i = 0;
                        for(var ind of this.selection){
                            if(item.id==ind.id){
                                i = 1;
                                break;
                            };
                        };
                        if(i ==0){
                            arr.push(item)
                        };
                    };
                    this.enterData = arr;
                }).catch(() => {

                });
            }else{
                this.Warn("请选择你要移出的档案。")
            }
        };
        loadNodes(node,resolve) {
            if(node.level === 0){
                Service.getHouseTree({}).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        var obj = {id:res.data.data.id,wareName:res.data.data.wareName,Isdisabled:true}
                        treeData.push(obj);
                        this.childTreeDatas = res.data.data.resultList;
                        this.getTreeName0(treeData);
                        resolve(treeData);
                        this.treesId = res.data.data.id;
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }else if(node.level === 1 ){
                Service.getHouseTree({}).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data.resultList;
                        for(let child of data){
                            child.Isdisabled=false;
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item);
                        });
                        this.getTreeName(treeData);
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.treesId = node.data.id;
                this.treeType = node.data.type;
                Service.getHouseTreeson(this.treesId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                            child.Isdisabled = false;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                        });
                        // if(node.level == 3 || node.level == 2){
                        //     this['$refs']['checkTrees']['showCheckbox'] = true;
                        // }
                        this.getTreeName(treeData);
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
        checkoutZuan(treeDatas){
            if(treeDatas.className === 'fa fa-plus-square-o'){
                treeDatas.className = 'fa fa-minus-square-o';
            }else {
                treeDatas.className = 'fa fa-plus-square-o';
            }
        }
        mounted(){
            window.onresize = ()=>{
                return (()=>{
                    this.tableHeight = document.documentElement.clientHeight-178;
                })()
            }
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
                                'font-size': '16px',
                                'float':'left',
                                'margin-top': '0px'
                            }
                        },
                    ),
                    createElement(
                        'i',
                        {
                            attrs:{
                                'class':data.className1
                            },
                            style:{
                                'font-size': '16px',
                                'float':'left',
                                'margin': '0 5px 0',
                                'color':'rgb(115,128,145)'
                            }
                        },
                    ),
                    createElement(
                        'img',
                        {
                            attrs:{
                                'src':data.srcName
                            },
                            style:{
                                'margin': data.srcMargin,
                                'float': 'left',
                                'width': '19px',
                                'margin-left':data.marginLeft
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-left':'2px'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ]
            )
        };

        enterFile(){
            var arr = this['$refs']['checkTrees']['getCheckedKeys']()
            if(arr.length==0){
                this.Warn("请选择要归入的库架或库位。")
            }else{
                if(this.enterData.length==0){
                    this.Warn('请选择要归入库位的档案。')
                }else{
                    this['$confirm']('是否将档案归入库位', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在归入库位，请稍候',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        var libArr = [];
                        for(var item of this.enterData){
                            libArr.push(this.libId)
                        }
                        var libstr = libArr.join(',');
                        var str = arr.join(',');
                        var Idarr = [];
                        for(var item of this.enterData){
                            Idarr.push(item.id)
                        }
                        var str2 = Idarr.join(',')
                        Service.saveWareArchive({
                            wareIds:str,
                            objectIds:str2,
                            libId:libstr,
                            projectName:this.componentStr
                        }).then(res=>{
                            if(res.data.succeeded){
                                this.Suces("归入库位成功。")
                                this['$router'].go(-1)
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                            this.$nextTick(() => {
                                this.loadingInstance.close();
                            });
                        })
                    }).catch(() => {

                    });
                }
            }
        }
        goBack(){
            this['$router'].go(-1)
        }
        created(){
            var str = window.sessionStorage.getItem('enterStore');
            var obj =JSON.parse(str);
            this.libId = obj.lib;
            // this.libId = this['$route'].query.lib;
            var data = window.sessionStorage.getItem("enterData");
            this.enterData = JSON.parse(data)
            Service.getDispField(this.libId).then(res=>{
                if(res.data.succeeded){
                    this.tableHeader = res.data.data;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        // 根级
        getTreeName0(tree){
            for(let grass of tree){
                if(!grass.hasChildren){
                    grass.className = 'fa fa-plus-square-o';
                    grass.className1 = 'fa fa-institution';
                }
            }

        };
        // 递归节点 增加className
        getTreeName(tree){
            for(let grass of tree) {
                if (grass.type === 1) {
                    grass.srcName = 'static/imgs/allTree/kuHome.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '-1px 5px 0 8px';
                } else if (grass.type === 2) {
                    grass.srcName = 'static/imgs/allTree/kuBag.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '-1px 5px 0 8px';
                } else if (grass.type === 3) {
                    grass.srcName = 'static/imgs/allTree/kuCell.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '2px 5px 0 8px';
                }
                if (!grass.hasChildren) {
                    grass.className = 'fa fa-plus-square-o';
                }
            }
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
    }
</script>

<style scoped lang="scss">
@import '../../../../styles/archiveManage/enterStoreStyle.scss';
</style>