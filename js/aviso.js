(function () {
  "use strict";

  // Protección contra "clickjacking", igual que en la página principal.
  if (window.top !== window.self) {
    document.documentElement.style.display = "none";
    try { window.top.location = window.self.location.href; } catch (err) { /* marco aislado: queda oculto */ }
    return;
  }

  // Los datos del negocio salen de datos/negocio.js. Si falta alguno, se queda el texto escrito en la página.
  var N = window.NEGOCIO || {};

  document.querySelectorAll("[data-negocio]").forEach(function (el) {
    var v = N[el.getAttribute("data-negocio")] || N[el.getAttribute("data-respaldo")];
    if (v) el.textContent = v;
  });

  document.querySelectorAll('[data-enlace="correo"]').forEach(function (el) {
    if (!N.correo) return;
    el.href = "mailto:" + N.correo;
    el.textContent = N.correo;
  });

  document.querySelectorAll('[data-enlace="telefono"]').forEach(function (el) {
    if (!N.telefono) return;
    el.href = "tel:" + String(N.telefono).replace(/[^\d+]/g, "");
    el.textContent = N.telefono;
  });
})();
