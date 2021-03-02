<template>
    <section>
        <div class="mainTitle">
            <span>测试pdf</span>
        </div>
        <div class="divBoxs" :style="divStyle">
            <div class="div1"  style="height:100%;" v-loading="pdfLoading" element-loading-text="努力加载中...">
                <iframe id='previewPdf' :src="iframeSrc" height="100%" width="100%" />
            </div>
        </div>
    </section>
</template>

<script lang = "ts">
import Vue from 'vue';
import Component from 'vue-class-component';
 @Component()  
    export default class importList extends Vue{
        windowHeight: number;
        bodyHeight: number;
        iframeSrc: string = '';
        divStyle: any = {
            "height": Number(document.documentElement.clientHeight-112)+'px' ,
			"overflow-y": 'auto',
			"padding":'20px 10px 0 15px'
        };
        constructor(){
            super();
            this.windowHeight = document.documentElement.clientHeight;
            this.bodyHeight = document.documentElement.clientHeight-250;
};
    
    mounted(){
        let fileUrl = '../../../../static/pdf/web/test.pdf'
        this.iframeSrc = 'static/pdf/web/viewer.html?file=' + fileUrl;
        window.onresize = () => {
            return (() => {
                this.bodyHeight = document.documentElement.clientHeight-250;
            })()
        };
        // this.getFiles();
    };
    computed: {
        };

}
</script>

<style lang="scss" scoped>
section{
    .mainTitle{
      line-height:50px;
      height:50px;
      color:rgb(66,139,202);
      font-weight:500;
      font-size:16px;
      span{
        padding:0 10px;
        border-left:3px solid rgb(66,139,202);
      }
    }
  }
</style>