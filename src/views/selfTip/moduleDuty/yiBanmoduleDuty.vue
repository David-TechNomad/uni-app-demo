<template>
    <section :style="{ 'margin-top': marginSize + 'px' }">
        <div class="mainTitle">
            <el-tooltip :content="content" placement="top">
                <span class="redLight" v-show="false"></span>
            </el-tooltip>
            <span>项目公司权属档案录入任务</span>
            <el-button class="checkWay rt" @click="back" v-show="fanhui">返回</el-button>
        </div>
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    <div class="titleSect"></div>
                </div>
                <ul class="rowsForm">
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">项目名称</span></div></el-col>
                        <el-col :span="13">
                            <div class="grid-content bg-purple-light" style="border-right:none;">
                                <span class="span2">{{detailData.projectName}}</span>
                            </div>
                        </el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">文件数量</span></div></el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                                <span class="span2">{{detailData.count}}</span>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">负责人</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.userName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">负责人部门</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">{{detailData.unitName}}</span></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple"><span class="span1">截止日期</span></div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple-light"><span class="span2">{{dateFormat(detailData.planDate)}}</span></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3"><div class="grid-content1 bg-purple" style="border-left:1px solid #ccc;border-right:0"><span class="span1">文件描述</span></div></el-col>
                        <el-col :span="21"><div class="grid-content1 bg-purple-light" style="padding:10px 0 0 10px;overflow-y:auto;">{{detailData.fileContent}}</div></el-col>
                    </el-row>
                </ul>
            </div>

            <div class="mainCon basicList">
                <div class="clear">
                    <div class="loanTipTitle">
                        已选择的文件 <span class="rt">应选择文档数：{{detailData.count}}已选择文档数：<span>{{recordData.length}}</span></span>
                        <div class="titleSect"></div>
                    </div>
                    <div class="borderTable waitTable">
                        <el-table tooltip-effect="dark" style="width: 100%" stripe border :data="recordData" @row-dblclick="RowDblclick" highlight-current-row class="containTable indexTable lineTable">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                   {{scope.$index+1}}
                                </template>
                            </el-table-column>
                            <template  v-for="item in tableHeader">
                                <el-table-column :width="item.width" :prop="item.dictData===null?item.fieldName:item.fieldName+'_Text'" :label="item.caption"  v-if="!item.hidden&&item.fieldName!='BZ'&&item.fieldName!='BZ1'" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ'&&!headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName"  :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ1'&&headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                            </template>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './moduleDutyDetail.service';
    import moment from 'moment';
    import base from '@/scrollLoad';
    import treeChange from '../../../utils/treeChange';
    import { Loading } from 'element-ui';
    @Component
    export default class processManagementUpdate extends Vue{
        bodyHeight: number;
        detailData:any = {};
        recordData; any = [];
        data: any = [];
        tableHeadArrs: any = [];
        stepMap: any = [];
        stepData: any = [];
        row: any = {};
        fileVisible: boolean;
        peopleVisible: boolean;
        checkNameForm: any = {};
        node: any = {};
        resolve: any = {};
        defaultTrees: any = {};
        dataOa: any = [];
        dataName: any = [];
        treeLoading: boolean;
        tree: any = [];
        comLoading: boolean;
        treeParamsId: number;
        oaHeight: number;
        i: number;
        hangData: any = {};
        tableHangData: any = {};
        yijianInput: boolean;
        flagObj: any = {};
        detail:number;
        FondForm:any = {};
        leftData: any = [];
        defaultProps: any = {};
        searchOptions: any = [];//远程搜索条目
        leftTreeLoading:boolean;
        defaultLeftOpen:any = [];
        dictListByDictId:any = [];
        tableHeader:any=[];
        kindId:string;
        libId:string;
        archiveLibId:string;
        obj:any = {};
        filters:any = {};
        limit: number;
        total: number;
        z_Module:any = {};
        active:number;
        showLight:boolean;
        content:string;
        countShow:boolean;
        archiveList:any = [];
        marginSize:number;
        z_node:number;
        fanhui:boolean;
        id:number;
        constructor(){
            super();
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.detailData = {};
            this.row = {};
            this.recordData = [];
            this.data = [];
            this.tableHeadArrs = [];
            this.stepMap = [];
            this.stepData = [];
            this.fileVisible = false;
            this.peopleVisible = false;
            this.checkNameForm = {
                checkName:''
            };
            this.defaultTrees = {
                children: 'children',
                label: 'shortName',
                id:'orgID'
            };
            this.dataOa = [];
            this.dataName = [];
            this.treeLoading = false;
            this.comLoading = false;
            this.treeParamsId = 0;
            this.i = 0;
            this.hangData = {};
            this.tableHangData = {};
            this.yijianInput = false;
            this.flagObj = {};
            this.detail = 0;
            this.FondForm = {
                id:'',
            };
            this.leftData = [];
            this.defaultProps = {
                children: 'children',
                label: 'fondName',
                id:'id'
            };
            this.searchOptions = [];
            this.leftTreeLoading = false;
            this.defaultLeftOpen = [];
            this.dictListByDictId = [];
            this.tableHeader = [];
            this.kindId = '';
            this.libId = '';
            this.archiveLibId = '';
            this.obj = {};
            this.filters = {
                page:1,
                pageSize:10
            };
            this.limit = 10;
            this.total = 0;
            this.z_Module = {};
            this.active = 0;
            this.showLight = false;
            this.content = '';
            this.countShow = false;
            this.archiveList = [];
            this.marginSize = 0;
            this.z_node = 0;
            this.fanhui = false;
            this.id = 0;
        }

        //时间格式化
        dateFormat(date) {
            if(date){
                return moment(date).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }

        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }

        back(){
            this['$router'].go(-1);
        }

        //获取表格头部设置
        getDispField(libId:number){
            Service.getDispField(libId).then(res=>{
                if(res.data.succeeded){
                    var arr = res.data.data;
                    var haveBZ = false;
                    for(var son of arr){
                        if(son.fieldName=='BZ'){
                            var str = JSON.stringify(son);
                            var obj = JSON.parse(str);
                            obj.fieldName = 'BZ1';
                            haveBZ = true;
                        };
                    };
                    if(haveBZ){
                        arr.splice(1,0,obj)
                    }
                    this.tableHeader=arr;
                    this.recordData = this.archiveList;
                }else{
                    this.getError(res.data.errorMessage);
                }
            });
        };

        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };

        dateFormat2(date) {
            if(date){
                return moment(date).format("YYYYMMDD");
            }else{
                return '';
            }
        }

        RowDblclick(row){
            let obj={
                Srclib:this.archiveLibId,
                SrcId:row.id,
                type:'1'
            };
            window.sessionStorage.setItem('ToWjDetail',JSON.stringify(obj));
            this['$router'].push({
                 path:'/selfTip/WjDetail',
             })
        }

        created(){
            this.z_Module = JSON.parse(window.sessionStorage.getItem('z_Module'));
            let z_RecordData = JSON.parse(window.sessionStorage.getItem('z_RecordData'));

            let parame = {
                id:0
            };
            let url = window.location.href;
            url = unescape(url);
            console.log(url);
            if(url.indexOf("id") > 0){
                this.z_node = 1;
                if(url.split('?')[2]){
                    let bb = (url.split('?')[2]);
                    let pb = bb.substr(bb.indexOf("=")+1);
                    let b = base['base64'].decode(
                        JSON.stringify(pb)
                    );
                    this.id = parseInt(b);
                    parame.id = this.id;
                    this.fanhui = false;
                    this.marginSize = -60;
                }
            }else{
                this.z_node = 0;
                this.fanhui = true;
                parame.id = this.z_Module.id;
                this.marginSize = 0;
            }

            Service.z_getInfo(parame).then((res) =>{
                if(res.data.succeeded){
                    let libId = parseInt(res.data.data.libId);
                    let archiveLibId = parseInt(res.data.data.archiveLibId);
                    this.libId = libId;
                    this.archiveLibId = archiveLibId;
                    this.kindId = res.data.data.kindId;
                    this.detailData = res.data.data.modularization;
                    this.archiveList = res.data.data.archiveList;
                    let shiJian = new Date();
                    let riQi = this.dateFormat2(shiJian.toString());
                    let shiJianCha = parseInt(riQi) - parseInt(this.dateFormat2(this.detailData.planDate));
                    if(shiJianCha > 0){
                        this.showLight = true;
                        this.content = "此任务应在"+this.dateFormat(this.detailData.planDate)+"前完成，当前已超期"+shiJianCha+"天"
                    }else{
                        this.showLight = false;
                    }
                    this.getDispField(libId);
                }else{
                    this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                    });
                }
            });

        }
        mounted(){

        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/processManagement/moduleDutyDetail';
</style>