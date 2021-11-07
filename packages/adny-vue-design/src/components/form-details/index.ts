import type { App } from 'vue'
import AdnyFormDetail from './src/FormDetails.vue'

AdnyFormDetail.install = function (app: App): void {
  app.component(AdnyFormDetail.name, AdnyFormDetail)
}

export { AdnyFormDetail }

export default {
  title: 'AdnyFormDetail 校验表单',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(AdnyFormDetail as any)
  }
}
