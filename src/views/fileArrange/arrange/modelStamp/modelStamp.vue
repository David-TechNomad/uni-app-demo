<template>
	 <section class="wrapprSection">
        <div class="mainTitle">
           <span>模板打印</span>
        </div>        
        <div class="treeOne tree ">
            <div class="treeTitle boxshow textBlue">
               模板选择
            </div>           
            <div class="treeCon boxshow icontree">                   
                <ul class="leftUl">
                    <li :class='{activeColor:index==nowIndex}' :key="index" v-for="(data,index) in ulData" @click="displayRight(data.templateId,index)">
                        {{index+1}} {{data.reportName}}
                    </li>
                </ul>        
            </div>
        </div>
                  <div class="TabRBtn">
                            <el-button class="defaultBtn" @click="printTemplate" :disabled="ulData.length===0">打印</el-button>
                            <el-button class="defaultBtn " @click="downLoadTemplate" :disabled="ulData.length===0" >下载</el-button>
                             <el-button class="defaultBtn" @click="Goback">返回</el-button>
                    </div>
        <div class="contentbox boxshow">
            <div class="searchCon">
                <iframe id='previewPdf' :src="file" height="100%"
                        width="100%">
                </iframe>		
	       </div>
        </div>
	</section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import InfiniteLoading from 'vue-infinite-loading';
    import Service from './modelStamp.service';
    import base from '@/scrollLoad';
    import { State, Getter, Action, Mutation ,namespace} from 'vuex-class';
    @Component({
        components: {
            InfiniteLoading
        },
    })
    export default class appSearch extends Vue{
        windowHeight: number;
        bodyHeight: number;
        timer: boolean;
        listLoading: boolean;
        fileVisible: boolean;
        scrollTip: boolean;
        loadSign: boolean;
        total: number;
        page: number;
        pageSize: number;
        rank:string;
        templateId: number;
        nowIndex: number;
        printArray:any = [];
        printArray1:any = [];
        filters: any = {};
        list: any = [];
        htmlUrl: any;
        file:any;
        fileUrl:any;
        reportName:string;
        listChildren: any = [];
        data: any = [];
        tableHeadArrs: any = [];
        ulData: any = [];
        fileForm: any = {};
        fondParams: any = {};
        // @State('fileForm') fileForm;
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 180;
            this.timer = false;
            this.templateId = 1;
            this.fileVisible = false;
            this.htmlUrl = null;
            this.file = null;
            this.fileUrl = null;
            this.reportName = '';
            this.total = 1;
            this.page = 0;
            this.rank = '';
            this.printArray = [];
            this.ulData = [];
            this.pageSize = 10;
            this.nowIndex = 0;
            this.listLoading = false;
            this.scrollTip = true;
            this.loadSign = true;
            this.list = [];
            this.listChildren = [];
            this.tableHeadArrs = [];
            this.data = [];
        };
        back():void{
            let a = window.sessionStorage.getItem('typePrint');
            if(a =='1'){
                this['$router'].push({path:'/fileArrange/arrange'});
            }else{               
            }
        };

        // 左侧表格
        leftTable(){
            let ids = this.printArray1.map(item => item.id).toString();
            let params = {
                libId:Number(this.rank) ,
                // libId:104,
                selId:ids,
                type:window.sessionStorage.getItem('typePrint')
            };
            Service.getTable(params).then((res) =>{
                if(res.data.succeeded){
                    this.ulData = res.data.data;
                    if(this.ulData.length>0){
                        let a = this.ulData[0].templateId;
                        this.displayRight(a,this.nowIndex);
                    }
                }else{
                    this.listLoading = false;
                    this['$message']({
                        message: '查询打印列表失败！',
                        type: 'error'
                    });
                }
            });
        }

        // 转化文件流
        getObjectURL(file) {
            let url = null;
            if (window['createObjectURL'] != undefined) { // basic
                url = window['createObjectURL'](file);
            } else if (window['createObjectURL'] != undefined) { // webkit or chrome
                url = window['webkitURL']['createObjectURL'](file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL['createObjectURL'](file);
            }
            return url;
        };

        // 初始化pdf
        displayRight(id,index){
            let baseParams = {};
            for(let print of this.printArray){
                baseParams[print.id] = {
                    "DH" : print.DH?print.DH.toString():''
                }
            }
            let ids = this.printArray1.map(item => item.id).toString();
            this.nowIndex = index;
            this.templateId = id;
            let params = {
                tempId:1,
                actionType:'print',
                paramJson:base['base64'].encode(
                    JSON.stringify(baseParams)
                ),
                libId:Number(this.rank),
                // libId:104,
                selId:ids
            };
            params.tempId = this.templateId;
            Service.printTable(params).then((res) =>{
                if (res) {
                    this.fileUrl = this.getObjectURL(res);
                    this.file = 'static/pdf/web/viewer.html?file=' + this.fileUrl;
                }else{
                    this['$message']({
                        message: '展示失败！',
                        type: 'error'
                    });
                }
            });
        }
          Goback(){
            this['$router'].go(-1);
        };
        // // 右侧预览
        // displayRight(id,index){
        //     let baseParams = {};
        //     for(let print of this.printArray){
        //         baseParams[print.id] = {
        //             "DH" : print.DH.toString()
        //         }
        //     }
        //     console.log(baseParams)
        //     let ids = this.printArray.map(item => item.id).toString();
        //     this.nowIndex = index;
        //     this.templateId = id;
        //     let params = {
        //         tempId:1,
        //         actionType:'preview',
        //         paramJson:base['base64'].encode(
        //             JSON.stringify(baseParams)
        //         ),
        //         libId:Number(this.rank) ,
        //         // libId:104,
        //         selId: ids,
        //     };
        //     params.tempId = id;
        //     Service.displayTable(params).then((res) =>{
        //         this.htmlUrl = res;
        //     });
        // };

        // // 下载
        // downLoadTemplate(){
        //     let baseParams = {};
        //     for(let print of this.printArray){
        //         baseParams[print.id] = {
        //             "AJH" : print.AJH.toString()
        //         }
        //     }
        //     let ids = this.printArray.map(item => item.id).toString();
        //     let params = {
        //         tempId:1,
        //         actionType:'download',
        //         paramJson:base['base64'].encode(
        //             JSON.stringify(baseParams)
        //         ),
        //         libId:Number(this.rank) ,
        //         // libId:104,
        //         selId:ids,
        //     };
        //     let name = this.reportName;
        //     params.tempId = this.templateId;
        //     Service.downLoadTable(params).then((res) =>{
        //         if (res) {
        //             let url = window["URL"].createObjectURL(new Blob([res]));
        //             let link = document.createElement('a');
        //             link.style.display = 'none';
        //             link["href"] = url;
        //             link.setAttribute('download','文件.pdf');
        //             document.body.appendChild(link);
        //             link.click();
        //         }else{
        //             this['$message']({
        //                 message: '下载失败！',
        //                 type: 'error'
        //             });
        //         }
        //     });
        // };
        //
        // // 打印
        // printTemplate(){
        //     let baseParams = {};
        //     for(let print of this.printArray){
        //         baseParams[print.id] = {
        //             "DH" : print.DH.toString()
        //         }
        //     }
        //     let ids = this.printArray.map(item => item.id).toString();
        //     let params = {
        //         tempId:1,
        //         actionType:'print',
        //         paramJson:base['base64'].encode(
        //             JSON.stringify(baseParams)
        //         ),
        //         libId:Number(this.rank) ,
        //         // libId:104,
        //         selId:ids
        //     };
        //     params.tempId = this.templateId;
        //     Service.printTable(params).then((res) =>{
        //         if (res) {
        //             let url = window["URL"].createObjectURL(new Blob([res],{type: 'application/pdf'}));
        //             window.open(url)
        //         }else{
        //             this['$message']({
        //                 message: '打印失败！',
        //                 type: 'error'
        //             });
        //         }
        //     });
        // };

        created(){
            this.printArray =  JSON.parse(window.sessionStorage.getItem('printArray'));
            this.printArray1 =  JSON.parse(window.sessionStorage.getItem('printArray1'));
            this.rank = window.sessionStorage.getItem('rank');

        };

        mounted(){
            this.leftTable();
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 180;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>
	 @import '../../../../styles/innerPublic.scss';
    @import '../../../../styles/fileManage/arrange.scss';
</style>