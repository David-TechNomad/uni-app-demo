<template>
	<div>
		<el-dialog title="批量挂接" :visible.sync="batchMountVisible" class="myDialogCenter batchMountDialogView" :close-on-click-modal="false" :before-close="beforeCloseReset" >
			<div :style="formStyle">
				<el-form label-width="152px" ref="batchMount" v-loading="isbatchMountloading"  element-loading-text="努力加载中..." >
					<el-form-item label="选择挂接规则:" label-width="100px">
						<el-select class="checkName" v-model="ConcateType" placeholder="请选择" @change = "changeType">
							<el-option v-for="item in ConcateObj" :key="item.id" :label="item.ruleName" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<p style="font-size:12px;color:red;margin-top: 10px;">备注说明：{{commit}}</p>
				<div class="treeConView">
					<label>选择云盘目录:</label>
					<div class="treeCon boxshow icontree" style="max-height: 290px;overflow-y: auto;">
						<el-tree
                                :load="loadNodeTree"
                                node-key="id"
                                lazy
                                :props="defaultProps"
                                :expand-on-click-node="true"
                                :render-content="renderContent" 
                                @node-click = "setDataToTrees"
                                :default-expanded-keys="defaultTreeOpen">
                            </el-tree>            
					</div>
				</div>
				<div class="mt10">
					<el-checkbox v-model="removeSrcFile">挂接后删除云盘原文</el-checkbox>
					<el-checkbox v-model="removeEmptyDir">挂接后删除空文件夹</el-checkbox>
				</div>
				<div class="upLoadView">
					<!-- <span class="showText">所选云盘暂无原文，请先上传原文</span>
					<el-button type="primary" class="el-button defaultBtn rt" @click="touploadFile">上传原文</el-button>					
					<div class="progressViewContent">
						<div class="progressView lt">
							<el-progress :text-inside="true" :stroke-width="15" :percentage="percentage"></el-progress>
						</div>
						<el-button type="primary" class="el-button defaultBtn rt" @click="toTaskList">查看任务列表</el-button>
						<div class="clear"></div>
					</div> -->
					<div class="ConcateTreeDown" style="overflow-y: auto;">
						<div v-if="existFile&&!matchedFileCount" style="padding:10px;">
							所选云盘共 <span style="font-size:15px;color:green;">{{dec}}</span> 份原文,请先匹配原文
							<el-button class="el-button defaultBtn rt" @click="checkOldFiles">匹配原文</el-button>
						</div>
						<div v-if="!existFile" style="padding:10px;">
							<span class="showText">所选云盘暂无原文，请先上传原文</span>
							<el-button class="el-button defaultBtn rt" @click="touploadFile">上传原文</el-button>
						</div>
						<div v-if="existFile&&matchedFileCount"  style="padding:10px;">
							<span class="showText"><span style="font-size:15px;color:green;">{{matchedFileCount}} 个文件匹配到了 {{matchedArchiveCount}} 个档案上</span> ,可以开始挂接</span>
							<el-button class="el-button defaultBtn rt" @click="checkOldFiles">匹配原文</el-button>
						</div>
						<div  style="padding:10px;" v-if="errorMacth&&errorMacth.length>0">
							<div class="borderTable">
								<el-table style="width: 100%" stripe :data="errorMacth" highlight-current-row class="indexTable containTable">
									<el-table-column prop="cloudFileName" label="文件名称" >
									</el-table-column>
									<el-table-column prop="matchCount" label="数量" >
									</el-table-column>
								</el-table>
							</div>
						</div>
                	</div>
				</div>
			</div>
			
			<div slot="footer" class="dialog-footer">
				<el-button class="defaultBtn" @click="beginCF">开始挂接</el-button>
				<el-button class="defaultBtn" @click="beforeCloseReset">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
	import Service from './batchMountDialog.service';
	import { Loading } from 'element-ui';
    @Component
    export default class addFilesDialog extends Vue{
        batchMountVisible: boolean = false;
        isbatchMountloading: boolean = false;
		libId:number;
		percentage:number = 0;
		tree:any = {};
		wenJianLibId :number;
        anJuanIds:any = {};
        isFirst:boolean;
		dec:number;  //批量挂接的描述
		ConcateType :string;//挂接类型
		batchEditfile: any = {};
		fromBatchMount:string = '';//判断是哪个页面挂接
		removeEmptyDir: boolean = false;//挂接后删除空文件夹
		removeSrcFile: boolean = false;//挂接后删除云盘原文
		bxdqData: any = [];
		defaultProps: any = {};
		defaultTreeOpen:any = [];
		treesId:number;
        daqzhData: any = [];
        Treeresolve:any = {};
        Treenode:any = {};
		archiveAgentCode: String ;
		ConcateObj:any = {};//挂接类型选择
		existFile: boolean; // 批量挂接树下文件夹是否有文件
        matchedFileCount:number;//匹配文件数
        matchedArchiveCount:number;//匹配档案数
		autoMatchParams:any={}; //自动匹配的参数
		errorMacth:any = [];//挂接文件列表
		taskId:number;//开始挂接ID
		riGuajie :boolean;
		defaultTreeOpenId: string = '';
		selection: any = [];
		selectionIDs: any = [];
		commit:string = '';
		labelPosition: String = 'top';
        treedata001: any = [];
		formStyle: any = {
            "height": Number(document.documentElement.clientHeight-320)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
		@Watch('addFilesVisible');
		
		constructor(){
			super();
			this.ConcateType = '';
			this.existFile =false;
			this.dec= 0; // 批量挂接的描述
            this.matchedFileCount = null;
            this.matchedArchiveCount = null;
			this.anJuanIds = null;
			this.riGuajie = false;
			this.errorMacth = [];
            this.treesId = 0;
            this.Treenode={};
            this.Treeresolve = {};
            this.isFirst = true;
			this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
			this.taskId = null;
			// this.defaultProps = {
            //     isLeaf: function(data, node){
			// 		return data.children!=null ?false:true
			// 	},
            //     label: 'name',
            //     id:'id'
			// };
			this.defaultProps = {
                isLeaf: 'hasChildren',
                label: 'name',
                id:'id'
            };
			this.autoMatchParams = {
				"mode":1,
				"phase":2,
                "wenJianLibId": Number,
                "anJuanIds": '',
				"cloudDirectoryId":Number,
				"matchRuleId":Number,
				"matchRuleId": '',
				"removeSrcFile":null,
				"removeEmptyDir":null
            };
			this.ConcateObj = {
                title:1,
                titleNum:2
            };
		};
        showDialog () {
            if(this.batchMountVisible){
				this.getdaqzhData();
                this.getTable()
            }
        }
        beforeCloseReset() {
			this.batchMountVisible = false;
			this.$refs['batchMount'].resetFields();
        };
		handleNodeClick(data){//点击子节点
			if(data.id){
				this.treesId = data.id;
				this.getLounTile();  
			} 
		};
		renderContent(createElement, { node, data,store }) {
            let that = this;
            return createElement(
                'span',
                {
                    attrs:{
                        'class':'custom-tree-node',
                    },
                    style:{
                        'padding': '11px 0',
                        // 'border-left':'3px solid #3c78d4'
                    }
                },
                [
                    createElement(
                        'i',
                        {
                            attrs:{
                                'class':data.className
                            },
                            style:{
                                'font-size': '12px',
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-left':'7px'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ],
            )
		};
		setDataToTrees(treeData){
            // // console.log(treeData)
			this.treesId = treeData.id;
			this.getFiles();
        };
		// 树结构下 文件夹中文件的总数
        getFiles():void{
            let self = this;
            Service.getFileCount(this.treesId).then((res) =>{
                if(res.data.succeeded == true){
                    let count = res.data.data;
                    if(count>0){
                        self.$nextTick(() => {
                            self.existFile = true
                            self.dec = count;
                        });
                    }else{
                        self.existFile = false
                    }

                }else{
                    self.getError(res.data.errorMessage);
                }
            })
		};
		// 懒加载树
        loadNodeTree(node,resolve) {
             if(this.isFirst){
                this.Treenode = node;
                this.Treeresolve = resolve;
                this.isFirst = false;
            }
            // this.Treenode1 = node;
            // this.Treeresolve1 = resolve;
            if(node.level === 0){
                // Service.getUserUrl({}).then((res) =>{
                    // // console.log(res.data)
                    // var LogonFondName = res.data.data.LogonFondName;
                    // if(res.data.succeeded){
                        let treeData = [];
                        var obj = {};
                        //判断是否显示三角
                        Service.gettersitle(0).then(res=>{
                            if(res.data.succeeded == true){
                                console.log(res.data.data)
                                if(res.data.data.length == 0){
                                    this.isshowPic = true;
                                    obj = {id:0,name:LogonFondName,hasChildren:this.isshowPic}
                                    treeData.push(obj);
                                    resolve(treeData);
                                }else{
                                    let treeData = [];
                                    let data = res.data.data;
                                    this.defaultTreeOpenId = res.data.data[0].id;
                                    this.defaultTreeOpen.push(this.defaultTreeOpenId);
                                    for(let child of data){
                                        let leaf = child.hasChildren
                                        child.isParentNode = child.hasChildren;
                                        child.hasChildren = !leaf;
                                    }
                                    data.forEach(item => {
                                        treeData.push(item)
                                        // // console.log(item)
                                    });
                                    console.log(treeData)
                                    resolve(treeData);
                                }
                            }
                        })
                       
                        // this.treesId = res.data.data[0].id;
                    // }else{
                    //     this['$message']({
                    //         message: '树节点数据错误。',
                    //         type: 'error'
                    //     });
                    // }
                // });
            }else{
                // this.treesId = node.data.id;
                Service.gettersitle(node.data.id).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        this.treesData = data;
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.isParentNode = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                            // // console.log(item)
                        });
                        if(node.level == 1){
                    
                        }else if(node.level == 2){
                          
                        }else if(node.level == 3){
                           
                        }else if(node.level == 4){
                            
                        }
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }
        };
		// 获取数信息
        getLounTile() {
            Service.gettersitle(this.treesId).then(res=>{
                if(res.data.succeeded == true){
                    console.log(res.data.data)
                    if(res.data.data.length !== 0){
                        this.treedata001 = res.data.data;
                    }else{
                        this['$message']({
                        message: '查询云盘库无数据！',
                        type: 'warning'
                       })
                    }
                }else{
                        this['$message']({
                        message: '查询云盘库失败！',
                        type: 'error'
                       })
                    }
            })
        }
		// 检测是否可以匹配
        checkOldFiles():void{
            // let params = {
            //     fondId: this.parentId,
            //     cloudDirectoryId: this.treesId
            // };
            // Service.checkIsFinished(params).then(res=>{
            //     if(res.data.succeeded){
            //         if(!res.data.data){
                        this.checkDeal();
            //         }else{
            //             this['$message']({
            //                 message: '所选云盘目录下已有挂接任务，请到任务列表的批量挂接中删除或启动任务！',
            //                 type: 'warning'
            //             });
            //         }
            //         // this.getUnarrangedFile({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent1,pageCondition:{page:1, pageSize:10,sort:""}});
            //         //    if(this.sortName2&&this.TypeChangeValue2){
            //         //        this.getUnarrangedFile({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
            //         //    }else{
            //         //        this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey:this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}});
            //         //    }
            //     }else{
            //         this['$message']({
            //             message: '检测匹配失败！',
            //             type: 'warning'
            //         });
            //     }
            // })
		};
		// 挂接匹配
        checkDeal():void{
            if(this.ConcateType){
                this.autoMatchParams = {
                    "wenJianLibId": this.wenJianLibId,
					"anJuanIds": this.anJuanIds,
					"archiveAgentCode":this.archiveAgentCode,
                    "cloudDirectoryId": this.treesId,
					"matchRuleId": this.ConcateType,
					"mode":this.autoMatchParams.mode,
					"phase":2,
					"removeSrcFile":this.removeSrcFile,
					"importTaskId":this.autoMatchParams.importTaskId || null,
					"removeEmptyDir":this.removeEmptyDir
                };
                // if(this.activeName=='four'){
                //     if(this.selection3.length>0){
                //         var arr = [];
                //         for(var son of this.selection3){
                //             arr.push(son.id);
                //         };
                //         this.autoMatchParams['searchType'] = 2;
                //         this.autoMatchParams['searchCondition'] = arr.join(',');
                //     }else{
                //         if(this.supervalue4.length>0){
                //             this.autoMatchParams['searchType'] = 1;
                //             this.autoMatchParams['searchCondition'] = this.supervalue4;
                //         }else{
                //             this.autoMatchParams['searchType'] = 1;
                //             this.autoMatchParams['searchCondition'] = null;
                //         }
                //     }
                // }else if(this.activeName=='second'){
                //     if(this.selection1.length>0){
                //         var arr = [];
                //         for(var son of this.selection1){
                //             arr.push(son.id);
                //         };
                //         this.autoMatchParams['searchType'] = 2;
                //         this.autoMatchParams['searchCondition'] = arr.join(',');
                //     }else{
                //         if(this.supervalue2.length>0){
                //             this.autoMatchParams['searchType'] = 1;
                //             this.autoMatchParams['searchCondition'] = this.supervalue2;
                //         }else{
                //             this.autoMatchParams['searchType'] = 1;
                //             this.autoMatchParams['searchCondition'] = null;
                //         }
                //     }
                // }else{
                //     if(this.selection2.length>0){
                //         var arr = [];
                //         for(var son of this.selection2){
                //             arr.push(son.id);
                //         };
                //         this.autoMatchParams['searchType'] = 2;
                //         this.autoMatchParams['searchCondition'] = arr.join(',');
                //     }else{
                //         if(this.supervalue3.length>0){
                //             this.autoMatchParams['searchType'] = 1;
                //             this.autoMatchParams['searchCondition'] = this.supervalue3;
                //         }else{
                //             this.autoMatchParams['searchType'] = 1;
                //             this.autoMatchParams['searchCondition'] = null;
                //         }
                //     }
                // }
                let loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '原文匹配中，请稍等',
                        // spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                Service.autoFileUp(this.autoMatchParams).then(res=>{
                    if(res.data.succeeded){
						console.log(res);
                        this.riGuajie = true;
                        this.taskId = res.data.data.taskId;
                        this.matchedFileCount = res.data.data.matchedFileCount;
                        this.matchedArchiveCount = res.data.data.matchedArchiveCount;
                        if(res.data.data.errorMatch&&res.data.data.errorMatch.length>0){
                            this.errorMacth = res.data.data.errorMatch;
                            if(!res.data.data.taskId){
                                this.Warn('一个原文匹配到多条目录数据，无法进行挂接。')
                            }
                        }else{
                            this.errorMacth = [];
                        }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                    this.$nextTick(() => { loadingInstance.close();});
                })
            }else{
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
		};
		// 开始挂接
        beginCF():void{
            if(this.ConcateType){
                if(this.riGuajie){
                    if(this.taskId){
                        let loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在挂接中，请稍候',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        Service.fileUpStart({taskId:this.taskId}).then(res=>{
                            if(res.data.succeeded){
                                this.$nextTick(() => {
                                    loadingInstance.close();
                                });
                                this['$alert']('原文挂接中,请到任务列表批量挂接中查看任务进度', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {this.toTaskList()}
                                });
                                // this['$message']({
                                //     message: '挂接成功！',
                                //     type: 'success'
                                // });                              
                                // this.CfSearch();
                                this.ConcateType = '';
                                this.Treenode.childNodes = [];
                                this.loadNodeTree(this.Treenode,this.Treeresolve);
                                this.existFile = false;
                                this.dec = 0 ;
                                this.matchedFileCount = null;
                                this.matchedArchiveCount = null;
                                this.removeSrcFile = false;
                                this.removeEmptyDir = false;
                                this.batchMountVisible = false;
                            }else{
                                this.$nextTick(() => {
                                    loadingInstance.close();
                                });
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else{
                        this['$message']({
                            message: '一个原文匹配到多条目录数据，无法进行挂接。',
                            type: 'warning'
                        });
                    }
                }else{
                    this['$message']({
                        message: '请先匹配原文！',
                        type: 'warning'
                    });
                }
            }else{
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
        };
		changeType(){
            for(let a of this.ConcateObj){
                if(a.id ===  Number(this.ConcateType)){
                    this.commit = a.comment
                }
            }
        };
        // 加载表格
        getTable(){
        	this.isbatchMountloading = true;
			Service.getEditDeploy({
				libId: this.libId,
				conditionId: this.tree.conditionId,
				phase: 4,
				treeId: this.tree.id
			}).then(res => {
				if(res.data.succeeded) {
					this.$nextTick(()=>{
						this.addArray = res.data.data;
						this.batchMount = {};
						for(var item of res.data.data) {
							this['$set'](this.batchMount, item.fieldName, item.defaultValue ? item.defaultValue : null);
						};
						this.batchMount.DAQZH = this.tree.fondCode;
						this.isbatchMountloading = false;
						this.$refs.batchMount.$el.scrollTop = 0;
					});

				} else {
					this.getError(res.data.errorMessage)
				}
			})   
        }
        setUseValue(fieldName,setFieldName,dictDatas){
            let value = this.batchMount[fieldName];
            for(let i in dictDatas){
                if(value == dictDatas[i].code){
                    this.batchMount[setFieldName] = dictDatas[i].useValue;
                    break;
                }
            }

		}
		//获取得批量挂接匹配规则下拉
		getMatchRules(libId) {
			Service.GetMatchRules({libId:libId}).then(res => {
				console.log(res);
				if(res.data.succeeded) {
					this.ConcateObj = res.data.data;
				}
			})
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
			if(this.batchMount.BXDW != undefined) {
				this.batchMount["SHBM"] = node.id
			}
		};
		uploadFile() {
			let progressnuw =0;
			var timer=setInterval(()=>{ 
				//变量一直++      
			     progressnuw +=10;      
			 	//清楚定时器      
			 	if(progressnuw>=100){  
		      		clearInterval(timer);
				}   
			  	//获取重新赋值      
				this.percentage=progressnuw; 
			},1000)
		};
		toTaskList(){
			this['$router'].push({
					path:"/common/bathMountDialog/batchMountTask/taskList",
				})
			this.batchMountVisible = false;
		};
		touploadFile() {
			this['$router'].push({
				path:"/fileArrange/newCloudManagement/cloudList/cloudList",
			})
			this.batchMountVisible = false;
		}
		//获取部门数据
		getBMData(parentId, isEmpty) {
			if(isEmpty) {
				this.batchMount["BM"] = null;
				this.batchMount["SHBM"] = null;
			}
			this.bmData = [];
			//给全宗赋值
			for(let i in this.daqzhData) {
				if(this.daqzhData[i].orgId == parentId) {
					this.$set(this.batchMount, "DAQZH", this.daqzhData[i].fondCode)
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
		created(){ 
			// 取得批量挂接匹配规则下拉
			// this.getMatchRules();
            // this.getFiles();
            this.fromBatchMount = this.$parent.fromBatchMount;
        };
		mounted(){
            window.onresize = () => {
                return (() => {
                    this.formStyle = {
                        "height": Number(document.documentElement.clientHeight - 200)+'px' ,
						"overflow-y": 'auto',
						"padding":'20px 10px 0 15px'
                    };
                })()
            }; 
        };
}
</script>
<style lang="scss" scoped>
    .batchMountDialogView{
		.el-form-item{
			margin-top: 10px;
			.el-select {
				width: 100%;
			}
		}
		.treeConView {
			margin-top: 15px;
			.treeCon {
				margin-top: 10px;
			}
		}
		.upLoadView {
			width: 100%;
			height: 150px;
			border: 1px solid rgb(215, 215, 215);
			margin-top: 15px;
			padding: 10px;
			border-radius: 2px;
			.showText{
				display: inline-block;
				height: 30px;
				line-height: 30px;
			}
			.progressViewContent{
				.progressView {
					width: 250px;
					margin-top: 20px;
				}
				.el-button {
					margin-top: 12px;
				}
			}
			
		}
	}
</style>