<template>
	<div class="bgwhite">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="业务实体元数据" name="first">
           <el-table				
			:data="tableData01" border
              :height="bodyHeight"
              element-loading-text="努力加载中..."
              header-row-class-name="tableHeader"
              empty-text="暂无数据" 
              stripe
			  class="defaultTable"           
              v-loading="Filesloading01">
				<el-table-column prop="disposalTag" label="处置标识">
				</el-table-column>
				<el-table-column prop="disposalActs" label="处置行为">
				</el-table-column>
				<el-table-column prop="disposedTime" label="处置时间">
					 <template slot-scope="scope"> 
                        {{scope.row.disposedTime | dateFormat}}                      
                    </template>
				</el-table-column>
				<el-table-column prop="disposalDescription" label="处置描述">
				</el-table-column>
			</el-table>

			</el-tab-pane>
			<el-tab-pane label="机构人员实体元数据" name="second">
				<el-table				
					:data="tableData02" border
					:height="bodyHeight"
					element-loading-text="努力加载中..."
					header-row-class-name="tableHeader"
					empty-text="暂无数据" 
					stripe
					class="defaultTable"            
					v-loading="Filesloading02">
						<el-table-column prop="agentCode" label="机构人员代码">
						</el-table-column>
						<el-table-column prop="agentTag" label="机构人员标识符">
						</el-table-column>
						<el-table-column prop="agentName" label="机构人员名称">
						</el-table-column>
						<el-table-column prop="belong_to" label="机构人员隶属">
						</el-table-column>
						<el-table-column prop="agentType" label="机构人员类型">
						</el-table-column>
					</el-table>
			</el-tab-pane>
			<el-tab-pane label="法规实体元数据" name="third">
				<el-table				
					:data="tableData03" border
					:height="bodyHeight"
					element-loading-text="努力加载中..."
					header-row-class-name="tableHeader"
					empty-text="暂无数据" 
					stripe
					class="defaultTable"            
					v-loading="Filesloading3">
						<el-table-column prop="mandateTag" label="法规标识符">
						</el-table-column>
						<el-table-column prop="mandateType" label="法规类别">
						</el-table-column>
						<el-table-column prop="mandateName" label="法规名称">
						</el-table-column>
						<el-table-column prop="updateDate" label="发布时间">
							 <template slot-scope="scope"> 
								{{scope.row.updateDate | dateFormat}}                      
							</template>
						</el-table-column>
						<el-table-column prop="createDate" label="生效时间">
							 <template slot-scope="scope"> 
								{{scope.row.createDate | dateFormat}}                      
							</template>
						</el-table-column>
					</el-table>
			</el-tab-pane>
			<el-tab-pane label="关系实体元数据" name="fourth">
				<el-table				
					:data="tableData04" border
					:height="bodyHeight"
					element-loading-text="努力加载中..."
					header-row-class-name="tableHeader"
					empty-text="暂无数据" 
					stripe
					class="defaultTable"            
					v-loading="Filesloading04">
						<el-table-column prop="entityTag" label="关联实体标识符">
						</el-table-column>
						<el-table-column prop="entities_relation_type" label="实体关系类型">
						</el-table-column>
						<el-table-column prop="relation" label="实体关系">
						</el-table-column>					
					</el-table>
			</el-tab-pane>
	    </el-tabs>		  
	</div>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './history.service';
    @Component
    export default class history extends Vue{
		@Prop({default:() => ''})
		libId : string;  
		@Prop({default:() => ''})
		objectId: string; 
      
		activeName:string = 'first';
		bodyHeight: number= document.documentElement.clientHeight - 310 ;
		Filesloading01:Boolean= false;
		Filesloading02:Boolean= false;
		Filesloading03:Boolean= false;
		Filesloading04:Boolean= false;
		tableData01: any = [];
		tableData02: any = [];	
		tableData03: any = [];	
		tableData04: any = [];		
    constructor(){
            super();
		};
		handleClick(tab,event) {	
			  if (this.activeName== 'first') {
				  this.getTable01()
			  }else if(this.activeName== 'second'){
					this.getTable02()
				}else if(this.activeName== 'third'){
					this.getTable03()
				}else if(this.activeName== 'fourth'){
					this.getTable04()
				}
      };
      getTable01(){				
					this.Filesloading01 = true;
			 	    let	parmse={"libId":this.libId,"objectId":this.libId}
					Service.history(parmse).then(res => {
							if(res.data.succeeded) {
								 this.tableData01 = res.data.data
							} else {
								this.getError(res.data.errorMessage)
							}
							this.Filesloading01=false;
						})   
			 };
			 getTable02(){
					this.Filesloading02 = true;
			 	    let	parmse={"libId":this.libId,"objectId":this.libId}
					Service.agent(parmse).then(res => {
							if(res.data.succeeded) {
								 this.tableData02 = res.data.data
							} else {
								this.getError(res.data.errorMessage)
							}
							this.Filesloading02=false;
						})   
			 };
			 getTable03(){
					this.Filesloading03 = true;
			 	    let	parmse={"libId":this.libId,"objectId":this.libId}
					Service.mandate(parmse).then(res => {
							if(res.data.succeeded) {
								 this.tableData03 = res.data.data
							} else {
								this.getError(res.data.errorMessage)
							}
							this.Filesloading03=false;
						})   
			 };
			 getTable04(){
					this.Filesloading04 = true;
				   let parmse={"libId":this.libId,"objectId":this.libId}				  
					Service.archiveEntity(parmse).then(res => {
							if(res.data.succeeded) {
								 this.tableData04 = res.data.data
							} else {
								this.getError(res.data.errorMessage)
							}
							this.Filesloading04=false;
						})   
       }
        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };
        //请求失败
        getError(message) {
            this["$message"]({
                message,
                type: 'error'
            });
        };
        //警告信息
        Warn(message) {
            this['$message']({
                type: 'warning',
                message
            });
		};	
		mounted(){
           window.onresize = () => {
                return (() => {
                   this.bodyHeight = document.documentElement.clientHeight - 310;
                })()
						};
						this.getTable01()
        };
}
</script>