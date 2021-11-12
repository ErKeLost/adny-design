import { defineComponent, computed, provide, openBlock, createElementBlock, normalizeClass, normalizeStyle, renderSlot, inject, getCurrentInstance } from "vue";
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
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$1 = defineComponent({
  name: "AGrid",
  props: gridProps,
  setup(props) {
    const gridColsStyle = computed(() => {
      return props.gutter ? {
        marginLeft: `(${props.gutter} / 2)px`,
        marginRight: `(${props.gutter} / 2)px`
      } : null;
    });
    provide("gutter", props.gutter);
    return {
      gridColsStyle
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["adny-grid-container", `adny-grid--${_ctx.span}`]),
    style: normalizeStyle(_ctx.gridColsStyle)
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
var Grid = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
var gridItem_vue_vue_type_style_index_0_lang = "";
const _sfc_main = defineComponent({
  name: "AGridItem",
  alias: ["AGi"],
  props: gridItemProps,
  setup(props) {
    const gutter = inject("gutter");
    getCurrentInstance();
    const gridItemOffsetStyle = computed(() => {
      if (props.offset !== 0) {
        return `adny-offset--${props.offset}`;
      }
    });
    const getXSclass = computed(() => {
      return `adny-grid-response-${props.xs}`;
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
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
var GridItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
Grid.install = function(app) {
  app.component(Grid.name, Grid);
};
GridItem.install = function(app) {
  app.component(GridItem.name, GridItem);
};
var index = {
  install(app) {
    app.use(Grid);
    app.use(GridItem);
  }
};
export { Grid, GridItem, index as default };
