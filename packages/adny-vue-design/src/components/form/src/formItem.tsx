import { defineComponent, inject, ref, provide } from 'vue'
import Schema from 'async-validator'
import { props } from './formItemProps'
import AdnyFormDetail from '../../form-details'
export default defineComponent({
  props,
  components: {
    AdnyFormDetail
  },
  setup(props, ctx) {
    const errorMessage = ref('')
    const formInstance: any = inject('formInstance')
    provide('name', props.prop)
    const validator = () => {
      const value = formInstance.model[props.prop]
      const rule = formInstance.rules[props.prop]
      const schema = new Schema({ [props.prop]: rule })
      return schema.validate({ [props.prop]: value }, (err, item) => {
        if (err) {
          errorMessage.value = err[0].message
        } else {
          errorMessage.value = ''
        }
      })
    }
    ctx.expose({ validator })
    return () => {
      return (
        <>
          {props.label ? <label>{props.label}</label> : null}
          {ctx.slots.default ? ctx.slots.default() : null}
          <adny-form-detail error-message={errorMessage.value} />
        </>
      )
    }
  }
})
