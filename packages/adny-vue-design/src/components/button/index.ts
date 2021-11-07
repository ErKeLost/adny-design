import ABtn from './src/button.vue'
import type { App } from 'vue'

ABtn.install = function (app: App): void {
  app.component(ABtn.name, ABtn)
}

export { ABtn }

export default {
  title: 'ABtn 按钮',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(ABtn as any)
  }
}
