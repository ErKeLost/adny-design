import Message from './src/create-message'
import { App } from 'vue'
;(Message as any).install = function (app: App): void {
  app.config.globalProperties.$message = Message
  app.component(Message.name, Message)
}

export { Message }

export default {
  title: 'Message 全局提示',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(Message as any)
  }
}
