<template>
    <section  class="wrapprSection">
        <div class="mainTitle">公众用户管理</div>
        <div class="contentbox contentbox-full">
            <div class="rowBar">
                <div class="searchKey boxshow barbtn" >
                    <el-form :inline="true" > 
                        <el-form-item>
                            <el-button class="defaultBtn" @click="gotopage()">{{userButtonText}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="txt boxshow">查询用户：</div>
                <el-form :inline="true" :model="serachInformation" ref="ruleForm1" class="searchKey boxshow pubform">
                    <el-form-item label="证件类型">
                         <el-select v-model="serachInformation.credentialsType" placeholder="请选择证件类型" style="width:85%" size="small">
                            <el-option label="身份证" value="1"></el-option>
                            <el-option label="护照" value="2"></el-option>
                            <el-option label="军官证" value="3"></el-option>
                            <el-option label="其他" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码">
                        <el-input placeholder="" size="small" v-model="serachInformation.cardNo"></el-input>
                    </el-form-item>  
                    <el-form-item>
                        <el-button class="defaultBtn" @click="searchUser()">检索</el-button>
                        <!-- <el-button class="defaultBtn" >读卡</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
            <div class="pub-main boxshow" :style="formStyle">
                <div class="pub-title" v-show="showSearchHasResultBtn">公众用户信息
                    <span style="float:right;">
                        <el-button class="defaultBtn" @click="gotopage2()">编辑</el-button>
                        <el-button class="redBtn" @click="deletePublicUser()">删除</el-button>
                        <el-button class="defaultBtn" @click="resetPassword()">重置密码</el-button>
                        <el-button class="defaultBtn" @click="showHelpBorrowApply">开始查阅</el-button>
                    </span>
                </div>
                <el-tabs v-show="showSearchHasResultBtn" v-model="activeName" type="card" class="erpTab"  @tab-click="handleClick">                           
                    <el-tab-pane label="用户信息" name="1" >
                        <div v-if="serachData && serachData.length !==0">
                            <div v-for="item in serachData" :class="{'userInformationItem':serachData.length>1}">
                                <div class="userPortraitImgView mt20" v-if="item.photo">
                                    <img v-if="item.photo.indexOf('data:image/jpeg;base64') !== -1" :src="item.photo" alt="">
                                    <img v-else :src="'data:image/jpeg;base64,' + item.photo" alt="">
                                </div>
                                <div class="userInformationView mt20">
                                    <div class="textView">
                                        <el-form :model="ruleForm" label-width="120px" ref="ruleForm" style="padding-left:20px" class="el-form--inline">
                                            <el-form-item label="证件类型：" class="wp-48">
                                                <!-- <template slot-scope="scope">                                                 
                                                    <span v-if="title.fieldName=='YWSL'"> <i class="fa fa-paperclip tableIcon" v-if="scope.row[title.fieldName]>0"></i> </span> 
                                                    <span v-else>{{scope.row[title.fieldName]}}</span>                         
                                                </template> -->
                                                    <span v-if="item.credentialsType=='1'">身份证</span>
                                                    <span v-else-if="item.credentialsType=='2'">护照</span>
                                                    <span v-else-if="item.credentialsType=='3'">军官证</span>
                                                    <span v-else-if="item.credentialsType=='4'">其他</span>
                                            </el-form-item>
                                            <el-form-item label="证件号码：" class="wp-48">
                                                    <span>{{item.credentialsNumber}}</span>
                                            </el-form-item>
                                        </el-form>
                                        <p style="line-height:30px;padding-left:5px;background: #2b87c6;color: #fff;">基本信息</p>
                                        <el-form :model="ruleForm"   label-width="120px" ref="ruleForm" style="padding-left:20px" class="el-form--inline">
                                            <!-- <el-form-item label="用户注册编号：" class="wp-48">
                                                    <span>{{item.userNo}}</span>
                                            </el-form-item> -->
                                            <el-form-item label="姓名：" class="wp-48">
                                                    <span>{{item.fullName}}</span>
                                            </el-form-item>
                                            <el-form-item label="性别：" class="wp-48">
                                                    <span v-if="item.sex=='0'">男</span>
                                                    <span v-else-if="item.sex=='1'">女</span>
                                            </el-form-item>
                                            <el-form-item label="国家地区：" class="wp-48">
                                                    <span v-if="item.nationality=='0'">内地公民</span>
                                                    <span v-else-if="item.nationality=='1'">台港澳同胞</span>
                                                    <span v-else-if="item.nationality=='2'">外国人</span>
                                            </el-form-item>
                                            <el-form-item label="查阅者人数：" class="wp-48">
                                                    <span>{{item.consultantCount}}</span>
                                            </el-form-item>
                                            <el-form-item label="查阅者类型：" class="wp-48">
                                                    <span v-if="item.consultantType=='0'">个人</span>
                                                    <span v-else-if="item.consultantType=='1'">单位</span>
                                            </el-form-item>
                                            <el-form-item label="接待馆及代码：" class="wp-48">
                                                    <span>{{item.archivesAgentCode}}</span>
                                            </el-form-item>
                                        </el-form>
                                        <p style="line-height:30px;padding-left:5px;background: #2b87c6;color: #fff;">其他信息</p>
                                        <el-form :model="ruleForm"   label-width="120px" ref="ruleForm" style="padding-left:20px" class="el-form--inline">
                                            <el-form-item label="出生日期：" class="wp-48">
                                                    <span>{{item.birthday | dateFormat}}</span>
                                            </el-form-item>
                                            <el-form-item label="查档目的：" class="wp-48"> 
                                                    <span v-if="item.purpose=='0'">补办证件</span>
                                                    <span v-else-if="item.purpose=='1'">申办户口</span>
                                                    <span v-else-if="item.purpose=='2'">办理退休</span>
                                                    <span v-else-if="item.purpose=='3'">公证</span>
                                                    <span v-else-if="item.purpose=='4'">购商品住房</span>
                                                    <span v-else-if="item.purpose=='5'">申请廉租房</span>
                                                    <span v-else-if="item.purpose=='6'">经适房</span>
                                                    <span v-else-if="item.purpose=='7'">资料查考</span>
                                                    <span v-else-if="item.purpose=='8'">出证</span>
                                                    <span v-else-if="item.purpose=='9'">编史修志</span>
                                                    <span v-else-if="item.purpose=='10'">研究</span>
                                                    <span v-else-if="item.purpose=='11'">其他</span>
                                            </el-form-item>
                                            <el-form-item label="工作单位：" class="wp-48">
                                                    <span>{{item.company}}</span>
                                            </el-form-item>
                                            <el-form-item label="家庭地址：" class="wp-48">
                                                    <span>{{item.address}}</span>
                                            </el-form-item>
                                            <el-form-item label="通信地址：" class="wp-48">
                                                    <span>{{item.mailingAddress}}</span>
                                            </el-form-item>
                                            <el-form-item label="手机：" class="wp-48">
                                                    <span>{{item.telephone}}</span>
                                            </el-form-item>
                                            <el-form-item label="固定电话：" class="wp-48">
                                                    <span>{{item.fixedTelephone}}</span>
                                            </el-form-item>
                                            <el-form-item label="电子邮件：" class="wp-48">
                                                    <span>{{item.email}}</span>
                                            </el-form-item>
                                            <el-form-item label="邮政编码：" class="wp-48">
                                                    <span>{{item.zipCode}}</span>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="公证文件" name="2">
                        <div class="leftMain mt10 relative" :style="formStyle2">
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
                    </el-tab-pane>
                </el-tabs> 
                <!-- <div class="pub-con">  
                     
                </div> -->
                <div v-if="serachData && serachData.length ===0" v-show="showSearchNoResultBtn" class="searchNoResult" style="text-align: center;margin-top:10%;">
                    <span>查询无结果，请先</span>
                    <el-button class="defaultBtn" @click="gotopage()">注册新用户</el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './userManagement.service';
    import {JSEncrypt} from 'jsencrypt';
    import noPicIcon from '@/imgs/noPic.jpg';
    import moment from 'moment';
    import { Loading } from 'element-ui';
    @Component()
    export default class userManagement extends Vue{
        activeName: string = '1';
        fileForm: any = {};
        filters: any = {};
        imgList: any = [];
        fileUrl:any;
        listDiv:boolean;
        noPic: string = noPicIcon;
        userButtonText: string;
        contentDiv:boolean;
        file:any;
        publicUserId: string;
        showSearchNoResultBtn:boolean;
        showSearchHasResultBtn:boolean;
        fileVisibleMove1:boolean;
        Gfilters:any = {};
        key:any;
        loadingInstance:any={};
        formStyle2: any = {
            "height": Number(document.documentElement.clientHeight-357)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
        loading: Boolean= true;
        serachInformation:any = {};
        serachData :any= [];
        ruleForm: any = {};
        userPortrait: string = 'http://himg.bdimg.com/sys/portrait/item/1b2ee58ba4e5a58be79a84647368323235c240.jpg';
        formStyle: any = {
            "height": Number(document.documentElement.clientHeight-220)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
         constructor(){
            super();
            this.serachInformation = {
                credentialsType:'',
                cardNo:''
            }
            this.imgList = [];
            this.fileUrl = '';
            this.listDiv = true;
            this.contentDiv = false;
            this.file = '';
            this.key = window.sessionStorage.getItem('loginkey');
            this.showSearchNoResultBtn = false;
            this.showSearchHasResultBtn = false;
            this.loadingInstance = null;
            this.userButtonText = '新增用户'
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
                address:'',
                password:'',
                mailingAddress:'',
                photo:'',
                purpose:'',
                receptionist:'',
                reviewer:'',
                telephone:'',
                userNo:'',
                zipCode:'',
            }
            
        };


        handleClick(){
            if(this.activeName === '2') {
                this.getFilesByUserId();
            }
        }
        // pdf 点击事件
        clickIcon(row,index){
            let abc = document.querySelectorAll('.ImgClass');
            for (let i = 0; i < abc.length; i++) {
                abc[i].classList.remove("selectPdfColor");
            }
            abc[index].classList.add("selectPdfColor");
        }
        showHelpBorrowApply(){
            // this.serachData
            if(this.serachData.length === 0){
                this['$message']({
                    message: '请先检索用户信息或者注册用户信息',
                    type: 'warning'
                });
                return;
            }
            window.sessionStorage.setItem("helpBorrowApply_user", JSON.stringify(this.serachData[0]));
            window.sessionStorage.removeItem("fromSp_comFiles");
            window.sessionStorage.removeItem("fromQw_assistFiles");
            window.sessionStorage.removeItem("comTableDataList");
            window.sessionStorage.removeItem("assistTableDataList");
            this['$router'].push({
                path: '/myBorrow/helpBorrow/helpBorrowApply',
            })
        }
        RefreshList() {
            this.getFilesByUserId();
      }
       // 双击打开pdf
        open(filePath,convertStatus){
            let self = this;
            if(convertStatus) {
                    this.contentDiv = true; // iframe PDF显示  
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
        // 检索公众用户
        searchUser() {
            if(this.serachInformation.cardNo === '') {
                this.Warn("请填写证件号码");
                return false;
            }
             if(this.serachInformation.credentialsType === '') {
                this.Warn("请选择证件类型");
                return false;
            }
            if(this.serachInformation.credentialsType === '1') {
                // 身份证校验
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                var str = reg.test(this.serachInformation.cardNo);
                if(!str){
                    this.Warn("请输入正确的身份证号码");
                    return false;
                }
            }
            if(this.serachInformation.credentialsType === '2') {
                // 护照校验
                var reg = /^([a-zA-z]|[0-9]){5,17}$/;
                var str = reg.test(this.serachInformation.cardNo);
                if(!str){
                    this.Warn("请输入正确的护照号码");
                    return false;
                }
            }
            if(this.serachInformation.credentialsType === '3') {
                // 军官证校验
                var reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
                var str = reg.test(this.serachInformation.cardNo);
                if(!str){
                    this.Warn("请输入正确的军官证号码");
                    return false;
                }
            }
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在检索中，请稍等',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.findPublicUserByName(this.serachInformation).then((res) =>{
                if(res.data.succeeded && res.data.data.length !==0 && res.data.data[0] !== null) {
                    this.showSearchNoResultBtn = false;
                    this.showSearchHasResultBtn = true;
                    this.serachData = res.data.data;
                    this.Gfilters.fullName = res.data.data[0].fullName;
                    this.Gfilters.cardNo = res.data.data[0].credentialsNumber;
                    this.publicUserId = res.data.data[0].userId;
                    this.userButtonText = '新增用户'
                } else {
                    this.showSearchNoResultBtn = true;
                    this.showSearchHasResultBtn = false;
                    this.userButtonText = '注册新用户'
                    this.serachData = [];
                }
                this.$nextTick(() => { loadingInstance.close();});
            })
        }
        // 删除公众用户
        deletePublicUser() {
            if(this.publicUserId){
                this['$confirm']('您是否要删除该公众用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在删除中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.deletePublicUser({userId:this.publicUserId}).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.publicUserId  = '';
                            this.serachData = [];
                            this.showSearchHasResultBtn = false;
                        }else{
                            this['$message']({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { loadingInstance.close();});
                    });
                });
            }else{
                this['$message']({
                    message: '请查询要删除的公众用户',
                    type: 'warning'
                });
            }
        }
        // 重置用户密码
        resetPassword() {
            if(this.publicUserId){
                this['$confirm']('您是否要重置该公众用户密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在重置密码中，请稍等',
                            // spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    let encrypt = new JSEncrypt();
                    encrypt.setPublicKey(this.key);
                    let pass = encrypt.encrypt('123456'); 
                    let params={
                            userId:this.publicUserId,
                            password:pass,
                    };      
                    Service.resetPassword(params).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '重置成功',
                                type: 'success'
                            });
                             this.$alert('<strong>123456</strong>', '新密码', {
                                dangerouslyUseHTMLString: true
                            });
                            
                        }else{
                            this['$message']({
                                message: '重置失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { loadingInstance.close();});
                    });
                });
            }else{
                this['$message']({
                    message: '请查询要重置密码的公众用户',
                    type: 'warning'
                });
            }
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
        // 新增公众用户
        gotopage(page){
            this.$router.push({
                    path:'/system/userManagement/addUser',
                    name:'新增公众用户',
                    params: {
                        type:'addPublicUser'
                    }
            });
        };
        // 编辑公众用户
        gotopage2(page){
            if(this.Gfilters.cardNo) {
                    this.$router.push({
                    path:'/system/userManagement/addUser',
                    name:'新增公众用户',
                    params: {
                        userName: this.Gfilters.fullName,
                        cardNo:this.Gfilters.cardNo,
                        type:'editPublicUser'
                    }
                });
            } else {
                this['$message']({
                    type: 'warning',
                    message: '请查询要编辑的公众用户',
                });
            }
            
        };
        created(){  
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
    @import '../../../styles/system/userManagement/userManagement.scss';
</style>