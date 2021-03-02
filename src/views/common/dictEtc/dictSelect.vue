<template>
    <el-select class="checkName percentName" v-model="myDictModel" size="small" :disabled="dictDisabled" @change="changeSelect">
        <el-option v-for="item in dictDataList" :key="item.code" :label="item.displayText" :value="item.code"></el-option>
    </el-select>
</template>

<script lang="ts">
   import { Component, Vue, Watch ,Prop} from 'vue-property-decorator';   
   import Service from './dictEtc.service';
   @Component({})
    export default class appSuperSearch extends Vue{
        dictDataList: any = [];
        myDictModel: string ;
        @Prop({})
        dictModel: string;
        @Prop({})
        dictId:number;
        @Prop({})
        dictDisabled:boolean;

        @Watch("dictModel")
        changeModel(){
            this.myDictModel = this.dictModel;
        }
        constructor(){
            super();
            this.myDictModel = ''; 
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

