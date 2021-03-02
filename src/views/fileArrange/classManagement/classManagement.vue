<template>
  <section class="wrapprSection">
        <div class="mainTitle">
           <span>门类管理</span>
        </div>        
        <div class="treeOne tree ">
            <div class="treeTitle boxshow textBlue">
                    <span class="lt">门类列表</span>
                    <span class="fontClass rt">
                       <!--<el-dropdown> 
                                <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="showAddClassG">新增门类组</el-dropdown-item>
                                        <el-dropdown-item @click.native="showAddClass">新增门类</el-dropdown-item>
                                </el-dropdown-menu>
                        </el-dropdown>-->
                        <i class="fa fa-plus-square textBlue" @click="showAddClass"></i>
                        <i class="fa fa-eyedropper" @click="eidtClass"></i>
                        <i class="fa fa-times-rectangle" @click="isDeleteGroup"></i>
                    </span>
            </div>           
            <div class="treeCon boxshow icontree">
                   <el-tree
                        class="filter-tree"
                        :data="kindtree" 
                        :props="defaultProps"
                        default-expand-all
                        @node-click="handleNodeClick"
                        v-loading="treeloading"  
                        element-loading-text="努力加载中..." 
                        :filter-node-method="filterNode"
                        ref="tree">
                 </el-tree>          
            </div>
        </div>
        <div class="contentbox"> 
            <div class="searchKey boxshow"> 
                <el-form :inline="true">    
                   <el-form-item> 
                       著录项列表
                    </el-form-item>
                    <div class="rt">
                         <el-form-item>
                            <el-button class="blueBtn" @click="eidtAlert">新增</el-button>
                         </el-form-item>
                         <el-form-item>
                            <el-button class="redBtn" @click="delZlx">删除</el-button>
                         </el-form-item>
                         <el-form-item>   
                             <el-button class="defaultBtn" @click.native="EditCreation">定制画面编辑</el-button> 
                          </el-form-item>
                          <el-form-item>
                              <el-button class="defaultBtn" @click.native="ListSetting">一览设置</el-button>
                          </el-form-item>                         
                          <el-form-item> 
                               <el-button class="defaultBtn" @click.native="getBatchAttSetting">
                                    批量挂接规则
                                </el-button> 
                         </el-form-item>       
                        </div> 
                    </el-form> 
                </div>
                <div class="pd10 boxshow bgwhite mt10">
                        <el-table 
                         ref="clssTableRef"
                         border
                        :data="data" 
                        :height="bodyHeight"
                        highlight-current-row
                        v-loading="listLoading" 
                        header-row-class-name="tableHeader"  
                        element-loading-text="努力加载中..." 
                        @selection-change="handleShiftSelect"
                        stripe 
                        class="defaultTable">
                          <el-table-column  type="selection"  width="55"> </el-table-column>
                            <el-table-column label="操作" fixed="left" width="80">
                                <template slot-scope="scope">
                                    <button class="defaultBtn" @click="eidtAlert(scope.row)">编辑</button>
                                </template>
                            </el-table-column>
                            <el-table-column type="index" width="90" fixed label="序号"> </el-table-column>
                            <el-table-column  prop="caption" label="中文名称">
                            </el-table-column>
                            <el-table-column  prop="type" label="类型"  width="85">
                            </el-table-column>
                            <el-table-column  prop="fieldLength" label="长度" width="90">
                            </el-table-column>
                            <el-table-column  prop="isNull" label="可空" width="90">
                            </el-table-column>
                            <el-table-column  prop="dictname" label="数据字典" width="90">
                            </el-table-column>
                            <el-table-column  prop="isShow" label="是否显示" width="90">
                            </el-table-column>
                            <el-table-column  prop="comments" label="备注">
                            </el-table-column>
                            
                        </el-table>

                        <div class="clear mt10">
                            <pageToolbar :total="total" :page="page"  @currentChange='handleCurrentChange' @sizeChange='handleSizeChange' ></pageToolbar>
                        </div>
                   </div>
            </div>      
           <el-dialog
            title="著录项"
            :visible.sync="editZlVisible"
            class="myDialog" :close-on-click-modal="false" :append-to-body='true'>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  class="pd10">
                        <el-form-item label="中文名称：" prop="name" size="small">
                            <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="类型：" prop="type" size="small">
                            <el-select v-model="ruleForm.type" placeholder="请选择" @change="changeFormtype" style="width:100%">
                                <el-option v-for="itme in typeData" :label="itme.displayText" :value="itme.code"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="长度：" prop="fieldLength" size="small">
                            <el-input v-model="ruleForm.fieldLength" placeholder="请输入" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="唯一：" prop="isUnique" size="small">
                            <el-select v-model="ruleForm.isUnique" placeholder="请选择"  style="width:100%">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="是否为空：" prop="isNull" size="small" >
                            <el-select v-model="ruleForm.isNull" placeholder="请选择" style="width:100%">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>                         
                        <el-form-item label="是否使用：" prop="type" size="small">
                            <el-select v-model="ruleForm.isShow" placeholder="请选择" style="width:100%">
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="数据字典：" prop="dict" v-if="ruleForm.type==3" size="small">
                            <el-select v-model="ruleForm.dict" placeholder="请选择" style="width:100%">
                                <el-option v-for="itme in dictData" :label="itme.name" :value="itme.id"></el-option>
                            </el-select>
                        </el-form-item> 
                        <el-form-item label="备注：" prop="comments" size="small">
                           <el-input type="textarea" v-model="ruleForm.comments"></el-input>
                        </el-form-item>                         
                    </el-form>

            <span slot="footer" class="dialog-footer"> 
                  <el-button  class="defaultBtn" @click="setsaveZlx('ruleForm')">确定</el-button>
                  <el-button  class="defaultBtn" @click="editZlVisible=false">取消</el-button>
          </span>
       </el-dialog>
       <transferset ref="transferset"></transferset>
       <transferset2  ref="transferset2"></transferset2>
       <batchAttSetting ref="batchAttSetting"></batchAttSetting>
       <addClass ref="addClass"></addClass>
       <addClassG ref="addClassG"></addClassG>     
    </section>
</template>
<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';   
    import Service from './classManagement.service'; 
    import transferset from './transfer/main'; 
    import transferset2 from './transfer/main2';    
    import batchAttSetting from './batchAttSetting';
    import shiftSelectMore from '@/utils/shiftSelection';
    import pageToolbar from '@/components/pageToolbar/pageToolbar.vue';
    import addClass from './dialog/addClass';
    import addClassG from './dialog/addClassG';
    @Component({
        components: {
            transferset,
            transferset2,       
            batchAttSetting,
            pageToolbar,
            addClass,
            addClassG
        },
    })
    export default class classManagement extends Vue{
      kindtree:any = [];
      defaultProps: any = {
  			children: 'children',
  			label: 'name'
      };
      bodyHeight: number= document.documentElement.clientHeight - 292 ; 
      captionkey:string = '';
      data:any = [];
      filterText: string='';
      value1:number=1;
      value2:number=2;     
      total:number=0;
      page:number=1;
      limit:number=100; 
      treelibId:number='';
      categoryCode:string='';
      tableHeight:number;
      treeloading:boolean=false;
      listLoading:boolean=false;
      ruleForm: any = [];
      rules: any = {};
      editZlVisible:boolean=false;
      typeData: any = [];
      dictData: any = [];
      eidtzlparms: any = [];
      transferData: any = [];
      transferValue: any = [];
      transferTitle: any = [];
      addtabletitlev:boolean;
      addtabletitle2v:boolean;
      editControl: any = []; 
      phase:number = 0;    
      showquery:boolean = false;//是否显示检索框  
      keyType:string;//节点类型
      kindId:number;//节点id
      kindData:any={};//节点data
      selection:any = [];
      constructor(){
          super();         
          this.ruleForm= {
                  id: '',
                  name: '',
                  dict: '',
                  type: '',
                  isShow:'', 
                  fieldLength:'', 
                  isUnique:'', 
                  isNull:'', 
                  comments:'' 
          };      
          this.rules= {
              name: [
                  { required: true, message: '中文名称不能为空', trigger: 'blur' }                    
              ],
              type: [
                  { required: true, message: '类型不能为空', trigger: 'change' }
              ],
              isShow: [
                  { required: true, message: '是否使用不能为空', trigger: 'change' }
              ]
          }; 
          this.typeData=[];
          this.dictData=[]; 
          this.eidtzlparms=[];
          this.addtabletitlev=false;
          this.addtabletitle2v=false;           
          this.transferData = [];
          this.transferValue = [];
          this.transferTitle=['待选项', '已选项']
      };
      showAddClass(){
          this.$refs.addClass.addClassVisible = true
      };
       showAddClassG(){
          this.$refs.addClassG.addClassGVisible = true
      };
      getRuleofNumber(){
            this.$refs.ruleofNumber.ruleofNumberVisible = true
      };
      eidtClass(){                 
           if(this.keyType){            
                if(this.keyType=='lib'){
                    this.$refs.addClass.addClassVisible = true;
                    this.$refs.addClass.ruleForm={
                                id: this.kindData.id,
                                name: this.kindData.name,
                                dict: this.kindData.templateId+'',
                                text: this.kindData.comments 
                        }
                }else{
                     this['$message']({
                            message: '请点击选择门类节点',
                            type: 'warning'
                        });
                }          
          }else{
            this['$message']({
                    message: '请点击选择要编辑的门类',
                    type: 'warning'
                });
         } 
          
      }
      //删除门类
      delClass(){            
           this['$confirm']('确认删除吗？',  '提示', {
                  type: 'warning'
              }).then(() => {
                   let params={
                      id:this.kindId
                  };                       
                    Service.ClassRemove(params).then(res=>{
                            if(res.data.succeeded){
                                this['$message']({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.getOneTree()
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
              });
      }
       //删除门类组
      deleteGroup(){
            debugger;
           this['$confirm']('确认删除吗？',  '提示', {
                  type: 'warning'
              }).then(() => {
                  let params={
                      id:this.kindId
                  };                
                    Service.FolderRemove(params).then(res=>{
                            if(res.data.succeeded){
                                this.tableData = [];
                                this['$message']({
                                    message: '删除成功',
                                    type: 'success'
                                });
                               this.getOneTree()
                            }else{
                                this['$message']({
                                    message: res.data.errorMessage,
                                    type: 'error'
                                });
                            }
                        })
              });
      }
     //删除判断是否是门类组
      isDeleteGroup(){         
          if(this.keyType){            
                if(this.keyType=='kind'){
                    this.deleteGroup()
                }else{
                    this.delClass()
                }            
          }else{
            this['$message']({
                    message: '请点击选择要删除的节点',
                    type: 'warning'
                });
        } 

        }

     
      //著录项编辑框弹出
      eidtAlert(row){
         if(this.treelibId){            
                this.editZlVisible=true;         
          }else{
            this['$message']({
                    message: '请点击选择要新增著录项的门类',
                    type: 'warning'
                });
          }           
         this.geteidtContent(row)//写修改时用的  暂时用不着
      };
       
      //档案树型号树
      handleNodeClick(data,node){
          if(!node.data.children){
              this.treelibId = node.data.id;
              this.categoryCode = node.data.categoryCode;
              this.clickedTreeNodeRank = node.data.rank;
          }else{
              this.treelibId = '';
              this.categoryCode ='';
          }   
          this.kindId=data.id;
          this.keyType = data.type;  
          this.kindData = data; 
          if(this.keyType=='lib'){
             this.getListData()
          }  
      }
      handleCurrentChange(val) {
          this.page = val;       
          this.getListData()
      };
      handleSizeChange(val) {
          this.limit = val;
          this.getListData()
      };
      geteidtContent(rows) {          
        this.ruleForm= {
                  id: rows.id,
                  name: rows.caption,
                  dict: rows.dictionaryId,
                  type: rows.type+'',
                  isShow:rows.isShow, 
                  fieldLength:rows.fieldLength, 
                  isUnique:rows.isUnique, 
                  isNull:rows.isNull, 
                  comments:rows.comments
          };   

      };
      //获取门类
      getOneTree() {
          this.treeloading=true
          Service.getKindAndLibList({}).then(res => {
              if(res.data.succeeded) {
                  if(res.data.succeeded) {
                      this.treeloading = false                    
                      this.kindtree = res.data.data;
                  };
              } else {
                  this['$message']({
                      message: res.data.errorMessage,
                      type: 'error'
                  });
              };
          });
      };
      queryListData(){
        this.page =1;
        this.getListData();
      }
      //获取著录项列表
      getListData(){
          let params = {
              libId:this.treelibId,//著录性列表接口报错，并且参数里没有要求传分页
              //page:this.page-1,
             // pageSize:this.limit,
             // caption:this.captionkey    
          }
          this.listLoading=true;
          Service.getFieldList(params).then(res=>{
            this.$refs.clssTableRef.bodyWrapper.scrollTop =0;
              if(res.data.succeeded){               
                  this.data=res.data.data;             
                  this.total = res.data.totalRecords;            
                  this.listLoading=false;
                  this.showquery = true;
              }else{
                  this['$message']({
                      message: res.data.errorMessage,
                      type: 'error'
                  });
              }
          })
      };
      gettypeData(){       
          Service.getTypeData(210).then(res=>{
              if(res.data.succeeded){               
                  this.typeData=res.data.data;                
              }else{
                  this['$message']({
                      message: res.data.errorMessage,
                      type: 'error'
                  });
              }
          })
      };
      getdictData(){       
          Service.getDictionaryList({}).then(res=>{
              if(res.data.succeeded){               
                  this.dictData=res.data.data;                
              }else{
                  this['$message']({
                      message: res.data.errorMessage,
                      type: 'error'
                  });
              }
          })
      };
      //著录项删除
        delZlx(){
               if(this.treelibId == ''){
                    this['$message']({
                      message: '请选择子门类节点',
                      type: 'warning'
                  });                  
                  return false;
               }
            if(this.selection.length>0){          
                    this['$confirm']('确认删除吗？',  '提示', {
                            type: 'warning'
                        }).then(() => {  
                            let params={
                                 libId:this.treelibId,
	                             fieldsName:this.selection
                            }                        
                            Service.delZlxList(params).then(res=>{
                                if(res.data.succeeded){
                                    this['$message']({
                                        message: ' 删除成功',
                                        type: 'success'
                                    });                             
                                    this.getListData()
                                }else{   
                                    this['$message']({
                                        message: '删除失败',
                                        type: 'error'
                                    });
                                }                        
                            })
                        });
              }else{
                     this['$message']({
                                        message: ' 请选择要删除的数据',
                                        type: 'warning'
                                    });   
              }
      }
      //保存/编辑著录项
      setsaveZlx(formName){
         this.$refs[formName].validate((valid) => {
              if (valid) { 
                  let dictionaryId 
                  if(this.ruleForm.dict!=null){
                     dictionaryId=this.ruleForm.dict;
                  }else{
                    dictionaryId=''; 
                  }                 
                  let params={
                      	libId:this.treelibId,
                        data:{
                            caption:this.ruleForm.name,
                            type:this.ruleForm.type,
                            fieldLength:this.ruleForm.fieldLength,
                            isUnique:this.ruleForm.isUnique,
                            isNull:this.ruleForm.isNull,
                            dictionaryId:dictionaryId,
                            isShow:this.ruleForm.isShow,//'是否使用 '接口里没有定义这个参数 UE有
                            comments:this.ruleForm.comments
                        }
                  }                 
                  Service.saveZlxList(params).then(res=>{
                      if(res.data.succeeded){               
                          this['$message']({
                              message: '保存成功',
                              type: 'success'
                          });                             
                          this.editZlVisible=false;
                          this.getListData()          
                      }else{
                          this['$message']({
                              message: res.data.errorMessage,
                              type: 'error'
                          });
                      }
                  })
           } else {
              console.log('error submit!!');
              return false;
              }
          });
      };
      ListSetting(){
          debugger;
          if(!this.treelibId){
            this['$message']({
                message: '请选择子门类节点',
                type: 'warning'
            });
            return false;
          };
         this.$refs['transferset'].keyType = this.keyType;
         this.$refs['transferset'].classId = this.treelibId;
          this.$refs['transferset'].ListSetting();
      }; 
      EditCreation(){         
          if(!this.treelibId){
            this['$message']({
                message: '请选择子门类节点',
                type: 'warning'
            });
            return false;
          };
         this.$refs['transferset2'].keyType = this.keyType;
         this.$refs['transferset2'].classId = this.treelibId;
        this.$refs['transferset2'].EditCreation();
      };  
      geteditControl() {
              Service.getTypeData(208).then(res=>{
                  if(res.data.succeeded){   
                      let data=res.data.data; 
                      if(data.length>0){
                          for(let i in data){
                              data[i].code = parseInt(data[i].code)
                          } 
                      }   
                      this.editControl = data
                      console.info(this.editControl)                                         
                  }else{
                      this['$message']({
                          message: res.data.errorMessage,
                          type: 'error'
                      });
                  }
              })
      }; 
       getBatchAttSetting(){           
          if(!this.treelibId){
            this['$message']({
                message: '请选择子门类节点',
                type: 'warning'
            });
            return false;
          }
          this.$refs['batchAttSetting'].classId = this.treelibId;
          this.$refs['batchAttSetting'].exportNumber();
         
       }
      changeFormtype(){
         if(this.ruleForm.type==3){
              this.rules= {
                  name: [
                      { required: true, message: '中文名称不能为空', trigger: 'blur' }                    
                  ],
                  type: [
                      { required: true, message: '类型不能为空', trigger: 'change' }
                  ],
                  dict:[
                      { required: true, message: '字典不能为空', trigger: 'change' }
                  ]
              }; 
         }else{
              this.rules= {
                      name: [
                          { required: true, message: '中文名称不能为空', trigger: 'blur' }                    
                      ],
                      type: [
                          { required: true, message: '类型不能为空', trigger: 'change' }
                      ]
                  }; 
         }
      }
      //按shift 选中表格数据
      keyevent() {
          var that = this;
          document.onkeydown = function(e) { //按下键盘      
              switch(e.keyCode) {
                  case 16:
                      that.isshift = true;
                      break;
              }
          };
          document.onkeyup = function(e) { //放弃键盘   
              switch(e.keyCode) {
                  case 16:
                      that.isshift = false;
                      break;
              }
          };
      };
      handleShiftSelect(val){
          let selection=[]
          if(this.isshift) {
              selection = shiftSelectMore(this.data, val, this.$refs.ShiftSelectRef);
          } else {
              selection = val;
          }                   
          this.selectionChange(selection)
      }
      selectionChange(selection){
            let fieldName=[]
            for (let key in selection){
                fieldName.push(selection[key].fieldName)
            }
            this.selection = fieldName
      };                

       
       //筛选树的方法  暂时还没用上
      filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
      };
      @Watch('filterText')
          filterTree(val) {
          (this as any).$refs['tree'].filter(val);
      };             
      created(){

      };
      mounted(){
          window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight - 292;
                })()
          };
          this.getOneTree();
          this.gettypeData();
          this.getdictData();
          this.geteditControl();       
          this.keyevent()
      };
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/innerPublic.scss';
    @import '../../../styles/classManagement/classManagement';
    .fontClass{
            i{
                font-size: 25px;
                color: #2b87c6;
                vertical-align: middle;
                cursor: pointer;
            }
        }
</style>