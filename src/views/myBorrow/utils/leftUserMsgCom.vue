<template>
    <ul  class="ulList clear">
        <span >
            <li>[查阅用户]：<b >{{passedFullName}}</b></li>
            <li>[证件号码]：<b>{{returnCrdent(passedCredentialsNumber)}}</b></li> 
            <li>[工作单位]：<b >{{passedCompany}}</b></li> 
            <li v-if="showBtn">[证明文件]：<b> 
                <el-button class="tabletoolBtn" @click="showIdentifyDialog">查看</el-button>
            </b></li>                                                       
        </span>
        <showCredentialDialog ref= "showCredentialDialogRef"></showCredentialDialog>
    </ul> 
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './leftUserMsgCom.service';
    import showCredentialDialog from '@/views/myBorrow/utils/showCredentialDialog.vue';
	@Component({
        components:{
            showCredentialDialog
        }
    })
	export default class leftUserMsgCom extends Vue {
        // 只有受理登记查询详情页面可以【查看】；协查办理界面可以【查看】
        fromPageType: string = '';//1:查阅申请、协查申请详情；2：查阅性情、审批详情、受理登记、拆分(这个页面暂时未引用此组件)

        //用于查阅详情、协查办理详情界面，
        passedUserId: number = 0;    
        passedUserType: string = '';      //System Public

        //用于受理登记、拆分单界面，传入的数据显示
        passedFullName: string = '';
        passedCredentialsNumber: string = ''; 
        passedCompany: string = '';     
        passedCredentialsType: string = '';

        showBtn: boolean = false;       //是否显示【查看】

        @Watch('fromPageType')
        showSelectUser(){
            if (this.fromPageType=='1') {
                this.getUserMsg();
            }
        }

        returnCrdent(value){
            if(value){
                return `${value.substring(0,3)}****${value.substring(value.length-3)}`;
            }
        }
        showIdentifyDialog(){//查看证件
            this.$refs.showCredentialDialogRef.tsVisible = true;
            this.$refs.showCredentialDialogRef.passedCredentialsNumber = this.passedCredentialsNumber;
            this.$refs.showCredentialDialogRef.passedCredentialsType = this.passedCredentialsType;
            this.$refs.showCredentialDialogRef.tsVisible = true;

        }
        getUserMsg(){
            let userType = this.passedUserType;
            let params = {
                type: userType=="System"? "1":"0",// “1”系统用户 0公众用户
                userId: this.passedUserId
            }
            Service.findUserById(params).then(res => {
                let data = res.data.data; 
                this.passedFullName = data.fullName;
                this.passedCredentialsNumber = data.credentialsNumber;
                this.passedCredentialsType = data.credentialsType;
                if(userType == "System"){
                    this.passedCompany = data.archiveAgentCode;
                    Service.getArchivesInfo({archiveAgentCode: this.passedCompany}).then(res =>{
                        if(res.data.succeeded){
                            this.passedCompany = res.data.data.archiveAgentName;
                        }
                    });
                }else{
                    this.passedCompany = data.company;
                }
            });
        };
	}
</script>
