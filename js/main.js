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

  // Modal con los datos de cada integrante (página Nosotros)
  var modal = document.getElementById("member-modal");
  if (modal && typeof modal.showModal === "function") {
    var mPhoto = modal.querySelector(".member-modal__photo");
    var mHolder = modal.querySelector(".member-modal__placeholder");
    var mName = modal.querySelector(".member-modal__name");
    var mRole = modal.querySelector(".member-modal__role");
    var mDesc = modal.querySelector(".member-modal__desc");
    var lastCard = null;

    var openModal = function (card) {
      var img = card.querySelector(".member-photo");
      var holder = card.querySelector(".member-photo-placeholder");
      var roleEl = card.querySelector(".member-role");
      var descEl = card.querySelector("p");

      mName.textContent = card.querySelector("h3").textContent;
      mRole.textContent = roleEl ? roleEl.textContent : "";
      mDesc.textContent = descEl ? descEl.textContent : "";

      mPhoto.hidden = !img;
      mHolder.hidden = !holder;
      if (img) {
        mPhoto.src = img.currentSrc || img.src;
        mPhoto.alt = img.alt;
      }
      if (holder) mHolder.textContent = holder.textContent;

      lastCard = card;
      modal.showModal();
    };

    document.querySelectorAll(".member-card").forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.addEventListener("click", function () {
        openModal(card);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(card);
        }
      });
    });

    modal.querySelector(".member-modal__close").addEventListener("click", function () {
      modal.close();
    });

    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.close();
    });

    modal.addEventListener("close", function () {
      if (lastCard) lastCard.focus();
    });
  }
})();
