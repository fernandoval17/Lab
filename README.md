# Laboratorio Sta. Margarita

Página informativa del laboratorio (Etzatlán, Jalisco): catálogo de estudios con buscador,
preparación para cada estudio, lista de estudios para enviar por WhatsApp e información de la
sucursal. No requiere inicio de sesión, servidor ni base de datos.

## Cómo verla

Abra `index.html` en el navegador. Para publicarla basta con subir la carpeta completa a
cualquier hospedaje de páginas estáticas (por ejemplo GitHub Pages).

## Cómo actualizar la información

| Qué quiere cambiar | Archivo |
| --- | --- |
| Estudios y su preparación | `datos/estudios.js` |
| Dirección, teléfono, WhatsApp, horarios, servicios | `datos/negocio.js` |

Cada archivo trae instrucciones al inicio. Puntos importantes:

- **Precios:** la página no muestra precios. El paciente arma su lista y la envía por
  WhatsApp para pedirlos, o muestra el código QR de su lista en el laboratorio.
- **Código QR:** con la página publicada en internet, el QR abre la misma página con la
  lista del paciente. Sin publicar, el QR contiene la lista en texto.
- **WhatsApp:** al llenar `whatsapp` en `datos/negocio.js` aparece el botón
  "Enviar lista por WhatsApp".
- **Aviso amarillo:** cuando la información ya esté revisada, cambie
  `catalogoPreliminar` a `false` en `datos/negocio.js` para ocultarlo.
