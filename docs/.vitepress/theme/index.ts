import Theme from 'vitepress/dist/client/theme-default'
import Button from '../../../packages/adny-vue-design/src/components/button/src/button.vue'
import Card from '../../../packages/adny-vue-design/src/components/card/src/card'
import Input from '../../../packages/adny-vue-design/src/components/input/src/input'
import Icon from '../../../packages/adny-vue-design/src/components/icon/src/icon'
// import Icon from '../../../packages/adny-vue-design/src/components/icon/icon.vue'
import FormDetails from '../../../packages/adny-vue-design/src/components/form-details/src/FormDetails.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import 'vitepress-theme-demoblock/theme/styles/index.css'
export default {
    ...Theme,
    enhanceApp({ app }) {
        app.component('a-btn', Button)
        app.component('a-card', Card)
        app.component('a-input', Input)
        app.component('a-icon', Icon)
        app.component('a-form-details', FormDetails)
        app.component('Demo', Demo)
        app.component('DemoBlock', DemoBlock)
    }
}