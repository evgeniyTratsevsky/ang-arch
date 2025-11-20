import {
  RouterOutlet,
  provideRouter
} from "./chunk-UE3L2BK6.js";
import {
  DomRendererFactory2,
  bootstrapApplication
} from "./chunk-RXZ5MNYA.js";
import {
  DOCUMENT,
  provideHttpClient,
  withInterceptors
} from "./chunk-Q32OZTGA.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  ChangeDetectionStrategy,
  Component,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  RendererFactory2,
  RuntimeError,
  inject,
  makeEnvironmentProviders,
  performanceMarkFeature,
  provideZoneChangeDetection,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵinvalidFactory
} from "./chunk-RQQNYMLD.js";

// node_modules/@angular/platform-browser/fesm2022/animations/async.mjs
var ANIMATION_PREFIX = "@";
var AsyncAnimationRendererFactory = class _AsyncAnimationRendererFactory {
  doc;
  delegate;
  zone;
  animationType;
  moduleImpl;
  _rendererFactoryPromise = null;
  scheduler = null;
  injector = inject(Injector);
  loadingSchedulerFn = inject(\u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
    optional: true
  });
  _engine;
  /**
   *
   * @param moduleImpl allows to provide a mock implmentation (or will load the animation module)
   */
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  /** @docs-private */
  ngOnDestroy() {
    this._engine?.flush();
  }
  /**
   * @internal
   */
  loadImpl() {
    const loadFn = () => this.moduleImpl ?? import("./chunk-AYDQX2OC.js").then((m) => m);
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch((e) => {
      throw new RuntimeError(5300, (typeof ngDevMode === "undefined" || ngDevMode) && "Async loading for animations package was enabled, but loading failed. Angular falls back to using regular rendering. No animations will be displayed and their styles won't be applied.");
    }).then(({
      \u0275createEngine,
      \u0275AnimationRendererFactory
    }) => {
      this._engine = \u0275createEngine(this.animationType, this.doc);
      const rendererFactory = new \u0275AnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  /**
   * This method is delegating the renderer creation to the factories.
   * It uses default factory while the animation factory isn't loaded
   * and will rely on the animation factory once it is loaded.
   *
   * Calling this method will trigger as side effect the loading of the animation module
   * if the renderered component uses animations.
   */
  createRenderer(hostElement, rendererType) {
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.\u0275type === 0) {
      return renderer;
    }
    if (typeof renderer.throwOnSyntheticProps === "boolean") {
      renderer.throwOnSyntheticProps = false;
    }
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (rendererType?.data?.["animation"] && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    this._rendererFactoryPromise?.then((animationRendererFactory) => {
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      this.scheduler ??= this.injector.get(ChangeDetectionScheduler, null, {
        optional: true
      });
      this.scheduler?.notify(
        10
        /* NotificationSource.AsyncAnimationsLoaded */
      );
    }).catch((e) => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    this.delegate.begin?.();
  }
  end() {
    this.delegate.end?.();
  }
  whenRenderingDone() {
    return this.delegate.whenRenderingDone?.() ?? Promise.resolve();
  }
  /**
   * Used during HMR to clear any cached data about a component.
   * @param componentId ID of the component that is being replaced.
   */
  componentReplaced(componentId) {
    this._engine?.flush();
    this.delegate.componentReplaced?.(componentId);
  }
  static \u0275fac = function AsyncAnimationRendererFactory_Factory(__ngFactoryType__) {
    \u0275\u0275invalidFactory();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AsyncAnimationRendererFactory,
    factory: _AsyncAnimationRendererFactory.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncAnimationRendererFactory, [{
    type: Injectable
  }], () => [{
    type: Document
  }, {
    type: RendererFactory2
  }, {
    type: NgZone
  }, {
    type: void 0
  }, {
    type: Promise
  }], null);
})();
var DynamicDelegationRenderer = class {
  delegate;
  // List of callbacks that need to be replayed on the animation renderer once its loaded
  replay = [];
  \u0275type = 1;
  constructor(delegate) {
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement) {
    this.delegate.removeChild(parent, oldChild, isHostElement);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push((renderer) => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
};
var \u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(ngDevMode ? "async_animation_loading_scheduler_fn" : "");
function provideAnimationsAsync(type = "animations") {
  performanceMarkFeature("NgAsyncAnimations");
  if (false) {
    type = "noop";
  }
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: (doc, renderer, zone) => {
      return new AsyncAnimationRendererFactory(doc, renderer, zone, type);
    },
    deps: [DOCUMENT, DomRendererFactory2, NgZone]
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === "noop" ? "NoopAnimations" : "BrowserAnimations"
  }]);
}

// apps/main-application/src/app/app.routes.ts
var appRoutes = [
  {
    path: "",
    loadComponent: () => import("./chunk-QV7EAE6O.js").then((m) => m.HomeComponent)
  },
  {
    path: "demo",
    loadComponent: () => import("./chunk-FTCEVJRO.js").then((m) => m.RealtimeDemoComponent)
  },
  {
    path: "interceptors",
    loadComponent: () => import("./chunk-JIGRMEXV.js").then((m) => m.InterceptorsDemoComponent)
  }
];

// apps/main-application/src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([])),
    provideAnimationsAsync()
  ]
};

// apps/main-application/src/app/app.component.ts
var AppComponent = class _AppComponent {
  title = "main-application";
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], styles: ['\n\n.container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 2rem;\n}\n.header[_ngcontent-%COMP%] {\n  text-align: center;\n  color: white;\n  margin-bottom: 3rem;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin: 0;\n  font-weight: 700;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  margin: 1rem 0 0 0;\n  opacity: 0.9;\n}\n.main-content[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.button-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.cards-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.cards-grid[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 1.5rem;\n}\n.cards-grid[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 0.75rem 0;\n  line-height: 1.6;\n}\n.commands[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n.commands[_ngcontent-%COMP%]   .command[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  padding: 1rem;\n  border-radius: 4px;\n  border-left: 4px solid #2196f3;\n}\n.commands[_ngcontent-%COMP%]   .command[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  display: block;\n  font-family: "Courier New", monospace;\n  font-size: 0.95rem;\n  color: #2196f3;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.commands[_ngcontent-%COMP%]   .command[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  font-size: 0.9rem;\n}\ncode[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  padding: 0.2rem 0.4rem;\n  border-radius: 3px;\n  font-family: "Courier New", monospace;\n  font-size: 0.9rem;\n  color: #e91e63;\n}\n/*# sourceMappingURL=app.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet], changeDetection: ChangeDetectionStrategy.OnPush, template: "<router-outlet />\n", styles: ['/* apps/main-application/src/app/app.component.scss */\n.container {\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  padding: 2rem;\n}\n.header {\n  text-align: center;\n  color: white;\n  margin-bottom: 3rem;\n}\n.header h1 {\n  font-size: 3rem;\n  margin: 0;\n  font-weight: 700;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.header .subtitle {\n  font-size: 1.5rem;\n  margin: 1rem 0 0 0;\n  opacity: 0.9;\n}\n.main-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.button-group {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1.5rem;\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1.5rem;\n}\n.cards-grid ul {\n  margin: 0;\n  padding-left: 1.5rem;\n}\n.cards-grid ul li {\n  margin: 0.75rem 0;\n  line-height: 1.6;\n}\n.commands {\n  display: grid;\n  gap: 1rem;\n}\n.commands .command {\n  background: #f5f5f5;\n  padding: 1rem;\n  border-radius: 4px;\n  border-left: 4px solid #2196f3;\n}\n.commands .command code {\n  display: block;\n  font-family: "Courier New", monospace;\n  font-size: 0.95rem;\n  color: #2196f3;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.commands .command p {\n  margin: 0;\n  color: #666;\n  font-size: 0.9rem;\n}\ncode {\n  background: #f5f5f5;\n  padding: 0.2rem 0.4rem;\n  border-radius: 3px;\n  font-family: "Courier New", monospace;\n  font-size: 0.9rem;\n  color: #e91e63;\n}\n/*# sourceMappingURL=app.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "apps/main-application/src/app/app.component.ts", lineNumber: 12 });
})();

// apps/main-application/src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/platform-browser/fesm2022/animations/async.mjs:
  (**
   * @license Angular v19.2.15
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.js.map
