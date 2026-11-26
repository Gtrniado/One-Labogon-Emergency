import {
  AGENCIES,
  CONTACTS,
  DATA_META,
  FACILITIES,
  FACILITY_TYPES,
  MAP_CENTER,
  type Agency,
  type Contact,
  type Facility,
  type FacilityTypeKey,
} from "./data";
import { CATEGORIES, FIRST_AID_CARDS, GO_BAG_ITEMS, type Lang } from "./content";
import { TRANSLATIONS } from "./translations";
import { buildStandaloneHtml } from "./standaloneExport";

interface ResolvedPlace {
  id: string;
  lat?: number;
  lng?: number;
  address?: string | null;
  googleMapsURI?: string | null;
  attributions?: Array<{ provider: string; providerURI?: string }>;
}

interface VerifiedLookup {
  id: string;
  name: string;
  category: FacilityTypeKey;
  typeLabel: string;
  address: string | null;
  searchQuery: string;
  matchAll?: string[];
  matchAny?: string[];
  exclude?: string[];
  mapsUrl: string;
}

interface LabogonMapsAdapter {
  initGoogleMap: (opts: {
    containerId: string;
    center: { lat: number; lng: number };
    centerLabel: string;
    theme: string;
    language: string;
    openMapsLabel: string;
    verifiedFacilities: VerifiedLookup[];
    onVerifiedPlacesResolved: (places: ResolvedPlace[]) => void;
    onError: () => void;
  }) => boolean;
  setActiveTypes: (types: string[]) => void;
  showUserLocation: (pos: { lat: number; lng: number }, label?: string) => void;
  setTheme: (theme: string) => void;
  updateLabels: (opts: {
    centerLabel?: string;
    openMapsLabel?: string;
    language?: string;
    verifiedFacilities?: VerifiedLookup[];
  }) => void;
}

declare global {
  interface Window {
    LabogonMaps?: LabogonMapsAdapter;
  }
}

export function initLabogonApp(): () => void {
  const ac = new AbortController();
  const { signal } = ac;

  /* ---------------- STANDALONE GOOGLE MAPS EMBED ADAPTER ---------------- */
  let mapEl: HTMLElement | null = null;
  let iframeEl: HTMLIFrameElement | null = null;
  let currentMapOpts: { centerLabel?: string } | null = null;

  function makeEmbedSrc(lat: number, lng: number, zoom?: number): string {
    return (
      "https://maps.google.com/maps?q=" +
      encodeURIComponent(lat + "," + lng) +
      "&z=" +
      (zoom || 14) +
      "&output=embed"
    );
  }

  const mapsAdapter: LabogonMapsAdapter = {
    initGoogleMap(opts) {
      currentMapOpts = opts;
      mapEl = document.getElementById(opts.containerId);
      if (!mapEl) {
        if (opts.onError) opts.onError();
        return false;
      }
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        if (opts.onError) opts.onError();
        return false;
      }
      mapEl.innerHTML = "";
      iframeEl = document.createElement("iframe");
      iframeEl.className = "gmp-embed-frame";
      iframeEl.title = opts.centerLabel || "Barangay Labogon Map";
      iframeEl.loading = "lazy";
      iframeEl.referrerPolicy = "no-referrer-when-downgrade";
      iframeEl.src = makeEmbedSrc(opts.center.lat, opts.center.lng, 14);
      iframeEl.addEventListener("error", () => {
        if (opts.onError) opts.onError();
      });
      mapEl.appendChild(iframeEl);
      return true;
    },
    setActiveTypes() {},
    showUserLocation(pos) {
      if (!iframeEl || !pos) return;
      iframeEl.src = makeEmbedSrc(pos.lat, pos.lng, 16);
    },
    setTheme() {},
    updateLabels(opts) {
      if (iframeEl && opts && opts.centerLabel) {
        iframeEl.title = opts.centerLabel;
      }
      if (currentMapOpts && opts && opts.centerLabel) {
        currentMapOpts.centerLabel = opts.centerLabel;
      }
    },
  };

  window.LabogonMaps = mapsAdapter;

  /* ---------------- 1. HELPERS ---------------- */
  const $ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T | null =>
    root.querySelector<T>(selector);
  const $$ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] =>
    Array.from(root.querySelectorAll<T>(selector));

  const svgIcon = (paths: string): string =>
    `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  const ICON_PHONE = svgIcon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>');
  const ICON_MAIL = svgIcon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>');
  const ICON_MOON = svgIcon('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>');
  const ICON_SUN = svgIcon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>');
  const ICON_PIN = svgIcon('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>');
  const ICON_MAP = svgIcon('<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>');
  const ICON_RULER = svgIcon('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>');
  const ICON_INFO = svgIcon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>');
  const ICON_CHECK = svgIcon('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>');
  const ICON_ALERT = svgIcon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>');
  const ICON_SEARCH = svgIcon('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>');
  const ICON_GLOBE = svgIcon('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>');

  function esc(value: unknown): string {
    return String(value ?? "").replace(/[&<>"']/g, ch =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch] || ch)
    );
  }

  function savePref(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore storage failure
    }
  }
  function loadPref(key: string, fallback: string): string {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  }

  const REPORT_EMAIL = "YOUR-EMAIL@example.com";

  function toDial(display: string): string {
    const digits = String(display || "").replace(/\D/g, "");
    if (digits.length <= 4) return digits;
    if (digits.length === 7) return "+6332" + digits;
    if (digits.startsWith("0")) return "+63" + digits.slice(1);
    return digits;
  }

  function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
    const R = 6371;
    const rad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = rad(b.lat - a.lat);
    const dLng = rad(b.lng - a.lng);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function hasCoords(place: { lat?: number | null; lng?: number | null }): place is { lat: number; lng: number } {
    return typeof place.lat === "number" && typeof place.lng === "number";
  }

  const CONTACT_BY_ID: Record<string, Contact> = {};
  CONTACTS.forEach(c => {
    CONTACT_BY_ID[c.id] = c;
  });

  /* ---------------- 2. LANGUAGE, THEME & ACCESSIBILITY ---------------- */
  const savedLang = loadPref("lang", "en") as Lang;
  const state = {
    lang: (TRANSLATIONS[savedLang] ? savedLang : "en") as Lang,
    theme: document.documentElement.getAttribute("data-theme") || "light",
    textSize: loadPref("textSize", "normal"),
    contrast: loadPref("contrast", "normal"),
    category: "medical",
    mapTypes: new Set<FacilityTypeKey>(Object.keys(FACILITY_TYPES) as FacilityTypeKey[]),
    nearbyOrigin: "labogon",
    nearbyType: "all",
    userPos: null as { lat: number; lng: number } | null,
    nearbyMessageKey: "",
    tutorialStep: 0,
  };

  function t(key: string, vars?: Record<string, string | number>): string {
    const table = TRANSLATIONS[state.lang] || {};
    let text = table[key] ?? TRANSLATIONS.en[key] ?? key;
    if (vars) {
      Object.keys(vars).forEach(k => {
        text = text.replace("{" + k + "}", String(vars[k]));
      });
    }
    return text;
  }

  function applyStaticText(): void {
    document.documentElement.lang = state.lang;
    $$<HTMLElement>("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (key) el.textContent = t(key);
    });
    $$<HTMLInputElement>("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (key) el.placeholder = t(key);
    });
    $$<HTMLElement>("[data-i18n-aria]").forEach(el => {
      const key = el.dataset.i18nAria;
      if (key) el.setAttribute("aria-label", t(key));
    });
    const langSelect = $<HTMLSelectElement>("#lang-select");
    if (langSelect) langSelect.value = state.lang;
    updateThemeButton();
    updateA11yControls();
    const badge = $("#offline-ready-badge");
    if (badge) updateOfflineReadyBadge();
    updateDynamicIslandStatus();
    const lastReviewed = $("#last-reviewed");
    if (lastReviewed) {
      lastReviewed.textContent = DATA_META.lastReviewed;
    }
  }

  function setLanguage(lang: string): void {
    if (lang !== "en" && lang !== "fil" && lang !== "ceb") return;
    state.lang = lang;
    savePref("lang", lang);
    renderAll();
  }

  function updateThemeButton(): void {
    const btn = $<HTMLButtonElement>("#theme-toggle");
    if (!btn) return;
    const isDark = state.theme === "dark";
    const label = isDark ? t("theme_to_light") : t("theme_to_dark");
    btn.innerHTML = `${isDark ? ICON_SUN : ICON_MOON} <span class="tool-btn-label">${esc(label)}</span>`;
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function toggleTheme(): void {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    savePref("theme", state.theme);
    updateThemeButton();
    if (window.LabogonMaps && typeof window.LabogonMaps.setTheme === "function") {
      window.LabogonMaps.setTheme(state.theme);
    }
  }

  function applyTextSize(size: string): void {
    const valid = size === "normal" || size === "large" || size === "xlarge" ? size : "normal";
    state.textSize = valid;
    document.documentElement.setAttribute("data-text-size", valid);
    savePref("textSize", valid);
    updateA11yControls();
  }

  function toggleContrast(): void {
    state.contrast = state.contrast === "high" ? "normal" : "high";
    document.documentElement.setAttribute("data-contrast", state.contrast);
    savePref("contrast", state.contrast);
    updateA11yControls();
  }

  function updateA11yControls(): void {
    $$<HTMLElement>("[data-text-size]").forEach(btn => {
      btn.setAttribute("aria-pressed", String(btn.dataset.textSize === state.textSize));
    });
    const contrastBtn = $("#contrast-toggle");
    if (contrastBtn) {
      contrastBtn.setAttribute("aria-pressed", String(state.contrast === "high"));
    }
  }

  /* ---------------- 3. CARDS ---------------- */
  function statusBadge(status: string): string {
    const symbolMap: Record<string, string> = {
      official: "✓",
      credible: "ⓘ",
      needs_confirmation: "!",
      unverified: "×",
    };
    const symbol = symbolMap[status] || "•";
    return `<span class="badge badge-${esc(status)}"><span class="badge-symbol" aria-hidden="true">${symbol}</span><span>${esc(t("status_" + status))}</span></span>`;
  }

  function callButton(contact: Contact, small: boolean, extraClass = ""): string {
    const label = `${t("call")} ${contact.name} ${contact.number}`;
    const is911 = contact.number.replace(/\D/g, "") === "911";
    const pulse = is911 ? " btn-call-pulse" : "";
    return `<a class="btn btn-call ${small ? "btn-small" : ""}${pulse}${extraClass}" href="tel:${toDial(contact.number)}"
               aria-label="${esc(label)}">${ICON_PHONE} <span>${esc(t("call"))}</span></a>`;
  }

  function reportMailtoLink(contact: Contact): string {
    const today = new Date().toISOString().slice(0, 10);
    const subject = encodeURIComponent(t("report_mail_subject", { name: contact.name }));
    const body = encodeURIComponent(
      t("report_mail_body", {
        name: contact.name,
        number: contact.number,
        date: today,
      })
    );
    return `mailto:${REPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  function contactCard(c: Contact): string {
    return `
      <article class="card contact-card status-${esc(c.status)}">
        <div class="contact-top">
          <h4>${esc(c.name)}</h4>
          ${statusBadge(c.status)}
        </div>
        <p class="number">${esc(c.number)}</p>
        ${callButton(c, false)}
        <a class="report-link" href="${esc(reportMailtoLink(c))}">
          ${ICON_MAIL} <span>${esc(t("report_number_btn"))}</span>
        </a>
      </article>`;
  }

  function miniContact(c: Contact): string {
    return `
      <div class="mini-contact">
        <span class="who">${esc(c.name)} ${statusBadge(c.status)}<br><strong>${esc(c.number)}</strong></span>
        ${callButton(c, true)}
      </div>`;
  }

  function mapsLink(place: Facility): string {
    const query = hasCoords(place)
      ? `${place.lat},${place.lng}`
      : encodeURIComponent(`${place.name} Mandaue City Cebu`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  let resolvedFacilityMap: Record<string, ResolvedPlace> = {};

  function facilityCard(f: Facility, distance?: number | null): string {
    const type = FACILITY_TYPES[f.type];
    const contacts = f.contactIds.map(id => CONTACT_BY_ID[id]).filter(Boolean);
    const resolved = resolvedFacilityMap[f.id];
    const effectiveLatLng = hasCoords(f)
      ? { lat: f.lat, lng: f.lng }
      : resolved && hasCoords(resolved)
        ? { lat: resolved.lat, lng: resolved.lng }
        : null;
    const effectiveDist =
      typeof distance === "number"
        ? distance
        : effectiveLatLng
          ? distanceKm(state.userPos || MAP_CENTER, effectiveLatLng)
          : null;

    const distanceLine =
      typeof effectiveDist === "number"
        ? `<p class="distance">${ICON_RULER} <span>${esc(t("km_away", { d: effectiveDist.toFixed(1) }))}</span></p>`
        : `<p class="facility-meta">${esc(t("dist_unknown"))}</p>`;

    const isPinned = Boolean(hasCoords(f) || resolved);
    const displayAddress = f.address || (resolved && resolved.address) || null;
    const mapHref = (resolved && resolved.googleMapsURI) || mapsLink(f);

    const contactsHtml = contacts.length
      ? `<div class="facility-contacts">${contacts.map(miniContact).join("")}</div>`
      : "";

    return `
      <article class="card facility-card">
        <h4><span aria-hidden="true">${type.icon}</span> ${esc(f.name)}</h4>
        <p class="facility-meta">${esc(t("type_" + f.type))} · ${esc(t("scope_" + f.scope))}</p>
        <p class="facility-meta">${ICON_PIN} <span>${displayAddress ? esc(displayAddress) : esc(t("no_address"))}</span></p>
        ${distanceLine}
        ${isPinned ? `<p class="facility-meta">${ICON_MAP} <span>${esc(t("coords_on_map"))}</span></p>` : `<p class="facility-meta">${ICON_INFO} <span>${esc(t("coords_pending"))}</span></p>`}
        ${contactsHtml}
        <a class="btn btn-outline btn-small" href="${esc(mapHref)}" target="_blank" rel="noopener noreferrer">
          ${ICON_MAP} <span>${esc(t("open_maps"))}</span></a>
      </article>`;
  }

  /* ---------------- 4. CONTACTS ---------------- */
  function renderQuickCalls(): void {
    const container = $("#quick-calls");
    if (!container) return;
    const ids = ["nat-911", "labogon-ert-globe-1", "labogon-ert-suntnt-1"];
    container.innerHTML = ids
      .map(id => {
        const c = CONTACT_BY_ID[id];
        if (!c) return "";
        const is911 = c.number.replace(/\D/g, "") === "911";
        const sosClass = is911 ? " is-primary-sos btn-call-pulse" : "";
        const subLabel = is911 ? "National Emergency" : `Labogon ERT · ${c.typeLabel || ""}`;
        return `<a class="btn btn-call quick-call-btn${sosClass}" href="tel:${toDial(c.number)}"
                   aria-label="${esc(t("call") + " " + c.name + " " + c.number)}">
                   <span class="quick-call-top">${ICON_PHONE} <span>${esc(c.number)}</span></span>
                   <span class="quick-call-sub">${esc(subLabel)}</span>
                </a>`;
      })
      .join("");
  }

  function renderLegend(): void {
    const legendEl = $("#legend");
    const hasUnverified = CONTACTS.some(c => c.status === "unverified" || c.status === "needs_confirmation");
    const statuses = hasUnverified
      ? ["official", "credible", "needs_confirmation", "unverified"]
      : ["official"];
    if (legendEl) legendEl.innerHTML = statuses.map(statusBadge).join("");

    const banner = $("#unverified-banner");
    if (banner) banner.hidden = !hasUnverified;
  }

  function hotlineTile(c: Contact): string {
    const typeText = c.typeLabel || c.name;
    return `
      <div class="hotline-tile">
        <div class="hotline-info">
          <span class="hotline-type">${esc(typeText)}</span>
          <p class="hotline-number">${esc(c.number)}</p>
        </div>
        <div class="hotline-actions">
          ${callButton(c, true)}
          <a class="report-link" href="${esc(reportMailtoLink(c))}">
            ${ICON_MAIL} <span>${esc(t("report_number_btn"))}</span>
          </a>
        </div>
      </div>`;
  }

  function agencyCard(agency: Agency, list: Contact[]): string {
    const count = list.length;
    const colsClass =
      count === 1
        ? "cols-1"
        : count === 3
          ? "cols-3"
          : count === 4
            ? "cols-4"
            : count >= 5
              ? "cols-5"
              : "cols-2";
    const contactLine = agency.contactPerson
      ? `<p class="agency-contact">${esc(agency.contactPerson)}</p>`
      : "";
    return `
      <article class="card agency-card">
        <div class="agency-head">
          <div class="agency-title-wrap">
            <span class="agency-num" aria-hidden="true">${esc(agency.order)}</span>
            <div class="agency-headings">
              <h3 class="agency-title">${esc(agency.name)}</h3>
              ${contactLine}
            </div>
          </div>
          ${statusBadge(agency.status || "official")}
        </div>
        <div class="agency-rows ${colsClass}">
          ${list.map(hotlineTile).join("")}
        </div>
      </article>`;
  }

  function renderContacts(): void {
    const listEl = $("#contacts-list");
    if (!listEl) return;

    const html = AGENCIES.map(agency => {
      const list = CONTACTS.filter(c => c.agencyId === agency.id);
      return list.length ? agencyCard(agency, list) : "";
    }).join("");
    listEl.innerHTML = html ? `<div class="agency-stack">${html}</div>` : `<p>${esc(t("no_contacts"))}</p>`;
    observeReveals("#contacts-list");
  }

  /* ---------------- 5. EMERGENCY CATEGORIES, GO-BAG & FIRST-AID ---------------- */
  function renderCategories(shouldAnimatePanel = false): void {
    const gridEl = $("#category-grid");
    if (!gridEl) return;
    gridEl.innerHTML = CATEGORIES.map(
      cat => `
      <button class="category-btn" type="button" data-cat="${esc(cat.id)}"
              aria-pressed="${state.category === cat.id}">
        <span class="icon" aria-hidden="true">${cat.icon}</span>
        <span>${esc(t("cat_" + cat.id))}</span>
      </button>`
    ).join("");

    $$<HTMLButtonElement>("#category-grid .category-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.dataset.cat) selectCategory(btn.dataset.cat);
      });
    });
    observeReveals("#category-grid");
    renderCategoryPanel(shouldAnimatePanel);
  }

  function selectCategory(id: string): void {
    state.category = id;
    renderCategories(true);
  }

  function renderCategoryPanel(animate = false): void {
    const panel = $("#category-panel");
    if (!panel) return;
    const cat = CATEGORIES.find(c => c.id === state.category);

    if (!cat) {
      panel.innerHTML = `<p>${esc(t("select_category"))}</p>`;
      return;
    }

    const steps = cat.steps[state.lang] || cat.steps.en;
    const donts = (cat.donts && (cat.donts[state.lang] || cat.donts.en)) || [];
    const contacts = cat.contactIds.map(id => CONTACT_BY_ID[id]).filter(Boolean);

    const stepsHtml = steps
      .map((step, idx) => {
        const title = typeof step === "string" ? "" : step.title;
        const detail = typeof step === "string" ? step : step.detail;
        return `
          <li class="step-item" style="animation-delay: ${Math.min(idx, 6) * 40}ms">
            <div class="step-marker" aria-hidden="true">${idx + 1}</div>
            <div class="step-body">
              <span class="step-kicker">${esc(t("step_badge", { n: idx + 1 }))}</span>
              ${title ? `<strong class="step-title">${esc(title)}</strong>` : ""}
              <p class="step-detail">${esc(detail)}</p>
            </div>
          </li>`;
      })
      .join("");

    const dontsHtml = donts.length
      ? `
      <div class="donts-box" role="note">
        <h4>${ICON_ALERT} <span>${esc(t("donts_title"))}</span></h4>
        <ul class="donts-list">
          ${donts.map(item => `<li>${esc(item)}</li>`).join("")}
        </ul>
      </div>`
      : "";

    panel.innerHTML = `
      <h3>${cat.icon} ${esc(t("cat_" + cat.id))}</h3>
      <h4 class="panel-subhead">${esc(t("steps_title"))}</h4>
      <ol class="step-list">${stepsHtml}</ol>
      ${dontsHtml}
      <h4 class="panel-subhead">${esc(t("who_to_call"))}</h4>
      <div class="call-row">${contacts.map(miniContact).join("")}</div>`;

    if (animate) {
      panel.classList.remove("is-animating");
      void (panel as HTMLElement).offsetWidth;
      panel.classList.add("is-animating");
    }
  }

  function loadGoBagState(): Set<string> {
    try {
      const raw = localStorage.getItem("gobag_checked");
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  }

  function saveGoBagState(checkedSet: Set<string>): void {
    savePref("gobag_checked", JSON.stringify(Array.from(checkedSet)));
  }

  function renderGoBag(): void {
    const listEl = $("#gobag-list");
    const progressEl = $("#gobag-progress");
    const progressBarEl = $<HTMLElement>("#gobag-progress-bar");
    if (!listEl) return;

    const checkedSet = loadGoBagState();

    listEl.innerHTML = GO_BAG_ITEMS.map(item => {
      const checked = checkedSet.has(item.id);
      const label = item.label[state.lang] || item.label.en;
      return `
        <li>
          <label class="gobag-label${checked ? " is-checked" : ""}">
            <input type="checkbox" data-gobag-id="${esc(item.id)}" ${checked ? "checked" : ""} />
            <span>${esc(label)}</span>
          </label>
        </li>`;
    }).join("");

    const updateProgress = () => {
      if (progressEl) {
        progressEl.textContent = t("gobag_progress", {
          done: checkedSet.size,
          total: GO_BAG_ITEMS.length,
        });
      }
      if (progressBarEl) {
        const pct = GO_BAG_ITEMS.length > 0 ? Math.round((checkedSet.size / GO_BAG_ITEMS.length) * 100) : 0;
        progressBarEl.style.width = `${pct}%`;
      }
    };
    updateProgress();

    $$<HTMLInputElement>("input[data-gobag-id]", listEl).forEach(cb => {
      cb.addEventListener("change", () => {
        const id = cb.dataset.gobagId;
        if (!id) return;
        if (cb.checked) checkedSet.add(id);
        else checkedSet.delete(id);
        cb.closest(".gobag-label")?.classList.toggle("is-checked", cb.checked);
        saveGoBagState(checkedSet);
        updateProgress();
      });
    });
  }

  function renderFirstAid(): void {
    const gridEl = $("#firstaid-grid");
    if (!gridEl) return;

    gridEl.innerHTML = FIRST_AID_CARDS.map(card => {
      const title = card.title[state.lang] || card.title.en;
      const steps = card.steps[state.lang] || card.steps.en;
      return `
        <article class="card firstaid-card">
          <h4><span aria-hidden="true">${card.icon}</span> ${esc(title)}</h4>
          <ol class="firstaid-steps">
            ${steps.map(s => `<li>${esc(s)}</li>`).join("")}
          </ol>
          <p class="firstaid-disclaimer">${esc(t("firstaid_disclaimer"))}</p>
        </article>`;
    }).join("");

    observeReveals("#preparedness");
  }

  /* ---------------- 6. MAP ---------------- */
  let mapInitialized = false;

  const VERIFIED_FACILITY_RULES: Record<
    string,
    { searchQuery: string; matchAll?: string[]; matchAny?: string[]; exclude?: string[] }
  > = {
    "fac-labogon-hall": {
      searchQuery: "Barangay Labogon Hall, Labogon, Mandaue City, Cebu",
      matchAll: ["labogon"],
    },
    "fac-labogon-health": {
      searchQuery: "Labogon Health Center, Mandaue City, Cebu",
      matchAll: ["labogon", "health"],
    },
    "fac-labogon-gym": {
      searchQuery: "Barangay Labogon Gymnasium, Mandaue City, Cebu",
      matchAll: ["labogon"],
      matchAny: ["gym", "gymnasium", "sports", "barangay"],
    },
    "fac-fire": {
      searchQuery: "Mandaue City Fire Station, Centro, Mandaue City, Cebu",
      matchAll: ["mandaue"],
      matchAny: ["fire", "bfp"],
    },
    "fac-police": {
      searchQuery: "Mandaue City Police Office, Mandaue City, Cebu",
      matchAll: ["mandaue", "police"],
    },
    "fac-mch": {
      searchQuery: "Mandaue City Hospital, Mandaue City, Cebu",
      matchAll: ["mandaue", "hospital"],
      exclude: ["chong hua", "eversley", "ucmed"],
    },
    "fac-chonghua": {
      searchQuery: "Chong Hua Hospital Mandaue, Mantawi International Drive, Mandaue City",
      matchAll: ["chong hua"],
    },
    "fac-command": {
      searchQuery: "Bantay Mandaue Command Center, Mandaue City Hall, Mandaue City",
      matchAll: ["mandaue"],
      matchAny: ["command", "bantay", "drrmo", "cdrr", "city hall"],
    },
  };

  function buildVerifiedFacilityLookups(): VerifiedLookup[] {
    return FACILITIES.filter(f => Boolean(VERIFIED_FACILITY_RULES[f.id])).map(f => {
      const rule = VERIFIED_FACILITY_RULES[f.id];
      return {
        id: f.id,
        name: f.name,
        category: f.type,
        typeLabel: `${t("type_" + f.type)} · ${t("scope_" + f.scope)}`,
        address: f.address,
        searchQuery: rule.searchQuery,
        matchAll: rule.matchAll,
        matchAny: rule.matchAny,
        exclude: rule.exclude,
        mapsUrl: mapsLink(f),
      };
    });
  }

  function renderMapAttributions(places: ResolvedPlace[]): void {
    const attrEl = $("#map-attributions");
    if (!attrEl) return;
    const seen = new Set<string>();
    const items: Array<{ provider: string; providerURI?: string }> = [];
    (places || []).forEach(p => {
      (p.attributions || []).forEach(a => {
        if (!a || !a.provider) return;
        const key = `${a.provider}|${a.providerURI || ""}`;
        if (seen.has(key)) return;
        seen.add(key);
        items.push(a);
      });
    });
    if (!items.length) {
      attrEl.hidden = true;
      attrEl.innerHTML = "";
      return;
    }
    attrEl.innerHTML = items
      .map(a =>
        a.providerURI
          ? `<a href="${esc(a.providerURI)}" target="_blank" rel="noopener noreferrer">${esc(a.provider)}</a>`
          : `<span>${esc(a.provider)}</span>`
      )
      .join(" · ");
    attrEl.hidden = false;
  }

  function initMap(): void {
    if (mapInitialized) return;
    mapInitialized = true;

    mapsAdapter.initGoogleMap({
      containerId: "map",
      center: MAP_CENTER,
      centerLabel: t("map_center_label"),
      theme: state.theme,
      language: state.lang,
      openMapsLabel: t("open_maps"),
      verifiedFacilities: buildVerifiedFacilityLookups(),
      onVerifiedPlacesResolved: places => {
        const nextMap: Record<string, ResolvedPlace> = {};
        (places || []).forEach(p => {
          nextMap[p.id] = p;
        });
        resolvedFacilityMap = nextMap;
        renderMapAttributions(places);
        renderFacilityList();
        renderNearby();
      },
      onError: () => {
        const mapEl = $("#map");
        const fbEl = $("#map-fallback");
        if (mapEl) mapEl.hidden = true;
        if (fbEl) fbEl.hidden = false;
      },
    });
  }

  function renderMapFilters(): void {
    const filtersEl = $("#map-filters");
    if (!filtersEl) return;
    filtersEl.innerHTML = (Object.keys(FACILITY_TYPES) as FacilityTypeKey[])
      .map(
        type => `
      <button class="chip" type="button" data-type="${esc(type)}"
              aria-pressed="${state.mapTypes.has(type)}">
        ${FACILITY_TYPES[type].icon} ${esc(t("type_" + type))}
      </button>`
      )
      .join("");

    $$<HTMLButtonElement>("#map-filters .chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const type = chip.dataset.type as FacilityTypeKey | undefined;
        if (!type) return;
        if (state.mapTypes.has(type)) state.mapTypes.delete(type);
        else state.mapTypes.add(type);
        renderMapFilters();
        renderMapMarkers();
        renderFacilityList();
      });
    });
  }

  function renderMapMarkers(): void {
    mapsAdapter.setActiveTypes(Array.from(state.mapTypes));
  }

  function renderFacilityList(): void {
    const listEl = $("#facility-list");
    if (!listEl) return;
    const list = FACILITIES.filter(f => state.mapTypes.has(f.type));
    listEl.innerHTML = list.length
      ? list.map(f => facilityCard(f)).join("")
      : `<p>${esc(t("nearby_none"))}</p>`;
    observeReveals("#facility-list");
  }

  function getUserLocation(
    onSuccess: (pos: { lat: number; lng: number }) => void,
    onFail: (key: string) => void
  ): void {
    if (!("geolocation" in navigator)) {
      onFail("gps_unsupported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => onSuccess({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => onFail("gps_denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function showMyLocationOnMap(): void {
    const statusEl = $("#map-status");
    if (statusEl) statusEl.textContent = t("gps_asking");
    getUserLocation(
      pos => {
        state.userPos = pos;
        if (statusEl) statusEl.textContent = "";
        mapsAdapter.showUserLocation(pos, t("you_are_here"));
        updateShareLocationUI();
        renderFacilityList();
        renderNearby();
      },
      key => {
        if (statusEl) statusEl.textContent = t(key);
      }
    );
  }

  /* ---------------- 7. NEARBY & SHARE LOCATION ---------------- */
  function buildLocationShareMessage(pos: { lat: number; lng: number }) {
    const url = `https://maps.google.com/?q=${pos.lat.toFixed(6)},${pos.lng.toFixed(6)}`;
    return {
      url,
      message: t("share_loc_msg", { url }),
    };
  }

  function updateShareLocationUI(): void {
    const actionsEl = $("#share-loc-actions");
    const smsLink = $<HTMLAnchorElement>("#share-sms-link");
    const previewLink = $<HTMLAnchorElement>("#share-map-preview");
    const statusEl = $("#share-loc-status");
    if (!actionsEl || !state.userPos) return;

    const { url, message } = buildLocationShareMessage(state.userPos);
    if (smsLink) smsLink.href = `sms:?body=${encodeURIComponent(message)}`;
    if (previewLink) {
      previewLink.href = url;
      previewLink.textContent = url;
    }
    if (statusEl) statusEl.textContent = t("share_loc_ready");
    actionsEl.hidden = false;
    pulseDynamicIsland(t("share_loc_ready"));
  }

  function requestShareLocation(): void {
    const statusEl = $("#share-loc-status");
    if (statusEl) statusEl.textContent = t("gps_asking");
    getUserLocation(
      pos => {
        state.userPos = pos;
        updateShareLocationUI();
        renderFacilityList();
        renderNearby();
      },
      failKey => {
        if (statusEl) statusEl.textContent = t(failKey);
      }
    );
  }

  async function copyShareLocation(): Promise<void> {
    if (!state.userPos) return;
    const { message } = buildLocationShareMessage(state.userPos);
    const ok = await copyText(message);
    if (ok) showToast(t("copied_toast"));
  }

  function renderNearbyTypeOptions(): void {
    const select = $<HTMLSelectElement>("#nearby-type");
    if (!select) return;
    const options = [`<option value="all">${esc(t("all_types"))}</option>`].concat(
      (Object.keys(FACILITY_TYPES) as FacilityTypeKey[]).map(
        type => `<option value="${esc(type)}">${FACILITY_TYPES[type].icon} ${esc(t("type_" + type))}</option>`
      )
    );
    select.innerHTML = options.join("");
    select.value = state.nearbyType;
  }

  function renderNearby(): void {
    const statusEl = $("#nearby-status");
    const listEl = $("#nearby-list");
    if (!listEl) return;

    const usingGps = state.nearbyOrigin === "gps" && state.userPos;
    const origin = usingGps && state.userPos ? state.userPos : MAP_CENTER;
    const scopeRank = (f: Facility) => (f.scope === "labogon" ? 0 : 1);

    const rows = FACILITIES.filter(f => state.nearbyType === "all" || f.type === state.nearbyType).map(f => {
      const resolved = resolvedFacilityMap[f.id];
      const coords = hasCoords(f)
        ? { lat: f.lat, lng: f.lng }
        : resolved && hasCoords(resolved)
          ? { lat: resolved.lat, lng: resolved.lng }
          : null;
      return { f, d: coords ? distanceKm(origin, coords) : null };
    });

    rows.sort((a, b) => {
      if (a.d !== null && b.d !== null) return a.d - b.d;
      if (a.d !== null) return -1;
      if (b.d !== null) return 1;
      return scopeRank(a.f) - scopeRank(b.f) || a.f.name.localeCompare(b.f.name);
    });

    if (statusEl) statusEl.textContent = state.nearbyMessageKey ? t(state.nearbyMessageKey) : "";
    listEl.innerHTML = rows.length ? rows.map(r => facilityCard(r.f, r.d)).join("") : `<p>${esc(t("nearby_none"))}</p>`;
    observeReveals("#nearby-list");
  }

  function onNearbyOriginChange(value: string): void {
    state.nearbyMessageKey = "";
    if (value === "gps") {
      state.nearbyMessageKey = "gps_asking";
      renderNearby();
      getUserLocation(
        pos => {
          state.userPos = pos;
          state.nearbyOrigin = "gps";
          state.nearbyMessageKey = "";
          updateShareLocationUI();
          renderNearby();
        },
        failKey => {
          state.nearbyOrigin = "labogon";
          const originSel = $<HTMLSelectElement>("#nearby-origin");
          if (originSel) originSel.value = "labogon";
          state.nearbyMessageKey = failKey;
          renderNearby();
        }
      );
    } else {
      state.nearbyOrigin = "labogon";
      renderNearby();
    }
  }

  /* ---------------- 8. SEARCH ---------------- */
  function runSearch(): void {
    const input = $<HTMLInputElement>("#search-input");
    const box = $("#search-results");
    const clearBtn = $<HTMLButtonElement>("#search-clear");
    if (!input || !box) return;

    const query = input.value.trim().toLowerCase();
    if (clearBtn) clearBtn.hidden = query === "";

    if (query === "") {
      box.hidden = true;
      box.innerHTML = "";
      return;
    }

    const words = query.split(/\s+/);
    const matches = (text: string) => words.every(w => text.toLowerCase().includes(w));

    const contactHits = CONTACTS.filter(c =>
      matches([c.name, c.number, c.number.replace(/\D/g, ""), t("group_" + c.group), t("status_" + c.status)].join(" "))
    );

    const placeHits = FACILITIES.filter(f =>
      matches([f.name, f.address || "", t("type_" + f.type), t("scope_" + f.scope)].join(" "))
    );

    const topicHits = CATEGORIES.filter(cat => {
      const stepsText = (cat.steps[state.lang] || cat.steps.en)
        .map(s => (typeof s === "string" ? s : `${s.title} ${s.detail}`))
        .join(" ");
      const dontsText = ((cat.donts && (cat.donts[state.lang] || cat.donts.en)) || []).join(" ");
      return matches([t("cat_" + cat.id), cat.keywords.join(" "), stepsText, dontsText].join(" "));
    });

    const total = contactHits.length + placeHits.length + topicHits.length;
    let html = `<p><strong>${esc(t("search_found", { n: total }))}</strong></p>`;

    if (total === 0) html = `<p>${esc(t("search_none"))}</p>`;

    if (topicHits.length) {
      html +=
        `<h3>${esc(t("search_topics"))}</h3><div class="chips">` +
        topicHits
          .map(
            cat => `<button class="chip" type="button" data-open-cat="${esc(cat.id)}">
        ${cat.icon} ${esc(t("cat_" + cat.id))}</button>`
          )
          .join("") +
        `</div>`;
    }
    if (contactHits.length) {
      html += `<h3>${esc(t("search_contacts"))}</h3><div class="card-grid">${contactHits.map(contactCard).join("")}</div>`;
    }
    if (placeHits.length) {
      html += `<h3>${esc(t("search_places"))}</h3><div class="card-grid">${placeHits.map(f => facilityCard(f)).join("")}</div>`;
    }

    box.innerHTML = html;
    box.hidden = false;

    $$<HTMLButtonElement>("[data-open-cat]", box).forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.dataset.openCat) selectCategory(btn.dataset.openCat);
        const emerg = $("#emergencies");
        if (emerg) emerg.scrollIntoView();
      });
    });
  }

  /* ---------------- 9. MOTION, CLIPBOARD TOAST & TUTORIAL ---------------- */
  const prefersReducedMotion =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : { matches: false };

  let toastTimer: number | null = null;

  function showToast(message: string): void {
    const toast = $("#copy-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    pulseDynamicIsland(message);
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  }

  async function copyText(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback below
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }

  let revealObserver: IntersectionObserver | null = null;

  function setupRevealObserver(): void {
    if (prefersReducedMotion.matches || typeof IntersectionObserver === "undefined") return;
    document.documentElement.classList.add("reveal-ready");
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -32px 0px", threshold: 0.05 }
    );

    $$("main section").forEach(sec => {
      if (sec.classList.contains("hero") || sec.classList.contains("search-section")) return;
      sec.classList.add("reveal-item");
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) {
        sec.classList.add("is-visible");
      } else {
        revealObserver?.observe(sec);
      }
    });
  }

  function observeReveals(rootSelector: string): void {
    const root = $(rootSelector);
    if (!root) return;
    const targets = $$<HTMLElement>(".card, .category-btn, .group-title", root);
    targets.forEach((el, idx) => {
      el.classList.add("reveal-item");
      el.style.setProperty("--reveal-delay", `${Math.min(idx % 6, 5) * 45}ms`);
      if (!revealObserver) {
        el.classList.add("is-visible");
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) {
        el.classList.add("is-visible");
      } else {
        revealObserver.observe(el);
      }
    });
  }

  function setupScrollEffects(): void {
    const header = $(".site-header");
    const progressBar = $<HTMLElement>("#scroll-progress-bar");
    const navLinks = $$<HTMLAnchorElement>(".main-nav a[href^='#'], #mobile-dock a[href^='#']");
    const sectionIds = Array.from(new Set(navLinks.map(a => a.getAttribute("href")).filter(Boolean) as string[]));
    const sections = sectionIds.map(href => $<HTMLElement>(href)).filter(Boolean) as HTMLElement[];

    function onScroll(): void {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);

      if (progressBar) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
        progressBar.style.width = pct.toFixed(1) + "%";
      }

      const marker = window.scrollY + 180;
      let activeId = "";
      sections.forEach(sec => {
        if (sec.offsetTop <= marker) activeId = "#" + sec.id;
      });
      navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === activeId));
    }

    window.addEventListener("scroll", onScroll, { passive: true, signal });
    onScroll();
  }

  let islandPulseTimer: number | null = null;

  function updateDynamicIslandStatus(customLabel?: string): void {
    const island = $("#dynamic-island");
    const statusEl = $("#island-status");
    if (!island || !statusEl) return;
    const isOnline = typeof navigator === "undefined" ? true : navigator.onLine;
    island.classList.toggle("is-offline", !isOnline);
    statusEl.textContent = customLabel ? customLabel : isOnline ? t("island_ready") : t("island_offline");
  }

  function pulseDynamicIsland(message: string): void {
    const island = $("#dynamic-island");
    if (!island) return;
    updateDynamicIslandStatus(message);
    island.classList.add("is-pulse");
    if (islandPulseTimer) window.clearTimeout(islandPulseTimer);
    islandPulseTimer = window.setTimeout(() => {
      island.classList.remove("is-pulse");
      updateDynamicIslandStatus();
    }, 2400);
  }

  function setDynamicIslandExpanded(open: boolean): void {
    const island = $("#dynamic-island");
    const toggleBtn = $("#island-toggle");
    const drawer = $("#island-drawer");
    if (!island || !toggleBtn || !drawer) return;
    island.classList.toggle("is-expanded", open);
    toggleBtn.setAttribute("aria-expanded", String(open));
    drawer.hidden = !open;
  }

  function setupDynamicIsland(): void {
    const island = $("#dynamic-island");
    const toggleBtn = $("#island-toggle");
    const drawer = $("#island-drawer");
    const shareBtn = $("#island-share-btn");
    if (!island || !toggleBtn || !drawer) return;

    toggleBtn.addEventListener(
      "click",
      e => {
        e.stopPropagation();
        const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
        setDynamicIslandExpanded(!isOpen);
      },
      { signal }
    );

    if (shareBtn) {
      shareBtn.addEventListener(
        "click",
        () => {
          setDynamicIslandExpanded(false);
          const target = $("#share-location-box");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
          requestShareLocation();
        },
        { signal }
      );
    }

    $$("a", drawer).forEach(link => {
      link.addEventListener("click", () => setDynamicIslandExpanded(false), { signal });
    });

    document.addEventListener(
      "click",
      e => {
        if (e.target instanceof Node && !island.contains(e.target)) {
          setDynamicIslandExpanded(false);
        }
      },
      { signal }
    );

    document.addEventListener(
      "keydown",
      e => {
        if (e.key === "Escape") setDynamicIslandExpanded(false);
      },
      { signal }
    );
  }

  const TUTORIAL_STEPS = [
    {
      icon: ICON_PHONE,
      titleKey: "tut_1_title",
      descKey: "tut_1_desc",
      tipKey: "tut_1_tip",
      preview: () => `
        <span class="tutorial-mini-btn">${ICON_PHONE} <span>${esc(t("call"))} 911</span></span>
        <span class="tutorial-mini-chip">${ICON_PHONE} <span>09274012389</span></span>`,
    },
    {
      icon: ICON_SEARCH,
      titleKey: "tut_2_title",
      descKey: "tut_2_desc",
      tipKey: "tut_2_tip",
      preview: () => `
        <span class="tutorial-mini-chip">🩺 ${esc(t("cat_medical"))}</span>
        <span class="tutorial-mini-chip">🔥 ${esc(t("cat_fire"))}</span>
        <span class="tutorial-mini-chip">🌊 ${esc(t("cat_flood"))}</span>`,
    },
    {
      icon: ICON_MAP,
      titleKey: "tut_3_title",
      descKey: "tut_3_desc",
      tipKey: "tut_3_tip",
      preview: () => `
        <span class="tutorial-mini-chip">${ICON_PIN} <span>${esc(t("locate_me"))}</span></span>
        <span class="tutorial-mini-chip">${ICON_RULER} <span>${esc(t("km_away", { d: "0.8" }))}</span></span>`,
    },
    {
      icon: ICON_MOON,
      titleKey: "tut_4_title",
      descKey: "tut_4_desc",
      tipKey: "tut_4_tip",
      preview: () => `
        <span class="tutorial-mini-chip">${ICON_GLOBE} <span>English · Bisaya · Tagalog</span></span>
        <span class="tutorial-mini-chip">${ICON_MOON} <span>${esc(t("theme_to_dark"))}</span></span>`,
    },
  ];

  let lastFocusedBeforeTutorial: Element | null = null;

  function renderTutorialStep(direction?: "next" | "prev"): void {
    const modal = $("#tutorial-modal");
    if (!modal) return;
    const total = TUTORIAL_STEPS.length;
    const stepIndex = Math.max(0, Math.min(state.tutorialStep, total - 1));
    state.tutorialStep = stepIndex;
    const step = TUTORIAL_STEPS[stepIndex];

    const counterEl = $("#tutorial-step-counter");
    const progressBar = $<HTMLElement>("#tutorial-progress-bar");
    const stage = $<HTMLElement>("#tutorial-stage");
    const dotsEl = $("#tutorial-dots");
    const prevBtn = $<HTMLButtonElement>("#tutorial-prev");
    const nextBtn = $<HTMLButtonElement>("#tutorial-next");
    if (!stage || !dotsEl) return;

    if (counterEl) counterEl.textContent = t("tutorial_step_of", { n: stepIndex + 1, total });
    if (progressBar) progressBar.style.width = `${((stepIndex + 1) / total) * 100}%`;

    stage.innerHTML = `
      <div class="tutorial-visual" aria-hidden="true">
        <div class="tutorial-icon-badge">${step.icon}</div>
        <div class="tutorial-preview-pills">${step.preview()}</div>
      </div>
      <h3 class="tutorial-step-title">${esc(t(step.titleKey))}</h3>
      <p id="tutorial-desc" class="tutorial-step-desc">${esc(t(step.descKey))}</p>
      <p class="tutorial-tip">${esc(t(step.tipKey))}</p>`;

    stage.classList.remove("anim-next", "anim-prev");
    if (direction === "next" || direction === "prev") {
      void stage.offsetWidth;
      stage.classList.add(direction === "next" ? "anim-next" : "anim-prev");
    }

    dotsEl.innerHTML = TUTORIAL_STEPS.map(
      (_, i) => `
      <button
        class="tutorial-dot"
        type="button"
        role="tab"
        aria-selected="${i === stepIndex}"
        aria-label="${esc(t("tutorial_step_of", { n: i + 1, total }))}"
        data-step="${i}"
      ></button>`
    ).join("");

    $$<HTMLButtonElement>(".tutorial-dot", dotsEl).forEach(dot => {
      dot.addEventListener("click", () => {
        const target = Number(dot.dataset.step);
        if (target === state.tutorialStep) return;
        goTutorialStep(target, target > state.tutorialStep ? "next" : "prev");
      });
    });

    if (prevBtn) prevBtn.hidden = stepIndex === 0;
    if (nextBtn) nextBtn.textContent = stepIndex === total - 1 ? t("tutorial_done") : t("tutorial_next");
  }

  function goTutorialStep(nextIndex: number, direction?: "next" | "prev"): void {
    state.tutorialStep = nextIndex;
    renderTutorialStep(direction);
  }

  function openTutorial(startStep = 0): void {
    const modal = $("#tutorial-modal");
    if (!modal) return;
    lastFocusedBeforeTutorial = document.activeElement;
    state.tutorialStep = startStep;
    const optOut = $<HTMLInputElement>("#tutorial-dont-show");
    if (optOut) optOut.checked = loadPref("tutorial_hide_on_open", "0") === "1";

    modal.hidden = false;
    document.body.classList.add("modal-open");
    renderTutorialStep();

    const nextBtn = $<HTMLButtonElement>("#tutorial-next");
    if (nextBtn) nextBtn.focus();
  }

  function closeTutorial(): void {
    const modal = $("#tutorial-modal");
    if (!modal || modal.hidden) return;
    const optOut = $<HTMLInputElement>("#tutorial-dont-show");
    if (optOut) savePref("tutorial_hide_on_open", optOut.checked ? "1" : "0");

    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocusedBeforeTutorial instanceof HTMLElement) {
      lastFocusedBeforeTutorial.focus();
    }
  }

  function setupTutorial(): void {
    const closeBtn = $("#tutorial-close");
    const skipBtn = $("#tutorial-skip");
    const prevBtn = $("#tutorial-prev");
    const nextBtn = $("#tutorial-next");
    const modal = $("#tutorial-modal");

    if (closeBtn) closeBtn.addEventListener("click", closeTutorial, { signal });
    if (skipBtn) skipBtn.addEventListener("click", closeTutorial, { signal });
    if (prevBtn) {
      prevBtn.addEventListener(
        "click",
        () => {
          if (state.tutorialStep > 0) goTutorialStep(state.tutorialStep - 1, "prev");
        },
        { signal }
      );
    }
    if (nextBtn) {
      nextBtn.addEventListener(
        "click",
        () => {
          if (state.tutorialStep < TUTORIAL_STEPS.length - 1) {
            goTutorialStep(state.tutorialStep + 1, "next");
          } else {
            closeTutorial();
          }
        },
        { signal }
      );
    }
    if (modal) {
      modal.addEventListener(
        "click",
        e => {
          if (e.target === modal) closeTutorial();
        },
        { signal }
      );
    }
    document.addEventListener(
      "keydown",
      e => {
        if (!modal || modal.hidden) return;
        if (e.key === "Escape") {
          e.preventDefault();
          closeTutorial();
        } else if (e.key === "ArrowRight" && state.tutorialStep < TUTORIAL_STEPS.length - 1) {
          goTutorialStep(state.tutorialStep + 1, "next");
        } else if (e.key === "ArrowLeft" && state.tutorialStep > 0) {
          goTutorialStep(state.tutorialStep - 1, "prev");
        }
      },
      { signal }
    );
  }

  let isOfflineReady = false;

  function updateOfflineReadyBadge(): void {
    const badge = $("#offline-ready-badge");
    if (!badge) return;
    badge.innerHTML = isOfflineReady
      ? `${ICON_CHECK} <span>${esc(t("offline_ready"))}</span>`
      : `<span>${esc(t("offline_checking"))}</span>`;
  }

  function checkOfflineReady(): void {
    const badge = $("#offline-ready-badge");
    if (!("serviceWorker" in navigator)) {
      if (badge) badge.hidden = true;
      return;
    }
    window.addEventListener(
      "labogon-offline-ready",
      () => {
        isOfflineReady = true;
        updateOfflineReadyBadge();
      },
      { signal }
    );
    if (navigator.serviceWorker.controller) {
      isOfflineReady = true;
      updateOfflineReadyBadge();
    }
    navigator.serviceWorker.ready
      .then(() => {
        isOfflineReady = true;
        updateOfflineReadyBadge();
      })
      .catch(() => {});
  }

  let onlineRestoredTimer: number | null = null;
  let showingRestoredNotice = false;

  function updateOfflineBanner(): void {
    const banner = $("#offline-banner");
    const textEl = $("#offline-banner-text");
    if (!banner || !textEl) return;

    const isOnline = typeof navigator === "undefined" ? true : navigator.onLine;
    if (!isOnline) {
      if (onlineRestoredTimer) {
        window.clearTimeout(onlineRestoredTimer);
        onlineRestoredTimer = null;
      }
      showingRestoredNotice = false;
      banner.classList.remove("is-online");
      banner.setAttribute("role", "alert");
      textEl.textContent = t("offline_banner");
      banner.hidden = false;
      return;
    }

    if (showingRestoredNotice) {
      banner.classList.add("is-online");
      banner.setAttribute("role", "status");
      textEl.textContent = t("online_restored");
      banner.hidden = false;
    } else {
      banner.classList.remove("is-online");
      banner.hidden = true;
    }
  }

  function setupConnectivityMonitor(): void {
    updateOfflineBanner();
    checkOfflineReady();

    window.addEventListener(
      "offline",
      () => {
        updateOfflineBanner();
        updateDynamicIslandStatus();
      },
      { signal }
    );

    window.addEventListener(
      "online",
      () => {
        showingRestoredNotice = true;
        updateOfflineBanner();
        updateDynamicIslandStatus();
        if (onlineRestoredTimer) window.clearTimeout(onlineRestoredTimer);
        onlineRestoredTimer = window.setTimeout(() => {
          showingRestoredNotice = false;
          updateOfflineBanner();
        }, 4500);

        const mapEl = $("#map");
        const fbEl = $("#map-fallback");
        if (!mapInitialized || (fbEl && !fbEl.hidden)) {
          if (fbEl) fbEl.hidden = true;
          if (mapEl) mapEl.hidden = false;
          mapInitialized = false;
          initMap();
        }
      },
      { signal }
    );
  }

  /* ---------------- 10. START-UP ---------------- */
  function renderAll(): void {
    applyStaticText();
    updateOfflineBanner();
    renderQuickCalls();
    updateShareLocationUI();
    renderLegend();
    renderContacts();
    renderCategories();
    renderGoBag();
    renderFirstAid();
    renderMapFilters();
    renderMapMarkers();
    renderFacilityList();
    renderNearbyTypeOptions();
    renderNearby();
    runSearch();
    mapsAdapter.updateLabels({
      centerLabel: t("map_center_label"),
      openMapsLabel: t("open_maps"),
      language: state.lang,
      verifiedFacilities: buildVerifiedFacilityLookups(),
    });
    const modal = $("#tutorial-modal");
    if (modal && !modal.hidden) renderTutorialStep();
  }

  setupRevealObserver();
  setupScrollEffects();
  setupDynamicIsland();
  setupTutorial();
  setupConnectivityMonitor();

  const langSelect = $<HTMLSelectElement>("#lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", e => {
      setLanguage((e.target as HTMLSelectElement).value);
    }, { signal });
  }
  const themeBtn = $("#theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme, { signal });
  $$<HTMLButtonElement>("[data-text-size]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.textSize) applyTextSize(btn.dataset.textSize);
    }, { signal });
  });
  function downloadStandaloneHtml(e?: Event): void {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    try {
      const htmlText = buildStandaloneHtml();
      const blob = new Blob([htmlText], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "one-labogon.html";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      showToast(t("download_toast"));
    } catch {
      // ignore download failure
    }
  }

  const contrastBtn = $("#contrast-toggle");
  if (contrastBtn) contrastBtn.addEventListener("click", toggleContrast, { signal });
  const guideBtn = $("#guide-open-btn");
  if (guideBtn) guideBtn.addEventListener("click", () => openTutorial(0), { signal });
  const downloadBtn = $("#download-html-btn");
  if (downloadBtn) downloadBtn.addEventListener("click", downloadStandaloneHtml, { signal });
  const downloadFooterLink = $("#download-standalone-link");
  if (downloadFooterLink) downloadFooterLink.addEventListener("click", downloadStandaloneHtml, { signal });

  const shareBtn = $("#share-loc-btn");
  if (shareBtn) shareBtn.addEventListener("click", requestShareLocation, { signal });
  const shareCopyBtn = $("#share-copy-btn");
  if (shareCopyBtn) shareCopyBtn.addEventListener("click", copyShareLocation, { signal });

  const gobagReset = $("#gobag-reset");
  if (gobagReset) {
    gobagReset.addEventListener(
      "click",
      () => {
        saveGoBagState(new Set());
        renderGoBag();
      },
      { signal }
    );
  }

  const locateBtn = $("#locate-btn");
  if (locateBtn) locateBtn.addEventListener("click", showMyLocationOnMap, { signal });
  const nearbyOrigin = $<HTMLSelectElement>("#nearby-origin");
  if (nearbyOrigin) {
    nearbyOrigin.addEventListener("change", e => onNearbyOriginChange((e.target as HTMLSelectElement).value), { signal });
  }
  const nearbyType = $<HTMLSelectElement>("#nearby-type");
  if (nearbyType) {
    nearbyType.addEventListener(
      "change",
      e => {
        state.nearbyType = (e.target as HTMLSelectElement).value;
        renderNearby();
      },
      { signal }
    );
  }
  const searchInput = $<HTMLInputElement>("#search-input");
  if (searchInput) searchInput.addEventListener("input", runSearch, { signal });
  const searchClear = $("#search-clear");
  if (searchClear && searchInput) {
    searchClear.addEventListener(
      "click",
      () => {
        searchInput.value = "";
        runSearch();
        searchInput.focus();
      },
      { signal }
    );
  }

  initMap();
  renderAll();

  if (loadPref("tutorial_hide_on_open", "0") !== "1") {
    openTutorial(0);
  }

  return () => {
    ac.abort();
    if (toastTimer) window.clearTimeout(toastTimer);
    if (islandPulseTimer) window.clearTimeout(islandPulseTimer);
    if (onlineRestoredTimer) window.clearTimeout(onlineRestoredTimer);
    if (revealObserver) revealObserver.disconnect();
    document.body.classList.remove("modal-open");
  };
}
