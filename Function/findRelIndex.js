function findRelIndex(List,Obj){
    let i,j;
    for(i=0;i<List.length;i++){
        for(j=0;j<List[i].length;j++){
            if(List[i][j]===Obj){
                return {
                    page:i,
                    item:j,
                }
            }
        }
    }
}
export{
    findRelIndex,
}