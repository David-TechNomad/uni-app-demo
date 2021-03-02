<template>
     <section class="wrapprSection">
        <div class="mainTitle">
           <span>调整顺序号</span>
           <el-button class="defaultBtn rt mt10" @click="Goback">返回</el-button>
        </div> 
        <div class="contentbox contentbox-full boxshow"> 
               <div class="searchCon "> 
                    <el-button  class="defaultBtn" icon="el-icon-caret-top" @click="toUpOne"></el-button>
                    <el-button  class="defaultBtn" icon="el-icon-caret-bottom" @click="toDownOne"></el-button>
                    <el-button  class="defaultBtn" icon="el-icon-upload2" @click="toTop"></el-button>
                    <el-button  class="defaultBtn" icon="el-icon-download" @click="toBottom"></el-button>
                    <el-table
                    :data="tableData"
                    border               
                    :height="bodyHeight"
                    element-loading-text="努力加载中..."
                    header-row-class-name="tableHeader" 
                    stripe 
                    tooltip-effect="dark"
                    row-key="id"
                    @selection-change="handleSelectionChange"             
                    class="defaultTable">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <template v-for="item in tableConfig">
                                <el-table-column v-if="!item.hidden"  :label="item.caption" :prop="item.dictData===null?item.fieldName:item.fieldName+'_Text'"  :width="item.width"></el-table-column>
                            </template>
                        </el-table>
                        <div class="footBtn">
                            <el-button class="defaultBtn" @click="keepAndback">生成档号并保存</el-button>
                            <el-button class="defaultBtn" @click="Gobacks">取消</el-button>
                        </div>
             </div>
        </div>
    </section>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import Sortable from 'sortablejs'
    import Service from './orderfix.service';
    import { Loading } from 'element-ui';

    @Component
    export default class orderfix extends Vue{
        windowHeight: number= document.documentElement.clientHeight;;
        bodyHeight: number= document.documentElement.clientHeight - 260 ; 
        tableData:any={};
        libId:number;
        tableConfig:any =[];
        fondId:number;
        ID:number;
        selection:any = [];
        loadingInstance:any;
        active:number;
        constructor(){
          super();
          this.tableData=[];
          this.tableConfig = [];
          this.selection = [];
        };

      //获取列表头部信息
        gettableConfig(ID){
            Service.getDispList(ID).then(res=>{
                if(res.data.succeeded){
                    this.tableConfig = res.data.data;
                    this.searchOrderfix({
                        libId:this.libId,
                        fondId:this.fondId,
                        id:this.ID
                    })
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //取页面数据
        searchOrderfix(params){
            Service.searchOrderfix(params).then(res=>{
                if(res.data.succeeded){
                    this.tableData = res.data.data;
                }else{
                    this.getError(res.data.errorMessage)
                };
            })
        };
       //生成档号
        generateDH(params){
                this.loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在保存，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                Service.generateDH(params).then(res=>{
                    if(res.data.succeeded){
                        this.Sucess('保存成功。')
                    }else{
                        this.getError(res.data.errorMessage);
                    };
                    this.$nextTick(() => { this.loadingInstance.close();
                    });
                });
        }
      //行的拖拽
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            const _this = this;
            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                    const currRow = _this.tableData.splice(oldIndex, 1)[0];
                    _this.tableData.splice(newIndex, 0, currRow);
                }
            })
        };

        //选中项
        handleSelectionChange(selection){
            this.selection = selection;
        };
        //向上调整
        upNumber(){
           if(this.selection.length<1){
                this.Warn("请选择档案。")
           }else if(this.selection.length>1){
                this.Warn("每次只能移动一条数据。")
           }else if(this.selection.length==1){
                var ind = null;
                var Id = this.selection[0].id;
                for(let key in this.tableData){
                    if(Id==this.tableData[key].id){
                        ind = key;
                    };
                };
                if(ind==0){
                    this.Warn('已经是当前页面第一条数据。')
                }else{
                  this.tableData.splice(ind,1);
                  this.tableData.splice(ind-1,0,this.selection[0])
                }
            }
        };
        //向下调整
        downNumber(){
             if(this.selection.length<1){
                this.Warn("请选择档案。")
             }else if(this.selection.length>1){
                this.Warn("每次只能移动一条数据。")
            }else if(this.selection.length==1){
                var ind = null;
                var Id = this.selection[0].id;
                for(let key in this.tableData){
                    if(Id==this.tableData[key].id){
                        ind = key;
                    };
                };
                console.log(ind)
             if(ind==this.tableData.length-1){
                    this.Warn('已经是当前页面最后一条数据。')
                }else{
                 this.tableData.splice(ind/1,1);
                 this.tableData.splice(ind/1+1,0,this.selection[0])
             }
            }
        };
        //不保存并返回
        Goback(){
            this['$router'].go(-1);
        };
         //取消返回
        Gobacks(){
            this['$router'].go(-1);
        };

        //保存并返回
        keepAndback(){
            this['$confirm']('您是否要保存并生成档号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.active==1){
                    this['$confirm']('是否重新生成卷内文件的档号?', '提示', {
                        confirmButtonText: '生成',
                        cancelButtonText: '不生成',
                        type: 'warning'
                    }).then(() => {
                        this.generateDH({
                            libId:this.libId,
                            data:this.tableData,
                            processJuanNei:true
                        })
                    }).catch(()=>{
                        this.generateDH({
                            libId:this.libId,
                            data:this.tableData,
                            processJuanNei:false
                        })
                    })
                }else{
                    this.generateDH({
                        libId:this.libId,
                        data:this.tableData
                    })
                }
            }).catch(()=>{
                this['$message']({
                    type: 'info',
                    message: '已取消'
                });
            })

        }
        created(){
            var str = window.sessionStorage.getItem('orderfix');
            var obj = JSON.parse(str);
            this.libId = obj.lib;
            this.fondId =obj.fond;
            this.ID = obj.id;
            this.active = obj.active;
        };
        mounted():void{
            this.gettableConfig(this.libId)
             window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 260;
                })()
            };         
            this.rowDrop();
        };

        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };

        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };

        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };
        myAJH(num){
            if(num!==null) {
                num = num+"";
                if (num.length == 1) {
                    return '000'+num;
                } else if (num.length == 2) {
                    return '00'+num;
                } else if (num.length == 3) {
                    return '0'+num;
                } else {
                    return num;
                }
            }else{
                return null;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../../styles/innerPublic.scss';

</style>