import { defineComponent, computed, reactive, onMounted, onUpdated, toRefs } from 'vue'
import { toSizeUnit } from '../../../utils/elements'
import { isBool, toNumber } from '../../../utils/shared'
import { props } from './props'
import '../../../styles/common.less'
import '../styles/divider.less'
export default defineComponent({
  name: 'ADivider',
  props,
  setup(props, { slots }) {
    const state = reactive({ withText: false })

    const isInset = computed(() => (isBool(props.inset) ? props.inset : true))

    const style = computed(() => {
      const { inset, vertical, margin } = props
      const baseStyle = {
        margin
      }

      if (isBool(inset) || inset === 0) return { ...baseStyle }

      // -18px -> -18
      const _inset = toNumber(inset)
      // -18px -> 18px
      const absInsetWithUnit = Math.abs(_inset) + (inset + '').replace(_inset + '', '')
      return vertical
        ? {
            ...baseStyle,
            height: `calc(80% - ${toSizeUnit(absInsetWithUnit)})`
          }
        : {
            ...baseStyle,
            width: `calc(100% - ${toSizeUnit(absInsetWithUnit)})`,
            left: _inset > 0 ? toSizeUnit(absInsetWithUnit) : toSizeUnit(0)
          }
    })

    const checkHasText = () => {
      state.withText = Boolean(slots.default?.().length) || Boolean(props.description)
    }
    onMounted(() => {
      checkHasText()
    })

    onUpdated(() => {
      checkHasText()
    })
    const dividerClass = [
      'adny-divider',
      'adny-box',
      props.vertical ? 'adny-divider--vertical' : null,
      isInset.value ? 'adny-divider--inset' : null,
      props.dashed ? 'adny-divider--dashed' : null
    ]
    return () => {
      return (
        <div
          class={dividerClass}
          class={state.withText ? 'adny-divider--with-text' : null}
          style={style.value}
        >
          {slots.default?.() ? (
            slots.default?.()
          ) : props.description ? (
            <span class="adny-divider__text">{props.description}</span>
          ) : null}
        </div>
      )
    }
  }
})
