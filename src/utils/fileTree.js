function filetree(tree){
    for(let item of tree){
        if(item.children.length>0){
            item.className='fa fa-circle';
            for(let son of item.children){
                if(son.hasChildren){
                    son.className='fa fa-circle'
                }     else{
                    son.className='fa fa-circle-o'
                }
            }
        }else{
            item.className='fa fa-circle'
        }

    }
}
export default (tree)=>{
   filetree(tree)
}
