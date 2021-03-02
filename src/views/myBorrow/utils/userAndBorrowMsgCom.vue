<template>
    <div class="boxshow bgwhite clear disFlex" >
        <div class="uMsg">
            <ul  class="ulList clear">
                <span >
                    <li>[查阅用户]：<b >{{passedFullName}}</b></li>
                    <li>[证件号码]：<b>{{returnCrdent(passedCredentialsNumber)}}</b></li> 
                    <li>[工作单位]：<b >{{passedCompany}}</b></li> 
                    <li v-if="showBtn">[证明文件]：<b> 
                        <el-button class="tabletoolBtn" @click="showIdentifyDialog">查看</el-button>
                    </b></li>                                                       
                </span>
            </ul> 
        </div>
        <div class="flex1">
            <!-- 需要编辑的form框 -->
            <el-form ref="form" v-if="needValidate" label-width="100px" class="lt pd5 borderleft w100 " :mode="basicForm" :rules="needValidate? basicFormRules:''" size="small"  >
                <div class="disFlex">
                    <el-form-item label="接待馆：" class ="lt flex1" style="min-width: 200px;">
                        <el-input class="checkName percentName"  v-model="basicForm.receptionAgentName"></el-input>
                    </el-form-item>
                    <el-form-item label="查阅目的：" class ="lt diabledSelect flex1">
                        <dictSelect :dictId="39" :dictModel="basicForm.appType" :dictDisabled="false" @dictChange="val => {this.basicForm.appType = val;}"></dictSelect>
                    </el-form-item>
                    <el-form-item label="查阅结束日期：" class ="lt flex1" label-width="120px"> 
                        <el-date-picker type="date" v-model="basicForm.appEndDate"   placeholder="选择日期" size="small"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="disFlex" v-if="!isAssist">
                    <el-form-item label="查阅内容："  class ="flex1">{{basicForm.lookupDescription}}
                    </el-form-item>
                </div>
                <div class="disFlex" v-if="!isAssist">
                    <el-form-item label="备注："  class ="flex1">{{basicForm.comments}}
                    </el-form-item>
                </div>
                <div class="disFlex" v-if="isAssist">
                   <el-form-item   label="检索关键词："  > {{passedKeyWord}}</el-form-item>
                </div>
            </el-form>
            <!-- 无需编辑的form框 -->
            <el-form ref="form" v-else label-width="100px" class="lt pd5 borderleft w100 "   size="small"  >
                <div class="disFlex">
                    <el-form-item label="接待馆：" class ="lt flex1" style="min-width: 200px;">
                        <el-input class="checkName percentName" readonly v-model="basicForm.receptionAgentName"></el-input>
                    </el-form-item>
                    <el-form-item label="查阅目的：" class ="lt diabledSelect flex1">
                        <dictSelect :dictId="39" :dictModel="basicForm.appType" :dictDisabled="true" @dictChange="val => {this.basicForm.appType = val;}"></dictSelect>
                    </el-form-item>
                    <el-form-item label="查阅结束日期：" class ="lt flex1" label-width="120px"> 
                        <el-date-picker type="date" v-model="basicForm.appEndDate" readonly placeholder="选择日期" size="small"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="disFlex" v-if="!isAssist">
                    <el-form-item label="查阅内容：" readonly  class ="flex1">{{basicForm.lookupDescription}}
                    </el-form-item>
                </div>
                <div class="disFlex" v-if="!isAssist">
                    <el-form-item label="备注：" readonly class ="flex1">{{basicForm.comments}}
                    </el-form-item>
                </div>
                <div class="disFlex" v-if="isAssist">
                   <el-form-item   label="检索关键词："  > {{passedKeyWord}}</el-form-item>
                </div>
                
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
	import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
	@Component
	export default class iconProcessComponent extends Vue {
        passedUserId: number = 0;   //如果传递此值，需要单独查询用户信息；
        userType: string = '';      //System Public
        isAssist: boolean = false;  //协查办理界面，右侧信息显示关键字，同时拆单信息不显示【查看】
        passedKeyWord: string = ''; //传入的关键字，用于协查

        passedFullName: string = '';
        passedCredentialsNumber: string = '';//证件号码
        passedCompany: string = '';     //工作单位
        showBtn: boolean = false;       //是否显示【查看】
        basicForm: any = {
            receptionAgentName: '',
            appType: '',
            appEndDate: '',
            lookupDescription: '',
            comments: ''
        };
        basicFormRules:any = {
            'appType': [
                { required: true, message: ' ', trigger: 'blur' }                    
            ],
            'appEndDate': [
                { required: true, message: ' ', trigger: 'blur' }
            ]
        };
        needValidate: boolean = false;//需要校验的编辑画面


        returnCrdent(value){
            if(value){
                return `${value.substring(0,3)}****${value.substring(value.length-3)}`;
            }
        }
        showIdentifyDialog(){//查看证件

        }

	}
</script>
