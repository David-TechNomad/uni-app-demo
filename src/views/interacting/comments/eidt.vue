<template>
    <section>
        <el-dialog
            title="意见详情"
            :visible.sync="eidtVisible"
            class="myDialog"
            fullscreen :close-on-click-modal="false" :modal-append-to-body='false'>
           
            <div class="box-card" v-if="tableData.length>0">
                <div class="userTime left" style="position: relative;left: 20%"><span>{{tableData[0].poster}}</span><span>{{tableData[0].postTime}}</span></div>
                <div class="title">{{tableData[0].postTitle}}</div>
                <p class="content">{{tableData[0].postContent}}</p>
                <p class="mt10 text-blue" style="color: cornflowerblue;" v-if="tableData[0].serverSaveFilename!=''" @click="downexportAllFile(tableData[0].serverSaveFilename)"><i class="fa fa-paperclip"></i>{{tableData[0].originalFileName}}</p>
           </div> 
           <div class="box-card" v-if="tableData.length>1" style="margin-top: 20px">
                <div class="userTime left" style="position: relative;left: 20%"><span>{{tableData[1].poster}}</span><span>{{tableData[1].postTime}}</span></div>
                <div class="title">{{tableData[1].postTitle}}</div>
                <p class="content">{{tableData[1].postContent}}</p>
                <p class="mt10 text-blue" style="color: cornflowerblue;" v-if="tableData[1].serverSaveFilename!=''" @click="downexportAllFile(tableData[1].serverSaveFilename)"><i class="fa fa-paperclip"></i>{{tableData[1].originalFileName}}</p>
           </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')" class="defaultBtn">关闭</el-button>
            </span>
        </el-dialog>
		
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';  
    import Service from './eidt.service';
    @Component
    export default class eidt extends Vue{
        bodyHeight: number;       
        eidtVisible: boolean = false;
        tableData:any=[];
        id:number;
        uploadUrl: string =  process.env.upload_BASEURL + '/file/simple/upload';      
        uploadType:any = {
          type:4
        };
        fileList:any= [];
        form: any ={
            "postTitle":"",
            "postContent":"",           
            "serverSaveFilename":""
        }
        ruleForm: any = {
            postTitle: [
                { required: true, message: '请填写标题', trigger: 'blur' }
            ],
            postContent: [
                { required: true, message: '请填写内容', trigger: 'blur'  }
            ]
        };
        constructor(){ 
            super(); 
        }; 
        getContent(val){ 
                let  parmes = {
                    "id":this.id,                    
                }
             Service.showOptionDetail(parmes).then((res) =>{
               if(res.data.succeeded){ 
                  this.tableData = res.data.data;
                }else{
                  this['$message']({
                            message: '获取列表失败',
                            type: 'error'
                        });
                 }
            });
        };
       resetForm(formName) {
            this.form={
                "postTitle":"",
                "postContent":"",           
                "serverSaveFilename":""
             }
            this.eidtVisible = false;
              
        };
        addReplay(formName){           
            this.$refs[formName].validate((valid) => {
                if (valid) {    
                    let parmes =  {
                            "parentId":this.id,
                            "postTitle":this.form.postTitle,
                            "postContent":this.form.postContent,
                            "originalFileName":this.fileList.length>0?this.fileList[0].name:"" ,
                            "serverSaveFilename":this.form.serverSaveFilename
                        }
                        Service.addReplay(parmes).then((res) =>{
                        if(res.data.succeeded){                                    
                            this['$message']({
                                    message: '回复成功',
                                        type: 'success'
                                    });
                               this.resetForm(); 
                               this.$parent.getList();   
                            }else{
                            this['$message']({
                                    message: '回复失败',
                                        type: 'error'
                                    });
                            }
                        });
                } 
            });               
        };
        beforeAvatarUpload(files, fileList) {
                this.fileList = fileList.slice(-1);
                this.$refs.upload.submit();
        }  
       // 文件上传成功回调
       handleDeviceSuccess(res, file) {           
           this.form.serverSaveFilename = res.data;          
        };
       downexportAllFile(id){            
            if(id) {
                 window.location.href = process.env.upload_BASEURL+'/file/simple/download?fileId='+id
            }
       };
       
        mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 163 - this.$refs.searchFromRef.$el.clientHeight;
                })()
            };   
        };
    }
</script>

<style lang="scss" scoped>     
  .userTime{
      width: auto;
      background: #2b87c6;
      padding:10px;
      color: #fff;
      span{
          margin-right:20px;
      }
        margin-bottom:10px;
  }
  .left{
      margin-left:-10px;
      float:left;
      border-top-right-radius:3px;
      border-bottom-right-radius:3px;
  }
   .right{
      margin-right:-10px;
      float:right;
      border-top-left-radius:3px;
      border-bottom-left-radius:3px;
  }
  .title{
    
      clear: both;
      font-weight: bold;
  }
  .content{
      margin-top:10px;
      clear: both;
      text-indent:2em;
  }
</style>