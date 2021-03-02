<template>
<div>
    <el-dialog  class="myDialogCenter" :title="dialogTitle" :visible.sync="centerDialogVisibleSingleMount" :close-on-click-modal="true" :width="dialogWidth">
        <el-form class="formAddfile">
            <el-form-item label="文件名：" label-width="90px" class="mt10">
                <el-input style="float:left;width:60%;" v-model="addFileName" readonly></el-input>
                <!-- 上传 -->
                <uploader
                        ref="uploader"
                        :autoStart="false"
                        @file-added="onFileAdded"
                        @files-submitted="onFileSubmit"
                        class="uploader-app">
                    <uploader-unsupport></uploader-unsupport>
                    <uploader-btn @click="clickFiles" id="global-uploader-btn" :single="true" class="el-button defaultBtn" style="left:20px;" ref="uploadBtn">选择文件</uploader-btn>
                </uploader>
            </el-form-item>             
            <el-form-item label="文件标题：" label-width="90px" class="mt10">
                <el-input style="float:left;width:60%"  v-model="addFileTitle"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button  @click="addEventFormSubmitBtns()" class="defaultBtn">挂接</el-button>
            <el-button type="primary" @click="centerDialogVisibleSingleMount = false" class="defaultBtn">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog :show-close = 'false' class="fileModal processModal" :visible.sync="fileVisible1" :close-on-click-modal="false">
        <div>
            <el-progress type="circle" :stroke-width="12" :percentage="process" color="rgb(146,176,0)"></el-progress>
        </div>
    </el-dialog>
</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './singleUploadFilesDialog.service';
    import all from '../../../utils/firstSlice.js';
    import crc32 from '@/utils/crc32.js';
    import ACCEPT_CONFIG from '@/utils/uploadType.js';
    @Component({})
    export default class singleUploadFilesDialog extends Vue{
        centerDialogVisibleSingleMount: boolean;
        fileVisible1: boolean = false;
        dialogTitle:string = '';
        dialogWidth:string = '';
        originType:string = '';
        typeBoolean:boolean;
        pdfSite:boolean  = false;
        activeName:string = '1';
        getType:string = '';
        getID:string = '';
        clientId:string;
        getLibid:string = '';
        uploadFileId:string = '';
        archiveAgentCode:string;
        crc:string = '';
        loading: Boolean= false;
        redactFile:boolean;
        centerDialogVisibleTree : boolean;
        newFilesIds: number;
        title:string = '';
        originalGuid:string = '';
        downTitle:string = '';
        type:string = '';
        downType:string = '';
        isUploadType:boolean = true;
        fileDwonVisible:boolean = false;
        fileForm:any={
            resource:['1']
        };
        archiveId : number;
        fileUrl:any;
        crcsCalculated: number;
        prepareBlob:any={};
        bytesPerChunk:any;//总速率;
        formAddfile:any={};
        fileSingle:any={};
        fileList :  any = {};
        addArray : any = [];
        allSupportedUploadTypes: any = [];
        documentTableData:any=[];
        arrsStart:any=[];
        jsonVersionOfNewFiles:  any = {}
        addFileName:string;
        addFileTitle:string;
        uploadType: any = {};
        file:any;
        $refs: { uploader: HTMLFormElement};
        processStop:boolean = false;
        process: number = 0;
        processColor : string = 'rgb(247,78,0)';
        constructor(){
            super();
            this.centerDialogVisibleTree = false;
            this.centerDialogVisibleSingleMount = false;
            this.fileSingle = {};
            this.redactFile=false;
            this.file = '';
            this.archiveId = null;
            this.crcsCalculated = 0;
            this.jsonVersionOfNewFiles = {};
            this.arrsStart = [];
            this.fileUrl = '';
            this.addArray = [];
            this.formAddfile={};
            this.addFileName = '';
            this.addFileTitle = '';
            this.newFilesIds = 0;
            this.bytesPerChunk = null;
            this.documentTableData = [];
            this.uploadType =  {
                accept: ACCEPT_CONFIG.getAll()
            };
            this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
            this.prepareBlob = {
                yes:true
            };
        }
        // @Watch('centerDialogVisibleSingleMount')
        /** 断点续传集合 START*/
        // 预备上传
        onFileAdded(file) {
            this.isUploadType = true; 
            let fileType = (file.name.split('.')[1]).toLowerCase();
            if(this.allSupportedUploadTypes.indexOf(fileType) === -1) {
                this['$message']({
                    message: '暂不支持上传此格式的文件',
                    type: 'warning'
                });
                this.isUploadType = false;
                return false;
            }
            this.computeMD5(file);
        };
        // 支持上传的文件类型
        allSupportedTypes() {
            let self = this;
            Service.allSupportedTypes({}).then(res=>{
                if(res.data.succeeded){
                    for(let item of res.data.data) {
                        this.allSupportedUploadTypes.push(...item.value2);
                    }
                    console.log(this.allSupportedUploadTypes);
                    window.sessionStorage.setItem('allSupportedUploadTypes',JSON.stringify(this.allSupportedUploadTypes));
                }else{
                    self.getError(res.data.errorMessage)
                }
            })
        }
        // 预备上传整编队列
        computeMD5(file) {
            console.log(file)
            let that = this;
            let fileForPost = {tempId: 0, fileName: '', size: 0, data: {}, crc:''}
            fileForPost.data = {type: 'ArchiveFile',archiveLibId :this.getLibid,archiveId:this.archiveId,archiveAgentCode:this.archiveAgentCode};
            fileForPost.tempId = this.newFilesIds;
            fileForPost.fileName = file.name;
            fileForPost.size = file.size;
            file.id = fileForPost.tempId;
            this.jsonVersionOfNewFiles = fileForPost;
            // all.extractCrcFirstSlice(file, function(crc, blob) {
            //     that.jsonVersionOfNewFiles.crc = crc;
            //     that.crcsCalculated++;
            // });
        }
        // 收集全部可上传文件
        onFileSubmit(file){
            if(this.isUploadType) {
                this.fileSingle = file[0];
                this.addFileName = this.fileSingle.name;
                this.addFileTitle = this.fileSingle.name.split('.')[0];
            }
        }
        // 点击挂接
        addEventFormSubmitBtns(fileForPost){
            if(this.addFileName){
                if(this.addFileTitle){
                    this.fileVisible1 = true;
                    this.processStop = false;
                    this.process = 0;                   
                    this.jsonVersionOfNewFiles.data.title = this.addFileTitle;
                    let arr = [];
                    arr.push(this.jsonVersionOfNewFiles);
                    let params = {
                        action: 'prepareUpload',
                        clientId:this.clientId,
                    };
                    Service.prepareUpload(arr, params.action, params.clientId).then(res => {
                        if(res.data.succeeded){
                            this.uploadFileId = res.data.data[0];
                            this.getFilesA();
                        }else{
                            this.getError(res.errorMessage)
                        }
                    });
                }else{
                    this['$message']({
                        message: '请填写文件标题',
                        type: 'warning'
                    });
                }
            }else{
                this['$message']({
                    message: '请选择需要上传的文件',
                    type: 'warning'
                });
            }
        }
        // 查询列表
        getFilesA(){
            let params = {
                data:{
                    status:'Start'
                },
                isPrepare:true,
                isStart:true,
                process:0,
                name:this.prepareBlob[0]
            };
            this.bytesPerChunk = this.prepareBlob;
            let arr = [];
            arr.push(params);
            this.documentTableData = arr;
            this.allDoneFiles();
            this.getProcess();
        }
        // 侦察进度
        getProcess(){
            let ann = [];
            let annName = [];
            let fileIds = [];
            fileIds.push(this.uploadFileId);
            Service.prepareUpload({fileIds: fileIds},'getProgress',this.clientId).then(res => {
                let processList = [];
                let datas = res.data;
                for(let a in datas.data){
                    // datas[a].processId = a;
                    processList.push(datas.data[a]);
                };
                this.documentTableData[0].process = Number(processList[0].progress.toFixed(1));
                this.process = this.documentTableData[0].process;
                this.getColor();
                if(!this.processStop){
                    setTimeout(this.getProcess, 1000);
                }
                if(datas.succeeded && processList[0].status === 'Done') {
                    this.centerDialogVisibleSingleMount = false;
                    this.processStop = true;
                    this.fileVisible1 = false;
                    this['$message']({
                        message: '挂接成功',
                        type: 'success'
                    });
                    // 删除挂接云空间的文件
                    Service.searchUpload({fileIds: fileIds} ,this.clientId).then(() =>{});
                    if(this.originType === "fromZB") {
                        // 获取原文列表
                        this.$parent.getOriginalsList(this.archiveId);
                    }
                }
                if(datas.succeeded && (processList[0].status === 'UploadError' || processList[0].status === 'ProcessError')) {
                    this.centerDialogVisibleSingleMount = false;
                    this.processStop = true;
                    this.fileVisible1 = false;
                    this['$message']({
                        message: '挂接失败',
                        type: 'warning'
                    });
                    // // 删除挂接云空间的文件
                    Service.searchUpload({fileIds: fileIds},this.clientId).then(() =>{});                 
                }
            });
        }
        // 上传渐变色
        getColor(){
            if(this.process>=0&&this.process<=10){
                this.processColor = 'rgb(247,78,0)'
            }else if(this.process>10&&this.process<=30){
                this.processColor = 'rgb(255,161,7)'
            }else if(this.process>30&&this.process<=40){
                this.processColor = 'rgb(255,125,1)'
            }else if(this.process>40&&this.process<=50){
                this.processColor = 'rgb(255,125,1)'
            }else if(this.process>50&&this.process<=60){
                this.processColor = 'rgb(250,201,2)'
            }else if(this.process>60&&this.process<=70){
                this.processColor = 'rgb(198,233,42)'
            }else if(this.process>70&&this.process<=90){
                this.processColor = 'rgb(146,176,0)'
            }else if(this.process>90&&this.process<=100){
                this.processColor = 'rgb(8,208,45)'
            }
        }
        // 断点续传文件条目
        doneFiles(tip,item){
            let that = this;
            // 执行上传
            let list  = tip;
            list.originalFileSizeInBytes = list.size;
            let chunk = all.slice(list, list.fileCompletionInBytes, list.end);
            let formData = new FormData();
            // prepare the checksum of the slice
            var reader = new FileReader();
            reader.onloadend = function(e) {
                if (e.target['readyState'] == FileReader.DONE) {
                    let digest;
                    if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                        let binary = all.toBuffer(e.target['result']);
                        digest = all.crcUtf8(binary);
                    }else{
                        digest = crc32(e.target['result']);
                    }
                    // 切片
                    let crc =  all.decimalToHexString(digest);
                    formData.append("file", chunk);
                    console.log(formData.get("file"));
                    // 上传主体
                    Service.doneUpload(formData,that.uploadFileId,crc,that.clientId).then((res)=>{
                        console.log(res);
                        // progress
                        list.fileCompletionInBytes = list.end;
                        list.end = list.fileCompletionInBytes + that.bytesPerChunk;
                        if(list.end>list.originalFileSizeInBytes){
                            list.end = list.originalFileSizeInBytes
                        }
                        console.log(list.fileCompletionInBytes)
                        console.log(list.originalFileSizeInBytes)
                        // 进度到100%
                        if (list.fileCompletionInBytes < list.originalFileSizeInBytes) {
                            setTimeout(that.doneFiles, 5,tip,item);
                        }else{
                            for(let ab of that.documentTableData){
                                if(ab.originalFileName === list.name){
                                    ab.process = 100;
                                    that.process = 100;
                                }
                            }
                            
                            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            //     that.loadingInstance.close();
                            // });
                            // setTimeout(that.tablelist, 3000);
                        }
                    });
                }
            };
            // 判断浏览器类型
            if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                // reader.readAsDataURL(chunk);
                reader.readAsArrayBuffer(chunk);
            }else{
                reader.readAsBinaryString(chunk);
            }
        }
        chooseFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
        }
        // 调用全部文件上传
        allDoneFiles(){
            this.filesReact();
            this.arrsStart = this.documentTableData;
            this.processNextIn();
        };
        // 文件分块
        filesReact(){
            let files = this.fileSingle;
            files.file.fileCompletionInBytes = 0;
            if(files.file.size>this.bytesPerChunk){
                files.file.end = files.file.fileCompletionInBytes + this.bytesPerChunk;
            }else{
                files.file.end = files.file.size
            }
        }
        // 选择文件按钮
        clickFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
        };
        // 上传文件过程
        processNextIn() {
            let files = this.fileSingle;
            for(let tip of this.arrsStart){
                this.doneFiles(files.file,tip.name);
            }
        }
        /** 断点续传集合 END*/
        
        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
         created(){
             console.log(this.uploadType);
             let allSupportedUploadTypes = JSON.parse(window.sessionStorage.getItem('allSupportedUploadTypes'));
             if(!allSupportedUploadTypes || allSupportedUploadTypes.length === 0) {
                // 支持上传的文件类型
                this.allSupportedTypes();
             } else {
                 this.allSupportedUploadTypes = allSupportedUploadTypes;
             }
             
        };
    };
   
 </script>
<style lang="scss" scoped >
body {
    .uploader-btn,.el-button.is-disabled:hover{
      background: #2b87c6;
    }
  } 
</style>
 