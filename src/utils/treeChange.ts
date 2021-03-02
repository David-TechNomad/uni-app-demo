export default (tree) => {
    grassTree(tree);
}

function grassTree(tree){
    for(let grass of tree){
        if(grass.children&&grass.children.length>0){
            grass.className = 'fa fa-circle';
            for(let ass of grass.children){
                if(ass.children&&ass.children.length>0){
                    ass.className = 'fa fa-circle';
                }else{
                    ass.className = 'fa fa-circle-o';
                }
            }
           //this.getTreeName(grass.children);
        }else{
            grass.className = 'fa fa-circle-o';
        }
    }
}


