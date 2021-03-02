import Mock from 'mockjs';
const tableHeadData = [
    {
        name: '文件类型',
        value: 'name',
        width: 300,
    },{
        name: '档号',
        value: 'name',
        width: 300,
    },{
        name: '所属单位',
        value: 'addr',
    },{
        name: '全宗',
        value: 'id',
    },{
        name: '密级',
        value: 'sex',
    }
];
const mackDataObj = {};
const mackData = [];
var total = 200
for (let i = 0; i < total; i++) {
  mackData.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}
mackDataObj.res = mackData;
mackDataObj.total = total;

export default { tableHeadData, mackDataObj };
