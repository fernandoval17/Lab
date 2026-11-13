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
   `https://www.laboratoriostamargarita.com/`.

Si el repositorio es privado, GitHub Pages solo está disponible en planes de pago; en el plan
gratuito hay que hacerlo público en **Settings → General → Change visibility**.

## Cómo actualizar la información

| Qué quiere cambiar | Archivo |
| --- | --- |
| Estudios, su preparación, categorías y grupos (226 estudios, tomados de la lista en Excel) | `datos/estudios.js` |
| Dirección, teléfono, WhatsApp, horarios, formas de pago, servicios | `datos/negocio.js` |
| Texto del aviso de privacidad | `aviso-de-privacidad.html` |

Cada archivo trae instrucciones al inicio. Puntos importantes:

- **Categorías del catálogo:** están pensadas para el paciente ("Azúcar y diabetes",
  "Riñón y vías urinarias", etc.). Su orden está en `CATEGORIAS_ESTUDIOS`, al inicio de
  `datos/estudios.js`. Un estudio puede estar en varias: la primera de su lista
  `categorias` es la principal. "Infecciones" tiene subgrupos (`subcategoria`).
- **Variantes:** los estudios con varias versiones (por ejemplo, la química sanguínea de 3
  a 45 elementos) comparten tarjeta con un selector. Se unen con el mismo `grupo`; el texto
  de cada opción va en `variante`. Cada variante conserva su propio `id`.
- **Orden:** el catálogo se puede ordenar por recomendado (por categoría) o por nombre.
- **Ayuno y paquetes:** las tarjetas muestran "Requiere ayuno" si la preparación lo menciona
  y "Paquete" si el estudio tiene `paquete: true`.
- **Precios:** la página no muestra precios. El paciente arma su lista y la envía por
  WhatsApp para pedirlos, o muestra el código QR de su lista en el laboratorio.
- **Código QR:** con la página publicada en internet, el QR abre la misma página con la
  lista del paciente. Sin publicar, el QR contiene la lista en texto.
- **WhatsApp:** el número está en `whatsapp`, dentro de `datos/negocio.js`; lo usan los
  botones "Escribir por WhatsApp" y "Cotizar por WhatsApp".
- **Datos de contacto:** teléfono, WhatsApp, dirección, horario, correo y redes se cambian
  solo en `datos/negocio.js`; la página los toma de ahí en todas sus secciones.
- **Aviso de privacidad:** está en `aviso-de-privacidad.html` y se enlaza desde el pie de
  página. Toma el domicilio, el correo y el teléfono de `datos/negocio.js`. Escriba en
  `responsable` el nombre legal del dueño o la razón social. Si cambia el texto, actualice
  la fecha de "Última actualización".
- **Aviso amarillo:** cuando la información ya esté revisada, cambie
  `catalogoPreliminar` a `false` en `datos/negocio.js` para ocultarlo.
