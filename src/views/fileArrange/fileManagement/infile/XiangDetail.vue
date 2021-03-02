<template>
    <section>
        <div class="mainDoc">
              <div class="mainCon basicList">
                <div class="loanTipTitle">
                     借阅档案详情
                    <div class="titleSect"></div>
                </div>
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
                <el-form-item  :label="item.caption+' :'" v-if="item.editControl==2||item.editControl==3" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                    <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                </el-form-item>
                  <el-form-item  :label="item.caption+' :'" v-if="item.editControl==10" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                    <el-date-picker :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" @change="getSTime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                    <el-input  :readonly="!item.allowEdit" v-model.number="addfile[item.fieldName]" type="number" min = "0" :maxlength="item.maxLength"></el-input>
                </el-form-item>
                <!--<el-form-item  :label="item.caption+' :'" v-if="item.editControl==3" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'blur'}]">-->
                    <!--<el-select :readonly="!item.allowEdit" v-model="addfile[item.fieldName]">-->
                        <!--<el-option v-for="item in item.dictData" :label="item.text" :value="item.code" :key="item.code">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                    <el-input :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                </el-form-item>
                </template>
            </el-form>
            </div>
        </div>
    </div>
    <div class="singleDiv">
        <div style="width:100%;height:100%;" v-show="pdfRight">
            <div class="p1">原文</div>
            <div class="divBoxs" v-show="listDiv">
                <div class="div1">
                    <div class="pImg" style="width:100%" v-for="(item,index) in imgList" :style="'left:'+ index*50 +'%'">
                        <img  @dblclick="open(item.guid)" :src="urlImg+'/archive/file/downloadThumbnail?originalGuid='+item.guid+'&preview=false'" alt="">
                        <div class="btns" :style="index == 0?'left:18%':'left:'+ index*18 +'%'">
                            <!-- "'left:'+ index*18 +'%'" -->
                            <el-button class="checkWay" type="primary">打印</el-button>
                            <el-button class="checkWay" type="primary">下载</el-button>
                        </div>
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
            <!-- <div class="div11">
                   <el-button class="checkWay" @click="back">打印</el-button>
                   <el-button class="checkWay" @click="back">下载</el-button>
            </div> -->
            <!--<div class="p2">文件标题1.PDF</div>-->
        </div>
            </div>
</div>
        <div class="footered" v-show="!redactFile" style="left:32.1%">
            <!-- <el-button class="checkWay" @click="goproOne">上一条</el-button>
            <el-button class="checkWay" @click="nextOne">下一条</el-button>
            <el-button class="checkWay" @click="keepAdd('addfile')">保存</el-button>
            <el-button class="checkWay addButton" @click="guajie">挂接</el-button>
            <el-button class="checkWay deleteButton" @click="">删除原文</el-button>-->
        </div>
     </div>
        
         <el-dialog  class="myDialog" title="挂接原文" :visible.sync="centerDialogVisibleTree" :close-on-click-modal="true">
             <el-form class="addfile">
                 <el-form-item label="文件名：" >
                     <el-input style="float:left;width:60%;margin-left:18px;"></el-input>
                 </el-form-item>
                 <el-upload>
                      <el-button type="primary" class="el-button checkWay" style="position:absolute;top:10px;right:0">选择文件</el-button>
                 </el-upload>
                 
                   <el-form-item label="文件标题：" >
                     <el-input style="float:left;width:60%"></el-input>
                 </el-form-item>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="addEventFormSubmitBtns()" class="el-button checkWay">挂接</el-button>
                <el-button type="primary" @click="centerDialogVisibleTree = false" class="el-button checkWay">取消</el-button> 
            </span>

        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './XiangDetail.service';
    import base from '@/scrollLoad';
    import HttpRequest from '@/api/request';
    import * as $ from 'jquery';
    @Component
    export default class appfileManagement extends Vue{
        urlImg:any;
        listDiv:boolean;
        contentDiv:boolean;
        redactFile:boolean;
        centerDialogVisibleTree : boolean;
        pdfRight:boolean;
        total : number;
        fondId: number;
        kinId : number;
        bids : number;//案卷库libId
        pageSize : number;
        mj : number;
        lens : number;
        nd: number;
        parentId: number;
        qzh : string;
        Id : number;
        fileUrl:any;
        imgList : any = {}
        addFileTrue : boolean;
        archiveId : number;
        OrderNum : number;
        basicForm : any = {};
        EditArr:any={};
        file:any;
        wenId:number;//案卷内的libId
        addfile:any={};
        fileList :  any = {}
        addArray : any = [];
        constructor(){
            super();
            this.listDiv = true;
            this.centerDialogVisibleTree = false;
            this.pdfRight = false;
            this.qzh = "";
            this.file = '';
            this.fileUrl = '';
            this.redactFile=false;
            this.contentDiv = false;
            this.basicForm = {}
            this.addFileTrue = true;
            this.addArray = [];
            this.addfile={};
            this.EditArr={};
            this.urlImg = HttpRequest['imgUrl'];
        }
        back():void{
            this['$router'].go(-1);
        };
        //上一条
        proOne():void{
            var stepTrue=true;
            for (var key in this.addfile){
                if(this.addfile[key]!=this.EditArr[key]){
                    stepTrue=false;
                };
            };
            if(stepTrue){
                this.goproOne();
            }else{
                this['$confirm']('是否对上一条数据进行保存', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '不保存',
                    type: 'warning'
                }).then(() => {
                   this.Editcommit('addfile',this.goproOne)
                }).catch(() => {
                   this.goproOne()
                });
            }
        };

        //前往上一条
        goproOne(){
            console.log(this.fileList)
            if(this.OrderNum>0){
                        this.OrderNum-=1;
                        var ID=this.fileList[this.OrderNum].id
                        this.getReDactNumber({libId:this.bids,id:ID})
                
            }else{
                this.Warn("没有上一条")
            }
        };

        //下一条
        nextOne():void{
            var stepTrue=true;
            for (var key in this.addfile){
                if(this.addfile[key]!=this.EditArr[key]){
                    stepTrue=false;
                };
            };
          if(stepTrue){
              this.gonextOne()
          }else{
              this['$confirm']('是否对上一条数据进行保存', '提示', {
                  confirmButtonText: '保存',
                  cancelButtonText: '不保存',
                  type: 'warning'
              }).then(() => {
                  this.Editcommit('addfile',this.gonextOne);
              }).catch(() => {
                  this.goproOne();
              });
          }
        };

        //前往下一页
        gonextOne(){
                var len = this.fileList.length;
                if(this.OrderNum<len){
                    this.OrderNum+=1;
                    var ID=this.fileList[this.OrderNum].id
                    this.getReDactNumber({libId:this.bids,id:ID})
                }else{
                    this.Warn("没有下一条");
                };
        };

        //编辑之后的提交
        Editcommit(form,cb){
            this['$refs'][form]['validate']((valid)=>{
                if(valid) {
                    for(var key in this.addfile){
                        this.EditArr[key]=this.addfile[key]
                    }
                    this.EditArr.rowStatus = 2;
                     this['$refs'][form]['validate']((valid)=>{
                if(valid){
                      this.addfile.rowStatus=2;
                    //   this.addfile.recomputeDh=true;
                    //   this.addfile.PARENTID = this.parentId;
                      console.log(this.addfile)
                          Service.SaveFile({recomputeDh:true,fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
                              if(res.data.succeeded){
                                  this.Suces("保存成功")
                                  this.back();
                                //   this.getListNumber({kindId:this.kinId,fondId:this.fondId,conditions:[]})
                              }else{
                                  this.getError(res.data.errorMessage)
                              }
                          })
                }else{
                    this.Warn('请完善内容!');
                };
            });
    }
            })
        };
        getReDactNumber(params:any){
            Service.getNumber(Service.getNumber(params).then(res=>{
                if(res.data.succeeded){
                    // for(var key in res.data.data){
                    //     if(res.data.data[key]/1!=NaN){
                    //         res.data.data[key]=res.data.data[key]+"";
                    //     }
                    // }
                    var obj = JSON.stringify(res.data.data);
                    this.addfile = JSON.parse(obj);
                    this.EditArr=res.data.data;
                }else{
                    this.getError(res.data.errorMessage);
                }
            })).then(res=>{
                if(res.data.succeeded){
                    for(var key in res.data.data){
                        if(res.data.data[key]/1!=NaN){
                            res.data.data[key]=res.data.data[key]+"";
                        }
                    }
                    var obj = JSON.stringify(res.data.data);
                    this.addfile = JSON.parse(obj);
                    this.EditArr=res.data.data;
                }else{
                    this.getError(res.data.errorMessage);
                }
            })
        }

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

        open(guid){
            this.listDiv = false;
            this.contentDiv = true;
            let params = {
                originalGuid:guid,
                preview:true
            };
            Service.displayToPdf(params).then((res) =>{
              this.fileUrl = this.getObjectURL(res);
              this.file = 'test/static/pdf/web/viewer.html?file=' + this.fileUrl;
        });
         }
         guajie(){//挂接
            this.centerDialogVisibleTree = true;
         }
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
            console.log(this.addfile)
            // var this.addfile.WJRQ = this.addfile.WJRQ
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                      this.addfile.rowStatus=2;
                      this.addfile.recomputeDh=true;
                    //   this.addfile.PARENTID = this.parentId;
                      console.log(this.addfile)
                          Service.SaveFile({fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
                              if(res.data.succeeded){
                                  this.Suces("保存成功")
                                  this.back();
                                //   this.getListNumber({kindId:this.kinId,fondId:this.fondId,conditions:[]})
                              }else{
                                  this.getError(res.data.errorMessage)
                              }
                          })
                }else{
                    this.Warn('请完善内容!');
                };
            });
        }
        keepAddTwo(form){
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                      this.addfile.rowStatus=2;
                    //   this.addfile.PARENTID = this.parentId;
                      console.log(this.addfile)
                          Service.SaveFile({fondId:this.fondId,libId:this.bids,data:this.addfile}).then(res=>{
                              if(res.data.succeeded){
                                  this.Suces("保存成功")
                                //   this.getListNumber({kindId:this.kinId,fondId:this.fondId,conditions:[]})
                              }else{
                                  this.getError(res.data.errorMessage)
                              }
                          })
                }else{
                    this.Warn('请完善内容!');
                };
            });
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
               Service.getEditField(this.bids).then(res=>{
                        if(res.data.succeeded){
                            this.addArray=res.data.data;
                               this.addfile={};
                            for(var item of this.addArray){
                                //this.addfile[item.fieldName]='';
                                item['allowEdit']=false;
                                this['$set'](this.addfile,item.fieldName,null);
                            }
                             this.addfile.QZH=this.qzh;
                             this.addfile.DQQZH=this.qzh;
                            //  this.addfile.WJRQ = this.wj;

                            // Service.getNumber({libId:this['$route'].params.libId,id:this['$route'].params.id}).then(res=>{
                            //     if(res.data.succeeded){
                            //         var obj=JSON.stringify(res.data.data);
                            //         this.addfile=JSON.parse(obj)
                            //         // for (var key in this.addfile){
                            //         //     this.addfile[key]=res.data.data[key]
                            //         // }
                            //         this.EditArr=res.data.data;
                            //     }else{
                            //         this.getError(res.data.errorMessage)
                            //     }
                            // })
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
        getSTime(){

        }
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };

         mounted(){
             var str = JSON.parse(window.sessionStorage.getItem('XiangDetail'));
             var borrowId = str['borrowId']?str['borrowId']:null;
             // 又水印的详情
             // if(str.appNo){
                 this.bids = str.libId;
                 this.archiveId = str.archiveId;
                 // if(str.MJ=='1'){
                     Service.waterMarkTime({ appNo:str.appNo,borrowId:borrowId }).then(res=>{
                         if(res.data.succeeded){
                             if(!res.data.data){
                                 this.pdfRight = true;
                                 let params = {
                                     appNo:str.appNo,
                                     libId:this.bids,
                                     archiveId:this.archiveId
                                 };
                                 // 右侧pdf
                                 Service.waterMarkPdf(params).then((res) => {
                                     console.log(res);
                                     if(res.type== 'application/json'){
                                        let that = this;
                                        let reader = new FileReader();
                                        reader.readAsText(res);
                                        reader.onload = function(event) {
                                            // 文件里的文本会在这里被打印出来
                                            console.log(event.target.result);
                                            let str = JSON.parse(event.target.result)
                                            that.Warn(str.errorMessage);
                                          };

                                     }else{
                                        this.fileUrl = this.getObjectURL(res);
                                        this.file = 'static/pdf/web/viewer.html?file=' + this.fileUrl;
                                     }
                                 });
                                 this.listDiv = false;
                                 this.contentDiv = true;
                             }else{
                                 this.pdfRight = false;
                             }
                         }else{
                             this.getError(res.data.errorMessage)
                         }
                     });
                 // }else{
                 //     this.pdfRight = false;
                 // }

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
                                 this.addfile.BGQX = res.data.data.BGQX_Text;
                                 this.addfile.HOUSETYPE = res.data.data.HOUSETYPE_Text;
                                 this.EditArr=res.data.data;
                             }else{
                                 this.getError(res.data.errorMessage)
                             }
                         })
                     }else{
                         this.getError(res.data.errorMessage)
                     }
                 })
             }
         // }
    };

</script>

<style lang="scss" scoped>
    @import '../../../../styles/fileManage/addInfile';
</style>