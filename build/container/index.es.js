import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, renderSlot, normalizeClass } from "vue";
var footer_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$4 = defineComponent({
  name: "AFooter",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: computed(() => props.height ? {
        height: props.height
      } : {})
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("footer", {
    class: "adny-footer",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 4);
}
var Footer = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-6ae23670"]]);
var header_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = defineComponent({
  name: "AHeader",
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: computed(() => props.height ? {
        height: props.height
      } : {})
    };
  }
});
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("header", {
    class: "adny-header",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 4);
}
var Header = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-68947d80"]]);
var main_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = defineComponent({
  name: "AMain"
});
const _hoisted_1 = { class: "adny-main" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("main", _hoisted_1, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ]);
}
var Main = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-31af7b96"]]);
var aside_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = defineComponent({
  name: "AAside",
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(props) {
    return {
      style: computed(() => {
        return props.width ? { width: props.width } : {};
      })
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("aside", {
    class: "adny-aside",
    style: normalizeStyle(_ctx.style)
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 4);
}
var Aside = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-26653e18"]]);
var container_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "AContainer",
  props: {
    direction: {
      type: String,
      default: ""
    }
  },
  setup(props, { slots }) {
    const isVertical = computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("section", {
    class: normalizeClass(["adny-container", { "adny-container--vertical": _ctx.isVertical }])
  }, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true)
  ], 2);
}
var Contaniner = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1f6ce708"]]);
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
var index = {
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
export { Aside, Contaniner, Footer, Header, Main, index as default };
