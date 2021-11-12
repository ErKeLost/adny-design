var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, reactive, computed, onMounted, onUpdated, createVNode } from "vue";
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
const isNumber = (val) => typeof val === "number";
const isRem = (value) => isString(value) && value.endsWith("rem");
const isPx = (value) => isString(value) && value.endsWith("px") || isNumber(value);
const isPercent = (value) => isString(value) && value.endsWith("%");
const isVw = (value) => isString(value) && value.endsWith("vw");
const isVh = (value) => isString(value) && value.endsWith("vh");
const toPxNum = (value) => {
  if (isNumber(value)) {
    return value;
  }
  if (isPx(value)) {
    return +value.replace("px", "");
  }
  if (isVw(value)) {
    return +value.replace("vw", "") * window.innerWidth / 100;
  }
  if (isVh(value)) {
    return +value.replace("vh", "") * window.innerHeight / 100;
  }
  if (isRem(value)) {
    const num = +value.replace("rem", "");
    const rootFontSize = window.getComputedStyle(document.documentElement).fontSize;
    return num * parseFloat(rootFontSize);
  }
  if (isString(value)) {
    return toNumber(value);
  }
  return 0;
};
const toSizeUnit = (value) => {
  if (value == null) {
    return void 0;
  }
  if (isPercent(value) || isVw(value) || isVh(value) || isRem(value)) {
    return value;
  }
  return `${toPxNum(value)}px`;
};
const props = {
  inset: {
    type: [Boolean, Number, String],
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  margin: {
    type: String
  },
  dashed: {
    type: Boolean,
    default: false
  }
};
var common = "";
var divider = "";
var ADivider = defineComponent({
  name: "ADivider",
  props,
  setup(props2, {
    slots
  }) {
    const state = reactive({
      withText: false
    });
    const isInset = computed(() => isBool(props2.inset) ? props2.inset : true);
    const style = computed(() => {
      const {
        inset,
        vertical,
        margin
      } = props2;
      const baseStyle = {
        margin
      };
      if (isBool(inset) || inset === 0)
        return __spreadValues({}, baseStyle);
      const _inset = toNumber(inset);
      const absInsetWithUnit = Math.abs(_inset) + (inset + "").replace(_inset + "", "");
      return vertical ? __spreadProps(__spreadValues({}, baseStyle), {
        height: `calc(80% - ${toSizeUnit(absInsetWithUnit)})`
      }) : __spreadProps(__spreadValues({}, baseStyle), {
        width: `calc(100% - ${toSizeUnit(absInsetWithUnit)})`,
        left: _inset > 0 ? toSizeUnit(absInsetWithUnit) : toSizeUnit(0)
      });
    });
    const checkHasText = () => {
      var _a;
      state.withText = Boolean((_a = slots.default) == null ? void 0 : _a.call(slots).length) || Boolean(props2.description);
    };
    onMounted(() => {
      checkHasText();
    });
    onUpdated(() => {
      checkHasText();
    });
    const dividerClass = ["adny-divider", "adny-box", props2.vertical ? "adny-divider--vertical" : null, isInset.value ? "adny-divider--inset" : null, props2.dashed ? "adny-divider--dashed" : null];
    return () => {
      var _a, _b;
      return createVNode("div", {
        "class": [dividerClass, state.withText ? "adny-divider--with-text" : null],
        "style": style.value
      }, [((_a = slots.default) == null ? void 0 : _a.call(slots)) ? (_b = slots.default) == null ? void 0 : _b.call(slots) : props2.description ? createVNode("span", {
        "class": "adny-divider__text"
      }, [props2.description]) : null]);
    };
  }
});
ADivider.install = function(app) {
  app.component(ADivider.name, ADivider);
};
var index = {
  install(app) {
    app.use(ADivider);
  }
};
export { ADivider, index as default };
