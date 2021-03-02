/**
 * @component * 
 */
const Main = resolve => require(['@/views/Main'],resolve);
const Home = resolve => require(['@/views/home/home'],resolve);
export default (routers, data) => {
    generaMenu(routers, data)
}

// 递归子节点
function generaMenu (routers, data) {
  data.forEach((item) => {     
      let menu = Object.assign({}, item);
      if(menu.winName || (menu.children && menu.children.length > 0)){
            menu.name = menu.caption;
            menu.iconCls = menu.smallIcon;
            if(menu.name == '云盘管理'){
                menu.meta = { keepAlive:true };
            }              
          // 修改没有次级页面的leaf为true         
          if(menu.children === null||menu.children === []){             
              menu.path = menu.winName ;
              menu.children = [];
              menu.leaf = true;
              menu.component = resolve => require(['@/views'+menu.largeIcon],resolve)
          }else if(menu.children.length === 1){
              menu.path = '/';
              menu.component = Main;
              menu.leaf = false;
          }else{
                menu.path = '/';
                menu.component = Main;
                menu.leaf = false;            
          }         
          // 这里考虑到没有子节点，根节点处理点击跳转
          if (item.children) {
              menu.children = [];
              generaMenu(menu.children, item.children)
          }
          routers.push(menu)
      }
  })
}
