<template>
    <section class="fileDetaile">
      <el-form action="" class="basicForm topParamsForm fileApplyForm" style="margin-left:50px">
          <el-form-item label="flowId：" label-width="120" prop="title" class="checkName">
                <el-input class="checkName" v-model.trim="title" maxlength="50" placeholder="最多填写50个字"></el-input>
          </el-form-item>

         <el-form-item label="挂接状态：" prop="fondName" class="checkName" label-width="120">
                <el-select v-model="fondName" placeholder="请选择状态" @change="selectGet" style="width:20%">
                    <el-option label="已办" value="1"></el-option>
                    <el-option label="删除" value="2"></el-option>
                </el-select>
        </el-form-item>    
        <el-form-item>
            <el-button class="checkWay" @click="Sure">提交</el-button>
        </el-form-item>
      </el-form>
      <div>
          {{data}}
      </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Service from './checkUrls.service'
@Component
    export default class checkUrls extends Vue{
        windowHeight: number;
        bodyHeight: number;
        title:string;
        fondName:string;
        flag:boolean;
        data:any = null;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 130;
            this.title = '';
            this.fondName = '';
        };
    selectGet(value){
        if(value == 1 ){
            this.flag = false;
        }else if(value == 2){
            this.flag = true;
        }
        
    }
    Sure(){
        Service.getKeyName({
            flowId:this.title,
            delete:this.flag
        }).then(res=>{
            if(res.data.succeeded){
                this.data = res.data.data;
            }else{
                this.Warn(res.data.errorMessage)
            }
        })
    }
    //警告信息
    Warn(message:string){
        this['$message']({
            type: 'warning',
            message
        });
    };

    //请求失败
    getError(message:string){
        this["$message"]({
            message,
            type: 'error'
        });
    };

    //成功
    Suces(message){
        this['$message']({
            type: 'success',
            message
        })
    };
    mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 130;
                })()
            };
        };
    }
</script>

<style scoped lang="scss">

</style>