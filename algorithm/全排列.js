function permute(arr) {
  const res = [];
  function breaktrack(subArr, remianing) {
    if(remianing.length === 0) {
      res.push(subArr)
      return
    }
    remianing.forEach((cur, i) => {
      breaktrack(subArr.concat(cur), remianing.slice(0, i).concat(remianing.slice(i + 1)))
    });
  }
  breaktrack([], arr)
  return res;
}

const arr = [1, 2, 3];

const res = permute(arr);

console.log(res)