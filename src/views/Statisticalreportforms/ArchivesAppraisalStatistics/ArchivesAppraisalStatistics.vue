  <template>
      <!-- 档案鉴定统计分析 -->
    <div class="frame">
        <div class="mainTitle">
           <span>档案鉴定统计分析</span>             
        </div>
        <el-container>
          <el-aside width="254px" class="bgwhite2">
            <span>统计条件</span>
            <div class="leftfrom">
              <el-form ref="form" :model="form" >
                <el-form-item label="范围">
                </el-form-item>
                <el-input readonly size="small" v-model="archiveAgentCode"></el-input>
                <el-form-item label="">
                </el-form-item>
                <el-checkbox v-model="form.selChildren" label="1" style="padding-top:10px">包含下级档案馆</el-checkbox>
                <el-form-item label="起止时间">
                </el-form-item>
                <el-date-picker
                  v-model="form.startMonth"
                  type="date"
                  size="small"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  placeholder="年/月/日">
                </el-date-picker>
                <el-date-picker
                  v-model="form.endMonth"
                  type="date"
                  size="small"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  style="padding-top:10px;"
                  placeholder="年/月/日">
                </el-date-picker>
                <div class="formbtn">
                  <el-form-item label="" style="padding-top:20px;">
                  <el-button class="defaultBtn" @click="startStatistics">统计</el-button>
                  <el-button class="defaultBtn" @click="restForm">重置</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-aside>

          <el-main class="contentbox ml10">
                <div class="bgwhite2 boxshow pd10">
                  <div class="tabheader">
                    <p>
                      <span v-if="form.selChildren">【档案馆】{{archiveAgentName}}及下级档案馆</span>
                      <span v-else>【档案馆】{{archiveAgentName}}</span>
                    </p>
                    <div>
                      <el-button class="defaultBtn">导入</el-button>
                      <el-button class="defaultBtn">打印/导出</el-button>
                    </div>
                  </div>
                  <el-table
                    :data="tableData2"
                    border
                    lazy
                    :load="load"
                    :height="bodyHeight"
                    element-loading-text="努力加载中..."
                    header-row-class-name="tableHeader"
                    v-loading="loading" 
                    :row-key="getRowKeys"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    class="defaultTable">
                    <el-table-column label="档案馆" prop="archiveAgentName" align="center">
                                              
                    </el-table-column>
                    <el-table-column label="全宗" prop="fondsName" align="center">
                        
                    </el-table-column>
                    <el-table-column label="原控制数量"  prop="oldPrivateCount" align="center" width="100">
                        
                    </el-table-column>
                    <el-table-column label="原开放数量" prop="oldPublicCount" align="center" width="100">
                        
                    </el-table-column>
                    <el-table-column label="鉴定数量"  prop="appraisalCount" align="center" width="100">
                        
                    </el-table-column>
                    <el-table-column label="本次控制数量"  prop="privateCount" align="center" width="110">
                        
                    </el-table-column>
                    <el-table-column label="本次开放数量"  prop="publicCount" align="center" width="110">
                        
                    </el-table-column>
                    <el-table-column label="总控制数量"  prop="totalPrivateCount" align="center" width="100">
                        
                    </el-table-column>
                    <el-table-column label="总开放数量" prop="totalPublicCount" align="center" width="100">
                        
                    </el-table-column>
                    <el-table-column label="开放率" prop="publicRatio" align="center" width="100">
                        
                    </el-table-column>
                  </el-table>
                </div>
          </el-main>
        </el-container> 
    </div>       
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts";
import { Loading } from 'element-ui';
import Service from "./ArchivesAppraisalStatistics.service";
import { State, Getter, Mutation } from "vuex-class";
@Component()
export default class ArchivesAppraisalStatistics extends Vue {
        form: any ={
          selChildren:false,
          startMonth:null,
          endMonth:null
        };
        value: string = "";
        options: any =[];
        expandKeys: any =[];
        ArchiveAgentCodeStatisticList: any =[];
        archiveAgentCode:string;
        archiveAgentName:string;
        loading: Boolean= false;
        bodyHeight: number = document.documentElement.clientHeight - 215;
        tableData2: any =[];
        tableData3:any=  [{
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            children: [{
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }]
        }];
        tableData: any = [{
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }, {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
        }];
        constructor() {
          super();
          this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
          this.archiveAgentName = window.sessionStorage.getItem('archiveAgentName');
        }
        // handleRowclick() {
        //   this.getAppraisalFondsStatisticList();
        // }
        startStatistics() {
          this.getAppraisalArchiveAgentCodeStatisticList();
        }
        restForm () {
          this.form = {
            selChildren:false,
            startMonth:null,
            endMonth:null
          };
        }
        // 获取展开行id
        getRowKeys(row) {
            return row.id;
        };
        load(tree, treeNode, resolve) {
          let self = this;
          let params = {
            archiveAgentCode: tree.archiveAgentCode,
            startMonth: this.form.startMonth,
            endMonth: this.form.endMonth,
          };
          Service.getAppraisalFondsStatisticList(params).then(res => {
            if (res.data.succeeded) {
              // console.log(res.data.data);
              if(res.data.data && res.data.data.length > 0) {
                for(let item of res.data.data) {
                  item.id = item.fondsCode
                }
              }
              resolve(res.data.data)
            } else {
              self.getError(res.data.errorMessage);
            }
            // self.$nextTick(() => { this.loadingInstance.close();});
          });
      };
        getAppraisalArchiveAgentCodeStatisticList() {
          let self = this;
          let params = {
            archiveAgentCode: this.archiveAgentCode,
            startMonth: this.form.startMonth,
            endMonth: this.form.endMonth,
            selChildren: this.form.selChildren,
          };
          this.loading = true;
          Service.getAppraisalArchiveAgentCodeStatisticList(params).then(res => {
            if (res.data.succeeded) {
              // console.log(res.data.data);
              self.tableData2 = res.data.data;
              this.archiveAgentName = res.data.data[0].archiveAgentName;
              for(let item of self.tableData2) {
                if(item.fondsCount > 0) {
                  item.hasChildren = true;
                }
                item.id = item.archiveAgentCode;
              }
            } else {
              self.getError(res.data.errorMessage);
            }
            this.loading = false;
            // self.$nextTick(() => { this.loadingInstance.close();});
          });
        };
        //请求失败
        getError(message: string) {
          this["$message"]({
            message,
            type: "error"
          });
        };
        created() {
          this.getAppraisalArchiveAgentCodeStatisticList();
          // this.getAppraisalFondsStatisticList();
        }
        mounted(){
          window.onresize = () => {
            return (() => {
              this.bodyHeight = document.documentElement.clientHeight - 215;
            })();
          };
        }
}
</script>
<style lang="scss" scoped >
  @import '../../../styles/innerPublic.scss';
  @import '../../../styles/Statisticalreportforms/CollectionArchivesStatistics.scss';
  .frame{
    padding: 0 10px;
    height: 100%;
    /* overflow-y: hidden; */
    position: relative;
  }
 .mainTitle {
    color: #2b87c6;
    font-weight: 600;
    font-size: 1rem;
    height: 50px;
    line-height: 50px;
}
.el-aside{
    border: 1px solid #c3c3c3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    .leftfrom {
      .el-input {
        width: 220px;
      }
    }
  }
  .mainTitle > span {
    padding: 0 10px;
    border-left: 4px solid #2b87c6;
  }
  .el-aside>span{
    display: block;
    padding: 17px 0;
    background: #EEE;
    text-align: center;
  }
  .el-aside>.leftfrom{
    background: #fff;
    padding: 0 20px; 
    height: 550px;
  }
  .el-main{
    padding: 0;
  }
  .tabheader{
    display: flex;
    justify-content: space-between;
  }
  .tabheader>p{
    line-height: 36px;
  }
  .tabheader>p>span:not(:first-child){
    box-sizing: border-box;
    padding-left: 24px;
  }
  .el-tab-pane::-webkit-scrollbar {
        height:0;
        width:0;
    }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    /* height: 40px; */
}
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    /* height: 40px; */
}
.chartArea{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.cakeChart{
  width: 50%;
  height: 250px;
  /* background-color: #EEE; */
}
.cakeChartall{
  width: 30%;
  height: 250px;
  /* background-color: #EEE; */
}
.chartArea>p>span{
  line-height: 30px;
}
.columnChart{
  width: 100%;
  height: 500px;
}
</style>

