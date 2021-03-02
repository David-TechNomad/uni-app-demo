<template>
	<aside class="navMenu">  
  <el-menu
                :default-active="$route.path"
                mode="horizontal"
                text-color="#fff"
                 active-text-color="#fff"
                 background-color='#014779' router >
                    <template v-for="menu,index in menuData" v-if="!menu.hidden">                      
                            <el-menu-item :id="index"  :index="menu.path" v-if="menu.leaf">
                               <i :class="menu.largeIcon"></i>{{menu.name}}
                            </el-menu-item>
                            <el-submenu  :index="index+''"  popper-class="poprmenu"  v-if="!menu.leaf">
                                 <template slot="title"> <i :class="menu.largeIcon"></i>{{menu.name}}</template>
                                 <template v-for="child,childindex in menu.children">
                                    <el-menu-item :index="child.path" v-if="!(child.children && child.children.length)" :key="'child'+childindex">
                                        {{child.name}}
                                    </el-menu-item>
                                     <el-submenu :index="childindex+''" v-if="child.children && child.children.length" :key="'child'+childindex">
                                            <template slot="title">{{child.name}}</template>
                                            <el-menu-item :index="kind.path" v-for="kind,kindindex in child.children" :key="'kind'+kindindex">{{kind.name}}</el-menu-item>
                                     </el-submenu>
                                </template>
                            </el-submenu>
                   </template>           
            </el-menu>                

     <!-- <el-menu
                default-active="1"
                mode="horizontal"
                text-color="#fff"
                 active-text-color="#fff"
                 background-color='#014779'>
                <el-menu-item index="1" @click="toIndex"> <i class="fa fa-home"></i>首页</el-menu-item>
                <el-submenu index="2" popper-class="poprmenu">
                    <template slot="title"> <i class="fa fa-book"></i>查阅</template>
                    <el-menu-item index="2-1" @click="toByBorrow">我的查阅</el-menu-item>
                    <el-menu-item index="2-2" @click="toBorrowApply">查阅申请</el-menu-item>
                    <el-menu-item index="2-3" @click="toApproveBorrowApply">查阅审批</el-menu-item>
                    <el-menu-item index="2-4" @click="toBorrowBack">借出档案管理</el-menu-item>
                    <el-menu-item index="2-5" @click="toHelpBorrow">受理登记</el-menu-item>                    
                    <el-menu-item index="2-6" @click="toMyHelpSearchAndApply">我的协查</el-menu-item>
                    <el-menu-item index="2-7" @click="toHelpSearchAndApply">协查办理</el-menu-item>
                    <el-menu-item index="2-8" @click="toMyIdentifyApply">我的鉴定申请</el-menu-item>
                    <el-menu-item index="2-9" @click="toApproveMyIdentify">我的鉴定审批</el-menu-item>
                    <el-menu-item index="2-0" @click="toMyIdentifyMgnt">我的鉴定</el-menu-item>
                    <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3" popper-class="poprmenu">
                    <template slot="title"><i class="fa fa-address-card"></i>个人中心</template>
                    <el-menu-item index="3-1" @click="toPublicUserMgnt">公众用户管理</el-menu-item>
                </el-submenu>
                <el-submenu index="4" popper-class="poprmenu">
                    <template slot="title"><i class="fa fa-server"></i>档案管理</template>
                    <el-menu-item index="4-1" @click="toSystemDocking">系统对接</el-menu-item>
                    <el-submenu index="4-2">
                        <template slot="title">数据采集</template>
                        <el-menu-item index="4-2-1" @click="toDataCollection">数据导入任务</el-menu-item>
                        <el-menu-item index="4-2-2" @click="toBatchTaskList">批量挂接任务</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="4-3" @click="toarrange">整理编目</el-menu-item>
                    <el-menu-item index="4-4" @click="toFileResourceCleaning">档案资源清洗</el-menu-item>
                    <el-menu-item index="4-5" @click="toRecycle">回收站</el-menu-item>
                    <el-menu-item index="4-6" @click="toCloudManagement">云盘管理</el-menu-item>
                    <el-menu-item index="4-7" @click="tomesManagement">schema设计方案</el-menu-item>
                     <el-menu-item index="4-8" @click="toEEP">EEP阅读器</el-menu-item>
                     <el-menu-item index="4-9" @click="toVideoTest">视频测试</el-menu-item>
                     <el-menu-item index="4-10" @click="torelease">整编发布</el-menu-item>
                </el-submenu>
                <el-submenu index="5" popper-class="poprmenu"> 
                    <template slot="title"><i class="fa fa-file-text-o"></i>工作文档</template>
                    <el-menu-item index="5-1" @click="toWorkFileManagement">工作文档管理</el-menu-item>
                    <el-menu-item index="5-2" @click="toWorkFileConfig">工作文档配置</el-menu-item>
                </el-submenu>
                <el-submenu index="6" popper-class="poprmenu"> 
                    <template slot="title"><i class="fa fa-commenting-o"></i>互动交流</template>
                    <el-menu-item index="6-1" @click="toNotice()">公告中心</el-menu-item>
                    <el-menu-item index="6-2" @click="toDown()">下载中心</el-menu-item>
                    <el-menu-item index="6-3" @click="toComments">公共意见</el-menu-item>
                </el-submenu>
                <el-submenu index="7" popper-class="poprmenu"> 
                    <template slot="title"><i class="fa fa-bar-chart"></i>统计报表</template>
                    <el-menu-item index="7-1" @click="toCollectionArchivesStatistics">馆藏档案统计分析</el-menu-item>
                    <el-menu-item index="7-2" @click="toArchivesUtilizationStatistics">档案利用统计分析</el-menu-item>
                    <el-menu-item index="7-3" @click="toArchivesAppraisalStatistics">档案鉴定统计分析</el-menu-item>
                    <el-menu-item index="7-4" @click="toPlatformApplicationStatistics">平台应用统计分析</el-menu-item>
                    <el-menu-item index="7-5" @click="toAnnualReportStatistics">年报统计</el-menu-item>
                </el-submenu>
                <el-submenu index="8" popper-class="poprmenu">
                    <template slot="title"><i class="fa fa-cog"></i>系统管理</template>
                    <el-menu-item index="8-1" @click="toProcessMgnt">流程管理</el-menu-item>
                    <el-menu-item index="8-2" @click="tosysUser">系统用户</el-menu-item>
                    <el-menu-item index="8-3" @click="torole">角色管理</el-menu-item>
                    <el-menu-item index="8-4" @click="toCasesManagement">全宗管理</el-menu-item>
                    <el-menu-item index="8-5" @click="toclassLevelDescription">类别级著录</el-menu-item>
                    <el-menu-item index="8-6" @click="toorgManagement">机构管理</el-menu-item>
                    <el-submenu index="8-7">
                        <template slot="title">互动交流管理</template>
                        <el-menu-item index="8-7-1" @click="toNoticeManagement()">公告管理</el-menu-item>
                        <el-menu-item index="8-7-2" @click="toDownManagement()">下载中心管理</el-menu-item>
                        
                        <el-menu-item index="8-7-3" @click="toshenheManagement">意见审核</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="8-8" @click="toClassManagement">门类管理</el-menu-item>
                    <el-menu-item index="8-9" @click="toSealManagement">印章管理</el-menu-item>
                    <el-submenu index="8-10">
                        <template slot="title">日志管理</template>
                        <el-menu-item index="8-10-1" @click="toUserLoginInformation">用户登录信息</el-menu-item>
                        <el-menu-item index="8-10-2" @click="toMonitoringWarehousing">监测和入库日志</el-menu-item>
                        <el-menu-item index="8-10-3" @click="toUsingLogs">利用日志</el-menu-item>
                        <el-menu-item index="8-10-4" @click="toArchivesManagementLog">档案管理日志</el-menu-item>
                        <el-menu-item index="8-10-5" @click="toConfigurationChangeLog">配置变更日志</el-menu-item>
                    </el-submenu>                   
                </el-submenu>
            </el-menu> -->
            <!-- <el-menu-item index="2-6" @click="toHelpBorrowMgnt">受理登记查询</el-menu-item> -->
                     <!-- <el-menu-item index="8-2" @click="toPublicUserMgnt">公众用户管理</el-menu-item> -->
                     <!-- <el-menu-item index="8-7-3" @click="toComments">公共意见</el-menu-item> -->
                    <!-- <el-menu-item index="6"> <i class="fa fa-commenting-o"></i>互动交流</el-menu-item> -->
                    <!-- <el-menu-item index="7"> <i class="fa fa-bar-chart"></i>系统管理</el-menu-item> -->
    </aside>   
</template>
<script>
    import menuUtils from '@/utils/menuUtils';
    import Service from './navMenu.service'
    import cookieConfig from '@/utils/getCookie';
    var routers = [];
    export default {
        data() {
            return {
                menuData :this.$router.options.routes,
            }
        },
        methods: {
            // 获取导航数据            
            getMenus(){
				Service.getMenus({}).then((res) => {     
                    this.handleTree(res.data.data);
                    this.$router.addRoutes(routers);                    
					for (let item of routers) {
                        this.$router.options.routes.push(item)
                    }
                })
            },
            // 存储用户信息 匹配权限路由
            handleTree(data){
                window.sessionStorage.setItem('menuData', JSON.stringify(data));
                menuUtils(routers, data);
            },	 
            toSystemDocking(){
                this['$router'].push({
                        path:"/fileArrange/systemDocking/systemDocking",
                    })
            },
            toBorrowApply(){
                this['$router'].push({
                    path:"/myBorrow/borrowApply/borrowApply",
                })
            },
            toByBorrow(){
                this['$router'].push({
                    path:"/myBorrow/borrow",
                })
            },
            toApproveBorrowApply(){
                this['$router'].push({
                    path:"/myBorrow/handleBorrowApply/handleApply",
                })
            },
            toBorrowBack(){
                this['$router'].push({
                    path:"/myBorrow/borrowerHistory/borrowBackMgnt",
                })
            },
            toHelpBorrow(){ 
                // this['$router'].push({
                //     path:"/myBorrow/helpBorrow/helpBorrowApply",
                // })
                this['$router'].push({
                    path:"/system/userManagement/userManagement",
                })
            },
            toHelpBorrowMgnt(){
                this['$router'].push({
                    path:"/myBorrow/helpBorrow/helpBorrowMgnt",
                })
            },
            toMyHelpSearchAndApply(){
                this['$router'].push({
                    path:"/myBorrow/myHelpSearchAndApply/myHelpSearchAndApply",
                })
            },
            toHelpSearchAndApply(){
                this['$router'].push({
                    path:"/myBorrow/helpSearchAndApply/helpSearchAndApplyMgnt",
                })
            },
            toMyIdentifyApply(){
                this['$router'].push({
                    path:"/myIdentify/identifyApply/identifyApply",
                })
            },
            toApproveMyIdentify(){
                this['$router'].push({
                    path:"/myIdentify/handleMyIdentify/handleMyIdentify",
                })
            },          
            toMyIdentifyMgnt(){
                this['$router'].push({
                    path:"/myIdentify/myIdentifyMgnt",
                })
            },
            toProcessMgnt(){
                this['$router'].push({
                    path:"/system/processCon/processCon",
                })
            },
            toCollectionArchivesStatistics(){
                this['$router'].push({
                    path:"/Statisticalreportforms/CollectionArchivesStatistics/CollectionArchivesStatistics",
                })
            },
            toArchivesUtilizationStatistics(){
                this['$router'].push({
                    path:"/Statisticalreportforms/ArchivesUtilizationStatistics/ArchivesUtilizationStatistics",
                })
            },
            toArchivesAppraisalStatistics(){
                this['$router'].push({
                    path:"/Statisticalreportforms/ArchivesAppraisalStatistics/ArchivesAppraisalStatistics",
                })
            },
            toPlatformApplicationStatistics(){
                this['$router'].push({
                    path:"/Statisticalreportforms/PlatformApplicationStatistics/PlatformApplicationStatistics",
                })
            },
            toAnnualReportStatistics(){
                this['$router'].push({
                    path:"/Statisticalreportforms/AnnualReportStatistics/AnnualReportStatistics",
                })
            },
            toPublicUserMgnt(){
                this['$router'].push({
                    path:"/system/userManagement/userManagement",
                })
            },
            toarrange(){
                this['$router'].push({
                        path:"/fileArrange/arrange/arrange",
                    })
            },
            toDataCollection() {
                    this['$router'].push({
                        path:"/fileArrange/dataCollection/dataImport/importList",
                    })
            },
            toBatchTaskList() {
                this['$router'].push({
                    path:"/common/bathMountDialog/batchMountTask/taskList",
                })
            },
            toFileResourceCleaning() {
                    this['$router'].push({
                        path:"/fileArrange/fileResourceCleaning/resourceClean/resourceCleanList",
                    })
            },
            toRecycle() {
                    this['$router'].push({
                        path:"/fileArrange/recycle/recycle",
                    })
            },
            toCloudManagement() {
                    this['$router'].push({
                        path:"/fileArrange/newCloudManagement/cloudList/cloudList",
                    })
            },
            tomesManagement() {
                    this['$router'].push({
                        path:"/fileArrange/mesManagement/schema",
                    })
            },
           toEEP() {
                    this['$router'].push({
                        path:"/fileArrange/mesManagement/EEP",
                    })
            },
            toVideoTest() {
                    this['$router'].push({
                        path:"/common/video/video",
                    })
            },
            torelease() {
                    this['$router'].push({
                        path:"/fileArrange/release/release",
                    })
            },
            toPublicUserMgnt(){
                this['$router'].push({
                        path:"/system/userManagement/userManagement",
                    })
            },
            toWorkFileManagement() {
                    this['$router'].push({
                        path:"/workFile/workFileManagement/recordManagement",
                    })
            },
            toWorkFileConfig() {
                    this['$router'].push({
                        path:"/workFile/workFileConfig/workFileConfig",
                    })
            },
            toIndex(){
                this['$router'].push({
                        path:"/home/home",
                    })
            },
            tosysUser(){
                this['$router'].push({
                        path:"/system/userManagement/sysuser",
                    })
            },
            torole(){
                this['$router'].push({
                        path:"/system/roleManagement/roleManagement",
                    })
            },
            toCasesManagement() {
                this['$router'].push({
                        path:"/system/casesManagement/casesManagement",
                    })
            },
            toclassLevelDescription() {
                this['$router'].push({
                        path:"/system/classLevelDescription/classLevelDescription",
                    })
            },
            toorgManagement() {
                this['$router'].push({
                        path:"/system/orgManagement/orgManagement",
                    })
            },
            toClassManagement() {
                this['$router'].push({
                        path:"/fileArrange/classManagement/classManagement",
                    })
            },
            toUserLoginInformation() {
                this['$router'].push({
                        path:"/system/logManagement/userLoginInformation/userLoginInformation",
                    })
            },
            toMonitoringWarehousing() {
                this['$router'].push({
                        path:"/system/logManagement/monitoringWarehousing/monitoringWarehousing",
                    })
            },
            toUsingLogs() {
                this['$router'].push({
                        path:"/system/logManagement/usingLogs/usingLogs",
                    })
            },
            toArchivesManagementLog() {
                this['$router'].push({
                        path:"/system/logManagement/archivesManagementLog/archivesManagementLog",
                    })
            },
            toConfigurationChangeLog() {
                this['$router'].push({
                        path:"/system/logManagement/configurationChangeLog/configurationChangeLog",
                    })
            },
            toSealManagement() {
                this['$router'].push({
                        path:"/system/sealManagement/sealManagement",
                    })
            },
            toNotice(type) {
                this['$store'].commit('SET_fromType',type);
                sessionStorage.removeItem('noticeParamsData');
                sessionStorage.setItem("noticeParamsData", JSON.stringify({from: type})); //把上个页面的路由带过来的参数保存到sessionStorage 
                this['$router'].push({
                        path:"/interacting/notice/notice",
                        name:'公告中心',
                        params: {
                            from: type,
                        }
                    })
            },
            toDown(type) {
                this['$store'].commit('SET_fromType',type);
                sessionStorage.removeItem('noticeParamsData');
                sessionStorage.setItem("noticeParamsData", JSON.stringify({from: type})); //把上个页面的路由带过来的参数保存到sessionStorage 
                this['$router'].push({
                        path:"/interacting/down/down",
                        name:'下载中心',
                        params: {
                            from: type,
                        }
                    })
            },
            toComments() {
                this['$router'].push({
                        path:"/interacting/comments/comments",
                    })
            },
             toshenheManagement() {
                this['$router'].push({
                        path:"/system/OpinionAudit/OpinionAudit",
                    })
            } , 
            toNoticeManagement() {
                this['$router'].push({
                        path:"/system/interactingManagement/notice/notice",
                    })
            } , 
            toDownManagement() {
                this['$router'].push({
                        path:"/system/interactingManagement/down/down",
                    })
            } , 
            
            
        },
        created () {            
            if(routers.length==0){
               this.getMenus();
            }    
          
        },
        mounted(){
            
        },
       
    }
</script>

<style lang="scss">
    @import '../../styles/navbar.scss';
</style>