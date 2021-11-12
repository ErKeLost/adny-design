import ATabsItem from './src/tabs-item.vue'
import { App } from 'vue'

export { ATabsItem }

ATabsItem.install = function (app: App) {
  app.component(ATabsItem.name, ATabsItem)
}

export default {
  install(app: App): void {
    app.use(ATabsItem as any)
  }
}
