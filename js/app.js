(function () {
  "use strict";

  // Protección contra "clickjacking": si otra página incrusta este sitio en un
  // marco, se oculta el contenido y se intenta abrir el sitio directamente.
  if (window.top !== window.self) {
    document.documentElement.style.display = "none";
    try { window.top.location = window.self.location.href; } catch (err) { /* marco aislado: queda oculto */ }
    return;
  }

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
    return String(s == null ? "" : s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  };

  // Identificador único y texto de búsqueda por estudio.
  // Sin prototipo, para que claves como "constructor" o "__proto__" no cuenten como estudios.
  var porId = Object.create(null);
  ESTUDIOS.forEach(function (e, i) {
    var id = String(e.id || e.clave || "").trim();
    if (!id || porId[id]) id = "e" + i;
    e.id = id;
    e._busqueda = norm([e.nombre, e.clave, e.categoria, e.sinonimos, e.incluye].join(" "));
    porId[id] = e;
  });

  var POR_PAGINA = 24;
  var estado = { texto: "", categoria: "", lista: leerLista(), qrVisible: false, limite: POR_PAGINA };

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


    pintarEstadoHorario();
    setInterval(pintarEstadoHorario, 60000);
    if (N.whatsapp) {
      $("#domicilioEnlace").href = enlaceWhatsApp("Hola, quisiera agendar una toma de muestras a domicilio.");
      $("#domicilioEnlace").hidden = false;
    }
    if (N.whatsapp) {
      $("#flotante").href = enlaceWhatsApp("Hola, quisiera información sobre sus estudios.");
      $("#flotante").hidden = false;
    }

    // Panel de ayuda (portada)
    var ayuda = "";
    if (N.whatsapp) ayuda += '<a class="boton boton-primario" target="_blank" rel="noopener" href="' + enlaceWhatsApp("Hola, quisiera información sobre sus estudios.") + '">Escribir por WhatsApp</a>';
    if (N.whatsapp) ayuda += '<a class="boton" target="_blank" rel="noopener" href="' + enlaceWhatsApp("Hola, quisiera agendar una toma de muestras a domicilio.") + '"><span class="txt-largo">Agendar toma a domicilio</span><span class="txt-corto">Toma a domicilio</span></a>';
    if (N.telefono) ayuda += '<a class="boton" href="tel:' + esc(N.telefono.replace(/[^\d+]/g, "")) + '">Llamar</a>';
    $("#ayudaAcciones").innerHTML = ayuda;
    $("#ayuda").hidden = !ayuda;

    // Sucursal (final de la página): cómo llegar y redes
    var acciones = "";
    if (N.mapaUrl) acciones += '<a class="boton boton-claro" target="_blank" rel="noopener" href="' + esc(N.mapaUrl) + '">Cómo llegar</a>';
    var redes = [["facebook", "Facebook"], ["instagram", "Instagram"]].filter(function (r) { return N[r[0]]; }).map(function (r) {
      return '<a target="_blank" rel="noopener" href="' + esc(N[r[0]]) + '">' + r[1] + "</a>";
    });
    if (redes.length) acciones += '<p class="redes">Síguenos: ' + redes.join(" · ") + "</p>";
    $("#accionesContacto").innerHTML = acciones;
    $("#accionesContacto").hidden = !acciones;

    $("#servicios").innerHTML = (N.servicios || []).map(function (s) {
      return "<div><b>" + esc(s.titulo) + "</b><p>" + esc(s.texto) + "</p></div>";
    }).join("");
    $("#servicios").hidden = !(N.servicios || []).length;
    $("#listaIndicaciones").innerHTML = (N.indicaciones || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
  }

  function pintarEstadoHorario() {
    var abierto = estaAbierto();
    document.querySelectorAll("[data-estado-horario]").forEach(function (el) {
      el.hidden = abierto === null;
      el.textContent = abierto ? "Abierto ahora" : "Cerrado ahora";
      el.classList.toggle("abierto", !!abierto);
    });
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
    var visibles = lista.slice(0, estado.limite);
    $("#rejilla").innerHTML = visibles.map(function (e) {
      var meta = [e.muestra].filter(Boolean)
        .map(function (m) { return "<span>" + esc(m) + "</span>"; }).join("");
      return '<article class="tarjeta">' +
        '<span class="etiqueta">' + esc(e.categoria || "Otros") + "</span>" +
        '<h3><button type="button" data-ver="' + esc(e.id) + '">' + esc(e.nombre) + "</button></h3>" +
        '<div class="meta">' + meta + "</div>" +
        '<div class="tarjeta-pie"><button class="enlace" type="button" data-ver="' + esc(e.id) + '">Ver detalles</button>' + botonAgregar(e) + "</div>" +
        "</article>";
    }).join("");
    var restantes = lista.length - visibles.length;
    $("#mas").hidden = restantes <= 0;
    $("#verMas").textContent = "Ver más estudios (" + restantes + " restantes)";
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
    var populares = ["Biometría", "Glucosa", "Orina", "Tiroides", "Embarazo", "Lípidos"].filter(function (t) {
      return ESTUDIOS.some(function (e) { return e._busqueda.indexOf(norm(t)) !== -1; });
    });
    $("#sugerencias").innerHTML = (populares.length ? '<span class="sugerencias-titulo">Estudios frecuentes:</span>' : "") + populares.map(function (t) {
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
        (e.muestra ? '<dl class="detalle-datos">' + dato("Muestra", e.muestra) + "</dl>" : "") +
        '<div><h3>Preparación</h3><p class="preparacion">' + (e.preparacion ? esc(e.preparacion)
          : "Pregúntanos si este estudio requiere ayuno u otra preparación." +
            (N.whatsapp ? ' <a target="_blank" rel="noopener" href="' + esc(enlaceWhatsApp("Hola, ¿qué preparación necesito para el estudio " + e.nombre + "?")) + '">Preguntar por WhatsApp</a>' : "")) + "</p></div>" +
        (incluye.length ? '<div><h3>Incluye</h3><ul class="incluye">' + incluye.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>" : "") +
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
    var lineas = ["Hola, quisiera cotizar estos estudios en " + (N.nombre || "el laboratorio") + ":"];
    sel.forEach(function (e) { lineas.push("• " + e.nombre); });
    lineas.push("¿Me pueden dar el precio y confirmar la preparación? Gracias.");
    return lineas.join("\n");
  }

  // Contenido del código QR: si la página está publicada, un enlace que abre
  // esta misma lista; si no, la lista en texto.
  function contenidoQR() {
    var sel = estudiosEnLista();
    if (/^https?:$/.test(location.protocol)) {
      return location.origin + location.pathname + "#lista=" + sel.map(function (e) { return encodeURIComponent(e.id); }).join(",");
    }
    return [(N.nombre || "Laboratorio") + " - Lista de estudios (" + sel.length + ")"]
      .concat(sel.map(function (e, i) { return (i + 1) + ". " + e.nombre; })).join("\n");
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
      ? '<a class="boton boton-primario" target="_blank" rel="noopener" href="' + esc(enlaceWhatsApp(textoLista())) + '">Cotizar por WhatsApp</a>'
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
    // Al repintar se recrean los botones: se recuerda dónde estaba el foco del teclado.
    var activo = document.activeElement;
    var zona = activo && activo.hasAttribute("data-alternar") ? activo.closest("#rejilla, #detalle, #lista") : null;
    var i = estado.lista.indexOf(id);
    if (i === -1) { estado.lista.push(id); avisar("Agregado: " + e.nombre); }
    else { estado.lista.splice(i, 1); avisar("Se quitó de tu lista"); }
    guardarLista();
    pintarCatalogo();
    pintarLista();
    var d = $("#detalle");
    if (d.open && d.dataset.id === id) abrirDetalle(id);
    if (zona) {
      var destino = Array.prototype.filter.call(zona.querySelectorAll("[data-alternar]"), function (b) { return b.getAttribute("data-alternar") === id; })[0]
        || zona.querySelector("[data-cerrar]");
      if (destino) destino.focus({ preventScroll: true });
    }
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
      var t = $("#tostada");
      if (t.parentNode === d) document.body.appendChild(t);
      if (history.state && history.state.dialogo === d.id) history.back();
    });
  });
  window.addEventListener("popstate", function () {
    document.querySelectorAll("dialog[open]").forEach(function (d) { d.close(); });
  });

  function buscar(texto, desplazar) {
    estado.texto = texto;
    estado.limite = POR_PAGINA;
    if ($("#buscar").value !== texto) $("#buscar").value = texto;
    // Si la categoría elegida no tiene coincidencias, se busca en todo el catálogo.
    if (estado.categoria && !filtrados().length) { estado.categoria = ""; pintarFiltros(); }
    pintarCatalogo();
    if (desplazar) $("#estudios").scrollIntoView();
  }

  // ───────── Botón para ir al inicio / al final ─────────
  var flecha = $("#flecha"), haciaArriba = null;
  function actualizarFlecha() {
    var max = document.documentElement.scrollHeight - innerHeight;
    flecha.hidden = max < 200;
    // La flecha y el botón de WhatsApp aparecen hasta que la persona se desplaza.
    document.body.classList.toggle("desplazado", scrollY > 40);
    var arriba = scrollY > max / 2;
    if (arriba === haciaArriba) return;
    haciaArriba = arriba;
    var texto = arriba ? "Ir al inicio" : "Ir al final";
    flecha.classList.toggle("arriba", arriba);
    flecha.setAttribute("aria-label", texto + " de la página");
  }
  var pendienteFlecha = false;
  window.addEventListener("scroll", function () {
    if (pendienteFlecha) return;
    pendienteFlecha = true;
    requestAnimationFrame(function () { pendienteFlecha = false; actualizarFlecha(); });
  }, { passive: true });
  window.addEventListener("resize", actualizarFlecha);
  flecha.addEventListener("click", function () {
    var suave = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    var arriba = haciaArriba;
    window.scrollTo({ top: arriba ? 0 : document.documentElement.scrollHeight, behavior: suave ? "smooth" : "auto" });
  });

  var temporizador;
  function avisar(texto) {
    var t = $("#tostada");
    // Una ventana abierta tapa todo lo que está fuera de ella, así que el aviso se mete dentro.
    var casa = document.querySelector("dialog[open]") || document.body;
    if (t.parentNode !== casa) casa.appendChild(t);
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
    var t = ev.target.closest("[data-alternar],[data-ver],[data-cat],[data-sugerencia],[data-cerrar],#abrirLista,#barraLista,#copiarLista,#vaciarLista,#alternarQR,#limpiar,#verMas");
    if (!t) {
      // Clic en el fondo oscuro cierra el diálogo.
      if (ev.target.tagName === "DIALOG") ev.target.close();
      return;
    }
    if (t.hasAttribute("data-alternar")) alternar(t.getAttribute("data-alternar"));
    else if (t.hasAttribute("data-ver")) abrirDetalle(t.getAttribute("data-ver"));
    else if (t.hasAttribute("data-cat")) { estado.categoria = t.getAttribute("data-cat"); estado.limite = POR_PAGINA; pintarFiltros(); pintarCatalogo(); }
    else if (t.id === "verMas") {
      var antes = estado.limite;
      estado.limite += POR_PAGINA;
      pintarCatalogo();
      // El foco pasa al primer estudio nuevo para seguir navegando con teclado.
      var nuevo = $("#rejilla").children[antes];
      if (nuevo) nuevo.querySelector("[data-ver]").focus({ preventScroll: true });
    }
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

  // Enlace del código QR: #lista=BH,GLU abre la página con esa lista. Va después
  // de "#" para que los estudios del paciente nunca se envíen al servidor.
  var recibida = location.hash.indexOf("#lista=") === 0 ? decodeURIComponent(location.hash.slice(7)) : "";
  window.addEventListener("hashchange", function () { if (location.hash.indexOf("#lista=") === 0) location.reload(); });
  if (recibida) {
    var ids = recibida.split(",").filter(function (id, i, a) { return porId[id] && a.indexOf(id) === i; });
    if (ids.length) {
      estado.lista = ids;
      estado.deQR = true;
      guardarLista();
    }
    // Se quita la lista de la dirección para que no quede en el historial.
    try { history.replaceState(null, "", location.pathname); } catch (err) { /* sin historial */ }
  }

  // Si la página se recargó con una ventana abierta, se limpia su marca del historial.
  try { if (history.state && history.state.dialogo) history.replaceState(null, "", location.href); } catch (err) { /* sin historial */ }

  pintarNegocio();
  pintarSugerencias();
  pintarFiltros();
  pintarCatalogo();
  pintarLista();
  if (estado.deQR) abrirDialogo($("#lista"));
  actualizarFlecha();
})();
