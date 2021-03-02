<template>
    <el-dialog title="公证文件" fullscreen
        :visible.sync="tsVisible"  class="windowDialog " :close-on-click-modal='false' :show-close="true"  >
        <div style="position: absolute;left: 20px; right: 20px; bottom: 60px; top: 70px;" >
            <div class=" mt10 relative"   style="top: -24px; overflow-y: auto;padding: 20px 10px 0px 15px;position: absolute;
                left: 0;width: 200px;bottom: 0;">
                <el-button class="defaultBtn" @click="RefreshList">刷新</el-button>
                <div class="pdfbox boxshow" v-show="imgList.length > 0" style="float: left;height: 90%;margin-top: 19px;width: 100%;overflow-y: auto;padding: 10px 0 10px 0;">                               
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
            <div class=" mt10 relative"   style="overflow-y: auto;padding: 20px 10px 0px 15px; position: absolute;
                left: 210px; right: 0; bottom: 0;top: -30px;">
                <div v-show="contentDiv" style="height:100%;">
                    <div class="div1" style="height:100%;">
                        <iframe id='previewPdf' :src="file" height="100%"
                                width="100%">
                        </iframe>
                    </div>
                </div> 
            </div>
        </div>
        <span slot="footer" style="padding: 10px 20px 25px !important;
            text-align: center !important; position: absolute;bottom: 10px; height: 50px;">   
            <el-button @click="tsVisible=false;" class="defaultBtn">关 闭</el-button>          
        </span>
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from '@/views/system/userManagement/userManagement.service';
    import noPicIcon from '@/imgs/noPic.jpg';
    import { Loading } from 'element-ui';
    @Component
    export default class chooseUserDialog extends Vue{
        activeName: string = '1';		
        tsVisible: boolean= false;
        publicUserId: string ;
        showSearchNoResultBtn:boolean = false;
        showSearchHasResultBtn:boolean = false;
        imgList: any = [];
        noPic: string = noPicIcon;
        passedCredentialsNumber: string = '';
        passedCredentialsType: string = '';
        fileUrl: string = '';
        file: string = '';
        serachData: any = [];
        listDiv: boolean = true;
        contentDiv: boolean = false;
        ruleForm: any = {};
        formStyle2: any = {
            "height": Number(document.documentElement.clientHeight-357)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };

        @Watch('tsVisible')
        showSelectUser(){
            if(this.tsVisible){
                this.searchUser();
                
            }
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

        RefreshList() {
            this.getFilesByUserId();
        }
        searchUser() {
            let params = {
                cardNo: this.passedCredentialsNumber,
                credentialsType: this.passedCredentialsType
            }
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在检索中，请稍等',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.findPublicUserByName(params).then((res) =>{
                if(res.data.succeeded && res.data.data.length !==0 && res.data.data[0] !== null) {
                    this.showSearchNoResultBtn = false;
                    this.showSearchHasResultBtn = true;
                    this.serachData = res.data.data;
                    // this.Gfilters.fullName = res.data.data[0].fullName;
                    // this.Gfilters.cardNo = res.data.data[0].credentialsNumber;
                    this.publicUserId = res.data.data[0].userId;
                    // this.userButtonText = '新增用户'
                } else {
                    this.showSearchNoResultBtn = true;
                    this.showSearchHasResultBtn = false;
                    // this.userButtonText = '注册新用户'
                    this.serachData = [];
                }
                this.$nextTick(() => { 
                    loadingInstance.close();
                    this.getFilesByUserId();
                });
            })
        }

        handleClick(){
            if(this.activeName === '2') {
                
            }
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
       
        submit(){
        }; 
        created(){            
        };    
        mounted(){ 
        };
      }
    
 </script>