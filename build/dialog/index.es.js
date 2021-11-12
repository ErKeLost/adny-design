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
import { reactive, getCurrentInstance, watch, onBeforeMount, onUnmounted, onActivated, onDeactivated, ref, onMounted, defineComponent, createVNode, nextTick, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot, createTextVNode, toDisplayString, createCommentVNode, computed, resolveComponent, createBlock, Teleport, Transition, withCtx, withDirectives, mergeProps, vShow, resolveDirective } from "vue";
function positionValidator$1(position) {
  return ["top", "bottom", "right", "left", "center"].includes(position);
}
const props$3 = {
  iconColor: {
    type: String,
    default: ""
  },
  closeIcon: {
    type: String,
    default: ""
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: "center",
    validator: positionValidator$1
  },
  transition: {
    type: String
  },
  overlay: {
    type: Boolean,
    default: true
  },
  overlayClass: {
    type: String
  },
  overlayStyle: {
    type: Object
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  teleport: {
    type: String
  },
  onOpen: {
    type: Function
  },
  onOpened: {
    type: Function
  },
  onClose: {
    type: Function
  },
  onClosed: {
    type: Function
  },
  onClickOverlay: {
    type: Function
  },
  onRouteChange: {
    type: Function
  },
  "onUpdate:show": {
    type: Function
  }
};
const context = {
  locks: {},
  zIndex: 2e3,
  touchmoveForbid: true
};
reactive(context);
var context$1 = reactive(context);
function resolveLock() {
  const lockCounts = Object.keys(context$1.locks).length;
  lockCounts <= 0 ? document.body.classList.remove("var--lock") : document.body.classList.add("var--lock");
}
function addLock(uid) {
  context$1.locks[uid] = 1;
  resolveLock();
}
function releaseLock(uid) {
  delete context$1.locks[uid];
  resolveLock();
}
function useLock(props2, state, use) {
  const { uid } = getCurrentInstance();
  if (use) {
    watch(() => props2[use], (newValue) => {
      if (newValue === false) {
        releaseLock(uid);
      } else if (newValue === true && props2[state] === true) {
        addLock(uid);
      }
    });
  }
  watch(() => props2[state], (newValue) => {
    if (use && props2[use] === false) {
      return;
    }
    if (newValue === true) {
      addLock(uid);
    } else {
      releaseLock(uid);
    }
  });
  onBeforeMount(() => {
    if (use && props2[use] === false) {
      return;
    }
    if (props2[state] === true) {
      addLock(uid);
    }
  });
  onUnmounted(() => {
    if (use && props2[use] === false) {
      return;
    }
    if (props2[state] === true) {
      releaseLock(uid);
    }
  });
  onActivated(() => {
    if (use && props2[use] === false) {
      return;
    }
    if (props2[state] === true) {
      addLock(uid);
    }
  });
  onDeactivated(() => {
    if (use && props2[use] === false) {
      return;
    }
    if (props2[state] === true) {
      releaseLock(uid);
    }
  });
}
function useZIndex(source, count) {
  const zIndex = ref(context$1.zIndex);
  watch(source, (newValue) => {
    if (newValue) {
      context$1.zIndex += count;
      zIndex.value = context$1.zIndex;
    }
  }, { immediate: true });
  return { zIndex };
}
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
const dt = (value, defaultText) => value == null ? defaultText : value;
function pickProps(props2, propsKey) {
  return Array.isArray(propsKey) ? propsKey.reduce((pickedProps, key) => {
    pickedProps[key] = props2[key];
    return pickedProps;
  }, {}) : props2[propsKey];
}
function addRouteListener(cb) {
  onMounted(() => {
    window.addEventListener("hashchange", cb);
    window.addEventListener("popstate", cb);
  });
  onUnmounted(() => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener("popstate", cb);
  });
}
function useTeleport() {
  const disabled = ref(false);
  onActivated(() => {
    disabled.value = false;
  });
  onDeactivated(() => {
    disabled.value = true;
  });
  return {
    disabled
  };
}
const props$2 = {
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
  props: props$2,
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
function positionValidator(position) {
  const validPositions = ["left", "center", "right"];
  return validPositions.includes(position);
}
const props$1 = {
  color: {
    type: String
  },
  textColor: {
    type: String
  },
  title: {
    type: String
  },
  titlePosition: {
    type: String,
    default: "left",
    validator: positionValidator
  },
  elevation: {
    type: Boolean,
    default: true
  }
};
var appBar_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$3 = defineComponent({
  name: "AAppBar",
  props: props$1
});
const _hoisted_1$2 = { class: "adny-app-bar__left" };
const _hoisted_2$1 = {
  key: 0,
  class: "adny-app-bar__title"
};
const _hoisted_3$1 = { class: "adny-app-bar__right" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["adny-app-bar", { "adny-elevation--3": _ctx.elevation }]),
    style: normalizeStyle({
      background: _ctx.color,
      color: _ctx.textColor
    })
  }, [
    createElementVNode("div", _hoisted_1$2, [
      renderSlot(_ctx.$slots, "left"),
      _ctx.titlePosition === "left" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "adny-app-bar__title",
        style: normalizeStyle({ paddingLeft: _ctx.$slots.left ? 0 : void 0 })
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ])
      ], 4)) : createCommentVNode("v-if", true)
    ]),
    _ctx.titlePosition === "center" ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ])
    ])) : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_3$1, [
      _ctx.titlePosition === "right" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "adny-app-bar__title",
        style: normalizeStyle({ paddingRight: _ctx.$slots.right ? 0 : void 0 })
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(_ctx.title), 1)
        ])
      ], 4)) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "right")
    ])
  ], 6);
}
var AAppBar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
var drawer_vue_vue_type_style_index_0_lang = "";
const _sfc_main$2 = defineComponent({
  name: "ADrawer",
  inheritAttrs: false,
  props: props$3,
  components: {
    AIcon,
    AAppBar
  },
  setup(props2) {
    const { zIndex } = useZIndex(() => props2.show, 3);
    const { disabled } = useTeleport();
    const fullScreenClass = computed(() => {
      const Fullclass = props2.fullScreen ? "adny-drawer__fullscreen" : null;
      return Fullclass;
    });
    const hidedrawer = () => {
      var _a;
      const { closeOnClickOverlay, onClickOverlay } = props2;
      onClickOverlay == null ? void 0 : onClickOverlay();
      if (!closeOnClickOverlay) {
        return;
      }
      (_a = props2["onUpdate:show"]) == null ? void 0 : _a.call(props2, false);
    };
    useLock(props2, "show", "lockScroll");
    watch(() => props2.show, (newValue) => {
      const { onOpen, onClose } = props2;
      newValue ? onOpen == null ? void 0 : onOpen() : onClose == null ? void 0 : onClose();
    });
    addRouteListener(() => {
      var _a;
      return (_a = props2.onRouteChange) == null ? void 0 : _a.call(props2);
    });
    return {
      zIndex,
      disabled,
      hidedrawer,
      fullScreenClass
    };
  }
});
const _hoisted_1$1 = {
  key: 0,
  class: "adny-drawer__flex"
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_icon = resolveComponent("a-icon");
  return openBlock(), createBlock(Teleport, {
    to: _ctx.teleport,
    disabled: !_ctx.teleport || _ctx.disabled
  }, [
    createVNode(Transition, {
      name: "adny-fade",
      onAfterEnter: _ctx.onOpened,
      onAfterLeave: _ctx.onClosed
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          class: normalizeClass(["adny--box adny-drawer"]),
          style: normalizeStyle({ zIndex: _ctx.zIndex - 2 })
        }, [
          _ctx.overlay ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["adny-drawer__overlay", [_ctx.overlayClass]]),
            style: normalizeStyle(__spreadValues({
              zIndex: _ctx.zIndex - 1
            }, _ctx.overlayStyle)),
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.hidedrawer && _ctx.hidedrawer(...args))
          }, null, 6)) : createCommentVNode("v-if", true),
          createVNode(Transition, {
            name: _ctx.transition ? _ctx.transition : `adny-drawer-${_ctx.position}`
          }, {
            default: withCtx(() => [
              _ctx.show ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                class: [
                  _ctx.fullScreen ? _ctx.fullScreenClass : "adny-drawer__content",
                  "adny-elevation--3",
                  `adny-drawer--${_ctx.position}`
                ],
                style: { zIndex: _ctx.zIndex }
              }, _ctx.$attrs), [
                _ctx.fullScreen ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
                  createVNode(_component_a_icon, mergeProps(_ctx.$attrs, {
                    class: "adny-drawer__close",
                    name: _ctx.closeIcon ? _ctx.closeIcon : "window-close",
                    color: _ctx.iconColor ? _ctx.iconColor : "black",
                    onClick: _ctx.hidedrawer
                  }), null, 16, ["name", "color", "onClick"]),
                  renderSlot(_ctx.$slots, "default")
                ])) : renderSlot(_ctx.$slots, "default", { key: 1 })
              ], 16)) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["name"])
        ], 4), [
          [vShow, _ctx.show]
        ])
      ]),
      _: 3
    }, 8, ["onAfterEnter", "onAfterLeave"])
  ], 8, ["to", "disabled"]);
}
var ADrawer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
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
const _sfc_main$1 = defineComponent({
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
  setup(props2) {
    const btn = ref(null);
    const textBgColor = computed(() => {
      return {
        backgroundColor: `currentColor`
      };
    });
    onMounted(() => {
    });
    const changeBg = () => {
      btn.value.style.backgroundColor = `${props2.color}30`;
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
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
var ABtn = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
function messageAlignValidator(messageAlign) {
  return ["left", "center", "right"].includes(messageAlign);
}
const props = __spreadValues({
  custom: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  messageAlign: {
    type: String,
    default: "left",
    validator: messageAlignValidator
  },
  confirmButton: {
    type: Boolean,
    default: true
  },
  cancelButton: {
    type: Boolean,
    default: true
  },
  confirmButtonText: {
    type: String
  },
  cancelButtonText: {
    type: String
  },
  confirmButtonTextColor: {
    type: String
  },
  cancelButtonTextColor: {
    type: String
  },
  confirmButtonColor: {
    type: String
  },
  cancelButtonColor: {
    type: String
  },
  onBeforeClose: {
    type: Function
  },
  onConfirm: {
    type: Function
  },
  onCancel: {
    type: Function
  },
  "onUpdate:show": {
    type: Function
  }
}, pickProps(props$3, [
  "overlay",
  "overlayClass",
  "overlayStyle",
  "lockScroll",
  "closeOnClickOverlay",
  "teleport",
  "onOpen",
  "onClose",
  "onOpened",
  "onClosed",
  "onClickOverlay",
  "onRouteChange"
]));
var dialog_vue_vue_type_style_index_0_lang = "";
const _sfc_main = defineComponent({
  name: "ADialog",
  components: {
    ABtn,
    ADrawer
  },
  inheritAttrs: false,
  props,
  setup(props2) {
    const popupShow = ref(false);
    const popupCloseOnClickOverlay = ref(false);
    const done = () => {
      var _a;
      return (_a = props2["onUpdate:show"]) == null ? void 0 : _a.call(props2, false);
    };
    const handleClickOverlay = () => {
      var _a;
      const { closeOnClickOverlay, onClickOverlay, onBeforeClose } = props2;
      onClickOverlay == null ? void 0 : onClickOverlay();
      if (!closeOnClickOverlay) {
        return;
      }
      if (onBeforeClose != null) {
        onBeforeClose("close", done);
        return;
      }
      (_a = props2["onUpdate:show"]) == null ? void 0 : _a.call(props2, false);
    };
    const confirm = () => {
      var _a;
      const { onBeforeClose, onConfirm } = props2;
      onConfirm == null ? void 0 : onConfirm();
      if (onBeforeClose != null) {
        onBeforeClose("confirm", done);
        return;
      }
      (_a = props2["onUpdate:show"]) == null ? void 0 : _a.call(props2, false);
    };
    const cancel = () => {
      var _a;
      const { onBeforeClose, onCancel } = props2;
      onCancel == null ? void 0 : onCancel();
      if (onBeforeClose != null) {
        onBeforeClose("cancel", done);
        return;
      }
      (_a = props2["onUpdate:show"]) == null ? void 0 : _a.call(props2, false);
    };
    watch(() => props2.show, (newValue) => {
      popupShow.value = newValue;
    }, { immediate: true });
    watch(() => props2.closeOnClickOverlay, (newValue) => {
      if (props2.onBeforeClose != null) {
        popupCloseOnClickOverlay.value = false;
        return;
      }
      popupCloseOnClickOverlay.value = newValue;
    }, { immediate: true });
    return {
      dt,
      popupShow,
      popupCloseOnClickOverlay,
      handleClickOverlay,
      confirm,
      cancel
    };
  }
});
const _hoisted_1 = { class: "var-dialog__title" };
const _hoisted_2 = { class: "var-dialog__actions" };
const _hoisted_3 = /* @__PURE__ */ createTextVNode("\u53D6\u6D88");
const _hoisted_4 = /* @__PURE__ */ createTextVNode("\u786E\u5B9A");
const _hoisted_5 = {
  key: 1,
  class: "var--box var-dialog"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_btn = resolveComponent("a-btn");
  const _component_a_drawer = resolveComponent("a-drawer");
  return openBlock(), createBlock(_component_a_drawer, {
    class: "var-dialog__popup-radius",
    "var-dialog-cover": "",
    show: _ctx.popupShow,
    overlay: _ctx.overlay,
    "overlay-class": _ctx.overlayClass,
    "overlay-style": _ctx.overlayStyle,
    "lock-scroll": _ctx.lockScroll,
    "close-on-click-overlay": _ctx.popupCloseOnClickOverlay,
    teleport: _ctx.teleport,
    onOpen: _ctx.onOpen,
    onClose: _ctx.onClose,
    onClosed: _ctx.onClosed,
    onOpened: _ctx.onOpened,
    onRouteChange: _ctx.onRouteChange,
    onClickOverlay: _ctx.handleClickOverlay
  }, {
    default: withCtx(() => [
      !_ctx.custom ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        class: "var--box var-dialog"
      }, _ctx.$attrs), [
        createElementVNode("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ])
        ]),
        createElementVNode("div", {
          class: "var-dialog__message",
          style: normalizeStyle({ textAlign: _ctx.messageAlign })
        }, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.message), 1)
          ])
        ], 4),
        createElementVNode("div", _hoisted_2, [
          _ctx.cancelButton ? (openBlock(), createBlock(_component_a_btn, {
            key: 0,
            class: "var-dialog__button var-dialog__cancel-button",
            "var-dialog-cover": "",
            hover: "",
            text: "",
            "text-color": _ctx.cancelButtonTextColor,
            color: _ctx.cancelButtonColor,
            onClick: _ctx.cancel
          }, {
            default: withCtx(() => [
              _hoisted_3
            ]),
            _: 1
          }, 8, ["text-color", "color", "onClick"])) : createCommentVNode("v-if", true),
          _ctx.confirmButton ? (openBlock(), createBlock(_component_a_btn, {
            key: 1,
            class: "var-dialog__button var-dialog__confirm-button",
            "var-dialog-cover": "",
            text: "",
            "text-color": _ctx.confirmButtonTextColor,
            color: _ctx.confirmButtonColor,
            onClick: _ctx.confirm
          }, {
            default: withCtx(() => [
              _hoisted_4
            ]),
            _: 1
          }, 8, ["text-color", "color", "onClick"])) : createCommentVNode("v-if", true)
        ])
      ], 16)) : (openBlock(), createElementBlock("div", _hoisted_5, [
        renderSlot(_ctx.$slots, "default")
      ]))
    ]),
    _: 3
  }, 8, ["show", "overlay", "overlay-class", "overlay-style", "lock-scroll", "close-on-click-overlay", "teleport", "onOpen", "onClose", "onClosed", "onOpened", "onRouteChange", "onClickOverlay"]);
}
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
console.log(Dialog.name);
Dialog.install = function(app) {
  app.component(Dialog.name, Dialog);
};
var index = {
  install(app) {
    app.use(Dialog);
  }
};
export { Dialog, index as default };
