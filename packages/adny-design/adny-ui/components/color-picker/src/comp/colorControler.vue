<template>
  <div class="adny-color">
    <div class="adny-color-type" v-for="item in colorControlers" :key="item.text">
      <div class="adny-color-choose" v-if="item.type === colorType">
        <input class="adny-color-input" type="number" v-model="item.value" />
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div class="adny-color-ainput" v-if="colorType === 'HEX'">
      <a-input textCenter maxlength="9" v-model="value" />
    </div>
    <a-btn icon @click="changeColorType">
      <a-icon name="repeat" size="16"></a-icon>
    </a-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { ABtn } from '../../../button'
import { AIcon } from '../../../icon'
import { AInput } from '../../../input'
import { colorProps } from '../props'
import { hsb2rgb, rgb2hexstr } from "../../../../compsables/color";
import { colorTypeIndex } from '../utils/colorControler';
export default defineComponent({
  name: 'colorControl',
  props: colorProps,
  components: {
    ABtn,
    AIcon,
    AInput
  },
  setup(props, ctx) {
    console.log(props.hsb
    );
    const colorType = ref('rgba')
    const index = ref(0)
    const changeColorType = () => {
      if (index.value > 1) {
        index.value = 0
        colorType.value = colorTypeIndex[index.value].value
      } else {
        index.value++
        colorType.value = colorTypeIndex[index.value].value
      }
    }
    const colorControlers = computed(() => {
      return [
        {
          text: "R",
          value: props.rgb[0],
          type: "rgba",
          input: "number",
        },
        {
          text: "G",
          value: props.rgb[1],
          type: "rgba",
          input: "number",
        },
        {
          text: "B",
          value: props.rgb[2],
          type: "rgba",
          input: "number",
        },
        {
          text: "A",
          value: props.rgb[3],
          type: "rgba",
          input: "number",
        },
        {
          text: "H",
          value: props.rgb[0],
          type: "hsla",
          input: "number",
        },
        {
          text: "S",
          value: props.rgb[1],
          type: "hsla",
          input: "number",
        },
        {
          text: "b",
          value: props.rgb[2],
          type: "hsla",
          input: "number",
        },
        {
          text: "HEX",
          value: `#${props.hex?.replace("#", "")}`,
          type: "hex",
          input: "text",
        },
      ];
    })
    const value = computed(() => `#${props.hex?.replace("#", "")}`)
    console.log(value.value);
    console.log(props.hex);
    return {
      value,
      colorControlers,
      changeColorType,
      colorType
    }
  }
})
</script>
<style lang="less" scoped>
.adny-color {
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
  margin-top: 15px;
  &-choose {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-type {
    display: flex;
    justify-content: space-between;
  }

  &-input {
    border: thin solid rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 4px;
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 550;
    min-width: 0;
    outline: none;
    text-align: center;
    width: 52px;
    height: 28px;
    margin: 0 20px;
  }
  &-ainput {
    width: 250px;
    text-align: center;
  }
}
</style>