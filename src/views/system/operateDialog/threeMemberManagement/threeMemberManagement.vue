<template>
	<div>
		<el-dialog title="三员管理" :visible.sync="threeMemberManagementVisible" class="myDialogCenter" :close-on-click-modal="false" :show-close="false">
			<div class="systemManagement mt10">
                <div class="ManagementItem">
                    <p class="dialogMainTitle">系统管理员</p>
                    <div class="d-ib">
                           <!-- <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            <p>王小二</p>
                        </el-dialog>-->
                        <div style="display: inline-block;margin-right: 5px;margin-bottom: 5px" :key="item.userId" v-for="item in systemAttr"><img src="../../../../imgs/noPerson.png" alt=""><p>{{item.fullName}}<span style="color: cornflowerblue" @click="shanChu(item,1)">【删除】</span></p></div>
                        <div style="display: inline-block;cursor:pointer;" @click="addUser(1)"><img src="../../../../imgs/addPerson.png" alt=""><p style="text-align: center">添加</p></div>
                    </div>
                </div>
            </div>
            <div class="safeManagement mt10">
                <div class="ManagementItem">
                    <p class="dialogMainTitle">安全管理员</p>
                    <div class="d-ib">
                        <!--<el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>-->
                        <div style="display: inline-block" :key="item.userId" v-for="item in safeAttr"><img src="../../../../imgs/noPerson.png" alt=""><p>{{item.fullName}}<span style="color: cornflowerblue" @click="shanChu(item,2)">【删除】</span></p></div>
                        <div style="display: inline-block;cursor:pointer;" @click="addUser(2)"><img src="../../../../imgs/addPerson.png" alt=""><p style="text-align: center">添加</p></div>
                    </div>
                </div>
            </div>
            <div class="systemAudit mt10">
                <div class="ManagementItem">
                    <p class="dialogMainTitle">安全审计员</p>
                    <div class="d-ib">
                        <!--<el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>-->
                        <div style="display: inline-block" :key="item.userId" v-for="item in auditAttr"><img src="../../../../imgs/noPerson.png" alt=""><p>{{item.fullName}}<span style="color: cornflowerblue" @click="shanChu(item,3)">【删除】</span></p></div>
                        <div style="display: inline-block;cursor:pointer;" @click="addUser(3)"><img src="../../../../imgs/addPerson.png" alt=""><p style="text-align: center">添加</p></div>
                    </div>
                </div>
            </div>
			<div slot="footer" class="dialog-footer">
				<!--<el-button class="defaultBtn" @click="saveYijuan">保存</el-button>-->
                <el-button class="defaultBtn" @click="guanBi">关闭</el-button>
			</div>
		</el-dialog>


        <el-dialog class="myDialogCenter" title="选择管理员" :visible.sync="fileVisible" :close-on-click-modal="true" :before-close="handleClose">
            <div class="scrollCon formDiv">
                <div class="tableCon">
                    <el-form :inline="true">
                        <el-form-item label="姓名：">
                            <el-input placeholder="请输入" size="small" v-model="searchKey.fullName"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名：">
                            <el-input placeholder="请输入" size="small" v-model="searchKey.loginName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="defaultBtn" @click="getUserList">检索</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                            :data="tableData"
                            border
                            height="300"
                            element-loading-text="努力加载中..."
                            header-row-class-name="tableHeader"
                            @selection-change="handleSelectionChange"
                            class="defaultTable">
                        <el-table-column type="selection"  width="55">
                        </el-table-column>
                        <el-table-column prop="fullName" label="姓名" align="left">
                        </el-table-column>
                        <el-table-column prop="loginName" label="用户名" align="left">
                        </el-table-column>
                        <el-table-column prop="archiveAgentName" label="所属档案馆" align="left">
                        </el-table-column>
                        <el-table-column prop="telephone" label="手机" align="left">
                        </el-table-column>
                        <el-table-column prop="fixedTelephone" label="固定电话" align="left">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" class="dialog-footer diaFoot">
                <el-button type="primary" class="defaultBtn" @click="sureFondsAndUser('fileForm1')">保存</el-button>
                <el-button class="defaultBtn" @click="fileVisible = false">取消</el-button>
            </div>
        </el-dialog>

	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Component from 'vue-class-component';
    import Service from './threeMemberManagement.service';

    @Component({
		components: {
		}
	})
    export default class yijuanDialog extends Vue{
        threeMemberManagementVisible: boolean = false;
        dialogVisible: boolean = false;
        selection:any = [];
        tableData:any = [];
        tree:any = {};
        fileVisible:boolean;
        searchKey: any = {}
		libId:number = 0;
        @Prop({ default: [] })
        mulSelect: any;
		dialogTableHeight: number = document.documentElement.clientHeight-159;
        systemAttr:any = [];
        safeAttr:any = [];
        auditAttr:any = [];
        sign:number;
        userSelectionChange:any = [];
        constructor(){
            super();
            this.systemAttr = [];
            this.safeAttr = [];
            this.auditAttr = [];
            this.fileVisible = false;
            this.searchKey= {
                "fullName":"",  //姓名
                "loginName":"",  //登录名
            }
            this.userSelectionChange = [];
            this.sign = 0;
        }
        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };
        //请求失败
        getError(message) {
            this["$message"]({
                message,
                type: 'error'
            });
        };
        //警告信息
        Warn(message) {
            this['$message']({
                type: 'warning',
                message
            });
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.dialogTableHeight = document.documentElement.clientHeight-159;
                })()
            }; 
        };

        getRolesByAgentCode(){
            Service.getRolesByAgentCode({
                "archivesAgentCode":this.mulSelect[0].archiveAgentCode,
                "roleId":1
            }).then((res) => {
                if(res.data.succeeded) {
                    this.systemAttr = res.data.data;
                } else {
                    this.getError(res.data.errorMessage);
                }
            });
            Service.getRolesByAgentCode({
                "archivesAgentCode":this.mulSelect[0].archiveAgentCode,
                "roleId":2
            }).then((res) => {
                if(res.data.succeeded) {
                    this.safeAttr = res.data.data;
                } else {
                    this.getError(res.data.errorMessage);
                }
            });
            Service.getRolesByAgentCode({
                "archivesAgentCode":this.mulSelect[0].archiveAgentCode,
                "roleId":3
            }).then((res) => {
                if(res.data.succeeded) {
                    this.auditAttr = res.data.data;
                } else {
                    this.getError(res.data.errorMessage);
                }
        })
    }

        addUser(i){
            this.getUserList();
            this.sign = i;
            this.fileVisible = true;
        }

        getUserList(){
            let parmes = {
                "notPaging":1,
                "archiveAgentCode":this.mulSelect[0].archiveAgentCode,
                "fullName":this.searchKey.fullName,
                "loginName":this.searchKey.loginName,
            }
            Service.getUserList(parmes).then((res) =>{
                if(res.data.succeeded){
                    this.tableData = res.data.data;
                }else{
                    this.loading = false;
                    this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                    });
                }
            });
        }

        sureFondsAndUser(){
            if(this.userSelectionChange.length == 0){
                this.Warn("请先选择用户");
                return;
            }
            if(this.sign == 1){
                for(let child of this.userSelectionChange){
                    this.systemAttr.push(child);
                }
               let attr = new Set(this.systemAttr);
               this.systemAttr = Array.from(attr);
               this.saveSystem();
            }else if(this.sign == 2){
                for(let child of this.userSelectionChange){
                    this.safeAttr.push(child);
                }
                let attr = new Set(this.safeAttr);
                this.safeAttr = Array.from(attr)；
                this.saveSafe();
            }else if(this.sign == 3){
                for(let child of this.userSelectionChange){
                    this.auditAttr.push(child);
                }
                let attr = new Set(this.auditAttr);
                this.auditAttr = Array.from(attr);
                this.saveAudit();
            }
        }

        saveAudit(){
            let parmes = [];
            for(let child of this.auditAttr){
                let obj = {
                    userId:child.userId,
                    roleId:3,
                    itemState:1,
                    archivesAgentCode:this.mulSelect[0].archiveAgentCode
                }
                parmes.push(obj);
            }
            Service.setAgentUserRole(parmes).then((res) =>{
                if(res.data.succeeded){
                    this.Suces("添加成功");
                    this.fileVisible = false;
                }else{
                    this['$message']({
                        message: '失败',
                        type: 'error'
                    });
                }
            });
        }

        saveSafe(){
            let parmes = [];
            for(let child of this.safeAttr){
                let obj = {
                    userId:child.userId,
                    roleId:2,
                    itemState:1,
                    archivesAgentCode:this.mulSelect[0].archiveAgentCode
                }
                parmes.push(obj);
            }
            Service.setAgentUserRole(parmes).then((res) =>{
                if(res.data.succeeded){
                    this.Suces("添加成功");
                    this.fileVisible = false;
                }else{
                    this['$message']({
                        message: '失败',
                        type: 'error'
                    });
                }
            });
        }

        saveSystem(){
            let parmes = [];
            for(let child of this.systemAttr){
                let obj = {
                    userId:child.userId,
                    roleId:1,
                    itemState:1,
                    archivesAgentCode:this.mulSelect[0].archiveAgentCode
                }
                parmes.push(obj);
            }
            Service.setAgentUserRole(parmes).then((res) =>{
                if(res.data.succeeded){
                    this.Suces("添加成功");
                    this.fileVisible = false;
                }else{
                    this['$message']({
                        message: '失败',
                        type: 'error'
                    });
                }
            });
        }

        guanBi(){
            let roleFlag = false;
            if(this.systemAttr.length != 0 && this.safeAttr.length != 0 && this.auditAttr.length != 0){
                roleFlag = true;
            }
            Service.setRoleFlag({
                "archivesAgentCode":this.mulSelect[0].archiveAgentCode,
                "roleFlag":roleFlag
            }).then((res) =>{
                if(res.data.succeeded){
                    this.$parent.getList();
                    this.threeMemberManagementVisible = false;
                }else{
                    this['$message']({
                        message: '失败',
                        type: 'error'
                    });
                }
            });
        }

        shanChu(val,i){
            let parmes = [];
            let obj = {
                userId:val.userId,
                roleId:i,
                itemState:3,
                archivesAgentCode:this.mulSelect[0].archiveAgentCode
            }
            parmes.push(obj);
            Service.setAgentUserRole(parmes).then((res) =>{
                if(res.data.succeeded){
                    this.Suces("删除成功");
                    this.getRolesByAgentCode();
                }else{
                    this['$message']({
                        message: '失败',
                        type: 'error'
                    });
                }
            });
        }

        handleSelectionChange(val){
            this.userSelectionChange = val;
        }
}
</script>
<style lang="scss" scoped>
   .ManagementItem{
       >div {
           padding: 10px;
       }
   }
       .dialogMainTitle{
        padding-left: 5px;
        background: #2b87c6; 
       color: #ffffff;
        font-weight: 600;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        text-align: left;
    }
   
</style>