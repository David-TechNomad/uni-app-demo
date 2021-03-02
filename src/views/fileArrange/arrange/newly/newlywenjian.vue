<template>
<section class="wrapprSection newlywenjianView">
        <div class="mainTitle">
           <span v-if="getType === 'file' ">新增案卷级文件</span>
           <span v-if="getType === 'documents' ">新增文件级文件</span>
           <span v-if="getType === 'Ingroupfile' ">新增卷内文件</span>
           <span v-if="getType === 'fileEdit' ">编辑案卷级文件</span>
           <span v-if="getType === 'documentsEdit' ">编辑文件级文件</span>
           <span v-if="getType === 'IngroupfileEdit' ">编辑卷内文件</span>
           <span v-if="getType === 'findFile' ">查看案卷级文件</span>
           <span v-if="getType === 'findDocuments' ">查看文件级文件</span>
           <span v-if="getType === 'findIngroupfile' ">查看卷内文件</span>
           <el-button class="defaultBtn rt mt10" @click="goToPage" v-if="getType === 'file' || getType === 'documents' || getType === 'Ingroupfile' || getType === 'file' || getType === 'fileEdit' || getType === 'documentsEdit' || getType === 'IngroupfileEdit' ">返回</el-button>
           <el-button class="defaultBtn rt mt10" @click="back" v-else>返回</el-button>
        </div> 
        <div class="leftMain">                      
            <div class="leftMainCon boxshow">
                    <el-form  class="formAddfile" :model="formAddfile" label-width="133px" ref="formAddfile">
                            <template v-for="item in addArray">
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==1 && !item.hidden">
                                    <el-button class="checkWay" :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }">{{item.caption}}</el-button>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="(item.editControl==2 || item.editControl==0)&&item.fieldName!='XMBH'&&item.fieldName!='XMMCNEW'&&item.fieldName!='FLH'&&item.fieldName!='WJRQ'&&item.fieldName!='QZH'&&item.fieldName!='AJH'&&item.fieldName!='JNSXH'&&item.fieldName!='QZRQ' &&item.fieldName!='FONDS_CODE' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                                    <el-input :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }"></el-input>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='AJH' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:AJHvalidator,trigger:'change'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]" :maxlength="item.maxLength" placeholder="正确格式:如1或1-1"></el-input>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='JNSXH' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:JNSXvalidator,trigger:'change'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]" placeholder="正确格式:如1"  :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='WJRQ' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:timevalidator,trigger:'blur'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <!-- 全宗号 -->
                                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='FONDS_CODE' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" @change="changeInput(val, index)"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'"v-if="item.fieldName=='QZRQ' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                                    <el-date-picker :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" type="daterange" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8 && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:myvalidator,trigger:'blur'}]">
                                    <el-input  :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model.number="formAddfile[item.fieldName]" type="number" min="0" :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='FLH' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                                    <!-- <el-input :readonly="true" v-model="flhName"   :maxlength="item.maxLength" @focus="SelectFlh(item.allowEdit)"></el-input> -->
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3 && !item.hidden && item.fieldName !== 'FONDS_NAME' && item.fieldName !== 'CATEGORY_CODE'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                                    <el-select :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]">
                                        <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="!item.allowEdit">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- 全宗名称下拉 -->
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3 && !item.hidden && item.fieldName === 'FONDS_NAME'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                                    <el-select style="max-width:223px" :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName2]" @change="changeSelect($event)">
                                        <el-option style="max-width:223px" v-for="ind in item.dictData" :label="ind.fondName" :value="ind.fondCode" :key="ind.fondCode" :disabled="!item.allowEdit">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                 <!-- 档案门类代码 -->
                                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3 && !item.hidden && item.fieldName === 'CATEGORY_CODE'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' || item.fieldName === 'CATEGORY_CODE'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" v-model="formAddfile[item.fieldName + '_Text']"   :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9&&item.fieldName!='BZ' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="formAddfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.fieldName=='BZ' && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="formAddfile[item.fieldName]" :maxlength="item.maxLength" placeholder="需填写文件形式：原件，复印件，查档件"></el-input>
                                </el-form-item>
                                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName==('XMBH'||item.fieldName=='XMMCNEW') && !item.hidden" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'change'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!isProjectCompany"></el-input>
                                    <el-select  :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" filterable  v-model="formAddfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMBH'">
                                        <el-option v-for="ind in projectCodearr" :key="ind.id" :label="ind.projectCode" :value="ind.projectCode" @click.native="projectCodechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                                    </el-select>
                                    <el-select  :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" filterable  v-model="formAddfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMMCNEW'">
                                        <el-option v-for="ind in projectNamearr" :key="ind.id" :label="ind.projectName" :value="ind.projectName"  @click.native="projectNamechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='QZH' && !item.hidden" prop="QZH" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                                    <el-input :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="formAddfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!ISJT"></el-input>
                                    <el-select :disabled="getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile'" :class="{ 'is-disabled': getType === 'findFile' || getType === 'findDocuments' || getType === 'findIngroupfile' }" v-model="formAddfile[item.fieldName]"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" v-if="ISJT">
                                        <el-option v-for="item in JTarr" :key="item.id" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-form>         
            </div>
            <div class="footBtn boxshow">
                <div class="d-ib" v-if="getType === 'documentsEdit' || getType === 'IngroupfileEdit' || getType === 'fileEdit' || getType === 'findDocuments' || getType === 'findIngroupfile' || getType === 'findFile'">
                    <el-button class="defaultBtn" @click="proOne">上一条</el-button>
                    <el-button class="defaultBtn" @click="nextOne">下一条</el-button>
                </div>
                <el-button class="defaultBtn" @click="keepAdd('formAddfile')" v-if="getType !== 'findFile' && getType !== 'findDocuments' && getType !== 'findIngroupfile'">保存</el-button>
            </div>
        </div>
  <div class="contentbox" ref="contentbox">
        <el-tabs v-model="activeName" type="card" class="erpTab" v-if="getType === 'documents' || getType === 'Ingroupfile' || getType === 'documentsEdit'|| getType === 'findDocuments' || getType === 'findIngroupfile' || getType === 'IngroupfileEdit' || getType === 'fileEdit'">                                                  
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
                        <div class="pImg" v-for="(item,index) in imgList" :key="index">
                            <div class="ImgClass" :class='{selectPdfColor:index==nowIndex}' @click="clickIcon(item, index)" @dblclick="open(item.guid,item.extension,item.efileType,item.convertStatus)">
                                <img :id="'thumbnail'+index" :src="noPic" alt="" v-if="item.efileType === 'Document' || item.efileType === 'Video' || item.efileType === 'Image'">
                                <img :id="'thumbnail'+index" :src="noPic2" alt="" v-else-if="item.efileType === 'Audio'" style="width: 70%;height: 70%;position: absolute;left: 50%;top: 50%;margin-left: -35%;margin-top: -30%;">
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
                    <video id="myVideo" :src="videoSrc" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" :style="videoStyle">
                       <!--https://v2.xw0371.com/20180401/wiyCDyE3/index.m3u8-->
                        <source :src="videoSrc" type="application/x-mpegURL" id="source">
                    </video>
                    <!-- <video id="myVideo2" controls="controls" autoplay type="application/x-mpegURL">
                        您的浏览器不支持 video 标签。
                    </video> -->
                    <!-- <video id="myVideo" class="video-js" controls preload="auto" style="width:100%;height:640px"
                        poster="" data-setup='{"html5" : { "nativeTextTracks" : false }}'>
                        <source type='application/x-mpegURL'>
                        <p class="vjs-no-js">
                            To view this video please enable JavaScript, and consider upgrading to a web browser that
                            <a href=" " target="_blank">supports HTML5 video</a>
                        </p >
                    </video> -->
        
                </div>  
                <!-- 音频展示 -->
                <div class="AudioView" v-show="AudioContentDiv" > 
                    <audio  id="myAudio" :src="AudioSrc" controls="controls" controlsList="nodownload" autoplay="autoplay"></audio>
                </div>            
            </div>            
            <div class="footBtn boxshow" v-show="!redactFile" >
                <!-- <el-button class="defaultBtn" @click="tableAll" v-if="getType === 'file' || getType === 'documents' || getType === 'Ingroupfile'">全选</el-button>
                <el-button class="defaultBtn" @click="tableAll1" v-if="getType === 'file' || getType === 'documents' || getType === 'Ingroupfile'">取消选择</el-button> -->
                <el-button class="defaultBtn" v-if="getType === 'file' || getType === 'documents' || getType === 'Ingroupfile'" @click="SingleMount">挂接</el-button>
                <el-button class="defaultBtn" v-if="getType === 'documentsEdit' || getType === 'IngroupfileEdit' || getType === 'fileEdit'" @click="SingleMount2">挂接</el-button>
                <el-button class="defaultBtn" @click="deleteOldFiles" v-if="getType !== 'findFile' && getType !== 'findDocuments' && getType !== 'findIngroupfile'">删除原文</el-button>
                <el-button class="defaultBtn" @click="getOriList" v-if="getType !== 'findFile' && getType !== 'findDocuments' && getType !== 'findIngroupfile'">刷新</el-button>
                <!-- <el-button class="defaultBtn" @click="downloadList" v-if="getType === 'file' || getType === 'documents' || getType === 'Ingroupfile'">下载</el-button> -->
                <el-button class="defaultBtn" @click="showDialog">原文元数据</el-button>
            </div>
             <history v-if="activeName=='2'" :libId="getLibid" :objectId="getID"></history>   
        </div>
         <!--挂接原文弹框-->
		<singleUploadFilesDialog ref="singleUploadFilesDialogRef"></singleUploadFilesDialog>
        <!-- <el-dialog  class="myDialogCenter" title="挂接原文" :visible.sync="centerDialogVisibleSingleMount" :close-on-click-modal="true" width="30%">
            <el-form class="formAddfile">
                <el-form-item label="文件名：" label-width="90px" class="mt10">
                    <el-input style="float:left;width:60%;" v-model="addFileName" readonly></el-input> -->
                    <!-- 上传 -->
                    <!-- <uploader
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
        </el-dialog> -->
        <el-dialog class="fileModal" title="选择下载方式" :visible.sync="fileDwonVisible" :close-on-click-modal="true">
            <el-form :model="fileForm" label-width="80px" ref="fileForm">
                <el-form-item prop="fileName">
                    <el-checkbox-group v-model="fileForm.resource">
                        <el-checkbox label="1">原始格式文件</el-checkbox>
                        <el-checkbox label="2" :disabled = 'pdfSite'>pdf版式文件</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="enterLendList()">确定</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog :show-close = 'false' class="fileModal processModal" :visible.sync="fileVisible1" :close-on-click-modal="false">
            <div>
                <el-progress type="circle" :stroke-width="12" :percentage="process" color="rgb(146,176,0)"></el-progress>
            </div>
        </el-dialog> -->
           <el-dialog
            title="目录信息"
            :visible.sync="isshowDialog"
            class="myDialogCenter" :append-to-body='true'> 
            <div  style="max-height:400px; overflow:auto">    
              <table  border="1" class="el-table defaultTable el-table--border" >                    
                    <tbody class="el-table__body">
                        <tr class="el-table__row" v-for="itme in detailsData">
                            <td class="gtd" width="180"><div class="cell text-left">{{itme.name}}</div> </td> 
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
    import Service from './newlywenjian.service';
    import all from '../../../../utils/firstSlice.js';
    import crc32 from '@/utils/crc32.js';
    import { Loading } from 'element-ui';
    import HttpRequest from '@/api/request';
    import base from '@/scrollLoad';
    import noPicIcon from '@/imgs/noPic.jpg';
    import noPicIcon2 from '@/imgs/musicPic.png';
    import history from '../../history/history';
    import { defaultFormatUtc } from 'moment';
    import singleUploadFilesDialog from '../../../common/singleUploadDialog/singleUploadFilesDialog.vue';
    import videojs from 'video.js'
    import 'videojs-contrib-hls'
    @Component({
        components: { 
            singleUploadFilesDialog,
            history
        }
    })
    export default class appfileManagement extends Vue{
        typeBoolean:boolean;
        pdfSite:boolean  = false;
        activeName:string = '1';
        getType:string = '';
        getID:string = '';
        videoSrc:any='';
        videoStyle: any = {
            "height": Number(document.documentElement.clientHeight-300)+'px',
			"width":'100%'
        };
        AudioSrc:any='';
        clientId:string;
        getLibid:string = '';
        IngroupfileID:string = '';
        videoObject:any={};
        anJuanLibId:string = '';
        uploadFileId:string = '';
        thumbnailSrc:string = '../../../../imgs/noPic.jpg';
        archiveAgentCode:string;
        crc:string = '';
        loading: Boolean= false;
        videoContentDiv: Boolean= false;
        AudioContentDiv: Boolean= false;
        isshift: Boolean= false;
        OrderNum: number;
        tableData: any = [];
        tablelist: any = [];
        urlImg:any;
        myVideo:any;
        baseUrl:any;
        baseUrl2:any;
        listDiv:boolean;
        contentDiv:boolean;
        redactFile:boolean;
        centerDialogVisibleTree : boolean;
        centerDialogVisibleSingleMount: boolean;
        total : number;
        fondId: number;
        kinId : number;
        newFilesIds: number;
        title:string = '';
        originalGuid:string = '';
        downTitle:string = '';
        type:string = '';
        downType:string = '';
        fileDwonVisible:boolean = false;
        noPic: string = noPicIcon;
        noPic2: string = noPicIcon2;
        fileForm:any={
            resource:['1']
        };
        archiveId : number;
        crcsCalculated: number;
        bids : number;//卷内文件库libId
        pageSize : number;
        loadingInstance:any={};
        mj : number;
        nd: number;
        parentId: number;
        fileUrl:any;
        deleteID: any = [];
        nowIndex: number;
        qzh : string;
        Id : number;
        addFileTrue : boolean;
        allChoose : boolean = false
        basicForm : any = {};
        EditArr:any={};
        prepareBlob:any={};
        wenId:number;
        ajh : number;
        bgqx:number;
        bm : string;
        flh : number;
        xmbh : number;
        xmmcnew : string;
        bytesPerChunk:any;//总速率;
        formAddfile:any={};
        fileSingle:any={};
        fileList :  any = {};
        addArray : any = [];
        imgList: any = [];
        isProjectCompany:boolean = false;
        clickBookShow:boolean;
        projectCodearr:any=[];
        projectNamearr:any=[];
        documentTableData:any=[];
        arrsStart:any=[];
        jsonVersionOfNewFiles:  any = {}
        addFileName:string;
        addFileTitle:string;
        CATEGORY_CODE:string = '';
        file:any;
        $refs: { uploader: HTMLFormElement};
        fondCode:string;
        fondCode2:number;
        firstClick:boolean;
        keepAddData:boolean = false;
        oriListBtnVisible:boolean = false;
        keepRight:boolean = false;
        FLhArr:any=[];
        processStop:boolean = false;
        fileVisible1: boolean = false;
        process: number = 0;
        processColor : string = 'rgb(247,78,0)';
        ISJT:boolean = false;
        JTarr:any=[];
        findFondsByName:any=[];
        FlhTrue:boolean;
        flhType:any={};
        flhName:any;
        flhValue:any;
         detailsData:any=[];
        isshowDialog:boolean=false;
        constructor(){
            super();
            this.listDiv = true;
            this.centerDialogVisibleTree = false;
            this.centerDialogVisibleSingleMount = false;
            this.qzh = "";
            this.nowIndex = -1;
            this.fileSingle = {};
            this.redactFile=false;
            this.contentDiv = false;
            this.clickBookShow = false;
            this.file = '';
            this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
            this.deleteID = [];
            this.baseUrl = process.env.upload_BASEURL
            this.baseUrl2 = process.env.video_BASEURL
            this.archiveId = null;
            this.loadingInstance = null;
            this.basicForm = {};
            this.jsonVersionOfNewFiles = {};
            this.addFileTrue = true;
            this.arrsStart = [];
            this.videoObject = {
                container: '#video', //容器的ID或className
				variable: 'player',//播放函数名称
				poster:'',//封面图片
				video: ''
            }
            this.imgList = [];
            this.fileUrl = '';
            this.addArray = [];
            this.formAddfile={};
            this.addFileName = '';
            this.addFileTitle = '';
            this.newFilesIds = 0;
            this.crcsCalculated = 0;
            this.EditArr={};
            this.bytesPerChunk = null;
            this.projectCodearr=[];
            this.documentTableData = [];
            this.projectNamearr=[];
            this.prepareBlob = {
                yes:true
            };
            this.firstClick = true;
            this.FLhArr=[];
            this.JTarr = [];
            this.myVideo = {};
            this.FlhTrue = false;
            this.flhType = {
                children: "children",
                label: "categoryNumberText"
            };
            this.flhName=null;
            this.flhValue=null;
        }

        //刷新原文列表
        getOriList() {
            this.getOriginalsList(this.archiveId);
        }
        // pdf 点击事件
        clickIcon(row,index){
            let abc = document.querySelectorAll('.ImgClass');
            if(this.isshift) {
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
                for (let i = 0; i < abc.length; i++) {
                    abc[i].classList.remove("selectPdfColor");
                }
                abc[index].classList.add("selectPdfColor");
                this.allChoose = false;
            }
            console.log(this.deleteID);
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
        downloadList(){
            if(this.deleteID.length>0){
                this.fileDwonVisible = true;
                // 单个
                if(this.nowIndex>0){
                    if( this.downType!=='pdf'&&!this.typeBoolean){
                        this.pdfSite = true; //禁用
                    }else{
                        this.pdfSite = false;
                    }
                }else{
                    // 多个
                    let att = [];
                    for(let a of this.imgList){
                        if(a.extension!=='pdf'&&a.convertFlag===false){
                            att.push(a)
                        }
                    }
                    if(att.length===this.imgList.length){
                        this.pdfSite = true; //禁用
                    }else{
                        this.pdfSite = false;
                    }
                }
            }else{
                this['$message']({
                    message: '请选择需要下载的文件',
                    type: 'warning'
                });
            }
        };
        //上一条
        proOne():void{
            var stepTrue=true;
            for (var key in this.formAddfile){
                if(this.formAddfile[key]!=this.EditArr[key]){
                    stepTrue=false;
                };
            };
            if(stepTrue || this.keepAddData){
                this.goproOne();
            }else{
                this['$confirm']('是否对上一条数据进行保存', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '不保存',
                    type: 'warning'
                }).then(() => {
                    this.keepAdd('formAddfile',this.goproOne);
                }).catch(() => {
                    this.goproOne()
                });
            }
        };

        //前往上一条
        goproOne(){
                if(this.contentDiv) {
                    this.listDiv = true;
                    this.contentDiv = false;
                    this.oriListBtnVisible = false;
                    this.redactFile = false; // 底部按钮显示
                }
                if(this.OrderNum>0){
                    this.OrderNum-=1;
                    var ID=this.tableData[this.OrderNum].id
                    this.archiveId = ID;
                    this.getEditFieldValueFn({"archiveAgentCode": this.archiveAgentCode,"libId": this.getLibid,"id":ID});
                    this.getOriginalsList(ID);
                }else{
                    this.Warn("已经是本页第一条数据。")
                }
        };
        //下一条
        nextOne():void{
            var stepTrue=true;
            for (var key in this.formAddfile){
                if(this.formAddfile[key]!=this.EditArr[key]){
                    stepTrue=false;
                };
            };
            if(stepTrue || this.keepAddData){
                this.gonextOne()
            }else{
                this['$confirm']('是否对上一条数据进行保存', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '不保存',
                    type: 'warning'
                }).then(() => {
                    this.keepAdd('formAddfile',this.gonextOne);
                }).catch(() => {
                    this.gonextOne();
                });
            }
        };

        //前往下一页
        gonextOne(){
                if(this.contentDiv) {
                    this.listDiv = true;
                    this.contentDiv = false;
                    this.oriListBtnVisible = false;
                    this.redactFile = false; // 底部按钮显示
                }
                var len = this.tableData.length;
                if(this.OrderNum<len-1){
                    this.OrderNum+=1;
                    var ID=this.tableData[this.OrderNum].id;
                    this.archiveId = ID;
                    this.getEditFieldValueFn({"archiveAgentCode": this.archiveAgentCode,"libId": this.getLibid,"id":ID});
                    this.getOriginalsList(ID);                 
                }else{
                    this.Warn("已经是本页最后一条数据。");
                };
        };
        // 确定下载
        enterLendList(){
            if(this.deleteID.length>0){
                // 单个下载
                if(!this.allChoose){
                    if( this.fileForm.resource.length>0){
                        let params = {
                            originalGuid:this.deleteID[0],
                            preview:true
                        };
                        if(this.fileForm.resource.length===1&&this.fileForm.resource[0]==='1'){
                            Service.displayPdf({},params.originalGuid,params.preview).then((res) =>{
                                let csvData = res;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                    window.open(process.env.upload_BASEURL+'/archive/file/downloadOriginal?originalGuid=' + params.originalGuid + '&preview=' + params.preview)
                                  /* if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                    }else{
                                        let url = window["URL"].createObjectURL(new Blob([res]));
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.downTitle+'.'+this.downType);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }*/
                                }
                                this.fileDwonVisible = false;
                            });
                        }else if(this.fileForm.resource.length===1&&this.fileForm.resource[0]==='2'){
                            if(this.downType==='pdf'){
                                Service.displayPdf({},params.originalGuid,params.preview).then((res) =>{
                                    let csvData = res;
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                           window.open(process.env.upload_BASEURL+'/archive/file/downloadOriginal?originalGuid=' + params.originalGuid + '&preview=' + params.preview)
                                       /* if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.downTitle+'.'+this.downType);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }*/
                                    }
                                    this.fileDwonVisible = false;
                                });
                            }else{
                                Service.displayToPdf({},params.originalGuid,params.preview).then((res) =>{
                                    let csvData = res;
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                       window.open(process.env.upload_BASEURL+'/archive/file/downloadConverted?originalGuid=' + params.originalGuid + '&preview=' + params.preview)
                                       /* if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.downTitle+'.'+'pdf');
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+'pdf');
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }*/
                                    }
                                    this.fileDwonVisible = false;
                                });
                            }
                        }else{
                            if(this.downType==='pdf'){
                                Service.displayPdf({},params.originalGuid,params.preview).then((res) =>{
                                    let csvData = new Blob([res]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        window.open(process.env.upload_BASEURL+'/archive/file/downloadOriginal?originalGuid=' + params.originalGuid + '&preview=' + params.preview)
                                       /* if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+this.type);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }*/
                                    }
                                    this.fileDwonVisible = false;
                                });
                            }else{
                                Service.displayPdf({},params.originalGuid,params.preview).then((res) =>{
                                    let csvData = new Blob([res]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        window.open(process.env.upload_BASEURL+'/archive/file/downloadOriginal?originalGuid=' + params.originalGuid + '&preview=' + params.preview)
                                       /* if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+this.type);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }*/
                                    }
                                    this.fileDwonVisible = false;
                                });
                                Service.displayToPdf({},params.originalGuid,params.preview).then((res) =>{
                                    let csvData = new Blob([res]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }
                                    window.open(process.env.upload_BASEURL+'/archive/file/downloadConverted?originalGuid=' + params.originalGuid + '&preview=' + params.preview)
                                    /*if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.downTitle+'.'+'pdf');
                                    }else{
                                        let url = window["URL"].createObjectURL(new Blob([res]));
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.title+'.'+'pdf');
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }*/
                                    this.fileDwonVisible = false;
                                });
                            }
                        }
                    }else{
                        this['$message']({
                            message: '请选择下载方式',
                            type: 'warning'
                        });
                    }
                    // 多个下载
                }else{
                    if( this.fileForm.resource.length>0){
                        if(this.fileForm.resource.length===1&&this.fileForm.resource[0]==='1'){
                            let loadingInstance = Loading.service(
                                {
                                    lock: true,
                                    text: '原文下载中，请稍等',
                                    // spinner: 'el-icon-loading',
                                    background: 'rgba(0, 0, 0, 0.7)'
                                }
                            );
                            let params = {
                                originalGuids:this.deleteID,
                                libId:this.getLibid,
                                archiveId:Number(this.archiveId),
                                archiveAgentCode:this.archiveAgentCode
                            };
                            Service.displayPdfs(params).then((res) =>{
                                let csvData = res.data;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                     window.open(process.env.upload_BASEURL+'/archive/file/downloadOriginals?originalGuids='+ this.deleteID + '&libId=' + this.getLibid+ '&archiveId=' + Number(this.archiveId)+'&archiveAgentCode=' + this.archiveAgentCode)                                   
                                   /* if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                    }else{
                                        let url = window["URL"].createObjectURL(csvData);
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.downTitle+'.'+this.downType);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }*/
                                }
                                this.$nextTick(() => { loadingInstance.close();});
                                this.fileDwonVisible = false;
                            });
                        }else if(this.fileForm.resource.length===1&&this.fileForm.resource[0]==='2'){
                            let loadingInstance = Loading.service(
                                {
                                    lock: true,
                                    text: '原文下载中，请稍等',
                                    // spinner: 'el-icon-loading',
                                    background: 'rgba(0, 0, 0, 0.7)'
                                }
                            );
                            this.deleteID = [];
                            for(let a of this.imgList){
                                if(a.extension==='pdf'||a.convertFlag===true){
                                    this.deleteID.push(a.guid)
                                }
                            }
                            let params = {
                                originalGuids:this.deleteID,
                                libId:this.getLibid,
                                archiveId:Number(this.archiveId),
                                archiveAgentCode:this.archiveAgentCode
                            };
                            Service.displayToPdfs(params).then((res) =>{
                                let csvData = res.data;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                    window.open(process.env.upload_BASEURL+'/archive/file/downloadConverteds?originalGuids='+ this.deleteID + '&libId=' + this.getLibid+ '&archiveId=' + Number(this.archiveId)+'&archiveAgentCode=' + this.archiveAgentCode) 
                                   /* if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                    }else{
                                        let url = window["URL"].createObjectURL(csvData);
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.downTitle+'.'+this.downType);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }*/
                                }
                                this.$nextTick(() => { loadingInstance.close();});
                                this.fileDwonVisible = false;
                            });
                        }else{
                            let loadingInstance = Loading.service(
                                {
                                    lock: true,
                                    text: '原文下载中，请稍等',
                                    // spinner: 'el-icon-loading',
                                    background: 'rgba(0, 0, 0, 0.7)'
                                }
                            );
                            let params = {
                                originalGuids:this.deleteID,
                                libId:this.getLibid,
                                archiveId:Number(this.archiveId),
                                archiveAgentCode:this.archiveAgentCode
                            };
                            Service.displayPdfs(params).then((res) =>{
                                let csvData = res.data;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                    window.open(process.env.upload_BASEURL+'/archive/file/downloadOriginals?originalGuids='+ this.deleteID + '&libId=' + this.getLibid+ '&archiveId=' + Number(this.archiveId)+'&archiveAgentCode=' + this.archiveAgentCode)
                                    /*if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                    }else{
                                        let url = window["URL"].createObjectURL(csvData);
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.downTitle+'.'+this.downType);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }*/
                                }
                                // 转换
                                this.deleteID = [];
                                for(let a of this.imgList){
                                    if(a.extension==='pdf'||a.convertFlag===true){
                                        this.deleteID.push(a.guid)
                                    }
                                }
                                let params1 = {
                                    originalGuids:this.deleteID,
                                    libId:this.getLibid,
                                    archiveId:Number(this.archiveId),
                                    archiveAgentCode:this.archiveAgentCode
                                };
                                Service.displayToPdfs(params1).then((res) =>{
                                    let csvData = new Blob([res.data]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        window.open(process.env.upload_BASEURL+'/archive/file/downloadConverteds?originalGuids='+ this.deleteID + '&libId=' + this.getLibid+ '&archiveId=' + Number(this.archiveId)+'&archiveAgentCode=' + this.archiveAgentCode) 
                                        /*if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.downTitle+'.'+this.downType);
                                        }else{
                                            let url = window["URL"].createObjectURL(csvData);
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+this.type);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }*/
                                    }
                                    this.$nextTick(() => { loadingInstance.close();});
                                    this.fileDwonVisible = false;
                                });
                            });
                        }
                    }else{
                        this['$message']({
                            message: '请选择下载方式',
                            type: 'warning'
                        });
                    }
                }

            }else{
                this['$message']({
                    message: '请选择需要下载的文件',
                    type: 'warning'
                });
            }
        }
        back():void{
            this['$router'].go(-1);
        };
        goToPage() {
            this.$router.push({
                path:'/fileArrange/arrange/arrange',
                name:'整理编目',
                params: {
                    from: "addArrangeData",
                }
            });
        }
       getVideo() {
           let self = this;
           this.myVideo = videojs("myVideo", {
                bigPlayButton: true,
                autoplay: true, // 自动播放
                controls: true, // 是否显示控制栏
                textTrackDisplay: false,
                posterImage: true,
                errorDisplay: false,
                controlBar: {// 配置控制栏
                    timeDivider: false, // 时间分割线
                    durationDisplay: false, // 总时间
                    progressControl: true, // 进度条
                    customControlSpacer: true, // 未知
                    fullscreenToggle: true // 全屏
                },
                hls: {
                    withCredentials: true
                }
            },function(){
                // this.pause();
                // this.reset();
                // this.load(self.videoSrc);
                // this.play();
            })           
        }

        // 选择文件按钮
        clickFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
        };

        openOriginal(){           
            this.listDiv = true;
            this.contentDiv = false;
        };
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
        //是不是pdf
        IsPdf(str){
            if(str.toLowerCase()==='pdf'){
                return true;
            }
            return false;
        }
        NoPdf(str){
            if(str.toLowerCase()!=='pdf'){
                return true;
            }
            return false;
        }
        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
        // 保存案卷
        keepAdd(form, cb,isSingleMount){
            let self = this;
            self['$refs'][form]['validate']((valid)=>{
                if(valid){
                    self.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );          
                         
                        if(self.getType === 'documentsEdit' || self.getType === 'IngroupfileEdit' || self.getType === 'fileEdit') {
                            self.formAddfile.rowStatus=2; //修改
                        } else {
                            self.formAddfile.rowStatus=1; // 新增
                            self['$set'](self.formAddfile,'id',null);
                        }
                        // for(let item in self.formAddfile) {
                        //     if(item === 'FILE_CODE') {
                        //         self.formAddfile[item] = parseInt(self.formAddfile[item]); 
                        //     }
                        // }
                        Service.SaveFile({"archiveAgentCode": this.archiveAgentCode,"phase": 2,"libId": this.getLibid,data:self.formAddfile}).then(res=>{
                            if(res.data.succeeded){
                                // self.formAddfile = res.data.data;
                                self.firstClick = false;
                                this.keepAddData = true;
                                if(!isSingleMount) {
                                    self.Suces("保存成功。");
                                }
                                if(cb) {
                                    cb();
                                }
                                self.archiveId = res.data.data.id;
                                self.addFileTitle = res.data.data.TM;
                                //   this.getListNumber({kindId:this.kinId,fondId:this.fondId,conditions:[]})
                            }else{
                                self.getError(res.data.errorMessage)
                            };
                            self.$nextTick(() => { this.loadingInstance.close();});
                        })
                }else{
                    self.getError('请完善内容。');
                };
            });
        };
        //获取分类号
        getFla(){
        };
        ReturnFla(params){
        }        
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
        changeSelect(val){
            this.formAddfile.FONDS_CODE = val;
            for(let item of this.findFondsByName) {
                if(item.fondCode === val) {
                    this.formAddfile.FONDS_NAME = item.fondName;
                }
            } 
        };
        changeInput(val, index){
            this.formAddfile.FONDS_CODE = this.formAddfile.FONDS_CODE;
            for(let item of this.findFondsByName) {
                if(item.fondCode === this.formAddfile.FONDS_CODE) {
                    this.formAddfile.FONDS_NAME = item.fondName;
                }
            } 
        };
        // 全选删除和下载
        tableAll(){
            // this.nowIndex = -1;
            this.allChoose = true;
            let abc = document.querySelectorAll('.ImgClass');
            for (let i = 0; i < abc.length; i++) {
                abc[i].classList.add("selectPdfColor");
            }
            this.deleteID = [];
            for (let i = 0; i < this.imgList.length; i++) {
                this.deleteID.push(this.imgList[i].guid)
            }
            if(this.imgList.length===1){
                this.downType = this.imgList[0].extension;
                this.downTitle = this.formAddfile.TM;
            }else{
                this.downTitle = this.formAddfile.TM;
                this.downType = 'zip'
            }
        }

        // 去除选择
        tableAll1(){
            this.nowIndex = -1;
            this.allChoose = false;
            this.deleteID = [];
            let abc = document.querySelectorAll('.ImgClass');
            for (let i = 0; i < abc.length; i++) {
                abc[i].classList.remove("selectPdfColor");
            }
        }
        // 新增点击单个挂接
        SingleMount() {
            let self = this;
            self['$refs']['formAddfile']['validate']((valid)=>{
                if(valid){
                    this.keepAdd('formAddfile','',"SingleMount");
                    // this.centerDialogVisibleSingleMount = true;
                    this.$refs['singleUploadFilesDialogRef'].centerDialogVisibleSingleMount = true;
                    this.$refs['singleUploadFilesDialogRef'].dialogTitle = '挂接原文';
                    this.$refs['singleUploadFilesDialogRef'].dialogWidth = '30%';
                    this.$refs['singleUploadFilesDialogRef'].archiveId = self.archiveId;
                    this.$refs['singleUploadFilesDialogRef'].getLibid = self.getLibid;
                    this.$refs['singleUploadFilesDialogRef'].clientId = self.clientId;
                    this.$refs['singleUploadFilesDialogRef'].originType = "fromZB";
                    this.getSliceConfig();
                }else{
                    self.getError('请完善内容。');
                };
            });
        }
        // 编辑点击单个挂接
        SingleMount2() {
            // this.centerDialogVisibleSingleMount = true;
            this.$refs['singleUploadFilesDialogRef'].centerDialogVisibleSingleMount = true;
            this.$refs['singleUploadFilesDialogRef'].dialogTitle = '挂接原文';
            this.$refs['singleUploadFilesDialogRef'].dialogWidth = '30%';
            this.$refs['singleUploadFilesDialogRef'].archiveId = this.archiveId;
            this.$refs['singleUploadFilesDialogRef'].getLibid = this.getLibid;
            this.$refs['singleUploadFilesDialogRef'].clientId = this.clientId;
            this.$refs['singleUploadFilesDialogRef'].originType = "fromZB";
            this.getSliceConfig();
        }
        // 获取删除选项
        deletePre(id,index,a,b,c){
            if(!this.allChoose){
                this.nowIndex = index;
                this.deleteID = [];
                this.deleteID.push(id);
                this.title = a;
                this.type = b;
                this.typeBoolean = c;
            }
        }

        // 删除挂接原文
        deleteOldFiles(){
            if(this.deleteID.length>0){
                this['$confirm']('您是否要删除所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                     let params = {
                        originalGuids:this.deleteID,
                        libId:this.getLibid,
                        archiveId:Number(this.archiveId),
                        archiveAgentCode:this.archiveAgentCode
                    };
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在删除，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.deletePdf(params).then(res => {
                        if(res.data.succeeded){
                            this['$message']({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.deleteID  = [];
                            this.getOriginalsList(this.archiveId);
                        }else{
                            this['$message']({
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                        this.$nextTick(() => { this.loadingInstance.close();});
                    });
                });
            }else{
                this['$message']({
                    message: '请选择需要删除的文件',
                    type: 'warning'
                });
            }
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
        // 双击打开pdf
        open(guid,extension,efileType,convertStatus){
            let self = this;
            let params = {
                originalGuid:guid,
                preview:false
            };
            if(convertStatus === 'Succeeded' || convertStatus === 'NoNeedProcess') {
                    if(efileType === 'Video') {// 视屏展示
                        // this.videoSrc = this.baseUrl2+'/video/index?originalGuid='+guid
                        Service.getVideoFile({}, guid).then(res => {
                            if(res.data !== null){
                                console.log(res);
                                    // let url2 = URL.createObjectURL(res.data);
                                    // let url2 = res.data;
                                    // console.log(url2);
                                    this.clickBookShow = true;
                                    this.listDiv = false; // 原文列表隐藏
                                    this.oriListBtnVisible = true; //原文列表按钮显示
                                    this.redactFile = true; // 底部按钮隐藏
                                    this.videoContentDiv = true; // 视频显示
                                    self.videoSrc = this.baseUrl2+'/video/index?originalGuid='+guid;//http://hls.open.ys7.com/openlive/31662b62835148f3a6113d36ef817cdd.m3u8 https://v2.xw0371.com/20180401/wiyCDyE3/index.m3u8                  
                                    // self.$nextTick(() => {
                                        // self.getVideo();
                                    // });
                                    self.myVideo.src({
                                        src:self.videoSrc,
                                        type: 'application/x-mpegURL' //在重新添加视频源的时候需要给新的type的值
                                    })
                                    // this.myVideo.load();
                                    self.myVideo.play();
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            } 
                        });
                    }else if(efileType === 'Audio'){ // 音频展示
                        this.clickBookShow = true;
                        this.listDiv = false; // 原文列表隐藏
                        this.oriListBtnVisible = true; //原文列表按钮显示
                        this.redactFile = true; // 底部按钮隐藏
                        this.AudioContentDiv = true; // 视频显示
                        this.AudioSrc = this.baseUrl+'/archive/file/downloadForPreview?originalGuid='+guid
                        // var url = encodeURIComponent(this.AudioSrc); 
                        document.getElementById('myAudio').setAttribute('src',this.AudioSrc);
                    }else{ // 文件展示
                        this.clickBookShow = true;
                        this.listDiv = false; // 原文列表隐藏
                        this.oriListBtnVisible = true; //原文列表按钮显示
                        this.redactFile = true; // 底部按钮隐藏
                        this.contentDiv = true; // iframe PDF显示               
                        this.fileUrl = this.baseUrl+'/archive/file/downloadForPreview?originalGuid='+guid
                        var url = encodeURIComponent(this.fileUrl);
                        this.file = 'static/pdf/web/viewer.html?file=' + url;
                        document.getElementById('previewPdf').setAttribute('src',this.file)
                
                    }
            } else {
                this['$message']({
                    message: '此文件尚未转换成功，请稍后再试。',
                    type: 'warning'
                });
            }
        }
        //失败信息
        error(message:string){
            this['$message']({
                type: 'error',
                message
            });
        };
        // 转化未完成
        open1(){
            this['$message']({
                message: '此文件非pdf格式，无法在线预览，请下载查看。',
                type: 'warning'
            });
        }
        b64DecodeUnicode(str) {
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
        // 取得分块大小
        getSliceConfig() {
            let params = {
                action: 'getSliceConfig',
                clientId:this.clientId,
            };
            Service.prepareUpload({}, params.action, params.clientId).then(res => {
                if(res.data.succeeded){
                    this.prepareBlob = res.data.data;
                     this.$refs['singleUploadFilesDialogRef'].prepareBlob = res.data.data;
                    console.log(this.prepareBlob);
                }else{
                    this.getError(res.errorMessage)
                }
            });
        }
        /** 断点续传集合 START*/
        // 预备上传
        onFileAdded(file) {
            this.computeMD5(file);
        };
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
            all.extractCrcFirstSlice(file, function(crc, blob) {
                that.jsonVersionOfNewFiles.crc = crc;
                that.crcsCalculated++;
            });
        }
        // 收集全部可上传文件
        onFileSubmit(file){
            this.fileSingle = file[0];
            this.addFileName = this.fileSingle.name;
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
                    // 获取原文列表
                    this.getOriginalsList(this.archiveId);
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
                    Service.doneUpload(formData,that.uploadFileId,crc,that.clientId).then(()=>{
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
                            setTimeout(that.tablelist, 3000);
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
        // 上传文件过程
        processNextIn() {
            let files = this.fileSingle;
            for(let tip of this.arrsStart){
                this.doneFiles(files.file,tip.name);
            }
        }

        // 切换原文状态
        clickBook(){
            this.contentDiv = false;
            this.listDiv = true;
            this.clickBookShow = false;
        }
        // 获取原文列表刷新列表
        getOriginalsList(archiveId){
            if(this.archiveId){
                // let loadingInstance = Loading.service(
                //         {
                //             lock: true,
                //             text: '正在获取原文列表，请稍候',
                //             spinner: 'el-icon-loading',
                //             background: 'rgba(0, 0, 0, 0.7)'
                //         }
                //     );
                Service.getOriginals({
                    archiveAgentCode:this.archiveAgentCode,
                    libId:this.getLibid,
                    archiveId:archiveId
                }).then(res=>{
                     this.imgList = [];
                if(res.data.succeeded){
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
                        if(imageElement != null && img.efileType !== "Audio"){
                           imageElement.src = this.noPic;
                        }
                        if(img.thumbnailStatus === 'Succeeded'){
                            this.getAllIcons(img,i);
                        }
                        if(img.title && img.extension) {
                            this.imgList.push(img);
                        }
                        i++;
                    }
                }else{
                    // this['$message']({
                    //     message: res.data.errorMessage,
                    //     type: 'warning'
                    // });
                }
                // this.$nextTick(() => { loadingInstance.close();});
                });
            }else{
                this['$message']({
                    message: '请先上传需要挂接的文件',
                    type: 'warning'
                });
            }
        }
        async getAllIcons(img,index){      
            Service.downloadThumbnail({},img.guid).then(res=>{
                if(res.status === 200){
                    let imageElement = document.getElementById("thumbnail"+index);
                    imageElement.src = URL.createObjectURL(res.data);
                }else{
                    this['$message']({
                        message: '获取缩略图失败。',
                        type: 'error'
                    });
                }
            });
        };
        projectCodechange(item,ind){
        };
        projectNamechange(item,ind){
        }
        /** 断点续传集合 END*/


        //查看卷内文件 编辑
        getEditFieldValueFn(obj) {
            let self = this;
            // self.loadingInstance = Loading.service(
            //             {
            //                 lock: true,
            //                 text: '正在加载，请稍候',
            //                 spinner: 'el-icon-loading',
            //                 background: 'hsla(0,0%,100%,.9)'
            //             }
            //         );
            Service.getEditFieldValue(obj).then(res=>{
                if(res.data.succeeded){
                    for(let item in res.data.data) {
                        if(res.data.data[item] !== null) {
                            if(item === 'RETENTION_PERIOD' || item === 'CONTROL_ID' || item === 'RANK' || item === 'SECURITY_LEVEL' || item === 'GENRE') {
                                self['$set'](self.formAddfile,item,'' + res.data.data[item]);
                            }else {
                                self['$set'](self.formAddfile,item,res.data.data[item]);
                            }
                        } else {
                                self['$set'](self.formAddfile,item,res.data.data[item]);
                            }
                    }
                    self.EditArr = JSON.parse(JSON.stringify(self.formAddfile));
                    // self.flhName = res.data.data.FLH;
                    // this.loading = false;
                    console.log(self.formAddfile);
                }else{
                    self.getError(res.data.errorMessage)
                }
                self.$nextTick(() => { this.loadingInstance.close();});
            })
        }
        //查看卷内文件 新增 取得从案卷继承而来的数据（新建卷内时）
        getInheritDataFromAnJuan(obj) {
            let self = this;
            // self.loadingInstance = Loading.service(
            //             {
            //                 lock: true,
            //                 text: '正在加载，请稍候',
            //                 spinner: 'el-icon-loading',
            //                 background: 'hsla(0,0%,100%,.9)'
            //             }
            //         );
            Service.inheritDataFromAnJuan(obj).then(res=>{
                if(res.data.succeeded){
                    for(let item in res.data.data) {
                        for(let item2 in self.formAddfile) {
                            if(item === item2) {
                                self.formAddfile[item2] = res.data.data[item]
                            } else {
                                self['$set'](self.formAddfile,item,res.data.data[item]);
                            }
                        }
                    }
                    console.log(self.formAddfile);
                }else{
                    self.getError(res.data.errorMessage)
                }
                self.$nextTick(() => { this.loadingInstance.close();});
            })
        };
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
                    Service.findFondsByName({archiveAgentCode:this.archiveAgentCode}).then(res=>{
                        if(res.data.succeeded){
                            for(var item of self.addArray){
                                if(item.fieldName === 'FONDS_NAME') {
                                    this.findFondsByName = res.data.data;
                                    item.dictData = res.data.data;
                                    item.fieldName2 = 'FONDS_CODE';
                                }
                                if(item.fieldName === 'CATEGORY_CODE') {
                                    self['$set'](self.formAddfile,item.fieldName,this.CATEGORY_CODE);
                                } else {
                                    self['$set'](self.formAddfile,item.fieldName,null);
                                }
                                
                            };
                            if(self.getType === 'documentsEdit' || self.getType === 'IngroupfileEdit' || self.getType === 'fileEdit' || self.getType === 'findFile' || self.getType === 'findDocuments' || self.getType === 'findIngroupfile') {
                                //查看卷内文件 编辑
                                self.getEditFieldValueFn({"archiveAgentCode": self.archiveAgentCode,"libId": self.getLibid,"id":self.getID});
                            }
                            console.log(typeof(self.formAddfile.FILE_CODE));
                            console.log(self.formAddfile);
                            self.loading = false;
                            if(self.getType === 'Ingroupfile') {
                                //查看卷内文件 新增 取得从案卷继承而来的数据（新建卷内时）
                                self.getInheritDataFromAnJuan({"archiveAgentCode": self.archiveAgentCode,"anJuanLibId": self.anJuanLibId,"anJuanId":self.IngroupfileID});
                            }
                        }else{
                            self.getError(res.data.errorMessage)
                        }
                    })
                    // self.formAddfile.QZH=self.fondCode;
                    // self.formAddfile.DQQZH=self.fondCode;
                }else{
                    self.getError(res.data.errorMessage)
                }
                if(self.getType === 'file' || self.getType === 'documents' || self.getType === 'Ingroupfile') {
                    self.$nextTick(() => { self.loadingInstance.close();});
                }
            })   
        }
        created(){
                let params;
                params = this.$route.params;
                let clientId = base['base64'].encode(window.sessionStorage.getItem('userId'));
                this.clientId = clientId;
                if(params.from) {
                    sessionStorage.removeItem('paramsData');
                    sessionStorage.setItem("paramsData", JSON.stringify(params)); //把上个页面的路由带过来的参数保存到sessionStorage 
                } else {
                    params = JSON.parse(sessionStorage.getItem("paramsData"));
                }
               this.getType = params.from;
               this.getID = parseInt(params.id);
               this.archiveId = params.id;
               this.CATEGORY_CODE = params.categoryCodeValue;
               this.getLibid = parseInt(params.libId);
               this.anJuanLibId = parseInt(params.anJuanLibId);
               this.IngroupfileID = parseInt(params.anJuanId);
                this.tableData = params.tableData;
                if(this.getType !== 'file' && this.getType !== 'documents' && this.getType !== 'Ingroupfile') {
                    if(params.currentIdOrder === '') {
                        // 过滤拿出当前id的下标
                        let currentIdOrder = this.tableData.filter(function(item,index,array){
                                if(item.id === params.id) {
                                    item.currentIdOrder = index;
                                    return item;
                                }
                            });
                            this.OrderNum = parseInt(currentIdOrder[0].currentIdOrder);
                    } else {
                        this.OrderNum = parseInt(params.currentIdOrder);
                    }
                }
               //取得新增、编辑案卷页面的输入项配置
                this.getEditField({"phase":2,"libId":this.getLibid});
                if(this.getType !== 'file' && this.getType !== 'documents' && this.getType !== 'Ingroupfile') {
                    // 获取原文列表                  
                    // if(this.tableData[params.currentIdOrder].ATTACHED_FILE_FLAG){
                        this.getOriginalsList(this.archiveId);
                    // }
                    
                }
        };
        mounted(){
            if(this.getType === 'file' || this.getType === 'findFile') {
                this.$refs.contentbox.style.top = 7 + "px";
            }
            let self = this;
            self.keyevent();
            self.$nextTick(() => {
                    self.getVideo();
            });
            window.onresize = () => {
                return (() => {
                    self.videoStyle = {
                        "height": Number(document.documentElement.clientHeight - 300)+'px',
                        "width":'100%'
                    };
                })()
            }; 
        };
        // 组件销毁前注销视频实例
        beforeDestroy () {
            this.myVideo.dispose();
            sessionStorage.removeItem('paramsData');
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
        //是否为集团公司
        IsCompany(Id){
            
        }
        myvalidator(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]*$');
            if(value!=null){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正整数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        };
        timevalidator(rule,value,callback){
            var reg = new RegExp(/^(\d{4})(0\d{1}|1[0-2])(0\d{1}|[12]\d{1}|3[01])$/)
            var str = reg.test(value)
            if(str){
                callback()
            }else{
                callback(new Error('日期格式错误,例:20190101'))
            }
        };
        SelectFlh(v){
            if(v){
                this.flhName = 123456;
                // this.FlhTrue = true;
            }
        }
        flhclick(data: any, node: any, tree: any){
            this.formAddfile.FLH = data.categoryNumber;
            this.flhName = data.categoryNumberText;
            this.formAddfile.BM = data.nodeName;
        }
        AJHvalidator(rule,value,callback){
            if(value) {
                var reg = new RegExp(/^\d{1,4}$|^\d{1,4}\-\d{1,2}$/);
                var str = reg.test(value);
                if (str) {
                    callback()
                } else {
                    callback(new Error('案卷号格式错误,如1或1-1'))
                }
            }else{
                callback()
            }
        };
        JNSXvalidator(rule,value,callback){
            if(value) {
                var reg = new RegExp(/^\d{1,4}$/);
                var str = reg.test(value);
                if (str) {
                    callback()
                } else {
                    callback(new Error('卷内顺序号格式错误,如1'))
                }
            }else{
                callback()
            }
        };
    };

</script>

<style lang="scss" scoped>   
    @import '../../../../styles/innerPublic.scss';
     @import '../../../../styles/fileManage/newlywenjian';
     .videoView{
        width: 82%;
        margin: 50px auto;
        height: auto;
    }
    .AudioView {
        padding: 15px;
    }
</style>