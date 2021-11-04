import { defineComponent } from 'vue'
import { props } from './props'
// import useProps from '../../../compsables/card/useProps'
import '../../../styles/common.less'
import '../../../styles/elevation.less'
import '../styles/card.less'
export default defineComponent({
  name: 'AdnyCard',
  props,
  setup(props, ctx) {
    const cardClass = [
      props.elevation ? `adny-elevation--${props.elevation}` : 'adny-elevation--2',
      'adny-card',
      props.hover ? 'adny-card__hover' : null,
      props.shaped ? 'adny-card__shaped' : null,
      props.disabled ? 'adny-card__disabled' : null
    ]
    let footerPositionClass = ''
    switch (props.footerPosition) {
      case 'left':
        footerPositionClass = 'adny-card__footer'
        break
      case 'center':
        footerPositionClass = 'adny-card__footer-center'
        break
      case 'right':
        footerPositionClass = 'adny-card__footer-right'
        break
      case 'undefined':
        footerPositionClass = 'adny-card__footer'
        break
      case '':
        footerPositionClass = 'adny-card__footer'
        break
    }
    const titleStyle = { display: 'flex', justifyContent: 'space-between' }
    const onClick = (e: MouseEvent) => {
      props.onClick?.(e)
    }

    return () => {
      return (
        <div class={cardClass} onClick={onClick}>
          {ctx.slots.cover ? ctx.slots.cover?.() : null}
          <div style={titleStyle}>
            {ctx.slots.title && props.continue ? (
              <div class="adny-card__title">{ctx.slots.title?.()}</div>
            ) : (
              ctx.slots.title?.()
            )}
            {ctx.slots.extra && props.continue ? (
              <div class="adny-card__extra">{ctx.slots.extra?.()}</div>
            ) : (
              ctx.slots.extra?.()
            )}
          </div>
          {ctx.slots.subtitle && props.continue ? (
            <div class="adny-card__subtitle">{ctx.slots.subtitle?.()}</div>
          ) : (
            ctx.slots.subtitle?.()
          )}
          {ctx.slots.content && props.continue ? (
            <div class="adny-card__content">{ctx.slots.content?.()}</div>
          ) : (
            ctx.slots.content?.()
          )}
          {props.src && ctx.slots.cover === undefined ? (
            <img
              src={props.src}
              style={{ height: props.height + 'px', objectFit: props.fit }}
              alt={props.alt}
            />
          ) : (
            ''
          )}
          {props.title && ctx.slots.title === undefined ? (
            <div class="adny-card__title">{props.title}</div>
          ) : (
            ''
          )}
          {props.subtitle && ctx.slots.subtitle === undefined ? (
            <div class="adny-card__subtitle">{props.subtitle}</div>
          ) : (
            ''
          )}
          {props.content && ctx.slots.content === undefined ? (
            <div class="adny-card__content">{props.content}</div>
          ) : (
            ''
          )}
          {ctx.slots.footer ? (
            <div class={footerPositionClass}>
              <div class>{ctx.slots.footer?.()}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      )
    }
  }
})
