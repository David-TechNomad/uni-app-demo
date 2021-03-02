<template>
    <el-table
            :data="childrenData"
            style="width: 100%"
            :show-header="false"
            :row-class-name="tableRowClassName"
            class="expandTable childTable"
            @select="selectionchange"
            row-key="id"
            ref="Sontable"
    >
        <el-table-column width="5"></el-table-column>
        <el-table-column type="selection" :width="SLW"></el-table-column>
        <el-table-column type="expand" width="100%" column-key="id">
            <template slot-scope="scope">
                <div v-if="scope.row.children!=null?true:false" class="expand_div">
                    <fileSon ref="SonApp" @EditStore="EditStore" @deleteStore="deleteStore" @addArchivesStore="addArchivesStore" :childrenData ="scope.row.children" :SLW="SLW" :width1="width1" :width2="width2" @Sonselection="Sonselection" ></fileSon>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="nodeName" label="档案库名称" :width="width1">
        </el-table-column>
        <el-table-column label="档案分类"  prop="kindText" :width="width1">
        </el-table-column>
        <el-table-column prop="categoryNumber" label="分类号" :width="width1">
        </el-table-column>
        <el-table-column label="操作" :width="width2">
            <template slot-scope="scope">
                <span class="addBtn" v-if="scope.row.nodeType==1" @click="addArchivesStore(scope.row)">增加案卷库</span>
                <span class="addBtn" @click="EditStore(scope.row)">编辑</span>
                <span class="addBtn" @click="deleteStore(scope.row)">删除</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop,Model,Watch } from 'vue-property-decorator';
    @Component({
        name:'fileSon'
    })
    export default class fileSon extends Vue{
        @Prop({ default: [] })
        childrenData: any;
        // @Prop({ default: [] })
        // roleSelect: any;
        @Prop({ default: null })
        kuandu: any;
        @Prop({ default: null })
        exWidth: any;
        @Prop({ default: null })
        SLW: any;
        @Prop({ default: null })
        width1: any;
        @Prop({ default: null })
        width2: any;
        tableData: any = [];
        $refs: { clearSelections: HTMLFormElement};
       constructor(){
           super();
           this.tableData = [];
       };

        EditStore(obj){
            this.$emit('EditStore',obj);
        };

        deleteStore(obj){
            this.$emit('deleteStore',obj);
        };
        //增加案卷库
        addArchivesStore(obj){
            this.$emit('addArchivesStore',obj)
        }
        getRowKeys(row){
               return row.id;
        };
        tableRowClassName(row){
            if(row.row.nodeType!=2){
                if(row.row.children!=null&&row.row.children.length>0){
                    return ''
                }else{
                    return 'row-expand-null';
                }
            }else{
                return 'row-expand-null SelectCell';
            }
        };
        //
        selectionchange(obj,row){
            this.$emit('Sonselection',row);
            if(this.$refs['SonApp']){
                this.$refs['SonApp'].clearSelections()
            }
        };
        //表格的选中 // this.$emit('SonSelChange')
        Sonselection(obj){
             this['$refs']['Sontable']['clearSelection']();
             this.$emit('Sonselection',obj);
        };

        clearSelections(){
            this['$refs']['Sontable']['clearSelection']();
            if(this['$refs']['SonApp']){
                this['$refs']['SonApp'].clearSelections();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '../../../styles/selfTip/borrow.scss';
</style>