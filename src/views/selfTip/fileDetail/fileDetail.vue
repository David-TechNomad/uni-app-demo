<template>
    <section class="fileDetaile">
        <div class="mainDoc">
            <div class="mainCon basicList">
                <div class="loanTipTitle">
                    案卷详情
                    <div class="titleSect"></div>
                </div>
            </div>
            <div class="GoBack"><el-button class="checkWay" @click="goback">返回</el-button></div>
            <div class="fixModal">
                <div class="formList">
                    <el-form  class="addfile" :model="addfile" label-width="150px" ref="addfile">
                        <template v-for="item in addArray">
                            <el-form-item  :label="item.caption+' :'" :prop="item.fieldName" v-if="item.editControl==2||item.editControl==8">
                                <el-input :readonly="true" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                            </el-form-item>
                            <el-form-item  :label="item.caption+' :'" :prop="item.fieldName" v-if="item.editControl==3">
                                    <el-select v-model="addfile[item.fieldName]">
                                        <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="true"></el-option>
                                </el-select>
                                <!--<el-input :readonly="true" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>-->
                            </el-form-item>
                            <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9" :prop="item.fieldName">
                                <el-input :readonly="true" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]"></el-input>
                            </el-form-item>
                        </template>
                    </el-form>
                </div>
                <div class="fileDetaileTable">
                    <el-table
                            tooltip-effect="dark"
                            stripe
                            :data="listData"
                            highlight-current-row
                            class="indexTable containTable"
                            :height="bodyHeight"
                            :row-class-name="getRowClass1"
                            >
                        <!--<el-table-column type="selection" width="55" label="#"></el-table-column>-->
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="electricBorrowDetail(scope.$index, scope.row)">详情</span>
                            </template>
                        </el-table-column>
                        <el-table-column v-for='item in tableList'  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :key="item.fieldName" :label="item.caption" :width="item.width">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Service from './fileDetail.service'
@Component
    export default class fileDetail extends Vue{
        windowHeight: number;
        bodyHeight: number;
        addfile:any={};
        addArray:any=[];
        listData:any=[];
        tableList:any=[];
        libId:number;
        fondId:number;
        kindId:number;
        SrcId:number;
        WjlibId:number;
        type:number;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 130;
            this.addfile={};
            this.addArray=[];
            this.listData=[];
            this.tableList=[];
        };
    electricBorrowDetail(index,row){
        var obj = {
            Srclib:this.WjlibId,
            SrcId:row.id,
            type:this.type
        }
        window.sessionStorage.setItem('ToWjDetail',JSON.stringify(obj));
        this['$router'].push({
            path:'/selfTip/WjDetail'
        });
    };
    getRowClass1(row: any = {}):string {
         let obj = JSON.parse(window.sessionStorage.getItem('ToWjDetail'))
         if(obj && (obj.SrcId == row.row.id) ){
            return 'row-yijiao';
            window.sessionStorage.removeItem('ToWjDetail');
         }
    }
    //获取卷内文件
    getInfilePapers(params:any){
        Service.searchJuanNei(params).then(res=>{
            if(res.data.succeeded){
                this.listData = res.data.data;
            }else{
                this.getError(res.data.errorMessage);
            }
        })
    };
    //获取卷内文件
    getInfilePapers4(params:any){
        Service.searchJuanNei4(params).then(res=>{
            if(res.data.succeeded){
                this.listData = res.data.data;
            }else{
                this.getError(res.data.errorMessage);
            }
        })
    };
    //获取卷内文件
    Insidecoil(params:any){
        Service.Insidecoil(params).then(res=>{
            if(res.data.succeeded){
                this.listData = res.data.data;
            }else{
                this.getError(res.data.errorMessage);
            }
        })
    };
    goback(){
        this['$router'].go(-1);
    };
        created(){
        var str = window.sessionStorage.getItem('Tofiledetail');
        var obj = JSON.parse(str);
        console.log(obj)
        this.libId = obj.libId;
        this.fondId = obj.fondId;
        this.kindId = obj.kindId;
        this.SrcId = obj.SrcId;
        this.type = obj.type;
         this.getOne();
        };
        getOne(){
            Service.getNumber({libId:this.libId,id:this.SrcId}).then(res=>{
                if(res.data.succeeded){
                    this.addfile = res.data.data;
                    let num = res.data.data.PHASE;
                    if(num==1){
                        Service.getEditField(this.libId).then(res=>{
                            if(res.data.succeeded){
                                this.addArray = res.data.data;
                                this.genWenJianLibId({anJuanLibId:this.libId},num)
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else if(num==2){
                        Service.getEditDeploy(this.libId).then(res=>{
                            if(res.data.succeeded){
                                this.addArray = res.data.data;
                                this.genWenJianLibId({anJuanLibId:this.libId},num)
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else if(num==4){
                        Service.getEditFields(this.libId).then(res=>{
                            if(res.data.succeeded){
                                this.addArray = res.data.data;
                                this.genWenJianLibId({anJuanLibId:this.libId},num)
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
    genWenJianLibId(params,num){
        Service.genWenJianLibId(params).then(res=>{
            if(res.data.succeeded){
                this.WjlibId = res.data.data.wenjianLibId;
                Service.getColumns({libId:this.WjlibId}).then(res=>{
                    if(res.data.succeeded){
                        this.tableList = res.data.data.listColumns;
                        if(num==1){
                            this.getInfilePapers({kindId:this.kindId,fondId:this.fondId,anJuanId:this.SrcId,conditions:[],pageCondition:{}});
                        }else if(num==2){
                            this.Insidecoil({kindId:this.kindId,fondId:this.fondId,anJuanId:this.SrcId,conditions:[],pageCondition:{}});
                        }else if(num==4){
                            this.getInfilePapers4({kindId:this.kindId,fondId:this.fondId,anJuanId:this.SrcId,conditions:[],pageCondition:{}});
                        }
                    }else{
                        this.getError(res.data.errorMessage);
                    };
                });
            }else{
                this.getError(res.data.errorMessage);
            };
        });
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
    mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 130;
                })()
            };
        };
    }
</script>

<style scoped lang="scss">
@import '../../../styles/selfTip/fileDetailStyle.scss';
</style>