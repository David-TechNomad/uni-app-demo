export default (tree) => {
    grassTrees(tree);
}
function grassTrees(tree){
    for(let grass of tree){
         grass.className = grass.className
           //this.getTreeName(grass.children);
        }
}