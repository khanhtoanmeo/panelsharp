/* Applies window.PANELSHARP_CONFIG (config.js) to the page. Edit config.js, not this file. */
(function () {
  var cfg = window.PANELSHARP_CONFIG || {};
  function val(key) { return Object.prototype.hasOwnProperty.call(cfg, key) ? String(cfg[key]) : null; }

  // data-cfg-text="KEY": replace text content
  document.querySelectorAll("[data-cfg-text]").forEach(function (el) {
    var v = val(el.getAttribute("data-cfg-text"));
    if (v !== null) el.textContent = v;
  });
  // data-cfg-href="KEY": replace href
  document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
    var key = el.getAttribute("data-cfg-href");
    var v = val(key);
    if (v === null) return;
    // Placeholder still unset (value equals its own key): show a disabled "Coming soon" button
    if (v === key) {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.style.opacity = "0.55";
      el.style.pointerEvents = "none";
      el.textContent = "Coming soon";
      return;
    }
    el.setAttribute("href", v);
  });
  // data-cfg-mailto="KEY": mailto link, also sets the text unless data-keep-text is present
  document.querySelectorAll("[data-cfg-mailto]").forEach(function (el) {
    var v = val(el.getAttribute("data-cfg-mailto"));
    if (v === null) return;
    var subject = el.getAttribute("data-subject");
    el.setAttribute("href", "mailto:" + v + (subject ? "?subject=" + encodeURIComponent(subject) : ""));
    if (!el.hasAttribute("data-keep-text")) el.textContent = v;
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  // Before/after comparison slider
  document.querySelectorAll(".compare").forEach(function (box) {
    var range = box.querySelector("input[type=range]");
    if (!range) return;
    box.classList.add("is-slider");
    function set() { box.style.setProperty("--pos", range.value + "%"); }
    range.addEventListener("input", set);
    set();
  });
})();
