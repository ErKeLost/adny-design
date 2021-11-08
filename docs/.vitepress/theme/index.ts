import Theme from 'vitepress/dist/client/theme-default'
import AdnyUI from '../../../packages/adny-vue-design/src/components'
import { registerComponents } from './register-vitepress-components'
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(AdnyUI)
    registerComponents(app)
  }
}
