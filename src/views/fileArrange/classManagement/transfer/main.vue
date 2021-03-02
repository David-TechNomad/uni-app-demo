<template>
      <el-dialog title="一览设置" :visible.sync="ListSettings" class="chaokuandialog" :close-on-click-modal="false" :modal-append-to-body='false'>
            <div class='SetAll'>
                <div class='SetLeft'>
                    <div class='Dsel'>待选项</div>
                    <ul class='leftOption' style="position:absolute;top: 36px;bottom:0;width:30%;overflow-y:auto">
                        <li v-for='(item,index) in ListSetData' @click="leftY(index)" :class="index==selectIndexY?'active':''">{{item.caption}}</li>
                    </ul>
                </div>
                <div class='BigIcon'>
                     <span class="fa fa-angle-right fa-2x" @click='toRight'></span>
                     <span class="fa fa-angle-double-right fa-2x" @click='toAllRight'></span>
                     <span class="fa fa-angle-left fa-2x" @click='toLeft'></span>
                     <span class="fa fa-angle-double-left fa-2x" @click='toAllLeft'></span>
                </div>
                <div class='SetRight'>
                    <div class='Dsel'>已选项
                        <p class='iconAll'>
                            <span class="fa fa-angle-double-up" @click='ArriveTop'></span>
                            <span class="fa fa-angle-up" @click='toUp'></span>
                            <span class="fa fa-angle-down" @click='toNext'></span>
                            <span class="fa fa-angle-double-down" @click='Arrivebottom'></span>
                        </p>
                        <div class='listName' style="height:35px;">
                            <span style="float: left;">显示名称</span>
                            <span>宽度</span>
                        </div>
                    </div>
                    <ul class='RightOption' style=" position: absolute; top: 71px; bottom: 0; width: 54%; overflow-y: auto;">
                        <div v-for='(item,index) in ListRightData' @click="rightY(index)">
                             <li class='lis' @click="leftYR(index)" :class="index==selectIndexYR?'active':''"><input type='text' v-model="item.caption"></li>
                             <p class='pli'><input type='text' v-model="item.width"></p>
                        </div>
                    </ul>
                </div>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button class="defaultBtn" @click="ListSettingSuer">确定</el-button>
                <el-button class="defaultBtn" @click="repeatSet">重置</el-button>
            </div>
        </el-dialog>  
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'; 
    import Service from '../classManagement.service'; 
    @Component({})
    export default class main1 extends Vue{
        ListSettings:boolean= false;
        ListSetData:any = [];
        ListRightData:any = [];
        keyType:string = 'ok';
          tableData: any=[];
        leftY(i){
            this.selectIndexY = i;
        }
        leftYR(i){
          debugger;
            this.selectIndexYR = i;
        }
        rightY(i){
            this.selectIndexYR = i;
        }
        ListSetting(){            
            if(this.keyType!='ok'){
                 let params = {
                    libId:this.classId,                      
                } ;    
                Service.ManagementDispList(params).then(res=>{
                    if(res.data.succeeded){
                        this.ListSettings = true;
                        this.ListSetData = [];
                        this.selectIndexY = 0;
                        this.selectIndexYR = 0;
                        this.ListRightData = res.data.data;
                        for(var item of this.tableData){
                            var key = false;
                            for(var son of this.ListRightData){
                                if(son['fieldName'] == item['fieldName']){
                                    key = true;
                                };
                            };
                            if(!key){                             
                                var obj = {
                                    applyTo: 1,
                                    caption: item.caption,
                                    fieldName: item.fieldName,
                                    isArrangeTableShow: null,
                                    isFileTableShow: null,
                                    isManageTableShow: null,
                                    itemState: 0,
                                    libId: this.classId,
                                    sortSeq: 0,
                                    width: null,
                                };
                                this.ListSetData.push(obj);
                            };
                        };
                        var data = JSON.stringify(res.data.data);
                        this.oldListSetting = JSON.parse(data)
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    };
                });
            }
        };
          ArriveTop(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR>0){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR=0;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }

        };
         toUp(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR>0){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR-=1;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }
        };
        toNext(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR<this.ListRightData.length-1){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR+=1;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }
        };
        Arrivebottom(){
            if(this.ListRightData.length>0){
                if(this.selectIndexYR<this.ListRightData.length-1){
                    var data = this.ListRightData[this.selectIndexYR];
                    this.ListRightData.splice(this.selectIndexYR,1);
                    this.selectIndexYR=this.ListRightData.length;
                    this.ListRightData.splice(this.selectIndexYR,0,data);
                }
            }
        };
        //一览设置 重置
        repeatSet(){
            this.selectIndexYR = 0;
            this.selectIndexY = 0;
            this.ListSetting();          
        };
        //向右
        toRight(){
            if(this.ListSetData.length>0){
                this.ListRightData.push( this.ListSetData[this.selectIndexY]);
                this.ListSetData.splice(this.selectIndexY,1);
                if(this.selectIndexY>=this.ListSetData.length&&this.selectIndexY>0){
                    this.selectIndexY-=1
                }
            }
        };
        toAllRight(){          
            if(this.ListSetData.length>0){
                for(var son of this.ListSetData){
                    this.ListRightData.push(son)
                }
                this.ListSetData = [];
            };
        };
        toLeft(){
            if(this.ListRightData.length>0){
                this.ListSetData.push(this.ListRightData[this.selectIndexYR])
                this.ListRightData.splice(this.selectIndexYR,1);
                if(this.selectIndexYR>=this.ListRightData.length&&this.selectIndexYR>0){
                    this.selectIndexYR-=1
                }
            }
        };
        toAllLeft(){
            if(this.ListRightData.length>0){
                for(var son of this.ListRightData){
                    this.ListSetData.push(son)
                }
                this.ListRightData = [];
            }           
        };
         //一览设置 确定
        ListSettingSuer(){
            if(this.ListRightData.length>0){
                var arr = [];
                for(var key in this.ListRightData){
                    this.ListRightData[key].width = this.ListRightData[key].width/1;
                    this.ListRightData[key].sortSeq = key/1+1;
                    arr.push(this.ListRightData[key])
                }
                Service.ManagementSave({libId:this.classId,data:arr}).then(res=>{
                    if(res.data.succeeded){
                        this.ListSettings = false;
                        this.ListRightData = [];
                        this.selectIndexYR = 0;
                        this['$message']({
                            message: '保存成功',
                            type: 'success'
                        });
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            }
        }
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
   .SetAll{
  width:100%;
  height:100%;
}
.SetLeft{
  width:31%;
  height:100%;
  float:left;
  border:1px solid #ddd;
}
.SetRight{
  width:55%;
  height:100%;
  float: right;
  margin-right:10px;
  border:1px solid #ddd;
  >.RightOption{
    >div{
      >li{
        >input{
          background-color: transparent;
          border:0px!important;
          width:100%;
        }
      }
    }
  }
}
.SetLeftTwo{
  width:140px;
  height:100%;
  float:left;
  border:1px solid #ddd;
  position: relative;
}
.SetRightTwo{
  width:140px;
  height:100%;
  float: left;
  margin-left:40px;
  border:1px solid #ddd;
  position: relative;
}
.SetRightThr{
  width:45%;
  height:100%;
  float: right;
  margin-right:10px;
  border:1px solid #ddd;
}
.Dsel{
  border-bottom: 1px solid #ddd;
  padding:5px;
}
.DselThr{
  border-bottom: 1px solid #ddd;
  height:30px;
  line-height:30px;
  padding-left:5px;
}
.iconAll{
  float: right;
  span{
    background: #428bca;
    color:#fff;
    padding:1px 3px;
    font-size:18px;   
    border-radius: 2px;  
  }
}
.listName{
  padding-top:10px;
  span{
    display:inline-block;
    padding:5px 12px;
    background: #ececec;
    &:nth-child(1){
      margin-right:50px;
    }
  }
}
.listNameTwo{
  padding-top:10px;
  span{
    display:inline-block;
    padding:5px 12px;
    background: #ececec;
    width:100%;
    //&:nth-child(1){
    //  margin-right:50px;
    //}
  }
}

.BigIcon{
  position: absolute;
  width:30px;
  left:35%;
  top:20%;
  span{
    display: inline-block;
    color:#fff;
    margin:20px 0;
    background: #428bca;
    padding: 5px 10px;
    width: 30px;
    font-size:20px;
    border-radius: 5px;
  }
}
.BigIconTwo{
  left:157px;
}
.active{
  background: #cccccc;

}
.leftOption,.RightOption{
  li{
    line-height: 25px;
    padding-left: 5px;
  }
}
.leftOptionTwo,.RightOptionTwo{
  position: absolute;
  left:0;
  top:25px;
  bottom:0px;
  overflow-y:auto;
  width:140px;
  li{
    line-height: 25px;
    padding-left: 5px;
  }
}
.lis{
  width:44%;
  display:inline-block;
  margin-right:45px;
}
.pli{
  width:30%;
  display:inline-block;
  input{
    width:100%;
  }
}

</style>
