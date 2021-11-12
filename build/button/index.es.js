var __defProp = Object.defineProperty;
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
import { defineComponent, ref, computed, onMounted, resolveDirective, withDirectives, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot } from "vue";
const DEFAULT_PLUGIN_OPTIONS = {
  directive: "ripple",
  color: "currentColor",
  initialOpacity: 0.2,
  finalOpacity: 0.5,
  duration: 0.2,
  easing: "ease-in-out",
  delayTime: 75,
  disabled: false
};
const createContainer = ({
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius
}) => {
  const rippleContainer = document.createElement("div");
  rippleContainer.style.top = "0";
  rippleContainer.style.left = "0";
  rippleContainer.style.width = "100%";
  rippleContainer.style.height = "100%";
  rippleContainer.style.position = "absolute";
  rippleContainer.style.borderRadius = `${borderTopLeftRadius} ${borderTopRightRadius} ${borderBottomRightRadius} ${borderBottomLeftRadius}`;
  rippleContainer.style.overflow = "hidden";
  rippleContainer.style.pointerEvents = "none";
  rippleContainer.style.webkitMaskImage = "-webkit-radial-gradient(white, black)";
  return rippleContainer;
};
const createrippleElement = (x, y, size, options) => {
  const rippleElement = document.createElement("div");
  rippleElement.style.position = "absolute";
  rippleElement.style.width = `${size}px`;
  rippleElement.style.height = `${size}px`;
  rippleElement.style.top = `${y}px`;
  rippleElement.style.left = `${x}px`;
  rippleElement.style.background = options.color;
  rippleElement.style.borderRadius = "50%";
  rippleElement.style.opacity = `${options.initialOpacity}`;
  rippleElement.style.transform = `translate(-50%,-50%) scale(0)`;
  rippleElement.style.transition = `transform ${options.duration}s ${options.easing}, opacity ${options.duration}s ${options.easing}`;
  return rippleElement;
};
function magnitude(x1, y1, x2, y2) {
  const deltaX = x1 - x2;
  const deltaY = y1 - y2;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
function getDistanceToFurthestCorner(x, y, { width, height }) {
  const topLeft = magnitude(x, y, 0, 0);
  const topRight = magnitude(x, y, width, 0);
  const bottomLeft = magnitude(x, y, 0, height);
  const bottomRight = magnitude(x, y, width, height);
  return Math.max(topLeft, topRight, bottomLeft, bottomRight);
}
const getRelativePointer = ({ x, y }, { top, left }) => ({
  x: x - left,
  y: y - top
});
const RIPPLE_COUNT = "vRippleCountInternal";
function incrementRippleCount(el) {
  const count = getRippleCount(el);
  setRippleCount(el, count + 1);
}
function decrementRippleCount(el) {
  const count = getRippleCount(el);
  setRippleCount(el, count - 1);
}
function setRippleCount(el, count) {
  el.dataset[RIPPLE_COUNT] = count.toString();
}
function getRippleCount(el) {
  var _a;
  return parseInt((_a = el.dataset[RIPPLE_COUNT]) != null ? _a : "0", 10);
}
function deleteRippleCount(el) {
  delete el.dataset[RIPPLE_COUNT];
}
const MULTIPLE_NUMBER = 2.05;
const ripple = (event, el, options) => {
  const rect = el.getBoundingClientRect();
  const computedStyles = window.getComputedStyle(el);
  const { x, y } = getRelativePointer(event, rect);
  const size = MULTIPLE_NUMBER * getDistanceToFurthestCorner(x, y, rect);
  const rippleContainer = createContainer(computedStyles);
  const rippleEl = createrippleElement(x, y, size, options);
  incrementRippleCount(el);
  let originalPositionValue = "";
  if (computedStyles.position === "static") {
    if (el.style.position)
      originalPositionValue = el.style.position;
    el.style.position = "relative";
  }
  rippleContainer.appendChild(rippleEl);
  el.appendChild(rippleContainer);
  let shouldDissolveripple = false;
  const releaseripple = (e) => {
    if (typeof e !== "undefined") {
      document.removeEventListener("pointerup", releaseripple);
      document.removeEventListener("pointercancel", releaseripple);
    }
    if (shouldDissolveripple)
      dissolveripple();
    else
      shouldDissolveripple = true;
  };
  const dissolveripple = () => {
    rippleEl.style.transition = "opacity 150ms linear";
    rippleEl.style.opacity = "0";
    setTimeout(() => {
      rippleContainer.remove();
      decrementRippleCount(el);
      if (getRippleCount(el) === 0) {
        deleteRippleCount(el);
        el.style.position = originalPositionValue;
      }
    }, 150);
  };
  document.addEventListener("pointerup", releaseripple);
  document.addEventListener("pointercancel", releaseripple);
  const token = setTimeout(() => {
    document.removeEventListener("pointercancel", cancelripple);
    requestAnimationFrame(() => {
      rippleEl.style.transform = `translate(-50%,-50%) scale(1)`;
      rippleEl.style.opacity = `${options.finalOpacity}`;
      setTimeout(() => releaseripple(), options.duration * 1e3);
    });
  }, options.delayTime);
  const cancelripple = () => {
    clearTimeout(token);
    rippleContainer.remove();
    document.removeEventListener("pointerup", releaseripple);
    document.removeEventListener("pointercancel", releaseripple);
    document.removeEventListener("pointercancel", cancelripple);
  };
  document.addEventListener("pointercancel", cancelripple);
};
const optionMap = new WeakMap();
const globalOptions = __spreadValues({}, DEFAULT_PLUGIN_OPTIONS);
var RippleDirective = {
  mounted(el, binding) {
    var _a;
    optionMap.set(el, (_a = binding.value) != null ? _a : {});
    el.addEventListener("pointerdown", (event) => {
      const options = optionMap.get(el);
      if (binding.value.disabled)
        return;
      if (options === false)
        return;
      ripple(event, el, __spreadValues(__spreadValues({}, globalOptions), options));
    });
  },
  updated(el, binding) {
    var _a;
    optionMap.set(el, (_a = binding.value) != null ? _a : {});
  }
};
var button_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  name: "ABtn",
  directives: {
    ripple: RippleDirective
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "normal"
    },
    color: {
      type: String
    },
    elevation: {
      type: String,
      default: "2"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    depressed: {
      type: Boolean,
      default: false
    },
    fab: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    tite: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const btn = ref(null);
    const textBgColor = computed(() => {
      return {
        backgroundColor: `currentColor`
      };
    });
    onMounted(() => {
    });
    const changeBg = () => {
      btn.value.style.backgroundColor = `${props.color}30`;
    };
    const moveBg = () => {
      btn.value.style.backgroundColor = "";
    };
    return {
      textBgColor,
      btn,
      changeBg,
      moveBg
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createElementBlock("button", {
    ref: "btn",
    id: "btn",
    class: normalizeClass(["adny-button adny--box", [
      `adny-button--${_ctx.size}`,
      _ctx.block ? "adny--flex adny-button--block" : "adny--inline-flex",
      _ctx.disabled ? "adny-button--disabled" : null,
      _ctx.text ? `adny-button--text-${_ctx.type}` : `adny-button--${_ctx.type}`,
      _ctx.text ? "adny-button--text" : `adny-elevation--${_ctx.elevation}`,
      _ctx.text && _ctx.disabled ? "adny-button--text-disabled" : null,
      _ctx.round ? "adny-button--round" : null,
      _ctx.outline ? "adny-button--outline" : null,
      _ctx.depressed ? "adny-button--depressed" : null,
      _ctx.fab && _ctx.size === "large" ? "adny-button--float-large" : null,
      _ctx.fab && _ctx.size === "small" ? "adny-button--float-small" : null,
      _ctx.fab && _ctx.size === "mini" ? "adny-button--float-mini" : null,
      _ctx.fab && _ctx.size === "normal" ? "adny-button--float-normal" : null,
      _ctx.icon ? "adny-button--icon" : null,
      _ctx.tite ? "adny-button--tite" : null,
      _ctx.text ? `adny-button--${_ctx.type}__hover` : null
    ]]),
    onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.changeBg && _ctx.changeBg(...args)),
    onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.moveBg && _ctx.moveBg(...args)),
    style: normalizeStyle({ color: _ctx.color })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 38)), [
    [_directive_ripple, { disabled: _ctx.disabled }]
  ]);
}
var ABtn = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
ABtn.install = function(app) {
  app.component(ABtn.name, ABtn);
};
var index = {
  title: "ABtn \u6309\u94AE",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(ABtn);
  }
};
export { ABtn, index as default };
