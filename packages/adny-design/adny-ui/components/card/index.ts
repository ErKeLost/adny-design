import ACard from './src/card'

import type { App } from 'vue'

ACard.install = function (app: App): void {
  app.component(ACard.name, ACard)
}

export { ACard }

export default {
  title: 'ACard 卡片',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(ACard as any)
  }
}
