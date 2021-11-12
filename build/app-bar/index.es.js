import { defineComponent, openBlock, createElementBlock, normalizeClass, normalizeStyle, createElementVNode, renderSlot, createTextVNode, toDisplayString, createCommentVNode } from "vue";
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
const _sfc_main = defineComponent({
  name: "AAppBar",
  props
});
const _hoisted_1 = { class: "adny-app-bar__left" };
const _hoisted_2 = {
  key: 0,
  class: "adny-app-bar__title"
};
const _hoisted_3 = { class: "adny-app-bar__right" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["adny-app-bar", { "adny-elevation--3": _ctx.elevation }]),
    style: normalizeStyle({
      background: _ctx.color,
      color: _ctx.textColor
    })
  }, [
    createElementVNode("div", _hoisted_1, [
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
var AppBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
AppBar.install = function(app) {
  app.component(AppBar.name, AppBar);
};
var index = {
  title: "AppBar \u5BFC\u822A",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AppBar);
  }
};
export { AppBar, index as default };
