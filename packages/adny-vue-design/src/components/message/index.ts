import Message from './src/create-message'
import { App } from 'vue'
;(Message as any).install = function (app: App) {
  app.config.globalProperties.$message = Message
}

export { Message }
export default Message
