import type { App } from "vue";
import AStatistic from "./src/statistic";

AStatistic.install = function (app: App): void {
  app.component(AStatistic.name, AStatistic);
};

export { AStatistic };

export default {
  title: "Statistic 统计数值",
  category: "数据展示",
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(AStatistic as any);
  },
};
