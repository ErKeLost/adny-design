import Theme from 'vitepress/dist/client/theme-default'
import Button from '../../../adnyui/button/src/button'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import 'vitepress-theme-demoblock/theme/styles/index.css'
export default {
    ...Theme,
    enhanceApp({ app }) {
        app.component('a-btn', Button)
        app.component('Demo', Demo)
        app.component('DemoBlock', DemoBlock)
    }
}