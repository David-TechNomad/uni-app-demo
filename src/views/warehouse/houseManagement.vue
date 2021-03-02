<template>
 <section>
        <div class="titleBlue">
            <b></b>
            <span>库房管理</span>

        </div>
        <div class="mainTitle">库房目录</div>
        <p class="fontClass">
                <i class="fa fa-plus-square" @click="AddHouseFile()"></i>
                <i class="fa fa-eyedropper" @click="ChangeTreeName()"></i>
                <i class="fa fa-times-rectangle" @click="DeleteTree()"></i>
        </p>
        <!-- <div class="inputSearch">
                     <i class="fa fa-search" @click="SerachTree()"></i>
                    <el-form :inline="true" class="inputSearchs">
                        <el-form-item v-for="" class="people" ref="people">
                            <el-input class="checkName" style="width:268px;height:20px;position:absolute;left:0px;top:-15px;z-index:999" v-model="treeIds" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-form>
        </div> -->
        <div class="mainDoc">
            <div class="mainCon mainBorrow">
            <div class="formData">
            <el-tabs type="card" class="tab_title ">
                        <el-tab-pane label="档案列表">
                        </el-tab-pane>
                        <!-- <el-tab-pane label="所有卷内文件" name="1">
                        </el-tab-pane> -->
            </el-tabs>
            <div class="more">
                 <!-- <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="tab_title ">
                            <el-tab-pane label="按档案列表查看" name="2">
                            </el-tab-pane>
                            <el-tab-pane label="按项目查看" name="3">
                            </el-tab-pane>
                </el-tabs> -->
                    <el-radio-group v-model="tabPosition" @change="radioChange()">
                            <el-radio-button label="left">按档案列表查看</el-radio-button>
                            <el-radio-button label="right">按项目查看</el-radio-button>
                    </el-radio-group>
            </div>
        <div class="tableSerach">
                    <el-form :inline="true" :model="filters" class="forms">
                        <div v-show="dangShow">
                            <el-form-item v-for="" class="people" ref="people">
                            <el-input class="checkName" style="width:200px;height:20px;position:relative;left:3px;top:-10px;" v-model="projectSerchDang" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                         <el-button type="primary" class="el-button checkWay" style="margin:-6px 0 0 0px" @click="dangSerchList()">检索</el-button>
                        </div>
                        <div v-show="projectShow">
                            <el-form-item v-for="" class="people" label="项目名称：" ref="people" style="margin-top:-10px">
                            <el-input class="checkName" style="width:200px;position:absolute;left:3px;" v-model="projectSerch" clearable placeholder="单行输入"></el-input>
                        </el-form-item>
                         <!-- <el-form-item v-for="" class="people" label="标题：" ref="people">
                            <el-input class="checkName" v-model="projectSerch" placeholder="单行输入"></el-input>
                        </el-form-item> -->
                         <el-button type="primary" class="el-button checkWay" id="tableTop" style="margin:-6px 0 0 200px" @click="projectSerchList()">检索</el-button>
                        </div>
                        <div v-if="showModel" class="tableBottom">
                            <div style="float:right;margin-top:-46px;" class="tableSerach-one">
                            <!--<el-button type="primary" class="el-button checkWay">导出</el-button>-->
                            <!--<el-button type="primary" class="el-button checkWay">打印</el-button>-->
                            <el-button type="primary" class="el-button checkWay" @click="changeStorehouse()">更换库位</el-button>
                            </div>
                        </div>
                        <div v-if="!showModel">
                            <div style="float:right;margin-top:-36px;padding-left:380px">
                            <!--<el-button type="primary" class="el-button checkWay">导出</el-button>-->
                            <!--<el-button type="primary" class="el-button checkWay">打印</el-button>-->
                            </div>
                        </div>
                        <!-- <div class="copyUpload">
                            <el-button type="primary" class="el-button checkWay">导出</el-button>
                            <el-button type="primary" class="el-button checkWay">打印</el-button>
                            <el-button type="primary" v-if="showModel" class="el-button checkWay" @click="changeStorehouse()">更换库位</el-button>
                        </div> -->
                    </el-form>
        </div>
         <!-- 按档案列表查看 -->
                <div class="borderTable" v-show="projectListVisible">
               <el-table border tooltip-effect="dark" :height="bodyHeight+4"  :data="DangList" highlight-current-row v-loading="listLoading"  class="indexTable containTable" @selection-change="selsChangeList">
                   <el-table-column type="selection" width="55" label="#"></el-table-column>
                    <!-- <el-table-column :prop="item.fieldName" :label="item.caption" v-for='item in listData'> -->
                        <template  v-for='item in listData'>
                            <el-table-column :prop="item.fieldName" :label="item.caption" v-if="item.fieldName != 'ID'" :width='item.width'>
                            </el-table-column>
                        </template>
                    
               </el-table>
                 <!-- <el-col :span="24" class="pager">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                            </el-pagination>
                    </el-col>       -->
                     <!--工具条分页-->
                        <el-col :span="24" class="pager">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                            </el-pagination>
                        </el-col>
            </div>

            <!-- 动态列表 -->
              <!-- <div class="borderTable" id="anticipation-priority" :breadcrumb="false">
                            <el-table :row-class-name="getRowClass" @expand-change="getChildrenData" :cell-class-name="getCellClass" tooltip-effect="dark" :height="bodyHeight" :data="data" v-loading="listLoading" @selection-change="selsChange" class="indexTable containTable expandTable">
                                <el-table-column type="selection" width="30" label="#" v-if="tableHeadArrs.length>0">
                                </el-table-column>
                                <el-table-column type="expand" v-if="tableHeadArrs.length>0">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.PARENTID === 0" class="expand_div">
                                            <el-table v-loading="childLoading" tooltip-effect="dark" stripe :max-height="bodyHeight" :show-header="false" :data="scope.row.children" @selection-change="childChange">
                                                <el-table-column type="selection" width="74" label="#">
                                                </el-table-column>
                                                <template v-for="file in tableHeadArrs">
                                                    <el-table-column :width="file.width" show-overflow-tooltip="true" :prop="file.fieldName" :label="file.caption" >
                                                    </el-table-column>
                                                </template>
                                            </el-table>
                                        </div>
                                    </template>
                                </el-table-column>
                                <template v-for="file in tableHeadArrs">
                                    <el-table-column :width="file.width" show-overflow-tooltip="true" :prop="file.fieldName" :label="file.caption" >
                                    </el-table-column>
                                </template>
                                <template slot="append">
                                    <infinite-loading ref="Infinite" v-if="data.length>0" @infinite="onInfinite" spinner="circles" :forceUseInfiniteWrapper="true">
                                      <span slot="no-more">
                                      —————————————————————————— 加载完成 ————————————————————————————
                                      </span>
                                        <span slot="no-results">暂无数据</span>
                                    </infinite-loading>
                                </template>
                            </el-table>
                        </div> -->

                    <!-- 父子级表格 -->
                        <!-- <div class="borderTable">
                    <el-table :row-class-name="getRowClass" @expand-change="getChildrenData" :cell-class-name="getCellClass" tooltip-effect="dark" stripe :height="bodyHeight" :data="dataPric" highlight-current-row v-loading="listLoading" @selection-change="selsChange" class="indexTable containTable expandTable">
                        <el-table-column type="selection" width="30" label="#">
                        </el-table-column>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <div v-if="scope.row.parentId !== '-1'" class="expand_div">
                                    <el-table tooltip-effect="dark" stripe :max-height="bodyHeight" :show-header="false" :data="scope.row.children" v-loading="listLoading" @selection-change="childChange">
                                        <el-table-column type="selection" width="74" label="#">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="year" label="档号">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="planName" label="卷内序号">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="displayName" label="标题">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="文件编号">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="auther" label="责任者">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="otherAuther" label="文件日期" >
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="attachment" label="密级">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="projectName" label="备注">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="archiveCount" width="120" label="实体档案存放地">
                                        </el-table-column>
                                        <el-table-column :show-overflow-tooltip="true" prop="department" width="140" label="存放地档案员信息" >
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="year" label="档号">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="planName" label="标题">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="displayName" label="文件编号">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="fondsCode" label="文件日期">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="auther" label="备注">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="otherAuther" label="在库" >
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="attachment" label="实体档案存放地">
                        </el-table-column>
                        <el-table-column :show-overflow-tooltip="true" prop="projectName" label="存放地档案员">
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <span class="addBtn" style="color:red;cursor:pointer;" @click="deleteFile(scope.row)">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div> -->

            <!-- 按项目查看表格 -->
            <div class="borderTable" v-show="projectVisible">
               <el-table border tooltip-effect="dark" :height="bodyHeight+4" :data="Modeldata" highlight-current-row v-loading="listLoading"  class="indexTable containTable">
                    <el-table-column  :prop="item.prop" :key="item.prop" :label="item.title" v-for='item in projectList'>
                    </el-table-column>
                          <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                            <span class="addBtn" @click="findDetailss(scope.row)">查看全部</span>
                            </template>
                            </el-table-column> 
               </el-table>
                  <el-col :span="24" class="pager">
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChangeProject" @current-change="handleCurrentChangeProject" :page-sizes="[10, 15, 20, 25,30]" :page-size="limit" :total="total" style="float:right;">
                            </el-pagination>
                    </el-col> 
            </div>
        </div>
        </div>
        </div>
        <div class="treeOne tree" style="margin-top:49px;width:270px">
            <div class="treeCon searchNameTree">
                <el-tree
                        v-show="treeShow"
                        :load="loadNode"
                        node-key="id"
                        lazy
                        :props="defaultProps"
                        :render-content="renderContent"
                        @node-click = "setDataToTrees"
                        ref="tree3"
                        :default-expanded-keys="defaultTreeOpen"
                        
                >
                </el-tree>
            </div>
            <el-tree
                    :data="datatree"
                     node-key="id"
                     v-show="treeShows"
                     :props="defaultPropsed"
                     :render-content="renderContent"
                     @node-click="setDataToTrees"
                     >
            </el-tree>
        </div>
        <!-- 添加库房 弹框 -->
         <el-dialog class="myDialog" title="添加库房" :visible.sync="fileVisible" :close-on-click-modal="true">
        <div>
        <el-form ref="houseMous" class="addfileSelet" :model="houseMous">
            <el-form-item label="库房名称：" class="basicItem" prop="MoaelCount" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                <el-input class="checkName" v-model="houseMous.MoaelCount" @keyup.native="proving1" placeholder="请输入名称" style="width:77%"></el-input>
            </el-form-item>
             <el-form-item label="选择库房模板：" class="SelectItem checkName" prop="id">
                 <b style="color:#f56c6c;position:relative;top:-3px;left:-108px; ;">*</b>
                <el-select @change="selectGet" placeholder="请选择库房模板" style="margin-top:3px;margin-left:-5px" v-model="ModelTemplate.id">
                <el-option v-for="item in ModelTemplate" :label="item.templateName+' | 库架'+item.shelfCount +' | 库位'+item.librarysCount" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
             <el-button type="primary" class="el-button checkWay" style="position:absolute;top:57px;right:15px;height:30px" @click="mannerModel()">管理模板</el-button>
        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
             <el-button type="primary" class="el-button checkWay" @click="houseModels">确定</el-button>
        </span>
    </el-dialog>

    <!-- 添加库房模板  弹框 -->
    <el-dialog class="myDialog" title="添加库房模板" :visible.sync="fileVisibles" :close-on-click-modal="true">
         <div class="formDiv">
                <div class="borderTable">
                        <el-table border tooltip-effect="dark" :data="tempData" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" class="indexTable containTable">
                            <el-table-column  width="55">
                            </el-table-column>
                             <el-table-column :key="item.prop" :prop="item.prop" :label="item.title" v-for='item in tableData'>
                            </el-table-column>
                            <!-- <el-table-column :show-overflow-tooltip="true" prop="user" label="模板名称">
                                <template slot-scope="scope">
                                    <input type="text" style="width:60px" v-if="scope.row.add" v-model="scope.row.user">
                                    <div v-else>{{scope.row.user}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column :show-overflow-tooltip="true" prop="pasd" label="单一库架数">
                                <template slot-scope="scope">
                                    <input type="text" style="width:60px" v-if="scope.row.add" v-model="scope.row.pasd">
                                    <div v-else>{{scope.row.pasd}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column :show-overflow-tooltip="true" prop="years" label="单一库位数">
                                <template slot-scope="scope">
                                    <input type="text" style="width:60px" v-if="scope.row.add" v-model="scope.row.years">
                                    <div v-else>{{scope.row.years}}</div>
                                </template> 
                            </el-table-column> -->
                            <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="handleEdit(scope.$index,scope.row)" v-if="scope.row.add">新增</span>
                                <span v-else class="addBtn" @click="handleDelete(scope.$index,scope.row)">删除</span>
                            </template> 
                           </el-table-column>
                        </el-table>
                        <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30"></div> -->
                         <el-table border :show-header="false"  tooltip-effect="dark" :data="tableDatas" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" class="indexTable containTable">
                            <el-table-column :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <input type="text" style="width:100px" v-model="templateName" placeholder="请输入">
                                </template>
                            </el-table-column>
                             <el-table-column :show-overflow-tooltip="true" >
                                <template slot-scope="scope">
                                    <input type="number" style="width:100px" v-model="shelfCount" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
                                </template>
                            </el-table-column>
                            <el-table-column :show-overflow-tooltip="true" >
                                <template slot-scope="scope">
                                    <input type="number" style="width:100px" v-model="librarysCount" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入数字">
                                </template>
                            </el-table-column>
                            <!-- <el-table-column width="80">
                            <template slot-scope="scope">
                                <span class="addBtn" @click="handleEdit(scope.$index,scope.row)" v-if="scope.row.add">新增</span>
                            </template> 
                           </el-table-column> -->
                        </el-table>

                    </div>
        </div>
        <span slot="footer" class="dialog-footer">
             <el-button type="primary" class="el-button checkWay"  @click="houseModelDali">确定</el-button>
        </span>
    </el-dialog>

        <!--  更换库位 弹框 -->
    <el-dialog class="myDialog" title="更换库位" :visible.sync="storeHouse" :close-on-click-modal="true">
        <div class="formDiv">
            <div class="storeTitle">原库位:<span v-html="storeInit" style="padding-left:10px;"></span></div>
            <div class="storeTitle">选择新库位</div>
            <div class="treeOne tree" style="width:400px;top:65px">
                    <!-- <el-tree 
                     :data="treeCheckData"
                     node-key="id"
                     show-checkbox
                     :props="defaultPropsModel"
                     :render-content="renderContent"
                     @check-change="handleCheckChangeModel"
                     >
            </el-tree> -->
                <div class="treeCon searchNameTree">
                    <el-tree
                            class="checkTree"
                            :load="loadNodes"
                            node-key="id"
                            :check-strictly="true"
                            lazy
                            show-checkbox
                            :props="defaultProps"
                            :render-content="renderContent1"
                            @node-click = "checkoutZuan"
                            @node-expand = "nodeExpand"
                            ref="checkTrees"
                    >
                    </el-tree>
                </div>
        </div>
        </div>
         <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="el-button checkWay" @click="houseModelsTree">确定</el-button>
        </span>
    </el-dialog>
    <!-- 添加目录弹框 -->
       <el-dialog  class="myDialog" :title="Addmulv" :visible.sync="centerDialogVisibleTree" :close-on-click-modal="true">
            <el-form ref="dioFormAdd" :model="dioFormAdd" class="addfileHouse">
            <span class="titleSpan" style="position:relative;left:10px;">库房位置：</span> <el-input class="checkName" v-model="dioFormAdd.kuWeiZhi" clearable readonly="true" disabled style="width:77%;margin-bottom:8px;margin-left:5px"></el-input>
            <el-form-item prop="title" :label="kuMesage" :rules="[{required:true,message:'请填写',trigger:'blur'}]">
                <el-input style="width:77%;margin-bottom:8px;" class="checkName" v-model="dioFormAdd.title" clearable placeholder="请输入添加的目录名称"></el-input>
            </el-form-item>
            <span class="titleSpan" style="position:relative;left:38px;">备注：</span><el-input class="checkName" v-model="dioFormAdd.titleNode" clearable placeholder="请输入添加目录的备注" style="width:77%;margin-left:38px;"></el-input>
             </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibleTree = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="addEventFormSubmitBtns()" class="el-button checkWay">确 定</el-button> 
            </span>

        </el-dialog>

    <!-- 编辑目录弹框 -->
        <el-dialog
            title="编辑目录"
            :visible.sync="centerDialogVisibleBianji"
            class="myDialog"
            :close-on-click-modal="true"
            >
            <el-form ref='dioBianji' :model="dioBianji" :rules="dioBianjiRules" class='houseBian'>
              <el-form-item ref="title" prop="title" label="名称：">
                      <el-input class="checkName" v-model="dioBianji.title" clearable style="width:85%;margin-bottom:3px;"></el-input>
              </el-form-item>
              <el-form-item ref="titleNode" prop="titleNode" label="备注：" style="margin-left:10px;">
                    <el-input class="checkName" v-model="dioBianji.titleNode" clearable style="width:87.5%;;"></el-input>
              </el-form-item>
            </el-form>
           
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibleBianji = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleBianjiEvent()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除弹框目录 -->
          <el-dialog
            title="删除"
            :visible.sync="centerDialogVisibleSDelete"
            width="40%"
            center>
            <span class="titleSpan">你是否要删除此目录?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisibleSDelete = false" class="el-button checkWay">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisibleSDeleteEvent()" class="el-button checkWay">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Service from './houseManagement.service'
    @Component
    export default class HouseHome extends Vue {
        windowHeight: number;
        bodyHeight: number;
        timer: boolean;
        listLoading: boolean;
        dangShow : boolean;
        projectShow:boolean;
        isExpand:boolean;
        tabPosition :string;
        projectSerchDang:string;
        Treenode:any = {};
        arrDatas:string;
        brrDatas:string;
        Treeresolve:any = {};
        Treeresolve1:any = {}
        Treenode1:any = {};
        isFather:boolean;
        houseMous : any = {};
        centerDialogVisibleBianji:boolean;
        showModel: boolean;
        fileVisible: boolean;
        fileVisibles: boolean;
        storeHouse : boolean;
        MoaelCount : string;
        Addmulv :  string;
        kuMesage : string;
        projectSerch : string;
        centerDialogVisibleSDelete: boolean;
        centerDialogVisibleTree: boolean;
        projectListVisible:boolean;
        projectVisible:boolean;
        storeInit : string;
        treeShow : boolean;
        treeShows : boolean;
        treeIds: string;
        librarysCount : string;
        shelfCount :string;
        templateName :string;
        add:boolean;
        busy: boolean;
        start: number;
        total: number;
        page: number;
        limit: number;
        limit2: number;
        start2: number;
        page2: number;
        treesId:number;
        activeName: string;
        documentShow: boolean;
        borrowShow: boolean;
        childLoading: boolean;
        powerShow: boolean;
        formSelect: boolean;
        formInput: boolean;
        modelShow :boolean;
        treeId : number;
        templateId : number;
        treeNames :string;
        treeNodes: string;
        treeType:number;
        filters: any = {};
        basicFormRules :any = {};
        dioFormAdd :any = {};
        treeFilters:any = {};
        dioBianji:any = {};
        tableData:any = [];
        getCheckeys : any = [];
        datatree : any = [];
        Modeldata:any = [];
        ModelTemplate = [];
        tableHeadArrs :any = [];
        tableDatas:any = [];
        listData:any = [];
        tempData : any = [];
        reloadDate:any = [];
        list: any = [];
        DangList : any = [];
        childTreeDatas : any = [];
        dataPric : any = [];
        data: any = [];
        tree: any = [];
        ChekList :any = [];
        checkArr : any = [];
        libArr : any = [];
        childrenData: any = [];
        projectList :any = [];
        treeCheckData:any = [];
        defaultProps: any = {};
        defaultPropsed : any = {};
        defaultPropsModel :any = {};
        defaultTreeOpen:any = [];
        fileForm: any = {};
        DeteTreeNode:any = {}
        ruleForm: any = {};
        childParams: any = {};
        reloadTreeData:any = [];
        formInline :any = {};
        isFirst:boolean;
        parentIdTree:number;
        dioBianjiRules:any = {};
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight - 280 ;
            this.timer = false;
            this.isFirst = true;
            this.projectShow = false;
            this.isExpand = false;
            this.dangShow = true
            this.busy = false;
            this.add = true;
            this.tabPosition = 'left'
            this.DeteTreeNode = {};
            this.treeShow = true;
            this.treeShows = false;
            this.centerDialogVisibleBianji = false;
            this.centerDialogVisibleTree = false;
            this.centerDialogVisibleSDelete = false;
            this.modelShow = true;
            this.showModel = true;
            this.templateId = 0;
            this.isFather = false;
            this.childLoading = false;
            this.start = 0;
            this.start2 = 0;
            this.treesId = 0;
            this.total = 0;
            this.page = 0;
            this.page2 = 0;
            this.activeName = '0';
            this.projectSerchDang = '';
            this.limit = 25;
            this.limit2 = 25;
            this.projectListVisible = true;
            this.projectVisible = false;
            this.listLoading = false;
            this.fileVisible = false;
            this.fileVisibles = false;
            this.storeHouse = false;
            this.treeIds = '';
            this.librarysCount ='';
            this.shelfCount = '';
            this.templateName = '';
            this.Addmulv = "添加库架"
            this.kuMesage = "库架名称："
            this.treeId = -1;
            this.storeInit = ""
            this.ChekList = [];
            this.arrDatas = '';
            this.brrDatas = '';
            this.reloadDate = [];
            this.defaultTreeOpen = [];
            this.reloadTreeData = []
            this.houseMous = {
                MoaelCount:''
            }
            this.TreeNode = {};
            this.Treenode1 = {};
            this.Treeresolve1 = {};
            this.childTreeDatas = [];
            this.checkArr = [];
            this.libArr = [];
            this.treeType = 0
            this.MoaelCount = '';
            this.projectSerch = '';
            this.treeNames = ''
            this.treeNodes = ''
            this.list = [];
            this.projectList = [];
            this.ModelTemplate = [];
            this.getCheckeys = [];
            this.dataPric = [];
            this.childrenData = [];
            this.DangList = [];
            this.listData = [];
            this.tempData = [];
            this.datatree = [
                {
                label: '库房目录',
                icon:'el-icon-success',
                children: [
                    {label: '档案一级',
                        children: [
                            {label: '档案一级室藏',},
                            {label: '档案二级室藏',},
                            {label: '档案三级室藏',}
                        ]
                    },
                    {label: '档案二级',}
                ]
            }
            ];
            this.basicFormRules = {
                 title: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
            }
            this.Modeldata = [];
            this.fileForm = {
                resource:''
            };
            this.dioBianji={
                title:'',
                titleNode:''
            }
            this.dioBianjiRules={
                 title: [
                    { required: true, message: '请填写', trigger: ['blur','change'] }
                ]
            }
            this.dioFormAdd = {
                title:'',
                titleNode:'',
                kuWeiZhi:''
            }
            this.formInline = {
               
            }
            this.tableData =  [
                {
                    title:'模板名称',
                    prop:'templateName'
                },
                {
                    title:'单一库架数',
                    prop:'shelfCount'
                },
                {
                    title:'单一库位数',
                    prop:'librarysCount'
                }
                
            ];
            this.listData= [];
            this.projectList = [
                   {
                    title:'项目名称',
                    prop:'objName'
                },
                {
                    title:'案卷数',
                    prop:'objCount'
                },
                {
                    title:'存放位置',
                    prop:'WareNames'
                }
            ]
            this.tableDatas=[]
          
            this.ruleForm = {
                region: ''
            };
            this.defaultProps = {
                isLeaf: 'hasChildren',
                label: 'wareName',
                id:'id',
                 disabled:'Isdisabled'
            };
            this.defaultPropsed = {
                isLeaf: 'hasChildren',
                label: 'wareName',
                id:'id'
            };
            this.defaultPropsModel = {
                isLeaf: 'hasChildren',
                label: 'label',
                id:'id',
               
            }
            this.filters = {
                action: 'FilingAction',
                method: 'getAllFilingInfo',
                fondName:'',
            };
            this.treeFilters = {
                title:''
            };
            this.tree = [{
                label: '库房目录',
                icon:'el-icon-success',
                children: [
                    {label: '档案一级',
                        children: [
                            {label: '档案一级室藏',},
                            {label: '档案二级室藏',},
                            {label: '档案三级室藏',}
                        ]
                    },
                    {label: '档案二级',}
                ]
            }];
            this.treeCheckData =[{
                label: '库房目录',
                icon:'el-icon-success',
                children: [
                    {label: '档案一级',
                        children: [
                            {label: '档案一级室藏',},
                            {label: '档案二级室藏',},
                            {label: '档案三级室藏',}
                        ]
                    },
                    {label: '档案二级',}
                ]
            }]

           this.childParams = {
                parentId:'',
                libId:''
            };

               this.dataPric =  [
                {
                    id:'1',
                    parentId : '0',
                    year: '2016-05-01',
                    planName: '345543',
                    displayName: '项目立项批文',
                    fondsCode: '京发改[2013]425号',
                    auther: '北京万方置业有限公司',
                    otherAuther: '北京市发展和改革委员会',
                    attachment: '北京市住房和城乡',
                    projectName: '北京通州万达广场',
                },
                {
                    id:'2',
                    parentId : '-1',
                    year: '2016-05-01',
                    planName: '345543',
                    displayName: '项目立项批文',
                    fondsCode: '京发改[2013]425号',
                    auther: '北京万方置业有限公司',
                    otherAuther: '北京市发展和改革委员会',
                    attachment: '北京市住房和城乡',
                    projectName: '北京通州万达广场',
                }
            ];
        };
        checkoutZuan(treeDatas){
            this.isExpand = !this.isExpand;
            treeDatas.isExpand = this.isExpand;
            if(treeDatas.className === 'fa fa-plus-square-o'){
                treeDatas.className = 'fa fa-minus-square-o';
            }else {
                treeDatas.className = 'fa fa-plus-square-o';
            }
        }
        nodeExpand(data,node,comp){
       

        }
        childChange(list:any){//表格选中子集
            // console.log(list)
            // this.newList = list;
        };
        // 改变行class
        getRowClass(row:any = {}):string{
            // if(row.row.PARENTID === 0){
            //     return 'row-expand-cover';
            // }else{
            //     return 'row-expand-null';
            // }
              if(row.row.parentId === '0'){
                return 'row-expand-cover';
            }else{
                return 'row-expand-null';
            }
        };
         // 改变单元格class
        getCellClass():string{
            return 'row-expand-cell';
        };
            // 展开次级列表
        getChildrenData(row){
            if(!row.children){
                // this.childParams.parentId = row.id;
                // this.childParams.libId = row.libId;
                // let params = this.childParams;
                // this.childLoading = true;
                // Service.getSuperTableChild(params).then((res) =>{
                //     if(res.data.succeeded){
                //         this.childrenData = res.data.data;
                //         for(let data of this.data){
                //             if(row.id === data.id){
                //                 data.children = [];
                //                 data.children = this.childrenData;
                //             }
                //         }
                //         this.childLoading = false;
                //     }else{
                //         this['$message']({
                //             message: '加载次级列表失败。',
                //             type: 'error'
                //         });
                //         this.childLoading = false;
                //     }
                // });
                   for(let data of this.dataPric){
                    if(row.id === data.id){
                        data.children = [];
                        data.children.push(
                            {
                                year: '2016-05-02',
                                planName: '1234567',
                                displayName: '项目立项批文',
                                fondsCode: '京通国用[2013]第425号',
                                auther: '北京万方置业有限公司',
                                otherAuther: '通州区人民政府，北京市国土资源局',
                                attachment: '北京市住房和城乡',
                                projectName: '北京通州万达广场',
                                archiveCount: 'BJ4',
                                department: '行政部',
                            }
                        )
                    }
                }
            }
        };
        SerachTree(){//搜索树的目录
           if(this.treeIds == ""){
                 this.treeShow = true;
                 this.treeShows = false;
            //   location.reload()
          
           }else{
                 this.treeShow = false;
                 this.treeShows = true;
              Service.SearchTree(this.treeIds).then(res=>{
                 this.datatree = res.data.data;
                 this.getTreeName(this.datatree);
              })
           }
        }
        ChangeTreeName(){//编辑tree名
            this.centerDialogVisibleBianji = true;
            this.dioBianji.title = this.treeNames;
            this.dioBianji.titleNode = this.treeNodes;
        }
        centerDialogVisibleBianjiEvent(){//修改tree的各级名字
            if(this.dioBianji.title == ''){
                this['$message']({message:"请填写必填项。",type:'warning'})
            }else{
                Service.ChangTreeName({
                    "wareHouseName":this.dioBianji.title,
                    "id":this.treeId,
                    "comments":this.dioBianji.titleNode,
                }).then(res=>{
                    if(this.treeId == 0){
                    this['$message']({message:"根节点不能修改。",type:'warning'})
                    }else{
                        if(res.data.succeeded == true){
                             this.Treenode.childNodes = [];
                       
                        if(this.treeType == 1){
                            this.defaultTreeOpen.push(0);
                            this.defaultTreeOpen.push(this.treeId);
                            this.defaultTreeOpen.push(this.parentIdTree);
                        }else if(this.treeType == 2){
                            this.defaultTreeOpen.push(0)
                            this.defaultTreeOpen.push(this.treeId);
                            this.defaultTreeOpen.push(this.parentIdTree);
                        }else if(this.treeType == 3){
                            this.defaultTreeOpen.push(0)
                            this.defaultTreeOpen.push(this.arrDatas);
                            this.defaultTreeOpen.push(this.brrDatas);
                            //  this.defaultTreeOpen.push(this.treeId);
                            console.log(this.defaultTreeOpen)
                        }
                        this.centerDialogVisibleBianji = false;
                        this.loadNode(this.Treenode,this.Treeresolve);
                        // this.DeteTreeNode.wareName = this.dioBianji.title;
                        // this.DeteTreeNode.comments = this.dioBianji.titleNode;
                        this['$message']({message:'操作成功',type:'success'})
                        }else{
                            this.centerDialogVisibleBianji = true;
                            this['$message']({message:res.data.errorMessage,type:'warning'})
                        } 
                    }
                    
                })
            }
  
        }
        addEventFormSubmitBtns(){//添加tree的各级名字
            if(this.dioFormAdd.title == ''){
                this['$message']({message:"请填写必填项。",type:'warning'})
            }else{
                       Service.AddHouseTree({
                        "parentId":this.treeId,
                        "wareHouseName":this.dioFormAdd.title,
                        "comments":this.dioFormAdd.titleNode,
                        "type":this.treeType+1
              
                    }).then(res=>{
                        if(res.data.succeeded == true){
                            this.centerDialogVisibleTree = false;
                            //  location.reload();
                            //  this.Treenode1.childNodes = [];
                            //  this.loadNode(this.Treenode1,this.Treeresolve1)
                                this.Treenode.childNodes = [];
                                
                                if(this.treeType == 1){
                                    this.defaultTreeOpen.push(0);
                                    this.defaultTreeOpen.push(this.treeId);
                                    this.defaultTreeOpen.push(this.parentIdTree);
                                }else if(this.treeType == 2){
                                    this.defaultTreeOpen.push(0)
                                    this.defaultTreeOpen.push(this.treeId);
                                    this.defaultTreeOpen.push(this.parentIdTree);
                                }else if(this.treeType == 3){
                                    this.defaultTreeOpen.push(0)
                                    this.defaultTreeOpen.push(this.arrDatas);
                                    this.defaultTreeOpen.push(this.brrDatas);
                                    //  this.defaultTreeOpen.push(this.treeId);
                                    console.log(this.defaultTreeOpen)
                                }
                             this.loadNode(this.Treenode,this.Treeresolve);
                             console.log(this.DeteTreeNode)

                        }else{
                            this['$message']({message:res.data.errorMessage,type:'warning'})
                        }
                    })
            }    
        }
        DeleteTree(){//点击删除tree显示
            // this.centerDialogVisibleSDelete = true;
            var arr = [];
            if(this.treeId == -1){
                 this['$message']({message:"请先选择目录",type:'warning'})
            }else{
                this['$confirm']('确认删除选中目录吗？', {
                    type: 'warning'
                }).then(() => {
                     Service.getHouseTreeson(this.treesId).then(res=>{
                                
                                arr = res.data.data;
                                console.log(arr)
                               
                    })
                    Service.DeleteHouse(this.treeId).then(res=>{
                        this.centerDialogVisibleSDelete = true;
                        if(res.data.succeeded==false){
                            this.centerDialogVisibleSDelete = false;
                            if(this.treeId == 0){
                                this['$message']({message:"根节点不能进行删除。",type:'warning'})
                            }else{
                                 this['$message']({message:"存在子集,删除失败。",type:'warning'})
                            }
                            
                        }else{
                            this.centerDialogVisibleSDelete = false;
                            // this.Treenode1.childNodes = [];
                            // this.loadNode(this.Treenode1,this.Treeresolve1)
                             this.Treenode.childNodes = [];
                            this.loadNode(this.Treenode,this.Treeresolve);
                            if(this.treeType == 1){
                                this.defaultTreeOpen.push(0);
                                this.defaultTreeOpen.push(this.treeId);
                                this.defaultTreeOpen.push(this.parentIdTree);
                            }else if(this.treeType == 2){
                                this.defaultTreeOpen.push(0)
                                this.defaultTreeOpen.push(this.treeId);
                                this.defaultTreeOpen.push(this.parentIdTree);
                            }else if(this.treeType == 3){
                                this.defaultTreeOpen.push(0)
                                this.defaultTreeOpen.push(this.arrDatas);
                                this.defaultTreeOpen.push(this.brrDatas);
                                //  this.defaultTreeOpen.push(this.treeId);
                                console.log(this.defaultTreeOpen)
                            }
                            // location.reload();

                        //     console.log(this.Treenode)
                        //     console.log(this.Treenode.childNodes)
                        //     console.log(this.$refs.tree3.getNode(this.treeId));
                        // //    this.loadNode(this.DeteTreeNode,this.Treeresolve)
                        //      this.refreshLazyTree(this.$refs.tree3.getNode(this.treeId),arr)
                            
                        }
                    })
                });
            }
        }
        centerDialogVisibleSDeleteEvent(){//删除tree目录
            Service.DeleteHouse(this.treeId).then(res=>{
            })
        }

        mannerModel(){//管理模板的显示隐藏
            this.fileVisibles = true;
            this.fileVisible = false;
            this.librarysCount = '';
            this.shelfCount = '';
            this.templateName = '';
            Service.SerchModelLists({}).then(res=>{
                this.tempData = res.data.data;
                this.tableDatas.push({
                    "librarysCount":this.librarysCount,
                    "shelfCount":this.shelfCount,
                    "templateName":this.templateName,
                    "add":true
                })
            })
        };
        findDetailss(row){//按项目查看 查看全部
             Service.getTreeName(this.treeId).then(res=>{
               this.storeInit = res.data.data;
               this['$router'].push({
                path:'/projectFiles/projectFiles',
                name:'查看文件列表',
                 params: {
                    objName: row.objName,
                    wareId:this.treeId,
                    projectName:this.storeInit
            }
            });

            })
             
        }
        selectGet(value){//库房选择模板
            let obj = {};
            obj = this.ModelTemplate.find((item)=>{//这里的ModelTemplate就是上面遍历的数据源
                return item.id === value;//筛选出匹配数据
            })
            this.templateId = value;
        }
        houseModelsTree(){//更换库位树 确定
            this.checkArr = [];
            this.libArr = [];
            this.getCheckeys = this['$refs']['checkTrees']['getCheckedKeys']()
              for(let item of this.ChekList){
                this.checkArr.push(item.ID);
                this.libArr.push(item.libid)
               }
            console.log(this.checkArr);
            console.log(this.libArr)
            if(this.getCheckeys.length == 0){
                this.storeHouse = true;
                this['$message']({message:"请选择要更换的库架或库位。",type:'warning'})
            }else{
                    Service.ChangeHouse({
                    "objectIds":this.checkArr.join(),
                    "libId":this.libArr.join(),
                    "wareIds": this.getCheckeys.join(),
                    "projectName":""
                }).then(res=>{
                    if(res.data.succeeded == true){
                        this.storeHouse = false;
                        this['$message']({message:"更换成功。",type:'success'})
                        this.getFiles()
                        console.log(res.data)
                        this['$refs']['checkTrees']['setCheckedKeys']([])
                    }
                    
                })
            }
           
        }
        handleCheckChangeModel(){//更换库位树的位置
            
        }
        houseModels(){//添加库房模板的确定  隐藏
            if(this.houseMous.MoaelCount == "" || this.templateId == 0){
               this['$message']({
                message: '数量或模板选择不能为空。',
                type: 'warning'
                });
                this.fileVisible = true;
            }else{
            Service.ModelSureQues({
                  "wareHouseName":this.houseMous.MoaelCount,
                  "wareTempId":this.templateId
            }).then(res=>{
                if(res.data.succeeded == false){
                    this.fileVisible = true;
                     this['$message']({
                        message: res.data.errorMessage,
                        type: 'warning'                }
                        )
                }else{
                     this.fileVisible = false;
                    var treesIds = res.data.data;
                    var treesId = {
                        id:treesIds
                    }
                    window.sessionStorage.setItem('AddhouseTress',JSON.stringify(treesId));
                    // location.reload();
                    if(this.treeId == 0 ){
                        this.Treenode.childNodes = [];
                        this.loadNode(this.Treenode,this.Treeresolve);
                        this.defaultTreeOpen.push(0);
                    }else{
                        //  this.Treenode1.childNodes = [];
                        //  this.loadNode(this.Treenode1,this.Treeresolve1)
                        this.Treenode.childNodes = [];
                        this.loadNode(this.Treenode,this.Treeresolve);
                        if(this.treeType == 1){
                            this.defaultTreeOpen.push(0);
                            this.defaultTreeOpen.push(this.treeId);
                            this.defaultTreeOpen.push(this.parentIdTree);
                        }else if(this.treeType == 2){
                            this.defaultTreeOpen.push(0)
                            this.defaultTreeOpen.push(this.treeId);
                            this.defaultTreeOpen.push(this.parentIdTree);
                        }else if(this.treeType == 3){
                            this.defaultTreeOpen.push(0)
                            this.defaultTreeOpen.push(this.arrDatas);
                            this.defaultTreeOpen.push(this.brrDatas);
                            //  this.defaultTreeOpen.push(this.treeId);
                            console.log(this.defaultTreeOpen)
                        }
                    }
                   
                }
              
            })
            }
        }
        houseModelDali(){//库房模板的确定 返回到库房
        if(this.shelfCount>250){
             this['$message']({
                            message: '库架不允许超过250。',
                            type: 'error'
                        });
        }else if(this.librarysCount>250){
             this['$message']({
                            message: '库位不允许超过250。',
                            type: 'error'
                        });
        }else{
              this.fileVisibles = false
            this.fileVisible = true;
            Service.ModelsListsQuer({
                "tempName":this.templateName,
                "shelfCount":this.shelfCount,
                "libraryNumber":this.librarysCount
            }).then(res=>{
                this.tableDatas = [];
                   Service.ModelListTemple({}).then(res=>{
                    this.ModelTemplate = res.data.data;

                })
                
            })
        }
          

        };
        handleDelete(index,row){//删除一行表格
             this['$confirm']('确认删除此模板吗？', {
                    type: 'warning'
                }).then(() => {
                     Service.DeletaModels(row.id).then(res=>{
                         this.tempData.splice(index,1)
                    })
                });
            
        };
        handleEdit(index,row){//新增一行表格
            var param = {
                "librarysCount":this.librarysCount,
                "shelfCount":this.shelfCount,
                "templateName":this.templateName
            }
            // this.tempData.unshift(param)
        };
         handleSizeChange(val:number) {
            this.limit = val;
            this.start = val*(this.page);
            this.getFiles();
        };
        handleSizeChangeProject(val:number) {
            this.limit2 = val;
            this.start2 = val*(this.page);
            this.getFiles();
        };
        changeStorehouse(){//更换库位 弹出框显示
            if(this.treeId == -1){
               this['$message']({
                            message: '请先选择要更换的位置。',
                            type: 'error'
                        });
            }else if(this.DangList.length==0){

                  this['$message']({
                            message: '请先选择要更换的档案。',
                            type: 'error'
                        });
            }else{
                if(this.ChekList.length == 0){
                    this['$message']({
                        message: '请选择文件。',
                        type: 'warning'
                    });
                }else{
                    this.storeHouse = true;
                    Service.getTreeName(this.treeId).then(res=>{
                        this.storeInit = res.data.data;
                        console.log(this['$refs']['checkTrees'])
                        var crr = this['$refs']['checkTrees']['store']['nodesMap']
                        console.log(this['$refs']['checkTrees']['showCheckbox'])

                        // for(var item in crr){
                        //    if(crr[item].level == 2){
                        //        console.log(this['$refs']['checkTrees']['store'])
                        //        this['$refs']['checkTrees']['store']['showCheckbox'] = false
                        //    }

                        // }
                    })
                }

            }
           
            // this.storeInit = "一号库房1号库架"
        };
        handleCurrentChange(val:number) {
            this.page = val-1;
            this.start = (val-1)*(this.limit);
            this.getFiles();
        };
        handleCurrentChangeProject(val:number) {
            this.page2 = val-1;
            this.start2 = (val-1)*(this.limit2);
            this.getFiles();
        };
        AddHouseFile():void{
          this.houseMous.MoaelCount = ''
          if(this.treeType == 3){
                     this['$message']({message:"库位下不可添加子集。",type:'warning'})
            }else{
                this.tableDatas = [];
            Service.getTreeName(this.treeId).then(res=>{
               this.storeInit = res.data.data;
            this.dioFormAdd.kuWeiZhi = this.storeInit
            if(this.isFather){
                if(this.treeType == 1){
                    this.kuMesage = "库架名称："
                    this.Addmulv ="添加库架"
                }else if(this.treeType == 2){
                    this.kuMesage = "库位名称："
                    this.Addmulv ="添加库位"
                }else if(this.treeType == 3){
                    this.kuMesage = "库位名称："
                    this.Addmulv ="添加库位"
                }
                this.fileVisible = false;
                this.centerDialogVisibleTree = true;
                this.dioFormAdd.title = ""
                this.dioFormAdd.titleNode = ""

            }else{
                this.fileVisible = true;
                this.centerDialogVisibleTree = false;
                Service.ModelListTemple({}).then(res=>{
                    this.ModelTemplate = res.data.data;
                })
            }
            })
            }
        };
        radioChange(){
            // if(this.activeName === '0'){
            //     this.documentShow = true;
            //     this.borrowShow = false;
            //     this.powerShow = false;
            //     this.formSelect = true;
            //     this.formInput = true;
            // }else if(this.activeName === '1'){
            //     this.documentShow = false;
            //     this.borrowShow = true;
            //     this.powerShow = false;
            //     this.formSelect = false;
            //     this.formInput = true;
            // }
            // this.page = 1;
            // this.start = 0;
            // this.getFiles();
            // if(this.activeName==="2"){
            //     this.projectListVisible = true;
            //     this.projectVisible = false;
            // }else if(this.activeName === "3"){
            //     this.projectListVisible = false;
            //     this.projectVisible = true;
            //     this.showModel = false;
            // }
            if(this.tabPosition==="left"){
                this.getFiles();
                this.projectListVisible = true;
                this.projectVisible = false;
                this.showModel = true;
                this.dangShow = true;
                this.projectShow = false;
            }else if(this.tabPosition === "right"){
                this.projectListVisible = false;
                this.projectVisible = true;
                this.showModel = false;
                this.dangShow = false;
                this.projectShow = true;
                this.listLoading = true;
                if(this.treeId == -1){
                     this['$message']({
                            message: '请先选择树节点。',
                            type: 'error'
                        });
                    this.listLoading = false;
                    this.tabPosition = "left"
                }else{
                    Service.projectListHouse({
                    "keyword":this.projectSerch,
                    "start":this.start2,
                    "limit":this.limit2
                }).then(res=>{
                   if(res.data.succeeded == true){
                   if(res.data.data.list == null ||res.data.data.list==undefined || res.data.data.list == '' ){
                       this.Modeldata = []
                       this.listLoading = false;
                   }else{
                        console.log(res.data.data.list)
                        this.Modeldata = res.data.data.list
                        this.total = res.data.data.totalRecords;
                        this.listLoading = false;
                   }
                }else{
                    this.listLoading = false;
                }
                   
                })
                }
    
            }
        };
        projectSerchList(){
                this.listLoading = true;
                Service.projectListHouse({
                    "keyword":this.projectSerch,
                    "start":this.start2,
                    "limit":this.limit2
                }).then(res=>{
                   if(res.data.succeeded == true){
                   if(res.data.data.list == null ||res.data.data.list==undefined || res.data.data.list == '' ){
                       this.Modeldata = []
                       this.listLoading = false;
                   }else{
                        console.log(res.data.data.list)
                        this.Modeldata = res.data.data.list
                        this.total = res.data.data.totalRecords;
                        this.listLoading = false;
                   }
                }else{
                    this.listLoading = false;
                }
                   
                })
        }
        dangSerchList(){
           Service.HouseFileList({
               "wareId":this.treeId,
                // "wareId":123,
               "start": this.start,
               "limit":this.limit,
               "keyword":this.projectSerchDang,
           }).then(res=>{
               if(res.data.succeeded == true){
                   if(res.data.data.list == null ||res.data.data.list==undefined || res.data.data.list == '' ){
                       this.DangList = [];
                       this.total = 0;
                       this.listLoading = false;
                   }else{
                        this.DangList = res.data.data.list;
                        this.total = res.data.data.totalRecords;
                        this.listLoading = false;
                   }
                }else{
                    this.listLoading = false;
                }
           })
        }

        back():void{
            this['$router'].go(-1);
        };
        selsChangeList(data:any){
            this.ChekList = data;
            console.log(this.ChekList)
            // for(let item of this.ChekList){
            //     this.checkArr.push(item.ID);
            //     this.libArr.push(item.libid)
            //    }

        }
        selsChange(list:any){//表格选中父级
            // this.list = list;
            // console.log(this.list+"123")
        };
        // 表格初始化
        getFiles():void{
           this.listLoading = true;
               Service.houseListTitle({}).then(res=>{
               if(res.data.succeeded == true){
                   this.listData = res.data.data
                   this.listLoading = false;
                }else{
                    this.listLoading = false;
                }
           })
           Service.HouseFileList({
               "wareId":this.treeId,
                // "wareId":123,
               "start": this.start,
               "limit":this.limit,
               "keyword":"",
           }).then(res=>{
               if(res.data.succeeded == true){
                   if(res.data.data.list == null ||res.data.data.list==undefined || res.data.data.list == '' ){
                       this.DangList = [];
                       this.total = 0;
                       this.listLoading = false;
                   }else{
                        this.DangList = res.data.data.list;
                        this.total = res.data.data.totalRecords;
                        this.listLoading = false;
                   }
                }else{
                    this.listLoading = false;
                }
           })
        //    if (this.DangList.length>0) {
        //         this.busy = true ;
        //         this.page = 0;
        //     } else {
        //         this.busy = false;
        //     }
        };
        created(){

        };
        proving1(){//验证模板数量为整数
            //    this.houseMous.MoaelCount=this.houseMous.MoaelCount.replace(/[^\.\d]/g,'');
            //    this.houseMous.MoaelCount=this.houseMous.MoaelCount.replace('.','');
            //    if(Number(this.houseMous.MoaelCount) > 10){
            //        this['$message']({
            //                 message: '模板数量最大限制为10。',
            //                 type: 'error'
            //             });
            //    }
        }
        // 懒加载树
        loadNode(node,resolve) {
             if(this.isFirst){
                this.Treenode = node;
                this.Treeresolve = resolve;
                this.isFirst = false;
            }
            this.Treenode1 = node;
            this.Treeresolve1 = resolve;
            if(node.level === 0){
                Service.getHouseTree({}).then((res) =>{
                    if(res.data.succeeded){
                        
                        this.reloadDate = res.data.data.resultList;
                        let treeData = [];
                        let data = res.data.data;
                        var objs = {id:res.data.data.id,wareName:res.data.data.wareName,hasChildren:false}
                        var obj = {id:res.data.data.id,wareName:res.data.data.wareName,hasChildren:false}
                        console.log(this.reloadDate)
                        treeData.push(obj)
                        this.childTreeDatas = res.data.data.resultList;
                        //  for(let child of res.data.data.resultList){
                        //     let leaf = child.hasChildren
                        //     child.hasChildren = !leaf;
                        // }

                        //   data.resultList.forEach(item => {
                        //     treeData.push(item)
                        // });
                        this.getTreeName0(treeData);
                        resolve(treeData);
                        this.treesId = res.data.data.id;
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }else if(node.level === 1 ){
                Service.getHouseTree({}).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data.resultList;
                        // this.reloadDate.children = [];
                        for(let child of data){
                            let leaf = child.hasChildren;
                            child.hasChildren = !leaf;
                        }
                        data.forEach(item => {
                            treeData.push(item);
                        });
                        this.getTreeName(treeData);
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });

            }else{
                this.treesId = node.data.id;
                this.treeType = node.data.type;
                Service.getHouseTreeson(this.treesId).then((res) =>{
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
                        this.getTreeName(treeData);
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }
           
        };
        // 弹框树
        loadNodes(node,resolve) {
               if(node.level === 0){
                Service.getHouseTree({}).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                         let data = res.data.data;
                         var obj = {id:res.data.data.id,wareName:res.data.data.wareName,Isdisabled:true}
                        treeData.push(obj)
                        this.childTreeDatas = res.data.data.resultList;
                        this.kgetTreeName0(treeData);
                        resolve(treeData);
                        this.treesId = res.data.data.id;
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }else if(node.level === 1 ){
                    //     let treeData = [];
                    //    for(let child of this.childTreeDatas){
                    //         let leaf = child.hasChildren
                    //         child.hasChildren = !leaf;
                    //     }
                    //       this.childTreeDatas.forEach(item => {
                    //         treeData.push(item)
                    //     });
                    //       this.getTreeName(treeData);
                    //       resolve(treeData);
                    //     // this.treesId = res.data.data.id;
                    //     // this.treeType = res.data.data.type;

                             Service.getHouseTree({}).then((res) =>{
                                if(res.data.succeeded){
                                    let treeData = [];
                                    let data = res.data.data.resultList;
                                    // this.reloadDate.children = [];
                                    for(let child of data){
                                        let leaf = child.hasChildren;
                                        child.hasChildren = !leaf;
                                    }
                                    data.forEach(item => {
                                        treeData.push(item);
                                    });
                                    this.kgetTreeName(treeData);
                                    resolve(treeData);
                                }else{
                                    this['$message']({
                                        message: '树节点数据错误。',
                                        type: 'error'
                                    });
                                }
                            });
                 
            }else{
                this.treesId = node.data.id;
                this.treeType = node.data.type;
                Service.getHouseTreeson(this.treesId).then((res) =>{
                    if(res.data.succeeded){
                        let treeData = [];
                        let data = res.data.data;
                        for(let child of data){
                            let leaf = child.hasChildren
                            child.hasChildren = !leaf;
                            child.Isdisabled = false;
                        }
                        data.forEach(item => {
                            treeData.push(item)
                        });
                         if(node.level == 3 || node.level == 2){
                             this['$refs']['checkTrees']['showCheckbox'] = true;
                        }
                        this.kgetTreeName(treeData);
                        resolve(treeData);
                    }else{
                        this['$message']({
                            message: '树节点数据错误。',
                            type: 'error'
                        });
                    }
                });
            }
        };
        // 点击节点图标
        setDataToTrees(treeDatas){ //获取点击时树子集
            console.log(treeDatas)
            this.DeteTreeNode = treeDatas;
            this.isExpand = !this.isExpand;
            treeDatas.isExpand = this.isExpand;
            this.treeId = treeDatas.id;
            this.treeNames = treeDatas.wareName;
            this.treeType = treeDatas.type;
            this.treeNodes = treeDatas.comments;
            this.parentIdTree = treeDatas.parentId
            if(this.treeType == 1){
                this.arrDatas = this.treeId;
            }else if(this.treeType == 2){
                this.brrDatas = this.treeId;
            }
            if(this.treeId == 0){
                this.isFather = false;
            }else{
                this.isFather = true;
            }
            if(treeDatas.className === 'fa fa-plus-square-o'){
                treeDatas.className = 'fa fa-minus-square-o';
            }else if(treeDatas.className === 'fa fa-minus-square-o'){
                treeDatas.className = 'fa fa-plus-square-o';
            }
            this.getFiles();
        }

        // 根级
        getTreeName0(tree){
            console.log(this.defaultTreeOpen)
            for(let grass of tree){
                if(!grass.hasChildren){
                    grass.isExpand = this.isExpand;
                    // grass.className = 'fa fa-plus-square-o';
                    grass.className1 = 'fa fa-institution';
                    grass.className = 'fa fa-plus-square-o';
                    if(this.defaultTreeOpen.length == 1 ||this.defaultTreeOpen.length == 0){
                        grass.className = 'fa fa-plus-square-o';
                    }else{
                        grass.className = 'fa fa-minus-square-o';
                    }
                }
            }

        };

        // 递归节点 增加className
        getTreeName(tree){
            for(let grass of tree){
                if(grass.type===1){
                    grass.srcName = 'static/imgs/allTree/kuHome.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '-1px 5px 0 8px';
                }else if(grass.type===2){
                    grass.srcName = 'static/imgs/allTree/kuBag.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '-1px 5px 0 8px';
                }else if(grass.type===3){
                    grass.srcName = 'static/imgs/allTree/kuCell.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '2px 5px 0 8px';
                }

                if(!grass.hasChildren){
                    grass.isExpand = this.isExpand;
                    grass.className = 'fa fa-plus-square-o';
                }
                if(this.defaultTreeOpen.length!=0){
                    for(var i=0;i<this.defaultTreeOpen.length;i++){
                        if(grass.id == this.defaultTreeOpen[i]){
                            grass.className = 'fa fa-minus-square-o';
                        }
                    }
                }
                

            }
        };
           // 库房 根级
        kgetTreeName0(tree){
            for(let grass of tree){
                if(!grass.hasChildren){
                    grass.isExpand = this.isExpand;
                    grass.className = 'fa fa-plus-square-o';
                    grass.className1 = 'fa fa-institution';
                    // if(this.defaultTreeOpen.length == 0){
                    //     grass.className = 'fa fa-plus-square-o';
                    // }else{
                    //     grass.className = 'fa fa-minus-square-o';
                    // }
                }
            }

        };

        // 递归节点 增加className
        kgetTreeName(tree){
            for(let grass of tree){
                if(grass.type===1){
                    grass.srcName = 'static/imgs/allTree/kuHome.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '-1px 5px 0 8px';
                }else if(grass.type===2){
                    grass.srcName = 'static/imgs/allTree/kuBag.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '-1px 5px 0 8px';
                }else if(grass.type===3){
                    grass.srcName = 'static/imgs/allTree/kuCell.png';
                    grass.marginLeft = '8px';
                    grass.srcMargin = '2px 5px 0 8px';
                }

                if(!grass.hasChildren){
                    grass.isExpand = this.isExpand;
                    grass.className = 'fa fa-plus-square-o';
                }
                // if(this.defaultTreeOpen.length!=0){
                //     for(var i=0;i<this.defaultTreeOpen.length;i++){
                //         if(grass.id == this.defaultTreeOpen[i]){
                //             grass.className = 'fa fa-minus-square-o';
                //         }
                //     }
                // }
                
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
                        'display':'inline-block'
                    }
                },
                [
                    createElement(
                        'i',
                        {
                            attrs:{
                                'class':data.className
                            },
                            style:{
                                'font-size': '16px',
                                'float':'left',
                                'margin-top': '0px'
                            }
                        },
                    ),
                    createElement(
                        'i',
                        {
                            attrs:{
                                'class':data.className1
                            },
                            style:{
                                'font-size': '16px',
                                'float':'left',
                                'margin': '0 5px 0',
                                'color':'rgb(115,128,145)'
                            }
                        },
                    ),
                    createElement(
                        'img',
                        {
                            attrs:{
                                'src':data.srcName
                            },
                            style:{
                                'margin': data.srcMargin,
                                'float': 'left',
                                'width': '19px',
                                'margin-left':data.marginLeft
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-left':'2px'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ]
            )
        };
           // 库房 自定义节点图标
        renderContent1(createElement, { node, data }) {
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
                        'i',
                        {
                            attrs:{
                                'class':data.className
                            },
                            style:{
                                'font-size': '16px',
                                'float':'left',
                                'margin-top': '0px'
                            }
                        },
                    ),
                    createElement(
                        'i',
                        {
                            attrs:{
                                'class':data.className1
                            },
                            style:{
                                'font-size': '16px',
                                'float':'left',
                                'margin': '0 5px 0',
                                'color':'rgb(115,128,145)'
                            }
                        },
                    ),
                    createElement(
                        'img',
                        {
                            attrs:{
                                'src':data.srcName
                            },
                            style:{
                                'margin': data.srcMargin,
                                'float': 'left',
                                'width': '19px',
                                'margin-left':data.marginLeft
                            }
                        },
                    ),
                    createElement(
                        'span',
                        {
                            style:{
                                'margin-left':'2px'
                            }
                        },
                        [
                            createElement('span',node.label)
                        ]
                    ),
                ]
            )
        };
    refreshLazyTree(node, children) {
        console.log(node)
        console.log(children)
        var theChildren = node.childNodes
        delete node.childNodes
        // theChildren.splice(0, node.childNodes.length)
         console.log(theChildren)
        }
    mounted(){
            window.onresize = () => {
                return (() => {
                    this.bodyHeight = document.documentElement.clientHeight -279;
                    var len=document.querySelector(".tableSerach")["offsetWidth"];
                    // if(len<400){
                        
                    //     document.querySelector(".tableSerach-one")["style"].width="800px";
                    //     document.querySelector(".tableSerach-one")["style"].overflowX="scroll";
                    // }
                })()
            };
            Service.houseListTitle({}).then(res=>{
               if(res.data.succeeded == true){
                        this.listData = res.data.data;
                            var obj = JSON.parse(window.sessionStorage.getItem('AddhouseTress'));
                            this.defaultTreeOpen.push(obj.id);
                            this.$nextTick(()=>{
                                 var addtree = {
                                    id:''
                                }
                                 window.sessionStorage.setItem('AddhouseTress',JSON.stringify(addtree));
                            })
                            console.log(this.defaultTreeOpen)
                            console.log(res.data.data)
                            this.listLoading = false;
                   
                   
                }else{
                    this.listLoading = false;
                }
           })
        
          
            // this.getFiles();
        };
    }
</script>
<style lang="scss" scoped>
    @import '../../styles/warehouse/houseManagementSearch';
    @import '../../styles/warehouse/houseManagementSuperSerch';
    .el-tree > div > .el-tree-node__children > div > .el-tree-node__content > .custom-tree-node{
        display:inline-block;
    }
</style>