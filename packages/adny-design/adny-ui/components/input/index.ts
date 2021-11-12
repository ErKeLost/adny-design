import AIput from './src/input'

import type { App } from 'vue'

AIput.install = function (app: App): void {
  app.component(AIput.name, AIput)
}

export { AIput }

export default {
  title: 'AIput 输入框',
  category: '反馈',
  status: '30%',
  install(app: App): void {
    app.use(AIput as any)
  }
}
