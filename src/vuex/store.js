import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    address: '1234',
    id: '',
    isShowLoad:1,
    isShow:false,
    process:0,
    catNum:0,
    allProcessInitTag:true,
    fromType:'',

    taskInfoId:0,
    taskType:'',
    taskComment:'',
    infoIdArr: [],//档案数字化鉴定审批使用
    minInfoMap: new Map(),//档案数字化鉴定审批使用
    
    
    // arcIdArr:[],
    // arcId: 0,
    // auditResult:'',//审核状态
    // flag: '',
    // pages:'',
    // minArcMap: new Map(),

    //省馆
    arrangBackId:'',
    arrangBackScroll:''

};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})