import ADivider from './src/divider'
import { App } from 'vue'
export { ADivider }

ADivider.install = function (app: App) {
  app.component(ADivider.name, ADivider)
}

export default {
  install(app: App) {
    app.use(ADivider as any)
  }
}
