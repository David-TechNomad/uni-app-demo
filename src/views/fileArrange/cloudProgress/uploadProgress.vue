<template>
    <section>
        <!-- <div class="mainTitle">上传档案</div> -->
         <div class="titleBlue">
            <b></b>
            <span>上传档案</span>
        </div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow" style="padding:10px;">
                <div class="formData">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                        <el-tab-pane label="正在上传" name="0">
                        </el-tab-pane>
                        <el-tab-pane label="传输完成" name="1">
                        </el-tab-pane>
                    </el-tabs>
                    <el-button @click="deleteAllFileUploads()" class="el-button checkWay" style="position:absolute;right:317px;top:10px">全部清空</el-button>
                    <el-button @click="pauseAllFileUploads()" class="el-button checkWay" style="position:absolute;right:208px;top:10px">全部继续</el-button>
                    <el-button @click="pauseAllFileUploads()" class="el-button checkWay" style="position:absolute;right:100px;top:10px">全部暂停</el-button>
                    <el-button @click="goBack()" class="el-button checkWay" style="position:absolute;right:20px;top:10px">返回</el-button>
                </div>
                <!--列表(正在上传)-->
                <div class="borderTable" v-show="documentShow">
                    <el-table border tooltip-effect="dark" :height="bodyHeight" :data="documentTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column prop="originalFileName" label="文件名称">
                        </el-table-column>
                        <el-table-column prop="creationDate" :formatter="dateFormat1" label="上传时间">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="person" label="云盘位置">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="name" label="状态">
                            <template slot-scope="scope">
                                 <el-progress :text-inside="false" :stroke-width="18" :percentage="scope.row.progress" ></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="modifyRow(scope.row)">继续上传</span>
                            </template>
                        </el-table-column>
                    </el-table> 
                    <!--&lt;!&ndash;工具条分页&ndash;&gt;-->
                    <!--<el-col :span="24" class="pager" style="padding:15px 10px 10px 0">-->
                        <!--<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">-->
                        <!--</el-pagination>-->
                    <!--</el-col>-->
                </div>

                <!--列表(传输完成)-->
                <div class="borderTable" v-show="borrowShow">
                    <el-table border tooltip-effect="dark" :height="bodyHeight" :data="borrowTableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                        <el-table-column prop="originalFileName" label="文件名称">
                        </el-table-column>
                        <el-table-column prop="creationDate" :formatter="dateFormat1"  label="上传时间">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="person" label="云盘位置">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="name" label="状态">
                            <template slot-scope="scope">
                                <el-progress :text-inside="false" :stroke-width="18" :percentage="100" ></el-progress>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--&lt;!&ndash;工具条分页&ndash;&gt;-->
                    <!--<el-col :span="24" class="pager" style="padding:15px 10px 10px 0">-->
                        <!--<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">-->
                        <!--</el-pagination>-->
                    <!--</el-col>-->
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './uploadProgress.service';
    import moment from 'moment';
    import $ from 'jquery';
    // import JavaLargeFileUploader from 'static/uploadWS/fileuploadWS.js';
    @Component
    export default class appBorrowHistory extends Vue{
        windowHeight: number;
        bodyHeight: number;
        nameHeight: number;
        timer: boolean;
        listLoading: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        activeName: string;
        filters: any = {};
        files: any
        documentTableData: any = [];
        borrowTableData: any = [];
        powerTableData:any = [];
        fileList:any = [];//文件参数队列
        data: any = [];
        documentShow: boolean;
        borrowShow: boolean;
        powerShow: boolean;
        formSelect: boolean;
        formInput: boolean;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 190 ;
            this.nameHeight = null;
            this.timer = false;
            this.start = 0;
            this.total = 0;
            this.page = 1;
            this.limit = 25;
            this.activeName = '0';
            this.listLoading = false;
            this.documentShow = true;
            this.borrowShow = false;
            this.powerShow = false;
            this.formSelect = true;
            this.formInput = true;
            this.data = [];
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
                state:'',
                project:'',
                createDateStart:'',
                createDateEnd:'',
            };
            this.documentTableData = [

            ];
            this.borrowTableData = [

            ];
            this.powerTableData = [

            ]
        };
        // 表格内时间格式化
        dateFormat1(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };

        handleCurrentChange(val) {

            this.page = val;
            this.start = (val-1)*(this.limit);
            this.getFiles();
        };
        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page-1);
            this.getFiles();
        };
        goBack(){
             this['$router'].go(-1);
        }
        // 查询列表
        getFiles(){
            this.listLoading = true;
            Service.searchUpload({action: 'getConfig'}).then((res) =>{
                let params = res.data.pendingFiles;
                if(params!=={}){
                    let arr = [];
                    let att = [];
                    for(let i in params){
                        if(!params[i].fileComplete){
                            arr.push(params[i])
                        }else{
                            att.push(params[i])
                        }
                    }
                    arr.forEach(function(item){
                        item.progress = (item.fileCompletionInBytes/item.originalFileSizeInBytes)*100
                    });
                    this.documentTableData = arr;
                    this.borrowTableData = att;
                    this.listLoading = false;
                    console.log(this.files)
                    this.allDoneFiles();
                }else{
                    this.listLoading = false;
                }
            })
        };

        // 调用全部文件上传
        allDoneFiles(){
            let that = this;
            let arr = [];
            for(let i in this.fileList){
                arr.push(this.fileList[i])
            }
            if(arr.length>0){
                arr.forEach(function(item){
                    that.doneFiles(item)
                })
            }
        }

        // 断点续传文件条目
        doneFiles(item){
            let formData = new FormData();
            formData.append("action", 'upload');
            formData.append("file", '1');
            formData.append("crc:", '');
            formData.append("fileId",item);
            Service.doneUpload(formData).then(res=>{

            });
        }


        // 断点续传获取进度


        // 全部清空
        deleteAllFileUploads(){
            this['$confirm']('确认删除选中文件吗？', {
                type: 'warning'
            }).then(() => {
                Service.searchUpload({action: 'clearAll'}).then(() =>{
                    this.getFiles();
                    this['$message']({
                        message: '删除成功',
                        type: 'success'
                    });
                });
            });
        };

        handleClick(){
            if(this.activeName === '0'){
                this.documentShow = true;
                this.borrowShow = false;
                this.powerShow = false;
                this.formSelect = true;
                this.formInput = true;
            }else if(this.activeName === '1'){
                this.documentShow = false;
                this.borrowShow = true;
                this.powerShow = false;
                this.formSelect = false;
                this.formInput = true;
            }
            this.page = 1;
            this.start = 0;
            // this.getFiles();
        };

        // 修改
        modifyRow(row){

        };

        created(){
            this.fileList =  JSON.parse(window.sessionStorage.getItem('allFiles'));
            this.files =  JSON.parse(window.sessionStorage.getItem('files'));
        };

        mounted(){
            this.getFiles();
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 190;
                })()
            };
        };
        computed(){};
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/cloudProgress/uploadProgress.scss';
</style>