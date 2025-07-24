function loadLayout() {
  const layoutWrapperTop = document.createElement("div");
  const layoutWrapperBottom = document.createElement("div");
  layoutWrapperTop.id = "layout-top";
  layoutWrapperBottom.id = "layout-bottom";

  document.body.prepend(layoutWrapperTop);
  document.body.appendChild(layoutWrapperBottom);

  fetch("/Shared/Layout/layout.html")
    .then(res => res.text())
    .then(html => {
      const temp = document.createElement("div");
      temp.innerHTML = html;

      const header = temp.querySelector("header");
      const footer = temp.querySelector("footer");

      if (header) layoutWrapperTop.appendChild(header);
      if (footer) layoutWrapperBottom.appendChild(footer);

      // Load layout styles
      const layoutCSS = document.createElement("link");
      layoutCSS.rel = "stylesheet";
      layoutCSS.href = "/Shared/Layout/layout.css";
      document.head.appendChild(layoutCSS);

      // Highlight active link
      const path = window.location.pathname.split("/").pop();
      const navLinks = layoutWrapperTop.querySelectorAll("nav a");
      navLinks.forEach(link => {
        if (link.getAttribute("href").includes(path)) {
          link.classList.add("active");
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", loadLayout);
