import { reactive } from "vue";
const context = {
  locks: {},
  zIndex: 2e3,
  touchmoveForbid: true
};
const _ContextComponent = reactive(context);
var index = reactive(context);
export { _ContextComponent, index as default };
