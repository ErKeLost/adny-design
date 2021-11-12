import { defineComponent } from "vue";
const props = {};
var _export_sfc = (sfc, props2) => {
  for (const [key, val] of props2) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = defineComponent({
  props,
  setup(props2) {
    return {};
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return null;
}
var ACarousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
ACarousel.install = function(app) {
  app.component(ACarousel.name, ACarousel);
};
var index = {
  install(app) {
    app.use(ACarousel);
  }
};
export { ACarousel, index as default };
