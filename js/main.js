/**
 * ACTI - Script común: menú móvil y comportamiento básico
 */
(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.querySelector(".nav-main ul");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var isOpen = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Cerrar menú al hacer clic en un enlace (navegación interna en SPA no aplica; útil si se añaden anclas)
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Marcar enlace activo según la página actual
  var path = window.location.pathname.replace(/\/$/, "") || "";
  var currentPage = path.split("/").pop() || "index.html";
  if (!currentPage || currentPage === "ACTI") currentPage = "index.html";

  document.querySelectorAll(".nav-main a[href]").forEach(function (a) {
    var href = (a.getAttribute("href") || "").replace(/^\.\//, "");
    if (href === "" || href === "index.html") href = "index.html";
    if (href === currentPage) a.classList.add("active");
  });
})();
