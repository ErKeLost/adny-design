// pow  返回 基数的指数次幂 t ** power
// const easeIn = (power) => (t: number) => Math.pow(t, power);
// const easeOut = (power) => (t: number) => 1 - Math.abs(Math.pow(t - 1, power));
// const easeInOutBy = (power) => (t: number) =>
//   t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5;

// export const linear = (t: number) => t;
// export const quadIn = easeInBy(2);
// export const quadOut = easeOutBy(2);
// export const quadInOut = easeInOutBy(2);
// export const cubicIn = easeInBy(3);
// export const cubicOut = easeOutBy(3);
// export const cubicInOut = easeInOutBy(3);
// export const quartIn = easeInBy(4);
// export const quartOut = easeOutBy(4);
// export const quartInOut = easeInOutBy(4);
// export const quintIn = easeInBy(5);
// export const quintOut = easeOutBy(5);
// export const quintInOut = easeInOutBy(5);
// export const sineIn = (t: number) =>
//   1 + Math.sin((Math.PI / 2) * t - Math.PI / 2);
// export const sineOut = (t: number) => Math.sin((Math.PI / 2) * t);
// export const sineInOut = (t: number) =>
//   (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
// export const bounceOut = (t: number) => {
//   const s = 7.5625;
//   const p = 2.75;

//   if (t < 1 / p) {
//     return s * t * t;
//   }
//   if (t < 2 / p) {
//     t -= 1.5 / p;
//     return s * t * t + 0.75;
//   }
//   if (t < 2.5 / p) {
//     t -= 2.25 / p;
//     return s * t * t + 0.9375;
//   }
//   t -= 2.625 / p;
//   return s * t * t + 0.984375;
// };
// export const bounceIn = (t: number) => 1 - bounceOut(1 - t);
// export const bounceInOut = (t: number) =>
//   t < 0.5 ? bounceIn(t * 2) * 0.5 : bounceOut(t * 2 - 1) * 0.5 + 0.5;
const pow = Math.pow;
const sqrt = Math.sqrt;
// const sin = Math.sin;
// const cos = Math.cos;
// const PI = Math.PI;
// const c1 = 1.70158;
// const c2 = c1 * 1.525;
// const c3 = c1 + 1;
// const c4 = (2 * PI) / 3;
// const c5 = (2 * PI) / 4.5;

export const easeOutCubic = function (x: number) {
  return 1 - pow(1 - x, 3);
};
export const linear = (x) => x;
export const easeOutExpo = function (x: number) {
  return x === 1 ? 1 : 1 - pow(2, -10 * x);
};

export const easeInOutExpo = function (x: number) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? pow(2, 20 * x - 10) / 2
    : (2 - pow(2, -20 * x + 10)) / 2;
};
export const easeInExpo = function (x: number) {
  return x === 0 ? 0 : pow(2, 10 * x - 10);
};
export const easeInOutCirc = function (x: number) {
  return x < 0.5
    ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
    : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
};
