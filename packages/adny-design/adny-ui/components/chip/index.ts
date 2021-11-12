import Chip from './src/chip.vue'

import { App } from 'vue'

export { Chip }

Chip.install = function (app: App) {
  app.component(Chip.name, Chip)
}

export default {
  install(app: App) {
    app.use(Chip as any)
  }
}
