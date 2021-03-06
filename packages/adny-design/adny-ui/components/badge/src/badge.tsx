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
    const hoverTransition = computed(() => {
      if (props.position === "top-right") {
        return "adny-badge-top-right-hover";
      }
      if (props.position === "top-left") {
        return "adny-badge-top-left-hover";
      }
      if (props.position === "bottom-right") {
        return "adny-badge-bottom-right-hover";
      }
      if (props.position === "bottom-left") {
        return "adny-badge-bottom-left-hover";
      }
    });
    const contentClass: ComputedRef<Array<string | false | undefined>> =
      computed(() => {
        const { type, position, dot, icon } = props;
        const positionBasic =
          ctx.slots.default?.() && ` adny-badge--${position}`;
        const positionOverlayBasic =
          ctx.slots.default?.() && ` adny-badge--${position}-overlay`;
        const bordered = props.bordered ? "adny-badge__position" : null;
        const dotClass = dot && "adny-badge__dot";
        const positionClass = getPositionClass();
        const iconClass = icon && "adny-badge__icon";
        const positionReal = !props.overlay
          ? positionBasic
          : positionOverlayBasic;
        return [
          `adny-badge--${type}`,
          positionReal,
          bordered,
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
          <Transition
            name={props.hover ? hoverTransition.value : badgeTransition}
          >
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
