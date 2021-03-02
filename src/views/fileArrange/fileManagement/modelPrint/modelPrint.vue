<template>
	<section>
		<div class="mainTitle">
			<p style="float:left;line-height:30px;font-size:16px;font-weight:600;border-left: 6px solid #4991CF;padding-left:5px;color: #000;margin:10px 0;">文件管理</p>
			<span style='border:none;'>模板打印</span>
			<el-button class="checkWay rt SearchBack" @click="back" style="margin:10px">返回</el-button>
		</div>
		<div class="treeOne tree">
			<p style="margin:10px 0;text-align:center;font-size:15px;">模板选择</p>
			<ul class="leftUl">
				<li :class='{activeColor:index==nowIndex}' :key="index" v-for="(data,index) in ulData" @click="displayRight(data.templateId,index)">
					{{index+1}} {{data.reportName}}
				</li>
			</ul>
		</div>
		<div class="search">
			<div class="searchCon">
				<div class="displayCon">
					<iframe id='previewPdf' :src="file" height="100%"
							width="100%">
					</iframe>
				</div>
				<!--<el-button class="checkWay rt" @click="printTemplate" style="margin:10px;" :disabled="ulData.length===0">打印</el-button>-->
				<!--<el-button class="checkWay rt" @click="downLoadTemplate" :disabled="ulData.length===0" style="margin:10px 0;">下载</el-button>-->
			</div>
		</div>
	</section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import InfiniteLoading from 'vue-infinite-loading';
    import Service from './modelPrint.service';
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
            this.printArray1 = [];
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
                this['$router'].push({path:'/fileArrange/fileManagement'});
			}else{
                this['$router'].push({path:'/fileArrange/fileManagement/infile'});
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
	@import '../../../../styles/retrieve/search';
	@import '../../../../styles/retrieve/superSearch';
	.leftUl{
		position:absolute;
		top:35px;
		left:15px;
		right:15px;
		bottom:10px;
		border:1px solid #ccc;
		background:#f6f6f6;
	}
	.leftUl li{
		padding:10px 20px;
		cursor:pointer;
		border-bottom:1px solid #ccc;
	}
	.displayCon{
		position:absolute;
		top:15px;
		left:15px;
		right:15px;
		bottom:15px;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.activeColor{
		color:#fff;
		background:#428bca;
	}
</style>