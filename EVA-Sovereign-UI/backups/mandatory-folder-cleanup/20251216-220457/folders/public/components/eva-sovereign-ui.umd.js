!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("lit")):"function"==typeof define&&define.amd?define(["exports","lit"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).EVASovereignUI={},e.Lit)}(this,function(e,t){"use strict";const i=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},o=globalThis,r=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let a=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const l=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:m}=Object,b=globalThis,f=b.trustedTypes,g=f?f.emptyScript:"",v=b.reactiveElementPolyfillSupport,y=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(o){i=null}}return i}},A=(e,t)=>!d(e,t),$={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:A};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);class _ extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const s=null==o?void 0:o.call(this);null==r||r.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...p(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const e=this._$Eu(t,i);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),null==(e=this.constructor.l)||e.forEach(e=>e(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),void 0!==this.renderRoot&&this.isConnected&&(null==(t=e.hostConnected)||t.call(e))}removeController(e){var t;null==(t=this._$EO)||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),r=o.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null==(e=this._$EO)||e.forEach(e=>{var t;return null==(t=e.hostConnected)?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null==(e=this._$EO)||e.forEach(e=>{var t;return null==(t=e.hostDisconnected)?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var i;const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(void 0!==r&&!0===o.reflect){const s=(void 0!==(null==(i=o.converter)?void 0:i.toAttribute)?o.converter:x).toAttribute(t,o.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){var i,o;const r=this.constructor,s=r._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=r.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null==(i=e.converter)?void 0:i.fromAttribute)?e.converter:x;this._$Em=s;const a=n.fromAttribute(t,e.type);this[s]=a??(null==(o=this._$Ej)?void 0:o.get(s))??a,this._$Em=null}}requestUpdate(e,t,i){var o;if(void 0!==e){const r=this.constructor,s=this[e];if(i??(i=r.getPropertyOptions(e)),!((i.hasChanged??A)(s,t)||i.useDefault&&i.reflect&&s===(null==(o=this._$Ej)?void 0:o.get(e))&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==r||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null==(e=this._$EO)||e.forEach(e=>{var t;return null==(t=e.hostUpdate)?void 0:t.call(e)}),this.update(i)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null==(t=this._$EO)||t.forEach(e=>{var t;return null==(t=e.hostUpdated)?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}}_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[y("elementProperties")]=new Map,_[y("finalized")]=new Map,null==v||v({ReactiveElement:_}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.1");const E={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:A},w=(e=E,t,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,r,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];t.call(this,i),this.requestUpdate(o,r,e)}}throw Error("Unsupported decorator location: "+o)};function k(e){return(t,i)=>"object"==typeof i?w(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function S(e){return k({...e,state:!0,attribute:!1})}const C=new Map;function V(e,t){C.set(e,t)}function T(e,t,i,o){const r=C.get(e);if(!r)return o??t;const s=r[i];return s?s[t]??o??t:o??t}V("eva-button",{"en-CA":{loading:"Loading...",submit:"Submit",cancel:"Cancel","sign-in":"Sign in"},"fr-CA":{loading:"Chargement...",submit:"Soumettre",cancel:"Annuler","sign-in":"Se connecter"}}),V("eva-alert",{"en-CA":{"dismiss-alert":"Dismiss alert","alert-dismissed":"Alert dismissed",success:"Success",info:"Information",warning:"Warning",danger:"Error"},"fr-CA":{"dismiss-alert":"Rejeter l'alerte","alert-dismissed":"Alerte rejetée",success:"Succès",info:"Information",warning:"Avertissement",danger:"Erreur"}}),V("eva-card",{"en-CA":{},"fr-CA":{}}),V("eva-modal",{"en-CA":{close:"Close modal","modal-closed":"Modal closed"},"fr-CA":{close:"Fermer le modal","modal-closed":"Modal fermé"}}),V("eva-chat-panel",{"en-CA":{title:"EVA Assistant",you:"You",eva:"EVA",system:"System",placeholder:"Type your message...","input-label":"Chat message input",send:"Send message","message-sent":"Message sent"},"fr-CA":{title:"Assistant EVA",you:"Vous",eva:"EVA",system:"Système",placeholder:"Tapez votre message...","input-label":"Saisie de message de chat",send:"Envoyer le message","message-sent":"Message envoyé"}});const P=new Map;let O="en-CA";function R(e){const t=O,i=M(e);O=i,document.documentElement.lang=i;try{localStorage.setItem("eva-locale",i)}catch(o){}window.dispatchEvent(new CustomEvent("eva-locale-change",{detail:{locale:i,previousLocale:t}}))}function M(e){return"en"===e||"en-CA"===e?"en-CA":"fr"===e||"fr-CA"===e?"fr-CA":"en-CA"}var I,N;I="common",N={"en-CA":{close:"Close",submit:"Submit",cancel:"Cancel",required:"Required",optional:"Optional",loading:"Loading...",error:"Error",success:"Success",warning:"Warning",info:"Information",yes:"Yes",no:"No",search:"Search",menu:"Menu",home:"Home",language:"Language",english:"English",french:"Français"},"fr-CA":{close:"Fermer",submit:"Soumettre",cancel:"Annuler",required:"Obligatoire",optional:"Optionnel",loading:"Chargement...",error:"Erreur",success:"Succès",warning:"Avertissement",info:"Information",yes:"Oui",no:"Non",search:"Recherche",menu:"Menu",home:"Accueil",language:"Langue",english:"Anglais",french:"Français"}},P.set(I,N),"undefined"!=typeof window&&function(){const e=new URLSearchParams(window.location.search).get("lang");if(e)return void R(M(e));try{const e=localStorage.getItem("eva-locale");if(e)return void R(e)}catch(t){}navigator.language.startsWith("fr")?R("fr-CA"):R("en-CA")}();let z="en-CA";const B=new Set;function D(){return z}function j(e){return B.add(e),()=>B.delete(e)}class L{constructor(e){this.handleKeydown=e=>{var t,i;"Tab"===e.key&&(e.shiftKey?document.activeElement===this.firstFocusable&&(e.preventDefault(),null==(t=this.lastFocusable)||t.focus()):document.activeElement===this.lastFocusable&&(e.preventDefault(),null==(i=this.firstFocusable)||i.focus()))},this.container=e}activate(){var e;this.previouslyFocused=document.activeElement;const t=this.getFocusableElements();0!==t.length&&(this.firstFocusable=t[0],this.lastFocusable=t[t.length-1],null==(e=this.firstFocusable)||e.focus(),this.container.addEventListener("keydown",this.handleKeydown))}deactivate(){var e;this.container.removeEventListener("keydown",this.handleKeydown),null==(e=this.previouslyFocused)||e.focus()}getFocusableElements(){return Array.from(this.container.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(e=>!e.hasAttribute("disabled")&&null!==e.offsetParent)}}class U{constructor(){this.createLiveRegion()}createLiveRegion(){this.liveRegion||(this.liveRegion=document.createElement("div"),this.liveRegion.setAttribute("role","status"),this.liveRegion.setAttribute("aria-live","polite"),this.liveRegion.setAttribute("aria-atomic","true"),this.liveRegion.style.position="absolute",this.liveRegion.style.left="-10000px",this.liveRegion.style.width="1px",this.liveRegion.style.height="1px",this.liveRegion.style.overflow="hidden",document.body.appendChild(this.liveRegion))}announce(e,t="polite"){this.liveRegion&&(this.liveRegion.setAttribute("aria-live",t),this.liveRegion.textContent="",setTimeout(()=>{this.liveRegion&&(this.liveRegion.textContent=e)},100))}destroy(){this.liveRegion&&(document.body.removeChild(this.liveRegion),this.liveRegion=void 0)}}let H;function q(){return H||(H=new U),H}var F=Object.defineProperty,W=(e,t,i,o)=>{for(var r,s=void 0,n=e.length-1;n>=0;n--)(r=e[n])&&(s=r(t,i,s)||s);return s&&F(t,i,s),s};class K extends t.LitElement{constructor(){super(...arguments),this.locale=D(),this.ariaLabel=null,this.ariaDescribedBy=null,this.disabled=!1,this.componentName="eva-element",this.componentId=this._generateId()}_generateId(){return`eva-${Math.random().toString(36).substr(2,9)}`}connectedCallback(){super.connectedCallback(),this._localeUnsubscribe=j(e=>{this.locale=e})}disconnectedCallback(){super.disconnectedCallback(),this._localeUnsubscribe&&this._localeUnsubscribe()}updated(e){super.updated(e),e.has("locale")&&this.setAttribute("lang",this.locale),e.has("disabled")&&this.setAttribute("aria-disabled",String(this.disabled))}t(e,t){let i=T(this.componentName,e,this.locale,"");return i&&i!==e||(i=function(e,t,i,o){var r;const s=i||O,n=P.get(e);if(!n)return o??t;const a=n[s];if(!a)return o??t;const l=a[t];if(l)return l;if("fr-CA"===s){const e=null==(r=n["en-CA"])?void 0:r[t];if(e)return e}return o??t}(this.componentName,e,this.locale,"")),i||t||e}getMessage(e,t){return this.t(e,t)}announce(e,t="polite"){q().announce(e,t)}emitEvent(e,t,i={}){const o=new CustomEvent(e,{detail:t,bubbles:i.bubbles??!0,composed:i.composed??!0,cancelable:i.cancelable??!1});return this.dispatchEvent(o)}focusElement(){var e;const t=null==(e=this.shadowRoot)?void 0:e.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');t&&t.focus()}getToken(e){return`var(--gc-${e.replace(/\./g,"-")})`}handleKeyboard(e){}isHighContrastMode(){return window.matchMedia("(prefers-contrast: high)").matches}prefersReducedMotion(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}}W([k({type:String,reflect:!0})],K.prototype,"locale"),W([k({type:String,attribute:"aria-label"})],K.prototype,"ariaLabel"),W([k({type:String,attribute:"aria-describedby"})],K.prototype,"ariaDescribedBy"),W([k({type:Boolean,reflect:!0})],K.prototype,"disabled"),W([k({type:String,attribute:"component-id"})],K.prototype,"componentId");var Y=Object.defineProperty,G=Object.getOwnPropertyDescriptor,X=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?G(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&Y(t,i,s),s};e.EVAButton=class extends K{constructor(){super(...arguments),this.componentName="eva-button",this.variant="primary",this.type="button",this.size="medium",this.fullWidth=!1}render(){return t.html`
      <button
        type="${this.type}"
        ?disabled="${this.disabled}"
        aria-label="${this.ariaLabel||""}"
        aria-describedby="${this.ariaDescribedBy||""}"
        @click="${this._handleClick}"
        @keydown="${this._handleKeydown}"
      >
        <slot></slot>
      </button>
    `}_handleClick(e){if(this.disabled)return e.preventDefault(),void e.stopPropagation();this.dispatchEvent(new CustomEvent("eva-click",{detail:{originalEvent:e},bubbles:!0,composed:!0}))}_handleKeydown(e){if("Enter"===e.key||" "===e.key){if(this.disabled)return void e.preventDefault();" "===e.key&&e.preventDefault(),e.target.click()}}},e.EVAButton.styles=t.css`
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
  `,X([k({type:String,reflect:!0})],e.EVAButton.prototype,"variant",2),X([k({type:String})],e.EVAButton.prototype,"type",2),X([k({type:String,reflect:!0})],e.EVAButton.prototype,"size",2),X([k({type:Boolean,reflect:!0})],e.EVAButton.prototype,"fullWidth",2),e.EVAButton=X([i("eva-button")],e.EVAButton);var Z=Object.defineProperty,J=Object.getOwnPropertyDescriptor,Q=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?J(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&Z(t,i,s),s};e.EVACard=class extends K{constructor(){super(...arguments),this.componentName="eva-card",this.variant="default",this.padding="medium"}render(){return t.html`
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
    `}},e.EVACard.styles=t.css`
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
  `,Q([k({type:String,reflect:!0})],e.EVACard.prototype,"variant",2),Q([k({type:String,reflect:!0})],e.EVACard.prototype,"padding",2),e.EVACard=Q([i("eva-card")],e.EVACard);var ee=Object.defineProperty,te=Object.getOwnPropertyDescriptor,ie=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?te(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&ee(t,i,s),s};e.EVAAlert=class extends K{constructor(){super(...arguments),this.componentName="eva-alert",this.type="info",this.dismissible=!1,this.visible=!0,this.live="polite"}render(){return t.html`
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
        ${this.dismissible?t.html`
              <button
                class="alert-dismiss"
                aria-label="${this.t("dismiss-alert","Dismiss alert")}"
                @click="${this._handleDismiss}"
              >
                ×
              </button>
            `:""}
      </div>
    `}_handleDismiss(){this.visible=!1,this.announce(this.t("alert-dismissed","Alert dismissed"),"polite"),this.dispatchEvent(new CustomEvent("eva-dismiss",{bubbles:!0,composed:!0}))}},e.EVAAlert.styles=t.css`
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
  `,ie([k({type:String,reflect:!0})],e.EVAAlert.prototype,"type",2),ie([k({type:Boolean,reflect:!0})],e.EVAAlert.prototype,"dismissible",2),ie([k({type:Boolean,reflect:!0})],e.EVAAlert.prototype,"visible",2),ie([k({type:String})],e.EVAAlert.prototype,"live",2),e.EVAAlert=ie([i("eva-alert")],e.EVAAlert);var oe=Object.defineProperty,re=Object.getOwnPropertyDescriptor,se=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?re(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&oe(t,i,s),s};e.EVAInput=class extends K{constructor(){super(...arguments),this.componentName="eva-input",this.label="",this.type="text",this.value="",this.placeholder="",this.name="",this.required=!1,this.readonly=!1,this.error="",this.hint=""}render(){const e=`eva-input-${this.name||Math.random().toString(36).substr(2,9)}`,i=this.hint?`${e}-hint`:"",o=this.error?`${e}-error`:"";return t.html`
      <div class="input-wrapper">
        ${this.label?t.html`
              <label class="label" for="${e}">
                ${this.label}
                ${this.required?t.html`<span class="required-marker">*</span>`:""}
              </label>
            `:""}

        ${this.hint&&!this.error?t.html`<div class="hint" id="${i}">${this.hint}</div>`:""}

        <div class="input-container">
          <input
            id="${e}"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            name="${this.name}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            ?disabled="${this.disabled}"
            maxlength="${this.maxlength||""}"
            class="${this.error?"has-error":""}"
            aria-label="${this.ariaLabel||this.label}"
            aria-describedby="${o||i||this.ariaDescribedBy||""}"
            aria-invalid="${this.error?"true":"false"}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
        </div>

        ${this.error?t.html`
              <div class="error-message" id="${o}" role="alert">
                ${this.error}
              </div>
            `:""}

        ${this.maxlength&&this.value?t.html`
              <div class="char-count">
                ${this.value.length} / ${this.maxlength}
              </div>
            `:""}
      </div>
    `}_handleInput(e){const t=e.target;this.value=t.value,this.dispatchEvent(new CustomEvent("eva-input",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleChange(e){const t=e.target;this.value=t.value,this.dispatchEvent(new CustomEvent("eva-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleFocus(){}_handleBlur(){}},e.EVAInput.styles=t.css`
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
  `,se([k({type:String})],e.EVAInput.prototype,"label",2),se([k({type:String})],e.EVAInput.prototype,"type",2),se([k({type:String})],e.EVAInput.prototype,"value",2),se([k({type:String})],e.EVAInput.prototype,"placeholder",2),se([k({type:String})],e.EVAInput.prototype,"name",2),se([k({type:Boolean})],e.EVAInput.prototype,"required",2),se([k({type:Boolean})],e.EVAInput.prototype,"readonly",2),se([k({type:String})],e.EVAInput.prototype,"error",2),se([k({type:String})],e.EVAInput.prototype,"hint",2),se([k({type:Number})],e.EVAInput.prototype,"maxlength",2),e.EVAInput=se([i("eva-input")],e.EVAInput);var ne=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,le=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ae(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&ne(t,i,s),s};e.EVASelect=class extends K{constructor(){super(...arguments),this.componentName="eva-select",this.label="",this.value="",this.placeholder="",this.name="",this.required=!1,this.error="",this.hint=""}render(){const e=`eva-select-${this.name||Math.random().toString(36).substr(2,9)}`,i=this.hint?`${e}-hint`:"",o=this.error?`${e}-error`:"";return t.html`
      <div class="select-wrapper">
        ${this.label?t.html`
              <label class="label" for="${e}">
                ${this.label}
                ${this.required?t.html`<span class="required-marker">*</span>`:""}
              </label>
            `:""}

        ${this.hint&&!this.error?t.html`<div class="hint" id="${i}">${this.hint}</div>`:""}

        <div class="select-container">
          <select
            id="${e}"
            .value="${this.value}"
            name="${this.name}"
            ?required="${this.required}"
            ?disabled="${this.disabled}"
            class="${this.error?"has-error":""}"
            aria-label="${this.ariaLabel||this.label}"
            aria-describedby="${o||i||this.ariaDescribedBy||""}"
            aria-invalid="${this.error?"true":"false"}"
            @change="${this._handleChange}"
          >
            ${this.placeholder?t.html`<option value="" disabled selected>${this.placeholder}</option>`:""}
            <slot></slot>
          </select>
          <div class="arrow-icon"></div>
        </div>

        ${this.error?t.html`
              <div class="error-message" id="${o}" role="alert">
                ${this.error}
              </div>
            `:""}
      </div>
    `}_handleChange(e){const t=e.target;this.value=t.value,this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new CustomEvent("eva-change",{detail:{value:this.value},bubbles:!0,composed:!0}))}},e.EVASelect.styles=t.css`
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
  `,le([k({type:String})],e.EVASelect.prototype,"label",2),le([k({type:String})],e.EVASelect.prototype,"value",2),le([k({type:String})],e.EVASelect.prototype,"placeholder",2),le([k({type:String})],e.EVASelect.prototype,"name",2),le([k({type:Boolean})],e.EVASelect.prototype,"required",2),le([k({type:String})],e.EVASelect.prototype,"error",2),le([k({type:String})],e.EVASelect.prototype,"hint",2),e.EVASelect=le([i("eva-select")],e.EVASelect);var de=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,he=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ce(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&de(t,i,s),s};e.EVACheckbox=class extends K{constructor(){super(...arguments),this.componentName="eva-checkbox",this.checked=!1,this.indeterminate=!1,this.value="",this.name=""}render(){const e=`eva-checkbox-${this.name||Math.random().toString(36).substr(2,9)}`;return t.html`
      <label class="checkbox-wrapper">
        <div class="checkbox-input">
          <input
            type="checkbox"
            id="${e}"
            .checked="${this.checked}"
            .indeterminate="${this.indeterminate}"
            .value="${this.value}"
            name="${this.name}"
            ?disabled="${this.disabled}"
            aria-label="${this.ariaLabel||""}"
            aria-checked="${this.indeterminate?"mixed":this.checked?"true":"false"}"
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
    `}_handleChange(e){const t=e.target;this.checked=t.checked,this.indeterminate=!1,this.dispatchEvent(new CustomEvent("eva-change",{detail:{checked:this.checked,value:this.value},bubbles:!0,composed:!0}))}},e.EVACheckbox.styles=t.css`
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
  `,he([k({type:Boolean,reflect:!0})],e.EVACheckbox.prototype,"checked",2),he([k({type:Boolean,reflect:!0})],e.EVACheckbox.prototype,"indeterminate",2),he([k({type:String})],e.EVACheckbox.prototype,"value",2),he([k({type:String})],e.EVACheckbox.prototype,"name",2),e.EVACheckbox=he([i("eva-checkbox")],e.EVACheckbox);var pe=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,me=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ue(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&pe(t,i,s),s};e.EVARadio=class extends K{constructor(){super(...arguments),this.componentName="eva-radio",this.checked=!1,this.value="",this.name="",this.required=!1}render(){const e=`eva-radio-${this.name}-${this.value||Math.random().toString(36).substr(2,9)}`;return t.html`
      <label class="radio-wrapper" for="${e}">
        <div class="radio-input">
          <input
            type="radio"
            id="${e}"
            .checked="${this.checked}"
            .value="${this.value}"
            name="${this.name}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            aria-label="${this.ariaLabel||""}"
            aria-checked="${this.checked?"true":"false"}"
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
    `}_handleChange(e){const t=e.target;if(this.checked=t.checked,this.checked&&this.name){document.querySelectorAll(`eva-radio[name="${this.name}"]`).forEach(e=>{e!==this&&(e.checked=!1)})}this.dispatchEvent(new CustomEvent("eva-change",{detail:{checked:this.checked,value:this.value},bubbles:!0,composed:!0}))}},e.EVARadio.styles=t.css`
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
  `,me([k({type:Boolean,reflect:!0})],e.EVARadio.prototype,"checked",2),me([k({type:String})],e.EVARadio.prototype,"value",2),me([k({type:String})],e.EVARadio.prototype,"name",2),me([k({type:Boolean,reflect:!0})],e.EVARadio.prototype,"required",2),e.EVARadio=me([i("eva-radio")],e.EVARadio);var be=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,ge=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?fe(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&be(t,i,s),s};e.EVAModal=class extends K{constructor(){super(...arguments),this.componentName="eva-modal",this.open=!1,this.label="",this.noCloseOnBackdrop=!1,this.noCloseOnEscape=!1,this.size="medium",this._focusTrap=null,this._previousActiveElement=null,this._handleKeydown=e=>{"Escape"!==e.key||this.noCloseOnEscape||(e.preventDefault(),this.close())}}render(){return this.open?t.html`
      <div class="backdrop modal-backdrop" @click="${this._handleBackdropClick}"></div>
      <dialog
        class="modal"
        data-size="${this.size}"
        ?open="${this.open}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-header"
        aria-label="${this.label||this.ariaLabel||"Modal dialog"}"
      >
        <div class="modal-header" id="modal-header">
          <slot name="header"></slot>
          <button
            class="close-button modal-close"
            aria-label="${this.t("eva-modal.close","Close modal")}"
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
    `:t.html``}connectedCallback(){super.connectedCallback(),this.open&&this._setupFocusTrap()}disconnectedCallback(){super.disconnectedCallback(),this._teardownFocusTrap()}updated(e){e.has("open")&&(this.open?(this._setupFocusTrap(),this._previousActiveElement=document.activeElement,document.body.style.overflow="hidden",this.dispatchEvent(new CustomEvent("eva-open",{bubbles:!0,composed:!0}))):(this._teardownFocusTrap(),this._previousActiveElement&&this._previousActiveElement.focus(),document.body.style.overflow=""))}_setupFocusTrap(){var e;const t=null==(e=this.shadowRoot)?void 0:e.querySelector(".modal");t&&(this._focusTrap=new L(t),this._focusTrap.activate()),this.noCloseOnEscape||document.addEventListener("keydown",this._handleKeydown)}_teardownFocusTrap(){this._focusTrap&&(this._focusTrap.deactivate(),this._focusTrap=null),document.removeEventListener("keydown",this._handleKeydown)}_handleBackdropClick(e){this.noCloseOnBackdrop||e.target!==e.currentTarget||this.close()}close(){this.open=!1,this.dispatchEvent(new CustomEvent("eva-close",{bubbles:!0,composed:!0}))}},e.EVAModal.styles=t.css`
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
  `,ge([k({type:Boolean,reflect:!0})],e.EVAModal.prototype,"open",2),ge([k({type:String})],e.EVAModal.prototype,"label",2),ge([k({type:Boolean})],e.EVAModal.prototype,"noCloseOnBackdrop",2),ge([k({type:Boolean})],e.EVAModal.prototype,"noCloseOnEscape",2),ge([k({type:String})],e.EVAModal.prototype,"size",2),e.EVAModal=ge([i("eva-modal")],e.EVAModal);var ve=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,xe=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?ye(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&ve(t,i,s),s};e.EVATabs=class extends K{constructor(){super(...arguments),this.componentName="eva-tabs",this.activeIndex=0,this.activeTab=0,this.orientation="horizontal",this._tabs=[]}render(){return this.activeTab!==this.activeIndex&&(this.activeIndex=this.activeTab),t.html`
      <div class="tabs-container">
        <div
          role="tablist"
          aria-label="${this.ariaLabel||"Tabs"}"
          aria-orientation="${this.orientation}"
          class="tabs-list"
        >
          ${this._tabs.map((e,i)=>t.html`
              <button
                role="tab"
                class="tab-button"
                id="tab-${i}"
                aria-selected="${i===this.activeIndex}"
                aria-controls="panel-${i}"
                tabindex="${i===this.activeIndex?0:-1}"
                @click="${()=>this._handleTabClick(i)}"
                @keydown="${e=>this._handleKeydown(e,i)}"
              >
                ${e.label}
              </button>
            `)}
        </div>
      </div>
      <div class="tab-panels">
        <slot></slot>
      </div>
    `}firstUpdated(){this._updateTabs()}_updateTabs(){var e;const t=null==(e=this.shadowRoot)?void 0:e.querySelector("slot");if(t){const e=t.assignedElements();this._tabs=e.filter(e=>"EVA-TAB"===e.tagName),this._tabs.forEach((e,t)=>{e.active=t===this.activeIndex,e.setAttribute("role","tabpanel"),e.setAttribute("id",`panel-${t}`),e.setAttribute("aria-labelledby",`tab-${t}`)}),this.requestUpdate()}}_handleTabClick(e){this.activeIndex=e,this.activeTab=e,this._updateTabs(),this.dispatchEvent(new CustomEvent("eva-tab-change",{detail:{activeIndex:this.activeIndex},bubbles:!0,composed:!0}))}_handleKeydown(e,t){var i;let o=t;switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),o=t>0?t-1:this._tabs.length-1;break;case"ArrowRight":case"ArrowDown":e.preventDefault(),o=t<this._tabs.length-1?t+1:0;break;case"Home":e.preventDefault(),o=0;break;case"End":e.preventDefault(),o=this._tabs.length-1;break;default:return}this.activeIndex=o,this.activeTab=o,this._updateTabs();const r=null==(i=this.shadowRoot)?void 0:i.querySelector(`#tab-${o}`);r&&r.focus(),this.dispatchEvent(new CustomEvent("eva-tab-change",{detail:{activeIndex:this.activeIndex,activeTab:this.activeTab},bubbles:!0,composed:!0}))}updated(e){super.updated(e),e.has("activeTab")&&this.activeTab!==this.activeIndex&&(this.activeIndex=this.activeTab,this._updateTabs(),this.dispatchEvent(new CustomEvent("eva-tab-change",{detail:{activeIndex:this.activeIndex,activeTab:this.activeTab},bubbles:!0,composed:!0}))),e.has("orientation")&&this.setAttribute("orientation",this.orientation)}},e.EVATabs.styles=t.css`
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
  `,xe([k({type:Number})],e.EVATabs.prototype,"activeIndex",2),xe([k({type:Number})],e.EVATabs.prototype,"activeTab",2),xe([k({type:String})],e.EVATabs.prototype,"orientation",2),xe([S()],e.EVATabs.prototype,"_tabs",2),e.EVATabs=xe([i("eva-tabs")],e.EVATabs),e.EVATab=class extends K{constructor(){super(...arguments),this.componentName="eva-tab",this.label="",this.active=!1}render(){return t.html`<slot></slot>`}},e.EVATab.styles=t.css`
    :host {
      display: none;
    }

    :host([active]) {
      display: block;
    }
  `,xe([k({type:String})],e.EVATab.prototype,"label",2),xe([k({type:Boolean,reflect:!0})],e.EVATab.prototype,"active",2),e.EVATab=xe([i("eva-tab")],e.EVATab);const Ae=globalThis,$e=Ae.trustedTypes,_e=$e?$e.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ee="$lit$",we=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+we,Se=`<${ke}>`,Ce=document,Ve=()=>Ce.createComment(""),Te=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Pe=Array.isArray,Oe="[ \t\n\f\r]",Re=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Me=/-->/g,Ie=/>/g,Ne=RegExp(`>|${Oe}(?:([^\\s"'>=/]+)(${Oe}*=${Oe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Be=/"/g,De=/^(?:script|style|textarea|title)$/i,je=Symbol.for("lit-noChange"),Le=Symbol.for("lit-nothing"),Ue=new WeakMap,He=Ce.createTreeWalker(Ce,129);function qe(e,t){if(!Pe(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_e?_e.createHTML(t):t}class Fe{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0;const n=e.length-1,a=this.parts,[l,d]=((e,t)=>{const i=e.length-1,o=[];let r,s=2===t?"<svg>":3===t?"<math>":"",n=Re;for(let a=0;a<i;a++){const t=e[a];let i,l,d=-1,c=0;for(;c<t.length&&(n.lastIndex=c,l=n.exec(t),null!==l);)c=n.lastIndex,n===Re?"!--"===l[1]?n=Me:void 0!==l[1]?n=Ie:void 0!==l[2]?(De.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=Ne):void 0!==l[3]&&(n=Ne):n===Ne?">"===l[0]?(n=r??Re,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?Ne:'"'===l[3]?Be:ze):n===Be||n===ze?n=Ne:n===Me||n===Ie?n=Re:(n=Ne,r=void 0);const h=n===Ne&&e[a+1].startsWith("/>")?" ":"";s+=n===Re?t+Se:d>=0?(o.push(i),t.slice(0,d)+Ee+t.slice(d)+we+h):t+we+(-2===d?a:h)}return[qe(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]})(e,t);if(this.el=Fe.createElement(l,i),He.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=He.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(Ee)){const t=d[s++],i=o.getAttribute(e).split(we),n=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?Xe:"?"===n[1]?Ze:"@"===n[1]?Je:Ge}),o.removeAttribute(e)}else e.startsWith(we)&&(a.push({type:6,index:r}),o.removeAttribute(e));if(De.test(o.tagName)){const e=o.textContent.split(we),t=e.length-1;if(t>0){o.textContent=$e?$e.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],Ve()),He.nextNode(),a.push({type:2,index:++r});o.append(e[t],Ve())}}}else if(8===o.nodeType)if(o.data===ke)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(we,e+1));)a.push({type:7,index:r}),e+=we.length-1}r++}}static createElement(e,t){const i=Ce.createElement("template");return i.innerHTML=e,i}}function We(e,t,i=e,o){var r,s;if(t===je)return t;let n=void 0!==o?null==(r=i._$Co)?void 0:r[o]:i._$Cl;const a=Te(t)?void 0:t._$litDirective$;return(null==n?void 0:n.constructor)!==a&&(null==(s=null==n?void 0:n._$AO)||s.call(n,!1),void 0===a?n=void 0:(n=new a(e),n._$AT(e,i,o)),void 0!==o?(i._$Co??(i._$Co=[]))[o]=n:i._$Cl=n),void 0!==n&&(t=We(e,n._$AS(e,t.values),n,o)),t}let Ke=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=((null==e?void 0:e.creationScope)??Ce).importNode(t,!0);He.currentNode=o;let r=He.nextNode(),s=0,n=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new Ye(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new Qe(r,this,e)),this._$AV.push(t),a=i[++n]}s!==(null==a?void 0:a.index)&&(r=He.nextNode(),s++)}return He.currentNode=Ce,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class Ye{get _$AU(){var e;return(null==(e=this._$AM)?void 0:e._$AU)??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=Le,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=(null==o?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=We(this,e,t),Te(e)?e===Le||null==e||""===e?(this._$AH!==Le&&this._$AR(),this._$AH=Le):e!==this._$AH&&e!==je&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>Pe(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Le&&Te(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ce.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:o}=e,r="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Fe.createElement(qe(o.h,o.h[0]),this.options)),o);if((null==(t=this._$AH)?void 0:t._$AD)===r)this._$AH.p(i);else{const e=new Ke(r,this),t=e.u(this.options);e.p(i),this.T(t),this._$AH=e}}_$AC(e){let t=Ue.get(e.strings);return void 0===t&&Ue.set(e.strings,t=new Fe(e)),t}k(e){Pe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new Ye(this.O(Ve()),this.O(Ve()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null==(i=this._$AP)||i.call(this,!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cv=e,null==(t=this._$AP)||t.call(this,e))}}class Ge{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=Le,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Le}_$AI(e,t=this,i,o){const r=this.strings;let s=!1;if(void 0===r)e=We(this,e,t,0),s=!Te(e)||e!==this._$AH&&e!==je,s&&(this._$AH=e);else{const o=e;let n,a;for(e=r[0],n=0;n<r.length-1;n++)a=We(this,o[i+n],t,n),a===je&&(a=this._$AH[n]),s||(s=!Te(a)||a!==this._$AH[n]),a===Le?e=Le:e!==Le&&(e+=(a??"")+r[n+1]),this._$AH[n]=a}s&&!o&&this.j(e)}j(e){e===Le?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Xe extends Ge{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Le?void 0:e}}class Ze extends Ge{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Le)}}class Je extends Ge{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=We(this,e,t,0)??Le)===je)return;const i=this._$AH,o=e===Le&&i!==Le||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==Le&&(i===Le||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;"function"==typeof this._$AH?this._$AH.call((null==(t=this.options)?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Qe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){We(this,e)}}const et={I:Ye},tt=Ae.litHtmlPolyfillSupport;null==tt||tt(Fe,Ye),(Ae.litHtmlVersions??(Ae.litHtmlVersions=[])).push("3.3.1");const it=2;class ot{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:rt}=et,st=()=>document.createComment(""),nt=(e,t,i)=>{var o;const r=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=r.insertBefore(st(),s),o=r.insertBefore(st(),s);i=new rt(t,o,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,a=n!==e;if(a){let t;null==(o=i._$AQ)||o.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==s||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;r.insertBefore(e,s),e=t}}}return i},at=(e,t,i=e)=>(e._$AI(t,i),e),lt={},dt=e=>{e._$AR(),e._$AA.remove()},ct=(e,t,i)=>{const o=new Map;for(let r=t;r<=i;r++)o.set(e[r],r);return o},ht=(pt=class extends ot{constructor(e){if(super(e),e.type!==it)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);const r=[],s=[];let n=0;for(const a of e)r[n]=o?o(a,n):n,s[n]=i(a,n),n++;return{values:s,keys:r}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,o]){const r=e._$AH,{values:s,keys:n}=this.dt(t,i,o);if(!Array.isArray(r))return this.ut=n,s;const a=this.ut??(this.ut=[]),l=[];let d,c,h=0,p=r.length-1,u=0,m=s.length-1;for(;h<=p&&u<=m;)if(null===r[h])h++;else if(null===r[p])p--;else if(a[h]===n[u])l[u]=at(r[h],s[u]),h++,u++;else if(a[p]===n[m])l[m]=at(r[p],s[m]),p--,m--;else if(a[h]===n[m])l[m]=at(r[h],s[m]),nt(e,l[m+1],r[h]),h++,m--;else if(a[p]===n[u])l[u]=at(r[p],s[u]),nt(e,r[h],r[p]),p--,u++;else if(void 0===d&&(d=ct(n,u,m),c=ct(a,h,p)),d.has(a[h]))if(d.has(a[p])){const t=c.get(n[u]),i=void 0!==t?r[t]:null;if(null===i){const t=nt(e,r[h]);at(t,s[u]),l[u]=t}else l[u]=at(i,s[u]),nt(e,r[h],i),r[t]=null;u++}else dt(r[p]),p--;else dt(r[h]),h++;for(;u<=m;){const t=nt(e,l[m+1]);at(t,s[u]),l[u++]=t}for(;h<=p;){const e=r[h++];null!==e&&dt(e)}return this.ut=n,((e,t=lt)=>{e._$AH=t})(e,l),je}},(...e)=>({_$litDirective$:pt,values:e}));var pt,ut=Object.defineProperty,mt=Object.getOwnPropertyDescriptor,bt=(e,t,i,o)=>{for(var r,s=o>1?void 0:o?mt(t,i):t,n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&ut(t,i,s),s};e.EVAChatPanel=class extends K{constructor(){super(...arguments),this.componentName="eva-chat-panel",this.greeting="",this.isTyping=!1,this.messages=[],this._inputValue="",this._messagesEndRef=null,this._setMessagesEndRef=e=>{this._messagesEndRef=e}}render(){return t.html`
      <div class="chat-header">
        ${this.t("eva-chat-panel.title","EVA Assistant")}
      </div>

      <div class="chat-messages" @scroll="${this._handleScroll}">
        ${this.greeting&&0===this.messages.length?t.html`<div class="greeting-message">${this.greeting}</div>`:""}

        ${ht(this.messages,e=>e.id,e=>t.html`
            <div class="message ${e.sender}" role="article">
              <div class="message-bubble">${e.content}</div>
              <div class="message-meta">
                <span class="sender-label">
                  ${"user"===e.sender?this.t("eva-chat-panel.you","You"):"assistant"===e.sender?this.t("eva-chat-panel.eva","EVA"):this.t("eva-chat-panel.system","System")}
                </span>
                <span class="timestamp">${this._formatTime(e.timestamp)}</span>
              </div>
            </div>
          `)}

        ${this.isTyping?t.html`
              <div class="typing-indicator" role="status" aria-live="polite">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            `:""}

        <div style="height: 1px;" ${this._setMessagesEndRef}></div>
      </div>

      <div class="chat-input-container">
        <input
          type="text"
          class="chat-input"
          .value="${this._inputValue}"
          placeholder="${this.t("eva-chat-panel.placeholder","Type your message...")}"
          aria-label="${this.t("eva-chat-panel.input-label","Chat message input")}"
          @input="${this._handleInput}"
          @keydown="${this._handleKeydown}"
        />
        <button
          class="send-button"
          aria-label="${this.t("eva-chat-panel.send","Send message")}"
          ?disabled="${!this._inputValue.trim()||this.isTyping}"
          @click="${this._handleSend}"
        >
          ➤
        </button>
      </div>
    `}updated(e){(e.has("messages")||e.has("isTyping"))&&this._scrollToBottom()}_scrollToBottom(){this._messagesEndRef&&this._messagesEndRef.scrollIntoView({behavior:"smooth",block:"end"})}_handleScroll(){}_handleInput(e){const t=e.target;this._inputValue=t.value}_handleKeydown(e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),this._handleSend())}_handleSend(){if(!this._inputValue.trim()||this.isTyping)return;const e={id:`msg-${Date.now()}`,sender:"user",content:this._inputValue.trim(),timestamp:new Date,type:"text"};this.messages=[...this.messages,e],this._inputValue="",this.dispatchEvent(new CustomEvent("eva-message-send",{detail:{message:e},bubbles:!0,composed:!0})),this.announce(this.t("eva-chat-panel.message-sent","Message sent"),"polite")}_formatTime(e){return e.toLocaleTimeString(this.locale,{hour:"2-digit",minute:"2-digit"})}addMessage(e){const t={...e,id:`msg-${Date.now()}`,timestamp:new Date};this.messages=[...this.messages,t]}clearMessages(){this.messages=[]}},e.EVAChatPanel.styles=t.css`
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
  `,bt([k({type:String})],e.EVAChatPanel.prototype,"greeting",2),bt([k({type:Boolean})],e.EVAChatPanel.prototype,"isTyping",2),bt([k({type:Array})],e.EVAChatPanel.prototype,"messages",2),bt([S()],e.EVAChatPanel.prototype,"_inputValue",2),bt([S()],e.EVAChatPanel.prototype,"_messagesEndRef",2),e.EVAChatPanel=bt([i("eva-chat-panel")],e.EVAChatPanel);const ft={id:"canada-gc",name:"Government of Canada",colors:{fipRed:"#af3c43",linkBlue:"#284162",errorRed:"#d3080c",accentBlue:"#26374A",textPrimary:"#333333",textSecondary:"#666666",textDisabled:"#999999",textInverse:"#ffffff",backgroundPrimary:"#ffffff",backgroundSecondary:"#f5f5f5",backgroundTertiary:"#e1e4e7",successGreen:"#278400",warningYellow:"#ff9900",infoCyan:"#269abc",dangerRed:"#d3080c",focusOutline:"#26374A",hoverBackground:"#e8e8e8",activeBackground:"#d9d9d9"},typography:{fontFamilyHeadings:"Lato, sans-serif",fontFamilyBody:"Noto Sans, sans-serif",fontFamilyMono:"Courier New, monospace",fontWeightRegular:400,fontWeightBold:700,fontSizeXs:"0.75rem",fontSizeSm:"0.875rem",fontSizeBase:"1rem",fontSizeMd:"1.125rem",fontSizeLg:"1.25rem",fontSizeXl:"1.5rem",fontSize2xl:"2rem",fontSize3xl:"2.5rem",lineHeightTight:1.2,lineHeightNormal:1.5,lineHeightRelaxed:1.75,letterSpacingNormal:"0",letterSpacingWide:"0.025em"},spacing:{space0:"0",space1:"0.25rem",space2:"0.5rem",space3:"0.75rem",space4:"1rem",space5:"1.25rem",space6:"1.5rem",space8:"2rem",space10:"2.5rem",space12:"3rem",space16:"4rem",space20:"5rem"},shadows:{shadowSm:"0 1px 2px 0 rgba(0, 0, 0, 0.05)",shadowBase:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",shadowMd:"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",shadowLg:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",shadowXl:"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"},breakpoints:{xs:"320px",sm:"576px",md:"768px",lg:"992px",xl:"1200px",xxl:"1400px"},accessibility:{contrastRatioAAA:7,contrastRatioAA:4.5,touchTargetMin:"44px",focusOutlineWidth:"3px",focusOutlineStyle:"solid",focusOutlineOffset:"2px",transitionDuration:"200ms",transitionTimingFunction:"ease-in-out"},layout:{maxLineLength:"65ch",containerSm:"640px",containerMd:"768px",containerLg:"1024px",containerXl:"1280px",radiusNone:"0",radiusSm:"0.125rem",radiusBase:"0.25rem",radiusMd:"0.375rem",radiusLg:"0.5rem",radiusFull:"9999px",borderWidth0:"0",borderWidth1:"1px",borderWidth2:"2px",borderWidth4:"4px"}};function gt(e){const t=document.documentElement;Object.entries(e.colors).forEach(([e,i])=>{t.style.setProperty(`--gc-color-${vt(e)}`,String(i))}),Object.entries(e.typography).forEach(([e,i])=>{t.style.setProperty(`--gc-typography-${vt(e)}`,String(i))}),Object.entries(e.spacing).forEach(([e,i])=>{t.style.setProperty(`--gc-spacing-${vt(e)}`,String(i))}),Object.entries(e.shadows).forEach(([e,i])=>{t.style.setProperty(`--gc-shadow-${vt(e)}`,String(i))}),Object.entries(e.breakpoints).forEach(([e,i])=>{t.style.setProperty(`--gc-breakpoint-${vt(e)}`,String(i))}),Object.entries(e.accessibility).forEach(([e,i])=>{t.style.setProperty(`--gc-a11y-${vt(e)}`,String(i))}),Object.entries(e.layout).forEach(([e,i])=>{t.style.setProperty(`--gc-layout-${vt(e)}`,String(i))})}function vt(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function yt(){gt(ft)}"undefined"!=typeof document&&yt(),e.EVAElement=K,e.FocusTrap=L,e.LiveRegionManager=U,e.applySovereignProfile=gt,e.formatCurrency=function(e,t,i="CAD"){return new Intl.NumberFormat(t,{style:"currency",currency:i}).format(e)},e.formatDate=function(e,t,i){return new Intl.DateTimeFormat(t,i).format(e)},e.formatNumber=function(e,t,i){return new Intl.NumberFormat(t,i).format(e)},e.gcProfile=ft,e.getGlobalLocale=D,e.getLiveRegionManager=q,e.getMessage=T,e.getNextFocusable=function(e,t){const i=Array.from(t.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(e=>!e.hasAttribute("disabled")&&null!==e.offsetParent),o=i.indexOf(e);return-1===o||o===i.length-1?null:i[o+1]??null},e.getPreviousFocusable=function(e,t){const i=Array.from(t.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(e=>!e.hasAttribute("disabled")&&null!==e.offsetParent),o=i.indexOf(e);return o<=0?null:i[o-1]??null},e.getSystemLocale=function(){return(navigator.language||"en-CA").toLowerCase().startsWith("fr")?"fr-CA":"en-CA"},e.handleArrowKeyNavigation=function(e,t,i={}){var o;const{vertical:r=!0,horizontal:s=!1,loop:n=!0}=i,a=Array.from(t.querySelectorAll('a[href], button:not([disabled]), [role="button"], [role="menuitem"], [role="option"]')).filter(e=>!e.hasAttribute("disabled")&&null!==e.offsetParent);if(0===a.length)return;const l=a.indexOf(document.activeElement);let d=l;r&&"ArrowDown"===e.key||s&&"ArrowRight"===e.key?(e.preventDefault(),d=l+1,d>=a.length&&(d=n?0:a.length-1)):r&&"ArrowUp"===e.key||s&&"ArrowLeft"===e.key?(e.preventDefault(),d=l-1,d<0&&(d=n?a.length-1:0)):"Home"===e.key?(e.preventDefault(),d=0):"End"===e.key&&(e.preventDefault(),d=a.length-1),null==(o=a[d])||o.focus()},e.initGCProfile=yt,e.isFocusable=function(e){if(e.hasAttribute("disabled")||"-1"===e.getAttribute("tabindex"))return!1;const t=e.tagName.toLowerCase();return!!["a","button","input","select","textarea"].includes(t)||e.hasAttribute("tabindex")&&"-1"!==e.getAttribute("tabindex")},e.registerMessages=V,e.setGlobalLocale=function(e){z=e,B.forEach(t=>t(e))},e.subscribeToLocale=j,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=eva-sovereign-ui.umd.js.map
