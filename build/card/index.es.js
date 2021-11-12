import { defineComponent, createVNode } from "vue";
function fitValidator(fit) {
  return ["fill", "contain", "cover", "none", "scale-down"].includes(fit);
}
const props = {
  radius: {
    type: Boolean,
    default: true
  },
  footerPosition: {
    type: String,
    default: "left"
  },
  hover: {
    type: Boolean,
    default: false
  },
  shaped: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  continue: {
    type: Boolean,
    default: false
  },
  src: {
    type: String
  },
  fit: {
    type: String,
    validator: fitValidator,
    default: "cover"
  },
  height: {
    type: [String, Number]
  },
  alt: {
    type: String
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  content: {
    type: String
  },
  elevation: {
    type: [Number, String]
  },
  onClick: {
    type: Function
  }
};
var common = "";
var elevation = "";
var card = "";
var ACard = defineComponent({
  name: "ACard",
  props,
  setup(props2, ctx) {
    const cardClass = [props2.elevation ? `adny-elevation--${props2.elevation}` : "adny-elevation--2", "adny-card", !props2.radius ? "" : "adny-card__radius", props2.hover ? "adny-card__hover" : null, props2.shaped ? "adny-card__shaped" : null, props2.disabled ? "adny-card__disabled" : null];
    let footerPositionClass = "";
    switch (props2.footerPosition) {
      case "left":
        footerPositionClass = "adny-card__footer";
        break;
      case "center":
        footerPositionClass = "adny-card__footer-center";
        break;
      case "right":
        footerPositionClass = "adny-card__footer-right";
        break;
      case "undefined":
        footerPositionClass = "adny-card__footer";
        break;
      case "":
        footerPositionClass = "adny-card__footer";
        break;
    }
    const titleStyle = {
      display: "flex",
      justifyContent: "space-between"
    };
    const onClick = (e) => {
      var _a;
      (_a = props2.onClick) == null ? void 0 : _a.call(props2, e);
    };
    return () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
      return createVNode("div", {
        "class": cardClass,
        "onClick": onClick
      }, [ctx.slots.cover ? (_b = (_a = ctx.slots).cover) == null ? void 0 : _b.call(_a) : null, createVNode("div", {
        "style": titleStyle
      }, [ctx.slots.title && props2.continue ? createVNode("div", {
        "class": "adny-card__title"
      }, [(_d = (_c = ctx.slots).title) == null ? void 0 : _d.call(_c)]) : (_f = (_e = ctx.slots).title) == null ? void 0 : _f.call(_e), ctx.slots.extra && props2.continue ? createVNode("div", {
        "class": "adny-card__extra"
      }, [(_h = (_g = ctx.slots).extra) == null ? void 0 : _h.call(_g)]) : (_j = (_i = ctx.slots).extra) == null ? void 0 : _j.call(_i)]), ctx.slots.subtitle && props2.continue ? createVNode("div", {
        "class": "adny-card__subtitle"
      }, [(_l = (_k = ctx.slots).subtitle) == null ? void 0 : _l.call(_k)]) : (_n = (_m = ctx.slots).subtitle) == null ? void 0 : _n.call(_m), ctx.slots.content && props2.continue ? createVNode("div", {
        "class": "adny-card__content"
      }, [(_p = (_o = ctx.slots).content) == null ? void 0 : _p.call(_o)]) : (_r = (_q = ctx.slots).content) == null ? void 0 : _r.call(_q), props2.src && ctx.slots.cover === void 0 ? createVNode("img", {
        "src": props2.src,
        "style": {
          height: props2.height + "px",
          objectFit: props2.fit
        },
        "alt": props2.alt
      }, null) : "", props2.title && ctx.slots.title === void 0 ? createVNode("div", {
        "class": "adny-card__title"
      }, [props2.title]) : "", props2.subtitle && ctx.slots.subtitle === void 0 ? createVNode("div", {
        "class": "adny-card__subtitle"
      }, [props2.subtitle]) : "", props2.content && ctx.slots.content === void 0 ? createVNode("div", {
        "class": "adny-card__content"
      }, [props2.content]) : "", ctx.slots.footer ? createVNode("div", {
        "class": footerPositionClass
      }, [createVNode("div", {
        "class": true
      }, [(_t = (_s = ctx.slots).footer) == null ? void 0 : _t.call(_s)])]) : ""]);
    };
  }
});
ACard.install = function(app) {
  app.component(ACard.name, ACard);
};
var index = {
  title: "ACard \u5361\u7247",
  category: "\u53CD\u9988",
  status: "30%",
  install(app) {
    app.use(ACard);
  }
};
export { ACard, index as default };
