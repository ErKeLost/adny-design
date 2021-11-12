import { defineComponent, computed, openBlock, createElementBlock, createElementVNode, mergeProps, normalizeStyle, createCommentVNode, normalizeClass, renderSlot, createTextVNode, toDisplayString } from "vue";
function modeValidator(mode) {
  return ["linear", "circle"].includes(mode);
}
const props = {
  indeterminate: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: "linear",
    validator: modeValidator
  },
  lineWidth: {
    type: [Number, String],
    default: 4
  },
  color: {
    type: String
  },
  trackColor: {
    type: String
  },
  ripple: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String],
    default: 0
  },
  label: {
    type: Boolean,
    default: false
  },
  size: {
    type: Number,
    default: 40
  },
  rotate: {
    type: Number,
    default: 0
  },
  track: {
    type: Boolean,
    default: true
  }
};
const toNumber = (val) => {
  if (val == null)
    return 0;
  if (isString(val)) {
    val = parseFloat(val);
    val = Number.isNaN(val) ? 0 : val;
    return val;
  }
  if (isBool(val))
    return Number(val);
  return val;
};
const isString = (val) => typeof val === "string";
const isBool = (val) => typeof val === "boolean";
var progressLinear_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  name: "AProgressLinear",
  inheritAttrs: false,
  props,
  setup(props2) {
    const indeterminateProps = computed(() => {
      return {
        width: "80%"
      };
    });
    const linearProps = computed(() => {
      const value = toNumber(props2.value);
      const width = value > 100 ? 100 : value;
      const roundValue = value > 100 ? 100 : Math.round(value);
      return {
        width: `${width}%`,
        roundValue: `${roundValue}%`
      };
    });
    const circleProps = computed(() => {
      const { size, lineWidth, value } = props2;
      const viewBox = `0 0 ${size} ${size}`;
      const roundValue = toNumber(value) > 100 ? 100 : Math.round(toNumber(value));
      const radius = (size - toNumber(lineWidth)) / 2;
      const perimeter = 2 * Math.PI * radius;
      const strokeDasharray = `${roundValue / 100 * perimeter}, ${perimeter}`;
      return {
        viewBox,
        radius,
        strokeDasharray,
        perimeter,
        roundValue: `${roundValue}%`
      };
    });
    return {
      linearProps,
      circleProps,
      indeterminateProps
    };
  }
});
const _hoisted_1 = { class: "adny-progress" };
const _hoisted_2 = {
  key: 0,
  class: "adny-progress-linear"
};
const _hoisted_3 = ["viewBox"];
const _hoisted_4 = ["cx", "cy", "r", "stroke-width"];
const _hoisted_5 = ["cx", "cy", "r", "stroke-width"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    _ctx.mode === "linear" ? (openBlock(), createElementBlock("div", _hoisted_2, [
      createElementVNode("div", mergeProps({
        class: "adny-progress-linear__block",
        style: { height: `${_ctx.lineWidth}px` }
      }, _ctx.$attrs), [
        _ctx.track ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "adny-progress-linear__background",
          style: normalizeStyle({ background: _ctx.trackColor })
        }, null, 4)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass([
            `adny-progress-linear__certain${_ctx.ripple ? " adny-progress-linear__ripple" : ""}`,
            _ctx.indeterminate ? "adny-progress-linear__certain-bar-value" : null
          ]),
          style: normalizeStyle({
            background: _ctx.color,
            width: _ctx.indeterminate ? "indeterminateProps.width" : _ctx.linearProps.width && _ctx.linearProps.width
          })
        }, null, 6)
      ], 16),
      _ctx.label ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        class: "adny-progress-linear__label"
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.linearProps.roundValue), 1)
        ])
      ], 16)) : createCommentVNode("v-if", true)
    ])) : createCommentVNode("v-if", true),
    _ctx.mode === "circle" ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "adny-progress-circle",
      style: normalizeStyle({ width: `${_ctx.size}px`, height: `${_ctx.size}px` })
    }, [
      (openBlock(), createElementBlock("svg", {
        class: "adny-progress-circle__svg",
        style: normalizeStyle({ transform: `rotate(${_ctx.rotate - 90}deg)` }),
        viewBox: _ctx.circleProps.viewBox
      }, [
        _ctx.track ? (openBlock(), createElementBlock("circle", {
          key: 0,
          class: "adny-progress-circle__background",
          cx: _ctx.size / 2,
          cy: _ctx.size / 2,
          r: _ctx.circleProps.radius,
          fill: "transparent",
          "stroke-width": _ctx.lineWidth,
          style: normalizeStyle({
            strokeDasharray: _ctx.circleProps.perimeter,
            stroke: _ctx.trackColor
          })
        }, null, 12, _hoisted_4)) : createCommentVNode("v-if", true),
        createElementVNode("circle", {
          class: "adny-progress-circle__certain",
          cx: _ctx.size / 2,
          cy: _ctx.size / 2,
          r: _ctx.circleProps.radius,
          fill: "transparent",
          "stroke-width": _ctx.lineWidth,
          style: normalizeStyle({
            strokeDasharray: _ctx.circleProps.strokeDasharray,
            stroke: _ctx.color
          })
        }, null, 12, _hoisted_5)
      ], 12, _hoisted_3)),
      _ctx.label ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        class: "adny-progress-circle__label"
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.circleProps.roundValue), 1)
        ])
      ], 16)) : createCommentVNode("v-if", true)
    ], 4)) : createCommentVNode("v-if", true)
  ]);
}
var ProgressLinear = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
ProgressLinear.install = function(app) {
  app.component(ProgressLinear.name, ProgressLinear);
};
var index = {
  title: "ProgressLinear \u7EBF\u6027\u8FDB\u5EA6\u6761",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(ProgressLinear);
  }
};
export { ProgressLinear, index as default };
