import { defineComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle } from "vue";
function fitValidator(fit) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}
const props = {
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator,
    default: "fill"
  },
  alt: {
    type: String
  },
  width: {
    type: [String, Number]
  },
  height: {
    type: [String, Number]
  },
  radius: {
    type: [String, Number],
    default: 0
  },
  loading: {
    type: String
  },
  error: {
    type: String
  },
  lazy: {
    type: Boolean,
    default: false
  },
  ripple: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: true
  },
  onClick: {
    type: Function
  },
  onLoad: {
    type: Function
  },
  onError: {
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
var images_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  name: "AImg",
  props,
  setup(props2) {
    const handleLoad = (e) => {
    };
    const handleError = (e) => {
      const { lazy, onError } = props2;
      !lazy && (onError == null ? void 0 : onError(e));
    };
    return {
      toSizeUnit,
      handleLoad,
      handleError
    };
  }
});
const _hoisted_1 = ["alt", "lazy-error", "lazy-loading"];
const _hoisted_2 = ["alt", "src"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["adny-image adny--box", [!_ctx.block ? "adny--inline-block" : null]]),
    style: normalizeStyle({
      width: _ctx.toSizeUnit(_ctx.width),
      height: _ctx.toSizeUnit(_ctx.height),
      "border-radius": _ctx.toSizeUnit(_ctx.radius)
    })
  }, [
    _ctx.lazy ? (openBlock(), createElementBlock("img", {
      key: 0,
      class: "adny-image__image",
      alt: _ctx.alt,
      "lazy-error": _ctx.error,
      "lazy-loading": _ctx.loading,
      style: normalizeStyle({ objectFit: _ctx.fit }),
      onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.handleLoad && _ctx.handleLoad(...args)),
      onError: _cache[1] || (_cache[1] = (...args) => _ctx.handleError && _ctx.handleError(...args)),
      onClick: _cache[2] || (_cache[2] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    }, null, 44, _hoisted_1)) : (openBlock(), createElementBlock("img", {
      key: 1,
      class: "adny-image__image",
      alt: _ctx.alt,
      style: normalizeStyle({ objectFit: _ctx.fit }),
      src: _ctx.src,
      onLoad: _cache[3] || (_cache[3] = (...args) => _ctx.handleLoad && _ctx.handleLoad(...args)),
      onError: _cache[4] || (_cache[4] = (...args) => _ctx.handleError && _ctx.handleError(...args)),
      onClick: _cache[5] || (_cache[5] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    }, null, 44, _hoisted_2))
  ], 6);
}
var AImage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
AImage.install = function(app) {
  app.component(AImage.name, AImage);
};
var index = {
  title: "AImage \u56FE\u7247",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AImage);
  }
};
export { AImage, index as default };
