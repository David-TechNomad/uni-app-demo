<template>
    <div>
        <el-dialog  class="zlmlCenter" title="设置权限"   :visible.sync="dialogVisible" 
            :close-on-click-modal="true" width="300"  >
            <el-transfer
                filterable
                :titles="['待赋权全宗', '已赋权全宗']"
                :filter-method="filterMethod"
                filter-placeholder="请输入全宗名称"
                v-model="choosedList"
                :data="fondListData">
            </el-transfer>
            <div class="text-left">
                 <span style="float:left;line-height: 18px; ">控制标识：</span>
                <el-checkbox-group v-model="controlType" style="float:left;margin-left:30px;">
                    <el-checkbox label="0">开放</el-checkbox>
                    <el-checkbox style="margin-left:5px;" label="1">受控</el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">   
                <el-button type="primary" @click="submit" class="defaultBtn" >保存</el-button> 
                <el-button @click="dialogVisible=false;" class="defaultBtn">取消</el-button>          
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './authoritySetting.service' 
    @Component({})
    export default class setAuthorityDialog extends Vue{
        bodyHeight: number= 400 ; 
        dialogVisible: boolean = false;
        fondListData: any = [];
        choosedList: any = [];
        controlType: string = '';
        passedUserIds: any = [];
        passedFondIds: any = [];
        passedControlTypes: any = [];
        @Watch('dialogVisible')
        show(){
            if (this.dialogVisible) {
                this.choosedList = this.passedFondIds;
                this.controlType = this.passedControlTypes;
                this.findFondsByName();
            }
        }
        submit(){
            let fondNameArr = [];
            for(let ori of this.fondListData){
                for(let choo of this.choosedList){
                    if(ori.key == choo){
                        fondNameArr.push(ori.label);
                    }
                }
            }
            let params = {
                userIds: this.passedUserIds.toString(),
                fondIds: this.choosedList.toString(),
                fondNames: fondNameArr.toString(),
                controls: this.controlType.toString()
            }
            Service.updateUserFond(params).then(res =>{
                if(res.data.succeeded){
                    this['$message']({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.dialogVisible = false;
                    this.$emit('refreshList');
                }else{
                    this['$message']({
                        message: '保存失败！',
                        type: 'error'
                    });
                }
            });
        }

        findFondsByName(){
            let params = {
                "fondName":"",
                "fondCode":"",
                "archiveAgentCode": window.sessionStorage.archiveAgentCode
            }
            Service.findFondsByName(params).then(res =>{
                let result = [];
                if(res.data.succeeded){
                    for(let data of res.data.data){
                        let pa = {
                            key: data.id,
                            label: data.fondName,
                        };
                        result.push(pa);
                    }
                    this.fondListData = result;
                }
            });
        }
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        }
    }
 </script>
<style lang="scss" scoped >
</style>
 