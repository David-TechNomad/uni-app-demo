<template>
    <section>
        <div class="mainTitle">新增项目档案</div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow">
                <div class="btnDiv">
                    <el-button class="checkWay" @click="back">返回</el-button>
                </div>
                <div class="left">
                    <div class="leftTop">
                        <el-form :model="basicForm" class="singleForm" label-width="150px" label-position="left">
                            <el-form-item class="tr1" label="分区" ref="things"  prop="things"><el-select class="checkName percentName"></el-select>
                            </el-form-item>
                            <el-form-item class="tr1" label="项目公司" ref="things"  prop="things"><el-select class="checkName percentName"></el-select>
                            </el-form-item>
                            <el-form-item class="tr1" label="城市公司行政经理/主管" ref="things"  prop="things">DCXM002
                            </el-form-item>
                            <el-form-item class="tr1" label="万信号" ref="things"  prop="things"><el-select class="checkName percentName"></el-select>
                            </el-form-item>
                            <el-form-item class="tr1" label="项目名称" ref="things"  prop="things">DCXM002
                            </el-form-item>
                            <el-form-item class="tr1" label="万达广场行政经理/主管" ref="things"  prop="things">DCXM002
                            </el-form-item>
                            <el-form-item class="tr1" label="万信号" ref="things"  prop="things">
                            </el-form-item>
                            <el-form-item class="tr1" label="是否移交集团 总部经营档期" ref="things"  prop="things"><el-select class="checkName percentName"></el-select>
                            </el-form-item>
                            <el-form-item class="tr1" label="案卷数量" ref="things"  prop="things">DCXM002
                            </el-form-item>
                            <el-form-item class="tr1" label="类型" ref="things"  prop="things"><el-select class="checkName percentName"></el-select>
                            </el-form-item>
                            <el-form-item class="tr1" label="开业时间" ref="things"  prop="things">DCXM002
                            </el-form-item>
                            <el-form-item class="tr1" label="结束时间" ref="things"  prop="things">DCXM002
                            </el-form-item>
                            <el-form-item class="tr1" label="备注" ref="things"  prop="things">DCXM002
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="leftBottom">
                        <el-button class="checkWay" @click="back">重置</el-button>
                        <el-button class="checkWay" @click="back">保存</el-button>
                    </div>
                </div>
                <div class="right">
                    <div class="rightTop">
                        <span>项目目录数据</span>
                    </div>
                    <div class="rightMiddle">

                    </div>
                    <div class="rightBottom">
                        文件标题1.PDF
                    </div>
                </div>
                <div class="bigRightBottom">
                    <el-button class="checkWay" @click="back">上传</el-button>
                    <el-button class="checkWay" @click="back">删除</el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Service from './reportStatistics.service'
    @Component
    export default class appreportStatistics extends Vue {
        filters : any = {};
        constructor(){
            super();
            this.filters = {
                projectName:'',
                projectCompany:'',
                wanXinNum:'',
            };
        }

        addSomeThing(){
            this['$router'].push({
                path:'/selfTip/borrowDetails/electronBorrowDetails',
                name:'新增项目档案',
                //params:{ id: searchKey }
            });
        }
        back():void{
            this['$router'].go(-1);
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/static/projectDocument.scss';
</style>