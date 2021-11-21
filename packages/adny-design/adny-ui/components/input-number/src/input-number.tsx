import { defineComponent, computed, ref } from "vue";

import { props } from "./props";

import "../styles/input-number.less";

export default defineComponent({
  props,
  name: "AInputNumber",
  setup(props, ctx) {
    return () => {
      return (
        <div>
          <input type="number" />
        </div>
      );
    };
  },
});
