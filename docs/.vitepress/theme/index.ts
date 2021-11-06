import Theme from 'vitepress/dist/client/theme-default'
import Button from '../../../packages/adny-vue-design/src/components/button/src/button.vue'
import Card from '../../../packages/adny-vue-design/src/components/card/src/card'
import Input from '../../../packages/adny-vue-design/src/components/input/src/input'
import Icon from '../../../packages/adny-vue-design/src/components/icon/src/icon'
import Form from '../../../packages/adny-vue-design/src/components/form/src/form'
import Message from '../../../packages/adny-vue-design/src/components/message'
import Notification from '../../../packages/adny-vue-design/src/components/notification'
import FormItem from '../../../packages/adny-vue-design/src/components/form/src/formItem'
import FormDetails from '../../../packages/adny-vue-design/src/components/form-details/src/FormDetails.vue'
import { registerComponents } from './register-vitepress-components'
export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(Message)
    app.use(Notification)
    app.component('a-btn', Button)
    app.component('a-card', Card)
    app.component('a-input', Input)
    app.component('a-icon', Icon)
    app.component('a-form', Form)
    app.component('a-form-item', FormItem)
    app.component('a-form-details', FormDetails)
    registerComponents(app)
  }
}
