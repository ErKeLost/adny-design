import { SetupContext, defineComponent } from "vue"

export default defineComponent({
    render() {
        return <div>hello</div>
    },
    setup(props, context: SetupContext) {
        return () => {
            return  <div>我是123456</div>
        }
    }
})

