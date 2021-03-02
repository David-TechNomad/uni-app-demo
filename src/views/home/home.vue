<template>
	<section class="mainCon">
		<div class="mainPanel">                
				<el-form :model= "wordFilters"  class="keywordForm">
                    <el-form-item>   
                        <!-- <div class="searchTitle">快速检索</div> -->
                    </el-form-item>
					<el-form-item  ref="word">  
                        <el-input placeholder="请输入关键字" class="indexInput lt" v-model="wordFilters.word" @keyup.enter.native="getKeyword()"></el-input>                      
					
						<div class="rt">
							<el-button class="defaultBtn indexSearchBtn" @click="getKeyword()">目录检索</el-button>							
						</div>
					</el-form-item>				
				</el-form>
		</div>         
		<el-row class="mainTableList">          
			<el-col :span = "16">
				<el-row>
                     <el-col :span = "24">
                        <div class="TableListPanel">
                            <div class="TableLisTitle clear">						
                                <p class="lt text textBlue">快捷操作</p>                              
                            </div>	
                            <div class="TableLisBody TableLisBodyF" >
                                <p>
                                    <el-button class="defaultBtn" @click="topage('/myBorrow/borrowApply/borrowApply')">填写借阅单</el-button>
                                     <!-- <el-button class="defaultBtn" @click="topage('/myBorrow/borrow')">我的查阅单</el-button> -->
                                    <span class="line" v-if="roleId.indexOf('30')>-1 || roleId.indexOf('40')>-1 || roleId.indexOf('42')>-1 || roleId.indexOf('52')>-1 || roleId.indexOf('93')>-1"> </span>
                                    <el-button class="defaultBtn" @click="topage('/system/userManagement/userManagement')" v-if="roleId.indexOf('40')>-1">受理登记</el-button>
                                    <el-button class="defaultBtn" @click="topage('/myBorrow/helpBorrow/helpBorrowMgnt')" v-if="roleId.indexOf('40')>-1">受理登记查询</el-button>
                                    <el-button class="defaultBtn" @click="topage('/myBorrow/myHelpSearchAndApply/myHelpSearchAndApply')" v-if="roleId.indexOf('40')>-1">协查办理</el-button>
                                    <el-button class="defaultBtn" @click="topage('/myBorrow/handleBorrowApply/handleApply')" v-if="roleId.indexOf('42')>-1 || roleId.indexOf('40')>-1">查阅审批</el-button>
                                    <el-button class="defaultBtn" @click="topage('/myIdentify/myIdentifyMgnt')" v-if="roleId.indexOf('30')>-1 ">鉴定申请</el-button>
                                    <el-button class="defaultBtn" @click="topage('/myIdentify/handleMyIdentify/handleMyIdentify')" v-if="roleId.indexOf('52')>-1">鉴定审批</el-button>
                                    <el-button class="defaultBtn" @click="topage('/myBorrow/borrowerHistory/borrowBackMgnt')" v-if="roleId.indexOf('93')>-1">出入库管理</el-button>  
                                </p>                       
                            </div>			
                        </div>
                    </el-col>
                    <el-col :span = "24">
                        <div class="TableListPanel">
                            <div class="TableLisTitle clear">						
                                <p class="lt text textBlue">我的查阅单</p>
                                <span class="more rt" @click="FileMore1">更多 ></span>
                            </div>	
                            <div class="TableLisBody TableLisBodyT">
                                 <el-table
                                        :data="tableData"
                                        border
                                        element-loading-text="努力加载中..."
                                        v-loading="listLoading" 
                                        header-row-class-name="tableHeader" 
                                        stripe  
                                        height="182"
                                        class="defaultTable">
                                        <!-- <el-table-column type="selection"  width="55">
                                        </el-table-column> -->
                                        <el-table-column  prop="name" label="操作"  width="65">
                                            <template slot-scope="scope">                                                 
                                            <el-button class="tabletoolBtn" @click="showDetail(scope.row)">详情</el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="applicationNo" label="查阅单号">
                                        </el-table-column>
                                        <el-table-column prop="fileNum" label="文档数量" width="80">                                      
                                        </el-table-column>
                                        <el-table-column prop="receptionName" label="接待机构">                                      
                                        </el-table-column>                                      
                                        <el-table-column prop="appDate" label="申请日期" :formatter="dateFormat" width="90">                                      
                                        </el-table-column>
                                        <el-table-column prop="appEndDate" label="查阅结束日期" :formatter="dateFormat" width="110">                                      
                                        </el-table-column>
                                        <el-table-column prop="auditStatus" label="状态" width="80">  
                                           <template slot-scope="scope">                                                 
                                                <span v-if="scope.row.auditStatus ==1">部分通过</span>
                                                <span v-if="scope.row.auditStatus ==2">审批中</span>
                                                <span v-if="scope.row.auditStatus ==4">已驳回</span>
                                                <span v-if="scope.row.auditStatus ==6">全部通过</span>
                                            </template>                                  
                                        </el-table-column> 
                                    </el-table>
                            </div>			
                        </div>
                    </el-col>
                </el-row>
			</el-col>
			<el-col :span = "8">
				<div class="TableListPanel">
					<div class="TableLisTitle clear">						
						<p class="lt text ">公告栏</p>
                        <span class="more rt" @click="FileMore2">更多 ></span>
					</div>
                    <div class="TableLisBody TableLisBodytS" element-loading-text="努力加载中..." v-loading="listLoading">
					   <ul>
                           <li v-for="itme,index in messagerList"><p class="listTitle lt"><span class="liIcon">●</span>
                           <a @click="showCon(itme.id)">{{itme.title}}</a></p></li>
                       </ul>
						
					</div>
				</div>
			</el-col>
           
			<!-- <el-col :span = "8">
				<div class="TableListPanel">
					<div class="TableLisTitle clear">						
						<p class="lt text ">下载中心</p>
                        <span class="more rt" @click="FileMore3">更多 ></span>
					</div>
                    <div class="TableLisBody TableLisBodytS" v-loading="downlistLoading">
					     <ul>                        
                               <li v-for="itme,index in downList" v-if="index<5"><p class="listTitle lt" ><span class="liIcon">●</span>{{itme.downloadFileName}}</p> <a class="down rt" @click="downLoad(itme.id,itme.serverSaveFilename)">下载</a></li>
                         </ul>
						
					</div>
				</div>
			</el-col> -->
		</el-row>

		
		<el-dialog class="fileModal" title="通知" :visible.sync="fileVisible" :close-on-click-modal="true">
			<ul>
				<li>标题：{{showCons.title}}</li>				
				<li v-if="showCons.attachmentName">附件： <i class="fa fa-paperclip tableIcon cur-p" @click="downEnclosure(showCons.attachmentName)" ></i> </li>
			</ul>
		</el-dialog>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue'
    import Component from 'vue-class-component'
    import Service from './home.service' 
    import moment from 'moment';
    @Component
    export default class AppHome extends Vue {		
        bodyHeight: number = (document.documentElement.clientHeight-105)*0.45-76; ;       
        searchLoading: boolean= false;
        fileVisible: boolean= false;
        wordFilters: any = { word:'' };
        fileId: string = '';
        listLoading: boolean= false;      
        messagerList: any = [];       
        downList: any = [];
        downlistLoading: boolean= false;  
        showCons:any = {};       
        query:string =''; 
        tableData: any =[];
        roleId:any = [];
		constructor(){
            super();                
		}       
		//查看公告
		showCon(itme){
            // this.fileVisible = true;
            // this.showCons = itme;
            this['$router'].push({
                path:'/interacting/notice/noticeDetail',
                name:'公告中心详情',
                params:{ id: itme}
            });
        };
        //获取公告栏
        gerList(){
            this.listLoading=true;
            Service.getAnnouncementList({endPublishTime: null,page: 0,pageSize: 10,prePublishTime: null,publishedStatus: 1,publisher: null,title: null}).then((res) =>{
                if(res.data.succeeded){
					this.messagerList = res.data.data;				
                }else{
                    this['$message']({
                        message: '公告栏获取失败',
                        type: 'error'
                    });
                }
                this.listLoading=false;
            }) 
        };
        // 下载列表
		getFile(){           
            this.downlistLoading=true;
            Service.getDownloadFile({"publishStatus":1,"fileCategory": "0"}).then((res) =>{
                if(res.data.succeeded){
					this.downList = res.data.data;
                }else{
                    this['$message']({
                        message: '加载下载列表失败！',
                        type: 'error'
                    });
                }
                 this.downlistLoading=false;
            })
		};

        // 跳转关键字检索
        getKeyword():void{            
            if(this.wordFilters.word){
                this.query = this.wordFilters.word
			};          
            this['$router'].push({
                path:'/retrieve/superSearch/superSearch',
                name:'高级检索',
                params:{ word: this.query}
            });
        };

        // 下载
        downLoad(id,fileId){
              let self = this;
              self['$confirm']('您是否要下载文件?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {               
                if(id) {
                  window.location.href = process.env.API_BASEURL + '/downloadInfo/download?fileId='+fileId+'&id='+id
                } else {
                  self.Warn('文件不存在！');
                }
              });
        };
         downEnclosure(id) {
                let self = this;
                self['$confirm']('您是否要下载附件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  if(id) {
                    window.location.href = process.env.upload_BASEURL + '/file/simple/download?fileId='+id+''
                  } else {
                    self.Warn('附件不存在！');
                  }
                });
        }
       showDetail(row){
            window.sessionStorage.setItem("borrow_activeName", 1);
            window.sessionStorage.setItem('borrowDetail_applicationNo', row.applicationNo);
            window.sessionStorage.setItem('borrowDetail_returnPath', "/home/home");
            this['$router'].push({
                path:"/myBorrow/borrowDetail/borrowDetail",
            })
        };
        //更多
        lotMore(){
            this['$router'].push({
                path:'@/views/home/lotMore',
                name:'更多',
            });
        }
        //文档更多
        FileMore1(){
            this['$router'].push({ path:'/myBorrow/borrow'});
        };
         FileMore2(){
            this['$router'].push({ path:'/interacting/notice/notice'});
        };
         FileMore3(){
            this['$router'].push({path:'/interacting/down/down'});
        };
        topage(pathstr){
            this['$router'].push({path:pathstr});
        };
        queryResult(){
            let params = {
                page: 0,
                pageSize: 5,
                auditStatus: 0
            };
            this.listLoading = true;
            Service.queryMyUtilize(params).then(res=>{
                if(res.data.succeeded){                   
                    this.tableData = res.data.data.content;                    
                }
                this.listLoading = false;
            });
        };
         dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYYMMDD");
        };
        mounted(){
            this.gerList();
            // this.getFile();
            this.queryResult()
        };
        created(){
            this.roleId = window.sessionStorage.getItem("roleIds");
        };
    }
</script>

<style lang="scss" scoped>
	@import '../../styles/home/home.scss';
</style>