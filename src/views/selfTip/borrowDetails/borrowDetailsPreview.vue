
<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>电子原文预览</span>
        </div> 
        <div class="contentbox contentbox-full "> 
          <el-card class="box-card yw">
              <div slot="header" class="clear">
                <span class="lt namelist">题名:卡片名称</span><span class="lt namelist"> 档号：145465456</span><span class="lt namelist"> 电子原文：54564654</span>
                <div class="rt">
                  <el-button class="defaultBtn" type="text">上一份</el-button>&nbsp;&nbsp;共3份文档&nbsp;<el-button class="defaultBtn" type="text">下一份</el-button>
                 </div>
              </div>
              <iframe src="static/pdf/web/viewer.html?file=../1.pdf" height="100%" width="100%" type="application/x-google-chrome-pdf"> </iframe>  
            </el-card>
           
        </div>
       </section>
</template> 
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './borrowDetails.service';   
    @Component
    export default class examCheck extends Vue{
           windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 563 ; 
        radio3: string = '1';
        treedata001: any = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      activeName:string = 'first';
      tableData: any =[{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }];
        total: number = 1;
         page: number = 0;
        pageSize: number = 25;                  
        defaultProps: any = {
            children: 'children',
            label: 'name'
        };    
        constructor(){
            super();
        };
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };
        created(){            
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 563;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';    
</style>