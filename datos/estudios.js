/*
 * CATÁLOGO DE ESTUDIOS
 * Cada estudio es un renglón entre llaves { }. Para agregar uno, copie un
 * renglón completo, péguelo y cambie sus datos. Para quitarlo, bórrelo.
 *
 *   clave        Código corto del estudio (único).
 *   nombre       Nombre del estudio.
 *   categoria    Área a la que pertenece (sirve para los filtros).
 *   precio       Precio en pesos, solo el número. Ej. 180
 *                Use null para mostrar "Consultar precio".
 *   muestra      Tipo de muestra.
 *   entrega      Tiempo de entrega de resultados.
 *   preparacion  Indicaciones para el paciente.
 *   descripcion  Para qué sirve el estudio.
 *   sinonimos    Otros nombres con los que la gente lo busca.
 *   incluye      Lista de pruebas que incluye (para perfiles y paquetes).
 */
(function () {
  var A8 = "Ayuno de 8 horas. Puede tomar agua natural.";
  var A12 = "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.";
  var NA = "No requiere ayuno.";
  var ORI = "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital.";

  window.ESTUDIOS = [
    // ───────── Hematología ─────────
    { clave: "BH", nombre: "Biometría hemática completa", categoria: "Hematología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Evalúa glóbulos rojos, glóbulos blancos y plaquetas. Útil para detectar anemia, infecciones y otras alteraciones de la sangre.",
      sinonimos: "Hemograma, citometría hemática, BHC" },
    { clave: "GS", nombre: "Grupo sanguíneo y factor Rh", categoria: "Hematología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Determina el tipo de sangre (A, B, AB, O) y el factor Rh.", sinonimos: "Tipo de sangre" },
    { clave: "VSG", nombre: "Velocidad de sedimentación globular", categoria: "Hematología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Indicador inespecífico de inflamación.", sinonimos: "VSG, eritrosedimentación" },
    { clave: "TP", nombre: "Tiempos de coagulación (TP y TTPa)", categoria: "Hematología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Evalúa la capacidad de coagulación de la sangre. Frecuente en estudios preoperatorios.", sinonimos: "TP, TTP, INR",
      incluye: "Tiempo de protrombina, Tiempo de tromboplastina parcial, INR" },

    // ───────── Química clínica ─────────
    { clave: "GLU", nombre: "Glucosa en ayuno", categoria: "Química clínica", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: A8,
      descripcion: "Mide el nivel de azúcar en sangre. Apoya el diagnóstico y control de la diabetes.", sinonimos: "Azúcar en sangre, glicemia" },
    { clave: "QS6", nombre: "Química sanguínea de 6 elementos", categoria: "Química clínica", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: A8,
      descripcion: "Evalúa de forma general el metabolismo y la función renal.", sinonimos: "QS6",
      incluye: "Glucosa, Urea, Creatinina, Ácido úrico, Colesterol, Triglicéridos" },
    { clave: "QS24", nombre: "Química sanguínea de 24 elementos", categoria: "Química clínica", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: A12,
      descripcion: "Panel amplio de función renal, hepática, lípidos y electrolitos.", sinonimos: "QS24",
      incluye: "Glucosa, Urea, BUN, Creatinina, Ácido úrico, Colesterol, Triglicéridos, HDL, LDL, VLDL, TGO, TGP, Bilirrubinas, Fosfatasa alcalina, GGT, DHL, Proteínas totales, Albúmina, Globulinas, Calcio, Fósforo, Sodio, Potasio, Cloro" },
    { clave: "PL", nombre: "Perfil de lípidos", categoria: "Química clínica", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: A12,
      descripcion: "Evalúa el riesgo cardiovascular midiendo las grasas en sangre.", sinonimos: "Colesterol y triglicéridos, perfil lipídico",
      incluye: "Colesterol total, HDL, LDL, VLDL, Triglicéridos, Índice aterogénico" },
    { clave: "PFH", nombre: "Pruebas de función hepática", categoria: "Química clínica", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: A8,
      descripcion: "Evalúa el funcionamiento del hígado.", sinonimos: "PFH, perfil hepático",
      incluye: "TGO, TGP, Bilirrubinas, Fosfatasa alcalina, GGT, Proteínas totales, Albúmina" },
    { clave: "HBA1C", nombre: "Hemoglobina glucosilada (HbA1c)", categoria: "Química clínica", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Refleja el promedio de glucosa de los últimos 3 meses. Útil para el control de la diabetes.", sinonimos: "HbA1c, hemoglobina glicada" },
    { clave: "AU", nombre: "Ácido úrico", categoria: "Química clínica", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: A8,
      descripcion: "Apoya el diagnóstico de gota y el seguimiento de la función renal." },

    // ───────── Orina y heces ─────────
    { clave: "EGO", nombre: "Examen general de orina", categoria: "Orina y heces", precio: null, muestra: "Orina", entrega: "Mismo día", preparacion: ORI,
      descripcion: "Análisis físico, químico y microscópico de la orina. Detecta infecciones urinarias y alteraciones renales.", sinonimos: "EGO, urianálisis" },
    { clave: "CPS3", nombre: "Coproparasitoscópico seriado (3 muestras)", categoria: "Orina y heces", precio: null, muestra: "Heces", entrega: "1 día hábil",
      preparacion: "Recolectar una muestra por día durante 3 días en frascos limpios. No usar laxantes.",
      descripcion: "Busca parásitos intestinales.", sinonimos: "CPS, examen de heces, copro" },

    // ───────── Microbiología ─────────
    { clave: "URO", nombre: "Urocultivo", categoria: "Microbiología", precio: null, muestra: "Orina", entrega: "3 días hábiles",
      preparacion: ORI + " No haber tomado antibióticos en los últimos 5 días.",
      descripcion: "Identifica bacterias causantes de infección urinaria e incluye antibiograma.", sinonimos: "Cultivo de orina" },
    { clave: "EXF", nombre: "Exudado faríngeo", categoria: "Microbiología", precio: null, muestra: "Exudado", entrega: "3 días hábiles",
      preparacion: "Acudir en ayuno y sin aseo bucal. No haber tomado antibióticos en los últimos 5 días.",
      descripcion: "Cultivo de garganta para identificar bacterias; incluye antibiograma.", sinonimos: "Cultivo faríngeo, cultivo de garganta" },

    // ───────── Inmunología ─────────
    { clave: "RF", nombre: "Reacciones febriles", categoria: "Inmunología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Apoya el diagnóstico de tifoidea, brucelosis y otras infecciones.", sinonimos: "Widal, tifoidea" },
    { clave: "PCR", nombre: "Proteína C reactiva", categoria: "Inmunología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Marcador de inflamación e infección.", sinonimos: "PCR" },
    { clave: "FR", nombre: "Factor reumatoide", categoria: "Inmunología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Apoya el diagnóstico de artritis reumatoide.", sinonimos: "FR" },
    { clave: "VDRL", nombre: "VDRL", categoria: "Inmunología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Prueba de tamizaje para sífilis." },
    { clave: "VIH", nombre: "VIH 1 y 2 (anticuerpos)", categoria: "Inmunología", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Prueba de detección del virus de inmunodeficiencia humana. Resultado confidencial.", sinonimos: "HIV, sida" },

    // ───────── Hormonas ─────────
    { clave: "PT", nombre: "Perfil tiroideo", categoria: "Hormonas", precio: null, muestra: "Sangre", entrega: "1 día hábil",
      preparacion: "Ayuno de 4 horas. Informe si toma medicamento para tiroides.",
      descripcion: "Evalúa el funcionamiento de la glándula tiroides.", sinonimos: "Tiroides, pruebas tiroideas",
      incluye: "TSH, T3 total, T4 total, T4 libre, T3 libre" },
    { clave: "TSH", nombre: "TSH (hormona estimulante de tiroides)", categoria: "Hormonas", precio: null, muestra: "Sangre", entrega: "1 día hábil",
      preparacion: "Ayuno de 4 horas.", descripcion: "Prueba inicial para evaluar la función tiroidea.", sinonimos: "Tirotropina" },
    { clave: "HCG", nombre: "Prueba de embarazo en sangre", categoria: "Hormonas", precio: null, muestra: "Sangre", entrega: "Mismo día", preparacion: NA,
      descripcion: "Mide la hormona gonadotropina coriónica para confirmar embarazo.", sinonimos: "hCG, beta hCG" },
    { clave: "PSA", nombre: "Antígeno prostático específico (PSA total)", categoria: "Hormonas", precio: null, muestra: "Sangre", entrega: "1 día hábil",
      preparacion: "No requiere ayuno. Evitar relaciones sexuales y ejercicio en bicicleta 48 horas antes.",
      descripcion: "Prueba de tamizaje para padecimientos de la próstata.", sinonimos: "APE, próstata" },

    // ───────── Paquetes ─────────
    { clave: "CHK", nombre: "Check-up básico", categoria: "Paquetes", precio: null, muestra: "Sangre y orina", entrega: "Mismo día",
      preparacion: A12 + " Traer primera orina de la mañana.",
      descripcion: "Paquete de revisión general de salud.", sinonimos: "Chequeo general",
      incluye: "Biometría hemática, Química sanguínea de 6 elementos, Examen general de orina" },
    { clave: "PREOP", nombre: "Perfil preoperatorio", categoria: "Paquetes", precio: null, muestra: "Sangre y orina", entrega: "Mismo día",
      preparacion: A8 + " Traer primera orina de la mañana.",
      descripcion: "Estudios que suelen solicitarse antes de una cirugía.", sinonimos: "Preoperatorios",
      incluye: "Biometría hemática, Química sanguínea de 6 elementos, Tiempos de coagulación, Grupo sanguíneo y Rh, Examen general de orina" },
    { clave: "PREN", nombre: "Perfil prenatal", categoria: "Paquetes", precio: null, muestra: "Sangre y orina", entrega: "Mismo día",
      preparacion: A8 + " Traer primera orina de la mañana.",
      descripcion: "Estudios de control al inicio del embarazo.", sinonimos: "Control prenatal, embarazo",
      incluye: "Biometría hemática, Grupo sanguíneo y Rh, Glucosa, Examen general de orina, VDRL, VIH" },
  ];
})();
