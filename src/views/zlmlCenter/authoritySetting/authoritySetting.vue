<template>
    <section class="wrapprSection dataCollection">
        <div class="mainTitle">
           <span>用户权限设置</span>
        </div>   
        <div class=""> 
            <div class="searchKey boxshow">           
                <el-form :inline="true" >                                   
                    <el-form-item label="姓名：">
                        <el-input placeholder="请输入" size="small" v-model="searchKey.fullName"></el-input>
                    </el-form-item>             
                    <el-form-item label="用户名：">
                        <el-input placeholder="请输入" size="small" v-model="searchKey.loginName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="defaultBtn" @click="searchUserList">查询</el-button>
                    </el-form-item>
                    <el-form-item  style="float:right;">
                        <el-button class="defaultBtn" @click="toZlmlHome">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="pd10 boxshow bgwhite">
                <div class="text-right">
                    <el-button class="defaultBtn" @click="showAuthoritySetting()">批量重置权限</el-button>                                   
                </div>
                <el-table border stripe :height="bodyHeight" :data="userListData" highlight-current-row class="defaultTable" header-row-class-name="tableHeader" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"  width="55">
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column  label="操作"  width="270">
                        <template slot-scope="scope">
                            <el-button class="tabletoolBtn"  @click="showAuthoritySetting(scope.row)">编辑权限</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fullName"  width="200" label="姓名">
                    </el-table-column>
                    <el-table-column  prop="sex" label="性别">
                        <!-- 0：男；1：女 -->
                        <template slot-scope="scope">
                            <span v-if="scope.row.sex">女</span>
                            <span v-if="!scope.row.sex">男</span>
                        </template>
                    </el-table-column>                           
                    <el-table-column  prop="loginName" label="用户名">
                    </el-table-column>
                     <el-table-column   prop="userFondMaster.fondNames" label="全宗权限">
                    </el-table-column>
                     <el-table-column   prop="userFondMaster.controlTypeText" label="控制标识">
                         <!-- 0开放 1受控 -->
                    </el-table-column>
                </el-table>
                <div class="clear" style="margin-top:10px">                         
                    <pageToolbar :total="userListTotal" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                </div>                
            </div>                
        </div> 
        <setting ref="settingRef" @refreshList="searchUserList"></setting>
     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './authoritySetting.service' 
    import { Loading } from 'element-ui';
    import moment from 'moment';
    import setting from '@/views/zlmlCenter/authoritySetting/setAuthorityDialog.vue';
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'
    @Component({
        components: { 
            setting,
            pageToolbar
        },
    })
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 285 ; 
        userListData: any = [];
        userListTotal: number = 0;
        loadingInstance:any={};
        chooseIdS: any = [];
        page: number = 0;
        pageSize: number = 25; 
        
        searchKey: any = {
            "fullName":"",  //姓名
            "loginName":"",  //登录名
        }
        constructor(){
            super();
            this.loadingInstance = null;
            this.chooseIdS = [];
            this.userListData = [];
        };
        toZlmlHome(){
            this['$router'].push({
                path:'/zlmlCenter/zlmlHome',
            });
        }
        handleCurrentChange(val:number) {
            this.page = val;
            this.queryUserList();
        };
        handleSizeChange(val:number) {
            this.pageSize = val;
            this.queryUserList();
        };
         selectGet(value){

        }
        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
        handleSelectionChange(val) {
            this.chooseIdS = [];
            for(let item of val) {
                this.chooseIdS.push(item.userId);
            }
        }
        // 检索任务列表
        searchUserList() {
            this.userListTotal = 0;
            this.userListData = [];
            this.queryUserList();
        }
        queryUserList() {
            let self = this;
            let loadingInstance = Loading.service({
                lock: true,
                text: '正在获取数据，请稍等',
                // spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let parmes = {
                "notPaging": 0,  
                "fullName": this.searchKey.fullName,  
                "loginName": this.searchKey.loginName,
                "archiveAgentCode": window.sessionStorage.archiveAgentCode,
                "page": this.page,
                "pageSize": this.pageSize
            }
            // getUserList
            // getSysUserJoinUserFondList
            Service.getUserList(parmes).then((res) =>{
                if(res.data.succeeded){ 
                    this.userListData = res.data.data;
                    for(let ud of this.userListData){
                        if(ud.userFondMaster){
                            let ct = ud.userFondMaster.controlType;
                            let text = '';
                            if(ct){
                                if(ct.includes('0')){
                                    text = "开放";
                                    if(ct.includes('1')){
                                        text = "开放,受控";
                                    }
                                }else if(ct.includes('1')){
                                    text = "受控";
                                }
                            }
                            ud.userFondMaster.controlTypeText = text;
                        }
                    }
                    this.userListTotal = res.data.totalRecords
                }else{
                    this['$message']({
                        message: '获取列表失败',
                        type: 'error'
                    });
                }
                self.$nextTick(() => { loadingInstance.close();});
            });
        }
        
        showAuthoritySetting(row) {
            if(row){//单条
                let arr = [];
                arr.push(row.userId);
                if(row.userFondMaster){
                    let stArr = row.userFondMaster.fondIds.split(',');
                    let strCT = row.userFondMaster.controlType.split(',');
                    let numArr = [];
                    for(let str of stArr){
                        if(str){
                            numArr.push(Number(str));
                        }
                    }
                    this.$refs.settingRef.passedFondIds = numArr; //TODO
                    this.$refs.settingRef.passedControlTypes = strCT;
                }else{
                    this.$refs.settingRef.passedFondIds = [];
                    this.$refs.settingRef.passedControlTypes = [];
                }
                this.$refs.settingRef.passedUserIds = arr;
                this.$refs.settingRef.dialogVisible = true;
            }else{//多条
                // 判断多选是否有数据
                if(this.chooseIdS.length==0){
                    this['$message']({
                        message: '请至少选择一条数据！',
                        type: 'warning'
                    });
                    return;
                }
                this.$refs.settingRef.passedFondIds = [];
                 this.$refs.settingRef.passedControlTypes = [];
                this.$refs.settingRef.passedUserIds = this.chooseIdS;
                this.$refs.settingRef.dialogVisible = true;
            }
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
        
        created(){  
            this.queryUserList(); 
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 285;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
    @import '../../../styles/fileManage/dataCollection.scss';
    .importExcelView .el-form-item__error{
        top: 42%;
    }
</style>
