<template>
    <el-container class="fileManagement">
        <el-aside v-show="aside_show">
            <div class="mainTitle">
                <span>文件管理</span>
            </div>
            <div class="treeTitle">
                <el-form :inline="true" :model="treeFilters" class="topParamsForm superLeftForm">
                    <el-form-item v-for="" class="title" label="" ref="title">
                        <el-select class="checkName" v-model="treeFilters.title" filterable remote reserve-keyword placeholder="请输入" :remote-method="remoteMethodfond" :loading="searchLoading">
                            <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="searchBtn">
                        <el-button class="checkWay" @click="enterSearch">定位公司</el-button>
                    </el-form-item>
                    <!--<div class="">1234</div>-->
                </el-form>
            </div>
            <!--<div style="height:30px;background:red;margin-bottom:10px;"></div>-->
            <div class="searchCompany">
                <el-dropdown trigger="click" class="fileManagementElDropdown">
                    <span class="el-dropdown-link"><p>{{fondName}}</p><i class="el-icon-arrow-down el-icon--right elIconRight"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <div class="companytreeBox">
                            <el-dropdown-item>
                                <el-tree
                                        :data="fonddata"
                                        node-key="id"
                                        @node-click="NodeClick"
                                        :default-expand-all="false"
                                        :props="defaultProps"
                                        ref="Companytree"
                                >
                                </el-tree>
                            </el-dropdown-item>
                        </div>
                        <div class="ManageFondBox zebraTree">
                            <p class="ManageFondTitle">代管公司</p>
                            <el-tree
                                    :data="Containtree"
                                    node-key="id"
                                    :default-expand-all="true"
                                    :props="ContainfieldType"
                                    @node-click="ManageFondClick"
                            >
                            </el-tree>
                        </div>
                        <div class="closeDiv"><el-button class="checkWay" @click.native="ChoseOK">确定</el-button></div>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!--档案树-->
            <div class="zebraTree myzebraTree">
                <el-tree
                        :data="tree"
                        node-key="nodeName"
                        :default-expand-all="false"
                        :props="fieldType"
                        @node-click="pageType"
                        :renderContent = "renderContent"
                        :default-checked-keys="choosedRole"
                        ref="treeku"
                        accordion
                        show-checkbox
                        checkStrictly
                        :default-expanded-keys="expandedRole"
                        v-show="TreeSort"
                >
                </el-tree>
                <el-tree
                        :data="sortTree1"
                        :props="TreeSortType"
                        :renderContent = "renderContent"
                        ref="sortTree"
                        @node-click="sortclick1"
                        v-show="!TreeSort&&pageOne"
                >
                </el-tree>
                <el-tree
                        :data="sortTree2"
                        :props="TreeSortType"
                        :renderContent = "renderContent"
                        ref="sortTree"
                        @node-click="sortclick2"
                        v-show="!TreeSort&&pageTwo"
                >
                </el-tree>
                <el-tree
                        :data="sortTree3"
                        :props="TreeSortType"
                        :renderContent = "renderContent"
                        ref="sortTree"
                        @node-click="sortclick3"
                        v-show="!TreeSort&&pageThr"
                >
                </el-tree>
                <el-tree
                        :data="sortTree4"
                        :props="TreeSortType"
                        :renderContent = "renderContent"
                        ref="sortTree"
                        @node-click="sortclick4"
                        v-show="!TreeSort&&pagefor"
                >
                </el-tree>
            </div>
        </el-aside>
        <el-main v-show="MainShow">
            <!--列表头部-->
            <el-row class="rowOne mainBorrow">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-show="tab_control">
                    <el-tab-pane label="案卷列表" name="first">案卷列表</el-tab-pane>
                    <el-tab-pane label="未整理文件" name="second">未整理文件</el-tab-pane>
                    <el-tab-pane label="所有卷内文件" name="third">所有卷内文件</el-tab-pane>
                </el-tabs>
                <el-tabs v-model="activeName" type="card" v-show="!tab_control">
                    <el-tab-pane label="文件级档案" name="four">文件级档案</el-tab-pane>
                </el-tabs>
            </el-row>
            <!--搜索框-->
            <el-row class="rowTwo">
                <el-form :model="searchkeyOne" class="stagesupersearch" @submit.native.prevent v-show="activeName=='first'">
                    <el-form-item>
                        <el-input v-model="searchkeyOne.key" @keyup.enter.native="searchKey"></el-input>
                        <div class="rt">
                            <el-button class="indexWay" @click="searchKey" style="margin-left:15px;">检索</el-button>
                            <el-button class="indexWay" @click="clearSearch">清空</el-button>
                                                        <!--<el-button class="indexWay"  style="margin-left:15px;" @click="searchKey">检索</el-button>-->
                        </div>
                    </el-form-item>
                </el-form>
                <el-form :model="searchkeyTwo" class="stagesupersearch" @submit.native.prevent v-show="activeName=='second'">
                    <el-form-item>
                        <el-input v-model="searchkeyTwo.key" @keyup.enter.native="searchKey"></el-input>
                        <div class="rt">
                            <!--<el-button class="indexWay"  style="margin-left:15px;" @click="searchKey">检索</el-button>-->
                            <el-button class="indexWay" @click="searchKey" style="margin-left:15px;">检索</el-button>
                            <el-button class="indexWay" @click="clearSearch">清空</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <el-form :model="searchkeyThr" class="stagesupersearch" @submit.native.prevent v-show="activeName=='third'">
                    <el-form-item>
                        <el-input v-model="searchkeyThr.key" @keyup.enter.native="searchKey"></el-input>
                        <div class="rt">
                            <!--<el-button class="indexWay"  style="margin-left:15px;" @click="searchKey">检索</el-button>-->
                            <el-button class="indexWay" @click="searchKey" style="margin-left:15px;">检索</el-button>
                            <el-button class="indexWay" @click="clearSearch">清空</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <el-form :model="searchkeyfor" class="stagesupersearch" @submit.native.prevent v-show="activeName=='four'">
                    <el-form-item>
                        <el-input v-model="searchkeyfor.key" @keyup.enter.native="searchKey"></el-input>
                        <div class="rt">
                            <!--<el-button class="indexWay"  style="margin-left:15px;" @click="searchKey">检索</el-button>-->
                            <el-button class="indexWay" @click="searchKey" style="margin-left:15px;">检索</el-button>
                            <el-button class="indexWay" @click="clearSearch">清空</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <!--<el-form :model="searchform"  class="LIneFeedForm" v-show="activeName=='first'">-->
                <!--<template v-for="item in searchConfig">-->
                <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
                <!--<el-select v-model="searchform['value'+item.id]" >-->
                <!--<el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'" >-->
                <!--<el-input v-model.trim="searchform['value'+item.id]" @keyup.enter.native="searchKey"></el-input>-->
                <!--</el-form-item>-->
                <!--</template>-->
                <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="searchKey">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
                <!--</el-form>-->
                <!--<el-form :model="searchform1"  class="LIneFeedForm" v-show="activeName=='second'">-->
                <!--<template v-for="item in searchConfig1">-->
                <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
                <!--<el-select v-model="searchform1['value'+item.id]" >-->
                <!--<el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'">-->
                <!--<el-input v-model="searchform1['value'+item.id]"></el-input>-->
                <!--</el-form-item>-->
                <!--</template>-->
                <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="searchKey">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
                <!--</el-form>-->
                <!--<el-form :model="searchform2"  class="LIneFeedForm" v-show="activeName=='third'">-->
                <!--<template v-for="item in searchConfig2">-->
                <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
                <!--<el-select v-model="searchform2['value'+item.id]" >-->
                <!--<el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'">-->
                <!--<el-input v-model="searchform2['value'+item.id]"></el-input>-->
                <!--</el-form-item>-->
                <!--</template>-->
                <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="searchKey">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
                <!--</el-form>-->
                <!--<el-form :model="searchform3"  class="LIneFeedForm" v-show="activeName=='four'">-->
                <!--<template v-for="item in searchConfig3">-->
                <!--<el-form-item v-if="item.controlType==3" :label="item.caption+' :'">-->
                <!--<el-select v-model="searchform3['value'+item.id]" >-->
                <!--<el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item v-if="item.controlType==9"  :label="item.caption+' :'">-->
                <!--<el-input v-model="searchform3['value'+item.id]"></el-input>-->
                <!--</el-form-item>-->
                <!--</template>-->
                <!--<el-form-item class="buttonItem"> <el-button type="primary"  class="checkWay" @click="searchKey">检索</el-button><el-button class="checkWay" @click="clearSearch">清空</el-button></el-form-item>-->
                <!--</el-form>-->
            </el-row>
            <div class="tablePosition">
                <el-row class="rowThr">
                    <div class="adjustposition" v-show="fileList_show">
                        <el-button type="primary" class="checkWay" @click="positionUp"><i></i></el-button>
                        <el-button type="primary" class="checkWay" @click="positionDown"><i></i></el-button>
                    </div>
                    <div class="nthDivtwo" v-show="fileList_show">
                        <div style="width: 100px;float: right;line-height:30px;margin-left:5px" class="toolButton-one mybuttons" @click.stop="pull_down_menu=!pull_down_menu">=
                            <ul v-show="pull_down_menu">
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="addFileTrues">新增</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="BatchDelete">删除</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="shengchengDH">生成档号</el-button></li>
                                <!--<li class="buttonlis" v-if="tab_control"><el-button class="checkWay" type="primary" @click="pageToNum">页次转页数</el-button></li>-->
                                <!--<li class="buttonlis"><el-button class="checkWay" type="primary"  @click="GoadjustOrder">生成顺序号</el-button></li>-->
                                <li class="buttonlis"  v-if="tab_control"><el-button class="checkWay" type="primary" @click="UnmergeUrl">拆卷</el-button></li>
                                <li class="buttonlis"  v-if="tab_control"><el-button class="checkWay" type="primary" @click="Gocombinefile">合卷</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="modelPrint" >模板打印</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="rightBoxshow">批量修改</el-button></li>
                                <li class="buttonlis"  v-if="!tab_control"><el-button class="checkWay" type="primary" @click="ConcateFile(null)">批量挂接</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="toTransfer">文件移交</el-button></li>
                                <li class="buttonlis"  @click.stop="BoxmenuShow"><button type="primary" class="box_ul  mybuttons">
                                    数据管理
                                    <span class="spans">
                            </span>
                                </button></li>
                            </ul>
                            <ul v-if="box_ul_show">
                                <li @click="loadNumberModel">数据模板下载</li>
                                <li @click="importNumber">导入数据</li>
                                <li @click="exportNumber">导出数据</li>
                                <li @click="goCheck">档号筛查</li>
                                <li @click="NumTopage" v-show="tab_control">页数转页次</li>
                                <li @click="pageToNum" v-show="tab_control">页次转页数</li>
                            </ul>
                        </div>
                    </div>
                    <div class="nthDivthree" v-show="fileList_show">
                        <el-button type="primary" class="toolButtons checkWay" @click="BZPosition"><></el-button>
                        <el-button type="primary" class="toolButtons checkWay addButton" @click="addFileTrues">新增</el-button>
                        <el-button type="primary" class="toolButtons checkWay deleteButton" @click="BatchDelete">删除</el-button>
                        <el-button type="primary" class="toolButtons checkWay " @click="shengchengDH">生成档号</el-button>
                        <!--<el-button type="primary" class="toolButtons checkWay " @click="pageToNum" v-if="tab_control">页次转页数</el-button>-->
                        <!--<el-button type="primary" class="toolButtons checkWay" @click="GoadjustOrder">生成顺序号</el-button>-->
                        <el-button type="primary" class="toolButtons checkWay" @click="UnmergeUrl" v-if="tab_control">拆卷</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="Gocombinefile" v-if="tab_control">合卷</el-button>
                        <el-button type="primary" class="toolButtons checkWay"  @click="modelPrint">模板打印</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="rightBoxshow">批量修改</el-button>
                        <el-button type="primary" class="toolButtons checkWay" v-if="!tab_control"  @click="ConcateFile(null)">批量挂接</el-button>
                        <el-button type="primary" class="toolButtons checkWay"  @click="toTransfer">文件移交</el-button>
                        <div style="width: 85px;float: right;line-height:30px;margin-left:2px" class="NumberManage toolButtons mybuttons"  @click.stop="menuShow">
                            数据管理
                            <ul v-if="ul_show" >
                                <li @click="loadNumberModel">数据模板下载</li>
                                <li @click="importNumber">导入数据</li>
                                <li @click="exportNumber">导出数据</li>
                                <li @click="goCheck">档号筛查</li>
                                <li @click="NumTopage" v-show="tab_control">页数转页次</li>
                                <li @click="pageToNum" v-show="tab_control">页次转页数</li>
                            </ul>
                            <span class="span">
                            </span>
                        </div>
                    </div>
                    <div class="nthDivthree" v-show="juanwai_show">
                        <el-button type="primary" class="checkWay addButton" @click="GoaddFile">新增</el-button>
                        <el-button type="primary" class="checkWay deleteButton" @click="BatchDelete">删除</el-button>
                        <el-button type="primary" class="checkWay" @click="rightBoxshow">批量修改</el-button>
                        <span style="display: inline-block;position: relative;float: left;">
                        <div type="primary" class="NumberManage mybuttons" @click.stop="ZJshow" style="width: 50px;float: right;line-height:30px;position: static;margin:0 2px;">
                            组卷
                            <ul v-if="ul_show_two" style="top: 39px!important;right: 0!important;">
                                <li @click="combinenewfile">组新卷</li>
                                <li @click="combineExisting">组已有卷</li>
                                <li @click="AutoAssemble">自动组卷</li>
                            </ul>
                            <span class="ZJ">
                            </span>
                        </div>
                            </span>
                        <el-button type="primary" class="checkWay" @click="ConcateFile(0)">批量挂接</el-button>
                        <div style="width: 85px;float: right;line-height:30px;position: static;margin:0 2px;" class="NumberManage mybuttons" @click.stop="SJGLshow">
                            数据管理
                            <ul v-if="ul_show" >
                                <li @click="loadNumberModel">数据模板下载</li>
                                <li @click="importNumber">导入数据</li>
                                <li @click="exportNumber">导出数据</li>
                            </ul>
                            <span class="SJGL">
                            </span>
                        </div>
                    </div>
                    <div v-show="juannei_show" class="nthDivSix">
                        <el-button type="primary" class="checkWay" @click="rightBoxshow">批量修改</el-button>
                        <el-button type="primary" class="checkWay" @click="ConcateFile(null)">批量挂接</el-button>
                        <el-button type="primary" class="checkWay" @click="exportNumber">导出数据</el-button>
                    </div>
                </el-row>
                <!--档案表格-->
                <el-row v-show="fileListshow" class="fileList">
                    <el-col :span="24">
                        <el-table
                                :data="fileList"
                                style="width:100%"
                                ref="tableOne"
                                border
                                :stripe="true"
                                :height="tableHeight"
                                v-loading="isloading"
                                class="containTable indexTable lineTable"
                                @selection-change="selectionChange"
                                heighlight-current-row
                                @row-dblclick="RowDblclick"                                
                                @sort-change="headerclick"
                                :row-class-name="getRowClass">
                            <el-table-column type="selection" width="45" ></el-table-column>
                            <el-table-column width="90" fixed label="操作">
                                <template slot-scope="scope">
                                    <!--<el-button-->
                                    <!--size="mini"-->
                                    <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="handleDelete(scope.$index, scope.row)">卷内文件</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="Serial" label="序号"></el-table-column>
                            <template v-for="item in tableHeader">
                                <!--<el-table-column v-if="item.fieldName=='ARCHIVE_STATUS'"  :width="item.width" :label="item.caption" :key="item.fieldName">-->
                                <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.ARCHIVE_STATUS===0"></span>-->
                                <!--<span v-if="scope.row.ARCHIVE_STATUS===1"><i class="fa fa-file-archive-o" title="文件移交中"></i></span>-->
                                <!--<span v-if="scope.row.ARCHIVE_STATUS===2"><i class="fa fa-file-pdf-o" title="跨全宗移交中"></i></span>-->
                                <!--</template>-->
                                <!--</el-table-column>-->
                                <el-table-column v-if="!item.hidden&&item.fieldName!='BZ'&&item.fieldName!='BZ1'"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable" ></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ'&&!headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ1'&&headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                            </template>
                        </el-table>
                    </el-col>
                </el-row>
                <!--卷外文件列表-->
                <el-row v-show="juanwai_show" class="fileList">
                    <el-col :span="24">
                        <el-table
                                :data="juanwaiArr"
                                style="width:100%"
                                :stripe="true"
                                tooltip-effect="dark"
                                v-loading="isloading1"
                                :height="tableHeight"
                                class="containTable indexTable lineTable"
                                @selection-change="selectionChange1"
                                ref="tableTwo"
                                @row-dblclick="RowDblclick"
                                @sort-change="headerclick2"
                                border>
                            <el-table-column type="selection" width="55" label="#" ></el-table-column>
                            <el-table-column prop="Serial" label="序号"></el-table-column>
                            <!--<el-table-column width="70" label="操作" fixed>-->
                            <!--<template slot-scope="scope">-->
                            <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <template v-for="item in tableHeader_two">
                                <el-table-column v-if="item.fieldName!='HOUSETYPE'&&!item.hidden"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="item.fieldName=='HOUSETYPE'&&!item.hidden"  :width="item.width" :label="item.caption" :key="item.sortSeq" :sortable="sortable">
                                    <template slot-scope="scope">
                                        <span  class="superTarget"  v-if="Number(scope.row.HOUSETYPE)===2&&!item.hidden" @click="fileDetails(scope.row)">{{scope.row.HOUSETYPE_Text}}</span>
                                        <span  v-else>{{scope.row.HOUSETYPE_Text}}</span>
                                    </template>
                                </el-table-column>
                            </template>
                        </el-table>
                    </el-col>
                </el-row>
                <!--卷内文件列表-->
                <el-row v-show="juannei_show" class="fileList">
                    <el-col :span="24">
                        <el-table
                                :data="juanneiArr"
                                style="width:100%"
                                :stripe="true"
                                tooltip-effect="dark"
                                v-loading="isloading2"
                                :height="tableHeight"
                                class="containTable indexTable lineTable"
                                @selection-change="selectionChange2"
                                ref="tableThre"
                                @row-dblclick="RowDblclick"
                                @sort-change="headerclick3"
                                border>
                            <el-table-column type="selection" width="55" label="#" ></el-table-column>
                            <el-table-column prop="Serial" label="序号"></el-table-column>
                            <!--<el-table-column width="70" label="操作" fixed>-->
                            <!--<template slot-scope="scope">-->
                            <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <template v-for="item in tableHeader_thr">
                                <el-table-column v-if="item.fieldName!='HOUSETYPE'&&!item.hidden" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="item.fieldName=='HOUSETYPE'"  :width="item.width" :label="item.caption" :key="item.sortSeq" :sortable="sortable">
                                    <template slot-scope="scope">
                                        <span  class="superTarget"  v-if="Number(scope.row.HOUSETYPE)===2&&!item.hidden" @click="fileDetails(scope.row)">{{scope.row.HOUSETYPE_Text}}</span>
                                        <span  v-else>{{scope.row.HOUSETYPE_Text}}</span>
                                    </template>
                                </el-table-column>
                            </template>
                        </el-table>
                    </el-col>
                </el-row>
                <!--文件级档案列表-->
                <el-row v-show="!tab_control" class="fileList">
                    <el-col :span="24">
                        <el-table
                                :data="wenjianArr"
                                style="width:100%"
                                :stripe="true"
                                tooltip-effect="dark"
                                v-loading="isloading3"
                                :height="tableHeight"
                                class="containTable indexTable lineTable"
                                @selection-change="selectionChange3"
                                ref="tableFor"
                                @row-dblclick="RowDblclick"
                                border
                                @sort-change="headerclick4"
                                :row-class-name="getRowClass">
                            <el-table-column type="selection" width="55" label="#" ></el-table-column>
                            <el-table-column prop="Serial" label="序号"></el-table-column>
                            <!--<el-table-column width="70" label="操作" fixed>-->
                            <!--<template slot-scope="scope">-->
                            <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <template v-for="item in tableHeader_for">
                                <el-table-column v-if="item.fieldName!='BZ1'&&item.fieldName!='HOUSETYPE'&&!item.hidden&&item.fieldName!='BZ'"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="item.fieldName=='HOUSETYPE'"  :width="item.width" :label="item.caption" :key="item.sortSeq" :sortable="sortable">
                                    <template slot-scope="scope">
                                        <span  class="superTarget"  v-if="Number(scope.row.HOUSETYPE)===2" @click="fileDetails(scope.row)">{{scope.row.HOUSETYPE_Text}}</span>
                                        <span  v-else>{{scope.row.HOUSETYPE_Text}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column v-if="item.fieldName=='BZ1'&&!item.hidden&&headWBz"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :wideth="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="item.fieldName=='BZ'&&!item.hidden&&!headWBz"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <!--<el-table-column v-if="item.fieldName=='ARCHIVE_STATUS'"  :width="item.width" :label="item.caption" :key="item.fieldName">-->
                                <!--<template slot-scope="scope">-->
                                <!--<span v-if="scope.row.ARCHIVE_STATUS===0"></span>-->
                                <!--<span v-if="scope.row.ARCHIVE_STATUS===1"><i class="fa fa-file-archive-o" title="文件移交中"></i></span>-->
                                <!--<span v-if="scope.row.ARCHIVE_STATUS===2"><i class="fa fa-file-pdf-o" title="跨全宗移交中"></i></span>-->
                                <!--</template>-->
                                <!--</el-table-column>-->
                            </template>
                        </el-table>
                    </el-col>
                </el-row>
                <div class="pager">
                    分组查看:
                    <el-select v-model="TypeChangeValue1" placeholder="请选择" @change="TypeChange1" v-if="pageOne">
                        <template v-for="son in sortarr1">
                            <el-option :label="son.caption" :value="son.fieldName" :key="son.fieldName"></el-option>
                        </template>
                    </el-select>
                    <el-select v-model="TypeChangeValue2" placeholder="请选择" @change="TypeChange2" v-if="pageTwo">
                        <template v-for="son in sortarr2">
                            <el-option :label="son.caption" :value="son.fieldName" :key="son.fieldName"></el-option>
                        </template>
                    </el-select>
                    <el-select v-model="TypeChangeValue3" placeholder="请选择" @change="TypeChange3" v-if="pageThr">
                        <template v-for="son in sortarr3">
                            <el-option :label="son.caption" :value="son.fieldName" :key="son.fieldName"></el-option>
                        </template>
                    </el-select>
                    <el-select v-model="TypeChangeValue4" placeholder="请选择" @change="TypeChange4" v-if="pagefor">
                        <template v-for="son in sortarr4">
                            <el-option :label="son.caption" :value="son.fieldName" :key="son.fieldName"></el-option>
                        </template>
                    </el-select>
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[500,800,1000]" :page-size="limit" :total="total"   :current-page="page"  :pager-count="5"  v-if="pageOne"></el-pagination>
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-sizes="[500,800,1000]" :page-size="limit1" :total="total1"  :current-page="page1" :pager-count="5"  v-if="pageTwo"></el-pagination>
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :page-sizes="[500,800,1000]" :page-size="limit2" :total="total2"  :current-page="page2" :pager-count="5" v-if="pageThr"></el-pagination>
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :page-sizes="[500,800,1000]" :page-size="limit3" :total="total3"  :current-page="page3" :pager-count="5" v-if="pagefor"></el-pagination>
                </div>
            </div>
        </el-main>
        <!--批量修改-->
        <el-dialog title="批量修改" :visible.sync="repalceMany" class="myDialog" :close-on-click-modal="false" :modal-append-to-body="false">
            <el-container>
                <el-row class="poptabs rightCenter Manyamend">
                    <el-col>
                        <el-tabs v-model="activenames" type="card" @tab-click="AmendTabClick">
                            <el-tab-pane label="按内容替换" name="one">
                                <el-form :model="form" label-width="120px">
                                    <el-form-item label="著录项 : ">
                                        <el-select v-model="form.region" class="longInput" @change="elSelectChange">
                                            <el-option v-for='ind in formArr' :label="ind.caption" :value="ind.fieldName" :key="ind.fieldName" v-if="ind?ind.type!=3:true"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="要替换的值 :">
                                        <el-input v-model.trim="form.replaceValue" class="longInput" v-if="ElSelectTrue||form.region=='XMBH'||form.region=='XMMCNEW'"></el-input>
                                        <el-select v-model="form.replaceValue" class="longInput" v-if="!ElSelectTrue&&form.region!='XMBH'&&form.region!='XMMCNEW'">
                                            <el-option v-for='ind in formSelectArr' :label="ind.text" :value="ind.code" :key="ind.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="替换为 :">
                                        <el-input v-model.trim="form.replaceTo" class="longInput" v-if="ElSelectTrue"></el-input>
                                        <el-select v-model="form.replaceTo" filterable  class="longInput" v-if="!ElSelectTrue">
                                            <el-option v-for='item in formSelectArr' :label="item.text" :value="item.code" :key="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="按位置替换" name="two">
                                <el-form :model="Addrform" label-width="120px">
                                    <el-form-item label="著录项 :">
                                        <el-select v-model="Addrform.region" placeholder="请选择" class="longInput">
                                            <el-option v-for="item in addArr" :label="item.caption" :value="item.fieldName" :key="item.fieldName" v-if="item?item.type!=3:true"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="要替换的字符位置 :" class="shortInput">
                                        <el-input v-model.trim="Addrform.startNumber"></el-input>
                                        至
                                        <el-input v-model.trim="Addrform.endNumber"></el-input>
                                    </el-form-item>
                                    <el-form-item label="替换为 :">
                                        <el-input v-model.trim="Addrform.replaceTo" class="longInput"></el-input>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="合并著录项" name="three">
                                <el-form :model="combineform" label-width="120px">
                                    <el-form-item label="著录项A :">
                                        <el-select v-model="combineform.itemA" placeholder="请选择" class="longInput">
                                            <el-option v-for='item in formArr' :label="item.caption" :value="item.fieldName" :key="item.fieldName"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="连接符 :">
                                        <el-input v-model.trim="combineform.connectSign" class="longInput"></el-input>
                                    </el-form-item>
                                    <el-form-item label="著录项B :">
                                        <el-select v-model="combineform.itemB" placeholder="请选择" class="longInput">
                                            <el-option v-for='item in formArr' :label="item.caption" :value="item.fieldName" :key="item.fieldName"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="合并到著录项 :">
                                        <el-select v-model="combineform.concatTo" placeholder="请选择" class="longInput">
                                            <el-option v-for='item in formArr' :label="item.caption" :value="item.fieldName" :key="item.fieldName" v-if="item?item.type!=3:true"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </el-container>
            <div slot="footer" class="dialog-footer"><el-button class="checkWay" @click="SaveReplace">保存</el-button></div>
        </el-dialog >
        <el-dialog :title="redactFile?'编辑案卷':'新增案卷'" :visible.sync="addFileTrue" class="myDialog dragDialog" :close-on-click-modal="false" :modal="false" :lock-scroll="false" :modal-append-to-body="false">
            <el-form  class="addfile" :model="addfile" label-width="152px" ref="addfile">
                <template v-for="item in addArray">
                    <el-form-item  :label="item.caption+' :'" v-if="item.editControl==1">
                        <el-button class="checkWay">{{item.caption}}</el-button>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.editControl==2&&item.fieldName!='XMBH'&&item.fieldName!='XMMCNEW'&&item.fieldName!='QZH'&&item.fieldName!='FLH'&&item.fieldName!='WJRQ'&&item.fieldName!='AJH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                        <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" @change="(Val)=>{addfile[item.fieldName]=Val}"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='AJH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:AJHvalidator,trigger:'change'}]">
                        <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength" placeholder="正确格式:1或1-1"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:myvalidator,trigger:'blur'}]">
                        <el-input  :readonly="!item.allowEdit" v-model.number="addfile[item.fieldName]" type="number" :maxlength="item.maxLength" @past="()=>{return false;}" min="0" step="1"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <el-select :readonly="!item.allowEdit" v-model="addfile[item.fieldName]">
                            <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="!item.allowEdit">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='FLH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <!--<el-select  v-model="addfile[item.fieldName]">-->
                        <!--<el-option v-for="ind in FLhArr" :label="ind.categoryNumberText" :value="ind.categoryNumber" :key="ind.categoryNumber" :disabled="!item.allowEdit">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <el-input :readonly="true" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-show="false"></el-input>
                        <el-input :readonly="true" v-model="flhName"   :maxlength="item.maxLength" @focus="SelectFlh(item.allowEdit)"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                        <el-input :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.editControl==10" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                        <el-date-picker :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"  value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='WJRQ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:timevalidator,trigger:'blur'}]">
                        <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='XMBH'||item.fieldName=='XMMCNEW'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:isProjectCompany?'change':'blur'}]">
                        <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!isProjectCompany"></el-input>
                        <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMBH'">
                            <el-option v-for="ind in projectCodearr" :key="ind.id" :label="ind.projectCode" :value="ind.projectCode" @click.native="projectCodechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                        </el-select>
                        <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMMCNEW'">
                            <el-option v-for="ind in projectNamearr" :key="ind.id" :label="ind.projectName" :value="ind.projectName"  @click.native="projectNamechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='QZH'&&!ISJT" prop="QZH" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <el-select v-model="addfile[item.fieldName]" filterable>
                            <el-option v-for="ind in QZHArr" :key="ind.value" :label="ind.value" :value="ind.value" :disabled="!item.allowEdit"></el-option>
                        </el-select>
                        <!--<el-select v-model="addfile[item.fieldName]"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" v-if="ISJT">-->
                        <!--<el-option v-for="item in JTarr" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                        <!--</el-select>-->
                    </el-form-item>
                    <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='QZH'&&ISJT" prop="QZH" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <!--<el-select v-model="addfile[item.fieldName]" filterable v-if="!ISJT">-->
                        <!--<el-option v-for="ind in QZHArr" :key="ind.value" :label="ind.value" :value="ind.value" :disabled="!item.allowEdit"></el-option>-->
                        <!--</el-select>-->
                        <el-select v-model="addfile[item.fieldName]"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod">
                            <el-option v-for="ind in JTarr" :key="ind.value" :label="ind.label" :value="ind.value" :disabled="!item.allowEdit"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer" v-show="!redactFile"><el-button class="checkWay" @click="keepAdd('addfile')">保存并添加</el-button><el-button class="checkWay" @click="keepAddTwo('addfile')">保存</el-button></div>
            <div slot="footer" class="dialog-footer" v-show="redactFile"><div><el-button class="checkWay" @click="proOne">上一条</el-button><el-button class="checkWay" @click="nextOne">下一条</el-button></div><div><el-button class="checkWay" @click="Editcommit('addfile')">保存</el-button></div></div>
        </el-dialog>
        <el-dialog title="数据导出" :visible.sync="exportNumTrue" class="myDialog" :close-on-click-modal="false" :modal-append-to-body="false">
            <el-row>
                <div class="exportrong">
                    选择导出范围
                </div>
                <div class="exportType">
                    <el-radio v-model="exportrong" label="1">所选数据</el-radio>
                    <el-radio v-model="exportrong" label="2">全部数据</el-radio>
                </div>
            </el-row>
            <el-row v-if="activeName=='first'">
                <div class="exportrong">
                    选择导出内容
                </div>
                <div class="exportType">
                    <el-radio v-model="exportcontent" label="1">案卷</el-radio>
                    <el-radio v-model="exportcontent" label="2">案卷及卷内</el-radio>
                </div>
            </el-row>
            <el-row v-if="activeName=='third'">
                <div class="exportrong">
                    选择导出内容
                </div>
                <div class="exportType">
                    <el-radio v-model="exportcontent" label="5">卷内</el-radio>
                </div>
            </el-row>
            <el-row v-if="activeName=='second'">
                <div class="exportrong">
                    选择导出内容
                </div>
                <div class="exportType">
                    <el-radio v-model="exportcontent" label="4">未整理</el-radio>
                </div>
            </el-row>
            <el-row v-if="activeName=='four'">
                <div class="exportrong">
                    选择导出内容
                </div>
                <div class="exportType">
                    <el-radio v-model="exportcontent" label="4">文件</el-radio>
                </div>
            </el-row>
            <el-row>
                <div class="exportrong">
                    选择导出形式
                </div>
                <div class="exportType">
                    <el-radio v-model="exportStyle" label="1">目录</el-radio>
                    <el-radio v-model="exportStyle" label="2" :disabled="exportcontent=='1'">目录及原文</el-radio>
                </div>
            </el-row>
            <el-row>
                <div class="exportrong">
                    选择导出类型
                </div>
                <div class="exportType">
                    <el-radio v-model="ExportType" label="xls">xls</el-radio>
                    <el-radio v-model="ExportType" label="xlsx">xlsx</el-radio>
                </div>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="confirmExport">确定导出</el-button>
            </div>
        </el-dialog>
        <!--选择数据模板-->
        <el-dialog class="fileModal NumberModel" :visible.sync="NumberModelTrue" title="数据模板下载" :close-on-click-modal="false" :modal-append-to-body="false">
            <el-radio v-model="checkNumberModel" label="xls">xls</el-radio>
            <el-radio v-model="checkNumberModel" label="xlsx">xlsx</el-radio>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="LoadingNumberModelOne">取 消</el-button>
                <el-button class="checkWay" @click="LoadingNumberModelTwo">确 定</el-button>
            </div>
        </el-dialog>
        <!--导入数据选择文件-->
        <el-dialog class="ChoseFile importNumber" :visible.sync="commitDialogTrue" title="导入数据" :close-on-click-modal="false" :modal-append-to-body="false">
            <div class="fileBox">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        :before-upload="BeforeUpload"
                        action=""
                        :limit="limitNumber"
                        accept="xls,xlsx"
                        :file-list="UpLoadfileList"
                        :on-remove="uploadOnRemove"
                        :on-change="excelChange"
                        :on-exceed="Onexceed"
                        :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">请选择你要导入的Excel文件</div>
                    <div style="float:right" v-show="sheetNumberTrue">
                        <p style="margin-bottom:10px">请选择要上传的sheet表</p>
                        <el-select v-model="sheetSelc" placeholder="请选择">
                            <el-option
                                    v-for="item in sheetAll"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </el-upload>
                <div>
                    <span>上传版本 :</span>
                    <el-radio v-model="checkNumberModels" label="xls">xls</el-radio>
                    <el-radio v-model="checkNumberModels" label="xlsx">xlsx</el-radio>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="ConcelCommitNumber">取 消</el-button>
                <el-button class="checkWay" @click="ConfirmCommitNumber">上 传</el-button>
                <!--<el-button class="checkWay" @click="Confirmsheet" v-show="sheetNumberTrue">确 定</el-button>-->
            </div>
        </el-dialog>
        <!--批量挂接-->
        <el-dialog class="ConcateFile" :visible.sync="ConcateVisible" title="批量挂接" :modal-append-to-body="false">
            <div class="selectPan">
                <span>选择挂接规则：</span>
                <!--<el-select v-model="ConcateType">
                    <el-option label="文件标题" :value="ConcateObj.title"></el-option>
                    <el-option label="文件标题+顺序号" :value="ConcateObj.titleNum"></el-option>
                </el-select>-->
                <el-select class="checkName" v-model="ConcateType" placeholder="请选择" @change = "changeType">
                    <el-option v-for="item in ConcateObj" :key="item.id" :label="item.ruleName" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <p style="font-size:12px;color:red;">备注说明：{{commit}}</p>
            <!--<p>选择云盘目录 :</p>-->
            <div class="ConcateTree">
                <div class="ConcateTreeTop" style="overflow-y: auto;">
                    <el-tree
                            :load="loadNode"
                            node-key="id"
                            lazy
                            :props="YPdefaultProps"
                            :expand-on-click-node="false"
                            @node-click = "setDataToTrees"
                    >
                    </el-tree>
                </div>
                <div class="ConcateTreeDown" style="overflow-y: auto;">
                    <div v-if="existFile&&!matchedCount" style="padding:10px;">
                        所选云盘共 <span style="font-size:15px;color:green;">{{dec}}</span> 份原文,请先匹配原文
                        <el-button class="checkWay rt" @click="checkOldFiles">匹配原文</el-button>
                    </div>
                    <div v-if="!existFile" style="padding:10px;">
                        所选云盘暂无原文，请先上传原文
                        <el-button class="checkWay rt" @click="fileUpBook">上传原文</el-button>
                    </div>
                    <div v-if="existFile&&matchedCount"  style="padding:10px;">
                        匹配成功 <span style="font-size:15px;color:green;">{{matchedCount}}</span> 条数据,可以开始挂接
                        <el-button class="checkWay rt" @click="checkOldFiles">匹配原文</el-button>
                    </div>
                    <div  style="padding:10px;" v-if="errorMacth&&errorMacth.length>0">
                        <div class="borderTable">
                            <el-table style="width: 100%" stripe :height="mathHeight" :data="errorMacth" highlight-current-row class="indexTable containTable">
                                <el-table-column prop="cloudFileName" label="文件名称" >
                                </el-table-column>
                                <el-table-column prop="matchCount" label="数量" >
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="beginCF">开始挂接</el-button>
            </div>
        </el-dialog>
        <!--自动组卷-->
        <el-dialog class="fileModal NumberModel" :visible.sync="AutoMergerVisible" title="自动组卷范围" :close-on-click-modal="false" :modal-append-to-body="false">
            <el-radio v-model="AssembleRuond" label="1">所选数据</el-radio>
            <el-radio v-model="AssembleRuond" label="2">全部数据</el-radio>
            <p style="line-height:0px;color: red;font-size:12px;">自动组卷规则:卷内文件的档号，以案卷的档号开头</p>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="AutoAssembleCancel">取 消</el-button>
                <el-button class="checkWay" @click="AutoAssembleConfire">确 定</el-button>
            </div>
        </el-dialog>
        <!---->
        <el-dialog class="fileModal flhdialog" :visible.sync="FlhTrue" title="分类号" :close-on-click-modal="false" :lock-scroll="false" :modal="false" :modal-append-to-body="false">
            <el-tree
                    :data="FLhArr"
                    node-key="categoryNumber"
                    :default-expand-all="false"
                    :props="flhType"
                    @node-click="flhclick"
                    :renderContent = "renderContent"
                    ref="treeku"
                    accordion
            >
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button class="checkWay" @click="FlhTrue=false">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>

</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import HttpRequest from '@/api/request';
    import Service from './fileManagement.service';
    import { Loading } from 'element-ui';
    import XLSX from 'xlsx';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class appfileManagement extends Vue {
        sortable:string='custom';
        Url: string;
        mathHeight: number;
        fonddata:any=[];
        fondNameQiao: string;
        fondName: string;
        aside_show: boolean;
        // main_show:boolean;
        tab_control: boolean;
        inFile_one: boolean;
        inFile_two: boolean;
        inFile_three: boolean;//控制卷内文件头部
        key_word: string;
        ul_show: boolean;
        ul_show_two: boolean;
        box_ul_show: boolean;
        expanded_CompanyTree: any = [];
        treesId: number;
        searcharr: any = [];//搜索配置表单
        anJuanId: any;
        // expandedArr:any=[];
        // hasChild:boolean;
        pull_down_menu: boolean;
        activeName: string;
        // Children_id:number;
        rankId_one: number;
        rankId_two: number;
        rankId_thr: number;
        riGuajie: boolean;
        kinId: number;
        parentIdQiao: number;
        parentId: number;
        start: number;
        total: number;
        page: number;
        limit: number;
        start1: number;
        total1: number;
        page1: number;
        limit1: number;
        start2: number;
        total2: number;
        page2: number;
        limit2: number;
        start3: number;
        total3: number;
        page3: number;
        limit3: number;
        // tree_show:boolean;
        CheckAfter: boolean;
        company: any = {};
        tree: any = [];
        Companytree: any = [];
        defaultProps: any = {};
        YPdefaultProps: any = {};
        fieldType: any = {};
        ContainfieldType: any = {};
        fileList: any = [];
        fileList_show: boolean;
        fileListshow: boolean;
        juanwaiArr: any = [];
        juanwai_show: boolean;
        juanneiArr: any = [];
        juannei_show: boolean;
        wenjianArr: any = [];
        tableHeader: any = [];
        tableHeader_two: any = [];
        tableHeader_thr: any = [];
        tableHeader_for: any = [];
        isloading: boolean;
        isloading1: boolean;
        isloading2: boolean;
        isloading3: boolean;
        tableHeaderArr: any = [];
        repalceMany: boolean;
        activenames: string;
        form: any = {};
        formArr: any = [];
        Addrform: any = {};
        addArr: any = [];
        combineform: any = {};
        combineArr: any = [];
        combinefile: boolean;
        addfile: any = {};
        searchform: any = {};
        searchform1: any = {};
        searchform2: any = {};
        searchform3: any = {};
        tableHeight: number;
        exportNumTrue: boolean;
        exportrong: string;
        // selectType:string;
        exportcontent: string;
        exportStyle: string;
        ExportType: string;
        addFileTrue: boolean;//新增
        redactFile: boolean;//编辑案卷
        addArray: any = [];
        fondCodeQiao: string;
        fondCode: string;//当前全宗号
        EditArr: any = {};//编辑案卷数据
        OrderNum: number;//上一条，下一条
        selection: any = [];//被选中的项
        selection1: any = [];//被选中的项
        selection2: any = [];//被选中的项
        selection3: any = [];//被选中的项
        searchConfig: any = [];//搜索框的配置
        searchConfig1: any = [];//搜索框的配置
        searchConfig2: any = [];//搜索框的配置
        searchConfig3: any = [];//搜索框的配置
        searchContent: any = [];//要搜索的内容
        searchContent1: any = [];//要搜索的内容
        searchContent2: any = [];//要搜索的内容
        searchContent3: any = [];//要搜索的内容
        clickOne: boolean;//未整理文件第一点击
        clickTwo: boolean;//所有卷内文件第一次点击
        pageOne: boolean;//分页显隐
        pageTwo: boolean;//分页显隐
        pageThr: boolean;//分页显隐
        pagefor: boolean;//分页显隐
        NumberModelTrue: boolean;//数据模板
        checkNumberModel: string;//数据模板选中项
        checkNumberModels: string;//数据模板选中项
        Containtree: any = [];//树内部的树
        commitDialogTrue: boolean;//控制上传数据
        commit: String = '';
        ElSelectTrue: boolean;//控制按内容替换的输入项的显隐
        formSelectArr: any = [];//按内容替换的下拉列表
        errorMacth: any = [];//挂接文件列表
        // filters:{};
        ConcateVisible: boolean;//批量挂接显隐变换
        ConcateObj: any = {};//挂接类型选择
        ConcateType: string;//挂接类型
        limitNumber: number;//上传文件的个数控制
        choosedRole: any = [];//默认选中的节点
        autoMatchParams: any = {}; //自动匹配的参数
        dec: string;  //批量挂接的描述
        existFile: boolean; // 批量挂接树下文件夹是否有文件
        formdata: any;
        taskId: number;//开始挂接ID
        matchedCount: number;//挂接文件的个数
        isProjectCompany: boolean;
        isProjectCompanyQiao: boolean;
        projectCodearr: any = [];
        projectNamearr: any = [];
        storeName: string;
        AutoMergerVisible: boolean;
        AssembleRuond: string;
        QZHArr: any = [];
        MainShow: boolean;
        storeArr: any = [];
        loadingInstance: any;
        FLhArr: any = [];
        TypeChangeValue1: any;
        TypeChangeValue2: any;
        TypeChangeValue3: any;
        TypeChangeValue4: any;
        ISJT: boolean;
        JTarr: any = [];
        expandedRole: any = [];
        // sort1: boolean;
        // sort2: boolean;
        // sort3: boolean;
        // sort4: boolean;
        sortarr1: any = [];
        sortarr2: any = [];
        sortarr3: any = [];
        sortarr4: any = [];
        sortTree1: any = [];
        sortTree2: any = [];
        sortTree3: any = [];
        sortTree4: any = [];
        TreeSort: boolean;
        TreeSortType: any = {};
        sortName1:string;
        sortName2:string;
        sortName3:string;
        sortName4:string;
        FlhTrue:boolean;
        flhType:any={};
        flhName:any;
        flhValue:any;
        exchangeSeqUp:boolean;
        exchangeSeqDow:boolean;
        searchkeyOne:any={};
        searchkeyTwo:any={};
        searchkeyThr:any={};
        searchkeyfor:any={};
        searchValue:any;
        searchValue1:any;
        searchValue2:any;
        searchValue3:any;
        headBz:boolean;
        headWBz:boolean;
        treeFilters:any={};
        searchOptions:any=[];
        searchLoading:boolean;
        sheetNumberTrue:boolean;
        sheetAll:any=[];
        sheetSelc:number;
        UpLoadfileList:any=[];
        sortStr1:string;
        sortStr2:string;
        sortStr3:string;
        sortStr4:string;
        sortSort1:string;
        sortSort2:string;
        sortSort3:string;
        sortSort4:string;
        clickTime:any;
        clickId:number;
        constructor() {
            super();
            this.mathHeight = (document.documentElement.clientHeight - 152) / 2 - 60;
            this.Url = HttpRequest['URLS'];
            this.fonddata=[];
            this.fondNameQiao = '';
            this.anJuanId = null;
            this.fondName = "";
            this.aside_show = true;
            // this.main_show=false;
            this.tab_control = true;
            this.inFile_one = true;
            this.inFile_two = false;
            this.inFile_three = false;
            this.key_word = "";
            this.ul_show = false;
            this.ul_show_two = false;
            this.box_ul_show = false;
            this.pull_down_menu = false;
            this.activeName = "first";
            this.searcharr = [];
            //this.Children_id=null;
            //分页
            this.total = 0;
            this.taskId = null;
            this.matchedCount = null;
            this.errorMacth = [];
            this.page = 1;
            this.limit = 500;
            this.total1 = 0;
            this.page1 = 1;
            this.limit1 = 500;
            this.total2 = 0;
            this.page2 = 1;
            this.limit2 = 500;
            this.total3 = 0;
            this.page3 = 1;
            this.limit3 = 500;
            this.treesId = -1;
            // this.tree_show=false;
            this.CheckAfter = false;
            this.riGuajie = true;
            this.company = "";
            // this.defaultProps = {
            //       children: 'children',
            //          label: 'fondName'
            //   };
            this.defaultProps = {
                label: 'fondName',
                children: 'children'
            };
            this.YPdefaultProps = {
                isLeaf: 'hasChildren',
                label: 'name',
                id: 'id'
            };
            this.fieldType = {
                children: "children",
                label: "nodeName"
            };
            this.ContainfieldType = {
                label: "fondName"
            }
            this.tableHeader = [];
            this.tableHeader_two = [];
            this.tableHeader_thr = [];
            this.tableHeader_for = [];
            this.fileList = [];
            this.fileList_show = true;
            this.fileListshow = true;
            this.juanwaiArr = [];
            this.juanwai_show = false;
            this.juanneiArr = [];
            this.juannei_show = false;
            this.wenjianArr = [];
            this.isloading = false;
            this.isloading1 = false;
            this.isloading2 = false;
            this.isloading3 = false;
            this.tableHeaderArr = [];
            this.repalceMany = false;
            this.activenames = "one";
            this.form = {
                region: null,
                replaceValue: null,
                replaceTo: ''
            };
            this.formArr = [];
            this.Addrform = {
                region: null,
                startNumber: null,
                endNumber: null,
                replaceTo: ''
            };
            this.addArr = [];
            this.combineform = {
                itemA: null,
                connectSign: null,
                itemB: null,
                concatTo: null
            };
            this.combineArr = [];
            this.combinefile = false;
            this.addfile = {};
            this.searchform = {};
            this.searchform1 = {};
            this.searchform2 = {};
            this.tableHeight = document.documentElement.clientHeight-297;
            this.exportNumTrue = false;
            this.exportrong = "1";
            // this.selectType="1";
            this.exportcontent = "1";
            this.exportStyle = "1";
            this.ExportType = 'xls';
            this.addFileTrue = false;
            this.redactFile = false;
            this.addArray = [];
            this.fondCode = "";
            this.fondCodeQiao = "";
            this.selection = [];
            this.selection1 = [];
            this.selection2 = [];
            this.selection3 = [];
            this.searchConfig = [];
            this.searchConfig1 = [];
            this.searchConfig2 = [];
            this.searchContent = [];
            this.searchContent1 = [];
            this.searchContent2 = [];
            this.searchContent3 = [];
            this.clickOne = true;
            this.clickTwo = true;
            this.pageOne = true;
            this.pageTwo = false;
            this.pageThr = false;
            this.pagefor = false;
            this.NumberModelTrue = false;
            this.checkNumberModel = 'xls';
            this.checkNumberModels = 'xls';
            this.Containtree = [];
            this.commitDialogTrue = false;
            this.ElSelectTrue = true;
            this.formSelectArr = [];
            this.ConcateVisible = false;
            this.ConcateObj = {
//            title:1,
//            titleNum:2
            };
            this.ConcateType = '';
            this.limitNumber = 1;
            this.choosedRole = [];
            this.projectCodearr = [];
            this.projectNamearr = [];
            this.dec = ''; // 批量挂接的描述
            this.existFile = false;
            this.autoMatchParams = {
                "wenJianLibId": '',
                "anJuanId": '',
                "fondId": '',
                "cloudDirectoryId": '',
                "matchRuleId": ''
            };
            this.AutoMergerVisible = false;
            this.AssembleRuond = '1';
            this.QZHArr = [];
            this.MainShow = false;
            this.storeArr = [];
            this.FLhArr = [];
            this.JTarr = [];
            this.kinId = null;
            this.storeName = null;
            this.expandedRole = [];
            // this.sort1 = true;
            // this.sort2 = true;
            // this.sort3 = true;
            // this.sort4 = true;
            this.sortarr1 = [];
            this.sortarr2 = [];
            this.sortarr3 = [];
            this.sortarr4 = [];
            this.TypeChangeValue1 = null;
            this.TypeChangeValue2 = null;
            this.TypeChangeValue3 = null;
            this.TypeChangeValue4 = null;
            this.TreeSort = true;
            this.sortTree1 = [];
            this.sortTree2 = [];
            this.sortTree3 = [];
            this.sortTree4 = [];
            this.TreeSortType = {
                label: "text"
            };
            this.parentId = null;
            this.sortName1 = null;
            this.sortName2 = null;
            this.sortName3 = null;
            this.sortName4 = null;
            this.FlhTrue = false;
            this.flhType = {
                children: "children",
                label: "categoryNumberText"
            };
            this.flhName=null;
            this.flhValue=null;
            this.exchangeSeqUp = true;
            this.exchangeSeqDow = true;
            this.searchkeyOne = {
                key:null
            };
            this.searchkeyTwo = {
                key:null
            };
            this.searchkeyThr = {
                key:null
            };
            this.searchkeyfor = {
                key:null
            };
            this.searchValue = null;
            this.searchValue1 = null;
            this.searchValue2 = null;
            this.searchValue3 = null;
            this.headBz = false;
            this.headWBz = false;
            this.treeFilters={
                title:''
            };
            this.searchOptions = [];
            this.searchLoading = false;
            this.sheetNumberTrue = false;
            this.sheetAll=[];
            this.sheetSelc=null;
            this.UpLoadfileList = [];
            this.sortStr1 = '';
            this.sortStr2 = '';
            this.sortStr3 = '';
            this.sortStr4 = '';
            this.sortSort1 = '';
            this.sortSort2 = '';
            this.sortSort3 = '';
            this.sortSort4 = '';
            this.clickTime = null;
            this.clickId = null;
        };

        changeType() {
            for (let a of this.ConcateObj) {
                if (a.id === Number(this.ConcateType)) {
                    this.commit = a.comment
                }
            }
        };

        formatter(row, column) {
            return row.address;
        };

        filterTag(value, row) {
            return row.tag === value;
        };

        //编辑
        RowDblclick(row) {
            if (this.activeName == 'four') {
                var obj = {
                    libId: this.rankId_thr,
                    arvhiveId: row.id,
                    fondId: this.parentId,
                    isProjectCompany: this.isProjectCompany
                };
                window.sessionStorage.setItem('BJwenjian', JSON.stringify(obj))
                this['$router'].push({
                    path: '/fileArrange/fileManagement/BJwenjian'
                })
            } else if (this.activeName == 'second') {
                var obj = {
                    libId: this.rankId_two,
                    arvhiveId: row.id,
                    fondId: this.parentId,
                    isProjectCompany: this.isProjectCompany
                };
                window.sessionStorage.setItem('BJwenjian', JSON.stringify(obj))
                this['$router'].push({
                    path: '/fileArrange/fileManagement/BJwenjian'
                })
            } else if (this.activeName == 'third') {
                var obj = {
                    libId: this.rankId_two,
                    arvhiveId: row.id,
                    fondId: this.parentId,
                    isProjectCompany: this.isProjectCompany
                };
                window.sessionStorage.setItem('BJwenjian', JSON.stringify(obj))
                this['$router'].push({
                    path: '/fileArrange/fileManagement/BJwenjian'
                })
            } else {
                this.flhName = null;
                Service.getEditField(this.rankId_one).then(res => {
                    if (res.data.succeeded) {
                        this.addArray = res.data.data;
                        for (var item of res.data.data) {
                            this['$set'](this.addfile, item.fieldName, null)
                        };
                        this.IsCompany(this.parentId);
                        if (this.isProjectCompany) {
                            Service.findByFond({}).then(res => {
                                if (res.data.succeeded) {
                                    this.projectCodearr = res.data.data;
                                    this.projectNamearr = res.data.data;
                                } else {
                                    this.getError(res.data.errorMessage);
                                };
                            });
                        };
                        this['$refs']['addfile']['resetFields']();
                        Service.getNumber({libId: this.rankId_one, id: row.id}).then(res => {
                            if (res.data.succeeded) {
                                this.QZHArr = [];
                                var str = JSON.stringify(res.data.data);
                                this.EditArr = JSON.parse(str);
                                this.addfile = res.data.data;
                                this.QZHArr.push({value: res.data.data.QZH});
                                if (res.data.data.QZH != res.data.data.DQQZH) {
                                    this.QZHArr.push({value: res.data.data.DQQZH});
                                };
                                this.getFla();//获取分类号
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                        })
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                });
                for (let ind in this.fileList) {
                    if (row.id == this.fileList[ind].id) {
                        this.OrderNum = ind / 1;
                    };
                };
                var dialogHeaderEl = document.querySelector('.dragDialog');
                var dragDom = dialogHeaderEl.querySelector('.el-dialog');
                dragDom['style'].left ='auto';
                dragDom['style'].top = '0px';
                dialogHeaderEl['style'].left ='auto';
                dialogHeaderEl['style'].top =`0px`;
                this.addFileTrue = true;
                this.redactFile = true;
            };
        };

        handleDelete(index, row) {
            let arr = [];
            arr.push(row);
            var obj = {
                lib: this.rankId_two,//案卷libId
                wenId: this.rankId_one,//文件libId
                id: row.id,
                title: row.TM,
                fond: this.parentId,
                kind: this.kinId,
                qzh: row.QZH,
                storeName: this.storeName,
                isProjectCompany: this.isProjectCompany,
                AJH: row.AJH,
                fondCode: this.fondCode,
                dqqzh:row.DQQZH
            };
            window.sessionStorage.setItem('rankIn', this.rankId_two.toString());
            window.sessionStorage.setItem('Toinfile', JSON.stringify(obj));
            window.sessionStorage.setItem('printArray',JSON.stringify(arr));
            this['$router'].push({path: "/fileArrange/fileManagement/infile"})
        };

        handleCurrentChange(val) {
            this.page = val;
            this.start = (val - 1) * (this.limit);
            if(this.sortName1&&this.TypeChangeValue1){
                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
            }else{
                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
            }
        };

        handleCurrentChange1(val) {
            this.page1 = val;
            this.start1 = (val - 1) * (this.limit1);
            if(this.sortName2&&this.TypeChangeValue2){
                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort:this.sortStr2}});
            }else{
                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort:this.sortStr2}});
            }
        };

        handleCurrentChange2(val) {
            this.page2 = val;
            this.start2 = (val - 1) * (this.limit2);
            if(this.sortName3&&this.TypeChangeValue3){
                this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:this.page2, pageSize: this.limit2, sort: this.sortStr3}});
            }else{
                this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,pageCondition: {page: this.page2, pageSize: this.limit2, sort: this.sortStr3}});
            }
        };

        handleCurrentChange3(val) {
            this.page3 = val;
            this.start3 = (val - 1) * (this.limit3);
            if(this.sortName4&&this.TypeChangeValue4){
                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: this.sortStr4}});
            }else{
                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: this.sortStr4}});
            }
        };

        handleSizeChange(val) {
            this.limit = val;
            this.start = val * (this.page - 1);
            if(this.sortName1&&this.TypeChangeValue1){
                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
            }else{
                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
            }
        };

        handleSizeChange1(val) {
            this.limit1 = val;
            this.start1 = val * (this.page1 - 1);
            if(this.sortName2&&this.TypeChangeValue2){
                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
            }else{
                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
            }
        };

        handleSizeChange2(val) {
            this.limit2 = val;
            this.start2 = val * (this.page2 - 1);
            if(this.sortName3&&this.TypeChangeValue3){
                this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:this.page2, pageSize: this.limit2, sort: this.sortStr3}});
            }else{
                this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,pageCondition: {page: this.page2, pageSize: this.limit2, sort: this.sortStr3}});
            }
        };

        handleSizeChange3(val) {
            this.limit3 = val;
            this.start3 = val * (this.page3 - 1);
            if(this.sortName4&&this.TypeChangeValue4){
                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: this.sortStr4}});
            }else{
                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: this.sortStr4}});
            }
        };
        //动态菜单
        menuShow() {
            // this.ul_show=!this.ul_show
            if (this.ul_show) {
                this.ul_show = false;
            } else {
                this.ul_show = true;
            }
            ;
            if (this.ul_show)
                document.querySelector(".span")["style"].transform = "rotate(180deg)"
            else
                document.querySelector(".span")["style"].transform = "rotate(0deg)"
        };

        BoxmenuShow(): void {
            // this.box_ul_show=!this.box_ul_show
            if (this.box_ul_show) {
                this.box_ul_show = false;
            } else {
                this.box_ul_show = true;
            }
            if (this.box_ul_show) {
                document.querySelector(".spans")["style"].transform = "rotate(180deg)"
            } else {
                document.querySelector(".spans")["style"].transform = "rotate(0deg)"
            }
        };

        //组卷显隐变化
        ZJshow() {
            this.ul_show_two = !this.ul_show_two;
            if (this.ul_show_two)
                document.querySelector(".ZJ")["style"].transform = "rotate(180deg)"
            else
                document.querySelector(".ZJ")["style"].transform = "rotate(0deg)"
        };

        //数据管理
        SJGLshow() {
            this.ul_show = !this.ul_show;
            if (this.ul_show)
                document.querySelector(".SJGL")["style"].transform = "rotate(180deg)"
            else
                document.querySelector(".SJGL")["style"].transform = "rotate(0deg)"
        };

        //取当前用户全宗
        getfiles(): void {
            Service.getFondSearch({}).then(res => {
                if (res.data.succeeded) {
                    this.parentIdQiao = res.data.data.id;
                    this.parentId = res.data.data.id;
                    this.isProjectCompany = res.data.data.isProjectCompany;
                    this.isProjectCompanyQiao = res.data.data.isProjectCompany;
                    this.GetEscrow(this.parentId);
                    this.fondCode = res.data.data.fondCode;
                    this.fondName = '[ ' + res.data.data.fondCode + ' ]' + res.data.data.fondName;
                    this.fondNameQiao = '[ ' + res.data.data.fondCode + ' ]' + res.data.data.fondName;
                    Service.getLogonUserRelatedFondsTree({}).then(res=>{
                        if(res.data.succeeded){
                           this.fonddata = res.data.data;
                           this.returnCompany(this.fonddata)
                        }else{
                            this.getError(res.data.errorMessage)
                        }
                    });
                    Service.archiveNowFile(this.parentId).then(res => {
                        if (res.data.succeeded) {
                            this.tree = res.data.data;
                            this.getTreeName(this.tree);
                        } else {
                            this.getError(res.data.errorMessage)
                        }
                    });
                } else {
                    this.getError(res.data.errorMessage)
                }

            })
        };
         //递归公司
        returnCompany(data){
            for(var item of data){
                item.fondName = '[ ' + item.fondCode + ' ]' + item.fondName;
                if(item.children!=null){
                    this.returnCompany(item.children)
                }
            }
        }
        // 远程搜索全宗
        remoteMethodfond(query) {
            if (query !== '') {
                this.searchLoading = true;
                Service.getKeyName(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.searchOptions = data.map(item => {
                            return { value: item.id, label: '['+item.fondCode+']'+item.fondName,fondCode:item.fondCode,isProjectCompany:item.isProjectCompany};
                        });
                        setTimeout(() => {
                            this.searchLoading = false;
                            this.searchOptions = this.searchOptions.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
                        this['$message']({
                            message: '查询全宗联想错误！',
                            type: 'error'
                        });
                    }
                });

            } else {
                this.searchOptions = [];
            }
        }
        // 定位全宗
        enterSearch(){
            for(var son of this.searchOptions){
                if(this.treeFilters.title==son.value){
                    var data = son;
                }
            }
            this.parentIdQiao = data['value'];
            this.fondNameQiao = data['label'];
            this.fondCodeQiao = data['fondCode'];
            this.isProjectCompanyQiao = data['isProjectCompany'];
            this.ChoseOK();
        };

        //公司树的点击
        NodeClick(data: any, node: any, tree: any) {
            this.parentIdQiao = data.id;
            this.fondNameQiao = data.fondName;
            this.fondCodeQiao = data.fondCode;
            this.isProjectCompanyQiao = data.isProjectCompany;
            this.GetEscrow(data.id);
           if(data.id == this.clickId&&Date.now()-this.clickTime<=300){
               this.ChoseOK();
               document.getElementsByClassName('el-dropdown-menu')[0]['style'].display = 'none';
           }
            this.clickTime = Date.now();
            this.clickId = data.id;
        };

        // 批量挂接树 中文件夹下文件总数的统计。
        setDataToTrees(treeData) {
            // 根级的全宗不可选择
            if (treeData.id !== 0) {
                this.treesId = treeData.id;
                this.getFiles();
                this.riGuajie = false;
                this.errorMacth = [];
            }
        }

        // 树结构下 文件夹中文件的总数
        getFiles(): void {
            Service.getFileCount(this.treesId).then((res) => {
                if (res.data.succeeded == true) {
                    let count = res.data.data;
                    if (count > 0) {
                        this.existFile = true;
                        this.dec = count
                    } else {
                        this.existFile = false;
                    }

                } else {
                    this.getError(res.data.errorMessage);
                }
            })
        };

        // //懒加载树
        // treeLoad(node, resolve) {
        //     if (node.level === 0) {
        //         Service.getSonUrl({}).then(res => {
        //             if (res.data.succeeded) {
        //                 let treeData = [];
        //                 let data = res.data.data;
        //                 for (var item of data) {
        //                     let leaf = item.hasChildren;
        //                     item.hasChildren = !leaf;
        //                 };
        //                 data.forEach(item => {
        //                     item.fondName = '[ ' + item.fondCode + ' ]' + item.fondName;
        //                     treeData.push(item)
        //                 });
        //                 resolve(treeData);
        //             } else {
        //                 this.getError(res.data.errorMessage);
        //             }
        //             ;
        //         });
        //     } else {
        //         var id = node.data.id;
        //         Service.getFondChild(id).then(res => {
        //             if (res.data.succeeded) {
        //                 let treeData = [];
        //                 let data = res.data.data;
        //                 for (var item of data) {
        //                     let leaf = item.hasChildren;
        //                     item.hasChildren = !leaf;
        //                 }
        //                 ;
        //                 data.forEach(item => {
        //                     item.fondName = '[ ' + item.fondCode + ' ]' + item.fondName;
        //                     treeData.push(item)
        //                 });
        //                 resolve(treeData);
        //             } else {
        //                 this.getError(res.data.errorMessage)
        //             }
        //         })
        //     }
        // }

        // 懒加载树
        loadNode(node, resolve) {
            if (node.level === 0) {
                Service.getUserUrl({}).then((res) => {
                    if (res.data.succeeded) {
                        let treeData = [];
                        var obj = {id: 0, name: res.data.data.LogonFondName}
                        treeData.push(obj);
                        resolve(treeData);
                        // this.treesId = res.data.data[0].id;
                    } else {
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            } else {
                this.treesId = node.data.id;
                Service.getLounTile(this.treesId).then((res) => {
                    if (res.data.succeeded) {
                        let treeData = [];
                        let data = res.data.data;
                        for (let child of data) {
                            let leaf = child.hasChildren
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                            console.log(item)
                        });
                        resolve(treeData);
                    } else {
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }
        };

        //取当前全宗的代管全宗
        GetEscrow(id: number) {
            Service.GetEscrow(id).then(res => {
                if (res.data.succeeded) {
                    let arr = [];
                    for (var item of res.data.data) {
                        item.fondName = '[' + item.fondCode + ']' + item.fondName;
                        arr.push(item)
                    }
                    this.Containtree = arr;
                    document.getElementsByClassName('companytreeBox')[0]['style'].height = '60%';
                    document.getElementsByClassName('companytreeBox')[0]['style'].paddingBottom = '0px';
                    document.getElementsByClassName('ManageFondBox')[0]['style'].display = 'block';
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //代管公司树的点击
        ManageFondClick(data: any, node: any, tree: any) {
            this.parentId = data.id;
            this.fondNameQiao = data.fondName;
            this.fondCodeQiao = data.fondCode;
            this.isProjectCompanyQiao = data.isProjectCompany;
        };

        //获取案卷列表
        pageType(data: any, node: any, tree: any) {
            this.choosedRole = [];
            this['$refs']['treeku']['setCheckedKeys'](this.choosedRole);
            this.searchContent = [];
            this.searchContent1 = [];
            this.searchContent2 = [];
            this.searchContent3 = [];
            this.TypeChangeValue1 = null;
            this.TypeChangeValue2 = null;
            this.TypeChangeValue3 = null;
            this.TypeChangeValue4 = null;
            this.sortName1 = null;
            this.sortName2 = null;
            this.sortName3 = null;
            this.sortName4 = null;
            if (data.nodeType == 2) {
                this.headBz = false;
                this.headWBz = false;
                this.searchkeyOne.key=null;
                this.searchkeyTwo.key=null;
                this.searchkeyThr.key=null;
                this.searchkeyfor.key=null;
                this.searchValue = null;
                this.searchValue1 = null;
                this.searchValue2 = null;
                this.searchValue3 = null;
                //根据档案分类取档案库
                this.fileList = [];
                this.juanneiArr = [];
                this.juanwaiArr = [];
                this.wenjianArr = [];
                this.kinId = data.kindId;
                this.storeName = data.nodeName;
                this.page = 1;
                this.total = 0;
                this.limit = 500;
                this.page1 = 1;
                this.total1 = 0;
                this.limit1 = 500;
                this.page2 = 1;
                this.total2 = 0;
                this.limit2 = 500;
                this.page3 = 1;
                this.total3 = 0;
                this.limit3 = 500;
                this.clickOne = true;
                this.clickTwo = true;
                Service.getByKindId(this.kinId).then(res => {
                    if (res.data.succeeded) {
                        this.MainShow = true;
                        if (res.data.data.length == 2 || res.data.data.length == 0) {
                            this.activeName = 'first';
                            this.fileList_show = true;
                            this.fileListshow = true;
                            this.juanwai_show = false;
                            this.juannei_show = false;
                            this.pageOne = true;
                            this.pageTwo = false;
                            this.pageThr = false;
                            this.pagefor = false;
                            this.tab_control = true;
                            this.exportcontent = '1';
                            for (var item of res.data.data) {
                                if (item.rank == 3) {
                                    this.rankId_one = item.id;
                                } else if (item.rank == 4) {
                                    this.rankId_two = item.id;
                                }
                                ;
                            }
                            ;
                            //请求画面表格的列配置
                            this.getListConfig(this.rankId_one);
                            // this.getSearchConfig(this.rankId_one);
                            this.getSupportGroupByFields(this.rankId_one)
                            // this.main_show=true;
                        } else {
                            this.fileList_show = true;
                            this.fileListshow = false;
                            this.juanwai_show = false;
                            this.juannei_show = false;
                            this.pageOne = false;
                            this.pageTwo = false;
                            this.pageThr = false;
                            this.pagefor = true;
                            this.tab_control = false;
                            this.activeName = "four";
                            this.exportcontent = '4';
                            this.rankId_thr = res.data.data[0].id;
                            this.getListConfig(this.rankId_thr);
                            // this.getSearchConfig(this.rankId_thr);
                            this.getSupportGroupByFields(this.rankId_thr)
                        }
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                })
            }
        };

//分组查看
        getSupportGroupByFields(ID) {
            Service.getSupportGroupByFields(ID).then(res => {
                if (res.data.succeeded) {
                    if (ID == this.rankId_one) {
                        this.sortarr1 = [];
                        this.sortarr1 = res.data.data;
                        this.sortarr1.unshift({caption: '无', fieldName: null})
                    } else if (ID == this.rankId_two) {
                        let data = JSON.stringify(res.data.data);
                        this.sortarr2 = [];
                        this.sortarr3 = [];
                        this.sortarr2 = JSON.parse(data);
                        this.sortarr2.unshift({caption: '无', fieldName: null});
                        this.sortarr3 = res.data.data;
                        this.sortarr3.unshift({caption: '无', fieldName: null});
                    } else if (ID == this.rankId_thr) {
                        this.sortarr4 = [];
                        this.sortarr4 = res.data.data;
                        this.sortarr4.unshift({caption: '无', fieldName: null})
                    }

                }
            })
        }

        //getBykindId返回数据的长度为2时获取列表头部配置
        getListConfig(rankId: number) {
            Service.getDispField(rankId).then(res => {
                if (res.data.succeeded) {
                    let data = JSON.stringify(res.data.data);
                    if (rankId === this.rankId_one) {
                        this.tableHeader = [];
                        var arr = JSON.parse(data);
                        var HaveBZ = false;
                        for(var son of arr){
                            if(son.fieldName=='BZ'){
                                var BZstr = JSON.stringify(son);
                                var BZobj = JSON.parse(BZstr);
                                BZobj.fieldName = 'BZ1';
                                HaveBZ = true;
                            };
                        };
                        if(HaveBZ){
                            arr.splice(1,0,BZobj)
                        }
                        this.tableHeader = arr;
                        this.getListNumber({
                            kindId: this.kinId,
                            fondId: this.parentId,
                            searchKey: this.searchValue,
                            pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}
                        });
                    } else if (rankId === this.rankId_two) {
                        if (this.activeName == 'second') {
                            this.tableHeader_two = [];
                            for (var item of JSON.parse(data)) {
                                this.tableHeader_two.push(item)
                            }
                            // this.tableHeader_two=JSON.parse(data);
                            // this.getUnarrangedFile({
                            //     kindId: this.kinId,
                            //     fondId: this.parentId,
                            //     conditions: this.searchContent1,
                            //     pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}
                            // });
                            if(this.sortName2&&this.TypeChangeValue2){
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }else{
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }
                        } else if (this.activeName == 'third') {
                            this.tableHeader_thr = [];
                            this.tableHeader_thr = JSON.parse(data);
                            // this.getInfilePapers({
                            //     kindId: this.kinId,
                            //     fondId: this.parentId,
                            //     conditions: this.searchContent2,
                            //     pageCondition: {page: this.page2, pageSize: this.limit2, sort: ""}
                            // });
                            if(this.sortName3&&this.TypeChangeValue3){
                                this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:this.page2, pageSize: this.limit2, sort: this.sortStr3}});
                            }else{
                                this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,pageCondition: {page: this.page2, pageSize: this.limit2, sort: this.sortStr3}});
                            }
                        }
                    } else if (rankId === this.rankId_thr) {
                        this.tableHeader_for = [];
                        var arr = JSON.parse(data);
                        var WHaveBZ = false;
                        for(var son of arr){
                            if(son.fieldName=='BZ'){
                                var BZstr = JSON.stringify(son);
                                var BZobj = JSON.parse(BZstr);
                                BZobj.fieldName = 'BZ1';
                                WHaveBZ = true;
                            };
                        };
                        if(WHaveBZ){
                            arr.splice(1,0,BZobj)
                        }
                        this.tableHeader_for = arr;
                        // this.WenjianSearch({
                        //     kindId: this.kinId,
                        //     fondId: this.parentId,
                        //     conditions: this.searchContent3,
                        //     pageCondition: {page: this.page3, pageSize: this.limit3, sort: ""}
                        // })
                        if(this.sortName4&&this.TypeChangeValue4){
                            this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                        }else{
                            this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                        }
                    }
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        };

        // 递归节点 增加className
        getTreeName(tree) {
            for (let grass of tree) {
                if (grass.nodeType === 1&&grass.nodeType!=null) {
                    grass.className = 'fa fa-plus-square-o';
                    grass.srcName = 'static/imgs/allTree/fileTreeTitle.png';
                    grass.marginLeft = '0';
                    if(grass.children!=null){
                        this.getTreeName(grass.children);
                    }
                } else if (grass.nodeType === 2&&grass.nodeType!=null) {
                    grass.srcName = 'static/imgs/allTree/folderFiles.png';
                    grass.marginLeft = '5px';
                }
            }
        };

        // 自定义节点图标
        renderContent(createElement, {node, data}) {
            return createElement(
                'span',
                {
                    attrs: {
                        'class': 'custom-tree-node',
                    },
                    style: {
                        'padding': '11px 0',
                    }
                },
                [
                    createElement(
                        'img',
                        {
                            attrs: {
                                'src': data.srcName
                            },
                            style: {
                                'margin': '1px 5px 0 2px ',
                                'float': 'left',
                                'margin-left': data.marginLeft
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style: {
                                'margin-top': '3px',
                                'display': 'block'
                            }
                        },
                        [
                            createElement('span', node.label)
                        ]
                    ),
                ]
            )
        };

        //确定关闭公司书
        ChoseOK(): void {
            if(this.TreeSort){
                this.TreeSort = true;
                this.TypeChangeValue1 = null;
                this.TypeChangeValue2 = null;
                this.TypeChangeValue3 = null;
                this.TypeChangeValue4 = null;
                this.sortName1 = null;
                this.sortName2 = null;
                this.sortName3 = null;
                this.sortName4 = null;
                this.kinId = null;
                this.storeName = null;
                this.MainShow = false;
                this.expandedRole = [];
                this.choosedRole = [];
                //当前全宗的档案结构分类
                this.fileList = [];
                this.juanwaiArr = [];
                this.juanneiArr = [];
                this.wenjianArr = [];
                this.clickTwo = true;
                this.clickOne = true;
                this.page = 1;
                this.total = 0;
                this.limit = 500;
                this.page1 = 1;
                this.total1 = 0;
                this.limit1 = 500;
                this.page2 = 1;
                this.total2 = 0;
                this.limit2 = 500;
                this.page3 = 1;
                this.total3 = 0;
                this.limit3 = 500;
                this.parentId = this.parentIdQiao;
                this.isProjectCompany = this.isProjectCompanyQiao;
                this.choosedRole = [];
                Service.archiveNowFile(this.parentId).then(res => {
                    this.fondName = this.fondNameQiao;
                    this.fondCode = this.fondCodeQiao;
                    if (res.data.succeeded) {
                        this.tree = res.data.data;
                        this.getTreeName(this.tree);
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                });
            }
        }

        //列表数据配置
        getListNumber(params: any) {
            this.isloading = true;
            Service.FileSearch(params).then(res => {
                if (res.data.succeeded) {
                    //this.fileList = [];
                    this.sortStr1 = res.data.sort;
                    var arr = [];
                    let data = JSON.stringify(res.data.data);
                    var olddata = JSON.parse(data);
                    for(let i=0;i<olddata.length;i++){
                        olddata[i].Serial = this.limit*(this.page-1)+i+1;
                        if('BZ' in olddata[i]){
                            olddata[i]['BZ1'] = olddata[i]['BZ'];
                        }
                        arr.push(olddata[i])
                    };
                    this.fileList = arr;
                    this.total = res.data.totalRecords;
                    this.page = res.data.page;
                    this.$nextTick(()=>{
                        this.isloading = false;
                    });
                } else {
                    this.fileList = [];
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //获取未整理文件
        getUnarrangedFile(params: any): void {
            this.isloading1  = true;
            Service.searchJuanWai(params).then(res => {
                if (res.data.succeeded) {
                    // this.juanwaiArr = [];
                    this.sortStr2= res.data.sort;
                    let data = JSON.stringify(res.data.data);
                    var olddata =  JSON.parse(data);
                    for(let i=0;i<olddata.length;i++){
                        olddata[i].Serial = this.limit1*(this.page1-1)+i+1;
                    }
                    this.juanwaiArr = olddata;
                    this.total1 = res.data.totalRecords;
                    this.page1 = res.data.page;
                    this.$nextTick(()=>{
                        this.isloading1 = false;
                    });
                } else {
                    this.juanwaiArr = [];
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //获取卷内文件
        getInfilePapers(params: any): void {
            this.isloading2 = true;
            Service.searchJuanNei(params).then(res => {
                if (res.data.succeeded) {
                    // this.juanneiArr = [];
                    this.sortStr3 = res.data.sort;
                    let data = JSON.stringify(res.data.data);
                    var olddata = JSON.parse(data);
                    var arr = [];
                    for(let i=0;i<olddata.length;i++){
                        olddata[i].Serial = this.limit2*(this.page2-1)+i+1;
                        arr.push(olddata[i]);
                    };
                    this.juanneiArr = arr;
                    this.total2 = res.data.totalRecords;
                    this.page2 = res.data.page;
                    this.$nextTick(()=>{
                        this.isloading2 = false;
                    });
                } else {
                    this.juanneiArr = [];
                    this.getError(res.data.errorMessage);
                }
            })
        };

        //文件级档案列表
        WenjianSearch(params: any) {
            this.isloading3 = true;
            Service.WenjianSearch(params).then(res => {
                if (res.data.succeeded) {
                    // this.wenjianArr = [];
                    this.sortStr4 = res.data.sort;
                    let data = JSON.stringify(res.data.data);
                    var olddata = JSON.parse(data);
                    for(let i=0;i<olddata.length;i++){
                        if('BZ' in olddata[i]){
                            olddata[i]['BZ1'] = olddata[i]['BZ'];
                        };
                        olddata[i].Serial = this.limit3*(this.page3-1)+i+1;
                    }
                    this.wenjianArr = olddata;
                    this.total3 = res.data.totalRecords;
                    this.page3 = res.data.page;
                    this.$nextTick(()=>{
                        this.isloading3 = false;
                    });
                } else {
                    this.wenjianArr = [];
                    this.getError(res.data.errorMessage);
                }
            })
        };

        // 跳转文件移交
        toTransfer() {
            if (this.activeName == 'first') {
                if (this.selection.length > 0) {
                    var arr = [];
                    var activeNum = 0;
                    for (var item of this.selection) {
                        if (item.ARCHIVE_STATUS == 1) {
                            activeNum = 1;
                        }
                        arr.push(item.id)
                    }
                    ;
                    if (activeNum == 1) {
                        this.Warn('所选数据中部分数据正在文件移交审批中，无法重复提交审批，请重新选择。')
                    } else {
                        var obj = {ids: arr, lib: this.rankId_one, fond: this.parentId, kind: this.kinId, type: 1}
                        window.sessionStorage.setItem('fileTransferApply', JSON.stringify(obj))
                        this['$router'].push({path: '/fileArrange/fileTransferApply/fileTransferApply'});
                    }
                } else {
                    this.Warn("请选择要移交的文件!")
                }
                ;
            } else {
                if (this.selection3.length > 0) {
                    var arr = [];
                    var activeNum = 0;
                    for (var item of this.selection3) {
                        if (item.ARCHIVE_STATUS == 1) {
                            activeNum = 1;
                        }
                        arr.push(item.id)
                    };
                    if (activeNum == 1) {
                        this.Warn('所选数据中部分数据正在文件移交审批中，无法重复提交审批，请重新选择。')
                    } else {
                        var obj = {ids: arr, lib: this.rankId_thr, fond: this.parentId, kind: this.kinId, type: 2};
                        window.sessionStorage.setItem('fileTransferApply', JSON.stringify(obj))
                        this['$router'].push({path: '/fileArrange/fileTransferApply/fileTransferApply'});
                    }
                } else {
                    this.Warn("请选择要移交的文件!")
                }
                ;
            }
        };

        rightBoxshow(): void {
            if (this.activeName == 'first') {
                this.getBatchModifiableFields(this.rankId_one);
            } else if (this.activeName == 'four') {
                this.getBatchModifiableFields(this.rankId_thr);
            } else {
                this.getBatchModifiableFields(this.rankId_two);
            };
        };

        //tabs的方法
        handleClick(tab) {
            if (tab.name === "second") {
                if (this.clickOne) {
                    this.getListConfig(this.rankId_two);
                    // this.getUnarrangedFile({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent1,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
                    // this.getSearchConfig(this.rankId_two);
                    this.getSupportGroupByFields(this.rankId_two);
                    this.clickOne = false;
                }
                this.fileList_show = false;
                this.fileListshow = false;
                this.juanwai_show = true;
                this.juannei_show = false;
                this.pageOne = false;
                this.pageTwo = true;
                this.pageThr = false;
                this.exportcontent = '4';
                if (this.TypeChangeValue2 == null) {
                    this.TreeSort = true;
                } else {
                    this.TreeSort = false;
                }
            } else if (tab.name === "third") {
                if (this.clickTwo) {
                    this.getListConfig(this.rankId_two);
                    // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page2, pageSize:this.limit2,sort:""}});
                    // this.getSearchConfig(this.rankId_two);
                    this.getSupportGroupByFields(this.rankId_two);
                    this.clickTwo = false;
                }
                this.fileList_show = false;
                this.fileListshow = false;
                this.juanwai_show = false;
                this.juannei_show = true;
                this.pageOne = false;
                this.pageTwo = false;
                this.pageThr = true;
                this.exportcontent = '3';
                if (this.TypeChangeValue3 == null) {
                    this.TreeSort = true;
                } else {
                    this.TreeSort = false;
                }
            } else if (tab.name === "first") {
                this.fileList_show = true;
                this.fileListshow = true;
                this.juanwai_show = false;
                this.juannei_show = false;
                this.pageOne = true;
                this.pageTwo = false;
                this.pageThr = false;
                this.exportcontent = '1';
                if (this.TypeChangeValue1 == null) {
                    this.TreeSort = true;
                } else {
                    this.TreeSort = false;
                }
                // this.getSearchConfig(this.rankId_one)
            }
        };

        //批量修改的tabs方法
        AmendTabClick() {
            this.form = {
                region: null,
                replaceValue: null,
                replaceTo: ''
            };
            this.Addrform = {
                region: null,
                startNumber: null,
                endNumber: null,
                replaceTo: ''
            };
            this.combineform = {
                itemA: null,
                connectSign: null,
                itemB: null,
                concatTo: null
            };
        }

        //获取搜索框的配置
        getSearchConfig(libId: number) {
            Service.Getquerycondition(libId).then(res => {
                if (res.data.succeeded) {
                    if (res.data.data.length > 3) {
                        document.getElementsByClassName("tablePosition")[0]['style'].top = '155px';
                        document.getElementsByClassName("rowTwo")[0]['style'].paddingTop = '10px';
                        // document.getElementsByClassName("rowTwo")[0]['style'].paddingTop='0'、、
                    } else {
                        document.getElementsByClassName("tablePosition")[0]['style'].top = '115px';
                        document.getElementsByClassName("rowTwo")[0]['style'].paddingTop = '0'
                    }
                    if (this.activeName == 'first') {
                        this.searchConfig = res.data.data;
                        for (var item of res.data.data) {
                            this['$set'](this.searchform, 'value' + item.id, null)
                        }
                        ;
                    } else if (this.activeName == 'second') {

                        this.searchConfig1 = res.data.data;
                        for (var item of res.data.data) {
                            this['$set'](this.searchform1, 'value' + item.id, null)
                        }
                        ;

                    } else if (this.activeName == 'third') {
                        this.searchConfig2 = res.data.data;
                        for (var item of res.data.data) {
                            this['$set'](this.searchform2, 'value' + item.id, null)
                        }
                        ;
                    } else if (this.activeName == 'four') {
                        this.searchConfig3 = res.data.data;
                        for (var item of res.data.data) {
                            this['$set'](this.searchform3, 'value' + item.id, null)
                        }
                        ;
                    }
                    this.tableHeight = document.getElementsByClassName('tablePosition')[0].clientHeight - 96;

                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //搜索按钮
        searchKey(): void {
            // if (this.activeName == 'first') {
            //     this.searchContent = [];
            //     for (var key in this.searchform) {
            //         if (this.searchform[key] != null && this.searchform[key] != "") {
            //             var Name = key.slice(5);
            //             var str = parseInt(Name)
            //             var obj = {
            //                 id: str,
            //                 value: this.searchform[key]
            //             };
            //             this.searchContent.push(obj)
            //         }
            //         ;
            //     };
            //     if(this.sortName1&&this.TypeChangeValue1){
            //         this.getListNumber({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:1, pageSize: this.limit, sort: ""}});
            //     }else{
            //         this.getListNumber({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent,pageCondition: {page: 1, pageSize: this.limit, sort: ""}});
            //     }
            //     // this.getListNumber({
            //     //     kindId: this.kinId,
            //     //     fondId: this.parentId,
            //     //     conditions: this.searchContent,
            //     //     pageCondition: {page: 1, pageSize: this.limit, sort: ""}
            //     // })
            // } else if (this.activeName == 'second') {
            //     this.searchContent1 = [];
            //     for (var key in this.searchform1) {
            //         if (this.searchform1[key] != null && this.searchform1[key] != "") {
            //             var Name = key.slice(5);
            //             var str = parseInt(Name)
            //             var obj = {
            //                 id: str,
            //                 value: this.searchform1[key]
            //             };
            //             this.searchContent1.push(obj)
            //         }
            //         ;
            //     }
            //     ;
            //     // this.getUnarrangedFile({
            //     //     kindId: this.kinId,
            //     //     fondId: this.parentId,
            //     //     conditions: this.searchContent1,
            //     //     pageCondition: {page: 1, pageSize: this.limit1, sort: ""}
            //     // });
            //     if(this.sortName2&&this.TypeChangeValue2){
            //         this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: ""}});
            //     }else{
            //         this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}});
            //     }
            // } else if (this.activeName == 'third') {
            //     this.searchContent2 = [];
            //     for (var key in this.searchform2) {
            //         if (this.searchform2[key] != null && this.searchform2[key] != "") {
            //             var Name = key.slice(5);
            //             var str = parseInt(Name)
            //             var obj = {
            //                 id: str,
            //                 value: this.searchform2[key]
            //             };
            //             this.searchContent2.push(obj)
            //         }
            //         ;
            //     }
            //     ;
            //     // this.getInfilePapers({
            //     //     kindId: this.kinId,
            //     //     fondId: this.parentId,
            //     //     conditions: this.searchContent2,
            //     //     pageCondition: {page: 1, pageSize: this.limit2, sort: ""}
            //     // });
            //     if(this.sortName3&&this.TypeChangeValue3){
            //         this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:1, pageSize: this.limit2, sort: ""}});
            //     }else{
            //         this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent2,pageCondition: {page: 1, pageSize: this.limit2, sort: ""}});
            //     }
            // } else if (this.activeName == 'four') {
            //     this.searchContent3 = [];
            //     for (var key in this.searchform3) {
            //         if (this.searchform3[key] != null && this.searchform3[key] != "") {
            //             var Name = key.slice(5);
            //             var str = parseInt(Name)
            //             var obj = {
            //                 id: str,
            //                 value: this.searchform3[key]
            //             };
            //             this.searchContent3.push(obj)
            //         }
            //         ;
            //     }
            //     ;
            //     // this.WenjianSearch({
            //     //     kindId: this.kinId,
            //     //     fondId: this.parentId,
            //     //     conditions: this.searchContent3,
            //     //     pageCondition: {page: 1, pageSize: this.limit3, sort: ""}
            //     // });
            //     if(this.sortName4&&this.TypeChangeValue4){
            //         this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:1, pageSize: this.limit3, sort: ""}});
            //     }else{
            //         this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent3,pageCondition: {page: 1, pageSize: this.limit3, sort: ""}});
            //     }
            // }
            // ;
            if (this.activeName == 'first') {
                this.searchValue = this.searchkeyOne.key;
                if(this.sortName1&&this.TypeChangeValue1){
                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:1, pageSize: this.limit, sort: this.sortStr1}});
                }else{
                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: 1, pageSize: this.limit, sort: this.sortStr1}});
                }
            } else if (this.activeName == 'second') {
                this.searchValue1 = this.searchkeyTwo.key;
                if(this.sortName2&&this.TypeChangeValue2){
                    this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                }else{
                    this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                }
            } else if (this.activeName == 'third') {
                this.searchValue2 = this.searchkeyThr.key;
                if(this.sortName3&&this.TypeChangeValue3){
                    this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:1, pageSize: this.limit2, sort: this.sortStr3}});
                }else{
                    this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,pageCondition: {page: 1, pageSize: this.limit2, sort: this.sortStr3}});
                }
            } else if (this.activeName == 'four') {
                this.searchValue3 = this.searchkeyfor.key;
                if(this.sortName4&&this.TypeChangeValue4){
                    this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:1, pageSize: this.limit3, sort: this.sortStr4}});
                }else{
                    this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: 1, pageSize: this.limit3, sort: this.sortStr4}});
                }
            };
        };

        //清空搜索按钮
        clearSearch() {
            // if (this.activeName == 'first') {
            //     for (var key in this.searchform) {
            //         this.searchform[key] = null;
            //     }
            //     ;
            // } else if (this.activeName == 'second') {
            //     for (var key in this.searchform1) {
            //         this.searchform1[key] = null;
            //     }
            //     ;
            // } else if (this.activeName == 'third') {
            //     for (var key in this.searchform2) {
            //         this.searchform2[key] = null;
            //     }
            //     ;
            // } else if (this.activeName == 'four') {
            //     for (var key in this.searchform3) {
            //         this.searchform3[key] = null;
            //     }
            //     ;
            // }
            if (this.activeName == 'first') {
                this.searchkeyOne.key = null;
                this.searchValue = null;
            } else if (this.activeName == 'second') {
                this.searchkeyTwo.key = null;
                this.searchValue1 = null;
            } else if (this.activeName == 'third') {
                this.searchkeyThr.key = null;
                this.searchValue2 = null;
            } else if (this.activeName == 'four') {
                this.searchkeyfor.key = null;
                this.searchValue3 = null;
            }
        };

        // changeshow():void{
        //        this.repalceMany=false;
        //        this.aside_show=true;
        //        this.main_show=true;
        // };

        pageSize(): void {
            var Arr = document.querySelectorAll(".toolButtons");
            var buttonArr = Array.from(Arr);
            var Li = document.querySelectorAll(".buttonlis");
            var boxbutton = Array.from(Li);
            var len = document.querySelector(".rowThr")["offsetWidth"];
            var ind = 0;
            if (len === 0) {
                document.querySelector(".toolButton-one")["style"].display = "none";
                buttonArr.forEach(function (item) {
                    item["style"].display = "block";
                })
            } else if (len <= 664) {
                ind = 1
                document.querySelector(".toolButton-one")["style"].display = "block";
                if (len > 660) {
                    ind = 2
                } else if (len <= 660 && len > 565) {
                    ind = 3
                } else if (len <= 565 && len > 510) {
                    ind = 4
                } else if (len <= 510 && len > 458) {
                    ind = 5
                } else if (len <= 458 && len > 379) {
                    ind = 6
                } else if (len <= 379 && len > 298) {
                    ind = 7
                } else if (len <= 298 && len > 217) {
                    ind = 8
                } else {
                    ind = 9
                }
                for (var i = 0; i < 8; i++) {
                    if (i < ind) {
                        buttonArr[i]["style"].display = "none"
                        boxbutton[i]["style"].display = "block"
                    } else {
                        buttonArr[i]["style"].display = "block"
                        boxbutton[i]["style"].display = "none"
                    }

                }
            } else {
                document.querySelector(".toolButton-one")["style"].display = "none";
                buttonArr.forEach(function (item) {
                    item["style"].display = "block"
                })
            }
        };

        //新增
        addFileTrues(): void {
            if (this.activeName == 'first') {
                this.getEiditFiled(this.rankId_one);
                var dialogHeaderEl = document.querySelector('.dragDialog');
                var dragDom = dialogHeaderEl.querySelector('.el-dialog');
                dragDom['style'].left ='auto';
                dragDom['style'].top = '0px';
                dialogHeaderEl['style'].left ='auto';
                dialogHeaderEl['style'].top =`0px`;
                this.flhName = null;
                this.redactFile = false;
                this.addFileTrue = true;
            } else if (this.activeName == 'four') {
                var obj = {
                    lib: this.rankId_thr,
                    kind: this.kinId,
                    fond: this.parentId,
                    fondCode: this.fondCode,
                    isProjectCompany: this.isProjectCompany
                };
                window.sessionStorage.setItem('addFile', JSON.stringify(obj))
                this['$router'].push({
                    path: '/fileArrange/fileManagement/addFile',
                    // query:{
                    //     lib:this.rankId_thr,
                    //     kind:this.kinId,
                    //     fond:this.parentId,
                    //     fondCode:this.fondCode
                    // }
                })
            }
            // else if(this.activeName=='second'){
            //     this.getEiditFiled(this.rankId_two);
            // }

        };

        // //second下的新增
        // addFileTruesTwo():void{
        //     this.getEiditFiled(this.rankId_two);
        //     this.addFileTrue=true;
        // };
        //全宗号搜索
        remoteMethod(query) {
            if (query !== '') {
                Service.searchFondsForInput(query).then((res) => {
                    if (res.data.succeeded) {
                        let data = res.data.data;
                        this.JTarr = data.map(item => {
                            return {value: item.fondCode, label: item.fondName + item.fondCode, id: item.id};
                        });
                        setTimeout(() => {
                            this.JTarr = this.JTarr.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    } else {
                        this['$message']({
                            message: '查询全宗号联想错误！',
                            type: 'error'
                        });
                    }
                });
            } else {
                this.JTarr = [];
            }
        }

        v

        //是否为集团公司
        IsCompany(Id) {
            // this.ISJT = true;
            Service.isTopCompany(Id).then(res => {
                if (res.data.succeeded) {
                    this.ISJT = res.data.data;
                }
            })
        }

        //取得新增/编辑案卷页面的输入项配置
        getEiditFiled(id: number) {
            Service.getEditField(id).then(res => {
                if (res.data.succeeded) {
                    this.QZHArr = [];
                    this.addfile = {};
                    this.addArray = res.data.data;
                    for (var item of res.data.data) {
                        this['$set'](this.addfile, item.fieldName, null)
                    }
                    ;
                    this.getFla();
                    this.IsCompany(this.parentId);
                    this['$refs']['addfile']['resetFields']();
                    this.addfile.QZH = this.fondCode;
                    this.QZHArr.push({value: this.fondCode})
                    this.addfile.DQQZH = this.fondCode;
                    if (this.isProjectCompany) {
                        Service.findByFond({}).then(res => {
                            if (res.data.succeeded) {
                                this.projectCodearr = res.data.data;
                                this.projectNamearr = res.data.data;
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //取得编辑案卷页面的页面数据
        getReDactNumber(params: any) {
            this.flhName = null;
            Service.getNumber(params).then(res => {
                if (res.data.succeeded) {
                    var obj = JSON.stringify(res.data.data);
                    this.addfile = JSON.parse(obj);
                    this.EditArr = res.data.data;
                    if(this.addfile.FLH){
                        for(var item of this.FLhArr){
                            if(item.categoryNumber == this.addfile.FLH){
                                this.flhName = item.categoryNumberText;
                                break;
                            }else if(item.children){
                                for(var son of item.children){
                                    if(son.categoryNumber==this.addfile.FLH){
                                        this.flhName = son.categoryNumberText;
                                        break;
                                    }else if(son.children){
                                        for(var ind of son.children){
                                            if(ind.categoryNumber == this.addfile.FLH){
                                                this.flhName = ind.categoryNumberText;
                                                break;
                                            }else if(ind.children){
                                                for(var son2 of ind.children){
                                                    if(son2.categoryNumber == this.addfile.FLH){
                                                        this.flhName = son2.categoryNumberText;
                                                        break;
                                                    }else if(son2.children){
                                                        for(var son3 of son2.children){
                                                            if(son3.categoryNumber == this.addfile.FLH){
                                                                this.flhName = son3.categoryNumberText;
                                                                break;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    this['$refs']['addfile']['resetFields']();
                } else {
                    this.getError(res.data.errorMessage);
                }
            })
        };

        //table表格选中项
        selectionChange(selection) {
            this.selection = selection;
        };

        selectionChange1(selection) {
            this.selection1 = selection;
        };

        selectionChange2(selection) {
            this.selection2 = selection;
        };

        selectionChange3(selection) {
            this.selection3 = selection;
        };
        //页次转页数
        NumTopage(){
            if(this.selection.length>0){
                var arr= [];
                for(var son of this.selection){
                    arr.push(son.id);
                };
                Service.pageTranslateByAnJuans({anJuanLibId:this.rankId_one,anJuanIds:arr}).then(res=>{
                    if(res.data.succeeded){
                        this.Suces('转换成功。')
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }else{
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                this.Warn("请选择数据")
            }
        };
         //页次转页数
        pageToNum(){
            if(this.selection.length>0){
                var arr= [];
                for(var son of this.selection){
                    arr.push(son.id);
                };
                Service.pageRangeTranslateByAnJuans({anJuanLibId:this.rankId_one,anJuanIds:arr}).then(res=>{
                    if(res.data.succeeded){
                        this.Suces('转换成功。')
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }else{
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                this.Warn("请选择数据")
            }
        };
        //前往合卷
        Gocombinefile(): void {
            if (this.selection.length > 1) {
                var arr = [];
                for (var item of this.selection) {
                    arr.push(item.id)
                }
                ;
                Service.checkBeforeMergeAnJuans({anJuanLibId: this.rankId_one, anJuanIds: arr}).then(res => {
                    if (res.data.succeeded) {
                        var obj = {
                            lib: this.rankId_one,
                            file: arr,
                            kindId: this.kinId,
                            QZH: this.fondCode,
                            parentId: this.parentId,
                            wenId: this.rankId_two,
                            isProjectCompany: this.isProjectCompany,
                            value: res.data.data
                        };
                        window.sessionStorage.setItem('combinefile', JSON.stringify(obj))
                        this["$router"].push({path: '/fileArrange/fileManagement/combinefile'})
                    } else {
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '不保存',
                            showCancelButton: false,
                            type: 'warning',
                            center: true
                        });
                        // this.getError(res.data.errorMessage)
                    }
                    ;
                });
            } else {
                this.Warn("您最少需要选择两个文件!")
            }

        };

        //保存并添加
        keepAdd(form) {
            this['$refs'][form]['validate']((valid) => {
                if (valid) {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    this.addfile.rowStatus = 1;
                    if (this.activeName == 'first') {
                        Service.SaveFile({
                            fondId: this.parentId,
                            libId: this.rankId_one,
                            data: this.addfile
                        }).then(res => {
                            if (res.data.succeeded) {
                                for (var ind of this.addArray) {
                                    if (!ind.isInherit) {
                                        this.addfile[ind.fieldName] = null;
                                    };
                                };
                                this.Suces("保存成功!");
                                if(this.sortName1&&this.TypeChangeValue1){
                                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                                }else{
                                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                                }
                                // this.getListNumber({
                                //     kindId: this.kinId,
                                //     fondId: this.parentId,
                                //     conditions: this.searchContent,
                                //     pageCondition: {page: this.page, pageSize: this.limit, sort: ""}
                                // });
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                            ;
                            this.$nextTick(() => {
                                this.loadingInstance.close();
                            });
                        })
                    }
                    ;
                } else {
                    this.getError('请完善内容!');
                }
                ;
            });
        };

        keepAddTwo(form) {
            this['$refs'][form]['validate']((valid) => {
                if (valid) {
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    this.addfile.rowStatus = 1;
                    if (this.activeName == 'first') {
                        Service.SaveFile({
                            fondId: this.parentId,
                            libId: this.rankId_one,
                            data: this.addfile
                        }).then(res => {
                            if (res.data.succeeded) {
                                this.Suces("保存成功!")
                                this.addFileTrue = false;
                                // this.getListNumber({
                                //     kindId: this.kinId,
                                //     fondId: this.parentId,
                                //     conditions: this.searchContent,
                                //     pageCondition: {page: this.page, pageSize: this.limit, sort: ""}
                                // });
                                if(this.sortName1&&this.TypeChangeValue1){
                                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                                }else{
                                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                                }
                            } else {
                                this.getError(res.data.errorMessage);
                            }
                            ;
                            this.$nextTick(() => {
                                this.loadingInstance.close();
                            });
                        })
                    }
                    ;
                } else {
                    this.getError('请完善内容!');
                }
            })
        };

        //上一条
        proOne(): void {
            var stepTrue = true;
            for (var key in this.addfile) {
                if (this.addfile[key] != this.EditArr[key]) {
                    stepTrue = false;
                }
                ;
            }
            ;
            if (stepTrue) {
                this.goproOne();
            } else {
                this['$confirm']('是否对上一条数据进行保存', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '不保存',
                    type: 'warning'
                }).then(() => {
                    this.Editcommit('addfile', this.goproOne)
                }).catch(() => {
                    this.goproOne()
                });
            };
        };

        //前往上一条
        goproOne() {
            if (this.OrderNum > 0) {
                this.OrderNum -= 1;
                var ID = this.fileList[this.OrderNum].id
                this.getReDactNumber({libId: this.rankId_one, id: ID})
                this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);
            } else {
                if (this.page > 1) {
                    this.page -= 1;
                    this.OrderNum = this.limit - 1;
                    // this.getListNumber({
                    //     kindId: this.kinId,
                    //     fondId: this.parentId,
                    //     conditions: this.searchContent,
                    //     pageCondition: {page: this.page, pageSize: this.limit, sort: ""}
                    // });
                    if(this.sortName1&&this.TypeChangeValue1){
                        this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                    }else{
                        this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                    }
                    setTimeout(() => {
                        var ID = this.fileList[this.OrderNum].id
                        this.getReDactNumber({libId: this.rankId_one, id: ID})
                        this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);
                    }, 1000)
                } else {
                    this.Warn("已经是第一条数据。")
                }
            }
        };

        //下一条
        nextOne(): void {
            var stepTrue = true;
            for (var key in this.addfile) {
                if (this.addfile[key] != this.EditArr[key]) {
                    stepTrue = false;
                };
            };
            if (stepTrue) {
                this.gonextOne()
            } else {
                this['$confirm']('是否对上一条数据进行保存', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '不保存',
                    type: 'warning'
                }).then(() => {
                    this.Editcommit('addfile', this.gonextOne);
                }).catch(() => {
                    this.gonextOne();
                });
            };
        };

        //前往下一页
        gonextOne() {
            if (this.activeName == 'first') {
                var len = this.fileList.length;
                if (this.OrderNum < len - 1) {
                    this.OrderNum += 1;
                    var ID = this.fileList[this.OrderNum].id
                    this.getReDactNumber({libId: this.rankId_one, id: ID})
                    this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);
                } else {
                    this.page += 1;
                    var num = this.total / this.limit;
                    num = Math.ceil(num)
                    if (this.page <= num) {
                        this.OrderNum = 0;
                        // this.getListNumber({
                        //     kindId: this.kinId,
                        //     fondId: this.parentId,
                        //     conditions: this.searchContent,
                        //     pageCondition: {page: this.page, pageSize: this.limit, sort: ""}
                        // });
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }else{
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }
                        setTimeout(() => {
                            var ID = this.fileList[this.OrderNum].id
                            this.getReDactNumber({libId: this.rankId_one, id: ID})
                            this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);
                        }, 1000)
                    } else {
                        this.page -= 1;
                        this.Warn("已经是最后一条数据。");
                    }
                };
            };
        };

        //编辑之后的提交
        Editcommit(form, cb) {
            this['$refs'][form]['validate']((valid) => {
                if (valid) {
                    var DhName = 0;
                    for (var key in this.addfile) {
                        if (this.EditArr[key] != this.addfile[key]) {
                            this.EditArr[key] = this.addfile[key];
                            for (var ind of this.addArray) {
                                if (ind['fieldName'] == key && ind['isArcNoField']) {
                                    DhName = 1;
                                };
                            };
                        };
                    };
                    this.EditArr.rowStatus = 2;
                    var obj = {
                        fondId: this.parentId,
                        libId: this.rankId_one,
                        data: this.EditArr
                    };
                    if (DhName == 1) {
                        this['$confirm']('是否要重新生成档号', '提示', {
                            confirmButtonText: '生成',
                            cancelButtonText: '不生成',
                            type: 'warning'
                        }).then(() => {
                            obj['recomputeDh'] = true;
                            this.SaveFile(obj);
                            if (cb) {
                                cb()
                            }
                        }).catch(() => {
                            obj['recomputeDh'] = false;
                            this.SaveFile(obj);
                            if (cb) {
                                cb()
                            }
                        });
                    } else {
                        this.SaveFile(obj);
                        if (cb) {
                            cb();
                        }
                    }
                    ;
                } else {
                    this.getError("请完善数据。")
                }
            })
        };

        SaveFile(parmas) {
            this.loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在保存，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.SaveFile(parmas).then(res => {
                if (res.data.succeeded) {
                    let data = res.data.data;
                    let str = JSON.stringify(res.data.data);
                    for (var item of this.fileList) {
                        if (item.id == data.id) {
                            for (var key in data) {
                                item[key] = data[key];
                            };
                        };
                    };
                    this.EditArr = JSON.parse(str);
                    for(var key in this.addfile){
                        if(key in data){
                            this.addfile[key] = data[key]
                        }
                    }
                   // this.addfile = res.data.data;
                    // this.QZHArr = [];
                    // var str = JSON.stringify(res.data.data);
                    // this.EditArr=JSON.parse(str);
                    // this.QZHArr.push({value:res.data.data.QZH})
                    // if(res.data.data.QZH!=res.data.data.DQQZH){
                    //     this.QZHArr.push({value:res.data.data.DQQZH})
                    // }
                    this.Suces('保存成功。');
                    // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                } else {
                    this.getError(res.data.errorMessage)
                }
                this.$nextTick(() => {
                    this.loadingInstance.close();
                });
            })
        }

        //拆卷
        UnmergeUrl(): void {
            if (this.selection.length > 0) {
                var arr = [];
                for (var item of this.selection) {
                    arr.push(item.id)
                }
                ;
                var obj = {
                    kindId: this.kinId,
                    anJuanIds: arr
                }
                this['$confirm']('您确定要拆开所选文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Service.UnmergeUrl(obj).then(res => {
                        if (res.data.succeeded) {
                            this.Suces("成功。");
                            // this.getListNumber({
                            //     kindId: this.kinId,
                            //     fondId: this.parentId,
                            //     conditions: this.searchContent,
                            //     pageCondition: {page: this.page, pageSize: this.limit, sort: ""}
                            // });
                            if(this.sortName1&&this.TypeChangeValue1){
                                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                            }else{
                                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                            }
                            // this.getUnarrangedFile({
                            //     kindId: this.kinId,
                            //     fondId: this.parentId,
                            //     conditions: this.searchContent1,
                            //     pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}
                            // });
                            if(this.sortName2&&this.TypeChangeValue2){
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }else{
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }
                        } else {
                            this.getError(res.data.errorMessage);
                        }
                        ;
                    });
                }).catch(() => {
                    this['$message']({
                        type: 'info',
                        message: '已取消拆卷'
                    });
                });
            } else {
                this.Warn('请选择文件。');
            }
            ;
        };

        //取得可批量修改的字段
        getBatchModifiableFields(params) {
            this.form = {region: null, replaceValue: null, replaceTo: ''};
            this.Addrform = {region: null, startNumber: null, endNumber: null, replaceTo: ''};
            this.combineform = {itemA: null, connectSign: null, itemB: null, concatTo: null};
            if (this.selection.length > 0 && this.activeName == 'first' || this.selection1.length > 0 && this.activeName == 'second' || this.selection2.length > 0 && this.activeName == 'third' || this.selection3.length > 0 && this.activeName == 'four') {
                Service.getBatchModifiableFields(params).then(res => {
                    if (res.data.succeeded) {
                        var data = JSON.stringify(res.data.data)
                        this.formArr = JSON.parse(data);
                        this.addArr = JSON.parse(data);
                        this.repalceMany = true;
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                })
            } else {
                this.Warn("请选择要修改的文件。")
            }
        };

        //按内容替换著录项发生改变
        elSelectChange(data) {
            this.form.replaceValue = null;
            this.form.replaceTo = '';
            for (var item of this.formArr) {
                if (item.fieldName == data) {
                    if (item.dictData) {
                        this.formSelectArr = [];
                        this.formSelectArr = item.dictData;
                        this.ElSelectTrue = false;
                    } else if (item.fieldName == 'XMBH' && this.isProjectCompany) {
                        this.ElSelectTrue = false;
                        Service.findByFond({}).then(res => {
                            if (res.data.succeeded) {
                                this.formSelectArr = [];
                                this.storeArr = [];
                                this.storeArr = res.data.data;
                                var str = JSON.stringify(res.data.data);
                                var data = JSON.parse(str);
                                for (var item of data) {
                                    this.formSelectArr.push({text: item.projectCode, code: item.projectCode})
                                }
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                        })
                    } else if (item.fieldName == 'XMMCNEW' && this.isProjectCompany) {
                        this.ElSelectTrue = false;
                        Service.findByFond({}).then(res => {
                            if (res.data.succeeded) {
                                this.formSelectArr = [];
                                this.storeArr = [];
                                this.storeArr = res.data.data;
                                var str = JSON.stringify(res.data.data);
                                var data = JSON.parse(str);
                                for (var item of data) {
                                    this.formSelectArr.push({text: item.projectName, code: item.projectCode})
                                }
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                            ;
                        });
                    } else {
                        this.ElSelectTrue = true;
                    }
                }
                ;
            }
            ;
        };

        //保存替换
        SaveReplace() {
            if (this.selection.length > 0 || this.selection1.length > 0 || this.selection2.length > 0 || this.selection3.length > 0) {
                var arr = [];
                if (this.activeName == 'first') {
                    for (var item of this.selection) {
                        arr.push(item.id);
                    }
                    ;
                } else if (this.activeName == 'second') {
                    for (var item of this.selection1) {
                        arr.push(item.id);
                    }
                    ;
                } else if (this.activeName == 'third') {
                    for (var item of this.selection2) {
                        arr.push(item.id);
                    }
                    ;
                } else {
                    for (var item of this.selection3) {
                        arr.push(item.id);
                    }
                    ;
                }
                ;
                if (this.activenames == 'one')  {
                    if(this.form.region!=null){
                            if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                // var replaceValue1 = '';
                                // var replaceTo1 = '';
                                // for (var ind of this.storeArr) {
                                //     if (this.form.replaceValue == ind.projectCode) {
                                //         this.form.replaceValue = ind.projectCode;
                                //         replaceValue1 = ind.projectName;
                                //     }
                                //     ;
                                // }
                                // ;
                                for (var ind1 of this.storeArr) {
                                    if (ind1.projectCode == this.form.replaceTo) {
                                        this.form.replaceTo = ind1.projectCode;
                                        // replaceTo1 = ind1.projectName;
                                    };
                                }
                                ;
                                var obj = {
                                    ids: arr,
                                    mode: 1,
                                    fieldName: this.form.region,
                                    replaceSrc: this.form.replaceValue,
                                    replaceWith: this.form.replaceTo
                                };
                                // var obj1 = {
                                //     ids: arr,
                                //     mode: 1,
                                //     fieldName: 'XMMCNEW',
                                //     replaceSrc: replaceValue1,
                                //     replaceWith: replaceTo1
                                // }
                            } else if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                // var replaceValue2 = '';
                                // var replaceTo2 = '';
                                // for (var ind of this.storeArr) {
                                //     if (this.form.replaceValue == ind.projectCode) {
                                //         this.form.replaceValue = ind.projectName;
                                //         replaceValue2 = ind.projectCode;
                                //     }
                                //     ;
                                // }
                                // ;
                                for (var ind1 of this.storeArr) {
                                    if (ind1.projectCode == this.form.replaceTo) {
                                        this.form.replaceTo = ind1.projectName;
                                        // replaceTo2 = ind1.projectCode;
                                    }
                                    ;
                                }
                                ;
                                var obj = {
                                    ids: arr,
                                    mode: 1,
                                    fieldName: this.form.region,
                                    replaceSrc: this.form.replaceValue,
                                    replaceWith: this.form.replaceTo
                                };
                                // var obj1 = {
                                //     ids: arr,
                                //     mode: 1,
                                //     fieldName: 'XMBH',
                                //     replaceSrc: replaceValue2,
                                //     replaceWith: replaceTo2
                                // };
                            } else {
                                var obj = {
                                    ids: arr,
                                    mode: 1,
                                    fieldName: this.form.region,
                                    replaceSrc: this.form.replaceValue,
                                    replaceWith: this.form.replaceTo
                                };
                            }
                            ;
                            if (this.activeName == "first") {
                                // if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                //     obj1['libId'] = this.rankId_one;
                                // }
                                // if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                //     obj1['libId'] = this.rankId_one;
                                // }
                                obj['libId'] = this.rankId_one;
                            } else if (this.activeName == "second" || this.activeName == "third") {
                                // if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                //     obj1['libId'] = this.rankId_two;
                                // }
                                // if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                //     obj1['libId'] = this.rankId_two;
                                // }
                                obj['libId'] = this.rankId_two;
                            } else if (this.activeName == "four") {
                                // if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                //     obj1['libId'] = this.rankId_thr;
                                // }
                                // if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                //     obj1['libId'] = this.rankId_thr;
                                // }
                                obj['libId'] = this.rankId_thr;
                            }
                            var DhName = 0;
                            for (var ind of this.formArr) {
                                if (ind['fieldName'] == this.form.region && ind['isArcNoField']) {
                                    DhName = 1;
                                }
                            }
                            if (DhName == 1) {
                                this['$confirm']('是否生成新档号', '提示', {
                                    confirmButtonText: '生成',
                                    cancelButtonText: '不生成',
                                    type: 'warning'
                                }).then(() => {
                                    obj['recomputeDh'] = true;
                                    if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                        // Service.BatchModify(obj1).then(res => {
                                        //     if (res.data.succeeded) {
                                                this.BatchModify(obj);
                                        //     } else {
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    } else if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                        // Service.BatchModify(obj1).then(res => {
                                        //     if (res.data.succeeded) {
                                                this.BatchModify(obj);
                                        //     } else {
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    } else {
                                        this.BatchModify(obj);
                                    };
                                }).catch(() => {
                                    obj['recomputeDh'] = false;
                                    if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                        // Service.BatchModify(obj1).then(res => {
                                        //     if (res.data.succeeded) {
                                                this.BatchModify(obj);
                                        //     } else {
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    } else if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                        // Service.BatchModify(obj1).then(res => {
                                        //     if (res.data.succeeded) {
                                                this.BatchModify(obj);
                                        //     } else {
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    } else {
                                        this.BatchModify(obj);
                                    };
                                });
                            } else {
                                if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                    // Service.BatchModify(obj1).then(res => {
                                    //     if (res.data.succeeded) {
                                            this.BatchModify(obj);
                                    //     } else {
                                    //         this.Warn(res.data.errorMessage)
                                    //     }
                                    // })
                                } else if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                    // Service.BatchModify(obj1).then(res => {
                                    //     if (res.data.succeeded) {
                                            this.BatchModify(obj);
                                    //     } else {
                                    //         this.Warn(res.data.errorMessage)
                                    //     }
                                    // })
                                } else {
                                    this.BatchModify(obj);
                                };
                            };
                    }else{
                        this.Warn('请选择著录项。');
                    };
                } else if (this.activenames == 'two') {
                    if(this.Addrform.region!=null){
                        if(this.Addrform.startNumber!=''&&this.Addrform.startNumber!=null){
                            if(this.Addrform.endNumber!=''&&this.Addrform.endNumber!=null){
                                var objs = {
                                    ids: arr,
                                    mode: 2,
                                    fieldName: this.Addrform.region,
                                    replaceStartPos: this.Addrform.startNumber,
                                    replaceEndPos: this.Addrform.endNumber,
                                    replaceWith: this.Addrform.replaceTo
                                }
                                if (this.activeName == "first") {
                                    objs['libId'] = this.rankId_one;
                                } else if (this.activeName == "second" || this.activeName == "third") {
                                    objs['libId'] = this.rankId_two;
                                } else if (this.activeName == "four") {
                                    objs['libId'] = this.rankId_thr;
                                }
                                ;
                                var DhName = 0;
                                for (var ind of this.addArr) {
                                    if (ind['fieldName'] == this.Addrform.region && ind['isArcNoField']) {
                                        DhName = 1;
                                    }
                                }
                                if (DhName == 1) {
                                    this['$confirm']('是否生成新档号', '提示', {
                                        confirmButtonText: '生成',
                                        cancelButtonText: '不生成',
                                        type: 'warning'
                                    }).then(() => {
                                        objs['recomputeDh'] = true;
                                        this.BatchModify(objs);
                                    }).catch(() => {
                                        objs['recomputeDh'] = false;
                                        this.BatchModify(objs);
                                    });
                                } else {
                                    this.BatchModify(objs);
                                }
                            }else{
                                this.Warn('请填写结束位置。')
                            }
                        }else{
                            this.Warn('请填写起始位置。')
                        }
                    }else{
                        this.Warn('请选择著录项。')
                    }
                } else if (this.activenames == 'three') {
                    if(this.combineform.itemA!=null){
                        if(this.combineform.connectSign!=''&&this.combineform.connectSign!=null){
                            if(this.combineform.itemB!=null){
                                if( this.combineform.concatTo!=null){
                                    var objss = {
                                        ids: arr,
                                        mode: 3,
                                        fieldName: this.combineform.itemA,
                                        connector: this.combineform.connectSign,
                                        fieldName2: this.combineform.itemB,
                                        targetFieldName: this.combineform.concatTo
                                    }
                                    if (this.activeName == 'first') {
                                        objss['libId'] = this.rankId_one;
                                    } else if (this.activeName == 'second' || this.activeName == 'third') {
                                        objss['libId'] = this.rankId_two;
                                    }
                                    if (this.activeName == 'four') {
                                        objss['libId'] = this.rankId_thr;
                                    }
                                    ;
                                    var DhName = 0;
                                    for (var ind of this.formArr) {
                                        if (ind['fieldName'] == this.combineform.concatTo && ind['isArcNoField']) {
                                            DhName = 1;
                                        }
                                    }
                                    ;
                                    if (DhName == 1) {
                                        this['$confirm']('是否生成新档号', '提示', {
                                            confirmButtonText: '生成',
                                            cancelButtonText: '不生成',
                                            type: 'warning'
                                        }).then(() => {
                                            objss['recomputeDh'] = true;
                                            this.BatchModify(objss);
                                        }).catch(() => {
                                            objss['recomputeDh'] = false;
                                            this.BatchModify(objss);
                                        });
                                    } else {
                                        this.BatchModify(objss);
                                    }
                                }else{
                                    this.Warn('请选择目标著录项。');
                                }
                            }else{
                                this.Warn('请选择著录项B。');
                            }
                        }else{
                            this.Warn('请填写连接符。');
                        }
                    }else{
                        this.Warn('请选择著录项A。');
                    }
                };
            } else {
                this.Warn("请选择要修改的数据。")
            }
        };

        BatchModify(params) {
            this.loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在保存，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.BatchModify(params).then(res => {
                if (res.data.succeeded) {
                    this.Suces("成功");
                    this.repalceMany = false;
                    if (this.activeName == "first") {
                        // this.getListNumber({
                        //     kindId: this.kinId,
                        //     fondId: this.parentId,
                        //     conditions: this.searchContent,
                        //     pageCondition: {page: this.page, pageSize: this.limit, sort: ""}
                        // });
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }else{
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                        }
                    } else if (this.activeName == "second") {
                        // this.getUnarrangedFile({
                        //     kindId: this.kinId,
                        //     fondId: this.parentId,
                        //     conditions: this.searchContent1,
                        //     pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}
                        // });
                        if(this.sortName2&&this.TypeChangeValue2){
                            this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                        }else{
                            this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                        }
                    } else if (this.activeName == "third") {
                        // this.getInfilePapers({
                        //     kindId: this.kinId,
                        //     fondId: this.parentId,
                        //     conditions: this.searchContent2,
                        //     pageCondition: {page: this.page2, pageSize: this.limit2, sort: ""}
                        // });
                        if(this.sortName3&&this.TypeChangeValue3){
                            this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:this.page2, pageSize: this.limit2, sort: this.sortStr3}});
                        }else{
                            this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,pageCondition: {page: this.page2, pageSize: this.limit2, sort: this.sortStr3}});
                        }
                    } else if (this.activeName == "four") {
                        // this.WenjianSearch({
                        //     kindId: this.kinId,
                        //     fondId: this.parentId,
                        //     conditions: this.searchContent3,
                        //     pageCondition: {page: this.page3, pageSize: this.limit3, sort: ""}
                        // });
                        if(this.sortName4&&this.TypeChangeValue4){
                            this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                        }else{
                            this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                        }
                    }
                } else {
                    this.getError(res.data.errorMessage);
                }
                this.$nextTick(() => {
                    this.loadingInstance.close();
                });
            });
        };

        //删除
        BatchDelete(): void {
            if (this.activeName == 'first') {
                if (this.selection.length > 0) {
                    var arr = [];
                    for (var item of this.selection) {
                        arr.push(item.id)
                    }
                    ;
                    var obj = {
                        ids: arr,
                        libId: this.rankId_one
                    };
                    this['$confirm']('您是否要删除所选文件及其卷内文件?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.BatchDelete(obj).then(res => {
                            if (res.data.succeeded) {
                                this.Suces("删除成功");
                                if (this.selection.length == this.fileList.length) {
                                    var num = Math.ceil(this.total / this.limit)
                                    if (this.page == num && this.page > 1) {
                                        this.page -= 1;
                                    }
                                }
                                // this.getListNumber({
                                //     kindId: this.kinId,
                                //     fondId: this.parentId,
                                //     conditions: this.searchContent,
                                //     pageCondition: {page: this.page, pageSize: this.limit, sort: ""}
                                // });
                                if(this.sortName1&&this.TypeChangeValue1){
                                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                                }else{
                                    this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                                }
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.Warn('请选择要删除的文件。')
                }
            } else if (this.activeName == 'second') {
                if (this.selection1.length > 0) {
                    var arr = [];
                    for (var item of this.selection1) {
                        arr.push(item.id)
                    }
                    ;
                    var obj = {
                        ids: arr,
                        libId: this.rankId_two
                    };
                    this['$confirm']('您是否要删除所选文件?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.BatchDelete(obj).then(res => {
                            if (res.data.succeeded) {
                                this.Suces("删除成功");
                                if (this.selection1.length == this.juanneiArr.length) {
                                    var num = Math.ceil(this.total1 / this.limit1)
                                    if (this.page1 == num && this.page1 > 1) {
                                        this.page1 -= 1;
                                    }
                                }
                                // this.getUnarrangedFile({
                                //     kindId: this.kinId,
                                //     fondId: this.parentId,
                                //     conditions: this.searchContent1,
                                //     pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}
                                // });
                                if(this.sortName2&&this.TypeChangeValue2){
                                    this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                                }else{
                                    this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                                }
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.Warn('请选择要删除的文件。')
                }
            } else if (this.activeName == 'four') {
                if (this.selection3.length > 0) {
                    var arr = [];
                    for (var item of this.selection3) {
                        arr.push(item.id)
                    }
                    ;
                    var obj = {
                        ids: arr,
                        libId: this.rankId_thr
                    };
                    this['$confirm']('您是否要删除所选文件', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.BatchDelete(obj).then(res => {
                            if (res.data.succeeded) {
                                this.Suces("删除成功");
                                if (this.selection3.length == this.wenjianArr.length) {
                                    var num = Math.ceil(this.total3 / this.limit3)
                                    if (this.page3 == num && this.page3 > 1) {
                                        this.page3 -= 1;
                                    }
                                }
                                // this.WenjianSearch({
                                //     kindId: this.kinId,
                                //     fondId: this.parentId,
                                //     conditions: this.searchContent3,
                                //     pageCondition: {page: this.page3, pageSize: this.limit3, sort: ""}
                                // });
                                if(this.sortName4&&this.TypeChangeValue4){
                                    this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                                }else{
                                    this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                                }
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.Warn('请选择要删除的文件。')
                }
            }
            // // if(this.selection.length>0){
            // //     var arr=[];
            // //     for(var item of this.selection1){
            // //         arr.push(item.id)
            // //     };
            // //     var obj={
            // //         ids:arr,
            // //         libId:this.rankId_two
            // //     }
            // //     if(this.activeName=="first"){
            // //        obj['libId']=this.rankId_one;
            // //     }else{
            // //       obj['libId']=this.rankId_two
            // //     }
            //     Service.BatchDelete(obj).then(res=>{
            //         if(res.data.succeeded){
            //            this.Suces("删除成功");
            //            if(this.activeName=='first'){
            //                this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
            //            }else{
            //                this.getUnarrangedFile({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent1,pageCondition:{start:0, pageSize:10,sort:""}});
            //            }
            //         }else{
            //             this.getError(res.data.errorMessage)
            //         }
            //         console.log(res,66565656565656)
            //     })
            // }else{
            //     this.Warn('请选择要删除的文件')
            // }
        };

        // 模板打印
        modelPrint() {
            if (this.activeName === 'first') {
                let one = this.rankId_one.toString();
                if (this.selection.length > 0) {
                    var arr = [];
                    for (let item of this.selection) {
                        arr.push(item)
                    }
                    window.sessionStorage.setItem('rank', one);
                    window.sessionStorage.setItem('printArray', JSON.stringify(arr));
                    window.sessionStorage.setItem('printArray1',JSON.stringify(arr));
                    window.sessionStorage.setItem('typePrint', '1');
                    this['$router'].push({path: '/fileArrange/fileManagement/modelPrint'});
                } else {
                    this.Warn("请选择要打印的文件。")
                }
            } else {
                let thr = this.rankId_thr.toString();
                if (this.selection3.length > 0) {
                    var arr = [];
                    for (let item of this.selection3) {
                        arr.push(item)
                    }
                    window.sessionStorage.setItem('rank', thr);
                    window.sessionStorage.setItem('printArray', JSON.stringify(arr));
                    window.sessionStorage.setItem('printArray1',JSON.stringify(arr));
                    window.sessionStorage.setItem('typePrint', '1');
                    this['$router'].push({path: '/fileArrange/fileManagement/modelPrint'});
                } else {
                    this.Warn("请选择要打印的文件。")
                }
            }
        }

        //数据模板下载
        loadNumberModel() {
            this.NumberModelTrue = true;
        };

        LoadingNumberModelOne() {
            this.NumberModelTrue = false;
            this.checkNumberModel = 'xls'
        };

        LoadingNumberModelTwo() {
            this.NumberModelTrue = false;
            var str = encodeURIComponent(this.storeName);
            if (this.activeName == 'first') {
                this.DownLoadTemps({
                    libId: this.rankId_one,
                    type: this.checkNumberModel,
                    name: this.storeName,
                    rank: 3,
                    phase: 1,
                    fondId: this.parentId
                })
                // window.location.href = this.Url+'/dataImporter/downLoadTemp?libId='+this.rankId_one+'&type='+this.checkNumberModel+'&name='+str+'&rank=3'+'&phase='+1+'&fondId='+this.parentId;
            } else if (this.activeName == 'second') {
                this.DownLoadTemps({
                    libId: this.rankId_two,
                    type: this.checkNumberModel,
                    name: this.storeName,
                    rank: 4,
                    phase: 1,
                    fondId: this.parentId
                })

                // window.location.href = this.Url+'/dataImporter/downLoadTemp?libId='+this.rankId_two+'&type='+this.checkNumberModel+'&name='+str+'&rank=4'+'&phase='+1+'&fondId='+this.parentId;
            } else {
                this.DownLoadTemps({
                    libId: this.rankId_thr,
                    type: this.checkNumberModel,
                    name: this.storeName,
                    rank: 4,
                    phase: 1,
                    fondId: this.parentId
                })

                // window.location.href = this.Url+'/dataImporter/downLoadTemp?libId='+this.rankId_thr+'&type='+this.checkNumberModel+'&name='+str+'&rank=4'+'&phase='+1+'&fondId='+this.parentId;
            }
        };

        //数据模板下载
        DownLoadTemps(params) {
            let loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在导出，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            var name = params['name'];
            if (params['rank'] === 4) {
                name = params['name'] + '-文件';
            } else {
                name = params['name'] + '-案卷';
            }
            // params['name']=encodeURIComponent(params['name']);
            Service.DownLoadTemps(params).then(res => {
                if (res) {
                    if (res['type'] == 'application/json') {
                        this.getError('下载模板有误，请联系管理员！');
                    } else {
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            window.navigator.msSaveOrOpenBlob(csvData, name + '.' + params['type']);
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            link.setAttribute('download', name + '.' + params['type']);
                            document.body.appendChild(link);
                            link.click();
                        };
                    }
                }
                this.$nextTick(() => {
                    loadingInstance.close();
                })
            })
        }

        //导入数据
        importNumber() {
            this.commitDialogTrue = true;
            this.sheetNumberTrue = false;
            this.sheetAll = [];
            this.sheetSelc = 0;
            if (this['$refs']['upload']) {
                this['$refs'].upload['clearFiles']()
            }
        };

        //导入数据取消文件选择
        ConcelCommitNumber() {
            this.commitDialogTrue = false;
        };
         //移除文件的钩子
        uploadOnRemove(){
            this.sheetNumberTrue = false;
            this.sheetAll = [];
            this.sheetSelc = 0;
        }
        //导入数据选定文件
        BeforeUpload(file) {
            var num = file.name.lastIndexOf('.');
            num = -num;
            var str = file.name.substr(-num);
            if (str.toLowerCase() == '.' + this.checkNumberModels) {
                if (this.activeName == 'first') {
                    var ID = this.rankId_one + '';
                } else if (this.activeName == 'second') {
                    var ID = this.rankId_two + '';
                } else if (this.activeName == 'four') {
                    var ID = this.rankId_thr + '';
                }
                var Form = new FormData();
                Form.append('file', file);
                Form.append('libId', ID);
                Form.append('phase', '1');
                Form.append('fondCode', this.fondCode);
                Form.append('type', this.checkNumberModels);
                Form.append('sheetIndex',this.sheetSelc.toString())
                var name = encodeURIComponent(this.storeName);
                Form.append('nodeName', name);
                this.loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在上传中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                Service.DataImportXL(Form).then(res => {
                    if (res.data.succeeded) {
                        this.commitDialogTrue = false;
                        if (this.activeName == 'first') {
                            if(this.sortName1&&this.TypeChangeValue1){
                                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                            }else{
                                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                            }
                        } else if (this.activeName == 'second') {
                            if(this.sortName2&&this.TypeChangeValue2){
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }else{
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }
                        } else if (this.activeName == 'four') {
                            if(this.sortName4&&this.TypeChangeValue4){
                                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                            }else{
                                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                            }
                        }
                        // this.sheetNumberTrue = true;
                        // this.sheetAll = res.data.data;
                        // this.sheetSelc =0;
                        // this.UpLoadfileList=[file];
                    } else {
                        this.commitDialogTrue = false;
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '',
                            showCancelButton: false,
                            type: 'error',
                            center:true
                        });
                    };
                    this.$nextTick(() => {
                        this.loadingInstance.close();
                    })
                });
                return file;
            } else {
                this.commitDialogTrue = false;
                this['$confirm']('请选择对应格式的文件进行上传', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '',
                    showCancelButton: false,
                    type: 'warning',
                    center:true
                });
            }
        }

        ConfirmCommitNumber() {
            var File = document.getElementsByClassName('el-upload__input')[0]['files'];
            if (File.length == 0) {
                this.Warn('请选择导入的文件。')
            } else {
                this['$refs'].upload['submit']();
            }
        };
        Confirmsheet(){
            if(this.sheetSelc!=null){
                var arr = [];
                arr.push(this.sheetSelc);
                this.loadingInstance = Loading.service(
                    {
                        lock: true,
                        text: '正在保存中，请稍候',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    }
                );
                var str = JSON.stringify(arr);
                Service.DataImportXL(str).then(res=>{
                    if(res.data.succeeded){
                        this.Suces("导入成功");
                        this.commitDialogTrue = false;
                        this.sheetSelc = 0;
                        this.sheetAll = [];
                        this.sheetNumberTrue = false;
                        if (this.activeName == 'first') {
                            if(this.sortName1&&this.TypeChangeValue1){
                                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: this.sortStr1}});
                            }else{
                                this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: this.sortStr1}});
                            }
                        } else if (this.activeName == 'second') {
                            if(this.sortName2&&this.TypeChangeValue2){
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }else{
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }
                        } else if (this.activeName == 'four') {
                            if(this.sortName4&&this.TypeChangeValue4){
                                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                            }else{
                                this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: this.sortStr4}});
                            }
                        }
                    }else{
                        this.commitDialogTrue = false;
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '',
                            showCancelButton: false,
                            type: 'error',
                            center:true
                        });
                    }
                    this.$nextTick(() => {
                        this.loadingInstance.close();
                    })
                })
            }else{
                this.Warn('请选择sheet表');
            }
        };
        deletesheet(){
            this.sheetNumberTrue = false;
            this.sheetAll = [];
            this.sheetSelc = null;
        }
        //所选文件发生变化时的钩子

         //读取文件
        excelChange(file){
                this.sheetNumberTrue = false;
                this.sheetAll = [];
                var that = this;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = ev.target['result'];
                        if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                            var exceltype = 'buffer';
                        }else{
                            var exceltype = 'binary';
                        }
                        const workbook = XLSX.read(data, {
                            type: exceltype
                        });
                        const sheetarr = workbook.SheetNames;
                        for(var key in sheetarr){
                            that.sheetAll.push({value:sheetarr[key],key:key/1});
                        }
                        that.$nextTick(()=>{
                            this.sheetNumberTrue = true;
                            that.sheetSelc = 0;
                        });
                    } catch (e) {
                        return false;
                    }
                };
             if(window.navigator&&window.navigator.msSaveOrOpenBlob){
                 reader.readAsArrayBuffer(file.raw);
             }else{
                reader.readAsBinaryString(file.raw);
            }
        }
        //  arrayBufferToString(buffer) {
        //     var array = new Uint8Array(buffer);
        //     return binaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(array)));
        // }
        //导出数据
        exportNumber() {
            if (this.activeName == 'first' && this.selection.length > 0) {
                this.exportNumTrue = true;
            } else if (this.activeName == 'second' && this.selection1.length > 0) {
                this.exportNumTrue = true;
            } else if (this.activeName == 'third' && this.selection2.length > 0) {
                this.exportNumTrue = true;
                this.exportcontent = '5';
            } else if (this.activeName == 'four' && this.selection3.length > 0) {
                this.exportNumTrue = true;
            } else {
                this.Warn('请选择你要导出的数据。')
            }
            ;
        };

        //选取的文件超出个数时的钩子
        Onexceed(files, fileList) {
            this.Warn("你每次只能上传一个文件。")
        }

        //调整顺序号
        GoadjustOrder() {
            if (this.activeName == 'first') {
                if (this.selection.length > 1) {
                    this.Warn("您只能选择一条数据。")
                } else if (this.selection.length < 1) {
                    this.Warn("请选择数据。")
                } else {
                    var obj = {
                        lib: this.rankId_one,
                        fond: this.parentId,
                        id: this.selection[0].id,
                        active: 1
                    }
                    window.sessionStorage.setItem('adjustorder', JSON.stringify(obj))
                    this['$router'].push({
                        path: "/fileArrange/fileManagement/adjustorder"
                    })
                }
                ;
            } else if (this.activeName == 'four') {
                if (this.selection3.length > 1) {
                    this.Warn("您只能选择一条数据。")
                } else if (this.selection3.length < 1) {
                    this.Warn("请选择数据。")
                } else {
                    var obj = {
                        lib: this.rankId_thr,
                        fond: this.parentId,
                        id: this.selection3[0].id,
                        active: 2
                    }
                    window.sessionStorage.setItem('adjustorder', JSON.stringify(obj))
                    this['$router'].push({
                        path: "/fileArrange/fileManagement/adjustorder"
                    });
                }
                ;
            }
            ;
        };

        //生成档号
        shengchengDH() {
            if (this.activeName == 'first') {
                if (this.selection.length > 0) {
                    var arr = [];
                    for(var item of this.fileList){
                        for(var son of this.selection){
                            if(item.id==son.id){
                                arr.push(item.id)
                            }
                        }
                    }
                    // for (var ind of this.selection) {
                    //     arr.push(ind.id)
                    // }
                    // ;
                    this['$confirm']('您是否要保存并生成档号?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // this['$confirm']('是否重新生成卷内文件的档号?', '提示', {
                        //     confirmButtonText: '生成',
                        //     cancelButtonText: '不生成',
                        //     type: 'warning'
                        // }).then(() => {
                            this.generateDHs({libId: this.rankId_one, archiveIds: arr, processJuanNei: true});
                        // }).catch(() => {
                        //     this.generateDHs({libId: this.rankId_one, archiveIds: arr, processJuanNei: false})
                        // })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消'
                        });
                    })
                } else {
                    this.Warn('请选择数据')
                }
            } else if (this.activeName == 'four') {
                if (this.selection3.length > 0) {
                    var arr = [];
                    for(var item of this.wenjianArr){
                        for(var son of this.selection3){
                            if(item.id==son.id){
                                arr.push(item.id);
                            };
                        };
                    };
                    // for (var ind of this.selection3) {
                    //     arr.push(ind.id)
                    // };
                    this['$confirm']('您是否要保存并生成档号?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.generateDHs({libId: this.rankId_thr, archiveIds: arr});
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消'
                        });
                    })
                } else {
                    this.Warn('请选择数据')
                }
            }
        }

        generateDHs(params) {
            Service.generateDHs(params).then(res => {
                if (res.data.succeeded) {
                    this.Suces("成功");
                    let data = res.data.data;
                    if (this.activeName == 'first') {
                        // var srcstr = JSON.stringify(this.fileList);
                        // var srcArr = JSON.parse(srcstr);
                        for (let item of  this.fileList) {
                            for (let ind of data) {
                                if (ind.id == item.id) {
                                    for (let key in item) {
                                        if (ind[key]) {
                                            item[key] = ind[key];
                                        };
                                    };
                                };
                            };
                        };
                        // this.fileList = srcArr;
                        // console.log(this.fileList)
                    } else if (this.activeName == 'four') {
                        // var srcstr = JSON.stringify(this.wenjianArr);
                        // var srcArr = JSON.parse(srcstr);
                        for (var item of this.wenjianArr) {
                            for (var ind of data) {
                                if (ind.id == item.id) {
                                    for (var key in item) {
                                        if (ind[key]) {
                                            item[key] = ind[key];
                                        };
                                    };
                                };
                            };
                        };
                        //this.wenjianArr=srcArr;
                    };
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        }

        //档号筛查
        goCheck(): void {
            if (this.activeName == 'first') {
                if (this.searchContent.length > 0) {
                    var obj = {kind: this.kinId, fond: this.parentId, search: this.searchContent, type: 1};
                    window.sessionStorage.setItem('check', JSON.stringify(obj))
                    this['$router'].push({
                        path: '/fileArrange/fileManagement/check',
                        // query: {kind: this.kinId, fond: this.parentId, search: str,type:1}
                    });
                } else {
                    var objs = {kind: this.kinId, fond: this.parentId, type: 1};
                    window.sessionStorage.setItem('check', JSON.stringify(objs))
                    this['$router'].push({
                        path: '/fileArrange/fileManagement/check'
                        // query: {kind: this.kinId, fond: this.parentId,type:1}
                    });
                }
                ;
            } else {
                if (this.searchContent3.length > 0) {
                    // var str = JSON.stringify(this.searchContent3);
                    var obj = {kind: this.kinId, fond: this.parentId, search: this.searchContent3, type: 2};
                    window.sessionStorage.setItem('check', JSON.stringify(obj))
                    this['$router'].push({
                        path: '/fileArrange/fileManagement/check',
                        // query: {kind: this.kinId, fond: this.parentId, search: str,type:2}
                    });
                } else {
                    var objs = {kind: this.kinId, fond: this.parentId, type: 2};
                    window.sessionStorage.setItem('check', JSON.stringify(objs))
                    this['$router'].push({
                        path: '/fileArrange/fileManagement/check'
                        // query: {kind: this.kinId, fond: this.parentId,type:2}
                    });
                }
                ;
            }
        };

        //未整理文件***************************************************************************

        //未整理文件的删除
        //组新卷
        combinenewfile() {
            if (this.selection1.length > 0) {
                var arr = [];
                for (var son of this.selection1) {
                    arr.push(son.id)
                }
                Service.checkBeforeMergeWenJians({wenJianLibId: this.rankId_two, wenJianIds: arr}).then(res => {
                    if (res.data.succeeded) {
                        var str = this.selection1;
                        window.sessionStorage.setItem('CombineFile', JSON.stringify(str));
                        var obj = {
                            lib: this.rankId_one,
                            QZH: this.fondCode,
                            parentId: this.parentId,
                            kind: this.kinId,
                            wenId: this.rankId_two,
                            isProjectCompany: this.isProjectCompany,
                            value: res.data.data
                        };
                        window.sessionStorage.setItem('combineNewFile', JSON.stringify(obj));
                        this['$router'].push({path: '/fileArrange/fileManagement/combineNewFile',});
                    } else {
                        // this.getError(res.data.errorMessage)
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '不保存',
                            showCancelButton: false,
                            type: 'warning',
                            center: true
                        });
                    }
                });
                // var str = this.selection1
                // window.sessionStorage.setItem('CombineFile',JSON.stringify(str));
                // var obj = {
                //     lib:this.rankId_one,
                //     QZH:this.fondCode,
                //     parentId:this.parentId,
                //     kind:this.kinId,
                //     wenId:this.rankId_two,
                //     isProjectCompany:this.isProjectCompany
                // };
                // window.sessionStorage.setItem('combineNewFile',JSON.stringify(obj))
                // this['$router'].push({path:'/fileArrange/fileManagement/combineNewFile', });
            } else {
                this.Warn("请选择要组卷的档案。")
            }
            ;
        };

        //组已有卷
        combineExisting() {
            if (this.selection1.length > 0) {
                var arr = [];
                for (var son of this.selection1) {
                    arr.push(son.id)
                }
                Service.checkBeforeMergeWenJians({wenJianLibId: this.rankId_two, wenJianIds: arr}).then(res => {
                    if (res.data.succeeded) {
                        var obj = this.selection1;
                        var str = JSON.stringify(obj);
                        window.sessionStorage.setItem('CombineExistFile', str);
                        var objs = {
                            lib: this.rankId_one,
                            wenId: this.rankId_two,
                            parent: this.parentId,
                            kind: this.kinId,
                            isProjectCompany: this.isProjectCompany
                        };
                        window.sessionStorage.setItem('combineExisting', JSON.stringify(objs))
                        this['$router'].push({path: '/fileArrange/fileManagement/combineExisting',})
                    } else {
                        // this.getError(res.data.errorMessage)
                        this['$confirm'](res.data.errorMessage, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '不保存',
                            showCancelButton: false,
                            type: 'warning',
                            center: true
                        });
                    }
                    ;
                });
                // var obj = this.selection1;
                // var str = JSON.stringify(obj);
                // window.sessionStorage.setItem('CombineExistFile',str);
                // var objs = {
                //     lib:this.rankId_one,
                //     wenId:this.rankId_two,
                //     parent:this.parentId,
                //     kind:this.kinId,
                //     isProjectCompany:this.isProjectCompany
                // };
                // window.sessionStorage.setItem('combineExisting',JSON.stringify(objs))
                // this['$router'].push({path:'/fileArrange/fileManagement/combineExisting',})
            } else {
                this.Warn('请选择要组卷的档案。')
            }
        };

        //自动组卷
        AutoAssemble() {
            if (this.selection1.length > 0) {
                this.AutoMergerVisible = true;
            } else {
                this.Warn('请选择要组卷的档案。')
            }
        };

        AutoAssembleCancel() {
            this.AutoMergerVisible = false;
            this['$message']({
                type: 'info',
                message: '已取消'
            });
        };

        AutoAssembleConfire() {
            this.AutoMergerVisible = false;
            if (this.AssembleRuond == '1') {
                //if(this.selection1.length>0){
                this['$confirm']('是否要进行自动组卷', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在组卷，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    let arr = [];
                    for (var item of this.selection1) {
                        arr.push(item.id)
                    }
                    Service.AutoAssemble({kindId: this.kinId, fondId: this.parentId, wenJianIds: arr}).then(res => {
                        if (res.data.succeeded) {
                            this.Suces('自动组卷成功');
                            // this.getUnarrangedFile({
                            //     kindId: this.kinId,
                            //     fondId: this.parentId,
                            //     conditions: this.searchContent1,
                            //     pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}
                            // });
                            if(this.sortName2&&this.TypeChangeValue2){
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }else{
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }
                        } else {
                            this.getError(res.data.errorMessage)
                        }
                        this.$nextTick(() => {
                            loadingInstance.close();
                        })
                    })
                }).catch(() => {
                    this['$message']({
                        type: 'info',
                        message: '已取消'
                    });
                });
                // }else{
                //     this.Warn('请选择你要组卷的文件')
                // }
            } else {
                this['$confirm']('是否要进行自动组卷', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在组卷，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    Service.AutoAssemble({kindId: this.kinId, fondId: this.parentId, wenJianIds: []}).then(res => {
                        if (res.data.succeeded) {
                            this.Suces('自动组卷成功')
                            // this.getUnarrangedFile({
                            //     kindId: this.kinId,
                            //     fondId: this.parentId,
                            //     conditions: this.searchContent1,
                            //     pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}
                            // });
                            if(this.sortName2&&this.TypeChangeValue2){
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }else{
                                this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: this.sortStr2}});
                            }
                        } else {
                            this.getError(res.data.errorMessage)
                        }
                        this.$nextTick(() => {
                            loadingInstance.close();
                        })
                    })
                }).catch(() => {
                    this['$message']({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        };

        //新增文件
        GoaddFile(): void {
            if (this.activeName == 'second') {
                var obj = {
                    lib: this.rankId_two,
                    kind: this.kinId,
                    fond: this.parentId,
                    fondCode: this.fondCode,
                    isProjectCompany: this.isProjectCompany
                };
                window.sessionStorage.setItem('addFile', JSON.stringify(obj))
                this['$router'].push({
                    path: '/fileArrange/fileManagement/addFile'
                    // query:{
                    //     lib:this.rankId_two,
                    //     kind:this.kinId,
                    //     fond:this.parentId,
                    //     fondCode:this.fondCode
                    // }
                })
            }
        }

        //卷内文件******************************************************************************

        //批量挂接***************************************************************************

        //导出数据
        confirmExport() {
            var IdArr = [];
            if (this.activeName == 'first') {
                for (var item of this.selection) {
                    IdArr.push(item.id);
                }
                ;
            } else if (this.activeName == 'second') {
                for (var item of this.selection1) {
                    IdArr.push(item.id);
                }
                ;
            } else if (this.activeName == 'third') {
                for (var item of this.selection2) {
                    IdArr.push(item.id);
                }
                ;
            } else if (this.activeName == 'four') {
                for (var item of this.selection3) {
                    IdArr.push(item.id);
                }
                ;
            }
            ;
            if (IdArr.length > 0) {
                var Idstr = IdArr.join(',');
                if (this.exportrong == '1') {
                    if (this.activeName == 'first') {
                        var UrlStr = {
                            libId: this.rankId_one,
                            arcIds: Idstr,
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: '',
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr1
                        };
                    } else if (this.activeName == 'second') {
                        var UrlStr = {
                            libId: this.rankId_two,
                            arcIds: Idstr,
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: '',
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr2
                        };
                    } else if (this.activeName == 'four') {
                        var UrlStr = {
                            libId: this.rankId_thr,
                            arcIds: Idstr,
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: '',
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr4
                        };
                    } else {
                        var UrlStr = {
                            libId: this.rankId_two,
                            arcIds: Idstr,
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: 0,
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr3
                        };
                    };
                } else {
                    if (this.activeName == 'first') {
                        var UrlStr = {
                            libId: this.rankId_one,
                            arcIds: '',
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: '',
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr1
                        };
                        // UrlStr = 'libId='+this.rankId_one;
                    } else if (this.activeName == 'second') {
                        var UrlStr = {
                            libId: this.rankId_two,
                            arcIds: '',
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: '',
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr2
                        };
                        // UrlStr = 'libId='+this.rankId_two;
                    } else if (this.activeName == 'four') {
                        var UrlStr = {
                            libId: this.rankId_thr,
                            arcIds: '',
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: '',
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr4
                        };
                        // UrlStr = 'libId='+this.rankId_thr;
                    } else {
                        var UrlStr = {
                            libId: this.rankId_two,
                            arcIds: '',
                            dataType: this.exportrong,
                            contentType: this.exportcontent,
                            type: this.ExportType,
                            isAtta: this.exportStyle,
                            phase: 1,
                            parentId: 0,
                            fondCode: this.fondCode,
                            nodeName: this.storeName,
                            sort:this.sortStr3
                        };
                    };
                }
                if(this.exportStyle == '2'){
                    delete UrlStr.isAttr;
                    delete UrlStr.isAtta;
                    UrlStr.contentType = UrlStr.contentType/1;
                    UrlStr.dataType = UrlStr.dataType/1;
                    if(UrlStr.parentId===""){
                        UrlStr.parentId = null;
                    }else{
                        UrlStr.parentId = UrlStr.parentId/1;
                    }
                    this.DataImporterExportYW(UrlStr)
                }else{
                    this.DataImporterExport(UrlStr)
                 }
                this.exportNumTrue = false;
            } else {
                this.Warn('请选择要导出的数据。')
            }
        }

        //数据导出
        DataImporterExport(params) {
            Service.DataImporterExport(params).then(res => {
                if (res) {
                    if (res['type'] == 'application/json') {
                        this.getError('所选文件无电子原文！');
                    } else {
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            if (params['isAtta'] == '2') {
                                window.navigator.msSaveOrOpenBlob(csvData,params['nodeName'] + '.zip');
                            } else {
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName = excelName + "_案卷目录";
                                        break;
                                    case 2:
                                        excelName = excelName + "_案卷库";
                                        break;
                                    case 3:
                                        excelName = excelName + "_卷内目录";
                                        break;
                                    case 4:
                                        excelName = excelName + "_未整理目录";
                                        break;
                                    case 5:
                                        excelName = excelName + "_卷内目录";
                                        break;
                                }
                                window.navigator.msSaveOrOpenBlob(csvData, excelName + '.' + params['type']);
                            };

                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            if (params['isAtta'] == '2') {
                                link.setAttribute('download', params['nodeName'] + '.zip');
                            } else {
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName = excelName + "_案卷目录";
                                        break;
                                    case 2:
                                        excelName = excelName + "_案卷库";
                                        break;
                                    case 3:
                                        excelName = excelName + "_卷内目录";
                                        break;
                                    case 4:
                                        excelName = excelName + "_未整理目录";
                                        break;
                                    case 5:
                                        excelName = excelName + "_卷内目录";
                                        break;
                                }
                                link.setAttribute('download', excelName + '.' + params['type']);
                            };
                            document.body.appendChild(link);
                            link.click();
                        }
                    }
                }
            });
        };
        //数据导出目录及原文
        DataImporterExportYW(obj){
            Service.DataImporterExportYW(obj).then(res=>{
                if(res.data.succeeded){
                             Service.ExporttaskStart(res.data.data.id).then(res=>{
                                 if(res.data.succeeded){
                                     this['$confirm']('导出任务已创建，请到[任务列表]的[导出任务]中查看数据导出状态', '提示', {
                                         confirmButtonText: '确定',
                                         cancelButtonText: '不保存',
                                         showCancelButton: false,
                                         type: 'success',
                                         center: true
                                     });
                                 }else{
                                     this.getError(res.data.errorMessage)
                                 }
                             })
                }else{
                    this['$confirm'](res.data.errorMessage, '提示', {
                                    confirmButtonText: '关闭',
                                    cancelButtonText: '不保存',
                                    showCancelButton: false,
                                    type: 'warning',
                                    center: true
                                });
                }
                // var that = this;
                // let reader = new FileReader();
                // reader.readAsText(res);
                // reader.onload = function(event) {
                //     // 文件里的文本会在这里被打印出来
                //     let str = JSON.parse(event.target.result);
                //     if(str.succeeded){
                //         Service.ExporttaskStart(str.data.id).then(res=>{
                //             if(res.data.succeeded){
                //                 that.Suces('请前往任务列表下载。')
                //             }else{
                //                 that.getError(res.data.errorMessage)
                //             }
                //         })
                //     }else{
                //        that['$confirm'](str.errorMessage, '提示', {
                //            confirmButtonText: '关闭',
                //            cancelButtonText: '不保存',
                //            showCancelButton: false,
                //            type: 'warning',
                //            center: true
                //        });
                //     }
                //
                // };
            })
        }

        //批量挂接
        ConcateFile(a): void {
            if (this.activeName == 'four' || this.activeName == 'third') {
                this.anJuanId = null;
            } else if (this.activeName == 'second') {
                this.anJuanId = 0;
            } else {
                this.anJuanId = null;
            }

            let b = null;
            if (this.activeName == 'four') {
                b = this.rankId_thr;
            } else {
                b = this.rankId_two;
            }
            // 挂接云盘目录
            Service.GetMatchRules(b).then(res => {
                if (res.data.succeeded) {
                    this.ConcateObj = [];
                    if (res.data.data) {
                        this.ConcateObj = res.data.data;
                    }
                    // this.getUnarrangedFile({
                    //     kindId: this.kinId,
                    //     fondId: this.parentId,
                    //     conditions: this.searchContent1,
                    //     pageCondition: {page: 1, pageSize: this.limit1, sort: ""}
                    // });
                    if(this.sortName2&&this.TypeChangeValue2){
                        this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:1, pageSize: this.limit1, sort: this.sortStr2}});
                    }else{
                        this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: 1, pageSize: this.limit1, sort: this.sortStr2}});
                    }
                } else {
                    this.getError(res.data.errorMessage)
                }
            });
            this.matchedCount = null;
            this.existFile = false;
            this.errorMacth = [];
            this.riGuajie = false;
            this.ConcateType = '';
            this.commit = '';
            this.ConcateVisible = true;
        };

        // 检测是否可以匹配
        checkOldFiles(): void {
            let params = {
                fondId: this.parentId,
                cloudDirectoryId: this.treesId
            };
            Service.checkIsFinished(params).then(res => {
                if (res.data.succeeded) {
                    if (!res.data.data) {
                        this.checkDeal();
                    } else {
                        this['$message']({
                            message: '所选云盘目录下已有挂接任务，请到任务列表的批量挂接中删除或启动任务！',
                            type: 'warning'
                        });
                    }
                    // this.getUnarrangedFile({
                    //     kindId: this.kinId,
                    //     fondId: this.parentId,
                    //     conditions: this.searchContent1,
                    //     pageCondition: {page: 1, pageSize: 10, sort: ""}
                    // });
                    if(this.sortName2&&this.TypeChangeValue2){
                        this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:1, pageSize: this.limit1, sort: this.sortStr2}});
                    }else{
                        this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: 1, pageSize: this.limit1, sort: this.sortStr2}});
                    }
                } else {
                    this['$message']({
                        message: '检测匹配失败！',
                        type: 'warning'
                    });
                }
            })
        };

        // 挂接匹配
        checkDeal(): void {
            if (this.ConcateType) {
                this.autoMatchParams = {
                    "wenJianLibId": this.activeName == 'four' ? this.rankId_thr : this.rankId_two,
                    "anJuanId": this.anJuanId,
                    "fondId": this.parentId,
                    "cloudDirectoryId": this.treesId,
                    "matchRuleId": this.ConcateType
                };
                Service.autoFileUp(this.autoMatchParams).then(res => {
                    if (res.data.succeeded) {
                        this.riGuajie = true;
                        this.taskId = res.data.data.taskId;
                        this.matchedCount = res.data.data.matchedCount;
                        if (res.data.data.errorMatch && res.data.data.errorMatch.length > 0) {
                            this.errorMacth = res.data.data.errorMatch;
                            if (!res.data.data.taskId) {
                                this.Warn('一个原文匹配到多条目录数据，无法进行挂接。')
                            }
                        } else {
                            this.errorMacth = [];
                        }
                    } else {
                        this.getError(res.data.errorMessage)
                    }
                })
            } else {
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
        };
        CfSearch(){
            if(this.activeName==="second"){
                this.getListConfig(this.rankId_two);
                // this.getUnarrangedFile({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent1,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
                // this.getSearchConfig(this.rankId_two);
                this.getSupportGroupByFields(this.rankId_two);
                this.clickOne=false;
                this.fileList_show=false;
                this.fileListshow=false;
                this.juanwai_show=true;
                this.juannei_show=false;
                this.pageOne=false;
                this.pageTwo=true;
                this.pageThr=false;
                this.exportcontent='4';
                if(this.TypeChangeValue2==null){
                    this.TreeSort = true;
                }else{
                    this.TreeSort = false;
                }
            }else if(this.activeName==="third"){
                this.getListConfig(this.rankId_two);
                // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page2, pageSize:this.limit2,sort:""}});
                // this.getSearchConfig(this.rankId_two);
                this.getSupportGroupByFields(this.rankId_two);
                this.clickTwo = false;
                this.fileList_show=false;
                this.fileListshow=false;
                this.juanwai_show=false;
                this.juannei_show=true;
                this.pageOne=false;
                this.pageTwo=false;
                this.pageThr=true;
                this.exportcontent='3';
                if(this.TypeChangeValue3==null){
                    this.TreeSort = true;
                }else{
                    this.TreeSort = false;
                }
            }else if(this.activeName==="first"){
                this.fileList_show=true;
                this.fileListshow=true;
                this.juanwai_show=false;
                this.juannei_show=false;
                this.pageOne=true;
                this.pageTwo=false;
                this.pageThr=false;
                this.exportcontent='1';
                if(this.TypeChangeValue1==null){
                    this.TreeSort = true;
                }else{
                    this.TreeSort = false;
                }
                // this.getSearchConfig(this.rankId_one)
            }
        };
        // 开始挂接
        beginCF(): void {
            if (this.ConcateType) {
                if (this.riGuajie) {
                    if (this.taskId) {
                        let loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在上传中，请稍候',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        Service.fileUpStart(this.taskId).then(res => {
                            if (res.data.succeeded) {
                                this.$nextTick(() => {
                                    loadingInstance.close();
                                });
                                this['$alert']('原文挂接中,请到任务列表批量挂接中查看任务进度', '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {}
                                });
                                // this['$message']({
                                //     message: '挂接成功！',
                                //     type: 'success'
                                // });
                                this.CfSearch();
                                this.ConcateVisible = false;
                            } else {
                                this.$nextTick(() => {
                                    loadingInstance.close();
                                });
                                this.getError(res.data.errorMessage)
                            }
                        })
                    } else {
                        this['$message']({
                            message: '一个原文匹配到多条目录数据，无法进行挂接。',
                            type: 'warning'
                        });
                    }
                } else {
                    this['$message']({
                        message: '请先匹配原文！',
                        type: 'warning'
                    });
                }
            } else {
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
        };

        // 若无原文 上传原文
        fileUpBook() {
            this.ConcateVisible = false;
            this['$router'].push({path: '/fileArrange/cloudManagement'});
        };

        mounted(): void {
            setTimeout(()=>{
                if (!this.parentId) {
                    this.getfiles();
                }
            },500);
            //根据页面的大小调整按钮的个数
            this.$nextTick(()=>{
                this.pageSize();
            })
            var that = this;
            window["addEventListener"]("click", function () {
                that.ul_show = false;
                that.ul_show_two = false;
                that.box_ul_show = false;
                if (document.querySelector(".span")) {
                    document.querySelector(".span")["style"].transform = "rotate(0deg)";
                }
                ;
                if (document.querySelector(".spans")) {
                    document.querySelector(".spans")["style"].transform = "rotate(0deg)";
                }
                ;
                if (document.querySelector(".ZJ")) {
                    document.querySelector(".ZJ")["style"].transform = "rotate(0deg)";
                }
                ;
                if (document.querySelector(".SJGL")) {
                    document.querySelector(".SJGL")["style"].transform = "rotate(0deg)";
                }
                ;
                that.pull_down_menu = false;
            });

            window["addEventListener"]("resize", function () {
                //that.tableHeight = document.documentElement.clientHeight-250;
                that.tableHeight = document.getElementsByClassName('tablePosition')[0].clientHeight - 96;
                that.pull_down_menu = false
                var Arr = document.querySelectorAll(".toolButtons")
                var buttonArr = Array.from(Arr)
                var Li = document.querySelectorAll(".buttonlis")
                var boxbutton = Array.from(Li)
                var len = document.querySelector(".rowThr")["offsetWidth"]
                var ind = 0
                if (len <= 664) {
                    ind = 1
                    document.querySelector(".toolButton-one")["style"].display = "block";
                    if (len > 660) {
                        ind = 2
                    } else if (len <= 660 && len > 565) {
                        ind = 3
                    } else if (len <= 565 && len > 510) {
                        ind = 4
                    } else if (len <= 510 && len > 458) {
                        ind = 5
                    } else if (len <= 458 && len > 379) {
                        ind = 6
                    } else if (len <= 379 && len > 298) {
                        ind = 7
                    } else if (len <= 298 && len > 217) {
                        ind = 8
                    } else {
                        ind = 9
                    }
                    for (var i = 0; i < 10; i++) {
                        if (i < ind) {
                            buttonArr[i]["style"].display = "none";
                            boxbutton[i]["style"].display = "block"
                        } else {
                            buttonArr[i]["style"].display = "block";
                            boxbutton[i]["style"].display = "none";
                        }

                    }
                } else {
                    document.querySelector(".toolButton-one")["style"].display = "none";
                    buttonArr.forEach(function (item) {
                        item["style"].display = "block";
                    })
                }
                ;
                return (() => {
                    this.mathHeight = (document.documentElement.clientHeight - 152) / 2 - 60;
                })()
            });
            var button = document.getElementsByClassName("el-dropdown-menu")[0];
            var closeDiv = document.getElementsByClassName("closeDiv")[0];
            //closeDiv['style'].bottom = '0px';
            var Bh = 0;
            button['addEventListener']('scroll', () => {
                Bh = button.scrollTop;
                closeDiv['style'].bottom = -Bh + "px";
            })
            document.getElementsByClassName('el-dropdown-menu')[0]['addEventListener']('mouseover', () => {
                closeDiv['style'].bottom = -Bh + 'px';
            })
            closeDiv.getElementsByClassName('checkWay')['0']['addEventListener']('click', () => {
                Bh = 0;
                document.getElementsByClassName('el-dropdown-menu')[0]['style'].display = 'none';
            });
            this.bind();
        };

        created() {
            Service.getLogonUserRelatedFondsTree({}).then(res=>{
                if(res.data.succeeded){
                    this.fonddata = res.data.data;
                    this.returnCompany(this.fonddata)
                }else{
                    this.getError(res.data.errorMessage)
                }
            });
        };

        //警告信息
        Warn(message: string) {
            this['$message']({
                type: 'warning',
                message
            });
        };

        //请求失败
        getError(message: string) {
            this["$message"]({
                message,
                type: 'error'
            });
        };

        //成功
        Suces(message) {
            this['$message']({
                type: 'success',
                message
            })
        };

        test(row): void {

        };

        //案卷号
        myAJH(num) {
            if (num !== null) {
                num = num + "";
                if (num.length == 1) {
                    return '000' + num;
                } else if (num.length == 2) {
                    return '00' + num;
                } else if (num.length == 3) {
                    return '0' + num;
                } else {
                    return num;
                }
            } else {
                return null;
            }
        }

        //路由的拦截
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.name == '调整顺序号' || from.name == '合卷' || from.name == '档案移交申请详情' || from.name == '卷内文件' || from.name == '移到已有卷') {
                    if (vm.tab_control) {
                        if(vm.sortName1&&vm.TypeChangeValue1){
                            vm.getListNumber({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue,groupFilterKey:vm.TypeChangeValue1,groupFilterValue:vm.sortName1,pageCondition: {page:vm.page, pageSize: vm.limit, sort: vm.sortStr1}});
                        }else{
                            vm.getListNumber({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue,pageCondition: {page: vm.page, pageSize: vm.limit, sort: vm.sortStr1}});
                        }
                    } else {
                        if(vm.sortName4&&vm.TypeChangeValue4){
                            vm.WenjianSearch({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue3,groupFilterKey:vm.TypeChangeValue4,groupFilterValue:vm.sortName4,pageCondition: {page:vm.page3, pageSize: vm.limit3, sort: vm.sortStr4}});
                        }else{
                            vm.WenjianSearch({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue3,pageCondition: {page: vm.page3, pageSize: vm.limit3, sort: vm.sortStr4}});
                        }
                    }
                    if (!vm.clickTwo) {
                        if(vm.sortName3&&vm.TypeChangeValue3){
                            vm.getInfilePapers({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue2,groupFilterKey:vm.TypeChangeValue3,groupFilterValue:vm.sortName3,pageCondition: {page:vm.page2, pageSize: vm.limit2, sort: vm.sortStr3}});
                        }else{
                            vm.getInfilePapers({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue2,pageCondition: {page: vm.page2, pageSize: vm.limit2, sort: vm.sortStr3}});
                        }
                    }
                    if (!vm.clickOne) {
                        if(vm.sortName2&&vm.TypeChangeValue2){
                            vm.getUnarrangedFile({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue1,groupFilterKey:vm.TypeChangeValue2,groupFilterValue:vm.sortName2,pageCondition: {page:vm.page1, pageSize: vm.limit1, sort: vm.sortStr2}});
                        }else{
                            vm.getUnarrangedFile({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue1,pageCondition: {page: vm.page1, pageSize: vm.limit1, sort: vm.sortStr2}});
                        }
                    }
                } else if (from.name == '新增文件') {
                    if (vm.tab_control && !vm.clickOne) {
                        if(vm.sortName2&&vm.TypeChangeValue2){
                            vm.getUnarrangedFile({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue1,groupFilterKey:vm.TypeChangeValue2,groupFilterValue:vm.sortName2,pageCondition: {page:vm.page1, pageSize: vm.limit1, sort: vm.sortStr2}});
                        }else{
                            vm.getUnarrangedFile({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue1,pageCondition: {page: vm.page1, pageSize: vm.limit1, sort: vm.sortStr2}});
                        }
                    } else {
                        if(vm.sortName4&&vm.TypeChangeValue4){
                            vm.WenjianSearch({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue3,groupFilterKey:vm.TypeChangeValue4,groupFilterValue:vm.sortName4,pageCondition: {page:vm.page3, pageSize: vm.limit3, sort: vm.sortStr4}});
                        }else{
                            vm.WenjianSearch({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue3,pageCondition: {page: vm.page3, pageSize: vm.limit3, sort: vm.sortStr4}});
                        }
                    }
                } else if (from.name == '组新卷' || from.name == '组已有卷' || from.name == '开始组已有卷') {
                    if(vm.sortName1&&vm.TypeChangeValue1){
                        vm.getListNumber({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue,groupFilterKey:vm.TypeChangeValue1,groupFilterValue:vm.sortName1,pageCondition: {page:vm.page, pageSize: vm.limit, sort: vm.sortStr1}});
                    }else{
                        vm.getListNumber({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue,pageCondition: {page: vm.page, pageSize: vm.limit, sort: vm.this.sortStr1}});
                    }
                    if(vm.sortName2&&vm.TypeChangeValue2){
                        vm.getUnarrangedFile({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue1,groupFilterKey:vm.TypeChangeValue2,groupFilterValue:vm.sortName2,pageCondition: {page:vm.page1, pageSize: vm.limit1, sort: vm.sortStr2}});
                    }else{
                        vm.getUnarrangedFile({kindId: vm.kinId,fondId: vm.parentId,searchKey: vm.searchValue1,pageCondition: {page: vm.page1, pageSize: vm.limit1, sort: vm.sortStr2}});
                    }
                } else if (from.name == '文件及档案编辑') {
                    if (!vm.tab_control) {
                        var str = window.sessionStorage.getItem('WBres');
                        var obj = JSON.parse(str);
                        for (var item of vm.wenjianArr) {
                            if (item.id == obj.id) {
                                for (var key in obj) {
                                    item[key] = obj[key];
                                }
                                ;
                            }
                            ;
                        };
                        vm.WenjianSearch({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page3, pageSize:vm.limit3,sort:vm.sortStr4}});
                    } else {
                        if (vm.activeName == 'second') {
                            var str = window.sessionStorage.getItem('WBres');
                            var obj = JSON.parse(str);
                            for (var item of vm.juanwaiArr) {
                                if (item.id == obj.id) {
                                    for (var key in obj) {
                                        item[key] = obj[key];
                                    }
                                    ;
                                }
                                ;
                            }
                            ;
                            vm.getUnarrangedFile({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2,pageCondition:{page:vm.page1, pageSize:vm.limit1,sort:vm.sortStr2}});
                        } else if (vm.activeName == 'third') {
                            vm.getInfilePapers({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortStr3}});
                            var str = window.sessionStorage.getItem('WBres');
                            var obj = JSON.parse(str);
                            for (var item of vm.juanneiArr) {
                                if (item.id == obj.id) {
                                    for (var key in obj) {
                                        item[key] = obj[key];
                                    }
                                    ;
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    }
                    vm.CfSearch();
                } else if (from.name == '档案管理') {
                    var str = window.sessionStorage.getItem('fromachiveManage');
                    var obj = JSON.parse(str);
                    vm.parentId = obj.parentId;
                    vm.parentIdQiao = obj.parentId;
                    vm.kinId = obj.kindId;
                    vm.storeName = obj.name;
                    vm.fromStore = obj.name;
                    vm.isProjectCompany = obj.isProjectCompany;
                    vm.isProjectCompanyQiao = obj.isProjectCompany;
                    vm.fondCode = obj.fondCode;
                    vm.fondName = obj.fondName;
                    vm.fondNameQiao = obj.fondName;
                    vm.fromAchiveManage()
                } else if (from.name == '整理编目') {
                    var str = window.sessionStorage.getItem('fromArrange');
                    var obj = JSON.parse(str);
                    vm.parentId = obj.parentId;
                    vm.parentIdQiao = obj.parentId;
                    vm.kinId = obj.kindId;
                    vm.storeName = obj.name;
                    vm.fromStore = obj.name;
                    vm.isProjectCompany = obj.isProjectCompany;
                    vm.isProjectCompanyQiao = obj.isProjectCompany;
                    vm.fondCode = obj.fondCode;
                    vm.fondName = obj.fondName;
                    vm.fondNameQiao = obj.fondName;
                    vm.fromAchiveManage()
                }else if (from.name == '新增文件') {
                    if (!vm.tab_control) {
                        var str = window.sessionStorage.getItem('WBres');
                        var obj = JSON.parse(str);
                        for (var item of vm.wenjianArr) {
                            if (item.id == obj.id) {
                                for (var key in obj) {
                                    item[key] = obj[key];
                                }
                                ;
                            }
                            ;
                        };
                        vm.WenjianSearch({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page3, pageSize:vm.limit3,sort:vm.sortStr4}});
                    } else {
                        if (vm.activeName == 'second') {
                            var str = window.sessionStorage.getItem('WBres');
                            var obj = JSON.parse(str);
                            for (var item of vm.juanwaiArr) {
                                if (item.id == obj.id) {
                                    for (var key in obj) {
                                        item[key] = obj[key];
                                    }
                                    ;
                                }
                                ;
                            }
                            ;
                            vm.getUnarrangedFile({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue1,pageCondition:{page:vm.page1, pageSize:vm.limit1,sort:vm.sortStr2}});
                        } else if (vm.activeName == 'third') {
                            vm.getInfilePapers({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortStr3}});
                            var str = window.sessionStorage.getItem('WBres');
                            var obj = JSON.parse(str);
                            for (var item of vm.juanneiArr) {
                                if (item.id == obj.id) {
                                    for (var key in obj) {
                                        item[key] = obj[key];
                                    }
                                    ;
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                };
            });
        };

        beforeRouteLeave(to, from, next) {
            var obj = {
                parentId: this.parentId,
                kindId: this.kinId,
                name: this.storeName,
                isProjectCompany: this.isProjectCompany,
                fondCode: this.fondCode,
                fondName: this.fondName
            };
            window.sessionStorage.setItem('fromfileManage', JSON.stringify(obj))
            next();
        }

        fromAchiveManage(){
            this.TreeSort = true;
            this.TypeChangeValue1 = null;
            this.TypeChangeValue2 = null;
            this.TypeChangeValue3 = null;
            this.TypeChangeValue4 = null;
            this.sortName1 = null;
            this.sortName2 = null;
            this.sortName3 = null;
            this.sortName4 = null;
            this.treeFilters.title = '';
            // /*___________________________*/
            // Service.getFondSearch({}).then(res => {
            //     if (res.data.succeeded) {
            //         this.GetEscrow(this.parentId);
            //         Service.getLogonUserRelatedFondsTree({}).then(res=>{
            //             if(res.data.succeeded){
            //                 this.fonddata = res.data.data;
            //                 this.returnCompany(this.fonddata)
            //             }else{
            //                 this.getError(res.data.errorMessage)
            //             }
            //         });
            //     } else {
            //         this.getError(res.data.errorMessage)
            //     }
            //
            // });
            // /*---------------------------*/
            this.GetEscrow(this.parentId);
            Service.archiveNowFile(this.parentId).then(res => {
                if (res.data.succeeded) {
                    this.expandedRole = [];
                    this.tree = res.data.data;
                    if (this.kinId) {
                        this.expandedRole.push(this.storeName);
                        this.choosedRole.push(this.storeName);
                        this['$refs']['treeku']['setCheckedKeys'](this.choosedRole);
                        //根据档案分类取档案库
                        this.page = 1;
                        this.total = 0;
                        this.limit = 500;
                        this.page1 = 1;
                        this.total1 = 0;
                        this.limit1 = 500;
                        this.page2 = 1;
                        this.total2 = 0;
                        this.limit2 = 500;
                        this.page3 = 1;
                        this.total3 = 0;
                        this.limit3 = 500;
                        this.clickOne = true;
                        this.clickTwo = true;
                        Service.getByKindId(this.kinId).then(res => {
                            if (res.data.succeeded) {
                                this.MainShow = true;
                                if (res.data.data.length == 2 || res.data.data.length == 0) {
                                    this.activeName = 'first';
                                    this.fileList_show = true;
                                    this.fileListshow = true;
                                    this.juanwai_show = false;
                                    this.juannei_show = false;
                                    this.pageOne = true;
                                    this.pageTwo = false;
                                    this.pageThr = false;
                                    this.pagefor = false;
                                    this.tab_control = true;
                                    this.exportcontent = '1';
                                    for (var item of res.data.data) {
                                        if (item.rank == 3) {
                                            this.rankId_one = item.id;
                                        } else if (item.rank == 4) {
                                            this.rankId_two = item.id;
                                        }
                                        ;
                                    };
                                    //请求画面表格的列配置
                                    this.getListConfig(this.rankId_one);
                                    // this.getSearchConfig(this.rankId_one);
                                    this.getSupportGroupByFields(this.rankId_one);
                                    // this.main_show=true;
                                } else {
                                    this.fileList_show = true;
                                    this.fileListshow = false;
                                    this.juanwai_show = false;
                                    this.juannei_show = false;
                                    this.pageOne = false;
                                    this.pageTwo = false;
                                    this.pageThr = false;
                                    this.pagefor = true;
                                    this.tab_control = false;
                                    this.activeName = "four";
                                    this.exportcontent = '4';
                                    this.rankId_thr = res.data.data[0].id;
                                    this.getListConfig(this.rankId_thr);
                                    // this.getSearchConfig(this.rankId_thr);
                                    this.getSupportGroupByFields(this.rankId_thr);
                                }
                            } else {
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }
                    this.getTreeName(this.tree);
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        }

        //获取分类号
        getFla() {
            this.flhName = null;
            Service.getCategoryNumbers(this.parentId).then(res => {
                if (res.data.succeeded) {
                    this.FLhArr = res.data.data;
                    if(this.addfile.FLH){
                        this.ReturnFla(this.FLhArr)
                        // for(var item of this.FLhArr){
                        //     if(item.categoryNumber == this.addfile.FLH){
                        //         this.flhName = item.categoryNumberText;
                        //         break;
                        //     }else if(item.children){
                        //         for(var son of item.children){
                        //             if(son.categoryNumber==this.addfile.FLH){
                        //                 this.flhName = son.categoryNumberText;
                        //                 break;
                        //             }else if(son.children){
                        //                 for(var ind of son.children){
                        //                     if(ind.categoryNumber == this.addfile.FLH){
                        //                         this.flhName = ind.categoryNumberText;
                        //                         break;
                        //                     }else if(ind.children){
                        //                         for(var son2 of ind.children){
                        //                             if(son2.categoryNumber == this.addfile.FLH){
                        //                                 this.flhName = son2.categoryNumberText;
                        //                                 break;
                        //                             }else if(son2.children){
                        //                                 for(var son3 of son2.children){
                        //                                     if(son3.categoryNumber == this.addfile.FLH){
                        //                                         this.flhName = son3.categoryNumberText;
                        //                                         break;
                        //                                     };
                        //                                 };
                        //                             };
                        //                         };
                        //                     };
                        //                 };
                        //             };
                        //         };
                        //     };
                        // };
                    };
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        };
        ReturnFla(params){
            for(var son of params){
                if(son.categoryNumber == this.addfile.FLH){
                    this.flhName = son.categoryNumberText;
                    break;
                }else if(son.children!=null){
                    this.ReturnFla(son.children)
                }
            }
        }
        myvalidator(rule, value, callback) {
            var reg = new RegExp('^[0-9][0-9]*$');
            if (value != null) {
                var str = reg.test(value);
                if (!str) {
                    callback(new Error('请输入正整数'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        };

        projectCodechange(item, ind) {
            if (ind.allowEdit) {
                this.addfile.XMMCNEW = item.projectName;
            }
            // this.addfile.XMMCNEW = item.projectName;
        };

        projectNamechange(item, ind) {
            if (ind.allowEdit) {
                this.addfile.XMBH = item.projectCode;
            }
            // this.addfile.XMBH = item.projectCode;
        };

        timevalidator(rule, value, callback) {
            var reg = new RegExp(/^(\d{4})(0\d{1}|1[0-2])(0\d{1}|[12]\d{1}|3[01])$/)
            var str = reg.test(value)
            if (str) {
                callback()
            } else {
                callback(new Error('日期格式错误,例:20190101'))
            }
        };

        //上移
        positionUp() {
            if(this.activeName=='first'){
                if (this.selection.length > 1) {
                    this.Warn('每次只能移动一条数据。');
                } else if (this.selection.length == 1) {
                    var data = this.selection[0];
                    var ind = null;
                    for (var key in this.fileList) {
                        if (data.id == this.fileList[key].id) {
                            ind = key;
                        };
                    };
                    if (ind == 0) {
                        this.Warn('所选数据已经是第一条。');
                    } else {
                        if(this.exchangeSeqUp){
                            this.exchangeSeqUp = false;
                            var id1 = this.fileList[ind].id;
                            var id2 = this.fileList[ind-1].id;
                            Service.exchangeSeqs({libId:this.rankId_one,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.fileList.splice(ind, 1);
                                    this.fileList.splice(ind - 1, 0, data);
                                    this.exchangeSeqUp = true;
                                }else{
                                    this.getError('数据移动失败');
                                    this.exchangeSeqUp = true;
                                }
                            });
                        }
                    };
                };
            }else if(this.activeName=='four'){
                if (this.selection3.length > 1) {
                    this.Warn('每次只能移动一条数据。');
                } else if (this.selection3.length == 1) {
                    var data = this.selection3[0];
                    var ind = null;
                    for (var key in this.wenjianArr) {
                        if (data.id == this.wenjianArr[key].id) {
                            ind = key;
                        };
                    };
                    if (ind == 0) {
                        this.Warn('所选数据已经是第一条。');
                    } else {
                        if(this.exchangeSeqUp){
                            this.exchangeSeqUp = false;
                            var id1 = this.wenjianArr[ind].id;
                            var id2 = this.wenjianArr[ind-1].id;
                            Service.exchangeSeqs({libId:this.rankId_thr,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.wenjianArr.splice(ind, 1);
                                    this.wenjianArr.splice(ind - 1, 0, data);
                                    this.exchangeSeqUp = true;
                                }else{
                                    this.getError('数据移动失败');
                                    this.exchangeSeqUp = true;
                                }
                            });
                        }
                    };
                };
            }

        };

        //下移
        positionDown() {
            if(this.activeName=='first'){
                if (this.selection.length > 1) {
                    this.Warn('每次只能移动一条数据。');
                } else if (this.selection.length == 1) {
                    var data = this.selection[0];
                    var ind = null;
                    for (var key in this.fileList) {
                        if (data.id == this.fileList[key].id) {
                            ind = key;
                        };
                    };
                    if (ind == this.fileList.length - 1) {
                        this.Warn('所选数据已经是最后一条。');
                    } else {
                        if(this.exchangeSeqDow){
                            var id1 = this.fileList[ind].id;
                            var id2 = this.fileList[ind/1+1].id;
                            this.exchangeSeqDow = false;
                            Service.exchangeSeqs({libId:this.rankId_one,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.fileList.splice(ind / 1, 1);
                                    this.fileList.splice(ind / 1 + 1, 0, data);
                                    this.exchangeSeqDow = true;
                                }else{
                                    this.getError('数据移动失败');
                                    this.exchangeSeqDow = true;
                                }
                            })
                        }
                    }
                }
            }else if(this.activeName=='four'){
                if (this.selection3.length > 1) {
                    this.Warn('每次只能移动一条数据。');
                } else if (this.selection3.length == 1) {
                    var data = this.selection3[0];
                    var ind = null;
                    for (var key in this.wenjianArr) {
                        if (data.id == this.wenjianArr[key].id) {
                            ind = key;
                        };
                    };
                    if (ind == this.wenjianArr.length - 1) {
                        this.Warn('所选数据已经是最后一条。');
                    } else {
                        if(this.exchangeSeqDow){
                            var id1 = this.wenjianArr[ind].id;
                            var id2 = this.wenjianArr[ind/1+1].id;
                            this.exchangeSeqDow = false;
                            Service.exchangeSeqs({libId:this.rankId_thr,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.wenjianArr.splice(ind / 1, 1);
                                    this.wenjianArr.splice(ind / 1 + 1, 0, data);
                                    this.exchangeSeqDow = true;
                                }else{
                                    this.getError('数据移动失败');
                                    this.exchangeSeqDow = true;
                                }
                            })
                        }
                    }
                }
            }
        }

        getRowClass(row: any = {}) {
            if (row.row.ARCHIVE_STATUS == 1) {
                return 'row-yijiao';
            }
        }

        headerclick(data) {
                var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC';
                var name = data.column.label;
                var str = '';
                for (var son of this.tableHeader) {
                    if (son.caption == name) {
                        str = son.fieldName;
                    };
                };
                if (str) {
                    this.sortStr1 = str+" "+sortSting;
                   // if (this.sort1) {
                       // this.sort1 = !this.sort1;
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort:this.sortStr1}});
                        }else{
                            this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort:this.sortStr1}});
                        }
                    // } else {
                    //     this.sort1 = !this.sort1;
                    //     if(this.sortName1&&this.TypeChangeValue1){
                    //         this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition: {page:this.page, pageSize: this.limit, sort: str + "   "+sortSting}});
                    //     }else{
                    //         this.getListNumber({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue,pageCondition: {page: this.page, pageSize: this.limit, sort: str + "   "+sortSting}});
                    //     }
                    // }
                }
        }

        headerclick2(data) {
            var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC';
            var name = data.column.label;
            var str = '';
            for (var son of this.tableHeader_two) {
                if (son.caption == name) {
                    str = son.fieldName;
                };
            };
            if (str) {
                this.sortStr2 = str+" "+sortSting;
                // if (this.sort2) {
                //     this.sort2 = !this.sort2;
                    if(this.sortName2&&this.TypeChangeValue2){
                        this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1,sort:this.sortStr2}});
                    }else{
                        this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort:this.sortStr2}});
                    }
                // } else {
                //     this.sort2 = !this.sort2;
                //     if(this.sortName2&&this.TypeChangeValue2){
                //         this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition: {page:this.page1, pageSize: this.limit1, sort: str + "  "+sortSting}});
                //     }else{
                //         this.getUnarrangedFile({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue1,pageCondition: {page: this.page1, pageSize: this.limit1, sort: str + "  "+sortSting}});
                //     }
                // }
            }
        }

        headerclick3(data) {
            var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC'
            var name = data.column.label;
            var str = '';var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC'
            for (var son of this.tableHeader_thr) {
                if (son.caption == name) {
                    str = son.fieldName;
                };
            };

            if (str) {
                this.sortStr3 = str+" "+sortSting;
                // if (this.sort3) {
                //     this.sort3 = !this.sort3;
                    if(this.sortName3&&this.TypeChangeValue3){
                        this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:this.page2, pageSize: this.limit2,  sort:this.sortStr3}});
                    }else{
                        this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,pageCondition: {page: this.page2, pageSize: this.limit2,  sort:this.sortStr3}});
                    }
                // } else {
                //     this.sort3 = !this.sort3;
                //     if(this.sortName3&&this.TypeChangeValue3){
                //         this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition: {page:this.page2, pageSize: this.limit2,  sort: str + "  "+sortSting}});
                //     }else{
                //         this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue2,pageCondition: {page: this.page2, pageSize: this.limit2,  sort: str + "  "+sortSting}});
                //     }
                // }
            }
        }

        headerclick4(data) {
            var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC'
            var name = data.column.label;
            var str = '';
            for (var son of this.tableHeader_for) {
                if (son.caption == name) {
                    str = son.fieldName;
                }
                ;
            };
            if (str) {
                this.sortStr4 = str+" "+sortSting;
                // if (this.sort4) {
                //     this.sort4 = !this.sort4;
                    if(this.sortName4&&this.TypeChangeValue4){
                        this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort:this.sortStr4}});
                    }else{
                        this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort:this.sortStr4}});
                    }
                // } else {
                //     this.sort4 = !this.sort4;
                //     if(this.sortName4&&this.TypeChangeValue4){
                //         this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,groupFilterKey:this.TypeChangeValue4,groupFilterValue:this.sortName4,pageCondition: {page:this.page3, pageSize: this.limit3, sort: str + "  "+sortSting}});
                //     }else{
                //         this.WenjianSearch({kindId: this.kinId,fondId: this.parentId,searchKey: this.searchValue3,pageCondition: {page: this.page3, pageSize: this.limit3, sort: str + "  "+sortSting}});
                //     }
                // }
            }
        };

        TypeChange1(data) {
            if (data != null) {
                this.getGroupByCandidatesValues({libId:this.rankId_one, fondId: this.parentId, fieldName: data})
            } else {
                this.TreeSort = true;
                this.getListNumber({
                    kindId: this.kinId,
                    fondId: this.parentId,
                    searchKey: this.searchValue,
                    pageCondition: {page: 1, pageSize: this.limit, sort: this.sortStr1}
                });
            }
        };

        TypeChange2(data) {
            if (data != null) {
                this.getJuanWaiGroupByCandidatesValue({libId: this.rankId_two, fondId: this.parentId, fieldName: data})
            } else {
                this.TreeSort = true;
                this.getUnarrangedFile({
                    kindId: this.kinId,
                    fondId: this.parentId,
                    searchKey: this.searchValue1,
                    pageCondition: {page: 1, pageSize: this.limit1, sort:  this.sortStr2}
                });
            }
        };

        TypeChange3(data) {
            if (data != null) {
                this.getJuanNeiGroupByCandidatesValue({libId: this.rankId_two, fondId: this.parentId, fieldName: data})
            } else {
                this.TreeSort = true;
                this.getInfilePapers({
                    kindId: this.kinId,
                    fondId: this.parentId,
                    searchKey: this.searchValue2,
                    pageCondition: {page: 1, pageSize: this.limit2, sort: this.sortStr3}
                });
            }
        };

        TypeChange4(data) {
            if (data != null) {
                this.getGroupByCandidatesValues({libId: this.rankId_thr, fondId: this.parentId, fieldName: data})
            } else {
                this.TreeSort = true;
                this.WenjianSearch({
                    kindId: this.kinId,
                    fondId: this.parentId,
                    searchKey: this.searchValue3,
                    pageCondition: {page: 1, pageSize: this.limit3, sort: this.sortStr4}
                });
            }
        };
//案卷及文件级文件
        getGroupByCandidatesValues(params) {
            Service.getGroupByCandidatesValue1(params).then(res => {
                if (res.data.succeeded) {
                    let data = JSON.stringify(res.data.data);
                    if (this.activeName == 'first') {
                        this.sortTree1 = [];
                        // for (var son of res.data.data) {
                        //     this.sortTree1.push({Name: son})
                        // };
                        this.sortTree1 = res.data.data;
                    }else if (this.activeName == 'four') {
                        this.sortTree4 = [];
                        this.sortTree4 = res.data.data;
                        // for (var son of res.data.data) {
                        //     this.sortTree4.push({Name: son})
                        // };
                    };
                    this.TreeSort = false;
                    // else if (this.activeName == 'second') {
                    //         this.sortTree2 = [];
                    //         for (var son of res.data.data) {
                    //             this.sortTree2.push({Name: son})
                    //         }
                    //         ;
                    //     } else if (this.activeName == 'third') {
                    //         // this.sortTree3 = [];
                    //         // for (var son of res.data.data) {
                    //         //     this.sortTree3.push({Name: son})
                    //         // }
                    //         // ;
                    //     }
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        }
//未整理文件
        getJuanNeiGroupByCandidatesValue(params){
            Service.getJuanNeiGroupByCandidatesValue1(params).then(res=>{
                if(res.data.succeeded){
                    this.sortTree3 = [];
                    this.sortTree3 = res.data.data;
                    // for (var son of res.data.data) {
                    //     this.sortTree3.push({Name: son})
                    // };
                    this.TreeSort = false;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        }
        //所有卷内文件
        getJuanWaiGroupByCandidatesValue(params){
            Service.getJuanWaiGroupByCandidatesValue1(params).then(res=>{
                if(res.data.succeeded){
                    this.sortTree2 = [];
                    this.sortTree2 = res.data.data;
                    // for (var son of res.data.data) {
                    //     this.sortTree2.push({Name: son})
                    // };
                    this.TreeSort = false;
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        }
        //dialog拖动
        bind() {
            const dialogHeaderEl = document.querySelector('.dragDialog');
            // // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
            // const sty = dragDom['currentStyle'] || window.getComputedStyle(dragDom, null)
            //
            dialogHeaderEl['onmousedown'] = (e) => {
                const disX = e.clientX-dialogHeaderEl['offsetLeft'] ;
                const disY = e.clientY - dialogHeaderEl['offsetTop'];
                // // 鼠标按下，计算当前元素距离可视区的距离
                // const disX = e.clientX - dialogHeaderEl['offsetLeft'];
                // const disY = e.clientY - dialogHeaderEl['offsetTop'];
                //
                // // 获取到的值带px 正则匹配替换
                // let styL, styT;
                //
                // // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
                // if (sty.left.includes('%')) {
                //     styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
                //     styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
                // } else {
                //     styL = +sty.left.replace(/\px/g, '')
                //     styT = +sty.top.replace(/\px/g, '')
                // }
                //
                var dragDom = dialogHeaderEl.querySelector('.el-dialog');
                document.onmousemove = function (e) {
                    // 通过事件委托，计算移动的距离
                    const l = e.clientX - disX;
                    const t = e.clientY - disY;
                    // 移动当前元素
                    if(t>0){
                        dragDom['style'].left = l + `px`;
                        dragDom['style'].top = t + `px`;
                        dialogHeaderEl['style'].left = l + `px`;
                        // dialogHeaderEl['style'].right = l/1+266 + `px`;
                        dialogHeaderEl['style'].top = t + `px`;
                    }
                    // 将此时的位置传出去
                    // binding.value({x:e.pageX,y:e.pageY})
                }
                //
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
        sortclick1(data: any, node: any, tree: any){
            this.sortName1 = data.value;
            this.limit = 500;
            this.getListNumber({
                kindId: this.kinId,
                fondId: this.parentId,
                searchKey: this.searchValue,
                groupFilterKey:this.TypeChangeValue1,
                groupFilterValue:this.sortName1,
                pageCondition: {page: 1, pageSize: this.limit, sort: this.sortStr1}
            });
        };
        sortclick2(data: any, node: any, tree: any){
            this.sortName2 = data.value;
            this.limit1 = 500;
            this.getUnarrangedFile({
                kindId: this.kinId,
                fondId: this.parentId,
                searchKey: this.searchValue1,
                groupFilterKey:this.TypeChangeValue2,
                groupFilterValue:this.sortName2,
                pageCondition: {page: 1, pageSize: this.limit1, sort:this.sortStr2}
            });
        }
        sortclick3(data: any, node: any, tree: any){
            this.sortName3 = data.value;
            this.limit2 = 500;
            this.getInfilePapers({
                kindId: this.kinId,
                fondId: this.parentId,
                searchKey: this.searchValue2,
                groupFilterKey:this.TypeChangeValue3,
                groupFilterValue:this.sortName3,
                pageCondition: {page: 1, pageSize: this.limit2, sort: this.sortStr3}
            });
        }
        sortclick4(data: any, node: any, tree: any){
            this.sortName4 = data.value;
            this.limit3 = 500;
            this.WenjianSearch({
                kindId: this.kinId,
                fondId: this.parentId,
                searchKey: this.searchValue3,
                groupFilterKey:this.TypeChangeValue4,
                groupFilterValue:this.sortName4,
                pageCondition: {page: 1, pageSize: this.limit3, sort: this.sortStr4}
            });
        }
        SelectFlh(v){
            if(v){
                this.FlhTrue = true;
            }
        }
        flhclick(data: any, node: any, tree: any){
            this.addfile.FLH = data.categoryNumber;
            this.flhName = data.categoryNumberText;
            this.addfile.BM = data.nodeName;
            // this.addfile.FLH = data.categoryNumber;
            // this.flhName = data.categoryNumberText;

        }
        // 跳转详情
        fileDetails(row){
            let params = {
                objectId:Number(row.id),
                libId:0
            };
            if(this.activeName=='four'){
                params.libId = this.rankId_thr;
            }else if(this.activeName=='second'||this.activeName=='third'){
                params.libId = this.rankId_two;
            }
            Service.getHomeDetail(params).then((res) =>{
                if(res.data.succeeded){
                    let fileManagentDetails = res.data.data?res.data.data:{};
                    window.sessionStorage.setItem('borrowToData', JSON.stringify(fileManagentDetails));
                    window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
                    window.sessionStorage.setItem('applicationNo', fileManagentDetails.appNo);
                    window.sessionStorage.setItem('backFile','3');
                    if(fileManagentDetails.processNo){
                        window.sessionStorage.setItem('node','4');//
                        // 借阅人变更的单子
                        this['$router'].push({
                            path:'/selfTip/examCheck/peopleRefuseCheck',
                        });
                    }else if(fileManagentDetails){
                        // 续借的单子
                        this['$router'].push({
                            path:'/selfTip/borrowDetails/borrowDetails',
                        });
                    }
                }else{
                    this['$message']({
                        message: '查询在库信息失败！',
                        type: 'error'
                    });
                }
            });
        };
        BZPosition(){
            if(this.activeName==='first'){
                this.headBz =!this.headBz;
            }else if(this.activeName==='four'){
                this.headWBz = !this.headWBz;
            }
        }
        AJHvalidator(rule,value,callback){
            if(value) {
                var reg = new RegExp(/^\d{1,4}$|^\d{1,4}\-\d{1,2}$/);
                var str = reg.test(value);
                if (str) {
                    callback()
                } else {
                    callback(new Error('案卷号格式错误,如1或1-1'))
                }
            }else{
                callback()
            }
        };
    }
</script>
<style lang="scss" >
    @import '../../../styles/fileManage/fileManagement.scss';
</style>