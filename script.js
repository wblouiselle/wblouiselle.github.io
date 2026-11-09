// Builds one card per entry in PORTFOLIO (defined in portfolio-data.js).
(function () {
  "use strict";

  var grid = document.getElementById("card-grid");
  if (!grid || typeof PORTFOLIO === "undefined" || !Array.isArray(PORTFOLIO)) {
    return;
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function makeEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (text) {
      el.textContent = text;
    }
    return el;
  }

  function makeLink(text, href, cardTitle) {
    var a = makeEl("a", "card-link", text);
    var label = text + ": " + cardTitle;
    a.href = href;
    if (isExternal(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      label += " (opens in a new tab)";
    }
    a.setAttribute("aria-label", label);
    return a;
  }

  PORTFOLIO.forEach(function (item) {
    var li = makeEl("li", "card");
    var article = makeEl("article", "card-inner");
    var titleId = "card-" + item.id + "-title";
    article.setAttribute("aria-labelledby", titleId);

    // Image
    if (item.image) {
      var figure = makeEl("figure", "card-image");
      var img = document.createElement("img");
      img.src = "images/" + item.image;
      img.alt = item.imageAlt || "";
      img.loading = "lazy";
      figure.appendChild(img);
      article.appendChild(figure);
    }

    var body = makeEl("div", "card-body");

    // Title
    var title = makeEl("h3", "card-title", item.title);
    title.id = titleId;
    body.appendChild(title);

    // Week and audience label
    var meta = makeEl("p", "card-meta");
    var week = String(item.week || "").trim();
    if (week) {
      meta.appendChild(makeEl("span", "card-week", "Week " + week));
    }
    var audience = item.audience === "Technical" ? "Technical" : "Non-technical";
    var badgeClass = audience === "Technical" ? "badge badge-technical" : "badge badge-non-technical";
    meta.appendChild(makeEl("span", badgeClass, audience));
    body.appendChild(meta);

    // Summary and tools
    body.appendChild(makeEl("p", "card-summary", item.summary));
    if (item.tools) {
      body.appendChild(makeEl("p", "card-tools", "Tools: " + item.tools));
    }

    // Links
    var links = makeEl("div", "card-links");
    if (item.link) {
      links.appendChild(makeLink("View artifact", item.link, item.title));
    }
    if (item.howMadeLink) {
      links.appendChild(makeLink("How this was made", item.howMadeLink, item.title));
    }
    body.appendChild(links);

    article.appendChild(body);
    li.appendChild(article);
    grid.appendChild(li);
  });
})();
