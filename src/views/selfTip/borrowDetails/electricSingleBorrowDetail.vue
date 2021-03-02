<template>
    <section>
        <div class="mainTitle">
            <p class="lt">文档详情</p>
            <div class="rt">
                <el-button class="checkWay" @click="back">返回</el-button>
            </div>
        </div>
        <div class="fixModal">
            <el-form :model="basicForm" class="singleForm" label-width="120px">
                <el-form-item class="tr1" label="全宗号" ref="things"  prop="things">DCXM002
                </el-form-item>
                <el-form-item class="tr2" label="档号" ref="things"  prop="things">DCXM002-2013-01-YJ-0002
                </el-form-item>
                <el-form-item class="tr1" label="卷内顺序号" ref="things"  prop="things">
                </el-form-item>
                <el-form-item class="tr2" label="文件标题" ref="things"  prop="things">项目立项批文
                </el-form-item>
                <el-form-item class="tr1" label="文件编号" ref="things"  prop="things">京发改【2013】425号
                </el-form-item>
                <el-form-item class="tr2" label="责任者" ref="things"  prop="things">北京万方置业有限公司
                </el-form-item>
                <el-form-item class="tr1" label="其他责任者" ref="things"  prop="things">北京市发展和改革委员会，北京市住房和城乡建设委员会
                </el-form-item>
                <el-form-item class="tr2" label="附件" ref="things"  prop="things">
                </el-form-item>
                <el-form-item class="tr1" label="项目名称" ref="things"  prop="things">北京通州万达广场
                </el-form-item>
                <el-form-item class="tr2" label="项目编号" ref="things"  prop="things">BJ4
                </el-form-item>
                <el-form-item class="tr1" label="所属部门" ref="things"  prop="things">行政部
                </el-form-item>
                <el-form-item class="tr2" label="页数" ref="things"  prop="things">0
                </el-form-item>
                <el-form-item class="tr1" label="页次" ref="things"  prop="things">北京通州万达广场
                </el-form-item>
                <el-form-item class="tr2" label="文件日期" ref="things"  prop="things">2013-03-18
                </el-form-item>
                <el-form-item class="tr1" label="分类号" ref="things"  prop="things">01
                </el-form-item>
                <el-form-item class="tr2" label="年度" ref="things"  prop="things">2013
                </el-form-item>
                <el-form-item class="tr1" label="密级" ref="things"  prop="things">机密
                </el-form-item>
                <el-form-item class="tr2" label="保管期限" ref="things"  prop="things">永久
                </el-form-item>
                <el-form-item class="tr1" label="实体份数" ref="things"  prop="things">1
                </el-form-item>
                <el-form-item class="tr2" label="OA流程名称" ref="things"  prop="things">
                </el-form-item>
                <el-form-item class="tr1" label="关键词" ref="things"  prop="things">
                </el-form-item>
                <el-form-item class="tr2" label="备注" ref="things"  prop="things">
                </el-form-item>
                <el-form-item class="tr1" label="档案当前所属全宗号" ref="things"  prop="things">DCXM002
                </el-form-item>
                <el-form-item class="tr2" label="原文数量" ref="things"  prop="things">5
                </el-form-item>
            </el-form>
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
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowDetails.service';
    @Component
    export default class appelectricSingleBorrowDetail extends Vue{
        listDiv:boolean;
        contentDiv:boolean;
        constructor(){
            super();
            this.listDiv = true;
            this.contentDiv = false;
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
    @import '../../../styles/borrowDetails/electricSingleBorrowDetail';
</style>