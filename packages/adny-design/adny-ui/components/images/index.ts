import AImage from './src/images.vue'

import type { App } from 'vue'

AImage.install = function (app: App): void {
  app.component(AImage.name, AImage)
}

export { AImage }

export default {
  title: 'AImage 图片',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(AImage as any)
  }
}
