import { defineComponent, ref, watch, createVNode, nextTick } from "vue";
const props = {
  name: {
    type: String
  },
  size: {
    type: [Number, String]
  },
  color: {
    type: String
  },
  namespace: {
    type: String,
    default: "adny-icon"
  },
  transition: {
    type: [Number, String],
    default: 0
  },
  onClick: {
    type: Function
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
const isNumber = (val) => typeof val === "number";
const isURL = (val) => {
  if (!val) {
    return false;
  }
  return /^(http)|(\.*\/)/.test(val);
};
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
var common = "";
var icon = "";
var AIcon = defineComponent({
  name: "AIcon",
  props,
  setup(props2) {
    const name = ref("");
    const shrinking = ref(false);
    const changeIcon = async (newIconName, oldIconName) => {
      const {
        transition
      } = props2;
      if (oldIconName == null || toNumber(transition) === 0) {
        name.value = newIconName;
        return;
      }
      shrinking.value = true;
      await nextTick();
      setTimeout(() => {
        oldIconName != null && (name.value = oldIconName);
        shrinking.value = false;
      }, toNumber(transition));
    };
    watch(() => props2.name, changeIcon, {
      immediate: true
    });
    const iconiStyle = {
      color: props2.color,
      transition: `all ${toNumber(props2.transition)}ms`,
      fontSize: toSizeUnit(props2.size)
    };
    const iconImgStyle = {
      transition: `all ${toNumber(props2.transition)}ms`,
      width: toSizeUnit(props2.size),
      height: toSizeUnit(props2.size)
    };
    return () => {
      return createVNode("div", {
        "style": "display: inline-block"
      }, [isURL(props2.name) ? createVNode("img", {
        "onClick": props2.onClick,
        "src": name.value,
        "style": iconImgStyle,
        "class": iconClass
      }, null) : createVNode("i", {
        "onClick": props2.onClick,
        "style": iconiStyle,
        "class": ["adny-icon", `${props2.namespace}--set`, isURL(props2.name) ? "adny-icon__image" : `${props2.namespace}-${name.value}`, shrinking.value ? "adny-icon--shrinking" : null]
      }, null)]);
    };
  }
});
AIcon.install = function(app) {
  app.component(AIcon.name, AIcon);
};
var index = {
  title: "AIcon \u56FE\u6807",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AIcon);
  }
};
export { AIcon, index as default };
