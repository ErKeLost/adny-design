import Drawer from './src/drawer.vue'
import { App } from 'vue'
export { Drawer }

Drawer.install = function (app: App) {
  app.component(Drawer.name, Drawer)
}

export default {
  install(app: App) {
    app.use(Drawer as any)
  }
}
