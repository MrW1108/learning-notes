function test(array){
    var ret  = []
    const toArr = function(array){
        array.forEach(element => {
            if(Array.isArray(element)){
                toArr(element)
            }
            else{
                ret.push(element)
            }
        });
    }
    toArr(array)
    return ret
}

console.log(test([1,[2,[1,2],3]]))