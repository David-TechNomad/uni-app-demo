
// 定义所需的 mutations
 const mutations = {
    SET_NAME(state ,address) {
        state.address = address.end
    },
    SET_ID(state , id) {
        state.id = id
    },
    SET_isShow(state , isShow) {
        state.isShow = isShow
    },
    SET_PROCESS(state ,process){
        state.process = process
    },
    SET_ProcessInitTag(state ,allProcessInitTag){
        state.allProcessInitTag = allProcessInitTag
    },
    SET_fromType(state ,fromType){
        state.fromType = fromType
    },
    SET_CATNUM(state ,catNum){
        state.catNum = catNum
    },
    //鉴定相关
    SET_INFOIDARR(state ,infoIdArr){
        state.infoIdArr = infoIdArr
    },
    INIT_MININFOMAP(state ,minInfoMap){
        state.minInfoMap = minInfoMap
    },
    SET_TASKINFOID(state ,taskInfoId){
        state.taskInfoId = taskInfoId
    },
    SET_TASKTYPE(state ,taskType){
        state.taskType = taskType
    },
    SET_TASKCOMMENT(state ,taskComment){
        state.taskComment = taskComment
    },
    SET_ARCHIVETITLE(state ,archiveTitle){
        state.archiveTitle = archiveTitle
    },
    CHANGE_MININFOMAP(state){
        let obj = {
            singleReason: state.taskType,
            singleRemark: state.taskComment,
            archiveTitle: state.archiveTitle
        };
        state.minInfoMap.set(state.taskInfoId, obj);
    },
    //借阅相关
    // SET_arcIdArr(state ,arcIdArr){
    //     state.arcIdArr  = arcIdArr
    // },
    // SET_arcId(state ,arcId){
    //     state.arcId = arcId
    // },
    // SET_auditResult(state ,auditResult){
    //     state.auditResult = auditResult
    // },
    // SET_flag(state ,flag){
    //     state.flag = flag
    // },
    // SET_pages(state ,pages){
    //     state.pages = pages
    // },
    // INIT_minArcMap(state ,minArcMap){
    //     state.minArcMap = minArcMap
    // },
    // CHANGE_minArcMap(state){
    //     let obj = {
    //         auditResult: state.auditResult,
    //         flag: state.flag,
    //         pages: state.pages
    //     };
    //     state.minArcMap.set(state.arcId, obj);
    // },
    SET_ArrangBackId(state ,arrangBackId){
        state.arrangBackId = arrangBackId
    },    
    SET_arrangBackScroll(state ,arrangBackScroll){
        state.arrangBackScroll = arrangBackScroll
    }
};

export default mutations
