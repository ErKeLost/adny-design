import Notification from './src/create-notification'
import { App } from 'vue'
;(Notification as any).install = function (app: App): void {
  app.config.globalProperties.$notify = Notification
  app.component(Notification.name, Notification)
}

export { Notification }

export default {
  title: 'Notification 通知',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(Notification as any)
  }
}
