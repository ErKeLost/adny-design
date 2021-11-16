import { defineComponent } from "vue";
import "../styles/statistic.less";
import { props } from "./props";

export default defineComponent({
  props,
  inheritAttrs: false,
  name: "AStatistic",
  setup(props, ctx) {
    const statisticClass = ["adny-statistic"];
    const statisticTitleClass = ["adny-statistic-title"];
    const statisticContentClass = ["adny-statistic-content"];
    const statisticValueClass = ["adny-statistic--value"];
    const statisticPrefixClass = ["adny-statistic-prefix"];
    const statisticSuffixClass = ["adny-statistic-suffix"];
    return () => {
      return (
        <div class={statisticClass} {...ctx.attrs}>
          <div class={statisticTitleClass} style={props.titleStyle}>
            {props.title}
          </div>
          <div class={statisticContentClass} style={props.contentStyle}>
            {props.prefix || ctx.slots.prefix?.() ? (
              <span class={statisticPrefixClass}>
                {ctx.slots.prefix?.() || props.prefix}
              </span>
            ) : null}
            <span class={statisticValueClass}>{props.value}</span>
            {props.suffix || ctx.slots.suffix?.() ? (
              <span class={statisticSuffixClass}>
                {ctx.slots.suffix?.() || props.suffix}
              </span>
            ) : null}
          </div>
        </div>
      );
    };
  },
});
