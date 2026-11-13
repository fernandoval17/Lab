/*
 * INFORMACIÓN DEL NEGOCIO
 * Edite este archivo para cambiar los datos que aparecen en la página.
 * Los campos que deje vacíos ("") se muestran como "Por confirmar".
 */
window.NEGOCIO = {
  nombre: "Laboratorio Sta. Margarita",
  // Nombre legal del responsable para el aviso de privacidad: el nombre completo del dueño
  // (persona física) o la razón social (empresa). Vacío = se usa el nombre de arriba.
  responsable: "",
  lema: "Análisis clínicos y especializados",
  ubicacionCorta: "Etzatlán, Jalisco",

  // Cambie a false cuando los estudios y estos datos ya estén revisados.
  catalogoPreliminar: false,

  direccion: "Aldama 559-3, Col. Revolución, C.P. 46500, Etzatlán, Jalisco",
  telefono: "386 121 9588",
  telefono2: "",  // Segundo teléfono (opcional)
  urgencias: "386 121 9588", // Teléfono para urgencias fuera de horario
  whatsapp: "523861219588", // Solo números, con 52 al inicio
  correo: "info@laboratoriostamargarita.com",
  facebook: "https://www.facebook.com/share/1DxWCSfDzq/",
  instagram: "https://www.instagram.com/laboratoriostamargarita",
  mapaUrl: "https://maps.app.goo.gl/ro9jUFCHSbpLfC7u8",

  horarios: [
    // diasSemana, abre y cierra sirven para mostrar "Abierto ahora" / "Cerrado ahora".
    // Días: 0 = domingo, 1 = lunes … 6 = sábado. Horas en formato de 24 horas.
    { dias: "Lunes a sábado", horas: "7:00 am a 2:30 pm", diasSemana: [1, 2, 3, 4, 5, 6], abre: "07:00", cierra: "14:30" },
  ],

  // Formas de pago (aparece en "Visítanos"). Vacío = no se muestra.
  pagos: "Aceptamos pago con tarjeta.",

  // Recuadros de la sección "Servicios". Vacío = la sección no se muestra.
  // Ej. { titulo: "Toma de muestras a domicilio", texto: "Agenda tu cita por WhatsApp." },
  servicios: [],

  indicaciones: [
    "Presenta la orden de tu médico si cuentas con ella.",
    "Si tu estudio requiere ayuno, puedes tomar agua natural.",
    "Informa al personal si tomas algún medicamento o si tienes alguna enfermedad o padecimiento.",
    "Para muestras de orina o heces, usa frascos limpios y estériles.",
  ],
};
