<template>
    <section>
        <div class="mainTitle">项目档案目录汇总</div>
        <div class="mainDoc">
            <div class="mainCon mainBorrow">
                <el-form :inline="true" :model="filters" class="doneForm topParamsForm">
                    <el-form-item v-for="" class="fondName" label="项目名称：" ref="projectName">
                        <el-input class="checkName" v-model="filters.projectName" placeholder="单行输入"></el-input>
                    </el-form-item>
                    <el-form-item v-for="" class="fondName" label="项目公司：" ref="projectCompany">
                        <el-input class="checkName" v-model="filters.projectCompany" placeholder="单行输入"></el-input>
                    </el-form-item>
                    <el-form-item v-for="" class="fondName" label="万信号：" ref="wanXinNum">
                        <el-input class="checkName" v-model="filters.wanXinNum" placeholder="单行输入"></el-input>
                    </el-form-item>
                    <el-form-item v-for="" class="fondName" label="" ref="wanXinNum">
                        <el-button class="checkWay" >检索</el-button>
                    </el-form-item>
                </el-form>
                <div class="btnDiv">
                    <el-button class="checkWay" @click="addSomeThing">新增</el-button>
                    <el-button class="checkWay" @click="lendModalOut">打印</el-button>
                    <el-button class="checkWay" @click="lendModalOut">导出</el-button>
                </div>
                <div class="borderTable" v-show="true">
                  <el-table tooltip-effect="dark" :height="bodyHeight" :data="tableData" highlight-current-row v-loading="listLoading"  class="indexTable containTable" :render-header="labelHead">
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="序号">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="分区">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="项目公司">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="城市公司行政经理/主管">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="万信号">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="项目名称">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="万达广场行政经理/总管">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="万信号">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="是否已交移动集团总部经营期档">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="案卷数量">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="类型">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="开业时间">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="结束时间">
                       </el-table-column>
                       <el-table-column :show-overflow-tooltip="true" prop="planName" label="备注">
                       </el-table-column>
                       <el-table-column label="操作" width="160">
                           <template slot-scope="scope">
                               <span class="addBtn" @click="findDetails(scope.row)">修改</span>
                               <span class="addBtn" @click="findDetails(scope.row)">删除</span>
                           </template>
                       </el-table-column>
                  </el-table>
                </div>

            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Service from './reportStatistics.service'
    @Component
    export default class appreportStatistics extends Vue {
        filters : any = {};
        constructor(){
            super();
            this.filters = {
                projectName:'',
                projectCompany:'',
                wanXinNum:'',
            };
        }

        addSomeThing(){
            this['$router'].push({
                path:'/static/projectDocument',
                name:'新增项目档案',
                //params:{ id: searchKey }
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/static/reportStatistics.scss';
</style>