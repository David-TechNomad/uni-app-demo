
/**
 * @url
 * @退出登录
 */
    const logout = '/auth/logout';
/**
 * @url
 * @登录
 */
    const passwordPublicKey = '/auth/passwordPublicKey';
    const login = '/auth/login';
    const captcha = '/auth/captcha';
    const guestLogin = '/auth/guestLogin';

/**
 * @url
 * @导航菜单
 */
//取导航菜单        
const getMenus = 'menu/getMenusByLoginUser';


/**
 * @url
 * @关键字检索
 * @高级检索案卷库及文件列表
 * @检索
 */
    // 检索表格
    const getSearchUrl = '/searcher/searchSolrList';
    // 高级检索表格
    const getSuperSearchUrl = '/searcher/searchSolrCombinationQuery';
    //获取档案分类列表
    const getSearcheckurl = '/archiveKind/list';
    //根据分类查询检索列
    const getAddCriteria ='/arclibfield/getLibFieldByKindIds';
    //检索类型下拉选
    const getAddCriteriaoption = '/searcher/getConditionOperaterList';
    //检索类型左侧列表
    const searchCountGroupByKindIdAndRank = '/searcher/searchCountGroupByKindIdAndRank'; 
  
    const getArchiveByFile = '/utilize/getArchiveByFile';
    //全文检索
    const searchSolrFileContentQuery = '/searcher/searchSolrFileContentQuery';
    const updateReturnMessage = '/utilize/updateReturnMessage';
/**
 * @url 信息包管理
 */
    //设置方案
    const  archiveAipTemplate='/archiveAipTemplate/findList'
    const  updateInfo='/archiveAipTemplate/updateInfo'

/**
 * @url 整理编目
 */
    //new 整理编目 取得新增、编辑案卷页面的输入项配置
    const getEditDeploy='/arclibfield/getEditField';
    //new 整理编目 保存案卷（新建，修改，删除）
    const SaveDossier='/archive/save';
    //左侧列表树
    const getAllByArchiveAgentCode = '/archivetree/getAllByArchiveAgentCode';
    //左侧列表树数量
    const getTreeNum = '/archive/getArchiveSearchSummary';    
    //取画面表格列配置
    const getDispField = '/arclibfield/getDispField';
    //获取libID
    const getarclib = '/arclib/getByKindId';
    //获取案卷列表/文件列表（检索）
    const getArchiveList = '/archive/search'; 
    //获取卷内列表（检索）
    const searchJuanNei = '/archive/anjuan/searchJuanNei'; 
    //文件删除
    const volumeDelete = '/archive/batchDelete';  
    //案卷删除
    const unmergeAndDelete = '/archive/anjuan/unmergeAndDelete'; 
    //自动组卷
    const autoAssemble = '/archive/autoAssemble';
    //发布档案
    const anjuanPublish = '/archive/anjuan/publish';
    //发布文件
    const weijianPublish = '/archive/wenjian/publish';        
    //数据导出目录
    const DataImporterExport='/archive/exporter/export';
    //导出案卷案卷及文件
    const archiveExportTask='/archive/export/task/createExportTask';
    //拆卷
    const unmerge = '/archive/anjuan/unmerge';
    //删除
    const BatchDelete = '/archive/batchDelete';
    //导出档案目录（含原文）_导出任务
    //创建任务
    const arrcreateExportTask = '/archive/export/task/createExportTask';
    //启动任务
    const arrExportstart = '/archive/export/task/start';
    //取消任务
    const arrExportcancel = '/archive/export/task/cancel';
    //下载
    const arrExportdownload = '/archive/export/task/download';
    //任务列表下载
    const archiveExported = '/archive/file/downloadExported';    
    //列表
    const arrExportlist = '/archive/export/task/list';
    //获取视频文件
    const getVideoFile = '/video/index';
/**
 * @url
 * @系统用户
 */
    //用户管理列表
    const getUserList = '/userInfo/getUserList'; 
    
    const getSysUserJoinUserFondList = '/userFond/getSysUserJoinUserFondList';
    const updateUserFond = '/userFond/updateUserFond';
    const findByUserInfoMaster = '/archiveAgenter/findByUserInfoMaster ';
    //新增用户
    const saveSystemUser = '/userInfo/saveSystemUser';
    //修改用户
    const updateSystemUser = '/userInfo/updateSystemUser';
    //修改密码：
    const updatePwd = '/userInfo/updatePwd';    
    //删除用户（批量删除）
    const updateLocked = '/userInfo/updateLocked';  
    //获取用户角色列表
    const getsysRoleList = '/role/getRoleList';    
    //查询用户绑定的角色
    const getUserById = '/userInfo/getUserById'; 
     //验证原密码
    const checkPassword = '/userInfo/checkPassword'; 
    //角色赋权
    const updateUserRole = '/userInfo/updateUserRole';  
    //角色回显
    const getRoleById = '/userInfo/getRoleById';  
    /**
     * @url
     * @个人信息
     */
     //获取个人信息
    const findUser = '/userInfo/findUser';  
    //修改个人信息
    const updateUser = '/userInfo/updateUser';  
  
    
/**
* 角色管理
* @url
* */
    //获取角色列表
    const getRoleList = '/role/getRoleList';
    //保存 or 修改
    const saveOrUpdateRole = '/role/saveOrUpdate';
    //删除角色
    const delRoleUrl = '/role/del';
    //获取角色功能权限
    const getRoleFunction = '/role/getRoleFunctionNotPar';
    //获取菜单页面权限
    const getPageList = '/functionInfo/getPageButtonList';
    //获取页面按钮权限
    const updateRoleFunction = '/role/updateRoleFunction';
    //获取角色范围
      const getDictlistsurl = '/dictData/getDictListByDictId';
/**
* 回收站
* //-------------
*
* */
    //回收站列表     
    const RecycleList= '/archive/recycle/list';
    //回收站列表     
    const getWenJianByAnJuan= '/archive/recycle/getWenJianByAnJuan';   
    //回收站恢复
    const RecycleRestore= '/archive/recycle/restore';
    //回收站删除
    const RecycleRemove= '/archive/recycle/remove';      

/**
* 互动交流
* //---------------------------------------------------------------------
*
* */
    //意见审批列表     
    const getFeedbackList= '/feedback/getFeedbackList';
    //意见审批查看     
    const showOptionDetail= '/feedback/showOptionDetail';  
    //意见审批恢复
    const addReplay= '/feedback/addReplay';
    //意见审批删除
    const systemdelete= '/feedback/systemdelete';  
    //意见审批新增
    const feedbackAdd= '/feedback/add';  
    //意见审批置已完结
    const setover= '/feedback/setover';   
/**
* EEP阅读器
* //---------------------------------------------------------------------
*
* */ 

    //EEP获取列表     
    const archiveAipfindList= '/archiveAip/findList';
    //EEP下载
    const exportAip= '/file/simple/exportAip';    
    //查看 
    const onlineGetAipInfo= '/archiveAip/onlineGetAipInfo'; 
    //预览 
    const exportAipAttaFile= '/archiveAip/exportAipAttaFile';
    
 /**
 * @url
 * @分类管理
 * //----------------------------------
 */
        //取得分类组列表
        const Arckind= '/management/arckind/list';
        //取得著录项列表
        const ManagementArclib='/management/arclib/field/list';
        //取得新建分类时的模板列表
        const TemplateList='/management/arckind/template/list';
        //保存新增组
        const ArckindSave='/management/arckind/folder/save';
        //保存分类
        const ArckindCreate='/management/arckind/create';
        //编辑分类
        const arckindmodify='/management/arckind/modify';
        //删除组
        const FolderRemove='/management/arckind/folder/remove';
        //删除类
        const ClassRemove='/management/arckind/remove';
        //保存著录项
         const ArclibSave='/management/arclib/field/save';
        //数据字典
        const DictionaryCandidates='/management/arclib/field/dictionaryCandidates';
        //著录项的删除
        const FieldRemove='/management/arclib/field/remove';
        //取得定制画面列表
        const candidates = '/management/arclib/field/list/candidates';
        //保存一览定制画面列表
         const saveSettingField = '/arclib/field/property/save';       
        //取得定制画面已选设置
        const ManagementList='/management/arclib/field/property/edit/list';
        //取得快捷搜索项
        const queryconditionGet ='/management/arclib/querycondition/get';        
        //保存快捷搜索项
        const queryconditionSave = '/management/arclib/querycondition/save';    
        //取得一览设置
        const ManagementDispList='/management/arclib/field/property/disp/list'
        //取得档号规则;
        const nosettings = '/management/arclib/nosettings/get';
        //保存快捷搜索项
        const SaveNosettings = '/management/arclib/nosettings/save';
        //取得批量挂接规则;
        const getRule = '/management/arclib/attach/rule/get';
        //保存批量挂接规则
        const saveRule = '/management/arclib/attach/rule/save';
        //控件类型下拉候选项
        const ManagementControlTypeCandidates='/management/arclib/field/property/controlTypeCandidates';
        //保存定制画面/画面一览设置
        const ManagementSave='/management/arclib/field/property/save';  
        //全文索引类型
        const solrModeCandidates='/management/arclib/field/solrModeCandidates';
        //获取模板列表
        const getReportTempListByLibId = '/report/getReportTempListByLibId';
        //绑定模板
        const updateReportByLibId =  '/report/updateReportByLibId';
 /**
 * @url
 * @处置历史
 * //----------------------------------
 */
        //业务实体元数据查询
        const history =  '/disposal/history';
        //机构人员实体元数据查询
        const agent =  '/disposal/agent';
        //法规元数据查询
        const mandate =  '/disposal/mandate';
        //关系实体元数据查询
        const archiveEntity =  '/disposal/archiveEntity';
    







// 查所有部门案卷库列表
const getAllPort = '/searcher/getSolrDataByFondsCode';

// const getAllPort = '/solr/getSolrDataByFondsCode';

// 点击档案存放地详情
const getFileDetail = '/wareHouse/getWareHouseByLibIdAndObjId';

// 在库列详情
const getHomeDetailUrl = '/utilize/getUtilizeUser';

// 档案云空间下载
const getCloudUpUrl = '/cloudfile/download';

/**
 * @url
 * @借阅申请过程
 */

// 查询获取全宗联想
const getKeyNameUrl = '/fonds/getFondsByName';
// 查询获取全宗树
const getKeyTreeUrl = '/fonds/getAllFondsTreeData';
//取案卷表头
const getSuperSearchHead = '/senior/getListColums';
//获取 关键字检索 表头宽度
const getListColumsForIndex = '/senior/getListColumsForIndex';
//加入借阅车
const getFilesCarUrl = '/shopping/add';
//取借阅车表格
const getCarSearchUrl = '/shopping/query';
//提交借阅申请
const getBorrowApplyUrl = '/utilize/openlist';
// 展开次级列表
const getSuperChildUrl = '/senior/searchByParentId';
// 提交借阅申请表格拆单 重组案卷级文件
const getLoanList = '/utilize/open';
// 购物车删除
const getCarDeleteUrl = '/shopping/delete';
// 查询购物车档案数
const getCarCountUrl = '/shopping/count';
// 选择审批人OA架构
const getOaTreeUrl = '/userInfo/seniorWdorg';
// 选择审批人OA架构次级
const getOaTreeChildUrl = '/userInfo/seniorWdorg';
//常用联系人表格
const getOaPerson = '/userInfo/getContacts';
//清除常用联系人
const clearOaPerson = '/userInfo/deleteContacts';
//组织架构选择人
const getOaList = '/userInfo/seniorUserInfo';
// 查询OA人
const getOaSearch = '/userInfo/seniorWdorgName';
// 获取节点名称表格
const getTreeNameList = '/utilize/getSelectRole';
// 拆单确认提交
const applyUrl = '/utilize/utilizeSubmit';

// 电子档案借阅申请表
const getSEleapplyInfo ='/business/getSEleapplyInfo';
// 实体档案借阅申请表
const getEfilesInfo = '/business/getSEntityapply'
// 档案移交申请表
const getSRmaseapply = '/business/getSRmaseapply'
// 跨全宗移交申请表
const getSTrantsferapply = '/business/getSTrantsferapply'

// OA跳转流程控制按钮显示
const applyFlag = '/utilize/isProcessFlag';

/**
 * @url
 * @借阅申请列表
 */
// 借出登记
const findBorrowUtilizeInfo = '/utilize/findBorrowUtilizeInfo';
// 借阅单详情
const queryUtilizeLookupByAppnum = '/utilize/queryUtilizeLookupByAppnum';
// 借阅申请
const utilizeRequestReceive = '/utilize/utilizeRequestReceive';

const findUserById = '/utilize/findUserById';
// 我的借阅审批列表
const queryMyAuditUtilize = '/utilize/queryMyAuditUtilize';
// 提交借阅审批
const auditUtilize = '/utilize/auditUtilize';
// 查询系统内用户
const findSystemUserByFullName = '/utilize/findSystemUserByFullName';
// 我的借阅列表
const queryMyUtilize = 'utilize/queryMyUtilize';

// 申请协查
const ApplyAsistSelect = '/asistSelect/ApplyAsistSelect';
const findUtilizeLookUpByAsistSelectNum = 'utilize/findUtilizeLookUpByAsistSelectNum';
const getReceptionArchive = '/asistSelect/getReceptionArchive';
const rejectAsistSelectByAppno = '/asistSelect/rejectAsistSelectByAppno';
// 协查管理列表
const queryMyAsistSelect = '/asistSelect/queryMyAsistSelect';
// 协查详情
const findAsistSelectById = '/asistSelect/findAsistSelectById';
// 当前用户的我的协查列表
const queryMyApplyAssistSelect = '/asistSelect/queryMyApplyAssistSelect';





//借阅申请表格（借阅单）
const borrowApplySearch = '/utilize/mineUtilizeList';

//借阅申请表格（档案列表）
const borrowFileSearch = '/utilize/mineUtilizeInfoList';

// 借阅单详情档案列表
const borrowFileTable = '/utilize/mineUtilizeArcs';

// 借阅单详情档案历史
const borrowBackArcList = '/utilize/borrowBackArcList';

// 借阅单详情审批记录
const borrowCheckTable = '/utilize/mineUtilizeProcess';

// 借阅申请续借
const borrowUtilize = '/utilize/utilizeAgainSubmit';

// 借阅申请驳回修改
const borrowModify = '/utilize/utilizeRejectSubmit';

// 借阅申请驳回关闭
const borrowClose = '/utilize/utilizeCloseSubmit';
// 借阅申请详情
const getUtilizeLookup = '/utilize/getUtilizeLookup';
//通过档案馆code获取档案馆
const findByCode = '/ArchiveAgentCache/findByCode';



/****************我的鉴定 start */
// 我的鉴定列表
const getAppraisalByUserList = '/appraisal/getAppraisalByUserList';
// 我的鉴定详情
const getIdentifyDetail = '/appraisal/getDetail';
// 保存我的鉴定
const saveIdentify = '/appraisal/add';
// 提交我的鉴定
const submitIdentify = '/appraisal/submit';
// 鉴定审批列表
const getAppraisalListByStatus = '/appraisal/getAppraisalListByStatus';
// 提交鉴定审批结果
const startupProcess = '/appraisal/startupProcess';
// 查询鉴定流程(单个审批界面的流程)
const getProcessDetail = '/appraisal/getProcessDetail';
//加入已有鉴定任务时，查询已有鉴定任务列表
const getIdentifyNameList = '/appraisal/getAssignmentName';
// 加入已有鉴定任务
const saveAddToIdentifyTask = '/appraisal/addAssignment';
// 获得鉴定文件流程
const getTaskInfoProcessDetail = '/appraisal/getTaskInfoProcessDetail';

/****************我的鉴定 end */

// 水印是否超时
const getIsWatermark = '/utilize/isWatermark';
// 受理登记 协查单
const queryApplyAssistSelectByOperator = "/asistSelect/queryApplyAssistSelectByOperator";

const queryUtilizeLookupByReceptionCode = "/utilize/queryUtilizeLookupByReceptionCode";

const queryApplyAssistSelectByFirstReceptionCode = "/asistSelect/queryApplyAssistSelectByFirstReceptionCode";
/**
 * @url
 * @我的事项
 * @待办事项
 */
// 全宗创建审批列表
const findFondApprovalColumn = '/fondsApproval/findFondApprovalColumn';

// 全宗审批转发
const doCopyApproval = '/fondsApproval/doCopyApproval';

// 借阅人变更审批列表
const getApprovalList = '/updateBorrow/getApprovalList';

// 借阅人变更审批打印
const printProcess = '/reportTemplate/printProcess';

// 借阅人变更审批获取详情
const getInfo = '/updateBorrow/getInfo';

// 借阅人变更审批提交
const approvalSubmit = '/updateBorrow/approvalSubmit';

// 借阅人变更审批转发
const taskNodeForward = '/updateBorrow/taskNodeForward';

// 获取流程节点信息
const getTaskNodeList = '/updateBorrow/getTaskNodeList';

// 创建 or 修改
const saveOrUpdatePeople = '/updateBorrow/saveOrUpdate';

// 借阅人变更申请列表
const getCreateList = '/updateBorrow/getCreateList';

// 关闭流程
const closeProcess = '/updateBorrow/closeProcess';

// 是否可抄送
const isCC = '/updateBorrow/isCC';

// 是否可抄送审批
const isCCUrl = '/utilize/isCCButton';

//填写借阅单页面是否可抄送
const isLoanCCUrl = '/utilize/isCCButtonForApp';

// 01_档案移交审批列表
const queryFileTransferTask = '/fileTransfer/queryFileTransferTask';

// 02_档案移交审批详情
const queryFileTransferTaskDetail = '/fileTransfer/queryFileTransferTaskDetail';

// 03_档案移交审批
const approvalFileTransfer = '/fileTransfer/approvalFileTransfer';

// 03_档案移交转发
const forwardFileTransfer = '/fileTransfer/forwardFileTransfer';

// 04_档案移交收到
const doForwardFileTransfer = '/fileTransfer/doForwardFileTransfer';

// 借阅审批转发
const borrowFileTransfer = '/utilize/forward';

// 借阅审批签收
const borrowFileConfirm = '/utilize/confirm';

// 修改审批人列表
const queryAuditList = 'utilize/queryAuditList';

// 修改审批人确定
const updateAuditSubmit = 'utilize/updateAuditUser';

//档案员权限审批
//列表
const findAll = 'partTimeArchivist/selectAuditRecord';

//审批页
const audit = 'partTimeArchivist/audit';

//档案借阅审批
const forward = '/partTimeArchivist/forward';

//获取审批数据详情
const getUtilizeProcess = 'utilize/getUtilizeProcess';

//全宗兼职档案员
const findArchivivstByFondId = 'partTimeArchivist/findArchivivstByFondId';

//全宗兼职档案员（更改）
const findArchivivstPeopleByFondId = 'partTimeArchivist/findArchivivstPeopleByFondId';

//全宗兼职档案员保存
const changeArchivivstByFondId = 'partTimeArchivist/changeArchivivstByFondId';

/**
 * @url
 * @我的事项
 * @代办事项
 */

//档案借阅待审批表格
const examineSearchUrl = '/utilize/mineAuditList';

//档案借阅已审批表格
const properSearchUrl = '/utilize/mineAuditedList';

//档案借阅审批
const examineProperUrl = '/utilize/audit';

//某全宗某案卷库下所有档案列表
const z_searchJuanNei = '/archive/p4/anjuan/searchJuanNei';
//某全宗某案卷库下所有档案列表
const list = '/modularization/list';
//提交
const save = '/modularization/save';
//勾选的档案列表
const z_getInfo = '/modularization/getInfo';

/**
 * @url
 * @文件管理
 */
//取当前用户全宗
const getFondUrl = '/fonds/getLogonUserFond';
//获取当前全宗下的公司
const getSonUrl = '/fonds/getLogonUserRelatedFonds';
//取下级全宗
const getFondChildrenUrl = '/fonds/getChildren';
//获取全宗公司
const getLogonUserRelatedFondsTree= '/fonds/getLogonUserRelatedFondsTree';
//公司检索
const searchLogonUserRelatedFonds='/fonds/searchLogonUserRelatedFonds';
//当前全宗的档案分类结构
const archiveTreeUrl ='/archivetree/getByFondId';
const archiveTreeUrl1 ='/archivetree/getAllByFondId';
//取当前全宗的代管全宗
const GetEscrow = '/fonds/getEscrow';
//批量修改审批人用户下拉选
const getFondsUserList = '/fonds/getFondsUserList';
//批量修改审批人角色下拉选
const getFondsUserRoleList = '/fonds/getFondsUserRoleList';
//根据档案分类取档案库
const getByKindId='/arclib/getByKindId';
//取当前案卷列表
 const FileSearch='/archive/p1/anjuan/search';
//取未整理文件
const searchJuanWai='/archive/p1/anjuan/searchJuanWai';
//取得新增、编辑案卷页面的输入项配置
const getEditField='/arclibfield/p1/getEditField';
//取得编辑案卷页面的案卷数据
const getNumber='/archive/get';
//保存案卷（新建，修改，删除）
const SaveFile='/archive/p1/save';
//获取项目编号，项目名称
const findByFond ='/project/findAll';
// new 获取挂接 云盘目录
const GetMatchRules = '/archive/attach/batch/getMatchRules';
// 树结构下 文件夹中文件的总数
const getFileCount = '/cloudFile/findFileNumberByDirectoryId';
// new 批量挂接检查是否有尚未完成的挂接任务
const checkIsFinished = '/archive/attach/batch/p1/checkUnfinishedTask';
// new  批量挂接中自动匹配挂接任务
const autoFileUp = 'archive/attach/batch/autoMatch';
// 批量挂接检查是否有尚未完成的挂接任务
const checkIsFinished1 = '/archive/attach/batch/p2/checkUnfinishedTask';
// 批量挂接中自动匹配挂接任务
const autoFileUp1 = 'archive/attach/batch/p2/autoMatch';
// 批量挂接检查是否有尚未完成的挂接任务
const checkIsFinished2 = '/archive/attach/batch/p4/checkUnfinishedTask';
// 批量挂接中自动匹配挂接任务
const autoFileUp2 = 'archive/attach/batch/p4/autoMatch';
// new 开始批量挂接
const fileUpStart = 'archive/attach/batch/start';
//文件移交获取列表头部配置
const getColumns = 'fileTransfer/getColumns';
//数据模板下载
const DownLoadTemps='/dataImporter/downLoadTemp';
//数据导出目录及原文
const DataImporterExportYW = '/exporttask/createExportTask';
//导出任务列表
const exporttask='/exporttask/list';
//导出后台操作
const ExporttaskStart='/exporttask/start';
//取消导出
const exporttaskcancel='/exporttask/cancel';
//是否可以上下移动
const exchangeSeq = '/archive/exchangeSeq';
//确定导出
const exporttaskdownload='/exporttask/download';
//  获取所有列表
const getSolrDataByFondsAndLibId= '/searcher/getSolrDataByFondsAndLibId';
/**
 * @
 * **/
//取当前全宗的档案分类结构
const getFondSortUrl = '';
//取当前案卷列表
const getFondSearchUrl = '/aichive/p1/anjuan/search';
//取未整理文件
const getFondOutSearchUrl = '/aichive/p1/anjuan/searchJuanWai';
//取卷内文件
const getFondInSearchUrl = '/archive/anjuan/getWenJian';
//合卷
const Merge='/archive/p1/anjuan/merge';
//new 整理编目 取得可批量修改的字段
const getBatchModifiableFields='/arclibfield/getBatchModifiableFields';
//new 整理编目 批量修改——按内容
const BatchModify = '/archive/batchModify';

//档号筛查
const CheckDH = '/archive/p1/anjuan/checkDH';
//档号筛查文件
const  CheckDHW = '/archive/p1/wenjian/checkDH';
//检索项配置
const Getquerycondition = '/archive/getQueryCondition';
//页码转页次
const PageTranslate = '/archive/pageTranslate';
//页次转页数
const NumTranslate = '/archive/pageRangeTranslate';
//卷内文件的页数转页次
const PageTranslateByanJuan = '/archive/pageTranslateByAnJuan';
//卷内文件的页次转页数
const NumTranslateByanJuan = '/archive/pageRangeTranslateByAnJuan';
//案卷的页次转页数
const pageRangeTranslateByAnJuans='/archive/pageRangeTranslateByAnJuans';
//案卷的页数转页次
const pageTranslateByAnJuans='/archive/pageTranslateByAnJuans';
//获取文件移交的表格数据
const QueryFileTransferApply = 'fileTransfer/queryFileTransferApply';
//文件移交提交移交申请
const saveTransferLookup = 'fileTransfer/saveTransferLookup';
//获取文件移的审批人角色
const getSelectRole = 'fileTransfer/getSelectRole';
//添加常用联系人
const saveContacts = '/userInfo/saveContacts';
//new 整理编目 取得从案卷继承而来的数据（新建卷内时）
const inheritDataFromAnJuan = '/archive/wenjian/inheritDataFromAnJuan';
//new 整理编目 取得档案电子原文列表
const getOriginals ='/archive/file/getOriginals';
// 更改出库状态sendStatus
const updateInfoSendStatusByIdList = '/utilize/updateInfoSendStatusByIdList';

const queryUtilizeInfoById = '/utilize/queryUtilizeInfoById';
// 出库入库操作
const updateUtilizeInfoArcstatus = '/utilize/updateUtilizeInfoArcstatus';

const updateUtilizeInfoById = '/utilize/updateUtilizeInfoById';
const getArchivesInfo = '/utilize/getArchivesInfo';
const auditPdfFiles = '/create/auditPdfFiles';
//取调整顺序号列表的数据
const searchByDhPrefix = 'archive/p1/searchByDhPrefix';
//调整档号
const generateDH = '/archive/adjustDH';
//生成档号
const generateDHs = '/archive/generateDH';
//移到新卷
const moveToNewAnJuan = '/archive/p1/wenjian/moveToNewAnJuan';
//移到已有卷
const moveToExistingAnJuan = '/archive/p1/wenjian/moveToExistingAnJuan';
//移出
const moveOutWenJian = '/archive/anjuan/moveOutWenJian'
// 表格预览
const modelTableUrl = '/report/getReportList';
// 模板打印
const modelPrintUrl = '/reportTemplate/print';
//组新卷
const groupToNewAnJuan = '/archive/p1/wenjian/groupToNewAnJuan';
//组已有卷
const groupToExistingAnJuan = '/archive/p1/wenjian/groupToExistingAnJuan';
//档号筛查后的保存备注
const CheckDhNotes = '/archive/saveCheckDhNotes';
//数据导入下拉
const dataImportX = '/dataImporter/dataImport';
//数据导入
const dataImport = '/dataImporter/dataImportSheet';
//数据导出
const downLoadTemp = '/dataImporter/downLoadTemp'
//文件级档案
const WenjianSearch='/archive/p1/wenjian/search';
//操作事项
const operationTypes='/archive/logs/operationTypes';
//合卷前，检查不同案卷的卷内文件的档号著录项值是否一致
const  checkBeforeMergeAnJuans = '/archive/checkBeforeMergeAnJuans';
//组卷前，检查不同文件的档号著录项值是否一致
const checkBeforeMergeWenJians='/archive/checkBeforeMergeWenJians';
//全宗号联想
const searchFondsForInput='/archive/searchFondsForInput';
//是否为集团公司
const isTopCompany='/archive/isTopCompany';
//查可以分组查看的著录项接口
const getSupportGroupByFields='/arclibfield/getSupportGroupByFields';
//案卷及文件级取分组候选值的接口
const getGroupByCandidatesValue1='/archive/p1/getGroupByCandidatesValue';
//案卷及文件级取分组候选值的接口
const getGroupByCandidatesValue2='/archive/p2/getGroupByCandidatesValue';
//案卷及文件级取分组候选值的接口
const getGroupByCandidatesValue4='/archive/p4/getGroupByCandidatesValue';
//未整理取分组候选值的接口
const getJuanWaiGroupByCandidatesValue1 = '/archive/p1/getJuanWaiGroupByCandidatesValue';
//未整理取分组候选值的接口
const getJuanWaiGroupByCandidatesValue2 = '/archive/p2/getJuanWaiGroupByCandidatesValue';
//未整理取分组候选值的接口
const getJuanWaiGroupByCandidatesValue4 = '/archive/p4/getJuanWaiGroupByCandidatesValue';
//卷内文件分组候选值的接口
const getJuanNeiGroupByCandidatesValue1 = '/archive/p1/getJuanNeiGroupByCandidatesValue';
//卷内文件分组候选值的接口
const getJuanNeiGroupByCandidatesValue2 = '/archive/p2/getJuanNeiGroupByCandidatesValue';
//卷内文件分组候选值的接口
const getJuanNeiGroupByCandidatesValue4 = '/archive/p4/getJuanNeiGroupByCandidatesValue';
/**
*@url档案管理
*/
//取画面表格的列配置
const getDispField4='/arclibfield/p4/getDispField';
//取当前案卷列表
const FileSearch4 ='/archive/p4/anjuan/search';
//取卷内文件
const searchJuanNei4='/archive/p4/anjuan/searchJuanNei';
//保存案卷（新建，修改，删除）
const SaveFile4='/archive/p4/save';
//取消案卷归档
const DeleteEnter = '/archive/anjuan/p4p2';
//取消案卷归档
const DeleteEnterW = '/archive/wenjian/p4p2';
//归入库位
const saveWareArchive = '/wareHouse/saveWareArchive';
//文件级档案
const WenjianSearch4='/archive/p4/wenjian/search';
//跨全宗移交的提交
const TransferToOtherFond = '/fileTransfer/transferToOtherFond';
//档案日志
const searchArchiveLog = '/archive/logs/searchArchiveLog';

    
/**
 * @url 云盘
 */

//获取云盘目录
const getLoundUrl = '/cloudFile/getCloudDir';
//获取云tree 数据
const gettersitle = '/cloudFile/getCloudTreeData'
//保存云盘目录
const SaveCloudTree ='/cloudFile/saveOrUpdateCloudDir'
//删除云盘目录
const DeleteTile = '/cloudFile/delCloudDir'
//获取云盘列表数据
const LoundList = '/cloudFile/getCloudFileListData'
//删除云盘表格
const deleList = '/cloudFile/delCloudFile'
//云盘列表重命名
const CloudListRname = '/cloudFile/updataCloudFileName'
// 获取云盘文件路径
const getCloudUrl = '/cloudFile/getCloudFilePath'


//获取存储列表
const getVirtualDiskConfigList = '/virtualDiskConfig/getVirtualDiskConfigList';
//删除存储盘
const deleteVirtualDiskConfig = '/virtualDiskConfig/deleteVirtualDiskConfig';
//保存and修改存储盘
const saveOrUpdate = '/virtualDiskConfig/saveOrUpdate';
//获取存储盘信息
const getVirtualDiskConfig = '/virtualDiskConfig/getVirtualDiskConfig';
  
//全宗列表
const searchFondsAndUserInfoByParentId = '/fonds/searchFondsAndUserInfoByParentId';

//获取全宗角色
const getFondRoleList = '/role/getFondRoleList';
//获取全集全宗树
const getFondsByParentId = '/fonds/getFondsByParentId';
//全宗创建
const fondsApprovalSave = '/fondsApproval/fondsApprovalSave';
//获取全宗审批数据详情
const getFondsApprovalInfo = '/fondsApproval/getFondsApprovalInfo';
//获取文件的libId
const genWenJianLibId = '/fileTransfer/genWenJianLibId';
//获取全宗详情
const getFondInfo = '/fonds/getFondInfo';
//修改全宗部分信息及审批人
const updateFondsAndUser = '/fonds/updateFondsAndUser';
//全宗迁移
const fondsMove = '/fonds/fondsMove';
//批量修改全宗审批人
const batchUpdateFondsUser = '/fonds/batchUpdateFondsUser';
//删除全宗
const deleteFonds = '/fonds/deleteFonds';
//全宗审批通过
const fondsApproval = '/fondsApproval/fondsApproval';
//选择对应公司
const DeleteModels = '/wareHouse/deleteWareTemplateById';
//获取该全宗的兄弟节点（不包含自己）
const getFondsSiblings = '/fonds/getFondsSiblings';
//获取全集全宗树（全量数据）
const getAllFondsTreeData = '/fonds/getAllFondsTreeData';
//控制选择抄送人是否显示
const getApprovalSave = '/fondsApproval/getApprovalSave';
//弹框右下角数据
const getApprovalPerson = '/fondsApproval/getApprovalPerson';
//获取流程实例列表
const getProcessInstanceList = '/process/getProcessInstanceList';
//批量修改审批人 - 用户下拉选
const getProcessUserList = '/process/getProcessUserList';
//批量修改审批人
const batchUpdateProcessApprovalUser = '/process/batchUpdateProcessApprovalUser';
//获取流程实例列表(强制关闭)
const enforceCloseProcess = '/updateBorrow/enforceCloseProcess';
//强制（通过/驳回）流程
const enforcePassOrReturnProcess = '/updateBorrow/enforcePassOrReturnProcess';
//获取流程实例移交列表(强制关闭)
const fileEnforceCloseProcess = '/fileTransfer/enforceCloseProcess';
//获取流程实例移交列表(强制驳回，通过)
const fileEnforcePassProcess = '/fileTransfer/enforcePassOrReturnProcess';
//获取流程实例列表(强制关闭，通过，驳回)（借阅，续借）
const enforceOperateProcess = '/utilizeEntity/enforceOperateProcess';
//获取流程实例列表(强制关闭)（创建全宗）
const closeFondWorkFlow = '/fondsApproval/closeFondWorkFlow';
//获取流程实例列表(强制通过)（创建全宗）
const toEndFondWorkFlow = '/fondsApproval/toEndFondWorkFlow';
//获取流程实例列表(强制驳回)（创建全宗）
const toStartFondWorkFlow = '/fondsApproval/toStartFondWorkFlow';
//创建全宗修改页面表单提交
const updateFondWorkFlow = '/fondsApproval/updateFondWorkFlow';
//变更借阅人修改页面表单提交
const updateProcess = '/updateBorrow/updateProcess';
//移交修改页面表单提交
const fileUpdateProcess = '/fileTransfer/updateProcess';
//申请档案员修改页面表单提交
const modifyByAdmin = '/partTimeArchivist/modifyByAdmin';
//申请档案员强制关闭
const shutdownByAdmin = '/partTimeArchivist/shutdownByAdmin';
//申请档案员强制通过
const auditAll = '/partTimeArchivist/auditAll';
//申请档案员强制驳回
const rejectAll = '/partTimeArchivist/rejectAll';
//申请档案员(批量修改审批人)
const batchModificationAuditor = '/partTimeArchivist/batchModificationAuditor';
//档案借阅（保存）
const updateUtilizeProcess = '/utilize/updateUtilizeProcess';
// new 下载缩略图
const downloadThumbnail = '/archive/file/downloadThumbnail';
// new 下载原始文件
const displayPdfFile = '/archive/file/downloadOriginal';
// new 下载转换后文件
const displayToPdfFile = '/archive/file/downloadConverted';

// new 批量下载pdf
const displayPdfFiles = '/archive/file/downloadOriginals';

// new 批量下载转化pdf
const displayToPdfFiles = '/archive/file/downloadConverteds';

// new 删除文件原文
const displayToPdfDelete = '/archive/file/delete';
// 原文元数据
const getMetadata = '/archive/file/getMetadata';

// 在线浏览加水印
const waterMarkPdf = 'utilize/watermark';
// 报表列表
const getReportTemplateList = 'reportTemplate/list';
// 上传模板
const reportFileImport = 'file/simple/upload';
// 修改模板
const updateReportTemplate = 'reportTemplate/save';
// 批量删除模板
const BatchDelReportTemplate = 'reportTemplate/batchDel';
// 通知列表
const getNoticeList = 'messagerDocument/list';
// 修改通知
const updateNotice = 'messagerDocument/save';
// 对通知的操作
const handleNotice = 'messagerDocument/action';
// 批量删除
const BatchDelNotice = 'messagerDocument/batchDel';

/**
 * @url
 * @库房管理
 */
//获取库房一级树目录
const HouseTreeList = '/wareHouse/getWareHouserTree';
//搜索树的目录
const SearchTree = '/wareHouse/findByWareName'
//获取库房树子集目录
const HouseTreeListson = '/wareHouse/getWareHouserTreeChild';
//修改库房tree名字
const ChangeTreeList  = '/wareHouse/updateWareHouse'
//增加库房目录
const AddWareHouse = '/wareHouse/addWareHouse'
//删除库房目录
const DeleteHouseList = '/wareHouse/deleteWareHouse'
//库房列表
const GetArchiveHouseList = '/wareHouse/getArchiveHouseList'
//选择库房模板
const ModelList  = '/wareHouse/getWareTemplateByFondId'
// 选择库房模板  确定
const ModelSure = '/wareHouse/saveWareHouse'
//选择模板列表
const ModelsLists = '/wareHouse/saveWareTemplate'
//查询模板列表
const SerchModelList = '/wareHouse/getWareTemplateByFondId'
//删除库房模板
const seniorWdorg = '/userInfo/seniorWdorg'
//更换库位
const ChangeHouse = '/wareHouse/saveWareArchive'
// 获取更换库位的具体位置名
const getTreeName = '/wareHouse/findWareHouseNames'
//按项目列表查看
const projectListHouse = '/wareHouse/getArchiveHouseProjectNameList'
//按项目查看全部
const projectAllList = '/wareHouse/getArchiveProjectNameList'
//库房表头
const  houseListTitle = '/wareHouse/findTableCloumns';

/**
 * @url
 * @档案相关申请
 */
//档案移交申请
//已通过
const TransferLookup = '/transferLookup/findListByStatus';
//检索
const TransSearch = '/transferLookup/searchList';
//创建全宗申请
const findFondColumn =  'fondsApproval/findFondColumn';
//全宗  已驳回
const closeApproval =  'fondsApproval/closeApproval';
//提交
const fondsApprovalNewSave = 'fondsApproval/fondsApprovalNewSave';
//档案移交 详情
const fileTransfer ='fileTransfer/queryFileTransferTaskDetail'
// 档案移交  重新发起
const reissueFileTransfer = 'fileTransfer/reissueFileTransfer'
//档案移交  重新发起的确认关闭
const closeFileTransfer = 'fileTransfer/closeFileTransfer'

//申请档案员 上级审批人
const selectAuditprocess ='partTimeArchivist/selectAuditprocess'
//申请档案员 权限选择  父级
const getLogonUserRelatedFonds = '/partTimeArchivist/getLogonUserRelatedFonds';
//申请档案员 权限范围 子集的父级名称
const findArchiveTreeByID = 'partTimeArchivist/findArchiveTreeByID'
//申请档案员 权限选择  子级
const getArchiveTreeListByFondsId ='/partTimeArchivist/getArchiveTreeListByFondsId'
//档案员提交申请
const apply = '/partTimeArchivist/apply'
//全宗详情 转发
const  quandoCopyApproval = 'fondsApproval/doCopyApproval';

//档案员列表
const findAllList = '/partTimeArchivist/findAll'
//档案员详情
const getRecordById = '/partTimeArchivist/getRecordById'
//档案员详情(审批页)
const getAgency = '/partTimeArchivist/getAgency'
//档案员 申请修改提交
const modify = '/partTimeArchivist/modify'
//判断当前用户角色
const checkUser = '/partTimeArchivist/checkUser'
//档案员关闭流程
const shutdown = '/partTimeArchivist/shutdown'
//档案员 申请校验
const checkApply = '/partTimeArchivist/checkApply'
//跨全宗移交
const initForTransferToOtherFond = '/fileTransfer/initForTransferToOtherFond'
//获取流程
const getProcess = '/partTimeArchivist/getProcess'

/**
 * @url
 * @借出档案管理
 */
//按照借阅单查询列表
const  getBorrowReturnListByUtilizeNo= '/utilize/mineBorrow_ReturnListByUtilizeNoList';
//按照档号查询列表
const  getBorrowReturnListByArchiveCode = '/utilize/mineBorrow_ReturnListByArchiveList';
// 档案借出操作
// const borrowArchive =  'fondsApproval/findFondColumn';
const getArchiveOriFilesByArchiveId = '';
//档案借阅历史数据
const getBorrowHistoryDataList = '/utilize/getBorrowHistoryDataList';
//获得待借阅列表数据
const getToBorrowDataList = '/utilize/getUtilizeAttInfoDataList';
//按照档案号排列 点击批量借出 ，初始化借出界面数据
const getToBorrowFilesListByArchivesMsg = '/utilize/getToBorrowFilesListByArchivesMsg';
//保存借阅界面的借阅数据
const saveBorrowDatas = '/utilize/saveBorrowDatas';
//取消未借出的原文
const cancelOriFileOfToBorrow = '/utilize/cancelOriFileOfToBorrow';
//获得待归还原文列表数据
const getToBackDataList = '/utilize/getUtilizeAttInfoDataList';
//保存归还界面的归还数据
const saveBackDatas = '/utilize/saveBackDatas';
//按照档案号排列 点击批量归还 ，初始化归还界面数据
const getToBackFilesListByArchivesMsg = '/utilize/getToBackFilesListByArchivesMsg';
//获得utilizeInfo
const getUtilizeInfoByApplicationNoAndObjId = '/utilize/getUtilizeInfoByApplicationNoAndObjId';
//获得著录字段信息
const getP4EditField='/arclibfield/p4/getEditField';
//new 整理编目 取得编辑页面的档案数据
const getEditFieldValue='/archive/get';
//获得借阅历史详细界面的列表
const getBorrowHistoryDetailList = '/utilize/getBorrowHistoryDetailList';

/**
 * @url
 * @系统配置  项目管理
 */
//新增列表
const getPrepareData = '/project/getPrepareData';
//列表
const searchProjectList = '/project/searchProjectList';
//列表导出
const exportProjectList = '/project/exportProjectList';
//模糊查询
const findByDictIdAndText ='/dictData/findByDictIdAndText';
//项目编号 返回
const getProjectCode = 'project/getProjectCode';
//新增保存
const xbglSave = '/project/save';
//结束列表
const closeList = 'project/terminate';
//修改列表 管理
const SavegetEdit ='project/getEdit';
//新增  全宗号  设置
const getAllFonds = 'project/getAllFonds'
//--------流程配置start--------------------------
const getProcessTypeList = '/processMtg/getProcessTypeList';
const getProcessTypeByList = '/processMtg/getProcessTypeByList';
const saveProcess = '/processMtg/saveProcess';
const deleteProcess = '/processMtg/delete';
const selectAgent = '/processMtg/selectAgent';
const getAgentUserList = '/processMtg/getAgentUserList';

//--------流程配置end----------------------------
//--------字典配置start--------------------------
const saveDictData = '/dictData/save';
const deleteDictData = '/dictData/delete';
//--------字典配置end----------------------------

//查询所有组织信息
const findAgenterCode = '/archiveAgenter/findAll';

/**
 * @url
 * @批量挂接/挂接
 * //--------断点续传start--------------------------
 */
// new 预备上传/进度/暂停/继续 (取得分块大小_getSliceConfig)
const getLoaderServlet = '/javaLargeFileUploaderServlet';

// new 上传文件块_asyncUpload
const getAsyncServlet = '/javaLargeFileUploaderAsyncServlet';
// new 支持上传文件类型
const allSupportedTypes = '/archive/file/converter/allSupportedTypes';

//--------断点续传end--------------------------

/**
 * @url
 * @任务列表 接口
 * //--------下载--------------------------
 */
//任务列表 表格
const taskList = '/dataImporter/taskList'
//任务列表 批量挂接
const searchTasks = '/archive/attach/batch/searchTasks'
// new 任务列表 批量挂接 删除
const Pdelete = '/archive/attach/batch/delete'
//任务列表 批量挂接 启动
const Pstart = '/archive/attach/batch/start'
// new 任务列表 批量挂接 详情
const Pdetails = '/archive/attach/batch/details'
//任务列表 删除
const deleteImportTask = '/dataImporter/deleteImportTask'
// new 任务列表 批量挂接 进度条
const getProgress = '/archive/attach/batch/getProgress'
//跨全宗档案移交 获取原档案库名
const getLibArchiveName = '/fileTransfer/getLibArchiveName'
//全宗驳回 常用联系人
const CsaveContacts = '/userInfo/saveContacts'
//获取审批人角色
const checkProcess = '/fileTransfer/checkProcess';
// 任务列表 检索任务状态选项下拉
const taskStatusCandidates = '/archive/attach/batch/taskStatusCandidates';

/**
 * @url
 * @公众用户管理接口
 * //----------------start------------------
 */

//保存公众用户
const savePublicUser = '/publicUser/savePublicUser';
//更新公众用户
const updatePublicUser = '/publicUser/updatePublicUser';
//删除公众用户
const deletePublicUser = '/publicUser/deletePublicUser';
//重置用户密码
const resetPassword = '/publicUser/resetPassword';
//重置用户密码
const uploadPublicUserFiles = '/publicUser/uploadPublicUserFiles';
//检索公众用户
const findPublicUserByName = '/publicUser/findPublicUserByName';
//通过用户ID检索公众用户
const findPublicUserById = '/publicUser/findPublicUserById';
//根据用户id获取相关公众材料信息集合
const getFilesByUserId = '/publicUser/getFilesByUserId';
//根据路径下载文件
const getFileByFilePath = '/publicUser/getFileByFilePath';
//公众用户验证原密码是否正确
const checkPublicUserPassword = '/publicUser/checkPublicUserPassword';
//修改公众用户密码
const updatePublicUserPassword = '/publicUser/updatePublicUserPassword';


/**
 * @url
 * @公众用户管理接口
 * //----------------end------------------
 */
/**
 * @url
 * @日志管理接口
 * //----------------start------------------
 */

//用户登录信息
const getLoginLogList = '/loginlog/getLoginLogList';
//用户登录信息导出
const loginLogExport = '/loginlog/loginLogExport';
//检测与入库日志列表
const getPlanInfoDataStorageLogList = '/taskmanage/getPlanInfoDataStorageLogList';
//检测与入库日志列表导出
const taskExport = '/taskmanage/taskExport';
//检测与入库日志详情
const getDataLogStandardCheckLogList = '/taskmanage/getDataLogStandardCheckLogList';
//利用日志列表
const utilizeLoglist = '/utilizeLog/list';
//利用日志列表导出
const utilizeExport = '/utilizeLog/utilizeExport';
//利用档案资源管理行为采集列表
const getArchiveActionLogList = '/archiveactionlog/getArchiveActionLogList';
//利用档案资源管理行为采集列表导出
const archiveActionExport = '/archiveactionlog/archiveActionExport';
//配置变更日志列表
const getSystemOperationLogList = '/systemoperationlog/getSystemOperationLogList';
//配置变更日志列表-操作类型
const getDictListByDictIdk = '/dictData/getDictListByDictId';
//配置变更日志列表导出
const systemExport = '/systemoperationlog/systemExport';


/**
 * @url
 * @日志管理接口
 * //----------------end------------------
 */

 /**
 * @url
 * @数据采集
 * //----------------start------------------
 */

//导入数据
const importArchive = '/archive/importer/importArchive';
//取得数据采集的目标字段列表
const archiveFields = '/archive/import/task/archiveFields';
//采集任务列表
const importTaskList = '/archive/import/task/list';
//采集任务 检索状态下拉选项
const importTaskStatusCandidates = '/archive/import/task/taskStatusCandidates';
//采集任务 删除
const deleteTask = '/archive/import/task/delete';
//采集任务 撤销
const withdrawTask = '/archive/import/task/withdraw';
//采集任务 继续导入
const appendImport = '/archive/importer/appendImport';
//采集任务 入库
const enterStorage = '/archive/import/task/enterStorage';
//采集任务 下载错误数据
const downloadErrorFile = '/archive/import/task/downloadErrorFile';
//采集任务 取得采集任务状态
const getTaskStatus = '/archive/import/task/getTaskStatus';
//采集任务 准备采集任务的批量挂接
const prepareBatchAttach = '/archive/import/task/prepareBatchAttach';
// 取得导入相关的档案数据
const getImportedData = '/archive/import/task/getImportedData';
// 判断是案卷还是文件
const containsAnJuan = '/archivetree/containsAnJuan';
/**
 * @url
 * @数据采集
 * //----------------end------------------
 */

/**
 * @url
 * @统计报表
 * //----------------start------------------
 */
// 馆藏统计
//档案数量统计_档案馆级
const getArchiveSummaryStatistic = '/archive/statistic/getArchiveSummaryStatistic';
//档案数量统计_全宗级（展开某个档案馆时）
const getFondArchiveSummaryStatistic = '/archive/statistic/getFondArchiveSummaryStatistic';
//控制标识统计_档案馆级
const getControlIdStatistic = '/archive/statistic/getControlIdStatistic';
//控制标识统计_全宗级
const getFondControlIdStatistic = '/archive/statistic/getFondControlIdStatistic';
//各门类档案数量_档案馆级
const getArchiveCountByKindStatistic = '/archive/statistic/getArchiveCountByKindStatistic';
//各//各门类档案数量_全宗级
const getFondArchiveCountByKindStatistic = '/archive/statistic/getFondArchiveCountByKindStatistic';
//档案数量增长率_档案馆级
const getArchiveGrowthRateStatistic = '/archive/statistic/getArchiveGrowthRateStatistic';
// 平台应用统计
// 平台应用排行榜
const getRankingList = '/rankingStatistic/getRankingList';
// 鉴定统计
// 鉴定统计 - 档案馆列表
const getAppraisalArchiveAgentCodeStatisticList = '/appraisalStatistic/getAppraisalArchiveAgentCodeStatisticList';
// 鉴定统计 - 全宗列表
const getAppraisalFondsStatisticList = '/appraisalStatistic/getAppraisalFondsStatisticList';
/**
 * @url
 * @统计报表
 * //----------------end------------------
 */

 /**
 * @url
 * @互动交流
 * //----------------start------------------
 */
// 公告中心
//公告中心列表
const getAnnouncementList = '/announcement/getAnnouncementList';
//公告中心详情
const showDetail = '/announcement/showDetail';
//公告中心管理 获取检索下拉
const getDictListByDictId = '/dictData/getDictListByDictId';
//公告中心管理 新增保存
const saveAnnouncement = '/announcement/saveAnnouncement';
//公告中心管理 编辑保存
const updateAnnouncement = '/announcement/updateAnnouncement';
//公告中心管理 删除
const deleteAnnouncement = '/announcement/deleteAnnouncement';
//公告中心管理 发布
const publish = '/announcement/publish';
//公告中心管理 置顶
const important = '/announcement/addTop';
//公告中心管理 删除文件
const delTempUploadFile = '/announcement/delTempUploadFile'
//下载中心
//获取下载中心列表
const getDownloadInfoList = '/downloadInfo/getDownloadInfoList'
//新增
const saveDownload = '/downloadInfo/saveDownload'
//修改
const updateDownload = '/downloadInfo/updateDownload'
//删除
const deleteDownload = '/downloadInfo/deleteDownload'
//发布/取消发布
const downloadInfoPublish = '/downloadInfo/publish'
/**
 * @url
 * @互动交流
 * //----------------end------------------
 */

 /**
 * @url
 * @印章管理
 * //----------------start------------------
 */
//查询所有印章
const findAllStamp = '/stamp/findAllStamp';
//查询当前档案馆所有印章
const findStampByArchivesAgentCode = '/stamp/findStampByArchivesAgentCode';
//添加印章
const saveStamp = '/stamp/saveStamp';
//印章编辑
const updateStamp = '/stamp/updateStamp';
/**
 * @url
 * @印章管理
 * //----------------end------------------
 */

 /**
 * @url
 * @全宗管理
 * //----------------start------------------
 */

//新增全宗
const addSaveFond = '/fonds/saveFond';
//检索全宗
const findFondsByName = '/fonds/findFondsByName';


/**
 * @url
 * @全宗管理
 * //----------------end------------------
 */

/**
* 数据字典
* //---------------------------------------------------------------------
*
* */
//查询字典列表
const dicFindList = 'dictionary/findList'
//根据id查询字典项
const dicgetDictListByDictId ='dictData/getDictListByDictId'
//保存数据字典
const dicSave = '/dictionary/save';
//保存字典值
const dicDataSave = '/dictData/save';
//新增保存字典值
const dicDataUpSave = '/dictData/update';
//删除字典值
const dicDatadelete ='/dictData/delete';
//删除数据字典
const dicDelete ='/dictionary/delete';
//上移下移
const wordFieldUpdateSort ='/workdoc/wordFieldUpdateSort';

//
/**
 * 分组及案卷库管理
 * *****/
//创建分组
const createFolderNode='/management/archivetree/createFolderNode';
//创建档案库
const createKindNode='/management/archivetree/createKindNode';
//取得分类组列表
const listWithoutLib='/management/arckind/listWithoutLib';
//案卷库迁移前检查重名
const checkBeforeMigrateKindNode='/management/archivetree/checkBeforeMigrateKindNode';
//重命名案卷库
const rename = '/management/archivetree/rename';
//案卷库迁移
const migrateKindNode= '/management/archivetree/migrateKindNode';
//删除组或案卷库
const removeNode='/management/archivetree/removeNode';
//修改分组
const modifyFolderNode = '/management/archivetree/modifyFolderNode';
//修改档案库
const modifyKindNode = '/management/archivetree/modifyKindNode';
// **********报表管理**********
//人员变更统计
const getFondsUserUpdateRecordList = '/fonds/getFondsUserUpdateRecordList'
//当前在任人员统计
const getCurrentFondsUserList = 'fonds/getCurrentFondsUserList'
//在任人员导出
const exportCurrentFondsUserList = 'fonds/exportCurrentFondsUserList'
//变更人员导出
const exportFondsUserUpdateRecordList = 'fonds/exportFondsUserUpdateRecordList'
//各库档案数量
const groupCountLibIdByFondsId= 'searcher/groupCountLibIdByFondsId';

// 跳转链接
const checkUrl = '/business/cancelOA';
/************ *///借阅统计 ***********//
//当前借出档案数量
const borrowSumOfFileAndTimeOut = '/utilize/borrowSumOfFileAndTimeOut';
const getAllDateOfYear = '/utilize/getAllDateOfYear';
const getCode = '/project/getCode';
//历年新增档案数量统计
const groupCountLibIdAndYearByFondsId='/searcher/groupCountLibIdAndYearByFondsId';
//未整理档案数量统计
const groupCountLibIdByUnfinished='/searcher/groupCountLibIdByUnfinished';
//档案借阅统计————当前接触档案数量
const currentBorrowArchiveCount='/utilize/currentBorrowArchiveCount';
const historyBorrowArchiveGroupYear= '/utilize/historyBorrowArchiveGroupYear';
//移交统计 当前移交数量
const currentTransferArchiveCount='/transferLookup/currentTransferArchiveCount';
//历年借出统计
const historyTransferArchiveCount = '/transferLookup/historyTransferArchiveCount';

/*
 * 工作文档配置
 * */
//左侧列表
const queryWkDocClassNos = '/workdoc/queryWkDocClassNos';
//获取文档类别详情
const wordClassObject = '/workdoc/wordClassObject';
//文档类别编辑
const wordClassUpdate = '/workdoc/wordClassUpdate';
//文档字段列表
const wordFieldList = '/workdoc/wordFieldList';
//文档字段修改
const wordFieldUpdate = '/workdoc/wordFieldUpdate';
//文档字段删除
const wordFieldDelete = '/workdoc/wordFieldDelete';
//文档字段保存
const wordFieldAdd = '/workdoc/wordFieldAdd';
//文档号规则列表
const workNoSetingList = '/workdoc/workNoSetingList';
//文档号规则 - 值下拉选
const workInfoFieldList = '/workdoc/workInfoFieldList';
//文档号规则保存
const workNoSetingAdd = '/workdoc/workNoSetingAdd';
//获取件号规则
const workAutoNoList = '/workdoc/workAutoNoList';
//件号规则保存
const workAutoNoAdd = '/workdoc/workAutoNoAdd';
//获取列头
const queryWkDocGridColumns = '/workdoc/queryWkDocGridColumns';
//获取列表数据
const queryWkDocGridDatas = '/workdoc/queryWkDocGridDatas';
//获取编辑项
const queryWkDocEditorControls = '/workdoc/queryWkDocEditorControls';
//获取内容明细
const queryWkDocGridData = '/workdoc/queryWkDocGridData';
//工作文档著录
const wordAdd = '/workdoc/wordAdd';
//工作文档修改
const wordUpdate = '/workdoc/wordUpdate';
//工作文档删除
const wordDelete = '/workdoc/wordDelete';
//上传原文
const uploadAttach = '/workdoc/uploadAttach';
//删除原文
const deleteWorkAttached = '/workdoc/deleteWorkAttached';
//获取原文列表
const wordAttachedList = '/workdoc/wordAttachedList';
//获取原文信息
const downWorkDocFile = '/workdoc/downWorkDocFile';
//打印
const workPrint = '/workdoc/workPrint';
const printODO = '/report/printODO';

// 资料目录中心相关方法-------------start
 //检索类型左侧列表
 const zlmlSearchCountGroupByKindIdAndRank = '/zlmlsearcher/searchCountGroupByKindIdAndRank';
 // 检索表格
 const zlmlGetSearchUrl = '/zlmlsearcher/searchSolrList';
 const zlmlGetSuperSearchUrl = '/zlmlsearcher/searchSolrCombinationQuery';
 const findUserFondByUserId = '/userFond/findUserFondByUserId';
 const exportZlmlArchiveList = '/zlmlsearcher/exportZlmlArchiveList';

 /*
 *
 * 全宗管理
 * */
//档案馆的树
const archiveAgenterTree = '/archiveCategory/archiveAgenterTree';
//删除
const deleteFond = '/fonds/deleteFond';
//导出
const fondExport = '/archive/exporter/fondExport';
//导入
const fondImport = '/archive/exporter/fondImport';

/*
* 类别级管理
*
* */
//检索条件中的全宗
const appraisalFondList = '/archiveCategory/appraisalFondList';
//列表
const treelist = '/archiveCategory/treelist';
//档案门类
const namelist = '/archiveCategory/namelist';
//新增
const add = '/archiveCategory/add';
//新增
const update = '/archiveCategory/update';
//详情
const findOne = '/archiveCategory/findOne';
//删除
const deleteCate = '/archiveCategory/delete';

/*
*机构管理
*
* */
//机构管理列表
const agenterTreelist = '/archiveAgenter/treelist';
//添加
const addAgenter = '/archiveAgenter/add';
//修改
const updateAgenter = '/archiveAgenter/update';
//删除
const deleteAgenter = '/archiveAgenter/delete';
//详情
const fondOneAgenter = '/archiveAgenter/findOne';
//获取三元用户
const getRolesByAgentCode = '/archiveAgenter/getRolesByAgentCode';
//添加或删除三元用户
const setAgentUserRole = '/archiveAgenter/setAgentUserRole';
//设置roleflag
const setRoleFlag = '/archiveAgenter/setRoleFlag';


// 资料目录中心相关方法----------------end
let apiConfig = {
    zlmlSearchCountGroupByKindIdAndRank,
    zlmlGetSearchUrl,
    zlmlGetSuperSearchUrl,
    findUserFondByUserId,
    exportZlmlArchiveList,
    findAgenterCode,
    borrowBackArcList,
    getAllPort,//高级检索所有部门案卷库列表-->
    deleteProcess,
    deleteDictData,
    saveDictData,//字典新增修改值
    saveProcess,//新增流程
    getProcessTypeList,//获取流程分类
    getProcessTypeByList,//通过分类获取流程列表
    selectAgent,//流程管理所属档案馆
    getAgentUserList,//获取鉴定人
    getFondUrl,
    getFondChildrenUrl,
    getFondSortUrl,  
    getFondSearchUrl,  
    getFondOutSearchUrl,
    getFondInSearchUrl,
    archiveTreeUrl,
    archiveTreeUrl1,
    getByKindId,   
    FileSearch,   
    SaveDossier, 
    getEditDeploy,   
    searchJuanWai,  
    getEditField,
    getNumber,
    SaveFile,
    getLoundUrl,
    SaveCloudTree,
    gettersitle, //获取云盘目录
    DeleteTile,
    LoundList,
    deleList,
    CloudListRname,
    getUserList,//用户管理列表
    getSysUserJoinUserFondList,
    updateUserFond,
    saveSystemUser,//用户保存用户   
    findByUserInfoMaster,//用户管理获取档案馆
    updateSystemUser,//用户管理修改用户
    updatePwd,//用户管理修改密码
    updateLocked ,//用户管理删除用户（批量删除）
    getsysRoleList,//用户管理获取用户角色列表
    getUserById ,//用户管理查询用户绑定的角色 
    checkPassword,//用户管理查询验证原密码 
    updateUserRole,//用户管理角色赋权
    getRoleById,//用户管理角色赋权回显
    getVirtualDiskConfigList, //系统配置  存储管理  修改用戶角色
    deleteVirtualDiskConfig,//系统配置  存储管理  删除存储盘
    saveOrUpdate,//系统配置  存储管理  保存and修改存储盘
    getVirtualDiskConfig,//系统配置  存储管理  获取存储盘信息
    getKeyNameUrl,// 查询获取全宗联想
    getKeyTreeUrl,// 查询获取全宗树
    getSuperSearchHead,//高级检索表头 //借阅车表头
    getSuperSearchUrl,//高级检索
    getAddCriteria,//高级检索获取可添加条件
    getSearcheckurl,//高级检索获取复选框条件
    getAddCriteriaoption,//高级检索获取可添加条件下拉框
    getSearchUrl,//检索类表 
    searchCountGroupByKindIdAndRank,//检索左侧分类  
    getArchiveByFile,
    searchSolrFileContentQuery,//全文检索
    updateReturnMessage,
    getLoanList,//加入借阅单拆单
    getFilesCarUrl,//加入借阅车
    getCarSearchUrl,//借阅车表格
    getBorrowApplyUrl,//提交借阅申请单
    getCarDeleteUrl,//删除购物车
    getCarCountUrl,//查询购物车档案数
    getOaTreeUrl,//查询OA树
    getOaTreeChildUrl,//查询OA树次级
    getOaPerson,//常用联系人表格
    getOaList,//组织架构选择人
    getTreeNameList,//节点名称
    findBorrowUtilizeInfo,//借出登记列表
    queryUtilizeLookupByAppnum,
    utilizeRequestReceive,
    findUserById,
    queryMyAuditUtilize,
    auditUtilize,
    findSystemUserByFullName,
    queryMyUtilize,
    ApplyAsistSelect,
    findUtilizeLookUpByAsistSelectNum,
    getReceptionArchive,
    rejectAsistSelectByAppno,
    queryMyAsistSelect,
    findAsistSelectById,
    queryMyApplyAssistSelect,
    borrowApplySearch,//借阅申请列表
    borrowFileSearch,//借阅申请列表
    getUtilizeLookup,//借阅申请详情
    findByCode,
    getAppraisalByUserList,//我的鉴定列表
    getIdentifyDetail,
    saveIdentify,
    submitIdentify,
    getAppraisalListByStatus,
    startupProcess,
    getProcessDetail,
    getIdentifyNameList,
    saveAddToIdentifyTask,
    getTaskInfoProcessDetail,
    borrowFileTable,//详情档案列表
    borrowCheckTable,//详情审批记录
    applyUrl,//拆单确认提交
    clearOaPerson,//清除常用联系人
    getOaSearch,//查询OA人
    examineSearchUrl,//待阅待审批表格
    properSearchUrl,//已阅待审批表格
    examineProperUrl,//借阅档案审批
    borrowUtilize,// 借阅申请续借
    borrowModify,//驳回修改
    getSEleapplyInfo,// 电子档案借阅申请表
    getEfilesInfo, // 实体档案借阅申请表
    getSRmaseapply, //档案移交申请表
    getSTrantsferapply, //跨全宗移交申请
    HouseTreeList,
    HouseTreeListson,
    ChangeTreeList,
    AddWareHouse,
    DeleteHouseList,
    GetArchiveHouseList,
    ModelList,
    SearchTree,
    ModelSure,
    ModelsLists,
    searchFondsAndUserInfoByParentId,//全宗列表
    getFondRoleList,//获取全宗角色
    getFondsByParentId,//获取全集全宗树
    fondsApprovalSave,//全宗创建
    getFondsApprovalInfo,//获取全宗审批数据详情
    getFondInfo,//获取全宗详情
    updateFondsAndUser,//修改全宗部分信息及审批人
    fondsMove,//全宗迁移
    batchUpdateFondsUser,//批量修改全宗审批人
    deleteFonds,//删除全宗
    fondsApproval,//全宗审批通过
    seniorWdorg,//选择对应公司
    SerchModelList,
    DeleteModels,
    Merge,//合卷
    getBatchModifiableFields,//取得可批量修改的字段
    BatchModify,//批量修改--按内容
    BatchDelete,//删除  
    displayToPdfDelete,//删除挂接原文
    getMetadata,//查看原文元数据
    CheckDH,//档号筛查
    Getquerycondition,//检索项配置,
    PageTranslate,//页码转页次
    PageTranslateByanJuan,//页码转页次
    GetEscrow,//当前全宗的代管全宗
    getFondsUserList,//批量修改审批人用户下拉选
    getFondsUserRoleList,//批量修改审批人角色下拉选
	ChangeHouse,
    getTreeName,
    projectListHouse,
    projectAllList,
    houseListTitle,
    getFondsSiblings,//获取该全宗的兄弟节点（不包含自己）
    getAllFondsTreeData,//获取全集全宗树（全量数据）
    TransferLookup,
    QueryFileTransferApply,
    findFondApprovalColumn,// 全宗创建审批列表
    getApprovalList,//借阅人变更审批列表
    TransSearch,
    saveContacts,   
    inheritDataFromAnJuan,//文件管理列表  新增列表
    getOriginals,////文件管理列表  编辑列表
    updateInfoSendStatusByIdList,
    queryUtilizeInfoById,
    updateUtilizeInfoArcstatus,
    updateUtilizeInfoById,
    getArchivesInfo,
    auditPdfFiles,
    searchByDhPrefix,//调整顺序号的页面数据
    generateDH,//调整档号
    generateDHs,//生成档号
    getSonUrl,//获取当前全宗下的公司
    saveTransferLookup,//提交文件移交申请
    getSelectRole,//获取文件移交的审批人的角色
    getApprovalSave,//控制选择抄送人是否显示
    getApprovalPerson,//弹框右下角数据
    getProcessInstanceList,//获取流程实例列表
    getProcessUserList,//批量修改审批人 - 用户下拉选
    batchUpdateProcessApprovalUser,//批量修改审批人
    enforceCloseProcess,//获取流程实例列表(强制关闭)
    enforceOperateProcess,//(强制关闭，通过，驳回)（借阅，续借）
    closeFondWorkFlow,
    toEndFondWorkFlow,
    toStartFondWorkFlow,
    updateFondWorkFlow,
    enforcePassOrReturnProcess,//强制（通过/驳回）流程
    fileEnforceCloseProcess,
    fileEnforcePassProcess,
    updateProcess,//变更借阅人修改页面表单提交
    fileUpdateProcess,
    modifyByAdmin,//申请档案员修改页面表单提交
    shutdownByAdmin,//申请档案员强制关闭
    auditAll,//申请档案员强制通过
    rejectAll,//申请档案员强制驳回
    batchModificationAuditor,
    updateUtilizeProcess,
    downloadThumbnail, //下载缩略图
    modelPrintUrl,//模板打印
    modelTableUrl,//表格预览
    groupToNewAnJuan,//组新卷
    CheckDhNotes,//档号筛查后的备注
    displayPdfFile,//在线浏览pdf
    displayPdfFiles,
    displayToPdfFiles,
    displayToPdfFile,//在线浏览其他格式转为pdf
    getReportTemplateList,//报表列表
    reportFileImport, //导入报表
    updateReportTemplate, //修改报表
    BatchDelReportTemplate, // 批量修改报表
    getNoticeList, //通知列表
    updateNotice, // 修改通知
    handleNotice, // 对通知的操作
    BatchDelNotice, // 批量删除
    doCopyApproval,//全宗审批转发
    getPrepareData, //系统配置 点击新建
    searchProjectList, // 初始化列表
    exportProjectList,//列表导出
    findByDictIdAndText,// 模糊查询
    getProjectCode, // 项目编号 返回
    xbglSave,// 项目编号 新增保存
    closeList,//结束列表
    SavegetEdit,// 修改列表
    groupToExistingAnJuan,//组已有卷
    getInfo,//借阅人变更审批获取详情
    printProcess,//借阅人变更审批打印
    approvalSubmit,//借阅人变更审批提交
    taskNodeForward,//借阅人变更审批转发   
    findFondColumn,//档案相关申请  全宗申请
    closeApproval,//档案相关申请  全宗申请 已驳回
    getBorrowReturnListByUtilizeNo,
    getBorrowReturnListByArchiveCode,
    getBorrowHistoryDataList,
    getToBorrowDataList,
    saveBorrowDatas,
    cancelOriFileOfToBorrow,
    getToBackDataList,
    saveBackDatas,
    getToBorrowFilesListByArchivesMsg,
    getToBackFilesListByArchivesMsg,
    getUtilizeInfoByApplicationNoAndObjId,
    getP4EditField,
    getEditFieldValue,
    getBorrowHistoryDetailList,
    moveToNewAnJuan,//移到新卷  
    moveToExistingAnJuan,//移到已有卷
    moveOutWenJian,//移出
    getTaskNodeList,//获取流程节点信息
    saveOrUpdatePeople,
    getCreateList,//借阅人变更申请列表
    closeProcess,//关闭流程
    isCC,//是否可抄送  
    dataImport,//数据导入
    fondsApprovalNewSave,//档案提交
    queryFileTransferTask,//01_档案移交审批列表
    queryFileTransferTaskDetail,//02_档案移交审批详情
    approvalFileTransfer,//03_档案移交审批
    forwardFileTransfer,
    doForwardFileTransfer,// 04_档案移交收到
    fileTransfer,//档案相关申请 详情
    CheckDHW,//文件的档号筛查
    WenjianSearch,//文件级档案
    getLoaderServlet,//上传预备
    getAsyncServlet, //上传
    //档案管理
    getDispField4,
    FileSearch4,
    searchJuanNei4,
    SaveFile4,
    DeleteEnter,
    saveWareArchive,   
    WenjianSearch4,
    TransferToOtherFond,
    DeleteEnterW,
    searchArchiveLog,
    //档案管理
    borrowFileTransfer,//借阅转发
    borrowFileConfirm,//签收
    queryAuditList,//修改审批人列表
    updateAuditSubmit,//修改审批人确定
    reissueFileTransfer, //移交 重新发起
    closeFileTransfer,//移交 重新发起的确认关闭
    selectAuditprocess,//申请档案员 上级审批人
    getLogonUserRelatedFonds,//申请档案员  权限范围 父级
    getArchiveTreeListByFondsId,//申请档案员  权限范围 子级
    apply,////申请档案员 提交申请
    findAll,
    audit,
    forward,
    quandoCopyApproval, //全宗详情  转发
    findAllList,//档案员列表
    getRecordById,//档案员 详情
    getAgency,
    modify,//档案员申请修改提交
    getUtilizeProcess,//审批流程详情
    borrowClose,//修改确定关闭
    checkUser,//判断当前用户角色
    shutdown,//档案员的关闭流程
    initForTransferToOtherFond,//跨全宗移交
    getProcess,
    findByFond,
    GetMatchRules, // 挂接规则的查询
    getFileCount, // 查询 批量挂接下 文件夹中文件总数
    getFileDetail,//档案员存放地详情
    waterMarkPdf,//查看水印pdf  
    checkIsFinished,//检测是否可以匹配
    checkIsFinished1,//检测是否可以匹配
    autoFileUp,//匹配任务
    checkIsFinished2,//检测是否可以匹配
    autoFileUp1,//匹配任务
    autoFileUp2,//匹配任务
    fileUpStart,//匹配完成开始批量挂接
    taskList,//任务列表 列表
    getColumns,
    findArchiveTreeByID,//权限范围的子集父级名称查询
    genWenJianLibId,
    getLibArchiveName,//跨全宗档案移交 获取原档案库名
    CsaveContacts,//全宗驳回 常用联系人
    searchTasks,//任务列表 批量挂接
    Pdelete,//任务列表 批量挂接 删除
    Pstart,//任务列表 批量挂接 启动
    Pdetails,//任务列表 批量挂接 详情
    operationTypes,
    getHomeDetailUrl,//在库详情
    isCCUrl,//审批是否可抄送
    isLoanCCUrl,//填写借阅单是否可抄送
    checkProcess,
    checkApply,//档案员申请校验
    getCloudUrl,//获取云盘文件路径 
    getAllFonds,//项目管理 新增 全宗号
    Arckind,//门类管理 获取左侧
    ManagementArclib,//门类管理 获取著录项
    ArckindSave,//门类管理 保存门类组
    TemplateList,//门类管理 获取模板列表
    ArckindCreate,//门类管理 保存门类
    FolderRemove,//门类管理 删除门类组
    ClassRemove,//门类管理 删除门类
    ArclibSave,//门类管理 保存著录项
    nosettings,//门类管理 取得档号规则
    SaveNosettings,//门类管理 保存档号规则  
    getRule,//门类管理 取得批量挂接规则
    saveRule,//门类管理 保存批量挂接规则
    DictionaryCandidates,  //门类管理 取著录项数据字典  
    candidates,//门类管理  获取一览定制画面列表
    saveSettingField,//门类管理  保存一览定制画面列表
    queryconditionGet,//取得快捷搜索项
    queryconditionSave,//保存快捷搜索项
    applyFlag,
    getIsWatermark,
    queryApplyAssistSelectByOperator,
    queryUtilizeLookupByReceptionCode,
    queryApplyAssistSelectByFirstReceptionCode,
    FieldRemove,
    ManagementList,
    ManagementControlTypeCandidates,
    ManagementSave,
    getCloudUpUrl,
    solrModeCandidates,
    DownLoadTemps,
    checkBeforeMergeAnJuans,
    checkBeforeMergeWenJians,
    ManagementDispList,
    searchFondsForInput,
    isTopCompany,
    deleteImportTask,//任务列表删除
    getProgress,//任务列表 批量挂接进度条
    getSupportGroupByFields,
    getGroupByCandidatesValue1,
    findArchivivstByFondId,
    findArchivivstPeopleByFondId,
    changeArchivivstByFondId,
    getGroupByCandidatesValue2,
    getGroupByCandidatesValue4,
    getJuanWaiGroupByCandidatesValue1,
    getJuanWaiGroupByCandidatesValue2,
    getJuanWaiGroupByCandidatesValue4,
    getJuanNeiGroupByCandidatesValue1,
    getJuanNeiGroupByCandidatesValue2,
    getJuanNeiGroupByCandidatesValue4,
    exchangeSeq,   
    getReportTempListByLibId,//获取模板
    updateReportByLibId,//绑定模板
    dicFindList,//查询字典列表
    dicgetDictListByDictId,//根据id查询字典项
    dicSave,//保存数据字典值
    getSolrDataByFondsAndLibId,
    dicDataSave,//保存字典值
    dicDataUpSave,//新增保存字典值
    dicDatadelete,//删除字典值
    dicDelete,//删除数据字典
    wordFieldUpdateSort,
    createFolderNode,
    createKindNode,
    listWithoutLib,
    checkBeforeMigrateKindNode,
    rename,
    migrateKindNode,
    removeNode,
    modifyFolderNode,
    modifyKindNode,
    z_searchJuanNei,
    list,
    save,
    z_getInfo,
    getFondsUserUpdateRecordList,//人员变更统计
    getCurrentFondsUserList,//当前在任人员统计
    groupCountLibIdByFondsId,
    arckindmodify,
    dataImportX,
    getLogonUserRelatedFondsTree,
    searchLogonUserRelatedFonds,
    NumTranslateByanJuan,
    NumTranslate,
    checkUrl,//跳转链接
    pageRangeTranslateByAnJuans,
    pageTranslateByAnJuans,
    borrowSumOfFileAndTimeOut,
    getAllDateOfYear,
    getListColumsForIndex,
    exportCurrentFondsUserList,//在任人员导出
    exportFondsUserUpdateRecordList,//变更人员导出
    getCode,
    DataImporterExportYW,
    exporttask,
    ExporttaskStart,
    exporttaskcancel,
    exporttaskdownload,
    groupCountLibIdAndYearByFondsId,
    groupCountLibIdByUnfinished,
    currentBorrowArchiveCount,
    historyBorrowArchiveGroupYear,
    currentTransferArchiveCount,
    historyTransferArchiveCount,
    RecycleList,//回收站列表
    RecycleRestore,// 回收站恢复 
    RecycleRemove,//回收站删除
    getWenJianByAnJuan,//回收站卷内
    getAllByArchiveAgentCode,// 整理编目页面左侧树
    getTreeNum,// 整理编目页面左侧树数量
    getarclib,// 整理编目页面获取libid
    getDispField,// 整理编目页面获取列表表头
    getArchiveList,//整理编目页面案卷文件列表
    autoAssemble,// 整理编目组卷
    searchJuanNei, //整理编目获取卷内文件
    volumeDelete,//整理编目文件删除
    unmergeAndDelete,//整理编目案卷删除
    anjuanPublish,//整理编目案卷发布
    weijianPublish,//整理编目卷内发布
    DataImporterExport,//整理编目卷数据导出
    archiveExportTask,//整理编目卷数据导出
    unmerge,//整理编目卷拆卷
    arrcreateExportTask,//整理编目创建任务
    arrExportstart, //整理编目启动任务
    arrExportcancel, //整理编目取消任务
    arrExportdownload,   //整理编目下载
    archiveExported, //整理编目任务列表下载
    arrExportlist, //整理编目列表
    passwordPublicKey,//登录获取公钥
    login,//登录
    logout,//登出
    getMenus,//获取菜单
    captcha,//获取验证码    
    guestLogin,//游客登录
    savePublicUser,//保存公众用户
    findPublicUserByName,//检索公众用户
    updatePublicUser,//更新公众用户
    deletePublicUser,//删除公众用户
    resetPassword,//重置用户密码
    uploadPublicUserFiles,//上传公众用户证明材料
    taskStatusCandidates,//任务列表 检索任务状态选项下拉
    getRoleList,//角色管理获取角色列表
    saveOrUpdateRole,//角色管理保存 or 修改
    delRoleUrl,//角色管理删除角色
    getRoleFunction,//角色管理获取角色功能权限
    getPageList,//角色管理获取菜单页面权限
    updateRoleFunction,//角色管理获取页面按钮权限
    getDictlistsurl,//角色管理获取权限范围
    importTaskList,//数据采集任务列表
    importArchive,//数据采集导入数据
    archiveFields,//取得数据采集的目标字段列表
    importTaskStatusCandidates,// 数据采集任务检索状态下拉选项
    deleteTask,//数据采集任务 删除
    withdrawTask,//数据采集任务 撤销
    appendImport,//数据采集任务 继续导入
    enterStorage,//数据采集任务 入库
    downloadErrorFile,//数据采集任务 下载错误数据
    getTaskStatus,//数据采集任务 取得采集任务状态
    prepareBatchAttach,//数据采集 准备采集任务的批量挂接
    getImportedData,//数据采集 取得导入相关的档案数据
    addSaveFond,//全宗管理 新增全宗
    findFondsByName,//全宗管理 检索全宗
    getAnnouncementList,//互动交流 公告中心-列表
    showDetail,//互动交流 公告中心-详情
    getDictListByDictId,//互动交流 公告中心-获取检索下拉
    saveAnnouncement,//互动交流 公告中心-新增保存
    deleteAnnouncement,//互动交流 公告中心-删除
    publish,//互动交流 公告中心-发布
    important,//互动交流 公告中心-置顶
    updateAnnouncement,//互动交流 公告中心-编辑保存
    delTempUploadFile,//互动交流 公告中心-删除文件
    findAllStamp,//查询所有印章
    findStampByArchivesAgentCode,//查询当前档案馆所有印章
    saveStamp,//添加印章
    updateStamp,//印章编辑,
    saveDownload,//下载中心新增
    updateDownload,//下载中心编辑
    deleteDownload,//下载中心删除
    downloadInfoPublish,//发布/取消发布
    getDownloadInfoList,////互动交流 下载中心-列表
    getVideoFile,//获取视频文件
    archiveAipTemplate,//信息包设置方案 获取列表
    updateInfo,//信息包设置方案 修改设置方案             
    getFeedbackList,//意见审批列表
    showOptionDetail, //意见审批查看 
    addReplay,//意见审批恢复
    systemdelete,//意见审批删除
    feedbackAdd, //意见审批新增
    setover,//意见审批置顶
    findUser,//修改个人信息
    updateUser,//修改个人密码
    archiveAipfindList,//EEP获取列表
    exportAip,//EEP获取下载
    onlineGetAipInfo,//EEP查看
    exportAipAttaFile,//EEP预览
    history,//处置历史 业务实体元数据查询
    agent ,//处置历史 机构人员实体元数据查询
    mandate,//处置历史 法规元数据查询
    archiveEntity,//处置历史 关系实体元数据查询
    queryWkDocClassNos,
    wordClassObject,
    wordClassUpdate,
    wordFieldList,
    wordFieldUpdate,
    wordFieldDelete,
    wordFieldAdd,
    workInfoFieldList,
    workNoSetingList,
    workNoSetingAdd,
    workAutoNoList,
    workAutoNoAdd,
    queryWkDocGridColumns,
    queryWkDocGridDatas,
    queryWkDocEditorControls,
    queryWkDocGridData,
    wordAdd,
    wordUpdate,
    wordDelete,
    uploadAttach,
    deleteWorkAttached,
    wordAttachedList,
    downWorkDocFile,
    workPrint,
    printODO,
    fondExport,
    fondImport,
    archiveAgenterTree,
    deleteFond,
    appraisalFondList,
    treelist,
    namelist,
    add,
    update,
    findOne,
    deleteCate,
    agenterTreelist,
    addAgenter,
    updateAgenter,
    deleteAgenter,
    getRolesByAgentCode,
    setAgentUserRole,
    fondOneAgenter,
    containsAnJuan,//判断是案卷还是文件
    getLoginLogList,
    loginLogExport,
    getPlanInfoDataStorageLogList,
    taskExport,
    getDataLogStandardCheckLogList,
    utilizeLoglist,
    utilizeExport,
    getArchiveActionLogList,
    archiveActionExport,
    getSystemOperationLogList,
    getDictListByDictIdk,
    systemExport,
    setRoleFlag,
    allSupportedTypes,//支持上传的文件类型
    getArchiveSummaryStatistic,//馆藏统计，档案数量统计_档案馆级
    getFondArchiveSummaryStatistic,//馆藏统计，档案数量统计_全宗级（展开某个档案馆时）
    getRankingList,//平台应用统计，平台应用排行榜
    getAppraisalArchiveAgentCodeStatisticList,//鉴定统计 - 档案馆列表
    getAppraisalFondsStatisticList,//鉴定统计 - 全宗列表
    findPublicUserById,//通过用户ID检索公众用户
    getFilesByUserId,//根据用户id获取相关公众材料信息集合
    getFileByFilePath,//根据路径下载文件
    getControlIdStatistic,//控制标识统计_档案馆级
    getFondControlIdStatistic,//控制标识统计_全宗级
    getArchiveCountByKindStatistic,//各门类档案数量_档案馆级
    getFondArchiveCountByKindStatistic,//各门类档案数量_全宗级
    getArchiveGrowthRateStatistic,//档案数量增长率_档案馆级
    updatePublicUserPassword,//修改公众用户密码
    checkPublicUserPassword,//公众用户验证原密码是否正确
}
export default apiConfig;
