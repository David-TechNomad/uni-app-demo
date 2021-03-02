<template>
    <el-table
      :data="data"
       border
       style="width: 100%"
       :cell-style="showTr" 
       class="defaultTable" 
       v-loading="listLoading" 
       :height="bodyHeight" 
       element-loading-text="努力加载中..."
       header-row-class-name="tableHeader"
       :empty-text="libId && libId.length>0?'暂无数据':'请选择案卷库'" >
        <el-table-column  type="selection"  width="55"></el-table-column >
      <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"
        :label="column.text" min-width="200">
        <template slot-scope="scope">
          <div  v-if="column.dataIndex=='nodeType'">
            <span v-if="scope.row.nodeType=='1'">分类节点</span>
            <span v-if="scope.row.nodeType=='2'">门类节点</span> 
             <div>
                <span v-if="scope.row && scope.row.kind!=null">
                  <span v-if="scope.row.nodeType=='3' && scope.row.kind.categoryCode=='XH'">型号节点</span>
                  <span v-else-if="scope.row.nodeType=='3'">预立卷节点</span>
                </span>
                <span v-else-if="scope.row.nodeType=='3'">预立卷节点</span>
             </div>
            <span v-if="scope.row.nodeType=='4'">分组节点</span>  
          </div>
          <div v-else>
            <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
            <span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
              <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
              <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
            </span>
            <span v-else-if="index===0" class="ms-tree-space"></span>
            {{scope.row[column.dataIndex]}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="left" v-if="treeType === 'normal'" width="80">
        <template scope="scope">                                                
          <el-button type="button" class="addBtn" @click="handleEidt(scope.row.id,scope.row.parentId)">
              查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <script lang="ts">
      import { Component, Prop, Vue, Watch } from 'vue-property-decorator'; 
      import Utils from '../utils/index.js' 
  
      @Component({
        computed: {
          data(){
            let me = this;
            if (me.treeStructure) {
              let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll);
              return data;
            }
            return me.dataSource;
          }
        }
      })
      export default class TreeGrid extends Vue{
        name: 'tree-grid'
        @Prop({default: false})
        treeStructure: boolean; // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
        @Prop({})
        columns : any; // 这是相应的字段展示
        @Prop({})
        dataSource: any;// 这是数据源
        @Prop({})
        requestUrl: string;// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
        @Prop({default: 'normal'})
        treeType: string ;// 这个是是否展示操作列
        @Prop({default: false})
        defaultExpandAll: boolean ;// 是否默认展开所有树
  
        listLoading: boolean = false;
        bodyHeight: number =  document.documentElement.clientHeight - 200 ;
        
        showTr(row, index) {
          let show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true)
            row.row._show = show
            return show ? '' : 'display:none;'
        }
        toggle(trIndex) {// 展开下级
          let me = this
          let record = me.data[trIndex]
          record._expanded = !record._expanded
        }
     
       spaceIconShow (index) {// 显示层级关系的空格和图标
         let me = this
         if (me.treeStructure && index === 0) {
           return true
         }
         return false
       }
     
       toggleIconShow (index, record) {// 点击展开和关闭的时候，图标的切换
         let me = this
         if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
           return true
         }
         return false
       }
      
       handAaddChilen(row){ //新增子节点
           this.$emit('addChilen', row)
       }
       
       handleEidt(id,fparentId){//编辑子节点
          let val={
               'id':id,              
               'fparentId':fparentId,
           }
           this.$emit('handleEidtChilen', val)
       }
       handlepx(id,nodeName){
            this.$emit('handlepxChilen', {'id':id,'name':nodeName})
       }
       handleDelete (id,kindId,conditionId) {
          let val= {
                'id':id,
                'kindId':kindId,
                'conditionId':conditionId
            }
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.$emit('handleDeleteChilen', val)
          }).catch(() => {
            
          })
        }
  
      }
   </script>
  <style scoped>
    .ms-tree-space{position: relative;
      top: 1px;
      display: inline-block;
      font-family: 'Glyphicons Halflings';
      font-style: normal;
      font-weight: 400;
      line-height: 1;
      width: 18px;
      height: 14px;}
      .ms-tree-space::before{content: ""}
      table td{
        line-height: 26px;
      }
    .addBtn {
      padding: 5px 10px!important;
      cursor: pointer;
      display: inline-block;
      border-radius: 3px;
      text-align: center;
      border: 1px solid #c8c8cb;
      background: #efeff0;
      background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #efeff0), color-stop(1, #ffffff));
      background: -ms-linear-gradient(bottom, #efeff0, #ffffff);
      background: -moz-linear-gradient(center bottom, #efeff0 0%, #ffffff 100%);
      background: -o-linear-gradient(bottom, #efeff0, #ffffff);
      font-size: 12px
    }
  </style>
  