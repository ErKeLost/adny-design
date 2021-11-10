import { App } from 'vue'

import ADialog from './src/dialog.vue'

export { ADialog }

ADialog.install = function (app: App) {
  app.component(ADialog.name, ADialog)
}

export default {
  install(app: App) {
    app.use(ADialog as any)
  }
}
