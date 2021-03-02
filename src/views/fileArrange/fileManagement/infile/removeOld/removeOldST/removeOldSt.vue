<template>
    <section class="combineExistingST" style="margin-left:2px;height:100%;width: 100%;position:relative;">
        <div class="conbinefile">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">文件管理</p>
            <span>移到现有卷</span>
            <el-button class="checkWay" @click="goBack">返回</el-button>
        </div>
        <div class="combinetable">
            <div class="listTitle">要移动的文件</div>
            <div class="combinetableOne">
                <el-table
                        ref="multipleTable"
                        :data="data"
                        tooltip-effect="dark"
                        style="width:100%"
                        class="containTable indexTable"
                        :height="tableheight"
                        :stripe="true"
                        @selection-change="selectionChange"
                        border
                >
                    <!--<el-table-column  type="selection" width="55"></el-table-column>-->
                    <!--<el-table-column v-for="item in tableHeader" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :label="item.caption" :width="item.width" :show-overflow-tooltip="true"></el-table-column>-->
                    <template v-for="item in tableHeader">
                        <!--<el-table-column  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>-->
                        <el-table-column :width="item.width" v-if="!item.hidden" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :label="item.caption" :show-overflow-tooltip="true"></el-table-column>
                    </template>
                </el-table>
            </div>
        </div>
        <div class="filemessage">
            <p>目标卷信息</p>
            <div class="formContain">
                <el-form  class="addfile" :model="addfile" label-width="140px" ref="addfile">
                    <template v-for="item in addArray">
                        <el-form-item  :label="item.caption+' :'" v-if="item.editControl==1" :prop="item.fieldName">
                            <el-button class="checkWay">{{item.caption}}</el-button>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.editControl==2&&item.fieldName!='XMBH'&&item.fieldName!='XMMCNEW'&&item.fieldName!='FLH'&&item.fieldName!='WJRQ'&&item.fieldName!='QZH'&&item.fieldName!='AJH'&&item.fieldName!='JNSXH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                            <el-input v-model="addfile[item.fieldName]"  :maxlength="item.maxLength" @change="(Val)=>{addfile[item.fieldName]=Val}"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='AJH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:AJHvalidator,trigger:'change'}]">
                            <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength" placeholder="正确格式:如1或1-1"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='JNSXH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:JNSXvalidator,trigger:'change'}]">
                            <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" placeholder="正确格式:如1"  :maxlength="item.maxLength"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='WJRQ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:timevalidator,trigger:'blur'}]">
                            <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:myvalidator,trigger:'blur'}]">
                            <el-input :readonly="!item.allowEdit"  v-model.number="addfile[item.fieldName]" type="number" :maxlength="item.maxLength" min="0"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='FLH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                            <!--<el-select  v-model="addfile[item.fieldName]">-->
                                <!--<el-option v-for="ind in FLhArr" :label="ind.categoryNumberText" :value="ind.categoryNumber" :key="ind.categoryNumber" :disabled="!item.allowEdit">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                            <el-input :readonly="true" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-show="false"></el-input>
                            <el-input :readonly="true" v-model="flhName"   :maxlength="item.maxLength" @focus="SelectFlh(item.allowEdit)"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='MJ'" :prop="item.fieldName" :rules="[{required:true,message:'请选择'+item.caption,trigger:'blur'}]">
                            <el-select v-model="addfile.MJ">
                                <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="!item.allowEdit">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='BGQX'" :prop="item.fieldName" :rules="[{required:true,message:'请选择'+item.caption,trigger:'blur'}]">
                            <el-select v-model="addfile.BGQX">
                                <el-option v-for="ind in item.dictData" :key="ind.code" :label="ind.text" :value="ind.code" :disabled="!item.allowEdit">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9&&item.fieldName!='BZ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                            <el-input class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.fieldName=='BZ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                            <el-input :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength" placeholder="需填写文件形式：原件，复印件，查档件"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.editControl==10" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                            <el-date-picker :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='XMBH'||item.fieldName=='XMMCNEW'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:isProjectCompany?'change':'blur'}]">
                            <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!isProjectCompany"></el-input>
                            <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMBH'">
                                <el-option v-for="ind in projectCodearr" :key="ind.id" :label="ind.projectCode" :value="ind.projectCode" @click.native="projectCodechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                            </el-select>
                            <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMMCNEW'">
                                <el-option v-for="ind in projectNamearr" :key="ind.id" :label="ind.projectName" :value="ind.projectName"  @click.native="projectNamechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='QZH'" prop="QZH" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                            <el-input :readonly="!item.allowEdit?true:item.isInheritParent&&item.isArcNoField&&item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!ISJT"></el-input>
                            <el-select v-model="addfile[item.fieldName]"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" v-if="ISJT">
                                <el-option v-for="item in JTarr" :key="item.id" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <div class="filemessageDiv">
                <el-button class="checkWay" @click="keepFile('addfile')">保存</el-button>
                <el-button class="checkWay" @click="reset">重置</el-button>
            </div>
        </div>
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
    import Service from './removeOldST.service';
    import { Loading } from 'element-ui';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class combineExistingST extends Vue{
        addfile:any={};
        tableHeader:any=[];
        data:any=[];
        addArray:any=[];
        arr:any=[];
        selection:any=[];
        libId:number;
        kindId:number;
        fondId:number;
        wenId:number;
        isProjectCompany:boolean;
        projectCodearr:any=[];
        projectNamearr:any=[];
        loadingInstance:any;
        FLhArr:any=[];
        ISJT:boolean;
        JTarr:any=[];
        FlhTrue:boolean;
        flhType:any={};
        flhName:any;
        flhValue:any;
        tableheight:number;
        constructor(){
            super();
            this.tableHeader=[];
            this.data=[];
            this.addArray=[];
            this.arr=[];
            this.selection=[];
            this.projectCodearr=[];
            this.projectNamearr=[];
            this.FLhArr = [];
            this.JTarr = [];
            this.FlhTrue = false;
            this.flhType = {
                children: "children",
                label: "categoryNumberText"
            };
            this.flhName=null;
            this.flhValue=null;
            this.tableheight = document.documentElement.clientHeight - 183;
        }
        goBack():void{
            this['$router'].go(-1)
        };
        //选中项
        selectionChange(selection){
            this.selection=selection
        };

        //重置
        reset(){
            this.flhName = null;
            var obj = sessionStorage.getItem('targetFile');
            var obj2 = JSON.parse(obj);
            obj2.MJ = obj2.MJ+'';
            var str = JSON.stringify(obj2)
            this.addfile = JSON.parse(str);
            if(this.addfile.FLH){
                for(var item of this.FLhArr){
                    if(item.categoryNumber == this.addfile.FLH){
                        this.flhName = item.categoryNumberText;
                        break;
                    }else if(item.children){
                        for(var son of item.children){
                            if(son.categoryNumber==this.addfile.FLH){
                                this.flhName = son.categoryNumberText;
                                break;
                            }else if(son.children){
                                for(var ind of son.children){
                                    if(ind.categoryNumber == this.addfile.FLH){
                                        this.flhName = ind.categoryNumberText;
                                        break;
                                    }else if(ind.children){
                                        for(var son2 of ind.children){
                                            if(son2.categoryNumber == this.addfile.FLH){
                                                this.flhName = son2.categoryNumberText;
                                                break;
                                            }else if(son2.children){
                                                for(var son3 of son2.children){
                                                    if(son3.categoryNumber == this.addfile.FLH){
                                                        this.flhName = son3.categoryNumberText;
                                                        break;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };

        //保存案卷
        keepFile(form){
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
                    var arr=[];
                    for(var item of this.data){
                        arr.push(item.id)
                    }
                    var obj={
                        fondId:this.fondId,
                        kindId:this.kindId,
                        existingAnJuan:this.addfile,
                        wenJianIds:arr
                    }
                    Service.moveToExistingAnJuan(obj).then(res=>{
                        if(res.data.succeeded){
                            this['$confirm']('移卷成功', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                showCancelButton:false,
                                type: 'success'
                            }).then(()=>{
                                this['$router'].go(-2)
                            })
                        }else{
                            this['$confirm'](res.data.errorMessage, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '不保存',
                                showCancelButton: false,
                                type: 'warning',
                                center: true
                            });
                        }
                        this.$nextTick(() => { this.loadingInstance.close();
                        });
                    })
                }else{
                    this.getError('请完善内容')
                }
            })
        };
        created(){
            var str = window.sessionStorage.getItem('removeOldST');
            var obj = JSON.parse(str)
            this.libId = obj.lib/1;
            this.wenId = obj.wenId/1;
            this.fondId = obj.fond/1;
            this.kindId = obj.kindId/1;
            this.isProjectCompany=obj.isProjectCompany
            // this.libId = this['$route'].query.lib/1;
            // this.wenId = this['$route'].query.wenId/1;
            // this.fondId = this['$route'].query.fond/1;
            // this.kindId = this['$route'].query.kindId/1;
            Service.getDispField(this.wenId).then(res=>{
                if(res.data.succeeded){
                    this.tableHeader=res.data.data;
                    var data = sessionStorage.getItem('CombineExistFile');
                    this.data = JSON.parse(data);
                }else{
                    this.getError(res.data.errorMessage)
                }
            });
            Service.getEditField(this.libId).then(res=>{
                if(res.data.succeeded){
                    for (var item of res.data.data){
                        this['$set'](this.addfile,item.fieldName,null)
                    };
                    this.IsCompany(this.fondId);
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
                    this.addArray=res.data.data;
                    var obj = sessionStorage.getItem('targetFile');
                    var obj2 = JSON.parse(obj);
                    obj2.MJ = obj2.MJ+'';
                    if(obj2.JNWJS!=null){
                        obj2.JNWJS = obj2.JNWJS/1
                    }
                    var str = JSON.stringify(obj2)
                    this.addfile = JSON.parse(str);
                    this.getFla();
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
        mounted(){
            window.onresize = ()=>{
                return (()=>{
                    this.tableheight = document.documentElement.clientHeight - 183;
                })();
            }
        }
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };

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
                        //         break;
                        //     }else if(item.children){
                        //         for(var son of item.children){
                        //             if(son.categoryNumber==this.addfile.FLH){
                        //                 this.flhName = item.categoryNumberText;
                        //                 break;
                        //             }else if(son.children){
                        //                 for(var ind of son.children){
                        //                     if(ind.categoryNumber == this.addfile.FLH){
                        //                         this.flhName = item.categoryNumberText;
                        //                         break;
                        //                     }else if(ind.children){
                        //                         for(var son2 of ind.children){
                        //                             if(son2.categoryNumber == this.addfile.FLH){
                        //                                 this.flhName = item.categoryNumberText;
                        //                                 break;
                        //                             }else if(son2.children){
                        //                                 for(var son3 of son2.children){
                        //                                     if(son3.categoryNumber == this.addfile.FLH){
                        //                                         this.flhName = item.categoryNumberText;
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
                    break;
                }else if(son.children!=null){
                    this.ReturnFla(son.children)
                }
            }
        }
        projectCodechange(item,ind){
            if(!ind.allowEdit){
                this.addfile.XMMCNEW = item.projectName;
            }
        };
        projectNamechange(item,ind){
            if(!ind.allowEdit){
                this.addfile.XMBH = item.projectCode;
            }
        };
        myAJH(num){
            if(num!==null) {
                num = num+"";
                if (num.length == 1) {
                    return '000'+num;
                } else if (num.length == 2) {
                    return '00'+num;
                } else if (num.length == 3) {
                    return '0'+num;
                } else {
                    return num;
                }
            }else{
                return null;
            }
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
        SelectFlh(v){
            if(v){
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
    }
</script>

<style scoped lang="scss">
    @import '../../../../../../styles/fileManage/combineExistingST.scss';
</style>