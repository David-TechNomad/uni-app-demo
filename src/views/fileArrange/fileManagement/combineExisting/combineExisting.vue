<template>
    <section class="combineExisting" style="height:100%;padding-left:10px;width:100%;position:relative;">
        <div class="combineExisting_header">
            <p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">文件管理</p>
            <span>组已有卷</span>
            <div>
                <el-button class="checkWay" @click="stepTwo">下一步</el-button>
                <el-button class="checkWay" @click="goBack">返回</el-button>
            </div>
        </div>
        <div class="combineExisting_container">
            <div class="table_top">
                <div class="searchContainer">
                    <el-form :model="searchkeyOne" class="stagesupersearch" >
                        <el-form-item>
                            <el-input v-model="searchkeyOne.key" @keyup.enter.native="searchKey"></el-input>
                            <div class="rt">
                                <el-button class="indexWay" @click="searchKey" style="margin-left:15px;">检索</el-button>
                                <el-button class="indexWay" @click="clearSearch">清空</el-button>
                                <!--<el-button class="indexWay"  style="margin-left:15px;" @click="searchKey">检索</el-button>-->
                            </div>
                        </el-form-item>
                    </el-form>

                    <!--<el-form :model="searchform"  class="LIneFeedForm">-->
                    <!--<template v-for="item in searchConfig">-->
                        <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
                            <!--<el-select v-model="searchform['value'+item.id]" >-->
                                <!--<el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'" >-->
                            <!--<el-input v-model.trim="searchform['value'+item.id]" @keyup.enter.native="searchKey"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</template>-->
                    <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="searchKey">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
                <!--</el-form>-->
                </div>
                <div class="tableContainerOne" v-show="tableShow">
                    <el-table
                            :data="AJdata"
                            style="width:100%;"
                            :height="tableheightOne"
                            :stripe="true"
                            tooltip-effect="dark"
                            class="containTable indexTable"
                            border
                            @selection-change="selectionChangeOne">
                        <el-table-column type="selection" width="55px" label="#" ></el-table-column>
                        <template v-for="item in tableHeader">
                            <el-table-column v-if="!item.hidden" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <div class="table_down">
                 <div>
                     <div class="listTitle">要移动的文件</div>
                </div>
                <div class="tableContainertwo">
                <el-table
                        :data="filedata"
                        style="width:100%;"
                        :height="tableheightTwo"
                        :stripe="true"
                        tooltip-effect="dark"
                        class="containTable indexTable"
                        border
                        @selection-change="selectionChange">
                    <!--<el-table-column type="selection" width="55px" label="#" ></el-table-column>-->
                    <el-table-column v-for="item in tableHeader_two" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :key="item.caption" :label="item.caption" v-if="!item.hidden"></el-table-column>
                </el-table>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './combineExisting.service'
    @Component
    export default class combineExisting extends Vue{
        libId:number;
        wenId:number;
        fondId:number;
        kindId:number;
        AJdata:any =[];
        tableHeader:any = [];
        tableHeight:number;
        searchform:any = {};
        searchConfig:any = {};
        filedata:any = [];
        tableHeader_two:any
        selection:any = [];
        selection2:any = []
        searchContent:any = [];
        tableShow:boolean;
        isProjectCompany:boolean;
        searchkeyOne:any={};
        searchValue:string;
        tableheightOne:number;
        tableheightTwo:number;
       constructor(){
           super();
           this.AJdata = [];
           this.tableHeader = [];
           this.searchform = {};
           this.searchConfig = [];
           this.filedata = [];
           this.tableHeader_two = [];
           this.selection = [];
           this.selection2 = [];
           this.searchContent = [];
           this.tableShow = false;
           this.searchkeyOne={
               key:null
           };
           this.searchValue = null;
           this.tableheightOne=(document.documentElement.clientHeight-131)/2-75;
           this.tableheightTwo=(document.documentElement.clientHeight-131)/2-50;
       };
       //搜索按钮
        searchKey(){
            // this.searchContent=[];
            // for(var key in this.searchform){
            //     if(this.searchform[key]!=null&&this.searchform[key]!=""){
            //         var Name = key.slice(5);
            //         var str = parseInt(Name)
            //         var obj = {
            //             id:str,
            //             value:this.searchform[key]
            //         };
            //         this.searchContent.push(obj)
            //     };
            // };
            this.searchValue = this.searchkeyOne.key;
            Service.getDispField(this.libId).then(res=>{
                if(res.data.succeeded){
                    this.tableHeader=res.data.data;
                    Service.FileSearch({fondId:this.fondId,kindId:this.kindId,searchKey: this.searchValue}).then(res=>{
                        if(res.data.succeeded){
                            this.AJdata = res.data.data;
                            document.getElementsByClassName('tableContainerOne')[0]['style'].height = document.getElementsByClassName('table_top')[0].clientHeight-document.getElementsByClassName('searchContainer')[0].clientHeight-20+"px";
                            this.tableShow = true;
                            window['addEventListener']('resize',()=>{
                                document.getElementsByClassName('tableContainerOne')[0]['style'].height = document.getElementsByClassName('table_top')[0].clientHeight-document.getElementsByClassName('searchContainer')[0].clientHeight-20+"px";
                            })
                        }else{
                            this.getError(res.data.errorMessage)
                        }
                    })
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        //清空搜索框
        clearSearch(){
            // for(var key in this.searchform){
            //     this.searchform[key] = null;
            // }
            this.searchkeyOne.key=null;
            this.searchValue = null;
        };
        //获取案卷
        selectionChangeOne(selection){
            this.selection =selection;
        }
        selectionChange(selection){
            this.selection2 = selection;
        };
        //返回
        goBack(){
            this['$router'].go(-1);
        }
        created(){
            var str = window.sessionStorage.getItem('combineExisting');
            var obj = JSON.parse(str);
            this.libId = obj.lib;
            this.fondId = obj.parent;
            this.wenId = obj.wenId;
            this.kindId =obj.kind;
            this.isProjectCompany =obj.isProjectCompany;
            this.filedata = JSON.parse(sessionStorage.getItem('CombineExistFile'));
              //获取搜索框配置
            // Service.Getquerycondition(this.libId).then(res=>{
            //     if(res.data.succeeded){
            //         this.searchConfig=res.data.data;
            //         for(var item of res.data.data){
            //             this['$set'](this.searchform,'value'+item.id,null)
            //         };
            //     }else{
            //         this.getError(res.data.errorMessage)
            //     }
            // })
              //获取文件表格列
            Service.getDispField(this.wenId).then(res=>{
                if(res.data.succeeded){
                    this.tableHeader_two=res.data.data;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        mounted():void{
            window.onresize=()=>{
                return (()=>{
                    this.tableheightOne=(document.documentElement.clientHeight-131)/2-75;
                    this.tableheightTwo=(document.documentElement.clientHeight-131)/2-50;
                })();
            }
        };

        stepTwo(){
            if(this.selection.length==1){
                var str = this.selection[0];
                window.sessionStorage.setItem('targetFile',JSON.stringify(str));
                var obj = {
                    lib:this.libId,
                    parent:this.fondId,
                    kindId:this.kindId,
                    wenId:this.wenId,
                    isProjectCompany:this.isProjectCompany
                };
                window.sessionStorage.setItem('combineExistingST',JSON.stringify(obj))
                this['$router'].push({
                    path:'/fileArrange/fileManagement/combineExistingST',
                    // query:{
                    //     lib:this.libId,
                    //     parent:this.fondId,
                    //     kindId:this.kindId,
                    //     wenId:this.wenId
                    // }
                })
            }else if(this.selection.length>1){
                this.Warn('你只能选择一个案卷。')
            }else if(this.selection.length==0){
                this.Warn('请选择目标卷。')
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
        //案卷号
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

    }
</script>

<style scoped lang="scss">
    @import '../../../../styles/fileManage/combineExisting.scss';
</style>