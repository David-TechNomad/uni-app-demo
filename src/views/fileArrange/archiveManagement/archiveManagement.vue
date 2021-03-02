<template >
    <el-container class="fileManagement">
        <el-aside>
            <div class="mainTitle">
                <span>档案管理</span>
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
            <div class="searchCompany">
                <el-dropdown trigger="click" class="fileManagementElDropdown">
                      <span class="el-dropdown-link"><p>{{fondName}}</p><i class="el-icon-arrow-down el-icon--right elIconRight"></i>
                      </span>
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
            <div class="zebraTree myzebraTree">
                <!--:default-expand-all="false"-->
                <el-tree
                        :data="tree"
                        node-key="nodeName"
                        :props="fieldType"
                        @node-click="pageType"
                        :default-checked-keys="choosedRole"
                        :renderContent = "renderContent"
                        :default-expanded-keys="expandedRole"
                        accordion
                        show-checkbox
                        checkStrictly
                        ref="treeku"
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
            </div>
        </el-aside>
        <el-main v-show="MainShow">
            <el-row class="rowOne mainBorrow">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-show="tab_control">
                    <el-tab-pane label="案卷列表" name="first">案卷列表</el-tab-pane>
                    <el-tab-pane label="所有卷内文件" name="second">所有卷内文件</el-tab-pane>
                </el-tabs>
                <el-tabs v-model="activeName" type="card" v-show="!tab_control">
                    <el-tab-pane label="文件级档案" name="third">文件级档案</el-tab-pane>
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
                <!--<el-form :model="searchform2"  class="LIneFeedForm" v-show="activeName=='second'">-->
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
                <!--<el-form :model="searchform3"  class="LIneFeedForm" v-show="activeName=='third'">-->
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
                    <!--<div class="adjustposition" v-show="fileList_show">-->
                        <!--<el-button type="primary" class="checkWay" @click="positionUp"><i></i></el-button>-->
                        <!--<el-button type="primary" class="checkWay" @click="positionDown"><i></i></el-button>-->
                    <!--</div>-->
                    <div class="nthDivtwo" v-show="fileList_show">
                        <div style="width: 100px;float: right;line-height:30px" type="primary" class="toolButton-one mybuttons" @click.stop="pull_down_menu=!pull_down_menu">=
                            <ul v-show="pull_down_menu">
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="addFileTrues">新增</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="BatchDelete">删除</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="rightBoxshow">批量修改</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="modelPrint">模板打印</el-button></li>
                                <li class="buttonlis" v-if="!tab_control"><el-button class="checkWay" type="primary" @click="ConcateFile(null)">批量挂接</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="exportNumber">导出数据</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="cancelFile">取消归档</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="enterstore">归入库位</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="fileTurnOver">跨全宗移交</el-button></li>
                                <li class="buttonlis"><el-button class="checkWay" type="primary" @click="goLog">档案日志</el-button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="nthDivthree" v-show="fileList_show">
                        <el-button type="primary" class="toolButtons checkWay" @click="BZPosition"><></el-button>
                        <el-button type="primary" class="toolButtons checkWay addButton" @click="addFileTrues">新增</el-button>
                        <el-button type="primary" class="toolButtons checkWay deleteButton" @click="BatchDelete">删除</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="rightBoxshow">批量修改</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="modelPrint">模板打印</el-button>
                        <el-button type="primary" class="toolButtons checkWay" v-if="!tab_control" @click="ConcateFile(null)">批量挂接</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="exportNumber">导出数据</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="cancelFile">取消归档</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="enterstore">归入库位</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="fileTurnOver">跨全宗移交</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="goLog">档案日志</el-button>
                    </div>
                    <div v-show="juannei_show" class="nthDivSix">
                        <el-button type="primary" class="toolButtons checkWay" @click="rightBoxshow">批量修改</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="ConcateFile(null)">批量挂接</el-button>
                        <el-button type="primary" class="toolButtons checkWay" @click="exportNumber">导出数据</el-button>
                    </div>
                </el-row>
                <!--档案表格-->
                <el-row v-show="fileListshow" class="fileList">
                    <el-col :span="24">
                        <el-table
                                :data="fileList"
                                style="width:100%"
                                ref="tableOne"
                                :stripe="true"
                                :height="tableHeight"
                                v-loading="isloading"
                                class="containTable indexTable lineTable"
                                @selection-change="selectionChange"
                                heighlight-current-row
                                border
                                @row-dblclick="RowDblclick"
                                :row-class-name="getRowClass"
                                @sort-change="headerclick"
                        >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column width="90" label="操作" fixed>
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

                                <el-table-column v-if="!item.hidden&&item.fieldName!='BZ'&&item.fieldName!='BZ1'"  :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ'&&!headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ1'&&headBz"  :prop="item.fieldName" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
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
                                v-loading="isloading1"
                                :height="tableHeight"
                                class="containTable indexTable lineTable"
                                @selection-change="selectionChange2"
                                border
                                @row-dblclick="RowDblclick"
                                @sort-change="headerclick2"
                                ref="tableThre">
                            <el-table-column type="selection" width="55" label="#" ></el-table-column>
                            <el-table-column prop="Serial" label="序号"></el-table-column>
                            <!--<el-table-column width="70" label="操作" fixed> <template slot-scope="scope">-->
                            <!--<el-button-->
                            <!--size="mini"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <template v-for="item in tableHeader_thr">
                                <el-table-column v-if="item.fieldName!='HOUSETYPE'&&!item.hidden" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
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
                <el-row v-show="!tab_control" class="fileList">
                    <el-col :span="24">
                        <el-table
                                :data="wenjianArr"
                                style="width:100%"
                                :stripe="true"
                                tooltip-effect="dark"
                                v-loading="isloading2"
                                :height="tableHeight"
                                class="containTable indexTable lineTable"
                                @selection-change="selectionChange3"
                                border
                                @row-dblclick="RowDblclick"
                                ref="tablefor"
                                @sort-change="headerclick3"
                                :row-class-name="getRowClass">
                            <el-table-column type="selection" width="55" label="#" ></el-table-column>
                            <el-table-column prop="Serial" label="序号"></el-table-column>
                            <!--<el-table-column width="70" label="操作" fixed>-->
                            <!--<template slot-scope="scope">-->
                            <!--<el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <template v-for="item in tableHeader_for">
                                <!--<el-table-column :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.sortSeq"></el-table-column>-->
                                <el-table-column v-if="item.fieldName!='HOUSETYPE'&&!item.hidden&&item.fieldName!='BZ1'&&item.fieldName!='BZ'" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="item.fieldName=='HOUSETYPE'&&!item.hidden"  :width="item.width" :label="item.caption" :key="item.sortSeq" :sortable="sortable">
                                    <template slot-scope="scope">
                                        <span  class="superTarget"  v-if="Number(scope.row.HOUSETYPE)===2&&!item.hidden" @click="fileDetails(scope.row)">{{scope.row.HOUSETYPE_Text}}</span>
                                        <span  v-else>{{scope.row.HOUSETYPE_Text}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ1'&&headWBz" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
                                <el-table-column v-if="!item.hidden&&item.fieldName=='BZ'&&!headWBz" :prop="item.dictData==null?item.fieldName:item.fieldName+'_Text'" :width="item.width" :label="item.caption" :key="item.fieldName" :sortable="sortable"></el-table-column>
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
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[500,800,1000]" :page-size="limit" :total="total"   :current-page="page" :pager-count="5"  v-if="pageOne"></el-pagination>
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :page-sizes="[500,800,1000]" :page-size="limit1" :total="total1"  :current-page="page" :pager-count="5" v-if="pageTwo"></el-pagination>
                    <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :page-sizes="[500,800,1000]" :page-size="limit2" :total="total2"  :current-page="page" :pager-count="5" v-if="pageThr"></el-pagination>
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
                                        <el-input v-model.trim="form.replaceValue" class="longInput" v-show="ElSelectTrue||form.region=='XMBH'||form.region=='XMMCNEW'"></el-input>
                                        <el-select v-model="form.replaceValue" class="longInput" v-show="!ElSelectTrue&&form.region!='XMBH'&&form.region!='XMMCNEW'">
                                            <el-option v-for='ind in formSelectArr' :label="ind.text" :value="ind.code" :key="ind.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="替换为 :">
                                        <el-input v-model.trim="form.replaceTo" class="longInput" v-show="ElSelectTrue"></el-input>
                                        <el-select v-model="form.replaceTo" filterable class="longInput" v-show="!ElSelectTrue">
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
                        <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength" placeholder="正确格式:如1或1-1"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='WJRQ'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:timevalidator,trigger:'blur'}]">
                        <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'"  v-if="item.editControl==8" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'},{validator:myvalidator,trigger:'blur'}]">
                        <el-input :readonly="!item.allowEdit"  v-model.number="addfile[item.fieldName]" type="number" :maxlength="item.maxLength" min="0"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='FLH'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <!--<el-select  v-model="addfile[item.fieldName]">-->
                        <!--<el-option v-for="ind in FLhArr" :label="ind.categoryNumberText" :value="ind.categoryNumber" :key="ind.categoryNumber" :disabled="!item.allowEdit">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <el-input :readonly="true" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-show="false"></el-input>
                        <el-input :readonly="true" v-model="flhName"   :maxlength="item.maxLength" @focus="SelectFlh(item.allowEdit)"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.editControl==3" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <el-select :readonly="!item.allowEdit" v-model="addfile[item.fieldName]">
                            <el-option v-for="ind in item.dictData" :label="ind.text" :value="ind.code" :key="ind.code" :disabled="!item.allowEdit">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" :class="{'textareaItem':item.editControl==9}"  v-if="item.editControl==9" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                        <el-input :readonly="!item.allowEdit" class="textareaItem" type="textarea" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"></el-input>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.editControl==10" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'blur'}]">
                        <el-date-picker :readonly="!item.allowEdit" v-model="addfile[item.fieldName]" :maxlength="item.maxLength"  value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date"></el-date-picker>
                    </el-form-item>
                    <el-form-item  :label="item.caption+' :'" v-if="item.fieldName=='XMBH'||item.fieldName=='XMMCNEW'" :prop="item.fieldName" :rules="[{required:!item.allowBlank,message:'请填写'+item.caption,trigger:'change'}]">
                        <el-input :readonly="!item.allowEdit" v-model="addfile[item.fieldName]"   :maxlength="item.maxLength" v-if="!isProjectCompany"></el-input>
                        <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMBH'">
                            <el-option v-for="ind in projectCodearr" :key="ind.id" :label="ind.projectCode" :value="ind.projectCode" @click.native="projectCodechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                        </el-select>
                        <el-select  filterable  v-model="addfile[item.fieldName]" v-if="isProjectCompany&&item.fieldName=='XMMCNEW'">
                            <el-option v-for="ind in projectNamearr" :key="ind.id" :label="ind.projectName" :value="ind.projectName"  @click.native="projectNamechange(ind,item)" :disabled="!item.allowEdit"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="item.caption+' :'" v-if="item.fieldName=='QZH'" prop="QZH" :rules="[{require:!item.allowBlank,message:'请选择'+item.caption,trigger:'change'}]">
                        <el-select v-model="addfile[item.fieldName]" filterable v-if="!ISJT">
                            <el-option v-for="ind in QZHArr" :key="ind.value" :label="ind.value" :value="ind.value" :disabled="!item.allowEdit"></el-option>
                        </el-select>
                        <el-select v-model="addfile[item.fieldName]"  filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" v-if="ISJT">
                            <el-option v-for="item in JTarr" :key="item.id" :label="item.label" :value="item.value"></el-option>
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
            <el-row v-if="activeName=='second'">
                <div class="exportrong">
                    选择导出内容
                </div>
                <div class="exportType">
                    <el-radio v-model="exportcontent" label="5">卷内</el-radio>
                </div>
            </el-row>
            <el-row v-if="activeName=='third'">
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
        <el-dialog class="ConcateFile" :visible.sync="ConcateVisible" title="批量挂接">
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
        <!--分类号-->
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
    import Service from './archiveManagement.service';
    import { Loading } from 'element-ui';
    Component.registerHooks([
        'beforeRouteEnter',
        'beforeRouteLeave',
        'beforeRouteUpdate'
    ]);
    @Component
    export default class apparchiveManagement extends Vue{
        sortable:string='custom';
        Url:string;
        fonddata:any=[];
        fondNameQiao:string;
        commit:string = '';
        fondName:string;
        riGuajie :boolean;
        tab_control:boolean;
        key_word:string;
        searcharr:any=[];//搜索配置表单
        pull_down_menu:boolean;
        activeName:string;
        rankId_one:number;
        treesId:number;
        rankId_two:number;
        rankId_thr:number;
        kinId:number;
        parentIdQiao:number;
        parentId:number;
        start:number;
        total:number;
        taskId:number;
        page:number;
        limit:number;
        start1:number;
        total1:number;
        page1:number;
        limit1:number;
        start2:number;
        total2:number;
        page2:number;
        limit2:number;
        CheckAfter:boolean;
        company:any={};
        YPdefaultProps:any={};
        tree:any=[];
        Companytree:any=[];
        defaultProps:any={};
        YPdefaultProps:any={};
        fieldType:any={};
        ContainfieldType:any={};
        fileList:any=[];
        fileList_show:boolean;
        fileListshow:boolean;
        juanneiArr:any=[];
        juannei_show:boolean;
        wenjian_show:boolean;
        wenjianArr:any=[];
        tableHeader:any=[];
        tableHeader_thr:any=[];
        tableHeader_for:any=[];
        isloading:boolean;
        isloading1:boolean;
        isloading2:boolean;
        tableHeaderArr:any=[];
        repalceMany:boolean;
        activenames:string;
        form:any={};
        formArr:any=[];
        Addrform:any={};
        addArr:any=[];
        combineform:any={};
        combineArr:any=[];
        combinefile:boolean;
        addfile:any={};
        searchform:any={};
        searchform1:any={};
        searchform2:any={};
        searchform3:any={};
        tableHeight:number;
        exportNumTrue:boolean;
        exportrong:string;
        selectType:string;
        exportcontent:string;
        exportStyle:string;
        ExportType:string;
        addFileTrue:boolean;//新增
        redactFile:boolean;//编辑案卷
        addArray:any=[];
        fondCodeQiao:string;
        dec:string;
        mathHeight:number;
        fondCode:string;//当前全宗号
        EditArr:any={};//编辑案卷数据
        OrderNum:number;//上一条，下一条
        selection:any=[];//被选中的项
        selection2:any=[];//被选中的项
        selection3:any=[];//被选中的项
        searchConfig:any=[];//搜索框的配置
        searchConfig2:any=[];//搜索框的配置
        searchConfig3:any=[];//搜索框的配置
        searchContent:any=[];//要搜索的内容
        searchContent2:any=[];//要搜索的内容
        searchContent3:any=[];//要搜索的内容
        clickTwo:boolean;//所有卷内文件第一次点击
        pageOne:boolean;//分页显隐
        pageTwo:boolean;//分页显隐
        pageThr:boolean;//分页显隐
        NumberModelTrue:boolean;//数据模板
        checkNumberModel:string;//数据模板选中项
        Containtree: any = [];//树内部的树
        commitDialogTrue:boolean;//控制上传数据
        ElSelectTrue:boolean;//控制按内容替换的输入项的显隐
        formSelectArr:any = [];//按内容替换的下拉列表
        ConcateVisible:boolean;//批量挂接显隐变换
        ConcateObj:any = {};//挂接类型选择
        ConcateType :string;//挂接类型
        limitNumber:number;//上传文件的个数控制
        upList:any = [];//上传的数组
        choosedRole:any=[];//默认选中的节点
        fromStore:string;
        isProjectCompany:boolean;
        isProjectCompanyQiao:boolean;
        projectCodearr:any=[];
        projectNamearr:any=[];
        autoMatchParams:any={};
        QZHArr:any=[];
        MainShow:boolean;
        storeArr:any = [];
        loadingInstance:any;
        FLhArr:any = [];
        storeName:string;
        matchedCount:any;
        existFile:boolean;
        errorMacth:any = [];
        anJuanId:any;
        ISJT:boolean;
        JTarr:any=[];
        expandedRole:any=[];
        sort1:boolean;
        sort3:boolean;
        sort4:boolean;
        TypeChangeValue1: any;
        TypeChangeValue2: any;
        TypeChangeValue3: any;
        sortarr1: any = [];
        sortarr2: any = [];
        sortarr3: any = [];
        sortTree1: any = [];
        sortTree2: any = [];
        sortTree3: any = [];
        TreeSort: boolean;
        TreeSortType: any = {};
        sortName1:string;
        sortName2:string;
        sortName3:string;
        FlhTrue:boolean;
        flhType:any={};
        flhName:any;
        flhValue:any;
        exchangeSeqUp:boolean;
        exchangeSeqDow:boolean;
        searchkeyOne:any={};
        searchkeyTwo:any={};
        searchkeyThr:any={};
        searchValue:any;
        searchValue2:any;
        searchValue3:any;
        headBz:boolean;
        headWBz:boolean;
        sheetNumberTrue:boolean;
        treeFilters:any={};
        searchOptions:any=[];
        searchLoading:boolean;
        sortStr1:string;
        sortStr2:string;
        sortStr3:string;
        sortSort1:string;
        sortSort2:string;
        sortSort3:string;
        clickTime:any;
        clickId:number;
        constructor(){
            super();
            this.matchedCount = null;
            this.mathHeight = (document.documentElement.clientHeight - 152)/2-60;
            this.existFile = false;
            this.errorMacth = [];
            this.Url = HttpRequest['URLS'];
            this.fonddata = [];
            this.fondNameQiao = '';
            this.fondName="";
            this.tab_control=true;
            this.key_word="";
            this.pull_down_menu=false;
            this.activeName="first";
            this.searcharr=[];
            this.YPdefaultProps = {
                isLeaf: 'hasChildren',
                label: 'name',
                id:'id'
            };
            //分页
            this.dec = null;
            this.total=0;
            this.riGuajie = true;
            this.page=1;
            this.limit=500;
            this.total1=0;
            this.page1=1;
            this.limit1=500;
            this.total2=0;
            this.page2=1;
            this.limit2=500;
            this.CheckAfter=false;
            this.company="";
            this.defaultProps = {
                children:"children",
                label:"fondName"
            };
            this.fieldType={
                children:"children",
                label:"nodeName"
            };
            this.ContainfieldType={
                label:"fondName"
            }
            this.tableHeader=[];
            this.tableHeader_thr=[];
            this.tableHeader_for=[];
            this.fileList=[];
            this.fileList_show=true;
            this.fileListshow=true;
            this.juanneiArr=[];
            this.juannei_show=false;
            this.wenjian_show=false;
            this.wenjianArr=[];
            this.isloading=false;
            this.isloading1=false;
            this.isloading2=false;
            this.tableHeaderArr=[];
            this.repalceMany=false;
            this.activenames="one";
            this.autoMatchParams = {
                "wenJianLibId": '',
                "anJuanId": '',
                "fondId": '',
                "cloudDirectoryId": '',
                "matchRuleId": ''
            };
            this.form={
                region:null,
                replaceValue:null,
                replaceTo:''
            };
            this.formArr=[];
            this.Addrform={
                region:null,
                startNumber:null,
                endNumber:null,
                replaceTo:''
            };
            this.addArr=[];
            this.combineform={
                itemA:null,
                connectSign:null,
                itemB:null,
                concatTo:null
            };
            this.anJuanId = null;
            this.combineArr=[];
            this.combinefile=false;
            this.addfile={};
            this.searchform={};
            this.searchform1={};
            this.searchform2={};
            this.tableHeight = document.documentElement.clientHeight-297;
            this.exportNumTrue=false;
            this.exportrong="1";
            this.selectType="1";
            this.exportcontent="1";
            this.exportStyle="1";
            this.ExportType='xls';
            this.addFileTrue=false;
            this.redactFile=false;
            this.addArray=[];
            this.fondCode="";
            this.fondCodeQiao="";
            this.selection=[];
            this.selection2=[];
            this.selection3=[];
            this.searchConfig=[];
            this.searchConfig2=[];
            this.searchContent=[];
            this.searchContent2=[];
            this.searchContent3=[];
            this.clickTwo=true;
            this.pageOne=true;
            this.pageTwo=false;
            this.pageThr=false;
            this.NumberModelTrue=false;
            this.checkNumberModel = 'xls';
            this.Containtree = [];
            this.commitDialogTrue = false;
            this.ElSelectTrue = true;
            this.formSelectArr = [];
            this.ConcateVisible = false;
            this.ConcateObj = {
                title:1,
                titleNum:2
            };
            this.ConcateType = null;
            this.limitNumber = 1;
            this.upList = [];
            this.choosedRole = [];
            this.projectCodearr=[];
            this.projectNamearr=[];
            this.QZHArr=[];
            this.MainShow=false;
            this.storeArr = [];
            this.FLhArr = [];
            this.storeName = '';
            this.JTarr = [];
            this.storeName = null;
            this.kinId = null;
            this.expandedRole=[];
            this.sort1 = true;
            this.sort3 = true;
            this.sort4 = true;
            this.parentId = null;
            this.sortarr1 = [];
            this.sortarr2 = [];
            this.sortarr3 = [];
            this.TypeChangeValue1 = null;
            this.TypeChangeValue2 = null;
            this.TypeChangeValue3 = null;
            this.TreeSort = true;
            this.sortTree1 = [];
            this.sortTree2 = [];
            this.sortTree3 = [];
            this.TreeSortType = {
                label: "text"
            };
            this.sortName1 = null;
            this.sortName2 = null;
            this.sortName3 = null;
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

            this.searchValue = null;
            this.searchValue2 = null;
            this.searchValue3 = null;
            this.headBz = false;
            this.headWBz = false;
            this.sheetNumberTrue = false;
            this.treeFilters={
                title:''
            };
            this.searchOptions = [];
            this.searchLoading = false;
            this.sortStr1 = '';
            this.sortStr2 = '';
            this.sortStr3 = '';
            this.sortSort1 = '';
            this.sortSort2 = '';
            this.sortSort3 = '';
            this.clickTime = null;
            this.clickId = null;
        };
        changeType(){
            for(let a of this.ConcateObj){
                if(a.id === Number(this.ConcateType)){
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
            if(this.activeName=='third'){
                var obj = {
                    libId:this.rankId_thr,
                    arvhiveId:row.id,
                    fondId:this.parentId,
                    isProjectCompany:this.isProjectCompany
                };
                window.sessionStorage.setItem('BJrecord',JSON.stringify(obj))
                this['$router'].push({
                    path:'/fileArrange/fileManagement/BJrecord',
                    // query:{
                    //     libId:this.rankId_thr,
                    //     arvhiveId:row.id,
                    //     fondId:this.parentId
                    // }
                })
            }else if(this.activeName=='second'){
                var obj = {
                    libId:this.rankId_two,
                    arvhiveId:row.id,
                    fondId:this.parentId,
                    isProjectCompany:this.isProjectCompany
                };
                window.sessionStorage.setItem('BJrecord',JSON.stringify(obj))
                this['$router'].push({path:'/fileArrange/fileManagement/BJrecord',})
            }else{
                // if(this.activeName=='first'){
                this.flhName = null;
                Service.getEditField(this.rankId_one).then(res=>{
                    if(res.data.succeeded){
                        this.addArray=res.data.data;
                        for(var item of res.data.data){
                            this['$set'](this.addfile,item.fieldName,null)
                        };
                        this.IsCompany(this.parentId);
                        if(this.isProjectCompany){
                            Service.findByFond({}).then(res=>{
                                if(res.data.succeeded){
                                    this.projectCodearr=res.data.data;
                                    this.projectNamearr=res.data.data;
                                }else{
                                    this.getError(res.data.errorMessage)
                                }
                            })
                        }
                        this['$refs']['addfile']['resetFields']();
                        Service.getNumber({libId:this.rankId_one,id:row.id}).then(res=>{
                            if(res.data.succeeded){
                                this.QZHArr=[];
                                var str = JSON.stringify(res.data.data);
                                this.EditArr=JSON.parse(str)
                                this.addfile=res.data.data;
                                this.QZHArr.push({value:res.data.data.QZH})
                                if(res.data.data.QZH!=res.data.data.DQQZH){
                                    this.QZHArr.push({value:res.data.data.DQQZH})
                                };
                                this.getFla();
                                // this.EditArr=res.data.data;
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                });
                for(let ind in this.fileList){
                    if(row.id==this.fileList[ind].id){
                        this.OrderNum = ind/1 ;
                    };
                };
                var dialogHeaderEl = document.querySelector('.dragDialog');
                var dragDom = dialogHeaderEl.querySelector('.el-dialog');
                dragDom['style'].left ='auto';
                dragDom['style'].top = '0px';
                dialogHeaderEl['style'].left ='auto';
                dialogHeaderEl['style'].top =`0px`;
                this.addFileTrue=true;
                this.redactFile=true;
            };
        };

        handleDelete(index, row) {
            let arr = [];
            arr.push(row);
            var obj={
                lib:this.rankId_two,//案卷libId
                wenId: this.rankId_one,//文件libId
                id:row.id,
                title:row.TM,
                fond:this.parentId,
                kind:this.kinId,
                qzh:row.QZH,
                isProjectCompany:this.isProjectCompany,
                fondCode:this.fondCode,
                storeName:this.storeName
            };
            window.sessionStorage.setItem('rankIn',this.rankId_two.toString());
            window.sessionStorage.setItem('archiveIn',JSON.stringify(obj));
            window.sessionStorage.setItem('printArray',JSON.stringify(arr));
            this['$router'].push({path:"/fileArrange/archiveManagement/archiveIn",name:'档案管理卷内文件'})
        };

        handleCurrentChange(val) {
            this.page = val;
            this.start = (val-1)*(this.limit);
            if(this.sortName1&&this.TypeChangeValue1){
                this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
            }else{
                this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
            }
        };
        handleCurrentChange2(val) {
            this.page1 = val;
            this.start1 = (val-1)*(this.limit1);
            if(this.sortName2&&this.TypeChangeValue2){
                this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
            }else{
                this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
            }
        };
        handleCurrentChange3(val) {
            this.page2 = val;
            this.start2 = (val-1)*(this.limit2);
            if(this.sortName3&&this.TypeChangeValue3){
                this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
            }else{
                this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
            }
        };

        handleSizeChange(val) {
            this.limit = val;
            this.start = val*(this.page-1);
            if(this.sortName1&&this.TypeChangeValue1){
                this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
            }else{
                this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
            }
            // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
        };
        handleSizeChange2(val) {
            this.limit1 = val;
            this.start1 = val*(this.page1-1);
            if(this.sortName2&&this.TypeChangeValue2){
                this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
            }else{
                this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
            }
            // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
        };
        handleSizeChange3(val) {
            this.limit2= val;
            this.start2 = val*(this.page2-1);
            if(this.sortName3&&this.TypeChangeValue3){
                this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
            }else{
                this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
            }
            // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:""}})
        };

        //取当前用户全宗
        getfiles():void{
            Service.getFondSearch({}).then(res=>{
                if(res.data.succeeded){
                    this.parentIdQiao = res.data.data.id;
                    this.parentId = res.data.data.id;
                    this.isProjectCompany = res.data.data.isProjectCompany;
                    this.isProjectCompanyQiao = res.data.data.isProjectCompany;
                    this.GetEscrow(this.parentId);
                    this.fondCode = res.data.data.fondCode;
                    this.fondName='[ '+res.data.data.fondCode+' ]'+res.data.data.fondName;
                    this.fondNameQiao ='[ '+res.data.data.fondCode+' ]'+res.data.data.fondName;
                    Service.archiveNowFile(this.parentId).then(res=>{
                        if(res.data.succeeded){
                            this.tree=res.data.data;
                            this.getTreeName(this.tree);
                        }else{
                            this.getError(res.data.errorMessage)
                        }
                    })
                }else{
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
        搜索全宗
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
            if(this.treeFilters.title!=null){
                for(var son of this.searchOptions){
                    if(this.treeFilters.title==son.value){
                        var data = son;
                    };
                }
                this.parentIdQiao = data['value'];
                this.fondNameQiao = data['label'];
                this.fondCodeQiao = data['fondCode'];
                this.isProjectCompanyQiao = data['isProjectCompany'];
                this.ChoseOK();
            }
        };

        //公司树的点击
        NodeClick(data:any,node:any,tree:any){
            this.parentIdQiao=data.id;
            this.fondNameQiao=data.fondName;
            this.fondCodeQiao=data.fondCode;
            this.isProjectCompanyQiao=data.isProjectCompany;
            this.GetEscrow(data.id);
            if(data.id == this.clickId&&Date.now()-this.clickTime<=300){
                this.ChoseOK();
                document.getElementsByClassName('el-dropdown-menu')[0]['style'].display = 'none';
            }
            this.clickTime = Date.now();
            this.clickId = data.id;
        };

        // //懒加载树
        // treeLoad(node,resolve){
        //     if(node.level===0){
        //         Service.getSonUrl({}).then(res=>{
        //             if(res.data.succeeded){
        //                 let treeData = [];
        //                 let data = res.data.data;
        //                 for (var item of data){
        //                     let leaf = item.hasChildren;
        //                     item.hasChildren = !leaf;
        //                 };
        //                 data.forEach(item => {
        //                     item.fondName = '[ '+item.fondCode+' ]'+item.fondName;
        //                     treeData.push(item)
        //                 });
        //                 resolve(treeData);
        //             }else{
        //                 this.getError(res.data.errorMessage);
        //             };
        //         });
        //     }else{
        //         var id = node.data.id;
        //         Service.getFondChild(id).then(res=>{
        //             if(res.data.succeeded){
        //                 let treeData = [];
        //                 let data=res.data.data;
        //                 for(var item of data){
        //                     let leaf = item.hasChildren;
        //                     item.hasChildren = !leaf;
        //                 };
        //                 data.forEach(item => {
        //                     item.fondName = '[ '+item.fondCode+' ]'+item.fondName;
        //                     treeData.push(item)
        //                 });
        //                 resolve(treeData);
        //             }else{
        //                 this.getError(res.data.errorMessage)
        //             }
        //         })
        //     }
        // }

        //取当前全宗的代管全宗
        GetEscrow(id:number){
            Service.GetEscrow(id).then(res=>{
                if(res.data.succeeded){
                    let arr = [];
                    for(var item of res.data.data){
                        item.fondName = '['+item.fondCode+']'+item.fondName;
                        arr.push(item)
                    }
                    this.Containtree = arr;
                    document.getElementsByClassName('companytreeBox')[0]['style'].height='60%';
                    document.getElementsByClassName('companytreeBox')[0]['style'].paddingBottom='0px';
                    document.getElementsByClassName('ManageFondBox')[0]['style'].display='block';
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //代管公司树的点击
        ManageFondClick(data:any,node:any,tree:any){
            this.parentIdQiao=data.id;
            this.fondNameQiao=data.fondName;
            this.fondCodeQiao=data.fondCode;
            this.isProjectCompanyQiao = data.isProjectCompany;
        };

        //获取案卷列表
        pageType(data:any,node:any,tree:any){
            this.TypeChangeValue1 = null;
            this.TypeChangeValue2 = null;
            this.TypeChangeValue3 = null;
            this.sortName1 = null;
            this.sortName2 = null;
            this.sortName3 = null;
            this.choosedRole.length = 0;
            this['$refs']['treeku']['setCheckedKeys'](this.choosedRole);
            this.searchContent = [];
            this.searchContent2 = [];
            if(data.nodeType==2){
                this.headBz = false;
                this.headWBz = false;
                this.searchkeyOne.key=null;
                this.searchkeyTwo.key=null;
                this.searchkeyThr.key=null;
                this.searchValue = null;
                this.searchValue2 = null;
                this.searchValue3 = null;
                this.fileList = [];
                this.juanneiArr = [];
                this.wenjianArr = [];
                //根据档案分类取档案库
                this.kinId=data.kindId;
                this.storeName = data.nodeName;
                this.page = 1;
                this.total = 0;
                this.limit = 500;
                this.page1 = 1;
                this.total1 = 0;
                this.limit1= 500;
                this.page2 = 1;
                this.total2 = 0;
                this.limit2= 500;
                this.fromStore = data.nodeName;
                Service.getByKindId(this.kinId).then(res=>{
                    if(res.data.succeeded){
                        this.MainShow = true;
                        if(res.data.data.length!==1){
                            this.tab_control=true;
                            this.activeName='first';
                            this.fileList_show=true;
                            this.fileListshow=true;
                            this.juannei_show=false;
                            this.pageOne=true;
                            this.pageTwo=false;
                            this.pageThr=false;
                            this.clickTwo = true;
                            for(var ind of res.data.data){
                                if(ind.rank==3){
                                    this.rankId_one=ind.id;
                                }else if(ind.rank==4){
                                    this.rankId_two=ind.id;
                                };
                            };
                            this.exportcontent='1';
                            // //rank==3
                            // this.rankId_one=res.data.data[0].id
                            // //rank==4
                            // this.rankId_two=res.data.data[1].id
                            //请求画面表格的列配置
                            this.getListConfig(this.rankId_one);
                            // this.getSearchConfig(this.rankId_one);
                            this.getSupportGroupByFields(this.rankId_one);
                            this.tab_control=true;
                            // this.main_show=true;
                        }else{
                            this.tab_control=false;
                            this.fileList_show=true;
                            this.fileListshow=false;
                            this.juannei_show=false;
                            this.pageOne=false;
                            this.pageTwo=false;
                            this.pageThr=true;
                            this.activeName="third";
                            this.exportcontent='4';
                            this.rankId_thr = res.data.data[0].id;
                            this.getListConfig(this.rankId_thr);
                            // this.getSearchConfig(this.rankId_thr);
                            this.getSupportGroupByFields(this.rankId_thr);
                        }
                    }else{
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
                        this.sortarr2 = JSON.parse(data);
                        this.sortarr2.unshift({caption: '无', fieldName: null});
                    } else if (ID == this.rankId_thr) {
                        this.sortarr3= [];
                        this.sortarr3 = res.data.data;
                        this.sortarr3.unshift({caption: '无', fieldName: null})
                    }

                }
            })
        }
        //getBykindId返回数据的长度为2时获取列表头部配置
        getListConfig(rankId:number){
            Service.getDispField(rankId).then(res=>{
                if(res.data.succeeded){
                    if(rankId===this.rankId_one){
                        this.tableHeader = [];
                        let data = JSON.stringify(res.data.data);
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
                        // this.tableHeader=JSON.parse(data);
                        // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }else{
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }
                    }else if(rankId===this.rankId_two){
                        this.tableHeader_thr = [];
                        let data = JSON.stringify(res.data.data)
                        this.tableHeader_thr=JSON.parse(data);
                    }else if(rankId===this.rankId_thr){
                        this.tableHeader_for = [];
                        let data = JSON.stringify(res.data.data);
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
                        this.tableHeader_for=arr;
                        this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //确定关闭公司书
        ChoseOK():void{
            if(this.TreeSort){
                this.TypeChangeValue1 = null;
                this.TypeChangeValue2 = null;
                this.TypeChangeValue3 = null;
                this.sortName1 = null;
                this.sortName2 = null;
                this.sortName3 = null;
                this.MainShow =false;
                this.kinId=null;
                this.storeName=null;
                this.MainShow = false;
                this.expandedRole = [];
                this.choosedRole = [];
                //当前全宗的档案结构分类
                this.fileList = [];
                this.juanneiArr = [];
                this.wenjianArr = [];
                this.clickTwo = true;
                this.total=0;
                this.page=1;
                this.limit=500;
                this.total1=0;
                this.page1=1;
                this.limit1=500;
                this.total2=0;
                this.page2=1;
                this.limit2=500;
                this.parentId = this.parentIdQiao;
                this.isProjectCompany=this.isProjectCompanyQiao;
                this.choosedRole=[];
                Service.archiveNowFile(this.parentId).then(res=>{
                    this.fondName = this.fondNameQiao;
                    this.fondCode = this.fondCodeQiao;
                    if(res.data.succeeded){
                        this.tree=res.data.data;
                        // if(res.data.data.length>0){
                        //     this.MainShow = true;
                        //     // var data = this.tree[0].children[0];
                        //     if(this.tree[0].children){
                        //         var data = this.tree[0].children[0];
                        //         if(data.children){
                        //             var data = data.children[0];
                        //             if(data.children){
                        //                 var data = data.children[0];
                        //             }
                        //         }
                        //     }
                        //     this.kinId = data.kindId;
                        //     this.storeName = data.nodeName;
                        //     var name = data.nodeName;
                        //     this.choosedRole.push(name);
                        //     this.fromStore = data.nodeName;
                        //     this['$refs'].treeku['setCheckedKeys'](this.choosedRole);
                        //     Service.getByKindId(this.kinId).then(res=>{
                        //         if(res.data.succeeded){
                        //             if(res.data.data.length==1){
                        //                 this.tab_control=false;
                        //                 this.fileList_show=true;
                        //                 this.fileListshow=false;
                        //                 this.juannei_show=false;
                        //                 this.pageOne=false;
                        //                 this.pageTwo=false;
                        //                 this.pageThr = true;
                        //                 this.activeName="third";
                        //                 this.exportcontent='4';
                        //                 this.rankId_thr = res.data.data[0].id;
                        //                 this.getListConfig(this.rankId_thr);
                        //                 this.getSearchConfig(this.rankId_thr);
                        //
                        //             }else if(res.data.data.length==2||res.data.data.length==0){
                        //                 this.activeName="first"
                        //                 this.tab_control=true;
                        //                 this.fileList_show=true;
                        //                 this.fileListshow=true;
                        //                 this.juannei_show=false;
                        //                 this.pageOne=true;
                        //                 this.pageTwo=false;
                        //                 this.pageThr = false;
                        //                 this.clickTwo = true;
                        //                 this.tab_control=true;
                        //                 this.exportcontent='1';
                        //                 // //rank==3
                        //                 // this.rankId_one=res.data.data[0].id
                        //                 // //rank==4
                        //                 // this.rankId_two=res.data.data[1].id
                        //                 for(var ind of res.data.data){
                        //                     if(ind.rank==3){
                        //                         this.rankId_one=ind.id;
                        //                     }else if(ind.rank==4){
                        //                         this.rankId_two=ind.id;
                        //                     };
                        //                 };
                        //                 //请求画面表格的列配置
                        //                 this.getListConfig(this.rankId_one);
                        //                 this.getSearchConfig(this.rankId_one);
                        //             }
                        //         }else{
                        //             this.getError(res.data.errorMessage)
                        //         }
                        //     });
                        //     this.getTreeName(this.tree);
                        // }else{
                        //     this.MainShow = false;
                        // }
                        this.getTreeName(this.tree);
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                });
            };
        }

        //列表数据配置
        getListNumber(params:any){
            this.isloading=true;
            Service.FileSearch(params).then(res=>{
                if(res.data.succeeded){
                    this.sortStr1 = res.data.sort;
                    let data = JSON.stringify(res.data.data);
                    var olddata = JSON.parse(data);
                    var arr = [];
                    for(let i=0;i<olddata.length;i++){
                        if('BZ' in olddata[i]){
                            olddata[i]['BZ1'] = olddata[i]['BZ'];
                        };
                        olddata[i].Serial = this.limit*(this.page-1)+i+1;
                        arr.push(olddata[i])
                    };
                    this.fileList = arr;
                    // this.fileList=JSON.parse(data);
                    this.total=res.data.totalRecords;
                    this.page=res.data.page;
                    this.$nextTick(()=>{
                        this.isloading = false;
                    });
                    //this.pageSize=res.data.pageSize;
                }else{
                    this.fileList=[];
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //获取卷内文件
        getInfilePapers(params:any):void{
            this.isloading1 = true;
            Service.searchJuanNei(params).then(res=>{
                if(res.data.succeeded){
                    this.sortStr2 = res.data.sort;
                    let data = JSON.stringify(res.data.data);
                    var olddata = JSON.parse(data);
                    for(let key in olddata){
                        olddata[key].Serial = this.limit1*(this.page1-1)+(key/1)+1;
                    }
                    this.juanneiArr=olddata;
                    this.total1=res.data.totalRecords;
                    this.page1=res.data.page;
                    this.$nextTick(()=>{
                        this.isloading1 = false;
                    });
                }else{
                    this.juanneiArr=[];
                    this.getError(res.data.errorMessage);
                }
            })
        };

        //取文件级档案列表
        Searchwenjian(params){
            this.isloading2 = true;
            Service.WenjianSearch(params).then(res=>{
                if(res.data.succeeded){
                    this.sortStr3 = res.data.sort;
                    let data = JSON.stringify(res.data.data);
                    var olddata = JSON.parse(data);
                    var arr = [];
                    for(let key in olddata){
                        if('BZ' in olddata[key]){
                            olddata[key]['BZ1'] = olddata[key]['BZ'];
                        };
                        olddata[key].Serial = this.limit2*(this.page2-1)+(key/1)+1;
                        arr.push(olddata[key])
                    };
                    this.wenjianArr=arr;
                    this.total2=res.data.totalRecords;
                    this.page2=res.data.page;
                    this.$nextTick(()=>{
                        this.isloading2 = false;
                    });
                }else{
                    this.Warn(res.data.errorMessage)
                };
            })
        }
        // 跳转文件移交
        toTransfer(){
            if(this.activeName=='first'){
                if(this.selection.length>0){
                    var arr = [];
                    for(var item of this.selection){
                        arr.push(item.id)
                    }
                    this['$router'].push({path:'/fileArrange/fileTransferApply/fileTransferApply',query:{ids:arr,lib:this.rankId_one,fond:this.parentId,kind:this.kinId}});
                }else{
                    this.Warn("请选择要移交的文件。")
                };
            }else{
                if(this.selection3.length>0){
                    var arr = [];
                    for(var item of this.selection3){
                        arr.push(item.id)
                    }
                    this['$router'].push({path:'/fileArrange/fileTransferApply/fileTransferApply',query:{ids:arr,lib:this.rankId_thr,fond:this.parentId,kind:this.kinId}});
                }else{
                    this.Warn("请选择要移交的文件。")
                };
            }
        };

        rightBoxshow():void{
            if(this.activeName=='first'){
                this.getBatchModifiableFields(this.rankId_one)
            }else if(this.activeName=='third'){
                this.getBatchModifiableFields(this.rankId_thr)
            }else{
                this.getBatchModifiableFields(this.rankId_two)
            };
        };

        //tabs的方法
        handleClick(tab) {
            if(tab.name==="second"){
                if(this.clickTwo){
                    this.getListConfig(this.rankId_two);
                    // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
                    if(this.sortName2&&this.TypeChangeValue2){
                        this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                    }else{
                        this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                    }
                    this.getSupportGroupByFields(this.rankId_two);
                    this.clickTwo = false;
                }
                this.fileList_show=false;
                this.fileListshow=false;
                this.juannei_show=true;
                this.pageOne=false;
                this.pageTwo=true;
                this.exportcontent='3';
                if (this.TypeChangeValue2 == null) {
                    this.TreeSort = true;
                } else {
                    this.TreeSort = false;
                }
                // this.getSearchConfig(this.rankId_two);
            }else if(tab.name==="first"){
                this.fileList_show=true;
                this.fileListshow=true;
                this.fileListshow=true;
                this.juannei_show=false;
                this.pageOne=true;
                this.pageTwo=false;
                this.exportcontent='1';
                if (this.TypeChangeValue1 == null) {
                    this.TreeSort = true;
                } else {
                    this.TreeSort = false;
                }
                // this.getSearchConfig(this.rankId_one);
            }
        };

        //批量修改的tabs方法
        AmendTabClick(){
            this.form={
                region:null,
                replaceValue:null,
                replaceTo:''
            };
            this.Addrform={
                region:null,
                startNumber:null,
                endNumber:null,
                replaceTo:''
            };
            this.combineform={
                itemA:null,
                connectSign:null,
                itemB:null,
                concatTo:null
            };
        }
        //获取搜索框的配置
        getSearchConfig(libId:number){
            Service.Getquerycondition(libId).then(res=>{
                if(res.data.succeeded){
                    if(res.data.data.length>3){
                        document.getElementsByClassName("tablePosition")[0]['style'].top='155px';
                        document.getElementsByClassName("rowTwo")[0]['style'].paddingTop='10px'
                    }else{
                        document.getElementsByClassName("tablePosition")[0]['style'].top='115px';
                        document.getElementsByClassName("rowTwo")[0]['style'].paddingTop='0'
                    }
                    if(this.activeName=='first'){
                        this.searchConfig=res.data.data;
                        for(var item of res.data.data){
                            this['$set'](this.searchform,'value'+item.id,null)
                        };
                    }else if(this.activeName=='second'){
                        this.searchConfig2=res.data.data;
                        for(var item of res.data.data){
                            this['$set'](this.searchform2,'value'+item.id,null)
                        };
                    }else if(this.activeName=='third'){
                        this.searchConfig3=res.data.data;
                        for(var item of res.data.data){
                            this['$set'](this.searchform3,'value'+item.id,null)
                        };
                    }
                    this.tableHeight = document.getElementsByClassName('tablePosition')[0].clientHeight-95;

                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //搜索按钮
        searchKey():void{
            // if(this.activeName=='first'){
            //     this.searchContent=[];
            //     for(var key in this.searchform){
            //         if(this.searchform[key]!=null&&this.searchform[key]!=""){
            //             var Name = key.slice(5);
            //             var str = parseInt(Name)
            //             var obj = {
            //                 id:str,
            //                 value:this.searchform[key]
            //             };
            //             this.searchContent.push(obj)
            //         };
            //     };
            //     // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:1, pageSize:this.limit,sort:""}})
            //     if(this.sortName1&&this.TypeChangeValue1){
            //         this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:1, pageSize:this.limit,sort:""}});
            //     }else{
            //         this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:1, pageSize:this.limit,sort:""}});
            //     }
            // }else if(this.activeName=='second'){
            //     this.searchContent2=[];
            //     for(var key in this.searchform2){
            //         if(this.searchform2[key]!=null&&this.searchform2[key]!=""){
            //             var Name = key.slice(5);
            //             var str = parseInt(Name)
            //             var obj = {
            //                 id:str,
            //                 value:this.searchform2[key]
            //             };
            //             this.searchContent2.push(obj)
            //         };
            //     };
            //     // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:1, pageSize:this.limit1,sort:""}});
            //     if(this.sortName2&&this.TypeChangeValue2){
            //         this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:1, pageSize:this.limit1,sort:""}});
            //     }else{
            //         this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:1, pageSize:this.limit1,sort:""}});
            //     }
            // }else if(this.activeName=='third'){
            //     this.searchContent3=[];
            //     for(var key in this.searchform3){
            //         if(this.searchform3[key]!=null&&this.searchform3[key]!=""){
            //             var Name = key.slice(5);
            //             var str = parseInt(Name)
            //             var obj = {
            //                 id:str,
            //                 value:this.searchform3[key]
            //             };
            //             this.searchContent3.push(obj)
            //         };
            //     };
            //     // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:1, pageSize:this.limit2,sort:""}})
            //     if(this.sortName3&&this.TypeChangeValue3){
            //         this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:1, pageSize:this.limit2,sort:""}})
            //     }else{
            //         this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:1, pageSize:this.limit2,sort:""}})
            //     }
            // };
            if(this.activeName=='first'){
                this.searchValue = this.searchkeyOne.key;
                if(this.sortName1&&this.TypeChangeValue1){
                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:1, pageSize:this.limit,sort:this.sortSort1}});
                }else{
                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:1, pageSize:this.limit,sort:this.sortSort1}});
                }
            }else if(this.activeName=='second'){
                this.searchValue2 = this.searchkeyTwo.key;
                if(this.sortName2&&this.TypeChangeValue2){
                    this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:1, pageSize:this.limit1,sort:this.sortSort2}});
                }else{
                    this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:1, pageSize:this.limit1,sort:this.sortSort2}});
                }
            }else if(this.activeName=='third'){
                this.searchValue3 = this.searchkeyThr.key;
                if(this.sortName3&&this.TypeChangeValue3){
                    this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:1, pageSize:this.limit2,sort:this.sortSort3}})
                }else{
                    this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:1, pageSize:this.limit2,sort:this.sortSort3}})
                }
            };
        };

        //清空搜索按钮
        clearSearch(){
            // if(this.activeName=='first'){
            //     for(var key in this.searchform){
            //         this.searchform[key] = null;
            //     };
            // }else if(this.activeName=='second'){
            //     for(var key in this.searchform2){
            //         this.searchform2[key] = null;
            //     };
            // }else if(this.activeName=='third'){
            //     for(var key in this.searchform3){
            //         this.searchform3[key] = null;
            //     };
            // }
            if(this.activeName=='first'){
                this.searchValue = null;
                this.searchkeyOne.key = null;
            }else if(this.activeName=='second'){
                this.searchValue2 = null;
                this.searchkeyTwo.key = null;
            }else if(this.activeName=='third'){
                this.searchValue3 = null;
                this.searchkeyThr.key = null;
            }
        };

        pageSize():void{
            var Arr=document.querySelectorAll(".toolButtons");
            var buttonArr=Array.from(Arr);
            var Li=document.querySelectorAll(".buttonlis");
            var boxbutton=Array.from(Li);
            var len=document.querySelector(".rowThr")["offsetWidth"];
            var ind = 0;
            if(len===0){
                document.querySelector(".toolButton-one")["style"].display="none";
                buttonArr.forEach(function(item){
                    item["style"].display="block";
                })
            } else  if(len<=664){
                ind=1
                document.querySelector(".toolButton-one")["style"].display="block";
                if(len>660){
                    ind=2
                } else if(len<=660&&len>565){
                    ind=3
                }else if(len<=565&&len>510){
                    ind=4
                }else if(len<=510&&len>458){
                    ind=5
                }else if(len<=458&&len>379){
                    ind=6
                }else if(len<=379&&len>298){
                    ind=7
                }else if(len<=298&&len>217){
                    ind=8
                }else{
                    ind=9
                }
                for(var i=0;i<8;i++){
                    if(i<ind){
                        buttonArr[i]["style"].display="none"
                        boxbutton[i]["style"].display="block"
                    }else{
                        buttonArr[i]["style"].display="block"
                        boxbutton[i]["style"].display="none"
                    }

                }
            }else{
                document.querySelector(".toolButton-one")["style"].display="none";
                buttonArr.forEach(function(item){
                    item["style"].display="block"
                })
            }
        };

        //新增
        addFileTrues():void{
            if(this.activeName=='first'){
                this.getEiditFiled(this.rankId_one);
                var dialogHeaderEl = document.querySelector('.dragDialog');
                var dragDom = dialogHeaderEl.querySelector('.el-dialog');
                dragDom['style'].left ='auto';
                dragDom['style'].top = '0px';
                dialogHeaderEl['style'].left ='auto';
                dialogHeaderEl['style'].top =`0px`;
                this.flhName = null;
                this.redactFile=false;
                this.addFileTrue=true;
            }else if(this.activeName=='third'){
                var obj = {
                    fond:this.parentId,
                    kind:this.kinId,
                    lib:this.rankId_thr,
                    fondCode:this.fondCode,
                    isProjectCompany:this.isProjectCompany
                };
                window.sessionStorage.setItem('addrecord',JSON.stringify(obj))
                this['$router'].push({
                    path:'/fileArrange/fileManagement/addrecord',
                    // query:{
                    //     fond:this.parentId,
                    //     kind:this.kinId,
                    //     lib:this.rankId_thr,
                    //     fondCode:this.fondCode
                    // }
                })
            }
        };

        // //second下的新增
        // addFileTruesTwo():void{
        //     this.getEiditFiled(this.rankId_two);
        //     this.addFileTrue=true;
        // };
        //全宗号搜索
        remoteMethod(query){
            if (query !== '') {
                Service.searchFondsForInput(query).then((res) =>{
                    if(res.data.succeeded){
                        let data = res.data.data;
                        this.JTarr = data.map(item => {
                            return { value:item.fondCode, label: item.fondName+item.fondCode,id:item.id};
                        });
                        setTimeout(() => {
                            this.JTarr = this.JTarr.filter(item => {
                                return item.label.toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1;
                            });
                        }, 200);
                    }else{
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
        //是否为集团公司
        IsCompany(Id){
            Service.isTopCompany(Id).then(res=>{
                if(res.data.succeeded) {
                    this.ISJT = res.data.data;
                }
            })
        }
        //取得新增/编辑案卷页面的输入项配置
        getEiditFiled(id: number){
            Service.getEditField(id).then(res=>{
                if(res.data.succeeded){
                    this.addfile={};
                    this.QZHArr = [];
                    this.addArray=res.data.data;
                    for(var item of res.data.data){
                        this['$set'](this.addfile,item.fieldName,null)
                    };
                    this.getFla();
                    this.IsCompany(this.parentId);
                    this['$refs']['addfile']['resetFields']();
                    this.addfile.QZH=this.fondCode;
                    this.addfile.DQQZH=this.fondCode;
                    this.QZHArr.push({value:this.fondCode})
                    if(this.isProjectCompany){
                        Service.findByFond({}).then(res=>{
                            if(res.data.succeeded){
                                this.projectCodearr=res.data.data;
                                this.projectNamearr=res.data.data;
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };

        //取得编辑案卷页面的页面数据
        getReDactNumber(params:any){
            this.flhName = null;
            Service.getNumber(params).then(res=>{
                if(res.data.succeeded){
                    var str = JSON.stringify(res.data.data)
                    this.EditArr = JSON.parse(str)
                    var obj = JSON.stringify(res.data.data);
                    this.addfile = JSON.parse(obj);
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
                    // this.EditArr=res.data.data;
                }else{
                    this.getError(res.data.errorMessage);
                }
            })
        };

        //table表格选中项
        selectionChange(selection){
            this.selection=selection;
        };
        selectionChange2(selection){
            this.selection2=selection;
        };
        selectionChange3(selection){
            this.selection3=selection;
        };

        // 递归节点 增加className
        getTreeName(tree){
            for(let grass of tree){
                if(grass.nodeType===1&&grass.nodeName!=null){
                    grass.className = 'fa fa-plus-square-o';
                    grass.srcName = 'static/imgs/allTree/fileTreeTitle.png';
                    grass.marginLeft = '0';
                    this.getTreeName(grass.children);
                }else if(grass.nodeType===2&&grass.nodeName!=null){
                    grass.srcName = 'static/imgs/allTree/folderFiles.png';
                    grass.marginLeft = '5px';
                }
            }
        };

        // 自定义节点图标
        renderContent(createElement, { node, data }) {
            return createElement(
                'span',
                {
                    attrs:{
                        'class':'custom-tree-node',
                    },
                    style:{
                        'padding': '11px 0',
                    }
                },
                [
                    createElement(
                        'img',
                        {
                            attrs:{
                                'src':data.srcName
                            },
                            style:{
                                'margin': '1px 5px 0 2px ',
                                'max-width':'15px',
                                'float': 'left',
                                'margin-left':data.marginLeft
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-top':'3px',
                                'display':'block'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ]
            )
        };

        //保存并添加
        keepAdd(form){
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    this.addfile.rowStatus=1;
                    if(this.activeName=='first'){
                        Service.SaveFile({fondId:this.parentId,libId:this.rankId_one,data:this.addfile}).then(res=>{
                            if(res.data.succeeded){
                                for(var ind of this.addArray){
                                    if(!ind.isInherit){
                                        this.addfile[ind.fieldName] = null;
                                    };
                                };
                                this.Suces("保存成功。")
                                // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
                                if(this.sortName1&&this.TypeChangeValue1){
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }else{
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                            this.$nextTick(() => { this.loadingInstance.close();
                            });
                        })
                    }
                }else{
                    this.getError('请完善内容。');
                };
            });
        };
        keepAddTwo(form){
            this['$refs'][form]['validate']((valid)=>{
                if(valid){
                    this.loadingInstance = Loading.service(
                        {
                            lock: true,
                            text: '正在保存，请稍候',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    );
                    this.addfile.rowStatus=1;
                    if(this.activeName=='first'){
                        Service.SaveFile({fondId:this.parentId,libId:this.rankId_one,data:this.addfile}).then(res=>{
                            if(res.data.succeeded){
                                this.Suces("保存成功。")
                                this.addFileTrue = false;
                                // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                                if(this.sortName1&&this.TypeChangeValue1){
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }else{
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }
                            }else{
                                this.getError(res.data.errorMessage);
                            }
                            this.$nextTick(() => { this.loadingInstance.close();
                            });
                        })
                    }
                }else{
                    this.getError('请完善内容。');
                }
            })
        };
        //上一条
        proOne():void{
            var stepTrue=true;
            for (var key in this.addfile){
                if(this.addfile[key]!=this.EditArr[key]){
                    stepTrue=false;
                };
            };
            if(stepTrue){
                this.goproOne();
            }else{
                this['$confirm']('是否对上一条数据进行保存', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '不保存',
                    type: 'warning'
                }).then(() => {
                    this.Editcommit('addfile',this.goproOne)
                }).catch(() => {
                    this.goproOne()
                });
            }
        };

        //前往上一条
        goproOne(){
            if(this.activeName=='first'){
                if(this.OrderNum>0){
                    this.OrderNum-=1;
                    var ID=this.fileList[this.OrderNum].id
                    this.getReDactNumber({libId:this.rankId_one,id:ID})
                    this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);
                }else{
                    if(this.page>1){
                        this.page-=1;
                        this.OrderNum = this.limit - 1;
                        // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }else{
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }
                        setTimeout(()=>{
                            var ID=this.fileList[this.OrderNum].id
                            this.getReDactNumber({libId:this.rankId_one,id:ID})
                            this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);},1000)
                    }else{
                        this.Warn("已经是第一条数据。")
                    }
                }
            }else if(this.activeName=='second'){
                if(this.OrderNum>0){
                    this.OrderNum-=1;
                    var ID=this.juanneiArr[this.OrderNum].id
                    this.getReDactNumber({libId:this.rankId_two,id:ID})
                    this['$refs']['tableThr']['setCurrentRow'](this.juanneiArr[this.OrderNum]);
                }else{
                    if(this.page1>1){
                        this.page1-=1;
                        this.OrderNum = this.limit1 - 1;
                        // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
                        if(this.sortName2&&this.TypeChangeValue2){
                            this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                        }else{
                            this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                        }
                        setTimeout(()=>{
                            var ID=this.juanneiArr[this.OrderNum].id
                            this.getReDactNumber({libId:this.rankId_two,id:ID})
                            this['$refs']['tableThr']['setCurrentRow'](this.juanneiArr[this.OrderNum]);},1000)
                    }else{
                        this.Warn("已经是第一条数据。")
                    }
                }
            }else if(this.activeName=='third'){
                if(this.OrderNum>0){
                    this.OrderNum-=1;
                    var ID=this.wenjianArr[this.OrderNum].id
                    this.getReDactNumber({libId:this.rankId_thr,id:ID})
                    this['$refs']['tablefor']['setCurrentRow'](this.wenjianArr[this.OrderNum]);
                }else{
                    if(this.page2>1){
                        this.page2-=1;
                        this.OrderNum = this.limit2 - 1;
                        // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:""}})
                        if(this.sortName3&&this.TypeChangeValue3){
                            this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                        }else{
                            this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                        }
                        setTimeout(()=>{
                            var ID=this.wenjianArr[this.OrderNum].id
                            this.getReDactNumber({libId:this.rankId_thr,id:ID})
                            this['$refs']['tablefor']['setCurrentRow'](this.wenjianArr[this.OrderNum]);},1000)
                    }else{
                        this.Warn("已经是第一条数据。")
                    }
                }
            }
        };
        //下一条
        nextOne():void{
            var stepTrue=true;
            for (var key in this.addfile){
                if(this.addfile[key]!=this.EditArr[key]){
                    stepTrue=false;
                };
            };
            if(stepTrue){
                this.gonextOne()
            }else{
                this['$confirm']('是否对上一条数据进行保存', '提示', {
                    confirmButtonText: '保存',
                    cancelButtonText: '不保存',
                    type: 'warning'
                }).then(() => {
                    this.Editcommit('addfile',this.gonextOne);
                }).catch(() => {
                    this.gonextOne();
                });
            }
        };

        //前往下一页
        gonextOne(){
            if(this.activeName=='first'){
                var len = this.fileList.length;
                if(this.OrderNum<len-1){
                    this.OrderNum+=1;
                    var ID=this.fileList[this.OrderNum].id
                    this.getReDactNumber({libId:this.rankId_one,id:ID})
                    this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);
                }else{
                    this.page+=1;
                    var num = this.total/this.limit;
                    num = Math.ceil(num)
                    if(this.page<=num){
                        this.OrderNum = 0;
                        // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }else{
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }
                        setTimeout(()=>{
                            var ID=this.fileList[this.OrderNum].id
                            this.getReDactNumber({libId:this.rankId_one,id:ID})
                            this['$refs']['tableOne']['setCurrentRow'](this.fileList[this.OrderNum]);},1000)
                    }else{
                        this.Warn("已经是最后一条数据。");
                    }
                };
            }else if(this.activeName=='second'){
                var len = this.juanneiArr.length;
                if(this.OrderNum<len-1){
                    this.OrderNum+=1;
                    var ID=this.juanneiArr[this.OrderNum].id
                    this.getReDactNumber({libId:this.rankId_two,id:ID});
                    this['$refs']['tableThre']['setCurrentRow'](this.juanneiArr[this.OrderNum]);
                }else{
                    this.page1+=1;
                    var num = this.total1/this.limit1;
                    num = Math.ceil(num);
                    if(this.page1<=num){
                        this.OrderNum = 0;
                        // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
                        if(this.sortName2&&this.TypeChangeValue2){
                            this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                        }else{
                            this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                        }
                        setTimeout(()=>{
                            var ID=this.fileList[this.OrderNum].id
                            this.getReDactNumber({libId:this.rankId_one,id:ID})
                            this['$refs']['tableThre']['setCurrentRow'](this.juanneiArr[this.OrderNum]);},1000)
                    }else{
                        this.Warn("已经是最后一条数据。");
                    }
                };
            }else if(this.activeName=='third'){
                var len = this.wenjianArr.length;
                if(this.OrderNum<len-1){
                    this.OrderNum+=1;
                    var ID=this.wenjianArr[this.OrderNum].id
                    this.getReDactNumber({libId:this.rankId_thr,id:ID});
                    this['$refs']['tablefor']['setCurrentRow'](this.wenjianArr[this.OrderNum]);
                }else{
                    this.page2+=1;
                    var num = this.total2/this.limit2;
                    num = Math.ceil(num);
                    if(this.page2<=num){
                        this.OrderNum = 0;
                        // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:""}})
                        if(this.sortName3&&this.TypeChangeValue3){
                            this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                        }else{
                            this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                        }
                        setTimeout(()=>{
                            var ID=this.wenjianArr[this.OrderNum].id
                            this.getReDactNumber({libId:this.rankId_thr,id:ID})
                            this['$refs']['tablefor']['setCurrentRow'](this.wenjianArr[this.OrderNum]);},1000)
                    }else{
                        this.Warn("已经是最后一条数据。");
                    }
                };
            }
        };

        //编辑之后的提交
        Editcommit(form,cb){
            this['$refs'][form]['validate']((valid)=>{
                if(valid) {
                    var DhName = 0;
                    for(var key in this.addfile){
                        if(this.EditArr[key]!=this.addfile[key]){
                            this.EditArr[key]=this.addfile[key];
                            for(var ind of this.addArray){
                                console.log(key)
                                if(ind['fieldName']==key&&ind['isArcNoField']){
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
                    }
                    if(DhName==1){
                        this['$confirm']('是否要重新生成档号', '提示', {
                            confirmButtonText: '生成',
                            cancelButtonText: '不生成',
                            type: 'warning'
                        }).then(() => {
                            obj['recomputeDh']=true;
                            this.SaveFile(obj);
                            if(cb){cb()}
                        }).catch(() => {
                            obj['recomputeDh']=false;
                            this.SaveFile(obj);
                            if(cb){cb()}
                        });
                    }else{
                        this.SaveFile(obj);
                        if(cb){cb()}
                    };
                }else{
                    this.getError("请完善数据。")
                }
            })
        };
        SaveFile(params){
            this.loadingInstance = Loading.service(
                {
                    lock: true,
                    text: '正在保存，请稍候',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
            );
            Service.SaveFile(params).then(res => {
                if(res.data.succeeded){
                    let data = res.data.data;
                    var str = JSON.stringify(res.data.data);
                    for(var item of this.fileList){
                        if(item.id==data.id){
                            for(var key in data){
                                item[key]=data[key];
                            };
                        };
                    };
                    this.EditArr = JSON.parse(str);
                    for(var key in this.addfile){
                        if(key in data){
                            this.addfile[key] = data[key];
                        };
                    };
                    this.Suces('保存成功。');
                    // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}})
                }else{
                    this.getError(res.data.errorMessage)
                }
                this.$nextTick(() => { this.loadingInstance.close();
                });
            });
        }
        //取得可批量修改的字段
        getBatchModifiableFields(params){
            this.form={region:null,replaceValue:null,replaceTo:''};
            this.Addrform={region:null,startNumber:null,endNumber:null,replaceTo:''};
            this.combineform={itemA:null,connectSign:null,itemB:null,concatTo:null};
            if(this.selection.length>0&&this.activeName=='first'||this.selection2.length>0&&this.activeName=='second'||this.selection3.length>0&&this.activeName=='third') {
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
            }else{
                this.Warn("请选择要修改的文件。")
            }
        };

        //按内容替换著录项发生改变
        elSelectChange(data){
            this.form.replaceValue = null;
            this.form.replaceTo = '';
            for(var item of this.formArr){
                if(item.fieldName==data){
                    if(item.dictData){
                        this.formSelectArr=[];
                        this.formSelectArr = item.dictData;
                        this.ElSelectTrue=false;
                    }else if(item.fieldName=='XMBH'&&this.isProjectCompany){
                        this.ElSelectTrue=false;
                        Service.findByFond({}).then(res=>{
                            if(res.data.succeeded){
                                this.formSelectArr=[];
                                this.storeArr = [];
                                this.storeArr = res.data.data;
                                var str = JSON.stringify(res.data.data);
                                var data = JSON.parse(str);
                                for(var item of data){
                                    this.formSelectArr.push({text:item.projectCode,code:item.projectCode})
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else if(item.fieldName=='XMMCNEW'&&this.isProjectCompany){
                        this.ElSelectTrue=false;
                        Service.findByFond({}).then(res=>{
                            if(res.data.succeeded){
                                this.formSelectArr=[];
                                this.storeArr = [];
                                this.storeArr = res.data.data;
                                var str = JSON.stringify(res.data.data);
                                var data = JSON.parse(str);
                                for(var item of data){
                                    this.formSelectArr.push({text:item.projectName,code:item.projectCode})
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            };
                        });
                    }else{
                        this.ElSelectTrue=true;
                    }
                };
            };
        };
        //保存替换
        SaveReplace(){
            if(this.selection.length>0||this.selection2.length>0||this.selection3>0) {
                var arr = [];
                if (this.activeName == 'first') {
                    for (var item of this.selection) {
                        arr.push(item.id);
                    };
                } else if (this.activeName == 'second') {
                    for (var item of this.selection2) {
                        arr.push(item.id);
                    };
                } else {
                    for (var item of this.selection3) {
                        arr.push(item.id);
                    };
                };
                if (this.activenames == 'one') {
                    if(this.form.region!=null){
                            if(this.isProjectCompany&&this.form.region=='XMBH'){
                                // var replaceValue = '';
                                // var replaceTo = '';
                                // for(var ind of this.storeArr){
                                //     if(ind.projectCode==this.form.replaceValue){
                                //         this.form.replaceValue = ind.projectCode;
                                //         replaceValue = ind.projectName
                                //     };
                                // };
                                for(var ind of this.storeArr){
                                    if(ind.projectCode ==this.form.replaceTo){
                                        this.form.replaceTo = ind.projectCode;
                                        // replaceTo = ind.projectName
                                    };
                                };
                                var obj1 = {
                                    ids: arr,
                                    mode: 1,
                                    fieldName: this.form.region,
                                    replaceSrc: this.form.replaceValue,
                                    replaceWith: this.form.replaceTo
                                }
                                // var obj1s = {
                                //     ids: arr,
                                //     mode: 1,
                                //     fieldName: 'XMMCNEW',
                                //     replaceSrc: replaceValue,
                                //     replaceWith: replaceTo
                                // }
                            }else if(this.isProjectCompany&&this.form.region=='XMMCNEW'){
                                // var replaceValue1 = '';
                                // var replaceTo1 = '';
                                // for(var ind of this.storeArr){
                                //     if(ind.projectCode==this.form.replaceValue){
                                //         this.form.replaceValue = ind.projectName;
                                //         replaceValue1 = ind.projectCode
                                //     };
                                // };
                                for(var ind of this.storeArr){
                                    if(ind.projectCode ==this.form.replaceTo){
                                        this.form.replaceTo = ind.projectName;
                                        // replaceTo1 = ind.projectCode
                                    };
                                }
                                var obj1 = {
                                    ids: arr,
                                    mode: 1,
                                    fieldName: this.form.region,
                                    replaceSrc: this.form.replaceValue,
                                    replaceWith: this.form.replaceTo
                                }
                                // var obj1s = {
                                //     ids: arr,
                                //     mode: 1,
                                //     fieldName: 'XMBH',
                                //     replaceSrc: replaceValue1,
                                //     replaceWith: replaceTo1
                                // }
                            }else{
                                var obj1 = {
                                    ids: arr,
                                    mode: 1,
                                    fieldName: this.form.region,
                                    replaceSrc: this.form.replaceValue,
                                    replaceWith: this.form.replaceTo
                                }
                            };
                            if (this.activeName == "first") {
                                // if(this.isProjectCompany&&this.form.region=='XMMCNEW'){
                                //     obj1s['libId'] = this.rankId_one;
                                // }
                                // if(this.isProjectCompany&&this.form.region=='XMBH'){
                                //     obj1s['libId'] = this.rankId_one;
                                // }
                                obj1['libId'] = this.rankId_one;
                            } else if (this.activeName == "second") {
                                // if(this.isProjectCompany&&this.form.region=='XMMCNEW'){
                                //     obj1s['libId'] = this.rankId_two;
                                // }
                                // if(this.isProjectCompany&&this.form.region=='XMBH'){
                                //     obj1s['libId'] = this.rankId_two;
                                // }
                                obj1['libId'] = this.rankId_two;
                            } else if (this.activeName == "third") {
                                // if(this.isProjectCompany&&this.form.region=='XMMCNEW'){
                                //     obj1s['libId'] = this.rankId_thr;
                                // }
                                // if(this.isProjectCompany&&this.form.region=='XMBH'){
                                //     obj1s['libId'] = this.rankId_thr;
                                // }
                                obj1['libId'] = this.rankId_thr;
                            };
                            var DhName = 0;
                            for (var ind of this.formArr) {
                                if (ind['fieldName'] == this.form.region && ind['isArcNoField']) {
                                    DhName = 1;
                                }
                            };
                            if(DhName==1){
                                this['$confirm']('是否生成新档号', '提示', {
                                    confirmButtonText: '生成',
                                    cancelButtonText: '不生成',
                                    type: 'warning'
                                }).then(() => {
                                    obj1['recomputeDh']=true;
                                    if(this.isProjectCompany&&this.form.region=='XMMCNEW'){
                                        // Service.BatchModify(obj1s).then(res=>{
                                        //     if(res.data.succeeded){
                                                this.BatchModify(obj1);
                                        //     }else{
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    }else if(this.isProjectCompany&&this.form.region=='XMBH'){
                                        // Service.BatchModify(obj1s).then(res=>{
                                        //     if(res.data.succeeded){
                                                this.BatchModify(obj1);
                                        //     }else{
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    }else{
                                        this.BatchModify(obj1);
                                    }
                                }).catch(() => {
                                    obj1['recomputeDh']=false;
                                    if(this.isProjectCompany&&this.form.region=='XMMCNEW'){
                                        // Service.BatchModify(obj1s).then(res=>{
                                        //     if(res.data.succeeded){
                                                this.BatchModify(obj1);
                                        //     }else{
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    }else if(this.isProjectCompany&&this.form.region=='XMBH'){
                                        // Service.BatchModify(obj1s).then(res=>{
                                        //     if(res.data.succeeded){
                                                this.BatchModify(obj1);
                                        //     }else{
                                        //         this.Warn(res.data.errorMessage)
                                        //     }
                                        // })
                                    }else{
                                        this.BatchModify(obj1);
                                    }
                                });
                            }else{
                                if (this.form.region == 'XMMCNEW' && this.isProjectCompany) {
                                    // Service.BatchModify(obj1s).then(res => {
                                    //     if (res.data.succeeded) {
                                            this.BatchModify(obj1);
                                    //     } else {
                                    //         this.Warn(res.data.errorMessage)
                                    //     }
                                    // })
                                } else if (this.form.region == 'XMBH' && this.isProjectCompany) {
                                    // Service.BatchModify(obj1s).then(res => {
                                    //     if (res.data.succeeded) {
                                            this.BatchModify(obj1);
                                    //     } else {
                                    //         this.Warn(res.data.errorMessage)
                                    //     }
                                    // })
                                } else {
                                    this.BatchModify(obj1);
                                };
                            };
                    }else{
                        this.Warn('请选择著录项')
                    }

                } else if (this.activenames == 'two') {
                    if(this.Addrform.region!=null){
                        if(this.Addrform.startNumber!=''&&this.Addrform.startNumber!=null){
                            if(this.Addrform.endNumber!=''&&this.Addrform.endNumber!=null){
                                var obj2 = {
                                    ids: arr,
                                    mode: 2,
                                    fieldName: this.Addrform.region,
                                    replaceStartPos: this.Addrform.startNumber,
                                    replaceEndPos: this.Addrform.endNumber,
                                    replaceWith: this.Addrform.replaceTo
                                }
                                if (this.activeName == "first") {
                                    obj2['libId'] = this.rankId_one;
                                } else if (this.activeName == "second") {
                                    obj2['libId'] = this.rankId_two;
                                } else if (this.activeName == "third") {
                                    obj2['libId'] = this.rankId_thr;
                                };
                                var DhName = 0;
                                for (var ind of this.addArr) {
                                    if (ind['fieldName'] == this.Addrform.region && ind['isArcNoField']) {
                                        DhName = 1;
                                    }
                                }
                                if(DhName==1){
                                    this['$confirm']('是否对上一条数据进行保存', '提示', {
                                        confirmButtonText: '保存',
                                        cancelButtonText: '不保存',
                                        type: 'warning'
                                    }).then(() => {
                                        obj2['recomputeDh']=true;
                                        this.BatchModify(obj2);
                                    }).catch(() => {
                                        obj2['recomputeDh']=false;
                                        this.BatchModify(obj2);
                                    });
                                }else{
                                    this.BatchModify(obj2);
                                }
                            }else{
                                this.Warn('请填写结束位置')
                            }
                        }else{
                            this.Warn('请填写起始位置')
                        }
                    }else{
                        this.Warn('请选择著录项')
                    }

                } else if (this.activenames == 'three') {
                    if(this.combineform.itemA!=null){
                        if(this.combineform.connectSign!=null&&this.combineform.connectSign!=''){
                            if(this.combineform.itemB!=null){
                                if(this.combineform.concatTo!=null){
                                    var obj3 = {
                                        libId: this.rankId_one,
                                        ids: arr,
                                        mode: 3,
                                        fieldName: this.combineform.itemA,
                                        connector: this.combineform.connectSign,
                                        fieldName2: this.combineform.itemB,
                                        targetFieldName: this.combineform.concatTo
                                    };
                                    if (this.activeName == "first") {
                                        obj3['libId'] = this.rankId_one;
                                    } else if (this.activeName == "second") {
                                        obj3['libId'] = this.rankId_two;
                                    } else if (this.activeName == "third") {
                                        obj3['libId'] = this.rankId_thr;
                                    };
                                    var DhName = 0;
                                    for (var ind of this.formArr) {
                                        if (ind['fieldName'] == this.combineform.concatTo && ind['isArcNoField']) {
                                            DhName = 1;
                                        }
                                    };
                                    if(DhName==1){
                                        this['$confirm']('是否对上一条数据进行保存', '提示', {
                                            confirmButtonText: '保存',
                                            cancelButtonText: '不保存',
                                            type: 'warning'
                                        }).then(() => {
                                            obj3['recomputeDh']=true;
                                            this.BatchModify(obj3)
                                        }).catch(() => {
                                            obj3['recomputeDh']=false;
                                            this.BatchModify(obj3)
                                        });
                                    }else{
                                        this.BatchModify(obj3)
                                    };
                                }else{
                                    this.Warn('请选择目标著录项')
                                }
                            }else{
                                this.Warn('请选择著录项B')
                            }
                        }else{
                            this.Warn('请填写连接符');
                        }
                    }else{
                        this.Warn('请选择著录项A');
                    }
                };
            }else{
                this.Warn('请选择要替换的数据。')
            }
        };

        BatchModify(params){
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
                    this.Suces("成功。");
                    this.repalceMany = false;
                    if (this.activeName == 'first') {
                        // this.getListNumber({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent,pageCondition: {page: this.page, pageSize: this.limit, sort: ""}});
                        if(this.sortName1&&this.TypeChangeValue1){
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }else{
                            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                        }
                    } else if (this.activeName == 'second') {
                        // this.getInfilePapers({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent2,pageCondition: {page: this.page1, pageSize: this.limit1, sort: ""}});
                        if(this.sortName2&&this.TypeChangeValue2){
                            this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                        }else{
                            this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                        }
                    } else if (this.activeName == 'third') {
                        // this.Searchwenjian({kindId: this.kinId,fondId: this.parentId,conditions: this.searchContent3,pageCondition: {page: this.page2, pageSize: this.limit2, sort: ""}})
                        if(this.sortName3&&this.TypeChangeValue3){
                            this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                        }else{
                            this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                        }
                    }
                } else {
                    this.getError(res.data.errorMessage);
                }
                this.$nextTick(() => { this.loadingInstance.close();
                });
            });
        }
        //取消归档
        cancelFile(){
            if(this.activeName=='first'){
                if(this.selection.length>0) {
                    this['$confirm']('您是否要取消所选文档的归档', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var arr = [];
                        for(var item of this.selection){
                            arr.push(item.id)
                        }
                        Service.DeleteEnter({libId:this.rankId_one,anJuanIds:arr}).then(res=>{
                            if(res.data.succeeded){
                                this.Suces('操作成功。')
                                // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                                if(this.sortName1&&this.TypeChangeValue1){
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }else{
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else{
                    this.Warn("请选择你要取消的档案。")
                };
            }else if(this.activeName=='third'){
                if(this.selection3.length>0) {
                    this['$confirm']('您是否要取消所选文档的归档', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var arr = [];
                        for(var item of this.selection3){
                            arr.push(item.id)
                        }
                        Service.DeleteEnterW({libId:this.rankId_thr,wenJianIds:arr}).then(res=>{
                            if(res.data.succeeded){
                                this.Suces('操作成功。')
                                // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:""}})
                                if(this.sortName3&&this.TypeChangeValue3){
                                    this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                                }else{
                                    this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else{
                    this.Warn("请选择你要取消的档案。")
                };
            }
        };

        //归入库位
        enterstore(){
            if(this.activeName=='first'){
                if(this.selection.length>0){
                    var obj = {
                        lib:this.rankId_one
                    };
                    window.sessionStorage.setItem('enterStore',JSON.stringify(obj))
                    this['$router'].push({
                        path:'/fileArrange/archiveManagement/enterStore',
                        // query:{
                        //     lib:this.rankId_one
                        // }
                    });
                    var data = this.selection;
                    window.sessionStorage.setItem('enterData',JSON.stringify(data))
                }else{
                    this.Warn('请选择文件。')
                };
            }else{
                if(this.selection3.length>0){
                    var obj = {
                        lib:this.rankId_thr
                    };
                    window.sessionStorage.setItem('enterStore',JSON.stringify(obj))
                    this['$router'].push({
                        path:'/fileArrange/archiveManagement/enterStore',
                        // query:{
                        //     lib:this.rankId_thr
                        // }
                    });
                    var data = this.selection3;
                    window.sessionStorage.setItem('enterData',JSON.stringify(data))
                }else{
                    this.Warn('请选择文件。')
                };
            };
        };

        //档案日志
        goLog(){
            if(this.activeName=='first'){
                var obj = {
                    libId:this.rankId_one,
                    fondCode:this.fondCode
                };
                window.sessionStorage.setItem('TofileLog',JSON.stringify(obj));
            }else if(this.activeName=='third'){
                var obj = {
                    libId:this.rankId_thr,
                    fondCode:this.fondCode
                };
                window.sessionStorage.setItem('TofileLog',JSON.stringify(obj))
            }
            this['$router'].push({
                path:'/fileArrange/archiveManagement/filelog'
            });
        };
        //删除
        BatchDelete():void{
            if(this.activeName=='first'){
                if(this.selection.length>0){
                    var arr=[];
                    for(var item of this.selection){
                        arr.push(item.id)
                    };
                    var obj={
                        ids:arr,
                        libId:this.rankId_one
                    };
                    this['$confirm']('您是否要删除所选文件及其卷内文件?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.BatchDelete(obj).then(res=>{
                            if(res.data.succeeded){
                                this.Suces("删除成功。");
                                if(this.selection.length==this.fileList.length){
                                    var num = Math.ceil(this.total/this.limit);
                                    if(this.page==num&&this.page>1){
                                        this.page-=1;
                                    }
                                }
                                // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:""}});
                                if(this.sortName1&&this.TypeChangeValue1){
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }else{
                                    this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.Warn('请选择要删除的文件。')
                };
            }else if(this.activeName=='third'){
                if(this.selection3.length>0){
                    var arr=[];
                    for(var item of this.selection3){
                        arr.push(item.id)
                    };
                    var obj={
                        ids:arr,
                        libId:this.rankId_thr
                    };
                    this['$confirm']('您是否要删除所选文件?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        Service.BatchDelete(obj).then(res=>{
                            if(res.data.succeeded){
                                this.Suces("删除成功。");
                                if(this.selection.length==this.fileList.length){
                                    var num = Math.ceil(this.total2/this.limit2);
                                    if(this.page2==num&&this.page2>1){
                                        this.page2-=1;
                                    }
                                }
                                // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:""}})
                                if(this.sortName3&&this.TypeChangeValue3){
                                    this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                                }else{
                                    this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }).catch(() => {
                        this['$message']({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.Warn('请选择要删除的文件。')
                }
            }

        };

        // 模板打印
        modelPrint(){
            if(this.activeName==='first'){
                let one = this.rankId_one.toString();
                if(this.selection.length>0){
                    var arr = [];
                    for(let item of this.selection){
                        arr.push(item)
                    }
                    window.sessionStorage.setItem('rank', one);
                    window.sessionStorage.setItem('printArray',JSON.stringify(arr));
                    window.sessionStorage.setItem('printArray1',JSON.stringify(arr));
                    window.sessionStorage.setItem('typePrint','1');
                    this['$router'].push({path:'/fileArrange/archivesManagement/modelPrintFiles'});
                }else{
                    this.Warn("请选择要打印的文件。")
                }
            }else if(this.activeName==='third'){
                let thr = this.rankId_thr.toString();
                if(this.selection3.length>0){
                    var arr = [];
                    for(let item of this.selection3){
                        arr.push(item)
                    }
                    window.sessionStorage.setItem('rank', thr);
                    window.sessionStorage.setItem('printArray',JSON.stringify(arr));
                    window.sessionStorage.setItem('printArray1',JSON.stringify(arr));
                    window.sessionStorage.setItem('typePrint','1');
                    this['$router'].push({path:'/fileArrange/archivesManagement/modelPrintFiles'});
                }else{
                    this.Warn("请选择要打印的文件。")
                }
            }
        }

        //导入数据取消文件选择
        ConcelCommitNumber(){
            this.commitDialogTrue=false;
        };
        //导出数据
        exportNumber(){
            if(this.activeName=='first'&&this.selection.length>0){
                this.exportNumTrue = true;
            }else if(this.activeName=='second'&&this.selection2.length>0){
                this.exportNumTrue = true;
            }else if(this.activeName=='third'&&this.selection3.length>0){
                this.exportNumTrue = true;
            }else{
                this.Warn('请选择你要导出的数据。')
            };
        };

        //跨全宗移交
        fileTurnOver(){
            if(this.activeName=='first'){
                if(this.selection.length>0){
                    var arr = [];
                    var activeNum = 0;
                    for(var item of this.selection){
                        if(item.ARCHIVE_STATUS==2){
                            activeNum = 1;
                        }
                        arr.push(item.id)
                    };
                    if(activeNum==1){
                        this.Warn('所选数据中部分数据正在跨全宗移交审批中，无法重复提交审批，请重新选择。')
                    }else{
                        var obj = {ids:arr,lib:this.rankId_one,fond:this.parentId,kind:this.kinId,active:0,fromStore:this.fromStore};
                        window.sessionStorage.setItem('fileTurnOver',JSON.stringify(obj))
                        this['$router'].push({path:'/fileArrange/archiveManagement/fileTurnOver'});
                    }
                }else{
                    this.Warn("请选择要移交的文件。")
                };
            }else if(this.activeName=='third'){
                if(this.selection3.length>0){
                    var arr = [];
                    var activeNum = 0;
                    for(var item of this.selection3){
                        if(item.ARCHIVE_STATUS==2){
                            activeNum = 1;
                        }
                        arr.push(item.id)
                    };
                    if(activeNum==1){
                        this.Warn('所选数据中部分数据正在跨全宗移交审批中，无法重复提交审批，请重新选择。')
                    }else{
                        var obj = {ids:arr,lib:this.rankId_thr,fond:this.parentId,kind:this.kinId,active:1,fromStore:this.fromStore};
                        window.sessionStorage.setItem('fileTurnOver',JSON.stringify(obj));
                        this['$router'].push({path:'/fileArrange/archiveManagement/fileTurnOver'});
                    }
                }else{
                    this.Warn("请选择要移交的文件。")
                };
            };
        };
        // 批量挂接树 中文件夹下文件总数的统计。
        setDataToTrees(treeData){
            // 根级的全宗不可选择
            if(treeData.id!==0){
                this.treesId = treeData.id;
                this.getFiles();
                this.riGuajie = false;
                this.errorMacth = [];
            }
        }
        // 树结构下 文件夹中文件的总数
        getFiles():void{
            Service.getFileCount(this.treesId).then((res) =>{
                if(res.data.succeeded == true){
                    let count = res.data.data;
                    if(count>0){
                        this.existFile = true
                        this.dec = count
                    }else{
                        this.existFile = false
                    }

                }else{
                    this.getError(res.data.errorMessage);
                }
            })
        };

        //批量挂接***************************************************************************
        //批量挂接
        ConcateFile(a):void{
            if(this.activeName=='third'){
                this.anJuanId = null;
            }else if(this.activeName=='second'){
                this.anJuanId = null;
            }else {
                this.anJuanId = null;
            }
            let b = null;
            if(this.activeName=='third'){
                b = this.rankId_thr;
            }else{
                b = this.rankId_two;
            }
            // 挂接云盘目录
            Service.GetMatchRules(b).then(res=>{
                if(res.data.succeeded){
                    this.ConcateObj=[];
                    if(res.data.data){
                        this.ConcateObj=res.data.data;
                    }
                }else{
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
        checkOldFiles():void{
            let params = {
                fondId: this.parentId,
                cloudDirectoryId: this.treesId
            };
            Service.checkIsFinished(params).then(res=>{
                if(res.data.succeeded){
                    if(!res.data.data){
                        this.checkDeal();
                    }else{
                        this['$message']({
                            message: '所选云盘目录下已有挂接任务，请到任务列表的批量挂接中删除或启动任务！',
                            type: 'warning'
                        });
                    }
                }else{
                    this['$message']({
                        message: '检测匹配失败！',
                        type: 'warning'
                    });
                }
            })
        };

        // 挂接匹配
        checkDeal():void{
            if(this.ConcateType){
                this.autoMatchParams = {
                    "wenJianLibId": this.activeName=='third'?this.rankId_thr:this.rankId_two,
                    "anJuanId": this.anJuanId,
                    "fondId": this.parentId,
                    "cloudDirectoryId": this.treesId,
                    "matchRuleId": this.ConcateType
                };
                Service.autoFileUp(this.autoMatchParams).then(res=>{
                    if(res.data.succeeded){
                        this.riGuajie = true;
                        this.taskId = res.data.data.taskId;
                        this.matchedCount = res.data.data.matchedCount;
                        if(res.data.data.errorMatch&&res.data.data.errorMatch.length>0){
                            this.errorMacth = res.data.data.errorMatch;
                            if(!res.data.data.taskId){
                                this.Warn('一个原文匹配到多条目录数据，无法进行挂接。')
                            }
                        }else{
                            this.errorMacth = [];
                        }
                    }else{
                        this.getError(res.data.errorMessage)
                    }
                })
            }else{
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
        };
        CfSearch(){
            if(this.activeName==="second"){

                    this.getListConfig(this.rankId_two);
                    // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:""}});
                    if(this.sortName2&&this.TypeChangeValue2){
                        this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                    }else{
                        this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                    }
                    this.getSupportGroupByFields(this.rankId_two);
                    this.clickTwo = false;

                this.fileList_show=false;
                this.fileListshow=false;
                this.juannei_show=true;
                this.pageOne=false;
                this.pageTwo=true;
                this.exportcontent='3';
                // this.getSearchConfig(this.rankId_two);
            }else if(this.activeName==="first"){
                this.fileList_show=true;
                this.fileListshow=true;
                this.fileListshow=true;
                this.juannei_show=false;
                this.pageOne=true;
                this.pageTwo=false;
                this.exportcontent='1';
                // this.getSearchConfig(this.rankId_one);
            }
        }
        // 开始挂接
        beginCF():void{
            if(this.ConcateType){
                if(this.riGuajie){
                    if(this.taskId){
                        let loadingInstance = Loading.service(
                            {
                                lock: true,
                                text: '正在上传中，请稍候',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            }
                        );
                        Service.fileUpStart(this.taskId).then(res=>{
                            if(res.data.succeeded){
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
                            }else{
                                this.$nextTick(() => {
                                    loadingInstance.close();
                                });
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }else{
                        this['$message']({
                            message: '一个原文匹配到多条目录数据，无法进行挂接。',
                            type: 'warning'
                        });
                    }
                }else{
                    this['$message']({
                        message: '请先匹配原文！',
                        type: 'warning'
                    });
                }
            }else{
                this['$message']({
                    message: '请选择挂接规则！',
                    type: 'warning'
                });
            }
        };

        //批量挂接懒加载树
        loadNode(node,resolve){
            if(node.level === 0){
                Service.getUserUrl({}).then((res) =>{
                    console.log(res.data)
                    if(res.data.succeeded){
                        let treeData = [];
                        var obj = {id:0,name:res.data.data.LogonFondName}
                        treeData.push(obj);
                        resolve(treeData);
                        // this.treesId = res.data.data[0].id;
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }else{
                this.treesId = node.data.id;
                Service.getLounTile(this.treesId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                        });
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误！',
                            type: 'error'
                        });
                    }
                });
            }
        };

        // 若无原文 上传原文
        fileUpBook(){
            this.ConcateVisible = false;
            this['$router'].push({path:'/fileArrange/cloudManagement'});
        };

        mounted():void{
            setTimeout(()=>{
                if(!this.parentId){
                    this.getfiles();
                }
            },500);
            //根据页面的大小调整按钮的个数
            this.$nextTick(()=>{
                this.pageSize()
            })
            // this['$refs'].treeku['setCheckedKeys'](this.choosedRole);
            var that=this;
            window["addEventListener"]("click",function(){
                that.pull_down_menu=false;
            });

            window["addEventListener"]("resize",function(){
                that.tableHeight= document.getElementsByClassName('tablePosition')[0].clientHeight-95;
                that.pull_down_menu=false
                var Arr=document.querySelectorAll(".toolButtons")
                var buttonArr=Array.from(Arr)
                var Li=document.querySelectorAll(".buttonlis")
                var boxbutton=Array.from(Li)
                var len=document.querySelector(".rowThr")["offsetWidth"]
                var ind=0
                if(len<=664){
                    ind=1
                    document.querySelector(".toolButton-one")["style"].display="block";
                    if(len>660){
                        ind=2
                    } else if(len<=660&&len>565){
                        ind=3
                    }else if(len<=565&&len>510){
                        ind=4
                    }else if(len<=510&&len>458){
                        ind=5
                    }else if(len<=458&&len>379){
                        ind=6
                    }else if(len<=379&&len>298){
                        ind=7
                    }else if(len<=298&&len>217){
                        ind=8
                    }else{
                        ind=9
                    }
                    for(var i=0;i<10;i++){
                        if(i<ind){
                            buttonArr[i]["style"].display="none"
                            boxbutton[i]["style"].display="block"
                        }else{
                            buttonArr[i]["style"].display="block"
                            boxbutton[i]["style"].display="none"
                        }

                    }
                }else{
                    document.querySelector(".toolButton-one")["style"].display="none";
                    buttonArr.forEach(function(item){
                        item["style"].display="block"
                    })
                }
            });
            var button = document.getElementsByClassName("el-dropdown-menu")[0];
            var closeDiv = document.getElementsByClassName("closeDiv")[0];
            //closeDiv['style'].bottom = '0px';
            var Bh = 0;
            button['addEventListener']('scroll',()=>{
                Bh = button.scrollTop;
                closeDiv['style'].bottom = -Bh+"px";
            })
            document.getElementsByClassName('el-dropdown-menu')[0]['addEventListener']('mouseover',()=>{
                closeDiv['style'].bottom = -Bh+'px';
            })
            closeDiv.getElementsByClassName('checkWay')['0']['addEventListener']('click',()=>{
                Bh = 0;
                document.getElementsByClassName('el-dropdown-menu')[0]['style'].display='none';
            })
            window.onresize = () => {
                return (() => {
                    this.mathHeight = (document.documentElement.clientHeight - 152)/2-60;
                })()
            };
            this.bind();
        };

        //导出数据
        confirmExport(){
            var IdArr = [];
            if(this.activeName=='first'){
                for(var item of this.selection){
                    IdArr.push(item.id);
                };
            }else if(this.activeName=='second'){
                for(var item of this.selection2){
                    IdArr.push(item.id);
                };
            }else if(this.activeName=='third'){
                for(var item of this.selection3){
                    IdArr.push(item.id);
                };
            };
            if(IdArr.length>0){
                var Idstr = IdArr.join(',');
                if(this.exportrong=='1'){
                    if(this.activeName=='first'){
                        var UrlStr = {libId:this.rankId_one,arcIds:Idstr,dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:4,parentId:'',fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr1}
                    }else if(this.activeName=='second'){
                        var UrlStr = {libId:this.rankId_two,arcIds:Idstr,dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:4,parentId:0,fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr2}
                    }else{
                        var UrlStr = {libId:this.rankId_thr,arcIds:Idstr,dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:4,parentId:'',fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr3}
                    };

                }else{
                    if(this.activeName=='first'){
                        var UrlStr = {libId:this.rankId_one,arcIds:'',dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:4,parentId:'',fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr1}
                    }else if(this.activeName=='second'){
                        var UrlStr = {libId:this.rankId_two,arcIds:'',dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:4,parentId:0,fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr2}
                    }else if(this.activeName=='third'){
                        var UrlStr = {libId:this.rankId_one,arcIds:'',dataType:this.exportrong,contentType:this.exportcontent,type:this.ExportType,isAtta:this.exportStyle,phase:4,parentId:'',fondCode:this.fondCode,nodeName:this.storeName,sort:this.sortStr3}
                    };
                }
                //this.DataImporterExport(UrlStr)
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
            }else{
                this.Warn('请选择要导出的数据。')
            }
        };
        //数据导出
        DataImporterExport(params){
            Service.DataImporterExport(params).then(res=>{
                if(res){
                    if(res['type']=='application/json'){
                        this.getError('所选文件无电子原文！');
                    }else{
                        let data = res;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            var csvData =  new Blob([data]);
                            if(params['isAtta']=='2'){
                                // link.setAttribute('download',params['nodeName']+'.zip');
                                window.navigator.msSaveOrOpenBlob(csvData,params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                window.navigator.msSaveOrOpenBlob(csvData,excelName+'.'+params['type']);
                            };
                        }else{
                            let url = window.URL.createObjectURL(new Blob([data]));
                            let link = document.createElement('a');
                            link.style.display = 'none';
                            link.href = url;
                            if(params['isAtta']=='2'){
                                link.setAttribute('download',params['nodeName']+'.zip');
                            }else{
                                var excelName = params['nodeName'];
                                switch (parseInt(params['contentType'])) {
                                    case 1:
                                        excelName=excelName+"_案卷目录";
                                        break;
                                    case 3:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                    case 4:
                                        excelName=excelName+"_未整理目录";
                                        break;
                                    case 5:
                                        excelName=excelName+"_卷内目录";
                                        break;
                                }
                                link.setAttribute('download',excelName+'.'+params['type']);
                            };
                            document.body.appendChild(link);
                            link.click();
                        }
                    }
                }
            });
        }
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
                //         that['$confirm'](str.errorMessage, '提示', {
                //             confirmButtonText: '关闭',
                //             cancelButtonText: '不保存',
                //             showCancelButton: false,
                //             type: 'warning',
                //             center: true
                //         });
                //     }
                //
                // };
            })
        }
        created(){
            Service.getLogonUserRelatedFondsTree({}).then(res=>{
                if(res.data.succeeded){
                    this.fonddata = res.data.data;
                    this.returnCompany(this.fonddata)
                }else{
                    this.getError(res.data.errorMessage)
                }
            });
        };
        //获取分类号
        getFla(){
            this.flhName = null;
            Service.getCategoryNumbers(this.parentId).then(res=>{
                if(res.data.succeeded){
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
                }else{
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
        //警告信息
        Warn(message:string){
            this['$message']({
                type: 'warning',
                message
            });
        };

        //请求失败
        getError(message:string){
            this["$message"]({
                message,
                type: 'error'
            });
        };

        //成功
        Suces(message){
            this['$message']({
                type: 'success',
                message
            })
        };

        test(row):void{

        };
        //案卷号
        myAJH(num){
            if(num!==null) {
                num = num+"";
                if (num.length == 1) {
                    return '000'+num;
                } else if (num.length == 2) {
                    return '00'+num;
                } else if (num.length == 3) {
                    return '0'+num;
                } else {
                    return num;
                }
            }else{
                return null;
            }
        }
        beforeRouteEnter(to,from,next){
            next(vm=>{
                if(from.name=='档案管理的新增'){
                    vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortSort3}});
                    if(vm.sortName3&&vm.TypeChangeValue3){
                        vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3, groupFilterKey:vm.TypeChangeValue3,groupFilterValue:vm.sortName3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortSort3}})
                    }else{
                        vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortSort3}})
                    }
                }else if(from.name=='档案管理卷内文件'){
                    if(vm.sortName1&&vm.TypeChangeValue1){
                        vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue, groupFilterKey:vm.TypeChangeValue1,groupFilterValue:vm.sortName1,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                    }else{
                        vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                    }
                }else if(from.name=='档案管理的编辑'){
                    if(!vm.tab_control){
                        var str = window.sessionStorage.getItem('DBres');
                        var obj = JSON.parse(str);
                        for(var item of vm.wenjianArr){
                            if(item.id==obj.id){
                                for(var key in obj){
                                    item[key] = obj[key];
                                };
                            };
                        };
                        vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortSort3}});
                    }else{
                        vm.getInfilePapers({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2,pageCondition:{page:vm.page1, pageSize:vm.limit1,sort:vm.sortSort2}});
                        if(vm.sortName2&&vm.TypeChangeValue2){
                            vm.getInfilePapers({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2, groupFilterKey:vm.TypeChangeValue2,groupFilterValue:vm.sortName2,pageCondition:{page:vm.page1, pageSize:vm.limit1,sort:vm.sortSort2}});
                        }else{
                            vm.getInfilePapers({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2,pageCondition:{page:vm.page1, pageSize:vm.limit1,sort:vm.sortSort2}});
                        }
                    }
                    vm.CfSearch();
                }else if(from.name=='归入库位'){
                    if(vm.tab_control){
                        if(vm.sortName1&&vm.TypeChangeValue1){
                            vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue, groupFilterKey:vm.TypeChangeValue1,groupFilterValue:vm.sortName1,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                        }else{
                            vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                        }
                    }else{
                        if(vm.sortName3&&vm.TypeChangeValue3){
                            vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3, groupFilterKey:vm.TypeChangeValue3,groupFilterValue:vm.sortName3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortSort3}})
                        }else{
                            vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:vm.sortSort3}})
                        }
                    }
                }else if(from.name=='跨全总选择目标库'){
                    if(!vm.tab_control){
                        if(vm.sortName3&&vm.TypeChangeValue3){
                            vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3, groupFilterKey:vm.TypeChangeValue3,groupFilterValue:vm.sortName3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:""}})
                        }else{
                            vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:""}})
                        }
                    }else if(vm.fileListshow) {
                        if(vm.sortName1&&vm.TypeChangeValue1){
                            vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue, groupFilterKey:vm.TypeChangeValue1,groupFilterValue:vm.sortName1,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                        }else{
                            vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                        }
                    }
                }else if(from.name=='跨全总档案移交详情'){
                    if(!vm.tab_control){
                        if(vm.sortName3&&vm.TypeChangeValue3){
                            vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3, groupFilterKey:vm.TypeChangeValue3,groupFilterValue:vm.sortName3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:""}})
                        }else{
                            vm.Searchwenjian({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue3,pageCondition:{page:vm.page2, pageSize:vm.limit2,sort:""}})
                        }
                    }else if(vm.juannei_show){
                        if(vm.sortName2&&vm.TypeChangeValue2){
                            vm.getInfilePapers({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2, groupFilterKey:vm.TypeChangeValue2,groupFilterValue:vm.sortName2,pageCondition:{page:vm.page1, pageSize:vm.limit1,sort:vm.sortSort2}});
                        }else{
                            vm.getInfilePapers({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue2,pageCondition:{page:vm.page1, pageSize:vm.limit1,sort:vm.sortSort2}});
                        }
                    }else if(vm.fileListshow){
                        if(vm.sortName1&&vm.TypeChangeValue1){
                            vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue, groupFilterKey:vm.TypeChangeValue1,groupFilterValue:vm.sortName1,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                        }else{
                            vm.getListNumber({kindId:vm.kinId,fondId:vm.parentId,searchKey: vm.searchValue,pageCondition:{page:vm.page, pageSize:vm.limit,sort:vm.sortSort1}});
                        }
                    }
                }else if(from.name=='文件管理'){
                    var str = window.sessionStorage.getItem('fromfileManage');
                    var obj = JSON.parse(str);
                    console.log(obj,1);
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
                    vm.fromfileMange()
                }else if(from.name=='整理编目'){
                    var str = window.sessionStorage.getItem('fromArrange');
                    var obj = JSON.parse(str);
                    console.log(obj,2);
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
                    vm.fromfileMange()
                }
            })
        };
        beforeRouteLeave(to,from,next){
            var obj = {
                parentId:this.parentId,
                kindId:this.kinId,
                name:this.storeName,
                isProjectCompany:this.isProjectCompany,
                fondCode:this.fondCode,
                fondName:this.fondName
            };
            window.sessionStorage.setItem('fromachiveManage',JSON.stringify(obj))
            next();
        }
        fromfileMange():void{
            this.TreeSort = true;
            this.TypeChangeValue1 = null;
            this.TypeChangeValue2 = null;
            this.TypeChangeValue3 = null;
            this.sortName1 = null;
            this.sortName2 = null;
            this.sortName3 = null;
            this.treeFilters.title = '';
            // /*++++++++++++++++++++++++++++++++++++*/
            // Service.getFondSearch({}).then(res=>{
            //     if(res.data.succeeded){
            //         this.GetEscrow(this.parentId);
            //         this.fondCode = res.data.data.fondCode;
            //         this.fondName='[ '+res.data.data.fondCode+' ]'+res.data.data.fondName;
            //         this.fondNameQiao ='[ '+res.data.data.fondCode+' ]'+res.data.data.fondName;
            //
            //     }else{
            //         this.getError(res.data.errorMessage)
            //     }
            // })
            // /*____________________________________*/
            this.GetEscrow(this.parentId);
            Service.archiveNowFile(this.parentId).then(res=>{
                if(res.data.succeeded){
                    this.expandedRole=[];
                    this.tree=res.data.data;
                    if(this.kinId){
                        this.expandedRole.push(this.storeName);
                        this.choosedRole.push(this.storeName);
                        this['$refs']['treeku']['setCheckedKeys'](this.choosedRole);
                        this.page = 1;
                        this.total = 0;
                        this.limit = 500;
                        this.page1 = 1;
                        this.total1 = 0;
                        this.limit1= 500;
                        this.page2 = 1;
                        this.total2 = 0;
                        this.limit2= 500;
                        Service.getByKindId(this.kinId).then(res=>{
                            if(res.data.succeeded){
                                this.MainShow = true;
                                if(res.data.data.length!==1){
                                    this.tab_control=true;
                                    this.activeName='first';
                                    this.fileList_show=true;
                                    this.fileListshow=true;
                                    this.juannei_show=false;
                                    this.pageOne=true;
                                    this.pageTwo=false;
                                    this.pageThr=false;
                                    this.clickTwo = true;
                                    for(var ind of res.data.data){
                                        if(ind.rank==3){
                                            this.rankId_one=ind.id;
                                        }else if(ind.rank==4){
                                            this.rankId_two=ind.id;
                                        };
                                    };
                                    this.exportcontent='1';
                                    //请求画面表格的列配置
                                    this.getListConfig(this.rankId_one);
                                    // this.getSearchConfig(this.rankId_one);
                                    this.getSupportGroupByFields(this.rankId_one);
                                    this.tab_control=true;
                                }else{
                                    this.tab_control=false;
                                    this.fileList_show=true;
                                    this.fileListshow=false;
                                    this.juannei_show=false;
                                    this.pageOne=false;
                                    this.pageTwo=false;
                                    this.pageThr=true;
                                    this.activeName="third";
                                    this.exportcontent='4';
                                    this.rankId_thr = res.data.data[0].id;
                                    this.getListConfig(this.rankId_thr);
                                    // this.getSearchConfig(this.rankId_thr);
                                    this.getSupportGroupByFields(this.rankId_thr)
                                }
                            }else{
                                this.getError(res.data.errorMessage)
                            }
                        })
                    }
                    this.getTreeName(this.tree);
                }else{
                    this.getError(res.data.errorMessage)
                }
            })
        };
        myvalidator(rule,value,callback){
            var reg = new RegExp('^[0-9][0-9]*$');
            if(value!=null){
                var str = reg.test(value);
                if(!str){
                    callback(new Error('请输入正整数'))
                }else{
                    callback()
                }
            }else{
                callback()
            }
        };
        projectCodechange(item,ind){
            if(ind.allowEdit){
                this.addfile.XMMCNEW = item.projectName;
            }
        };
        projectNamechange(item,ind){
            if(ind.allowEdit){
                this.addfile.XMBH = item.projectCode;
            }
        };
        inputchange(e,down){
            if(down){
                if(e.keyCode==69){
                    e.target.readOnly=true;
                }else{
                    e.target.readOnly=false;
                }
            }
        }
        timevalidator(rule,value,callback){
            var reg = new RegExp(/^(\d{4})(0\d{1}|1[0-2])(0\d{1}|[12]\d{1}|3[01])$/)
            var str = reg.test(value)
            if(str){
                callback()
            }else{
                callback(new Error('日期格式错误,例:20190101'))
            }
        };
        //上移
        positionUp(){
            if(this.activeName=='first'){
                if(this.selection.length>1){
                    this.Warn('每次只能移动一条数据。');
                }else if(this.selection.length==1){
                    var data = this.selection[0];
                    var ind = null;
                    for(var key in this.fileList){
                        if(data.id==this.fileList[key].id){
                            ind = key;
                        };
                    };
                    if(ind==0){
                        this.Warn('所选数据已经是第一条。');
                    }else{
                        if(this.exchangeSeqUp){
                            this.exchangeSeqUp = false;
                            var id1 = this.fileList[ind].id;
                            var id2 = this.fileList[ind-1].id;
                            Service.exchangeSeqs({libId:this.rankId_one,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.fileList.splice(ind,1);
                                    this.fileList.splice(ind-1,0,data);
                                    this.exchangeSeqUp = true;
                                }else{
                                    this.getError('数据移动失败');
                                    this.exchangeSeqUp = true;
                                }
                            })
                        }
                    }
                }
            }else if(this.activeName=='third'){
                if(this.selection3.length>1){
                    this.Warn('每次只能移动一条数据。');
                }else if(this.selection3.length==1){
                    var data = this.selection3[0];
                    var ind = null;
                    for(var key in this.wenjianArr){
                        if(data.id==this.wenjianArr[key].id){
                            ind = key;
                        };
                    };
                    if(ind==0){
                        this.Warn('所选数据已经是第一条。');
                    }else{
                        if(this.exchangeSeqUp){
                            this.exchangeSeqUp = false;
                            var id1 = this.wenjianArr[ind].id;
                            var id2 = this.wenjianArr[ind-1].id;
                            Service.exchangeSeqs({libId:this.rankId_thr,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.wenjianArr.splice(ind,1);
                                    this.wenjianArr.splice(ind-1,0,data);
                                    this.exchangeSeqUp = true;
                                }else{
                                    this.getError('数据移动失败');
                                    this.exchangeSeqUp = true;
                                }
                            })
                        }
                    }
                }
            }
        }
        //下移
        positionDown(){
            if(this.activeName=='first'){
                if(this.selection.length>1){
                    this.Warn('每次只能移动一条数据。');
                }else if(this.selection.length==1){
                    var data = this.selection[0];
                    var ind = null;
                    for(var key in this.fileList){
                        if(data.id==this.fileList[key].id){
                            ind = key;
                        };
                    };
                    if(ind==this.fileList.length-1){
                        this.Warn('所选数据已经是最后一条。');
                    }else{
                        if(this.exchangeSeqDow){
                            this.exchangeSeqDow = false;
                            var id1 = this.fileList[ind].id;
                            var id2 = this.fileList[ind/1+1].id;
                            Service.exchangeSeqs({libId:this.rankId_one,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.fileList.splice(ind/1,1);
                                    this.fileList.splice(ind/1+1,0,data);
                                    this.exchangeSeqDow = true;
                                }else{
                                    this.getError('数据移动失败');
                                    this.exchangeSeqDow = true;
                                }
                            })
                        }
                    }
                }
            }else if(this.activeName=='third'){
                if(this.selection3.length>1){
                    this.Warn('每次只能移动一条数据。');
                }else if(this.selection3.length==1){
                    var data = this.selection3[0];
                    var ind = null;
                    for(var key in this.wenjianArr){
                        if(data.id==this.wenjianArr[key].id){
                            ind = key;
                        };
                    };
                    if(ind==this.wenjianArr.length-1){
                        this.Warn('所选数据已经是最后一条。');
                    }else{
                        if(this.exchangeSeqDow){
                            this.exchangeSeqDow = false;
                            var id1 = this.wenjianArr[ind].id;
                            var id2 = this.wenjianArr[ind/1+1].id;
                            Service.exchangeSeqs({libId:this.rankId_thr,id1,id2}).then(res=>{
                                if(res.data.succeeded){
                                    this.wenjianArr.splice(ind/1,1);
                                    this.wenjianArr.splice(ind/1+1,0,data);
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
        getRowClass(row:any={}){
            if(row.row.ARCHIVE_STATUS==2){
                return 'row-yijiao';
            }
        }
        headerclick(data){
         var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC'  
            var name = data.column.label;
            var str = '';
            for(var son of this.tableHeader){
                if(son.caption==name){
                    str = son.fieldName;
                };
            };
            if(str){
                this.sortSort1 = str+"  "+sortSting;
                // if(this.sort1){
                //     this.sort1 = !this.sort1;
                    if(this.sortName1&&this.TypeChangeValue1){
                        this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                    }else{
                        this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:this.sortSort1}});
                    }
                    // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:str+"  ASC"}});
                // }else{
                //     this.sort1 = !this.sort1;
                //     if(this.sortName1&&this.TypeChangeValue1){
                //         this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,groupFilterValue:this.sortName1,pageCondition:{page:this.page, pageSize:this.limit,sort:str+"  "+sortSting}});
                //     }else{
                //         this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:this.page, pageSize:this.limit,sort:str+"  "+sortSting}});
                //     }
                //     // this.getListNumber({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent,pageCondition:{page:this.page, pageSize:this.limit,sort:str+"   DESC"}});
                // }
            }
        }
        headerclick2(data){
             var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC'  
            var name = data.column.label;
            var str = '';
            for(var son of this.tableHeader_thr){
                if(son.caption==name){
                    str = son.fieldName;
                };
            };
            if(str){
                this.sortSort2 = str+"  "+sortSting;
                // if(this.sort3){
                //     this.sort3 = !this.sort3;
                    // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:str+"  ASC"}});
                    if(this.sortName2&&this.TypeChangeValue2){
                        this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                    }else{
                        this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:this.sortSort2}});
                    }
                // }else{
                //     this.sort3 = !this.sort3;
                //     if(this.sortName2&&this.TypeChangeValue2){
                //         this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2, groupFilterKey:this.TypeChangeValue2,groupFilterValue:this.sortName2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:str+"  "+sortSting}});
                //     }else{
                //         this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:str+" "+sortSting}});
                //     }
                //     // this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent2,pageCondition:{page:this.page1, pageSize:this.limit1,sort:str+"   DESC"}});
                // }
            }
        }
        headerclick3(data){
             var sortSting = data.order == 'ascending' ? 'ASC' : 'DESC'  
            var name = data.column.label;
            var str = '';
            for(var son of this.tableHeader_for){
                if(son.caption==name){
                    str = son.fieldName;
                };
            };
            if(str){
                this.sortSort3 = str+"  "+sortSting;
                // if(this.sort4){
                //     this.sort4 = !this.sort4;
                    // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:str+"  ASC"}})
                    if(this.sortName3&&this.TypeChangeValue3){
                        this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                    }else{
                        this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:this.sortSort3}})
                    }
                // }else{
                //     this.sort4 = !this.sort4;
                //     if(this.sortName3&&this.TypeChangeValue3){
                //         this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3, groupFilterKey:this.TypeChangeValue3,groupFilterValue:this.sortName3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:str+"  "+sortSting}})
                //     }else{
                //         this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:str+"  "+sortSting}})
                //     }
                //     // this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,conditions:this.searchContent3,pageCondition:{page:this.page2, pageSize:this.limit2,sort:str+"   DESC"}})
                // }
            }
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
                console.log(e.clientX,dialogHeaderEl['offsetLeft'],e.clientY,dialogHeaderEl['offsetTop'])
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
                    console.log(l, t);
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
        TypeChange1(data) {
            if (data != null) {
                this.getGroupByCandidatesValues({libId: this.rankId_one, fondId: this.parentId, fieldName: data})
            } else {
                this.TreeSort = true;
                this.limit = 500;
                this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue,pageCondition:{page:1, pageSize:this.limit,sort:this.sortSort1}});
            }
        };

        TypeChange2(data) {
            if (data != null) {
                this.getJuanNeiGroupByCandidatesValue({libId: this.rankId_two, fondId: this.parentId, fieldName: data})
            } else {
                this.TreeSort = true;
                this.limit1 = 500;
                this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,pageCondition:{page:1, pageSize:this.limit1,sort:this.sortSort2}});
            }
        };

        TypeChange3(data) {
            if (data != null) {
                this.getGroupByCandidatesValues({libId: this.rankId_two, fondId: this.parentId, fieldName: data})
            } else {
                this.TreeSort = true;
                this.limit2 = 500;
                this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,pageCondition:{page:1, pageSize:this.limit2,sort:this.sortSort3}})
            }
        };

        getGroupByCandidatesValues(params) {
            Service.getGroupByCandidatesValue4(params).then(res => {
                if (res.data.succeeded) {
                    let data = JSON.stringify(res.data.data);
                    if (this.activeName == 'first') {
                        this.sortTree1 = [];
                        this.sortTree1 = res.data.data;
                        // for (var son of res.data.data) {
                        //     this.sortTree1.push({Name: son})
                        // };
                    }else if (this.activeName == 'third') {
                        this.sortTree3 = [];
                        this.sortTree3 = res.data.data;
                        // for (var son of res.data.data) {
                        //     this.sortTree3.push({Name: son})
                        // };
                    }
                    // else if (this.activeName == 'second') {
                    //     this.sortTree2 = [];
                    //     for (var son of res.data.data) {
                    //         this.sortTree2.push({Name: son})
                    //     }
                    //     ;
                    // }
                    this.TreeSort = false;
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        }
        getJuanNeiGroupByCandidatesValue(params) {
            Service.getJuanNeiGroupByCandidatesValue4(params).then(res => {
                if (res.data.succeeded) {
                    this.sortTree2 = [];
                    // for (var son of res.data.data) {
                    //     this.sortTree2.push({Name: son})
                    // };
                    this.sortTree2 = res.data.data;
                    this.TreeSort = false;
                } else {
                    this.getError(res.data.errorMessage)
                }
            })
        }
        sortclick1(data: any, node: any, tree: any){
            this.sortName1 = data.value;
            this.limit = 500;
            this.getListNumber({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue, groupFilterKey:this.TypeChangeValue1,
                groupFilterValue:this.sortName1,pageCondition:{page:1, pageSize:this.limit,sort:this.sortSort1}});

        };
        sortclick2(data: any, node: any, tree: any){
            this.sortName2 = data.value;
            this.limit = 500;
            this.getInfilePapers({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue2,groupFilterKey:this.TypeChangeValue2,
                groupFilterValue:this.sortName2,pageCondition:{page:1, pageSize:this.limit1,sort:this.sortSort2}});

        }
        sortclick3(data: any, node: any, tree: any){
            this.sortName3 = data.value;
            this.limit = 500;
            this.Searchwenjian({kindId:this.kinId,fondId:this.parentId,searchKey:this.searchValue3,groupFilterKey:this.TypeChangeValue3,
                groupFilterValue:this.sortName3,pageCondition:{page:1, pageSize:this.limit2,sort:this.sortSort3}})

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
            if(this.activeName=='third'){
                params.libId = this.rankId_thr;
            }else if(this.activeName=='second'){
                params.libId = this.rankId_two;
            }
            Service.getHomeDetail(params).then((res) =>{
                if(res.data.succeeded){
                    let fileManagentDetails = res.data.data?res.data.data:{};
                    window.sessionStorage.setItem('borrowToData', JSON.stringify(fileManagentDetails));
                    window.sessionStorage.setItem('examCheckData', JSON.stringify(row));
                    window.sessionStorage.setItem('applicationNo', fileManagentDetails.appNo);
                    window.sessionStorage.setItem('backFile','1');
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
        }
        BZPosition(){
            if(this.activeName=='first'){
                this.headBz =!this.headBz;
            }else if(this.activeName=='third'){
                this.headWBz =!this.headWBz;
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
