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

  // Identificador único y texto de búsqueda por estudio.
  var porId = {};
  ESTUDIOS.forEach(function (e, i) {
    var id = String(e.clave || "").trim();
    if (!id || porId[id]) id = "e" + i;
    e.id = id;
    e._busqueda = norm([e.nombre, e.clave, e.categoria, e.sinonimos, e.incluye].join(" "));
    porId[id] = e;
  });

  var estado = { texto: "", categoria: "", lista: leerLista(), qrVisible: false };

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
    var telefonos = [N.telefono, N.telefono2].filter(Boolean);
    $("#datoTelefono").innerHTML = telefonos.length
      ? telefonos.map(function (n) { return '<a href="tel:' + esc(n.replace(/[^\d+]/g, "")) + '">' + esc(n) + "</a>"; }).join(" · ") : pendiente;
    $("#datoCorreo").innerHTML = N.correo
      ? '<a href="mailto:' + esc(N.correo) + '">' + esc(N.correo) + "</a>" : pendiente;

    var tel = function (n) { return '<a href="tel:' + esc(String(n).replace(/[^\d+]/g, "")) + '">' + esc(n) + "</a>"; };
    $("#cartelHorario").innerHTML = (N.horarios || []).length
      ? N.horarios.map(function (h) { return esc(h.dias) + "<br>" + esc(h.horas); }).join("<br>") : pendiente;
    $("#cartelUrgencias").innerHTML = (N.urgencias || N.telefono) ? tel(N.urgencias || N.telefono) : pendiente;

    var abierto = estaAbierto();
    document.querySelectorAll("[data-estado-horario]").forEach(function (el) {
      el.hidden = abierto === null;
      el.textContent = abierto ? "Abierto ahora" : "Cerrado ahora";
      el.classList.toggle("abierto", !!abierto);
    });
    if (N.whatsapp) {
      $("#flotante").href = enlaceWhatsApp("Hola, quisiera información sobre sus estudios.");
      $("#flotante").hidden = false;
    }

    var acciones = "<p>¿Tienes dudas sobre un estudio o su preparación? Con gusto te orientamos.</p>";
    if (N.whatsapp) acciones += '<a class="boton boton-claro" target="_blank" rel="noopener" href="' + enlaceWhatsApp("Hola, quisiera información sobre sus estudios.") + '">Escribir por WhatsApp</a>';
    if (N.whatsapp) acciones += '<a class="boton boton-claro" target="_blank" rel="noopener" href="' + enlaceWhatsApp("Hola, quisiera agendar una toma de muestras a domicilio.") + '">Agendar toma a domicilio</a>';
    if (N.telefono) acciones += '<a class="boton boton-claro" href="tel:' + esc(N.telefono.replace(/[^\d+]/g, "")) + '">Llamar</a>';
    if (N.correo) acciones += '<a class="boton boton-claro" href="mailto:' + esc(N.correo) + '">Enviar correo</a>';
    if (N.mapaUrl) acciones += '<a class="boton boton-claro" target="_blank" rel="noopener" href="' + esc(N.mapaUrl) + '">Cómo llegar</a>';
    var redes = [["facebook", "Facebook"], ["instagram", "Instagram"]].filter(function (r) { return N[r[0]]; }).map(function (r) {
      return '<a target="_blank" rel="noopener" href="' + esc(N[r[0]]) + '">' + r[1] + "</a>";
    });
    if (redes.length) acciones += '<p class="redes">Síguenos: ' + redes.join(" · ") + "</p>";
    if (!N.whatsapp && !N.telefono && !N.mapaUrl) acciones += '<p class="pendiente">Datos de contacto por confirmar.</p>';
    $("#accionesContacto").innerHTML = acciones;

    $("#servicios").innerHTML = (N.servicios || []).map(function (s) {
      return "<div><b>" + esc(s.titulo) + "</b><p>" + esc(s.texto) + "</p></div>";
    }).join("");
    $("#listaIndicaciones").innerHTML = (N.indicaciones || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  }

  // true / false según el horario; null si no hay horario estructurado.
  function estaAbierto() {
    var hs = (N.horarios || []).filter(function (h) { return h.abre && h.cierra && Array.isArray(h.diasSemana); });
    if (!hs.length) return null;
    var p = {};
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: N.zonaHoraria || "America/Mexico_City", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    } catch (err) { return null; }
    var dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday);
    var ahora = Number(p.hour) * 60 + Number(p.minute);
    var minutos = function (s) { var a = String(s).split(":"); return Number(a[0]) * 60 + Number(a[1] || 0); };
    return hs.some(function (h) { return h.diasSemana.indexOf(dia) !== -1 && ahora >= minutos(h.abre) && ahora < minutos(h.cierra); });
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
        '<div class="tarjeta-pie"><button class="enlace" type="button" data-ver="' + esc(e.id) + '">Ver detalles</button>' + botonAgregar(e) + "</div>" +
        "</article>";
    }).join("");
    $("#vacio").hidden = lista.length > 0;
    if (!lista.length && N.whatsapp) {
      $("#preguntar").href = enlaceWhatsApp("Hola, ¿realizan este estudio? " + estado.texto.trim());
      $("#preguntar").hidden = false;
    }
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
        '<div class="detalle-pie"><span class="nota">Agrégalo a tu lista para pedir precio por WhatsApp.</span>' + botonAgregar(e) + "</div>" +
      "</div>";
    var d = $("#detalle");
    d.dataset.id = id;
    abrirDialogo(d);
  }

  // ───────── Mi lista ─────────
  function estudiosEnLista() { return estado.lista.map(function (id) { return porId[id]; }).filter(Boolean); }

  function textoLista() {
    var sel = estudiosEnLista();
    var lineas = ["Hola, me interesan estos estudios en " + (N.nombre || "el laboratorio") + ":"];
    sel.forEach(function (e) { lineas.push("• " + e.nombre); });
    lineas.push("¿Me pueden dar el precio y confirmar la preparación? Gracias.");
    return lineas.join("\n");
  }

  // Contenido del código QR: si la página está publicada, un enlace que abre
  // esta misma lista; si no, la lista en texto.
  function contenidoQR() {
    var sel = estudiosEnLista();
    if (/^https?:$/.test(location.protocol)) {
      return location.origin + location.pathname + "?lista=" + sel.map(function (e) { return encodeURIComponent(e.id); }).join(",");
    }
    return [(N.nombre || "Laboratorio") + " - Lista de estudios (" + sel.length + ")"]
      .concat(sel.map(function (e, i) { return (i + 1) + ". " + e.nombre + (e.clave ? " [" + e.clave + "]" : ""); })).join("\n");
  }

  function svgQR(texto) {
    if (typeof qrcode !== "function") return "";
    try {
      qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];
      var q = qrcode(0, "M");
      q.addData(texto, "Byte");
      q.make();
      return q.createSvgTag({ cellSize: 4, margin: 4, scalable: true });
    } catch (err) { return ""; }
  }

  function pintarLista() {
    var sel = estudiosEnLista();
    $("#contador").textContent = sel.length;
    $("#barraLista").hidden = !sel.length;
    $("#barraTexto").textContent = sel.length + (sel.length === 1 ? " estudio en tu lista" : " estudios en tu lista");
    document.body.classList.toggle("con-barra", sel.length > 0);
    if (!sel.length) {
      $("#listaCuerpo").innerHTML = '<p class="lista-vacia">Tu lista está vacía.<br>Agrega estudios desde el catálogo.</p>';
      $("#listaPie").innerHTML = "";
      return;
    }
    $("#listaCuerpo").innerHTML = (estado.deQR ? '<p class="nota aviso-qr">Lista abierta desde un código QR.</p>' : "") + sel.map(function (e) {
      return '<div class="renglon"><div><b>' + esc(e.nombre) + "</b><small>" + esc(e.preparacion || "") + "</small></div>" +
        '<div class="renglon-lado"><button class="quitar" type="button" data-alternar="' + esc(e.id) + '">Quitar</button></div></div>';
    }).join("");

    var qr = svgQR(contenidoQR());
    var pie = N.whatsapp
      ? '<a class="boton boton-primario" target="_blank" rel="noopener" href="' + esc(enlaceWhatsApp(textoLista())) + '">Pedir precios por WhatsApp</a>'
      : "";
    if (qr) {
      pie += '<button class="boton" type="button" id="alternarQR" aria-expanded="' + estado.qrVisible + '">' + (estado.qrVisible ? "Ocultar código QR" : "Mostrar código QR") + "</button>";
      if (estado.qrVisible) pie += '<div class="qr" role="img" aria-label="Código QR con tu lista de estudios">' + qr + '</div><p class="nota qr-nota">Muestra este código al llegar al laboratorio para que escaneen tu lista.</p>';
    }
    pie += '<div class="pie-enlaces"><button class="quitar neutro" type="button" id="copiarLista">Copiar lista</button>' +
      '<button class="quitar" type="button" id="vaciarLista">Vaciar lista</button></div>';
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

  // Abrir un diálogo deja una entrada en el historial para que el botón
  // "Atrás" del celular lo cierre en lugar de salir de la página.
  function abrirDialogo(d) {
    if (d.open) return;
    d.showModal();
    try { history.pushState({ dialogo: d.id }, ""); } catch (err) { /* sin historial */ }
  }
  document.querySelectorAll("dialog").forEach(function (d) {
    d.addEventListener("close", function () {
      if (history.state && history.state.dialogo === d.id) history.back();
    });
  });
  window.addEventListener("popstate", function () {
    document.querySelectorAll("dialog[open]").forEach(function (d) { d.close(); });
  });

  function buscar(texto, desplazar) {
    estado.texto = texto;
    if ($("#buscar").value !== texto) $("#buscar").value = texto;
    if ($("#buscar2").value !== texto) $("#buscar2").value = texto;
    pintarCatalogo();
    if (desplazar) $("#estudios").scrollIntoView();
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
    var t = ev.target.closest("[data-alternar],[data-ver],[data-cat],[data-sugerencia],[data-cerrar],#abrirLista,#barraLista,#copiarLista,#vaciarLista,#alternarQR,#limpiar");
    if (!t) {
      // Clic en el fondo oscuro cierra el diálogo.
      if (ev.target.tagName === "DIALOG") ev.target.close();
      return;
    }
    if (t.hasAttribute("data-alternar")) alternar(t.getAttribute("data-alternar"));
    else if (t.hasAttribute("data-ver")) abrirDetalle(t.getAttribute("data-ver"));
    else if (t.hasAttribute("data-cat")) { estado.categoria = t.getAttribute("data-cat"); pintarFiltros(); pintarCatalogo(); }
    else if (t.hasAttribute("data-sugerencia")) {
      estado.categoria = "";
      pintarFiltros();
      buscar(t.getAttribute("data-sugerencia"), true);
    }
    else if (t.id === "limpiar") { estado.categoria = ""; pintarFiltros(); buscar("", false); }
    else if (t.hasAttribute("data-cerrar")) t.closest("dialog").close();
    else if (t.id === "abrirLista" || t.id === "barraLista") { pintarLista(); abrirDialogo($("#lista")); }
    else if (t.id === "copiarLista") copiar(textoLista());
    else if (t.id === "alternarQR") { estado.qrVisible = !estado.qrVisible; pintarLista(); }
    else if (t.id === "vaciarLista") { estado.lista = []; guardarLista(); pintarCatalogo(); pintarLista(); }
  });

  $("#buscar").addEventListener("input", function (ev) { buscar(ev.target.value, false); });
  $("#buscar2").addEventListener("input", function (ev) { buscar(ev.target.value, false); });
  $("#formBuscar").addEventListener("submit", function (ev) { ev.preventDefault(); $("#buscar").blur(); $("#estudios").scrollIntoView(); });

  // Enlace del código QR: ?lista=BH,GLU abre la página con esa lista.
  var recibida = new URLSearchParams(location.search).get("lista");
  if (recibida) {
    var ids = recibida.split(",").filter(function (id, i, a) { return porId[id] && a.indexOf(id) === i; });
    if (ids.length) {
      estado.lista = ids;
      estado.deQR = true;
      guardarLista();
    }
    // Se quita ?lista= de la dirección para que recargar no deshaga cambios.
    try { history.replaceState(null, "", location.pathname + location.hash); } catch (err) { /* sin historial */ }
  }

  pintarNegocio();
  pintarSugerencias();
  pintarFiltros();
  pintarCatalogo();
  pintarLista();
  if (estado.deQR) abrirDialogo($("#lista"));
})();
