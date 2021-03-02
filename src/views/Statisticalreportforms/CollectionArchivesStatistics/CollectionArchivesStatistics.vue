<template>
  <div class="frame CollectionArchivesStatisticsView">
    <div class="mainTitle">
      <span>馆藏档案统计分析</span>
    </div>
    <el-container>
      <el-aside width="254px" class="bgwhite2">
        <span>统计条件</span>
        <div class="leftfrom">
          <el-form ref="form" :model="form">
            <el-form-item label="范围"></el-form-item>
            <el-input readonly size="small" v-model="archiveAgentCode"></el-input>
            <el-form-item label></el-form-item>
            <el-checkbox v-model="form.includeChildrenArchiveAgent" label="1" style="padding-top:10px">包含下级档案馆</el-checkbox>
            <el-form-item label="年度"></el-form-item>
            <el-date-picker
              v-model="form.year"
              type="year"
              size="small"
              value-format="yyyy"
              format="yyyy"
              placeholder="年">
            </el-date-picker>
            <el-form-item label="创建时间"></el-form-item>
            <el-date-picker
              v-model="form.startDate"
              type="date"
              size="small"
              value-format="yyyyMMdd"
              format="yyyyMMdd"
              placeholder="年/月/日">
            </el-date-picker>
            <el-date-picker
              v-model="form.endDate"
              type="date"
              size="small"
              value-format="yyyyMMdd"
              format="yyyyMMdd"
              style="padding-top:10px;"
              placeholder="年/月/日">
            </el-date-picker>
            <el-form-item label="保管期限"></el-form-item>
            <el-select v-model="form.retentionPeriod" placeholder="请选择" size="small">
              <el-option
                v-for="item in retentionPeriodData"
                :key="item.code"
                :label="item.displayText"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-form-item label="控制标识"></el-form-item>
            <el-select v-model="form.controlId" placeholder="请选择" size="small">
              <el-option
                v-for="item in controlData"
                :key="item.code"
                :label="item.displayText"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-form-item label="门类"></el-form-item>
            <el-select v-model="form.kindId" placeholder="请选择" size="small">
              <el-option
                v-for="item in kindData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <div class="formbtn">
              <el-form-item label style="padding-top:10px;">
                <el-button class="defaultBtn" @click="startStatistics">统计</el-button>
                <el-button class="defaultBtn" @click="restForm">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-aside>

      <el-main class="contentbox ml10">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="erpTab">
          <el-tab-pane label="档案数量统计" name="first">
            <div class="bgwhite2 boxshow pd10">
              <div class="tabheader">
                <p>
                  <span>【档案馆】江西省档案馆及下级档案馆</span>
                  <span>【年度】2018年</span>
                  <span>【保管期限】所有</span>
                  <span>【门类】所有</span>
                  <span>【控制标识】所有</span>
                </p>
                <div>
                  <el-button class="defaultBtn">导入</el-button>
                  <el-button class="defaultBtn">打印/导出</el-button>
                </div>
              </div>
              <!-- 档案数量统计 -->
              <el-table
                stripe
                :height="bodyHeight"
                :data="tableData2"
                lazy
                :load="load"
                style="width: 100%;"
                :row-key="getRowKeys"
                v-loading="loading"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :row-style="{height:'32px'}"
                :header-row-style="{height:'32px'}"
                :cell-style="{padding:'1px'}"
                :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}"
              >
                <el-table-column label="档案馆" align="center">
                  <el-table-column prop="archiveAgentName" label=" " align="center"></el-table-column>
                </el-table-column>
                <el-table-column label="全宗" align="center">
                  <el-table-column prop="fondName" label=" " align="center"></el-table-column>
                </el-table-column>
                <el-table-column label="案卷" align="center">
                  <el-table-column align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.anJuanCnt}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="文件" align="center">
                  <el-table-column label="涉密" align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.openWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="开放" align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.openWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="控制（含待定）" align="center" width="125">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.openWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="总数" align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.totalWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="数字原文数" align="center">
                  <el-table-column align="center" width="100">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.openWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="电子档案容量" align="center">
                  <el-table-column label="（MB）" align="center" width="110">
                    <template slot-scope="scope">
                      <!-- <span v-if="scope.row.statisticData.fileSize > 1024 ">
                                    {{(scope.row.statisticData.fileSize / 1024).toFixed(2) + 'kb'}} 
                      </span>-->
                      <!-- <span v-else-if="scope.row.statisticData.fileSize > 1024 * 1024 "> -->
                      {{(scope.row.statisticData.fileSize)}}
                      <!-- </span> -->
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="录音档案时长" align="center">
                  <el-table-column label="（分钟）" align="center" width="120">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.fileCnt}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="录像档案时长" align="center">
                  <el-table-column label="（分钟）" align="center" width="120">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.fileCnt}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="控制标识统计分析" name="second">
            <div class="bgwhite2 boxshow pd10" :style="divStyle">
              <div class="tabheader">
                <p>
                  <span>【档案馆】江西省档案馆及下级档案馆</span>
                  <span>【年度】2018年</span>
                  <span>【保管期限】所有</span>
                  <span>【门类】所有</span>
                  <span>【控制标识】所有</span>
                </p>
                <div>
                  <el-button class="defaultBtn">导入</el-button>
                  <el-button class="defaultBtn">打印/导出</el-button>
                </div>
              </div>
              <!-- 控制标识统计分析 -->
              <el-table
                stripe
                height="400"
                :data="ControlIdStatistic"
                lazy
                :load="load2"
                style="width: 100%;"
                @row-click="tablerowclick"
                :row-key="getRowKeys"
                v-loading="loading"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :row-style="{height:'32px'}"
                :header-row-style="{height:'32px'}"
                :cell-style="{padding:'1px'}"
                :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}"
              >
                <el-table-column label="统计单位" align="center">
                  <el-table-column prop="archiveAgentName" label=" " align="center"></el-table-column>
                </el-table-column>
                <el-table-column label="全宗" align="center">
                  <el-table-column prop="fondName" label=" " align="center"></el-table-column>
                </el-table-column>
                <el-table-column label="涉密档案" align="center">
                  <el-table-column prop="city" label="数量" align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.totalWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="city" label="占比" align="center" width="100">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.controlWenJianPercent}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="开放档案" align="center">
                  <el-table-column prop="province" label="数量" align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.openWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="province" label="占比" align="center" width="100">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.openWenJianPercent}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="控制（含待定）档案" align="center">
                  <el-table-column prop="province" label="数量" align="center" width="80">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.controlWenJianCnt}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="province" label="占比" align="center" width="100">
                    <template slot-scope="scope">
                      <span>{{scope.row.statisticData.controlWenJianPercent}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <div class="chartArea">
                <p style="width:100%;">
                  <span style="padding-right:60%;">档案占比</span>
                  <span>总计</span>
                </p>

                <div class="cakeChart" ref="cakeChart"></div>
                <div class="cakeChartall" ref="cakeChartall"></div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="各门类档案数量" name="third">
            <div class="bgwhite2 boxshow pd10">
              <div class="tabheader">
                <p>
                  <span>【档案馆】江西省档案馆及下级档案馆</span>
                  <span>【年度】2018年</span>
                  <span>【保管期限】所有</span>
                  <span>【门类】所有</span>
                  <span>【控制标识】所有</span>
                </p>
                <div>
                  <el-button class="defaultBtn">导入</el-button>
                  <el-button class="defaultBtn">打印/导出</el-button>
                </div>
              </div>
              <!-- 各门类档案数量 -->
              <el-table
                stripe
                :height="bodyHeight"
                lazy
                :load="load3"
                :row-key="getRowKeys"
                v-loading="loading"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :data="CountByKindStatistic"
                style="width: 100%"
                :row-style="{height:'32px'}"
                :header-row-style="{height:'32px'}"
                :cell-style="{padding:'1px'}"
                :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}"
              >
                <el-table-column label="档案馆" align="center" prop="archiveAgentName" width="150">
                </el-table-column>
                <el-table-column label="全宗" align="center" prop="fondName">
                </el-table-column>
                <el-table-column :label="title.kindName" align="center" v-for="title,index in kindInfo" :key="title.kindId">
                  <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData[index]}}</span>                        
                    </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数字原文增长率" name="fourth">
            <div class="bgwhite2 boxshow pd10" :style="divStyle">
              <div class="tabheader">
                <p>
                  <span>【档案馆】江西省档案馆及下级档案馆</span>
                  <span>【年度】2018年</span>
                  <span>【保管期限】所有</span>
                  <span>【门类】所有</span>
                  <span>【控制标识】所有</span>
                </p>
                <div>
                  <el-button class="defaultBtn">导入</el-button>
                  <el-button class="defaultBtn">打印/导出</el-button>
                </div>
              </div>
              <!-- 档案数量增长率 -->
              <div>
                <!-- <el-select v-model="value" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="value" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select> -->
              </div>
              <el-table
                stripe
                height="300"
                :data="ArchiveGrowthRateStatistic"
                row-key="archiveAgentCode"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                style="width: 100%"
                @row-click="tablerowclick1"
                class="mt10"
                v-loading="loading" 
                :row-style="{height:'32px'}"
                :header-row-style="{height:'32px'}"
                :cell-style="{padding:'1px'}"
                :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}"
              >
                <el-table-column label="统计单位" align="center">
                  <el-table-column prop="archiveAgentName" label=" " align="center"></el-table-column>
                </el-table-column>
                <!-- <el-table-column label align="center">
                  <el-table-column prop="city" label=" " align="center"></el-table-column>
                </el-table-column> -->
                <el-table-column label="2018第一季度" align="center">
                  <el-table-column prop="currentCnt1" label="数量" align="center">
                    <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentCnt1}}</span>                        
                    </template>
                  </el-table-column>
                  <el-table-column prop="currentRate1" label="增长率" align="center">
                    <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentRate1}}</span>                        
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="2018第二季度" align="center">
                  <el-table-column prop="currentCnt2" label="数量" align="center">
                    <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentCnt2}}</span>                        
                    </template>
                  </el-table-column>
                  <el-table-column prop="currentRate2" label="增长率" align="center">
                    <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentRate2}}</span>                        
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="2018第三季度" align="center">
                  <el-table-column prop="currentCnt3" label="数量" align="center">
                    <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentCnt3}}</span>                        
                    </template>
                  </el-table-column>
                  <el-table-column prop="currentRate3" label="增长率" align="center">
                    <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentRate3}}</span>                        
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="2018第四季度" align="center">
                  <el-table-column prop="currentCnt4" label="数量" align="center">
                    <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentCnt4}}</span>                        
                    </template>
                  </el-table-column>
                  <el-table-column prop="currentRate4" label="增长率" align="center">
                     <template slot-scope="scope">                     
                        <span>{{scope.row.statisticData.currentRate4}}</span>                        
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <div>
                <div class="columnChart" ref="columnChart"></div>
              </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="数字原文覆盖率" name="fifth">
            <div class="bgwhite2 boxshow pd10" :style="divStyle">
              <div class="tabheader">
                <p>
                  <span>【档案馆】江西省档案馆及下级档案馆</span>
                  <span>【年度】2018年</span>
                  <span>【保管期限】所有</span>
                  <span>【门类】所有</span>
                  <span>【控制标识】所有</span>
                </p>
                <div>
                  <el-button class="defaultBtn">导入</el-button>
                  <el-button class="defaultBtn">打印/导出</el-button>
                </div>
              </div> -->
              <!-- 数字原文覆盖率 -->
              <!-- <el-table
                stripe
                show-summary
                sum-text="总计"
                height="400"
                :data="tableData"
                v-loading="loading"
                row-key="archiveAgentCode"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                style="width: 100%"
                @row-click="tablerowclick5"
                :row-style="{height:'32px'}"
                :header-row-style="{height:'32px'}"
                :cell-style="{padding:'1px'}"
                :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}"
              >
                <el-table-column label="统计单位" align="center">
                  <el-table-column prop="province" label=" " align="center"></el-table-column>
                </el-table-column>
                <el-table-column label="案卷级目录" align="center">
                  <el-table-column prop="city" label="实体" align="center"></el-table-column>
                  <el-table-column prop="city" label="数字副本" align="center"></el-table-column>
                  <el-table-column prop="city" label="建库率" align="center"></el-table-column>
                </el-table-column>
                <el-table-column label="文件级目录" align="center">
                  <el-table-column prop="city" label="实体" align="center"></el-table-column>
                  <el-table-column prop="city" label="数字副本" align="center"></el-table-column>
                  <el-table-column prop="city" label="建库率" align="center"></el-table-column>
                </el-table-column>
              </el-table>
              <div class="chartArea">
                <p style="width:100%;">
                  <span style="padding-right:60%;">档案占比</span>
                  <span>总计</span>
                </p>

                <div class="cakeChart" ref="cakeCharts"></div>
                <div class="cakeChartall" ref="cakeChartsall"></div>
              </div>
            </div>
          </el-tab-pane> -->
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts";
import { Loading } from 'element-ui';
import Service from "./CollectionArchivesStatistics.service";
import { State, Getter, Mutation } from "vuex-class";
@Component()
export default class CollectionArchivesStatistics extends Vue {
  activeName: string = "first";
  value: string = "";
  loading: Boolean= false;
  tYear: string = '';
  bodyHeight: number = document.documentElement.clientHeight - 255;
  form: any = {};
  options: any = [];
  ControlIdStatistic: any = [];
  CountByKindStatistic: any = [];
  ArchiveGrowthRateStatistic: any = [];
  kindInfo: any = [];
  divStyle: any = {
      "height": Number(document.documentElement.clientHeight-199)+'px' ,
      "overflow-y": 'auto'
  };
  tableData: any = [
    {
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-02",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-08",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-06",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    },
    {
      date: "2016-05-07",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    }
  ];
  tableData2: any = [];
  retentionPeriodData: any = [];
  controlData: any = [];
  kindData: any = [];
  archiveAgentCode:string;
  archiveAgentName:string;
  cakeChart: string = "";
  columnChart: string = "";
  option: any = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {},
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "70%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        label: {
          //展示文本设置
          normal: {
            show: false, //展示
            position: "outside" // outside表示文本显示位置为外部
          },
          emphasis: {
            //文本样式
            show: false, //展示
            textStyle: {
              //文本样式
              fontSize: "14",
              fontWeight: "600"
            }
          }
        },
        labelLine: {
          //引导线设置
          normal: {
            show: false //引导线显示
          }
        }
      }
    ]
  };
  optiona: any = {
    tooltip: {
      trigger: "axis"
    },
    // 图例
    legend: {
      data: ["第一季度", "第二季度", "第三季度", "第四季度"]
    },
    // x轴
    xAxis: {
      data: [
        "山西档案馆",
        "陕西档案馆",
        "江苏档案馆",
        "贵州档案馆",
        "浙江档案馆",
        "四川档案馆"
      ]
    },
    yAxis: {},
    // 数据
    series: [
      {
        name: "第一季度",
        type: "bar",
        barGap: 0,

        data: [10, 20, 30, 40, 20]
      },
      {
        name: "第二季度",
        type: "bar",

        data: [220, 182, 191, 234, 290]
      },
      {
        name: "第三季度",
        type: "bar",

        data: [150, 232, 201, 154, 190]
      },
      {
        name: "第四季度",
        type: "bar",

        data: [98, 77, 101, 99, 40]
      }
    ]
  };
  constructor() {
    super();
    this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
    this.archiveAgentName = window.sessionStorage.getItem('archiveAgentName');
    this.form = {
      includeChildrenArchiveAgent: false,
      kindId: 20,
      year: '2019',
      startDate: null,
      endDate: null,
      retentionPeriod: null,
      controlId: null
    };
  }
  handleClick(tab, event) {
    console.log(tab.name);
    if(tab.name === 'first') {
      this.getArchiveSummaryStatistic();
    } else if(tab.name === 'second') {
      this.getControlIdStatistic();
    } else if(tab.name === 'third') {
      this.getArchiveCountByKindStatistic();
    } else if(tab.name === 'fourth') {
      this.getArchiveGrowthRateStatistic();
    } else if(tab.name === 'fifth') {
      // this.getControlIdStatistic();
    }
  }
  // 保管期限数据字典
  dicgetDictListByDictId() {
    let self = this;
    Service.dicgetDictListByDictId(2).then(res => {
        if (res.data.succeeded) {
          this.retentionPeriodData = res.data.data;
        } else {
          self.getError(res.data.errorMessage);
        }
        // self.$nextTick(() => { this.loadingInstance.close();});
      });
  }
  // 控制标识数据字典
  dicgetDictListByDictId2() {
    let self = this;
    Service.dicgetDictListByDictId(6).then(res => {
        if (res.data.succeeded) {
          this.controlData = res.data.data;
        } else {
          self.getError(res.data.errorMessage);
        }
        // self.$nextTick(() => { this.loadingInstance.close();});
      });
  }
  // 门类数据字典
  getSearcheckurl() {
    let self = this;
    Service.getSearcheckurl({}).then(res => {
        if (res.data.succeeded) {
          this.kindData = res.data.data;
        } else {
          self.getError(res.data.errorMessage);
        }
        // self.$nextTick(() => { this.loadingInstance.close();});
      });
  }
  startStatistics() {
    if(this.activeName === 'first') {
      this.getArchiveSummaryStatistic();
    } else if(this.activeName === 'second') {
      this.getControlIdStatistic();
    } else if(this.activeName === 'third') {
      this.getArchiveCountByKindStatistic();
    } else if(this.activeName === 'fourth') {
      this.getArchiveGrowthRateStatistic();
    } 
  };
  restForm () {
      this.form = {
        includeChildrenArchiveAgent: false,
        kindId: null,
        year: null,
        startDate: null,
        endDate: null,
        retentionPeriod: null,
        controlId: null
      };
  };
  // 获取展开行id
  getRowKeys(row) {
      return row.id;
  };
  // 档案数量统计_全宗级
  load(tree, treeNode, resolve) {
      let self = this;
      let params = {
        archiveAgentCode: tree.archiveAgentCode,
        kindId: this.form.kindId,
        year: this.form.year,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        retentionPeriod: this.form.retentionPeriod,
        controlId: this.form.controlId
      };
      let loadingInstance = Loading.service(
          {
              lock: true,
              text: '正在加载中，请稍等',
              // spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          }
      );
      Service.getFondArchiveSummaryStatistic(params).then(res => {
        if (res.data.succeeded) {
          console.log(res.data.data);
          if(res.data.data && res.data.data.length > 0) {
            for(let item in res.data.data) {
              if(res.data.data[item].fondCode) {
                res.data.data[item].id = item + res.data.data[item].fondCode
              } else {
                res.data.data[item].id = item + '66666'
              }
            }
          }
          resolve(res.data.data);
        } else {
          self.getError(res.data.errorMessage);
        }
        self.$nextTick(() => { loadingInstance.close();});
      });
  };
  // 档案数量统计_档案馆级
  getArchiveSummaryStatistic() {
    let self = this;
    let params = {
      archiveAgentCode: this.archiveAgentCode,
      includeChildrenArchiveAgent: this.form.includeChildrenArchiveAgent,
      kindId: parseInt(this.form.kindId),
      year: this.form.year,
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      retentionPeriod: parseInt(this.form.retentionPeriod),
      controlId: parseInt(this.form.controlId)
    };
    this.loading = true;
    Service.getArchiveSummaryStatistic(params).then(res => {
      if (res.data.succeeded) {
        console.log(res.data.data);
        self.tableData2 = res.data.data;
        for(let item in self.tableData2) {
          if(self.tableData2[item].archiveAgentCode) {
              self.tableData2[item].hasChildren = true;
              self.tableData2[item].id = self.tableData2[item].archiveAgentCode;
          } else {
              self.tableData2[item].id = item + '66666';
          }
        }
        console.log(self.tableData2);
      } else {
        self.getError(res.data.errorMessage);
      }
      this.loading = false;
      // self.$nextTick(() => { this.loadingInstance.close();});
    });
  }
  // 控制标识统计_全宗级
  load2(tree, treeNode, resolve) {
      let self = this;
      let params = {
        archiveAgentCode: tree.archiveAgentCode,
        kindId: this.form.kindId,
        year: this.form.year,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        retentionPeriod: this.form.retentionPeriod,
        controlId: this.form.controlId
      };
      let loadingInstance = Loading.service(
          {
              lock: true,
              text: '正在加载中，请稍等',
              // spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          }
      );
      Service.getFondControlIdStatistic(params).then(res => {
        if (res.data.succeeded) {
          console.log(res.data.data);
          if(res.data.data && res.data.data.length > 0) {
            for(let item in res.data.data) {
              if(res.data.data[item].fondCode) {
                res.data.data[item].id = item + res.data.data[item].fondCode
              } else {
                res.data.data[item].id = item + '77777'
              }
            }
          }
          resolve(res.data.data);
        } else {
          self.getError(res.data.errorMessage);
        }
        self.$nextTick(() => { loadingInstance.close();});
      });
  };
  // 控制标识统计_档案馆级
  getControlIdStatistic() {
    let self = this;
    let params = {
      archiveAgentCode: this.archiveAgentCode,
      includeChildrenArchiveAgent: this.form.includeChildrenArchiveAgent,
      kindId: parseInt(this.form.kindId),
      year: this.form.year,
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      retentionPeriod: parseInt(this.form.retentionPeriod),
      controlId: parseInt(this.form.controlId)
    };
    this.loading = true;
    Service.getControlIdStatistic(params).then(res => {
      if (res.data.succeeded) {
        console.log(res.data.data);
        self.ControlIdStatistic = res.data.data;
        for(let item in self.ControlIdStatistic) {
          if(self.ControlIdStatistic[item].archiveAgentCode) {
              self.ControlIdStatistic[item].hasChildren = true;
              self.ControlIdStatistic[item].id = self.ControlIdStatistic[item].archiveAgentCode;
          } else {
              self.ControlIdStatistic[item].id = item + '77777';
          }
        }
        console.log(self.ControlIdStatistic);
      } else {
        self.getError(res.data.errorMessage);
      }
      this.loading = false;
      // self.$nextTick(() => { this.loadingInstance.close();});
    });
  }
  // 各门类档案数量_全宗级
  load3(tree, treeNode, resolve) {
      let self = this;
      let params = {
        archiveAgentCode: tree.archiveAgentCode,
        kindId: this.form.kindId,
        year: this.form.year,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        retentionPeriod: this.form.retentionPeriod,
        controlId: this.form.controlId
      };
      let loadingInstance = Loading.service(
          {
              lock: true,
              text: '正在加载中，请稍等',
              // spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          }
      );
      Service.getFondArchiveCountByKindStatistic(params).then(res => {
        if (res.data.succeeded) {
          console.log(res.data.data);
          if(res.data.data && res.data.data.length > 0) {
            for(let item in res.data.data) {
              if(res.data.data[item].fondCode) {
                res.data.data[item].id = item + res.data.data[item].fondCode
              } else {
                res.data.data[item].id = item + '77777'
              }
            }
          }
          resolve(res.data.data);
        } else {
          self.getError(res.data.errorMessage);
        }
        self.$nextTick(() => { loadingInstance.close();});
      });
  };
  // 各门类档案数量_档案馆级
  getArchiveCountByKindStatistic() {
    let self = this;
    let params = {
      archiveAgentCode: this.archiveAgentCode,
      includeChildrenArchiveAgent: this.form.includeChildrenArchiveAgent,
      kindId: parseInt(this.form.kindId),
      year: this.form.year,
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      retentionPeriod: parseInt(this.form.retentionPeriod),
      controlId: parseInt(this.form.controlId)
    };
    this.loading = true;
    Service.getArchiveCountByKindStatistic(params).then(res => {
      if (res.data.succeeded) {
        console.log(res.data.data);
        self.CountByKindStatistic = res.data.data.data;
        self.kindInfo = res.data.data.kindInfo;
        for(let item in self.CountByKindStatistic) {
          if(self.CountByKindStatistic[item].archiveAgentCode) {
              self.CountByKindStatistic[item].hasChildren = true;
              self.CountByKindStatistic[item].id = self.CountByKindStatistic[item].archiveAgentCode;
          } else {
              self.CountByKindStatistic[item].id = item + '88888';
          }
        }
        console.log(self.CountByKindStatistic);
      } else {
        self.getError(res.data.errorMessage);
      }
      this.loading = false;
      // self.$nextTick(() => { this.loadingInstance.close();});
    });
  }
  // 档案数量增长率_档案馆级
  getArchiveGrowthRateStatistic() {
    let self = this;
    let params = {
      archiveAgentCode: this.archiveAgentCode,
      includeChildrenArchiveAgent: this.form.includeChildrenArchiveAgent,
      kindId: parseInt(this.form.kindId),
      year: this.form.year,
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      retentionPeriod: parseInt(this.form.retentionPeriod),
      controlId: parseInt(this.form.controlId)
    };
    this.loading = true;
    Service.getArchiveGrowthRateStatistic(params).then(res => {
      if (res.data.succeeded) {
        console.log(res.data.data);
        self.ArchiveGrowthRateStatistic = res.data.data;
        // for(let item in self.ArchiveGrowthRateStatistic) {
        //   if(self.ArchiveGrowthRateStatistic[item].archiveAgentCode) {
        //       self.ArchiveGrowthRateStatistic[item].hasChildren = true;
        //       self.ArchiveGrowthRateStatistic[item].id = self.ArchiveGrowthRateStatistic[item].archiveAgentCode;
        //   } else {
        //       self.ArchiveGrowthRateStatistic[item].id = item + '88888';
        //   }
        // }
        console.log(self.ArchiveGrowthRateStatistic);
      } else {
        self.getError(res.data.errorMessage);
      }
      this.loading = false;
      // self.$nextTick(() => { this.loadingInstance.close();});
    });
  }
  //请求失败
  getError(message: string) {
    this["$message"]({
      message,
      type: "error"
    });
  }
  tablerowclick(row) {
    this.cakeChart = echarts.init(this["$refs"]["cakeChart"]);
    this.cakeChart.setOption(this.option);
    this.cakeChartall = echarts.init(this["$refs"]["cakeChartall"]);
    this.cakeChartall.setOption(this.option);
  }
  tablerowclick1(row) {
    this.columnChart = echarts.init(this["$refs"]["columnChart"]);
    this.columnChart.setOption(this.optiona);
  }
  tablerowclick5(row) {
    this.cakeCharts = echarts.init(this["$refs"]["cakeCharts"]);
    this.cakeCharts.setOption(this.option);
    this.cakeChartsall = echarts.init(this["$refs"]["cakeChartsall"]);
    this.cakeChartsall.setOption(this.option);
  }
  created() {
    this.getArchiveSummaryStatistic();
    this.dicgetDictListByDictId();
    this.dicgetDictListByDictId2();
    this.getSearcheckurl();
    this.getControlIdStatistic();
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    this.tYear = tYear;
    // this.getFondArchiveSummaryStatistic();
  }
  mounted() {
    window.onresize = () => {
      return (() => {
        this.bodyHeight = document.documentElement.clientHeight - 255;
        this.divStyle = {
            "height": Number(document.documentElement.clientHeight-199)+'px' ,
            "overflow-y": 'auto'
        };
      })();
    };
  }
}
</script>
<style lang="scss" scoped >
@import "../../../styles/innerPublic.scss";
@import "../../../styles/Statisticalreportforms/CollectionArchivesStatistics.scss";
.frame {
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
.el-aside {
  border: 1px solid #c3c3c3;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  .leftfrom {
    .el-select {
      width: 220px;
    }
  }
}
.el-aside > span {
  display: block;
  padding: 17px 0;
  background: #eee;
  text-align: center;
}
.el-aside > .leftfrom {
  background: #fff;
  padding: 0 20px;
}
.el-main {
  padding: 0;
  // height: 600px;
}
.tabheader {
  display: flex;
  justify-content: space-between;
}
.tabheader > p {
  line-height: 36px;
}
.tabheader > p > span:not(:first-child) {
  box-sizing: border-box;
  padding-left: 24px;
}
.el-tab-pane::-webkit-scrollbar {
  height: 0;
  width: 0;
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
.el-tabs__item.is-active {
  color: #fff !important;
  background-color: #005999 !important;
  border-bottom-color: #005999 !important;
}
.chartArea {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.cakeChart {
  width: 50%;
  height: 250px;
  /* background-color: #EEE; */
}
.cakeChartall {
  width: 30%;
  height: 250px;
  /* background-color: #EEE; */
}
.chartArea > p > span {
  line-height: 30px;
}
.columnChart {
  width: 100%;
  height: 345px;
}
</style>

