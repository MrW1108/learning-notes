const myInstanceOf = (obj, constructor) => {
  if (typeof constructor !== "function") {
    throw TypeError("constructor is not a function");
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return false;
  }
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(obj);
  }
  return false;
};
