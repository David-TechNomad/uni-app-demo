<template>
    <section>
        <el-dialog
            title="高级检索"
            :visible.sync="superSearchVisible"
            class="myDialog"
            fullscreen :close-on-click-modal="false" :modal-append-to-body='false'>            
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                   <div class="searchtjTitle">
                    档案分类: <el-checkbox :indeterminate="isIndeterminate" v-model="ruleForm.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="color: #F56C6C;font-size:12px;" v-if="ischeckedType ? !isIndeterminate : ischeckedType ">
                        请至少选择一个分类
                    </div>
                   </div>
                   <div style="max-height:300px;overflow:auto">
                    <el-form-item prop="checkedType" class="superSearchChecked">
                            <el-checkbox-group v-model="ruleForm.checkedType" @change="handleCheckedTypeChange">
                                <el-checkbox v-for="typeItems in searchTypes" :label="typeItems.id" :key="typeItems.name">{{typeItems.name}}</el-checkbox>
                            </el-checkbox-group>  
                        </el-form-item> 
                    </div>
                    <div class="searchtjTitle mt10">  
                         检索条件：<el-button @click="addCriteria" class="defaultBtn rt">增加检索条件</el-button>               
                    </div> 
                     <div style="color: #F56C6C;font-size:12px;" v-if="isaddCriteriasvalue">
                        筛选内容不能为空
                    </div>                                    
                   <el-form-item v-for="(criteria, index) in ruleForm.addCriterias" :key="'criteria'+ index" class="superSearchChecked2">
                        <el-checkbox v-model="criteria.checked"></el-checkbox>
                        <el-select v-model="criteria.fieldName" placeholder="请选择" style="width:30%" @change="setDictlist(criteria)" filterable>
                            <el-option  v-for="(item,index) in criteriaOptions"  :key="item.fieldName"  :label="item.caption" :value="item.fieldName">
                            </el-option>
                        </el-select>
                        <el-select v-model="criteria.code" placeholder="请选择"  style="width:25%;" filterable>
                            <el-option  v-for="item in dictlists" :key="item.code" :label="item.text" :value="item.code" >
                            </el-option>
                        </el-select>                        
                        <el-input v-model="criteria.value" placeholder="请输入内容" style="width:30%" :disabled='true' v-if="criteria.code===10"></el-input>
                        <el-input v-model="criteria.value" placeholder="请输入内容" style="width:30%" v-else></el-input>
                  </el-form-item>                    
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submitForm('ruleForm')" class="defaultBtn">检 索</el-button>
                <el-button @click="resetForm('ruleForm')" class="defaultBtn">重 置</el-button>
            </span>
        </el-dialog>
		
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';  
    import Service from './superSearch.service';
    @Component
    export default class appSuperSearch extends Vue{
        bodyHeight: number;
        kindId:string = '';
        kindIds:any = [];
        dictlists:any = [];
        superSearchVisible: boolean = false;
        ruleForm: any = {};
        rules: any = {};
        searchTypeOptions: any = [];       
        searchTypes:any = []; 
        isIndeterminate: boolean = false;
        ischeckedType: boolean = false;
        criteriaOptions:any = [];
        criteriachilden: number = 0; 
        isaddCriteriasvalue: boolean = false;
        fileDetailTableHeight: number = document.documentElement.clientHeight-120;
        constructor(){ 
            super();            
            this.ruleForm = {
                type: [],
                checkAll: false,
                addCriterias: [{  
                    checked:'',
                    fieldName:'',
                    code:'',
                    value:'',
                    select:'',
                    list:[]
                }],
               checkedType: []
            },
            this.rules= {
                checkedType: [
                    { type: 'array', required: true, message: '请至少选择一个分类', trigger: 'change' }
                ]
            },
            this.bodyHeight = document.documentElement.clientHeight - 230 ; 
        }; 

         // 获取高级搜索条件
		getCriteria(val){
              let searchType ={'searchType':val};
            Service.getSearchecked(searchType).then((res) =>{
                if(res.data.succeeded){					                   
                     this.searchTypes = res.data.data;
                      for(var item in this.searchTypes){
                          this.searchTypeOptions.push(this.searchTypes[item].id)
                      }
                }
            })
		};
        setDictlist(criteria){ 
              criteria.code = '';
              criteria.value = '';          
        };
        getDictlist(){
               Service.getDictlists({}).then((res) =>{
                if(res.data.succeeded){
                     this.dictlists=res.data.data; 
                }
            })
        };
        getAddCriterias(val){
           let kindids = {
                kindIdList:val
            }
           Service.getAddCriteria(kindids).then((res) =>{
                if(res.data.succeeded){
                     this.criteriaOptions=res.data.data; 
                }
            })
        };
        handleCheckAllChange(val) { 
            this.ruleForm.checkedType = val ? this.searchTypeOptions : [];
            this.isIndeterminate = false;
            // this.kindIds=value; 
            this.kindIds=this.ruleForm.checkedType;          
            this.getAddCriterias(this.ruleForm.checkedType);
            this.ruleForm.addCriterias=[{
                    checked:'',
                    fieldName:'',
                    code:'',
                    value:'',
                    select:'',
                    list:[]
            }];
        };
        handleCheckedTypeChange(value) { 
            let checkedCount = value.length;
            this.ruleForm.checkAll = checkedCount === this.searchTypes.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.searchTypes.length;
            this.kindIds=value;
            this.getAddCriterias(value);
            this.ruleForm.addCriterias=[{
                    checked:'',
                    fieldName:'',
                    code:'',
                    value:'',
                    select:'',
                    list:[]
            }];

        };
        addCriteria() {           
            this.ruleForm.addCriterias.push({
                    checked:'',
                    fieldName:'',
                    code:'',
                    value:'',
                    select:'',
                    list:[]
            });          
        };  
        submitForm(formName) {                     
            this.$refs[formName].validate((valid) => {
                let addCriterias = this.ruleForm.addCriterias
                for(let key in addCriterias){
                       if(addCriterias[key].checked){
                            if(addCriterias[key].code!=10 && addCriterias[key].value==""){
                                this.isaddCriteriasvalue=true;
                                return false;
                            }else{
                                this.isaddCriteriasvalue=false;
                            }
                       }
                };
                if (valid) { 
                    this.ischeckedType=false;
                    this.$emit('superSearch');
                    this.superSearchVisible=false
                } else {
                    this.ischeckedType=true;
                    console.log('error submit!!');
                    return false;
                }
            });
        };
        resetForm(formName) {   
             this.$nextTick(() => {      
                 this.$refs[formName].resetFields();
             });
            this.ruleForm.addCriterias=[{
                    checked:'',
                    fieldName:'',
                    code:'',
                    value:'',
                    select:'',
                    list:[]
            }];
            this.kindIds=[];
            this.ruleForm.checkedType=[];
            this.isIndeterminate = false;
            this.ruleForm.checkAll=false;      
        };
        created(){          
            //this.getCriteria();
            this.getAddCriterias(this.ruleForm.checkedType) ;
            this.getDictlist();            
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
    .superSearchChecked{
        background-color: #f5f5f5;
        margin: 10px 0 0 0!important;
        border-top: 1px solid #ccc;
        padding: 0;
        }
        .superSearchChecked .el-checkbox{
            width: 50%;
            margin: 0;
            padding:0px 10px;
            border-bottom: 1px solid #ccc;
            margin-right: 0;           
        }
        .searchtjTitle{
        font-size: 1rem;
        line-height: 32px;
        }
        .superSearchChecked2{
        margin: 10px 0;
        }   

</style>