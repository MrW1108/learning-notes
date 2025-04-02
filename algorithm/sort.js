function quickSort(arr) {

  function sort(arr, i, j) {
    if (i < j) {
      const flag = arr[i];
      let left = i, right = j;
      while(left < right){
        while(left < right && arr[right] >= flag) {
          right--
        }
        arr[left] = arr[right];
        while(left < right && arr[left] < flag) {
          left++
        }
        arr[right] = arr[left];
      }
      arr[left] = flag;
      sort(arr, i, left)
      sort(arr, left + 1, j)
    }
  }
  sort(arr, 0, arr.length - 1)
}

const arr = [2,4,6,3,9,3,2]
quickSort(arr)
console.log(arr)