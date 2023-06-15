function getPropByPath(obj, path) {
  let tempObj = obj;
  // 将路径中的方括号表示法（例如[key]）转换为点表示法（例如.key）
  path = path.replace(/\[(\w+)\]/g, ".$1");
  // 将路径字符串中开头的点号（.）去除掉
  path = path.replace(/^\./, "");

  let keyArr = path.split(".");
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj) {
      break;
    }
    let key = keyArr[i];
    if (!(key in tempObj)) {
      break;
    }
    tempObj = tempObj[key];
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
}
