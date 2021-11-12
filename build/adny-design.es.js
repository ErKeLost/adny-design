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
import { defineComponent, ref, computed, onMounted, resolveDirective, withDirectives, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, createVNode, createBlock, Transition, withCtx, createElementVNode, toDisplayString, createCommentVNode, getCurrentInstance, inject, resolveComponent, nextTick, watch, provide, Fragment, onUnmounted, vShow, render, mergeProps, createTextVNode, onActivated, onDeactivated, reactive, onBeforeMount, Teleport, onUpdated } from "vue";
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
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$i = defineComponent({
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
function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
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
var ABtn = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i]]);
ABtn.install = function(app) {
  app.component(ABtn.name, ABtn);
};
var ButtonInstall = {
  title: "ABtn \u6309\u94AE",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(ABtn);
  }
};
function fitValidator$1(fit) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}
const props$e = {
  radius: {
    type: Boolean,
    default: true
  },
  footerPosition: {
    type: String,
    default: "left"
  },
  hover: {
    type: Boolean,
    default: false
  },
  shaped: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  continue: {
    type: Boolean,
    default: false
  },
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator$1,
    default: "cover"
  },
  height: {
    type: [String, Number]
  },
  alt: {
    type: String
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  content: {
    type: String
  },
  elevation: {
    type: [Number, String]
  },
  onClick: {
    type: Function
  }
};
var common = "";
var elevation = "";
var card = "";
var ACard = defineComponent({
  name: "ACard",
  props: props$e,
  setup(props2, ctx) {
    const cardClass = [props2.elevation ? `adny-elevation--${props2.elevation}` : "adny-elevation--2", "adny-card", !props2.radius ? "" : "adny-card__radius", props2.hover ? "adny-card__hover" : null, props2.shaped ? "adny-card__shaped" : null, props2.disabled ? "adny-card__disabled" : null];
    let footerPositionClass = "";
    switch (props2.footerPosition) {
      case "left":
        footerPositionClass = "adny-card__footer";
        break;
      case "center":
        footerPositionClass = "adny-card__footer-center";
        break;
      case "right":
        footerPositionClass = "adny-card__footer-right";
        break;
      case "undefined":
        footerPositionClass = "adny-card__footer";
        break;
      case "":
        footerPositionClass = "adny-card__footer";
        break;
    }
    const titleStyle = {
      display: "flex",
      justifyContent: "space-between"
    };
    const onClick = (e) => {
      var _a;
      (_a = props2.onClick) == null ? void 0 : _a.call(props2, e);
    };
    return () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
      return createVNode("div", {
        "class": cardClass,
        "onClick": onClick
      }, [ctx.slots.cover ? (_b = (_a = ctx.slots).cover) == null ? void 0 : _b.call(_a) : null, createVNode("div", {
        "style": titleStyle
      }, [ctx.slots.title && props2.continue ? createVNode("div", {
        "class": "adny-card__title"
      }, [(_d = (_c = ctx.slots).title) == null ? void 0 : _d.call(_c)]) : (_f = (_e = ctx.slots).title) == null ? void 0 : _f.call(_e), ctx.slots.extra && props2.continue ? createVNode("div", {
        "class": "adny-card__extra"
      }, [(_h = (_g = ctx.slots).extra) == null ? void 0 : _h.call(_g)]) : (_j = (_i = ctx.slots).extra) == null ? void 0 : _j.call(_i)]), ctx.slots.subtitle && props2.continue ? createVNode("div", {
        "class": "adny-card__subtitle"
      }, [(_l = (_k = ctx.slots).subtitle) == null ? void 0 : _l.call(_k)]) : (_n = (_m = ctx.slots).subtitle) == null ? void 0 : _n.call(_m), ctx.slots.content && props2.continue ? createVNode("div", {
        "class": "adny-card__content"
      }, [(_p = (_o = ctx.slots).content) == null ? void 0 : _p.call(_o)]) : (_r = (_q = ctx.slots).content) == null ? void 0 : _r.call(_q), props2.src && ctx.slots.cover === void 0 ? createVNode("img", {
        "src": props2.src,
        "style": {
          height: props2.height + "px",
          objectFit: props2.fit
        },
        "alt": props2.alt
      }, null) : "", props2.title && ctx.slots.title === void 0 ? createVNode("div", {
        "class": "adny-card__title"
      }, [props2.title]) : "", props2.subtitle && ctx.slots.subtitle === void 0 ? createVNode("div", {
        "class": "adny-card__subtitle"
      }, [props2.subtitle]) : "", props2.content && ctx.slots.content === void 0 ? createVNode("div", {
        "class": "adny-card__content"
      }, [props2.content]) : "", ctx.slots.footer ? createVNode("div", {
        "class": footerPositionClass
      }, [createVNode("div", {
        "class": true
      }, [(_t = (_s = ctx.slots).footer) == null ? void 0 : _t.call(_s)])]) : ""]);
    };
  }
});
ACard.install = function(app) {
  app.component(ACard.name, ACard);
};
var CardInstall = {
  title: "ACard \u5361\u7247",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(ACard);
  }
};
const props$d = {
  errorMessage: {
    type: String,
    default: ""
  },
  maxlengthText: {
    type: String,
    default: ""
  }
};
var FormDetails_vue_vue_type_style_index_0_lang = "";
const _sfc_main$h = defineComponent({
  name: "AFormDetail",
  props: props$d
});
const _hoisted_1$8 = {
  key: 0,
  class: "var-form-details"
};
const _hoisted_2$6 = { class: "var-form-details__message" };
const _hoisted_3$5 = { class: "var-form-details__length" };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "var-form-details" }, {
    default: withCtx(() => [
      _ctx.errorMessage || _ctx.maxlengthText ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
        createElementVNode("div", _hoisted_2$6, toDisplayString(_ctx.errorMessage), 1),
        createElementVNode("div", _hoisted_3$5, toDisplayString(_ctx.maxlengthText), 1)
      ])) : createCommentVNode("v-if", true)
    ]),
    _: 1
  });
}
var AdnyFormDetail = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
AdnyFormDetail.install = function(app) {
  app.component(AdnyFormDetail.name, AdnyFormDetail);
};
var AdnyFormDetailInstall = {
  title: "AdnyFormDetail \u6821\u9A8C\u8868\u5355",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AdnyFormDetail);
  }
};
function typeValidator$1(type4) {
  return ["text", "password", "number"].includes(type4);
}
const props$c = {
  modelValue: {
    type: String
  },
  success: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  prop: {
    type: String
  },
  type: {
    type: String,
    default: "text",
    validator: typeValidator$1
  },
  textarea: {
    type: Boolean,
    default: false
  },
  rows: {
    type: [String, Number],
    default: 8
  },
  placeholder: {
    type: String
  },
  line: {
    type: Boolean,
    default: true
  },
  hint: {
    type: Boolean,
    default: true
  },
  textColor: {
    type: String
  },
  focusColor: {
    type: String
  },
  blurColor: {
    type: String
  },
  maxlength: {
    type: [String, Number]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  resize: {
    type: Boolean,
    default: false
  },
  validateTrigger: {
    type: Array,
    default: () => ["onInput", "onClear"]
  },
  rules: {
    type: Array
  },
  onFocus: {
    type: Function
  },
  onBlur: {
    type: Function
  },
  onClick: {
    type: Function
  },
  onClear: {
    type: Function
  },
  onInput: {
    type: Function
  },
  onChange: {
    type: Function
  },
  "onUpdate:modelValue": {
    type: Function
  }
};
const isEmpty = (val) => {
  return val === void 0 || val === null || val === "" || Array.isArray(val) && !val.length;
};
const isArray = (val) => Array.isArray(val);
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance2 = new Constructor();
      if (Class2)
        _setPrototypeOf(instance2, Class2.prototype);
      return instance2;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var formatRegExp = /%[sdj%]/g;
var warning = function warning2() {
};
if (typeof process !== "undefined" && process.env && false) {
  warning = function warning3(type4, errors) {
    if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
      if (errors.every(function(e) {
        return typeof e === "string";
      })) {
        console.warn(type4, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  var fields = {};
  errors.forEach(function(error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var i = 0;
  var len = args.length;
  if (typeof template === "function") {
    return template.apply(null, args);
  }
  if (typeof template === "string") {
    var str = template.replace(formatRegExp, function(x) {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    return str;
  }
  return template;
}
function isNativeStringType(type4) {
  return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
}
function isEmptyValue(value, type4) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type4 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type4) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors || []);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function(a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index2 = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index2;
    index2 = index2 + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function(k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}
var AsyncValidationError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose(AsyncValidationError2, _Error);
  function AsyncValidationError2(errors, fields) {
    var _this;
    _this = _Error.call(this, "Async Validation Error") || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }
  return AsyncValidationError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending["catch"](function(e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function(resolve, reject) {
    var next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }
    objArrKeys.forEach(function(key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function(e) {
    return e;
  });
  return pending;
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
  var v = value;
  for (var i = 0; i < path.length; i++) {
    if (v == void 0) {
      return v;
    }
    v = v[path[i]];
  }
  return v;
}
function complementError(rule, source) {
  return function(oe) {
    var fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if (typeof value === "object" && typeof target[s] === "object") {
          target[s] = _extends({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
var required$1 = function required(rule, value, source, errors, options, type4) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
var whitespace = function whitespace2(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
var pattern$2 = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i"),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  object: function object(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email(value) {
    return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === "string" && value.length <= 2048 && !!value.match(pattern$2.url);
  },
  hex: function hex(value) {
    return typeof value === "string" && !!value.match(pattern$2.hex);
  }
};
var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === void 0) {
    required$1(rule, value, source, errors, options);
    return;
  }
  var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};
var range = function range2(rule, value, source, errors, options) {
  var len = typeof rule.len === "number";
  var min = typeof rule.min === "number";
  var max = typeof rule.max === "number";
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === "number";
  var str = typeof value === "string";
  var arr = Array.isArray(value);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};
var ENUM$1 = "enum";
var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
  }
};
var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};
var rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  "enum": enumerable$1,
  pattern: pattern$1
};
var string = function string2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
};
var method2 = function method3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var number2 = function number3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var _boolean = function _boolean2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var regexp2 = function regexp3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var integer2 = function integer3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var floatFn = function floatFn2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var array2 = function array3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if ((value === void 0 || value === null) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "array");
    if (value !== void 0 && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var object2 = function object3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var ENUM = "enum";
var enumerable2 = function enumerable3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var pattern2 = function pattern3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var date2 = function date3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "date") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "date")) {
      var dateObject;
      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
};
var required2 = function required3(rule, value, callback, source, options) {
  var errors = [];
  var type4 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source, errors, options, type4);
  callback(errors);
};
var type2 = function type3(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var any = function any2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
};
var validators = {
  string,
  method: method2,
  number: number2,
  "boolean": _boolean,
  regexp: regexp2,
  integer: integer2,
  "float": floatFn,
  array: array2,
  object: object2,
  "enum": enumerable2,
  pattern: pattern2,
  date: date2,
  url: type2,
  hex: type2,
  email: type2,
  required: required2,
  any
};
function newMessages() {
  return {
    "default": "Validation error on field %s",
    required: "%s is required",
    "enum": "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      "boolean": "%s is not a %s",
      integer: "%s is not an %s",
      "float": "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();
var Schema = /* @__PURE__ */ function() {
  function Schema2(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  var _proto = Schema2.prototype;
  _proto.define = function define(rules2) {
    var _this = this;
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    Object.keys(rules2).forEach(function(name) {
      var item = rules2[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };
  _proto.messages = function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  };
  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }
      return Promise.resolve(source);
    }
    function complete(results) {
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function(z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function(r) {
        var rule = r;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = _extends({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        }
        rule.validator = _this2.getValidationMethod(rule);
        if (!rule.validator) {
          return;
        }
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function(data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullField(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errorList = Array.isArray(e) ? e : [e];
        if (!options.suppressWarning && errorList.length) {
          Schema2.warning("async-validator:", errorList);
        }
        if (errorList.length && rule.message !== void 0) {
          errorList = [].concat(rule.message);
        }
        var filledErrors = errorList.map(complementError(rule, source));
        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }
        if (!deep) {
          doIt(filledErrors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message !== void 0) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }
            return doIt(filledErrors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            Object.keys(data.value).map(function(key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }
          fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function(field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema2(paredFieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function(errs) {
            var finalErrors = [];
            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function() {
          return cb();
        }, function(e) {
          return cb(e);
        });
      }
    }, function(results) {
      complete(results);
    }, source);
  };
  _proto.getType = function getType(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  };
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || void 0;
  };
  return Schema2;
}();
Schema.register = function register(type4, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type4] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;
function useValidate() {
  const errorMessage = ref("");
  const validate = async (rules2, value) => {
    if (!isArray(rules2) || !rules2.length) {
      return true;
    }
    const descriptor = {
      inputValidator: rules2
    };
    const data = {
      inputValidator: value
    };
    const validator = new Schema(descriptor);
    validator.validate(data).then(() => {
      errorMessage.value = "";
    }, ({ err, fields }) => {
      errorMessage.value = fields.inputValidator[0].message || null;
    });
  };
  const validateOfTrigger = async (validateTrigger, trigger, rules2, value) => {
    if (validateTrigger.includes(trigger)) {
      await validate(rules2, value) && (errorMessage.value = "");
    }
  };
  const resetValidation = () => {
    errorMessage.value = "";
  };
  return { validate, errorMessage, validateOfTrigger, resetValidation };
}
var input = "";
var AIput = defineComponent({
  name: "AInput",
  props: props$c,
  components: {
    AdnyFormDetail
  },
  setup(props2, {
    emit,
    slots
  }) {
    const inputInstance = getCurrentInstance();
    const injectFormItem = inject("name", ref({}));
    const {
      resetValidation,
      validateOfTrigger,
      errorMessage
    } = useValidate();
    const validateWithTrigger = (trigger) => {
      nextTick(() => {
        const {
          validateTrigger,
          rules: rules2,
          modelValue
        } = props2;
        validateOfTrigger(validateTrigger, trigger, rules2, modelValue);
      });
    };
    const isInputValue = ref(false);
    const isFocus = ref(false);
    const maxlengthText = computed(() => {
      const {
        maxlength,
        modelValue
      } = props2;
      if (!maxlength) {
        return "";
      }
      if (isEmpty(modelValue)) {
        return `0 / ${maxlength}`;
      }
      return `${String(modelValue).length}/${maxlength}`;
    });
    const handleClick = (event) => {
      const {
        disabled,
        onClick
      } = props2;
      if (disabled)
        return;
      onClick == null ? void 0 : onClick(event);
    };
    const handleFocus = (e) => {
      var _a;
      isFocus.value = true;
      (_a = props2.onFocus) == null ? void 0 : _a.call(props2, e);
      validateWithTrigger("onFocus");
    };
    const handleBlur = (e) => {
      var _a;
      isFocus.value = false;
      (_a = props2.onBlur) == null ? void 0 : _a.call(props2, e);
      validateWithTrigger("onBlur");
    };
    const handleInput = (e) => {
      var _a, _b, _c, _d;
      const {
        value
      } = e.target;
      if (!isEmpty(value)) {
        isInputValue.value = true;
      }
      (_a = props2["onUpdate:modelValue"]) == null ? void 0 : _a.call(props2, value);
      (_b = props2.onInput) == null ? void 0 : _b.call(props2, value, e);
      validateWithTrigger("onInput");
      (_d = (_c = inputInstance == null ? void 0 : inputInstance.parent) == null ? void 0 : _c.exposed) == null ? void 0 : _d.validator();
    };
    const handleInputChange = (e) => {
      var _a;
      const {
        value
      } = e.target;
      (_a = props2.onChange) == null ? void 0 : _a.call(props2, value, e);
      validateWithTrigger("onChange");
    };
    return () => {
      return createVNode("div", {
        "class": ["adny-input", "adny--box", props2.error ? "adny-input--error" : null, props2.success ? "adny-input--success" : null, props2.disabled ? `adny-input--disabled` : null],
        "onClick": handleClick
      }, [createVNode("div", {
        "style": {
          color: props2.error || errorMessage.value ? isFocus.value ? props2.focusColor : props2.blurColor : null
        },
        "class": ["adny-input__controller", isFocus.value ? "adny-input--focus" : null, props2.error || errorMessage.value ? "adny-input--error" : null, props2.success && !errorMessage.value ? "adny-input--success" : null]
      }, [createVNode("div", {
        "class": ["adny-input__wrap", !props2.hint ? "adny-input--non-hint" : null]
      }, [props2.type === "password" ? createVNode("input", {
        "type": props2.type,
        "class": "adny-input__autocomplate"
      }, null) : null, props2.textarea ? createVNode("textarea", {
        "onFocus": handleFocus,
        "onBlur": handleBlur,
        "autocomplete": "new-password",
        "onInput": handleInput,
        "onChange": handleInputChange,
        "value": props2.modelValue,
        "maxlength": props2.maxlength,
        "disabled": props2.disabled || props2.readonly,
        "rows": props2.rows,
        "class": ["adny-input__input", props2.textarea ? "adny-input--textarea" : null, props2.disabled ? "adny-input--disabled" : null, props2.error || errorMessage.value ? "adny-input--caret-error" : null, props2.success && !errorMessage.value ? "adny-input--caret-success" : null],
        "style": {
          color: props2.textColor,
          caretColor: !props2.error || errorMessage.value ? props2.focusColor : null,
          resize: props2.resize ? "vertical" : "none"
        }
      }, null) : createVNode("input", {
        "onFocus": handleFocus,
        "onBlur": handleBlur,
        "onInput": handleInput,
        "onChange": handleInputChange,
        "value": props2.modelValue,
        "id": injectFormItem,
        "name": injectFormItem,
        "maxlength": props2.maxlength,
        "disabled": props2.disabled || props2.readonly,
        "type": props2.type,
        "class": ["adny-input__input", props2.textarea ? "adny-input--textarea" : null, props2.disabled ? "adny-input--disabled" : null, props2.error ? "adny-input--caret-error" : null, props2.success && !errorMessage.value ? "adny-input--caret-success" : null],
        "style": {
          color: props2.textColor,
          caretColor: !props2.error ? props2.focusColor : null,
          resize: props2.resize ? "vertical" : "none"
        }
      }, null), createVNode("label", {
        "style": {
          color: props2.focusColor
        },
        "class": [props2.textarea ? "adny-input__textarea-placeholder" : "adny-input__placeholder", !props2.hint && (!isEmpty(props2.modelValue) || isInputValue.value === true) ? "adny-input--placeholder-hidden" : null, props2.hint && (!isEmpty(props2.modelValue) || isFocus.value) ? "adny-input--placeholder-hint" : null, !props2.hint ? "adny-input--placeholder-non-hint" : null]
      }, [props2.placeholder])])]), props2.line ? createVNode("div", {
        "style": {
          background: !errorMessage.value ? props2.blurColor : null
        },
        "class": ["adny-input__line", props2.disabled ? "adny-input--line-disabled" : null, errorMessage.value || props2.error ? "var-input--line-error" : null, props2.success && !errorMessage.value ? "adny-input--line-success" : null]
      }, [createVNode("div", {
        "class": ["adny-input__dot", isFocus.value ? "adny-input--spread" : null, props2.disabled ? "adny-input--line-disabled" : null, props2.error || errorMessage.value ? "adny-input--line-error" : null, props2.success && !errorMessage.value ? "adny-input--line-success" : null],
        "style": {
          background: errorMessage.value ? props2.focusColor : null
        }
      }, null)]) : null, props2.rules ? createVNode(resolveComponent("adny-form-detail"), {
        "error-message": errorMessage.value,
        "maxlength-text": maxlengthText.value
      }, null) : null]);
    };
  }
});
AIput.install = function(app) {
  app.component(AIput.name, AIput);
};
var IputInstall = {
  title: "AIput \u8F93\u5165\u6846",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AIput);
  }
};
const props$b = {
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
const dt = (value, defaultText) => value == null ? defaultText : value;
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
var icon = "";
var AIcon = defineComponent({
  name: "AIcon",
  props: props$b,
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
var IconInstall = {
  title: "AIcon \u56FE\u6807",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AIcon);
  }
};
const props$a = {
  model: {
    type: Object,
    required: true
  },
  rules: {
    type: Object
  }
};
var AForm = defineComponent({
  name: "AForm",
  props: props$a,
  setup(props2, ctx) {
    useValidate();
    const formInstance = getCurrentInstance();
    provide("formInstance", props2);
    const validate = (callback) => {
      const result = formInstance == null ? void 0 : formInstance.subTree.children[0].children;
      const a = result.filter((item) => {
        var _a;
        return (_a = item == null ? void 0 : item.props) == null ? void 0 : _a.prop;
      });
      const res = a.map((item) => item.component.exposed.validator());
      return Promise.all(res).then(() => callback(true)).catch(() => callback(false));
    };
    ctx.expose({
      validate
    });
    return () => {
      return createVNode("div", null, [ctx.slots.default ? ctx.slots.default() : null]);
    };
  }
});
const props$9 = {
  label: {
    type: String
  },
  prop: {
    type: String
  }
};
var AFormItem = defineComponent({
  name: "AFormItem",
  props: props$9,
  components: {
    AdnyFormDetail
  },
  setup(props2, ctx) {
    const errorMessage = ref("");
    const formInstance = inject("formInstance");
    provide("name", props2.prop);
    const validator = () => {
      const value = formInstance.model[props2.prop];
      const rule = formInstance.rules[props2.prop];
      const schema = new Schema({
        [props2.prop]: rule
      });
      return schema.validate({
        [props2.prop]: value
      }, (err, item) => {
        if (err) {
          errorMessage.value = err[0].message;
        } else {
          errorMessage.value = "";
        }
      });
    };
    ctx.expose({
      validator
    });
    return () => {
      return createVNode(Fragment, null, [ctx.slots.default ? ctx.slots.default() : null, createVNode(resolveComponent("adny-form-detail"), {
        "error-message": errorMessage.value
      }, null)]);
    };
  }
});
AForm.install = function(app) {
  app.component(AForm.name, AForm);
};
AFormItem.install = function(app) {
  app.component(AFormItem.name, AFormItem);
};
var FormInstall = {
  title: "AForm \u8868\u5355",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AForm);
    app.use(AFormItem);
  }
};
function fitValidator(fit) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}
const props$8 = {
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
var images_vue_vue_type_style_index_0_lang = "";
const _sfc_main$g = defineComponent({
  name: "AImg",
  props: props$8,
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
const _hoisted_1$7 = ["alt", "lazy-error", "lazy-loading"];
const _hoisted_2$5 = ["alt", "src"];
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
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
    }, null, 44, _hoisted_1$7)) : (openBlock(), createElementBlock("img", {
      key: 1,
      class: "adny-image__image",
      alt: _ctx.alt,
      style: normalizeStyle({ objectFit: _ctx.fit }),
      src: _ctx.src,
      onLoad: _cache[3] || (_cache[3] = (...args) => _ctx.handleLoad && _ctx.handleLoad(...args)),
      onError: _cache[4] || (_cache[4] = (...args) => _ctx.handleError && _ctx.handleError(...args)),
      onClick: _cache[5] || (_cache[5] = (...args) => _ctx.onClick && _ctx.onClick(...args))
    }, null, 44, _hoisted_2$5))
  ], 6);
}
var AImage = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g]]);
AImage.install = function(app) {
  app.component(AImage.name, AImage);
};
var ImageInstall = {
  title: "AImage \u56FE\u7247",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AImage);
  }
};
var message_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$f = defineComponent({
  name: "AMesssage",
  components: {
    AIcon: IconInstall
  },
  props: {
    showClose: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String
    },
    icon: {
      type: String
    },
    type: {
      type: String,
      default: "default"
    },
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 3500
    },
    onClose: {
      type: Function
    },
    offset: {
      type: Number,
      default: 20
    },
    id: {
      type: String
    }
  },
  emits: ["destory"],
  setup(props2, { emit }) {
    const visible = ref(false);
    let timer = null;
    const startTime = () => {
      timer = setTimeout(() => {
        close2();
      }, props2.duration);
    };
    function close2() {
      visible.value = false;
    }
    onMounted(() => {
      startTime();
      visible.value = true;
    });
    onUnmounted(() => {
      clearTimeout(timer);
    });
    const iconName = computed(() => {
      switch (props2.type) {
        case "success":
          return "check-circle-outline";
        case "info":
          return "information-outline";
        case "danger":
          return "alert-triangle";
        case "warning":
          return "warning";
      }
    });
    return {
      visible,
      iconName,
      close: close2
    };
  }
});
const _hoisted_1$6 = ["id"];
const _hoisted_2$4 = { class: "adny-message--flex" };
const _hoisted_3$4 = { style: { "display": "flex" } };
const _hoisted_4$3 = { style: { "margin": "0 15px" } };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_icon = resolveComponent("a-icon");
  return openBlock(), createBlock(Transition, {
    name: "message",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("destory"))
  }, {
    default: withCtx(() => {
      var _a;
      return [
        withDirectives(createElementVNode("div", {
          class: normalizeClass(["adny-message adny-elevation--2", [
            _ctx.type ? `adny-message__${_ctx.type}` : null
          ]]),
          id: _ctx.id,
          style: normalizeStyle({ top: `${_ctx.offset}px`, backgroundColor: _ctx.backgroundColor })
        }, [
          createElementVNode("div", _hoisted_2$4, [
            createElementVNode("div", _hoisted_3$4, [
              createVNode(_component_a_icon, {
                name: (_a = _ctx.icon) != null ? _a : _ctx.iconName
              }, null, 8, ["name"]),
              createElementVNode("p", _hoisted_4$3, toDisplayString(_ctx.message), 1)
            ]),
            _ctx.showClose ? (openBlock(), createBlock(_component_a_icon, {
              key: 0,
              onClick: _ctx.close,
              name: "window-close"
            }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
          ])
        ], 14, _hoisted_1$6), [
          [vShow, _ctx.visible]
        ])
      ];
    }),
    _: 1
  }, 8, ["onBeforeLeave"]);
}
var AdnyMessage = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-58cd66fe"]]);
const messageTypes = ["success", "info", "warning", "danger"];
const instance$1 = [];
let vmSeed$1 = 1;
const Message = (options) => {
  if (typeof options === "string") {
    options = { message: options };
  }
  let offset = options.offset || 20;
  instance$1.forEach((item) => {
    offset += (item.el.offsetHeight || 0) + 16;
  });
  offset += 16;
  const id = "message_" + vmSeed$1++;
  let userClose = options.onClose;
  let otps = __spreadProps(__spreadValues({}, options), {
    offset,
    id,
    onClose: () => {
      close$1(id, userClose);
    }
  });
  const container = document.createElement("div");
  container.className = `container_${id}`;
  const vm = createVNode(AdnyMessage, otps);
  vm.props.onDestory = () => {
    render(null, container);
  };
  render(vm, container);
  instance$1.push(vm);
  document.body.appendChild(container.firstElementChild);
};
function close$1(id, userClose) {
  const idName = instance$1.findIndex((vm2) => {
    const { id: _id } = vm2.component.props;
    return id === _id;
  });
  if (idName === -1) {
    return;
  }
  const vm = instance$1[idName];
  if (!vm)
    return;
  userClose == null ? void 0 : userClose(vm);
  const removedHeight = vm.el.offsetHeight;
  instance$1.splice(idName, 1);
  const len = instance$1.length;
  if (len < 1)
    return;
  for (let i = idName; i < len; i++) {
    const pos = parseInt(instance$1[i].el.style["top"], 10) - removedHeight - 16;
    instance$1[i].component.props.offset = pos;
  }
}
messageTypes.forEach((type4) => {
  Message[type4] = (options = {}) => {
    if (typeof options === "string") {
      options = {
        message: options
      };
    }
    return Message(__spreadProps(__spreadValues({}, options), {
      type: type4
    }));
  };
});
Message.install = function(app) {
  app.config.globalProperties.$message = Message;
  app.component(Message.name, Message);
};
var MessageInstall = {
  title: "Message \u5168\u5C40\u63D0\u793A",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(Message);
  }
};
var notification_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$e = defineComponent({
  name: "ANotification",
  components: {
    AIcon: IconInstall
  },
  props: {
    prefixIconColor: {
      type: String,
      default: "#000"
    },
    type: {
      type: String,
      default: "default"
    },
    prefixIcon: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    showClose: {
      type: Boolean,
      default: true
    },
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 3500
    },
    onClose: {
      type: Function
    },
    offset: {
      type: Number,
      default: 20
    },
    id: {
      type: String
    },
    position: {
      type: String,
      default: "top-right"
    }
  },
  emits: ["destory"],
  setup(props2, { emit }) {
    const visible = ref(false);
    let timer = null;
    const transitionName = ref("");
    const startTime = () => {
      timer = setTimeout(() => {
        close2();
      }, props2.duration);
    };
    function close2() {
      visible.value = false;
    }
    onMounted(() => {
      startTime();
      visible.value = true;
    });
    onUnmounted(() => {
      clearTimeout(timer);
    });
    const horizontalClass = computed(() => props2.position.endsWith("right") ? "right" : "left");
    const verticalProperty = computed(() => props2.position.startsWith("top") ? "top" : "bottom");
    const positionStyle = computed(() => {
      return {
        [verticalProperty.value]: `${props2.offset}px`
      };
    });
    const verticalStyle = computed(() => {
      return {
        [horizontalClass.value]: `10px`
      };
    });
    return {
      visible,
      horizontalClass,
      close: close2,
      positionStyle,
      verticalStyle,
      transitionName
    };
  }
});
const _hoisted_1$5 = ["id"];
const _hoisted_2$3 = { class: "adny-notification-icon" };
const _hoisted_3$3 = { class: "adny-notification--group" };
const _hoisted_4$2 = { class: "adny-notification--content" };
const _hoisted_5$2 = {
  key: 0,
  class: "adny-notification--title"
};
const _hoisted_6 = { key: 1 };
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = { class: "adny-notification--closeicon" };
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_icon = resolveComponent("a-icon");
  return openBlock(), createBlock(Transition, {
    name: `notification-${_ctx.horizontalClass}`,
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("destory"))
  }, {
    default: withCtx(() => [
      withDirectives(createElementVNode("div", {
        id: _ctx.id,
        class: normalizeClass(["adny-notification", "adny-elevation--2", `adny-notification--${_ctx.type}`]),
        style: normalizeStyle([_ctx.positionStyle, _ctx.verticalStyle])
      }, [
        createElementVNode("div", _hoisted_2$3, [
          _ctx.prefixIcon ? (openBlock(), createBlock(_component_a_icon, {
            key: 0,
            color: _ctx.prefixIconColor,
            size: "30",
            name: "checkbox-marked-circle"
          }, null, 8, ["color"])) : createCommentVNode("v-if", true)
        ]),
        createElementVNode("div", _hoisted_3$3, [
          createElementVNode("div", _hoisted_4$2, [
            _ctx.title ? (openBlock(), createElementBlock("p", _hoisted_5$2, toDisplayString(_ctx.title), 1)) : createCommentVNode("v-if", true),
            _ctx.message ? (openBlock(), createElementBlock("div", _hoisted_6, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createElementVNode("span", { innerHTML: _ctx.message }, null, 8, _hoisted_7)
              ], true)
            ])) : createCommentVNode("v-if", true)
          ]),
          createElementVNode("div", _hoisted_8, [
            _ctx.showClose ? (openBlock(), createBlock(_component_a_icon, {
              key: 0,
              onClick: _ctx.close,
              name: "window-close"
            }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
          ])
        ])
      ], 14, _hoisted_1$5), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  }, 8, ["name", "onBeforeLeave"]);
}
var AdnyNotification = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-206fc4bd"]]);
const notificationType = ["info", "warning", "danger", "success"];
const instance = [];
let vmSeed = 1;
const Notification = (options) => {
  if (typeof options === "string") {
    options = { message: options };
  }
  let offset = options.offset || 0;
  instance.forEach((item) => {
    offset += (item.el.offsetHeight || 0) + 16;
  });
  offset += 16;
  const id = "message_" + vmSeed++;
  let userClose = options.onClose;
  let otps = __spreadProps(__spreadValues({}, options), {
    offset,
    id,
    onClose: () => {
      close(id, userClose);
    }
  });
  const container = document.createElement("div");
  container.className = `container_${id}`;
  const vm = createVNode(AdnyNotification, otps);
  vm.props.onDestory = () => {
    render(null, container);
  };
  render(vm, container);
  instance.push(vm);
  document.body.appendChild(container.firstElementChild);
};
function close(id, userClose) {
  const idName = instance.findIndex((vm2) => {
    const { id: _id } = vm2.component.props;
    return id === _id;
  });
  if (idName === -1) {
    return;
  }
  const vm = instance[idName];
  if (!vm)
    return;
  userClose == null ? void 0 : userClose(vm);
  const removedHeight = vm.el.offsetHeight;
  instance.splice(idName, 1);
  const len = instance.length;
  if (len < 1)
    return;
  for (let i = idName; i < len; i++) {
    const pos = parseInt(instance[i].el.style["top"], 10) - removedHeight - 16;
    instance[i].component.props.offset = pos;
  }
}
notificationType.forEach((type4) => {
  Notification[type4] = (options = {}) => {
    if (typeof options === "string") {
      options = { message: options };
    }
    return Notification(__spreadProps(__spreadValues({}, options), {
      type: type4
    }));
  };
});
Notification.install = function(app) {
  app.config.globalProperties.$notify = Notification;
  app.component(Notification.name, Notification);
};
var NotificationInstall = {
  title: "Notification \u901A\u77E5",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(Notification);
  }
};
function modeValidator(mode) {
  return ["linear", "circle"].includes(mode);
}
const props$7 = {
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
var progressLinear_vue_vue_type_style_index_0_lang = "";
const _sfc_main$d = defineComponent({
  name: "AProgressLinear",
  inheritAttrs: false,
  props: props$7,
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
const _hoisted_1$4 = { class: "adny-progress" };
const _hoisted_2$2 = {
  key: 0,
  class: "adny-progress-linear"
};
const _hoisted_3$2 = ["viewBox"];
const _hoisted_4$1 = ["cx", "cy", "r", "stroke-width"];
const _hoisted_5$1 = ["cx", "cy", "r", "stroke-width"];
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    _ctx.mode === "linear" ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
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
        }, null, 12, _hoisted_4$1)) : createCommentVNode("v-if", true),
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
        }, null, 12, _hoisted_5$1)
      ], 12, _hoisted_3$2)),
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
var ProgressLinear = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d]]);
ProgressLinear.install = function(app) {
  app.component(ProgressLinear.name, ProgressLinear);
};
var ProgressLinearInstall = {
  title: "ProgressLinear \u7EBF\u6027\u8FDB\u5EA6\u6761",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(ProgressLinear);
  }
};
var footer_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$c = defineComponent({
  name: "AFooter",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props2) {
    return {
      style: computed(() => props2.height ? {
        height: props2.height
      } : {})
    };
  }
});
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("footer", {
    class: "adny-footer",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 4);
}
var Footer = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-db16d160"]]);
var header_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$b = defineComponent({
  name: "AHeader",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props2) {
    return {
      style: computed(() => props2.height ? {
        height: props2.height
      } : {})
    };
  }
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("header", {
    class: "adny-header",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 4);
}
var Header = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-176d6470"]]);
var main_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$a = defineComponent({
  name: "AMain"
});
const _hoisted_1$3 = { class: "adny-main" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("main", _hoisted_1$3, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var Main = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-6acd46a6"]]);
var aside_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$9 = defineComponent({
  name: "AAside",
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(props2) {
    return {
      style: computed(() => {
        return props2.width ? { width: props2.width } : {};
      })
    };
  }
});
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("aside", {
    class: "adny-aside",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 4);
}
var Aside = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-dc0ec6c0"]]);
var container_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$8 = defineComponent({
  name: "AContainer",
  props: {
    direction: {
      type: String,
      default: ""
    }
  },
  setup(props2, { slots }) {
    const isVertical = computed(() => {
      if (props2.direction === "vertical") {
        return true;
      } else if (props2.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "AHeader" || tag === "AFooter";
        });
      } else {
        return false;
      }
    });
    return {
      isVertical
    };
  }
});
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(["adny-container", { "adny-container--vertical": _ctx.isVertical }])
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var Contaniner = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-fe90a1f8"]]);
Aside.install = function(app) {
  app.component(Aside.name, Aside);
};
Main.install = function(app) {
  app.component(Main.name, Main);
};
Header.install = function(app) {
  app.component(Header.name, Header);
};
Footer.install = function(app) {
  app.component(Footer.name, Footer);
};
Contaniner.install = function(app) {
  app.component(Contaniner.name, Contaniner);
};
var ContainerInstall = {
  title: "container \u5BB9\u5668",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(Header);
    app.use(Footer);
    app.use(Main);
    app.use(Aside);
    app.use(Contaniner);
  }
};
function positionValidator$1(position) {
  const validPositions = ["left", "center", "right"];
  return validPositions.includes(position);
}
const props$6 = {
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
    validator: positionValidator$1
  },
  elevation: {
    type: Boolean,
    default: true
  }
};
var appBar_vue_vue_type_style_index_0_lang = "";
const _sfc_main$7 = defineComponent({
  name: "AAppBar",
  props: props$6
});
const _hoisted_1$2 = { class: "adny-app-bar__left" };
const _hoisted_2$1 = {
  key: 0,
  class: "adny-app-bar__title"
};
const _hoisted_3$1 = { class: "adny-app-bar__right" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
var AAppBar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
AAppBar.install = function(app) {
  app.component(AAppBar.name, AAppBar);
};
var AppBarInstall = {
  title: "AppBar \u5BFC\u822A",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AAppBar);
  }
};
const gridItemProps = {
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  xs: {
    type: Number || Object,
    default: 0
  },
  sm: {
    type: Number || Object,
    default: 0
  },
  md: {
    type: Number || Object,
    default: 0
  },
  lg: {
    type: Number || Object,
    default: 0
  },
  xl: {
    type: Number || Object,
    default: 0
  }
};
const gridProps = {
  span: {
    type: Number,
    default: 24
  },
  yGap: {
    type: Number,
    default: 0
  },
  gutter: {
    type: Number,
    default: 0
  }
};
var grid_vue_vue_type_style_index_0_lang = "";
const _sfc_main$6 = defineComponent({
  name: "AGrid",
  props: gridProps,
  setup(props2) {
    const gridColsStyle = computed(() => {
      return props2.gutter ? {
        marginLeft: `(${props2.gutter} / 2)px`,
        marginRight: `(${props2.gutter} / 2)px`
      } : null;
    });
    provide("gutter", props2.gutter);
    return {
      gridColsStyle
    };
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["adny-grid-container", `adny-grid--${_ctx.span}`]),
    style: normalizeStyle(_ctx.gridColsStyle)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
var Grid = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
var gridItem_vue_vue_type_style_index_0_lang = "";
const _sfc_main$5 = defineComponent({
  name: "AGridItem",
  alias: ["AGi"],
  props: gridItemProps,
  setup(props2) {
    const gutter = inject("gutter");
    getCurrentInstance();
    const gridItemOffsetStyle = computed(() => {
      if (props2.offset !== 0) {
        return `adny-offset--${props2.offset}`;
      }
    });
    const getXSclass = computed(() => {
      return `adny-grid-response-${props2.xs}`;
    });
    const gutterStyle = computed(() => {
      return {
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`
      };
    });
    return {
      gridItemOffsetStyle,
      getXSclass,
      gutter,
      gutterStyle
    };
  }
});
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([
      "adny-grid",
      `adny-grid--${_ctx.span}`,
      _ctx.gridItemOffsetStyle,
      `adny-grid-xs--${_ctx.xs}`,
      `adny-grid-sm--${_ctx.sm}`,
      `adny-grid-md--${_ctx.md}`,
      `adny-grid-lg--${_ctx.lg}`,
      `adny-grid-xl--${_ctx.xl}`
    ]),
    style: normalizeStyle(_ctx.gutterStyle)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
var GridItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
Grid.install = function(app) {
  app.component(Grid.name, Grid);
};
GridItem.install = function(app) {
  app.component(GridItem.name, GridItem);
};
var GridInstall = {
  install(app) {
    app.use(Grid);
    app.use(GridItem);
  }
};
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
function typeValidator(type4) {
  return ["default", "primary", "info", "success", "warning", "danger"].includes(type4);
}
function sizeValidator(size) {
  return ["normal", "mini", "small", "large"].includes(size);
}
const props$5 = {
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
  iconName: pickProps(props$b, "name"),
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
const _sfc_main$4 = defineComponent({
  name: "AChip",
  components: {
    AIcon
  },
  inheritAttrs: false,
  props: props$5,
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
      const { size, block, type: type4, plain, round } = props2;
      const blockClass = block ? "adny--flex" : "adny--inline-flex";
      const plainTypeClass = plain ? `adny-chip--plain adny-chip--plain-${type4}` : `adny-chip--${type4}`;
      const roundClass = round && "adny-chip--round";
      return [`adny-chip--${size}`, blockClass, plainTypeClass, roundClass];
    });
    return {
      chipStyles,
      contentClass
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
var Chip = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
Chip.install = function(app) {
  app.component(Chip.name, Chip);
};
var ChipInstall = {
  install(app) {
    app.use(Chip);
  }
};
function positionValidator(position) {
  return ["top", "bottom", "right", "left", "center"].includes(position);
}
const props$4 = {
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
    validator: positionValidator
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
var drawer_vue_vue_type_style_index_0_lang = "";
const _sfc_main$3 = defineComponent({
  name: "ADrawer",
  inheritAttrs: false,
  props: props$4,
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
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
var ADrawer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
ADrawer.install = function(app) {
  app.component(ADrawer.name, ADrawer);
};
var DrawerInstall = {
  install(app) {
    app.use(ADrawer);
  }
};
function messageAlignValidator(messageAlign) {
  return ["left", "center", "right"].includes(messageAlign);
}
const props$3 = __spreadValues({
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
}, pickProps(props$4, [
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
const _sfc_main$2 = defineComponent({
  name: "ADialog",
  components: {
    ABtn,
    ADrawer
  },
  inheritAttrs: false,
  props: props$3,
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
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
var Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
console.log(Dialog.name);
Dialog.install = function(app) {
  app.component(Dialog.name, Dialog);
};
var DialogInstall = {
  install(app) {
    app.use(Dialog);
  }
};
const props$2 = {
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
var divider = "";
var ADivider = defineComponent({
  name: "ADivider",
  props: props$2,
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
var DividerInstall = {
  install(app) {
    app.use(ADivider);
  }
};
const props$1 = {};
const _sfc_main$1 = defineComponent({
  props: props$1,
  setup(props2) {
    return {};
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
var ACarousel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
ACarousel.install = function(app) {
  app.component(ACarousel.name, ACarousel);
};
var CarouselInstall = {
  install(app) {
    app.use(ACarousel);
  }
};
const props = {};
const _sfc_main = defineComponent({
  props,
  setup(props2) {
    return {};
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
var ACarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
ACarouselItem.install = function(app) {
  app.component(ACarouselItem.name, ACarouselItem);
};
var CarouselItemInstall = {
  install(app) {
    app.use(ACarouselItem);
  }
};
const installed = [
  ButtonInstall,
  CardInstall,
  IputInstall,
  IconInstall,
  AdnyFormDetailInstall,
  FormInstall,
  ImageInstall,
  MessageInstall,
  NotificationInstall,
  ProgressLinearInstall,
  ContainerInstall,
  AppBarInstall,
  GridInstall,
  ChipInstall,
  DrawerInstall,
  DialogInstall,
  DividerInstall,
  CarouselInstall,
  CarouselItemInstall
];
var index = {
  version: "0.0.1",
  install(app) {
    installed.forEach((p) => app.use(p));
  }
};
export { ABtn, ACard, ACarousel, ACarouselItem, ADivider, AForm, AIcon, AImage, AIput, AdnyFormDetail, AAppBar as AppBar, Aside, Chip, Contaniner, Dialog, ADrawer as Drawer, Footer, Grid, GridItem, Header, Main, Message, Notification, ProgressLinear, index as default };
