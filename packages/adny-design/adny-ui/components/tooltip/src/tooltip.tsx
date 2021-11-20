import {
  defineComponent,
  reactive,
  ref,
  watch,
  onMounted,
  getCurrentInstance,
  onBeforeUnmount,
  renderSlot,
  useSlots,
} from "vue";
import { tooltipProps } from "./props";
import EventListener from "../../../compsables/tooltip";
import "../styles/tooltip.less";

export default defineComponent({
  name: "ATooltip",
  props: tooltipProps,
  setup(props, ctx) {
    const position = reactive({
      left: 0,
      top: 0,
    });
    const show = ref(false);

    // slotElement元素的ref
    const slotElement = ref(null);
    // tooltip元素的引用
    const tooltip = ref(null);
    // arrow元素的引用
    const arrow = ref(null);
    // tooltipcontent的引用
    const tooltipcontent = ref(null);

    let enterEvent;
    let leaveEvent;

    const arrowStyle = (attr, value) => {
      arrow.value.style[attr] = value;
    };

    // 延迟显示
    const delayShowTrue = function (fn, delay = props.mouseEnterDelay) {
      let start;
      if (parseInt(delay) >= 0) {
        return function () {
          if (start) {
            clearTimeout(start);
          }
          start = setTimeout(fn, parseInt(delay));
        };
      } else {
        console.error(
          "the value of delay is bigger than 0 and the type of delay must be string!"
        );
        return;
      }
    };
    // 延迟消失
    const delayShowFalse = function (fn, delay = props.mouseLeaveDelay) {
      if (show.value && parseInt(delay) >= 0) {
        setTimeout(fn, parseInt(delay));
      }
    };

    onMounted(() => {
      // 组件初始化不渲染tooltip
      if (!show.value) {
        tooltip.value.style.opacity = "0";
      }

      // 注册鼠标引入事件
      /*enterEvent = EventListener.listen(slotElement.value.children[0], 'mouseenter', function (){
                show.value = true
            })*/
      enterEvent = EventListener.listen(
        slotElement.value.children[0],
        "mouseenter",
        delayShowTrue(function () {
          show.value = true;
        }, props.mouseEnterDelay)
      );

      // 注册鼠标移除事件
      leaveEvent = EventListener.listen(
        slotElement.value.children[0],
        "mouseleave",
        function () {
          if (show.value) {
            setTimeout(function () {
              show.value = false;
            }, props.mouseLeaveDelay);
          }
        }
      );
    });

    watch(show, function (newValue, oldValue) {
      if (newValue) {
        // 鼠标悬浮为true，显示提示框
        tooltip.value.style.opacity = "1";
        tooltip.value.style.zIndex = "999";
        arrow.value.style.border = "5px solid transparent";
        // 具体的判定规则
        switch (props.position) {
          case "top":
            // 设置 tooltip 内容的样式
            position.left =
              slotElement.value.children[0].offsetLeft -
              tooltip.value.offsetWidth / 2 +
              slotElement.value.children[0].offsetWidth / 2 -
              5;
            position.top =
              slotElement.value.children[0].offsetTop -
              10 -
              tooltipcontent.value.offsetHeight;
            // 设置箭头的样式
            arrowStyle("borderTop", "5px solid rgb(70, 77, 110)");
            arrow.value.style.top = `${tooltipcontent.value.offsetHeight}px`;
            arrow.value.style.left = `${
              tooltipcontent.value.offsetWidth / 2 + 5
            }px`;
            break;

          case "right":
            // 设置tooltip 内容的样式
            position.left =
              slotElement.value.children[0].offsetLeft +
              slotElement.value.children[0].offsetWidth;
            position.top =
              slotElement.value.children[0].offsetTop +
              slotElement.value.children[0].offsetHeight / 2 -
              tooltipcontent.value.offsetHeight / 2;
            // 设置箭头的样式
            arrowStyle("borderRight", "5px solid rgb(70, 77, 110)");
            arrow.value.style.top = `${
              tooltipcontent.value.offsetHeight / 2 - 5
            }px`;
            arrow.value.style.left = "-0px";
            break;

          case "bottom":
            // 设置tooltip的样式
            position.top =
              slotElement.value.children[0].offsetHeight +
              slotElement.value.children[0].offsetTop +
              10;
            position.left =
              slotElement.value.children[0].offsetLeft +
              slotElement.value.children[0].offsetWidth / 2 -
              tooltipcontent.value.offsetWidth / 2 -
              5;
            // 设置arrow.value的样式
            arrowStyle("borderBottom", "5px solid rgb(70, 77, 110)");
            arrow.value.style.top = "-10px";
            arrow.value.style.left = `${
              tooltipcontent.value.offsetWidth / 2 + 5
            }px`;
            break;

          case "left":
            position.top =
              slotElement.value.children[0].offsetTop +
              slotElement.value.children[0].offsetHeight / 2 -
              tooltipcontent.value.offsetHeight / 2;
            position.left =
              slotElement.value.children[0].offsetLeft -
              20 -
              tooltipcontent.value.offsetWidth;
            // 设置arrow.value的样式
            arrowStyle("borderLeft", "5px solid rgb(70, 77, 110)");
            arrow.value.style.left = `${
              tooltipcontent.value.offsetWidth + 10
            }px`;
            arrow.value.style.top = `${
              tooltipcontent.value.offsetHeight / 2 - 5
            }px`;
            break;

          default:
            console.error(
              "The attribute position value is wrong, the value is one of top、right、left、bottom"
            );
            break;
        }
        tooltip.value.style.top = position.top + "px";
        tooltip.value.style.left = position.left + "px";
      } else {
        position.top = 0;
        position.left = 0;
        // 鼠标移走为false，隐藏提示框
        tooltip.value.style.opacity = "0";
      }
    });

    onBeforeUnmount(() => {
      enterEvent.remove();
      leaveEvent.remove();
    });

    return () => {
      const defaultSlot = renderSlot(useSlots(), "default");
      return (
        <div class="devui-tooltip">
          <div class="slotElement" ref={slotElement}>
            {defaultSlot}
          </div>
          <div class="tooltip" ref={tooltip}>
            <div class="arrow" ref={arrow}></div>
            <div class="tooltipcontent" ref={tooltipcontent}>
              {props.content}
            </div>
          </div>
        </div>
      );
    };
  },
});
