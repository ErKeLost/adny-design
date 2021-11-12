import type { App } from 'vue'

import Grid from './src/grid.vue'
import GridItem from './src/grid-item.vue'

export { Grid, GridItem }

Grid.install = function (app: App) {
  app.component(Grid.name, Grid)
}

GridItem.install = function (app: App) {
  app.component(GridItem.name, GridItem)
}

export default {
  install(app: App) {
    app.use(Grid as any)
    app.use(GridItem as any)
  }
}
