<template>
    <section>
        <div >
            <div class="mainTitle">
                <span>档案日志</span>
                <el-button class="checkWay rt" @click="back" style="margin:10px 0;">返回</el-button>
            </div>
            <!-- <p class="fontClass"> </p> -->
            <div class="treeOne tree">
                 <el-form   :model="addfile" label-width="100px" disable>
                    <template v-for="item in addArray">
                        <el-form-item  :label="item.caption+' : '" v-if="item.editControl==1">
                            <el-button class="checkWay">{{item.caption}}</el-button>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' : '" v-if="item.editControl==2" :prop="item.fieldName" >
                            <el-input readonly v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' : '"  v-if="item.editControl==8" :prop="item.fieldName" >
                            <el-input  readonly v-model.number="addfile[item.fieldName]" type="number" :maxlength="item.maxLength" @past="()=>{return false;}" min="0"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' : '" v-if="item.editControl==3" :prop="item.fieldName" >
                            <el-select readonly v-model="addfile[item.fieldName]" style="width:100%">
                                <el-option v-for="item in item.dictData" :key="item.code" :label="item.text" :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' : '" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9" :prop="item.fieldName" >
                            <el-input readonly class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                        </el-form-item>
                        <el-form-item  :label="item.caption+' : '" v-if="item.editControl==10" :prop="item.fieldName" >
                            <el-date-picker readonly v-model="addfile[item.fieldName]" :maxlength="item.maxLength"  value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
                        </el-form-item>
                    </template>
                </el-form>
             </div>
             <div class="search">
                 <div class="mainDoc1">
                     <div class="mainCon1 ">
                         <div >
                             <span>借阅历史</span>
                             <li style="margin:0 0 7px 10px">
                             </li>
                         </div>
                         <!--列表-->
                         <div class="borderTable1" >
                             <el-table border tooltip-effect="dark" :height="bodyHeight+100" :data="borrowHistoryDetaiData" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                                <el-table-column  prop="up.userName" label="借阅人" width="110">
                                </el-table-column>
                                <el-table-column  prop="borrowOperatorDate" label="借阅日期" width="150" :formatter="dateFormat">
                                </el-table-column>
                                <el-table-column  prop="borrowOperatorName" label="借阅操作人" width="110">
                                </el-table-column>
                                <el-table-column  prop="returnOperatorDate" label="归还日期" width="150" :formatter="dateFormat">
                                </el-table-column>
                                <el-table-column prop="returnOperatorName" label="归还操作人" width="155">
                                </el-table-column>
                                <el-table-column label="借阅详情" width="130">
                                    <template slot-scope="scope">
                                        <span class="addBtn" @click="showDetailByApplicationNo(scope.row)">查看</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowHistoryDetail.service';
    import treeChange from '../../../utils/treeChange';
    import moment from 'moment';
    @Component
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        oaHeight: number;
        timer: boolean;
        listLoading: boolean;
        data: any = [];
        tree: any = [];
        addArray: any=[];
        addfile:any={};
        borrowHistoryDetaiData: any=[];
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280;
            this.oaHeight = ((document.documentElement.clientHeight-75)-100)/2-36;
            this.timer = false;
            this.listLoading = false;
        }
        getFieldAndValue(){
            var clickedRow = JSON.parse(window.sessionStorage.getItem('clickedShowHistoryRow'));
             ////debugger
            // var archiveCode = clickedRow.DH;
            var params = {
                applicationNo: clickedRow.applicationNo,
                objectId: clickedRow.objectId,
                libId:clickedRow.libId
            }
            var me = this;
            //获得libId
            // Service.getUtilizeInfoByApplicationNoAndObjId(params).then(res=>{
                // if(res && res.data && res.data.succeeded){
                    var libId = clickedRow.libId;
                    Service.getEditField(libId).then(res=>{
                        if(res && res.data && res.data.succeeded){
                            me.addArray = res.data.data;
                            for(var item of res.data.data){
                                this['$set'](this.addfile,item.fieldName,null)
                            }
                            Service.getEditFieldValue({libId:libId,id:clickedRow.objectId}).then(res=>{
                                if(res && res.data && res.data.succeeded){
                                    me.addfile = res.data.data;
                                }else{
                                    this['$message']({
                                        message: '查询失败！',
                                        type: 'warning'
                                    });
                                }
                            })
                        }else{
                            this['$message']({
                                message: '查询失败！',
                                type: 'warning'
                            });
                        }
                    })
                // }else{
                //     this['$message']({
                //         message: '查询失败！',
                //         type: 'warning'
                //     });
                // }
            // })
        }
        getBorrowHistoryDetail(){
            var clickedRow = JSON.parse(window.sessionStorage.getItem('clickedShowHistoryRow'));
            var params = {
                applicationNo: clickedRow.applicationNo,
                objectId: clickedRow.objectId,
                libId:clickedRow.libId
            }
            var me = this;
             Service.getBorrowHistoryDetailList(params).then(res=>{
                if(res && res.data && res.data.succeeded){
                    me.borrowHistoryDetaiData = res.data.data;
                }else{
                    this['$message']({
                        message: '查询失败！',
                        type: 'warning'
                    });
                }
            })
        };
        showDetailByApplicationNo(row){
            window.sessionStorage.setItem('applicationNo',row.up.applicationNo);
            row.applicationNo = row.up.applicationNo;
            row.parentAppNo = row.up.parentAppNo;
            window.sessionStorage.setItem('borrowToData', JSON.stringify(row));
            window.sessionStorage.setItem('clickedRow', JSON.stringify(row.up));
            window.sessionStorage.setItem('backHis', '1');
            if(row.up.parentAppNo){
                if(row.processNo){
                    window.sessionStorage.setItem('node','4'); 
                    window.sessionStorage.setItem('backFile','5');                     
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/selfTip/borrowDetails/borrowDetailsHistory',
                    });
                }
            }else{
                if(row.processNo){
                    window.sessionStorage.setItem('node','4');
                    window.sessionStorage.setItem('backFile','5');  
                    this['$router'].push({
                        path:'/selfTip/examCheck/peopleRefuseCheck',
                    });
                }else{
                    this['$router'].push({
                        path:'/views/selfTip/borrowerHistory/borrowHistoryLen',
                    });
                }
            }
        };
             //时间格式化
        dateFormat1(data) {
            if(data.up.appDate){
                return moment(data.up.appDate).format("YYYY-MM-DD");
            }else{
                return '';
            }
        }
         dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        }
        back():void{
            this['$router'].go(-1);
        };
        created(){
        };
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 280;
                    this.oaHeight = (document.documentElement.clientHeight-100)/2-50;
                })()
            };
            this.getFieldAndValue();
            this.getBorrowHistoryDetail();
        };
    }
</script>

<style lang="scss" scoped>
    // @import '../../../styles/selfTip/borrowHistory.scss';
    @import '../../../styles/selfTip/borrowHistoryDetail.scss';
</style>