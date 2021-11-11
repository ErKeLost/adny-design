import ACarousel from './src/carousel.vue'
import { App } from 'vue'
export { ACarousel }

ACarousel.install = function (app: App) {
  app.component(ACarousel.name, ACarousel)
}

export default {
  install(app: App) {
    app.use(ACarousel as any)
  }
}
