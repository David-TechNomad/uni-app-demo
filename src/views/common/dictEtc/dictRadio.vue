<template>
    <el-radio-group class="checkName percentName" size="small" v-model="myDictModel" :disabled="dictDisabled" @change="changeRadio">
        <el-radio v-for="item in dictDataList" :key="item.code" :label="item.displayText" :value="item.code"></el-radio>
    </el-radio-group>
</template>

<script lang="ts">
   import { Component, Vue, Watch ,Prop} from 'vue-property-decorator';   
   import Service from './dictEtc.service';
   @Component({})
    export default class appSuperSearch extends Vue{
        dictDataList: any = [];
        myDictModel: string = '';
        myDictId: number=0;
        @Prop({})
        dictId:number;
        @Prop({})
        dictDisabled:boolean = false;
        @Prop({})
        dictModel: string ='';

        constructor(){
            super();
            this.myDictId = this.dictId;
            this.getDictDataList();
        }

        getDictDataList(){
            Service.getDictListByDictId(this.dictId).then((res) =>{
                this.dictDataList = res.data.data;
            });
        }

        changeSelect(){
            this.$emit('dictChange',this.myDictModel);
        }
    }

</script>
<style lang="scss" scoped>
</style>

