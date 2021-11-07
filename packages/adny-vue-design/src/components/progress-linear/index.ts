import ProgressLinear from './src/progress-linear.vue'
import { App } from 'vue'
ProgressLinear.install = function (app: App): void {
  app.component(ProgressLinear.name, ProgressLinear)
}

export { ProgressLinear }

export default {
  title: 'ProgressLinear 线性进度条',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(ProgressLinear as any)
  }
}
