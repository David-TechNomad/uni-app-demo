<template>
    <section class="adjustorder">
        <div class="adjustHeader">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">文件管理</p>
            <span>生成顺序号</span>
            <el-button class="checkWay" @click="Goback">返回</el-button>
        </div>
        <div class="adjustTable">
            <div class="tableContainer">
                <div class="productFileNum">
                    <el-button class="checkWay" @click="upNumber"><i></i></el-button>
                    <el-button class="checkWay" @click="downNumber"><i></i></el-button>
                    <el-button class="checkWay" @click="NumTopage">页数转页次</el-button>
                    <!--<el-button class="checkWay" @click="pageTonum">页次转页数</el-button>-->
                </div>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        :height="tableHeight"
                        row-key="id"
                        style="width:100%"
                        :stripe="true"
                        @selection-change="handleSelectionChange"
                        border
                        class="containTable indexTable">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <template v-for="item in tableConfig">
                        <el-table-column v-if="item.fieldName!='ARCHIVE_STATUS'"  :label="item.caption" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'"  :width="item.width"></el-table-column>
                    </template>
                </el-table>
            </div>
        </div>
        <div class="adjustFooter">
            <el-button class="checkWay" @click="keepAndback">生成档号并保存</el-button>
            <el-button class="checkWay" @click="Goback">取消</el-button>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Sortable from 'sortablejs'
    import Service from './infileAdjust.service';
    import { Loading } from 'element-ui';

    @Component
    export default class adjustOrder extends Vue{
        tableHeight:number;
        tableData:any={};
        libId:number;
        tableConfig:any =[];
        fondId:number;
        ID:number;
        selection:any = [];
        kindId:number;
        wenId:number;
        loadingInstance:any;
        constructor(){
            super();
            this.tableHeight=document.documentElement.clientHeight-225;
            this.tableData=[];
            this.tableConfig = [];
            this.selection = [];
        };

        //获取列表头部信息
        gettableConfig(ID){
            Service.getDispField(ID).then(res=>{
                if(res.data.succeeded){
                    this.tableConfig = res.data.data;
                    this.getFondInSearchUrl({libId:this.wenId,anJuanIds:[this.ID]})
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //取页面数据
        getFondInSearchUrl(params){
            Service.getFondInSearchUrl(params).then(res=>{
                if(res.data.succeeded){
                    this.tableData = res.data.data;
                }else{
                    this.getError(res.data.errorMessage)
                };
            })
        };
        //生成档号
        generateDH(params){
            this['$confirm']('您是否要保存并生成档号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在生成，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                Service.generateDH(params).then(res=>{
                    if(res.data.succeeded){
                        // this['$confirm']('保存成功', '提示', {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        //     showCancelButton:false,
                        //     type: 'info'
                        // }).then(()=>{
                        //     this['$router'].go(-1)
                        // })
                        this.tableData = res.data.data;
                        this.Suces('保存成功。')
                    }else{
                        this.getError(res.data.errorMessage);
                    };
                    this.$nextTick(() => { this.loadingInstance.close();
                    });
                }).catch(()=>{
                    this['$message']({
                        type: 'info',
                        message: '已取消'
                    });
                });
            })
        }
        //行的拖拽
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            const _this = this;
            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.tableData.splice(oldIndex, 1)[0];
                    _this.tableData.splice(newIndex, 0, currRow);
                }
            })
        };

        //选中项
        handleSelectionChange(selection){
            this.selection = selection;
        };
        //向上调整
        upNumber(){
            if(this.selection.length>1){
                this.Warn("每次只能移动一条数据。")
            }else if(this.selection.length==1){
                var ind = null;
                var Id = this.selection[0].id;
                for(let key in this.tableData){
                    if(Id==this.tableData[key].id){
                        ind = key;
                    };
                };
                if(ind==0){
                    this.Warn('已经是当前页面第一条数据。')
                }else{
                    this.tableData.splice(ind,1);
                    this.tableData.splice(ind-1,0,this.selection[0])
                }
            }else{
                this.Warn("请选择数据。")
            }
        };
        //向下调整
        downNumber(){
            if(this.selection.length>1){
                this.Warn("每次只能移动一条数据。")
            }else if(this.selection.length==1){
                var ind = null;
                var Id = this.selection[0].id;
                for(let key in this.tableData){
                    if(Id==this.tableData[key].id){
                        ind = key;
                    };
                };
                if(ind==this.tableData.length-1){
                    this.Warn('已经是当前页面最后一条数据。')
                }else{
                    this.tableData.splice(ind/1,1);
                    this.tableData.splice(ind/1+1,0,this.selection[0])
                }
            }else{
                this.Warn("请选择数据。")
            }
        };
        //页数转页次
        NumTopage(){
            this['$confirm']('是否要进行页数转页次操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Service.PageTranslateByanJuan({anJuanLibId:this.wenId,anJuanId:this.ID}).then(res=>{
                    if(res.data.succeeded){
                        this.Suces("转换成功。")
                        this.getFondInSearchUrl({libId:this.wenId,anJuanIds:[this.ID]})
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }).catch(() => {

            });
        };
        pageTonum(){
            this['$confirm']('是否要进行页次转页数操作', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Service.NumTranslateByanJuan({anJuanLibId:this.wenId,anJuanId:this.ID}).then(res=>{
                    if(res.data.succeeded){
                        this.Suces("转换成功。");
                        this.getFondInSearchUrl({libId:this.wenId,anJuanIds:[this.ID]})
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }).catch(() => {

            });
        };
        //不保存并返回
        Goback(){
            this['$router'].go(-1);
        };
        //保存并返回
        keepAndback(){
            this.generateDH({
                libId:this.libId,
                data:this.tableData
            })
        }
        created(){
            var str = window.sessionStorage.getItem('infileAdjust');
            var obj = JSON.parse(str)
            // this.libId = this['$route'].query.lib/1;
            // this.fondId = this['$route'].query.fond/1;
            // this.ID = this['$route'].query.id/1
            // this.kindId= this['$route'].query.kind/1;
            // this.wenId = this['$route'].query.wenId/1;
            this.libId = obj.lib/1;
            this.fondId = obj.fond/1;
            this.ID = obj.id/1
            this.kindId= obj.kind/1;
            this.wenId = obj.wenId/1;
            this.gettableConfig(this.libId)
        };
        mounted():void{
            window["addEventListener"]("resize",()=>{
                this.tableHeight=document.documentElement.clientHeight-225
            });
            this.rowDrop();
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

<style lang="scss" scoped>
    @import '../../../../../styles/fileManage/infileAdjustStyle.scss';
</style>