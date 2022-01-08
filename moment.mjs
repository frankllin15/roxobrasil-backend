const variats = [
  { price: 2 },
  { price: 22 },
  { price: 23 },
  { price: 26 },
  { price: 62 },
];

// const max = variats.reduce((prev, current) => {
//   return current.price > prev ? current.price : prev;
// }, variats[0].price);
const max = Math.max([1, 2]);

console.log(max);
