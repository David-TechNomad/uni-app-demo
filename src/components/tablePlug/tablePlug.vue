<template>
 <el-table :data="data.mackDataObj.res" 
              border
              :height="bodyHeight"
              element-loading-text="努力加载中..."
              header-row-class-name="tableHeader" 
              stripe 
              class="defaultTable">
          <el-table-column v-if="data.selection" type="selection" width="55" label="#"></el-table-column>
          <el-table-column v-for="(item,key) in data.tableHeadData"
          :key="key"
          :prop="item.value"
          :label="item.name"
          :width="item.width">
          </el-table-column>
          <el-table-column
          v-if="data.Operation"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click.stop="bindClick(item2)" type="text" size="small" v-for="(item2,key) in data.OperationData"><i :class="item2.icon"></i>{{item2.name}}</el-button>
          </template>
        </el-table-column>
    </el-table>
</template>

<script>

export default{
 name: 'Sltable',
  props: {
          data:Object,
        },

 data(){
  return{
    bodyHeight:0
  }
 },
 methods: {
      bindClick: function (btn, node) {
          return btn.onClick ? btn.onClick(node) : false
      },
    },
created: function () {
  this.bodyHeight = document.documentElement.clientHeight - 330;
},
   
}

</script>