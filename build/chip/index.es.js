import { defineComponent, ref, watch, createVNode, nextTick, computed, resolveComponent, openBlock, createBlock, Transition, withCtx, createElementVNode, mergeProps, renderSlot, normalizeClass, createElementBlock, createCommentVNode } from "vue";
const props$1 = {
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
  props: props$1,
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
function pickProps(props2, propsKey) {
  return Array.isArray(propsKey) ? propsKey.reduce((pickedProps, key) => {
    pickedProps[key] = props2[key];
    return pickedProps;
  }, {}) : props2[propsKey];
}
function typeValidator(type) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type);
}
function sizeValidator(size) {
  return ["normal", "mini", "small", "large"].includes(size);
}
const props = {
  type: {
    type: String,
    default: "default",
    validator: typeValidator
  },
  size: {
    type: String,
    default: "normal",
    validator: sizeValidator
  },
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  iconName: pickProps(props$1, "name"),
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: true
  },
  block: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  onClose: {
    type: Function
  }
};
var chip_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  name: "AChip",
  components: {
    AIcon
  },
  inheritAttrs: false,
  props,
  setup(props2) {
    const chipStyles = computed(() => {
      const { plain, textColor, color } = props2;
      if (plain) {
        return {
          color: textColor || color,
          borderColor: color
        };
      }
      return {
        color: textColor,
        background: color
      };
    });
    const contentClass = computed(() => {
      const { size, block, type, plain, round } = props2;
      const blockClass = block ? "adny--flex" : "adny--inline-flex";
      const plainTypeClass = plain ? `adny-chip--plain adny-chip--plain-${type}` : `adny-chip--${type}`;
      const roundClass = round && "adny-chip--round";
      return [`adny-chip--${size}`, blockClass, plainTypeClass, roundClass];
    });
    return {
      chipStyles,
      contentClass
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_icon = resolveComponent("a-icon");
  return openBlock(), createBlock(Transition, { name: "adny-fade" }, {
    default: withCtx(() => [
      createElementVNode("span", mergeProps({
        class: ["adny-chip adny--box", _ctx.contentClass],
        style: _ctx.chipStyles
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "left"),
        createElementVNode("span", {
          class: normalizeClass([`adny-chip--text-${_ctx.size}`])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2),
        renderSlot(_ctx.$slots, "right"),
        _ctx.closable ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "adny-chip--close",
          onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onClose && _ctx.onClose(...args))
        }, [
          createVNode(_component_a_icon, {
            name: `${_ctx.iconName ? _ctx.iconName : "close-circle"}`
          }, null, 8, ["name"])
        ])) : createCommentVNode("v-if", true)
      ], 16)
    ]),
    _: 3
  });
}
var Chip = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
Chip.install = function(app) {
  app.component(Chip.name, Chip);
};
var index = {
  install(app) {
    app.use(Chip);
  }
};
export { Chip, index as default };
