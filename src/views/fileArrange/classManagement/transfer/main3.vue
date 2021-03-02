<template>
  <div >
      <div class="transfer-custom">
          <div class="transfer-custom-panel">
              <p class="transfer-custom-panel-header">{{titles[0]}}</p>
              <div class="transfer-custom-panel-body">
                    <el-form label-width="10px" class="wtfrom" :inline="true">
                        <el-input class="checkName" v-model="filtertext" placeholder="请输入关键字"></el-input>  
                    </el-form>
                    <el-table :data="data.filter(data => !filtertext || data.caption.toLowerCase().includes(filtertext.toLowerCase()))"  style="width: 100%" 
                      highlight-current-row
                      @current-change="onSourceCheckedChange"
                       :show-header="false" :height="tableHeight-55" class="selectTable">
                        <el-table-column  prop="caption">
                        </el-table-column>
                    </el-table>
              </div>
          </div>
          <div class="transfer-custom-buttons">
             <el-button type="primary" @click.native="addToLeft(true)">
                  <span><i class="el-icon-arrow-left"></i><i class="el-icon-arrow-left"></i></span>
              </el-button>
              <el-button type="primary"  @click.native="addToLeft(false)">
                  <span><i class="el-icon-arrow-left"></i></span>
              </el-button>
              <el-button type="primary"  @click.native="addToRight(false)">
                  <span><i class="el-icon-arrow-right"></i></span>
              </el-button>
               <el-button type="primary" @click.native="addToRight(true)">
                  <span><i class="el-icon-arrow-right"></i><i class="el-icon-arrow-right"></i></span>
              </el-button>
         
         </div>
          <div class="transfer-custom-panel">
              <p class="transfer-custom-panel-header">{{titles[1]}}</p>
              <div class="transfer-custom-panel-body">
                    <el-table :data="value"  style="width: 100%" :height="tableHeight"  highlight-current-row
                      @current-change="onTargetCheckedChange" class="selectTable" :show-header="false">
                        <el-table-column  prop="caption"  label="名称" >
                        </el-table-column>
                    </el-table>
              </div>
          </div>
       </div>
  </div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'; 
    
    @Component({
    })
    export default class main3 extends Vue{

        @Prop({default:[]})
        data : any;  
        @Prop({default:[]})
        value: any; 
        @Prop({default:[]})
        titles: any ;

        leftChecked: any = [];
        rightChecked: any = [];
        filtertext: string = '';
        tableHeight : number =  document.documentElement.clientHeight - 230
          
        onSourceCheckedChange(val) {
            this.leftChecked=[]       
            this.leftChecked.push(val); 
        };
        onTargetCheckedChange(val) {
            this.rightChecked=[]  
            this.rightChecked.push(val); 
        };

        addToLeft(all) {
            let itemKey=[];
            if(all){
                itemKey = this.value; 
                if (itemKey.length > 0) {           
                    itemKey.forEach(item => {
                        this.data.push(item);
                     }); 
                    this.value.splice(0, itemKey.length); 
                }else{
                    this['$message']({
                        message: '没有需要移动的名称',
                        type: 'warning'
                    });
                }      
            }else{
                itemKey = this.rightChecked;
                if (itemKey.length > 0) {           
                    itemKey.forEach(item => {
                      const index = this.value.indexOf(item);
                      if (index > -1) {
                        this.value.splice(index, 1);
                        this.data.push(item);
                      }
                  }); 
                }else{
                  this['$message']({
                        message: '请点击选择要移动的名称',
                        type: 'warning'
                    });
                }    
            }
            this.rightChecked=[] 
        };

        addToRight(all) {
            let itemKey=[]
            if(all){
                itemKey = this.data; 
                if (itemKey.length > 0) {           
                    itemKey.forEach(item => {                  
                            this.value.push(item);
                    }); 
                this.data.splice(0, itemKey.length);
                }else{
                    this['$message']({
                        message: '没有需要移动的名称',
                        type: 'warning'
                    });
                }
            }else{
                itemKey = this.leftChecked; 
                if (itemKey.length > 0) {           
                    itemKey.forEach(item => {
                      const index = this.data.indexOf(item);
                      if (index > -1) {
                        this.data.splice(index, 1);
                        this.value.push(item);
                      }
                  }); 
                }else{
                  this['$message']({
                        message: '请点击选择要移动的名称',
                        type: 'warning'
                    });
                }
            } 
            this.leftChecked=[] 
        };
        toUpOne(){          
            let itemKey = this.rightChecked;
            if (itemKey.length > 0) {
                itemKey = this.rightChecked[0];
                let index = this.value.indexOf(itemKey);           
                this.value.splice(index,1);
                this.value.splice(index-1, 0, itemKey);
            }else{
                this['$message']({
                      message: '请点击选择要移动的名称',
                      type: 'warning'
                  });
            }              
        };
        toDownOne(){
           let itemKey = this.rightChecked;
            if (itemKey.length > 0) {
                 itemKey = this.rightChecked[0];
                let index = this.value.indexOf(itemKey);           
                this.value.splice(index,1);
                this.value.splice(index+1, 0, itemKey);
            }else{
                this['$message']({
                      message: '请点击选择要移动的名称',
                      type: 'warning'
                  });
            }           
        };
        toTop(){
            let itemKey = this.rightChecked;
            if (itemKey.length > 0) {
                itemKey = this.rightChecked[0];
                let index = this.value.indexOf(itemKey);
                this.value.splice(index,1);
                this.value.unshift(itemKey);
            }else{
                this['$message']({
                      message: '请点击选择要移动的名称',
                      type: 'warning'
                  });
            }   
            
        };
        toBottom(){
            let itemKey = this.rightChecked;
            if (itemKey.length > 0) {
                itemKey = this.rightChecked[0];
                let index = this.value.indexOf(itemKey);
                this.value.splice(index,1);
                this.value.push(itemKey);
            }else{
                this['$message']({
                      message: '请点击选择要移动的名称',
                      type: 'warning'
                  });
            }  
        };
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.tableHeight = document.documentElement.clientHeight - 230;
                })()
            };
        }
    
    }
</script>
<style lang="scss" scoped>
    .transfer-custom{
       padding:10px;
    }
    .transfer-custom-panel {
        border: 1px solid #ebeef5;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        display: inline-block;
        vertical-align: middle;
        width: 220px;
        max-height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        .transfer-custom-panel-header {
            height: 40px;
            line-height: 40px;
            background: #f5f7fa;
            margin: 0;
            padding-left: 15px;
            border-bottom: 1px solid #ebeef5;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #000;
              button{
                margin:10px 1px;
                padding:3px 6px!important;
                float:right
              }
        }
      .transfer-custom-panel-body {
          min-height: 246px;
          height:auto;         
      }
      .el-table{
        font-size:14px!important
      }
  }
  .transfer-custom-buttons {
    display: inline-block;
    vertical-align: middle; 
    padding:0 10px; 
    button{
      display:block;
      width:60px;
      margin: 5px auto;
      padding:3px 6px!important;
    }
    
}


</style>
