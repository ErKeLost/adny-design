import ACarouselItem from './src/carousel-item.vue'
import { App } from 'vue'
export { ACarouselItem }

ACarouselItem.install = function (app: App) {
  app.component(ACarouselItem.name, ACarouselItem)
}

export default {
  install(app: App) {
    app.use(ACarouselItem as any)
  }
}

