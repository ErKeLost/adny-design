<template>
  <div id="spinner" class="container-spinner" :class="[spinnerColor]">
    <div class="fulfilling-square-spinner" v-if="'fulling' === spinnerType">
      <div class="spinner-inner"></div>
    </div>
    <div class="breeding-rhombus-spinner" v-if="'breeding' === spinnerType">
      <div class="rhombus child-1"></div>
      <div class="rhombus child-2"></div>
      <div class="rhombus child-3"></div>
      <div class="rhombus child-4"></div>
      <div class="rhombus child-5"></div>
      <div class="rhombus child-6"></div>
      <div class="rhombus child-7"></div>
      <div class="rhombus child-8"></div>
      <div class="rhombus big"></div>
    </div>
    <div class="semipolar-spinner" v-if="'semipolar' === spinnerType">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>
    <div class="fulfilling-bouncing-circle-spinner" v-if="'circle' === spinnerType">
      <div class="circle"></div>
      <div class="orbit"></div>
    </div>
    <div class="self-building-square-spinner" v-if="'square' === spinnerType">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square clear"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square clear"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="scaling-squares-spinner" v-if="'scaling' === spinnerType">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <p class="title">{{ loadingTip }}</p>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance, onMounted } from "vue";
export default defineComponent({
  name: 'ASpin',
  props: {
    spinnerType: {
      type: String,
      default: ''
    },
    spinnerColor: {
      type: String,
      default: 'warning'
    },
    loadingTip: {
      type: String,
      default: 'Loading'
    },
    fulling: {
      type: Boolean,
      default: false
    }

  },
  setup(props) {
    const bgColor = computed(() => {
      return `${props.spinnerColor}30`
    })
    console.log(bgColor.value);
    return {
      bgColor
    }
  }
})
</script>

<style scoped lang="less">
.container-spinner {
  // position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: v-bind(bgColor);
  border: 0.1px solid v-bind(spinnerColor);
  .title {
    color: v-bind(spinnerColor);
    user-select: none;
    font-size: 15px;
    letter-spacing: 1px;
  }
  .fulfilling-square-spinner {
    height: 50px;
    width: 50px;
    position: relative;
    border: 4px solid v-bind(spinnerColor);
    animation: fulfilling-square-spinner-animation 4s infinite ease;
  }
  .fulfilling-square-spinner .spinner-inner {
    vertical-align: top;
    display: inline-block;
    background-color: v-bind(spinnerColor);
    width: 100%;
    opacity: 1;
    animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;
  }
  .breeding-rhombus-spinner .rhombus {
    height: calc(50px / 7.5);
    width: calc(50px / 7.5);
    animation-duration: 2000ms;
    top: calc(50px / 2.3077);
    left: calc(50px / 2.3077);
    background-color: v-bind(spinnerColor);
    position: absolute;
    animation-iteration-count: infinite;
  }
  .breeding-rhombus-spinner .rhombus.big {
    height: calc(50px / 3);
    width: calc(50px / 3);
    animation-duration: 2000ms;
    top: calc(50px / 3);
    left: calc(50px / 3);
    background-color: v-bind(spinnerColor);
    animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
    animation-delay: 0.5s;
  }
  .semipolar-spinner .ring {
    border-radius: 50%;
    position: absolute;
    border: calc(50px * 0.05) solid transparent;
    border-top-color: v-bind(spinnerColor);
    border-left-color: v-bind(spinnerColor);
    animation: semipolar-spinner-animation 2s infinite;
  }
  .fulfilling-bouncing-circle-spinner .circle {
    height: 60px;
    width: 60px;
    color: v-bind(spinnerColor);
    display: block;
    border-radius: 50%;
    position: relative;
    border: calc(60px * 0.1) solid v-bind(spinnerColor);
    animation: fulfilling-bouncing-circle-spinner-circle-animation infinite
      4000ms ease;
    transform: rotate(0deg) scale(1);
  }
  .fulfilling-bouncing-circle-spinner .orbit {
    height: 60px;
    width: 60px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: calc(60px * 0.03) solid v-bind(spinnerColor);
    animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite
      4000ms ease;
  }
  .self-building-square-spinner .square {
    height: 10px;
    width: 10px;
    top: calc(-10px * 2 / 3);
    margin-right: calc(10px / 3);
    margin-top: calc(10px / 3);
    background: v-bind(spinnerColor);
    float: left;
    position: relative;
    opacity: 0;
    animation: self-building-square-spinner 6s infinite;
  }
  .scaling-squares-spinner .square {
    height: calc(50px * 0.25 / 1.3);
    width: calc(50px * 0.25 / 1.3);
    margin-right: auto;
    margin-left: auto;
    border: calc(50px * 0.04 / 1.3) solid v-bind(spinnerColor);
    position: absolute;
    animation-duration: 1250ms;
    animation-iteration-count: infinite;
  }
  .title {
    margin-top: 20px;
  }
}
// 花朵
.flower-spinner,
.flower-spinner * {
  box-sizing: border-box;
}

.flower-spinner {
  height: 70px;
  width: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.flower-spinner .dots-container {
  height: calc(70px / 7);
  width: calc(70px / 7);
}
// 进度点条
.self-building-square-spinner,
.self-building-square-spinner * {
  box-sizing: border-box;
}

.self-building-square-spinner {
  height: 40px;
  width: 40px;
  top: calc(-10px * 2 / 3);
}

.self-building-square-spinner .square:nth-child(1) {
  animation-delay: calc(300ms * 6);
}

.self-building-square-spinner .square:nth-child(2) {
  animation-delay: calc(300ms * 7);
}

.self-building-square-spinner .square:nth-child(3) {
  animation-delay: calc(300ms * 8);
}

.self-building-square-spinner .square:nth-child(4) {
  animation-delay: calc(300ms * 3);
}

.self-building-square-spinner .square:nth-child(5) {
  animation-delay: calc(300ms * 4);
}

.self-building-square-spinner .square:nth-child(6) {
  animation-delay: calc(300ms * 5);
}

.self-building-square-spinner .square:nth-child(7) {
  animation-delay: calc(300ms * 0);
}

.self-building-square-spinner .square:nth-child(8) {
  animation-delay: calc(300ms * 1);
}

.self-building-square-spinner .square:nth-child(9) {
  animation-delay: calc(300ms * 2);
}

.self-building-square-spinner .clear {
  clear: both;
}

@keyframes self-building-square-spinner {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  50.9% {
    opacity: 1;
    top: 0;
  }
  55.9% {
    opacity: 0;
    top: inherit;
  }
}
// 正常spinner
.fulfilling-bouncing-circle-spinner,
.fulfilling-bouncing-circle-spinner * {
  box-sizing: border-box;
}

.fulfilling-bouncing-circle-spinner {
  height: 60px;
  width: 60px;
  position: relative;
  animation: fulfilling-bouncing-circle-spinner-animation infinite 4000ms ease;
}

@keyframes fulfilling-bouncing-circle-spinner-animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1);
  }
  62.5% {
    transform: scale(0.8);
  }
  75% {
    transform: scale(1);
  }
  87.5% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fulfilling-bouncing-circle-spinner-circle-animation {
  0% {
    transform: scale(1);
    border-color: transparent;
    border-top-color: inherit;
  }
  16.7% {
    border-color: transparent;
    border-top-color: initial;
    border-right-color: initial;
  }
  33.4% {
    border-color: transparent;
    border-top-color: inherit;
    border-right-color: inherit;
    border-bottom-color: inherit;
  }
  50% {
    border-color: inherit;
    transform: scale(1);
  }
  62.5% {
    border-color: inherit;
    transform: scale(1.4);
  }
  75% {
    border-color: inherit;
    transform: scale(1);
    opacity: 1;
  }
  87.5% {
    border-color: inherit;
    transform: scale(1.4);
  }
  100% {
    border-color: transparent;
    border-top-color: inherit;
    transform: scale(1);
  }
}
// 简单 转圈
.semipolar-spinner,
.semipolar-spinner * {
  box-sizing: border-box;
}

.semipolar-spinner {
  height: 50px;
  width: 50px;
  position: relative;
}

.semipolar-spinner .ring:nth-child(1) {
  height: calc(50px - 50px * 0.2 * 0);
  width: calc(50px - 50px * 0.2 * 0);
  top: calc(50px * 0.1 * 0);
  left: calc(50px * 0.1 * 0);
  animation-delay: calc(2000ms * 0.1 * 4);
  z-index: 5;
}

.semipolar-spinner .ring:nth-child(2) {
  height: calc(50px - 50px * 0.2 * 1);
  width: calc(50px - 50px * 0.2 * 1);
  top: calc(50px * 0.1 * 1);
  left: calc(50px * 0.1 * 1);
  animation-delay: calc(2000ms * 0.1 * 3);
  z-index: 4;
}

.semipolar-spinner .ring:nth-child(3) {
  height: calc(50px - 50px * 0.2 * 2);
  width: calc(50px - 50px * 0.2 * 2);
  top: calc(50px * 0.1 * 2);
  left: calc(50px * 0.1 * 2);
  animation-delay: calc(2000ms * 0.1 * 2);
  z-index: 3;
}

.semipolar-spinner .ring:nth-child(4) {
  height: calc(50px - 50px * 0.2 * 3);
  width: calc(50px - 50px * 0.2 * 3);
  top: calc(50px * 0.1 * 3);
  left: calc(50px * 0.1 * 3);
  animation-delay: calc(2000ms * 0.1 * 1);
  z-index: 2;
}

.semipolar-spinner .ring:nth-child(5) {
  height: calc(50px - 50px * 0.2 * 4);
  width: calc(50px - 50px * 0.2 * 4);
  top: calc(50px * 0.1 * 4);
  left: calc(50px * 0.1 * 4);
  animation-delay: calc(2000ms * 0.1 * 0);
  z-index: 1;
}

@keyframes semipolar-spinner-animation {
  50% {
    transform: rotate(360deg) scale(0.7);
  }
}
// 方块
.fulfilling-square-spinner,
.fulfilling-square-spinner * {
  box-sizing: border-box;
}

@keyframes fulfilling-square-spinner-animation {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes fulfilling-square-spinner-inner-animation {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
// 旋转
.breeding-rhombus-spinner {
  height: 50px;
  width: 50px;
  position: relative;
  transform: rotate(45deg);
}

.breeding-rhombus-spinner,
.breeding-rhombus-spinner * {
  box-sizing: border-box;
}

.breeding-rhombus-spinner .rhombus:nth-child(2n + 0) {
  margin-right: 0;
}

.breeding-rhombus-spinner .rhombus.child-1 {
  animation-name: breeding-rhombus-spinner-animation-child-1;
  animation-delay: calc(100ms * 1);
}

.breeding-rhombus-spinner .rhombus.child-2 {
  animation-name: breeding-rhombus-spinner-animation-child-2;
  animation-delay: calc(100ms * 2);
}

.breeding-rhombus-spinner .rhombus.child-3 {
  animation-name: breeding-rhombus-spinner-animation-child-3;
  animation-delay: calc(100ms * 3);
}

.breeding-rhombus-spinner .rhombus.child-4 {
  animation-name: breeding-rhombus-spinner-animation-child-4;
  animation-delay: calc(100ms * 4);
}

.breeding-rhombus-spinner .rhombus.child-5 {
  animation-name: breeding-rhombus-spinner-animation-child-5;
  animation-delay: calc(100ms * 5);
}

.breeding-rhombus-spinner .rhombus.child-6 {
  animation-name: breeding-rhombus-spinner-animation-child-6;
  animation-delay: calc(100ms * 6);
}

.breeding-rhombus-spinner .rhombus.child-7 {
  animation-name: breeding-rhombus-spinner-animation-child-7;
  animation-delay: calc(100ms * 7);
}

.breeding-rhombus-spinner .rhombus.child-8 {
  animation-name: breeding-rhombus-spinner-animation-child-8;
  animation-delay: calc(100ms * 8);
}

@keyframes breeding-rhombus-spinner-animation-child-1 {
  50% {
    transform: translate(-325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-2 {
  50% {
    transform: translate(0, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-3 {
  50% {
    transform: translate(325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-4 {
  50% {
    transform: translate(325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-5 {
  50% {
    transform: translate(325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-6 {
  50% {
    transform: translate(0, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-7 {
  50% {
    transform: translate(-325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-8 {
  50% {
    transform: translate(-325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-big {
  50% {
    transform: scale(0.5);
  }
}
.scaling-squares-spinner,
.scaling-squares-spinner * {
  box-sizing: border-box;
}

.scaling-squares-spinner {
  height: 50px;
  width: 50px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: scaling-squares-animation 1250ms;
  animation-iteration-count: infinite;
  transform: rotate(0deg);
}

.scaling-squares-spinner .square:nth-child(1) {
  animation-name: scaling-squares-spinner-animation-child-1;
}

.scaling-squares-spinner .square:nth-child(2) {
  animation-name: scaling-squares-spinner-animation-child-2;
}

.scaling-squares-spinner .square:nth-child(3) {
  animation-name: scaling-squares-spinner-animation-child-3;
}

.scaling-squares-spinner .square:nth-child(4) {
  animation-name: scaling-squares-spinner-animation-child-4;
}

@keyframes scaling-squares-animation {
  50% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(180deg);
  }
}

@keyframes scaling-squares-spinner-animation-child-1 {
  50% {
    transform: translate(150%, 150%) scale(2, 2);
  }
}

@keyframes scaling-squares-spinner-animation-child-2 {
  50% {
    transform: translate(-150%, 150%) scale(2, 2);
  }
}

@keyframes scaling-squares-spinner-animation-child-3 {
  50% {
    transform: translate(-150%, -150%) scale(2, 2);
  }
}

@keyframes scaling-squares-spinner-animation-child-4 {
  50% {
    transform: translate(150%, -150%) scale(2, 2);
  }
}
</style>
