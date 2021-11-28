import { defineComponent, computed, ref, onMounted, watch } from "vue";
import { statisticProps, StatisticProps } from "./statistic-types";
import { analysisValueType } from "./utils/separator";
import { Tween } from "./utils/animation";
import "./statistic.less";

export default defineComponent({
  name: "AStatistic",
  props: statisticProps,
  inheritAttrs: false,
  setup(props: StatisticProps, ctx) {
    const innerValue = ref(props.valueFrom ?? props.value);
    const tween = ref(null);
    const statisticValue = computed(() => {
      return analysisValueType(
        props.value,
        props.groupSeparator,
        props.precision
      );
    });
    console.log(statisticValue.value);
    const animation = (
      from: number = props.valueFrom ?? 0,
      to: number = props.value
    ) => {
      if (from !== to) {
        tween.value = new Tween({
          from: {
            value: from,
          },
          to: {
            value: to,
          },
          duration: props.animationDuration,
          easing: "quartOut",
          onUpdate: (keys: any) => {
            innerValue.value = keys.value;
          },
          onFinish: () => {
            innerValue.value = to;
          },
        });
        tween.value.start();
      }
    };

    const animationFixedNumber = ref(0);
    if (props.animation) {
      animationFixedNumber.value =
        props.value.toString().length - props.value.toString().indexOf(".") - 1;
    }

    const animationValue = computed(() => {
      return innerValue.value.toFixed(animationFixedNumber.value);
    });
    onMounted(() => {
      if (props.animation && props.start) {
        animation();
      }
    });

    watch(
      () => props.start,
      (value) => {
        if (value && !tween.value) {
          animation();
        }
      }
    );
    return () => {
      return (
        <div class="devui-statistic" {...ctx.attrs}>
          <div class="devui-statistic-title" style={props.titleStyle}>
            {props.title}
          </div>
          <div class="devui-statistic-content" style={props.contentStyle}>
            {props.prefix || ctx.slots.prefix?.() ? (
              <span class="devui-statistic-prefix">
                {ctx.slots.prefix?.() || props.prefix}
              </span>
            ) : null}
            <span class="devui-statistic--value">
              {props.animation ? animationValue.value : statisticValue.value}
            </span>
            {props.suffix || ctx.slots.suffix?.() ? (
              <span class="devui-statistic-suffix">
                {ctx.slots.suffix?.() || props.suffix}
              </span>
            ) : null}
          </div>
        </div>
      );
    };
  },
});
