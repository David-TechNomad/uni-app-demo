<template>
    <section class="wrapprSection addPreCleanView">
        <div class="mainTitle">
           <span>档案资源清洗</span>
           <div class="rt">
               <el-button class="defaultBtn mt10" @click="goBack">返回</el-button>
                <el-button class="defaultBtn mt10" @click="addPreCleanSetVisible = true">开始预清洗</el-button>       
           </div>
        </div>        
        <div class="treeOne tree ">
            <div class="treeCon boxshow icontree">
                    <el-tree class="filter-tree" 
                            :data="treedata001"                                                 
                            node-key="id"                           
                             @node-click="handleNodeClick" 
                            ref="tree">
                            <span slot-scope="{ node,data}">
                                <span>{{ node.label }}</span>
                                <span style="color:red">(234件/5卷)</span>
                            </span>
					           </el-tree>              
            </div>
        </div>
        <div class="fileShowView boxshow">
            <p>所有档案馆</p>
             <el-table :height="bodyHeight" :show-header="false" :data="mockList.mackDataObj.res" highlight-current-row v-loading="listLoading" class="defaultTable">
                <el-table-column  prop="name">
                </el-table-column>
            </el-table>
        </div>
        <div class="contentbox boxshow"> 
                    <!-- <div class="TabRBtn tabRtext" v-if="activeName=='Ingroupfile'">
                        <b class="lt">案卷题名：档案号445656666</b>
                    </div>     -->
                    <p>选择需要进行资源清洗的全宗</p>
                    <div class="retrievalView">
                        <el-form  :inline="true" :model="filters" class="doneForm topParamsForm">
                            <el-form-item label="检索：">
                            <el-input placeholder="单行输入" size="small"></el-input>
                            <i class="el-icon-search absolute cur-p t13 r10"></i>
                            </el-form-item>
                            <div class="clear"></div>
                        </el-form>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="padding-left:20px">
                        <el-form-item prop="checkedType" class="superSearchChecked">
                            <div>
                                <el-checkbox label="元数据必填项检测" name="type"></el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="档号中档案门类代码检测" name="type"></el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="时间格式检测" name="type"></el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="元数据必填项检测" name="type"></el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="元数据必填项检测" name="type"></el-checkbox>
                            </div>
                            <div>
                                <el-checkbox label="元数据必填项检测" name="type"></el-checkbox>
                            </div>
                        </el-form-item>
                </el-form>          
        </div>

        <!-- //开始预清洗弹框-->
        <el-dialog
          title="预清洗完成"
          :visible.sync="addPreCleanSetVisible"
         :closeOnClickModal="false"
         :closeOnPressEscape="false"
          width="30%"
          :before-close="handleClose" class="taskStatusDialog">
            <div style="padding: 10px 0 0 0px;" class="ta-c">
                共产生45条清洗结果！请及时处理
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addPreCleanSetVisible = false" class="defaultBtn">确 定</el-button>
            </span>
        </el-dialog> 
     </section>
</template>
<script lang="ts">
   	import { Vue, Component } from 'vue-property-decorator'
    import Service from './addPreClean.service' 
    import mockData from '@/mock/data/mockData';
    @Component()
    export default class arrange extends Vue{ 
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 202 ; 
        addPreCleanSetVisible:Boolean = false;
        radio3: string = '1';
        treedata001: any = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      activeName:string = 'file';
      tableData: any =[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };       
        constructor(){
            super();
            this.mockList = mockData;
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        goBack() {
            this['$router'].go(-1);//返回上一层
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };
        gotopage(page){            
            this.$router.push({path:'/fileArrange/arrange/'+page});
        }; 
        showMgroup(){ 
          this.$nextTick(() => {
            this.$refs['yijuanDialogRef'].yijuanVisible = true;           
          });
        };      
        showAddFiles(){ 
          this.$nextTick(() => {
            this.$refs['addFilesDialogRef'].addFilesVisible = true;           
          });
        };
        showBatchEdit(){
            this.$nextTick(() => {
              this.$refs['batchEditDialogRef'].batchEditVisible = true;           
            });
        };
        showBatchMount(){
            this.$nextTick(() => {
              this.$refs['batchMountDialogRef'].batchMountVisible = true;           
            });
        };
        fileSelected(row){         
           this.activeName='Ingroupfile';
           
        };  
         DataImporterExport(params){
            Service.DataImporterExport(params).then(res=>{
                console.log(res)
                if(res){
                    if(res['type']=='application/json'){
                        this.getError('所选文件无电子原文！');
                    }else{
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            if(params['isAtta']=='2'){
                                window.navigator.msSaveOrOpenBlob(csvData,params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                window.navigator.msSaveOrOpenBlob(csvData,excelName+'.'+params['type']);
                            };
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            if(params['isAtta']=='2'){
                                link.setAttribute('download',params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                link.setAttribute('download',excelName+'.'+params['type']);
                            };
                            document.body.appendChild(link);
                            link.click();
                         }

                    }
                }
            });
        }    
        created(){            
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 202;
                })()
            };
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../../../styles/innerPublic.scss';
    .addPreCleanView /deep/ .tree{
        top:-8px;
    }
    .addPreCleanView{
        .fileShowView{
            width: 300px;
            left: 270px;
            position: absolute;
            top: 50px;
            background: #fff;
            padding: 10px;
        }
        .contentbox.boxshow{
                left: 575px;
                background: #fff;
                padding: 10px;
                .retrievalView {
                    padding: 15px 0 5px 20px;
                }
            }
    }

</style>
