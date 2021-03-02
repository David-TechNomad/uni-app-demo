<template>
    <el-dialog title="阅览" fullscreen 
        :visible.sync="dialogVisible"  class="windowDialog " :close-on-click-modal='false' :show-close="true"  >
        <div class=" boxshow" style="background-color: #acacac;
            position: absolute;left: 20px;right: 20px;top: 60px;bottom: 40px;">
            <div  style="height:100%;margin-top:40px;">
                <div class="div1" >
                    <iframe id='previewPdf' :src="file" height="100%"
                            width="100%">
                    </iframe>
                </div>
            </div> 
        </div>  
    </el-dialog>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './borrowDetails.service';
    @Component({})
    export default class readingDialog extends Vue{		
        dialogVisible:boolean = false;
        fileUrl: string = '';
        passedWatermarkFilePath: string ='';
        file: string = '';

        @Watch('dialogVisible')
        showWin(){
            if (this.dialogVisible) {
                this.open();
            }
        }
        // 转化文件流
        getObjectURL(file) {
            let url = null;
            if (window['createObjectURL'] != undefined) { // basic
                url = window['createObjectURL'](file);
            } else if (window['webkitURL'] != undefined) { // webkit or chrome
                url = window['webkitURL']['createObjectURL'](file);
            } else if (window['URL'] != undefined) { // mozilla(firefox)
                url = window['URL']['createObjectURL'](file);
            }
            return url;
        };
        // 双击打开pdf
        open(){
            if(this.passedWatermarkFilePath){
                let path = this.passedWatermarkFilePath;

                Service.getFileByFilePath({filePath:path}).then(res =>{
                    let blob = new Blob([res],{type: 'application/pdf'});
                    this.fileUrl = this.getObjectURL(blob);
                    this.file = 'static/pdf/web/viewer.html?file=' + this.fileUrl;
                    document.getElementById('previewPdf').setAttribute('src',this.file);
                });
            }
        }
        created(){            
        };    
        mounted(){ 
        };
      }
 </script>
 <style lang="scss" scoped>
    .div1{
        height:100%;
        position: relative;
        top:0;
        cursor:pointer;
        margin-top:10px;
        overflow-y: auto;
    }
</style>