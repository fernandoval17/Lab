# Laboratorio Sta. Margarita

Página informativa del laboratorio (Etzatlán, Jalisco): catálogo de estudios con buscador,
preparación para cada estudio, lista de estudios para enviar por WhatsApp e información de la
sucursal. No requiere inicio de sesión, servidor ni base de datos.

## Cómo verla

Abra `index.html` en el navegador.

## Publicarla en GitHub Pages

1. En GitHub, entre al repositorio y abra **Settings → Pages**.
2. En **Source** elija **Deploy from a branch**.
3. En **Branch** elija la rama que contiene la página y la carpeta **/ (root)**, y presione **Save**.
4. En uno o dos minutos la página queda en
   `https://laboratoriostamargarita.com/`.

Si el repositorio es privado, GitHub Pages solo está disponible en planes de pago; en el plan
gratuito hay que hacerlo público en **Settings → General → Change visibility**.

## Cómo actualizar la información

| Qué quiere cambiar | Archivo |
| --- | --- |
| Estudios y su preparación (226 estudios, tomados de la lista en Excel) | `datos/estudios.js` |
| Dirección, teléfono, WhatsApp, horarios, servicios | `datos/negocio.js` |

Cada archivo trae instrucciones al inicio. Puntos importantes:

- **Precios:** la página no muestra precios. El paciente arma su lista y la envía por
  WhatsApp para pedirlos, o muestra el código QR de su lista en el laboratorio.
- **Código QR:** con la página publicada en internet, el QR abre la misma página con la
  lista del paciente. Sin publicar, el QR contiene la lista en texto.
- **WhatsApp:** el número está en `whatsapp`, dentro de `datos/negocio.js`; lo usan los
  botones "Escribir por WhatsApp" y "Cotizar por WhatsApp".
- **Datos de contacto:** el teléfono, la dirección, el horario y el correo también están
  escritos en `index.html`, para que se vean aunque el navegador no ejecute JavaScript.
  Si cambian, actualícelos en los dos archivos.
- **Aviso amarillo:** cuando la información ya esté revisada, cambie
  `catalogoPreliminar` a `false` en `datos/negocio.js` para ocultarlo.
