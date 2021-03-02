<template>
    <el-table :data="childrenData" style="width: 100%" :show-header="false" v-loading="tableLoading" :row-key="getRowKeys" :expand-row-keys="expands" :row-class-name="tableRowClassName" class="expandTable" @expand-change="getChildrenData">
        <el-table-column type="expand" width="100">
            <template slot-scope="scope">
                <div v-if="scope.row.hasChildren" class="expand_div">
                    <appMy @updateFondsAndUser="updateFondsAndUser" @deleteFonds="deleteFonds" @jianZhiDangAnYuanOut="jianZhiDangAnYuanOut" :exWidth="exWidth2()" :kuandu="kuandu2()" :pObj = "scope.row" :roleSelect="roleSelect" :childrenData ="childData"></appMy>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="fondName" label="全宗名" width="200">
        </el-table-column>
        <el-table-column prop="fondCode" label="全宗号">
        </el-table-column>
        <el-table-column v-for="(item,index) in roleSelect" :key="index" :label="item.roleName">
            <el-table-column :prop="getfName(index)" label="姓名">
            </el-table-column>
            <el-table-column :prop="getlName(index)" label="万信号">
            </el-table-column>
        </el-table-column>
        <el-table-column prop="orgName" label="对应公司">
        </el-table-column>
        <el-table-column prop="isEscrow" label="代管状态">
            <template slot-scope="scope">
                <span v-if="scope.row.isEscrow">是</span>
                <span v-if="scope.row.isEscrow == false">否</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
            <template slot-scope="scope">
                <span class="addBtn" v-if="scope.row.parentId != 0" @click="updateFondsAndUser(scope.row)">编辑</span>
                <span class="addBtn" @click="deleteFonds(scope.row)">删除</span>
                <span class="addBtn" @click="jianZhiDangAnYuanOut(scope.row)">兼职档案员</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop,Model } from 'vue-property-decorator'
    import Service from './casesManagement.service';
    @Component({
        name:'appMy'
    })
    export default class appMy extends Vue {
        @Prop({ default: [] })
        childrenData: any;
        @Prop({ default: [] })
        roleSelect: any;
        @Prop({ default: null })
        pObj: any;
        @Prop({ default: null })
        kuandu: number;
        @Prop({ default: null })
        exWidth: number;
        tableData: any = [];
        userWanxinData3: any = [];
        childData: any = [];
        obj: any = {};
        bodyHeight: number;
        expands:any = [];
        ids: any = [];
        allData:any = [];
        duiXiang:any = {};
        tableLoading: boolean;;
        constructor(){
            super();
            this.tableData = [];
            this.userWanxinData3 = [];
            this.childData = [];
            this.obj = {};
            this.expands = [];
            this.ids = [];
            this.allData = [];
            this.duiXiang = {};
            this.tableLoading = false;
        }

        getfName(index){
            return "fName"+index;
        }
        getlName(index){
            return "lName"+index;
        }

        getChildrenData(row,expandedRows){
           this.obj = row;
           this.getFiles(row);
           if (expandedRows.length > 1) {
             this.expands = [];
             if (row) {
               this.expands.push(row.fondId)
             }
           }
         }

        updateFondsAndUser(obj){
            this.$emit('updateFondsAndUser',obj);
        }

        deleteFonds(obj){
            this.$emit('deleteFonds',obj);
        }

        jianZhiDangAnYuanOut(obj){
            this.$emit('jianZhiDangAnYuanOut',obj);
        }

        tableRowClassName({row, rowIndex}) {
            if(row.hasChildren && row.exWidth == 90){
                return 'row-expand-levelOne'
            }else if(row.hasChildren && row.exWidth == 110){
                return 'row-expand-levelTwo'
            }else if(row.hasChildren && row.exWidth == 130){
                return 'row-expand-levelThree'
            }else if(row.hasChildren && row.exWidth == 130){
                return 'row-expand-levelThree'
            }else if(row.hasChildren && row.exWidth == 150){
                return 'row-expand-levelFour'
            }else if(row.hasChildren && row.exWidth == 170){
                return 'row-expand-levelFive'
            }else if(row.hasChildren && row.exWidth == 190){
                return 'row-expand-levelSix'
            }

            else{
                return 'row-expand-null';
            }
        }

        // 获取展开行id
        getRowKeys(row) {
            return row.fondId;
        };

        getFiles(row){
            this.tableLoading = true;
            let that = this;
            let parames = {
                fullName:'',
                loginName:'',
                fondsName:'',
                parentId:row.fondId,
                fondsCode:'',
            };
             Service.searchFondsAndUserInfoByParentId(parames).then((res) =>{
                this.tableLoading = false;
                let attr = [];
                attr = res.data.data;
                for(let child of attr){
                    child.exWidth = row.exWidth + 20;;
                    child.kuandu = row.kuandu - 20;
                   if(child.fondRoleUserInfoList.length != 0){
                       that.userWanxinData3 = child.fondRoleUserInfoList;
                       for(let i = 0;i < that.roleSelect.length;i++){
                           let child1 = that.roleSelect[i];
                           for(let child2 of that.userWanxinData3){
                                if(child1.roleName == child2.roleName){
                                  child['fName'+i] = child2.fName;
                                  child['lName'+i] = child2.lName;
                                }
                           }
                       }
                   }
                }
                that.childData = attr;
                if(this.ids.indexOf(row.fondId) < 0){
                    this.ids.push(row.fondId);
                    this.allData.push(that.childData);
                }
                console.log("===========")
                console.log(this.allData)
             });
        }
         exWidth1(){
            console.log(this.pObj.exWidth+"sssss")
            return this.pObj.exWidth;
         }
         kuandu1(){
            return this.pObj.kuandu;
         }

         changeVal(obj){
            //console.log(attr)
            //console.log(this.childrenData)
            //this.childrenData = attr;
           // for(let child of this.allData){
             //   for(let child1 of child){
               //     if(child1.fondId == obj.fondId){
                        this.getListData(obj);
                 //   }
                //}
            //}
         }

         getListData(obj){
            let that = this;
            let parames = {
                fullName:'',
                loginName:'',
                fondsName:'',
                parentId:obj.parentId,
                fondsCode:'',
            };
            Service.searchFondsAndUserInfoByParentId(parames).then((res) =>{
                let attr = [];
                attr = res.data.data;
                for(let child of attr){
                   if(child.fondRoleUserInfoList.length != 0){
                       that.userWanxinData3 = child.fondRoleUserInfoList;
                       for(let i = 0;i < that.roleSelect.length;i++){
                           let child1 = that.roleSelect[i];
                           for(let child2 of that.userWanxinData3){
                                if(child1.roleName == child2.roleName){
                                  child['fName'+i] = child2.fName;
                                  child['lName'+i] = child2.lName;
                                }
                           }
                       }
                   }
                }


                for(let child of attr){
                    if(child.fondId == obj.fondId){
                        for(let i = 0;i < this.roleSelect.length;i++){
                            obj["fName"+i] = child['fName'+i];
                            obj["lName"+i] = child['lName'+i];
                        }
                    }
                }
                //this.allData[0][0].fName1 = "sss"
            });
         }

         kuandu2(){
            return this.kuandu-20;
         }

         exWidth2(){

            return this.exWidth+20;
         }

        created(){
        }

        mounted(){
            //this.tableData  = this.childrenData;
            //this.kuandu = this.kuandu-20;
            //this.exWidth = this.exWidth+20;
        };

    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/selfTip/borrow.scss';
</style>