import rawStyles from "../index.css?raw";
import { AGENCIES, CONTACTS, DATA_META, FACILITIES, FACILITY_TYPES, MAP_CENTER } from "./data";
import { CATEGORIES, FIRST_AID_CARDS, GO_BAG_ITEMS } from "./content";
import { TRANSLATIONS } from "./translations";

function escapeForInlineTag(text: string): string {
  return text.replace(/<\/(script|style)/gi, "<\\/$1");
}

function sanitizeClonedBodyHtml(): string {
  const root = document.getElementById("root");
  if (!root) return "";

  const clone = root.cloneNode(true) as HTMLElement;

  const emptySelectors = [
    "#quick-calls",
    "#legend",
    "#contacts-list",
    "#category-grid",
    "#category-panel",
    "#gobag-list",
    "#firstaid-grid",
    "#map",
    "#map-filters",
    "#facility-list",
    "#nearby-list",
    "#search-results",
    "#tutorial-stage",
    "#tutorial-dots",
  ];
  emptySelectors.forEach(sel => {
    const el = clone.querySelector(sel);
    if (el) el.innerHTML = "";
  });

  const hideSelectors = [
    "#gmp-quota-banner",
    "#offline-banner",
    "#island-drawer",
    "#share-loc-actions",
    "#search-clear",
    "#search-results",
    "#map-fallback",
    "#map-attributions",
    "#copy-toast",
    "#tutorial-modal",
  ];
  hideSelectors.forEach(sel => {
    const el = clone.querySelector<HTMLElement>(sel);
    if (el) el.hidden = true;
  });

  const searchInput = clone.querySelector<HTMLInputElement>("#search-input");
  if (searchInput) searchInput.value = "";

  const island = clone.querySelector("#dynamic-island");
  if (island) island.classList.remove("is-expanded", "is-pulse");

  const islandToggle = clone.querySelector("#island-toggle");
  if (islandToggle) islandToggle.setAttribute("aria-expanded", "false");

  const progressBar = clone.querySelector<HTMLElement>("#scroll-progress-bar");
  if (progressBar) progressBar.style.width = "0%";

  const gobagBar = clone.querySelector<HTMLElement>("#gobag-progress-bar");
  if (gobagBar) gobagBar.style.width = "0%";

  const gobagProgress = clone.querySelector("#gobag-progress");
  if (gobagProgress) gobagProgress.textContent = "";

  return clone.innerHTML;
}

const STANDALONE_SCRIPT = `
(function () {
  var DATA = window.__LABOGON_BUNDLE__;
  if (!DATA) return;

  var AGENCIES = DATA.AGENCIES;
  var CONTACTS = DATA.CONTACTS;
  var DATA_META = DATA.DATA_META;
  var FACILITIES = DATA.FACILITIES;
  var FACILITY_TYPES = DATA.FACILITY_TYPES;
  var MAP_CENTER = DATA.MAP_CENTER;
  var CATEGORIES = DATA.CATEGORIES;
  var FIRST_AID_CARDS = DATA.FIRST_AID_CARDS;
  var GO_BAG_ITEMS = DATA.GO_BAG_ITEMS;
  var TRANSLATIONS = DATA.TRANSLATIONS;

  var mapEl = null;
  var iframeEl = null;
  var currentMapOpts = null;

  function makeEmbedSrc(lat, lng, zoom) {
    return "https://maps.google.com/maps?q=" + encodeURIComponent(lat + "," + lng) + "&z=" + (zoom || 14) + "&output=embed";
  }

  var mapsAdapter = {
    initGoogleMap: function (opts) {
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
      iframeEl.addEventListener("error", function () {
        if (opts.onError) opts.onError();
      });
      mapEl.appendChild(iframeEl);
      return true;
    },
    setActiveTypes: function () {},
    showUserLocation: function (pos) {
      if (!iframeEl || !pos) return;
      iframeEl.src = makeEmbedSrc(pos.lat, pos.lng, 16);
    },
    setTheme: function () {},
    updateLabels: function (opts) {
      if (iframeEl && opts && opts.centerLabel) iframeEl.title = opts.centerLabel;
      if (currentMapOpts && opts && opts.centerLabel) currentMapOpts.centerLabel = opts.centerLabel;
    }
  };
  window.LabogonMaps = mapsAdapter;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function svgIcon(paths) {
    return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  var ICON_PHONE = svgIcon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>');
  var ICON_MAIL = svgIcon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>');
  var ICON_MOON = svgIcon('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>');
  var ICON_SUN = svgIcon('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>');
  var ICON_PIN = svgIcon('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>');
  var ICON_MAP = svgIcon('<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>');
  var ICON_RULER = svgIcon('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>');
  var ICON_INFO = svgIcon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>');
  var ICON_CHECK = svgIcon('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>');
  var ICON_ALERT = svgIcon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>');
  var ICON_SEARCH = svgIcon('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>');
  var ICON_GLOBE = svgIcon('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>');

  function esc(val) {
    return String(val == null ? "" : val).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] || ch;
    });
  }
  function savePref(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function loadPref(k, fb) { try { return localStorage.getItem(k) || fb; } catch (e) { return fb; } }
  var REPORT_EMAIL = "YOUR-EMAIL@example.com";

  function toDial(display) {
    var digits = String(display || "").replace(/\\D/g, "");
    if (digits.length <= 4) return digits;
    if (digits.length === 7) return "+6332" + digits;
    if (digits.indexOf("0") === 0) return "+63" + digits.slice(1);
    return digits;
  }

  function distanceKm(a, b) {
    var R = 6371;
    var rad = function (d) { return (d * Math.PI) / 180; };
    var dLat = rad(b.lat - a.lat);
    var dLng = rad(b.lng - a.lng);
    var h = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.pow(Math.sin(dLng / 2), 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function hasCoords(p) { return p && typeof p.lat === "number" && typeof p.lng === "number"; }

  var CONTACT_BY_ID = {};
  CONTACTS.forEach(function (c) { CONTACT_BY_ID[c.id] = c; });

  var savedLang = loadPref("lang", "en");
  var state = {
    lang: TRANSLATIONS[savedLang] ? savedLang : "en",
    theme: document.documentElement.getAttribute("data-theme") || "light",
    textSize: loadPref("textSize", "normal"),
    contrast: loadPref("contrast", "normal"),
    category: "medical",
    mapTypes: new Set(Object.keys(FACILITY_TYPES)),
    nearbyOrigin: "labogon",
    nearbyType: "all",
    userPos: null,
    nearbyMessageKey: "",
    tutorialStep: 0
  };

  function t(key, vars) {
    var table = TRANSLATIONS[state.lang] || {};
    var text = table[key] != null ? table[key] : (TRANSLATIONS.en[key] != null ? TRANSLATIONS.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (k) { text = text.replace("{" + k + "}", String(vars[k])); });
    }
    return text;
  }

  function applyStaticText() {
    document.documentElement.lang = state.lang;
    $$("[data-i18n]").forEach(function (el) {
      var k = el.dataset.i18n;
      if (k) el.textContent = t(k);
    });
    $$("[data-i18n-placeholder]").forEach(function (el) {
      var k = el.dataset.i18nPlaceholder;
      if (k) el.placeholder = t(k);
    });
    $$("[data-i18n-aria]").forEach(function (el) {
      var k = el.dataset.i18nAria;
      if (k) el.setAttribute("aria-label", t(k));
    });
    var langSelect = $("#lang-select");
    if (langSelect) langSelect.value = state.lang;
    updateThemeButton();
    updateA11yControls();
    updateOfflineReadyBadge();
    updateDynamicIslandStatus();
    var lastReviewed = $("#last-reviewed");
    if (lastReviewed) lastReviewed.textContent = DATA_META.lastReviewed;
  }

  function setLanguage(lang) {
    if (lang !== "en" && lang !== "fil" && lang !== "ceb") return;
    state.lang = lang;
    savePref("lang", lang);
    renderAll();
  }

  function updateThemeButton() {
    var btn = $("#theme-toggle");
    if (!btn) return;
    var isDark = state.theme === "dark";
    var label = isDark ? t("theme_to_light") : t("theme_to_dark");
    btn.innerHTML = (isDark ? ICON_SUN : ICON_MOON) + ' <span class="tool-btn-label">' + esc(label) + '</span>';
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    savePref("theme", state.theme);
    updateThemeButton();
  }

  function applyTextSize(size) {
    var valid = size === "normal" || size === "large" || size === "xlarge" ? size : "normal";
    state.textSize = valid;
    document.documentElement.setAttribute("data-text-size", valid);
    savePref("textSize", valid);
    updateA11yControls();
  }

  function toggleContrast() {
    state.contrast = state.contrast === "high" ? "normal" : "high";
    document.documentElement.setAttribute("data-contrast", state.contrast);
    savePref("contrast", state.contrast);
    updateA11yControls();
  }

  function updateA11yControls() {
    $$("[data-text-size]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.textSize === state.textSize));
    });
    var contrastBtn = $("#contrast-toggle");
    if (contrastBtn) contrastBtn.setAttribute("aria-pressed", String(state.contrast === "high"));
  }

  function statusBadge(status) {
    var symMap = { official: "✓", credible: "ⓘ", needs_confirmation: "!", unverified: "×" };
    var sym = symMap[status] || "•";
    return '<span class="badge badge-' + esc(status) + '"><span class="badge-symbol" aria-hidden="true">' + sym + '</span><span>' + esc(t("status_" + status)) + '</span></span>';
  }

  function callButton(contact, small, extraClass) {
    var label = t("call") + " " + contact.name + " " + contact.number;
    var is911 = contact.number.replace(/\\D/g, "") === "911";
    var pulse = is911 ? " btn-call-pulse" : "";
    return '<a class="btn btn-call ' + (small ? "btn-small" : "") + pulse + (extraClass || "") + '" href="tel:' + toDial(contact.number) + '" aria-label="' + esc(label) + '">' + ICON_PHONE + ' <span>' + esc(t("call")) + '</span></a>';
  }

  function reportMailtoLink(contact) {
    var today = new Date().toISOString().slice(0, 10);
    var subject = encodeURIComponent(t("report_mail_subject", { name: contact.name }));
    var body = encodeURIComponent(t("report_mail_body", { name: contact.name, number: contact.number, date: today }));
    return "mailto:" + REPORT_EMAIL + "?subject=" + subject + "&body=" + body;
  }

  function contactCard(c) {
    return '<article class="card contact-card status-' + esc(c.status) + '"><div class="contact-top"><h4>' + esc(c.name) + '</h4>' + statusBadge(c.status) + '</div><p class="number">' + esc(c.number) + '</p>' + callButton(c, false) + '<a class="report-link" href="' + esc(reportMailtoLink(c)) + '">' + ICON_MAIL + ' <span>' + esc(t("report_number_btn")) + '</span></a></article>';
  }

  function miniContact(c) {
    return '<div class="mini-contact"><span class="who">' + esc(c.name) + ' ' + statusBadge(c.status) + '<br><strong>' + esc(c.number) + '</strong></span>' + callButton(c, true) + '</div>';
  }

  function mapsLink(place) {
    var query = hasCoords(place) ? place.lat + "," + place.lng : encodeURIComponent(place.name + " Mandaue City Cebu");
    return "https://www.google.com/maps/search/?api=1&query=" + query;
  }

  function facilityCard(f, distance) {
    var type = FACILITY_TYPES[f.type];
    var contacts = f.contactIds.map(function (id) { return CONTACT_BY_ID[id]; }).filter(Boolean);
    var effectiveDist = typeof distance === "number" ? distance : (hasCoords(f) ? distanceKm(state.userPos || MAP_CENTER, f) : null);
    var distLine = typeof effectiveDist === "number"
      ? '<p class="distance">' + ICON_RULER + ' <span>' + esc(t("km_away", { d: effectiveDist.toFixed(1) })) + '</span></p>'
      : '<p class="facility-meta">' + esc(t("dist_unknown")) + '</p>';
    var isPinned = hasCoords(f);
    var contactsHtml = contacts.length ? '<div class="facility-contacts">' + contacts.map(miniContact).join("") + '</div>' : "";
    return '<article class="card facility-card"><h4><span aria-hidden="true">' + type.icon + '</span> ' + esc(f.name) + '</h4><p class="facility-meta">' + esc(t("type_" + f.type)) + ' · ' + esc(t("scope_" + f.scope)) + '</p><p class="facility-meta">' + ICON_PIN + ' <span>' + (f.address ? esc(f.address) : esc(t("no_address"))) + '</span></p>' + distLine + (isPinned ? '<p class="facility-meta">' + ICON_MAP + ' <span>' + esc(t("coords_on_map")) + '</span></p>' : '<p class="facility-meta">' + ICON_INFO + ' <span>' + esc(t("coords_pending")) + '</span></p>') + contactsHtml + '<a class="btn btn-outline btn-small" href="' + esc(mapsLink(f)) + '" target="_blank" rel="noopener noreferrer">' + ICON_MAP + ' <span>' + esc(t("open_maps")) + '</span></a></article>';
  }

  function renderQuickCalls() {
    var container = $("#quick-calls");
    if (!container) return;
    container.innerHTML = ["nat-911", "labogon-ert-globe-1", "labogon-ert-suntnt-1"].map(function (id) {
      var c = CONTACT_BY_ID[id];
      if (!c) return "";
      var is911 = c.number.replace(/\\D/g, "") === "911";
      var sosClass = is911 ? " is-primary-sos btn-call-pulse" : "";
      var subLabel = is911 ? "National Emergency" : "Labogon ERT · " + (c.typeLabel || "");
      return '<a class="btn btn-call quick-call-btn' + sosClass + '" href="tel:' + toDial(c.number) + '" aria-label="' + esc(t("call") + " " + c.name + " " + c.number) + '"><span class="quick-call-top">' + ICON_PHONE + ' <span>' + esc(c.number) + '</span></span><span class="quick-call-sub">' + esc(subLabel) + '</span></a>';
    }).join("");
  }

  function renderLegend() {
    var legendEl = $("#legend");
    var hasUnverified = CONTACTS.some(function (c) { return c.status === "unverified" || c.status === "needs_confirmation"; });
    var statuses = hasUnverified ? ["official", "credible", "needs_confirmation", "unverified"] : ["official"];
    if (legendEl) legendEl.innerHTML = statuses.map(statusBadge).join("");
    var banner = $("#unverified-banner");
    if (banner) banner.hidden = !hasUnverified;
  }

  function hotlineTile(c) {
    return '<div class="hotline-tile"><div class="hotline-info"><span class="hotline-type">' + esc(c.typeLabel || c.name) + '</span><p class="hotline-number">' + esc(c.number) + '</p></div><div class="hotline-actions">' + callButton(c, true) + '<a class="report-link" href="' + esc(reportMailtoLink(c)) + '">' + ICON_MAIL + ' <span>' + esc(t("report_number_btn")) + '</span></a></div></div>';
  }

  function agencyCard(agency, list) {
    var n = list.length;
    var colsClass = n === 1 ? "cols-1" : n === 3 ? "cols-3" : n === 4 ? "cols-4" : n >= 5 ? "cols-5" : "cols-2";
    var contactLine = agency.contactPerson ? '<p class="agency-contact">' + esc(agency.contactPerson) + '</p>' : "";
    return '<article class="card agency-card"><div class="agency-head"><div class="agency-title-wrap"><span class="agency-num" aria-hidden="true">' + esc(agency.order) + '</span><div class="agency-headings"><h3 class="agency-title">' + esc(agency.name) + '</h3>' + contactLine + '</div></div>' + statusBadge(agency.status || "official") + '</div><div class="agency-rows ' + colsClass + '">' + list.map(hotlineTile).join("") + '</div></article>';
  }

  function renderContacts() {
    var listEl = $("#contacts-list");
    if (!listEl) return;
    var html = AGENCIES.map(function (agency) {
      var list = CONTACTS.filter(function (c) { return c.agencyId === agency.id; });
      return list.length ? agencyCard(agency, list) : "";
    }).join("");
    listEl.innerHTML = html ? '<div class="agency-stack">' + html + '</div>' : '<p>' + esc(t("no_contacts")) + '</p>';
  }

  function renderCategories(animate) {
    var gridEl = $("#category-grid");
    if (!gridEl) return;
    gridEl.innerHTML = CATEGORIES.map(function (cat) {
      return '<button class="category-btn" type="button" data-cat="' + esc(cat.id) + '" aria-pressed="' + (state.category === cat.id) + '"><span class="icon" aria-hidden="true">' + cat.icon + '</span><span>' + esc(t("cat_" + cat.id)) + '</span></button>';
    }).join("");
    $$("#category-grid .category-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.dataset.cat) {
          state.category = btn.dataset.cat;
          renderCategories(true);
        }
      });
    });
    renderCategoryPanel(animate);
  }

  function renderCategoryPanel(animate) {
    var panel = $("#category-panel");
    if (!panel) return;
    var cat = CATEGORIES.find(function (c) { return c.id === state.category; });
    if (!cat) {
      panel.innerHTML = "<p>" + esc(t("select_category")) + "</p>";
      return;
    }
    var steps = cat.steps[state.lang] || cat.steps.en;
    var donts = (cat.donts && (cat.donts[state.lang] || cat.donts.en)) || [];
    var contacts = cat.contactIds.map(function (id) { return CONTACT_BY_ID[id]; }).filter(Boolean);

    var stepsHtml = steps.map(function (step, idx) {
      var title = typeof step === "string" ? "" : step.title;
      var detail = typeof step === "string" ? step : step.detail;
      return '<li class="step-item" style="animation-delay:' + (Math.min(idx, 6) * 40) + 'ms"><div class="step-marker" aria-hidden="true">' + (idx + 1) + '</div><div class="step-body"><span class="step-kicker">' + esc(t("step_badge", { n: idx + 1 })) + '</span>' + (title ? '<strong class="step-title">' + esc(title) + '</strong>' : "") + '<p class="step-detail">' + esc(detail) + '</p></div></li>';
    }).join("");

    var dontsHtml = donts.length
      ? '<div class="donts-box" role="note"><h4>' + ICON_ALERT + ' <span>' + esc(t("donts_title")) + '</span></h4><ul class="donts-list">' + donts.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + '</ul></div>'
      : "";

    panel.innerHTML = '<h3>' + cat.icon + ' ' + esc(t("cat_" + cat.id)) + '</h3><h4 class="panel-subhead">' + esc(t("steps_title")) + '</h4><ol class="step-list">' + stepsHtml + '</ol>' + dontsHtml + '<h4 class="panel-subhead">' + esc(t("who_to_call")) + '</h4><div class="call-row">' + contacts.map(miniContact).join("") + '</div>';
    if (animate) {
      panel.classList.remove("is-animating");
      void panel.offsetWidth;
      panel.classList.add("is-animating");
    }
  }

  function loadGoBagState() {
    try {
      var raw = localStorage.getItem("gobag_checked");
      var parsed = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch (e) { return new Set(); }
  }
  function saveGoBagState(s) { savePref("gobag_checked", JSON.stringify(Array.from(s))); }

  function renderGoBag() {
    var listEl = $("#gobag-list");
    var progressEl = $("#gobag-progress");
    var progressBarEl = $("#gobag-progress-bar");
    if (!listEl) return;
    var checkedSet = loadGoBagState();
    listEl.innerHTML = GO_BAG_ITEMS.map(function (item) {
      var checked = checkedSet.has(item.id);
      var label = item.label[state.lang] || item.label.en;
      return '<li><label class="gobag-label' + (checked ? " is-checked" : "") + '"><input type="checkbox" data-gobag-id="' + esc(item.id) + '" ' + (checked ? "checked" : "") + ' /><span>' + esc(label) + '</span></label></li>';
    }).join("");

    function updateProgress() {
      if (progressEl) progressEl.textContent = t("gobag_progress", { done: checkedSet.size, total: GO_BAG_ITEMS.length });
      if (progressBarEl) {
        var pct = GO_BAG_ITEMS.length > 0 ? Math.round((checkedSet.size / GO_BAG_ITEMS.length) * 100) : 0;
        progressBarEl.style.width = pct + "%";
      }
    }
    updateProgress();

    $$("input[data-gobag-id]", listEl).forEach(function (cb) {
      cb.addEventListener("change", function () {
        var id = cb.dataset.gobagId;
        if (!id) return;
        if (cb.checked) checkedSet.add(id);
        else checkedSet.delete(id);
        var lbl = cb.closest(".gobag-label");
        if (lbl) lbl.classList.toggle("is-checked", cb.checked);
        saveGoBagState(checkedSet);
        updateProgress();
      });
    });
  }

  function renderFirstAid() {
    var gridEl = $("#firstaid-grid");
    if (!gridEl) return;
    gridEl.innerHTML = FIRST_AID_CARDS.map(function (card) {
      var title = card.title[state.lang] || card.title.en;
      var steps = card.steps[state.lang] || card.steps.en;
      return '<article class="card firstaid-card"><h4><span aria-hidden="true">' + card.icon + '</span> ' + esc(title) + '</h4><ol class="firstaid-steps">' + steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + '</ol><p class="firstaid-disclaimer">' + esc(t("firstaid_disclaimer")) + '</p></article>';
    }).join("");
  }

  var mapInitialized = false;
  function initMap() {
    if (mapInitialized) return;
    mapInitialized = true;
    mapsAdapter.initGoogleMap({
      containerId: "map",
      center: MAP_CENTER,
      centerLabel: t("map_center_label"),
      onError: function () {
        var m = $("#map"), fb = $("#map-fallback");
        if (m) m.hidden = true;
        if (fb) fb.hidden = false;
      }
    });
  }

  function renderMapFilters() {
    var filtersEl = $("#map-filters");
    if (!filtersEl) return;
    filtersEl.innerHTML = Object.keys(FACILITY_TYPES).map(function (type) {
      return '<button class="chip" type="button" data-type="' + esc(type) + '" aria-pressed="' + state.mapTypes.has(type) + '">' + FACILITY_TYPES[type].icon + ' ' + esc(t("type_" + type)) + '</button>';
    }).join("");
    $$("#map-filters .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var type = chip.dataset.type;
        if (!type) return;
        if (state.mapTypes.has(type)) state.mapTypes.delete(type);
        else state.mapTypes.add(type);
        renderMapFilters();
        renderFacilityList();
      });
    });
  }

  function renderFacilityList() {
    var listEl = $("#facility-list");
    if (!listEl) return;
    var list = FACILITIES.filter(function (f) { return state.mapTypes.has(f.type); });
    listEl.innerHTML = list.length ? list.map(function (f) { return facilityCard(f); }).join("") : "<p>" + esc(t("nearby_none")) + "</p>";
  }

  function getUserLocation(onSuccess, onFail) {
    if (!("geolocation" in navigator)) { onFail("gps_unsupported"); return; }
    navigator.geolocation.getCurrentPosition(
      function (pos) { onSuccess({ lat: pos.coords.latitude, lng: pos.coords.longitude }); },
      function () { onFail("gps_denied"); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  function showMyLocationOnMap() {
    var statusEl = $("#map-status");
    if (statusEl) statusEl.textContent = t("gps_asking");
    getUserLocation(function (pos) {
      state.userPos = pos;
      if (statusEl) statusEl.textContent = "";
      mapsAdapter.showUserLocation(pos, t("you_are_here"));
      updateShareLocationUI();
      renderFacilityList();
      renderNearby();
    }, function (key) {
      if (statusEl) statusEl.textContent = t(key);
    });
  }

  function buildLocationShareMessage(pos) {
    var url = "https://maps.google.com/?q=" + pos.lat.toFixed(6) + "," + pos.lng.toFixed(6);
    return { url: url, message: t("share_loc_msg", { url: url }) };
  }

  function updateShareLocationUI() {
    var actionsEl = $("#share-loc-actions"), smsLink = $("#share-sms-link"), previewLink = $("#share-map-preview"), statusEl = $("#share-loc-status");
    if (!actionsEl || !state.userPos) return;
    var res = buildLocationShareMessage(state.userPos);
    if (smsLink) smsLink.href = "sms:?body=" + encodeURIComponent(res.message);
    if (previewLink) { previewLink.href = res.url; previewLink.textContent = res.url; }
    if (statusEl) statusEl.textContent = t("share_loc_ready");
    actionsEl.hidden = false;
    pulseDynamicIsland(t("share_loc_ready"));
  }

  function requestShareLocation() {
    var statusEl = $("#share-loc-status");
    if (statusEl) statusEl.textContent = t("gps_asking");
    getUserLocation(function (pos) {
      state.userPos = pos;
      updateShareLocationUI();
      renderFacilityList();
      renderNearby();
    }, function (k) {
      if (statusEl) statusEl.textContent = t(k);
    });
  }

  async function copyShareLocation() {
    if (!state.userPos) return;
    var res = buildLocationShareMessage(state.userPos);
    var ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(res.message);
        ok = true;
      }
    } catch (e) {}
    if (ok) showToast(t("copied_toast"));
  }

  function renderNearbyTypeOptions() {
    var select = $("#nearby-type");
    if (!select) return;
    var options = ['<option value="all">' + esc(t("all_types")) + '</option>'].concat(
      Object.keys(FACILITY_TYPES).map(function (type) {
        return '<option value="' + esc(type) + '">' + FACILITY_TYPES[type].icon + ' ' + esc(t("type_" + type)) + '</option>';
      })
    );
    select.innerHTML = options.join("");
    select.value = state.nearbyType;
  }

  function renderNearby() {
    var statusEl = $("#nearby-status"), listEl = $("#nearby-list");
    if (!listEl) return;
    var usingGps = state.nearbyOrigin === "gps" && state.userPos;
    var origin = usingGps ? state.userPos : MAP_CENTER;
    var rows = FACILITIES.filter(function (f) { return state.nearbyType === "all" || f.type === state.nearbyType; }).map(function (f) {
      return { f: f, d: hasCoords(f) ? distanceKm(origin, f) : null };
    });
    rows.sort(function (a, b) {
      if (a.d !== null && b.d !== null) return a.d - b.d;
      if (a.d !== null) return -1;
      if (b.d !== null) return 1;
      return (a.f.scope === "labogon" ? 0 : 1) - (b.f.scope === "labogon" ? 0 : 1) || a.f.name.localeCompare(b.f.name);
    });
    if (statusEl) statusEl.textContent = state.nearbyMessageKey ? t(state.nearbyMessageKey) : "";
    listEl.innerHTML = rows.length ? rows.map(function (r) { return facilityCard(r.f, r.d); }).join("") : "<p>" + esc(t("nearby_none")) + "</p>";
  }

  function onNearbyOriginChange(value) {
    state.nearbyMessageKey = "";
    if (value === "gps") {
      state.nearbyMessageKey = "gps_asking";
      renderNearby();
      getUserLocation(function (pos) {
        state.userPos = pos;
        state.nearbyOrigin = "gps";
        state.nearbyMessageKey = "";
        updateShareLocationUI();
        renderNearby();
      }, function (failKey) {
        state.nearbyOrigin = "labogon";
        var sel = $("#nearby-origin");
        if (sel) sel.value = "labogon";
        state.nearbyMessageKey = failKey;
        renderNearby();
      });
    } else {
      state.nearbyOrigin = "labogon";
      renderNearby();
    }
  }

  function runSearch() {
    var input = $("#search-input"), box = $("#search-results"), clearBtn = $("#search-clear");
    if (!input || !box) return;
    var query = input.value.trim().toLowerCase();
    if (clearBtn) clearBtn.hidden = query === "";
    if (!query) { box.hidden = true; box.innerHTML = ""; return; }
    var words = query.split(/\\s+/);
    var matches = function (text) { return words.every(function (w) { return text.toLowerCase().indexOf(w) !== -1; }); };
    var contactHits = CONTACTS.filter(function (c) { return matches([c.name, c.number, c.number.replace(/\\D/g, ""), t("group_" + c.group), t("status_" + c.status)].join(" ")); });
    var placeHits = FACILITIES.filter(function (f) { return matches([f.name, f.address || "", t("type_" + f.type), t("scope_" + f.scope)].join(" ")); });
    var topicHits = CATEGORIES.filter(function (cat) {
      var stepsText = (cat.steps[state.lang] || cat.steps.en).map(function (s) { return typeof s === "string" ? s : s.title + " " + s.detail; }).join(" ");
      var dontsText = ((cat.donts && (cat.donts[state.lang] || cat.donts.en)) || []).join(" ");
      return matches([t("cat_" + cat.id), cat.keywords.join(" "), stepsText, dontsText].join(" "));
    });
    var total = contactHits.length + placeHits.length + topicHits.length;
    var html = total === 0 ? "<p>" + esc(t("search_none")) + "</p>" : "<p><strong>" + esc(t("search_found", { n: total })) + "</strong></p>";
    if (topicHits.length) html += "<h3>" + esc(t("search_topics")) + '</h3><div class="chips">' + topicHits.map(function (cat) { return '<button class="chip" type="button" data-open-cat="' + esc(cat.id) + '">' + cat.icon + ' ' + esc(t("cat_" + cat.id)) + '</button>'; }).join("") + "</div>";
    if (contactHits.length) html += "<h3>" + esc(t("search_contacts")) + '</h3><div class="card-grid">' + contactHits.map(contactCard).join("") + "</div>";
    if (placeHits.length) html += "<h3>" + esc(t("search_places")) + '</h3><div class="card-grid">' + placeHits.map(function (f) { return facilityCard(f); }).join("") + "</div>";
    box.innerHTML = html;
    box.hidden = false;
    $$("[data-open-cat]", box).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.dataset.openCat) { state.category = btn.dataset.openCat; renderCategories(true); }
        var emerg = $("#emergencies");
        if (emerg) emerg.scrollIntoView();
      });
    });
  }

  var toastTimer = null;
  function showToast(msg) {
    var toast = $("#copy-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    pulseDynamicIsland(msg);
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 2200);
  }

  var islandPulseTimer = null;
  function updateDynamicIslandStatus(customLabel) {
    var island = $("#dynamic-island"), statusEl = $("#island-status");
    if (!island || !statusEl) return;
    var isOnline = typeof navigator === "undefined" ? true : navigator.onLine;
    island.classList.toggle("is-offline", !isOnline);
    statusEl.textContent = customLabel ? customLabel : (isOnline ? t("island_ready") : t("island_offline"));
  }
  function pulseDynamicIsland(msg) {
    var island = $("#dynamic-island");
    if (!island) return;
    updateDynamicIslandStatus(msg);
    island.classList.add("is-pulse");
    if (islandPulseTimer) window.clearTimeout(islandPulseTimer);
    islandPulseTimer = window.setTimeout(function () {
      island.classList.remove("is-pulse");
      updateDynamicIslandStatus();
    }, 2400);
  }
  function setDynamicIslandExpanded(open) {
    var island = $("#dynamic-island"), toggleBtn = $("#island-toggle"), drawer = $("#island-drawer");
    if (!island || !toggleBtn || !drawer) return;
    island.classList.toggle("is-expanded", open);
    toggleBtn.setAttribute("aria-expanded", String(open));
    drawer.hidden = !open;
  }

  function setupDynamicIsland() {
    var island = $("#dynamic-island"), toggleBtn = $("#island-toggle"), drawer = $("#island-drawer"), shareBtn = $("#island-share-btn");
    if (!island || !toggleBtn || !drawer) return;
    toggleBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      setDynamicIslandExpanded(toggleBtn.getAttribute("aria-expanded") !== "true");
    });
    if (shareBtn) {
      shareBtn.addEventListener("click", function () {
        setDynamicIslandExpanded(false);
        var box = $("#share-location-box");
        if (box) box.scrollIntoView({ behavior: "smooth", block: "center" });
        requestShareLocation();
      });
    }
    $$("a", drawer).forEach(function (link) { link.addEventListener("click", function () { setDynamicIslandExpanded(false); }); });
    document.addEventListener("click", function (e) { if (e.target && !island.contains(e.target)) setDynamicIslandExpanded(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDynamicIslandExpanded(false); });
  }

  var TUTORIAL_STEPS = [
    { icon: ICON_PHONE, titleKey: "tut_1_title", descKey: "tut_1_desc", tipKey: "tut_1_tip", preview: function () { return '<span class="tutorial-mini-btn">' + ICON_PHONE + ' <span>' + esc(t("call")) + ' 911</span></span><span class="tutorial-mini-chip">' + ICON_PHONE + ' <span>09274012389</span></span>'; } },
    { icon: ICON_SEARCH, titleKey: "tut_2_title", descKey: "tut_2_desc", tipKey: "tut_2_tip", preview: function () { return '<span class="tutorial-mini-chip">🩺 ' + esc(t("cat_medical")) + '</span><span class="tutorial-mini-chip">🔥 ' + esc(t("cat_fire")) + '</span><span class="tutorial-mini-chip">🌊 ' + esc(t("cat_flood")) + '</span>'; } },
    { icon: ICON_MAP, titleKey: "tut_3_title", descKey: "tut_3_desc", tipKey: "tut_3_tip", preview: function () { return '<span class="tutorial-mini-chip">' + ICON_PIN + ' <span>' + esc(t("locate_me")) + '</span></span><span class="tutorial-mini-chip">' + ICON_RULER + ' <span>' + esc(t("km_away", { d: "0.8" })) + '</span></span>'; } },
    { icon: ICON_MOON, titleKey: "tut_4_title", descKey: "tut_4_desc", tipKey: "tut_4_tip", preview: function () { return '<span class="tutorial-mini-chip">' + ICON_GLOBE + ' <span>English · Bisaya · Tagalog</span></span><span class="tutorial-mini-chip">' + ICON_MOON + ' <span>' + esc(t("theme_to_dark")) + '</span></span>'; } }
  ];

  function renderTutorialStep(dir) {
    var modal = $("#tutorial-modal");
    if (!modal) return;
    var total = TUTORIAL_STEPS.length;
    var idx = Math.max(0, Math.min(state.tutorialStep, total - 1));
    state.tutorialStep = idx;
    var step = TUTORIAL_STEPS[idx];
    var counterEl = $("#tutorial-step-counter"), progressBar = $("#tutorial-progress-bar"), stage = $("#tutorial-stage"), dotsEl = $("#tutorial-dots"), prevBtn = $("#tutorial-prev"), nextBtn = $("#tutorial-next");
    if (!stage || !dotsEl) return;
    if (counterEl) counterEl.textContent = t("tutorial_step_of", { n: idx + 1, total: total });
    if (progressBar) progressBar.style.width = ((idx + 1) / total * 100) + "%";
    stage.innerHTML = '<div class="tutorial-visual" aria-hidden="true"><div class="tutorial-icon-badge">' + step.icon + '</div><div class="tutorial-preview-pills">' + step.preview() + '</div></div><h3 class="tutorial-step-title">' + esc(t(step.titleKey)) + '</h3><p id="tutorial-desc" class="tutorial-step-desc">' + esc(t(step.descKey)) + '</p><p class="tutorial-tip">' + esc(t(step.tipKey)) + '</p>';
    stage.classList.remove("anim-next", "anim-prev");
    if (dir === "next" || dir === "prev") { void stage.offsetWidth; stage.classList.add(dir === "next" ? "anim-next" : "anim-prev"); }
    dotsEl.innerHTML = TUTORIAL_STEPS.map(function (_, i) { return '<button class="tutorial-dot" type="button" role="tab" aria-selected="' + (i === idx) + '" aria-label="' + esc(t("tutorial_step_of", { n: i + 1, total: total })) + '" data-step="' + i + '"></button>'; }).join("");
    $$(".tutorial-dot", dotsEl).forEach(function (dot) {
      dot.addEventListener("click", function () {
        var target = Number(dot.dataset.step);
        if (target !== state.tutorialStep) {
          var dir2 = target > state.tutorialStep ? "next" : "prev";
          state.tutorialStep = target;
          renderTutorialStep(dir2);
        }
      });
    });
    if (prevBtn) prevBtn.hidden = idx === 0;
    if (nextBtn) nextBtn.textContent = idx === total - 1 ? t("tutorial_done") : t("tutorial_next");
  }

  function openTutorial(startStep) {
    var modal = $("#tutorial-modal");
    if (!modal) return;
    state.tutorialStep = startStep || 0;
    var optOut = $("#tutorial-dont-show");
    if (optOut) optOut.checked = loadPref("tutorial_hide_on_open", "0") === "1";
    modal.hidden = false;
    document.body.classList.add("modal-open");
    renderTutorialStep();
  }
  function closeTutorial() {
    var modal = $("#tutorial-modal");
    if (!modal || modal.hidden) return;
    var optOut = $("#tutorial-dont-show");
    if (optOut) savePref("tutorial_hide_on_open", optOut.checked ? "1" : "0");
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function setupTutorial() {
    var closeBtn = $("#tutorial-close"), skipBtn = $("#tutorial-skip"), prevBtn = $("#tutorial-prev"), nextBtn = $("#tutorial-next"), modal = $("#tutorial-modal");
    if (closeBtn) closeBtn.addEventListener("click", closeTutorial);
    if (skipBtn) skipBtn.addEventListener("click", closeTutorial);
    if (prevBtn) prevBtn.addEventListener("click", function () { if (state.tutorialStep > 0) { state.tutorialStep--; renderTutorialStep("prev"); } });
    if (nextBtn) nextBtn.addEventListener("click", function () { if (state.tutorialStep < TUTORIAL_STEPS.length - 1) { state.tutorialStep++; renderTutorialStep("next"); } else closeTutorial(); });
    if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeTutorial(); });
    document.addEventListener("keydown", function (e) {
      if (!modal || modal.hidden) return;
      if (e.key === "Escape") closeTutorial();
    });
  }

  function updateOfflineReadyBadge() {
    var badge = $("#offline-ready-badge");
    if (!badge) return;
    badge.innerHTML = ICON_CHECK + ' <span>' + esc(t("offline_ready")) + '</span>';
  }

  function updateOfflineBanner() {
    var banner = $("#offline-banner"), textEl = $("#offline-banner-text");
    if (!banner || !textEl) return;
    var isOnline = typeof navigator === "undefined" ? true : navigator.onLine;
    if (!isOnline) {
      banner.classList.remove("is-online");
      banner.setAttribute("role", "alert");
      textEl.textContent = t("offline_banner");
      banner.hidden = false;
    } else {
      banner.classList.remove("is-online");
      banner.hidden = true;
    }
  }

  function setupScrollEffects() {
    var header = $(".site-header"), progressBar = $("#scroll-progress-bar");
    var navLinks = $$(".main-nav a[href^='#'], #mobile-dock a[href^='#']");
    var sectionIds = Array.from(new Set(navLinks.map(function (a) { return a.getAttribute("href"); }).filter(Boolean)));
    var sections = sectionIds.map(function (h) { return $(h); }).filter(Boolean);
    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      if (progressBar) {
        var scrollable = document.documentElement.scrollHeight - window.innerHeight;
        var pct = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
        progressBar.style.width = pct.toFixed(1) + "%";
      }
      var marker = window.scrollY + 180, activeId = "";
      sections.forEach(function (sec) { if (sec.offsetTop <= marker) activeId = "#" + sec.id; });
      navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === activeId); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function downloadSelf(e) {
    if (e && e.preventDefault) e.preventDefault();
    try {
      var html = "<!doctype html>\\n" + document.documentElement.outerHTML;
      var blob = new Blob([html], { type: "text/html;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "one-labogon.html";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      showToast(t("download_toast"));
    } catch (err) {}
  }

  function renderAll() {
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
    renderFacilityList();
    renderNearbyTypeOptions();
    renderNearby();
    runSearch();
    mapsAdapter.updateLabels({ centerLabel: t("map_center_label") });
    var modal = $("#tutorial-modal");
    if (modal && !modal.hidden) renderTutorialStep();
  }

  setupScrollEffects();
  setupDynamicIsland();
  setupTutorial();
  window.addEventListener("offline", function () { updateOfflineBanner(); updateDynamicIslandStatus(); });
  window.addEventListener("online", function () { updateOfflineBanner(); updateDynamicIslandStatus(); initMap(); });

  var langSelect = $("#lang-select");
  if (langSelect) langSelect.addEventListener("change", function (e) { setLanguage(e.target.value); });
  var themeBtn = $("#theme-toggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  $$("[data-text-size]").forEach(function (btn) { btn.addEventListener("click", function () { if (btn.dataset.textSize) applyTextSize(btn.dataset.textSize); }); });
  var contrastBtn = $("#contrast-toggle");
  if (contrastBtn) contrastBtn.addEventListener("click", toggleContrast);
  var guideBtn = $("#guide-open-btn");
  if (guideBtn) guideBtn.addEventListener("click", function () { openTutorial(0); });
  var shareBtn = $("#share-loc-btn");
  if (shareBtn) shareBtn.addEventListener("click", requestShareLocation);
  var shareCopyBtn = $("#share-copy-btn");
  if (shareCopyBtn) shareCopyBtn.addEventListener("click", copyShareLocation);
  var gobagReset = $("#gobag-reset");
  if (gobagReset) gobagReset.addEventListener("click", function () { saveGoBagState(new Set()); renderGoBag(); });
  var locateBtn = $("#locate-btn");
  if (locateBtn) locateBtn.addEventListener("click", showMyLocationOnMap);
  var nearbyOrigin = $("#nearby-origin");
  if (nearbyOrigin) nearbyOrigin.addEventListener("change", function (e) { onNearbyOriginChange(e.target.value); });
  var nearbyType = $("#nearby-type");
  if (nearbyType) nearbyType.addEventListener("change", function (e) { state.nearbyType = e.target.value; renderNearby(); });
  var searchInput = $("#search-input");
  if (searchInput) searchInput.addEventListener("input", runSearch);
  var searchClear = $("#search-clear");
  if (searchClear && searchInput) searchClear.addEventListener("click", function () { searchInput.value = ""; runSearch(); searchInput.focus(); });
  var dlBtn = $("#download-html-btn");
  if (dlBtn) dlBtn.addEventListener("click", downloadSelf);
  var dlLink = $("#download-standalone-link");
  if (dlLink) dlLink.addEventListener("click", downloadSelf);

  initMap();
  renderAll();
  if (loadPref("tutorial_hide_on_open", "0") !== "1") openTutorial(0);
})();
`;

export function buildStandaloneHtml(): string {
  const cleanCss = escapeForInlineTag(
    rawStyles.replace(/^\s*@import\s+["']tailwindcss["'];\s*/m, "")
  );

  const bundleData = escapeForInlineTag(
    JSON.stringify({
      AGENCIES,
      CONTACTS,
      DATA_META,
      FACILITIES,
      FACILITY_TYPES,
      MAP_CENTER,
      CATEGORIES,
      FIRST_AID_CARDS,
      GO_BAG_ITEMS,
      TRANSLATIONS,
    })
  );

  const bodyHtml = sanitizeClonedBodyHtml();
  const safeScript = escapeForInlineTag(STANDALONE_SCRIPT);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>One Labogon — Barangay Labogon, Mandaue City</title>
    <meta
      name="description"
      content="Web-Based Emergency Information and Assistance System for Barangay Labogon, Mandaue City, Cebu."
    />
    <meta name="theme-color" content="#c2410c" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="One Labogon" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23dc2626%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z%27/%3E%3Cpath d=%27M12 8v4%27/%3E%3Cpath d=%27M12 16h.01%27/%3E%3C/svg%3E" />
    <script>
      (function () {
        try {
          var savedTheme = localStorage.getItem("theme");
          if (savedTheme === "dark" || savedTheme === "light") {
            document.documentElement.setAttribute("data-theme", savedTheme);
          }
          var savedSize = localStorage.getItem("textSize");
          if (savedSize === "normal" || savedSize === "large" || savedSize === "xlarge") {
            document.documentElement.setAttribute("data-text-size", savedSize);
          }
          var savedContrast = localStorage.getItem("contrast");
          if (savedContrast === "high" || savedContrast === "normal") {
            document.documentElement.setAttribute("data-contrast", savedContrast);
          }
        } catch (e) {}
      })();
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap"
    />
    <style>${cleanCss}</style>
  </head>
  <body id="top">
    ${bodyHtml}
    <script>window.__LABOGON_BUNDLE__ = ${bundleData};</script>
    <script>${safeScript}</script>
  </body>
</html>
`;
}
