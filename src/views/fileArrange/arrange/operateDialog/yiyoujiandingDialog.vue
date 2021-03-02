<template>
    <div>
        <el-dialog title="选择目标任务" :visible.sync="detailsAppralVisible" class="myDialog" :close-on-click-modal="false">
            <el-form label-position="right">
                <el-form-item label="鉴定类型" >
                    <el-select filterable class="checkName" size="small" v-model="taskType" @change="changeTaskType" >
                        <el-option v-for="ind in typeDictList" :label="ind.displayText" :value="ind.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="鉴定任务名称">
                    <el-select filterable class="checkName" size="small" v-model="taskId" >
                        <el-option v-for="ind in taskNameList" :label="ind.taskName" :value="ind.taskId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="defaultBtn" style="margin:0 10px;"  @click="saveAppraisalResearch">保存</el-button>
                <el-button class="defaultBtn" style="margin:0 10px;"  @click="detailsAppralVisible=false;">关闭</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from '@/views/fileArrange/arrange/arrange.service';
    
    @Component()
    export default class yiyoujiandingDialog extends Vue{
        detailsAppralVisible: boolean = false;
        typeDictList: any = [];
        taskType :string = '';
        taskId: string  = '';
        taskNameList: any = [];
        selection: any = [];
        libId: number = 0;
        @Watch('detailsAppralVisible')
        showDialog () {
            if(this.detailsAppralVisible){
                this.taskId = '';
                this.taskType = '';
                this.getIdentifyTypes();
            }
        }
        // 获取鉴定类型数据字典
        getIdentifyTypes(){
            Service.getTypeData(55).then((res) =>{
                this.typeDictList = res.data.data;
            });
        }
        changeTaskType(val){
            this.getTable();
        }
        // 加载表格
        getTable(){
            Service.getIdentifyNameList({
                taskType: this.taskType,
                fondCode: 0
            }).then((res) => {
                //debugger;
                if(res.data.succeeded) {
                    this.taskNameList = res.data.data;
                } else {
                    this['$message']({
                        message: '查询失败！',
                        type: 'error'
                    });
                }
            });       
        }
        //加入已有鉴定申请保存按钮
        saveAppraisalResearch() {
            if(this.taskId == ''){
                this.Warn("请选择您要加入的鉴定任务");
                return;
            }
            //debugger;
            let appraisaInfos = [];
            let _this = this;
            //鉴定前值，需要根据鉴定类型，获取不同的字段的值。保管期限：RETENTION_PERIOD  密级：SECURITY_LEVEL 销毁：RECORD_STATUS 开放鉴定CONTROL_ID
            this.selection.forEach(item=> appraisaInfos.push({
                objectId: item.id,
                libId:_this.libId,
                appraisalFont: this.taskType=='1'?item.RETENTION_PERIOD: (this.taskType=='2'?item.SECURITY_LEVEL: (this.taskType=='3'?item.CONTROL_ID: item.RECORD_STATUS)), 
                mj: item.SECURITY_LEVEL,
                bgqx: item.RETENTION_PERIOD,
                nd: item.YEAR,
                tm: item.TITLE,
                dh: item.ARCHIVAL_CODE,
            }));
            var obj = {
                taskId: this.taskId,
                taskType: this.taskType,
                appraisalInfoList: appraisaInfos,
            }
            Service.saveAddToIdentifyTask(obj).then((res) => {
                if(res.data.succeeded) {
                    this.detailsAppralVisible = false;
                    this.Suces(res.data.data);
                } else {
                    if(res.data.errorCode == -2) {
                        this.Warn(res.data.errorMessage);
                    } else {
                        this.getError('加入已有鉴定任务失败！');
                    }
                }
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
                    this.bodyHeight = document.documentElement.clientHeight - 230;
                    this.dialogTableHeight = document.documentElement.clientHeight-159;
                })()
            }; 
        };
}
</script>