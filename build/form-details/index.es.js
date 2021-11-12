import { defineComponent, openBlock, createBlock, Transition, withCtx, createElementBlock, createElementVNode, toDisplayString, createCommentVNode } from "vue";
const props = {
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
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  name: "AFormDetail",
  props
});
const _hoisted_1 = {
  key: 0,
  class: "var-form-details"
};
const _hoisted_2 = { class: "var-form-details__message" };
const _hoisted_3 = { class: "var-form-details__length" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "var-form-details" }, {
    default: withCtx(() => [
      _ctx.errorMessage || _ctx.maxlengthText ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, toDisplayString(_ctx.errorMessage), 1),
        createElementVNode("div", _hoisted_3, toDisplayString(_ctx.maxlengthText), 1)
      ])) : createCommentVNode("v-if", true)
    ]),
    _: 1
  });
}
var AdnyFormDetail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
AdnyFormDetail.install = function(app) {
  app.component(AdnyFormDetail.name, AdnyFormDetail);
};
var index = {
  title: "AdnyFormDetail \u6821\u9A8C\u8868\u5355",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(AdnyFormDetail);
  }
};
export { AdnyFormDetail, index as default };
