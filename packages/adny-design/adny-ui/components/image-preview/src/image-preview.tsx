import "../styles/image-preview.less";
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUnmounted,
  withDirectives,
} from "vue";
import { imagePreviewProps, ImagePreviewProps } from "./image-preview-types";
import ImagePreviewService from "./image-preview-service";
import { ClickOutSideDirective } from "../../../directives/clickoutside";
import { ABtn } from "../../button";
import { AIcon } from "../../icon";
import Transform from "./transform";

export default defineComponent({
  name: "DImagePreview",
  props: imagePreviewProps,
  directives: {
    clickoutside: ClickOutSideDirective,
  },
  components: {
    ABtn,
    AIcon,
  },
  setup(props: ImagePreviewProps) {
    let transform: Transform = null;
    const index = ref(0);
    const url = computed(() => props.previewUrlList[index.value]);

    function initTransform() {
      const imageElement: HTMLImageElement = document.querySelector(
        ".devui-image-preview-main-image"
      );
      transform = new Transform(imageElement);
    }
    function initIndex() {
      index.value = props.previewUrlList.findIndex(
        (curUrl) => curUrl === props.url
      );
    }
    function onPrev() {
      index.value =
        index.value <= 0 ? props.previewUrlList.length - 1 : index.value - 1;
    }
    function onNext() {
      index.value =
        index.value >= props.previewUrlList.length - 1 ? 0 : index.value + 1;
    }
    function onClose() {
      ImagePreviewService.close();
    }
    function onZoomIn() {
      transform.setZoomIn();
    }
    function onZoomOut() {
      transform.setZoomOut();
    }
    function onRotate() {
      transform.setRotate();
    }
    function onZoomBest() {
      transform.setZoomBest();
    }
    function onZoomOriginal() {
      transform.setZoomOriginal();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;

      if (event.code == "Escape") {
        onClose();
      } else if (event.code == "ArrowLeft") {
        onPrev();
      } else if (event.code == "ArrowRight") {
        onNext();
      }
    }
    function initKeyboard() {
      document.addEventListener("keydown", onKeyDown, false);
    }
    function unKeyBoard() {
      document.removeEventListener("keydown", onKeyDown, false);
    }

    onMounted(() => {
      initIndex();
      initTransform();
      initKeyboard();
    });
    onUnmounted(() => {
      unKeyBoard();
    });

    return () => {
      return (
        <div class="devui-image-preview">
          {/* 预览图 */}
          {withDirectives(
            <img class="devui-image-preview-main-image" src={url.value} />,
            [[ClickOutSideDirective, onClose]]
          )}
          {/* 按钮区 */}
          {/* <a-btn icon class="devui-image-preview-close-btn" onClick={onClose}>
            <a-icon name="window-close" />
          </a-btn> */}
          <a-btn icon class="devui-image-preview-arrow-left" onClick={onPrev}>
            <a-icon name="chevron-left" />
          </a-btn>
          <a-btn icon class="devui-image-preview-arrow-right" onClick={onNext}>
            <a-icon name="chevron-right" />
          </a-btn>
          {/* 底部固定区 */}
          <div class="devui-image-preview-toolbar">
            <a-btn icon onClick={onZoomIn}>
              <a-icon name="zoom-in1" />
            </a-btn>
            <a-btn icon onClick={onZoomOut}>
              <a-icon name="zoom-out1" />
            </a-btn>
            <a-btn icon onClick={onRotate}>
              <a-icon name="refresh" />
            </a-btn>
            <a-btn icon onClick={onPrev}>
              <a-icon name="chevron-left" />
            </a-btn>
            <span class="devui-image-preview-index">
              {index.value + 1}:{props.previewUrlList.length}
            </span>
            <a-btn icon class="devui-next" onClick={onNext}>
              <a-icon name="chevron-right" />
            </a-btn>
            <a-btn icon onClick={onZoomBest}>
              <a-icon name="radio-marked" />
            </a-btn>
            <a-btn icon onClick={onZoomOriginal}>
              <span>1:1</span>
            </a-btn>
          </div>
        </div>
      );
    };
  },
});
