import { useEffect } from "react";
import { initLabogonApp } from "./lib/labogonApp";

export default function App() {
  useEffect(() => {
    return initLabogonApp();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main" data-i18n="skip">
        Skip to main content
      </a>

      <div id="gmp-quota-banner" className="gmp-quota-banner" hidden role="status" aria-live="polite">
        <span>
          Google Maps Platform quota reached. If you are the app owner, visit{" "}
          <a
            href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
            target="_blank"
            rel="noopener noreferrer"
          >
            maps developer site
          </a>{" "}
          for instructions to update your account.
        </span>
      </div>

      <header className="site-header">
        <div id="offline-banner" className="offline-banner" hidden role="status" aria-live="polite">
          <svg
            className="ui-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 8.82a15 15 0 0 1 20 0" />
            <path d="M5 12.859a10 10 0 0 1 14 0" />
            <path d="M8.5 16.429a5 5 0 0 1 7 0" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
          <span id="offline-banner-text" data-i18n="offline_banner">
            You are offline. Emergency hotlines, safety guides, and saved contacts still work — tap CALL to dial. Live Google Maps requires internet.
          </span>
        </div>

        <div className="container header-inner">
          <a className="brand" href="#top">
            <span className="brand-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </span>
            <strong className="brand-name" data-i18n="site_name">
              One Labogon
            </strong>
          </a>

          {/* iPhone-style Dynamic Island live emergency bar */}
          <div id="dynamic-island" className="dynamic-island">
            <button
              id="island-toggle"
              className="island-trigger"
              type="button"
              aria-expanded="false"
              aria-controls="island-drawer"
              data-i18n-aria="island_toggle_aria"
              aria-label="Toggle quick emergency controls"
            >
              <span className="island-emblem" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                </svg>
              </span>
              <span id="island-status" className="island-status" data-i18n="island_ready">
                Emergency ready
              </span>
              <svg
                className="island-chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div id="island-drawer" className="island-drawer" hidden>
              <div className="island-actions">
                <a className="island-action-btn island-action-call" href="tel:911">
                  <svg
                    className="ui-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span data-i18n="island_quick_call">Call 911 — Emergency</span>
                </a>
                <button id="island-share-btn" className="island-action-btn" type="button">
                  <svg
                    className="ui-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span data-i18n="island_share_loc">GPS Location</span>
                </button>
                <a className="island-action-btn" href="#about">
                  <svg
                    className="ui-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span data-i18n="nav_about">About</span>
                </a>
              </div>
            </div>
          </div>

          <div className="header-tools">
            <label className="sr-only" htmlFor="lang-select" data-i18n="lang_label">
              Language
            </label>
            <select id="lang-select" className="tool-select" defaultValue="en">
              <option value="en">English</option>
              <option value="ceb">Bisaya (Cebuano)</option>
              <option value="fil">Tagalog (Filipino)</option>
            </select>
            <button id="theme-toggle" className="tool-btn" type="button" aria-pressed="false">
              Dark mode
            </button>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary">
          <div className="container nav-inner">
            <a href="#contacts" data-i18n="nav_contacts">
              Contacts
            </a>
            <a href="#emergencies" data-i18n="nav_emergencies">
              Emergencies
            </a>
            <a href="#preparedness" data-i18n="nav_preparedness">
              First Aid &amp; Go-Bag
            </a>
            <a href="#map-section" data-i18n="nav_map">
              Map
            </a>
            <a href="#nearby" data-i18n="nav_nearby">
              Nearby
            </a>
            <a href="#about" data-i18n="nav_about">
              About
            </a>
          </div>
        </nav>

        <div className="scroll-progress" aria-hidden="true">
          <div id="scroll-progress-bar" className="scroll-progress-bar"></div>
        </div>
      </header>

      <main id="main">
        {/* ACCESSIBILITY & OFFLINE STATUS BAR */}
        <div
          className="utility-strip"
          role="region"
          data-i18n-aria="a11y_label"
          aria-label="Accessibility and offline status"
        >
          <div className="container utility-inner">
            <div className="a11y-controls">
              <span className="utility-label" data-i18n="text_size_label">
                Text size:
              </span>
              <div className="segmented-group" role="group" data-i18n-aria="text_size_label" aria-label="Text size">
                <button className="seg-btn" type="button" data-text-size="normal" aria-pressed="true" data-i18n="size_normal">
                  A
                </button>
                <button className="seg-btn" type="button" data-text-size="large" aria-pressed="false" data-i18n="size_large">
                  A+
                </button>
                <button className="seg-btn" type="button" data-text-size="xlarge" aria-pressed="false" data-i18n="size_xlarge">
                  A++
                </button>
              </div>
              <button id="contrast-toggle" className="tool-btn tool-btn-compact" type="button" aria-pressed="false">
                <span aria-hidden="true">◐</span> <span data-i18n="high_contrast">High contrast</span>
              </button>
              <button id="guide-open-btn" className="tool-btn tool-btn-compact" type="button">
                <span aria-hidden="true">?</span> <span data-i18n="guide_open">Guide</span>
              </button>
            </div>
            <div className="offline-status-group">
              <span id="offline-ready-badge" className="offline-ready-text" role="status" aria-live="polite">
                Checking offline cache…
              </span>
              <span className="homescreen-hint" data-i18n="homescreen_hint">
                Tip: Use your browser menu (&quot;Add to Home Screen&quot;) for quick offline access.
              </span>
              <button id="download-html-btn" className="tool-btn tool-btn-compact" type="button">
                <svg
                  className="ui-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span data-i18n="download_btn">Download file</span>
              </button>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="hero">
          <div className="container hero-inner">
            <p className="hero-eyebrow" data-i18n="hero_eyebrow">
              Barangay Labogon · Mandaue City, Cebu
            </p>
            <h1 data-i18n="hero_title">Need emergency help in Barangay Labogon?</h1>
            <p className="hero-sub" data-i18n="hero_sub">
              Find emergency numbers, safety steps, and nearby help for residents of Barangay Labogon, Mandaue City, Cebu.
            </p>

            <div className="quick-calls">
              <p className="quick-title" data-i18n="quick_calls">
                Quick call – 911 &amp; Brgy. Labogon ERT
              </p>
              <div id="quick-calls" className="quick-grid"></div>
            </div>

            {/* SHARE MY LOCATION */}
            <div id="share-location-box" className="share-loc-box">
              <div className="share-loc-head">
                <div className="share-loc-lead">
                  <span className="share-loc-glyph" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="share-loc-title" data-i18n="share_loc_title">
                      Share my location
                    </h2>
                    <p className="share-loc-desc" data-i18n="share_loc_desc">
                      Create an SMS or copyable Google Maps link of your current GPS position to send to family or responders.
                    </p>
                  </div>
                </div>
                <button id="share-loc-btn" className="btn btn-accent" type="button">
                  <svg
                    className="ui-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span data-i18n="share_loc_btn">Share my location</span>
                </button>
              </div>
              <p id="share-loc-status" className="small-note" aria-live="polite"></p>
              <div id="share-loc-actions" className="share-loc-actions" hidden>
                <a id="share-sms-link" className="btn btn-call btn-small" href="#">
                  <svg
                    className="ui-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span data-i18n="share_loc_sms">Send via SMS</span>
                </a>
                <button id="share-copy-btn" className="btn btn-outline btn-small" type="button">
                  <svg
                    className="ui-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span data-i18n="share_loc_copy">Copy location link</span>
                </button>
                <a id="share-map-preview" className="share-loc-link" href="#" target="_blank" rel="noopener noreferrer"></a>
              </div>
              <p className="small-note share-loc-privacy" data-i18n="share_loc_privacy">
                Your location stays on this device — nothing is sent automatically.
              </p>
            </div>

            <p className="hero-note" data-i18n="hero_note">
              If a call does not connect, try another local emergency number on this page.
            </p>
          </div>
        </section>

        {/* SEARCH */}
        <section className="search-section" aria-labelledby="search-heading">
          <div className="container">
            <h2 id="search-heading" className="sr-only" data-i18n="search_title">
              Search
            </h2>
            <div className="search-box">
              <svg
                className="ui-icon search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <label className="sr-only" htmlFor="search-input" data-i18n="search_label">
                Search emergency services and locations
              </label>
              <input
                id="search-input"
                type="search"
                data-i18n-placeholder="search_placeholder"
                placeholder="Search: hospital, fire, police, flood…"
                autoComplete="off"
              />
              <button id="search-clear" className="btn btn-ghost" type="button" hidden data-i18n="search_clear">
                Clear
              </button>
            </div>
            <div id="search-results" className="search-results" hidden aria-live="polite"></div>
          </div>
        </section>

        {/* CONTACTS */}
        <section id="contacts" className="section alt">
          <div className="container">
            <h2 data-i18n="contacts_title">Emergency Hotlines – Labogon and Mandaue City</h2>
            <p className="section-intro" data-i18n="contacts_intro">
              Tap CALL to dial directly from your phone.
            </p>

            <div id="legend" className="legend"></div>

            <p id="unverified-banner" className="warning-banner" role="note" data-i18n="unverified_banner">
              Numbers marked Unverified or Needs confirmation are shown so residents can still try them, but they are NOT officially confirmed. If a call fails, try another listed hotline.
            </p>

            <div id="contacts-list"></div>
          </div>
        </section>

        {/* EMERGENCY CATEGORIES */}
        <section id="emergencies" className="section">
          <div className="container">
            <h2 data-i18n="emerg_title">Emergency Categories</h2>
            <p className="section-intro" data-i18n="emerg_intro">
              Choose a situation to follow the right step-by-step actions and see who to call.
            </p>

            <div id="category-grid" className="category-grid"></div>
            <div id="category-panel" className="category-panel" aria-live="polite"></div>
          </div>
        </section>

        {/* PREPAREDNESS: GO-BAG CHECKLIST & BASIC FIRST-AID */}
        <section id="preparedness" className="section alt">
          <div className="container">
            <h2 data-i18n="prep_title">Go-Bag Checklist &amp; Basic First-Aid</h2>
            <p className="section-intro" data-i18n="prep_intro">
              Prepare an emergency go-bag ahead of time and review basic first-aid steps.
            </p>
            <p className="general-reminder-banner" role="note" data-i18n="prep_disclaimer">
              General safety reminder only — not an official barangay issuance and not formal medical training.
            </p>

            <div className="prep-layout">
              <div className="prep-col">
                <h3 className="prep-col-head">
                  <span aria-hidden="true">🎒</span>{" "}
                  <span data-i18n="gobag_title">Emergency Go-Bag Checklist</span>
                </h3>
                <div className="card gobag-card">
                  <div className="gobag-head">
                    <p id="gobag-progress" className="gobag-progress" aria-live="polite"></p>
                    <button id="gobag-reset" className="btn btn-ghost btn-small" type="button" data-i18n="gobag_reset">
                      Reset checklist
                    </button>
                  </div>
                  <div className="gobag-progress-track" aria-hidden="true">
                    <div id="gobag-progress-bar" className="gobag-progress-bar"></div>
                  </div>
                  <ul id="gobag-list" className="gobag-list"></ul>
                </div>
              </div>

              <div className="prep-col firstaid-wrap">
                <h3 className="prep-col-head firstaid-heading">
                  <span aria-hidden="true">🩹</span>{" "}
                  <span data-i18n="firstaid_title">Basic First-Aid Reminders</span>
                </h3>
                <div id="firstaid-grid" className="firstaid-grid"></div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP */}
        <section id="map-section" className="section">
          <div className="container">
            <h2 data-i18n="map_title">Map and Nearby Services</h2>
            <p className="section-intro" data-i18n="map_intro">
              Explore verified emergency facilities across all parts of Mandaue City — including Barangay Labogon — on Google Maps. Only verified places from our directory are shown.
            </p>

            <div className="map-tools">
              <button id="locate-btn" className="btn btn-outline btn-small" type="button" data-i18n="locate_me">
                Show my location
              </button>
              <span className="filters-title" data-i18n="filters_title">
                Show places:
              </span>
              <div id="map-filters" className="chips"></div>
            </div>

            <p id="map-status" className="small-note" aria-live="polite"></p>
            <p id="map-fallback" className="warning-banner" hidden data-i18n="map_unavailable">
              Google Maps could not load. Check your internet connection. You can still use the list below.
            </p>
            <div id="map" className="map"></div>
            <div id="map-attributions" className="map-attributions" hidden></div>

            <div id="facility-list" className="card-grid"></div>
          </div>
        </section>

        {/* NEARBY ASSISTANCE */}
        <section id="nearby" className="section alt">
          <div className="container">
            <h2 data-i18n="nearby_title">Nearby Assistance</h2>
            <p className="section-intro" data-i18n="nearby_intro">
              Choose where you are, then see the closest help first.
            </p>

            <div className="form-row">
              <div className="field">
                <label htmlFor="nearby-origin" data-i18n="nearby_from">
                  I am at:
                </label>
                <select id="nearby-origin" defaultValue="labogon">
                  <option value="labogon" data-i18n="loc_labogon">
                    Barangay Labogon (center)
                  </option>
                  <option value="gps" data-i18n="loc_gps">
                    My current location (GPS)
                  </option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="nearby-type" data-i18n="nearby_type">
                  Type of help:
                </label>
                <select id="nearby-type"></select>
              </div>
            </div>

            <p className="small-note" data-i18n="nearby_privacy">
              Your location stays in your browser. It is not saved or sent anywhere.
            </p>
            <p id="nearby-status" className="small-note" aria-live="polite"></p>
            <div id="nearby-list" className="card-grid"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section">
          <div className="container about-content">
            <h2 data-i18n="about_title">About this project</h2>
            <p data-i18n="about_p1">
              This is a Grade 12 STEM research project. It gathers emergency information for Barangay Labogon, Mandaue City in one easy-to-use website.
            </p>
            <p data-i18n="about_p2">
              All emergency contact numbers and local resources are verified to help residents reach assistance quickly during emergencies.
            </p>
            <p className="warning-banner" role="note" data-i18n="about_disclaimer">
              This is an academic project. It is not an official website of Barangay Labogon or Mandaue City. In a real emergency, contact your local Barangay DRRMO or Mandaue City emergency services directly.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            <span data-i18n="footer_reviewed">Data last reviewed:</span> <strong id="last-reviewed"></strong>
          </p>
          <p data-i18n="footer_text">Academic research project – Barangay Labogon, Mandaue City, Cebu.</p>
          <p className="footer-download-wrap">
            <a id="download-standalone-link" className="footer-download-link" href="#download">
              <svg
                className="ui-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span data-i18n="footer_download_html">Download single-file HTML (one-labogon.html)</span>
            </a>
          </p>
        </div>
      </footer>

      {/* MOBILE LIQUID GLASS TAB DOCK */}
      <nav id="mobile-dock" className="mobile-dock" aria-label="Mobile quick navigation">
        <a href="#contacts">
          <svg
            className="dock-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="dock-label" data-i18n="nav_contacts">
            Contacts
          </span>
        </a>
        <a href="#emergencies">
          <svg
            className="dock-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
          <span className="dock-label" data-i18n="dock_guides">
            Guides
          </span>
        </a>
        <a href="#preparedness">
          <svg
            className="dock-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="7" width="18" height="14" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="12" y1="11" x2="12" y2="17" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
          <span className="dock-label" data-i18n="dock_prep">
            First Aid
          </span>
        </a>
        <a href="#map-section">
          <svg
            className="dock-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          <span className="dock-label" data-i18n="nav_map">
            Map
          </span>
        </a>
        <a href="#nearby">
          <svg
            className="dock-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="dock-label" data-i18n="nav_nearby">
            Nearby
          </span>
        </a>
      </nav>

      {/* SMALL "COPIED!" TOAST MESSAGE */}
      <div id="copy-toast" className="copy-toast" role="status" aria-live="polite" hidden>
        Copied!
      </div>

      {/* HOW-TO-USE TUTORIAL MODAL */}
      <div
        id="tutorial-modal"
        className="tutorial-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
        aria-describedby="tutorial-desc"
        hidden
      >
        <div className="tutorial-dialog" role="document">
          <div className="tutorial-header">
            <div className="tutorial-header-meta">
              <span id="tutorial-step-counter" className="tutorial-counter">
                Step 1 of 4
              </span>
              <h2 id="tutorial-title" data-i18n="tutorial_heading">
                How to Use One Labogon
              </h2>
            </div>
            <button
              id="tutorial-close"
              className="tutorial-close"
              type="button"
              data-i18n-aria="tutorial_close_aria"
              aria-label="Close tutorial"
            >
              ✕
            </button>
          </div>

          <div className="tutorial-progress" aria-hidden="true">
            <div id="tutorial-progress-bar" className="tutorial-progress-bar"></div>
          </div>

          <div id="tutorial-body" className="tutorial-body">
            <div id="tutorial-stage" className="tutorial-stage"></div>
          </div>

          <div id="tutorial-dots" className="tutorial-dots" role="tablist" aria-label="Tutorial steps"></div>

          <div className="tutorial-footer">
            <label className="tutorial-optout">
              <input id="tutorial-dont-show" type="checkbox" />
              <span data-i18n="tutorial_dont_show">Don&apos;t show on startup</span>
            </label>

            <div className="tutorial-actions">
              <button id="tutorial-skip" className="btn btn-ghost btn-small" type="button" data-i18n="tutorial_skip">
                Skip
              </button>
              <button id="tutorial-prev" className="btn btn-outline btn-small" type="button" data-i18n="tutorial_prev">
                Back
              </button>
              <button id="tutorial-next" className="btn btn-call btn-small" type="button" data-i18n="tutorial_next">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
