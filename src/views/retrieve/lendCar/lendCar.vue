<template>
    <section>
        <div class="mainTitle">
            <span>我的借阅车</span>
            <div class="rt">
                <el-button class="checkWay" @click="enterLendList">填写借阅申请</el-button>
                <el-button class="checkWay" @click="deleteAllFiles">批量删除</el-button>
                <el-button class="checkWay" @click="addLendList">添加档案</el-button>
                <el-button class="checkWay" @click="back">返回</el-button>
            </div>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow">
                <div class="formData">
                    <el-form :inline="true" :model="filters" class="doneForm topParamsForm">
                        <el-form-item v-for="" class="fondName" label="文件标题：" ref="fondName">
                            <el-input class="checkName" v-model="filters.title" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="fondName" label="文件编号：" ref="fondName">
                            <el-input class="checkName" v-model="filters.fileNumber" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="title" label="借阅方式：" ref="title">
                            <el-select class="checkName" v-model="filters.appType">
                                <el-option v-for="item in searchOptions" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay" @click="checkCar">检索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!--列表-->
                <div class="borderTable">
                    <el-table  border @row-click="oaClickRow" :row-class-name="getRowClass" stripe :height="bodyHeight" :data="data" highlight-current-row v-loading="listLoading" @selection-change="selsChange" class="indexTable containTable">
                        <el-table-column  :selectable='checkSelection' type="selection" width="30" label="#" v-if="tableHeadArrs.length>0">
                        </el-table-column>
                        <template v-for="file in tableHeadArrs">
                            <el-table-column :width="file.width" v-if = "file.fieldName==='CFWZ'" :label="file.caption">
                                <template slot-scope="scope">
                                    <el-popover trigger="click" placement="top" v-if = "scope.row.CFWZ">
                                        <p>档案存放地：</p>
                                        <p  v-html="scope.row[file.fieldName]"></p>
                                        <ul v-for="item in tooltipContent">
                                            <li>{{item}}</li>
                                        </ul>
                                        <div slot="reference" class="name-wrapper">
                                            <div class="superTarget" v-html="scope.row[file.fieldName]"></div>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column :width="file.width" v-if = "file.fieldName==='KFCZY'" :label="file.caption">
                                <template slot-scope="scope">
                                    <el-popover trigger="click" placement="top" v-if = "scope.row.KFCZY">
                                        <p>档案管理员：<span  v-html="scope.row[file.fieldName]"></span></p>
                                        <ul>
                                            <li>万信号码：{{tooltipContent1.loginName}}</li>
                                            <li>手机号码：{{tooltipContent1.telephone }}</li>
                                        </ul>
                                        <div slot="reference" class="name-wrapper">
                                            <div class="superTarget" v-html="scope.row[file.fieldName]"></div>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column :width="file.width" v-if = "file.fieldName==='HOUSETYPE'" :label="file.caption" :prop="file.fieldName">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.HOUSETYPE===1">在库</span>
                                    <span v-if="scope.row.HOUSETYPE!==1&&scope.row.HOUSETYPE!==2">无实体</span>
                                    <el-popover trigger="click" placement="top" v-if = "scope.row.HOUSETYPE&&scope.row.HOUSETYPE===2">
                                        <p>借阅人：<span  v-html="tooltipContent2.fullName"></span></p>
                                        <ul>
                                            <li>万信号码：{{tooltipContent2.loginName}}</li>
                                            <li>手机号码：{{tooltipContent2.telephone }}</li>
                                        </ul>
                                        <div slot="reference" class="name-wrapper">
                                            <div class="superTarget">借出</div>
                                        </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column :width="file.width" v-if = "file.fieldName==='TM'" :label="file.caption">
                                <template slot-scope="scope">
                                    <span class="superTarget" @click="detailsOut(scope.row)">{{scope.row.TM}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :width="file.width" v-if="file.fieldName!=='TM'&&file.fieldName!=='CFWZ'&&file.fieldName!=='KFCZY'&&file.fieldName!=='HOUSETYPE'" :prop="file.fieldName" :label="file.caption" >
                                <template slot-scope="scope">
                                    <div v-if="scope.row[file.fieldName+'_COPY']">
                                        <div v-html="scope.row[file.fieldName+'_COPY']"></div>
                                    </div>
                                    <div v-else>
                                        <div v-html="scope.row[file.fieldName]"></div>
                                    </div>
                                </template>
                            </el-table-column>
                        </template>
                        <el-table-column v-if="tableHeadArrs.length>0" width="100" prop="appTypeDict.displayText" label="借阅方式" >
                        </el-table-column>
                        <el-table-column label="操作" width="70" v-if="tableHeadArrs.length>0">
                            <template slot-scope="scope">
                                <span class="addBtn" v-if="data.length>0" style="cursor:pointer;color:#606266" @click="deleteFile(scope.row)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--&lt;!&ndash;工具条分页&ndash;&gt;-->
                    <!--<el-col :span="24" class="pager">-->
                        <!--<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">-->
                        <!--</el-pagination>-->
                    <!--</el-col>-->
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './lendCar.service';
    import { State, Getter, Mutation, } from 'vuex-class';
    @Component
    export default class appSearch extends Vue{
        @State catNum :number;
        @Mutation('SET_CATNUM') SET_isShow: () => void;
        windowHeight: number;
        bodyHeight: number;
        timer: boolean;
        listLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        slipKey: string;
        FileDetailVisible: boolean;
        filters: any = {};
        tooltipContent: any = [];
        tooltipContent1: any = {};
        tooltipContent2: any = {};
        list: any = [];
        data: any = [];
        carParams: any = {};
        tableHeadArrs :any = [];
        searchOptions :any = [];
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 206 ;
            this.timer = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.listLoading = false;
            this.FileDetailVisible = false;
            this.slipKey = '2';
            this.list = [];
            this.tooltipContent = [];
            this.tooltipContent1 = {};
            this.tooltipContent2 = {};
            this.tableHeadArrs = [];
            this.searchOptions = [
                { id:1,name:'电子借阅'},
                { id:2,name:'实体借阅'},
            ];
            this.filters = {
                title:'',
                fileNumber:'',
                appType:''
            };
            this.carParams = {
                start: 0,
                limit: 25
            };
            this.data =  [];
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            // this.getFiles();
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);
            // this.getFiles();
        };
        back():void{
            this['$router'].go(-1);
        };
        selsChange(list:any = {}){
            this.list = list;
        };
        checkSelection(row) {
            return row.appTypeDict.displayText==="电子借阅"||row.HOUSETYPE === 1;
        }
        // 查询购物车档案数量
        getCount(){
            Service.getCarCount({}).then((res) =>{
                if(res.data.succeeded){
                    let total = res.data.data;
                    this['$store'].commit('SET_CATNUM', total);
                }else{
                    this['$message']({
                        message: '查询购物车档案数失败！',
                        type: 'error'
                    });
                }
            });
        };
        // 表头
        getHeader():void{
            // let params = Object.assign({},this.tableHeadFilters);
            Service.getCarHead({}).then((res) =>{
                if(res.data.succeeded){
                    this.tableHeadArrs = res.data.data;
                    this.getFiles();
                }else{
                    this['$message']({
                        message: '加载表格列配置失败！',
                        type: 'error'
                    });
                }
            })
        };

        // 查看详情
        detailsOut(row){
            let obj = {appNo:row.DH,archiveId:row.id,libId:row.libId,MJ:row.MJ};
            window.sessionStorage.setItem('searchToDetail',JSON.stringify(obj));
            this['$router'].push({path:'/retrieve/searchDetail/searchDetail'})
        };

        // 查询借阅车
        checkCar(){
            this.getFiles();
        };

        // 设置在库不在库样式
        getRowClass(row:any = {}):string{
            if(row.row.appTypeDict.displayText==="电子借阅"){
                return 'row-in';
            }else if(row.row.appTypeDict.displayText==="实体借阅"&&row.row.HOUSETYPE !== 1){
                return 'row-out';
            }
        };

        // 表格初始化
            getFiles():void{
                this.listLoading = true;
                Service.getCarTable(this.filters).then((res) =>{
                    if(res.data.succeeded){
                        this.data = res.data.data;
                        window.sessionStorage.getItem('dataList');
                        this.listLoading = false;
                    }else{
                        this.listLoading = false;
                        this['$message']({
                            message: '查询借阅车信息失败！',
                            type: 'error'
                        });
                    }
                });
        };
        // 删除
        deleteFile(row:any={}){
            let arr = [];
            arr.push(row);
            let params = { archives : arr };
            this['$confirm']('确认删除选中文件吗？', {
                type: 'warning'
            }).then(() => {
                Service.getSuperDelete(params).then((res) =>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getHeader();
                        this.getCount();
                    }else{
                        this['$message']({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                })
            });
        }
        // 批量删除
        deleteAllFiles(){
            if(this.list.length===0){
                this['$message']({
                    message: '未选择任何档案',
                    type: 'warning'
                });
            }else{
                let params = { archives : this.list };
                this['$confirm']('确认删除选中文件吗？', {
                    type: 'warning'
                }).then(() => {
                    Service.getSuperDelete(params).then((res) =>{
                        if(res.data.succeeded){
                            this['$message']({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getHeader();
                            this.getCount();
                        }else{
                            this['$message']({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    })
                });
            }
        };

        // 跳转添加档案
        addLendList(){
            this['$router'].push({path:'/home/home'});
        }

        // 点击填写借阅单
        enterLendList(){
            if(this.list.length===0){
                this['$message']({
                    message: '未选择任何档案',
                    type: 'warning'
                });
            }else{
                window.sessionStorage.setItem('headList', JSON.stringify(this.tableHeadArrs));
                this.list.forEach(function(item){
                    if(item.HOUSETYPE==1){
                        item.HOUSETYPE = '在库'
                    }else if(item.HOUSETYPE==2){
                        item.HOUSETYPE = '借出'
                    }else{
                        item.HOUSETYPE = '无实体'
                    }
                });
                window.sessionStorage.setItem('dataList', JSON.stringify(this.list));
                window.sessionStorage.setItem('dataId', this.slipKey);
                window.sessionStorage.setItem('addWay', '0');
                window.sessionStorage.setItem('backIndex','3');
                this['$router'].push({
                    path:'/retrieve/loanSlip/loanSlip',
                });
            }
        };

        // 点击查询档案存放地档案及用户信息
        oaClickRow(row){
            if(row.userId){
                Service.getUserInfor(row.userId).then((res) =>{
                    if(res.data.succeeded){
                        this.tooltipContent1 = res.data.data?res.data.data:{};
                    }else{
                        this['$message']({
                            message: '查询用户信息失败！',
                            type: 'error'
                        });
                    }
                });
            }

            Service.clickFilesDetail({
                libId:Number(row.libId),
                id:Number(row.id),
            }).then((res) =>{
                if(res.data.succeeded){
                    this.tooltipContent = res.data.data&&res.data.data.length>0?res.data.data:[];
                }else{
                    this['$message']({
                        message: '查询档案存放地信息失败！',
                        type: 'error'
                    });
                }
            });

            // 在库
            if(row.HOUSETYPE&&row.HOUSETYPE===2){
                Service.getHomeDetail({
                    objectId:Number(row.id),
                    libId:Number(row.libId),
                }).then((res) =>{
                    if(res.data.succeeded){
                        this.tooltipContent2 = res.data.data?res.data.data:{};
                    }else{
                        this['$message']({
                            message: '查询在库信息失败！',
                            type: 'error'
                        });
                    }
                });
            }
        };

        created(){
            this.filters.fondName = this['$route'].params.id
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 206;
                })()
            };
            this.getHeader();
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/retrieve/search';
    @import '../../../styles/retrieve/lendCar';
</style>