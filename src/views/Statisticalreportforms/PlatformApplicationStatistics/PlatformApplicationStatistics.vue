
  <template>
      <!-- 平台应用统计分析 -->
    <div class="frame">
        <div class="mainTitle">
           <span>平台应用统计分析</span>             
        </div>
        <el-container>
          <el-aside width="254px" class="bgwhite2" :style="formStyle">
            <span>统计条件</span>
            <div class="leftfrom">
              <el-form ref="form" :model="form" >
                <el-form-item label="范围">
                </el-form-item>
                <el-input readonly size="small" v-model="archiveAgentCode"></el-input>
                <el-form-item label="时间区间">
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

          <el-main>
            <div class="rightlist" :style="formStyle">
                <div class="bgwhite2">
                  <p>区域平台登陆排行榜</p>
                  <ul>
                    <li v-for="(item, index) in loginRankingList">
                      <span>
                        <span :class="index>2?'backBackground':'topThree'">{{index + 1}}</span>
                        {{item.archiveAgentName}}
                      </span>
                      <span>{{item.val + '人次'}}</span>
                    </li>
                  </ul>
                </div>
                <div class="bgwhite2">
                  <p>档案利用效率排行榜</p>
                  <ul>
                    <li v-for="(item, index) in utilizeRankingList">
                      <span>
                        <span :class="index>2?'backBackground':'topThree'">{{index + 1}}</span>
                        {{item.archiveAgentName}}
                      </span>
                      <span>{{item.val}}</span>
                    </li>
                  </ul>
                </div>
                <div class="bgwhite2">
                  <p>档案远程利用效率排行榜</p>
                  <ul>
                    <li v-for="(item, index) in utilizeRemoteRankingList">
                      <span>
                        <span :class="index>2?'backBackground':'topThree'">{{index + 1}}</span>
                        {{item.archiveAgentName}}
                      </span>
                      <span>{{item.val}}</span>
                      </li>
                  </ul>
                </div>
                <div class="bgwhite2 negativeListView">
                  <p class="negativeList">远程利用负面清单排行榜</p>
                  <ul>
                    <li v-for="(item, index) in utilizeRemoteReverseList">
                      <span>
                        <span :class="index>2?'backBackground2':'topThree2'">{{index + 1}}</span>
                        {{item.archiveAgentName}}
                      </span>
                      <span>{{item.val}}</span>
                    </li>
                  </ul>
                </div>
            </div>
          </el-main>
        </el-container>   

    </div>       
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts";
import { Loading } from 'element-ui';
import Service from "./PlatformApplicationStatistics.service";
import { State, Getter, Mutation } from "vuex-class";
@Component()
export default class PlatformApplicationStatistics extends Vue {
    form: any ={
      startMonth:null,
      endMonth:null
    };
    value: any =[];
    loginRankingList: any =[];
    utilizeRankingList: any =[];
    utilizeRemoteRankingList: any =[];
    loadingInstance:any={};
    utilizeRemoteReverseList: any =[];
    archiveAgentCode:string;
    archiveAgentName:string;
    options: any =[];
    formStyle: any = {
      "height": Number(document.documentElement.clientHeight-155)+'px' ,
    };
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
      this.loginRankingList = [];
      this.utilizeRankingList = [];
      this.utilizeRemoteRankingList = [];
      this.utilizeRemoteReverseList = [];
    }
    startStatistics() {
      this.getRankingList();
    };
    restForm () {
      this.form = {
        startMonth:null,
        endMonth:null
      }
    };
    getRankingList() {
      let self = this;
      let params = {
        archiveAgentCode: this.archiveAgentCode,
        startMonth: this.form.startMonth,
        endMonth: this.form.endMonth,
      };
      this.loadingInstance = Loading.service(
          {
              lock: true,
              text: '正在加载中，请稍候',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          }
        );
      Service.getRankingList(params).then(res => {
        if (res.data.succeeded) {
          this.loginRankingList = res.data.data.loginRankingList;
          this.utilizeRankingList = res.data.data.utilizeRankingList;
          this.utilizeRemoteRankingList = res.data.data.utilizeRemoteRankingList;
          this.utilizeRemoteReverseList = res.data.data.utilizeRemoteReverseList;
          console.log(res.data.data);
        } else {
          self.getError(res.data.errorMessage);
        }
        self.$nextTick(() => { this.loadingInstance.close();});
      });
    }
    //请求失败
    getError(message: string) {
      this["$message"]({
        message,
        type: "error"
      });
    }
    created() {
      this.getRankingList();
    }
    mounted(){
      window.onresize = () => {
          return (() => {
              this.formStyle = {
                  "height": Number(document.documentElement.clientHeight - 155)+'px',
              };
          })()
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
  .mainTitle > span {
    padding: 0 10px;
    border-left: 4px solid #2b87c6;
  }
  .el-aside{
    border: 1px solid #c3c3c3;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    .leftfrom {
      .el-select {
        width: 220px;
      }
    }
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
.rightlist{
  display: flex;
  justify-content: space-around;
}
.rightlist>div{
  width: 23%; 
  border: 1px solid #c3c3c3;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);  
}
.rightlist>div>p{
  width: 100%;
  height: 47px;
  line-height: 47px;
  text-align: center;
  background-color:#FF9800; 
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.rightlist {
  .negativeListView {
    .negativeList{
        background-color:rgb(110, 120, 130); 
    }
    ul {
      li {
        span {
          border-color: rgb(51, 51, 51);
          color:rgb(51, 51, 51);
        }
      }
    }
  }
}
.topThree {
  border-color: red !important;
}
.backBackground {
  border-color: rgb(255, 152, 0) !important;
}
.topThree2 {
  border-color: rgb(51, 51, 51) !important;
}
.backBackground2 {
  border-color: rgb(159, 168, 179) !important;
}
.rightlist>div>ul>li{
  line-height: 32px;
  padding: 8px 15px;
}
.rightlist>div>ul{
  height:92%;
  overflow-y:auto; 
  background-color: #fff;
}
.rightlist>div>ul>li>span>span{
  display: inline-block;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  border: 2px solid red;
  text-align: center;
  margin-right: 10px;
}
.rightlist>div>ul>li>span:last-child{
  float: right;
}
</style>

