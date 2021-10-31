import { defineComponent, ref, computed } from "vue";
import { props } from "./props";
import "../../../styles/common.less";
import "../../../styles/elevation.less";
import "../styles/input.less";
export default defineComponent({
  name: "AdnyInput",
  props,
  setup(props, { emit, slots }) {
    const isFocus = ref(false);
    const inputClass = [
      "adny-input",
      "adny--box",
      props.disabled ? `adny-input--disabled` : null,
    ];
    const controlClass = [
      "adny-input__controller",
      isFocus.value ? "adny-input--focus" : null,
    ];
    const controlStyle = {
      color: isFocus.value ? props.focusColor : props.blurColor,
    };
    const inputWrapClass = [
      "adny-input__wrap",
      !props.hint ? "adny-input--non-hint" : null,
    ];
    const inputPasswordClass = "adny-input__autocomplate";
    const componentClass = [
      "adny-input__input",
      props.textarea ? "adny-input--textarea" : null,
    ];
    const handleClick = (event: MouseEvent) => {};
    const inputStyle = {
      color: props.textColor,
    };
    const inputLineClass = [
      "adny-input__line",
      props.disabled ? "adny-input--line-disabled" : null,
    ];

    const handleFocus = (e: FocusEvent) => {
      isFocus.value = true;
      console.log(isFocus.value);
      props.onFocus?.(e);
    };
    const handleBlur = (e: FocusEvent) => {
      isFocus.value = false;
      console.log(isFocus.value);
      props.onBlur?.(e);
    };
    const handleInput = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      props["onUpdate:modelValue"]?.(value);
      props.onInput?.(value, e);
    };
    const handleInputChange = (e: Event) => {
      const { value } = e.target as HTMLInputElement;
      props.onChange?.(value, e);
    };
    const computePlaceholderState = () => {
      if (!props.hint) {
        return "adny-input--placeholder-hidden";
      }
      if (props.hint && isFocus.value) {
        return "adny-input--placeholder-hint";
      }
    };
    const labelClass = [
      props.textarea
        ? "adny-input__textarea-placeholder"
        : "adny-input__placeholder",
      computePlaceholderState(),
      !props.hint ? "adny-input--placeholder-non-hint" : null,
    ];
    const lineStyle = {
      background: props.blurColor,
    };
    const lineMoveClass = [
      "adny-input__dot",
      isFocus.value ? "adny-input--spread" : null,
      props.disabled ? "adny-input--line-disabled" : null,
    ];
    return () => {
      return (
        <div class={inputClass} onClick={handleClick}>
          <div style={controlStyle} class={controlClass}>
            <div class={inputWrapClass}>
              {props.type === "password" ? (
                <input type={props.type} class={inputPasswordClass} />
              ) : null}
              {props.textarea ? (
                <textarea
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onInput={handleInput}
                  onChange={handleInputChange}
                  class={componentClass}
                  style={inputStyle}
                />
              ) : (
                <input
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onInput={handleInput}
                  onChange={handleInputChange}
                  class={componentClass}
                  style={inputStyle}
                />
              )}
              <label class={labelClass}>{props.placeholder}</label>
            </div>
          </div>
          {props.line ? (
            <div style={lineStyle} class={inputLineClass}>
              <div
                class={lineMoveClass}
                style={{ background: props.focusColor }}
              ></div>
            </div>
          ) : null}
        </div>
      );
    };
  },
});
