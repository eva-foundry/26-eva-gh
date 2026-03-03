import { LitElement, css, html } from "lit";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, e$3 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$3 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$3.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$3.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$5 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), S$1 = (s2, o2) => {
  if (e$3) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$3.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$3 = e$3 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$5(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$2, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$4, getOwnPropertySymbols: o$2, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$1 = c$2 ? c$2.emptyScript : "", p$2 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$3 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b = { attribute: true, type: String, converter: u$3, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$2(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$4(t3), ...o$2(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$3(s3));
    } else void 0 !== s2 && i2.push(c$3(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a = this.constructor.l) == null ? void 0 : _a.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a = t2.hostConnected) == null ? void 0 : _a.call(t2));
  }
  removeController(t2) {
    var _a;
    (_a = this._$EO) == null ? void 0 : _a.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a = this._$EO) == null ? void 0 : _a.forEach((t2) => {
      var _a2;
      return (_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a;
    (_a = this._$EO) == null ? void 0 : _a.forEach((t2) => {
      var _a2;
      return (_a2 = t2.hostDisconnected) == null ? void 0 : _a2.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    var _a;
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== ((_a = i2.converter) == null ? void 0 : _a.toAttribute) ? i2.converter : u$3).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a, _b;
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a = t3.converter) == null ? void 0 : _a.fromAttribute) ? t3.converter : u$3;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    var _a;
    if (void 0 !== t2) {
      const e2 = this.constructor, h2 = this[t2];
      if (i2 ?? (i2 = e2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === ((_a = this._$Ej) == null ? void 0 : _a.get(t2)) && !this.hasAttribute(e2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a = this._$EO) == null ? void 0 : _a.forEach((t3) => {
        var _a2;
        return (_a2 = t3.hostUpdate) == null ? void 0 : _a2.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a;
    (_a = this._$EO) == null ? void 0 : _a.forEach((t3) => {
      var _a2;
      return (_a2 = t3.hostUpdated) == null ? void 0 : _a2.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2 == null ? void 0 : p$2({ ReactiveElement: y }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = { attribute: true, type: String, converter: u$3, reflect: false, hasChanged: f$1 }, r$3 = (t2 = o$1, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n$1(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$3(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r$2(r2) {
  return n$1({ ...r2, state: true, attribute: false });
}
const globalMessages$1 = /* @__PURE__ */ new Map();
function registerMessages$1(componentName, messages) {
  globalMessages$1.set(componentName, messages);
}
function getMessage$1(componentName, key, locale, fallback) {
  const componentMessages = globalMessages$1.get(componentName);
  if (!componentMessages) {
    return fallback ?? key;
  }
  const localeMessages = componentMessages[locale];
  if (!localeMessages) {
    return fallback ?? key;
  }
  return localeMessages[key] ?? fallback ?? key;
}
function formatDate(date, locale, options) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
function formatNumber(value, locale, options) {
  return new Intl.NumberFormat(locale, options).format(value);
}
function formatCurrency(value, locale, currency = "CAD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(value);
}
registerMessages$1("eva-button", {
  "en-CA": {
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    "sign-in": "Sign in"
  },
  "fr-CA": {
    loading: "Chargement...",
    submit: "Soumettre",
    cancel: "Annuler",
    "sign-in": "Se connecter"
  }
});
registerMessages$1("eva-alert", {
  "en-CA": {
    "dismiss-alert": "Dismiss alert",
    "alert-dismissed": "Alert dismissed",
    success: "Success",
    info: "Information",
    warning: "Warning",
    danger: "Error"
  },
  "fr-CA": {
    "dismiss-alert": "Rejeter l'alerte",
    "alert-dismissed": "Alerte rejetée",
    success: "Succès",
    info: "Information",
    warning: "Avertissement",
    danger: "Erreur"
  }
});
registerMessages$1("eva-card", {
  "en-CA": {
    // Card component doesn't have default messages yet
  },
  "fr-CA": {
    // Card component doesn't have default messages yet
  }
});
registerMessages$1("eva-modal", {
  "en-CA": {
    close: "Close modal",
    "modal-closed": "Modal closed"
  },
  "fr-CA": {
    close: "Fermer le modal",
    "modal-closed": "Modal fermé"
  }
});
registerMessages$1("eva-chat-panel", {
  "en-CA": {
    title: "EVA Assistant",
    you: "You",
    eva: "EVA",
    system: "System",
    placeholder: "Type your message...",
    "input-label": "Chat message input",
    send: "Send message",
    "message-sent": "Message sent"
  },
  "fr-CA": {
    title: "Assistant EVA",
    you: "Vous",
    eva: "EVA",
    system: "Système",
    placeholder: "Tapez votre message...",
    "input-label": "Saisie de message de chat",
    send: "Envoyer le message",
    "message-sent": "Message envoyé"
  }
});
const globalMessages = /* @__PURE__ */ new Map();
let currentLocale$1 = "en-CA";
function setGlobalLocale$1(locale) {
  const previousLocale = currentLocale$1;
  const normalizedLocale = normalizeLocale(locale);
  currentLocale$1 = normalizedLocale;
  document.documentElement.lang = normalizedLocale;
  try {
    localStorage.setItem("eva-locale", normalizedLocale);
  } catch (e2) {
    console.warn("[i18n] Failed to persist locale to localStorage:", e2);
  }
  window.dispatchEvent(new CustomEvent("eva-locale-change", {
    detail: { locale: normalizedLocale, previousLocale }
  }));
}
function normalizeLocale(locale) {
  if (locale === "en" || locale === "en-CA") {
    return "en-CA";
  }
  if (locale === "fr" || locale === "fr-CA") {
    return "fr-CA";
  }
  return "en-CA";
}
function initializeLocale() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get("lang");
  if (urlLang) {
    const normalized = normalizeLocale(urlLang);
    setGlobalLocale$1(normalized);
    return;
  }
  try {
    const storedLocale = localStorage.getItem("eva-locale");
    if (storedLocale) {
      setGlobalLocale$1(storedLocale);
      return;
    }
  } catch (e2) {
  }
  const browserLang = navigator.language;
  if (browserLang.startsWith("fr")) {
    setGlobalLocale$1("fr-CA");
  } else {
    setGlobalLocale$1("en-CA");
  }
}
function registerMessages(componentName, messages) {
  globalMessages.set(componentName, messages);
}
function getMessage(componentName, key, locale, fallback) {
  var _a;
  const targetLocale = locale || currentLocale$1;
  const componentMessages = globalMessages.get(componentName);
  if (!componentMessages) {
    return fallback ?? key;
  }
  const localeMessages = componentMessages[targetLocale];
  if (!localeMessages) {
    return fallback ?? key;
  }
  const message = localeMessages[key];
  if (message) {
    return message;
  }
  if (targetLocale === "fr-CA") {
    const enMessage = (_a = componentMessages["en-CA"]) == null ? void 0 : _a[key];
    if (enMessage) {
      console.warn(`[i18n] Missing French translation for ${componentName}.${key}`);
      return enMessage;
    }
  }
  return fallback ?? key;
}
const commonMessages = {
  "en-CA": {
    close: "Close",
    submit: "Submit",
    cancel: "Cancel",
    required: "Required",
    optional: "Optional",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",
    yes: "Yes",
    no: "No",
    search: "Search",
    menu: "Menu",
    home: "Home",
    language: "Language",
    english: "English",
    french: "Français"
  },
  "fr-CA": {
    close: "Fermer",
    submit: "Soumettre",
    cancel: "Annuler",
    required: "Obligatoire",
    optional: "Optionnel",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    warning: "Avertissement",
    info: "Information",
    yes: "Oui",
    no: "Non",
    search: "Recherche",
    menu: "Menu",
    home: "Accueil",
    language: "Langue",
    english: "Anglais",
    french: "Français"
  }
};
registerMessages("common", commonMessages);
if (typeof window !== "undefined") {
  initializeLocale();
}
let currentLocale = "en-CA";
const localeListeners = /* @__PURE__ */ new Set();
function getGlobalLocale() {
  return currentLocale;
}
function setGlobalLocale(locale) {
  currentLocale = locale;
  localeListeners.forEach((listener) => listener(locale));
}
function subscribeToLocale(listener) {
  localeListeners.add(listener);
  return () => localeListeners.delete(listener);
}
function getSystemLocale() {
  const browserLocale = navigator.language || "en-CA";
  if (browserLocale.toLowerCase().startsWith("fr")) {
    return "fr-CA";
  }
  return "en-CA";
}
class FocusTrap {
  constructor(container) {
    this.handleKeydown = (event) => {
      var _a, _b;
      if (event.key !== "Tab") {
        return;
      }
      if (event.shiftKey) {
        if (document.activeElement === this.firstFocusable) {
          event.preventDefault();
          (_a = this.lastFocusable) == null ? void 0 : _a.focus();
        }
      } else {
        if (document.activeElement === this.lastFocusable) {
          event.preventDefault();
          (_b = this.firstFocusable) == null ? void 0 : _b.focus();
        }
      }
    };
    this.container = container;
  }
  /**
   * Activate focus trap
   */
  activate() {
    var _a;
    this.previouslyFocused = document.activeElement;
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) {
      return;
    }
    this.firstFocusable = focusableElements[0];
    this.lastFocusable = focusableElements[focusableElements.length - 1];
    (_a = this.firstFocusable) == null ? void 0 : _a.focus();
    this.container.addEventListener("keydown", this.handleKeydown);
  }
  /**
   * Deactivate focus trap
   */
  deactivate() {
    var _a;
    this.container.removeEventListener("keydown", this.handleKeydown);
    (_a = this.previouslyFocused) == null ? void 0 : _a.focus();
  }
  /**
   * Get all focusable elements in container
   */
  getFocusableElements() {
    const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.container.querySelectorAll(selector)).filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
    );
  }
}
class LiveRegionManager {
  constructor() {
    this.createLiveRegion();
  }
  /**
   * Create hidden live region in DOM
   */
  createLiveRegion() {
    if (this.liveRegion) {
      return;
    }
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("role", "status");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.style.position = "absolute";
    this.liveRegion.style.left = "-10000px";
    this.liveRegion.style.width = "1px";
    this.liveRegion.style.height = "1px";
    this.liveRegion.style.overflow = "hidden";
    document.body.appendChild(this.liveRegion);
  }
  /**
   * Announce message to screen readers
   * @param message Message to announce
   * @param priority 'polite' or 'assertive'
   */
  announce(message, priority = "polite") {
    if (!this.liveRegion) {
      return;
    }
    this.liveRegion.setAttribute("aria-live", priority);
    this.liveRegion.textContent = "";
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 100);
  }
  /**
   * Clean up live region
   */
  destroy() {
    if (this.liveRegion) {
      document.body.removeChild(this.liveRegion);
      this.liveRegion = void 0;
    }
  }
}
let globalLiveRegion;
function getLiveRegionManager() {
  if (!globalLiveRegion) {
    globalLiveRegion = new LiveRegionManager();
  }
  return globalLiveRegion;
}
function isFocusable(element) {
  if (element.hasAttribute("disabled") || element.getAttribute("tabindex") === "-1") {
    return false;
  }
  const tagName = element.tagName.toLowerCase();
  const focusableTags = ["a", "button", "input", "select", "textarea"];
  if (focusableTags.includes(tagName)) {
    return true;
  }
  return element.hasAttribute("tabindex") && element.getAttribute("tabindex") !== "-1";
}
function getNextFocusable(current, container) {
  const focusables = Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
  const currentIndex = focusables.indexOf(current);
  if (currentIndex === -1 || currentIndex === focusables.length - 1) {
    return null;
  }
  return focusables[currentIndex + 1] ?? null;
}
function getPreviousFocusable(current, container) {
  const focusables = Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
  const currentIndex = focusables.indexOf(current);
  if (currentIndex <= 0) {
    return null;
  }
  return focusables[currentIndex - 1] ?? null;
}
function handleArrowKeyNavigation(event, container, options = {}) {
  var _a;
  const { vertical = true, horizontal = false, loop = true } = options;
  const focusables = Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), [role="button"], [role="menuitem"], [role="option"]'
    )
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
  if (focusables.length === 0) {
    return;
  }
  const currentIndex = focusables.indexOf(document.activeElement);
  let nextIndex = currentIndex;
  if (vertical && event.key === "ArrowDown" || horizontal && event.key === "ArrowRight") {
    event.preventDefault();
    nextIndex = currentIndex + 1;
    if (nextIndex >= focusables.length) {
      nextIndex = loop ? 0 : focusables.length - 1;
    }
  } else if (vertical && event.key === "ArrowUp" || horizontal && event.key === "ArrowLeft") {
    event.preventDefault();
    nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      nextIndex = loop ? focusables.length - 1 : 0;
    }
  } else if (event.key === "Home") {
    event.preventDefault();
    nextIndex = 0;
  } else if (event.key === "End") {
    event.preventDefault();
    nextIndex = focusables.length - 1;
  }
  (_a = focusables[nextIndex]) == null ? void 0 : _a.focus();
}
var __defProp$a = Object.defineProperty;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(target, key, result) || result;
  if (result) __defProp$a(target, key, result);
  return result;
};
class EVAElement extends LitElement {
  constructor() {
    super(...arguments);
    this.locale = getGlobalLocale();
    this.ariaLabel = null;
    this.ariaDescribedBy = null;
    this.disabled = false;
    this.componentName = "eva-element";
    this.componentId = this._generateId();
  }
  /**
   * Generate unique component ID
   * @private
   */
  _generateId() {
    return `eva-${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * Lifecycle: Connect to global locale
   */
  connectedCallback() {
    super.connectedCallback();
    this._localeUnsubscribe = subscribeToLocale((locale) => {
      this.locale = locale;
    });
  }
  /**
   * Lifecycle: Disconnect from global locale
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._localeUnsubscribe) {
      this._localeUnsubscribe();
    }
  }
  /**
   * Lifecycle: Called when properties change
   */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("locale")) {
      this.setAttribute("lang", this.locale);
    }
    if (changedProperties.has("disabled")) {
      this.setAttribute("aria-disabled", String(this.disabled));
    }
  }
  /**
   * Get localized message from component's message registry
   * Checks both i18n systems (utils/i18n and i18n/locale-manager)
   * @param key Message key
   * @param fallback Fallback text if key not found
   * @returns Localized message
   */
  t(key, fallback) {
    let message = getMessage$1(this.componentName, key, this.locale, "");
    if (!message || message === key) {
      message = getMessage(this.componentName, key, this.locale, "");
    }
    return message || fallback || key;
  }
  /**
   * Alias for t() - Get localized message
   * @param key Message key
   * @param fallback Fallback text if key not found
   * @returns Localized message
   */
  getMessage(key, fallback) {
    return this.t(key, fallback);
  }
  /**
   * Announce message to screen readers using ARIA live region
   * @param message Message to announce
   * @param priority 'polite' or 'assertive'
   */
  announce(message, priority = "polite") {
    const liveRegion = getLiveRegionManager();
    liveRegion.announce(message, priority);
  }
  /**
   * Emit custom event with detail
   * @param eventName Event name (without component prefix)
   * @param detail Event detail object
   * @param options Event options (bubbles, composed, cancelable)
   * @returns True if event was not cancelled
   */
  emitEvent(eventName, detail, options = {}) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: options.bubbles ?? true,
      composed: options.composed ?? true,
      cancelable: options.cancelable ?? false
    });
    return this.dispatchEvent(event);
  }
  /**
   * Focus management - move focus to first focusable element in component
   */
  focusElement() {
    var _a;
    const focusable = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus();
    }
  }
  /**
   * Get GC Design System token value
   * @param tokenPath Path to token (e.g., 'colors.fipRed')
   * @returns Token value
   */
  getToken(tokenPath) {
    return `var(--gc-${tokenPath.replace(/\./g, "-")})`;
  }
  /**
   * Handle keyboard navigation (common patterns)
   * @param event Keyboard event
   */
  handleKeyboard(event) {
    console.log(`[Keyboard]: ${event.key}`);
  }
  /**
   * Check if component is in high contrast mode (Windows High Contrast)
   * @returns True if high contrast mode is active
   */
  isHighContrastMode() {
    return window.matchMedia("(prefers-contrast: high)").matches;
  }
  /**
   * Check if user prefers reduced motion
   * @returns True if reduced motion is preferred
   */
  prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}
__decorateClass$a([
  n$1({ type: String, reflect: true })
], EVAElement.prototype, "locale");
__decorateClass$a([
  n$1({ type: String, attribute: "aria-label" })
], EVAElement.prototype, "ariaLabel");
__decorateClass$a([
  n$1({ type: String, attribute: "aria-describedby" })
], EVAElement.prototype, "ariaDescribedBy");
__decorateClass$a([
  n$1({ type: Boolean, reflect: true })
], EVAElement.prototype, "disabled");
__decorateClass$a([
  n$1({ type: String, attribute: "component-id" })
], EVAElement.prototype, "componentId");
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$9(target, key, result);
  return result;
};
let EVAButton = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-button";
    this.variant = "primary";
    this.type = "button";
    this.size = "medium";
    this.fullWidth = false;
  }
  render() {
    return html`
      <button
        type="${this.type}"
        ?disabled="${this.disabled}"
        aria-label="${this.ariaLabel || ""}"
        aria-describedby="${this.ariaDescribedBy || ""}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeydown}"
      >
        <slot></slot>
      </button>
    `;
  }
  _handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("eva-click", {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true
      })
    );
  }
  _handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      if (event.key === " ") {
        event.preventDefault();
      }
      event.target.click();
    }
  }
};
EVAButton.styles = css`
    :host {
      display: inline-block;
    }

    :host([full-width]) {
      display: block;
    }

    button {
      /* Reset default button styles */
      margin: 0;
      border: none;
      background: none;
      font-family: Noto Sans, sans-serif;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition-property: background-color, border-color, color, box-shadow;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;

      /* WCAG 2.2 AAA: 44px minimum touch target */
      min-height: 44px;
      min-width: 44px;
      padding: 0.75rem 1rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;

      /* Focus outline (WCAG 2.2 AAA: 3px minimum) */
      outline-offset: 2px;
    }

    button:focus-visible {
      outline: 3px solid #26374A;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    /* Full width */
    :host([full-width]) button {
      width: 100%;
    }

    /* Size variants */
    :host([size='small']) button {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }

    :host([size='large']) button {
      padding: 1rem 1.5rem;
      font-size: 1.25rem;
    }

    /* Variant: Supertask (most prominent) */
    :host([variant='supertask']) button {
      background-color: #af3c43;
      color: #ffffff;
      font-weight: 700;
      border: 2px solid #af3c43;
    }

    :host([variant='supertask']) button:hover:not(:disabled) {
      background-color: #8c2f35;
      border-color: #8c2f35;
    }

    :host([variant='supertask']) button:active:not(:disabled) {
      background-color: #6d2429;
      border-color: #6d2429;
    }

    /* Variant: Primary */
    :host([variant='primary']) button {
      background-color: #284162;
      color: #ffffff;
      border: 2px solid #284162;
    }

    :host([variant='primary']) button:hover:not(:disabled) {
      background-color: #1c2d46;
      border-color: #1c2d46;
    }

    :host([variant='primary']) button:active:not(:disabled) {
      background-color: #15202f;
      border-color: #15202f;
    }

    /* Variant: Secondary */
    :host([variant='secondary']) button {
      background-color: #ffffff;
      color: #284162;
      border: 2px solid #284162;
    }

    :host([variant='secondary']) button:hover:not(:disabled) {
      background-color: #f5f5f5;
    }

    :host([variant='secondary']) button:active:not(:disabled) {
      background-color: #e1e4e7;
    }

    /* Variant: Danger */
    :host([variant='danger']) button {
      background-color: #d3080c;
      color: #ffffff;
      border: 2px solid #d3080c;
    }

    :host([variant='danger']) button:hover:not(:disabled) {
      background-color: #a90609;
      border-color: #a90609;
    }

    :host([variant='danger']) button:active:not(:disabled) {
      background-color: #800507;
      border-color: #800507;
    }

    /* Variant: Link (looks like a hyperlink) */
    :host([variant='link']) button {
      background-color: transparent;
      color: #284162;
      border: none;
      text-decoration: underline;
      min-height: auto;
      min-width: auto;
      padding: 0.25rem 0.5rem;
    }

    :host([variant='link']) button:hover:not(:disabled) {
      color: #1c2d46;
    }

    /* Variant: Contextual Sign-in */
    :host([variant='contextual-signin']) button {
      background-color: #f5f5f5;
      color: #333333;
      border: 1px solid #666666;
    }

    :host([variant='contextual-signin']) button:hover:not(:disabled) {
      background-color: #e1e4e7;
    }

    /* High contrast mode support (Windows High Contrast) */
    @media (prefers-contrast: high) {
      button {
        border-width: 2px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      button {
        transition: none;
      }
    }
  `;
__decorateClass$9([
  n$1({ type: String, reflect: true })
], EVAButton.prototype, "variant", 2);
__decorateClass$9([
  n$1({ type: String })
], EVAButton.prototype, "type", 2);
__decorateClass$9([
  n$1({ type: String, reflect: true })
], EVAButton.prototype, "size", 2);
__decorateClass$9([
  n$1({ type: Boolean, reflect: true })
], EVAButton.prototype, "fullWidth", 2);
EVAButton = __decorateClass$9([
  t$4("eva-button")
], EVAButton);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
let EVACard = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-card";
    this.variant = "default";
    this.padding = "medium";
  }
  render() {
    return html`
      <div class="card-container" role="region">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-body">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
};
EVACard.styles = css`
    :host {
      display: block;
      background-color: #ffffff;
      color: #333333;
    }

    /* Variant: Default */
    :host([variant='default']) {
      border: none;
    }

    /* Variant: Bordered */
    :host([variant='bordered']) {
      border: 1px solid #e1e4e7;
      border-radius: 0.25rem;
    }

    /* Variant: Elevated (with shadow) */
    :host([variant='elevated']) {
      border: 1px solid #e1e4e7;
      border-radius: 0.25rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    /* Padding variants */
    .card-container {
      display: flex;
      flex-direction: column;
    }

    :host([padding='none']) .card-container {
      padding: 0;
    }

    :host([padding='small']) .card-container {
      padding: 0.5rem;
    }

    :host([padding='medium']) .card-container {
      padding: 1rem;
    }

    :host([padding='large']) .card-container {
      padding: 1.5rem;
    }

    /* Header slot */
    .card-header {
      border-bottom: 1px solid #e1e4e7;
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .card-header:empty {
      display: none;
    }

    /* Footer slot */
    .card-footer {
      border-top: 1px solid #e1e4e7;
      padding-top: 0.75rem;
      margin-top: 0.75rem;
    }

    .card-footer:empty {
      display: none;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      :host {
        border: 2px solid currentColor;
      }
    }
  `;
__decorateClass$8([
  n$1({ type: String, reflect: true })
], EVACard.prototype, "variant", 2);
__decorateClass$8([
  n$1({ type: String, reflect: true })
], EVACard.prototype, "padding", 2);
EVACard = __decorateClass$8([
  t$4("eva-card")
], EVACard);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
let EVAAlert = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-alert";
    this.type = "info";
    this.dismissible = false;
    this.visible = true;
    this.live = "polite";
  }
  render() {
    return html`
      <div
        class="alert-container"
        role="alert"
        aria-live="${this.live}"
        aria-atomic="true"
      >
        <div class="alert-content">
          <div class="alert-title">
            <slot name="title"></slot>
          </div>
          <div class="alert-message">
            <slot></slot>
          </div>
        </div>
        ${this.dismissible ? html`
              <button
                class="alert-dismiss"
                aria-label="${this.t("dismiss-alert", "Dismiss alert")}"
                @click="${this._handleDismiss}"
              >
                ×
              </button>
            ` : ""}
      </div>
    `;
  }
  _handleDismiss() {
    this.visible = false;
    this.announce(this.t("alert-dismissed", "Alert dismissed"), "polite");
    this.dispatchEvent(
      new CustomEvent("eva-dismiss", {
        bubbles: true,
        composed: true
      })
    );
  }
};
EVAAlert.styles = css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    :host([visible='false']) {
      display: none;
    }

    .alert-container {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-left: 4px solid;
      border-radius: 0.25rem;
      position: relative;
    }

    .alert-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .alert-title {
      font-weight: 700;
      font-size: 1rem;
      line-height: 1.5;
    }

    .alert-title:empty {
      display: none;
    }

    .alert-message {
      font-size: 1rem;
      line-height: 1.5;
    }

    .alert-dismiss {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      margin-left: 1rem;
      color: inherit;
      font-size: 1.25rem;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 200ms ease-in-out;
      min-height: 44px;
      min-width: 44px;
    }

    .alert-dismiss:hover {
      opacity: 1;
    }

    .alert-dismiss:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    /* Type: Success */
    :host([type='success']) .alert-container {
      background-color: #d4edda;
      color: #155724;
      border-left-color: #278400;
    }

    /* Type: Info */
    :host([type='info']) .alert-container {
      background-color: #d1ecf1;
      color: #0c5460;
      border-left-color: #269abc;
    }

    /* Type: Warning */
    :host([type='warning']) .alert-container {
      background-color: #fff3cd;
      color: #856404;
      border-left-color: #ff9900;
    }

    /* Type: Danger */
    :host([type='danger']) .alert-container {
      background-color: #f8d7da;
      color: #721c24;
      border-left-color: #d3080c;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .alert-container {
        border: 2px solid currentColor;
        border-left-width: 4px;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .alert-dismiss {
        transition: none;
      }
    }
  `;
__decorateClass$7([
  n$1({ type: String, reflect: true })
], EVAAlert.prototype, "type", 2);
__decorateClass$7([
  n$1({ type: Boolean, reflect: true })
], EVAAlert.prototype, "dismissible", 2);
__decorateClass$7([
  n$1({ type: Boolean, reflect: true })
], EVAAlert.prototype, "visible", 2);
__decorateClass$7([
  n$1({ type: String })
], EVAAlert.prototype, "live", 2);
EVAAlert = __decorateClass$7([
  t$4("eva-alert")
], EVAAlert);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
let EVAInput = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-input";
    this.label = "";
    this.type = "text";
    this.value = "";
    this.placeholder = "";
    this.name = "";
    this.required = false;
    this.readonly = false;
    this.error = "";
    this.hint = "";
  }
  render() {
    const inputId = `eva-input-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const hintId = this.hint ? `${inputId}-hint` : "";
    const errorId = this.error ? `${inputId}-error` : "";
    return html`
      <div class="input-wrapper">
        ${this.label ? html`
              <label class="label" for="${inputId}">
                ${this.label}
                ${this.required ? html`<span class="required-marker">*</span>` : ""}
              </label>
            ` : ""}

        ${this.hint && !this.error ? html`<div class="hint" id="${hintId}">${this.hint}</div>` : ""}

        <div class="input-container">
          <input
            id="${inputId}"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            ?disabled="${this.disabled}"
            maxlength="${this.maxlength || ""}"
            class="${this.error ? "has-error" : ""}"
            aria-label="${this.ariaLabel || this.label}"
            aria-describedby="${errorId || hintId || this.ariaDescribedBy || ""}"
            aria-invalid="${this.error ? "true" : "false"}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
        </div>

        ${this.error ? html`
              <div class="error-message" id="${errorId}" role="alert">
                ${this.error}
              </div>
            ` : ""}

        ${this.maxlength && this.value ? html`
              <div class="char-count">
                ${this.value.length} / ${this.maxlength}
              </div>
            ` : ""}
      </div>
    `;
  }
  _handleInput(event) {
    const input = event.target;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent("eva-input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }
  _handleChange(event) {
    const input = event.target;
    this.value = input.value;
    this.dispatchEvent(
      new CustomEvent("eva-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }
  _handleFocus() {
  }
  _handleBlur() {
  }
};
EVAInput.styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .label {
      font-weight: 700;
      font-size: 1rem;
      color: #333333;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .required-marker {
      color: #d3080c;
      font-weight: 700;
    }

    .input-container {
      position: relative;
    }

    input {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #ffffff;
      border: 2px solid #666666;
      border-radius: 0.25rem;
      transition: border-color 200ms ease-in-out;
      min-height: 44px;
    }

    input:focus {
      outline: none;
      border-color: #284162;
      box-shadow: 0 0 0 3px rgba(40, 65, 98, 0.2);
    }

    input:disabled,
    input:read-only {
      background-color: #f5f5f5;
      color: #666666;
      cursor: not-allowed;
    }

    input::placeholder {
      color: #999999;
    }

    /* Error state */
    :host([error]) input,
    input.has-error {
      border-color: #d3080c;
    }

    :host([error]) input:focus,
    input.has-error:focus {
      border-color: #d3080c;
      box-shadow: 0 0 0 3px rgba(211, 8, 12, 0.2);
    }

    .hint {
      font-size: 0.875rem;
      color: #666666;
      line-height: 1.5;
    }

    .error-message {
      font-size: 0.875rem;
      color: #d3080c;
      font-weight: 700;
      line-height: 1.5;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .error-message::before {
      content: '⚠';
      font-size: 1rem;
    }

    .char-count {
      font-size: 0.875rem;
      color: #666666;
      text-align: right;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      input {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      input {
        transition: none;
      }
    }
  `;
__decorateClass$6([
  n$1({ type: String })
], EVAInput.prototype, "label", 2);
__decorateClass$6([
  n$1({ type: String })
], EVAInput.prototype, "type", 2);
__decorateClass$6([
  n$1({ type: String })
], EVAInput.prototype, "value", 2);
__decorateClass$6([
  n$1({ type: String })
], EVAInput.prototype, "placeholder", 2);
__decorateClass$6([
  n$1({ type: String })
], EVAInput.prototype, "name", 2);
__decorateClass$6([
  n$1({ type: Boolean })
], EVAInput.prototype, "required", 2);
__decorateClass$6([
  n$1({ type: Boolean })
], EVAInput.prototype, "readonly", 2);
__decorateClass$6([
  n$1({ type: String })
], EVAInput.prototype, "error", 2);
__decorateClass$6([
  n$1({ type: String })
], EVAInput.prototype, "hint", 2);
__decorateClass$6([
  n$1({ type: Number })
], EVAInput.prototype, "maxlength", 2);
EVAInput = __decorateClass$6([
  t$4("eva-input")
], EVAInput);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
let EVASelect = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-select";
    this.label = "";
    this.value = "";
    this.placeholder = "";
    this.name = "";
    this.required = false;
    this.error = "";
    this.hint = "";
  }
  render() {
    const selectId = `eva-select-${this.name || Math.random().toString(36).substr(2, 9)}`;
    const hintId = this.hint ? `${selectId}-hint` : "";
    const errorId = this.error ? `${selectId}-error` : "";
    return html`
      <div class="select-wrapper">
        ${this.label ? html`
              <label class="label" for="${selectId}">
                ${this.label}
                ${this.required ? html`<span class="required-marker">*</span>` : ""}
              </label>
            ` : ""}

        ${this.hint && !this.error ? html`<div class="hint" id="${hintId}">${this.hint}</div>` : ""}

        <div class="select-container">
          <select
            id="${selectId}"
            .value="${this.value}"
            name="${this.name}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            class="${this.error ? "has-error" : ""}"
            aria-label="${this.ariaLabel || this.label}"
            aria-describedby="${errorId || hintId || this.ariaDescribedBy || ""}"
            aria-invalid="${this.error ? "true" : "false"}"
            @change="${this._handleChange}"
          >
            ${this.placeholder ? html`<option value="" disabled selected>${this.placeholder}</option>` : ""}
            <slot></slot>
          </select>
          <div class="arrow-icon"></div>
        </div>

        ${this.error ? html`
              <div class="error-message" id="${errorId}" role="alert">
                ${this.error}
              </div>
            ` : ""}
      </div>
    `;
  }
  _handleChange(event) {
    const select = event.target;
    this.value = select.value;
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true
      })
    );
    this.dispatchEvent(
      new CustomEvent("eva-change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }
};
EVASelect.styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    .select-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .label {
      font-weight: 700;
      font-size: 1rem;
      color: #333333;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .required-marker {
      color: #d3080c;
      font-weight: 700;
    }

    .select-container {
      position: relative;
    }

    select {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 1rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #ffffff;
      border: 2px solid #666666;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: border-color 200ms ease-in-out;
      min-height: 44px;
      appearance: none;
    }

    select:focus {
      outline: none;
      border-color: #284162;
      box-shadow: 0 0 0 3px rgba(40, 65, 98, 0.2);
    }

    select:disabled {
      background-color: #f5f5f5;
      color: #666666;
      cursor: not-allowed;
    }

    /* Custom arrow icon */
    .arrow-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #333333;
    }

    select:disabled + .arrow-icon {
      border-top-color: #666666;
    }

    /* Error state */
    :host([error]) select,
    select.has-error {
      border-color: #d3080c;
    }

    :host([error]) select:focus,
    select.has-error:focus {
      border-color: #d3080c;
      box-shadow: 0 0 0 3px rgba(211, 8, 12, 0.2);
    }

    .hint {
      font-size: 0.875rem;
      color: #666666;
      line-height: 1.5;
    }

    .error-message {
      font-size: 0.875rem;
      color: #d3080c;
      font-weight: 700;
      line-height: 1.5;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .error-message::before {
      content: '⚠';
      font-size: 1rem;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      select {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      select {
        transition: none;
      }
    }
  `;
__decorateClass$5([
  n$1({ type: String })
], EVASelect.prototype, "label", 2);
__decorateClass$5([
  n$1({ type: String })
], EVASelect.prototype, "value", 2);
__decorateClass$5([
  n$1({ type: String })
], EVASelect.prototype, "placeholder", 2);
__decorateClass$5([
  n$1({ type: String })
], EVASelect.prototype, "name", 2);
__decorateClass$5([
  n$1({ type: Boolean })
], EVASelect.prototype, "required", 2);
__decorateClass$5([
  n$1({ type: String })
], EVASelect.prototype, "error", 2);
__decorateClass$5([
  n$1({ type: String })
], EVASelect.prototype, "hint", 2);
EVASelect = __decorateClass$5([
  t$4("eva-select")
], EVASelect);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
let EVACheckbox = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-checkbox";
    this.checked = false;
    this.indeterminate = false;
    this.value = "";
    this.name = "";
  }
  render() {
    const checkboxId = `eva-checkbox-${this.name || Math.random().toString(36).substr(2, 9)}`;
    return html`
      <label class="checkbox-wrapper">
        <div class="checkbox-input">
          <input
            type="checkbox"
            id="${checkboxId}"
            .checked="${this.checked}"
            .indeterminate="${this.indeterminate}"
            .value="${this.value}"
            name="${this.name}"
            ?disabled="${this.disabled}"
            aria-label="${this.ariaLabel || ""}"
            aria-checked="${this.indeterminate ? "mixed" : this.checked ? "true" : "false"}"
            @change="${this._handleChange}"
          />
          <div class="checkbox-box">
            <span class="checkbox-checkmark">✓</span>
          </div>
        </div>
        <span class="checkbox-label">
          <slot></slot>
        </span>
      </label>
    `;
  }
  _handleChange(event) {
    const input = event.target;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(
      new CustomEvent("eva-change", {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }
};
EVACheckbox.styles = css`
    :host {
      display: inline-flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      min-height: 44px;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 44px;
    }

    .checkbox-input {
      position: relative;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    input[type='checkbox'] {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    input[type='checkbox']:disabled {
      cursor: not-allowed;
    }

    .checkbox-box {
      width: 24px;
      height: 24px;
      border: 2px solid #666666;
      border-radius: 0.25rem;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease-in-out;
      pointer-events: none;
    }

    input[type='checkbox']:checked + .checkbox-box {
      background-color: #284162;
      border-color: #284162;
    }

    input[type='checkbox']:focus-visible + .checkbox-box {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .checkbox-checkmark {
      display: none;
      width: 16px;
      height: 16px;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1;
    }

    input[type='checkbox']:checked + .checkbox-box .checkbox-checkmark {
      display: block;
    }

    .checkbox-label {
      font-size: 1rem;
      color: #333333;
      line-height: 1.5;
      display: flex;
      align-items: center;
      min-height: 24px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .checkbox-box {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .checkbox-box {
        transition: none;
      }
    }
  `;
__decorateClass$4([
  n$1({ type: Boolean, reflect: true })
], EVACheckbox.prototype, "checked", 2);
__decorateClass$4([
  n$1({ type: Boolean, reflect: true })
], EVACheckbox.prototype, "indeterminate", 2);
__decorateClass$4([
  n$1({ type: String })
], EVACheckbox.prototype, "value", 2);
__decorateClass$4([
  n$1({ type: String })
], EVACheckbox.prototype, "name", 2);
EVACheckbox = __decorateClass$4([
  t$4("eva-checkbox")
], EVACheckbox);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
let EVARadio = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-radio";
    this.checked = false;
    this.value = "";
    this.name = "";
    this.required = false;
  }
  render() {
    const radioId = `eva-radio-${this.name}-${this.value || Math.random().toString(36).substr(2, 9)}`;
    return html`
      <label class="radio-wrapper" for="${radioId}">
        <div class="radio-input">
          <input
            type="radio"
            id="${radioId}"
            .checked="${this.checked}"
            .value="${this.value}"
            name="${this.name}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            aria-label="${this.ariaLabel || ""}"
            aria-checked="${this.checked ? "true" : "false"}"
            @change="${this._handleChange}"
          />
          <div class="radio-circle">
            <span class="radio-dot"></span>
          </div>
        </div>
        <span class="radio-label">
          <slot></slot>
        </span>
      </label>
    `;
  }
  _handleChange(event) {
    const input = event.target;
    this.checked = input.checked;
    if (this.checked && this.name) {
      const radios = document.querySelectorAll(`eva-radio[name="${this.name}"]`);
      radios.forEach((radio) => {
        if (radio !== this) {
          radio.checked = false;
        }
      });
    }
    this.dispatchEvent(
      new CustomEvent("eva-change", {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }
};
EVARadio.styles = css`
    :host {
      display: inline-flex;
      align-items: flex-start;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
      min-height: 44px;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .radio-wrapper {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-height: 44px;
    }

    .radio-input {
      position: relative;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    input[type='radio'] {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    input[type='radio']:disabled {
      cursor: not-allowed;
    }

    .radio-circle {
      width: 24px;
      height: 24px;
      border: 2px solid #666666;
      border-radius: 50%;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease-in-out;
      pointer-events: none;
    }

    input[type='radio']:checked + .radio-circle {
      border-color: #284162;
    }

    input[type='radio']:focus-visible + .radio-circle {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .radio-dot {
      display: none;
      width: 12px;
      height: 12px;
      background-color: #284162;
      border-radius: 50%;
    }

    input[type='radio']:checked + .radio-circle .radio-dot {
      display: block;
    }

    .radio-label {
      font-size: 1rem;
      color: #333333;
      line-height: 1.5;
      display: flex;
      align-items: center;
      min-height: 24px;
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
      .radio-circle {
        border-width: 3px;
      }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .radio-circle {
        transition: none;
      }
    }
  `;
__decorateClass$3([
  n$1({ type: Boolean, reflect: true })
], EVARadio.prototype, "checked", 2);
__decorateClass$3([
  n$1({ type: String })
], EVARadio.prototype, "value", 2);
__decorateClass$3([
  n$1({ type: String })
], EVARadio.prototype, "name", 2);
__decorateClass$3([
  n$1({ type: Boolean, reflect: true })
], EVARadio.prototype, "required", 2);
EVARadio = __decorateClass$3([
  t$4("eva-radio")
], EVARadio);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
let EVAModal = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-modal";
    this.open = false;
    this.label = "";
    this.noCloseOnBackdrop = false;
    this.noCloseOnEscape = false;
    this.size = "medium";
    this._focusTrap = null;
    this._previousActiveElement = null;
    this._handleKeydown = (event) => {
      if (event.key === "Escape" && !this.noCloseOnEscape) {
        event.preventDefault();
        this.close();
      }
    };
  }
  render() {
    if (!this.open) return html``;
    return html`
      <div class="backdrop modal-backdrop" @click="${this._handleBackdropClick}"></div>
      <dialog
        class="modal"
        data-size="${this.size}"
        ?open="${this.open}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-header"
        aria-label="${this.label || this.ariaLabel || "Modal dialog"}"
      >
        <div class="modal-header" id="modal-header">
          <slot name="header"></slot>
          <button
            class="close-button modal-close"
            aria-label="${this.t("eva-modal.close", "Close modal")}"
            @click="${this.close}"
          >
            ×
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.open) {
      this._setupFocusTrap();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardownFocusTrap();
  }
  updated(changedProperties) {
    if (changedProperties.has("open")) {
      if (this.open) {
        this._setupFocusTrap();
        this._previousActiveElement = document.activeElement;
        document.body.style.overflow = "hidden";
        this.dispatchEvent(
          new CustomEvent("eva-open", {
            bubbles: true,
            composed: true
          })
        );
      } else {
        this._teardownFocusTrap();
        if (this._previousActiveElement) {
          this._previousActiveElement.focus();
        }
        document.body.style.overflow = "";
      }
    }
  }
  _setupFocusTrap() {
    var _a;
    const modal = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".modal");
    if (modal) {
      this._focusTrap = new FocusTrap(modal);
      this._focusTrap.activate();
    }
    if (!this.noCloseOnEscape) {
      document.addEventListener("keydown", this._handleKeydown);
    }
  }
  _teardownFocusTrap() {
    if (this._focusTrap) {
      this._focusTrap.deactivate();
      this._focusTrap = null;
    }
    document.removeEventListener("keydown", this._handleKeydown);
  }
  _handleBackdropClick(event) {
    if (!this.noCloseOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }
  close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("eva-close", {
        bubbles: true,
        composed: true
      })
    );
  }
};
EVAModal.styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    :host([open]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      animation: fadeIn 200ms ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal {
      position: relative;
      background-color: #ffffff;
      border-radius: 0.5rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      max-height: 90vh;
      overflow-y: auto;
      animation: slideIn 200ms ease-in-out;
      z-index: 1001;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal[data-size='small'] {
      width: 90%;
      max-width: 400px;
    }

    .modal[data-size='medium'] {
      width: 90%;
      max-width: 600px;
    }

    .modal[data-size='large'] {
      width: 90%;
      max-width: 900px;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .modal-header ::slotted(h2) {
      margin: 0;
      font-size: 1.5rem;
      color: #333333;
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      font-size: 1.5rem;
      color: #666666;
      line-height: 1;
      border-radius: 0.25rem;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 200ms ease-in-out;
    }

    .close-button:hover {
      background-color: #f5f5f5;
    }

    .close-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .modal-body {
      padding: 1.5rem;
      color: #333333;
      line-height: 1.6;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .backdrop,
      .modal {
        animation: none;
      }
    }
  `;
__decorateClass$2([
  n$1({ type: Boolean, reflect: true })
], EVAModal.prototype, "open", 2);
__decorateClass$2([
  n$1({ type: String })
], EVAModal.prototype, "label", 2);
__decorateClass$2([
  n$1({ type: Boolean })
], EVAModal.prototype, "noCloseOnBackdrop", 2);
__decorateClass$2([
  n$1({ type: Boolean })
], EVAModal.prototype, "noCloseOnEscape", 2);
__decorateClass$2([
  n$1({ type: String })
], EVAModal.prototype, "size", 2);
EVAModal = __decorateClass$2([
  t$4("eva-modal")
], EVAModal);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let EVATabs = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-tabs";
    this.activeIndex = 0;
    this.activeTab = 0;
    this.orientation = "horizontal";
    this._tabs = [];
  }
  render() {
    if (this.activeTab !== this.activeIndex) {
      this.activeIndex = this.activeTab;
    }
    return html`
      <div class="tabs-container">
        <div
          role="tablist"
          aria-label="${this.ariaLabel || "Tabs"}"
          aria-orientation="${this.orientation}"
          class="tabs-list"
        >
          ${this._tabs.map(
      (tab, index) => html`
              <button
                role="tab"
                class="tab-button"
                id="tab-${index}"
                aria-selected="${index === this.activeIndex}"
                aria-controls="panel-${index}"
                tabindex="${index === this.activeIndex ? 0 : -1}"
                @click="${() => this._handleTabClick(index)}"
                @keydown="${(e2) => this._handleKeydown(e2, index)}"
              >
                ${tab.label}
              </button>
            `
    )}
        </div>
      </div>
      <div class="tab-panels">
        <slot></slot>
      </div>
    `;
  }
  firstUpdated() {
    this._updateTabs();
  }
  _updateTabs() {
    var _a;
    const slot = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("slot");
    if (slot) {
      const nodes = slot.assignedElements();
      this._tabs = nodes.filter((node) => node.tagName === "EVA-TAB");
      this._tabs.forEach((tab, index) => {
        tab.active = index === this.activeIndex;
        tab.setAttribute("role", "tabpanel");
        tab.setAttribute("id", `panel-${index}`);
        tab.setAttribute("aria-labelledby", `tab-${index}`);
      });
      this.requestUpdate();
    }
  }
  _handleTabClick(index) {
    this.activeIndex = index;
    this.activeTab = index;
    this._updateTabs();
    this.dispatchEvent(
      new CustomEvent("eva-tab-change", {
        detail: { activeIndex: this.activeIndex },
        bubbles: true,
        composed: true
      })
    );
  }
  _handleKeydown(event, currentIndex) {
    var _a;
    let newIndex = currentIndex;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : this._tabs.length - 1;
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        newIndex = currentIndex < this._tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = this._tabs.length - 1;
        break;
      default:
        return;
    }
    this.activeIndex = newIndex;
    this.activeTab = newIndex;
    this._updateTabs();
    const tabButton = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(`#tab-${newIndex}`);
    if (tabButton) {
      tabButton.focus();
    }
    this.dispatchEvent(
      new CustomEvent("eva-tab-change", {
        detail: { activeIndex: this.activeIndex, activeTab: this.activeTab },
        bubbles: true,
        composed: true
      })
    );
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("activeTab") && this.activeTab !== this.activeIndex) {
      this.activeIndex = this.activeTab;
      this._updateTabs();
      this.dispatchEvent(
        new CustomEvent("eva-tab-change", {
          detail: { activeIndex: this.activeIndex, activeTab: this.activeTab },
          bubbles: true,
          composed: true
        })
      );
    }
    if (changedProperties.has("orientation")) {
      this.setAttribute("orientation", this.orientation);
    }
  }
};
EVATabs.styles = css`
    :host {
      display: block;
    }

    .tabs-container {
      border-bottom: 2px solid #e5e5e5;
    }

    .tabs-list {
      display: flex;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
      overflow-x: auto;
      overflow-y: hidden;
    }

    .tab-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 1rem 1.5rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      color: #666666;
      border-bottom: 3px solid transparent;
      transition: all 200ms ease-in-out;
      white-space: nowrap;
      min-height: 44px;
    }

    .tab-button:hover {
      color: #333333;
      background-color: #f5f5f5;
    }

    .tab-button[aria-selected='true'] {
      color: #284162;
      border-bottom-color: #284162;
      font-weight: 700;
    }

    .tab-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: -3px;
    }

    .tab-panels {
      padding: 1.5rem 0;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .tab-button {
        transition: none;
      }
    }
  `;
__decorateClass$1([
  n$1({ type: Number })
], EVATabs.prototype, "activeIndex", 2);
__decorateClass$1([
  n$1({ type: Number })
], EVATabs.prototype, "activeTab", 2);
__decorateClass$1([
  n$1({ type: String })
], EVATabs.prototype, "orientation", 2);
__decorateClass$1([
  r$2()
], EVATabs.prototype, "_tabs", 2);
EVATabs = __decorateClass$1([
  t$4("eva-tabs")
], EVATabs);
let EVATab = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-tab";
    this.label = "";
    this.active = false;
  }
  render() {
    return html`<slot></slot>`;
  }
};
EVATab.styles = css`
    :host {
      display: none;
    }

    :host([active]) {
      display: block;
    }
  `;
__decorateClass$1([
  n$1({ type: String })
], EVATab.prototype, "label", 2);
__decorateClass$1([
  n$1({ type: Boolean, reflect: true })
], EVATab.prototype, "active", 2);
EVATab = __decorateClass$1([
  t$4("eva-tab")
], EVATab);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis, i$1 = t$2.trustedTypes, s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o = "?" + h, n2 = `<${o}>`, r$1 = document, l = () => r$1.createComment(""), c$1 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u$2 = (t2) => a(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$1 = /-->/g, _ = />/g, m$1 = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$1 = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), C = r$1.createTreeWalker(r$1, 129);
function P(t2, i2) {
  if (!a(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$1 ? s$1.createHTML(i2) : i2;
}
const V = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); ) y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v$1 : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m$1) : void 0 !== u2[3] && (c2 = m$1) : c2 === m$1 ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m$1 : '"' === u2[3] ? g : p$1) : c2 === g || c2 === p$1 ? c2 = m$1 : c2 === v$1 || c2 === _ ? c2 = f : (c2 = m$1, r2 = void 0);
    const x = c2 === m$1 && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n2 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e$1 + s3.slice(d2) + h + x) : s3 + h + (-2 === d2 ? i3 : x);
  }
  return [P(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), o2];
};
class N {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = V(t2, s2);
    if (this.el = N.createElement(f2, n3), C.currentNode = this.el.content, 2 === s2 || 3 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = C.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(e$1)) {
          const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
          d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? H : "?" === e2[1] ? I : "@" === e2[1] ? L : k }), r2.removeAttribute(t3);
        } else t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++) r2.append(t3[i2], l()), C.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o) d2.push({ type: 2, index: c2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); ) d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
      }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function S(t2, i2, s2 = t2, e2) {
  var _a, _b;
  if (i2 === T) return i2;
  let h2 = void 0 !== e2 ? (_a = s2._$Co) == null ? void 0 : _a[e2] : s2._$Cl;
  const o2 = c$1(i2) ? void 0 : i2._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = S(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
let M$1 = class M {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? r$1).importNode(i2, true);
    C.currentNode = e2;
    let h2 = C.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new R(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new z(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n3];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h2 = C.nextNode(), o2++);
    }
    return C.currentNode = r$1, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
};
class R {
  get _$AU() {
    var _a;
    return ((_a = this._$AM) == null ? void 0 : _a._$AU) ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = S(this, t2, i2), c$1(t2) ? t2 === E || null == t2 || "" === t2 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u$2(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== E && c$1(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$1.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a;
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = N.createElement(P(s2.h, s2.h[0]), this.options)), s2);
    if (((_a = this._$AH) == null ? void 0 : _a._$AD) === e2) this._$AH.p(i2);
    else {
      const t3 = new M$1(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new N(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new R(this.O(l()), this.O(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var _a;
    for ((_a = this._$AP) == null ? void 0 : _a.call(this, false, true, i2); t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var _a;
    void 0 === this._$AM && (this._$Cv = t2, (_a = this._$AP) == null ? void 0 : _a.call(this, t2));
  }
}
class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = E;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = S(this, t2, i2, 0), o2 = !c$1(t2) || t2 !== this._$AH && t2 !== T, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = S(this, e3[s2 + n3], i2, n3), r2 === T && (r2 = this._$AH[n3]), o2 || (o2 = !c$1(r2) || r2 !== this._$AH[n3]), r2 === E ? t2 = E : t2 !== E && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === E ? void 0 : t2;
  }
}
class I extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== E);
  }
}
class L extends k {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = S(this, t2, i2, 0) ?? E) === T) return;
    const s2 = this._$AH, e2 = t2 === E && s2 !== E || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== E && (s2 === E || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a;
    "function" == typeof this._$AH ? this._$AH.call(((_a = this.options) == null ? void 0 : _a.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S(this, t2);
  }
}
const Z = { I: R }, j = t$2.litHtmlPolyfillSupport;
j == null ? void 0 : j(N, R), (t$2.litHtmlVersions ?? (t$2.litHtmlVersions = [])).push("3.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { CHILD: 2 }, e = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t } = Z, r = () => document.createComment(""), s = (o2, i2, n3) => {
  var _a;
  const e2 = o2._$AA.parentNode, l2 = void 0 === i2 ? o2._$AB : i2._$AA;
  if (void 0 === n3) {
    const i3 = e2.insertBefore(r(), l2), d2 = e2.insertBefore(r(), l2);
    n3 = new t(i3, d2, o2, o2.options);
  } else {
    const t2 = n3._$AB.nextSibling, i3 = n3._$AM, d2 = i3 !== o2;
    if (d2) {
      let t3;
      (_a = n3._$AQ) == null ? void 0 : _a.call(n3, o2), n3._$AM = o2, void 0 !== n3._$AP && (t3 = o2._$AU) !== i3._$AU && n3._$AP(t3);
    }
    if (t2 !== l2 || d2) {
      let o3 = n3._$AA;
      for (; o3 !== t2; ) {
        const t3 = o3.nextSibling;
        e2.insertBefore(o3, l2), o3 = t3;
      }
    }
  }
  return n3;
}, v = (o2, t2, i2 = o2) => (o2._$AI(t2, i2), o2), u$1 = {}, m = (o2, t2 = u$1) => o2._$AH = t2, p = (o2) => o2._$AH, M2 = (o2) => {
  o2._$AR(), o2._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t2; l2++) r2.set(e2[l2], l2);
  return r2;
}, c = e(class extends i {
  constructor(e2) {
    if (super(e2), e2.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i2 = 0;
    for (const s3 of e2) l2[i2] = r2 ? r2(s3, i2) : i2, o2[i2] = t2(s3, i2), i2++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s$12, [t2, r2, c2]) {
    const d2 = p(s$12), { values: p$12, keys: a2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a2, p$12;
    const h2 = this.ut ?? (this.ut = []), v$12 = [];
    let m$12, y2, x = 0, j2 = d2.length - 1, k2 = 0, w = p$12.length - 1;
    for (; x <= j2 && k2 <= w; ) if (null === d2[x]) x++;
    else if (null === d2[j2]) j2--;
    else if (h2[x] === a2[k2]) v$12[k2] = v(d2[x], p$12[k2]), x++, k2++;
    else if (h2[j2] === a2[w]) v$12[w] = v(d2[j2], p$12[w]), j2--, w--;
    else if (h2[x] === a2[w]) v$12[w] = v(d2[x], p$12[w]), s(s$12, v$12[w + 1], d2[x]), x++, w--;
    else if (h2[j2] === a2[k2]) v$12[k2] = v(d2[j2], p$12[k2]), s(s$12, d2[x], d2[j2]), j2--, k2++;
    else if (void 0 === m$12 && (m$12 = u(a2, k2, w), y2 = u(h2, x, j2)), m$12.has(h2[x])) if (m$12.has(h2[j2])) {
      const e2 = y2.get(a2[k2]), t3 = void 0 !== e2 ? d2[e2] : null;
      if (null === t3) {
        const e3 = s(s$12, d2[x]);
        v(e3, p$12[k2]), v$12[k2] = e3;
      } else v$12[k2] = v(t3, p$12[k2]), s(s$12, d2[x], t3), d2[e2] = null;
      k2++;
    } else M2(d2[j2]), j2--;
    else M2(d2[x]), x++;
    for (; k2 <= w; ) {
      const e2 = s(s$12, v$12[w + 1]);
      v(e2, p$12[k2]), v$12[k2++] = e2;
    }
    for (; x <= j2; ) {
      const e2 = d2[x++];
      null !== e2 && M2(e2);
    }
    return this.ut = a2, m(s$12, v$12), T;
  }
});
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let EVAChatPanel = class extends EVAElement {
  constructor() {
    super(...arguments);
    this.componentName = "eva-chat-panel";
    this.greeting = "";
    this.isTyping = false;
    this.messages = [];
    this._inputValue = "";
    this._messagesEndRef = null;
    this._setMessagesEndRef = (el) => {
      this._messagesEndRef = el;
    };
  }
  render() {
    return html`
      <div class="chat-header">
        ${this.t("eva-chat-panel.title", "EVA Assistant")}
      </div>

      <div class="chat-messages" @scroll="${this._handleScroll}">
        ${this.greeting && this.messages.length === 0 ? html`<div class="greeting-message">${this.greeting}</div>` : ""}

        ${c(
      this.messages,
      (msg) => msg.id,
      (msg) => html`
            <div class="message ${msg.sender}" role="article">
              <div class="message-bubble">${msg.content}</div>
              <div class="message-meta">
                <span class="sender-label">
                  ${msg.sender === "user" ? this.t("eva-chat-panel.you", "You") : msg.sender === "assistant" ? this.t("eva-chat-panel.eva", "EVA") : this.t("eva-chat-panel.system", "System")}
                </span>
                <span class="timestamp">${this._formatTime(msg.timestamp)}</span>
              </div>
            </div>
          `
    )}

        ${this.isTyping ? html`
              <div class="typing-indicator" role="status" aria-live="polite">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            ` : ""}

        <div style="height: 1px;" ${this._setMessagesEndRef}></div>
      </div>

      <div class="chat-input-container">
        <input
          type="text"
          class="chat-input"
          .value="${this._inputValue}"
          placeholder="${this.t("eva-chat-panel.placeholder", "Type your message...")}"
          aria-label="${this.t("eva-chat-panel.input-label", "Chat message input")}"
          @input="${this._handleInput}"
          @keydown="${this._handleKeydown}"
        />
        <button
          class="send-button"
          aria-label="${this.t("eva-chat-panel.send", "Send message")}"
          ?disabled="${!this._inputValue.trim() || this.isTyping}"
          @click="${this._handleSend}"
        >
          ➤
        </button>
      </div>
    `;
  }
  updated(changedProperties) {
    if (changedProperties.has("messages") || changedProperties.has("isTyping")) {
      this._scrollToBottom();
    }
  }
  _scrollToBottom() {
    if (this._messagesEndRef) {
      this._messagesEndRef.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }
  _handleScroll() {
  }
  _handleInput(event) {
    const input = event.target;
    this._inputValue = input.value;
  }
  _handleKeydown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this._handleSend();
    }
  }
  _handleSend() {
    if (!this._inputValue.trim() || this.isTyping) return;
    const message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content: this._inputValue.trim(),
      timestamp: /* @__PURE__ */ new Date(),
      type: "text"
    };
    this.messages = [...this.messages, message];
    this._inputValue = "";
    this.dispatchEvent(
      new CustomEvent("eva-message-send", {
        detail: { message },
        bubbles: true,
        composed: true
      })
    );
    this.announce(
      this.t("eva-chat-panel.message-sent", "Message sent"),
      "polite"
    );
  }
  _formatTime(date) {
    return date.toLocaleTimeString(this.locale, {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  /**
   * Public method to add assistant response
   */
  addMessage(message) {
    const fullMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.messages = [...this.messages, fullMessage];
  }
  /**
   * Public method to clear all messages
   */
  clearMessages() {
    this.messages = [];
  }
};
EVAChatPanel.styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 600px;
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      background-color: #ffffff;
      overflow: hidden;
    }

    .chat-header {
      padding: 1rem 1.5rem;
      background-color: #26374A;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.125rem;
      border-bottom: 2px solid #1C578A;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: #f9f9f9;
    }

    .message {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 75%;
      animation: slideIn 200ms ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message.user {
      align-self: flex-end;
    }

    .message.assistant,
    .message.system {
      align-self: flex-start;
    }

    .message-bubble {
      padding: 1rem 1.25rem;
      border-radius: 1rem;
      line-height: 1.6;
      word-wrap: break-word;
    }

    .message.user .message-bubble {
      background-color: #284162;
      color: #ffffff;
      border-bottom-right-radius: 0.25rem;
    }

    .message.assistant .message-bubble {
      background-color: #ffffff;
      color: #333333;
      border: 1px solid #e5e5e5;
      border-bottom-left-radius: 0.25rem;
    }

    .message.system .message-bubble {
      background-color: #f0f7fb;
      color: #284162;
      border: 1px solid #cce7f3;
      font-style: italic;
      text-align: center;
      border-radius: 1rem;
    }

    .message-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      color: #666666;
    }

    .message.user .message-meta {
      justify-content: flex-end;
    }

    .sender-label {
      font-weight: 700;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 1.25rem;
      background-color: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 1rem;
      max-width: 75px;
      animation: slideIn 200ms ease-out;
    }

    .typing-dot {
      width: 8px;
      height: 8px;
      background-color: #666666;
      border-radius: 50%;
      animation: typing 1.5s infinite;
    }

    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        opacity: 0.3;
        transform: translateY(0);
      }
      30% {
        opacity: 1;
        transform: translateY(-8px);
      }
    }

    .chat-input-container {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e5e5;
      background-color: #ffffff;
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .chat-input {
      flex: 1;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-family: Noto Sans, sans-serif;
      line-height: 1.5;
      color: #333333;
      background-color: #f9f9f9;
      border: 2px solid #e5e5e5;
      border-radius: 1.5rem;
      transition: border-color 200ms ease-in-out;
      min-height: 44px;
    }

    .chat-input:focus {
      outline: none;
      border-color: #284162;
      background-color: #ffffff;
    }

    .chat-input::placeholder {
      color: #999999;
    }

    .send-button {
      background-color: #284162;
      color: #ffffff;
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 200ms ease-in-out;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .send-button:hover:not(:disabled) {
      background-color: #1C578A;
    }

    .send-button:focus-visible {
      outline: 3px solid #26374A;
      outline-offset: 2px;
    }

    .send-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .greeting-message {
      padding: 1.5rem;
      background-color: #f0f7fb;
      border: 1px solid #cce7f3;
      border-radius: 0.5rem;
      color: #284162;
      text-align: center;
      font-size: 1.125rem;
      line-height: 1.6;
    }

    /* Scrollbar styling */
    .chat-messages::-webkit-scrollbar {
      width: 8px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: #cccccc;
      border-radius: 4px;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: #999999;
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .message,
      .typing-indicator {
        animation: none;
      }

      .typing-dot {
        animation: none;
        opacity: 0.6;
      }

      .chat-input,
      .send-button {
        transition: none;
      }
    }
  `;
__decorateClass([
  n$1({ type: String })
], EVAChatPanel.prototype, "greeting", 2);
__decorateClass([
  n$1({ type: Boolean })
], EVAChatPanel.prototype, "isTyping", 2);
__decorateClass([
  n$1({ type: Array })
], EVAChatPanel.prototype, "messages", 2);
__decorateClass([
  r$2()
], EVAChatPanel.prototype, "_inputValue", 2);
__decorateClass([
  r$2()
], EVAChatPanel.prototype, "_messagesEndRef", 2);
EVAChatPanel = __decorateClass([
  t$4("eva-chat-panel")
], EVAChatPanel);
const gcProfile = {
  id: "canada-gc",
  name: "Government of Canada",
  colors: {
    fipRed: "#af3c43",
    linkBlue: "#284162",
    errorRed: "#d3080c",
    accentBlue: "#26374A",
    textPrimary: "#333333",
    textSecondary: "#666666",
    textDisabled: "#999999",
    textInverse: "#ffffff",
    backgroundPrimary: "#ffffff",
    backgroundSecondary: "#f5f5f5",
    backgroundTertiary: "#e1e4e7",
    successGreen: "#278400",
    warningYellow: "#ff9900",
    infoCyan: "#269abc",
    dangerRed: "#d3080c",
    focusOutline: "#26374A",
    hoverBackground: "#e8e8e8",
    activeBackground: "#d9d9d9"
  },
  typography: {
    fontFamilyHeadings: "Lato, sans-serif",
    fontFamilyBody: "Noto Sans, sans-serif",
    fontFamilyMono: "Courier New, monospace",
    fontWeightRegular: 400,
    fontWeightBold: 700,
    fontSizeXs: "0.75rem",
    fontSizeSm: "0.875rem",
    fontSizeBase: "1rem",
    fontSizeMd: "1.125rem",
    fontSizeLg: "1.25rem",
    fontSizeXl: "1.5rem",
    fontSize2xl: "2rem",
    fontSize3xl: "2.5rem",
    lineHeightTight: 1.2,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.75,
    letterSpacingNormal: "0",
    letterSpacingWide: "0.025em"
  },
  spacing: {
    space0: "0",
    space1: "0.25rem",
    space2: "0.5rem",
    space3: "0.75rem",
    space4: "1rem",
    space5: "1.25rem",
    space6: "1.5rem",
    space8: "2rem",
    space10: "2.5rem",
    space12: "3rem",
    space16: "4rem",
    space20: "5rem"
  },
  shadows: {
    shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    shadowBase: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    shadowXl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  },
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px"
  },
  accessibility: {
    contrastRatioAAA: 7,
    contrastRatioAA: 4.5,
    touchTargetMin: "44px",
    focusOutlineWidth: "3px",
    focusOutlineStyle: "solid",
    focusOutlineOffset: "2px",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-in-out"
  },
  layout: {
    maxLineLength: "65ch",
    containerSm: "640px",
    containerMd: "768px",
    containerLg: "1024px",
    containerXl: "1280px",
    radiusNone: "0",
    radiusSm: "0.125rem",
    radiusBase: "0.25rem",
    radiusMd: "0.375rem",
    radiusLg: "0.5rem",
    radiusFull: "9999px",
    borderWidth0: "0",
    borderWidth1: "1px",
    borderWidth2: "2px",
    borderWidth4: "4px"
  }
};
function applySovereignProfile(profile) {
  const root = document.documentElement;
  Object.entries(profile.colors).forEach(([key, value]) => {
    root.style.setProperty(`--gc-color-${kebabCase(key)}`, String(value));
  });
  Object.entries(profile.typography).forEach(([key, value]) => {
    root.style.setProperty(`--gc-typography-${kebabCase(key)}`, String(value));
  });
  Object.entries(profile.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--gc-spacing-${kebabCase(key)}`, String(value));
  });
  Object.entries(profile.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--gc-shadow-${kebabCase(key)}`, String(value));
  });
  Object.entries(profile.breakpoints).forEach(([key, value]) => {
    root.style.setProperty(`--gc-breakpoint-${kebabCase(key)}`, String(value));
  });
  Object.entries(profile.accessibility).forEach(([key, value]) => {
    root.style.setProperty(`--gc-a11y-${kebabCase(key)}`, String(value));
  });
  Object.entries(profile.layout).forEach(([key, value]) => {
    root.style.setProperty(`--gc-layout-${kebabCase(key)}`, String(value));
  });
}
function kebabCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function initGCProfile() {
  applySovereignProfile(gcProfile);
}
if (typeof document !== "undefined") {
  initGCProfile();
}
export {
  EVAAlert,
  EVAButton,
  EVACard,
  EVAChatPanel,
  EVACheckbox,
  EVAElement,
  EVAInput,
  EVAModal,
  EVARadio,
  EVASelect,
  EVATab,
  EVATabs,
  FocusTrap,
  LiveRegionManager,
  applySovereignProfile,
  formatCurrency,
  formatDate,
  formatNumber,
  gcProfile,
  getGlobalLocale,
  getLiveRegionManager,
  getMessage$1 as getMessage,
  getNextFocusable,
  getPreviousFocusable,
  getSystemLocale,
  handleArrowKeyNavigation,
  initGCProfile,
  isFocusable,
  registerMessages$1 as registerMessages,
  setGlobalLocale,
  subscribeToLocale
};
//# sourceMappingURL=eva-sovereign-ui.es.js.map
