<template>
    <section class="WjDetail">
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    文件详情
                    <div class="titleSect"></div>
                </div>
            </div>
            <div class="GoBack"><el-button class="checkWay" @click="back">返回</el-button></div>
            <div class="fixModal">
                <div class="formList">
                    <div class="rowBox">
                        <div :visible.sync="addFileTrue" class="myDialog" :close-on-click-modal="false">
                            <el-form  class="addfile" :model="addfile" label-width="150px" ref="addfile">
                                <template v-for="item in addArray">
                                    <el-form-item  :label="item.caption+' :'" :prop="item.fieldName" v-if="item.editControl==2||item.editControl==8">
                                        <el-input :readonly="true" v-model="addfile[item.fieldName]"></el-input>
                                    </el-form-item>
                                    <el-form-item  :label="item.caption+' :'" :prop="item.fieldName" v-if="item.editControl==3">
                                        <el-select v-model="addfile[item.fieldName]">
                                            <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="true"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9" :prop="item.fieldName">
                                        <el-input :readonly="true" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]"></el-input>
                                    </el-form-item>
                                </template>
                            </el-form>
                        </div>
                    </div>
                </div>
                <div class="singleDiv">
                    <div class="p1">
                        原文挂接
                        <el-button class="checkWay"  style="float:right;margin:5px 0;" @click="clickBook" v-show="clickBookShow">原文列表</el-button>
                    </div>
                    <div class="divBoxs" v-show="listDiv">
                        <div class="div1 scrollFiles">
                            <div class="pImg" v-for="(item,index) in imgList" :key="index">
                                <div class="ImgClass" style="width:100%">
                                    <img v-if="z_extension(item.extension)&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">
                                    <img v-if="z_extension1(item.extension)&&item.convertFlag&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">
                                    <img v-if="z_extension(item.extension)&&!item.thumbnailFlag" src="../../../imgs/noPic.jpg" alt="" @dblclick="open(item.guid,item.extension)">
                                    <img v-if="z_extension1(item.extension)&&!item.convertFlag" src="../../../imgs/noPic.jpg" alt=""  @dblclick="open1()">
                                    <img v-if="z_extension1(item.extension)&&item.thumbnailFlag&&!item.convertFlag" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="" @dblclick="open(item.guid,item.extension)">
                                    <img v-if="z_extension1(item.extension)&&!item.thumbnailFlag&&item.convertFlag" src="../../../imgs/noPic.jpg" alt="" @dblclick="open(item.guid,item.extension)">

                                    <!--<img v-if="ISpdf(item.extension)&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">-->
                                    <!--<img v-if="ISpdf(item.extension)&&item.convertFlag&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">-->
                                    <!--<img v-if="ISpdf(item.extension)&&!item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" src="../../../imgs/noPic.jpg" alt="">-->
                                    <!--<img v-if="ISpdf(item.extension)&&!item.thumbnailFlag&&!item.convertFlag" src="../../../imgs/noPic.jpg" alt="">-->
                                    <!--<img v-if="ISpdf(item.extension)&&item.thumbnailFlag&&!item.convertFlag" src="../../../imgs/noPic.jpg" alt="">-->
                                    <!--<img v-if="ISpdf(item.extension)&&!item.thumbnailFlag&&item.convertFlag" @dblclick="open(item.guid,item.extension)" src="../../../imgs/noPic.jpg" alt="">-->
                                </div>
                                <div class="p2">{{item.title+'.pdf ' }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="divBoxs" v-show="contentDiv">
                        <div class="div1" >
                            <iframe id='previewPdf' :src="file" height="100%"
                                    width="100%">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './WjDetail.service';
    import HttpRequest from '@/api/request';
    @Component
    export default class WjDetail extends Vue{
        urlImg:any;
        listDiv:boolean;
        contentDiv:boolean;
        clickBookShow:boolean;
        file:any;
        fileUrl:any;
        basicForm : any = {};
        imgList : any = {};
        addfile:any = {};
        addArray:any = {};
        libId:number;
        SrcId:number;
        type:number;
        constructor(){
            super();
            this.listDiv = true;
            this.contentDiv = false;
            this.clickBookShow = false;
            this.basicForm = {};
            this.addfile={};
            this.addArray={};
            this.file = null;
            this.fileUrl = null;
            this.urlImg = HttpRequest['imgUrl'];
        };
        back():void{
            this['$router'].go(-1);
        };
        openOriginal(){
            this.listDiv = true;
        };
        // 切换原文状态
        clickBook(){
            this.contentDiv = false;
            this.listDiv = true;
            this.clickBookShow = false;
        }
        // 转化文件流
        getObjectURL(file) {
            let url = null;
            if (window['createObjectURL'] != undefined) { // basic
                url = window['createObjectURL'](file);
            } else if (window['createObjectURL'] != undefined) { // webkit or chrome
                url = window['webkitURL']['createObjectURL'](file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL['createObjectURL'](file);
            }
            return url;
        };
        z_extension(str){//判断是否是PDF
            if(str.toLowerCase() == 'pdf'){
                return true
            }
            return false;
        }
        z_extension1(str){
            if(str.toLowerCase() != 'pdf'){
                return true
            }
            return false;
        }
        // 转化未完成
        open1(){
            this['$message']({
                message: '此文件非pdf格式，无法在线预览，请下载查看。',
                type: 'warning'
            });
        }
        // 双击打开pdf
        open(guid,item){
             console.log(guid,item)
            this.clickBookShow = true;
            this.listDiv = false;
            this.contentDiv = true;
            let params = {
                originalGuid:guid,
                preview:true
            };
            if(item.toLocaleString()==='pdf'){
                Service.displayPdf(params).then((res) =>{
                    this.fileUrl = this.getObjectURL(res);
                    this.file = 'static/pdf/web/viewer.html?file=' + this.fileUrl;
                });
            }else{
                Service.displayToPdf(params).then((res) =>{
                    this.fileUrl = this.getObjectURL(res);
                    this.file = 'static/pdf/web/viewer.html?file=' + this.fileUrl;
                });
            }
        }
        created(){
            var str = window.sessionStorage.getItem('ToWjDetail');
            var obj = JSON.parse(str);
            this.libId = obj.Srclib;
            this.SrcId = obj.SrcId;
            this.type = obj.type;
            this.getOne();
            Service.getOriginals({
                libId: this.libId,
                archiveId:this.SrcId
            }).then(res=>{
                if(res.data.data){
                    this.imgList = res.data.data;
                }else{
                    this.imgList = [];
                }
            });
        };
        mounted(){

        }
        getOne(){
            Service.getNumber({libId:this.libId,id:this.SrcId}).then(res=>{
                if(res.data.succeeded){
                    var obj=JSON.stringify(res.data.data);
                    this.addfile=JSON.parse(obj);
                    let num = res.data.data.PHASE;
                    if(num==1){
                        Service.getEditField(this.libId).then(res=>{
                            if(res.data.succeeded){
                                this.addArray = res.data.data;
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else if(num==2){
                        Service.getEditDeploy(this.libId).then(res=>{
                            if(res.data.succeeded){
                                this.addArray = res.data.data;
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else if(num==4){
                        Service.getEditField4(this.libId).then(res=>{
                            if(res.data.succeeded){
                                this.addArray = res.data.data;
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
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
    @import '../../../styles/selfTip/eleTransferDetail';
</style>