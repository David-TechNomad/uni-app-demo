<template>
	<section>
        <el-col :span="24" class="pager">
                <!-- <div class="block">  -->
            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[25,100, 200, 500, 1000]" :current-page="page" :page-size="limit" :total="total">
            </el-pagination>
        </el-col>
    </section>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    @Component({})
    export default class pageToolbar extends Vue{
        @Prop({}) 
        total: number;
        @Prop({}) 
        page: number;
        limit: number = 25;

        handleSizeChange(val){
            this.$emit('sizeChange', val);
        };
        handleCurrentChange(val){
            this.$emit('currentChange', val);
        };
    }
 </script>