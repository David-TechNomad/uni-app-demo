<template>
    <section>
        <div class="checkTitle">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000">文件管理</p>
            <span>档号筛查</span>
            <el-button class="checkWay" @click="goback" style="margin-left: 5px">返回</el-button>
            <el-button class="checkWay" @click="SaveNotes">保存</el-button>
        </div>
        <div class="checkTable">
            <div class="tableCaption">查找结果共<span>{{Total}}</span>条</div>
            <el-table
                    :data="data"
                    style="width: 100%"
                    :stripe="true"
                    tooltip-effect="dark"
                    class="containTable indexTable"
                    @selection-change="selectionChange"
                    v-loading="isLoading"
                    border
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="libRankText" label="档案类型" width="120px"></el-table-column>
                <el-table-column prop="problemTypeText" label="筛查结果" width="120px"></el-table-column>
                <el-table-column prop="archiveCode" label="档号" width="240px"></el-table-column>
                <el-table-column prop="duplicateCount" label="重复条数" width="120px"></el-table-column>
                <el-table-column prop="note" label="备注">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.note"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './check.service'
    import { Loading } from 'element-ui';
    @Component
    export default class check extends Vue{
        kindId: number;
        fondId: number;
        data: any = [];//表格数据
        searchContent: any = [];//要搜索的内容
        isLoading:boolean;
        oldArr:any=[];
        type:number;
        loadingInstance:any;
        Total:number;
        constructor(){
            super();
            this.kindId = null;
            this.fondId = null;
            this.data = [];
            this.searchContent = [];
            this.isLoading = false;
            this.oldArr = [];
        };
        selectionChange(selection){
            console.log(selection)
        };
        //档号筛查
        Checkdh():void{
            this.isLoading = true;
            setTimeout(()=>{this.isLoading=false},2500)
            if(this.type==1){
            Service.checkDH({fondId:this.fondId,kindId:this.kindId,conditions:this.searchContent}).then(res=>{
                if(res.data.succeeded){
                   var arr = JSON.stringify(res.data.data)
                    this.data = JSON.parse(arr);
                   this.oldArr = JSON.parse(arr);
                   this.Total = res.data.data.length
                }else{
                    this.getError(res.data.errorMessage);
                }
            });}else{
                Service.checkDHW({fondId:this.fondId,kindId:this.kindId,conditions:this.searchContent}).then(res=> {
                    if (res.data.succeeded) {
                        var arr = JSON.stringify(res.data.data)
                        this.data = JSON.parse(arr);
                        this.oldArr = JSON.parse(arr);
                        this.Total = res.data.data.length
                    } else {
                        this.getError(res.data.errorMessage);
                    }
                })
            }
        };
        //备注的保存
        SaveNotes():void{
            this.loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在保存，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            var arr = [];
            let data = this.data;
            let olddata = this.oldArr;
            for(var key in data){
                if(data[key].note!=''&&data[key].note!=olddata[key].note){
                    var obj = {itemState:2,id:data[key].id,note:data[key].note};
                    arr.push(obj);
                };
            };
            Service.CheckDhNotes(arr).then(res=>{
                if(res.data.succeeded){
                    this.Suces('保存成功。');
                }else{
                    this.getError(res.data.errorMessage)
                }
                this.$nextTick(() => { this.loadingInstance.close();
                });
            })
        }
        created(){
            var str = window.sessionStorage.getItem('check');
            var obj = JSON.parse(str);
            this.kindId=obj.kind/1;
            this.fondId=obj.fond/1;
            this.type=obj.type/1;
            if(obj.search){
                this.searchContent = obj.search;
            }
            // this.kindId=this['$route'].query.kind/1;
            // this.fondId=this['$route'].query.fond/1;
            // this.type=this['$route'].query.type/1;
            // if(this['$route'].query.search){
            //     var arr = this['$route'].query.search;
            //     this.searchContent = JSON.parse(arr);
            // }
            this.Checkdh();
        };

        //返回
        goback(){
            this['$router'].go(-1);
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
    }
</script>

<style scoped lang="scss">
    @import '../../../../styles/fileManage/check.scss';
</style>