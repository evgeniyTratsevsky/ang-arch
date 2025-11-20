import {
  CommonModule
} from "./chunk-Q32OZTGA.js";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-RQQNYMLD.js";

// libs/ui-kit/src/lib/button/button.component.ts
var _c0 = ["*"];
function ButtonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 1);
  }
}
var ButtonComponent = class _ButtonComponent {
  // Inputs
  variant = input("primary");
  size = input("medium");
  type = input("button");
  disabled = input(false);
  loading = input(false);
  fullWidth = input(false);
  // Output
  clicked = output();
  // Computed classes
  buttonClasses = computed(() => {
    const classes = [];
    classes.push(`variant-${this.variant()}`);
    classes.push(`size-${this.size()}`);
    if (this.fullWidth()) {
      classes.push("full-width");
    }
    return classes.join(" ");
  });
  handleClick(event) {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
  static \u0275fac = function ButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ButtonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ButtonComponent, selectors: [["lib-button"]], inputs: { variant: [1, "variant"], size: [1, "size"], type: [1, "type"], disabled: [1, "disabled"], loading: [1, "loading"], fullWidth: [1, "fullWidth"] }, outputs: { clicked: "clicked" }, ngContentSelectors: _c0, decls: 3, vars: 5, consts: [[3, "click", "type", "disabled"], [1, "spinner"]], template: function ButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "button", 0);
      \u0275\u0275listener("click", function ButtonComponent_Template_button_click_0_listener($event) {
        return ctx.handleClick($event);
      });
      \u0275\u0275template(1, ButtonComponent_Conditional_1_Template, 1, 0, "span", 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.buttonClasses());
      \u0275\u0275property("type", ctx.type())("disabled", ctx.disabled());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\nbutton[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border: none;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-family: inherit;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\nbutton[_ngcontent-%COMP%]:not(:disabled):hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\nbutton[_ngcontent-%COMP%]:not(:disabled):active {\n  transform: translateY(0);\n}\n.size-small[_ngcontent-%COMP%] {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n}\n.size-medium[_ngcontent-%COMP%] {\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n}\n.size-large[_ngcontent-%COMP%] {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.125rem;\n}\n.variant-primary[_ngcontent-%COMP%] {\n  background: #2196f3;\n  color: white;\n}\n.variant-primary[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #1976d2;\n}\n.variant-secondary[_ngcontent-%COMP%] {\n  background: #607d8b;\n  color: white;\n}\n.variant-secondary[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #455a64;\n}\n.variant-success[_ngcontent-%COMP%] {\n  background: #4caf50;\n  color: white;\n}\n.variant-success[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #388e3c;\n}\n.variant-danger[_ngcontent-%COMP%] {\n  background: #f44336;\n  color: white;\n}\n.variant-danger[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #d32f2f;\n}\n.variant-warning[_ngcontent-%COMP%] {\n  background: #ff9800;\n  color: white;\n}\n.variant-warning[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #f57c00;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 1em;\n  height: 1em;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.6s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=button.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonComponent, [{
    type: Component,
    args: [{ selector: "lib-button", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
      (click)="handleClick($event)"
    >
      @if (loading()) {
        <span class="spinner"></span>
      }
      <ng-content></ng-content>
    </button>
  `, styles: ["/* angular:styles/component:scss;7f6c7c8429894140a75bbb738917008f64bf134423e32a5439bdab035601040e;c:/Wokrspace/Angular/Architecture/arch-app/libs/ui-kit/src/lib/button/button.component.ts */\nbutton {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  border: none;\n  border-radius: 4px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-family: inherit;\n}\nbutton:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\nbutton:not(:disabled):hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\nbutton:not(:disabled):active {\n  transform: translateY(0);\n}\n.size-small {\n  padding: 0.375rem 0.75rem;\n  font-size: 0.875rem;\n}\n.size-medium {\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n}\n.size-large {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.125rem;\n}\n.variant-primary {\n  background: #2196f3;\n  color: white;\n}\n.variant-primary:not(:disabled):hover {\n  background: #1976d2;\n}\n.variant-secondary {\n  background: #607d8b;\n  color: white;\n}\n.variant-secondary:not(:disabled):hover {\n  background: #455a64;\n}\n.variant-success {\n  background: #4caf50;\n  color: white;\n}\n.variant-success:not(:disabled):hover {\n  background: #388e3c;\n}\n.variant-danger {\n  background: #f44336;\n  color: white;\n}\n.variant-danger:not(:disabled):hover {\n  background: #d32f2f;\n}\n.variant-warning {\n  background: #ff9800;\n  color: white;\n}\n.variant-warning:not(:disabled):hover {\n  background: #f57c00;\n}\n.full-width {\n  width: 100%;\n}\n.spinner {\n  width: 1em;\n  height: 1em;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: spin 0.6s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=button.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ButtonComponent, { className: "ButtonComponent", filePath: "libs/ui-kit/src/lib/button/button.component.ts", lineNumber: 147 });
})();

// libs/ui-kit/src/lib/card/card.component.ts
var _c02 = ["*", [["", "footer", ""]]];
var _c1 = ["*", "[footer]"];
function CardComponent_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle());
  }
}
function CardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CardComponent_Conditional_1_Conditional_3_Template, 2, 1, "p", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.title());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.subtitle() ? 3 : -1);
  }
}
function CardComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275projection(1, 1);
    \u0275\u0275elementEnd();
  }
}
var CardComponent = class _CardComponent {
  title = input();
  subtitle = input();
  footer = input(false);
  hoverable = input(false);
  clickable = input(false);
  padding = input("medium");
  cardClasses = () => {
    const classes = ["card"];
    if (this.hoverable())
      classes.push("hoverable");
    if (this.clickable())
      classes.push("clickable");
    if (this.padding() !== "medium") {
      classes.push(`padding-${this.padding()}`);
    }
    return classes.join(" ");
  };
  static \u0275fac = function CardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CardComponent, selectors: [["lib-card"]], inputs: { title: [1, "title"], subtitle: [1, "subtitle"], footer: [1, "footer"], hoverable: [1, "hoverable"], clickable: [1, "clickable"], padding: [1, "padding"] }, ngContentSelectors: _c1, decls: 5, vars: 4, consts: [[1, "card-header"], [1, "card-body"], [1, "card-footer"], [1, "subtitle"]], template: function CardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c02);
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275template(1, CardComponent_Conditional_1_Template, 4, 2, "div", 0);
      \u0275\u0275elementStart(2, "div", 1);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, CardComponent_Conditional_4_Template, 2, 0, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.cardClasses());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.title() ? 1 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.footer() ? 4 : -1);
    }
  }, dependencies: [CommonModule], styles: ["\n\n.card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease;\n}\n.card.hoverable[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.card.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.card-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #333;\n}\n.card-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0 0;\n  font-size: 0.875rem;\n  color: #666;\n}\n.card-body[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n.card-footer[_ngcontent-%COMP%] {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e0e0e0;\n  background: #fafafa;\n}\n.padding-none[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.padding-small[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n}\n.padding-large[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\n  padding: 2rem;\n}\n/*# sourceMappingURL=card.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CardComponent, [{
    type: Component,
    args: [{ selector: "lib-card", standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div [class]="cardClasses()">
      @if (title()) {
        <div class="card-header">
          <h3>{{ title() }}</h3>
          @if (subtitle()) {
            <p class="subtitle">{{ subtitle() }}</p>
          }
        </div>
      }

      <div class="card-body">
        <ng-content></ng-content>
      </div>

      @if (footer()) {
        <div class="card-footer">
          <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:scss;aaeed3769fdc30a080bd01956461213ec8a6bd92d18032976a9759da95afbcae;c:/Wokrspace/Angular/Architecture/arch-app/libs/ui-kit/src/lib/card/card.component.ts */\n.card {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  transition: box-shadow 0.2s ease;\n}\n.card.hoverable:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.card.clickable {\n  cursor: pointer;\n}\n.card-header {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.card-header h3 {\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #333;\n}\n.card-header .subtitle {\n  margin: 0.5rem 0 0 0;\n  font-size: 0.875rem;\n  color: #666;\n}\n.card-body {\n  padding: 1.5rem;\n}\n.card-footer {\n  padding: 1rem 1.5rem;\n  border-top: 1px solid #e0e0e0;\n  background: #fafafa;\n}\n.padding-none .card-body {\n  padding: 0;\n}\n.padding-small .card-body {\n  padding: 0.75rem;\n}\n.padding-large .card-body {\n  padding: 2rem;\n}\n/*# sourceMappingURL=card.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CardComponent, { className: "CardComponent", filePath: "libs/ui-kit/src/lib/card/card.component.ts", lineNumber: 99 });
})();

// libs/ui-kit/src/lib/ui-kit/ui-kit.component.ts
var UiKitComponent = class _UiKitComponent {
  static \u0275fac = function UiKitComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UiKitComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UiKitComponent, selectors: [["lib-ui-kit"]], decls: 2, vars: 0, template: function UiKitComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "p");
      \u0275\u0275text(1, "UiKit works!");
      \u0275\u0275elementEnd();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UiKitComponent, [{
    type: Component,
    args: [{ selector: "lib-ui-kit", imports: [], template: "<p>UiKit works!</p>\n" }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UiKitComponent, { className: "UiKitComponent", filePath: "libs/ui-kit/src/lib/ui-kit/ui-kit.component.ts", lineNumber: 9 });
})();

export {
  ButtonComponent,
  CardComponent
};
//# sourceMappingURL=chunk-XTH3Z2SC.js.map
