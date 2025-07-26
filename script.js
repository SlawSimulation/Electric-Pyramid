function loadLayout() {
  const layoutWrapperTop = document.createElement("div");
  const layoutWrapperBottom = document.createElement("div");
  layoutWrapperTop.id = "layout-top";
  layoutWrapperBottom.id = "layout-bottom";

  document.body.prepend(layoutWrapperTop);
  document.body.appendChild(layoutWrapperBottom);

  fetch("shared/layout/nav.html")
    .then(res => res.text())
    .then(html => {
      const temp = document.createElement("div");
      temp.innerHTML = html;

      const header = temp.querySelector("header");
      const footer = temp.querySelector("footer");

      if (header) layoutWrapperTop.appendChild(header);
      if (footer) layoutWrapperBottom.appendChild(footer);

      // Load nav styles (update path to nav.css)
      const navCSS = document.createElement("link");
      navCSS.rel = "stylesheet";
      navCSS.href = "shared/layout/nav.css";
      document.head.appendChild(navCSS);

      // Highlight active nav link
      const path = window.location.pathname.split("/").pop();
      const navLinks = layoutWrapperTop.querySelectorAll("nav a");
      navLinks.forEach(link => {
        // Normalize href to just filename for comparison
        const href = link.getAttribute("href").split("/").pop();
        if (href === path) {
          link.classList.add("active");
        }
      });
    })
    .catch(err => {
      console.error("Failed to load nav.html:", err);
    });
}

document.addEventListener("DOMContentLoaded", loadLayout);
