import {
  RouterModule
} from "./chunk-UE3L2BK6.js";
import {
  ButtonComponent,
  CardComponent
} from "./chunk-XTH3Z2SC.js";
import "./chunk-RXZ5MNYA.js";
import {
  CommonModule
} from "./chunk-Q32OZTGA.js";
import {
  ChangeDetectionStrategy,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-RQQNYMLD.js";

// apps/main-application/src/app/features/home/home.component.ts
var HomeComponent = class _HomeComponent {
  navigateTo(path) {
    window.location.href = path;
  }
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 105, vars: 6, consts: [[1, "home"], [1, "header"], [1, "subtitle"], [1, "main-content"], [1, "cards-grid"], ["title", "\u{1F4E1} Real-Time Demo", 3, "hoverable", "clickable"], [1, "card-actions"], ["variant", "primary", 3, "clicked", "fullWidth"], ["title", "\u{1F527} HTTP Interceptors", 3, "hoverable", "clickable"], ["variant", "success", 3, "clicked", "fullWidth"], ["title", "\u{1F4E6} \u041C\u043E\u043D\u043E\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439", "subtitle", "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u0430"], [1, "features-grid"], [1, "feature"], ["title", "\u{1F3AF} Best Practices"], [1, "practices-grid"], [1, "practice"], ["title", "\u{1F680} \u041A\u043E\u043C\u0430\u043D\u0434\u044B Nx"], [1, "commands"], [1, "command"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1");
      \u0275\u0275text(3, "\u{1F3D7}\uFE0F Nx Monorepo Architecture");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5, "Angular Best Practices 2025");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "main", 3)(7, "div", 4)(8, "lib-card", 5)(9, "p");
      \u0275\u0275text(10, "\u0414\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "ul")(12, "li");
      \u0275\u0275text(13, "HTTP CRUD \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "li");
      \u0275\u0275text(15, "Real-time \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F (polling)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "li");
      \u0275\u0275text(17, "Mock \u0434\u0430\u043D\u043D\u044B\u0435");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "li");
      \u0275\u0275text(19, "Loading & Error states");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 6)(21, "lib-button", 7);
      \u0275\u0275listener("clicked", function HomeComponent_Template_lib_button_clicked_21_listener() {
        return ctx.navigateTo("/demo");
      });
      \u0275\u0275text(22, " \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0435\u043C\u043E ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "lib-card", 8)(24, "p");
      \u0275\u0275text(25, "\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "ul")(27, "li");
      \u0275\u0275text(28, "6 HTTP Interceptors");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "li");
      \u0275\u0275text(30, "Headers, Auth, Errors");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "li");
      \u0275\u0275text(32, "Logging, Cache, Loading");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "li");
      \u0275\u0275text(34, "\u0416\u0438\u0432\u044B\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 6)(36, "lib-button", 9);
      \u0275\u0275listener("clicked", function HomeComponent_Template_lib_button_clicked_36_listener() {
        return ctx.navigateTo("/interceptors");
      });
      \u0275\u0275text(37, " \u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C Interceptors ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(38, "lib-card", 10)(39, "div", 11)(40, "div", 12)(41, "h3");
      \u0275\u0275text(42, "\u2705 Nx Workspace");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "p");
      \u0275\u0275text(44, "\u0418\u043D\u0442\u0435\u0433\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043D\u043E\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "div", 12)(46, "h3");
      \u0275\u0275text(47, "\u2705 UI Kit");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p");
      \u0275\u0275text(49, "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0445 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div", 12)(51, "h3");
      \u0275\u0275text(52, "\u2705 Data Access");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "p");
      \u0275\u0275text(54, "HTTP CRUD + Real-Time \u0441\u0435\u0440\u0432\u0438\u0441\u044B");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "div", 12)(56, "h3");
      \u0275\u0275text(57, "\u2705 Interceptors");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "p");
      \u0275\u0275text(59, "6 HTTP interceptors");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(60, "lib-card", 13)(61, "div", 14)(62, "div", 15);
      \u0275\u0275text(63, "\u2705 Standalone \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 15);
      \u0275\u0275text(65, "\u2705 OnPush everywhere");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 15);
      \u0275\u0275text(67, "\u2705 Signal inputs");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "div", 15);
      \u0275\u0275text(69, "\u2705 Async pipe");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div", 15);
      \u0275\u0275text(71, "\u2705 HTTP Interceptors");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "div", 15);
      \u0275\u0275text(73, "\u2705 Jest \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "div", 15);
      \u0275\u0275text(75, "\u2705 ESLint + Prettier");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "div", 15);
      \u0275\u0275text(77, "\u2705 TypeScript strict");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(78, "lib-card", 16)(79, "div", 17)(80, "div", 18)(81, "code");
      \u0275\u0275text(82, "nx serve main-application");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "p");
      \u0275\u0275text(84, "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(85, "div", 18)(86, "code");
      \u0275\u0275text(87, "nx build main-application");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "p");
      \u0275\u0275text(89, "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(90, "div", 18)(91, "code");
      \u0275\u0275text(92, "nx test main-application");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(93, "p");
      \u0275\u0275text(94, "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u044B");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(95, "div", 18)(96, "code");
      \u0275\u0275text(97, "nx lint main-application");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(98, "p");
      \u0275\u0275text(99, "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043A\u043E\u0434");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(100, "div", 18)(101, "code");
      \u0275\u0275text(102, "nx graph");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(103, "p");
      \u0275\u0275text(104, "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0433\u0440\u0430\u0444 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0435\u0439");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("hoverable", true)("clickable", true);
      \u0275\u0275advance(13);
      \u0275\u0275property("fullWidth", true);
      \u0275\u0275advance(2);
      \u0275\u0275property("hoverable", true)("clickable", true);
      \u0275\u0275advance(13);
      \u0275\u0275property("fullWidth", true);
    }
  }, dependencies: [CommonModule, RouterModule, CardComponent, ButtonComponent], styles: ['\n\n.home[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 3rem;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin: 0;\n  color: #333;\n}\n.header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: #666;\n  margin: 1rem 0 0 0;\n}\n.main-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.cards-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  gap: 2rem;\n}\n.card-actions[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\nul[_ngcontent-%COMP%] {\n  margin: 1rem 0;\n  padding-left: 1.5rem;\n}\nul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin: 0.5rem 0;\n}\n.features-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n.features-grid[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1rem;\n}\n.features-grid[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.2rem;\n}\n.features-grid[_ngcontent-%COMP%]   .feature[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n}\n.practices-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.practices-grid[_ngcontent-%COMP%]   .practice[_ngcontent-%COMP%] {\n  padding: 1rem;\n  background: #f5f5f5;\n  border-radius: 4px;\n  text-align: center;\n  font-weight: 500;\n}\n.commands[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n.commands[_ngcontent-%COMP%]   .command[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  padding: 1rem;\n  border-radius: 4px;\n  border-left: 4px solid #2196f3;\n}\n.commands[_ngcontent-%COMP%]   .command[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  display: block;\n  font-family: "Courier New", monospace;\n  font-size: 0.95rem;\n  color: #2196f3;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.commands[_ngcontent-%COMP%]   .command[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  font-size: 0.9rem;\n}\n/*# sourceMappingURL=home.component.css.map */'], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HomeComponent, [{
    type: Component,
    args: [{ selector: "app-home", standalone: true, imports: [CommonModule, RouterModule, CardComponent, ButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="home">
      <header class="header">
        <h1>\u{1F3D7}\uFE0F Nx Monorepo Architecture</h1>
        <p class="subtitle">Angular Best Practices 2025</p>
      </header>

      <main class="main-content">
        <div class="cards-grid">
          <lib-card title="\u{1F4E1} Real-Time Demo" [hoverable]="true" [clickable]="true">
            <p>\u0414\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B:</p>
            <ul>
              <li>HTTP CRUD \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438</li>
              <li>Real-time \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F (polling)</li>
              <li>Mock \u0434\u0430\u043D\u043D\u044B\u0435</li>
              <li>Loading & Error states</li>
            </ul>
            <div class="card-actions">
              <lib-button
                variant="primary"
                [fullWidth]="true"
                (clicked)="navigateTo('/demo')"
              >
                \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0435\u043C\u043E
              </lib-button>
            </div>
          </lib-card>

          <lib-card title="\u{1F527} HTTP Interceptors" [hoverable]="true" [clickable]="true">
            <p>\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F:</p>
            <ul>
              <li>6 HTTP Interceptors</li>
              <li>Headers, Auth, Errors</li>
              <li>Logging, Cache, Loading</li>
              <li>\u0416\u0438\u0432\u044B\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u044B</li>
            </ul>
            <div class="card-actions">
              <lib-button
                variant="success"
                [fullWidth]="true"
                (clicked)="navigateTo('/interceptors')"
              >
                \u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C Interceptors
              </lib-button>
            </div>
          </lib-card>
        </div>

        <lib-card
          title="\u{1F4E6} \u041C\u043E\u043D\u043E\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439"
          subtitle="\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u043F\u0440\u043E\u0435\u043A\u0442\u0430"
        >
          <div class="features-grid">
            <div class="feature">
              <h3>\u2705 Nx Workspace</h3>
              <p>\u0418\u043D\u0442\u0435\u0433\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043D\u043E\u0440\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439</p>
            </div>
            <div class="feature">
              <h3>\u2705 UI Kit</h3>
              <p>\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C\u044B\u0445 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432</p>
            </div>
            <div class="feature">
              <h3>\u2705 Data Access</h3>
              <p>HTTP CRUD + Real-Time \u0441\u0435\u0440\u0432\u0438\u0441\u044B</p>
            </div>
            <div class="feature">
              <h3>\u2705 Interceptors</h3>
              <p>6 HTTP interceptors</p>
            </div>
          </div>
        </lib-card>

        <lib-card
          title="\u{1F3AF} Best Practices"
        >
          <div class="practices-grid">
            <div class="practice">\u2705 Standalone \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B</div>
            <div class="practice">\u2705 OnPush everywhere</div>
            <div class="practice">\u2705 Signal inputs</div>
            <div class="practice">\u2705 Async pipe</div>
            <div class="practice">\u2705 HTTP Interceptors</div>
            <div class="practice">\u2705 Jest \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435</div>
            <div class="practice">\u2705 ESLint + Prettier</div>
            <div class="practice">\u2705 TypeScript strict</div>
          </div>
        </lib-card>

        <lib-card
          title="\u{1F680} \u041A\u043E\u043C\u0430\u043D\u0434\u044B Nx"
        >
          <div class="commands">
            <div class="command">
              <code>nx serve main-application</code>
              <p>\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435</p>
            </div>
            <div class="command">
              <code>nx build main-application</code>
              <p>\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435</p>
            </div>
            <div class="command">
              <code>nx test main-application</code>
              <p>\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u044B</p>
            </div>
            <div class="command">
              <code>nx lint main-application</code>
              <p>\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043A\u043E\u0434</p>
            </div>
            <div class="command">
              <code>nx graph</code>
              <p>\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0433\u0440\u0430\u0444 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0435\u0439</p>
            </div>
          </div>
        </lib-card>
      </main>
    </div>
  `, styles: ['/* angular:styles/component:scss;9a3e24b4261179c0bb8e0be8ab354a02fbc396f66ecafc5f8368a71a67614d52;c:/Wokrspace/Angular/Architecture/arch-app/apps/main-application/src/app/features/home/home.component.ts */\n.home {\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.header {\n  text-align: center;\n  margin-bottom: 3rem;\n}\n.header h1 {\n  font-size: 3rem;\n  margin: 0;\n  color: #333;\n}\n.header .subtitle {\n  font-size: 1.5rem;\n  color: #666;\n  margin: 1rem 0 0 0;\n}\n.main-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2rem;\n}\n.cards-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  gap: 2rem;\n}\n.card-actions {\n  margin-top: 1.5rem;\n}\nul {\n  margin: 1rem 0;\n  padding-left: 1.5rem;\n}\nul li {\n  margin: 0.5rem 0;\n}\n.features-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1.5rem;\n}\n.features-grid .feature {\n  text-align: center;\n  padding: 1rem;\n}\n.features-grid .feature h3 {\n  margin: 0 0 0.5rem 0;\n  font-size: 1.2rem;\n}\n.features-grid .feature p {\n  margin: 0;\n  color: #666;\n}\n.practices-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 1rem;\n}\n.practices-grid .practice {\n  padding: 1rem;\n  background: #f5f5f5;\n  border-radius: 4px;\n  text-align: center;\n  font-weight: 500;\n}\n.commands {\n  display: grid;\n  gap: 1rem;\n}\n.commands .command {\n  background: #f5f5f5;\n  padding: 1rem;\n  border-radius: 4px;\n  border-left: 4px solid #2196f3;\n}\n.commands .command code {\n  display: block;\n  font-family: "Courier New", monospace;\n  font-size: 0.95rem;\n  color: #2196f3;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}\n.commands .command p {\n  margin: 0;\n  color: #666;\n  font-size: 0.9rem;\n}\n/*# sourceMappingURL=home.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "apps/main-application/src/app/features/home/home.component.ts", lineNumber: 239 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-QV7EAE6O.js.map
