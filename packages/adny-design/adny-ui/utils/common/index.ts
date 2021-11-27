import { ref } from "vue";

// 判断value 是否 为空  ？ ：
export const isEmpty = (val: unknown) => {
  return (
    val === undefined ||
    val === null ||
    val === "" ||
    (Array.isArray(val) && !val.length)
  );
};

// 判断是否为数组
export const isArray = (val: unknown): val is Array<any> => Array.isArray(val);
