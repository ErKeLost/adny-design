// can export function.  解构参数类型冗余 新定义insterface IRippleDirectiveOptionWithBinding
// import {} from "./options";
// import { lazy } from "./v-lazy";
export default {
  mounted(el: any, binding: any) {
    console.log(el);
    // el - dom元素，bindings - 指令的值
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        observer.unobserve(el);
        // 表示绑定的 dom 进入可视区域
        el!.src = binding.value;
        console.log(el.src);

        // 图片加载出错时，显示默认图片
        el.onerror = () => {
          el!.src = "";
        };
      }
    });
    // 监视 dom
    observer.observe(el);
  },
};
