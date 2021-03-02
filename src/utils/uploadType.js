export default {
    image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    video: ['.mp4', '.rmvb', '.mkv', '.wmv', '.flv'],
    music: ['.mp3', '.m4a'],
    document: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.pdf', '.txt', '.tif', '.tiff'],
    getAll(){
        return [...this.image, ...this.video, ...this.document, ...this.music]
    },
};