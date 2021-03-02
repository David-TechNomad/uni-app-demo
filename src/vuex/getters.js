//test
const getters =  {
    GET_NAME : state => state.address ,
    GET_ID : state => state.id,
    GET_isShowLoad: state => state.isShowLoad===0 ? true :false ,
    GET_ArrangBackId : state => state.arrangBackId,
    GET_ArrangBackId : state => state.arrangBackScroll,
};

export default getters;