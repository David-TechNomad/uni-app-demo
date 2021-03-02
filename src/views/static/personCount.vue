<template>
    <section>
      <div class="mainTitle">相关人员统计</div>
        <div class="HaveTree">
            <div class="treeTitle">
                <el-form :inline="true" :model="treeFilters" class="topParamsForm superLeftForm">
                    <el-form-item v-for="" class="title" label="" ref="title">
                        <el-select class="checkName" v-model="treeFilters.title" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethodfond" :loading="searchLoading">
                            <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="searchBtn">
                        <el-button class="checkWay" @click="entersearch">定位公司</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="treeFather">
                <el-tree node-key="id"
                         :data="treeData"
                         ref="treeku"
                         highlight-current
                         accordion
                         :default-expanded-keys="defaultLeftOpen"
                         :props="defaultProps"
                         v-loading="treeLoading"
                         @node-click="handleNodeClick"
                         >
                </el-tree>
            </div>
        </div>
      <div v-show="mainShow" class="mainDoc">
          <div class='mainCon mainBorrow mainBorrowTops'>
              <div class='formData'>
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="当前在任人员统计" name="0">
                    </el-tab-pane>
                     <el-tab-pane label="人员变更统计" name="1">
                    </el-tab-pane>
                </el-tabs>
                  <!-- 当前在任人员统计 检索条件 -->
                <el-form v-show="livePerson"  :inline="true" :model="liveFilters" class="doneForm topParamsForm">
                    <el-form-item label="角色：" class="SelectItem checkName">
                        <el-select  v-model="liveFilters.role" placeholder="请选择角色" @change="selectGet" style="width:85%">
                             <el-option v-for="item in selectList" :label="item.roleName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  class="fondName" label="全宗名：" >
                            <el-input class="checkName" v-model="liveFilters.fondName" placeholder="单行输入"></el-input>
                    </el-form-item>
                     <el-form-item  class="fondName" label="人员姓名：" >
                            <el-input class="checkName" v-model="liveFilters.name" placeholder="单行输入"></el-input>
                    </el-form-item>
                      <el-form-item  class="fondName" label="万信号：" >
                            <el-input class="checkName" v-model="liveFilters.number" placeholder="单行输入"></el-input>
                    </el-form-item>
                        <el-form-item>
                            <el-button class="checkWay"  @click="liveCheck">检索</el-button>
                        </el-form-item>
                </el-form>
                <div v-show="livePerson" style="float:right;margin:5px 0 5px 0">
                    <el-button class="checkWay"  @click="LivedaoLive">导出</el-button>
                </div>
                <!-- 人员变更统计 检索条件 -->
                <el-form v-show="changePerson"  :inline="true" :model="filters" class="doneForm topParamsForm">
                    <el-form-item label="角色：" class="SelectItem checkName">
                        <el-select v-model="filters.role" placeholder="请选择角色" @change="selectGet1" style="width:85%">
                              <el-option v-for="item in selectList" :label="item.roleName" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  class="fondName" label="全宗名：" >
                            <el-input class="checkName" v-model="filters.fondName" placeholder="单行输入"></el-input>
                    </el-form-item>
                     <el-form-item  class="fondName" label="人员姓名：" >
                            <el-input class="checkName" v-model="filters.name" placeholder="单行输入"></el-input>
                    </el-form-item>
                      <el-form-item  class="fondName" label="万信号：" >
                            <el-input class="checkName" v-model="filters.number" placeholder="单行输入"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" v-show="changePerson">
                    <el-form-item class="year" label="变更时间：" ref="year">
                            <el-date-picker type="date" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" ref="startDate" placeholder="开始日期" class="checkName" v-model="filters.createDateStart"></el-date-picker>
                            <span style="margin:0 10px">至</span>
                            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="checkName" placeholder="结束日期" v-model="filters.createDateEnd" ref="endDate"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="checkWay"  @click="dataCheckeds">检索</el-button>
                    </el-form-item>
                    <el-form-item style="float:right;margin:5px 0 5px 0">
                        <el-button class="checkWay"  @click="daoLive">导出</el-button>
                    </el-form-item>
                </el-form>
              </div>
              <!-- 在任人员统计 -->
              <div class="borderTable" v-show="livePerson">
                    <el-table border stripe :height="bodyHeight-65" :data="liveData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column   label="序号" type='index'>
                        </el-table-column>
                        <el-table-column prop="fondsName" label="全宗名">
                        </el-table-column>
                        <el-table-column prop="fondsCode" label="全宗号">
                        </el-table-column>
                        <el-table-column  prop="roleName" label="角色">
                        </el-table-column>
                        <el-table-column  prop="userName" label="姓名">
                        </el-table-column>
                        <el-table-column   prop="loginName" label="万信号">
                        </el-table-column>
                        <el-table-column   prop="tel" label="手机号">
                        </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
              <!-- 变更人员统计 -->
              <div class="borderTable" v-show="changePerson">
                    <el-table border stripe :height="bodyHeight-75" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column  type="index" label="序号">
                        </el-table-column>
                        <el-table-column prop="fondsName" label="全宗名">
                        </el-table-column>
                        <el-table-column  prop="roleName" label="角色">
                        </el-table-column>
                        <el-table-column  prop="newUserName" label="变更前人员姓名">
                        </el-table-column>
                        <el-table-column   prop="newLoginName" label="变更前人员万信号">
                        </el-table-column>
                        <el-table-column  prop="oldUserName" label="变更后人员姓名">
                        </el-table-column>
                        <el-table-column   prop="oldLoginName" label="变更后人员万信号">
                        </el-table-column>
                        <el-table-column   prop="createDate" label="变更时间">
                        </el-table-column>
                    </el-table>
                    <!--工具条分页-->
                    <el-col :span="24" class="pager">
                        <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total1" style="float:right;">
                        </el-pagination>
                    </el-col>
                </div>
          </div>
      </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    import Service from './personCount.service';
    import { Loading } from 'element-ui';
    import moment from 'moment';
    @Component
    export default class personCount extends Vue{
        windowHeight: number;
        bodyHeight:number;
        start:number;
        page:number;
        limit:number;
        total:number;
        start1:number;
        page1:number;
        limit1:number;
        total1:number;
        listLoading:boolean;
        activeName: number;
        livePerson:boolean;
        changePerson:boolean;
        filters:any = {};//变更人员 查询
        liveFilters:any = {};//再任人员 查询
        personValue:string;
        documentTableData:any = [];
        liveData:any = []
        selectList:any = [];
        personValue1:any = '';
        treeFilters:any={};
        searchOptions:any=[];
        searchLoading:boolean;
        treeLoading:boolean;
        defaultLeftOpen:any=[];
        defaultProps:any={};
        treeData:any=[];
        fondId:number;
        mainShow:boolean;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight-250;
            this.start = 0;
            this.total = 0;//总条数
            this.page = 0;//移交页码
            this.limit = 25;
            this.start1 = 0;
            this.total1 = 0;//总条数
            this.page1 = 0;//移交页码
            this.limit1 = 25;
            this.listLoading = false;
            this.activeName = 0;
            this.livePerson = true;
            this.changePerson = false;
            this.filters = {
                'role':'',
                'fondName':'',
                'name':'',
                'number':'',
                'createDateStart':'',
                'createDateEnd':''
            }
            this.liveFilters = {
                'role':'',
                'fondName':'',
                'name':'',
                'number':'',
                'createDateStart':'',
                'createDateEnd':''

            };
            this.personValue = '';
            this.personValue1 = '';
            this.liveData = [];
            this.selectList = [];
            this.treeFilters={
                title:''
            };
            this.searchOptions=[];
            this.searchLoading = false;
            this.treeLoading = false;
            this.defaultLeftOpen=[];
            this.defaultProps={
                children: 'children',
                label: 'fondName',
                id:'id'
            };
            this.treeData =[];
            this.fondId = null;
            this.mainShow = false;
        };
        handleNodeClick(data){
            this.fondId = data.id;
            this.treeFilters.title = '';
            this.filters = {
                'role':'',
                'fondName':'',
                'name':'',
                'number':'',
                'createDateStart':'',
                'createDateEnd':''
            };
            this.liveFilters = {
                'role':'',
                'fondName':'',
                'name':'',
                'number':'',
                'createDateStart':'',
                'createDateEnd':''

            };
            this.livePerson = true;
            this.changePerson = false;
            this.getFile();
        }
        // 远程搜索项目
        remoteMethodfond(query) {
            if (query !== '') {
                this.searchLoading = true;
                Service.getKeyName(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.searchOptions = data.map(item => {
                            return { value: item.id, label:item.fondName};
                        });
                        setTimeout(() => {
                            this.searchLoading = false;
                            this.searchOptions = this.searchOptions.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
                        this['$message']({
                            message: '查询全宗联想错误！',
                            type: 'error'
                        });
                    }
                });

            } else {
                this.searchOptions = [];
            }
        }
        entersearch(){
            if(this.treeFilters.title!=''){
                this.defaultLeftOpen = [];
                this.fondId = this.treeFilters.title;
                this.defaultLeftOpen.push(this.treeFilters.title);
                this.$nextTick(function(){
                    this['$refs']['treeku']['setCurrentKey'](this.treeFilters.title);
                });
                this.filters = {
                    'role':'',
                    'fondName':'',
                    'name':'',
                    'number':'',
                    'createDateStart':'',
                    'createDateEnd':''
                };
                this.liveFilters = {
                    'role':'',
                    'fondName':'',
                    'name':'',
                    'number':'',
                    'createDateStart':'',
                    'createDateEnd':''

                };
                this.livePerson = true;
                this.changePerson = false;
                this.getFile();
            }
        }
        //切换在任和变更人员
        handleClick(tab){
            if(tab.name == 0){
                this.livePerson = true;
                this.changePerson = false;
                this.getFile();
            }else if(tab.name == 1){
                this.livePerson = false;
                this.changePerson = true;
                this.changeFile();
            }

        }
        handleSizeChange(val){
            this.limit = val;
            this.start = val*(this.page);
            this.getFile()
        }
        handleCurrentChange(val){
            this.page = val-1;
            this.start = (val-1)*(this.limit);
            this.getFile();
        }
        //变更人员
        handleSizeChange1(val){
            this.limit1 = val;
            this.start1 = val*(this.page1);
            this.changeFile();
        }
        handleCurrentChange1(val){
            this.page1 = val-1;
            this.start1 = (val-1)*(this.limit1);
            this.changeFile();
        }
        //在任人员角色选择
        selectGet(value){
            this.personValue = value;
        }
        //变更人员角色选择
        selectGet1(value){
            this.personValue1 = value;
        }
        //在任人员检索
        liveCheck(){
            this.getFile();
        }
        //变更人员检索
        dataCheckeds(){
            this.changeFile();
        }
        created() {
            Service.getFondRoleList({}).then(res=>{
                this.selectList = res.data.data;
            })
        }
        changeFile(){
            // 变更任人员统计
            if(this.filters.role == ''){
                this.filters.role = null;
            }
            let params = {
                "roleId":this.filters.role,
                "fondsName":this.filters.fondName,
                "userName":this.filters.name,
                "loginName":this.filters.number,
                "createBegin":this.filters.createDateStart,
	            "createEnd":this.filters.createDateEnd,
                "page":this.page1,
                "pageSize":this.limit1,
                fondsId: this.fondId
            }
            Service.getFondsUserUpdateRecordList(params).then(res=>{
                var arr = res.data.data;
                for(var son of arr){
                    var newTime = new Date(son.createDate);
                    console.log(newTime)
                    son.createDate = newTime.getFullYear()+'-'+newTime.getMonth()+'-'+newTime.getDay()+' '+newTime.getHours()+':'+newTime.getMinutes()+':'+newTime.getSeconds();
                }
                this.documentTableData = arr;
                this.total1 = res.data.totalRecords;
            })
        }
        getFile(){
            // 当前在任人员统计
            if(this.liveFilters.role == ''){
                this.liveFilters.role = null;
            }
            let params = {
                "roleId":this.liveFilters.role,
                "fondsName":this.liveFilters.fondName,
                "userName":this.liveFilters.name,
                "loginName":this.liveFilters.number,
                "page":this.page,
                "pageSize":this.limit,
                fondsId:this.fondId
            };
            Service.getCurrentFondsUserList(params).then(res=>{
                this.mainShow = true;
                this.liveData = res.data.data;
                this.total = res.data.totalRecords;
            })

        }
        //在任人员导出
        LivedaoLive(){
            Service.exportCurrentFondsUserList({
                "roleId":this.liveFilters.role,
                "fondsName":this.liveFilters.fondName,
                "userName":this.liveFilters.name,
                "loginName":this.liveFilters.number,
                fondsId:this.fondId
            }).then(res=>{
                console.log(res)
                if (res) {
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            window.navigator.msSaveOrOpenBlob(csvData, name + '.');
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            link.setAttribute('download', '在职人员.xlsx');
                            document.body.appendChild(link);
                            link.click();
                        };
                    
                }

            })
        }
        //变更人员导出
        daoLive(){
            Service.exportFondsUserUpdateRecordList({
                "roleId":this.filters.role,
                "fondsName":this.filters.fondName,
                "userName":this.filters.name,
                "loginName":this.filters.number,
                "createBegin":this.filters.createDateStart,
	            "createEnd":this.filters.createDateEnd,
                fondsId:this.fondId
            }).then(res=>{
                   if (res) {
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            window.navigator.msSaveOrOpenBlob(csvData, name + '.');
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            link.setAttribute('download', '变更人员.xlsx');
                            document.body.appendChild(link);
                            link.click();
                        };
                }
            })
        }
        //警告信息
        Warn(message: string) {
            this['$message']({
                type: 'warning',
                message
            });
        };

        //请求失败
        getError(message: string) {
            this["$message"]({
                message,
                type: 'error'
            });
        };

        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };
        mounted(){
            this.treeLoading = true;
            Service.getAllFondsTreeData({}).then((res) =>{
                this.treeLoading = false;
                if(res.data.succeeded){
                    this.treeData = res.data.data;
                }else{
                    this['$message']({
                        message: '树节点数据错误！',
                        type: 'error'
                    });
                }
            });
        window.onresize = () => {
            return (() => {
                this.bodyHeight = document.documentElement.clientHeight-250;
            })()
        };
    };
    }
</script>

<style scoped lang="scss">
@import '../../styles/static/personCount.scss';
</style>