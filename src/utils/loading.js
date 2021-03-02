
function loadMore(a){
    Vue.directive('tabelLoadmore', {
        bind(el, binding) {
            const SELECTWRAP_DOM = el.querySelector(a);

            SELECTWRAP_DOM.addEventListener('scroll', function() {

                /*
                * scrollHeight 获取元素内容高度(只读)
                * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                * clientHeight 读取元素的可见高度(只读)
                * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                */
                let sign = 80; // 定义默认的向上滚于乡下滚的边界
                const CONDITION = ((this.scrollHeight - this.scrollTop === this.clientHeight) &&
                    this.scrollTop > sign)// 注意: && this.scrollTop

                if(this.scrollTop > sign) {
                    sign = this.scrollTop;
                    console.log('向下')
                }
                if(this.scrollTop < sign) {
                    sign = this.scrollTop;
                    console.log('向上')
                }

                if(CONDITION) {
                    binding.value();
                }
            });
        }
    })
}

export default loadMore