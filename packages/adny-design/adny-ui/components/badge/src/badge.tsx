import { defineComponent, Transition, computed, ref } from "vue";
import type { ComputedRef } from "vue";
import { props } from "./props";
import { toNumber } from "../../../utils/shared";
import { AIcon } from "../../icon";
import "../../../styles/common.less";
import "../styles/badge.less";
export default defineComponent({
  name: "ABadge",
  props,
  components: {
    AIcon,
  },
  inheritAttrs: false,
  setup(props, ctx) {
    const badgeClass = ["adny-badge"];
    const badgeTransition = "adny-badge-fade";
    const hoverTransition = "adny-badge-hover";
    const contentClass: ComputedRef<Array<string | false | undefined>> =
      computed(() => {
        const { type, position, dot, icon } = props;
        const positionBasic =
          ctx.slots.default?.() &&
          `adny-badge__position adny-badge--${position}`;
        const dotClass = dot && "adny-badge__dot";
        const positionClass = getPositionClass();
        const iconClass = icon && "adny-badge__icon";
        return [
          `adny-badge--${type}`,
          positionBasic,
          dotClass,
          positionClass,
          iconClass,
          "adny-badge__content",
        ];
      });
    const values: ComputedRef<string | number> = computed(() => {
      const { dot, value, maxValue } = props;
      if (dot) return "";
      if (
        value !== undefined &&
        maxValue !== undefined &&
        toNumber(value) > maxValue
      ) {
        return `${maxValue}+`;
      }

      return value;
    });

    const getPositionClass = (): string | undefined => {
      const { position, dot } = props;
      if (dot && position.includes("bottom-right"))
        return "adny-badge__dot--right";
      if (dot && position.includes("top-right"))
        return "adny-badge__dot--top-right";
      if (dot && position.includes("bottom-left"))
        return "adny-badge__dot--left";
      if (dot && position.includes("top-left"))
        return "adny-badge__dot--top-left";
    };
    const hoverStatus = ref(false);
    const hoverMove = () => {
      hoverStatus.value = true;
    };
    const hoverLeave = () => {
      hoverStatus.value = false;
    };

    return () => {
      return (
        <div
          class={badgeClass}
          onMousemove={hoverMove}
          onMouseleave={hoverLeave}
        >
          <Transition name={props.hover ? hoverTransition : badgeTransition}>
            {props.hover ? (
              hoverStatus.value ? (
                <span
                  class={contentClass.value}
                  style={{ background: props.color }}
                >
                  {props.icon && !props.dot ? (
                    <a-icon size="12" name={props.icon}></a-icon>
                  ) : (
                    <span>{values.value}</span>
                  )}
                </span>
              ) : null
            ) : props.value > 0 ? (
              <span
                class={contentClass.value}
                style={{ background: props.color }}
              >
                {props.icon && !props.dot ? (
                  <a-icon size="12" name={props.icon}></a-icon>
                ) : (
                  <span>{values.value}</span>
                )}
              </span>
            ) : null}
          </Transition>
          {ctx.slots.default ? ctx.slots.default() : null}
        </div>
      );
    };
  },
});
