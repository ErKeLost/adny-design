import AForm from './src/form'
import AFormItem from './src/formItem'
import type { App } from 'vue'

AForm.install = function (app: App): void {
  app.component(AForm.name, AForm)
}
AFormItem.install = function (app: App): void {
  app.component(AFormItem.name, AFormItem)
}

export { AForm, AFormItem }

export default {
  title: 'AForm 表单',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(AForm as any)
    app.use(AFormItem as any)
  }
}
