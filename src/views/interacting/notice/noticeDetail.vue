<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>公告中心详情</span>
           <el-button class="defaultBtn rt mt10" @click="back">返回</el-button>
        </div>
        <div class="noticeTitle ta-c">           
              <p class="mainTitle">{{noticeTitle}}</p>
              <p class="subTitle mt10">{{publishDepartment}} <span>  发布时间：{{ publishTime | dateFormat}}</span></p>
        </div>      
        <div class="contentbox boxshow mt40">
            <div class="searchCon">  
                <p class="content" v-html="content">{{content}}</p>
                <p v-if="originalFileName && attachmentName" >
                  <i class="fa fa-paperclip tableIcon cur-p" @click="downEnclosure(attachmentName)"></i> 
                  <span>{{originalFileName}}</span>
                </p>
            </div>
        </div> 
        <superSearch ref="superSearch"></superSearch> 
       </section>
</template>

<script lang="ts">
   import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './notice.service';
    import { State, Getter, Mutation, } from 'vuex-class'; 
     import { Loading } from 'element-ui';                            
    import superSearch from '@/components/superSearch/superSearch.vue';
   @Component({
        components: { 
            superSearch
        },
    })
    export default class appSuperSearch extends Vue{
        @State catNum :number;
        @Mutation('SET_CATNUM') SET_isShow: () => void;
        windowHeight: number= document.documentElement.clientHeight;
        bodyHeight: number= document.documentElement.clientHeight - 300 ; 
        radio3: string = '1';
        loadingInstance:any={};
        noticeTitle: string = '';
        content: string = '';
        publishTime: string = '';
        originalFileName: string = '';
        attachmentName: string = '';
        BASEURL: string =  process.env.upload_BASEURL;
        publishDepartment: string = '';
        detailId: string = '';
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
        back():void{
            this['$router'].go(-1);
        };
        superSearchShow(){
           this.$nextTick(() => {
             this.$refs.superSearch.superSearchVisible=true;           
           })          
        }
        downEnclosure(id) {
            let self = this;
            self['$confirm']('您是否要下载附件?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              if(id) {
                window.location.href = self.BASEURL + '/file/simple/download?fileId='+id+''
              } else {
                self.Warn('附件不存在！');
              }
            });
        }
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };
        //获取公告中心详情
        AnnouncementDetail() {
            let self = this;
            let loadingInstance = Loading.service(
                  {
                      lock: true,
                      text: '正在获取数据中，请稍等',
                      // spinner: 'el-icon-loading',
                      background: 'rgba(0, 0, 0, 0.7)'
                  }
              );
            Service.showDetail({id:this.detailId}).then((res) =>{
                if(res.data.succeeded) {
                  // noticeTitle: string = '';
                  // content: string = '';
                  // publishTime: string = '';
                    console.log(res.data.data);
                    this.noticeTitle = res.data.data.title;
                    this.content = res.data.data.content;
                    this.attachmentName = res.data.data.attachmentName;
                    this.originalFileName = res.data.data.originalFileName
                    this.publishTime = res.data.data.publishTime;
                    this.publishDepartment = res.data.data.publishDepartment;
                } else {
                    self.Warn(res.data.message);
                }
                self.$nextTick(() => { loadingInstance.close();});
            })
        }
        handleCurrentChange(val:number) {
            this.page = val;
            this.start = (val-1)*(this.limit);           
        };
        handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page-1);         
        };

        created(){ 
          let params;
          params = this.$route.params;
          if(params.id) {
              sessionStorage.removeItem('noticeDetailParamsData');
              sessionStorage.setItem("noticeDetailParamsData", JSON.stringify(params)); //把上个页面的路由带过来的参数保存到sessionStorage 
          } else {
              params = JSON.parse(sessionStorage.getItem("noticeDetailParamsData"));
          }
          this.detailId = params.id;
          this.AnnouncementDetail();             
        };

        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 300;
                })()
            };
        };
    }
</script>

<style lang="scss" scoped>  
   @import '../../../styles/innerPublic.scss';
   @import '../../../styles/interacting/notice.scss';
   .wrapprSection {
       .noticeTitle{
           .mainTitle{
               font-size: 18px;
               color: rgb(17, 17, 17);
               font-weight: bold;
           }
           .subTitle{
               font-size: 12px;
               color: rgb(16, 16, 16);
           }
       }
       .contentbox {
           .content {
               line-height: 2;
           }
       }
   }
</style>