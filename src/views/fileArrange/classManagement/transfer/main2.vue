<template>
  <el-dialog title="定制画面编辑" :visible.sync="EditCreationTrue" class="myDialogItems smalldialog" :close-on-click-modal="false" :modal-append-to-body='false'>
            <div class='SetAll'>
                <div class='SetLeftTwo'>
                    <div class='Dsel'>待选项</div>
                    <ul class='leftOptionTwo'>
                        <li v-for='(item,index) in outList' :key='item.fieldName' @click="outClick(item,index)" :class="{'active':outIndex==index}">{{item.caption}}</li>
                    </ul>
                </div>
                <div class='BigIcon BigIconTwo'>
                    <span class="fa fa-angle-right fa-2x" @click="outleft"></span>
                    <span class="fa fa-angle-double-right fa-2x" style="padding:5px 8px" @click="outall"></span>
                    <span class="fa fa-angle-left fa-2x" @click="ownright"></span>
                    <span class="fa fa-angle-double-left fa-2x" style="padding:5px 8px" @click="ownall"></span>
                </div>
                <div class='SetRightTwo'>
                    <div class='Dsel'>已选项
                        <p class='iconAll'>
                            <span class="fa fa-angle-double-up" @click="owntop"></span>
                            <span class="fa fa-angle-up" @click="ownup"></span>
                            <span class="fa fa-angle-down" @click="owndown"></span>
                            <span class="fa fa-angle-double-down" @click="ownbottom"></span>
                        </p>
                        <div class='listNameTwo'>
                            <span>显示名称</span>
                        </div>
                    </div>
                    <ul class='RightOptionTwo' style="top:59px;">
                        <li style="width:100%;margin-right:0" v-for='(item,index) in ownList' :key='item.fieldName' @click="ownClick(item,index)" class='lis' :class="{'active':ownIndex==index}">{{item.caption}}</li>
                    </ul>
                </div>
                <div class='SetRightThr'>
                    <div class='DselThr'>
                        {{ownsrc.caption}}:属性编辑
                    </div>
                    <el-form label-width="135px" class="smallForm">
                        <el-form-item label="名称" class="mt10">
                            <el-input v-model.trim="ownsrc.caption" ></el-input>
                        </el-form-item>
                        <el-form-item label="默认值" class="mt10">
                            <el-input v-model.trim="ownsrc.defaultValue" ></el-input>
                        </el-form-item>
                        <el-form-item label="控件类型" class="mt10">
                            <el-select v-model="ownsrc.editControl" >
                                <el-option v-for="item in editTypeArr"  :value="item.code" :label="item.displayText" :key="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="显示格式" class="mt10">
                            <el-input v-model.trim="ownsrc.displayFormat" ></el-input>
                        </el-form-item>
                        <el-form-item label="允许为空" class="mt10">
                            <el-select v-model="ownsrc.allowBlank" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="允许编辑" class="mt10">
                            <el-select v-model="ownsrc.allowEdit" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="继承父字段" class="mt10">
                            <el-select v-model="ownsrc.isInheritParent" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="继承上一条" class="mt10">
                            <el-select v-model="ownsrc.isInherit" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="最大长度" class="mt10">
                            <el-input v-model.trim="ownsrc.maxLength" ></el-input>
                        </el-form-item>
                        <el-form-item label="文件管理阶段显示" class="mt10">
                            <el-select v-model="ownsrc.isFileTableShow" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="整理编目阶段显示" class="mt10">
                            <el-select v-model="ownsrc.isArrangeTableShow" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="档案管理阶段显示" class="mt10">
                            <el-select v-model="ownsrc.isManageTableShow" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否隐藏" class="mt10">
                            <el-select v-model="ownsrc.hidden" >
                                <el-option  :value="true" label="是"></el-option>
                                <el-option  :value="false" label="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="defaultBtn" @click="ConfirmEdit">确定</el-button>
                <el-button class="defaultBtn" @click="repeatSetTwo">重置</el-button>
            </div>
        </el-dialog>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator'; 
    import Service from '../classManagement.service'; 
    @Component({})
    export default class main2 extends Vue{
        EditCreationTrue:boolean= false;
        ownList:any = [];//已具有的著录项
        outList:any = [];//为具有的著录项
        outIndex:number=0;//选中项
        ownIndex:number=0;//选中项        
        ownsrc:any={};
        keyType:string = 'ok';
         editTypeArr:any=[];
         EditCreation(){
            if(this.keyType!='ok'){
                this.ownList = [];
                this.outList = [];
                  let params = {
                    libId:this.classId,                      
                } ;    
                Service.ManagementList(params).then(res=>{
                    if(res.data.succeeded){
                        this.ownList = res.data.data;
                        this.ownsrc = this.ownList[this.ownIndex];
                        var strs = JSON.stringify(this.ownList[this.ownIndex]);
                        this.oldsrc = JSON.parse(strs);
                        Service.ManagementCandidates(params).then(res=>{
                            if(res.data.succeeded){
                                let data = res.data.data;
                                for(let item of data){
                                    var ind = 0;
                                    for(var son of this.ownList){
                                        if(item.fieldName==son.fieldName){
                                            ind=1;
                                        };
                                    };
                                    if(ind==0){
                                        this.outList.push(item);
                                    };
                                };
                                this.outsrc = this.outList[0];
                                Service.ManagementControl().then(res=>{
                                    if(res.data.succeeded){
                                        this.editTypeArr = res.data.data;
                                    }else{
                                        this['$message']({
                                            message: res.data.errorMessage,
                                            type: 'error'
                                        });
                                    }
                                })
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                });
                this.EditCreationTrue = true;
            }
        };     
          //选中项
        outClick(item,index){
            this.outIndex = index;
            this.outsrc = item;
        };
        //选中项
        ownClick(item,index){
            this.ownIndex = index;
            this.ownsrc = item;
            var str = JSON.stringify(item);
            this.oldsrc = JSON.parse(str);
        };
        //选中项向右
        outleft(){
            if(this.outList.length>0){
                var str = JSON.stringify(this.outList[this.outIndex]);
                var obj = JSON.parse(str);
                if(Object.keys(obj).length<=2){
                    obj.defaultValue=null;
                    obj.editControl='1';
                    obj.displayFormat=null;
                    obj.allowBlank=false;
                    obj.allowEdit=false;
                    obj.isInheritParent=false;
                    obj.maxLength=null;
                    obj.isInherit=false;
                    obj.isFileTableShow=false;
                    obj.isArrangeTableShow=false;
                    obj.isManageTableShow=false;
                    obj.hidden=false;
                };
                if(this.ownList.length==0){
                    this.ownIndex = 0;
                }
                this.ownList.push(obj);
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
                this.outList.splice(this.outIndex,1);
                if(this.outIndex>=this.outList.length-1){
                    this.outIndex = this.outList.length-1;
                    if(this.outIndex<0){
                        this.outIndex = 0;
                    }
                }
            }
        }
        //全部向右
        outall(){
            if(this.outList.length>0){
                if(this.ownList.length==0){
                    this.ownIndex=0;
                    this.ownsrc = {
                        caption:null,//名称
                        defaultValue:null,//默认值
                        editControl:null,//控件类型
                        displayFormat:null,//显示格式
                        allowBlank:null,//允许为空
                        allowEdit:null,//允许编辑
                        isInheritParent:null,//继承父子段
                        maxLength:null,//最大长度
                        isInherit:null,//继承上一条
                        isFileTableShow:null,//文件管理阶段显示
                        isArrangeTableShow:null,//整理编目阶段显示
                        isManageTableShow:null,//档案管理阶段显示
                        hidden:false
                    };
                }
                for(var item of this.outList){
                    if(Object.keys(item).length<=2){
                        item.defaultValue=null;
                        item.editControl=null;
                        item.displayFormat=null;
                        item.allowBlank=false;
                        item.allowEdit=false;
                        item.isInheritParent=false;
                        item.maxLength=null;
                        item.isInherit=false;
                        item.isFileTableShow=false;
                        item.isArrangeTableShow=false;
                        item.isManageTableShow=false;
                        item.hidden = false;
                    };
                    this.ownList.push(item);
                };
                this.ownsrc = this.ownList[this.ownIndex];
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(str);
            }
            this.outList = [];
            this.outIndex = 0;
        };
        //向左
        ownright(){
            if(this.ownList.length>0){
                this.outList.push( this.ownList[this.ownIndex]);
                this.ownList.splice(this.ownIndex,1);
                if(this.ownIndex>=this.ownList.length-1){
                    if(this.ownList.length<=0){
                        this.ownIndex = 0;
                        this.ownsrc ={
                            caption:null,//名称
                            defaultValue:null,//默认值
                            editControl:null,//控件类型
                            displayFormat:null,//显示格式
                            allowBlank:null,//允许为空
                            allowEdit:null,//允许编辑
                            isInheritParent:null,//继承父子段
                            maxLength:null,//最大长度
                            isInherit:null,//继承上一条
                            isFileTableShow:null,//文件管理阶段显示
                            isArrangeTableShow:null,//整理编目阶段显示
                            isManageTableShow:null,//档案管理阶段显示
                            hidden:false
                        };
                        this.oldsrc = {
                            caption:null,//名称
                            defaultValue:null,//默认值
                            editControl:null,//控件类型
                            displayFormat:null,//显示格式
                            allowBlank:null,//允许为空
                            allowEdit:null,//允许编辑
                            isInheritParent:null,//继承父子段
                            maxLength:null,//最大长度
                            isInherit:null,//继承上一条
                            isFileTableShow:null,//文件管理阶段显示
                            isArrangeTableShow:null,//整理编目阶段显示
                            isManageTableShow:null,//档案管理阶段显示
                            hidden:false,
                        };
                    }else{
                        this.ownIndex = this.ownList.length-1;
                        this.ownsrc = this.ownList[this.ownIndex];
                        var strs = JSON.stringify(this.ownList[this.ownIndex]);
                        this.oldsrc = JSON.parse(strs);
                    }
                }else{
                    this.ownsrc = this.ownList[this.ownIndex];
                    var strs = JSON.stringify(this.ownList[this.ownIndex]);
                    this.oldsrc = JSON.parse(strs);
                };
            }
        };
        //全部向左
        ownall(){
            if(this.outList.length==0){
                this.outIndex=0;
            }
            this.outList=this.outList.concat(this.ownList);
            this.ownList = [];
            this.ownIndex = 0;
            this.ownsrc = {
                caption:null,//名称
                defaultValue:null,//默认值
                editControl:null,//控件类型
                displayFormat:null,//显示格式
                allowBlank:null,//允许为空
                allowEdit:null,//允许编辑
                isInheritParent:null,//继承父子段
                maxLength:null,//最大长度
                isInherit:null,//继承上一条
                isFileTableShow:null,//文件管理阶段显示
                isArrangeTableShow:null,//整理编目阶段显示
                isManageTableShow:null,//档案管理阶段显示
                hidden:false
            };
            this.oldsrc = {
                caption:null,//名称
                defaultValue:null,//默认值
                editControl:null,//控件类型
                displayFormat:null,//显示格式
                allowBlank:null,//允许为空
                allowEdit:null,//允许编辑
                isInheritParent:null,//继承父子段
                maxLength:null,//最大长度
                isInherit:null,//继承上一条
                isFileTableShow:null,//文件管理阶段显示
                isArrangeTableShow:null,//整理编目阶段显示
                isManageTableShow:null,//档案管理阶段显示
                hidden:false,
            };
        };
        //上移
        ownup(){
            if(this.ownIndex>0){
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                var obj = JSON.parse(str);
                this.ownList.splice(this.ownIndex,1);
                this.ownIndex--;
                this.ownList.splice(this.ownIndex,0,obj);
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //置顶
        owntop(){
            if(this.ownIndex>0){
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                var obj = JSON.parse(str);
                this.ownList.splice(this.ownIndex,1);
                this.ownList.unshift(obj);
                // this.ownsrc = this.ownList[0];
                this.ownIndex = 0;
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //下移
        owndown(){
            if(this.ownIndex<this.ownList.length-1){
                var str = JSON.stringify(this.ownList[this.ownIndex]);
                var obj = JSON.parse(str);
                this.ownList.splice(this.ownIndex,1);
                this.ownIndex++;
                this.ownList.splice(this.ownIndex,0,obj);
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //置底
        ownbottom(){
            if(this.ownIndex!=this.ownList.length-1){
                this.ownList.splice(this.ownIndex,1);
                this.ownList.push(this.ownsrc);
                this.ownIndex = this.ownList.length-1;
                this.ownsrc = this.ownList[this.ownIndex];
                var strs = JSON.stringify(this.ownList[this.ownIndex]);
                this.oldsrc = JSON.parse(strs);
            }
        };
        //属性编辑的重置
        repeatSetTwo(){
            if(this.ownList.length>0){
                var obj = this.ownList[this.ownIndex];
                for(var key in this.oldsrc){
                    if(this.oldsrc[key]||this.oldsrc[key]==null){
                        obj[key]=this.oldsrc[key];
                    };
                };
            };
        };
        //属性编辑后的提交
        ConfirmEdit(){
            if(this.ownList.length>0){
                Service.ManagementSave({libId:this.classId,data:this.ownList}).then(res=>{
                    if(res.data.succeeded){
                        this['$message']({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.EditCreationTrue = false;
                    }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        });
                    }
                })
            };
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
