import AIcon from './src/icon'

import type { App } from 'vue'

AIcon.install = function (app: App): void {
  app.component(AIcon.name, AIcon)
}

export { AIcon }

export default {
  title: 'AIcon 图标',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(AIcon as any)
  }
}
