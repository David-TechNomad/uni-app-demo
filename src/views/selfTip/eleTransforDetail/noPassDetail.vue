<template>
    <section>
         <el-dialog class="fixModal" title="档案详情" :visible.sync="fileVisible" @close="closeDiolog()">
            <div class="DioformList">
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple" style="border-top:1px solid #ccc"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-top:1px solid #ccc"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                   <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                   <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="10"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="14"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                </div>
                 <div class="closeBtn"><el-button class="checkWay" @click="closeAll()">关闭</el-button></div>
    </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './eleTransferDetail.service';
    @Component
    export default class appelectricSingleBorrowDetail extends Vue{
        listDiv:boolean;
        contentDiv:boolean;
        fileVisible : boolean;
        basicForm : any = {};
        constructor(){
            super();
            this.listDiv = true;
            this.contentDiv = false;
            this.fileVisible = true;
            this.basicForm = {}
        }
        back():void{
            this['$router'].go(-1);
        };
         closeDiolog(){
                  this['$router'].push({
                        path:'/selfTip/transfer/changeTransforDetail',
                        name:'档案移交申请修改',
                        })
         }
         closeAll(){
                  this['$router'].push({
                        path:'/selfTip/transfer/changeTransforDetail',
                        name:'档案移交申请修改',
                        })
         }
    };

</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/noPassDetail';
</style>