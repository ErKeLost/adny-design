<template>
  <div :class="[block ? '' : 'adny-button-display']">
    <button
      ref="btn"
      id="btn"
      class="adny-button adny--box"
      @mousemove="changeBg"
      @mouseleave="moveBg"
      v-ripple="{ disabled: disabled || loading }"
      :class="[
        `adny-button--${size}`,
        block ? 'adny--flex adny-button--block' : 'adny--inline-flex',
        disabled ? 'adny-button--disabled' : null,
        color === undefined && text ? `adny-button--text-${type}` : `adny-button--${type}`,
        text ? 'adny-button--text' : `adny-elevation--${elevation}`,
        text && disabled ? 'adny-button--text-disabled' : null,
        round ? 'adny-button--round' : null,
        outline ? 'adny-button--outline' : null,
        depressed ? 'adny-button--depressed' : null,
        fab && size === 'large' ? 'adny-button--float-large' : null,
        fab && size === 'small' ? 'adny-button--float-small' : null,
        fab && size === 'mini' ? 'adny-button--float-mini' : null,
        fab && size === 'normal' ? 'adny-button--float-normal' : null,
        fab ? 'adny-elevation--5' : null,
        icon ? 'adny-button--icon' : null,
        icon && type ? `adny-button--text-${type}` : null,
        tile ? 'adny-button--tile' : null,
        text ? `adny-button--${type}__hover` : null,
        loading ? 'adny-button--loading' : null,
      ]"
      :style="{ color: textColor, background: color }"
    >
      <a-loading
        class="adny-button__loading"
        :type="loadingType"
        :size="loadingSize"
        :radius="loadingRadius"
        v-show="loading"
      />
      <div class="adny-button__content" :class="[loading ? 'adny-button--hidden' : null]">
        <slot />
      </div>
    </button>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  getCurrentInstance,
  ref,
  onMounted,
} from "vue";
import { RippleDirective } from "../../../directives/ripple";
import { ALoading } from '../../loading'
export default defineComponent({
  name: "ABtn",
  directives: {
    ripple: RippleDirective,
  },
  components: {
    ALoading
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadingType: {
      type: String,
      default: 'circle'
    },
    loadingSize: {
      type: String,
      default: 'normal'
    },
    loadingRadius: {
      type: [Number, String],
      default: 12,
    },
    type: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: "normal",
    },
    color: {
      type: String,
    },
    elevation: {
      type: String,
      default: "2",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    depressed: {
      type: Boolean,
      default: false,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const btn = ref(null);
    const ICON_SIZE = 25
    const btnIns = getCurrentInstance();
    const textBgColor = computed(() => {
      return {
        backgroundColor: `currentColor`,
      };
    });
    onMounted(() => {
      // btnIns.slots.default().forEach(item => {
      //   console.log(item);
      //   if (item.props === null) {
      //     // item?.forEach(item => {
      //     console.log(item?.children?.forEach(item));

      //     //   console.log(item);
      //     // })
      //   }
      // })
      if (btnIns.slots.default()[0]?.props?.size > ICON_SIZE) {
        btn.value.style.padding = `${btnIns.slots.default()[0]?.props?.size * 8 / 9}px`
      }
    });
    const typeColor = ref(null);
    switch (props.type) {
      case 'primary':
        typeColor.value = '#409eff'
        break;
      case 'success':
        typeColor.value = '#67c23a'
        break;
      case 'warning':
        typeColor.value = '#e6a23c'
        break;
      case 'danger':
        typeColor.value = '#f56c6c'
        break;
    }
    const changeBg = () => {
      if (props.type !== '' && props.icon) {
        btn.value.style.backgroundColor = `${typeColor.value}30`;
      }
      btn.value.style.backgroundColor = `${props.textColor}30`;
    };
    const moveBg = () => {
      return props.color !== undefined ? '' : btn.value.style.backgroundColor = "";
    };
    return {
      textBgColor,
      btn,
      changeBg,
      moveBg,
    };
  },
});
</script>
<style lang="less">
@import "../../../styles/common";
@import "../../../styles/elevation";
@import "../styles/ABtn.less";
</style>
