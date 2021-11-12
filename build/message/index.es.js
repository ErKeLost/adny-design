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
import { defineComponent, ref, watch, createVNode, nextTick, onMounted, onUnmounted, computed, resolveComponent, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, toDisplayString, createCommentVNode, vShow, render } from "vue";
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
var AIcon$1 = defineComponent({
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
AIcon$1.install = function(app) {
  app.component(AIcon$1.name, AIcon$1);
};
var AIcon = {
  title: "AIcon \u56FE\u6807",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AIcon$1);
  }
};
var message_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  name: "AMesssage",
  components: {
    AIcon
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
const _hoisted_1 = ["id"];
const _hoisted_2 = { class: "adny-message--flex" };
const _hoisted_3 = { style: { "display": "flex" } };
const _hoisted_4 = { style: { "margin": "0 15px" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
          createElementVNode("div", _hoisted_2, [
            createElementVNode("div", _hoisted_3, [
              createVNode(_component_a_icon, {
                name: (_a = _ctx.icon) != null ? _a : _ctx.iconName
              }, null, 8, ["name"]),
              createElementVNode("p", _hoisted_4, toDisplayString(_ctx.message), 1)
            ]),
            _ctx.showClose ? (openBlock(), createBlock(_component_a_icon, {
              key: 0,
              onClick: _ctx.close,
              name: "window-close"
            }, null, 8, ["onClick"])) : createCommentVNode("v-if", true)
          ])
        ], 14, _hoisted_1), [
          [vShow, _ctx.visible]
        ])
      ];
    }),
    _: 1
  }, 8, ["onBeforeLeave"]);
}
var AdnyMessage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8a9a840e"]]);
const messageTypes = ["success", "info", "warning", "danger"];
const instance = [];
let vmSeed = 1;
const Message = (options) => {
  if (typeof options === "string") {
    options = { message: options };
  }
  let offset = options.offset || 20;
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
  const vm = createVNode(AdnyMessage, otps);
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
messageTypes.forEach((type) => {
  Message[type] = (options = {}) => {
    if (typeof options === "string") {
      options = {
        message: options
      };
    }
    return Message(__spreadProps(__spreadValues({}, options), {
      type
    }));
  };
});
Message.install = function(app) {
  app.config.globalProperties.$message = Message;
  app.component(Message.name, Message);
};
var index = {
  title: "Message \u5168\u5C40\u63D0\u793A",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(Message);
  }
};
export { Message, index as default };
