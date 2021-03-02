import url from '../main.ts';

let dirt = '';
// 按需加载
// 主页
const Main = resolve => require(['@/views/Main'],resolve);
// 资料目录中心主页
const zlmlMain = resolve => require(['@/views/zlmlMain'],resolve);
// 首页
const Home = resolve => require(['@/views/home/home'],resolve);
const mainrouter = resolve => require(['@/views/home/mainrouter'],resolve);
//登录
const Login = resolve => require(['@/views/login/Login'], resolve);
// 关键字检索
const Search = resolve => require(['@/views/retrieve/search/search'],resolve);
// 高级检索
const SuperSearch = resolve => require(['@/views/retrieve/superSearch/superSearch'],resolve);


/** ----------------------查阅鉴定相关界面   start  hhy 请不要删除----------------*/
//我的查阅
const myBorrow = resolve => require(['@/views/myBorrow/borrow'],resolve);
// 查阅单填写
const borrowApply = resolve => require(['@/views/myBorrow/borrowApply/borrowApply'],resolve);
// 查阅单详情
const BorrowDetailsTo = resolve => require(['@/views/myBorrow/borrowDetail/borrowDetail'],resolve);
// 查阅单查看
const LoanAppear = resolve => require(['@/views/myBorrow/borrowApply/splitApply'],resolve);
// 查阅审批列表
const handleBorrowApply = resolve => require(['@/views/myBorrow/handleBorrowApply/handleApply'],resolve);
// 查阅审批详情
const handleApplyDetail = resolve => require(['@/views/myBorrow/handleBorrowApply/handleApplyDetail'],resolve);
// 单个查阅审批详情
const singleApplyDetail = resolve => require(['@/views/myBorrow/handleBorrowApply/singleApplyDetail'],resolve);
//借出档案管理
const borrowBackMgnt = resolve => require(['@/views/myBorrow/borrowerHistory/borrowBackMgnt'],resolve);
// 受理登记
const helpBorrowApply = resolve => require(['@/views/myBorrow/helpBorrow/helpBorrowApply'],resolve);
// 受理登记列表
const helpBorrowMgnt = resolve => require(['@/views/myBorrow/helpBorrow/helpBorrowMgnt'],resolve);
// 协查办理任务
const helpSearchAndApplyMgnt = resolve => require(['@/views/myBorrow/helpSearchAndApply/helpSearchAndApplyMgnt'],resolve);
// 协查办理详情
const helpSearchAndApplyDetail = resolve => require(['@/views/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail'],resolve);
// 我的协查列表
const myHelpSearchAndApply = resolve => require(['@/views/myBorrow/myHelpSearchAndApply/myHelpSearchAndApply'],resolve);

// 申请鉴定任务
const identifyApply = resolve => require(['@/views/myIdentify/identifyApply/identifyApply'],resolve);
// 鉴定任务列表
const myIdentifyMgnt = resolve => require(['@/views/myIdentify/myIdentifyMgnt'],resolve);
// 鉴定任务列表详情
const identificationDetail = resolve => require(['@/views/myIdentify/myIdentifyDetail/myIdentifyDetail'],resolve);
// 鉴定审批
const handleMyIdentify = resolve => require(['@/views/myIdentify/handleMyIdentify/handleMyIdentify'],resolve);
// 审批的鉴定详细界面
const handleMyIdentifyDetail = resolve => require(['@/views/myIdentify/handleMyIdentify/handleMyIdentifyDetail'],resolve);
// 单个鉴定审批
const singleApproveIdentify = resolve => require(['@/views/myIdentify/singleApproveIdentify/singleApproveIdentify'],resolve);
//单个鉴定详情
const singleApproveDetail = resolve => require(['@/views/myIdentify/singleApproveIdentify/singleApproveDetail'],resolve);

//用户管理
const userManagement  = resolve =>require(['@/views/system/userManagement/userManagement'],resolve);

//新增公众用户
const addUser  = resolve =>require(['@/views/system/userManagement/addUser'],resolve);
// 流程管理
const ProcessCon = resolve => require(['@/views/system/processCon/processCon'],resolve);

/** ----------------------查阅鉴定相关界面   end-------------------------------*/

// 查阅单预览
const borrowDetailsPreview = resolve => require(['@/views/selfTip/borrowDetails/borrowDetailsPreview'],resolve);

// 公告中心详情
const noticeDetail = resolve => require(['@/views/interacting/notice/noticeDetail.vue'],resolve);
//整理编目
     //调整顺序号
const arrangeAdjustOrder = resolve => require(['@/views/fileArrange/arrange/orderfix/orderfix'],resolve);
    //模板打印
const Stamp = resolve => require(['@/views/fileArrange/arrange/modelStamp/modelStamp'],resolve);
   //新增文件页面
const SaveDossierwj = resolve => require(['@/views/fileArrange/arrange/newly/newlywenjian'],resolve);
   //整理编目案卷列表
const arrange  = resolve => require(['@/views/fileArrange/arrange/arrange'],resolve);
   //schema设计方案
const schema  = resolve => require(['@/views/fileArrange/mesManagement/schema'],resolve);
   //EEP阅读器
const EEP  = resolve => require(['@/views/fileArrange/mesManagement/EEP'],resolve);
   //eep查看                         
const EEPList = resolve => require(['@/views/fileArrange/mesManagement/eeplist/eeplist'], resolve);
  //模板打印
const Print = resolve => require(['@/views/fileArrange/fileManagement/modelPrint/modelPrint'],resolve);
  //整编发布
const release  = resolve => require(['@/views/fileArrange/release/release'],resolve);
  //导出原文
const exportList  = resolve => require(['@/views/fileArrange/arrange/exportList/taskList'],resolve);
    //用户管理
 const sysuser  = resolve => require(['@/views/system/userManagement/sysuser'],resolve);
    //角色管理
 const roleManagement  = resolve => require(['@/views/system/roleManagement/roleManagement'],resolve);  
    //个人信息
 const logoUserMes  = resolve => require(['@/views/system/userManagement/logoUserMes'],resolve);  
    //修改密码
const setPassword  = resolve => require(['@/views/system/userManagement/setpassword'],resolve);  
    //公告中心
const notice = resolve => require(['@/views/interacting/notice/notice'],resolve);
    //下载中心
const down = resolve => require(['@/views/interacting/down/down'],resolve);
    //公共意见
const comments = resolve => require(['@/views/interacting/comments/comments'],resolve);
    //意见审批
const Capproval = resolve => require(['@/views/interacting/Capproval/Capproval'],resolve);
    //门类管理
const classManagement = resolve => require(['@/views/fileArrange/classManagement/classManagement'], resolve);
    //意见审核
const OpinionAudit = resolve => require(['@/views/system/OpinionAudit/OpinionAudit'], resolve);


//网页链接
const checkUrls = resolve => require(['@/views/home/checkUrls'],resolve)
//更多
const lotMore = resolve => require(['@/views/home/lotMore'],resolve);
//文档更多
const fileMore = resolve => require(['@/views/home/fileMore'],resolve);
// 404页面
const NotFound = resolve => require(['@/views/404'],resolve);
// 高级检索
const SearchDetail = resolve => require(['@/views/retrieve/SearchDetail/SearchDetail'],resolve);




// 实体查阅单详情
 const BorrowDetails = resolve => require(['@/views/selfTip/borrowDetails/borrowDetails'],resolve);

// 变更查阅人原流程
const BorrowDetailsThree = resolve => require(['@/views/selfTip/borrowDetails/borrowDetailsThree'],resolve);

// 实体查阅单详情跳转详情1
const borrowDetailsHistory = resolve => require(['@/views/selfTip/borrowDetails/borrowDetailsHistory'],resolve);
// 实体查阅单详情跳转详情2
const borrowDetailsBackList = resolve => require(['@/views/selfTip/borrowDetails/borrowDetailsBackList'],resolve);

// 电子查阅单详情
const electronBorrowDetails = resolve => require(['@/views/selfTip/borrowDetails/electronBorrowDetails'],resolve);

// 实体查阅续借申请
const ChangeBorrowPeople1 = resolve => require(['@/views/selfTip/borrowAgine/borrowNext'],resolve);

// 实体查阅变更查阅人
const ChangeBorrowPeople = resolve => require(['@/views/selfTip/borrowAgine/changeBorrowPeople'],resolve);

// 查阅驳回修改
const BorrowModify = resolve => require(['@/views/selfTip/borrowModify/borrowModify'],resolve);

// 单个电子查阅档案详情
const electricSingleBorrowDetail = resolve => require(['@/views/selfTip/borrowDetails/electricSingleBorrowDetail'],resolve);

//上传文件跳转页面  实时上传进度
const  uploadsProgress  = resolve => require(['@/views/fileArrange/cloudProgress/uploadProgress'],resolve);

// 新增项目档案
const addProjectDocument = resolve => require(['@/views/static/projectDocument'],resolve);

//文件移交申请
const  FileTransferApply  = resolve => require(['@/views/fileArrange/fileTransferApply/fileTransferApply'],resolve);

//合卷
const CombineFile = resolve => require(['@/views/fileArrange/fileManagement/Combine/combinefile.vue'],resolve);


//库房 按项目查看 全部项目
const projectFiles = resolve => require(['@/views/projectFiles/projectFiles'],resolve);

// 创建全宗
const fondsApprovalSave = resolve => require(['@/views/selfTip/borrowDetails/quanzong'],resolve);

// 档案移交申请详情
const transforDetail = resolve => require(['@/views/selfTip/transferDetail/transforDetail'],resolve);

//调整顺序号
const adjustOrder = resolve => require(['@/views/fileArrange/fileManagement/adjustOrder/adjustOrder'],resolve);

//卷内文件
const infile = resolve => require(['@/views/fileArrange/fileManagement/infile/infile'],resolve);





//档案管理  模板打印
const ModelPrintFiles = resolve => require(['@/views/fileArrange/archiveManagement/modelPrintFiles/modelPrintFiles'],resolve);




// 档案查阅申请详情
const BorrowExaminationDetail = resolve => require(['@/views/selfTip/examination/borrowExaminationDetail/borrowExaminationDetail'],resolve);

// 档案查阅申请签收
const BorrowExaminationTranster = resolve => require(['@/views/selfTip/examCheck/borrowExaminationTranster/borrowExaminationTranster'],resolve);

//档案查阅的档案详情
const XiangDetail = resolve => require(['@/views/fileArrange/fileManagement/infile/XiangDetail'],resolve);

// 全宗创建审批
const FondCheck = resolve => require(['@/views/selfTip/examCheck/fondCheck'],resolve);

// 档案员权限审批
const PowerCheck = resolve => require(['@/views/selfTip/examCheck/powerCheck'],resolve);

// 档案员权限已审批详情
const PowerCheckDetail = resolve => require(['@/views/selfTip/examCheck/powerCheckDetail'],resolve);

// 驳回全宗创建审批
const FondRefuseCheck = resolve => require(['@/views/selfTip/examCheck/fondRefuseCheck'],resolve);

// 档案移交审批
const FileCheck = resolve => require(['@/views/selfTip/examCheck/fileCheck'],resolve);

// 查阅人变更审批
const PeopleCheck = resolve => require(['@/views/selfTip/examCheck/peopleCheck'],resolve);

// 查阅人变更审批(驳回后页面)
const PeopleRefuseCheck = resolve => require(['@/views/selfTip/examCheck/peopleRefuseCheck'],resolve);

// 查阅人变更审批(申请后看的详情页面)
const PeopleCheckDetail = resolve => require(['@/views/selfTip/examCheck/peopleCheckDetail'],resolve);

//档号筛查
const check = resolve => require(['@/views/fileArrange/fileManagement/check/check'],resolve);
//卷内文件的档号筛查
const infilecheck = resolve =>require(['@/views/fileArrange/fileManagement/infile/infileCheck/infileCheck'],resolve);


// 档案相关申请详情
const eleTransforDetail = resolve => require(['@/views/selfTip/eleTransforDetail/eleTransferDetail'],resolve);
//档案移交申请  已驳回  修改
const changeTransforDetail = resolve => require(['@/views/selfTip/transferDetail/changeTransforDetail'],resolve);
//档案详情  目录。
const noPassDetail = resolve => require(['@/views/selfTip/eleTransforDetail/noPassDetail'],resolve);
//档案全宗申请详情。
const quanTransDatil = resolve => require(['@/views/selfTip/transferDetail/quanTransDatil'],resolve);
//档案全宗申请修改
const changQuanTransDetail = resolve => require(['@/views/selfTip/transferDetail/changQuanTransDetail'],resolve);
//档案员申请权限详情
const shenTransDetail = resolve => require(['@/views/selfTip/shenTransDetail/shenTransDetail'],resolve);
//档案员权限查看
const biantransDetail = resolve => require(['@/views/selfTip/shenTransDetail/biantransDetail'],resolve);
//档案员变更申请修改
const changPersonTransDetail = resolve => require(['@/views/selfTip/shenTransDetail/changPersonTransDetail'],resolve);
//档案员权限申请修改
const chaneShenTransDetail = resolve => require(['@/views/selfTip/shenTransDetail/chaneShenTransDetail'],resolve);
//文件管理  新增页面
const AddFiles = resolve => require(['@/views/fileArrange/fileManagement/infile/addInfile'],resolve);
//文件管理  编辑页面
const BianJiInfile = resolve => require(['@/views/fileArrange/fileManagement/infile/BianJiInfile'],resolve);
//文件管理  组新卷
const combineNewFile = resolve =>require(['@/views/fileArrange/fileManagement/combineNewFile/combineNewFile'],resolve);
//文件管理  组已有卷
const combineExisting = resolve =>require(['@/views/fileArrange/fileManagement/combineExisting/combineExisting'],resolve);
//文件管理  组已有卷开始组卷
const combineExistingST = resolve =>require(['@/views/fileArrange/fileManagement/combineExisting/combineExistingST/combineExistingST'],resolve);


//文件管理 新增文件
const AddFile = resolve => require(['@/views/fileArrange/fileManagement/addFile/addFile'],resolve);
//卷内文件调整顺序号
const infileAdjust = resolve => require(['@/views/fileArrange/fileManagement/infile/infileAdjust/infileAdjust'],resolve);


//卷内文件移卷  移到新卷
const removeNew = resolve => require(['@/views/fileArrange/fileManagement/infile/removeNew/removeNew'],resolve);
//卷内文件移卷  移到已有卷
const removeOld = resolve => require(['@/views/fileArrange/fileManagement/infile/removeOld/removeOld'],resolve);
//卷内文件移卷  移到已有卷的第二部
const removeOldST = resolve => require(['@/views/fileArrange/fileManagement/infile/removeOld/removeOldST/removeOldSt'],resolve);



//归入库位
const enterStore = resolve =>require(['@/views/fileArrange/archiveManagement/enterStore/enterStore'],resolve);
//档案日志
const fileLog = resolve =>require(['@/views/fileArrange/archiveManagement/fileLog/fileLog'],resolve);
//档案管理的卷内文件
const ArchiveIn = resolve =>require(['@/views/fileArrange/archiveManagement/infile/infile'],resolve);
//跨全宗移交
const fileTurnOver = resolve =>require(['@/views/fileArrange/archiveManagement/fileTurnOver/fileTurnOver'],resolve);
//对应著录项
const contrastItem = resolve =>require(['@/views/fileArrange/archiveManagement/contrastItem/contrastitem.vue'],resolve);
//提交跨全宗移交申请
const recordTransferApply = resolve =>require(['@/views/fileArrange/recordTransferApply/recordTransferApply'],resolve);
// 试验修改审批人
// const Examination = resolve => require(['@/views/selfTip/examination/examination'],resolve);
//文件级档案的编辑
const BJwenjian = resolve =>require(['@/views/fileArrange/fileManagement/WJbianji/BJwenjian'],resolve);
//档案下的文件级档案的新增
const addrecord = resolve =>require(['@/views/fileArrange/archiveManagement/addrecord/addrecord'],resolve);
//档案下的文件级档案的 编辑
const BJrecord = resolve =>require(['@/views/fileArrange/archiveManagement/BJrecord/BJrecord'],resolve);
//文件管理  新增页面
const AddInRecord = resolve => require(['@/views/fileArrange/archiveManagement/infile/addinrecord'],resolve);
//档案管理  编辑页面
const BJInRecord = resolve => require(['@/views/fileArrange/archiveManagement/infile/BJInRecord'],resolve);
//档案相关申请  跨全宗移交
const kuaTransforDetails = resolve => require(['@/views/selfTip/kuaTransforDetails/kuaTransforDetails'],resolve);
//跨全宗移交 判断字段
const NextKuaDetail = resolve => require(['@/views/selfTip/NextKuaDetail/NextKuaDetail'],resolve);
//跨全宗  档案移交修改
const kuaChangeDetails = resolve => require(['@/views/selfTip/kuaChangeDetails/kuaChangeDetails'],resolve);
// @/views/selfTip/transferDetail/transforDetail
const kuaQuanZongDetails = resolve => require(['@/views/selfTip/kuaQuanZongDetails/kuaQuanZongDetails'],resolve);
//跨全宗移交/文件移交详情页
const FileDetail = resolve => require(['@/views/selfTip/fileDetail/fileDetail'],resolve);
//跨全宗移交/文件移交详情页
const WjDetail = resolve => require(['@/views/selfTip/WjDetail/WjDetail'],resolve);

//流程实例管理修改页（查阅人变更）
const processManagementUpdate  = resolve =>require(['@/views/system/processManagement/processManagementUpdate'],resolve);
//流程实例管理修改页（查阅人变更详情）
const processManagementUpdateDetail  = resolve =>require(['@/views/system/processManagement/detail/processManagementUpdateDetail'],resolve);
//流程实例管理修改页（移交）
const wenJianUpdate  = resolve =>require(['@/views/system/processManagement/wenJianUpdate'],resolve);
//流程实例管理详情页（移交）
const wenJianUpdateDetail  = resolve =>require(['@/views/system/processManagement/detail/wenJianUpdateDetail'],resolve);
//流程实例管理修改页（创建全宗）
const quanZongUpdate  = resolve =>require(['@/views/system/processManagement/quanZongUpdate'],resolve);
//流程实例管理详情页（创建全宗）
const quanZongUpdateDetail  = resolve =>require(['@/views/system/processManagement/detail/quanZongUpdateDetail'],resolve);
//流程实例管理修改页（申请档案员）
const applyFilerUpdate  = resolve =>require(['@/views/system/processManagement/applyFilerUpdate'],resolve);
//流程实例管理修改页（申请档案员详情）
const applyFilerUpdateDetail  = resolve =>require(['@/views/system/processManagement/detail/applyFilerUpdateDetail'],resolve);
//流程实例管理修改页（查阅，续借）
const borrowUpdate  = resolve =>require(['@/views/system/processManagement/borrowUpdate'],resolve);
//流程实例管理修改页（查阅申请详情）
const borrowUpdateDetail  = resolve =>require(['@/views/system/processManagement/detail/borrowUpdateDetail'],resolve);
const projectManagement  = resolve =>require(['@/views/system/projectManagement/projectManagement'],resolve);
const moduleDutyDetail  = resolve =>require(['@/views/selfTip/moduleDuty/moduleDutyDetail'],resolve);
const yiBanmoduleDuty  = resolve =>require(['@/views/selfTip/moduleDuty/yiBanmoduleDuty'],resolve);

/**
 * dushihong  ----start------
 * 
 */
//全省档案资料目录中心
const queryResults  = resolve =>require(['@/views/allProvinceCatalog/queryResults'],resolve);
//用户权限设置
const userPermissions  = resolve =>require(['@/views/userPermissions/userPermissions'],resolve);

//档案管理系统对接列表
const fileArrangeImportList  = resolve =>require(['@/views/fileArrange/systemDocking/systemDocking'],resolve);

//测试pdf
const testPdf  = resolve =>require(['@/views/fileArrange/systemDocking/testPdf'],resolve);

//批量挂接任务列表
const taskList  = resolve =>require(['@/views/common/bathMountDialog/batchMountTask/taskList'],resolve);
//测试视频
const testVideo  = resolve =>require(['@/views/common/video/video'],resolve);

//数据采集数据导入任务列表
const dataCollectionImportList  = resolve =>require(['@/views/fileArrange/dataCollection/dataImport/importList'],resolve);

//数据采集数据导入任务详情
const dataCollectionImportDetail  = resolve =>require(['@/views/fileArrange/dataCollection/dataImport/importDetail'],resolve);

//档案资源清洗列表
const fileResourceCleaning  = resolve =>require(['@/views/fileArrange/fileResourceCleaning/resourceClean/resourceCleanList'],resolve);

//新增预清洗
const addPreClean  = resolve =>require(['@/views/fileArrange/fileResourceCleaning/addPreClean/addPreClean'],resolve);

//回收站
const recycle  = resolve =>require(['@/views/fileArrange/recycle/recycle'],resolve);

//云盘管理
const newCloudManagement  = resolve =>require(['@/views/fileArrange/newCloudManagement/cloudList/cloudList'],resolve);

//云盘管理2
const cloudManagement  = resolve =>require(['@/views/fileArrange/newCloudManagement/cloudList/cloudList2'],resolve);

//云盘管理 上传任务管理
const cloudUploadManagement  = resolve =>require(['@/views/fileArrange/cloudProgress/uploadProgress'],resolve);

//工作文档管理
const workFileManagement  = resolve =>require(['@/views/workFile/workFileManagement/recordManagement'],resolve);

//工作文档配置
const workFileConfig  = resolve =>require(['@/views/workFile/workFileConfig/workFileConfig'],resolve);

//统计报表-馆藏档案统计分析
const CollectionArchivesStatistics = resolve =>require(['@/views/Statisticalreportforms/CollectionArchivesStatistics/CollectionArchivesStatistics'],resolve);
//统计报表-档案利用统计分析
const ArchivesUtilizationStatistics = resolve =>require(['@/views/Statisticalreportforms/ArchivesUtilizationStatistics/ArchivesUtilizationStatistics'],resolve);
//统计报表-档案鉴定统计分析
const ArchivesAppraisalStatistics = resolve =>require(['@/views/Statisticalreportforms/ArchivesAppraisalStatistics/ArchivesAppraisalStatistics'],resolve);
//统计报表-平台应用统计分析
const PlatformApplicationStatistics = resolve =>require(['@/views/Statisticalreportforms/PlatformApplicationStatistics/PlatformApplicationStatistics'],resolve);
//统计报表-年报统计
const AnnualReportStatistics = resolve =>require(['@/views/Statisticalreportforms/AnnualReportStatistics/AnnualReportStatistics'],resolve);


//系统管理-全宗管理
const casesManagement  = resolve =>require(['@/views/system/casesManagement/casesManagement'],resolve);
//系统管理-类别级著录
const classLevelDescription  = resolve =>require(['@/views/system/classLevelDescription/classLevelDescription'],resolve);
//系统管理-机构管理
const orgManagement  = resolve =>require(['@/views/system/orgManagement/orgManagement'],resolve);
//系统管理-印章管理
const sealManagement  = resolve =>require(['@/views/system/sealManagement/sealManagement'],resolve);
//系统管理-日志管理-用户登录信息
const userLoginInformation  = resolve =>require(['@/views/system/logManagement/userLoginInformation/userLoginInformation'],resolve);
//系统管理-日志管理-检测与入库日志
const monitoringWarehousing  = resolve =>require(['@/views/system/logManagement/monitoringWarehousing/monitoringWarehousing'],resolve);
//系统管理-日志管理-利用日志
const usingLogs  = resolve =>require(['@/views/system/logManagement/usingLogs/usingLogs'],resolve);
//系统管理-日志管理-档案管理日志
const archivesManagementLog  = resolve =>require(['@/views/system/logManagement/archivesManagementLog/archivesManagementLog'],resolve);
//系统管理-日志管理-配置变更日志
const configurationChangeLog  = resolve =>require(['@/views/system/logManagement/configurationChangeLog/configurationChangeLog'],resolve);
//系统管理-互动交流管理-公告管理
const noticeManagement = resolve =>require(['@/views/system/interactingManagement/notice/notice'],resolve);
//系统管理-互动交流管理-下载管理
const downManagement = resolve =>require(['@/views/system/interactingManagement/down/down'],resolve);


// 资料目录中心相关
const zlmlHome = resolve =>require(['@/views/zlmlCenter/zlmlHome'],resolve);

const zlmlSuperSearch = resolve =>require(['@/views/zlmlCenter/superSearch/zlmlSuperSearch'],resolve);
const authoritySetting = resolve =>require(['@/views/zlmlCenter/authoritySetting/authoritySetting'],resolve);
/**
 * dushihong  ----end------
 * 
 */

// 公共路由部分
let routes = [
    {
        path: '/',
        component: Main,
        name: '首页',
        largeIcon: 'fa fa-home',
        leaf: true,
        meta: {
            requireAuth: false,
        },
        redirect: function(to){
            if(to.meta.requireAuth){
                return '/login/Login'               
            }else{
                return '/home/home';
            }
        },
        children: [
            { path: '/home/home', component: Home, name: '首页'},
        ]
    },{
		path: '/login/Login',
		component: Login,
		name: 'Login',
		hidden: true,
		leaf: true
	},
    {
        path: '/home/mainrouter',
        component: mainrouter,
        name: 'mainrouter',
        hidden: true,
        leaf: true       
    },
    {
        path: '/',
        component: zlmlMain,
        name: '主页',
        hidden: true,
        leaf: true,
        meta:{
            requireOA: true
        },
        children: [
            { path: '/zlmlCenter/zlmlHome', component: zlmlHome, name: '资料中心主页'},
        ]
    },
    {
        path: '/',
        component: zlmlMain,
        name: '主页',
        hidden: true,
        leaf: true,
        meta:{
            requireOA: true
        },
        children: [
            { path: '/zlmlCenter/superSearch/zlmlSuperSearch', component: zlmlSuperSearch, name: '资料中心目录检索'},
        ]
    },
    {
        path: '/',
        component: zlmlMain,
        name: '主页',
        hidden: true,
        leaf: true,
        meta:{
            requireOA: true
        },
        children: [
            { path: '/zlmlCenter/authoritySetting/authoritySetting', component: authoritySetting, name: '资料中心权限设置'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/myBorrow/borrow', component: myBorrow, name: '我的查阅'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/interacting/notice/notice', component: notice, name: '公告中心'},
        ]
    }, 
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/interacting/notice/noticeDetail', component: noticeDetail, name: '公告中心详情'},
        ]
    }, 
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/interacting/down/down', component: down, name: '下载中心'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/arrange/orderfix', component: arrangeAdjustOrder, name: '整理编目调整顺序号'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [ 
            { path: '/myIdentify/identifyApply/identifyApply', component: identifyApply, name: '整理编目鉴定申请'},
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,        
        children: [
            { path: '/myIdentify/myIdentifyMgnt', component:myIdentifyMgnt, name: '鉴定任务列表'},
        ]
    }, 
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/myIdentify/myIdentifyDetail/myIdentifyDetail', component:identificationDetail, name: '鉴定任务详情'},
        ]
    },     
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/myIdentify/handleMyIdentify/handleMyIdentifyDetail', component:handleMyIdentifyDetail, name: '鉴定审批详情'},
        ]
    }, 
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/myIdentify/singleApproveIdentify/singleApproveIdentify', component:singleApproveIdentify, name: '单个鉴定审批'},
        ]
    }, 
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/myIdentify/singleApproveIdentify/singleApproveDetail', component:singleApproveDetail, name: '单个鉴定审批详情'},
        ]
    }, 
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/myIdentify/handleMyIdentify/handleMyIdentify', component:handleMyIdentify, name: '鉴定审批列表'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/classManagement/classManagement', component: classManagement, name: '门类管理'},
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/OpinionAudit/OpinionAudit', component: OpinionAudit, name: '意见审核'},
        ]
    },
    
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/userPermissions/userPermissions', component: userPermissions, name: '用户权限设置'},
        ]
    },
    /**
     * dushihong ----start------
     *  */
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/allProvinceCatalog/queryResults', component: queryResults, name: '查询结果'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/workFile/workFileConfig/workFileConfig', component: workFileConfig, name: 'OA'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/statisticalreportforms/CollectionArchivesStatistics/CollectionArchivesStatistics', component: CollectionArchivesStatistics, name: '馆藏统计'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/statisticalreportforms/ArchivesUtilizationStatistics/ArchivesUtilizationStatistics', component: ArchivesUtilizationStatistics, name: '档案利用统计'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/statisticalreportforms/ArchivesAppraisalStatistics/ArchivesAppraisalStatistics', component: ArchivesAppraisalStatistics, name: '档案鉴定统计分析'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/statisticalreportforms/PlatformApplicationStatistics/PlatformApplicationStatistics', component: PlatformApplicationStatistics, name: '平台应用统计分析'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/statisticalreportforms/AnnualReportStatistics/AnnualReportStatistics', component: AnnualReportStatistics, name: '年报统计'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/casesManagement/casesManagement', component: casesManagement, name: 'OA'},
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/classLevelDescription/classLevelDescription', component: classLevelDescription, name: '类别级著录'},
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/orgManagement/orgManagement', component: orgManagement, name: '机构管理'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/sealManagement/sealManagement', component: sealManagement, name: '印章管理'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/logManagement/userLoginInformation/userLoginInformation', component: userLoginInformation, name: '用户登录信息'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/logManagement/monitoringWarehousing/monitoringWarehousing', component: monitoringWarehousing, name: '监测和入库日志'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/logManagement/usingLogs/usingLogs', component: usingLogs, name: '利用日志'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/logManagement/archivesManagementLog/archivesManagementLog', component: archivesManagementLog, name: '档案管理日志'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/logManagement/configurationChangeLog/configurationChangeLog', component: configurationChangeLog, name: '配置变更日志'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/interactingManagement/notice/notice', component: noticeManagement, name: '公告管理'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/system/interactingManagement/down/down', component: downManagement, name: '下载管理'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/workFile/workFileManagement/recordManagement', component: workFileManagement, name: 'OA'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
                { path: '/fileArrange/newCloudManagement/cloudList/cloudList', 
                  component: newCloudManagement,
                  name: '云盘管理',
                  meta:{keepAlive:true} 
                },
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/cloudProgress/uploadProgress', component: cloudUploadManagement, name: '云盘管理上传任务管理'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/newCloudManagement/cloudList/cloudList2', component: cloudManagement, name: '云盘管理上传任务管理'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/recycle/recycle', component: recycle, name: '回收站'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/fileResourceCleaning/resourceClean/resourceCleanList', component: fileResourceCleaning, name: 'OA'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/fileResourceCleaning/addPreClean/addPreClean', component: addPreClean, name: 'OA'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/dataCollection/dataImport/importList', component: dataCollectionImportList, name: 'OA'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/dataCollection/dataImport/importDetail', component: dataCollectionImportDetail, name: '数据导入详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: 'common/bathMountDialog/batchMountTask/taskList', component: taskList, name: 'OA'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: 'common/video/video', component: testVideo, name: '视频测试'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/systemDocking/systemDocking', component: fileArrangeImportList, name: '档案管理对接列表'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/fileArrange/systemDocking/testPdf', component: testPdf, name: '档案管理对接列表'},
        ]
    },
    /**
         * dushihong ----end------
    *  */
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/interacting/comments/comments', component: comments, name: '公共意见'},
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '/interacting/Capproval/Capproval', component: Capproval, name: '意见审批'},
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '@/views/home/lotMore', component: lotMore, name: '更多'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        leaf: true,
        children: [
            { path: '@/views/home/fileMore', component: fileMore, name: '更多文件'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/retrieve/search/search', component: Search, meta : { keepAlive:true },name: '关键字检索'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/retrieve/searchDetail/searchDetail', component: SearchDetail, name: '档案详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/retrieve/superSearch/superSearch', meta : { keepAlive:true}, component: SuperSearch, name: '高级检索'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/fileDetail', component: FileDetail, name: '移交详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/WjDetail', component: WjDetail, name: '移交详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/borrowApply/borrowApply', component: borrowApply, name: '查阅单填写'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/borrowApply/splitApply', component: LoanAppear, name: '查阅单查看'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/handleBorrowApply/handleApply', component: handleBorrowApply, name: '查阅审批列表'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/borrowDetails', component: BorrowDetails, name: '实体查阅单详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/borrowDetail/borrowDetail', component: BorrowDetailsTo, name: '实体查阅单详情跳转详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/borrowDetailsPreview', component: borrowDetailsPreview, name: '实体查阅单详情跳转详情'},
        ]
    },
    
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/borrowDetailsThree', component: BorrowDetailsThree, name: '变更查阅人原流程'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowAgine/changeBorrowPeople1', component: ChangeBorrowPeople1, name: '实体查阅续借'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowAgine/changeBorrowPeople', component: ChangeBorrowPeople, name: '实体查阅变更查阅人'},
        ]
    },

    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examination/borrowExaminationDetail/borrowExaminationDetail', component: BorrowExaminationDetail, name: '查阅档案审批详情'},
        ]
    },

    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/borrowExaminationTranster/borrowExaminationTranster', component: BorrowExaminationTranster, name: '查阅档案审批签收'},
        ]
    },

    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowModify/borrowModify', component: BorrowModify, name: '查阅驳回修改'},
        ]
    },   
    
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/handleBorrowApply/handleApplyDetail', component: handleApplyDetail, name: '查阅审批详情'},
        ]
    },
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/handleBorrowApply/singleApplyDetail', component: singleApplyDetail, name: '单个查阅审批详情'},
        ]
    },
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/borrowerHistory/borrowBackMgnt', component: borrowBackMgnt, name: '档案借出管理'},
        ]
    },
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/helpBorrow/helpBorrowApply', component: helpBorrowApply, name: '受理登记'},
        ]
    },
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/helpBorrow/helpBorrowMgnt', component: helpBorrowMgnt, name: '受理登记管理'},
        ]
    },
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/helpSearchAndApply/helpSearchAndApplyMgnt', component: helpSearchAndApplyMgnt, name: '协查办理任务'},
        ]
    },
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/myHelpSearchAndApply/myHelpSearchAndApply', component: myHelpSearchAndApply, name: '我的协查管理列表'},
        ]
    },
    { 
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/myBorrow/helpSearchAndApply/helpSearchAndApplyDetail', component: helpSearchAndApplyDetail, name: '协查办理详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/fondCheck', component: FondCheck, name: '全宗创建审批'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/powerCheck', component: PowerCheck, name: '档案员权限审批'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/powerCheckDetail', component: PowerCheckDetail, name: '档案员权限已审批详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/fondRefuseCheck', component: FondRefuseCheck, name: '驳回全宗创建审批'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/fileCheck', component: FileCheck, name: '档案移交审批'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/peopleCheck', component: PeopleCheck, name: '查阅人变更审批'},
        ]
    },
    
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/peopleRefuseCheck', component: PeopleRefuseCheck, name: '驳回查阅人变更审批'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/examCheck/peopleCheckDetail', component: PeopleCheckDetail, name: '查阅人变更申请详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/electronBorrowDetails', component: electronBorrowDetails, name: '电子查阅单详情'},

        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/electricSingleBorrowDetail', component: electricSingleBorrowDetail, name: '单个电子查阅档案详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/static/projectDocument', component: addProjectDocument, name: '新增项目档案'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/cloudProgress/uploadProgress', component: uploadsProgress, name: '上传文件跳转页面'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileTransferApply/fileTransferApply', component: FileTransferApply, name: '档案移交申请'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/projectFiles/projectFiles', component:projectFiles, name: '查看文件列表'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/quanzong', component: fondsApprovalSave, name: '创建全宗'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/combinefile', component: CombineFile, name: '合卷'},
        ]
    },
   {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/adjustorder', component: adjustOrder, name: '调整顺序号'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,         
        children: [
            { path: '/fileArrange/arrange/arrange', 
              component: arrange,
              name: '整理编目',
              meta:{keepAlive:true} 
            },
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,         
        children: [
            { path: '/fileArrange/release/release', 
              component: release,
              name: '整编发布',
              meta:{keepAlive:true} 
            },
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,         
        children: [
            { path: '/fileArrange/arrange/exportList/taskList', 
              component: exportList,
              name: '整理编目导出列表'
             // meta:{keepAlive:true} 
            },
        ]
    },    
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,         
        children: [
            { path: '/fileArrange/mesManagement/schema', 
              component: schema,
              name: 'schema设置方案',
              meta:{keepAlive:true} 
            },
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,         
        children: [
            { path: '/fileArrange/mesManagement/EEP', 
              component: EEP,
              name: 'EEP',
              meta:{keepAlive:true} 
            },
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,         
        children: [
            { path: '/fileArrange/mesManagement/eeplist/eeplist', 
              component: EEPList,
              name: 'EEPList'
            },
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/infile', component: infile, name: '卷内文件'},
        ]

    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/infileAdjust', component: infileAdjust, name: '卷内文件调整顺序号'},
        ]

    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/removeNew', component: removeNew, name: '移到新卷'},
        ]

    }
    ,
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/BJwenjian', component: BJwenjian, name: '文件及档案编辑'},
        ]

    },    
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/removeOld', component: removeOld, name: '移到已有卷'},
        ]

    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/removeOldST', component: removeOldST, name: '移到已有卷第二步'},
        ]

    },   
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/modelPrint', component: Print, name: '模板打印'},
        ]
    },{
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/arrange/modelStamp', component: Stamp, name: '整理编目模板打印'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/archivesManagement/modelPrintFiles', component: ModelPrintFiles, name: '档案管理模板打印'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/check', component:check, name: '档号筛查'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/infilecheck', component:infilecheck, name: '卷内文件档号筛查'},
        ]
    },  

    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/transferDetail/transforDetail', component:transforDetail, name: '档案移交申请详情'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/combineNewFile', component: combineNewFile, name: '组新卷'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/addrecord', component: addrecord, name: '档案管理的新增'},
        ]
    }
    ,
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/BJrecord', component: BJrecord, name: '档案管理的编辑'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/combineExisting', component: combineExisting, name: '组已有卷'},
        ]
    },
    


    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/addFile', component: AddFile, name: '新增文件'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/fileManagement/combineExistingST', component: combineExistingST, name: '开始组已有卷'},
        ]
    }, {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/transferDetail/changeTransforDetail', component:changeTransforDetail, name: '档案移交申请修改'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/eleTransforDetail/eleTransferDetail', component:eleTransforDetail, name: '单个档案详情'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/eleTransforDetail/noPassDetail', component:noPassDetail, name: '档案详情目录'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/transferDetail/changQuanTransDetail', component:changQuanTransDetail, name: '档案全宗申请修改'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/transferDetail/quanTransDatil', component:quanTransDatil, name: '档案全宗详情'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/shenTransDetail/shenTransDetail', component:shenTransDetail, name: '档案员权限开通'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/shenTransDetail/biantransDetail', component:biantransDetail, name: '档案员变更查看'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/shenTransDetail/chaneShenTransDetail', component:chaneShenTransDetail, name: '档案员权限开通修改'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/shenTransDetail/changPersonTransDetail', component:changPersonTransDetail, name: '档案员变更申请修改'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/fileArrange/fileManagement/infile/addInfile', component:AddFiles, name: '文件管理新增页面'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/fileArrange/fileManagement/addInrecord', component:AddInRecord, name: '档案管理新增页面'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/archiveManagement/enterStore', component: enterStore, name: '归入库位'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/archiveManagement/filelog', component: fileLog, name: '档案日志'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/archiveManagement/archiveIn', component: ArchiveIn, name: '档案管理卷内文件'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/archiveManagement/contrastItem', component: contrastItem, name: '对应著录项'},
        ]
    }
    ,
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/archiveManagement/fileTurnOver', component: fileTurnOver, name: '跨全总选择目标库'},
        ]
    },
    {
        path: '/',
        component: Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/archiveManagement/recordTransferApply', component: recordTransferApply, name: '跨全宗移交申请'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/fileArrange/arrange/newly/newlywenjian', component:SaveDossierwj, name: '整理编目新增文件页面'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/fileArrange/fileManagement/infile/BianJiInfile', component:BianJiInfile, name: '文件管理新增编辑页面'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/fileArrange/fileManagement/BJInRecord', component:BJInRecord, name: '档案管理新增编辑页面'},
        ]
    },    
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },   
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/borrowDetailsHistory', component:borrowDetailsHistory, name: '借出档案管理详情页面1'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/borrowDetails/borrowDetailsBackList', component:borrowDetailsBackList, name: '借出档案管理详情页面2'},
        ]
    },  
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/selfTip/kuaTransforDetails/kuaTransforDetails', component:kuaTransforDetails, name: '相关档案的跨全宗移交'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/selfTip/NextKuaDetail/NextKuaDetail', component:NextKuaDetail, name: '相关档案的跨全宗移交判断字段'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/selfTip/kuaChangeDetails/kuaChangeDetails', component:kuaChangeDetails, name: '相关档案的跨全宗修改'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '@/views/fileArrange/fileManagement/infile/XiangDetail', component:XiangDetail, name: '查阅档案的详情'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '@/views/selfTip/kuaQuanZongDetails/kuaQuanZongDetails', component:kuaQuanZongDetails, name: '跨全总档案移交详情'},
        ]
    },  
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/processManagementUpdate', component:processManagementUpdate, name: '流程实例管理修改页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/userManagement/userManagement', component:userManagement, name: '用户管理'},
        ]
    },{
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/userManagement/sysuser', component:sysuser, name: '系统用户'},
        ]
    },{
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/userManagement/logoUserMes', component:logoUserMes, name: '用户个人信息'},
        ]
    },{
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/userManagement/setPassword', component:setPassword, name: '修改密码'},
        ]
    },    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/roleManagement/roleManagement', component:roleManagement, name: '角色管理'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/userManagement/addUser', component:addUser, name: '新增公众用户'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processCon/processCon', component:ProcessCon, name: '流程管理'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/detail/processManagementUpdateDetail', component:processManagementUpdateDetail, name: '流程实例管理详情页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/wenJianUpdate', component:wenJianUpdate, name: '流程实例管理文件移交修改页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/detail/wenJianUpdateDetail', component:wenJianUpdateDetail, name: '流程实例管理文件移交详情页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/quanZongUpdate', component:quanZongUpdate, name: '流程实例管理创建全宗修改页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/detail/quanZongUpdateDetail', component:quanZongUpdateDetail, name: '流程实例管理创建全宗详情页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/applyFilerUpdate', component:applyFilerUpdate, name: '流程实例管理申请档案员修改页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/detail/applyFilerUpdateDetail', component:applyFilerUpdateDetail, name: '流程实例管理申请档案员详情页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/borrowUpdate', component:borrowUpdate, name: '流程实例管理查阅申请修改页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/processManagement/detail/borrowUpdateDetail', component:borrowUpdateDetail, name: '流程实例管理查阅申请详情页'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/system/projectManagement/projectManagement', component:projectManagement, name: '项目档案目录汇总'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/moduleDuty/moduleDutyDetail', component:moduleDutyDetail, name: '模块化任务详情'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/selfTip/moduleDuty/yiBanmoduleDuty', component:yiBanmoduleDuty, name: '已办模块化任务详情'},
        ]
    },
    {
        path:'/',
        component:Main,
        name: '主页',
        hidden: true,
        iconCls: '',
        leaf: true,
        children: [
            { path: '/views/home/checkUrls', component:checkUrls, name: '网页链接'},
        ]
    },
];

export default routes;