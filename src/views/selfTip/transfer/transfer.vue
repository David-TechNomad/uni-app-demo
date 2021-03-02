 <template>
    <section>
        <!-- <div class="mainTitle">
            <span>档案相关申请</span>
        </div> -->
        <div class="titleBlue">
            <b></b>
            <span>档案相关申请</span>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow mainBorrowTop">
                <div class="formData">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="cardTab">
                        <el-tab-pane label="移交申请" name="0">
                            <el-tabs class="mainBorrowBottom">
                                <el-tabs v-model="borrowName" @tab-click="MoveTab">
                                    <el-tab-pane label="已通过" name="0">
                                    </el-tab-pane>
                                    <el-tab-pane label="审批中" name="1">
                                    </el-tab-pane>
                                    <el-tab-pane label="已驳回" name="2">
                                    </el-tab-pane>
                                     <el-tab-pane label="已结束" name="3">
                                    </el-tab-pane>
                                    <el-tab-pane label="全部" name="4">
                                    </el-tab-pane>
                                </el-tabs>
                            </el-tabs>
                        </el-tab-pane>
                        <el-tab-pane label="创建全宗申请" name="1">
                            <el-tabs class="mainBorrowBottom">
                                <el-tabs v-model="borrowName1" @tab-click="quanTab">
                                    <el-tab-pane label="已通过" name="0">
                                    </el-tab-pane>
                                    <el-tab-pane label="审批中" name="1">
                                    </el-tab-pane>
                                    <el-tab-pane label="已驳回" name="2">
                                    </el-tab-pane>
                                    <el-tab-pane label="已结束" name="3">
                                    </el-tab-pane>
                                    <el-tab-pane label="全部" name="4">
                                    </el-tab-pane>
                                </el-tabs>
                            </el-tabs>
                        </el-tab-pane>
                            <el-tab-pane label="档案员权限申请" name="2">
                            <el-tabs class="mainBorrowBottom">
                                <el-tabs v-model="borrowName2" @tab-click="QuanXianTab">
                                    <el-tab-pane label="已通过" name="0">
                                    </el-tab-pane>
                                    <el-tab-pane label="审批中" name="1">
                                    </el-tab-pane>
                                    <el-tab-pane label="已驳回" name="2">
                                    </el-tab-pane>
                                     <el-tab-pane label="已结束" name="3">
                                    </el-tab-pane>
                                    <el-tab-pane label="全部" name="4">
                                    </el-tab-pane>
                                </el-tabs>
                            </el-tabs>
                        </el-tab-pane>
                    </el-tabs>
                    <!-- <div class="more">
                        <el-radio-group v-model="tabPosition">
                            <el-radio-button label="left">按借阅单查看</el-radio-button>
                            <el-radio-button label="right">按档案列表查看</el-radio-button>
                        </el-radio-group>
                    </div> -->
                     <!-- 移交查询 -->
                    <el-form v-show="documentList"  :inline="true" :model="filters" class="doneForm topParamsForm">
                            <el-form-item v-for="" class="fondName" label="标题：" ref="fondName">
                            <el-input class="checkName" v-model="filters.fondName" placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="timestamp" ref="startDate" placeholder="开始日期" class="checkName" v-model="filters.createDateStart"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="timestamp" class="checkName" placeholder="结束日期" v-model="filters.createDateEnd" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay"  @click="dataCheckeds">检索</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 全宗查询 -->
                    
                    <el-form v-show="borrowList" :inline="true" :model="filtersQuan" class="doneForm topParamsForm">
                       
                        <el-form-item v-for="" class="fondName" label="标题：" ref="fondName">
                            <el-input class="checkName" v-model="filtersQuan.fondName" placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year">
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="timestamp" ref="startDate" placeholder="开始日期" class="checkName" v-model="filtersQuan.createDateStart"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="timestamp" class="checkName" placeholder="结束日期" v-model="filtersQuan.createDateEnd" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay"  @click="dataCheckedsQuan">检索</el-button>
                        </el-form-item>
                         
                    </el-form>
                   
                    
                    <!-- 档案员的查询 -->
                    
                    <el-form v-show="DAList" :inline="true" :model="filtersDang" class="doneForm topParamsForm">
                        
                        <el-form-item v-for="" class="fondName" label="标题：" ref="fondName">
                            <el-input class="checkName" v-model="filtersDang.fondName" placeholder="单行输入"></el-input>
                        </el-form-item>
                        <el-form-item class="year" label="申请日期：" ref="year">
                            <el-date-picker type="date" format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filtersDang.createDateEnd" ref="endDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay"  @click="dataCheckedsDang">检索</el-button>
                        </el-form-item>
                       
                    </el-form>
                </div>
                
                <!--列表(移交申请)-->
                <div class="borderTable" v-show="documentList">
                    <el-table border stripe :height="bodyHeight-22" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column  prop="title" label="标题">
                               <template slot-scope="scope">
                                <a href= "javascript:void(0);" class="" @click="MovefindDetails(scope.row)" v-show="passDetail">{{scope.row.title}}</a>
                                <div v-show="bohui">
                                     <a href= "javascript:void(0);" class="" @click="changeDetail(scope.row)">{{scope.row.title}}</a>
                                     <!-- <a href= "#" class="" @click="findModifyClose(scope.row)">{{scope.row.title}}</a> -->
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="appayUser" label="申请人">
                        </el-table-column>
                        <el-table-column  prop="applyDept" label="申请部门">
                        </el-table-column>
                        <el-table-column  prop="applyDate" label="申请日期">
                        </el-table-column>
                        <el-table-column   prop="acceptDept" label="接收部门">
                        </el-table-column>
                        <el-table-column  prop="acceptFondName" label="接收单位">
                        </el-table-column>
                        <el-table-column   prop="transferCount" label="移交数量">
                        </el-table-column>
                        <!-- <el-table-column  :label="item.title" :prop="item.prop" v-for='item in listData'>
                        </el-table-column> -->
                        <!-- <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="MovefindDetails(scope.row)" v-show="passDetail">详情</span>
                                <div v-show="bohui">
                                     <span class="addBtn" @click="changeDetail(scope.row)">修改</span>
                                     <span class="addBtn" @click="findModifyClose(scope.row)">关闭</span>
                                </div>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
                <!--列表(创建全宗)-->
                <div class="borderTable" v-show="borrowList">
                        <el-table border stripe :height="bodyHeight-22" :data="borrowTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                            <el-table-column width="55" fixed>
                            </el-table-column>
                        <!-- <el-table-column  :label="item.title" :prop="item.prop" v-for='item in listDataQuan'>
                        </el-table-column> -->
                            <el-table-column   prop="title" label="标题">
                                <template slot-scope="scope">
                                    <a href="javascript:void(0);" class="" @click="findBorrowDetailsQuan(scope.row)" v-show="quanDetail">{{scope.row.title}}</a>
                                     <div v-show="bohuiQuan">
                                     <a href="javascript:void(0);" class="" @click="quanChangTransDetail(scope.row)">{{scope.row.title}}</a>
                                     <!-- <span class="" @click="changClose(scope.row)">关闭</span> -->
                                </div>
                                </template>
                            </el-table-column>
                            <el-table-column   prop="createPerson" label="申请人">
                            </el-table-column>
                            <el-table-column   :formatter="dateFormat" prop="createDate" label="申请日期">
                            </el-table-column>
                            <el-table-column   prop="type" label="审批状态">
                                 <template slot-scope="scope">
                                    <span v-if="scope.row.type === 1">审批中</span>
                                    <span v-if="scope.row.type === 2">已通过</span>
                                    <span v-if="scope.row.type === 3">已驳回</span>
                                    <span v-if="scope.row.type === 4">已结束</span>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column label="操作" width="220">
                                <template slot-scope="scope">
                                    <span class="addBtn" @click="findBorrowDetailsQuan(scope.row)" v-show="quanDetail">详情</span>
                                     <div v-show="bohuiQuan">
                                     <span class="addBtn" @click="quanChangTransDetail(scope.row)">修改</span>
                                     <span class="addBtn" @click="changClose(scope.row)">关闭</span>
                                </div>
                                </template>
                            </el-table-column> -->
                        </el-table>
                        <!--工具条分页-->
                        <el-col :span="24" class="pager">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChangeQuan" @current-change="handleCurrentChangeQuan" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="totalquan" style="float:right;">
                            </el-pagination>
                        </el-col>
                    </div>


                       <!--列表(档案员权限申请)-->
                <div class="borderTable" v-show="dangQuanShen">
                    <el-table border stripe :height="bodyHeight-22" :data="shenData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column  width="55" fixed>
                        </el-table-column>
                        <!-- <el-table-column   prop="title" label="标题">
                        </el-table-column> -->
                         <el-table-column   prop="title" label="标题">
                                <template slot-scope="scope">
                                    <a href="javascript:void(0);" class="" @click="MoveShenfindDetails(scope.row)" v-show="shenDetail">{{scope.row.title}}</a>
                                     <div v-show="shenbohui">
                                     <a href="javascript:void(0);" class="" @click="changeShenDetail(scope.row)">{{scope.row.title}}</a>
                                     <!-- <span class="" @click="changClose(scope.row)">关闭</span> -->
                                </div>
                                </template>
                        </el-table-column>
                        <el-table-column  prop="applyUserName" label="申请人">
                        </el-table-column>
                        <el-table-column   prop="applyTime" label="申请日期" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column   prop="status" label="审批状态">
                             <template slot-scope="scope">
                                    <span v-if="scope.row.status === ''">全部</span>
                                    <span v-if="scope.row.status === '1'">审批中</span>
                                    <span v-if="scope.row.status === '2'">已通过</span>
                                    <span v-if="scope.row.status === '3'">已驳回</span>
                                    <span v-if="scope.row.status === '4'">已结束</span>
                                </template>
                        </el-table-column>
                        <el-table-column  prop="type" label="申请类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.type == 0">档案员申请</span>
                                <span v-if="scope.row.type ==1">档案员变更</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column  prop="applyReason" label="备注">
                        </el-table-column> -->
                        <!-- <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="MoveShenfindDetails(scope.row)" v-show="shenDetail">详情</span>
                                <div v-show="shenbohui">
                                    <span class="addBtn" @click="changeShenDetail(scope.row)">修改</span>
                                    <span class="addBtn" @click="personClose(scope.row)">关闭</span>
                                </div>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChangeDang" @current-change="handleCurrentChangeDang" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="dangtotal" style="float:right;">
                        </el-pagination>
                    </el-col>
                    <!-- <el-button class="checkWay">变更档案员</el-button>
                    <el-button class="checkWay">申请成为档案员</el-button> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './transfer.service';
    import moment from 'moment';
     Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class appborrow extends Vue{
        windowHeight: number;
        itemRow:string;
        DAList : boolean;
        passDetail:boolean;
        quanDetail : boolean;
        bohui : boolean;
        bodyHeight: number;
        timer: boolean;
        checked: boolean;
        listLoading: boolean;
        documentList: boolean;
        borrowList: boolean;
        bohuiQuan : boolean;
        dangQuanShen : boolean;
        tabRightDown: boolean;
        formSelect: boolean;
        start: number;
        total: number;
        dangtotal : number;
        page: number;
        pageQuan : number;
        pageDang : number;
        limitQuan : number;
        limit: number;
        limitDang:number;
        tabPosition: string;
        shenDetail : boolean;
        shenbohui : boolean;
        activeName: number;
        borrowName: number;
        borrowName1: number;
        vals : number;
        valsQuan : number;
        valsDang : string;
        bbb:string;
        borrowName2:number;
        filters: any = {};
        documentTableData: any = [];
        listData : any = [];
        borrowTableData: any = [];
        shenData : any = [];
        sels:any = [];
        form: any = {};
        token:{};
        filtersQuan : any = {};
        totalquan : number;
        listDataQuan: any = []
        filtersDang : any = {};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight-300;
            this.timer = false;
            this.tabPosition =  'left';
            this.token = {};
            this.documentList = true;
            this.passDetail = true;
            this.quanDetail = true;
            this.borrowList = false;
            this.DAList = false;
            this.dangQuanShen = false;
            this.bohuiQuan = false;
            this.shenDetail = true;
            this.shenbohui = false;
            this.formSelect = true;
            this.tabRightDown = false;
            this.bohui = false;
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
                createDateStart:'',
                createDateEnd:''
            };
            this.filtersQuan = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
                createDateStart:'',
                createDateEnd:''
            }
            this.filtersDang = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
                createDateStart:'',
                createDateEnd:''
            }
            this.start = 0;
            this.total = 0;//总条数
            this.totalquan = 0 //总条数 全宗
            this.dangtotal = 0//总条数  档案员
            this.page = 0;//移交页码
            this.pageQuan = 0; // 全宗页码
            this.pageDang = 0;// 档案员页码
            this.limitQuan = 25;
            this.limit = 25;
            this.limitDang = 25;
            this.listLoading = false;
            this.sels = [];//列表选
            this.shenData = [];
            this.activeName = 0;
            this.borrowName = 0;
            this.borrowName1 = 0;
            this.borrowName2 = 0;
            // this.vals = 2;
            this.valsQuan = 2;
            this.valsDang = '2';
            this.documentTableData = [];
            this.borrowTableData = []
            this.listData = []
            this.listDataQuan = [
                    {
                    title:'标题',
                    prop:'title'
                },
                {
                    title:'申请人',
                    prop:'createPerson'
                },
                 {
                    title:'申请日期',
                    prop:'createDate'
                }, 
                 {
                    title:'申请状态',
                    prop:'type'
                }
            ]
            this.shenData = []
            this.checked = true;
            this.itemRow = '';
            this.form =  {}

                    
};
            findModifyClose(index,row){//已驳回  关闭
                this.documentTableData.splice(index,1)
            }
            changClose(row,index){
                this['$confirm']('您确定要关闭此条记录？', {
                    type: 'warning'
                }).then(() => {
                   Service.closeApproval(row.id).then(res=>{
                    this.borrowTableData.splice(index,1)
                })

                });
               
            }
            personClose(index,row){
                this.shenData.splice(index,1)
            }
            changeDetail(row){//已驳回 创建移交申请详情 修改
            console.log(row)
            if(row.transferType == 2){
                var obj = row.id;
                var transferType = row.transferType;
                 window.sessionStorage.setItem('kuaChangeTransFortype',JSON.stringify(transferType));
                 window.sessionStorage.setItem('kuaChangeDetails',JSON.stringify(obj));

                          this['$router'].push({
                             path:'/selfTip/kuaChangeDetails/kuaChangeDetails',
                             name: '相关档案的跨全宗修改',
                             params:{
                                id:row.id
                            }
                        })     
                }else if(row.transferType == 1){
                    let obj = {
                        id:row.id,
                        transferType:row.transferType
                    }
                    window.sessionStorage.setItem('YchangeTransforDetail',JSON.stringify(obj));
                    this['$router'].push({
                        path:'/selfTip/transferDetail/changeTransforDetail',
                        name:'档案移交申请修改',
                        params:{
                            id:row.id,
                            transferType:row.transferType
                        }
                        })
                }
            }
            quanChangTransDetail(row){//全宗申请  修改详情
                 let qid = row.id
                 window.sessionStorage.setItem('QchangQuanTransDetail',JSON.stringify(qid));
                 this['$router'].push({
                        path:'/selfTip/transferDetail/changQuanTransDetail',
                        name:'档案全宗申请修改',
                        params:{
                            id:row.id
                        }
                        })
            }
            changeShenDetail(row){//档案员权限申请修改
            console.log(row)
                if(row.type == "0"){
                    let sids = row.id;
                     window.sessionStorage.setItem('SchaneShenTransDetail',JSON.stringify(sids));
                      this['$router'].push({
                        path:'/selfTip/shenTransDetail/chaneShenTransDetail',
                        name:'档案员权限开通修改',
                        params:{
                            id:row.id
                        }
                        })
                }else if(row.type == "1"){
                    let bids = row.id;
                     window.sessionStorage.setItem('PchangPersonTransDetail',JSON.stringify(bids));
                    this['$router'].push({
                        path:'/selfTip/shenTransDetail/changPersonTransDetail',
                        name:'档案员变更申请修改',
                         params:{
                            id:row.id
                        }
                        })
                }
             
            }
            //时间格式化
            dateFormat(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            }
            findBorrowDetailsQuan(row){//创建全宗申请  详情 
                var id = row.id;
                console.log(row)
                if(row.type == "3"){
                    let qid = row.id
                    window.sessionStorage.setItem('QchangQuanTransDetail',JSON.stringify(qid));
                     this['$router'].push({
                        path:'/selfTip/transferDetail/changQuanTransDetail',
                        name:'档案全宗申请修改',
                        params:{
                            id:row.id
                        }
                        })
                }else{
                    let quanid = row.id
                    window.sessionStorage.setItem('QDchangQuanTransDetail',JSON.stringify(quanid));
                    this['$router'].push({
                        path:'/selfTip/transferDetail/quanTransDatil',
                        name:'档案全宗详情',
                        params:{
                            id:id,
                            stepId : ''
                        }
                        })
                }
                 
            }
            handleCurrentChange(val) {
                this.page = val-1;
                this.start = (val-1)*(this.limit);
                this.getFiles(this.vals);
            };
            handleSizeChange(val) {
                this.limit = val;
                this.start = val*(this.page);
                this.getFiles(this.vals);
            };
            handleCurrentChangeQuan(val) {
                this.pageQuan = val-1;
                this.start = (val-1)*(this.limitQuan);
                this.getFilesquan(this.valsQuan);
            };
            handleSizeChangeQuan(val) {
                this.limitQuan = val;
                this.start = val*(this.pageQuan);
                this.getFilesquan(this.valsQuan);
            };
            handleCurrentChangeDang(val) {
                this.pageDang = val-1;
                this.start = (val-1)*(this.limitDang);
                this.getFilesDang(this.valsDang);
            };
            handleSizeChangeDang(val){
                this.limitDang = val;
                this.start = val*(this.pageDang);
                this.getFilesDang(this.valsDang);
            }
            MovefindDetails(row){//档案移交申请详情
                  console.log(row)
                  if(row.transferStatusCode == 3){
                      if(row.transferType == 2){//跨全宗移交
                          let kuaid = row.id
                          window.sessionStorage.setItem('kuaChangeDetails',JSON.stringify(kuaid));
                           this['$router'].push({
                            path:'/views/selfTip/kuaChangeDetails/kuaChangeDetails',
                            name:'相关档案的跨全宗修改',
                            params:{
                                id:row.id
                            }
                        })
                      }else if(row.transferType == 1){//文件移交
                        let obj = {
                            id:row.id,
                            transferType:row.transferType
                        }
                        window.sessionStorage.setItem('YchangeTransforDetail',JSON.stringify(obj));
                          this['$router'].push({
                            path:'/selfTip/transferDetail/changeTransforDetail',
                            name:'档案移交申请修改',
                            params:{
                                id:row.id,
                                transferType:row.transferType
                            }
                        })
                      }
                      
                  }else if(row.transferStatusCode != 3){
                      if(row.transferType == 2){
                          let kuaquanId = {
                              id:row.id,
                          };
                          window.sessionStorage.setItem('KQkuaQuanZongDetails',JSON.stringify(kuaquanId));
                          this['$router'].push({
                            path:'/views/selfTip/kuaQuanZongDetails/kuaQuanZongDetails',
                            name:'跨全总档案移交详情',
                            params:{
                                id:row.id
                            }
                        })
                          
                      }else if(row.transferType == 1){
                          let tranId = {
                              id:row.id
                          };
                          window.sessionStorage.setItem('TDtransferDetail',JSON.stringify(tranId));
                            this['$router'].push({
                            path:'/views//selfTip/transfer/transferDetail',
                            name:'档案移交申请详情',
                            params:{
                                id:row.id
                            }
                            })
                      }
                    
                  }

                //  this['$router'].push({
                //         path:'/selfTip/transfer/transferDetail',
                //         name:'档案移交申请详情',
                //         params:{
                //             id:row.id
                //         }
                //         })
                    
            }
            MoveShenfindDetails(row){//档案员权限申请 详情
                console.log(row);
                if(row.type == 0){
                    if(row.status == "3"){
                        let shenqiId = row.id;
                        window.sessionStorage.setItem('SchaneShenTransDetail',JSON.stringify(shenqiId));
                        this['$router'].push({
                        path:'/selfTip/shenTransDetail/chaneShenTransDetail',
                        name:'档案员权限开通修改',
                        params:{
                            id:row.id
                        }
                        })
                         
                    }else{
                        let shdetailId = row.id;
                        window.sessionStorage.setItem('SDchaneShenTransDetail',JSON.stringify(shdetailId));
                        this['$router'].push({
                        path:'/selfTip/shenTransDetail/shenTransDetail',
                        name:'档案员权限开通',
                        params:{
                            id:row.id
                        }
                        })
                    }
                   
                }else if(row.type == 1){
                    if(row.status == "3"){
                        let bids = row.id;
                        window.sessionStorage.setItem('PchangPersonTransDetail',JSON.stringify(bids));
                        this['$router'].push({
                        path:'/selfTip/shenTransDetail/changPersonTransDetail',
                        name:'档案员变更申请修改',
                         params:{
                            id:row.id
                        }
                        })
                    }else{
                        let bgids = row.id;
                        window.sessionStorage.setItem('BDbiantransDetail',JSON.stringify(bgids));
                        this['$router'].push({
                        path:'/selfTip/shenTransDetail/biantransDetail',
                        name:'档案员变更查看',
                        params:{
                            id:row.id
                        }
                        })
                    }
                      
                }
            }
            // 筛选
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            };
            dataCheckeds(){//移交检索
                     Service.TransSearch({
                    	title:this.filters.fondName,
                        page:this.page,
                        pageSize:this.limit,
                        sort:"transferApplyDate desc",
                        status:this.vals,
                        beginTime:this.filters.createDateStart,
                        endTime:this.filters.createDateEnd
                }).then(res=>{
                        this.documentTableData = res.data.data;
                })
 
            }
            dataCheckedsQuan(){//全宗检索
                     Service.findFondColumn({
                    	title:this.filtersQuan.fondName,
                        page:this.pageQuan,
                        pageSize:this.limitQuan,
                        sort:"createDate desc",
                        type:this.valsQuan,
                        endTime:this.filtersQuan.createDateEnd,
                        beginTime:this.filtersQuan.createDateStart
                }).then(res=>{
                        this.borrowTableData = res.data.data;
                        this.totalquan = res.data.totalRecords;
                        
                })
 
            }
            dataCheckedsDang(){//档案员的检索
                if(this.filtersDang.createDateEnd == ''){
                    this.bbb = ''
                }else{
                    var aaa =new Date(this.filtersDang.createDateEnd).toLocaleDateString()
                    this.bbb = aaa.replace(/\//g,'-')
                }
                Service.findAllList({
                        title:this.filtersDang.fondName,
                        status:this.valsDang,
                        page:this.pageDang.toString(),
                        pageSize:this.limitDang.toString(),
                        applyTime:this.bbb
                    }).then(res=>{
                        console.log(res.data.data)
                        console.log(this.shenData)
                        this.shenData = res.data.data.businessResult;
                        this.dangtotal = res.data.data.totalNumber;
                        // this.valsDang = ""
                    })

            }
            // 表格初始化
             getFiles(num){
                 num = this.vals
               Service.transferLookup({
                   	page:this.page,
                    pageSize:this.limit,
                    sort:"transferApplyDate desc",
                    status:num
               }).then(res=>{
                    this.documentTableData = res.data.data;
                    this.total = res.data.totalRecords;
               })
             };
             //全宗列表
              getFilesquan(num){
                 num = this.valsQuan
               Service.findFondColumn({
                    type:num,
                    title:"",
                    page:this.pageQuan,
                    pageSize:this.limitQuan,
                    sort:"createDate desc"
               }).then(res=>{
                    this.borrowTableData = res.data.data;
                    this.totalquan = res.data.totalRecords;
               })
             };
               //档案员列表
              getFilesDang(num){
                 num = this.valsDang
                 console.log(num)
               Service.findAllList({
                    status:num,
                    title:"",
                    page:this.pageDang.toString(),
                    pageSize:this.limitDang.toString(),
                    applyTime:''
               }).then(res=>{
                    this.shenData = res.data.data.businessResult;
                    this.dangtotal = res.data.data.totalNumber;
                        

               })
             };
             // 切换移交申请和创建全宗申请 档案员权限申请
             handleClick(tab){
                 if(tab.name == 0){
                    // this.getFiles(this.vals)
                     Service.transferLookup({
                        page:this.page,
                        pageSize:this.limit,
                        sort:"transferApplyDate desc",
                        status:this.vals
                        }).then(res=>{
                            this.documentTableData = res.data.data;
                            this.total = res.data.totalRecords;
                        })
                    this.documentList = true;
                    this.borrowList = false;
                    this.dangQuanShen = false;
                    this.DAList = false;
                    // alert("移交"+this.vals)
                 }else if(tab.name == 1) {
                    this.documentList = false;
                    this.borrowList = true;
                    this.dangQuanShen = false;
                    this.DAList = false;
                    // alert("全宗"+this.valsQuan)
                      Service.findFondColumn({
                        type:this.valsQuan,
                        title:"",
                        page:this.pageQuan,
                        pageSize:this.limitQuan,
                        sort:"createDate desc"
                    }).then(res=>{
                        this.borrowTableData = res.data.data;
                        this.totalquan = res.data.totalRecords;
                    })
                 }else if(tab.name == 2 ){
                    this.dangQuanShen = true;
                    this.documentList = false;
                    this.borrowList = false;
                    this.DAList = true;
                    // alert("档案"+this.valsDang)
                    Service.findAllList({
                        title:"",
                        status:this.valsDang,
                        page:this.pageDang.toString(),
                        pageSize:this.limitDang.toString(),
                        sort:"createDate desc",
                        applyTime:''
                    }).then(res=>{
                        console.log(res.data.data)
                        this.shenData = res.data.data.businessResult;
                        this.dangtotal = res.data.data.totalNumber;
                    })
                 }
                //  this.page = 1;
                //  this.start = 0;
                //  this.getFiles();
             };
             MoveTab(mTab){//移交申请的切换
                if(mTab.name == 0){//已通过
                    this.bohui = false;
                    this.passDetail = true;
                    this.filters.fondName = ''
                    this.filters.createDateEnd = ''
                    this.filters.createDateStart = ''
                    Service.transferLookup({
                   	page:this.page,
                    pageSize:this.limit,
                    sort:"transferApplyDate desc",
                    status:2
               }).then(res=>{
                    this.documentTableData = res.data.data;
                    this.total = res.data.totalRecords;
                    this.vals= 2;
               })
                }else if(mTab.name == 1){//审批中
                     this.bohui = false;
                     this.passDetail = true;
                    this.filters.fondName = ''
                    this.filters.createDateEnd = ''
                    this.filters.createDateStart = ''
                    Service.transferLookup({
                        page:this.page,
                        pageSize:this.limit,
                        sort:"transferApplyDate desc",
                        status:1
                }).then(res=>{
                        this.documentTableData = res.data.data;
                        this.vals= 1;
                        this.total = res.data.totalRecords;
                })
                }else if(mTab.name == 2){//已驳回
                    this.bohui = true;
                    this.passDetail = false;
                    this.filters.fondName = ''
                    this.filters.createDateEnd = ''
                    this.filters.createDateStart = ''
                Service.transferLookup({
                   	page:this.page,
                    pageSize:this.limit,
                    sort:"transferApplyDate desc",
                    status:3
               }).then(res=>{
                    this.documentTableData = res.data.data;
                    this.vals = 3;
                    this.total = res.data.totalRecords;
               })
                }else if(mTab.name == 3){//已结束
                    this.filters.fondName = ''
                    this.filters.createDateEnd = ''
                    this.filters.createDateStart = ''
                      Service.transferLookup({
                        page:this.page,
                        pageSize:this.limit,
                        sort:"transferApplyDate desc",
                        status:4
               }).then(res=>{
                    this.documentTableData = res.data.data;
                    this.total = res.data.totalRecords;
                     this.vals= 4;
               })
                     this.bohui = false;
                     this.passDetail = true;
                }else if(mTab.name == 4){//全部
                    this.filters.fondName = ''
                    this.filters.createDateEnd = ''
                    this.filters.createDateStart = ''
                    Service.transferLookup({
                        page:this.page,
                        pageSize:this.limit,
                        sort:"transferApplyDate desc",
                        status:0
               }).then(res=>{
                    this.documentTableData = res.data.data;
                    this.total = res.data.totalRecords;
                    this.bohui = false;
                    this.passDetail = true;
                    this.vals= 0;
               })
                    // this.bohui = false;
                    // this.passDetail = true;
                    // this.vals= 0;
                     
                }             
            }
            quanTab(qTab){//创建全宗
                 if(qTab.name == 0){//已通过
                    this.bohuiQuan = false;
                    this.quanDetail = true;
                        Service.findFondColumn({
                        type:"2",
                        title:"",
                        page:this.pageQuan,
                        pageSize:this.limitQuan,
                        sort:"createDate desc"
                    }).then(res=>{
                        this.borrowTableData = res.data.data;
                        this.totalquan = res.data.totalRecords;
                        this.valsQuan = 2;
                    })
                }else if(qTab.name == 1){//审批中
                     this.bohuiQuan = false;
                     this.quanDetail = true;
                     Service.findFondColumn({
                        type:"1",
                        title:"",
                        page:this.pageQuan,
                        pageSize:this.limitQuan,
                        sort:"createDate desc"
                    }).then(res=>{
                        this.valsQuan = 1;
                        this.totalquan = res.data.totalRecords;
                        this.borrowTableData = res.data.data;

                    })
                }else if(qTab.name == 2){//已驳回
                    this.bohuiQuan = true;
                    this.quanDetail = false;
                        Service.findFondColumn({
                        type:"3",
                        title:"",
                        page:this.pageQuan,
                        pageSize:this.limitQuan,
                        sort:"createDate desc"
                    }).then(res=>{
                        this.borrowTableData = res.data.data;
                        this.valsQuan = 3;
                        this.totalquan = res.data.totalRecords;

                    })
                }else if(qTab.name == 3){//已结束
                        Service.findFondColumn({
                        type:"4",
                        title:"",
                        page:this.pageQuan,
                        pageSize:this.limitQuan,
                        sort:"createDate desc"
                    }).then(res=>{
                        this.borrowTableData = res.data.data;
                        this.valsQuan = 4;
                        this.totalquan = res.data.totalRecords;

                    })
                     this.bohuiQuan = false;
                     this.quanDetail = true;
                }else if(qTab.name == 4){//全部
                    Service.findFondColumn({
                        type:"0",
                        title:"",
                        page:this.pageQuan,
                        pageSize:this.limitQuan,
                        sort:"createDate desc"
                    }).then(res=>{
                        this.borrowTableData = res.data.data;
                        this.valsQuan = 0;
                        this.totalquan = res.data.totalRecords;

                    })
                     this.bohuiQuan = false;
                     this.quanDetail = true;
                }  
            }
            QuanXianTab(xTab){//档案员权限申请
                if(xTab.name == 0){//已通过
                    this.shenDetail = true;
                    this.shenbohui = false;
                    Service.findAllList({
                        title:this.filtersDang.fondName,
                        status:'2',
                        page:this.pageDang.toString(),
                        pageSize:this.limitDang.toString(),
                        applyTime:''
                    }).then(res=>{
                        this.shenData = res.data.data.businessResult;
                        this.dangtotal = res.data.data.totalNumber;
                        this.valsDang = "2"
                    })
                }else if(xTab.name == 1){//审批中
                    this.shenDetail = true;
                    this.shenbohui = false;
                    Service.findAllList({
                        title:"",
                        status:"1",
                        page:this.pageDang.toString(),
                        pageSize:this.limitDang.toString(),
                        applyTime:''
                    }).then(res=>{
                        this.shenData = res.data.data.businessResult;
                         this.dangtotal = res.data.data.totalNumber;
                        this.valsDang = "1"
                    })

                }else if(xTab.name == 2){//已驳回
                    this.shenDetail = false;
                    this.shenbohui = true;
                    Service.findAllList({
                        title:"",
                        status:"3",
                        page:this.pageDang.toString(),
                        pageSize:this.limitDang.toString(),
                         applyTime:''
                    }).then(res=>{
                        this.shenData = res.data.data.businessResult;
                        this.dangtotal = res.data.data.totalNumber;
                        this.valsDang = "3"
                    })
                }else if(xTab.name == 3){//已结束
                    this.shenDetail = true;
                    this.shenbohui = false;
                    Service.findAllList({
                        title:"",
                        status:"4",
                        page:this.pageDang.toString(),
                        pageSize:this.limitDang.toString(),
                         applyTime:''
                    }).then(res=>{
                        this.shenData = res.data.data.businessResult;
                        this.dangtotal = res.data.data.totalNumber;
                        this.valsDang = "4"
                    })
                }else if(xTab.name == 4){//全部
                    this.shenDetail = true;
                    this.shenbohui = false;
                    Service.findAllList({
                        title:"",
                        status:"",
                        page:this.pageDang.toString(),
                        pageSize:this.limitDang.toString(),
                        applyTime:''
                    }).then(res=>{
                        console.log(res.data.data)
                        console.log(this.shenData)
                        this.shenData = res.data.data.businessResult;
                        this.dangtotal = res.data.data.totalNumber;
                        this.valsDang = ""
                    })
                }  
            }
             findBorrowDetails(row){
                 console.log(row)
                let searchKey = row;
                if('实体借阅' == row){
                    this['$router'].push({
                        path:'/selfTip/transfer/transferDetail',
                        name:'档案移交申请详情',
                        params:{ id: searchKey }
                    });
                }else if('电子借阅' == row){
                    this['$router'].push({
                        path:'/selfTip/borrowDetails/electronBorrowDetails',
                        name:'电子借阅单详情',
                        params:{ id: searchKey }
                    });
                }
             };
        //路由的拦截
        beforeRouteEnter(to,from,next){
            next(vm=>{
                if(from.name=='档案移交申请详情'){
                 vm.getFiles(vm.vals)
                }else if(from.name=='档案移交申请修改'){
                    vm.getFiles(vm.vals)
                }else if(from.name == '相关档案的跨全宗移交' ||from.name == '相关档案的跨全宗修改'){
                    vm.getFiles(vm.vals)
                }else if(from.name == '档案全宗申请修改'){
                    vm.getFilesquan(vm.valsQuan);
                }else if(from.name == '档案全宗详情'){
                    vm.getFilesquan(vm.valsQuan);
                }else if(from.name == '档案员权限开通'){
                    vm.getFilesDang(vm.valsDang);
                }else if(from.name == '档案员变更查看'){
                    vm.getFilesDang(vm.valsDang);
                }else if(from.name == '档案员权限开通修改'){
                    vm.getFilesDang(vm.valsDang);
                }else if(from.name == '档案员变更申请修改'){
                    vm.getFilesDang(vm.valsDang);
                }
            })
        };

        created(){
                 var objs={}
                 window.sessionStorage.setItem('contrastItem1',JSON.stringify(objs));
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight =( document.documentElement.clientHeight-290)/2;
                })()
            };
            //  this.getFiles(2);
            Service.transferLookup({
                   	page:this.page,
                    pageSize:this.limit,
                    sort:"transferApplyDate desc",
                    status:2
               }).then(res=>{
                    this.documentTableData = res.data.data;
                    this.total = res.data.totalRecords;
                    this.vals = 2;
               })
        };
        computed: {
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/transfer.scss';
</style>