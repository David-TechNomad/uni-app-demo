<template>
      <!-- 档案利用统计分析 -->
    <div class="frame">
        <div class="mainTitle">
           <span>档案利用统计分析</span>             
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
                <el-checkbox v-model="form.radio" label="1" style="padding-top:10px">包含下级档案馆</el-checkbox>              
                <el-form-item label="起止时间">
                </el-form-item>
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  size="small"
                  placeholder="年/月/日">
                </el-date-picker>
                <el-date-picker
                  v-model="form.endDate"
                  type="date"
                  size="small"
                  style="padding-top:10px;"
                  placeholder="年/月/日">
                </el-date-picker>
                <div class="formbtn">
                  <el-form-item label="" style="padding-top:20px;">
                  <el-button class="defaultBtn">统计</el-button>
                  <el-button class="defaultBtn" @click="restForm">重置</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-aside>

          <el-main class="contentbox ml10">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="erpTab">
              
              <el-tab-pane label="档案利用总数统计"  name="first">
                <div class="bgwhite2 boxshow pd10" :style="divStyle">
                  <div class="tabheader">
                    <p>
                      <span>【档案馆】江西省档案馆及下级档案馆</span> 
                      <span>【年度】2018年</span>  
                    </p>
                    <div>
                      <el-button class="defaultBtn">导入</el-button>
                      <el-button class="defaultBtn">打印/导出</el-button>
                    </div>
                  </div>
                  <!-- 档案利用总数统计 -->
                  <el-table
                    stripe
                    height="400"
                    :data="tableData"
                    style="width: 100%"
                    @row-click="tablerowclick"
                    :row-style="{height:'32px'}"  :header-row-style="{height:'32px'}"  :cell-style="{padding:'1px'}"
                    :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}">
                    
                    <el-table-column label="档案馆" align="center">
                        <el-table-column
                          prop="archiveAgentName"
                          label=" "
                          align="center"
                          >
                        </el-table-column>                      
                    </el-table-column>
                    <el-table-column label="按档案控制标识统计频次" align="center">
                        <el-table-column
                          prop="controlWenJianPercent1"
                          label="涉密档案"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="controlWenJianPercent2"
                          label="开放档案"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="controlWenJianPercent3"
                          label="控制档案"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="openWenJianPercent"
                          label="总频次"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="totalWenJianCnt"
                          label="数字原文利用频次"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="openWenJianCnt"
                          label="数字原文利用占比"
                          align="center"
                          >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="按利用方式统计人次"  align="center">
                        <el-table-column
                          prop="controlWenJianPercent"
                          label="远程"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="controlWenJianPercent1"
                          label="本地"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="totalWenJianCnt"
                          label="总人次"
                          align="center"
                          >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="远程利用双方服务人次"  align="center">
                        <el-table-column
                          prop="openWenJianPercent"
                          label=" "
                          align="center"
                          >
                        </el-table-column>
                    </el-table-column>
                  </el-table>
                  <div class="chartArea">
                    <p style="width:100%;"><span style="padding-right:60%;">档案占比</span><span>总计</span> </p> 
                    
                    <div class="cakeChart" ref="cakeChart">
                    </div>
                    <div class="cakeChartall" ref="cakeChartall">
                    </div>

                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="不同门类利用统计" name="second">
                <div class="bgwhite2 boxshow pd10">
                  <div class="tabheader">
                    <p>
                      <span>【档案馆】江西省档案馆及下级档案馆</span> 
                      <span>【年度】2018年</span>  
                    </p>
                    <div>
                      <el-button class="defaultBtn">导入</el-button>
                      <el-button class="defaultBtn">打印/导出</el-button>
                    </div>
                  </div>
                  <!-- 不同门类利用统计 -->
                  <el-table
                    stripe
                    :height="bodyHeight"
                    :data="tableData"
                    style="width: 100%"
                    :show-header="index>0?false:true"
                    :row-style="{height:'32px'}"  :header-row-style="{height:'32px'}"  :cell-style="{padding:'1px'}"
                    :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}">
                    
                    <el-table-column label="档案馆" align="center">
                        <el-table-column
                          prop="archiveAgentName"
                          label=" "
                          align="center"
                          >
                        </el-table-column>                      
                    </el-table-column>
                    <el-table-column label="门类"  align="center">
                        <el-table-column
                          prop="kindName"
                          label=" "
                          align="center"
                          >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="按档案控制标识统计频次"  align="center">
                        <el-table-column
                          prop="controlWenJianPercent"
                          label="涉密档案"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="controlWenJianPercent3"
                          label="开放档案"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="controlWenJianPercent2"
                          label="控制（含待定）档案"
                          align="center"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="totalWenJianCnt"
                          label="总频次"
                          align="center"
                          >
                        </el-table-column>
                    </el-table-column>

                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="查阅者统计分析" name="third">
                <div class="bgwhite2 boxshow pd10">
                  <div class="tabheader">
                    <p>
                      <span>【档案馆】江西省档案馆及下级档案馆</span> 
                      <span>【年度】2018年</span>  
                    </p>
                    <div>
                      <el-button class="defaultBtn">导入</el-button>
                      <el-button class="defaultBtn">打印/导出</el-button>
                    </div>
                  </div>
                  <!-- 各门类档案数量 -->
                  <el-tabs v-model="activeNames" @tab-click="handleClick">

                    <el-tab-pane label="查阅者和查阅档案门类统计" name="first">
                      <div class="pd10">
                        <el-select v-model="value" placeholder="所有门类" size="mini">
                          <el-option
                            v-for="item in kindData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </div>
                        <!-- :summary-method="({ columns, data }) => getSummaries({ columns, data }, index)" -->

                      <el-table
                        stripe
                        :height="bodyHeight2"
                        :data="tableData"
                        :show-header="index>0?false:true"
                        style="width: 100%"
                        :row-style="{height:'32px'}"  :header-row-style="{height:'32px'}"  :cell-style="{padding:'1px'}"
                        :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}">
                        
                        <el-table-column label="档案馆" align="center">
                            <el-table-column
                              prop="archiveAgentName"
                              label=" "
                              align="center"
                              >
                            </el-table-column>                      
                        </el-table-column>
                        <el-table-column label="门类"  align="center">
                            <el-table-column
                              prop="kindName"
                              label=" "
                              align="center"
                              >
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="按国家或地区统计"  align="center">
                            <el-table-column
                              prop="controlWenJianPercent1"
                              label="内地公民"
                              align="center"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="controlWenJianPercent2"
                              label="台港澳同胞"
                              align="center"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="controlWenJianPercent3"
                              label="外国人"
                              align="center"
                              >
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="按用户类型统计" align="center">
                            <el-table-column
                              prop="controlWenJianPercent"
                              label="公众用户"
                              align="center"
                              >
                            </el-table-column>                      
                            <el-table-column
                              prop="totalWenJianCnt"
                              label="馆内用户"
                              align="center"
                              >
                            </el-table-column>                      
                        </el-table-column>
                      </el-table>
                    
                    </el-tab-pane>
                    <el-tab-pane label="查阅者查阅目的统计" name="second">
                      <div class="pd10">
                          <el-select v-model="value" placeholder="所有查阅目的" size="mini">
                            <el-option
                              v-for="item in purpose"
                              :key="item.code"
                              :label="item.displayText"
                              :value="item.code"
                            ></el-option>
                          </el-select>
                      </div>
                      <el-table
                        stripe
                        :height="bodyHeight2"
                        :data="tableData"
                        style="width: 100%"
                        :row-style="{height:'32px'}"  :header-row-style="{height:'32px'}"  :cell-style="{padding:'1px'}"
                        :header-cell-style="{background:'#2b87c6',color:'#fff',border: '1px solid #fff',padding:'1px'}">
                        
                        <el-table-column label="档案馆" align="center">
                            <el-table-column
                              prop="archiveAgentName"
                              label=" "
                              align="center"
                              >
                            </el-table-column>                      
                        </el-table-column>
                        <el-table-column label="查阅目的"  align="center">
                            <el-table-column
                              prop="purpose"
                              label=" "
                              align="center"
                              >
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="按查阅者所属国家或地区统计"  align="center">
                            <el-table-column
                              prop="openWenJianPercent"
                              label="内地公民"
                              align="center"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="controlWenJianPercent"
                              label="台港澳同胞"
                              align="center"
                              >
                            </el-table-column>
                            <el-table-column
                              prop="controlWenJianPercent3"
                              label="外国人"
                              align="center"
                              >
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="按查阅者的用户类型统计" align="center">
                            <el-table-column
                              prop="controlWenJianPercent1"
                              label="公众用户"
                              align="center"
                              >
                            </el-table-column>                      
                            <el-table-column
                              prop="controlWenJianPercent2"
                              label="馆内用户"
                              align="center"
                              >
                            </el-table-column>                      
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>   

    </div>       
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts";
import Service from "./ArchivesUtilizationStatistics.service";
import { State, Getter, Mutation } from "vuex-class";
@Component()
export default class CollectionArchivesStatistics extends Vue {
        activeName:string = 'first';
        activeNames:string = 'first';
        archiveAgentCode:string;
        purpose: any = [];
        kindData: any = [];
        archiveAgentName:string;
        form: any =[{
          radio:false
        }];
        divStyle: any = {
            "height": Number(document.documentElement.clientHeight-199)+'px' ,
            "overflow-y": 'auto'
        };
        bodyHeight: number = document.documentElement.clientHeight - 255;
        bodyHeight2: number = document.documentElement.clientHeight - 355;
        value: any =[];
        options: any =[];
        tableData: any = [{
            archiveAgentName: '江西省档案馆',
            archiveAgentCode: '436001',
            controlWenJianCnt: '99.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '19',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '89',
            openWenJianCnt: '1.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'现行文书档案（传统）',
            purpose:'补办证件'
          }, {
            archiveAgentName: '南昌市档案馆',
            archiveAgentCode: '436002',
            controlWenJianCnt: '7.00%',
            controlWenJianPercent: '6',
            controlWenJianPercent1: '99',
            controlWenJianPercent2: '36',
            controlWenJianPercent3: '79',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '78',
            totalWenJianCnt:'10',
            kindName:'照片档案',
            purpose:'申办户口'
          }, {
            archiveAgentName: '东湖区档案馆',
            archiveAgentCode: '436003',
            controlWenJianCnt: '98.00%',
            controlWenJianPercent: '5',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '400',
            totalWenJianCnt:'800',
            kindName:'录像档案（文件级）',
            purpose:'办理退休'
          }, {
            archiveAgentName: '西湖区档案馆',
            archiveAgentCode: '436004',
            controlWenJianCnt: '0',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            controlWenJianPercent: '0',
            openWenJianCnt: '0',
            openWenJianPercent: '0',
            totalWenJianCnt:'0',
             kindName:'录像档案',
            purpose:'公证'
          }, {
            archiveAgentName: '青云谱区档案馆',
            archiveAgentCode: '436005',
            controlWenJianCnt: '56.00%',
            controlWenJianPercent: '9',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '60.00%',
            openWenJianPercent: '12',
            totalWenJianCnt:'96',
            kindName:'录音档案（文件级）',
            purpose:'购商品住房'
          }, {
            archiveAgentName: '新建县档案馆',
            archiveAgentCode: '436006',
            controlWenJianCnt: '1.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '54',
            controlWenJianPercent2: '65',
            controlWenJianPercent3: '58',
            openWenJianCnt: '54.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'录音档案',
            purpose:'申请廉租房'
          }, {
            archiveAgentName: '湾里区档案馆',
            archiveAgentCode: '436007',
            controlWenJianCnt: '96.00%',
            controlWenJianPercent: '44',
            controlWenJianPercent1: '65',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '64',
            openWenJianCnt: '14.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'革命历史档案',
            purpose:'经适房'
        }, {
            archiveAgentName: '景德镇市档案馆',
            archiveAgentCode: '436008',
            controlWenJianCnt: '19.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '42',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '45',
            openWenJianCnt: '3.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'民国档案',
            purpose:'资料查考'
        },{
            archiveAgentName: '南城县档案馆',
            archiveAgentCode: '436001',
            controlWenJianCnt: '99.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '19',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '89',
            openWenJianCnt: '1.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'现行文书档案（传统）',
            purpose:'编史修志'
          }, {
            archiveAgentName: '黎川县档案馆',
            archiveAgentCode: '436002',
            controlWenJianCnt: '7.00%',
            controlWenJianPercent: '6',
            controlWenJianPercent1: '99',
            controlWenJianPercent2: '36',
            controlWenJianPercent3: '79',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '78',
            totalWenJianCnt:'10',
            kindName:'照片档案',
            purpose:'研究'
          }, {
            archiveAgentName: '南丰县档案馆',
            archiveAgentCode: '436003',
            controlWenJianCnt: '98.00%',
            controlWenJianPercent: '5',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '400',
            totalWenJianCnt:'800',
            kindName:'录像档案（文件级）',
            purpose:'其他'
          }, {
            archiveAgentName: '测试4',
            archiveAgentCode: '436001',
            controlWenJianCnt: '99.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '19',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '89',
            openWenJianCnt: '1.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'现行文书档案（传统）',
            purpose:'补办证件'
          }, {
            archiveAgentName: '乐安县档案馆',
            archiveAgentCode: '436002',
            controlWenJianCnt: '7.00%',
            controlWenJianPercent: '6',
            controlWenJianPercent1: '99',
            controlWenJianPercent2: '36',
            controlWenJianPercent3: '79',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '78',
            totalWenJianCnt:'10',
            kindName:'照片档案',
            purpose:'申办户口'
          }, {
            archiveAgentName: '测试6',
            archiveAgentCode: '436003',
            controlWenJianCnt: '98.00%',
            controlWenJianPercent: '5',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '400',
            totalWenJianCnt:'800',
            kindName:'录像档案（文件级）',
            purpose:'办理退休'
          }, {
            archiveAgentName: '宜黄县档案馆',
            archiveAgentCode: '436004',
            controlWenJianCnt: '0',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            controlWenJianPercent: '0',
            openWenJianCnt: '0',
            openWenJianPercent: '0',
            totalWenJianCnt:'0',
             kindName:'录像档案',
            purpose:'公证'
          }, {
            archiveAgentName: '测试8',
            archiveAgentCode: '436005',
            controlWenJianCnt: '56.00%',
            controlWenJianPercent: '9',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '60.00%',
            openWenJianPercent: '12',
            totalWenJianCnt:'96',
            kindName:'录音档案（文件级）',
            purpose:'购商品住房'
          }, {
            archiveAgentName: '金溪县档案馆',
            archiveAgentCode: '436006',
            controlWenJianCnt: '1.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '54',
            controlWenJianPercent2: '65',
            controlWenJianPercent3: '58',
            openWenJianCnt: '54.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'录音档案',
            purpose:'申请廉租房'
          }, {
            archiveAgentName: '测试92',
            archiveAgentCode: '436007',
            controlWenJianCnt: '96.00%',
            controlWenJianPercent: '44',
            controlWenJianPercent1: '65',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '64',
            openWenJianCnt: '14.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'革命历史档案',
            purpose:'经适房'
        }, {
            archiveAgentName: '资溪县档案馆',
            archiveAgentCode: '436008',
            controlWenJianCnt: '19.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '42',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '45',
            openWenJianCnt: '3.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'民国档案',
            purpose:'资料查考'
        },{
            archiveAgentName: '测试95',
            archiveAgentCode: '436001',
            controlWenJianCnt: '99.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '19',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '89',
            openWenJianCnt: '1.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'现行文书档案（传统）',
            purpose:'编史修志'
          }, {
            archiveAgentName: '东乡县档案馆',
            archiveAgentCode: '436002',
            controlWenJianCnt: '7.00%',
            controlWenJianPercent: '6',
            controlWenJianPercent1: '99',
            controlWenJianPercent2: '36',
            controlWenJianPercent3: '79',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '78',
            totalWenJianCnt:'10',
            kindName:'照片档案',
            purpose:'研究'
          }, {
            archiveAgentName: '测试97',
            archiveAgentCode: '436003',
            controlWenJianCnt: '98.00%',
            controlWenJianPercent: '5',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '400',
            totalWenJianCnt:'800',
            kindName:'录像档案（文件级）',
            purpose:'其他'
          }, {
            archiveAgentName: '广昌县档案馆',
            archiveAgentCode: '436001',
            controlWenJianCnt: '99.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '19',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '89',
            openWenJianCnt: '1.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'现行文书档案（传统）',
            purpose:'补办证件'
          }, {
            archiveAgentName: '测试999',
            archiveAgentCode: '436002',
            controlWenJianCnt: '7.00%',
            controlWenJianPercent: '6',
            controlWenJianPercent1: '99',
            controlWenJianPercent2: '36',
            controlWenJianPercent3: '79',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '78',
            totalWenJianCnt:'10',
            kindName:'照片档案',
            purpose:'申办户口'
          }, {
            archiveAgentName: '抚州便民服务中心',
            archiveAgentCode: '436003',
            controlWenJianCnt: '98.00%',
            controlWenJianPercent: '5',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '400',
            totalWenJianCnt:'800',
            kindName:'录像档案（文件级）',
            purpose:'办理退休'
          }, {
            archiveAgentName: '测试96778',
            archiveAgentCode: '436004',
            controlWenJianCnt: '0',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            controlWenJianPercent: '0',
            openWenJianCnt: '0',
            openWenJianPercent: '0',
            totalWenJianCnt:'0',
             kindName:'录像档案',
            purpose:'公证'
          }, {
            archiveAgentName: '江西省便民服务机构',
            archiveAgentCode: '436005',
            controlWenJianCnt: '56.00%',
            controlWenJianPercent: '9',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '60.00%',
            openWenJianPercent: '12',
            totalWenJianCnt:'96',
            kindName:'录音档案（文件级）',
            purpose:'购商品住房'
          }, {
            archiveAgentName: '临川区档案馆',
            archiveAgentCode: '436006',
            controlWenJianCnt: '1.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '54',
            controlWenJianPercent2: '65',
            controlWenJianPercent3: '58',
            openWenJianCnt: '54.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'录音档案',
            purpose:'申请廉租房'
          }, {
            archiveAgentName: '抚州市办证中心',
            archiveAgentCode: '436007',
            controlWenJianCnt: '96.00%',
            controlWenJianPercent: '44',
            controlWenJianPercent1: '65',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '64',
            openWenJianCnt: '14.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'革命历史档案',
            purpose:'经适房'
        }, {
            archiveAgentName: '抚州市档案馆',
            archiveAgentCode: '436008',
            controlWenJianCnt: '19.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '42',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '45',
            openWenJianCnt: '3.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'民国档案',
            purpose:'资料查考'
        },{
            archiveAgentName: '青原区档案馆',
            archiveAgentCode: '436001',
            controlWenJianCnt: '99.00%',
            controlWenJianPercent: '1',
            controlWenJianPercent1: '19',
            controlWenJianPercent2: '23',
            controlWenJianPercent3: '89',
            openWenJianCnt: '1.00%',
            openWenJianPercent: '100',
            totalWenJianCnt:'200',
            kindName:'现行文书档案（传统）',
            purpose:'编史修志'
          }, {
            archiveAgentName: '永新县档案馆',
            archiveAgentCode: '436002',
            controlWenJianCnt: '7.00%',
            controlWenJianPercent: '6',
            controlWenJianPercent1: '99',
            controlWenJianPercent2: '36',
            controlWenJianPercent3: '79',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '78',
            totalWenJianCnt:'10',
            kindName:'照片档案',
            purpose:'研究'
          }, {
            archiveAgentName: '安福县档案馆',
            archiveAgentCode: '436003',
            controlWenJianCnt: '98.00%',
            controlWenJianPercent: '5',
            controlWenJianPercent1: '2',
            controlWenJianPercent2: '33',
            controlWenJianPercent3: '5',
            openWenJianCnt: '6.00%',
            openWenJianPercent: '400',
            totalWenJianCnt:'800',
            kindName:'录像档案（文件级）',
            purpose:'其他'
          }];
        tableJson:  any =[
          {
            a: [{
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
        }]
          },
          {
            a: [{
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
        }]
          }
        ];
        cakeChart:string = "";
        columnChart:string = "";
        option: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option1: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:200, name:'直接访问'},
                        {value:110, name:'邮件营销'},
                        {value:334, name:'联盟广告'},
                        {value:435, name:'视频广告'},
                        {value:648, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option2: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:735, name:'直接访问'},
                        {value:410, name:'邮件营销'},
                        {value:634, name:'联盟广告'},
                        {value:435, name:'视频广告'},
                        {value:548, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option3: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:1100, name:'直接访问'},
                        {value:410, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:835, name:'视频广告'},
                        {value:148, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option4: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:888, name:'直接访问'},
                        {value:666, name:'邮件营销'},
                        {value:333, name:'联盟广告'},
                        {value:123, name:'视频广告'},
                        {value:412, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option5: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:100, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:535, name:'视频广告'},
                        {value:648, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option6: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:535, name:'直接访问'},
                        {value:1110, name:'邮件营销'},
                        {value:334, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:148, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option7: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:852, name:'直接访问'},
                        {value:258, name:'邮件营销'},
                        {value:951, name:'联盟广告'},
                        {value:159, name:'视频广告'},
                        {value:753, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option8: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:753, name:'直接访问'},
                        {value:357, name:'邮件营销'},
                        {value:456, name:'联盟广告'},
                        {value:654, name:'视频广告'},
                        {value:951, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        option9: any = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '70%',
                    center: ['50%', '60%'],
                    data:[
                        {value:741, name:'直接访问'},
                        {value:147, name:'邮件营销'},
                        {value:852, name:'联盟广告'},
                        {value:369, name:'视频广告'},
                        {value:123, name:'搜索引擎'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    label: {        //展示文本设置 
                          normal: {
                              show: false,     //展示
                              position: 'outside'      // outside表示文本显示位置为外部
                          },
                          emphasis: {    //文本样式
                              show: false,    //展示
                              textStyle: {    //文本样式
                                  fontSize: '14',
                                  fontWeight: '600',
                              }
                          }
                    },
                    labelLine: {    //引导线设置
                      normal: {
                            show: false,   //引导线显示
                      }
                    },
                }
            ]
        };
        constructor() {
          super();
          this.archiveAgentCode = window.sessionStorage.getItem('archiveAgentCode');
          this.archiveAgentName = window.sessionStorage.getItem('archiveAgentName');
        }
      handleClick(tab, event) {
        console.log("tab:::", tab);
        console.log("event:::", event); 
      };
      // 查阅者目的数据字典
      dicgetDictListByDictId() {
        let self = this;
        Service.dicgetDictListByDictId(39).then(res => {
            if (res.data.succeeded) {
              this.purpose = res.data.data;
            } else {
              self.getError(res.data.errorMessage);
            }
            // self.$nextTick(() => { this.loadingInstance.close();});
          });
      }
      restForm () {
          this.form = {
            startDate: null,
            endDate: null,
          };
      };
      //请求失败
      getError(message: string) {
        this["$message"]({
          message,
          type: "error"
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
      tablerowclick(row){
          debugger;
          let arr1 = this.option
          let arr2 = this.option1
          let arr3 = this.option2
          let arr4 = this.option3
          let arr5 = this.option4
          let arr6 = this.option5
          let arr7 = this.option6
          let arr8 = this.option7
          let arr9 = this.option8
          let arr10 = this.option9
          let arr = [arr1,arr2,arr3,arr4,arr5,arr6,arr7,arr8,arr9,arr10];
          this.options = arr[Math.floor((Math.random()*arr.length))]
          this.cakeChart = echarts.init(this['$refs']['cakeChart']);
          this.cakeChart.setOption(this.options);
          this.cakeChartall = echarts.init(this['$refs']['cakeChartall']);
          this.cakeChartall.setOption(this.options)
      };
      getSummaries(param, i) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            if (i==Number(this.tableJson.length-1)) {
              sums[index] = '总价';
              return;
            } else {
              sums[index] = '小计';
              return;
            }
          }
        });
        return sums;
      };
    created() {
        this.getSearcheckurl();
        this.dicgetDictListByDictId();
    };
    mounted(){
      window.onresize = () => {
        return (() => {
          this.bodyHeight = document.documentElement.clientHeight - 255;
          this.bodyHeight2 = document.documentElement.clientHeight - 360;
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
  @import '../../../styles/innerPublic.scss';
  @import '../../../styles/fileManage/arrange.scss';
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
    // height: 600px;
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
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    /* color: #409EFF; */
    /* background-color: #FFF; */
    /* border-right-color: #DCDFE6; */
    /* border-left-color: #DCDFE6; */
    color: #fff!important;
    background-color: #005999!important ;
    border-bottom-color: #005999!important;
}
</style>

