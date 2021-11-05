import Notification from './src/create-notification'
import { App } from 'vue'
;(Notification as any).install = function (app: App) {
  app.config.globalProperties.$notify = Notification
}

export { Notification }
export default Notification
