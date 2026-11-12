(function () {
  "use strict";

  var N = window.NEGOCIO || {};
  var ESTUDIOS = (window.ESTUDIOS || []).filter(function (e) { return e && e.nombre; });
  var CLAVE_LISTA = "staMargarita.lista";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var norm = function (s) {
    return String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  };
  var pesos = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 });
  var tienePrecio = function (e) { return typeof e.precio === "number" && isFinite(e.precio) && e.precio > 0; };
  var textoPrecio = function (e) { return tienePrecio(e) ? pesos.format(e.precio) : "Consultar precio"; };

  // Identificador único y texto de búsqueda por estudio.
  var porId = {};
  ESTUDIOS.forEach(function (e, i) {
    var id = String(e.clave || "").trim();
    if (!id || porId[id]) id = "e" + i;
    e.id = id;
    e._busqueda = norm([e.nombre, e.clave, e.categoria, e.sinonimos, e.incluye].join(" "));
    porId[id] = e;
  });

  var estado = { texto: "", categoria: "", lista: leerLista() };

  function leerLista() {
    try {
      var ids = JSON.parse(localStorage.getItem(CLAVE_LISTA) || "[]");
      return Array.isArray(ids) ? ids.filter(function (id) { return porId[id]; }) : [];
    } catch (err) { return []; }
  }
  function guardarLista() {
    try { localStorage.setItem(CLAVE_LISTA, JSON.stringify(estado.lista)); } catch (err) { /* sin almacenamiento */ }
  }

  // ───────── Información del negocio ─────────
  function pintarNegocio() {
    document.querySelectorAll("[data-negocio]").forEach(function (el) {
      var v = N[el.getAttribute("data-negocio")];
      if (v) el.textContent = v;
    });
    if (N.nombre) document.title = N.nombre + " · Análisis clínicos en " + (N.ubicacionCorta || "Jalisco");
    $("#aviso").hidden = !N.catalogoPreliminar;

    var pendiente = '<span class="pendiente">Por confirmar</span>';
    $("#datoDireccion").innerHTML = N.direccion ? esc(N.direccion) : esc(N.ubicacionCorta || "") + " · " + pendiente;
    $("#datoHorario").innerHTML = (N.horarios || []).length
      ? N.horarios.map(function (h) { return esc(h.dias) + ": " + esc(h.horas); }).join("<br>")
      : pendiente;
    $("#datoTelefono").innerHTML = N.telefono
      ? '<a href="tel:' + esc(N.telefono.replace(/[^\d+]/g, "")) + '">' + esc(N.telefono) + "</a>" : pendiente;
    $("#datoCorreo").innerHTML = N.correo
      ? '<a href="mailto:' + esc(N.correo) + '">' + esc(N.correo) + "</a>" : pendiente;

    var acciones = "<p>¿Tienes dudas sobre un estudio o su preparación? Con gusto te orientamos.</p>";
    if (N.whatsapp) acciones += '<a class="boton boton-claro" target="_blank" rel="noopener" href="' + enlaceWhatsApp("Hola, quisiera información sobre sus estudios.") + '">Escribir por WhatsApp</a>';
    if (N.telefono) acciones += '<a class="boton boton-claro" href="tel:' + esc(N.telefono.replace(/[^\d+]/g, "")) + '">Llamar</a>';
    if (N.mapaUrl) acciones += '<a class="boton boton-claro" target="_blank" rel="noopener" href="' + esc(N.mapaUrl) + '">Cómo llegar</a>';
    if (!N.whatsapp && !N.telefono && !N.mapaUrl) acciones += '<p class="pendiente">Datos de contacto por confirmar.</p>';
    $("#accionesContacto").innerHTML = acciones;

    $("#servicios").innerHTML = (N.servicios || []).map(function (s) {
      return "<div><b>" + esc(s.titulo) + "</b><p>" + esc(s.texto) + "</p></div>";
    }).join("");
    $("#listaIndicaciones").innerHTML = (N.indicaciones || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  }

  function enlaceWhatsApp(texto) {
    return "https://wa.me/" + String(N.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(texto);
  }

  // ───────── Catálogo ─────────
  function categorias() {
    var cuenta = {}, orden = [];
    ESTUDIOS.forEach(function (e) {
      var c = e.categoria || "Otros";
      if (!cuenta[c]) { cuenta[c] = 0; orden.push(c); }
      cuenta[c]++;
    });
    return orden.map(function (c) { return { nombre: c, total: cuenta[c] }; });
  }

  function pintarFiltros() {
    var html = '<button class="ficha" type="button" data-cat="" aria-pressed="' + (estado.categoria === "") + '">Todos<small>' + ESTUDIOS.length + "</small></button>";
    html += categorias().map(function (c) {
      return '<button class="ficha" type="button" data-cat="' + esc(c.nombre) + '" aria-pressed="' + (estado.categoria === c.nombre) + '">' + esc(c.nombre) + "<small>" + c.total + "</small></button>";
    }).join("");
    $("#filtros").innerHTML = html;
  }

  function filtrados() {
    var palabras = norm(estado.texto).split(/\s+/).filter(Boolean);
    return ESTUDIOS.filter(function (e) {
      if (estado.categoria && (e.categoria || "Otros") !== estado.categoria) return false;
      return palabras.every(function (p) { return e._busqueda.indexOf(p) !== -1; });
    });
  }

  function botonAgregar(e, extra) {
    var esta = estado.lista.indexOf(e.id) !== -1;
    return '<button class="boton boton-chico ' + (esta ? "agregado " : "boton-primario ") + (extra || "") + '" type="button" data-alternar="' + esc(e.id) + '" aria-pressed="' + esta + '">' + (esta ? "✓ En mi lista" : "Agregar") + "</button>";
  }

  function pintarCatalogo() {
    var lista = filtrados();
    $("#rejilla").innerHTML = lista.map(function (e) {
      var meta = [e.muestra, e.entrega && "Entrega: " + e.entrega].filter(Boolean)
        .map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");
      return '<article class="tarjeta">' +
        '<span class="etiqueta">' + esc(e.categoria || "Otros") + "</span>" +
        '<h3><button type="button" data-ver="' + esc(e.id) + '">' + esc(e.nombre) + "</button></h3>" +
        '<div class="meta">' + meta + "</div>" +
        '<div class="tarjeta-pie"><span class="precio' + (tienePrecio(e) ? "" : " consultar") + '">' + textoPrecio(e) + "</span>" + botonAgregar(e) + "</div>" +
        "</article>";
    }).join("");
    $("#vacio").hidden = lista.length > 0;
    $("#resumen").textContent = lista.length === ESTUDIOS.length
      ? ESTUDIOS.length + " estudios disponibles"
      : lista.length + " de " + ESTUDIOS.length + " estudios";
  }

  function pintarSugerencias() {
    var populares = ["Biometría", "Glucosa", "Orina", "Tiroides", "Embarazo", "Check-up"].filter(function (t) {
      return ESTUDIOS.some(function (e) { return e._busqueda.indexOf(norm(t)) !== -1; });
    });
    $("#sugerencias").innerHTML = populares.map(function (t) {
      return '<button class="ficha" type="button" data-sugerencia="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("");
  }

  // ───────── Detalle ─────────
  function abrirDetalle(id) {
    var e = porId[id];
    if (!e) return;
    var dato = function (t, v) { return v ? "<div><dt>" + t + "</dt><dd>" + esc(v) + "</dd></div>" : ""; };
    var incluye = String(e.incluye || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    $("#detalleCuerpo").innerHTML =
      '<div class="detalle">' +
        '<div class="detalle-cabeza"><div><span class="etiqueta">' + esc(e.categoria || "Otros") + '</span><h2 id="detalleTitulo">' + esc(e.nombre) + "</h2></div>" +
        '<button class="cerrar" type="button" data-cerrar aria-label="Cerrar">×</button></div>' +
        (e.descripcion ? "<p>" + esc(e.descripcion) + "</p>" : "") +
        '<dl class="detalle-datos">' + dato("Clave", e.clave) + dato("Muestra", e.muestra) + dato("Entrega", e.entrega) + "</dl>" +
        (e.preparacion ? '<div><h3>Preparación</h3><p class="preparacion">' + esc(e.preparacion) + "</p></div>" : "") +
        (incluye.length ? '<div><h3>Incluye</h3><ul class="incluye">' + incluye.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>" : "") +
        (e.sinonimos ? '<p class="nota">También conocido como: ' + esc(e.sinonimos) + "</p>" : "") +
        '<div class="detalle-pie"><span class="precio' + (tienePrecio(e) ? "" : " consultar") + '">' + textoPrecio(e) + "</span>" + botonAgregar(e) + "</div>" +
      "</div>";
    var d = $("#detalle");
    d.dataset.id = id;
    if (!d.open) d.showModal();
  }

  // ───────── Mi lista ─────────
  function estudiosEnLista() { return estado.lista.map(function (id) { return porId[id]; }).filter(Boolean); }

  function textoLista() {
    var sel = estudiosEnLista();
    var lineas = ["Hola, me interesan estos estudios en " + (N.nombre || "el laboratorio") + ":"];
    sel.forEach(function (e) { lineas.push("• " + e.nombre + (tienePrecio(e) ? " — " + pesos.format(e.precio) : "")); });
    if (sel.length && sel.every(tienePrecio)) {
      lineas.push("Total estimado: " + pesos.format(sel.reduce(function (s, e) { return s + e.precio; }, 0)));
    }
    lineas.push("¿Me pueden confirmar precio y preparación? Gracias.");
    return lineas.join("\n");
  }

  function pintarLista() {
    var sel = estudiosEnLista();
    $("#contador").textContent = sel.length;
    if (!sel.length) {
      $("#listaCuerpo").innerHTML = '<p class="lista-vacia">Tu lista está vacía.<br>Agrega estudios desde el catálogo.</p>';
      $("#listaPie").innerHTML = "";
      return;
    }
    $("#listaCuerpo").innerHTML = sel.map(function (e) {
      return '<div class="renglon"><div><b>' + esc(e.nombre) + "</b><small>" + esc(e.preparacion || "") + "</small></div>" +
        '<div class="renglon-lado"><span>' + textoPrecio(e) + '</span><button class="quitar" type="button" data-alternar="' + esc(e.id) + '">Quitar</button></div></div>';
    }).join("");

    var conPrecio = sel.filter(tienePrecio);
    var pie = "";
    if (conPrecio.length) {
      var total = conPrecio.reduce(function (s, e) { return s + e.precio; }, 0);
      pie += '<div class="total"><span>Total estimado</span><span>' + pesos.format(total) + "</span></div>";
      if (conPrecio.length < sel.length) pie += '<p class="nota">No incluye ' + (sel.length - conPrecio.length) + " estudio(s) con precio por consultar.</p>";
    }
    pie += N.whatsapp
      ? '<a class="boton boton-primario" target="_blank" rel="noopener" href="' + esc(enlaceWhatsApp(textoLista())) + '">Enviar lista por WhatsApp</a>'
      : "";
    pie += '<button class="boton" type="button" id="copiarLista">Copiar lista</button>' +
      '<button class="quitar" type="button" id="vaciarLista">Vaciar lista</button>' +
      '<p class="nota">Precios y disponibilidad se confirman en sucursal.</p>';
    $("#listaPie").innerHTML = pie;
  }

  function alternar(id) {
    var e = porId[id];
    if (!e) return;
    var i = estado.lista.indexOf(id);
    if (i === -1) { estado.lista.push(id); avisar("Agregado: " + e.nombre); }
    else { estado.lista.splice(i, 1); avisar("Se quitó de tu lista"); }
    guardarLista();
    pintarCatalogo();
    pintarLista();
    var d = $("#detalle");
    if (d.open && d.dataset.id === id) abrirDetalle(id);
  }

  var temporizador;
  function avisar(texto) {
    var t = $("#tostada");
    t.textContent = texto;
    t.classList.add("visible");
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { t.classList.remove("visible"); }, 2200);
  }

  function copiar(texto) {
    var hecho = function () { avisar("Lista copiada"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(hecho, function () { avisar("No se pudo copiar"); });
    } else {
      var a = document.createElement("textarea");
      a.value = texto; document.body.appendChild(a); a.select();
      try { document.execCommand("copy"); hecho(); } catch (err) { avisar("No se pudo copiar"); }
      a.remove();
    }
  }

  // ───────── Eventos ─────────
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-alternar],[data-ver],[data-cat],[data-sugerencia],[data-cerrar],#abrirLista,#copiarLista,#vaciarLista");
    if (!t) {
      // Clic en el fondo oscuro cierra el diálogo.
      if (ev.target.tagName === "DIALOG") ev.target.close();
      return;
    }
    if (t.hasAttribute("data-alternar")) alternar(t.getAttribute("data-alternar"));
    else if (t.hasAttribute("data-ver")) abrirDetalle(t.getAttribute("data-ver"));
    else if (t.hasAttribute("data-cat")) { estado.categoria = t.getAttribute("data-cat"); pintarFiltros(); pintarCatalogo(); }
    else if (t.hasAttribute("data-sugerencia")) {
      estado.texto = t.getAttribute("data-sugerencia");
      $("#buscar").value = estado.texto;
      pintarCatalogo();
      $("#estudios").scrollIntoView();
    }
    else if (t.hasAttribute("data-cerrar")) t.closest("dialog").close();
    else if (t.id === "abrirLista") { pintarLista(); $("#lista").showModal(); }
    else if (t.id === "copiarLista") copiar(textoLista());
    else if (t.id === "vaciarLista") { estado.lista = []; guardarLista(); pintarCatalogo(); pintarLista(); }
  });

  $("#buscar").addEventListener("input", function (ev) { estado.texto = ev.target.value; pintarCatalogo(); });
  $("#formBuscar").addEventListener("submit", function (ev) { ev.preventDefault(); $("#estudios").scrollIntoView(); });

  pintarNegocio();
  pintarSugerencias();
  pintarFiltros();
  pintarCatalogo();
  pintarLista();
})();
