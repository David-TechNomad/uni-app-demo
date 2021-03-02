<template>
	<div>
		<el-dialog title="批量修改" :visible.sync="batchEditVisible" class="myDialogCenter batchEditDialogView" :close-on-click-modal="false" :before-close="beforeCloseReset" width='40%'>
			<el-tabs v-model="replaceName" type="card" class="erpTab">                                                  
				<el-tab-pane label="按内容替换" name="content" >
					<el-form :model="form" label-width="120px">
						<el-form-item label="著录项 : ">
							<el-select v-model="form.region" class="longInput" @change="elSelectChange">
								<el-option v-for='ind in addArray' :label="ind.caption" :value="ind.fieldName" :key="ind.fieldName"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="要替换的值 :">
							<el-input v-model.trim="form.replaceValue" class="longInput" v-show="ElSelectTrue"></el-input>
							<el-select v-model="form.replaceValue" class="longInput" v-show="!ElSelectTrue">
								<el-option v-for='ind in formSelectArr' :label="ind.text" :value="ind.code" :key="ind.code"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="替换为 :">
							<el-input v-model.trim="form.replaceTo" class="longInput" v-show="ElSelectTrue"></el-input>
							<el-select v-model="form.replaceTo" class="longInput" v-show="!ElSelectTrue">
								<el-option v-for='ind in formSelectArr' :label="ind.text" :value="ind.code" :key="ind.code"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="按位置替换" name="position">
					<el-form :model="Addrform" label-width="120px" class="position">
						<el-form-item label="著录项 :" label-width="140px">
							<el-select v-model="Addrform.region" placeholder="请选择" class="longInput">
								<el-option v-for="item in addArrayPositon" :label="item.caption" :value="item.fieldName" :key="item.fieldName" v-if="item?item.type!=3:true"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="要替换的字符位置 :" class="shortInput" label-width="140px">
							<el-col :span="11">
								<el-input v-model.trim="Addrform.startNumber"></el-input>
							</el-col>
							<el-col class="line" :span="2">至</el-col>
								<el-col :span="11">
								<el-input v-model.trim="Addrform.endNumber"></el-input>
							</el-col>
						</el-form-item>
						<!-- <el-form-item label="要替换的字符位置 :" >
							<el-input v-model.trim="Addrform.startNumber"></el-input>
							<span class="textView">至</span>
							<el-input v-model.trim="Addrform.endNumber"></el-input>
						</el-form-item> -->
						<el-form-item label="替换为 :" label-width="140px">
							<el-input v-model="Addrform.replaceTo" class="longInput"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane> 
				<el-tab-pane label="合并著录项" name="merge">
					<el-form :model="combineform" label-width="120px">
						<el-form-item label="著录项A :">
							<el-select v-model="combineform.itemA" placeholder="请选择" class="longInput">
								<el-option v-for='item in addArray' :label="item.caption" :value="item.fieldName" :key="item.fieldName"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="连接符 :">
							<el-input v-model.trim="combineform.connectSign" class="longInput"></el-input>
						</el-form-item>
						<el-form-item label="著录项B :">
							<el-select v-model="combineform.itemB" placeholder="请选择" class="longInput">
								<el-option v-for='item in addArray' :label="item.caption" :value="item.fieldName" :key="item.fieldName"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="合并到著录项 :">
							<el-select v-model="combineform.concatTo" placeholder="请选择" class="longInput">
								<el-option v-for='item in addArray' :label="item.caption" :value="item.fieldName" :key="item.fieldName" v-if="item?item.type!=3:true"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-tab-pane>
						
			</el-tabs> 
			<div slot="footer" class="dialog-footer">
				<el-button class="defaultBtn" @click="SaveReplace">保存</el-button>
				<el-button class="defaultBtn" @click="beforeCloseReset">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './batchEditDialog.service';
    @Component
    export default class addFilesDialog extends Vue{
        batchEditVisible: boolean = false;
        isbatchEditloading: boolean = false;
        libId:number;
		tree:any = {};
		form:any={};
		formArr: any = [];
		Addrform:any={};
		addArr: any = [];
		combineform:any={};
		archiveAgentCode:string = '';
		combineArr: any = [];
		selectionIDs: any = [];
		batchEditfile: any = {};
		ElSelectTrue:boolean;//控制按内容替换的输入项的显隐
        batchEditArray: any = [];
        bxdqData: any = [];
        daqzhData: any = [];
		selection: any = [];
		addArray : any = [];
		formSelectArr:any = [];//按内容替换的下拉列表
		addArrayPositon: any = [];
		addfile:any={};
		replaceName:string = 'content';
		// @Prop({}) 
        // func: Function;
		formStyle: any = {
            "height": '400px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
		constructor(){
			super();
			this.addArray = [];
			this.addArrayPositon = [];
			this.addfile = {};
			this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
			this.form={
                region:null,
                replaceValue:null,
                replaceTo:''
            };
			this.formArr=[];
			this.formSelectArr = [];
			this.ElSelectTrue = true;
            this.Addrform={
                region:null,
                startNumber:null,
                endNumber:null,
                replaceTo:''
            };
            this.addArr=[];
            this.combineform={
                itemA:null,
                connectSign:null,
                itemB:null,
                concatTo:null
            };
            this.combineArr=[];
        }
        showDialog () {
            if(this.batchEditVisible){
				this.getdaqzhData();
                this.getTable()
            }
        }
        beforeCloseReset() {
			this.batchEditVisible = false;
		};
        // 加载表格
        getTable(){
        	this.isbatchEditloading = true;
			Service.getEditDeploy({
				libId: this.libId,
				conditionId: this.tree.conditionId,
				phase: 4,
				treeId: this.tree.id
			}).then(res => {
				if(res.data.succeeded) {
					this.$nextTick(()=>{
						this.addArray = res.data.data;
						this.batchEdit = {};
						for(var item of res.data.data) {
							this['$set'](this.batchEdit, item.fieldName, item.defaultValue ? item.defaultValue : null);
						};
						this.batchEdit.DAQZH = this.tree.fondCode;
						this.isbatchEditloading = false;
						this.$refs.batchEdit.$el.scrollTop = 0;
					});

				} else {
					this.getError(res.data.errorMessage)
				}
			})   
        }
        setUseValue(fieldName,setFieldName,dictDatas){
            let value = this.batchEdit[fieldName];
            for(let i in dictDatas){
                if(value == dictDatas[i].code){
                    this.batchEdit[setFieldName] = dictDatas[i].useValue;
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
			if(this.addfile.BXDW != undefined) {
				this.addfile["SHBM"] = node.id
			}
		}

		//获取部门数据
		getBMData(parentId, isEmpty) {
			if(isEmpty) {
				this.batchEdit["BM"] = null;
				this.batchEdit["SHBM"] = null;
			}
			this.bmData = [];
			//给全宗赋值
			for(let i in this.daqzhData) {
				if(this.daqzhData[i].orgId == parentId) {
					this.$set(this.batchEdit, "DAQZH", this.daqzhData[i].fondCode)
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
		//按内容替换著录项发生改变
        elSelectChange(data){
            this.form.replaceValue = null;
            this.form.replaceTo = '';
            for(var item of this.addArray){
                if(item.fieldName==data){
                    if(item.dictData && item.dictData.length !== 0){
                        this.formSelectArr=[];
                        this.formSelectArr = item.dictData;
                        this.ElSelectTrue=false;
                    }else{
                        this.ElSelectTrue=true;
                    }
                };
            };
        };
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
		//保存替换
        SaveReplace(){
			let self = this;
                if (self.replaceName == 'content') {
                    if(self.form.region!=null){
						// 批量挂接按内容
						let formObj = {};
						formObj.archiveAgentCode = this.archiveAgentCode;
						formObj.ids = this.selectionIDs;
						formObj.mode = 1;
						formObj.libId = this.libId;
						formObj.fieldName = this.form.region;
						formObj.replaceSrc = this.form.replaceValue;
						formObj.replaceWith = this.form.replaceTo;
						Service.BatchModify(formObj).then(res => {
							if(res.data.succeeded) {
								self.Suces("修改成功。");
								self.batchEditVisible = false;
								self.$parent.search();
							} else {
								self.getError(res.data.errorMessage)
							}
						})
                    }else{
                        this.Warn('请选择著录项。');
                    }
                } else if (this.replaceName == 'position') {
                    if(this.Addrform.region!=null){
                        // 批量挂接按位置
						let AddrformObj = {};
						AddrformObj.archiveAgentCode = this.archiveAgentCode;
						AddrformObj.ids = this.selectionIDs;
						AddrformObj.mode = 2;
						AddrformObj.libId = this.libId;
						AddrformObj.fieldName = this.Addrform.region;
						AddrformObj.fieldName = this.Addrform.region;
						AddrformObj.replaceStartPos = this.Addrform.startNumber;
						AddrformObj.replaceEndPos = this.Addrform.endNumber;
						AddrformObj.replaceWith = this.Addrform.replaceTo;
                            Service.BatchModify(AddrformObj).then(res => {
								if(res.data.succeeded) {
									this.Suces("修改成功。");
									this.batchEditVisible = false;
									self.$parent.search();
								} else {
									this.getError(res.data.errorMessage)
								}
							})
                    }else{
                        this.Warn('请选择著录项。')
                    }

                } else if (this.replaceName == 'merge') {
                    if(this.combineform.itemA!=null){
                        // 批量挂接按著录项
						let combineformObj = {};
						combineformObj.archiveAgentCode = this.archiveAgentCode;
						combineformObj.ids = this.selectionIDs;
						combineformObj.mode = 3;
						combineformObj.libId = this.libId;
						combineformObj.fieldName = this.combineform.itemA;
						combineformObj.fieldName2 = this.combineform.itemB;
						combineformObj.connector = this.combineform.connectSign;
						combineformObj.targetFieldName = this.combineform.concatTo;
                            Service.BatchModify(combineformObj).then(res => {
								if(res.data.succeeded) {
									this.Suces("修改成功。");
									this.batchEditVisible = false;
									self.$parent.search();
								} else {
									this.getError(res.data.errorMessage)
								}
							})
                    }else{
                        this.Warn('请选择著录项A。');
                    };
                };
        };
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
		//取得可批量修改的字段
        getBatchModifiableFields(params){
			let self = this;
            // this.form={region:null,replaceValue:null,replaceTo:''};
            // this.Addrform={region:null,startNumber:null,endNumber:null,replaceTo:''};
            // this.combineform={itemA:null,connectSign:null,itemB:null,concatTo:null};
            // if(this.selection.length>0&&this.activeName=='first'||this.selection2.length>0&&this.activeName=='second'||this.selection3.length>0&&this.activeName=='third') {
                Service.getBatchModifiableFields(params).then(res => {
					console.log(res);
                    if (res.data.succeeded) {
                        // var data = JSON.stringify(res.data.data)
                        // this.formArr = JSON.parse(data);
						self.addArray=res.data.data;
						self.addArrayPositon = self.addArray.filter(function(item,index,array){
                                if(item.type !== 3) {
                                    return item;
                                }
                            });
						this.addfile={};
						for(var item of res.data.data){
							//this.addfile[item.fieldName]='';
							this['$set'](this.addfile,item.fieldName,null)
						};
                        // this.repalceMany = true;
                    } else {
                        self.getError(res.data.errorMessage)
                    }
                })
            // }else{
            //     this.Warn("请选择要修改的文件。")
            // }
        };
 		created(){ 
                //取得可批量修改的字段
            //    this.getBatchModifiableFields({"libId":1});
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
    .batchEditDialogView{
		.btnView {
			margin-top: 10px;
		}
		.el-form-item{
			margin-top: 20px;
			.el-select {
				width: 100%;
			}
		}
	}
</style>