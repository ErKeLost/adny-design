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
import { reactive, getCurrentInstance, watch, onBeforeMount, onUnmounted, onActivated, onDeactivated, ref, onMounted, defineComponent, createVNode, nextTick, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot, createTextVNode, toDisplayString, createCommentVNode, computed, resolveComponent, createBlock, Teleport, Transition, withCtx, withDirectives, mergeProps, vShow } from "vue";
function positionValidator$1(position) {
  return ["top", "bottom", "right", "left", "center"].includes(position);
}
const props$2 = {
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
function positionValidator(position) {
  const validPositions = ["left", "center", "right"];
  return validPositions.includes(position);
}
const props = {
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
const _sfc_main$1 = defineComponent({
  name: "AAppBar",
  props
});
const _hoisted_1$1 = { class: "adny-app-bar__left" };
const _hoisted_2 = {
  key: 0,
  class: "adny-app-bar__title"
};
const _hoisted_3 = { class: "adny-app-bar__right" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["adny-app-bar", { "adny-elevation--3": _ctx.elevation }]),
    style: normalizeStyle({
      background: _ctx.color,
      color: _ctx.textColor
    })
  }, [
    createElementVNode("div", _hoisted_1$1, [
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
    _ctx.titlePosition === "center" ? (openBlock(), createElementBlock("div", _hoisted_2, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ])
    ])) : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_3, [
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
var AAppBar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var drawer_vue_vue_type_style_index_0_lang = "";
const _sfc_main = defineComponent({
  name: "ADrawer",
  inheritAttrs: false,
  props: props$2,
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
const _hoisted_1 = {
  key: 0,
  class: "adny-drawer__flex"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
                _ctx.fullScreen ? (openBlock(), createElementBlock("div", _hoisted_1, [
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
var Drawer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
Drawer.install = function(app) {
  app.component(Drawer.name, Drawer);
};
var index = {
  install(app) {
    app.use(Drawer);
  }
};
export { Drawer, index as default };
