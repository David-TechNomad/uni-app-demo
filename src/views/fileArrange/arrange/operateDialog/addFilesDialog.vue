<template>
	<div>
		<el-dialog title="新增案卷" :visible.sync="addFilesVisible" class="myDialogCenter editAnJuan" :close-on-click-modal="false" :before-close="beforeCloseReset" >
			<el-form  :model="addfile" :style="formStyle" label-width="152px" ref="addfile" v-loading="isAddFilesloading"  element-loading-text="努力加载中..." >
				<template v-for="item in addArray">
					<el-form-item :label="item.caption+' :'" v-if="item.editControl==1">
						<el-button class="checkWay">{{item.caption}}</el-button>
					</el-form-item>
					<el-form-item :label="item.caption+' :'" v-else-if="item.editControl==2&&item.defaultValue==null" :prop="item.fieldName" :rules="[{ required:item.allowBlank, message:' ',trigger:'blur'}]">
						<el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
					</el-form-item>
					<el-form-item :label="item.caption+' :'" v-else-if="item.editControl==10" :prop="item.fieldName" :rules="[{  required:item.allowBlank,message:' ',trigger:'blur'}]">
						<el-date-picker :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
					</el-form-item>
					<el-form-item :label="item.caption+' :'" v-else-if="item.editControl==8" :prop="item.fieldName" :rules="[{required:item.allowBlank,message:' ',trigger:'blur'}]">
						<el-input :readonly="!item.allowEdit" v-model.number="addfile[item.fieldName]" type="number" :maxlength="item.maxLength" min="0" @keydown.native="inputchange($event,item.allowEdit)"></el-input>
					</el-form-item>
					<el-form-item :label="item.caption+' :'" v-else-if="item.editControl==3" :prop="item.fieldName" :rules="[{required:item.allowBlank,message:' ',trigger:'change'}]">
						<el-select :disabled="!item.allowEdit" v-model="addfile[item.fieldName]" v-if="item.fieldName == 'DAQZH'">
							<el-option v-for="daqzhData in daqzhData" :label="daqzhData.fondName" :value="daqzhData.fondCode">
							</el-option>
						</el-select>
						<el-select filterable v-model="addfile[item.fieldName]" v-else-if="item.fieldName ==  'SBLX'" @change="setUseValue(item.fieldName,'SBLXDH',item.arcLibField.dictDatas)">
	                        <el-option v-for="item in item.arcLibField.dictDatas" :label="item.displayText" :value="item.code">
	                        </el-option>
                        </el-select>
						<el-select :disabled="!item.allowEdit" v-model="addfile[item.fieldName]" v-else>
							<el-option v-for="item in item.arcLibField.dictDatas" :label="item.displayText" :value="item.code">
							</el-option>
						</el-select>

					</el-form-item>
					<el-form-item :label="item.caption+' :'" v-else-if="item.editControl==2" :prop="item.fieldName" :rules="[{ required:item.allowBlank,message:' ',trigger:'blur'}]">
						<el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
					</el-form-item>
					<el-form-item v-else :label="item.caption+' :'" style="height: 60px"  :prop="item.fieldName" :rules="[{required:item.allowBlank,message:' ',trigger:'blur'}]">
						<el-input :readonly="!item.allowEdit" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
					</el-form-item>
				</template>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button class="defaultBtn" @click="beforeCloseReset">关闭</el-button>
				<el-button class="defaultBtn" @click="saveFiles('addfile')">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from '@/views/fileArrange/fileManagement/fileManagement.service';
    @Component
    export default class addFilesDialog extends Vue{
        addFilesVisible: boolean = false;
        isAddFilesloading: boolean = false;
        libId:number = 0;
        tree:any = {};
        addfile: any = {};
        addArray: any = [];
        bxdqData: any = [];
        daqzhData: any = [];
        selection: any = [];
		formStyle: any = {
            "height": Number(document.documentElement.clientHeight-112)+'px' ,
            "overflow-y": 'auto'
        };
        @Watch('addFilesVisible')
        showDialog () {
            if(this.addFilesVisible){
				this.getdaqzhData();
                this.getTable()
            }
        }
        beforeCloseReset() {
			this.addFilesVisible = false;
			this.$refs['addfile'].resetFields();
		};
        // 加载表格
        getTable(){
        	this.isAddFilesloading = true;
			Service.getEditDeploy({
				libId: this.libId,
				conditionId: this.tree.conditionId,
				phase: 4,
				treeId: this.tree.id
			}).then(res => {
				if(res.data.succeeded) {
					this.$nextTick(()=>{
						this.addArray = res.data.data;
						this.addfile = {};
						for(var item of res.data.data) {
							this['$set'](this.addfile, item.fieldName, item.defaultValue ? item.defaultValue : null);
						};
						this.addfile.DAQZH = this.tree.fondCode;
						this.isAddFilesloading = false;
						this.$refs.addfile.$el.scrollTop = 0;
					});

				} else {
					this.getError(res.data.errorMessage)
				}
			})   
        }
        setUseValue(fieldName,setFieldName,dictDatas){
            let value = this.addfile[fieldName];
            for(let i in dictDatas){
                if(value == dictDatas[i].code){
                    this.addfile[setFieldName] = dictDatas[i].useValue;
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
				this.addfile["BM"] = null;
				this.addfile["SHBM"] = null;
			}
			this.bmData = [];
			//给全宗赋值
			for(let i in this.daqzhData) {
				if(this.daqzhData[i].orgId == parentId) {
					this.$set(this.addfile, "DAQZH", this.daqzhData[i].fondCode)
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
					this.isAddFilesloading = true;
					this.addfile.rowStatus = 1;
					Service.SaveDossier({
						libId: this.libId,
						phase: 4,
						data: this.addfile
					}).then(res => {
						if(res.data.succeeded) {
							this.Suces("保存成功");
							this.isAddFilesloading = false; 
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
                        "overflow-y": 'auto'
                    };
                })()
            }; 
        };
}
</script>