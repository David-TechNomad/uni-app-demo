<template>
    <section class="NextKuaDetail">
        <div class="conbinefilet">
            <span>跨全宗移交</span>
            <el-button class="checkWay" @click="goBack">返回</el-button>
        </div>
        <div class="tableheated" style="width: 55%;float: left; background: #fff;margin-left:10px;">
            <div class="sorts" style="padding:10px 5px">
                <span>要移动的目录</span>
                <el-checkbox v-model="checked">删除原目录</el-checkbox>
            </div>

            <div class="enterstoreTables" >
                <!--档案表格-->
                <el-row class="fileList" style='padding:0 5px'>
                    <el-col :span="24">
                        <el-table
                                :data="fileList"
                                style="width:100%"
                                ref="tableOne"
                                border
                                :stripe="true"
                                :height="tableHeight"
                                class="containTable indexTable"
                                @selection-change="selectionChange"
                                heighlight-current-row
                        >
                            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                            <template v-for="item in tableHeader">
                                <el-table-column v-if="item.fieldName=='AJH'"  :width="item.width" :label="item.caption">
                                    <template slot-scope="scope">{{myAJH(scope.row.AJH)}}</template>
                                </el-table-column>
                                <el-table-column v-if="item.fieldName!='AJH' && item.fieldName!='ARCHIVE_STATUS'"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption"></el-table-column>
                                <el-table-column v-if="item.fieldName=='ARCHIVE_STATUS'"  :width="item.width" :label="item.caption" :key="item.fieldName">
                                   <template slot-scope="scope">
                                       <span v-if="scope.row.ARCHIVE_STATUS===0"></span>
                                       <span v-if="scope.row.ARCHIVE_STATUS===1"><i class="fa fa-file-archive-o" title="文件移交中"></i></span>
                                       <span v-if="scope.row.ARCHIVE_STATUS===2"><i class="fa fa-file-pdf-o" title="跨全宗移交中"></i></span>
                                   </template>
                                </el-table-column>
                            </template>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="raw" style="width:43%;float:right;background:#fff" v-show="rawSHow">
            <div class="duiying">
                <span>案卷著录项对应</span>
                <el-button class="checkWay" style="float:right;" v-show="active==4" @click="allOKB">完成</el-button>
                <el-button class="checkWay" style="float:right;margin-right:10px;" v-show="active==3" @click="rawshowA">下一步</el-button>
                <el-button class="checkWay" style="float:right;margin-right: 8px;" @click="goBack">上一步</el-button>
            </div>
            <div class="left">
                <span>原档案库</span>
                <div class="searchCompany">{{selectValueY}}</div>
                <div class="treeTitle thisTitle" style='top:42px;'>
                    <p  v-for='(item,index) in formerList' :key='index' @click="activeSelectY( item.value,item.key,index)"  :class="index==selectIndexY?'active':''">{{item.value}}</p>
                </div>
                <div class="fabutton" style="margin-right:5px">
                    <p class="fontClass">
                        <el-button @click="upY()" type="primary" icon="el-icon-caret-top" style="margin-left:10px"></el-button>
                        <el-button @click="downY()" type="primary" icon="el-icon-caret-bottom"></el-button>
                        <el-button @click="deleteSelect(1)"  type="primary" icon="el-icon-close"></el-button>
                        <el-button type="primary" icon="el-icon-refresh" @click="resetY"></el-button>
                    </p>
                </div>
            </div>
            <div class="right">
                <span>目标档案库</span>
                <div class="searchCompany">{{selectValueM}}</div>
                <div class="treeTitle thisTitle">
                    <p v-for='(item,index) in targetList' :key='index'  @click="activeSelectM( item.value,item.key,index)"  :class="index==selectIndexM?'active':''">{{item.value}}</p>
                </div>
                <div class="fabutton">
                    <p class="fontClass">
                        <el-button @click="upM()" type="primary" icon="el-icon-caret-top" style="margin-left:10px"></el-button>
                        <el-button @click="downM()" type="primary" icon="el-icon-caret-bottom"></el-button>
                        <el-button @click="deleteSelect(2)" type="primary" icon="el-icon-close"></el-button>
                        <el-button type="primary" icon="el-icon-refresh" @click="resetM"></el-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="raw" style="width:43%;float:right;background:#fff" v-show="!rawSHow">
            <div class="duiying">
                <span>文件著录项对应</span>
                <el-button class="checkWay" style="float:right;" @click="allOK">完成</el-button>
                <!--<el-button class="checkWay" style="float:right;margin-right: 8px;" ></el-button>-->
                <el-button class="checkWay" style="float:right;margin-right:10px;" @click="proOne">上一步</el-button>

            </div>
            <div class="left">
                <span>原档案库</span>
                <div class="searchCompany">{{selectValueYB}}</div>
                <div class="treeTitle thisTitle" style='top:42px;'>
                    <p  v-for='(item,index) in formerListB' :key='index' @click="activeSelectYB( item.value,item.key,index)"  :class="index==selectIndexYB?'active':''">{{item.value}}</p>
                </div>
                <div class="fabutton" style="margin-right:3px">
                    <p class="fontClass">
                        <el-button @click="upYB()" type="primary" icon="el-icon-caret-top" style="margin-left:10px"></el-button>
                        <el-button @click="downYB()" type="primary" icon="el-icon-caret-bottom"></el-button>
                        <el-button @click="deleteSelectB(1)"  type="primary" icon="el-icon-close"></el-button>
                        <el-button type="primary" icon="el-icon-refresh" @click="resetYB"></el-button>
                    </p>
                </div>
            </div>
            <div class="right">
                <span>目标档案库</span>
                <div class="searchCompany">{{selectValueMB}}</div>
                <div class="treeTitle thisTitle" style="">
                    <p v-for='(item,index) in targetListB' :key='index'  @click="activeSelectMB( item.value,item.key,index)"  :class="index==selectIndexMB?'active':''">{{item.value}}</p>
                </div>
                <div class="fabutton">
                    <p class="fontClass">
                        <el-button @click="upMB()" type="primary" icon="el-icon-caret-top" style="margin-left:10px"></el-button>
                        <el-button @click="downMB()" type="primary" icon="el-icon-caret-bottom"></el-button>
                        <el-button @click="deleteSelectB(2)" type="primary" icon="el-icon-close"></el-button>
                        <el-button type="primary" icon="el-icon-refresh" @click="resetMB"></el-button>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Service from './NextKuaDetail.service'
    @Component
    export default class contrastitem extends Vue{
        windowHeight: number;
        bodyHeight: number;
        rawSHow:boolean;
        libId:number;
        IdArr:any=[];
        kindId:number;
        fondId:number;
        selection:any = [];
        tableHeader:any = [];
        checked:boolean;
        tableHeight:number;
        fileList:any=[];
        formerList:any=[];//yuanlai
        targetList:any=[];
        formerListB:any=[];//yuanlai
        targetListB:any=[];
        selectValueY : string;
        selectValueYB : string;
        selectIndexY:number;
        selectIndexYB:number;
        selectValueM : string;
        selectValueMB : string;
        selectIndexM:number;
        selectIndexMB:number;
        ct:string;
        cy:string;
        targetId:string;
        targetfond:number;
        active:number;
        targetStore:string;
        fromStore:string;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 130 ;
            this.rawSHow = true;
            this.tableHeight=document.documentElement.clientHeight-175;
            this.selection = [];
            this.tableHeader = [];
            this.checked=false;
            this.formerList=[];
            this.targetList=[];
            this.formerListB=[];
            this.targetListB=[];
            this.selectValueY='';
            this.selectIndexY=0;
            this.selectValueM='';
            this.selectIndexM=0;
            this.selectValueYB='';
            this.selectIndexYB=0;
            this.selectValueMB='';
            this.selectIndexMB=0;
        };
        selectionChange(selection){
            this.selection=selection;
        };
        //返回
        goBack():void{
            this['$router'].go(-1);
        };
        rawshowA(){
            if(this.formerList.length==this.targetList.length){
                this.rawSHow = false;
            }else{
                this.Warn('请保持目标库与当前库的著录项个数一致')
            }
        };
        proOne(){
            this.rawSHow = true;
        };
        //获取列表头部信息
        getListConfig(ID){
            Service.getListConfig(ID).then(res=>{
                if(res.data.succeeded){
                    this.tableHeader = res.data.data;
                    this.QueryFileTransferApply({libId:this.libId,ids:this.IdArr})
                    console.log(this.tableHeader)
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        //获取表格数据
        QueryFileTransferApply(params){
            Service.QueryFileTransferApply(params).then(res=>{
                if(res.data.succeeded){
                    var listData = JSON.parse(window.sessionStorage.getItem('getAddFileList1')).list
                    console.log(listData)
                    this.fileList = listData;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        activeSelectY(value,key,i){
            // this.selectValueY=value;
            this.selectIndexY=i;
             // this.selectKeyY=key
        }
        activeSelectM(value,key,i){
            // this.selectValueM=value;
            this.selectIndexM=i;
            // this.selectKeyM=key
        }

        upY(){
            let curIndex = this.selectIndexY,
                prevIndex = curIndex--,
                arr = this.formerList || [];

            if(this.selectIndexY == 0){
                let cur = arr[this.selectIndexY]
                arr.splice(0,1)
                arr.splice((this.formerList.length),0,cur)
                this.formerList=[...arr]
                this.selectIndexY=this.formerList.length-1
            }else{
                let cur = arr[curIndex],
                    prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.formerList=[...arr]
                this.selectIndexY--
            }
            // let curIndex = this.selectIndexY,
            //     prevIndex = curIndex--,
            //     arr = this.formerList || [];
            //
            // if(curIndex == 0) this.Warn("已经是第一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.formerList=[...arr]
            // this.selectIndexY--

        };

        downY(){
            let curIndex = this.selectIndexY,
                prevIndex = curIndex++,
                arr = this.formerList || [];

            if(this.selectIndexY == (this.formerList.length-1)) {
                let cur = arr[this.selectIndexY]
                arr.splice((this.formerList.length-1),1)
                arr.splice(0,0,cur)
                this.formerList=[...arr]
                this.selectIndexY=0
            }else{
                let cur = arr[curIndex],
                    prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.formerList=[...arr]
                this.selectIndexY++
            }
            // let curIndex = this.selectIndexY,
            //     prevIndex = curIndex++,
            //     arr = this.formerList || [];
            //
            // if(curIndex == (this.formerList.length-1)) this.Warn("已经是最后一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.formerList=[...arr]
            // this.selectIndexY++
        }

        upM(){
            let curIndex = this.selectIndexM,
                prevIndex = curIndex--,
                arr = this.targetList || [];

            if(this.selectIndexM == 0){
                let cur = arr[this.selectIndexM]
                arr.splice(0,1)
                arr.splice((this.targetList.length),0,cur)
                this.targetList=[...arr]
                this.selectIndexM=this.targetList.length-1
            }else{
                let cur = arr[curIndex],
                    prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.targetList=[...arr]
                this.selectIndexM--
            }

            // let curIndex = this.selectIndexM,
            //     prevIndex = curIndex--,
            //     arr = this.targetList || [];
            //
            // if(curIndex == 0) this.Warn("已经是第一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.targetList=[...arr]
            // this.selectIndexM--

        };
        downM(){
            let curIndex = this.selectIndexM,
                prevIndex = curIndex++,
                arr = this.targetList || [];

            if(this.selectIndexM == (this.targetList.length-1)) {
                let cur = arr[this.selectIndexM]
                arr.splice((this.targetList.length-1),1)
                arr.splice(0,0,cur)
                this.targetList=[...arr]
                this.selectIndexM=0
            }else{
                let cur = arr[curIndex],
                    prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.targetList=[...arr]
                this.selectIndexM++
            }

            // let curIndex = this.selectIndexM,
            //     prevIndex = curIndex++,
            //     arr = this.targetList || [];
            // if(curIndex == (this.targetList.length-1)) this.Warn("已经是最后一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.targetList=[...arr]
            // this.selectIndexM++
        }
        deleteSelect(inx){
            if(inx==1){
                this.formerList.splice(this.selectIndexY,1);
                this.selectIndexY=0
                // this.selectValueY=this.formerList[0].value
                // this.selectKeyY=this.formerList[0].key
            }else if(inx==2){
                this.targetList.splice(this.selectIndexM,1)
                this.selectIndexM=0
                // this.selectValueM=this.targetList[0].value
                // this.selectKeyM=this.targetList[0].key

            }
        };
        activeSelectYB(value,key,i){
            // this.selectValueYB=value;
            this.selectIndexYB=i;
            // this.selectKeyY=key
        }
        activeSelectMB(value,key,i){
            // this.selectValueMB=value;
            this.selectIndexMB=i;
            // this.selectKeyM=key
        }

        upYB(){
            let curIndex = this.selectIndexYB,
                prevIndex = curIndex--,
                arr = this.formerListB || [];

            if(this.selectIndexYB == 0){
                let cur = arr[this.selectIndexYB]
                arr.splice(0,1)
                arr.splice((this.formerListB.length),0,cur)
                this.formerListB=[...arr]
                this.selectIndexYB=this.formerListB.length-1
            }else{
                let cur = arr[curIndex],
                    prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.formerListB=[...arr]
                this.selectIndexYB--
            }
            // let curIndex = this.selectIndexYB,
            //     prevIndex = curIndex--,
            //     arr = this.formerListB || [];
            //
            // if(curIndex == 0) this.Warn("已经是第一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.formerListB=[...arr]
            // this.selectIndexYB--

        };

        downYB(){
            let curIndex = this.selectIndexYB,
                prevIndex = curIndex++,
                arr = this.formerListB || [];

            if(this.selectIndexYB == (this.formerListB.length-1)) {
                let cur = arr[this.selectIndexYB]
                arr.splice((this.formerListB.length-1),1)
                arr.splice(0,0,cur)
                this.formerListB=[...arr]
                this.selectIndexYB=0
            }else{
                let cur = arr[curIndex],
                prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.formerListB=[...arr]
                this.selectIndexYB++
            }
            // let curIndex = this.selectIndexYB,
            //     prevIndex = curIndex++,
            //     arr = this.formerListB || [];
            //
            // if(curIndex == (this.formerListB.length-1)) this.Warn("已经是最后一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.formerListB=[...arr]
            // this.selectIndexYB++
        }

        upMB(){

            let curIndex = this.selectIndexMB,
                prevIndex = curIndex--,
                arr = this.targetListB || [];

            if(this.selectIndexMB == 0){
                let cur = arr[this.selectIndexMB]
                arr.splice(0,1)
                arr.splice((this.targetListB.length),0,cur)
                this.targetListB=[...arr]
                this.selectIndexMB=this.targetListB.length-1
            }else{
                let cur = arr[curIndex],
                    prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.targetListB=[...arr]
                this.selectIndexMB--
            }// let curIndex = this.selectIndexMB,
            //     prevIndex = curIndex--,
            //     arr = this.targetListB || [];
            //
            // if(curIndex == 0) this.Warn("已经是第一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.targetListB=[...arr]
            // this.selectIndexMB--

        };
        downMB(){
            let curIndex = this.selectIndexMB,
                prevIndex = curIndex++,
                arr = this.targetListB || [];

            if(this.selectIndexMB == (this.targetListB.length-1)) {
                let cur = arr[this.selectIndexMB]
                arr.splice((this.targetListB.length-1),1)
                arr.splice(0,0,cur)
                this.targetListB=[...arr]
                this.selectIndexMB=0
            }else{
                let cur = arr[curIndex],
                    prev = arr[prevIndex];
                arr[curIndex] = prev;
                arr[prevIndex] = cur;
                this.targetListB=[...arr]
                this.selectIndexMB++
            }

            // let curIndex = this.selectIndexMB,
            //     prevIndex = curIndex++,
            //     arr = this.targetListB || [];
            // if(curIndex == (this.targetListB.length-1)) this.Warn("已经是最后一条数据");
            // let cur = arr[curIndex],
            //     prev = arr[prevIndex];
            // arr[curIndex] = prev;
            // arr[prevIndex] = cur;
            // this.targetListB=[...arr]
            // this.selectIndexMB++
        }
        deleteSelectB(inx){
            if(inx==1){
                this.formerListB.splice(this.selectIndexYB,1);
                this.selectIndexYB=0
                // this.selectValueYB=this.formerListB[0].value
                // this.selectKeyY=this.formerList[0].key
            }else if(inx==2){
                this.targetListB.splice(this.selectIndexMB,1)
                this.selectIndexMB=0
                // this.selectValueMB=this.targetListB[0].value
                // this.selectKeyM=this.targetList[0].key

            }
        };
        resetY(){
            var str = window.sessionStorage.getItem('srcFields1');
            this.formerList = JSON.parse(str);
            this.selectIndexY=0;
        };
        resetM(){
            var str1 = window.sessionStorage.getItem('targetFields1');
            this.targetList = JSON.parse(str1);
            this.selectIndexM=0;
        };
        resetYB(){
            var str = window.sessionStorage.getItem('WJSrcFields1');
            this.formerListB = JSON.parse(str);
            this.selectIndexYB=0;
        };
        resetMB(){
            var str1 = window.sessionStorage.getItem('WJTargetFields1');
            this.targetListB = JSON.parse(str1);
            this.selectIndexMB=0;
        };
        created(){
            var str = window.sessionStorage.getItem('contrastItem1');
            var obj = JSON.parse(str)
            this.libId = obj.lib;
            // for(var item of this['$route'].query.ids){
            //     this.IdArr.push(item/1)
            // };
            var listData = JSON.parse(window.sessionStorage.getItem('getAddFileList1')).list;
            for(var item of listData){
                this.IdArr.push(item.id)
            }
            
            this.kindId = obj.kind/1;
            this.libId = obj.lib/1;
            this.fondId = obj.fond/1;
            this.ct = obj.ct;
            this.cy = obj.cy;
            this.targetId = obj.targetId;
            this.targetfond = obj.targetfond;
            this.targetStore =  obj.targetStore;
            this.fromStore =  obj.fromStore;
            this.selectValueY = this.fromStore;
            this.selectValueM = this.targetStore;
            // this.libId = this['$route'].query.lib;
            // for(var item of this['$route'].query.ids){
            //     this.IdArr.push(item/1)
            // };
            // this.kindId = this['$route'].query.kind/1;
            // this.libId = this['$route'].query.lib/1;
            // this.fondId = this['$route'].query.fond/1;
            // this.ct = this['$route'].query.ct;
            // this.cy = this['$route'].query.cy;
            // this.targetId = this['$route'].query.targetId;
            // this.targetfond = this['$route'].query.targetfond;
            // this.targetStore =  this['$route'].query.targetStore;
            // this.fromStore =  this['$route'].query.fromStore;
            // this.selectValueY = this.fromStore;
            // this.selectValueM = this.targetStore;
            if(this.selectValueY.indexOf('-案卷库')!=-1){
                var str = this.selectValueY;
                this.selectValueYB = str.replace('-案卷库','-卷内文件库')
            }else{
                var str = this.selectValueY;
                this.selectValueYB = str+'-卷内文件库'
            };
            if(this.selectValueM.indexOf('-案卷库')!=-1){
                var str = this.selectValueM;
                this.selectValueMB = str.replace('-案卷库','-卷内文件库')
            }else{
                var str = this.selectValueM;
                this.selectValueMB = str+'-卷内文件库'
            }
            this.active = obj.active/1;
            this.getListConfig(this.libId);
            var str = window.sessionStorage.getItem('srcFields1');
            this.formerList = JSON.parse(str)
            // this.selectValueY=this.formerList[0].value;
            var str1 = window.sessionStorage.getItem('targetFields1');
            this.targetList = JSON.parse(str1);
            // this.selectValueM=this.targetList[0].value;
            var str = window.sessionStorage.getItem('WJSrcFields1');
            this.formerListB = JSON.parse(str)
            // this.selectValueYB=this.formerListB[0].value;
            var str1 = window.sessionStorage.getItem('WJTargetFields1');
            this.targetListB = JSON.parse(str1);
            // this.selectValueMB=this.targetListB[0].value;
            if(obj.check){
                this.checked=true;
            }
            //获取原档案库 
            Service.getLibArchiveName({
                transferId:JSON.parse(window.sessionStorage.getItem('kuaTransforDetails')).transferId //JSON.parse(window.sessionStorage.getItem('kuaChangeDetails'))
            }).then(res=>{
                 var str = window.sessionStorage.getItem('kuaTransforDetails');
                 var obj = JSON.parse(str);
                 if(obj.active == 3){
                      this.selectValueY = res.data.data.anjuanLibName;
                      this.selectValueYB = res.data.data.wenjianLibName;
                 }else if(obj.active == 4){
                      this.selectValueY = res.data.data.wenjianLibName;
                 }
               
            })
        };
        allOK(){
            if(this.formerListB.length==this.targetListB.length){
                var AJarr = [];
                for(var key in this.formerList){
                    AJarr.push({key:this.formerList[key].key,value:this.targetList[key].key})
                };
                var WJarr = [];
                for(var key in this.formerListB){
                    WJarr.push({key:this.formerListB[key].key,value:this.targetListB[key].key})
                };
                var arr = [];
                for(var item of this.fileList){
                    arr.push(item.id)
                };
                var obj = {
                    kind:this.kindId,
                    lib:this.libId,
                    fond:this.fondId,
                    ids:arr,
                    ct:this.ct,
                    cy:this.cy,
                    targetId:this.targetId,
                    targetfond:this.targetfond,
                    type:'2',
                    active:3
                };
                if(this.checked){
                    obj['check']=1;
                };
                window.sessionStorage.setItem('recordTransferApply1',JSON.stringify(obj))
                this['$router'].push({
                    path:'/selfTip/kuaChangeDetails/kuaChangeDetails',
                    name: '相关档案的跨全宗修改'
                    // query:obj
                });
                window.sessionStorage.setItem('AJmap',JSON.stringify(AJarr));
                window.sessionStorage.setItem('WJmap',JSON.stringify(WJarr));
            }else{
                this.Warn('请保持目标库与当前库的著录项个数一致')
            };
        };
        allOKB(){
            if(this.formerList.length==this.targetList.length){
                var WJarr = [];
                for(var key in this.formerList){
                    WJarr.push({key:this.formerList[key].key,value:this.targetList[key].key})
                };
                var arr = [];
                for(var item of this.fileList){
                    arr.push(item.id)
                };
                var obj = {
                    kind:this.kindId,
                    lib:this.libId,
                    fond:this.fondId,
                    ids:arr,
                    ct:this.ct,
                    cy:this.cy,
                    targetId:this.targetId,
                    targetfond:this.targetfond,
                    type:'2',
                    active:4
                };
                if(this.checked){
                    obj['check']=1;
                }
                window.sessionStorage.setItem('recordTransferApply',JSON.stringify(obj))
                this['$router'].push({
                    path:'/selfTip/kuaChangeDetails/kuaChangeDetails',
                    name: '相关档案的跨全宗修改'
                    // query:obj
                });
                window.sessionStorage.setItem('WJmap',JSON.stringify(WJarr));
            }else{
                this.Warn('请保持目标库与当前库的著录项个数一致')
            };
        }
        mounted():void{
            window["addEventListener"]("resize",()=>{
                this.tableHeight=document.documentElement.clientHeight-175;
                this.bodyHeight = document.documentElement.clientHeight - 175;
            });
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
        //案卷号
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

<style scoped lang="scss">
@import '../../../styles/archiveManage/nextKuaDetail.scss';
</style>