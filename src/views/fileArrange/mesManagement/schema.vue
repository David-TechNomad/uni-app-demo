<template>
    <section class="wrapprSection">
        <div class="mainTitle">
           <span>schema设置方案</span>
        </div>
        <div class="searchKey boxshow contentbox-full">           
              <el-form :inline="true" v-model="form" >                
                <el-form-item label="门类名称：">
                    <el-input placeholder="题名" size="small" v-model="form.kindName"></el-input>
                </el-form-item>
                <el-form-item label="方案名称：">
                    <el-input placeholder="年度" size="small" v-model="form.tempName"></el-input>
                </el-form-item>                            
                <el-form-item label="方案类型：" v-model="form.rank">
                    <el-select  placeholder="请选择" size="small" v-model="form.rank">
                        <el-option :label="itme.label" :value="itme.value" v-for="itme in options"></el-option>
                    </el-select>
                </el-form-item>               
                <el-form-item>
                    <el-button class="defaultBtn" @click="seach()">检索</el-button> 
                </el-form-item>
             </el-form>
        </div>
        <div class="contentbox boxshow">
            <div class="searchCon"> 
                          
                                   <el-table
                                        :data="tableData"
                                        border
                                        :height="bodyHeight"
                                        element-loading-text="努力加载中..."
                                        header-row-class-name="tableHeader" 
                                        stripe 
                                        class="defaultTable"
                                        v-loading="loading">                                      
                                        <!-- <el-table-column type="selection"  width="55">
                                        </el-table-column>                                         -->
                                        <el-table-column prop="name" label="门类名称" align="left"> 
                                        </el-table-column>
                                        <el-table-column prop="rank" label="方案类型" align="left"> 
                                           <template slot-scope="scope">                                                 
                                                 <span v-if="scope.row.rank==3">案卷</span>
                                                 <span v-if="scope.row.rank==4">卷内</span>                                               
                                              </template>                                            
                                        </el-table-column>
                                        <el-table-column prop="kindName" label="方案名称" align="left">                                           
                                        </el-table-column>                                     
                                        <el-table-column prop="updateDate" label="更新时间" align="left" :formatter="dateFormat">                                           
                                        </el-table-column>                                      
                                         <el-table-column prop="comments" label="备注" align="left">                                           
                                        </el-table-column>
                                        <el-table-column  prop="name" label="操作"  width="180">
                                             <template slot-scope="scope">                                                 
                                                 <el-button class="tabletoolBtn" @click="addShow(scope.row)">编辑</el-button>                                                 
                                              </template>
                                        </el-table-column>

                                    </el-table>  
                                    <div class="clear mt10"> 
                                      <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar> 
                                    </div>     
                                 
                         
                   
                </div>
        </div> 
 <el-dialog
            title="编辑"
            :visible.sync="addVisible"
            class="myDialogCenter">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" >
                        <el-form-item label="门类名称：" prop="kindName" >
                            <el-input v-model="ruleForm.kindName" placeholder="请输入" size="small" :disabled="true"></el-input>
                        </el-form-item> 
                        <el-form-item label="方案类型：" prop="rank"  class="mt10">
                            <el-select  placeholder="请选择" size="small" v-model="ruleForm.rank+''" :disabled="true">
                                <el-option :label="itme.label" :value="itme.value" v-for="itme in options"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="方案名称：" prop="name"  class="mt10">
                           <el-input v-model="ruleForm.name" placeholder="请输入" size="small" ></el-input>
                        </el-form-item>
                         <el-form-item label="文件名称："  class="mt10">
                              <el-upload                           
                                    :action="uploadUrl"
                                    :data="uploadType"                                  
                                    :on-remove="handleRemove"
                                    :on-success="handleDeviceSuccess"
                                    :before-remove="beforeRemove"
                                    :on-change="beforeAvatarUpload" 
                                    :auto-upload='false' 
                                    :show-file-list="false"
                                      ref="upload">
                                    <el-button size="small" class="defaultBtn">选择文件</el-button>                                  
                          </el-upload><span v-if="fileList.length>0"> {{fileList[0].name}}</span> 
                        </el-form-item>
                        <el-form-item label="备注：" prop="comments" class="mt10">
                            <el-input type="textarea" v-model="ruleForm.comments"  size="small"></el-input>
                        </el-form-item>
                        </el-form>

            <span slot="footer" class="dialog-footer">
                 <el-button  class="defaultBtn" @click="updateInfo('ruleForm')">确定</el-button>                
                 <el-button  class="defaultBtn" @click="addVisible=false">取消</el-button>
          </span>
       </el-dialog>
       </section>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';   
  import Service from './schema.service';
  import pageToolbar from '@/components/pageToolbar/pageToolbar.vue'
  import moment from 'moment';
  @Component({
        components: {         
            pageToolbar
        },
    })
    export default class appSuperSearch extends Vue{ 
        bodyHeight: number= document.documentElement.clientHeight - 300 ;     
        total: number = 0;
         page: number = 0;
         tableData:any =[];
        pageSize: number = 25; 
        loading:Boolean=false;
        addVisible:Boolean=false;              
        defaultProps: any = {
            children: 'children',
            label: 'name'
        }; 
        uploadUrl: string =  process.env.upload_BASEURL + '/file/simple/upload';
        uploadType:any = {
          type:4
        };
        ishow:Boolean=true;
        fileList:any= [];
        rules:any= {
              name: [
                  { required: true, message: '请输入方案名称', trigger: 'blur' }                    
              ]
              
        }; 
        options: any = [{
          value: '3',
          label: '案卷'
        }, {
          value: '4',
          label: '卷内'
        }],
        ruleForm:any={
          "kindName":"",
          "tempName":"",
          "rank":""
          "id":1,
          "name":"",
          "comments":"",
          "fileId":null
        } 
        form:any={
          "kindName":"",
          "tempName":"",
          "rank":""
        } 
        constructor(){
            super();
        };
 
        handleCurrentChange(val:number) {
            this.page = val;
            this.seach()
                
        };
        handleSizeChange(val:number) {
            this.pageSize = val; 
            this.seach()                  
        };
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        };
        addShow(val){          
          this.ruleForm={
            "kindName":val.name,          
            "rank":val.rank
            "id":val.id,
            "name":val.kindName,
            "comments":val.comments,
            "fileId":val.fileId
          };  
          this.fileList=[];
          if(val.fileName!=null){
             this.fileList.push({'name':val.fileName}) 
             this.ishow=false;
          }
               
          this.addVisible=true;
        };
        seach(){
          this.loading=true;
          let rank
          if(this.form.rank==''){
              rank = null
          }else{
              rank = parseInt(this.form.rank)
          }
                let params={
                    "kindName":this.form.kindName,
                    "tempName":this.form.tempName,
                    "rank":rank,
                    "page":this.page,
                    "pageSize":this.pageSize
                  }
                Service.getlist(params).then(res=>{               
                    if(res.data.succeeded){
                           this.tableData =  res.data.data;
                           this.total= res.data.totalRecords
                           this.loading=false;
                     }else{
                        this['$message']({
                        message: res.data.errorMessage,
                        type: 'error'
                        })
                      }
                })
        };
        updateInfo(){          
                let params={
                    	"id":this.ruleForm.id,
                        "name":this.ruleForm.name,
                        "comments":this.ruleForm.comments,
                        "fileId":this.ruleForm.fileId
                  }
                  debugger;
                Service.updateInfo(params).then(res=>{                           
                    if(res.data.succeeded){
                       this['$message']({
                            message: "修改成功",
                            type: 'success'
                        })
                        this.seach();
                        this.addVisible=false;       
                     }else{
                        this['$message']({
                            message: res.data.errorMessage,
                            type: 'error'
                        })
                      }
                })
        };
        beforeAvatarUpload(files, fileList) {  
            debugger;           
            const isXML= files.raw.type === 'text/xml'
            if(!isXML){
              this.$message.warning(`只能上传xml格式文件`);
            }else{
                this.fileList = fileList.slice(-1);
                this.$refs.upload.submit();
            }
        }  
       // 文件上传成功回调
       handleDeviceSuccess(res, file) {           
           this.ruleForm.fileId = res.data;          
        };
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
         handleRemove(file, fileList) {  
          Service.delTempUploadFile({attachmentName:this.ruleForm.fileId}).then(res => {
              if(res.data.succeeded){
                  this['$message']({
                      message: '删除成功',
                      type: 'success'
                  }); 
                  this.ishow=true;              
              }else{
                  this['$message']({
                      message: '删除失败',
                      type: 'error'
                  });
              }           
          });
        };      
        created(){   
          this.seach()         
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
    @import '../../../styles/retrieve/search';
</style>