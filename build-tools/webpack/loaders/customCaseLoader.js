// 大小写转换loader
// options:
// case: 'upper' or 'lower'
module.exports = function (source) {
  const { caseType } = this.getOptions();
  let result = source;
  if (caseType === "upper") {
    result = source.toUpperCase();
  } else if (caseType === "lower") {
    result = source.toLowerCase();
  }
  return result;
};
