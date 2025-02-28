import "clsx";
import { _ as current_component, $ as fallback, a0 as attr, a1 as bind_props, W as pop, T as push, a2 as head, Y as getContext, a3 as ensure_array_like, a4 as stringify, a5 as add_styles, a6 as sanitize_props, a7 as rest_props, a8 as spread_attributes, a9 as clsx, aa as element, ab as slot, ac as spread_props, ad as store_get, ae as unsubscribe_stores, Z as escape_html, V as setContext } from "../../chunks/index.js";
import { g as get, w as writable, d as derived, r as readable } from "../../chunks/index2.js";
import "dequal";
import { nanoid } from "nanoid/non-secure";
import { createFocusTrap } from "focus-trap";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
async function tick() {
}
let timeoutAction;
let timeoutEnable;
function withoutTransition(action) {
  if (typeof document === "undefined")
    return;
  clearTimeout(timeoutAction);
  clearTimeout(timeoutEnable);
  const style = document.createElement("style");
  const css = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
  style.appendChild(css);
  const disable = () => document.head.appendChild(style);
  const enable = () => document.head.removeChild(style);
  if (typeof window.getComputedStyle !== "undefined") {
    disable();
    action();
    window.getComputedStyle(style).opacity;
    enable();
    return;
  }
  if (typeof window.requestAnimationFrame !== "undefined") {
    disable();
    action();
    window.requestAnimationFrame(enable);
    return;
  }
  disable();
  timeoutAction = window.setTimeout(() => {
    action();
    timeoutEnable = window.setTimeout(enable, 120);
  }, 120);
}
function sanitizeClassNames(classNames) {
  return classNames.filter((className) => className.length > 0);
}
const noopStorage = {
  getItem: (_key) => null,
  setItem: (_key, _value) => {
  }
};
const isBrowser$1 = typeof document !== "undefined";
const modes = ["dark", "light", "system"];
const modeStorageKey = writable("mode-watcher-mode");
const themeStorageKey = writable("mode-watcher-theme");
const userPrefersMode = createUserPrefersMode();
const systemPrefersMode = createSystemMode();
const themeColors = writable(void 0);
const theme = createCustomTheme();
const disableTransitions = writable(true);
const darkClassNames = writable([]);
const lightClassNames = writable([]);
createDerivedMode();
createDerivedTheme();
function createUserPrefersMode() {
  const defaultValue = "system";
  const storage = isBrowser$1 ? localStorage : noopStorage;
  const initialValue = storage.getItem(getModeStorageKey());
  let value = isValidMode(initialValue) ? initialValue : defaultValue;
  function getModeStorageKey() {
    return get(modeStorageKey);
  }
  const { subscribe, set: _set } = writable(value, () => {
    if (!isBrowser$1)
      return;
    const handler = (e) => {
      if (e.key !== getModeStorageKey())
        return;
      const newValue = e.newValue;
      if (isValidMode(newValue)) {
        _set(value = newValue);
      } else {
        _set(value = defaultValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v) {
    _set(value = v);
    storage.setItem(getModeStorageKey(), value);
  }
  return {
    subscribe,
    set
  };
}
function createCustomTheme() {
  const storage = isBrowser$1 ? localStorage : noopStorage;
  const initialValue = storage.getItem(getThemeStorageKey());
  let value = initialValue === null || initialValue === void 0 ? "" : initialValue;
  function getThemeStorageKey() {
    return get(themeStorageKey);
  }
  const { subscribe, set: _set } = writable(value, () => {
    if (!isBrowser$1)
      return;
    const handler = (e) => {
      if (e.key !== getThemeStorageKey())
        return;
      const newValue = e.newValue;
      if (newValue === null) {
        _set(value = "");
      } else {
        _set(value = newValue);
      }
    };
    addEventListener("storage", handler);
    return () => removeEventListener("storage", handler);
  });
  function set(v) {
    _set(value = v);
    storage.setItem(getThemeStorageKey(), value);
  }
  return {
    subscribe,
    set
  };
}
function createSystemMode() {
  const defaultValue = void 0;
  let track = true;
  const { subscribe, set } = writable(defaultValue, () => {
    if (!isBrowser$1)
      return;
    const handler = (e) => {
      if (!track)
        return;
      set(e.matches ? "light" : "dark");
    };
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    mediaQueryState.addEventListener("change", handler);
    return () => mediaQueryState.removeEventListener("change", handler);
  });
  function query() {
    if (!isBrowser$1)
      return;
    const mediaQueryState = window.matchMedia("(prefers-color-scheme: light)");
    set(mediaQueryState.matches ? "light" : "dark");
  }
  function tracking(active) {
    track = active;
  }
  return {
    subscribe,
    query,
    tracking
  };
}
function createDerivedMode() {
  const { subscribe } = derived([
    userPrefersMode,
    systemPrefersMode,
    themeColors,
    disableTransitions,
    darkClassNames,
    lightClassNames
  ], ([$userPrefersMode, $systemPrefersMode, $themeColors, $disableTransitions, $darkClassNames, $lightClassNames]) => {
    if (!isBrowser$1)
      return void 0;
    const derivedMode = $userPrefersMode === "system" ? $systemPrefersMode : $userPrefersMode;
    const sanitizedDarkClassNames = sanitizeClassNames($darkClassNames);
    const sanitizedLightClassNames = sanitizeClassNames($lightClassNames);
    function update() {
      const htmlEl = document.documentElement;
      const themeColorEl = document.querySelector('meta[name="theme-color"]');
      if (derivedMode === "light") {
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.remove(...sanitizedDarkClassNames);
        if (sanitizedLightClassNames.length)
          htmlEl.classList.add(...sanitizedLightClassNames);
        htmlEl.style.colorScheme = "light";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.light);
        }
      } else {
        if (sanitizedLightClassNames.length)
          htmlEl.classList.remove(...sanitizedLightClassNames);
        if (sanitizedDarkClassNames.length)
          htmlEl.classList.add(...sanitizedDarkClassNames);
        htmlEl.style.colorScheme = "dark";
        if (themeColorEl && $themeColors) {
          themeColorEl.setAttribute("content", $themeColors.dark);
        }
      }
    }
    if ($disableTransitions) {
      withoutTransition(update);
    } else {
      update();
    }
    return derivedMode;
  });
  return {
    subscribe
  };
}
function createDerivedTheme() {
  const { subscribe } = derived([theme, disableTransitions], ([$theme, $disableTransitions]) => {
    if (!isBrowser$1)
      return void 0;
    function update() {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("data-theme", $theme);
    }
    if ($disableTransitions) {
      withoutTransition(update);
    } else {
      update();
    }
    return $theme;
  });
  return {
    subscribe
  };
}
function isValidMode(value) {
  if (typeof value !== "string")
    return false;
  return modes.includes(value);
}
function defineConfig(config) {
  return config;
}
function setInitialMode({ defaultMode = "system", themeColors: themeColors2, darkClassNames: darkClassNames2 = ["dark"], lightClassNames: lightClassNames2 = [], defaultTheme = "", modeStorageKey: modeStorageKey2 = "mode-watcher-mode", themeStorageKey: themeStorageKey2 = "mode-watcher-theme" }) {
  const rootEl = document.documentElement;
  const mode = localStorage.getItem(modeStorageKey2) || defaultMode;
  const theme2 = localStorage.getItem(themeStorageKey2) || defaultTheme;
  const light = mode === "light" || mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  if (light) {
    if (darkClassNames2.length)
      rootEl.classList.remove(...darkClassNames2);
    if (lightClassNames2.length)
      rootEl.classList.add(...lightClassNames2);
  } else {
    if (lightClassNames2.length)
      rootEl.classList.remove(...lightClassNames2);
    if (darkClassNames2.length)
      rootEl.classList.add(...darkClassNames2);
  }
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  if (theme2) {
    rootEl.setAttribute("data-theme", theme2);
    localStorage.setItem(themeStorageKey2, theme2);
  }
  localStorage.setItem(modeStorageKey2, mode);
}
function Mode_watcher_lite($$payload, $$props) {
  push();
  let themeColors2 = fallback($$props["themeColors"], () => void 0, true);
  if (themeColors2) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { themeColors: themeColors2 });
  pop();
}
function Mode_watcher_full($$payload, $$props) {
  push();
  let trueNonce = fallback($$props["trueNonce"], "");
  let initConfig = $$props["initConfig"];
  let themeColors2 = fallback($$props["themeColors"], () => void 0, true);
  head($$payload, ($$payload2) => {
    if (themeColors2) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
  });
  bind_props($$props, { trueNonce, initConfig, themeColors: themeColors2 });
  pop();
}
function Mode_watcher($$payload, $$props) {
  push();
  let trueNonce;
  let track = fallback($$props["track"], true);
  let defaultMode = fallback($$props["defaultMode"], "system");
  let themeColors$1 = fallback($$props["themeColors"], () => void 0, true);
  let disableTransitions$1 = fallback($$props["disableTransitions"], true);
  let darkClassNames$1 = fallback($$props["darkClassNames"], () => ["dark"], true);
  let lightClassNames$1 = fallback($$props["lightClassNames"], () => [], true);
  let defaultTheme = fallback($$props["defaultTheme"], "");
  let nonce = fallback($$props["nonce"], "");
  let themeStorageKey$1 = fallback($$props["themeStorageKey"], "mode-watcher-theme");
  let modeStorageKey$1 = fallback($$props["modeStorageKey"], "mode-watcher-mode");
  let disableHeadScriptInjection = fallback($$props["disableHeadScriptInjection"], false);
  const initConfig = defineConfig({
    defaultMode,
    themeColors: themeColors$1,
    darkClassNames: darkClassNames$1,
    lightClassNames: lightClassNames$1,
    defaultTheme,
    modeStorageKey: modeStorageKey$1,
    themeStorageKey: themeStorageKey$1
  });
  disableTransitions.set(disableTransitions$1);
  themeColors.set(themeColors$1);
  darkClassNames.set(darkClassNames$1);
  lightClassNames.set(lightClassNames$1);
  modeStorageKey.set(modeStorageKey$1);
  themeStorageKey.set(themeStorageKey$1);
  trueNonce = typeof window === "undefined" ? nonce : "";
  if (disableHeadScriptInjection) {
    $$payload.out += "<!--[-->";
    Mode_watcher_lite($$payload, { themeColors: themeColors$1 });
  } else {
    $$payload.out += "<!--[!-->";
    Mode_watcher_full($$payload, { trueNonce, initConfig, themeColors: themeColors$1 });
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    track,
    defaultMode,
    themeColors: themeColors$1,
    disableTransitions: disableTransitions$1,
    darkClassNames: darkClassNames$1,
    lightClassNames: lightClassNames$1,
    defaultTheme,
    nonce,
    themeStorageKey: themeStorageKey$1,
    modeStorageKey: modeStorageKey$1,
    disableHeadScriptInjection
  });
  pop();
}
function Presentation($$payload, $$props) {
  push();
  $$payload.out += `<section id="presentation" class="shadow-vignette-light dark:shadow-vignette-dark h-full w-full scroll-mt-12"><div class="fill-foreground dark:fill-accent flex flex-col items-center justify-between">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></section>`;
  pop();
}
const useIntersectionObserver = () => {
  let element2 = void 0;
  let intersectionObserverContext = getContext("intersectionObserver");
  let intersect = !intersectionObserverContext.observer || !element2 || intersectionObserverContext.intersectedElement === element2;
  return {
    get intersect() {
      return intersect;
    },
    set element(value) {
      element2 = value;
    }
  };
};
function History($$payload, $$props) {
  push();
  let intersectionObserver = useIntersectionObserver();
  $$payload.out += `<section id="history" class="fill-foreground dark:fill-accent shadow-vignette-light dark:shadow-vignette-dark top-full flex h-full w-full scroll-mt-12 items-center justify-center">`;
  if (intersectionObserver.intersect) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="font-display bg-background/80 dark:bg-foreground/90 dark:to-foreground flex w-full items-center justify-center p-8 font-thin md:w-auto md:rounded-md dark:from-stone-800">C'est chez les étudiants en médecine de Strasbourg que la Feis joue ses
      premières notes.<br> Depuis 20 ans déjà, elle anime les rues de Strasbourg et d'ailleurs.<br> Son répertoire est disco, electro et dansant.<br> La fanfare propose ses prestations pour tout type d'événements !</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
function Image($$payload, $$props) {
  push();
  let { path, verticalPath = null } = $$props;
  if (typeof path === "string") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img${attr("class", `${stringify(verticalPath && "hidden sm:block")} h-full w-full object-cover`)}${attr("src", path.img.src)}${attr("width", path.img.w)}${attr("height", path.img.h)}>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(Object.entries(path.sources));
    $$payload.out += `<picture><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [format, srcset] = each_array[$$index];
      $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
    }
    $$payload.out += `<!--]--> <img${attr("class", `${stringify(verticalPath && "hidden sm:block")} h-full w-full object-cover`)}${attr("src", path.img.src)}${attr("width", path.img.w)}${attr("height", path.img.h)}></picture>`;
  }
  $$payload.out += `<!--]--> `;
  if (verticalPath) {
    $$payload.out += "<!--[-->";
    if (typeof verticalPath === "string") {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img class="h-full w-full object-cover sm:hidden"${attr("src", verticalPath.img.src)}${attr("width", verticalPath.img.w)}${attr("height", verticalPath.img.h)}>`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array_1 = ensure_array_like(Object.entries(verticalPath.sources));
      $$payload.out += `<picture><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let [format, srcset] = each_array_1[$$index_1];
        $$payload.out += `<source${attr("srcset", srcset)}${attr("type", "image/" + format)}>`;
      }
      $$payload.out += `<!--]--> <img class="h-full w-full object-cover sm:hidden"${attr("src", verticalPath.img.src)}${attr("width", verticalPath.img.w)}${attr("height", verticalPath.img.h)}></picture>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const homeLight = {
  sources: {
    avif: "/_app/immutable/assets/home-light.Dupv9Xte.avif 2784w, /_app/immutable/assets/home-light.DMgZOSCG.avif 5568w",
    webp: "/_app/immutable/assets/home-light.am4yCyqg.webp 2784w, /_app/immutable/assets/home-light.D6Ru7PpE.webp 5568w",
    jpeg: "/_app/immutable/assets/home-light.BZ5c3YeF.jpeg 2784w, /_app/immutable/assets/home-light.xKLlr5di.jpeg 5568w"
  },
  img: {
    src: "/_app/immutable/assets/home-light.xKLlr5di.jpeg",
    w: 5568,
    h: 3128
  }
};
const historyLight = {
  sources: {
    avif: "/_app/immutable/assets/history-light.BT-IbAtt.avif 2026w, /_app/immutable/assets/history-light.BTXhuAS7.avif 4051w",
    webp: "/_app/immutable/assets/history-light.wMrCqiNo.webp 2026w, /_app/immutable/assets/history-light.BKzJbLVG.webp 4051w",
    jpeg: "/_app/immutable/assets/history-light.WRFDSmO3.jpeg 2026w, /_app/immutable/assets/history-light.AtdVQpq1.jpeg 4051w"
  },
  img: {
    src: "/_app/immutable/assets/history-light.AtdVQpq1.jpeg",
    w: 4051,
    h: 2683
  }
};
const prestationsLight = {
  sources: {
    avif: "/_app/immutable/assets/prestations-light.rH6VE0bh.avif 2408w, /_app/immutable/assets/prestations-light.DmA-fyf2.avif 4815w",
    webp: "/_app/immutable/assets/prestations-light.CyqCBoGH.webp 2408w, /_app/immutable/assets/prestations-light.DrUmj88n.webp 4815w",
    jpeg: "/_app/immutable/assets/prestations-light.xec_1y2R.jpeg 2408w, /_app/immutable/assets/prestations-light.CXJ7OgQQ.jpeg 4815w"
  },
  img: {
    src: "/_app/immutable/assets/prestations-light.CXJ7OgQQ.jpeg",
    w: 4815,
    h: 3214
  }
};
const prestationsLightVertical = {
  sources: {
    avif: "/_app/immutable/assets/prestations-light-vertical.B-vbi6I6.avif 930w, /_app/immutable/assets/prestations-light-vertical.D7pcgMOu.avif 1860w",
    webp: "/_app/immutable/assets/prestations-light-vertical.CWT6zHBb.webp 930w, /_app/immutable/assets/prestations-light-vertical.Ck0cdrqJ.webp 1860w",
    jpeg: "/_app/immutable/assets/prestations-light-vertical.CgxHpje6.jpeg 930w, /_app/immutable/assets/prestations-light-vertical.BE8Z52qf.jpeg 1860w"
  },
  img: {
    src: "/_app/immutable/assets/prestations-light-vertical.BE8Z52qf.jpeg",
    w: 1860,
    h: 3206
  }
};
const contactLight = {
  sources: {
    avif: "/_app/immutable/assets/contact-light.ChhXyh_p.avif 810w, /_app/immutable/assets/contact-light.Bp0-jxRD.avif 1620w",
    webp: "/_app/immutable/assets/contact-light.CxYDsEyf.webp 810w, /_app/immutable/assets/contact-light.M7hAEwci.webp 1620w",
    jpeg: "/_app/immutable/assets/contact-light.DKJstNJE.jpeg 810w, /_app/immutable/assets/contact-light.CI8qoGDD.jpeg 1620w"
  },
  img: {
    src: "/_app/immutable/assets/contact-light.CI8qoGDD.jpeg",
    w: 1620,
    h: 1080
  }
};
const socialLight = {
  sources: {
    avif: "/_app/immutable/assets/social-light.CiXEeoDN.avif 2160w, /_app/immutable/assets/social-light.BSISuY0i.avif 4320w",
    webp: "/_app/immutable/assets/social-light.BKWFk6eL.webp 2160w, /_app/immutable/assets/social-light.BqKKeZdl.webp 4320w",
    jpeg: "/_app/immutable/assets/social-light.Sb_FRsY1.jpeg 2160w, /_app/immutable/assets/social-light.CYJZniJx.jpeg 4320w"
  },
  img: {
    src: "/_app/immutable/assets/social-light.CYJZniJx.jpeg",
    w: 4320,
    h: 3240
  }
};
const homeDarkVertical = {
  sources: {
    avif: "/_app/immutable/assets/home-dark-vertical.DkvGOsan.avif 123w, /_app/immutable/assets/home-dark-vertical.C7A1mzlg.avif 246w",
    webp: "/_app/immutable/assets/home-dark-vertical.ubEG55R1.webp 123w, /_app/immutable/assets/home-dark-vertical.C4XVxaXj.webp 246w",
    jpeg: "/_app/immutable/assets/home-dark-vertical.D-OA8leQ.jpeg 123w, /_app/immutable/assets/home-dark-vertical.Ct2oQ0qV.jpeg 246w"
  },
  img: {
    src: "/_app/immutable/assets/home-dark-vertical.Ct2oQ0qV.jpeg",
    w: 246,
    h: 800
  }
};
const homeDark = {
  sources: {
    avif: "/_app/immutable/assets/home-dark.CSa-eeAW.avif 500w, /_app/immutable/assets/home-dark.B25jPbZF.avif 1000w",
    webp: "/_app/immutable/assets/home-dark.Bv01Cm3J.webp 500w, /_app/immutable/assets/home-dark.BvqUuP6G.webp 1000w",
    jpeg: "/_app/immutable/assets/home-dark.BOp-GP-G.jpeg 500w, /_app/immutable/assets/home-dark.D1elxFfa.jpeg 1000w"
  },
  img: {
    src: "/_app/immutable/assets/home-dark.D1elxFfa.jpeg",
    w: 1e3,
    h: 800
  }
};
const historyDark = {
  sources: {
    avif: "/_app/immutable/assets/history-dark.Ub6sO1Ej.avif 2217w, /_app/immutable/assets/history-dark.Z7FmR5Ga.avif 4433w",
    webp: "/_app/immutable/assets/history-dark.BDIbbK_1.webp 2217w, /_app/immutable/assets/history-dark.BVksiOKT.webp 4433w",
    jpeg: "/_app/immutable/assets/history-dark.DIQWDZcC.jpeg 2217w, /_app/immutable/assets/history-dark.CKxdirso.jpeg 4433w"
  },
  img: {
    src: "/_app/immutable/assets/history-dark.CKxdirso.jpeg",
    w: 4433,
    h: 2936
  }
};
const prestationsDark = {
  sources: {
    avif: "/_app/immutable/assets/prestations-dark.qD6pX14X.avif 2332w, /_app/immutable/assets/prestations-dark.CWQWkT6f.avif 4664w",
    webp: "/_app/immutable/assets/prestations-dark.C0pip4z2.webp 2332w, /_app/immutable/assets/prestations-dark.BppBHOrB.webp 4664w",
    jpeg: "/_app/immutable/assets/prestations-dark.B6gcm77k.jpeg 2332w, /_app/immutable/assets/prestations-dark.CcF-hsth.jpeg 4664w"
  },
  img: {
    src: "/_app/immutable/assets/prestations-dark.CcF-hsth.jpeg",
    w: 4664,
    h: 2623
  }
};
const prestationsDarkVertical = {
  sources: {
    avif: "/_app/immutable/assets/prestations-dark-vertical.0lB6EfET.avif 626w, /_app/immutable/assets/prestations-dark-vertical.B9p3-vQX.avif 1252w",
    webp: "/_app/immutable/assets/prestations-dark-vertical.B7AEouYX.webp 626w, /_app/immutable/assets/prestations-dark-vertical.CBzydL5v.webp 1252w",
    jpeg: "/_app/immutable/assets/prestations-dark-vertical.DXQ3012M.jpeg 626w, /_app/immutable/assets/prestations-dark-vertical.JwIYyWBF.jpeg 1252w"
  },
  img: {
    src: "/_app/immutable/assets/prestations-dark-vertical.JwIYyWBF.jpeg",
    w: 1252,
    h: 2612
  }
};
const contactDark = {
  sources: {
    avif: "/_app/immutable/assets/contact-dark.CbOvcB0h.avif 810w, /_app/immutable/assets/contact-dark.BeV137EF.avif 1620w",
    webp: "/_app/immutable/assets/contact-dark.BBTjHuvX.webp 810w, /_app/immutable/assets/contact-dark.ChaNOGN1.webp 1620w",
    jpeg: "/_app/immutable/assets/contact-dark.BF8cvjJY.jpeg 810w, /_app/immutable/assets/contact-dark.BGHJPRTn.jpeg 1620w"
  },
  img: {
    src: "/_app/immutable/assets/contact-dark.BGHJPRTn.jpeg",
    w: 1620,
    h: 1080
  }
};
const socialDark = {
  sources: {
    avif: "/_app/immutable/assets/social-dark.DhppiJ-A.avif 800w, /_app/immutable/assets/social-dark.CnQnOMkM.avif 1600w",
    webp: "/_app/immutable/assets/social-dark.C8oiMtmL.webp 800w, /_app/immutable/assets/social-dark.DPvcYjaL.webp 1600w",
    jpeg: "/_app/immutable/assets/social-dark.DvHADRWW.jpeg 800w, /_app/immutable/assets/social-dark.BGohrEtx.jpeg 1600w"
  },
  img: {
    src: "/_app/immutable/assets/social-dark.BGohrEtx.jpeg",
    w: 1600,
    h: 1066
  }
};
function Background($$payload) {
  const backgrounds = {
    light: [
      { horizontal: homeLight },
      { horizontal: historyLight },
      {
        horizontal: prestationsLight,
        vertical: prestationsLightVertical
      },
      { horizontal: contactLight },
      { horizontal: socialLight }
    ],
    dark: [
      {
        horizontal: homeDark,
        vertical: homeDarkVertical
      },
      { horizontal: historyDark },
      {
        horizontal: prestationsDark,
        vertical: prestationsDarkVertical
      },
      { horizontal: contactDark },
      { horizontal: socialDark }
    ]
  };
  const each_array = ensure_array_like(backgrounds.light);
  const each_array_1 = ensure_array_like(backgrounds.dark);
  $$payload.out += `<div${add_styles({ height: "calc(100vh - 2.75rem)" })} class="layer back -z-10 w-full"><div class="h-full w-full dark:hidden"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { horizontal, vertical } = each_array[$$index];
    Image($$payload, { path: horizontal, verticalPath: vertical });
  }
  $$payload.out += `<!--]--></div> <div class="hidden h-full w-full dark:block"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let { horizontal, vertical } = each_array_1[$$index_1];
    Image($$payload, { path: horizontal, verticalPath: vertical });
  }
  $$payload.out += `<!--]--></div></div>`;
}
function Buffer($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div${add_styles({ height: "calc(20% + 0.275rem)" })} class="bg-background text-foreground border-accent dark:bg-foreground dark:text-background relative flex w-full items-center justify-center border-y-2 px-2 text-center text-3xl font-bold"><div class="relative">`;
  children?.($$payload);
  $$payload.out += `<!----></div></div>`;
}
function Item($$payload, $$props) {
  let { anchor, children } = $$props;
  $$payload.out += `<li class="flex"><a class="hover:text-accent w-full font-bold transition-colors"${attr("href", anchor)}>`;
  children?.($$payload);
  $$payload.out += `<!----></a></li>`;
}
function Navigation($$payload) {
  Item($$payload, {
    anchor: "#presentation",
    children: ($$payload2) => {
      $$payload2.out += `<!---->PRESENTATION`;
    }
  });
  $$payload.out += `<!----> `;
  Item($$payload, {
    anchor: "#history",
    children: ($$payload2) => {
      $$payload2.out += `<!---->HISTOIRE`;
    }
  });
  $$payload.out += `<!----> `;
  Item($$payload, {
    anchor: "#prestations",
    children: ($$payload2) => {
      $$payload2.out += `<!---->PRESTATIONS`;
    }
  });
  $$payload.out += `<!----> `;
  Item($$payload, {
    anchor: "#contact",
    children: ($$payload2) => {
      $$payload2.out += `<!---->CONTACT`;
    }
  });
  $$payload.out += `<!----> `;
  Item($$payload, {
    anchor: "#social",
    children: ($$payload2) => {
      $$payload2.out += `<!---->SOCIAL`;
    }
  });
  $$payload.out += `<!---->`;
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
({
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function portalAttr(portal) {
  if (portal !== null) {
    return "";
  }
  return void 0;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction(removeUndefined({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            }));
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction(removeUndefined({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        }));
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction(removeUndefined({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          }));
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction(removeUndefined({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      })));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name: name2,
    attribute,
    selector,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
const isFunction = (v) => typeof v === "function";
function isShadowRoot(element2) {
  return element2 instanceof ShadowRoot;
}
function isElement(element2) {
  return element2 instanceof Element;
}
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function addEventListener$1(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
function withGet(store) {
  return {
    ...store,
    get: () => get(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get2 = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get2());
      }));
    });
    subscriber(get2());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get: get2,
    subscribe
  };
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ENTER: "Enter",
  ESCAPE: "Escape",
  SPACE: " "
};
function debounce(fn, wait = 500) {
  let timeout;
  const debounced = (...args) => {
    clearTimeout(timeout);
    const later = () => fn(...args);
    timeout = setTimeout(later, wait);
  };
  debounced.destroy = () => clearTimeout(timeout);
  return debounced;
}
const isDom = () => typeof window !== "undefined";
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
const pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
const isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
const isMac = () => pt(/^mac/) && !isTouchDevice();
const isApple = () => pt(/mac|iphone|ipad|ipod/i);
const isIos = () => isApple() && !isMac();
const LOCK_CLASSNAME = "data-melt-scroll-lock";
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = document;
  const win = doc.defaultView ?? window;
  const { documentElement, body } = doc;
  const locked = body.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop;
  body.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  const setStyle = () => assignStyle(body, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body.removeAttribute(LOCK_CLASSNAME);
  };
}
function effect(stores, fn, opts = {}) {
  const { skipFirstRun } = opts;
  let isFirstRun = true;
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    if (isFirstRun && skipFirstRun) {
      isFirstRun = false;
    } else {
      cb = fn(stores2);
    }
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement(el))
      return;
    el.focus();
  } else if (isHTMLElement(returned)) {
    returned.focus();
  }
}
({
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0),
  type: readable(void 0)
});
const layers$1 = /* @__PURE__ */ new Map();
const useEscapeKeydown = (node, config = {}) => {
  let unsub = noop;
  function update(config2 = {}) {
    unsub();
    const options = { behaviorType: "close", ...config2 };
    const behaviorType = isReadable(options.behaviorType) ? options.behaviorType : withGet(readable(options.behaviorType));
    layers$1.set(node, behaviorType);
    const onKeyDown = (e) => {
      if (e.key !== kbd.ESCAPE || !isResponsibleEscapeLayer(node))
        return;
      const target = e.target;
      if (!isHTMLElement(target))
        return;
      e.preventDefault();
      if (shouldIgnoreEvent(e, options.ignore))
        return;
      if (shouldInvokeResponsibleLayerHandler(behaviorType.get())) {
        options.handler?.(e);
      }
    };
    unsub = executeCallbacks(addEventListener$1(document, "keydown", onKeyDown, { passive: false }), effect(behaviorType, ($behaviorType) => {
      if ($behaviorType === "close" || $behaviorType === "defer-otherwise-close" && [...layers$1.keys()][0] === node) {
        node.dataset.escapee = "";
      } else {
        delete node.dataset.escapee;
      }
    }), behaviorType.destroy || noop);
  }
  update(config);
  return {
    update,
    destroy() {
      layers$1.delete(node);
      delete node.dataset.escapee;
      unsub();
    }
  };
};
const isResponsibleEscapeLayer = (node) => {
  const layersArr = [...layers$1];
  const topMostLayer = layersArr.findLast(([_, behaviorType]) => {
    const $behaviorType = behaviorType.get();
    return $behaviorType === "close" || $behaviorType === "ignore";
  });
  if (topMostLayer)
    return topMostLayer[0] === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === node;
};
const shouldIgnoreEvent = (e, ignore) => {
  if (!ignore)
    return false;
  if (isFunction(ignore) && ignore(e))
    return true;
  if (Array.isArray(ignore) && ignore.some((ignoreEl) => e.target === ignoreEl)) {
    return true;
  }
  return false;
};
const shouldInvokeResponsibleLayerHandler = (behaviorType) => {
  return behaviorType === "close" || behaviorType === "defer-otherwise-close";
};
const useFocusTrap = (node, config = {}) => {
  let unsub = noop;
  const update = (config2) => {
    unsub();
    const trap = createFocusTrap(node, {
      returnFocusOnDeactivate: false,
      allowOutsideClick: true,
      escapeDeactivates: false,
      clickOutsideDeactivates: false,
      ...config2
    });
    unsub = trap.deactivate;
    trap.activate();
  };
  update(config);
  return { destroy: unsub, update };
};
const useModal = (node, config) => {
  let unsubInteractOutside = noop;
  function update(config2) {
    unsubInteractOutside();
    const { onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    function closeModal() {
      onClose?.();
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement(target))
        return;
      e.stopImmediatePropagation();
    }
    function onInteractOutside(e) {
      if (!shouldCloseOnInteractOutside?.(e))
        return;
      e.stopImmediatePropagation();
      closeModal();
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: closeOnInteractOutside
    }).destroy;
  }
  update(config);
  return {
    update,
    destroy() {
      unsubInteractOutside();
    }
  };
};
const usePortal = (el, target = "body") => {
  let targetEl;
  if (!isHTMLElement(target) && typeof target !== "string") {
    return {
      destroy: noop
    };
  }
  async function update(newTarget = "body") {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    el.dataset.portal = "";
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    el.remove();
  }
  update(target);
  return {
    update,
    destroy
  };
};
const layers = /* @__PURE__ */ new Set();
const useInteractOutside = (node, config = {}) => {
  let unsubEvents = noop;
  let unsubPointerDown = noop;
  let unsubPointerUp = noop;
  let unsubResetInterceptedEvents = noop;
  layers.add(node);
  const documentObj = getOwnerDocument(node);
  let isPointerDown = false;
  let isPointerDownInside = false;
  const interceptedEvents = {
    pointerdown: false,
    pointerup: false,
    mousedown: false,
    mouseup: false,
    touchstart: false,
    touchend: false,
    click: false
  };
  const resetInterceptedEvents = () => {
    for (const eventType in interceptedEvents) {
      interceptedEvents[eventType] = false;
    }
  };
  const isAnyEventIntercepted = () => {
    for (const isIntercepted of Object.values(interceptedEvents)) {
      if (isIntercepted)
        return true;
    }
    return false;
  };
  const setupCapturePhaseHandlerAndMarkAsIntercepted = (eventType, handler) => {
    return addEventListener$1(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = true;
      handler?.(e);
    }, true);
  };
  const setupBubblePhaseHandlerAndMarkAsNotIntercepted = (eventType, handler) => {
    return addEventListener$1(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = false;
      const computedData = {};
      if (isHTMLElement(e.target) && isShadowRoot(e.target.shadowRoot)) {
        computedData.shadowTarget = e.composedPath()[0];
      }
      handler?.(e, computedData);
    });
  };
  function update(config2) {
    unsubEvents();
    unsubPointerDown();
    unsubPointerUp();
    unsubResetInterceptedEvents();
    resetInterceptedEvents();
    const { onInteractOutside, onInteractOutsideStart, enabled } = { enabled: true, ...config2 };
    if (!enabled)
      return;
    let wasTopLayerInPointerDownCapture = false;
    const onPointerDownDebounced = debounce((e, computedEventData) => {
      if (!wasTopLayerInPointerDownCapture || isAnyEventIntercepted())
        return;
      if (onInteractOutside && isValidEvent(e, node))
        onInteractOutsideStart?.(e);
      const target = computedEventData?.shadowTarget ? computedEventData.shadowTarget : e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }, 10);
    unsubPointerDown = onPointerDownDebounced.destroy;
    const onPointerUpDebounced = debounce((e) => {
      if (wasTopLayerInPointerDownCapture && !isAnyEventIntercepted() && shouldTriggerInteractOutside(e)) {
        onInteractOutside?.(e);
      }
      resetPointerState();
    }, 10);
    unsubPointerUp = onPointerUpDebounced.destroy;
    const resetInterceptedEventsDebounced = debounce(resetInterceptedEvents, 20);
    unsubResetInterceptedEvents = resetInterceptedEventsDebounced.destroy;
    const markTopLayerInPointerDown = () => {
      wasTopLayerInPointerDownCapture = isHighestLayer(node);
    };
    unsubEvents = executeCallbacks(
      /** Capture Events For Interaction Start */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerdown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mousedown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchstart", markTopLayerInPointerDown),
      /**
       * Intercepted events are reset only at the end of an interaction, allowing
       * interception at the start while still capturing the entire interaction.
       * Additionally, intercepted events are reset in the capture phase with `resetInterceptedEventsDebounced`,
       * accommodating events not invoked in the bubbling phase due to user interception.
       */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mouseup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchend", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("click", resetInterceptedEventsDebounced),
      /** Bubbling Events For Interaction Start */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerdown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mousedown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchstart", onPointerDownDebounced),
      /**
       * To effectively detect an end of an interaction, we must monitor all relevant events,
       * not just `click` events. This is because on touch devices, actions like pressing,
       * moving the finger, and lifting it off the screen may not trigger a `click` event,
       * but should still invoke `onPointerUp` to properly handle the interaction.
       */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mouseup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchend", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("click", onPointerUpDebounced)
    );
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy() {
      unsubEvents();
      unsubPointerDown();
      unsubPointerUp();
      unsubResetInterceptedEvents();
      layers.delete(node);
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isHighestLayer(node) {
  return Array.from(layers).at(-1) === node;
}
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  ...omit(defaults$1, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
const { name } = createElHelpers("dialog");
const defaults = {
  preventScroll: true,
  escapeBehavior: "close",
  closeOnOutsideClick: true,
  role: "dialog",
  defaultOpen: false,
  portal: "body",
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const dialogIdParts = ["content", "title", "description"];
function createDialog(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "ids"));
  const { preventScroll, escapeBehavior, closeOnOutsideClick, role, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({
    ...generateIds(dialogIdParts),
    ...withDefaults.ids
  });
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  let unsubScroll = noop;
  function handleOpen(e) {
    const el = e.currentTarget;
    const triggerEl = e.currentTarget;
    if (!isHTMLElement(el) || !isHTMLElement(triggerEl))
      return;
    open.set(true);
    activeTrigger.set(triggerEl);
  }
  function handleClose() {
    open.set(false);
  }
  const trigger = makeElement(name("trigger"), {
    stores: [open],
    returned: ([$open]) => {
      return {
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        type: "button"
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        handleOpen(e);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        handleOpen(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible, open],
    returned: ([$isVisible, $open]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: $isVisible ? void 0 : styleToString({ display: "none" }),
        "aria-hidden": true,
        "data-state": $open ? "open" : "closed"
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [isVisible, ids.content, ids.description, ids.title, open],
    returned: ([$isVisible, $contentId, $descriptionId, $titleId, $open]) => {
      return {
        id: $contentId,
        role: role.get(),
        "aria-describedby": $descriptionId,
        "aria-labelledby": $titleId,
        "aria-modal": $isVisible ? "true" : void 0,
        "data-state": $open ? "open" : "closed",
        tabindex: -1,
        hidden: $isVisible ? void 0 : true,
        style: $isVisible ? void 0 : styleToString({ display: "none" })
      };
    },
    action: (node) => {
      let unsubEscape = noop;
      let unsubModal = noop;
      let unsubFocusTrap = noop;
      const unsubDerived = effect([isVisible, closeOnOutsideClick], ([$isVisible, $closeOnOutsideClick]) => {
        unsubModal();
        unsubEscape();
        unsubFocusTrap();
        if (!$isVisible)
          return;
        unsubModal = useModal(node, {
          closeOnInteractOutside: $closeOnOutsideClick,
          onClose: handleClose,
          shouldCloseOnInteractOutside(e) {
            onOutsideClick.get()?.(e);
            if (e.defaultPrevented)
              return false;
            return true;
          }
        }).destroy;
        unsubEscape = useEscapeKeydown(node, {
          handler: handleClose,
          behaviorType: escapeBehavior
        }).destroy;
        unsubFocusTrap = useFocusTrap(node, { fallbackFocus: node }).destroy;
      });
      return {
        destroy: () => {
          unsubScroll();
          unsubDerived();
          unsubModal();
          unsubEscape();
          unsubFocusTrap();
        }
      };
    }
  });
  const portalled = makeElement(name("portalled"), {
    stores: portal,
    returned: ($portal) => ({
      "data-portal": portalAttr($portal)
    }),
    action: (node) => {
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null)
          return noop;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubPortal();
        }
      };
    }
  });
  const title = makeElement(name("title"), {
    stores: [ids.title],
    returned: ([$titleId]) => ({
      id: $titleId
    })
  });
  const description = makeElement(name("description"), {
    stores: [ids.description],
    returned: ([$descriptionId]) => ({
      id: $descriptionId
    })
  });
  const close = makeElement(name("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.SPACE && e.key !== kbd.ENTER)
          return;
        e.preventDefault();
        handleClose();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, preventScroll], ([$open, $preventScroll]) => {
    if (!isBrowser)
      return;
    if ($preventScroll && $open)
      unsubScroll = removeScroll();
    if ($open) {
      const contentEl = document.getElementById(ids.content.get());
      handleFocus({ prop: openFocus.get(), defaultEl: contentEl });
    }
    return () => {
      if (!forceVisible.get()) {
        unsubScroll();
      }
    };
  });
  effect(open, ($open) => {
    if (!isBrowser || $open)
      return;
    handleFocus({
      prop: closeFocus.get(),
      defaultEl: activeTrigger.get()
    });
  }, { skipFirstRun: true });
  return {
    ids,
    elements: {
      content,
      trigger,
      title,
      description,
      overlay,
      close,
      portalled
    },
    states: {
      open
    },
    options
  };
}
/**
 * @license lucide-svelte v0.476.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name2 = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx(mergeClasses("lucide-icon", "lucide", name2 ? `lucide-${name2}` : "", $$sanitized_props.class))
    },
    null,
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, null, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></svg>`;
  bind_props($$props, {
    name: name2,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Facebook($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "facebook" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Instagram($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "20",
        "x": "2",
        "y": "2",
        "rx": "5",
        "ry": "5"
      }
    ],
    [
      "path",
      {
        "d": "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
      }
    ],
    [
      "line",
      {
        "x1": "17.5",
        "x2": "17.51",
        "y1": "6.5",
        "y2": "6.5"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "instagram" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Menu($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      { "x1": "4", "x2": "20", "y1": "6", "y2": "6" }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "menu" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Moon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      { "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "moon" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Sun($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "4" }
    ],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  Icon($$payload, spread_props([
    { name: "sun" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Youtube($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
      }
    ],
    ["path", { "d": "m10 15 5-3-5-3z" }]
  ];
  Icon($$payload, spread_props([
    { name: "youtube" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function LightSwitch($$payload) {
  $$payload.out += `<button class="flex"><div class="dark:bg-accent flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 transition-colors duration-700"><div class="absolute flex h-12 w-12 items-center justify-center text-neutral-100 transition-colors duration-700 dark:text-neutral-900">`;
  Moon($$payload, { class: "h-6 w-6 dark:hidden" });
  $$payload.out += `<!----> `;
  Sun($$payload, { class: "hidden h-6 w-6 dark:block" });
  $$payload.out += `<!----></div></div> <span class="sr-only">Toggle theme</span></button>`;
}
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  const {
    elements: {
      trigger,
      portalled,
      overlay,
      content,
      title
    },
    states: { open }
  } = createDialog();
  $$payload.out += `<header class="border-accent bg-background dark:bg-foreground fixed top-0 z-50 flex h-12 w-screen items-center justify-between border-b-2 px-4"><a href="#presentation" aria-label="Retour à l'accueil"><svg class="fill-foreground dark:fill-background h-12 w-12" viewBox="0 0 119 40"><path d="m 18.882184,34.177232 c -0.0301,-2.90694 -0.14523,-6.06328 -0.25587,-7.0141 -0.56169,-4.82727 -1.84079,-8.50317 -3.92271,-11.27321 l -0.80598,-1.07238 -1.04235,-0.90159 C 9.9984936,11.444882 6.0608736,10.086762 1.2791646,9.9232216 l -1.26014095,-0.0431 -0.01764,-4.56845 c -0.0097,-2.51265 0.03265,-4.61918999 0.09413,-4.68119999 0.06146,-0.062 15.94496035,-0.18085 35.29662035,-0.26409 l 35.18483,-0.15135 0.0202,4.69481999 0.0202,4.69481 -24.38957,0.10549 -24.38958,0.10549 0.90753,1.3092904 c 0.49915,0.72011 1.33522,2.14163 1.85792,3.15893 l 0.95039,1.84964 6.36823,-0.026 6.36822,-0.026 0.0179,4.63696 0.0179,4.63695 -5.25863,0.0247 -5.25863,0.0247 0.14969,1.26704 c 0.0823,0.69688 0.17489,3.87752 0.2057,7.06808 l 0.056,5.80104 -4.58766,0.0218 c -2.5232,0.012 -4.61203,-0.006 -4.64182,-0.0393 -0.0297,-0.0337 -0.0788,-2.43947 -0.10887,-5.34639 z m 26.05254,1.44738 -0.0179,-4.63809 12.89613,-0.0563 12.89612,-0.0563 0.02,4.63882 0.02,4.63883 -12.8982,0.0556 -12.8982,0.0556 z m -0.0643,-14.93399 -0.0179,-4.63809 12.89613,-0.0563 12.89613,-0.0563 0.02,4.63882 0.02,4.63883 -12.89821,0.0556 -12.8982,0.0556 z m 32.35519,-0.53703 -0.0856,-19.96921039 4.63827,-0.0179 4.63827,-0.0179 0.0861,19.96713039 0.086,19.96713 -4.63874,0.02 -4.63874,0.02 z m 16.24404,15.14825 -0.0179,-4.63672 5.71018,-0.0276 5.710186,-0.0276 0.43219,-0.29198 0.43218,-0.29197 0.25988,-0.75812 c 0.4554,-1.32843 0.10327,-3.17094 -0.77425,-4.05128 l -0.41952,-0.42155 -1.56931,-0.0722 c -2.7417,-0.12619 -4.765446,-0.82215 -6.781176,-2.33203 l -0.98029,-0.73427 -0.88919,-1.12533 c -3.06162,-3.87467 -3.62868,-9.24979 -1.45164,-13.7597904 0.22838,-0.47311 0.80663,-1.37128 1.28501,-1.99595 l 0.86978,-1.13578 1.0801,-0.84056 c 1.39209,-1.0834 2.89129,-1.81015999 4.714836,-2.28562999 l 1.4585,-0.38028 8.22764,-0.0666 L 118.9945,1.6064453e-6 119.0173,4.6943816 l 0.0228,4.69439 -7.9562,0.0573 -7.95622,0.0573 -0.61605,0.34615 -0.61605,0.3461504 -0.3508,0.6104 -0.35079,0.6104 0.0201,1.16401 0.0201,1.16402 0.36797,0.61231 0.36798,0.61232 0.40429,0.17946 c 0.22231,0.0987 0.90218,0.19237 1.51074,0.20816 2.25358,0.0585 4.33469,0.66706 6.04889,1.76892 l 1.01913,0.6551 1.13391,1.24246 c 1.32515,1.45206 1.96527,2.49018 2.58414,4.19099 0.62302,1.71224 0.86614,3.32236 0.8122,5.37905 l -0.0461,1.75742 -0.57988,1.74998 -0.57987,1.74999 -0.69602,1.04656 c -1.70288,2.56052 -4.0019,4.13781 -7.04043,4.8303 l -1.08523,0.24732 -5.921346,0.0437 c -3.25674,0.0241 -5.94953,0.0158 -5.98397,-0.0184 -0.0344,-0.0341 -0.0707,-2.14862 -0.0805,-4.69881 z"></path></svg></a> <ul class="hidden gap-8 lg:flex">`;
  Navigation($$payload);
  $$payload.out += `<!----></ul> <button${spread_attributes(
    {
      class: "lg:hidden",
      ...store_get($$store_subs ??= {}, "$trigger", trigger)
    }
  )}>`;
  Menu($$payload, {});
  $$payload.out += `<!----></button> <div class="hidden scale-90 lg:block">`;
  LightSwitch($$payload);
  $$payload.out += `<!----></div></header> `;
  if (store_get($$store_subs ??= {}, "$open", open)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...store_get($$store_subs ??= {}, "$portalled", portalled)
      }
    )}><div${spread_attributes(
      {
        class: "bg-foreground/50 fixed inset-0 z-50 w-screen",
        ...store_get($$store_subs ??= {}, "$overlay", overlay)
      }
    )}></div> <div${spread_attributes(
      {
        class: "bg-background dark:bg-foreground absolute top-0 left-0 z-50 h-screen w-3/4 max-w-[350px] p-6 shadow-lg transition-colors duration-1000 focus:outline-hidden",
        ...store_get($$store_subs ??= {}, "$content", content)
      }
    )}><div${spread_attributes(
      {
        class: "pb-8 text-2xl font-bold",
        ...store_get($$store_subs ??= {}, "$title", title)
      }
    )}>Menu</div> <ul class="flex flex-col gap-2">`;
    Navigation($$payload);
    $$payload.out += `<!----></ul> <div class="absolute bottom-8 left-0 flex w-full justify-center">`;
    LightSwitch($$payload);
    $$payload.out += `<!----></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Prestations($$payload, $$props) {
  push();
  let prestations = [
    "EVENEMENTS PUBLICS",
    "FESTIVALS",
    "ASSOCIATIFS",
    "CARITATIFS",
    "MARIAGES",
    "CROISIÈRES"
  ];
  let intersectionObserver = useIntersectionObserver();
  $$payload.out += `<section id="prestations" class="shadow-vignette-light dark:shadow-vignette-dark top-[200%] flex h-full w-full scroll-mt-12 flex-col items-center justify-center gap-4">`;
  if (intersectionObserver.intersect) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(prestations);
    $$payload.out += `<ul class="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 md:gap-12"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let prestation = each_array[$$index];
      $$payload.out += `<li class="bg-background/80 dark:bg-foreground/80 flex w-56 items-center justify-center rounded-md p-4 font-bold">${escape_html(prestation)}</li>`;
    }
    $$payload.out += `<!--]--></ul> <a href="#contact" class="text-background dark:bg-background bg-foreground dark:text-foreground flex w-56 justify-center rounded-md p-4 font-bold">Contactez nous !</a>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
function Contact($$payload, $$props) {
  push();
  let intersectionObserver = useIntersectionObserver();
  $$payload.out += `<section id="contact" class="shadow-vignette-light dark:shadow-vignette-dark top-[300%] flex h-full w-full scroll-mt-12 flex-col items-center justify-center gap-4 p-8 md:flex-row md:justify-evenly">`;
  if (intersectionObserver.intersect) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="bg-background/90 flex w-full max-w-md flex-col items-center gap-4 rounded-md p-4 dark:bg-stone-800/90"><p class="w-full pb-2 text-center font-bold dark:font-normal">Une fanfare pour ton événement ? <br> Nous mettons à disposition un formulaire,
        qui nous permettra d'établir un devis :</p> <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLScg3jCjgghlUmJaRlSHq_Z0StexW3m815FH3zvk-74GjJfgnA/viewform" class="bg-background border-foreground text-foreground flex w-56 justify-center rounded-md border-2 p-4 font-bold">Accéder au formulaire</a></div> <a href="#social" class="bg-foreground flex w-56 justify-center rounded-md p-4 font-bold text-neutral-100">Tu veux nous rejoindre ?</a>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
function Social($$payload, $$props) {
  push();
  let intersectionObserver = useIntersectionObserver();
  $$payload.out += `<section id="social" class="shadow-vignette-light dark:shadow-vignette-dark top-[400%] flex h-full w-full scroll-mt-12 items-center justify-center p-8">`;
  if (intersectionObserver.intersect) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="grid grid-cols-1 gap-8 sm:grid-cols-2"><div class="bg-background/90 flex w-full max-w-md flex-col gap-4 rounded-md p-4 dark:bg-stone-800/90"><p class="w-full pb-2 text-center font-bold">Tu veux suivre nos aventures et savoir où et quand nous voir jouer ?</p> <ul class="flex items-center justify-center gap-8"><li><a href="https://www.instagram.com/fanfarefeis/">`;
    Instagram($$payload, {});
    $$payload.out += `<!----></a></li> <li><a href="https://www.youtube.com/@FanfareFEIS">`;
    Youtube($$payload, {});
    $$payload.out += `<!----></a></li> <li><a href="https://www.facebook.com/Fanfare.FEIS">`;
    Facebook($$payload, {});
    $$payload.out += `<!----></a></li></ul> <div class="flex"></div></div> <div class="bg-background/90 flex w-full max-w-md flex-col gap-4 rounded-md p-4 dark:bg-stone-800/90"><p class="w-full pb-2 text-center font-bold">Tu joue du sax, du cuivre, de la flute, de la clarinette ou des
          percussions, ou bien tu souhaiterais apprendre ? Contacte nous sur les
          réseaux sociaux pour rejoindre la fanfare !</p> <div class="flex"></div></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></section>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let intersectionObserver = null;
  let intersectedElement = null;
  setContext("intersectionObserver", {
    get observer() {
      return intersectionObserver;
    },
    get intersectedElement() {
      return intersectedElement;
    }
  });
  Mode_watcher($$payload, {});
  $$payload.out += `<!----> <main class="font-display relative h-full w-full overflow-hidden transition-transform duration-300">`;
  Header($$payload);
  $$payload.out += `<!----> <div class="parallax relative h-full w-full overflow-x-hidden overflow-y-auto scroll-smooth pt-12">`;
  Background($$payload);
  $$payload.out += `<!----> `;
  Presentation($$payload);
  $$payload.out += `<!----> `;
  Buffer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->Mais qui sommes nous ?`;
    }
  });
  $$payload.out += `<!----> `;
  History($$payload);
  $$payload.out += `<!----> `;
  Buffer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->Tout types d'événements ?`;
    }
  });
  $$payload.out += `<!----> `;
  Prestations($$payload);
  $$payload.out += `<!----> `;
  Buffer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->Faisons connaissances !`;
    }
  });
  $$payload.out += `<!----> `;
  Contact($$payload);
  $$payload.out += `<!----> `;
  Buffer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->Suivez nos aventures !`;
    }
  });
  $$payload.out += `<!----> `;
  Social($$payload);
  $$payload.out += `<!----></div></main>`;
  pop();
}
export {
  _page as default
};
