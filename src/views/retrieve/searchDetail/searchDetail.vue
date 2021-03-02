<template>
    <section>
        <div class="mainTitle">
            <span>档案详情</span>
        </div>
        <div class="GoBack"><el-button class="checkWay" @click="back">返回</el-button></div>
        <div class="bianjiModal">
            <div class="formList">
                <div class="rowBox">
                    <div :title="redactFile?'编辑案卷':'新增案卷'" :visible.sync="addFileTrue" class="myDialog" :close-on-click-modal="false">
                        <el-form  class="addfile" :model="addfile" label-width="100px" ref="addfile">
                            <template v-for="item in addArray">
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==1">
                                    <el-button class="checkWay">{{item.caption}}</el-button>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==2" :prop="item.fieldName">
                                    <el-input :readonly="true" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==10" :prop="item.fieldName" >
                                    <el-date-picker :readonly="true" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" @change="getSTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8" :prop="item.fieldName" >
                                    <el-input  :readonly="true" v-model.number="addfile[item.fieldName]" type="number" min = "0" :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3" :prop="item.fieldName" >
                                    <el-input :readonly="true" v-model="addfile[item.fieldName]"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9" :prop="item.fieldName">
                                    <el-input :readonly="true" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                            </template>
                        </el-form>
                    </div>
                </div>
             </div>
            <div class="singleDiv">
                <div style="width:100%;height:100%;" v-show="pdfRight">
                    <div class="p1">
                        原文展示
                        <el-button class="checkWay"  style="float:right;margin:5px 0;" @click="clickBook" v-show="clickBookShow">原文列表</el-button>
                    </div>
                    <div class="divBoxs" v-show="listDiv">
                        <div class="div1 scrollFiles">
                            <div class="pImg" v-for="(item,index) in imgList" :key="index">
                                <div class="ImgClass" :class='{selectPdfColor:index==nowIndex}' style="width:100%">
                                    <img v-if="item.extension==='pdf'&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">
                                    <img v-if="item.extension!=='pdf'&&item.convertFlag&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">
                                    <img v-if="item.extension==='pdf'&&!item.thumbnailFlag" src="../../../imgs/noPic.jpg" alt="" @dblclick="open(item.guid,item.extension)">
                                    <img v-if="item.extension!=='pdf'&&!item.thumbnailFlag&&!item.convertFlag" src="../../../imgs/noPic.jpg" alt=""  @dblclick="open1()">
                                    <img v-if="item.extension!=='pdf'&&item.thumbnailFlag&&!item.convertFlag" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="" @dblclick="open1()">
                                    <img v-if="item.extension!=='pdf'&&!item.thumbnailFlag&&item.convertFlag" src="../../../imgs/noPic.jpg" alt="" @dblclick="open(item.guid,item.extension)">
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
    import Service from './searchDetail.service';
    import HttpRequest from '@/api/request';
    @Component
    export default class appfileManagement extends Vue{
        urlImg:any;
        listDiv:boolean;
        contentDiv:boolean;
        redactFile:boolean;
        clickBookShow:boolean;
        centerDialogVisibleTree : boolean;
        pdfRight:boolean;
        total : number;
        newFilesIds: number;
        crcsCalculated: number;
        archiveId : any;
        nowIndex: number;
        deleteID: number;
        fondId: number;
        kinId : number;
        bids : number;//案卷库libId
        pageSize : number;
        addFileName:string;
        // addFileType:string;
        addFileTitle:string;
        mj : number;
        lens : number;
        nd: number;
        parentId: number;
        qzh : string;
        Id : number;
        fileUrl:any;
        imgList : any = {};
        prepareBlob: any = {};
        fileSingle: any = {};
        bytesPerChunk:any;//总速率;
        addFileTrue : boolean;
        arvhiveId : number;
        OrderNum : number;
        basicForm : any = {};
        EditArr:any={};
        loadingInstance:any={};
        // 预上传全部list
        jsonVersionOfNewFiles :any = {};
        documentTableData :any = [];
        arrsStart: any = [];
        pageList: any = [];
        file:any;
        wenId:number;//案卷内的libId
        addfile:any={};
        fileList :  any = {}
        addArray : any = [];
        isProjectCompany:boolean;
        projectCodearr:any=[];
        projectNamearr:any=[];
        $refs: { uploader: HTMLFormElement};
        QZHArr:any=[];
        constructor(){
            super();
            this.clickBookShow = false;
            this.deleteID = null;
            this.listDiv = true;
            this.centerDialogVisibleTree = false;
            this.pdfRight = true;
            this.qzh = "";
            this.nowIndex = -1;
            this.archiveId = null;
            // this.addFileType = '';
            this.file = '';
            this.fileUrl = '';
            this.addFileName = '';
            this.addFileTitle = '';
            this.newFilesIds = 0;
            this.jsonVersionOfNewFiles = {};
            this.crcsCalculated = 0;
            this.redactFile=false;
            this.contentDiv = false;
            this.basicForm = {};
            this.addFileTrue = true;
            this.bytesPerChunk = null;
            this.addArray = [];
            this.documentTableData = [];
            this.arrsStart = [];
            this.addfile={};
            this.EditArr={};
            this.fileSingle = {};
            // this.pageList=[
            //     { label:'原文',value:'ArchiveFile'},
            //     { label:'附件',value:'ArchiveAttachmentFile'},
            // ];
            this.loadingInstance = null;
            this.prepareBlob = {
                yes:true
            };
            this.urlImg = HttpRequest['imgUrl'];
            this.projectCodearr=[];
            this.projectNamearr=[];
            this.QZHArr=[];
        }
        back():void{
            this['$router'].go(-1);
        };

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
        // 双击打开pdf
        open(guid,item){
                this.clickBookShow = true;
                this.listDiv = false;
                this.contentDiv = true;
                let params = {
                    originalGuid:guid,
                    preview:true
                };
                if(item==='pdf'){
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
         openOriginal(){
            this.listDiv = true;
            this.contentDiv = false;
         };
           //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
            //列表数据配置
        getListNumber(params:any){
               Service.FileSearch(params).then(res=>{
                   console.log(res,654)
                   if(res.data.succeeded){
                       this.fileList=res.data.data;
                       this.total=res.data.totalRecords;
                       this.pageSize=res.data.pageSize;
                   }else{
                       this.getError(res.data.errorMessage)
                   }
               })
          };
        repeatTwo(){
               Service.getEditField(this.bids).then(res=>{
                        if(res.data.succeeded){
                            this.addArray=res.data.data;
                               this.addfile={};
                            for(var item of res.data.data){
                                //this.addfile[item.fieldName]='';
                                this['$set'](this.addfile,item.fieldName,null)
                            }
                             this.addfile.QZH=this.qzh;
                        }else{
                            this.getError(res.data.errorMessage)
                        }
                    })
        }
        b64DecodeUnicode(str) {
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }

        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };

        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };

        // 切换原文状态
        clickBook(){
            this.contentDiv = false;
            this.listDiv = true;
            this.clickBookShow = false;
        }
        open1(){
            this['$message']({
                message: '文件尚未转化成功，暂时无法查看',
                type: 'warning'
            });
        }
         mounted(){
             var str = JSON.parse(window.sessionStorage.getItem('searchToDetail'));
             this.bids = str.libId;
             this.archiveId = str.archiveId;
             if(str.MJ=='1'){
                 this.pdfRight = true;
                 Service.getOriginals({libId:Number(this.bids),archiveId:Number(this.archiveId)}).then(res=>{
                     if(res.data.succeeded&&res.data.data){
                         this.imgList = res.data.data;
                     }else{
                         this.imgList = [];
                     }
                 });
             }else{
                 // 右侧pdf
                 this.pdfRight = false;
             }

             // 左侧信息
             Service.getEditField(this.bids).then(res=>{
                     if(res.data.succeeded){
                         this.addArray=res.data.data;
                         this.addfile={};
                         for(var item of this.addArray){
                             item['allowEdit']=false;
                             this['$set'](this.addfile,item.filedName,null)
                         }
                         this.addfile.QZH=this.qzh;
                         this.addfile.DQQZH=this.qzh;
                         Service.getNumber({libId:this.bids,id:this.archiveId}).then(res=>{
                             if(res.data.succeeded){
                                 var obj=JSON.stringify(res.data.data);
                                 this.addfile=JSON.parse(obj)
                                 this.addfile.MJ = res.data.data.MJ_Text;
                                 this.addfile.HOUSETYPE = res.data.data.HOUSETYPE_Text;
                                 this.addfile.BGQX = res.data.data.BGQX_Text;
                                 this.EditArr=res.data.data;
                             }else{
                                 this.getError(res.data.errorMessage)
                             }
                         })
                     }else{
                         this.getError(res.data.errorMessage)
                     }
                 })
         };

        projectCodechange(item){
            this.addfile.XMMCNEW = item.projectName;
        };
        projectNamechange(item){
            this.addfile.XMBH = item.projectCode;
        }
    };

</script>

<style lang="scss" scoped>
    @import '../../../styles/fileManage/addInfile';
</style>