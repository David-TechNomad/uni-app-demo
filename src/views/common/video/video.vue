<template>
<section  class="wrapprSection">
        <div class="mainTitle">视频测试</div>
        <div class="videoView">
            <!-- <video src="https://evc.baidu.com/vedio/e/f3/c5/ef3c55a215f095c5eff5e7e1d19686fd.mp4" controls="controls" controlsList="nodownload">
            您的浏览器不支持 video 标签。
            </video>
            <audio src="http://openod.sign.qingting.fm/m4a/5d9d81b37cb89160c320d8dd_14195098_64.m4a?sign=1c456027d529ed8d581a3aa667e0e530&t=5da4b429&clientID=ZGVmNGNjM2EtZjVkNy0xMWU3LTkyM2YtMDAxNjNlMDAyMGFk" controls="controls" controlsList="nodownload" oncontextmenu="return false">
                您的浏览器不支持 audio 标签。
            </audio> -->
            <!-- <div id="player"></div> -->
            <div id="video" style="width: 100%; height: 400px;max-width: 600px;"></div>
        </div> 
        
</section>
</template>
<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import Service from './video.service';
    import all from '../../../utils/firstSlice.js';
    import crc32 from '@/utils/crc32.js';
    @Component({})
    export default class singleUploadFilesDialog extends Vue{
        playerOptions:any={};
        videoObject:any={};
        constructor(){
            super();
            this.videoObject = {
                container: '#video', //容器的ID或className
				variable: 'player',//播放函数名称
				poster:'',//封面图片
				video: [//视频地址列表形式
					['blob:http://localhost:8086/378d5a94-8ec5-4256-b1b7-05f940db9bee', '中文标清', 0]
				]
            }
    }
         mounted() {
             let player = new ckplayer(this.videoObject);
            // var player = jwplayer('player');
            // player.setup({
            // playlist: 'https://evc.baidu.com/vedio/e/f3/c5/ef3c55a215f095c5eff5e7e1d19686fd.mp4'
            // });
            // player.addButton(
            //This portion is what designates the graphic used for the button
            // "./assets/download.svg",
            //This portion determines the text that appears as a tooltip
            // "Download Video",
            //This portion designates the functionality of the button itself
            // function() {
            //     //With the below code, we're grabbing the file that's currently playing
            //     window.location.href = player.getPlaylistItem()['file'];
            // },
            //And finally, here we set the unique ID of the button itself.
            // "download"
            // );
        }
    }
 </script>
 <style lang="scss" scoped>
    .wrapprSection {
            padding: 0 10px;
            height: 100%;
            overflow-y: auto;
            position: relative;
            >>>.tree, >>>.contentbox{ 
                top:50px;
            }
            >>>.tree .treeCon{
                top:60px;
            }
            >>>.contentbox.contentbox-full{ 
                left: 10px;
                overflow-y: auto;
            }
        
        } 
        .TabRBtn i{
            color: #78c500;
            margin-right: 5px;
        }
        body >>>.searchKey{
            margin-bottom:10px; 
        }
        .videoView{
            width: 700px;
            height: 700px;
            margin: 0 auto;
            video{
                width: 100%;
            }
        }
        .jw-button-image {
            background-size: 45%;
            opacity: 1;
        }
</style>
 