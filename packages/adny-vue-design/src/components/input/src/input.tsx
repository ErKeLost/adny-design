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
    const handleClick = (event: MouseEvent) => {};
    const handleFocus = (e: FocusEvent) => {
      isFocus.value = true;
      props.onFocus?.(e);
    };
    const handleBlur = (e: FocusEvent) => {
      isFocus.value = false;
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
    return () => {
      return (
        <div
          class={[
            "adny-input",
            "adny--box",
            props.disabled ? `adny-input--disabled` : null,
          ]}
          onClick={handleClick}
        >
          <div
            style={{
              color: isFocus.value ? props.focusColor : props.blurColor,
            }}
            class={[
              "adny-input__controller",
              isFocus.value ? "adny-input--focus" : null,
            ]}
          >
            <div
              class={[
                "adny-input__wrap",
                !props.hint ? "adny-input--non-hint" : null,
              ]}
            >
              {props.type === "password" ? (
                <input type={props.type} class="adny-input__autocomplate" />
              ) : null}
              {props.textarea ? (
                <textarea
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onInput={handleInput}
                  onChange={handleInputChange}
                  class={[
                    "adny-input__input",
                    props.textarea ? "adny-input--textarea" : null,
                  ]}
                  style={{
                    color: props.textColor,
                  }}
                />
              ) : (
                <input
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onInput={handleInput}
                  onChange={handleInputChange}
                  class={[
                    "adny-input__input",
                    props.textarea ? "adny-input--textarea" : null,
                  ]}
                  style={{
                    color: props.textColor,
                  }}
                />
              )}
              <label
                class={[
                  props.textarea
                    ? "adny-input__textarea-placeholder"
                    : "adny-input__placeholder",
                  !props.hint ? "adny-input--placeholder-hidden" : null,
                  props.hint && isFocus.value
                    ? "adny-input--placeholder-hint"
                    : null,
                  !props.hint ? "adny-input--placeholder-non-hint" : null,
                ]}
              >
                {props.placeholder}
              </label>
            </div>
          </div>
          {props.line ? (
            <div
              style={{
                background: props.blurColor,
              }}
              class={[
                "adny-input__line",
                props.disabled ? "adny-input--line-disabled" : null,
              ]}
            >
              <div
                class={[
                  "adny-input__dot",
                  isFocus.value ? "adny-input--spread" : null,
                  props.disabled ? "adny-input--line-disabled" : null,
                ]}
                style={{ background: props.focusColor }}
              ></div>
            </div>
          ) : null}
        </div>
      );
    };
  },
});
