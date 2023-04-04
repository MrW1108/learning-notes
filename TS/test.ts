enum Color {
  red,
  yello,
  blue,
}
let c: Color = Color.blue;
console.log(c);

// var Color;
// (function (Color) {
//   Color[(Color["red"] = 0)] = "red";
//   Color[(Color["yello"] = 1)] = "yello";
//   Color[(Color["blue"] = 2)] = "blue";
// })(Color || (Color = {}));
// var c = Color.blue;
// console.log(c);
