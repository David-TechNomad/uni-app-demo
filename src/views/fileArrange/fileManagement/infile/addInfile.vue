<template>
    <section style="padding:0 10px;height:100%;width:100%;overflow-y:hidden;position:relative;">
        <div class="mainTitle">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">文件管理</p>
            <span>新增卷内文件</span>
        </div>
        <div class="GoBack"><el-button class="checkWay" @click="back">返回</el-button></div>
        <div class="bianjiModal">
            <div class="formList">
                <div class="rowBox">
                    <div :visible.sync="addFileTrue" class="myDialog" :close-on-click-modal="false">
                <el-form  class="addfile" :model="addfile" label-width="120px" ref="addfile">
                <template v-for="item in addArray">
                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==1">
                    <el-button class="checkWay">{{item.caption}}</el-button>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==2&&item.fieldName!='XMBH'&&item.fieldName!='XMMCNEW'&&item.fieldName!='FLH'&&item.fieldName!='WJRQ'&&item.fieldName!='QZH'&&item.fieldName!='AJH'&&item.fieldName!='JNSXH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                    <el-input :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='AJH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:AJHvalidator,trigger:'change'}]">
                    <el-input :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength" placeholder="正确格式:如1或1-1"></el-input>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='JNSXH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:JNSXvalidator,trigger:'change'}]">
                    <el-input :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="addfile[item.fieldName]" placeholder="正确格式:如1"  :maxlength="item.maxLength"></el-input>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='WJRQ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:timevalidator,trigger:'blur'}]">
                <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                </el-form-item>
                  <el-form-item  :label="item.caption+' :'" v-if="item.editControl==10" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                    <el-date-picker :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" @change="getSTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:myvalidator,trigger:'blur'}]">
                    <el-input  :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model.number="addfile[item.fieldName]" type="number" min="0" :maxlength="item.maxLength"></el-input>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='FLH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                    <!--<el-select v-model="addfile[item.fieldName]">-->
                        <!--<el-option v-for="ind in FLhArr" :label="ind.categoryNumberText" :value="ind.categoryNumber" :key="ind.categoryNumber" :disabled="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                    <el-input :readonly="true" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-show="false"></el-input>
                    <el-input :readonly="true" v-model="flhName"   :maxlength="item.maxLength" @focus="SelectFlh(item.allowEdit,item.isInheritParent,item.isArcNoField)"></el-input>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                    <el-select v-model="addfile[item.fieldName]">
                        <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9&&item.fieldName!='BZ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                    <el-input :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                </el-form-item>
                    <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.fieldName=='BZ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                        <el-input :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength" placeholder="需填写文件形式：原件，复印件，查档件"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='XMBH'||item.fieldName=='XMMCNEW'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'change'}]">
                        <el-input :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!isProjectCompany"></el-input>
                        <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMBH'">
                            <el-option v-for="ind in projectCodearr" :key="ind.id" :label="ind.projectCode" :value="ind.projectCode" @click.native="projectCodechange(ind,item)" :disabled="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit"></el-option>
                        </el-select>
                        <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMMCNEW'">
                            <el-option v-for="ind in projectNamearr" :key="ind.id" :label="ind.projectName" :value="ind.projectName"  @click.native="projectNamechange(ind,item)" :disabled="EditXMBH"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='QZH'" prop="QZH" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <el-input :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!ISJT"></el-input>
                        <el-select v-model="addfile[item.fieldName]"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" v-if="ISJT">
                            <el-option v-for="ind in JTarr" :key="ind.id" :label="ind.label" :value="ind.value" :disabled="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit"></el-option>
                        </el-select>
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
                            <div class="ImgClass" :class='{selectPdfColor:index==nowIndex}'>
                                    <img @click="deletePre(item.guid,index,item.title,item.extension,item.convertFlag)" v-if="IsPdf(item.extension)&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">
                                    <img @click="deletePre(item.guid,index,item.title,item.extension,item.convertFlag)" v-if="NoPdf(item.extension)&&item.convertFlag&&item.thumbnailFlag" @dblclick="open(item.guid,item.extension)" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">
                                    <img @click="deletePre(item.guid,index,item.title,item.extension,item.convertFlag)" v-if="IsPdf(item.extension)&&!item.thumbnailFlag" src="../../../../imgs/noPic.jpg" alt="" @dblclick="open(item.guid,item.extension)">
                                    <img @click="deletePre(item.guid,index,item.title,item.extension,item.convertFlag)" v-if="NoPdf(item.extension)&&!item.convertFlag" src="../../../../imgs/noPic.jpg" alt=""  @dblclick="open1()">
                                    <img @click="deletePre(item.guid,index,item.title,item.extension,item.convertFlag)" v-if="NoPdf(item.extension)&&item.thumbnailFlag&&!item.convertFlag" :src="urlImg+'/file/archive/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="" @dblclick="open(item.guid,item.extension)">
                                    <img @click="deletePre(item.guid,index,item.title,item.extension,item.convertFlag)" v-if="NoPdf(item.extension)&&!item.thumbnailFlag&&item.convertFlag" src="../../../../imgs/noPic.jpg" alt="" @dblclick="open(item.guid,item.extension)">
                            </div>
                            <!--<div class="p2">{{item.title+'.pdf ' }}</div>-->
                            <div class="p2">{{item.title+'.'+item.extension }}</div>
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
            <div class="footered3" v-show="!redactFile">
                <!--<el-button class="checkWay" @click="repeatTwo">重置</el-button>-->
                <el-button class="checkWay" @click="keepAdd('addfile')">保存</el-button>
            </div>
            <div class="footered2" v-show="!redactFile"  style="left:416px">
                <el-button class="checkWay" @click="tableAll">全选</el-button>
                <el-button class="checkWay" @click="tableAll1">取消选择</el-button>
                <el-button class="checkWay addButton" @click="guajie('addfile')">挂接</el-button>
                <el-button class="checkWay deleteButton" @click="deleteOldFiles">删除原文</el-button>
                <el-button class="checkWay" @click="tablelist">刷新</el-button>
                <el-button class="checkWay" @click="downloadList">下载</el-button>
            </div>
        </div>
        <el-dialog  class="myDialog" title="挂接原文" :visible.sync="centerDialogVisibleTree" :close-on-click-modal="true">
            <el-form class="addfile">
                <el-form-item label="文件名：" >
                    <el-input style="float:left;width:60%;margin-left:18px;" v-model="addFileName" readonly></el-input>
                    <!-- 上传 -->
                    <uploader
                            ref="uploader"
                            :autoStart="false"
                            @file-added="onFileAdded"
                            @files-submitted="onFileSubmit"
                            @change = "chooseFiles"
                            class="uploader-app">
                        <uploader-unsupport></uploader-unsupport>
                        <uploader-btn @click="clickFiles" id="global-uploader-btn" :single="true" class="el-button checkWay" style="position:absolute;top:0;right:0;line-height:30px;" ref="uploadBtn">选择文件</uploader-btn>
                    </uploader>
                </el-form-item>
                <!--<el-form-item label="文件类型：" >-->
                    <!--<el-select v-model="addFileType">-->
                        <!--<el-option-->
                                <!--v-for="item in pageList"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="文件标题：" >
                    <el-input style="float:left;width:60%"  v-model="addFileTitle"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="addEventFormSubmitBtns()" class="el-button checkWay">挂接</el-button>
                <el-button type="primary" @click="centerDialogVisibleTree = false" class="el-button checkWay">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog class="fileModal" title="选择下载方式" :visible.sync="fileVisible" :close-on-click-modal="true">
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
        <el-dialog :show-close = 'false' class="fileModal processModal" :visible.sync="fileVisible1" :close-on-click-modal="false">
            <div>
                <el-progress type="circle" :stroke-width="12" :percentage="process" color="rgb(146,176,0)"></el-progress>
            </div>
        </el-dialog>
        <!--分类号-->
        <el-dialog class="fileModal flhdialog" :visible.sync="FlhTrue" title="分类号" :close-on-click-modal="false" :lock-scroll="false" :modal="false">
            <el-tree
                    :data="FLhArr"
                    node-key="categoryNumber"
                    :default-expand-all="false"
                    :props="flhType"
                    @node-click="flhclick"
                    :renderContent = "renderContent"
                    ref="treeku"
                    accordion
            >
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="FlhTrue=false">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './addInfile.service';
    import all from '../../../../utils/firstSlice.js';
    import crc32 from '@/utils/crc32.js';
    import { Loading } from 'element-ui';
    import HttpRequest from '@/api/request';
    @Component
    export default class appfileManagement extends Vue{
        typeBoolean:boolean;
        pdfSite:boolean  = false;
        urlImg:any;
        listDiv:boolean;
        contentDiv:boolean;
        redactFile:boolean;
        centerDialogVisibleTree : boolean;
        allChoose : boolean = false;
        total : number;
        fondId: number;
        kinId : number;
        nowIndex : number;
        newFilesIds: number;
        arvhiveId : number;
        crcsCalculated: number;
        bids : number;//卷内文件库libId
        pageSize : number;
        loadingInstance:any={};
        parentId: number;
        fileUrl:any;
        deleteID: any = [];
        qzh : string;
        Id : number;
        addFileTrue : boolean;
        basicForm : any = {};
        EditArr:any={};
        prepareBlob:any={};
        wenId:number;
        bytesPerChunk:any;//总速率;
        addfile:any={};
        fileSingle:any={};
        title:string = '';
        type:string = '';
        fileList :  any = {};
        addArray : any = [];
        imgList: any = [];
        isProjectCompany:boolean;
        keepRight:boolean = false;
        fileVisible:boolean = false;
        clickBookShow:boolean;
        projectCodearr:any=[];
        projectNamearr:any=[];
        documentTableData:any=[];
        arrsStart:any=[];
        fileForm:any={
            resource:['1']
        };
        // pageList: any = [];
        jsonVersionOfNewFiles:  any = {}
        addFileName:string;
        // addFileType:string;
        addFileTitle:string;
        file:any;
        $refs: { uploader: HTMLFormElement};
        EditXMBH:boolean;
        firstClick:boolean;
        FLhArr:any = [];
        processStop:boolean = false;
        fileVisible1: boolean = false;
        process: number = 0;
        processColor : string = 'rgb(247,78,0)';
        ISJT:boolean;
        JTarr:any=[];
        FlhTrue:boolean;
        flhType:any={};
        flhName:any;
        flhValue:any;
        constructor(){
            super();
            this.listDiv = true;
            this.nowIndex = -1;
            this.centerDialogVisibleTree = false;
            this.qzh = "";
            this.urlImg = HttpRequest['imgUrl'];
            this.fileSingle = {};
            this.redactFile=false;
            this.contentDiv = false;
            this.clickBookShow = false;
            this.file = '';
            this.deleteID =[];
            this.arvhiveId = null;
            this.loadingInstance = null;
            this.basicForm = {};
            this.jsonVersionOfNewFiles = {};
            this.addFileTrue = true;
            this.arrsStart = [];
            this.imgList = [];
            this.fileUrl = '';
            this.addArray = [];
            this.addfile={};
            // this.addFileType = '';
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
            this.FLhArr = [];
            // this.pageList=[
            //     { label:'原文',value:'ArchiveFile'},
            //     { label:'附件',value:'ArchiveAttachmentFile'},
            // ]
            this.JTarr = [];
            this.FlhTrue = false;
            this.flhType = {
                children: "children",
                label: "categoryNumberText"
            };
            this.flhName=null;
            this.flhValue=null;
            this.ISJT = false;
        }
        // 自定义节点图标
        renderContent(createElement, { node, data }) {
            return createElement(
                'span',
                {
                    attrs:{
                        'class':'custom-tree-node',
                    },
                    style:{
                        'padding': '11px 0',
                    }
                },
                [
                    createElement(
                        'img',
                        {
                            attrs:{
                                'src':data.srcName
                            },
                            style:{
                                'margin': '1px 5px 0 2px ',
                                'float': 'left',
                                'margin-left':data.marginLeft
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-top':'3px',
                                'display':'block'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ]
            )
        };
        getSTime(){

        }

        back():void{
            this['$router'].push({
                path:'/fileArrange/fileManagement/infile',
            });
        };
        guajie(form){
            this.keepRight = false;
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                    var loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在上传中，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    if(this.firstClick){
                        this.addfile.rowStatus=1;
                        this.addfile.PARENTID = this.parentId;
                        Service.SaveFile({fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
                            if(res.data.succeeded){
                                this.firstClick = false;
                                this.addfile = res.data.data;
                                this.arvhiveId = res.data.data.id;
                                this.addFileTitle = res.data.data.TM;
                                this.keepRight = true;
                                if(this.keepRight){
                                    this.addFileName = '';
                                    this.fileSingle = {};
                                    this.Suces("保存成功。");
                                    this.$nextTick(() => { loadingInstance.close();});
                                    this.centerDialogVisibleTree = true;
                                    // 重置文件队列
                                    this.$refs.uploader.uploader.cancel();
                                }
                            }else{
                                this.getError(res.data.errorMessage);
                                this.$nextTick(() => { loadingInstance.close();});
                            }
                        })
                    }else{
                        this.addfile.rowStatus=2;
                        Service.SaveFile({recomputeDh:true,fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
                            if(res.data.succeeded){
                                this.addfile = res.data.data;
                                this.keepRight = true;
                                if(this.keepRight){
                                    this.addFileName = '';
                                    this.fileSingle = {};
                                    this.Suces("保存成功。");
                                    this.$nextTick(() => { loadingInstance.close();});
                                    this.centerDialogVisibleTree = true;
                                    // 重置文件队列
                                    this.$refs.uploader.uploader.cancel();
                                }
                            }else{
                                this.getError(res.data.errorMessage);
                                this.$nextTick(() => { loadingInstance.close();});
                            }
                        })
                    };
                }else{
                    this.keepRight = false;
                    this.getError('请完善内容。');
                };
            });
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
        // 选择文件按钮
        clickFiles(){
            // 重置文件队列
            this.$refs.uploader.uploader.cancel();
        };

        openOriginal(){
            this.listDiv = true;
            this.contentDiv = false;
         }
        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };
        keepAdd(form){
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    if(this.firstClick){
                        this.addfile.rowStatus=1;
                        this.addfile.PARENTID = this.parentId;
                        Service.SaveFile({fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
                            if(res.data.succeeded){
                                this.firstClick = false;
                                this.addfile = res.data.data;
                                this.Suces("保存成功。");
                                this.arvhiveId = res.data.data.id;
                                this.addFileTitle = res.data.data.TM;
                                //   this.getListNumber({kindId:this.kinId,fondId:this.fondId,conditions:[]})
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                            this.$nextTick(() => { this.loadingInstance.close();});
                        })
                    }else{
                        this.addfile.rowStatus=2;
                        Service.SaveFile({recomputeDh:true,fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
                            if(res.data.succeeded){
                                this.addfile = res.data.data;
                                this.Suces("保存成功。")
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                            this.$nextTick(() => { this.loadingInstance.close();});
                        })
                    };
                }else{
                    this.getError('请完善内容。');
                };
            });
        }
        // 保存并添加
        // keepAddTwo(form){
        //     this['$refs'][form]['validate']((valid)=>{
        //         if(valid){
        //               this.addfile.rowStatus=1;
        //               this.addfile.PARENTID = this.parentId;
        //               console.log(this.addfile)
        //               Service.SaveFile({fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
        //                 if(res.data.succeeded){
        //                     this.Suces("保存成功")
        //                     this.flh = this.addfile.FLH;
        //                     this.xmbh = this.addfile.XMBH;
        //                     this.xmmcnew = this.addfile.XMMCNEW;
        //                Service.getEditField(this.bids).then(res=>{
        //                 if(res.data.succeeded){
        //                     this.addArray=res.data.data;
        //                        this.addfile={};
        //                     for(var item of res.data.data){
        //                         //this.addfile[item.fieldName]='';
        //                         this['$set'](this.addfile,item.filedName,null)
        //                     }
        //                      this.addfile.QZH=this.qzh;
        //                      this.addfile.DQQZH=this.qzh;
        //                      this.addfile.FLH=this.flh;
        //                      this.addfile.XMBH=this.xmbh;
        //                      this.addfile.XMMCNEW=this.xmmcnew
        //                      this.addfile.ND =this.nd;
        //                      this.addfile.AJH = this.ajh;
        //                 }else{
        //                     this.getError(res.data.errorMessage)
        //                 }
        //             })
        //                         //   this.getListNumber({kindId:this.kinId,fondId:this.fondId,conditions:[]})
        //                       }else{
        //                           this.getError(res.data.errorMessage)
        //                       }
        //                   })
        //         }else{
        //             this.Warn('请完善内容!');
        //         };
        //     });
        // }
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
            for(var key in this.addfile){
                this.addfile[key]=null;
            }
            Service.inheritDataFromAnJuan({
                anJuanLibId:this.wenId,
                anJuanId:this.Id
            }).then(res=>{
                if(res.data.succeeded){
                    this.parentId = res.data.data.PARENTID;
                    let data= res.data.data;
                    for(var key in data){
                        if(key!='id'&&key!='PARENTID'&&key!='rowStatus'){
                            this.addfile[key] = data[key]
                        }
                    }
                    this.addfile.PARENTID = this.parentId;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
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
        // 全选删除和下载
        tableAll(){
            this.nowIndex = -1;
            this.allChoose = true;
            let abc = document.querySelectorAll('.ImgClass');
            for (let i = 0; i < abc.length; i++) {
                abc[i]['style'].border = '5px solid #67c23a';
            }
            this.deleteID = [];
            for (let i = 0; i < this.imgList.length; i++) {
                this.deleteID.push(this.imgList[i].guid)
            }
            if(this.imgList.length===1){
                this.type = this.imgList[0].extension;
                this.title = this.addfile.TM;
            }else{
                this.title = this.addfile.TM;
                this.type = 'zip'
            }
        }


        // 去除选择
        tableAll1(){
            this.nowIndex = -1;
            this.deleteID = [];
            this.allChoose = false;
            let abc = document.querySelectorAll('.ImgClass');
            for (let i = 0; i < abc.length; i++) {
                abc[i]['style'].border = 'none';
            }
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
        downloadList(){
            if(this.deleteID.length>0){
                this.fileVisible = true;
                // 单个
                if(this.nowIndex>0){
                    if( this.type!=='pdf'&&!this.typeBoolean){
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
                            Service.displayPdf(params).then((res) =>{
                                let csvData = res;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                    if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                    }else{
                                        let url = window["URL"].createObjectURL(csvData);
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.title+'.'+this.type);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                }
                                this.fileVisible = false;
                            });
                        }else if(this.fileForm.resource.length===1&&this.fileForm.resource[0]==='2'){
                            if(this.type==='pdf'){
                                Service.displayPdf(params).then((res) =>{
                                    let csvData = res;
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+this.type);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }
                                    }
                                    this.fileVisible = false;
                                });
                            }else{
                                Service.displayToPdf(params).then((res) =>{
                                    let csvData = res;
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.title+'.'+'pdf');
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+'pdf');
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }
                                    }
                                    this.fileVisible = false;
                                });
                            }
                        }else{
                            if(this.type==='pdf'){
                                Service.displayPdf(params).then((res) =>{
                                    let csvData = new Blob([res]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+this.type);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }
                                    }
                                    this.fileVisible = false;
                                });
                            }else{
                                Service.displayPdf(params).then((res) =>{
                                    let csvData = new Blob([res]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                        }else{
                                            let url = window["URL"].createObjectURL(new Blob([res]));
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+this.type);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }
                                    }
                                    this.fileVisible = false;
                                });
                                Service.displayToPdf(params).then((res) =>{
                                    let csvData = new Blob([res]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }
                                    if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.title+'.'+'pdf');
                                    }else{
                                        let url = window["URL"].createObjectURL(new Blob([res]));
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.title+'.'+'pdf');
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                    this.fileVisible = false;
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
                                libId:this.bids,
                                archiveId:Number(this.arvhiveId)
                            };
                            Service.displayPdfs(params).then((res) =>{
                                let csvData = res.data;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                    if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                    }else{
                                        let url = window["URL"].createObjectURL(csvData);
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.title+'.'+this.type);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                }
                                this.$nextTick(() => { loadingInstance.close();});
                                this.fileVisible = false;
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
                                libId:this.bids,
                                archiveId:Number(this.arvhiveId)
                            };
                            Service.displayToPdfs(params).then((res) =>{
                                let csvData = res.data;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                    if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                    }else{
                                        let url = window["URL"].createObjectURL(csvData);
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.title+'.'+this.type);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                }
                                this.$nextTick(() => { loadingInstance.close();});
                                this.fileVisible = false;
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
                                libId:this.bids,
                                archiveId:Number(this.arvhiveId)
                            };
                            Service.displayPdfs(params).then((res) =>{
                                let csvData = res.data;
                                if(csvData.size<1048){
                                    this['$message']({
                                        message: '打包档案原文时发生错误。',
                                        type: 'error'
                                    });
                                }else{
                                    if (window.navigator && window.navigator.msSaveBlob) {
                                        window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                    }else{
                                        let url = window["URL"].createObjectURL(csvData);
                                        let link = document.createElement('a');
                                        link.style.display = 'none';
                                        link["href"] = url;
                                        link.setAttribute('download',this.title+'.'+this.type);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
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
                                    libId:this.bids,
                                    archiveId:Number(this.arvhiveId)
                                };
                                Service.displayToPdfs(params1).then((res) =>{
                                    let csvData = new Blob([res.data]);
                                    if(csvData.size<1048){
                                        this['$message']({
                                            message: '打包档案原文时发生错误。',
                                            type: 'error'
                                        });
                                    }else{
                                        if (window.navigator && window.navigator.msSaveBlob) {
                                            window.navigator.msSaveBlob(csvData,this.title+'.'+this.type);
                                        }else{
                                            let url = window["URL"].createObjectURL(csvData);
                                            let link = document.createElement('a');
                                            link.style.display = 'none';
                                            link["href"] = url;
                                            link.setAttribute('download',this.title+'.'+this.type);
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }
                                    }
                                    this.$nextTick(() => { loadingInstance.close();});
                                    this.fileVisible = false;
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
        // 删除挂接原文
        deleteOldFiles(){
            if(this.deleteID.length>0){
                Service.deletePdf(this.deleteID).then(res => {
                    if(res.data.succeeded){
                        this['$message']({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.deleteID  = [];

                        Service.getOriginals({
                            libId:this.bids,
                            archiveId:Number(this.arvhiveId)
                        }).then(res=>{
                            if(res.data.data){
                                this.imgList = res.data.data;
                            }else{
                                this.imgList = [];
                            }
                            if(this.imgList.length===0){
                                this.addFileTitle = this.addfile.TM
                            }else{
                                this.addFileTitle = this.addfile.TM+'-'+this.imgList.length
                            }
                        });
                    }else{
                        this['$message']({
                            message: '删除失败',
                            type: 'error'
                        });
                    }
                });
            }else{
                this['$message']({
                    message: '请选择需要删除的文件',
                    type: 'warning'
                });
            }
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
        /** 断点续传集合 START*/
        // 预备上传
        onFileAdded(file) {
            this.computeMD5(file);
        };
        // 预备上传整编队列
        computeMD5(file) {
            console.log(file)
            let that = this;
            let fileForPost = {tempId: 0, fileName: '', size: 0, data: {}}
            fileForPost.data = {type: 'ArchiveFile',targetArchiveLibId :this.bids,targetArchiveId:this.arvhiveId,title:this.addFileTitle };
            fileForPost.tempId = this.newFilesIds;
            fileForPost.fileName = file.name;
            fileForPost.size = file.size;
            this.jsonVersionOfNewFiles = fileForPost;
            file.id = fileForPost.tempId;
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
        addEventFormSubmitBtns(){
            if(this.addFileName){
                if(this.addFileTitle){
                    this.fileVisible1 = true;
                    this.processStop = false;
                    this.process = 0;
                    // this.loadingInstance = Loading.service(
                    //     {
                    //         lock: true,
                    //         text: '正在上传中，请稍候',
                    //         spinner: 'el-icon-loading',
                    //         background: 'rgba(0, 0, 0, 0.7)'
                    //     }
                    // );
                    this.jsonVersionOfNewFiles.data.title = this.addFileTitle;
                    let arr = [];
                    arr.push(this.jsonVersionOfNewFiles);
                    let params = {
                        action: 'prepareUpload',
                        newFiles: JSON.stringify(arr),
                        // clientId:this.clientId,
                    };
                    Service.prepareUpload(params).then(res => {
                        this.prepareBlob = res.data;
                        this.getFilesA();
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
            this.bytesPerChunk = 5242880;
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
            for(let data of this.documentTableData){
                if(data.isPrepare){
                    ann.push(data);
                    annName.push(data.name);
                }
            }
            Service.prepareUpload({
                action: 'getProgress',
                fileId: JSON.stringify(annName)
            }).then(res => {
                let processList = [];
                let datas = res.data;
                for(let a in datas){
                    datas[a].processId = a;
                    processList.push(datas[a]);
                };
                if(!this.processStop){
                    this.documentTableData[0].process = Number(processList[0].progress.toFixed(1));
                    this.process = this.documentTableData[0].process;
                    this.getColor();
                    setTimeout(this.getProcess, 1000);
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
                    // 上传主体
                    Service.doneUpload(formData,item,crc).then(()=>{
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
                            that.processStop = true;
                            that.fileVisible1 = false;
                            // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            //     that.loadingInstance.close();
                            // });
                            setTimeout(that.tablelist, 3000);
                            that.centerDialogVisibleTree = false;
                            that['$message']({
                                message: '挂接成功',
                                type: 'success'
                            });
                            // 删除挂接云空间的文件
                            // Service.searchUpload({action: 'cancelFile',fileId:item}).then(() =>{});
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
        // 刷新列表
        tablelist(){
            if(this.arvhiveId){
                Service.getOriginals({
                    libId:this.bids,
                    archiveId:Number(this.arvhiveId)
                }).then(res=>{
                    if(res.data.data){
                        this.imgList = res.data.data;
                    }else{
                        this.imgList = [];
                    }
                    if(this.imgList.length===0){
                        this.addFileTitle = this.addfile.TM
                    }else{
                        this.addFileTitle = this.addfile.TM+'-'+this.imgList.length
                    }
                });
            }else{
                this['$message']({
                    message: '请先上传需要挂接的文件',
                    type: 'warning'
                });
            }
        }

        projectCodechange(item,ind){
            if(ind.allowEdit){
                if(ind.isInheritParent&&ind.isArcNoField){}else{
                    this.addfile.XMMCNEW = item.projectName;
                }
            }
            // if(ind.isInheritParent&&ind.isArcNoField&&){}else{
            //
            // }
        };
        projectNamechange(item,ind){
            if(!this.EditXMBH){
                    this.addfile.XMBH = item.projectCode;
            };
            // if(ind.isInheritParent&&ind.isArcNoField&&ind.allowEdit){}else{
            //     this.addfile.XMBH = item.projectCode;
            // }
        }
        timevalidator(rule,value,callback){
            var reg = new RegExp(/^(\d{4})(0\d{1}|1[0-2])(0\d{1}|[12]\d{1}|3[01])$/)
            var str = reg.test(value)
            if(str){
                callback()
            }else{
                callback(new Error('日期格式错误,例:20190101'))
            }
        };
        /** 断点续传集合 END*/
         mounted(){
             var str = window.sessionStorage.getItem('addInfile');
             var obj =JSON.parse(str);
             this.bids = obj.libId;//案卷libId
             this.qzh = obj.qzh;
             this.fondId =  obj.fondId;
             this.kinId = obj.kinId;
             this.Id = obj.id // 案卷行id
             this.wenId = obj.wenId //文件libId
             this.isProjectCompany = obj.isProjectCompany;
             // this.bids = this['$route'].params.libId;//案卷libId
             // this.qzh = this['$route'].params.qzh;
             // this.fondId =  this['$route'].params.fondId;
             // this.kinId = this['$route'].params.kinId;
             // this.Id = this['$route'].params.id// 案卷行id
             // this.wenId = this['$route'].params.wenId //文件libId

                      Service.getEditField(this.bids).then(res=>{
                        if(res.data.succeeded){
                            this.addArray=res.data.data;
                               this.addfile={};
                            for(var item of res.data.data){
                                this['$set'](this.addfile,item.fieldName,null)
                            }
                            for(var item of res.data.data){
                                if(item.fieldName=='XMBH'){
                                    if(!item.allowEdit){
                                        this.EditXMBH = true;
                                    }else if(item.isArcNoField&&item.isInheritParent){
                                        this.EditXMBH = true;
                                    }else{
                                        this.EditXMBH = false;
                                    };
                                };
                            };
                            this.IsCompany(this.fondId)
                            if(this.isProjectCompany){
                                Service.findByFond({}).then(res=>{
                                    if(res.data.succeeded){
                                        this.projectCodearr=res.data.data;
                                        this.projectNamearr=res.data.data;
                                    }else{
                                        this.getError(res.data.errorMessage)
                                    }
                                })
                            }
                            Service.inheritDataFromAnJuan({
                                anJuanLibId:this.wenId,
                                anJuanId:this.Id
                            }).then(res=>{
                                if(res.data.succeeded){
                                    this.parentId = res.data.data.PARENTID;
                                    let data= res.data.data;
                                    for(var key in data){
                                        if(key!='id'&&key!='PARENTID'&&key!='rowStatus'){
                                            this.addfile[key] = data[key]
                                        }
                                    }
                                    this.addfile.PARENTID = this.parentId;
                                    this.getFla();
                                }else{
                                    this.getError(res.data.errorMessage)
                                }
                            })

                        }else{
                            this.getError(res.data.errorMessage)
                        }
                    })
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
            Service.isTopCompany(Id).then(res=>{
                if(res.data.succeeded) {
                    this.ISJT = res.data.data;
                }
            })
        }
        //获取分类号
        getFla(){
            this.flhName = null;
            Service.getCategoryNumbers(this.fondId).then(res=>{
                if(res.data.succeeded){
                    this.FLhArr = res.data.data;
                    if(this.addfile.FLH){
                        this.ReturnFla(this.FLhArr)
                        // for(var item of this.FLhArr){
                        //     if(item.categoryNumber == this.addfile.FLH){
                        //         this.flhName = item.categoryNumberText;
                        //         this.addfile.BM = item.nodeName;
                        //         break;
                        //     }else if(item.children){
                        //         for(var son of item.children){
                        //             if(son.categoryNumber==this.addfile.FLH){
                        //                 this.flhName = son.categoryNumberText;
                        //                 this.addfile.BM = son.nodeName;
                        //                 break;
                        //             }else if(son.children){
                        //                 for(var ind of son.children){
                        //                     if(ind.categoryNumber == this.addfile.FLH){
                        //                         this.flhName = ind.categoryNumberText;
                        //                         this.addfile.BM = ind.nodeName;
                        //                         break;
                        //                     }else if(ind.children){
                        //                         for(var son2 of ind.children){
                        //                             if(son2.categoryNumber == this.addfile.FLH){
                        //                                 this.flhName = son2.categoryNumberText;
                        //                                 this.addfile.BM = son2.nodeName;
                        //                                 break;
                        //                             }else if(son2.children){
                        //                                 for(var son3 of son2.children){
                        //                                     if(son3.categoryNumber == this.addfile.FLH){
                        //                                         this.flhName = son3.categoryNumberText;
                        //                                         this.addfile.BM = son3.nodeName;
                        //                                         break;
                        //                                     };
                        //                                 };
                        //                             };
                        //                         };
                        //                     };
                        //                 };
                        //             };
                        //         };
                        //     };
                        // };
                    };
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        ReturnFla(params){
            for(var son of params){
                if(son.categoryNumber == this.addfile.FLH){
                    this.flhName = son.categoryNumberText;
                    this.addfile.BM = son.nodeName;
                    break;
                }else if(son.children!=null){
                    this.ReturnFla(son.children)
                }
            }
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
        SelectFlh(value1,value2,value3){
            if(!value1){
                this.FlhTrue = false;
            }else if(value1&&value2&&value3){
                this.FlhTrue = false;
            }else{
                this.FlhTrue = true;
            }
        }
        flhclick(data: any, node: any, tree: any){
            this.addfile.FLH = data.categoryNumber;
            this.flhName = data.categoryNumberText;
            this.addfile.BM = data.nodeName;
            // this.addfile.FLH = data.categoryNumber;
            // this.flhName = data.categoryNumberText;

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
    @import '../../../../styles/fileManage/addInfile';
</style>