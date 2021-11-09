import AppBar from './src/app-bar.vue'
import { App } from 'vue'
export { AppBar }

AppBar.install = function (app: App) {
  app.component(AppBar.name, AppBar)
}
export default {
  title: 'AppBar 导航',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(AppBar as any)
  }
}
