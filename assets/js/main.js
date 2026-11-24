/* 10CTY — shared site behaviour */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  var PROJECTS = window.PROJECTS || [];
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l14 8-14 8z"/></svg>';

  /* ---------- nav ---------- */
  var nav = $("#nav");
  var onScroll = function () { if (nav) nav.classList.toggle("solid", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = $("#burger"), mob = $("#mob");
  function setMenu(open) {
    if (!burger || !mob) return;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    mob.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  $$("#mob a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------- project card markup ---------- */
  function card(p, i) {
    return (
      '<button type="button" class="card" data-play="' + esc(p.id) + '" aria-label="Play ' + esc(p.title + " — " + p.subtitle) + '">' +
        '<div class="card-media">' +
          '<img src="' + esc(p.thumb) + '" alt="" loading="lazy" decoding="async">' +
          '<span class="card-badge">' + esc(p.type) + "</span>" +
          '<span class="card-play">' + PLAY + "</span>" +
          '<span class="card-dur">' + esc(p.duration) + "</span>" +
        "</div>" +
        (i == null ? "" :
        '<div class="card-info"><div>' +
          '<div class="card-title">' + esc(p.title) + "</div>" +
          '<div class="card-sub">' + esc(p.subtitle) + "</div>" +
        '</div><span class="card-num">' + pad(i + 1) + "</span></div>") +
      "</button>"
    );
  }

  /* ---------- home: featured work ---------- */
  var featured = $("#featured");
  if (featured) {
    featured.innerHTML = PROJECTS.filter(function (p) { return p.featured; })
      .map(function (p, i) { return '<div class="rv' + (i % 2 ? " d1" : "") + '">' + card(p, i) + "</div>"; })
      .join("");
  }

  /* ---------- home: brands ---------- */
  var brandList = $("#brands");
  if (brandList) {
    brandList.innerHTML = (window.BRANDS || []).map(function (b) {
      var inner = b.logo
        ? '<img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '" loading="lazy">'
        : '<span class="brand-word">' + esc(b.name) + "</span>";
      return '<li class="brand">' + (b.url ? '<a href="' + esc(b.url) + '" target="_blank" rel="noopener">' + inner + "</a>" : inner) + "</li>";
    }).join("");
  }

  /* ---------- work page ---------- */
  var list = $("#work-list"), filters = $("#filters");
  if (list) {
    list.innerHTML = PROJECTS.map(function (p, i) {
      return (
        '<article class="work-item" id="' + esc(p.id) + '" data-tags="' + esc(p.tags.join("|")) + '">' +
          '<div class="rv">' + card(p) + "</div>" +
          '<div class="work-meta rv d1">' +
            '<span class="card-num">' + pad(i + 1) + " / " + pad(PROJECTS.length) + "</span>" +
            "<h2>" + esc(p.title) + "</h2>" +
            '<div class="sub">' + esc(p.subtitle) + "</div>" +
            "<p>" + esc(p.about) + "</p>" +
            '<dl class="dl"><dt>Client</dt><dd>' + esc(p.client) + "</dd>" +
            "<dt>Format</dt><dd>" + esc(p.type) + "</dd>" +
            "<dt>Length</dt><dd>" + esc(p.duration) + "</dd></dl>" +
            '<div class="tags">' + p.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    if (filters) {
      var counts = {};
      PROJECTS.forEach(function (p) { p.tags.forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
      var tags = Object.keys(counts);
      filters.innerHTML =
        '<button type="button" class="chip" data-f="all" aria-pressed="true">All<span class="count">' + PROJECTS.length + "</span></button>" +
        tags.map(function (t) {
          return '<button type="button" class="chip" data-f="' + esc(t) + '" aria-pressed="false">' + esc(t) + '<span class="count">' + counts[t] + "</span></button>";
        }).join("");
      filters.addEventListener("click", function (e) {
        var b = e.target.closest(".chip");
        if (!b) return;
        var f = b.getAttribute("data-f");
        $$(".chip", filters).forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
        $$(".work-item", list).forEach(function (it) {
          var show = f === "all" || it.getAttribute("data-tags").split("|").indexOf(f) > -1;
          it.classList.toggle("hide", !show);
          if (show) $$(".rv", it).forEach(function (r) { r.classList.add("in"); });
        });
      });
    }
  }

  /* ---------- lightbox player ---------- */
  var lb, lbVideo, lbTitle, lastFocus;
  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lb";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Video player");
    lb.innerHTML =
      '<div class="lb-inner"><video controls playsinline preload="metadata"></video>' +
      '<div class="lb-bar"><div class="lb-title"></div><button type="button" class="lb-close">Close ✕</button></div></div>';
    document.body.appendChild(lb);
    lbVideo = $("video", lb);
    lbTitle = $(".lb-title", lb);
    $(".lb-close", lb).addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox(); });
  }
  function openLightbox(p) {
    if (!lb) buildLightbox();
    lastFocus = document.activeElement;
    lbTitle.innerHTML = esc(p.title) + "<small>" + esc(p.subtitle) + " · " + esc(p.duration) + "</small>";
    lbVideo.src = p.video;
    lbVideo.poster = p.thumb;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    var pr = lbVideo.play();
    if (pr && pr.catch) pr.catch(function () {});
    $(".lb-close", lb).focus();
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lbVideo.pause();
    lbVideo.removeAttribute("src");
    lbVideo.load();
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-play]");
    if (!t) return;
    var id = t.getAttribute("data-play");
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (p) openLightbox(p);
  });

  /* ---------- scroll reveal ---------- */
  var rvs = $$(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    rvs.forEach(function (el) { io.observe(el); });
  } else {
    rvs.forEach(function (el) { el.classList.add("in"); });
  }

  /* jump to a project from a #hash link (e.g. work.html#busha) */
  if (location.hash && list) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 50);
  }

  /* ---------- contact form → opens email app ---------- */
  var form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var subject = "Project enquiry — " + (d.get("service") || "General") + " (" + d.get("name") + ")";
      var body =
        "Hi Teniola,\n\n" + d.get("message") +
        "\n\n—\nName: " + d.get("name") +
        "\nEmail: " + d.get("email") +
        (d.get("company") ? "\nCompany: " + d.get("company") : "") +
        "\nService: " + (d.get("service") || "—");
      window.location.href = "mailto:teniolasogbetun@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
