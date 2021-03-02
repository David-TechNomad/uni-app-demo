<template>
	<div>
		<el-dialog title="批量挂接" :visible.sync="taskDetailVisible" class="myDialogCenter batchMountDialogView" :close-on-click-modal="false" :before-close="beforeCloseReset" >
			<div :style="formStyle">
				<div class="taskDetailList">
					<span class="showText">匹配成功100条数据，挂接成功98条</span>
					<div class="mainCon basicList bgwhite">
                           <el-table
                                :data="processTypeData"
                                border
                                element-loading-text="努力加载中..."
                                header-row-class-name="tableHeader" 
                                stripe 
                                class="defaultTable">
                                <el-table-column prop="name" label="文件名称">
                                </el-table-column>
                                <el-table-column prop="name" label="导入状态">                                      
                                </el-table-column>
                            </el-table>
                         <!--工具条分页-->
                        <div class="clear" style="margin-top:10px">                         
                                        <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="page"
                                        :page-sizes="[100, 200, 300, 400]"
                                        :page-size="100"
                                        layout="total, sizes, prev, next, jumper"
                                        :total="400">
                                        </el-pagination>
                                    </div>
                    </div>
				</div>
			</div>
			
			<div slot="footer" class="dialog-footer">
				<el-button class="defaultBtn" @click="beforeCloseReset">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from '@/views/fileArrange/fileManagement/fileManagement.service';
    @Component
    export default class addFilesDialog extends Vue{
        taskDetailVisible: boolean = false;
        istaskDetailloading: boolean = false;
		libId:number = 0;
		percentage:number = 0;
        tree:any = {};
        batchEditfile: any = {};
        batchMountArray: any = [];
        bxdqData: any = [];
        daqzhData: any = [];
		selection: any = [];
        labelPosition: String = 'top';
        processTypeData: any = [{
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
        },{
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
		formStyle: any = {
            "height": Number(document.documentElement.clientHeight-112)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
        @Watch('addFilesVisible')
        showDialog () {
            if(this.taskDetailVisible){
				this.getdaqzhData();
                this.getTable()
            }
        }
        beforeCloseReset() {
			this.taskDetailVisible = false;
			this.$refs['batchMount'].resetFields();
        };
        handleNodeClick(data){//点击子节点
             
        };
        // 加载表格
        getTable(){
        	this.istaskDetailloading = true;
			Service.getEditDeploy({
				libId: this.libId,
				conditionId: this.tree.conditionId,
				phase: 4,
				treeId: this.tree.id
			}).then(res => {
				if(res.data.succeeded) {
					this.$nextTick(()=>{
						this.addArray = res.data.data;
						this.taskDetail = {};
						for(var item of res.data.data) {
							this['$set'](this.taskDetail, item.fieldName, item.defaultValue ? item.defaultValue : null);
						};
						this.taskDetail.DAQZH = this.tree.fondCode;
						this.istaskDetailloading = false;
						this.$refs.taskDetail.$el.scrollTop = 0;
					});

				} else {
					this.getError(res.data.errorMessage)
				}
			})   
        }
        setUseValue(fieldName,setFieldName,dictDatas){
            let value = this.taskDetail[fieldName];
            for(let i in dictDatas){
                if(value == dictDatas[i].code){
                    this.taskDetail[setFieldName] = dictDatas[i].useValue;
                    break;
                }
            }

        }
        //获取单位数据
		getBXDWData() {
			Service.getListByParentId(1).then(res => {
				if(res.data.succeeded) {
					this.bxdqData = res.data.data;

				} else {
					this.getError(res.data.errorMessage)
				}
			})

		}
		changeSHBM(node) {
			if(this.taskDetail.BXDW != undefined) {
				this.taskDetail["SHBM"] = node.id
			}
		};
		percentageFn() {
				if(this.percentage >=100 ) {
					clearInterval(percentage);
				}
				this.percentage ++;
			
		};
		uploadFile() {
			let progressnuw =0;
			var timer=setInterval(()=>{ 
				//变量一直++      
			     progressnuw +=2.5;      
			 	//清楚定时器      
			 	if(progressnuw>=100){  
		      		clearInterval(timer);
				}   
			  	//获取重新赋值      
				this.percentage=progressnuw; 
			},30)
		};
		toTaskList(){
			this['$router'].push({
					path:"/fileArrange/arrange/batchMount/taskList",
				})
		};
		//获取部门数据
		getBMData(parentId, isEmpty) {
			if(isEmpty) {
				this.taskDetail["BM"] = null;
				this.taskDetail["SHBM"] = null;
			}
			this.bmData = [];
			//给全宗赋值
			for(let i in this.daqzhData) {
				if(this.daqzhData[i].orgId == parentId) {
					this.$set(this.taskDetail, "DAQZH", this.daqzhData[i].fondCode)
					break;
				}
			}
			Service.findOrgTreeByParentId(parentId).then(res => {
				if(res.data.succeeded) {
					this.bmData = res.data.data;
				} else {
					this.getError(res.data.errorMessage)
				}
			})
		}
		//获取档案所属全宗号数据
		getdaqzhData() {
			this.daqzhData = [];
			Service.findFondsAll().then(res => {
				if(res.data.succeeded) {
					this.daqzhData = res.data.data;
				} else {
					this.getError(res.data.errorMessage)
				}
			})
		}
		//案卷保存
		saveFiles(){
			
			this.$refs['addfile']['validate']((valid) => {
				if(valid) {
					this.isbatchMountloading = true;
					this.batchMount.rowStatus = 1;
					Service.SaveDossier({
						libId: this.libId,
						phase: 4,
						data: this.batchMount
					}).then(res => {
						if(res.data.succeeded) {
							this.Suces("保存成功");
							this.isbatchMountloading = false; 
							/*this.addfile = {};
							this.$refs['addfile'].resetFields();*/
							this.beforeCloseReset();
							this.$emit('refreshList');
						} else {
							this.getError(res.data.errorMessage)
						}
					})
				} else {
					this.Warn('请完善内容!');
				};
			});
		}
        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };
        //请求失败
        getError(message) {
            this["$message"]({
                message,
                type: 'error'
            });
        };
        //警告信息
        Warn(message) {
            this['$message']({
                type: 'warning',
                message
            });
        };

		mounted(){
            window.onresize = () => {
                return (() => {
                    this.formStyle = {
                        "height": Number(document.documentElement.clientHeight - 112)+'px' ,
						"overflow-y": 'auto',
						"padding":'20px 10px 0 15px'
                    };
                })()
            }; 
        };
}
</script>
<style lang="scss" scoped>
   
</style>