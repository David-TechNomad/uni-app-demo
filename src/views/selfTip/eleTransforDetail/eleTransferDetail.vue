<template>
    <section>
         <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    档案详情
                    <div class="titleSect"></div>
                </div>
            </div>
             <div class="fixModal">
                <!-- <el-form-item class="tr1" label="全宗号" ref="things"  prop="things"><span>DCXM002</span>
                </el-form-item>
                <el-form-item class="tr1" label="档号" ref="things"  prop="things"><span>DCXM002-2013-01-YJ-0002</span>
                </el-form-item>
                <el-form-item class="tr1" label="卷内顺序号" ref="things"  prop="things"><span>DCXM002-2013-01-YJ-0002</span>
                </el-form-item>
                <el-form-item class="tr1" label="文件标题" ref="things"  prop="things"><span>项目立项批文</span>
                </el-form-item>
                <el-form-item class="tr1" label="文件编号" ref="things"  prop="things"><span>京发改【2013】425号</span>
                </el-form-item>
                <el-form-item class="tr1" label="责任者" ref="things"  prop="things"> <span>北京万方置业有限公司</span>
                </el-form-item>
                <el-form-item class="tr1" label="其他责任者" ref="things"  prop="things"> <span>北京市发展和改革委员会，北京市住房和城乡建设委员会</span>
                </el-form-item>
                <el-form-item class="tr1" label="附件" ref="things"  prop="things"> <span>北京市发展和改革委员会，北京市住房和城乡建设委员会</span>
                </el-form-item>
                <el-form-item class="tr1" label="项目名称" ref="things"  prop="things"> <span>北京通州万达广场</span>
                </el-form-item>
                <el-form-item class="tr1" label="项目编号" ref="things"  prop="things"> <span>北京通州万达广场</span>
                </el-form-item>
                <el-form-item class="tr1" label="所属部门" ref="things"  prop="things"> <span>行政部</span>
                </el-form-item>
                <el-form-item class="tr1" label="页数" ref="things"  prop="things"><span>0</span>
                </el-form-item>
                <el-form-item class="tr1" label="页次" ref="things"  prop="things"> <span>北京通州万达广场</span>
                </el-form-item>
                <el-form-item class="tr1" label="文件日期" ref="things"  prop="things"> <span>2013-03-18</span>
                </el-form-item>
                <el-form-item class="tr1" label="分类号" ref="things"  prop="things"> <span>01</span>
                </el-form-item>
                <el-form-item class="tr1" label="年度" ref="things"  prop="things"> <span>2013</span>
                </el-form-item>
                <el-form-item class="tr1" label="密级" ref="things"  prop="things"> <span>机密</span>
                </el-form-item>
                <el-form-item class="tr1" label="保管期限" ref="things"  prop="things"> <span>永久</span>
                </el-form-item>
                <el-form-item class="tr1" label="实体份数" ref="things"  prop="things"> <span>1</span>
                </el-form-item>
                <el-form-item class="tr1" label="OA流程名称" ref="things"  prop="things"> <span>123</span>
                </el-form-item>
                <el-form-item class="tr1" label="关键词" ref="things"  prop="things"> <span>关键词</span>
                </el-form-item>
                <el-form-item class="tr1" label="备注" ref="things"  prop="things"> <span>备注</span>
                </el-form-item>
                <el-form-item class="tr1" label="档案当前所属全宗号" ref="things"  prop="things"> <span>DCXM002</span>
                </el-form-item>
                <el-form-item class="tr1" label="原文数量" ref="things"  prop="things"> <span>5</span>
                </el-form-item> -->
                <div class="formList">
                <div class="rowBox">
                  <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                   <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                   <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">标题：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                  <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">申请人：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">部门</span></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><div class="grid-content bg-purple"><span class="span1">接收单位：</span></div></el-col>
                  <el-col :span="13"><div class="grid-content bg-purple-light" style="border-right:0"><span class="span2">投资单位</span></div></el-col>
                </el-row>
                </div>
                
                </div>
            <div class="singleDiv" v-show="listDiv">
                <p class="p1">原文预览</p>
                <div class="div1" @dblclick="open()">       
                </div>
                <div class="div11">
                       <el-button class="checkWay" @click="back">打印</el-button>
                       <el-button class="checkWay" @click="back">下载</el-button>
                </div>
                <p class="p2">文件标题1.PDF</p>
                <div class=div2  @dblclick="open()">

                </div>
                <p class="p3">文件标题2.PDF</p>
                <div class="div22">
                       <el-button class="checkWay" @click="back">打印</el-button>
                       <el-button class="checkWay" @click="back">下载</el-button>
                </div>
            </div>
            <div class="contentDiv" v-show="contentDiv">
                <p class="p1">文件标题2.PDF</p>
                <div class="contentDiv2">
                       <el-button class="checkWay" @click="openOriginal">原文列表</el-button>
                       <el-button class="checkWay" @click="back">下载</el-button>
                       <el-button class="checkWay" @click="back">打印</el-button>
                </div>
               <div class="contentDiv1">

               </div>
            </div>
        </div>
          </div>
       
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
        basicForm : any = {};
        constructor(){
            super();
            this.listDiv = true;
            this.contentDiv = false;
            this.basicForm = {}
        }
        back():void{
            this['$router'].go(-1);
        };
        open(){
            this.listDiv = false;
            this.contentDiv = true;
         }
         openOriginal(){
            this.listDiv = true;
            this.contentDiv = false;
         }
    };

</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/eleTransferDetail';
</style>