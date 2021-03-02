<template>
    <section  class="wrapprSection userAddView">
        <div v-if="publicUserType === 'editPublicUser'" class="mainTitle">公众用户编辑</div>
        <div v-else class="mainTitle">公众用户注册</div>
        <div class="contentbox contentbox-full">
            <div class="pub-main boxshow" :style="formStyle">
                <el-tabs v-model="activeName" type="card" class="erpTab"  :before-leave="beforeLeave" @tab-click="handleClick">                           
                    <el-tab-pane label="用户信息" name="1" >
                        <!--公众用户信息-->
		                <userInformationView ref="userInformationView" :Gfilters="Gfilters" :publicUserType="publicUserType"></userInformationView>
                        <div class="ta-c mt20">
                            <el-button class="defaultBtn" @click="back">取消</el-button>
                            <el-button v-if="publicUserType === 'editPublicUser'" class="defaultBtn" @click="submitForm2('ruleForm1')">保存并受理</el-button>
                            <el-button v-else class="defaultBtn" @click="submitForm1('ruleForm1')">保存并受理</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="公证文件" name="2"> 
                        <div class="leftMain mt10 relative" :style="formStyle2">
                            <el-button class="defaultBtn" @click="startUpload">点击上传</el-button>
                            <el-button class="defaultBtn" @click="RefreshList">刷新</el-button>
                            <div class="pdfbox boxshow" v-show="imgList.length > 0" style="height: 90%;margin-top: 19px;width: 100%;overflow-y: auto;padding: 10px 0 10px 0;">                               
                                <div  v-show="listDiv" style="height:100%;">
                                    <div class="div1 scrollFiles">
                                        <div class="pImg" v-for="(item,index) in imgList" :key="index">
                                            <div class="ImgClass" @click="clickIcon(item, index)" @dblclick="open(item.convertFilePath, item.convertFlag)" style="width:150px;height:150px;margin:0 auto;">
                                                <img :id="'thumbnail'+index" :src="noPic" alt="" style="width:100%;height:100%">
                                                <!-- <img :id="'thumbnail'+index" @click="clickIcon(item, index)" :src="noPic2" alt="" v-else-if="item.efileType === 'Audio'" style="width: 70%;height: 70%;position: absolute;left: 50%;top: 50%;margin-left: -35%;margin-top: -30%;"> -->
                                            </div>                          
                                            <div class="p2" style="text-align: center;">{{item.originalFileName}}</div>                          
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>  
                        <div class="contentView mt10 relative" :style="formStyle2">
                            <div v-show="contentDiv" style="height:100%;">
                                <div class="div1" style="height:100%;">
                                    <iframe id='previewPdf' :src="file" height="100%"
                                            width="100%">
                                    </iframe>
                                </div>
                            </div> 
                        </div> 
                        <div class="clear"></div>
                        <div class="ta-c mt20">
                            <el-button class="defaultBtn" @click="back">取消</el-button>
                            <el-button v-if="publicUserType === 'editPublicUser'" class="defaultBtn" @click="submitForm2('ruleForm1')">保存并受理</el-button>
                            <el-button v-else class="defaultBtn" @click="submitForm1('ruleForm1')">保存并受理</el-button>
                        </div>                               
                    </el-tab-pane>
                </el-tabs> 
                <!-- <div class="pub-con">  
                     
                </div> -->
                
            </div>
        </div>
        <el-dialog  class="myDialogCenter fileUploadView" title="上传公证文件" :visible.sync="centerDialogVisibleSingleMount" :close-on-click-modal="true">
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
                <el-button  @click="publicDocumentsubmitForm1()" class="defaultBtn">上传</el-button>
                <el-button type="primary" @click="centerDialogVisibleSingleMount = false" class="defaultBtn">取消</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './addUser.service';
    import all from '../../../utils/firstSlice.js';
    import {JSEncrypt} from 'jsencrypt';
    import { Loading } from 'element-ui';
    import noPicIcon from '@/imgs/noPic.jpg';
    import userInformationView from '../../common/userInformationView/userInformationView.vue';
    @Component({
        components: { 
            userInformationView,
        }
    })
    export default class adduser extends Vue{
        activeName: string = '1';
        fileForm: any = {};
        filters: any = {};
        rules: any = {};
        ruleForm: any = {};
        key:any;
        loadingInstance:any={};
        imageUrl: string ='';
        options: any = {};
        fileSingle:any={};
        clickBookShow:boolean;
        oriListBtnVisible:boolean = false;
        listDiv:boolean;
        noPic: string = noPicIcon;
        userId: string ='';
        panelShow: boolean;
        centerDialogVisibleSingleMount: boolean;
        limitNumber:number;//上传文件的个数控制
        publicUserFileList:any = [];
        fileVisibleMove1:boolean;
        formValidates=['ruleForm','ruleForm1','ruleForm2']//form表单的ref
        formValidatesResultArr:any = [];//用来接受返回结果的数组
        Gfilters:any = {};
        Gfilters2:any = {};
        addFileName:string;
        fileUrl:any;
        file:any;
        redactFile:boolean;
        addFileTitle:string;
        imgList: any = [];
        fileListAll:any = [];//文件显示队列
        publicUserType: string='';
        publicUserId: string;
        baseUrl:any;
        contentDiv:boolean;
        serachInformation:any = {};
        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        userPortrait: string = 'http://himg.bdimg.com/sys/portrait/item/1b2ee58ba4e5a58be79a84647368323235c240.jpg';
        formStyle: any = {
            "height": Number(document.documentElement.clientHeight-165)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 20px 15px'
        };
        formStyle2: any = {
            "height": Number(document.documentElement.clientHeight-320)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
        constructor(){
            super();
            this.serachInformation = {
                userName:'',
                cardNo:''
            }
            this.fileSingle = {};
            this.imgList = [];
            this.addFileName = '';
            this.clickBookShow = false;
            this.listDiv = true;
            this.key = window.sessionStorage.getItem('loginkey');
            this.baseUrl = process.env.API_BASEURL;
            this.contentDiv = false;
            this.addFileTitle = '';
            this.fileUrl = '';
            this.redactFile=false;
            this.publicUserId = '';
            this.centerDialogVisibleSingleMount = false;
            this.userId = window.sessionStorage.getItem('userId');
            this.userId = window.sessionStorage.getItem('loginkey');
            this.fileListAll = [];
            this.panelShow = false;  //选择文件后，展示上传panel
            this.loadingInstance = null;
            this.limitNumber = 1;
            this.file = '';
            // this.publicUserFileList = null;
            this.Gfilters = {
                fullName: '',
                consultantCount: '',
                sex:'',
                Integer:'',
                consultantType:'',
                birthday:'',
                nationality:'',
                hasAttatched:'',
                credentialsType:'',
                credentialsNumber:'',
                company:'',
                email:'',
                address:'',
                password:'',
                mailingAddress:'',
                photo:'',
                purpose:'',
                receptionist:'',
                reviewer:'',
                telephone:'',
                userNo:'',
                fixedTelephone:'',
                archivesAgentCode:'',
                zipCode:'',
            }
            this.rules = {
                userNo: [
                    { required: true, message: '请填写用户注册编码', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                nationality: [
                    { required: true, message: '请选择国家地区', trigger: 'change' }
                ],
                consultantType: [
                    { required: true, message: '请填写查阅者类型', trigger: ['change'] }
                ],
                archivesAgentCode: [
                    { required: true, message: '请填写接待管及代码', trigger: ['blur'] }
                ]
            };
        };


        handleClick(){
            
        }
        // 正整数验证
        consultantCountvalidator(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]*$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正整数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        // 选择文件按钮
        clickFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
        };
        showOriList(){
            this.listDiv = true;
            this.contentDiv = false;
            this.oriListBtnVisible = false;
            this.redactFile = false; // 底部按钮显示
        }
        // 姓名验证
        fullName(rule,value,callback){
            var reg = new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的姓名'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
       //证件号码验证
        credentialsNumber(rule,value,callback){
            if(this.Gfilters.credentialsType === '1') {
                // 身份证校验
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(value){
                    var str = reg.test(value);
                    if(!str){
                        callback(new Error('请输入正确的身份证号码'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }
            if(this.Gfilters.credentialsType === '2') {
                // 护照校验
                var reg = /^([a-zA-z]|[0-9]){5,17}$/;
                if(value){
                    var str = reg.test(value);
                    if(!str){
                        callback(new Error('请输入正确的护照号码'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }
            if(this.Gfilters.credentialsType === '3') {
                // 军官证校验
                var reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
                if(value){
                    var str = reg.test(value);
                    if(!str){
                        callback(new Error('请输入正确的军官证号码'))
                    }else{
                        callback()
                    }
                }else{
                    callback()
                }
            }
            
        }
        beforeLeave() {
            if(this.$refs['userInformationView'].publicUserId || this.publicUserId) {
                if(this.activeName === '1') {
                    if(this.$refs['userInformationView'].publicUserId) {
                        this.publicUserId = this.$refs['userInformationView'].publicUserId;
                    }
                    this.getFilesByUserId();
                }
            } else {
                this.Warn("请先检索公众用户。");
                this.activeName = '1'
                return false;
            }
        }
        //手机号码验证
        telephone(rule,value,callback){
            var reg = new RegExp('^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的手机号码'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        // pdf 点击事件
        clickIcon(row,index){
            // if(this.isshift) {
                let abc = document.querySelectorAll('.ImgClass');
                for (let i = 0; i < abc.length; i++) {
                    abc[i].classList.remove("selectPdfColor");
                }
                abc[index].classList.add("selectPdfColor");
            // } else {
            //     this.deleteID = [];
            //     this.deleteID.push(this.imgList[index].guid);
            //     this.downType = this.imgList[index].extension;
            //     this.downTitle = this.imgList[index].title;
            //     this.nowIndex = index;
            //     this.allChoose = false;
            // }
            // console.log(this.deleteID);
        }
        // 双击打开pdf
        open(filePath,convertStatus){
            let self = this;
            if(convertStatus) {
                    this.clickBookShow = true;
                    // this.listDiv = false; // 原文列表隐藏
                    this.oriListBtnVisible = true; //原文列表按钮显示
                    this.redactFile = true; // 底部按钮隐藏
                    this.contentDiv = true; // iframe PDF显示               
                    // this.fileUrl = this.baseUrl+'/publicUser/getFileByFilePath?filePath='+filePath
                    // var url = encodeURIComponent(this.fileUrl);
                    // this.file = 'static/pdf/web/viewer.html?file=' + url;
                    // document.getElementById('previewPdf').setAttribute('src',this.file)
                    Service.getFileByFilePath({
                        filePath:filePath,
                    }).then((res) =>{
                        let blob = new Blob([res],{type: 'application/pdf'});
                        this.fileUrl = this.getObjectURL(blob);
                        console.log(this.fileUrl)
                        this.file = 'static/pdf/web/viewer.html?file=' + this.fileUrl;
                        document.getElementById('previewPdf').setAttribute('src',this.file);
                    });
            } else {
                this['$message']({
                    message: '此文件尚未转换成功，请稍后再试。',
                    type: 'warning'
                });
            }
        }
        // 转化文件流
        getObjectURL(file) {
            let url = null;
            if (window['createObjectURL'] != undefined) { // basic
                url = window['createObjectURL'](file);
            } else if (window['webkitURL'] != undefined) { // webkit or chrome
                url = window['webkitURL']['createObjectURL'](file);
            } else if (window['URL'] != undefined) { // mozilla(firefox)
                url = window['URL']['createObjectURL'](file);
            }
            return url;
        };
        //固定电话验证
        fixedTelephone(rule,value,callback){
            var reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的固定电话'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        //电子邮件验证
        email(rule,value,callback){
            var reg = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的固定电话'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
        //邮政编码验证
        zipCode(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]{5}$');
            if(value){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正确的固定电话'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        }
    //     handleRemove(file, fileList) {
    //     console.log(file, fileList);
    //   };
      handlePreview(file) {
            console.log(file);
      }
      // 预备上传
        onFileAdded(file) {
            // console.log('onFileAdded----------------------------');
            this.panelShow = true;
            
        };
      // 收集全部可上传文件队列
        onFileSubmit(files, fileList){
            this.fileListAll = files;
            this.publicUserFileList = files;
            this.fileSingle = files[0];
            this.addFileName = this.fileSingle.name;
            this.addFileTitle = this.fileSingle.name.split('.')[0];
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
        //请求失败
        getError(message: string) {
            this["$message"]({
            message,
            type: "error"
            });
        }
      PchangeDate() {

      }
      // 上传文件的钩子
        Onexceed(files, fileList){
            console.log(files, fileList)
            this.Warn("你每次只能上传一个文件")
        }
        handleRemove(file, fileList){
        	this.fileForm.fileId = '';
        	// this.upList = [];
        	this.Suces("删除成功");
        }
      //导入数据选定文件
        BeforeUpload(params){
            var Form = new FormData();
            Form.append('files',params.file);
            // console.log(Form.get("files"));
            Service.uploadPublicUserFiles(Form).then(res=>{
               if(res.succeeded) {
                    this.Suces('保存成功!');
                } else {
                    this.Warn('保存失败!');
                }
            });
        }
      publicDocumentsubmitForm1() {//新增公证文件保存
            if(this.publicUserFileList.length !== 0) {
                // let chunk = all.slice(this.publicUserFileList, 0, this.publicUserFileList.end);
                let formData = new FormData();
                for(let item of this.publicUserFileList) {
                    formData.append("files", item.file);
                    formData.append("userId", this.publicUserId);
                    console.log(formData.get("files"));
                }
                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在上传中，请稍等',
                        // spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                Service.uploadPublicUserFiles(formData).then((res) =>{
                    if(res.data.succeeded) {
                        this.Suces('上传成功!');
                        this.centerDialogVisibleSingleMount = false;
                        this.getFilesByUserId();
                    } else {
                        this.Warn('上传失败!');
                    }
                    this.$nextTick(() => { loadingInstance.close();});
                })
            } else {
                this.Warn('请上传传公证文件!');
            }
      }
      RefreshList() {
            this.getFilesByUserId();
      }
      getFilesByUserId() {
           Service.getFilesByUserId({userId: this.publicUserId}).then((res) =>{
                if(res.data.succeeded) {
                    this.imgList = [];
                    let files = res.data.data;
                    let i = 0;
                    let abc = document.querySelectorAll('.ImgClass');
                    for (let i = 0; i < abc.length; i++) {
                        abc[i].classList.remove("selectPdfColor");
                    }
                    for(var index in files){
                        let img = files[index];
                        if(img.url){
                            continue;
                        }
                        let imageElement = document.getElementById("thumbnail"+i);
                        if(imageElement != null){
                           imageElement.src = this.noPic;
                        }
                        if(img.thumbnailFlag){
                            this.getAllIcons(img,i);
                        }
                        // if(img.title && img.extension) {
                            this.imgList.push(img);
                        // }
                        i++;
                    }
                } else {
                    this.getError(res.data.errorMessage);
                }
            })
      };
      async getAllIcons(img,index){      
            await Service.getFileByFilePath({'filePath':img.thumbnailFilePath}).then(res=>{
                    let imageElement = document.getElementById("thumbnail"+index);
                    // imageElement.src = URL.createObjectURL(res.data);
                    // console.log(URL.createObjectURL(res.data));
                    if(res.type == 'image/jpeg'){
                        let blob = new Blob([res],{type: 'application/pdf'});
                        let url = this.getObjectURL(blob);
                        imageElement.src = url
                    } else {
                        this['$message']({
                            message: '获取缩略图失败。',
                            type: 'error'
                        });
                    }
            });
        };
      searchUser2() {
            if(this.Gfilters.credentialsNumber === ''){
                this.Warn("请填写证件号码");
                return false;
            }
            if(this.Gfilters.credentialsType === '') {
                this.Warn("请选择证件类型");
                return false;
            }
            if(this.Gfilters.credentialsType === '1') {
                // 身份证校验
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                var str = reg.test(this.Gfilters.credentialsNumber);
                if(!str){
                    this.Warn("请输入正确的身份证号码");
                    return false;
                }
            }
            if(this.Gfilters.credentialsType === '2') {
                // 护照校验
                var reg = /^([a-zA-z]|[0-9]){5,17}$/;
                var str = reg.test(this.Gfilters.credentialsNumber);
                if(!str){
                    this.Warn("请输入正确的护照号码");
                    return false;
                }
            }
            if(this.Gfilters.credentialsType === '3') {
                // 军官证校验
                var reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
                var str = reg.test(this.Gfilters.credentialsNumber);
                if(!str){
                    this.Warn("请输入正确的军官证号码");
                    return false;
                }
            }
            this.searchUser();
      }
      //检索公众用户
      searchUser() {
            let self = this;
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在检索中，请稍等',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.findPublicUserByName({cardNo:this.Gfilters.credentialsNumber}).then((res) =>{
                if(res.data.succeeded && res.data.data.length !==0) {
                    for(let item in res.data.data[0]) {
                        if(res.data.data[0].photo) {
                            if(res.data.data[0].photo.indexOf('data:image/jpeg;base64') !== -1) {
                                this.Gfilters.photo = res.data.data[0].photo;
                            } else {
                                this.Gfilters.photo = 'data:image/jpeg;base64,' + res.data.data[0].photo;
                            }
                        }
                        this.publicUserId = res.data.data[0].userId
                        for(let itme2 in this.Gfilters) {
                            if(res.data.data[0][item] !==null && item === itme2) {
                                this.Gfilters[itme2] = '' + res.data.data[0][item];

                            }
                        }
                    }
                } else {
                    self.Warn('查询无结果，请先注册新用户!');
                    // for(let itme2 in this.Gfilters) {
                    //     this.Gfilters[itme2] = null;
                    // }
                    // this.imageUrl = '';
                }
                this.$nextTick(() => { loadingInstance.close();});
            })
        }
        checkForm(formName) { //封装验证多表单的函数
            let _self = this;
            var result = new Promise(function(resolve, reject) {
                _self.$refs[formName].validate((valid) => {
                if (valid) {
                    resolve();
                } else { reject() }
                })
            })
            _self.formValidatesResultArr.push(result) //push 得到promise的结果
        }
        startUpload() {
            this.centerDialogVisibleSingleMount = true;
        }
       submitForm1(fileForm1) {//新增表单保存
            // this.formValidatesResultArr = [];
            // this.formValidates.forEach(item => { //根据表单的ref校验
            //     this.checkForm(item)
            // })
            // let self = this;
            // Promise.all(this.formValidatesResultArr).then(function() { //都通过了
            //         let loadingInstance = Loading.service(
            //             {
            //                 lock: true,
            //                 text: '正在保存中，请稍等',
            //                 // spinner: 'el-icon-loading',
            //                 background: 'rgba(0, 0, 0, 0.7)'
            //             }
            //         );
            //         Service.savePublicUser(self.Gfilters).then((res) =>{
            //             console.log(res);
            //             if(res.status === 200) {
            //                 self.Suces('保存成功!');
            //                 window.sessionStorage.setItem("helpBorrowApply_user", JSON.stringify(res.data.data));
            //                 this['$router'].push({
            //                     path: '/myBorrow/helpBorrow/helpBorrowApply',
            //                 })
            //             } else {
            //                 self.Warn('保存失败!');
            //             }
            //             self.$nextTick(() => { loadingInstance.close();});
            //         })
            // }).catch(function() {
            //     return false;
            // });
            this.$refs['userInformationView'].$refs[fileForm1].validate((valid)=>{
                if (valid) {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    let encrypt = new JSEncrypt();
                    encrypt.setPublicKey(this.key);
                    let pass = encrypt.encrypt('123456'); 
                    this.$refs['userInformationView'].Gfilters.password = pass; 
                    Service.savePublicUser(this.$refs['userInformationView'].Gfilters).then((res) =>{
                        console.log(res);
                        if(res.status === 200) {
                            this.Suces('保存成功!');
                            window.sessionStorage.setItem("helpBorrowApply_user", JSON.stringify(res.data.data));              
                            this['$alert']('您注册用户的密码为：123456', '密码', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this['$router'].push({
                                        path: '/myBorrow/helpBorrow/helpBorrowApply',
                                    })
                                }
                            });
                        } else {
                            this.Warn('保存失败!');
                        }
                        this.$nextTick(() => { loadingInstance.close();});
                    })
                } else {
                    this.Warn('必填信息不能为空。');
                    return false;
                }
            });
        };
        submitForm2(fileForm1) {//修改表单保存
            this.$refs['userInformationView'].$refs[fileForm1].validate((valid)=>{
                if (valid) {
                    this.Gfilters.userId = this.publicUserId;
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.updatePublicUser(this.$refs['userInformationView'].Gfilters).then((res) =>{
                        console.log(res);
                        if(res.status === 200) {
                            this.Suces('保存成功!');
                            window.sessionStorage.setItem("helpBorrowApply_user", JSON.stringify(res.data.data));
                            this['$router'].push({
                                path: '/myBorrow/helpBorrow/helpBorrowApply',
                            })
                        } else {
                            this.Warn('保存失败!');
                        }
                        this.$nextTick(() => { loadingInstance.close();});
                    })
                } else {
                    this.Warn('必填信息不能为空。');
                    return false;
                }
            });
        };
        // 把图片转为base64
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function() {
                    imgResult = reader.result;
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.onloadend = function() {
                    resolve(imgResult);
                };
            });
        }
    // 获取上传的文件
    getFile(file, fileList) {
        let self = this;
      this.getBase64(file.raw).then(res => {
        console.log(res)
        self.Gfilters.photo = res;
        self.Gfilters.photo = res;
      });
    }
    // 获取上传的文件
    getFile2(file, fileList) {
        console.log(file)
        console.log(fileList)
        // this.publicUserFileList.push(file.raw);
    }
      handleAvatarSuccess(res, file) {
        this.Gfilters.photo = URL.createObjectURL(file.raw);
      };
      handleAvatarSuccess2(res, file) {
        this.Gfilters.photo = URL.createObjectURL(file.raw);
        this.publicUserFileList.push(file.raw);
        // this.publicUserFileList = file.raw;
      };
      beforeAvatarUpload(file) {
          // ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
        const isImage= file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
          this.$message.error('上传头像只能是 图片 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        return isImage && isLt2M;
        
      }
         back():void{
            this['$router'].go(-1);
        };
        // 组件销毁前清除缓存
        beforeDestroy () {
            sessionStorage.removeItem("publicUserData");
        };
        created(){
                let params;
                params = this.$route.params;
                if(params.type === 'addPublicUser') {
                    params = sessionStorage.removeItem("publicUserData");
                }
                if(params && !params.type) {
                    params = JSON.parse(sessionStorage.getItem("publicUserData"));
                }
                if(params && params.type && params.type === 'editPublicUser') {
                    if(params.cardNo) {
                        sessionStorage.removeItem('publicUserData');
                        sessionStorage.setItem("publicUserData", JSON.stringify(params)); //把上个页面的路由带过来的参数保存到sessionStorage 
                    } else {
                        params = JSON.parse(sessionStorage.getItem("publicUserData"));
                    }
                    if(params.cardNo) {
                        this.Gfilters.credentialsNumber = params.cardNo;
                        this.publicUserType = params.type;
                        this.searchUser();
                    }
                } 
                // this.key = sessionStorage.geItem('loginkey');
        };
        mounted(){
            //   this.getFiles();
              window.onresize = () => {
                  return (() => {
                      this.bodyHeight = document.documentElement.clientHeight-260;
                  })()
              };
        };

    };
</script>

<style lang="scss" scoped>
    @import '../../../styles/system/userManagement/addUser.scss';
</style>