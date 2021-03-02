<template>
<section class="wrapprSection newlywenjianView eepListView">
        <div class="mainTitle">
           <span>查看详情</span>           
           <el-button class="defaultBtn rt mt10" @click="back">返回</el-button>
        </div> 
        <div class="leftMain">                      
            <div class="leftMainCon boxshow">
                    <el-form  class="formAddfile" :model="formAddfile" label-width="133px" ref="formAddfile">
                            <template v-for="item in addArray">
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==1 && !item.hidden">
                                    <el-button class="checkWay" :disabled="1 === 1" >{{item.caption}}</el-button>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="(item.editControl==2 || item.editControl==0)&&item.fieldName!='XMBH'&&item.fieldName!='XMMCNEW'&&item.fieldName!='FLH'&&item.fieldName!='WJRQ'&&item.fieldName!='QZH'&&item.fieldName!='AJH'&&item.fieldName!='JNSXH'&&item.fieldName!='QZRQ' && !item.hidden" :prop="item.fieldName">
                                    <el-input :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" :disabled="1 === 1" ></el-input>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='AJH' && !item.hidden" :prop="item.fieldName">
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]" :maxlength="item.maxLength" placeholder="正确格式:如1或1-1"></el-input>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='JNSXH' && !item.hidden" :prop="item.fieldName">
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]" placeholder="正确格式:如1"  :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='WJRQ' && !item.hidden" :prop="item.fieldName">
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'"v-if="item.fieldName=='QZRQ' && !item.hidden" :prop="item.fieldName" >
                                    <el-date-picker :disabled="1 === 1"  :readonly="!item.allowEdit" type="daterange" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8 && !item.hidden" :prop="item.fieldName">
                                    <el-input  :disabled="1 === 1"  :readonly="!item.allowEdit" v-model.number="formAddfile[item.fieldName]" type="number" min="0" :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='FLH' && !item.hidden" :prop="item.fieldName">
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                                   
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3 && !item.hidden" :prop="item.fieldName">
                                    <el-select :disabled="1 === 1"  :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]">
                                        <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="!item.allowEdit">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9&&item.fieldName!='BZ' && !item.hidden" :prop="item.fieldName" >
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="formAddfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.fieldName=='BZ' && !item.hidden" :prop="item.fieldName">
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="formAddfile[item.fieldName]" :maxlength="item.maxLength" placeholder="需填写文件形式：原件，复印件，查档件"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName==('XMBH'||item.fieldName=='XMMCNEW') && !item.hidden" :prop="item.fieldName" >
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!isProjectCompany"></el-input>
                                    <el-select  :disabled="1 === 1"  filterable  v-model="formAddfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMBH'">
                                        <el-option v-for="ind in projectCodearr" :key="ind.id" :label="ind.projectCode" :value="ind.projectCode" @click.native="projectCodechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                                    </el-select>
                                    <el-select  :disabled="1 === 1"  filterable  v-model="formAddfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMMCNEW'">
                                        <el-option v-for="ind in projectNamearr" :key="ind.id" :label="ind.projectName" :value="ind.projectName"  @click.native="projectNamechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='QZH' && !item.hidden" prop="QZH" >
                                    <el-input :disabled="1 === 1"  :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!ISJT"></el-input>
                                    <el-select :disabled="1 === 1"  v-model="formAddfile[item.fieldName]"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" v-if="ISJT">
                                        <el-option v-for="item in JTarr" :key="item.id" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-form>         
            </div>     
        </div>
  <div class="contentbox" ref="contentbox">
        <el-tabs v-model="activeName" type="card" class="erpTab">                                                  
            <el-tab-pane label="原文列表" name="1" >                                               
            </el-tab-pane>
            <el-tab-pane label="处置历史" name="2">  
                                                  
            </el-tab-pane> 
        </el-tabs>        
            <div class="pdfbox boxshow" v-if="activeName==1">
                <div class="absolute r15">
                    <el-button class="defaultBtn"  style="float:right;margin:5px 0;" @click="showOriList" v-show="oriListBtnVisible">原文列表</el-button>          
                </div>
                <div  v-show="listDiv" style="height:100%;">
                    <div class="div1 scrollFiles">
                        <div class="pImg" v-for="(item,index) in imgList" :key="index"  v-if="item.fileType==0">
                            <div class="ImgClass" :class='{selectPdfColor:index==nowIndex}' >
                                <img :id="'thumbnail'+index" @click="clickIcon(item, index)" @dblclick="open(item.id,item.extension,item.efileType,item.convertStatus)" :src="noPic" alt="">
                            </div>                          
                            <div class="p2">{{item.originalFileName }}</div>                          
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
                    <video id="myVideo" class="video-js vjs-default-skin" controls preload="auto" >                     
                        <source :src="videoSrc" type="application/x-mpegURL">
                    </video>  
                </div>  
                <!-- 音频展示 -->
                <div class="AudioView" v-show="AudioContentDiv"> 
                    <audio  id="myAudio" :src="AudioSrc" controls="controls" controlsList="nodownload" autoplay="autoplay"></audio>
                </div>            
            </div> 
            <div class="footBtn boxshow" v-show="!redactFile" >
                <el-button class="defaultBtn" @click="showDialog">原文元数据</el-button>
            </div>
            <history v-if="activeName=='2'" :libId="getLibid" :objectId="getID"></history>         
        </div>
          <el-dialog
            title="目录信息"
            :visible.sync="isshowDialog"
            class="myDialogCenter" :append-to-body='true'> 
            <div  style="max-height:400px; overflow:auto">    
              <table  border="1" class="el-table defaultTable el-table--border" >                    
                    <tbody class="el-table__body">
                        <tr class="el-table__row" v-for="itme in detailsData">
                            <td class="gtd" width="180"><div class="cell">{{itme.name}}</div> </td> 
                            <td><div class="cell text-left" v-if="detailsData">{{itme.value}}</div> </td> 
                        </tr>                          
                    </tbody>
                </table> 
            </div> 
          <span slot="footer" class="dialog-footer">
            <el-button class="defaultBtn" @click="isshowDialog= false;">关闭</el-button>
          </span>          
       </el-dialog>  
       
            
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './eeplist.service';
    import all from '../../../../utils/firstSlice.js';
    import crc32 from '@/utils/crc32.js';
    import { Loading } from 'element-ui';
    import base from '@/scrollLoad';
    import history from '../../history/history';
    import noPicIcon from '@/imgs/noPic.jpg';  
    import videojs from 'video.js'
    import 'videojs-contrib-hls'
    @Component({
        components: { 
            history
        }
    })
    export default class appfileManagement extends Vue{
        activeName:string = '1';     
        getID:string = '';
        videoSrc:any='';
        AudioSrc:any=''; 
        myVideo:any;     
        getLibid:string = '';
        thumbnailSrc:string = '../../../../imgs/noPic.jpg';
        archiveAgentCode:string=window.sessionStorage.getItem('archiveAgentCode');     
        loading: Boolean= false;
        videoContentDiv: Boolean= false;
        AudioContentDiv: Boolean= false;
        isshift: Boolean= false; 
        baseUrl: string =  process.env.API_BASEURL2;          
        listDiv:boolean= true;
        contentDiv:boolean = false;;
        redactFile:boolean=false;       
        total : number;
        title:string = '';
        originalGuid:string = '';
        downTitle:string = '';
        type:string = '';
        downType:string = '';     
        noPic: string = noPicIcon;
        archiveId : number = null;
        pageSize : number;
        loadingInstance:any= null;
        nd: number;
        fileUrl:any='';
        deleteID: any = [];
        nowIndex: number=-1;
        qzh : string ="";
        Id : number;     
        allChoose : boolean = false      
        EditArr:any={}; 
        ajh : number;
        flh : number;
        xmbh : number;
        xmmcnew : string;
        formAddfile:any={};  
        fileList :  any = {};
        addArray : any = [];
        imgList: any = [];
        isProjectCompany:boolean = false;
        clickBookShow:boolean= false;;
        projectCodearr:any=[];
        projectNamearr:any=[];   
        file:any= '';     
        fondCode:string;       
        oriListBtnVisible:boolean = false;  
        processColor : string = 'rgb(247,78,0)';
        ISJT:boolean = false;
        JTarr:any=[];
          detailsData:any=[];
        isshowDialog:boolean=false;
 
    
        constructor(){
            super();
            this.myVideo = {};
        }
         //原文元数据
        showDialog(){
           if(this.deleteID.length>0 && this.deleteID.length==1){
                    let params = {
                        guid:this.deleteID[0]
                    };  
                     this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在加载，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );                      
                    Service.getMetadata(params).then(res => {
                        if(res.data.succeeded){
                             this.detailsData=res.data.data
                             this.isshowDialog=true;                        
                        }else{
                            this['$message']({
                                message: '获取信息失败,请稍后再试',
                                type: 'error'
                            });
                        }  
                         this.$nextTick(() => { this.loadingInstance.close();});                          
                    });
               
            }else{
                this['$message']({
                    message: '请选择一个需要查看的文件',
                    type: 'warning'
                });
            }
        }
        // pdf 点击事件
        clickIcon(row,index){
            if(this.isshift) {
                let abc = document.querySelectorAll('.ImgClass');
                abc[index].classList.add("selectPdfColor");
                this.deleteID.push(this.imgList[index].guid);
                if(this.deleteID.length===1){
                    this.downType = this.imgList[0].extension;
                    this.downTitle = this.formAddfile.TM;
                }else{
                    this.downTitle = this.formAddfile.TM;
                    this.downType = 'zip'
                }
                this.allChoose = true;
            } else {
                this.deleteID = [];
                this.deleteID.push(this.imgList[index].guid);
                this.downType = this.imgList[index].extension;
                this.downTitle = this.imgList[index].title;
                this.nowIndex = index;
                this.allChoose = false;
            }
           
        }
        keyevent() {
            var that = this;
            document.onkeydown = function(e) { //按下键盘 
              switch(e.keyCode) {
                case 16:
                  that.isshift = true;
                  break;
              }
            };
            document.onkeyup = function(e) { //放弃键盘 
              switch(e.keyCode) {
                case 16:
                  that.isshift = false;
                  break;
              }
            };
        };
        back():void{
            this['$router'].go(-1);
        };

       getVideo() {
           this.myVideo = videojs("myVideo", {
                bigPlayButton: true,
                textTrackDisplay: false,
                posterImage: false,
                errorDisplay: false,
                controlBar: true,
                hls: {
                 withCredentials: true
                }
            });           
        }


        showOriList(){
            this.listDiv = true;
            this.contentDiv = false;
            this.oriListBtnVisible = false;
            this.videoContentDiv = false;
            this.AudioContentDiv = false;
            this.redactFile = false; // 底部按钮显示
            this.myVideo.pause(); // 视频暂停
            document.getElementById('myAudio').pause(); // 音频暂停
        }
 

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
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };
        // 双击打开pdf
        open(id,extension,efileType,convertStatus){
                    let fileName; 
                    debugger;
                    this.imgList.forEach(row =>{
                        if(row.fileType==1 && row.originalId == id){
                                fileName = row.fileName
                        } 
                    })  
                    if(!fileName){
                        this.getError('该文件还未被转换');
                        return false;
                    }
            // 文件展示
            if(efileType === 'Video') {// 视屏展示
                // this.clickBookShow = true;
                // this.listDiv = false; // 原文列表隐藏
                // this.oriListBtnVisible = true; //原文列表按钮显示
                // this.redactFile = true; // 底部按钮隐藏
                // this.videoContentDiv = true; // 视频显示                         
                // Service.getVideoFile({}, guid).then(res => {                    
                //     let url2 = URL.createObjectURL(res.data);
                //     this.videoSrc = url2;
                // });
                this.Warn('不支持播放视频。');
            }else if(efileType === 'Audio'){
                this.clickBookShow = true;
                this.listDiv = false; // 原文列表隐藏
                this.oriListBtnVisible = true; //原文列表按钮显示
                this.redactFile = true; // 底部按钮隐藏
                this.AudioContentDiv = true; // 视频显示
                this.AudioSrc = this.baseUrl+'/archiveAip/exportAipAttaFile?fileName='+fileName+'&id='+this.archiveId
                // var url = encodeURIComponent(this.AudioSrc); 
                document.getElementById('myAudio').setAttribute('src',this.AudioSrc)
            }else{
                this.clickBookShow = true;
                this.listDiv = false; // 原文列表隐藏
                this.oriListBtnVisible = true; //原文列表按钮显示
                this.redactFile = true; // 底部按钮隐藏
                this.contentDiv = true; // iframe PDF显示               
                this.fileUrl = this.baseUrl+'/archiveAip/exportAipAttaFile?fileName='+fileName+'&id='+this.archiveId
                var url = encodeURIComponent(this.fileUrl);
                this.file = 'static/pdf/web/viewer.html?file=' + url;
                document.getElementById('previewPdf').setAttribute('src',this.file)
          
            }
        }
        //失败信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
       
        // 切换原文状态
        clickBook(){
            this.contentDiv = false;
            this.listDiv = true;
            this.clickBookShow = false;
        }
        async getAllIcons(img,index){      
            Service.downloadThumbnail({},img.guid).then(res=>{
                if(res.data.succeeded){
                    let imageElement = document.getElementById("thumbnail"+index);
                    imageElement.src = "data:image/jpg;base64,"+res.data.data;
                }else{
                    
                }
            });
        };
        projectCodechange(item,ind){
        };
        projectNamechange(item,ind){
        }

        //查看卷内文件 编辑
        getEditFieldValueFn(obj) {
            let self = this;
            self.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在加载，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'hsla(0,0%,100%,.9)'
                        }
                    );
            Service.getEditFieldValue(obj).then(res=>{
                if(res.data.succeeded){
                    self.EditArr = JSON.parse(JSON.stringify(res.data.data));
                    self.formAddfile = res.data.data.archive;
                    let files = res.data.data.AttachedFileInfo;
                    this.archiveId =  res.data.data.aipId;
                    let i = 0;
                    for(var index in files){
                        let img = files[index];
                        if(img.url){
                            continue;
                        }
                        let imageElement = document.getElementById("thumbnail"+i);
                        if(imageElement != null){
                           imageElement.src = this.noPic;
                        }
                        if(img.thumbnailStatus){
                            this.getAllIcons(img,i);
                        }
                        this.imgList.push(img);
                        i++;
                    }
                }else{
                    self.getError(res.data.errorMessage)
                }
                self.$nextTick(() => { this.loadingInstance.close();});
            })
        }
        
        //文件级取得新增、编辑案卷页面的输入项配置
        getEditField(obj) {
            var self = this;
            self.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在加载，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'hsla(0,0%,100%,.9)'
                        }
                    );
            Service.getEditField(obj).then(res=>{
                if(res.data.succeeded){
                    self.addArray=res.data.data;
                    self.formAddfile={};
                    for(var item of res.data.data){
                        self['$set'](self.formAddfile,item.fieldName,null);
                    };                   
                    self.loading = false;
                   //查看卷内文件 编辑
                   self.getEditFieldValueFn({"archiveAgentCode": self.archiveAgentCode,"libId": self.getLibid,"id":self.getID});
                   
                }else{
                    self.getError(res.data.errorMessage)
                }
                self.$nextTick(() => { self.loadingInstance.close();});
            })   
        }
        // 组件销毁前注销视频实例
        beforeDestroy () {
            this.myVideo.dispose();
        };
        created(){          
                let params;
                params = this.$route.params;               
                if(params.current) {
                    sessionStorage.removeItem('eepcurrent');
                    sessionStorage.setItem("eepcurrent", JSON.stringify(params)); //把上个页面的路由带过来的参数保存到sessionStorage 
               
                } else {
                    params = JSON.parse(sessionStorage.getItem("eepcurrent"));
                }                
               this.getID = parseInt(params.current.id);
               this.getLibid = params.libId;          
                //取得新增、编辑案卷页面的输入项配置
                this.getEditField({"phase":2,"libId":this.getLibid});    
               
        };
        mounted(){          
            this.keyevent();
            this.$nextTick(() => {
                this.getVideo();
            });
        };
        //全宗号搜索
        remoteMethod(query){
            if (query !== '') {
                Service.searchFondsForInput(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.JTarr = data.map(item => {
                            return { value:item.fondCode, label: item.fondName+item.fondCode,id:item.id};
                        });
                        setTimeout(() => {
                            this.JTarr = this.JTarr.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
                        this['$message']({
                            message: '查询全宗号联想错误！',
                            type: 'error'
                        });
                    }
                });
            } else {
                this.JTarr = [];
            }
        }
    };

</script>

<style lang="scss" scoped>   
    @import '../../../../styles/innerPublic.scss';
     @import '../../../../styles/fileManage/newlywenjian';
    .eepListView {
        .leftMain {
            .leftMainCon  {
                bottom:10px;
            }
        }
        .AudioView {
            padding: 15px;
        }
        .videoView{
            width: 1300px;
            margin: 40px auto;
            video{
                width: 100%;
            }
        }
    }
</style>