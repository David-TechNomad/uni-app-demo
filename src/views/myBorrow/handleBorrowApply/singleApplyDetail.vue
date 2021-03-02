
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>档案查阅审批详情</span>
           <el-button class="defaultBtn rt mt10" @click="toHandleApplyDetail" >返回</el-button>        
        </div> 
        <div class="contentbox contentbox-full " :class="passedActiveName == '0'?'bt50':''" style="overflow:hidden;"> 
            <div class="leftDiv" >
                    <!-- v-if="oriFile.length==0" -->
                <div  class="noFileDiv">
                    <div class="pdfbox boxshow" v-show="singleAttachedFileFlag">
                        <div class="absolute r15">
                            <el-button class="defaultBtn"  style="float:right;margin:5px 0;" @click="showOriList" v-show="oriListBtnVisible">原文列表</el-button>          
                        </div>
                        <div  v-show="listDiv" style="height:100%;">
                            <div class="div1 scrollFiles">
                                <div class="pImg" v-for="(item,index) in imgList" :key="index">
                                    <div class="ImgClass" :class='{selectPdfColor:index==nowIndex}' style="bottom:70px;">
                                        <img :id="'thumbnail'+index" @click="clickIcon(item, index)" @dblclick="open(item.guid,item.extension,item.efileType,item.convertStatus)" :src="noPic" alt="">
                                    </div>                          
                                    <div class="p2">{{item.title+'.'+item.extension }}</div>                          
                                </div>
                            </div>
                        </div>
                        <div v-show="contentDiv" style="height:100%;margin-top:40px;">
                            <div class="div1" >
                                <iframe id='previewPdf' :src="file" height="100%"
                                    width="100%">
                                </iframe>
                            </div>
                        </div> 
                        <!-- 视屏播放 -->
                        <div class="videoView" v-show="videoContentDiv">
                            <!-- <div id="video" style="width: 100%; height: 400px;max-width: 600px;"></div> -->
                            <video :src="videoSrc" controls="controls" controlsList="nodownload">
                                您的浏览器不支持 video 标签。
                            </video>
                        </div>             
                    </div>  
                    <!-- 没有电子原文时 -->
                    <div v-show="!singleAttachedFileFlag" style="position: relative; top: 50%; transform: translateY(50%); left: 40%;" >  
                        <!-- 实体：显示挂接电子原文 -->
                        <span v-if="singleFlag==1">无电子原文</span><el-button v-if="singleFlag==1" class="defaultBtn" @click="showSingleUploadFile">挂接电子原文</el-button>

                        <!-- 电子： arcStatus为1 显示 【申请出库】，arcStatus为5 显示【接收】,arcStatus为3,显示【挂接原文】 -->
                        <el-button v-if="outBtnVisible" class="defaultBtn" @click="borrowReceiveArchive">申请出库</el-button>
                        <el-button v-if="inBtnVisible" class="defaultBtn" @click="borrowReceiveArchive">接收</el-button>
                        <span v-if="singleFlag==0 && singleArcStatus==2">
                            <span >无电子原文</span> <el-button class="defaultBtn" @click="showSingleUploadFile">挂接电子原文</el-button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="rightDiv">
                <div>
                    <span class="divTitle">审批流程</span>
                    <div class="rightPro"  >
                        <el-steps direction="vertical" :active="passedObj.infoProcessList.length+1">
                            <el-step :title="setTitle()" description="提交申请"></el-step>  
                            <el-step v-for="step in utilizeProcesses" :title="setTitle(step)" :description="setDescription(step)"></el-step>
                        </el-steps>
                    </div>
                </div>
                <div class="bottomDiv formData" >
                    <span class="divTitle">当前审批节点</span>
                    <el-form   label-width="110px" class="doneForm topParamsForm ">
                        <el-form-item label="审批人" prop="name">
                            {{operUserName}}
                        </el-form-item>
                        <el-form-item label="审批意见" prop="resource">
                            <el-radio-group  v-model="singleAuditResult" size="small" :disabled="passedActiveName == '1'">
                                    <el-radio :label="1" >通过</el-radio>
                                    <el-radio :label="2" >驳回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="查阅类型" prop="resource">
                            <!-- 如果是已审批，或者有流程信息的，不能编辑查阅类型 -->
                            <el-radio-group  v-model="singleFlag" @change="singleChangeBorrowType(singleFlag)"  size="small" :disabled="passedActiveName == '1' || passedObj.infoProcessList.length!=0">
                                    <el-radio :label="1"  >实体</el-radio>
                                    <el-radio :label="0"  >电子</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="设置可利用页面"  v-show="singleFlag==0">
                            <el-radio-group  v-model="usePageRadio" size="small" @change="changePages" :disabled="passedActiveName == '1'">
                                <el-radio :label="1">全部</el-radio>
                                <el-radio :label="2">部分页码</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="desc" v-if="usePageRadio==2">
                            <!-- 只有电子的才可以设置页码 -->
                            <el-input v-model="singlePages" size="small" :disabled="passedActiveName == '1'"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div> 
        <div class="mt10 footerBar" v-if="this.passedActiveName == '0'" style="text-align:right;">
            <span style="margin-right:15%;">
                <el-button class="defaultBtn" v-if="upBtnVisible" @click="approveLast">上一条</el-button>
                <el-button class="defaultBtn" @click="saveSingleApprove">保存</el-button>
                <el-button class="defaultBtn" v-if="nextBtnVisible" @click="approveNext">下一条</el-button>
            </span>
        </div> 
        <singleUploadFilesDialog ref="singleUploadFilesDialogRef"></singleUploadFilesDialog>
    </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './handleApplyDetail.service'; 
    import HttpRequest from '@/api/request'; 
    import all from '@/utils/firstSlice.js';
    import crc32 from '@/utils/crc32.js';
    import base from '@/scrollLoad';
    import noPicIcon from '@/imgs/noPic.jpg';
    import singleUploadFilesDialog from '../../common/singleUploadDialog/singleUploadFilesDialog.vue';
    import videojs from 'video.js'
    import 'videojs-contrib-hls'
    @Component({
        components: { 
            singleUploadFilesDialog
        }
    })
    export default class singleApplyDetail extends Vue{
        bodyHeight: number= document.documentElement.clientHeight - 303 ; 
        noPic: string = noPicIcon;
        oriFile: any = [];//查阅的原文列表信息

        passedObj: any = {};
        currentAicId: number = 0;

        upBtnVisible: boolean = false;
        nextBtnVisible: boolean = false;
        
        singleAuditResult: string = '';  //修改后的值
        singleFlag: number = -1; //修改后的值
        singlePages: string = ''; //修改后的值
        singleAttachedFileFlag: boolean=false;//修改后的值
        singleSendStatus: number;//修改后的值
        singleArcStatus: number;//修改后的值

        oriAuditResult: string = '';//初始值 审核结果
        oriFlag: number = -1;//初始值 查阅类型
        oriPages: string = '';//初始值 页码
        oriAttachedFileFlag: boolean=false; //初始值 是否有电子原文
        oriSendStatus: number;//初始值 是否可以出库 1可以出库 0不可出库
        oriArcStatus: number; //初始值 出库接收状态 

        passedArcIdArr: any = [];
        operUserName: string = ''; //【审批人】
        
        addFileName: string = '';
        archiveAgentCode: string = '';
        addFileTitle: string = '';
        fileVisible1: boolean = false;
        processStop:boolean = false;
        clientId:string = '';
        passedActiveName: string = '';

        listDiv: boolean = true;
        imgList: any = [];
        oriListBtnVisible:boolean = false;
        contentDiv: boolean = false;
        videoSrc: string = '';
        videoContentDiv: boolean = false;
        file: string = '';
        nowIndex: number = -1;
        minArcMap: any = [];

        outBtnVisible: boolean = false;
        inBtnVisible:boolean = false;

        fileUrl:any;
        baseUrl: any = process.env.upload_BASEURL;
        baseUrl2: any = process.env.video_BASEURL;
        usePageRadio: number= -1;
        utilizeProcesses: any = [];

        changePages(val){
            if(val==1){
                this.singlePages = "";
            }
        };
        singleChangeBorrowType(flag){
            this.setOutInBtnVisible();
        }
        setTitle(step){
            if(step){
                if(step.auditUserName){
                    return  `审批人：${step.auditUserName}`;
                }
                return;
            }else{
                let name = window.sessionStorage.getItem("singleApplyDetail_applyUserName");
                return `申请人：${name}`;
            }
            
        };
        setDescription(step){//utilizeProcesses只是为了显示节点，具体的节点值，存储在 infoProcessList中
            for(let infoPro of this.passedObj.infoProcessList){
                if(step.auditStep == infoPro.auditStep){
                    if(infoPro.auditResult==null){
                        return '未审批';
                    }
                    if(infoPro.auditResult==1){
                        return `通过  ${step.auditDate.split('T')[0]}`;
                    }else{
                        return `驳回  ${step.auditDate.split('T')[0]}`;
                    }
                }
            }
            
        };
        showOriList(){
            this.listDiv = true;
            this.contentDiv = false;
            this.oriListBtnVisible = false;
        }
        // pdf 点击事件
        clickIcon(row,index){
            let abc = document.querySelectorAll('.ImgClass');
            for(let img of abc){
                img.classList.remove("selectPdfColor");
            }
            abc[index].classList.add("selectPdfColor");
            this.nowIndex = index;
        }
        saveSingleApprove(){ // 保存时存储
            let info = this.minArcMap.get(this.currentAicId);
            info.auditResult = this.singleAuditResult;
            info.flag = this.singleFlag;
            info.pages = this.singlePages;
            info.attachedFileFlag = this.singleAttachedFileFlag;
            info.arcStatus = this.singleArcStatus;
            info.sendStatus = this.singleSendStatus;

            this['$message']({
                message: '保存成功!',
                type: 'success'
            });
        };
        giveUserMsgTip(type){
            let msg = type==1?"上一条": "下一条";
            this.$confirm('您做了修改，是否保存?', '提示', {
                confirmButtonText: `保存并继续${msg}`,
                cancelButtonText: `不保存并继续${msg}`,
                type: 'warning',
                center: true
            }).then(() => {
                this.saveSingleApprove();
                this.getLastOrNextInfo(type);
            }).catch(() => {
                this.getLastOrNextInfo(type);
            })
        }
        getLastOrNextInfo(type){//1上一条 2下一条
            let currentIndex = this.passedArcIdArr.indexOf(this.currentAicId);
            let length = this.passedArcIdArr.length;
            if(type ==1){
                currentIndex = currentIndex -1;
            }else{
                currentIndex = currentIndex +1;
            }
            this.setBtnVisible(currentIndex);
            this.setOutInBtnVisible();
            this.getInfoByCurrentInfoId(currentIndex);
        }
        getInfoByCurrentInfoId(currentIndex){
            //重新赋值currentTaskId
            this.currentAicId = this.passedArcIdArr[currentIndex];
            let info = this.minArcMap.get(this.currentAicId);

            // 初始化原始值和当前值
            this.singleAuditResult = this.oriAuditResult = info.auditResult;
            this.singleFlag = this.oriFlag =  info.flag;
            this.singlePages = this.oriPages = info.pages;
            this.singleSendStatus = this.oriSendStatus = info.sendStatus;
            this.singleAttachedFileFlag = this.oriAttachedFileFlag = info.attachedFileFlag;
            this.singleArcStatus = this.oriArcStatus = info.arcStatus;

            if(info.pages){
                this.usePageRadio = 2;
            }else{//空
                this.usePageRadio = 1;
            }
        };
        checkOriAndSingleIsSameOrNot(){
            if(this.oriAuditResult == this.singleAuditResult && 
                this.oriFlag == this.singleFlag && 
                    this.oriPages == this.singlePages &&
                        this.oriArcStatus == this.singleArcStatus && 
                            this.oriAttachedFileFlag == this.singleAttachedFileFlag && 
                                this.oriSendStatus == this.singleSendStatus ){
                                    return true;
            }else {
                return false;
            }
        }
        checkSessionAndSingleIsSameOrNot(){
            let info = this.minArcMap.get(this.currentAicId);
            if(info.auditResult == this.singleAuditResult && 
                    info.flag == this.singleFlag && 
                        info.pages == this.singlePages &&
                            info.attachedFileFlag == this.singleAttachedFileFlag &&
                                info.arcStatus == this.singleArcStatus && 
                                    info.sendStatus == this.singleSendStatus){
                                        return true;
            }else{
                return false;
            }
        }
        checkCurrentValueIsChanged(type){
            //需要判断原始值和绑定的值是否一致，如果一致，表明没有修改，直接下一条；
            let singleOriSame = this.checkOriAndSingleIsSameOrNot();
            if(singleOriSame){
                    this.getLastOrNextInfo(type);  
            }else{ 
                //如果原始值和绑定的值不一样，表明修改了值，然后判断存储值是否和绑定的值一样，如果不一样表明没保存，提示保存，否则下一条
                let sessionSingleSame = this.checkSessionAndSingleIsSameOrNot();
                if(sessionSingleSame){
                        this.getLastOrNextInfo(type);
                }else{
                    this.giveUserMsgTip(type);//提示是否保存
                }
            }
        }
        approveLast(){
            this.checkCurrentValueIsChanged(1);
        };
        approveNext(){
            this.checkCurrentValueIsChanged(2);
        };
        showSingleUploadFile(){
            this.$refs['singleUploadFilesDialogRef'].centerDialogVisibleSingleMount = true;
            this.$refs['singleUploadFilesDialogRef'].dialogTitle = '挂接原文';
            this.$refs['singleUploadFilesDialogRef'].dialogWidth = '30%';
            this.$refs['singleUploadFilesDialogRef'].archiveId = this.passedObj.objectId;
            this.$refs['singleUploadFilesDialogRef'].getLibid = this.passedObj.libId;
            this.$refs['singleUploadFilesDialogRef'].clientId = this.clientId;
            this.$refs['singleUploadFilesDialogRef'].originType = "fromZB";
            this.getSliceConfig();
        };
        // 取得分块大小
        getSliceConfig() {
            let params = {
                action: 'getSliceConfig',
                clientId:this.clientId,
            };
            Service.prepareUpload({}, params.action, params.clientId).then(res => {
                if(res.data.succeeded){
                     this.$refs['singleUploadFilesDialogRef'].prepareBlob = res.data.data;
                }else{
                    this['$message']({
                        message: '准备上传失败!',
                        type: 'warning'
                    });
                }
            });
        }
        // 点击挂接
        
        toHandleApplyDetail(){
            window.sessionStorage.setItem("singleApplyDetail_minArcMap", JSON.stringify(this.minArcMap));
            this.$router.push({path:'/myBorrow/handleBorrowApply/handleApplyDetail'});
        };
        // 出库，接收
        borrowReceiveArchive(){
            if(this.singleArcStatus == 1){
                let ids = [];
                ids.push(this.currentAicId);
                // let params = {
                //     // arcStatus: 1,//1未借出，传参就是更改后的值，当点击申请出库时，出入库管理借出登记多一条数据，当出入库管理员操作借出之后，才由1未借出变成5待接收，审核才可以【接收】
                //     ids: ids
                // }
                Service.updateInfoSendStatusByIdList(ids).then(res => {
                    if(res.data.succeeded){
                        this.singleArcStatus = 5;
                        this.$nextTick(() => {
                            this.setOutInBtnVisible();//为了让界面显示【接收】按钮
                        });
                    }else{
                        this['$message']({
                            message: '申请出库失败!',
                            type: 'warning'
                        });
                    }
                });
            }else if(this.singleArcStatus  ==5){//待接收：出入库管理时，【借出】 由1未借出-->5待接收
                // 无论出入库管理员是否【借出】，此界面已经显示了【接收】，操作接收时，需判断ARCStatus的状态
                // case1: 1未借出  直接显示【接收】，并提示“请出入库管理员进行档案借出操作！”（如果接待员没有【接收】，出入库管理员直接【归还】，没有审核状态，arcStatus变为了1未借出，而不是3已归还） 
                // case2：5待接收  可以操作【接收】，同时更改状态为2待归还，隐藏【接收】
                Service.queryUtilizeInfoById({id: this.currentAicId}).then(res =>{
                    if(res.data.succeeded){
                        let result = res.data.data;
                        if(result.arcStatus==5){
                            let params = {
                                arcStatus: 2,//待归还（传什么状态，后台更改为什么状态）
                                id: this.currentAicId
                            }
                            Service.updateUtilizeInfoById(params).then(res => {
                                if(res.data.succeeded){
                                    this.$nextTick(() => {
                                        this.singleArcStatus = 2;//2：待归还
                                        this.setOutInBtnVisible();
                                    });
                                }else{
                                    this['$message']({
                                        message: '接收失败!',
                                        type: 'warning'
                                    });
                                }
                            });
                        }else if(result.arcStatus==1){//表明已经执行【归还】，但是没有经过【接收】。如果档案没有接收，就直接归还(档案未审批)时，状态更改为未借出，而不是已归还了
                            this.singleArcStatus = 5;//为了让界面显示【接收】按钮
                            this['$message']({
                                message: '请出入库管理员进行档案借出操作！',
                                type: 'warning'
                            });
                        }else if(result.arcStatus==2){//表明已经执行【接收】， 
                            this.singleArcStatus = 2; 
                            this.outBtnVisible = false;
                            this.inBtnVisible = false;
                        }else{
                            this['$message']({
                                message: '已归还已取消的档案不允许操作!',
                                type: 'warning'
                            }); 
                        }
                    }
                });
            }
        };
       
        getOriginalsList(){
            Service.getOriginals({
                archiveAgentCode: window.sessionStorage.archiveAgentCode, 
                libId: this.passedObj.libId,
                archiveId: this.passedObj.objectId
            }).then(res=>{
                if(res.data.succeeded){
                    this.oriFile = res.data.data;
                    this.imgList = res.data.data;
                    this.$nextTick(()=>{
                        if(res.data.data.length>0){
                            // debugger;
                            this.singleAttachedFileFlag = true;
                            this.listDiv = true;
                            this.contentDiv = false;
                            // this.showOriFile(res.data.data[0].guid, res.data.data[0].extension);
                        }
                    });
                }else{
                    // this['$message']({
                    //     message: res.data.errorMessage,
                    //     type: 'warning'
                    // });
                }
            });
        };
        // 双击打开pdf
        open(guid,extension,efileType,convertStatus){
            let params = {
                originalGuid:guid,
                preview:false
            };
            // 文件展示
           if(efileType === 'Audio') {// 视屏展示
                this.listDiv = false; // 原文列表隐藏
                this.oriListBtnVisible = true; //原文列表按钮显示
                this.videoContentDiv = true; // 视频显示
                let videoUrl = this.baseUrl2+'/video/index?originalGuid='+guid
                Service.getVideoFile({}, guid).then(res => {
                    console.log(res.data);
                    let url2 = URL.createObjectURL(res.data);
                    this.videoSrc = url2;
                });
            }else{
                this.listDiv = false; // 原文列表隐藏
                this.oriListBtnVisible = true; //原文列表按钮显示
                this.contentDiv = true; // iframe PDF显示
                this.fileUrl = this.baseUrl+'/archive/file/downloadForPreview?originalGuid='+guid
                var url = encodeURIComponent(this.fileUrl);
                this.file = 'static/pdf/web/viewer.html?file=' + url;
                document.getElementById('previewPdf').setAttribute('src',this.file)
          
            }
        }
        // showOriFile(guid,item){
        //     let params = {
        //         originalGuid: guid,
        //         preview: false
        //     };
        //     if(item==='pdf'){
        //         this.fileUrl = this.baseUrl+'/archive/file/downloadOriginal?originalGuid='+guid+'&preview=false'
        //         var url = encodeURIComponent(this.fileUrl);
        //         this.file = 'static/pdf/web/viewer.html?file=' + url;
        //     }else{
        //         this.fileUrl = this.baseUrl+'/archive/file/downloadConverted?originalGuid='+guid+'&preview=false'
        //         var url = encodeURIComponent(this.fileUrl);
        //         this.file = 'static/pdf/web/viewer.html?file=' + url;
        //     }
        // }
        setOutInBtnVisible(){
            // "singleFlag==0 && singleArcStatus==1"  申请出库 
            // "singleFlag==0 && singleArcStatus==5"  接收
            debugger;
            if(this.passedActiveName == '0'){//待审批
                let attachedFileFlag =  this.minArcMap.get(this.currentAicId).attachedFileFlag;
                // 第一审批阶段，电子，无原文，arcstatus为未借出状态
                if(this.singleFlag==1){
                    this.outBtnVisible = false;
                    this.inBtnVisible = false;
                }else if(!attachedFileFlag && this.passedObj.infoProcessList.length==0 && this.singleFlag==0 ){
                    if(this.singleArcStatus==1){
                        this.outBtnVisible = true;
                        this.inBtnVisible = false;
                    }else if(this.singleArcStatus==5){
                        this.outBtnVisible = false;
                        this.inBtnVisible = true;
                    }else if(this.singleArcStatus==2){//
                        this.outBtnVisible = false;
                        this.inBtnVisible = false;
                    }
                }else{
                    this.outBtnVisible = false;
                    this.inBtnVisible = false;
                }
            }else{
                this.outBtnVisible = false;
                this.inBtnVisible = false;
            }
        }
         setBtnVisible(currentIndex){
            let length = this.passedArcIdArr.length;
            // debugger;
            if(currentIndex==0){
                if((currentIndex == length-1)  && (currentIndex==0)){//一共一条档案，不用显示上一条 下一条按钮
                    this.upBtnVisible = false;
                    this.nextBtnVisible = false;
                }else{
                    this.upBtnVisible = false;
                    this.nextBtnVisible = true;
                }
            }else if(currentIndex == length-1){
                    this.upBtnVisible = true;
                    this.nextBtnVisible = false;
            }else{
                this.upBtnVisible = true;
                this.nextBtnVisible = true;
            }
        };
        setProcessNodeValue(){

        }
        created(){  

            this.passedObj = JSON.parse(window.sessionStorage.getItem("singleApplyDetail_passedObj"));
            debugger;
            this.passedActiveName = window.sessionStorage.getItem("handleApply_activeName");//待审批0 已审批1
            this.minArcMap = JSON.parse(window.sessionStorage.getItem("singleApplyDetail_minArcMap"));
            this.minArcMap = new Map(this.minArcMap);
            // debugger;
            

            this.currentAicId = this.passedObj.id;  //当前审批的档案id

            //初始化原值 和 当前值
            this.singleAuditResult = this.oriAuditResult =  this.passedObj.auditResult;  //当前审批的档案状态：驳回还是通过
            this.singleFlag = this.oriFlag =  this.passedObj.flag; //当前审批的档案查阅类型 0电子 1实体
            this.singlePages = this.oriPages =  this.passedObj.pages; //当前审批的档案可查阅的页码范围
            this.singleSendStatus = this.oriSendStatus = this.passedObj.sendStatus;
            this.singleAttachedFileFlag = this.oriAttachedFileFlag = this.passedObj.archiveData.ATTACHED_FILE_FLAG;
            this.singleArcStatus = this.oriArcStatus = this.passedObj.arcStatus;
            
            if(this.passedActiveName == '0'){   //当已审批时，toolbar是隐藏状态
                this.passedArcIdArr = JSON.parse(window.sessionStorage.getItem("singleApplyDetail_arcIdArr")) ;
                let currentIndex = this.passedArcIdArr.indexOf(this.currentAicId);
                this.setBtnVisible(currentIndex); // 上一条下一条按钮的显隐
            }
            this.operUserName = window.sessionStorage.username; //【审批人】
            if(this.passedObj.pages){//可查阅页码范围，去推测可利用页面的值是 全部还是部分页码
                this.usePageRadio = 2; //部分页码
            }else{//空
                this.usePageRadio = 1; //全部
            } 
            this.setOutInBtnVisible();//设置出库接收按钮的显隐
            // //查询此档案是否有原文
            this.getOriginalsList();

            let clientId = base['base64'].encode(window.sessionStorage.getItem('userId'));
            this.clientId = clientId;

            //流程节点，每条档案对应的infoProcess是节点值
            this.utilizeProcesses = JSON.parse(window.sessionStorage.getItem("singleApplyDetail_utilizeProcesses"));
            debugger;

        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 563;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/myBorrow/borrow.scss';
    //  @import '../../../styles/innerPublic.scss';
    //  @import '../../../styles/fileManage/newlywenjian';
    .el-dialog.is-fullscreen {
        overflow: hidden;
    }
    .pdfbox{
        background-color: #acacac;
        position: relative;
        height: 100%;
        width: 100%;
      }
    .div1{
        height:100%;
        position: relative;
        top:0;
        cursor:pointer;
        margin-top:10px;
        overflow-y: auto;
      }
  
      .p2{
        position: absolute;
        color:#fff;
        bottom:38px;
        font-size:13px;
      }
  
    .pImg{
      width:48%;
      height:96%;
      margin: 0 1% 20px 1%;
      float:left;
      position: relative;
    }
    .pImg .ImgClass{
      top:0;
      bottom:60px;
      position: absolute;
      background:#fff;
      width:100%;
    }
  
    .pImg .ImgClass img{
      width:100%;
      height:100%;
    }
     .videoView{
        width: 1300px;
        margin: 40px auto;
        video{
            width: 100%;
        }
    }
</style>