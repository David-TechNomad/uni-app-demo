<template>
    <el-dialog class="fixModal1" :title="processTitle" :visible.sync="processVisible" :close-on-click-modal="true"
		 	:before-close="closeDialog">
        <el-form class="m10" :model="processForm" :rules="ruleProcessForm" ref="processForm" label-width="120px" size="small">
            <el-form-item label="流程名称：" class="checkThings"  prop="processName">
                <el-input class="checkName percentName"  v-model="processForm.processName"></el-input>
            </el-form-item>
            <el-form-item label="流程类型：" class="checkThings"  >
                <el-input class="checkName percentName" readonly v-model="processForm.processTypeName"></el-input>
            </el-form-item>
            <el-form-item label="鉴定类型：" class="checkThings"   v-if="clickedLeftRow.code=='3'">
				<dictSelect :dictId="55" :dictModel="processForm.arcLevel"  :dictDisabled="typeFlag != 1" @dictChange="val => (this.processForm.arcLevel =val)" style="width:100%;"></dictSelect>
            </el-form-item>
			<el-form-item  label="所属档案馆：" class="checkThings" prop="archiveAgentCode">
                <el-select v-model="processForm.archiveAgentCode" filterable placeholder="请选择" style="width:100%;" :disabled="typeFlag != 1">
					<el-option
					v-for="item in options"
					:key="item.archiveAgentCode"
					:label="item.archiveAgentName"
					:value="item.archiveAgentCode">
					</el-option>
			    </el-select>
            </el-form-item>
            
        </el-form>
        <div class="m10">
            <span style="line-height:35px;margin-left: 13px;font-weight: bolder;">定义节点</span>
            <el-button  class="defaultBtn rt m10" @click="addProcessSetting()">新增</el-button>
            <el-table :data="tableSettingData" class="defaultTable" border header-row-class-name="tableHeader" >
                <el-table-column prop="step" label="审批环节" width="80">
                    <template slot-scope="scope">
                        <el-input-number v-if="scope.row.Iisnput" class='checkName1 percentName' v-model='processSettingForm.step'></el-input-number>
                        <div v-else v-html="scope.row.step"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" :show-overflow-tooltip="true" label="节点名称">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.isInput" class='checkName1 percentName' v-model='processSettingForm.name'></el-input>
                        <div v-else v-html="scope.row.name"></div>
                    </template>
                </el-table-column>

                <el-table-column prop="roleName" :show-overflow-tooltip="true" label="节点审批人" width="120" v-if="clickedLeftRow.code=='3'">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.isInput" class="checkName1 percentName" filterable v-model="processSettingForm.user" :disabled="selectFlag">
                            <el-option v-for="item in fondRoleData" :key="item.userId" :label="item.fullName" :value="item">
                            </el-option>
                        </el-select>
                        <div v-else v-html="scope.row.roleName"></div>
                    </template>
                </el-table-column>

                <el-table-column prop="roleName" :show-overflow-tooltip="true" label="节点角色" width="120" v-else>
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.isInput" class="checkName1 percentName" v-model="processSettingForm.role" :disabled="selectFlag">
                            <el-option v-for="item in fondRoleData" :key="item.id" :label="item.roleName" :value="item">
                            </el-option>
                        </el-select>
                        <div v-else v-html="scope.row.roleName"></div>
                    </template>
                </el-table-column>



                <el-table-column label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.isInput" class="tabletoolBtn" @click="saveSetting(scope.row)" :key="scope.row.id+'s'">保存</el-button>
                        <el-button v-else class="tabletoolBtn" @click="editSetting(scope.row)" :key="scope.row.id+'ss'">编辑</el-button>
                        <el-button class="tabletoolBtn" @click="deleteSetting(scope.$index)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="position:absolute; bottom:0;height:50px;width:100%;text-align:center;">
			<el-button type="primary" class="defaultBtn" @click="saveProcess('processForm')">确定</el-button>
            <el-button type="primary" class="defaultBtn" @click="closeDialog()">取消</el-button>
            
        </div> 
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
	import Service from './processCon.service';
	// import dictSelect from '@/views/common/dictEtc/dictSelect.vue';
    @Component({
		components:{
			// dictSelect
		}
	})
    export default class addAndEditProcess extends Vue{
        processTitle: string = '';
        processVisible: boolean = false;
        clickedLeftRow: any = {};
        typeDictList: any = [];
        processForm: any = { //新增流程
			processTypeName: '',
            processType: '',
			processName: '', //流程名称
			arcAscription: 1, //开放标识
			arcLevel: 0, //鉴定类型
            archiveAgentCode:'',
			cc: false,
			id: null,
        };
        ruleProcessForm: any = {
			processName: [{
				required: true,
				message: '请输入流程名称',
				trigger: 'blur'
			}],
            archiveAgentCode:[{
                required: true,
                message: '请选择档案馆',
                trigger: 'change'
            }]
		}
		processSettingForm: any = {
			step: 1,
			name: '',
			role: '',
            user:'',
			forward: false,
			select: false,
			additionalSignature: false,
        };
        arcAscriptionOption: any = [{
            'id': 1,
            'name': '开放'
        },{
            'id': 2,
            'name': '受控'
        }];
		arcLevelOption: any = [{
            'id': 1,
            'name': '本馆'
        },{
            'id': 2,
            'name': '外馆'
        }];
        tableSettingData: any = [{
			step: 1,
			name: '',
			roleId: '',
			role: {},
			roleName: '',
			forward: false,
			select: false,
			additionalSignature: false,
			isInput: true,
			id: null,
			processId: null,
        }];
        typeFlag: number = -1;//新增，编辑
        editRow: any = {};//编辑时传入的编辑数据
        selectFlag: boolean = false;
        fondRoleData: any = [];
         options: any = [];
        value:string = ''
        @Watch('processVisible')
        showDialog () {
            if(this.processVisible){
                this.getIdentifyTypes();//获取鉴定类型
				this.getAgent();//获取档案馆
                if(this.typeFlag == 1){//新增
                    if(this.clickedLeftRow.code=='0'){
                        this.getRoleList();//获取节点角色
                    }
					this.processForm.processTypeName = this.clickedLeftRow.displayText;
					this.processForm.processName = '';
					this.processForm.arcAscription = '';
					this.processForm.arcLevel = '';
                    this.processForm.processType = Number(this.clickedLeftRow.code);
                    this.tableSettingData = [];
                }else{
                    this.tableSettingData = this.editRow.settings;
                    if(this.clickedLeftRow.code=='3'){
                        this.getUserList(this.editRow.archiveAgentCode);//获取节点用户
                        for (let i = 0; i < this.tableSettingData.length; i++) {
                            if (this.tableSettingData[i].user == null) {
                                this.tableSettingData[i].roleName = '';
                            } else {
                                this.tableSettingData[i].roleName = this.tableSettingData[i].user.fullName;
                            }
                            this.tableSettingData[i].isInput = false;
                            this.tableSettingData[i].processId = this.editRow.id;
                        }
                    }else{
                        this.getRoleList();//获取节点角色
                        for (let i = 0; i < this.tableSettingData.length; i++) {
                            if (this.tableSettingData[i].role == null) {
                                this.tableSettingData[i].roleName = '';
                            } else {
                                this.tableSettingData[i].roleName = this.tableSettingData[i].role.roleName;
                            }
                            this.tableSettingData[i].isInput = false;
                            this.tableSettingData[i].processId = this.editRow.id;
                        }
                    }

					this.processForm = Object.assign({}, this.editRow);

					this.processForm.arcLevel = this.processForm.arcLevel.toString();
					this.processForm.settings = this.tableSettingData;
					this.processForm.processTypeName = this.clickedLeftRow.displayText;
				}
				
            }
        }
        
        // 获取鉴定类型数据字典
        getIdentifyTypes(){
            Service.getTypeData(55).then((res) =>{
                this.typeDictList = res.data.data;
            });
        }
        getRoleList() {
			Service.getRoleList({}).then((res) => {
				this.fondRoleData = res.data.data;
				for (let i in this.fondRoleData) {
					this.fondRoleData[i].value = this.fondRoleData[i].id;
				}
			});
		};
        getUserList(archiveAgentCode) {
            Service.getUserList({
                'agentCode':archiveAgentCode
            }).then((res) => {
                this.fondRoleData = res.data.data;
                for (let i in this.fondRoleData) {
                    this.fondRoleData[i].value = this.fondRoleData[i].userId;
                }
            });
        };
		//获取档案馆
		 getAgent() {
			Service.selectAgent({}).then((res) => {			
				if (res.data.succeeded) {							
					 this.options = res.data.data;
				}else{
					  this['$message']({
								message: res.data.data.message,
								type: 'error'
							});
				}
			});
        };        
        //取消
        closeDialog() {
			for (var i = 0; i < this.tableSettingData.length; i++) {
				if (this.tableSettingData[this.tableSettingData.length - 1].roleName == undefined || this.tableSettingData[this.tableSettingData
						.length - 1].roleName == '') {
					this.tableSettingData = this.tableSettingData.pop()
				}
			}
            this.tableSettingData = []; //在修改时重新赋值
            this.$emit('refresh', this.clickedLeftRow);
			this.processVisible = false;
        }
        addProcessSetting() {
            if(this.clickedLeftRow.code=='3') {
                if (this.processForm.archiveAgentCode) {
                    this.getUserList(this.processForm.archiveAgentCode);//获取节点用户
                } else {
                    this['$message']({
                        message: '请先选择档案馆',
                        type: 'warning'
                    });
                    return;
                }
            }
			for (let i = 0; i < this.tableSettingData.length; i++) {
				if (this.tableSettingData[i].isInput) {
					this['$message']({
						message: '请先保存节点',
						type: 'warning'
					});
					return;
				}
			}
			this.selectFlag = false;
			let step = this.tableSettingData.length + 1;
			this.tableSettingData.push({
				step: step,
				name: '',
				roleId: '',
				reoleName: '',
				forward: false,
				select: '',
				additionalSignature: false,
				isInput: true
			});
			this.processSettingForm = {
				step: step,
				name: '',
				role: '',
                user:'',
				forward: false,
				select: '',
				additionalSignature: false,
			};
        };
        
        saveProcess() {
			let _this = this;
			this.$refs['processForm']['validate']((valid) => {
				if (valid) {
					for (let i = 0; i < this.tableSettingData.length; i++) {
						if (this.tableSettingData[i].isInput) {
							this['$message']({
								message: '请先保存节点',
								type: 'warning'
							});
							return;
						}
					}
					let settings = [];
					for (let i = 0; i < this.tableSettingData.length; i++) {
						let data = this.tableSettingData[i];
						let setting = {
							'step': data.step,
							'roleId': data.roleId,
							'forward': data.forward,
							'select': data.select,
							'additionalSignature': data.additionalSignature,
							'name': data.name,
//							'id': data.id,
							'processId': data.processId,
						};
						settings.push(setting);
					}
					//鉴定类型，判断鉴定类型是否为空
					if(_this.clickedLeftRow.code =='3'){
						if(_this.processForm.arcLevel == ""){
							_this['$message']({
								message: '请选择鉴定类型!',
								type: 'warning'
							});
							return;
						}
					}


                    this.processForm.settings = settings;
//					this.processForm.archiveAgentCode = window.sessionStorage.archiveAgentCode;
					
					Service.saveProcess(this.processForm).then((res) => {
						if (res.data.succeeded) {
							this['$message']({
								message: res.data.data.message,
								type: 'success'
							});
							if (res.data.data.code == '2') {
                                this.processVisible = false;
                                this.$emit('refresh', this.clickedLeftRow);
								// this.$parent.clickLeftTableRow(this.clickedLeftRow);
							}
						}
					});
				}
			});
        };
        saveSetting(row) {
			if (this.processSettingForm.name == '' || this.processSettingForm.name == null) {
				this['$message']({
					message: '节点名称不能为空',
					type: 'warning'
				});
			} else if (this.selectFlag == false) {
                let roleId='';
                let roleName='';
                if(this.clickedLeftRow.code=='3'){
                    if (this.processSettingForm.user.fullName == '' || this.processSettingForm.user.fullName == null) {
                        this['$message']({
                            message: '请选择节点审批人。',
                            type: 'warning'
                        });
                        return;
                    }else{
                        roleId=this.processSettingForm.user.userId;
                        roleName=this.processSettingForm.user.fullName;
                    }
                }else{
                    if (this.processSettingForm.role.roleName == '' || this.processSettingForm.role.roleName == null) {
                        this['$message']({
                            message: '请选择节点角色。',
                            type: 'warning'
                        });
                        return;
                    }else{
                        roleId=this.processSettingForm.role.id;
                        roleName=this.processSettingForm.role.roleName;
                    }
                }
                row.step = this.processSettingForm.step;
                row.name = this.processSettingForm.name;
                row.roleId = roleId;
                row.roleName = roleName;
                row.forward = this.processSettingForm.forward;
                row.select = this.processSettingForm.select;
                row.additionalSignature = this.processSettingForm.additionalSignature;
                row.role = this.processSettingForm.role;
                row.user=this.processSettingForm.user;
                row.id=roleId;
                var brr = JSON.stringify(this.tableSettingData);
                var crr = JSON.parse(brr)
                for (let i = 0; i < crr.length; i++) {
                    if (crr[i].id == row.id) {
                        crr[i].isInput = false
                    }
                }
                this.tableSettingData = crr;
			} else {
                let roleId='';
                let roleName='';
                if(this.clickedLeftRow.code=='3'){
                    roleId=this.processSettingForm.user.userId;
                    roleName=this.processSettingForm.user.fullName;
                }else{
                    roleId=this.processSettingForm.role.id;
                    roleName=this.processSettingForm.role.roleName;
                }
				row.step = this.processSettingForm.step;
				row.name = this.processSettingForm.name;
                row.roleId = roleId;
                row.roleName = roleName;
				row.forward = this.processSettingForm.forward;
				row.select = this.processSettingForm.select;
				row.additionalSignature = this.processSettingForm.additionalSignature;
				row.role = this.processSettingForm.role;
                row.user=this.processSettingForm.user;
                row.id=roleId;
				var brr = JSON.stringify(this.tableSettingData);
				var crr = JSON.parse(brr)
				for (let i = 0; i < crr.length; i++) {
					if (crr[i].id == row.id) {
						crr[i].isInput = false
					}
				}
				this.tableSettingData = crr;
			}
		};
		editSetting(row) {
			for (let i = 0; i < this.tableSettingData.length; i++) {
				if (this.tableSettingData[i].isInput) {
					this['$message']({
						message: '请先保存节点',
						type: 'warning'
					});
					return;
				}
			}
			let arr = [];
			var brr = JSON.stringify(this.tableSettingData);
			var crr = JSON.parse(brr)
			for (let i = 0; i < crr.length; i++) {
				if (crr[i].id == row.id && crr[i].isInput) {
					arr.push(i)
				}
			}
			if (arr.length > 0) {
				this['$message']({
					message: '请先保存节点',
					type: 'warning'
				});
			} else {
//				if (row.role == null) {
//					row.role = {};
//					row.role.roleName = '';
//				}
//				let role = {
//					'id': row.roleId,
//					'roleName': row.roleName,
//					'value':row.roleId
//				}
//                if (row.user == null) {
//                    row.user = {};
//                    row.user.fullName = '';
//                }
//                let user = {
//                    'id': row.user.userId,
//                    'fullName': row.user.fullName,
//                    'value':row.user.userId
//                }
				this.processSettingForm = {
					'step': row.step + '',
					'name': row.name,
					'forward': row.forward,
					'select': row.select,
					'additionalSignature': row.additionalSignature,
					'role': row.role,
                    'user': row.user
				}
				if (row.select) {
					this.selectFlag = true;
				} else {
					this.selectFlag = false;
				}
				for (let i = 0; i < crr.length; i++) {
					if (crr[i].id == row.id) {
						crr[i].isInput = true;
					}
				}
				this.tableSettingData = crr;
			}
		};
		deleteSetting(index) {
			this['$confirm']('您确认移除此节点吗？', {
				type: 'warning'
			}).then(() => {
				this.tableSettingData.splice(index, 1);
				for (let i = 0; i < this.tableSettingData.length; i++) {
					let step = Number(i) + 1;
					this.tableSettingData[i].step = step;
				}
			});
		};
    }
 </script>
 