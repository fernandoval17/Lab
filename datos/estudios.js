/*
 * CATÁLOGO DE ESTUDIOS — Laboratorio Sta. Margarita
 * Generado a partir de "LISTA DE ESTUDIOS - LABORATORIO STA MARGARITA.xlsx".
 *
 * Cada estudio es un renglón entre llaves { }. Para agregar uno, copie un renglón,
 * péguelo y cambie sus datos. Para quitarlo, bórrelo.
 *
 *   id           Identificador único (minúsculas, sin acentos ni espacios). Lo usan
 *                las listas y los códigos QR: no lo cambie en estudios existentes.
 *   nombre       Nombre del estudio, como lo verá el paciente.
 *   categorias   Categorías donde aparece, entre corchetes. La primera es la principal.
 *                Use los nombres de CATEGORIAS_ESTUDIOS (abajo), escritos igual.
 *   subcategoria (Solo infecciones) Subgrupo dentro de "Infecciones".
 *   grupo        (Opcional) Une variantes del mismo estudio en una sola tarjeta con
 *                selector, por ejemplo las químicas sanguíneas. Use un id de GRUPOS_ESTUDIOS.
 *   variante     (Con grupo) Texto de la opción en el selector, por ejemplo "6 elementos".
 *   paquete      (Opcional) true si es un perfil o paquete de varias pruebas; la tarjeta
 *                muestra la etiqueta "Paquete".
 *   muestra      Tipo de muestra.
 *   preparacion  Indicaciones para el paciente. Si menciona ayuno, la tarjeta muestra
 *                "Requiere ayuno". Si está vacío, la página invita a
 *                preguntar por WhatsApp.
 *   sinonimos    Otras palabras con las que la gente lo busca (no se muestran).
 *   descripcion  (Opcional) Para qué sirve el estudio.
 *   incluye      (Opcional) Pruebas que incluye, separadas por comas.
 */

// Orden en que se muestran las categorías.
window.CATEGORIAS_ESTUDIOS = [
  "Chequeo general y paquetes",
  "Azúcar y diabetes",
  "Corazón y colesterol",
  "Riñón y vías urinarias",
  "Hígado y digestión",
  "Sangre, anemia y coagulación",
  "Tiroides",
  "Embarazo, fertilidad y salud sexual",
  "Otras hormonas",
  "Huesos, vitaminas y minerales",
  "Infecciones",
  "Defensas, alergias y reumatología",
  "Detección de cáncer",
  "Otros servicios",
];

// Subgrupos de una categoría, en el orden en que se muestran.
window.SUBCATEGORIAS_ESTUDIOS = {
  "Infecciones": ["Transmisión sexual", "Durante el embarazo", "Respiratorias", "Fiebre", "Hepatitis", "Digestivas", "Otras infecciones"],
};

// Grupos de variantes: id del grupo y título de la tarjeta.
window.GRUPOS_ESTUDIOS = {
  "quimica-sanguinea": "Química sanguínea",
  "electrolitos-sericos": "Electrolitos séricos",
  "electrolitos-urinarios": "Electrolitos urinarios (3)",
  "proteinas-totales": "Proteínas totales",
  "perfil-tiroideo": "Perfil tiroideo",
  "testosterona": "Testosterona",
  "antigeno-prostatico": "Antígeno prostático (PSA)",
  "he4": "HE4 (proteína 4 del epidídimo humano)",
  "chlamydia-trachomatis": "Chlamydia trachomatis (anticuerpos)",
  "citomegalovirus": "Citomegalovirus (anticuerpos)",
  "epstein-barr": "Epstein-Barr (anticuerpos contra la cápside)",
  "herpes": "Herpes (anticuerpos)",
  "rubeola": "Rubéola (anticuerpos)",
  "toxoplasma": "Toxoplasma (anticuerpos)",
  "hepatitis-a": "Hepatitis A",
  "beta-2-glucoproteina": "Anticuerpos anti-beta 2 glucoproteína",
  "hla-b27": "Antígeno HLA-B27",
  "coproparasitoscopico": "Coproparasitoscópico",
  "baciloscopia": "Baciloscopia",
  "eosinofilos-moco-nasal": "Eosinófilos en moco nasal",
};

window.ESTUDIOS = [

  // ───────── Chequeo general y paquetes ─────────
  { id: "biometria-hematica", nombre: "Biometría hemática", categorias: ["Chequeo general y paquetes", "Sangre, anemia y coagulación"], muestra: "Sangre", descripcion: "Cuenta los glóbulos rojos, glóbulos blancos y plaquetas. Ayuda a detectar anemia, infecciones y otras alteraciones de la sangre.", sinonimos: "BH, hemograma, citometría" },
  { id: "grupo-sanguineo-y-factor-rh", nombre: "Grupo sanguíneo y factor Rh", categorias: ["Chequeo general y paquetes", "Sangre, anemia y coagulación"], muestra: "Sangre", descripcion: "Determina tu tipo de sangre (A, B, AB u O) y si eres Rh positivo o negativo.", preparacion: "No requiere ayuno.", sinonimos: "tipo de sangre" },
  { id: "quimica-sanguinea-de-3-elementos", nombre: "Química sanguínea de 3 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "3 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel básico con glucosa y pruebas de función renal.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "QS3" },
  { id: "quimica-sanguinea-de-4-elementos", nombre: "Química sanguínea de 4 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "4 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel básico con glucosa, pruebas de función renal y ácido úrico.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "QS4" },
  { id: "quimica-sanguinea-de-5-elementos", nombre: "Química sanguínea de 5 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "5 elementos", paquete: true, muestra: "Sangre", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "QS5" },
  { id: "quimica-sanguinea-de-6-elementos", nombre: "Química sanguínea de 6 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "6 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel general con glucosa, función renal, ácido úrico, colesterol y triglicéridos.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "QS6" },
  { id: "quimica-sanguinea-de-12-elementos", nombre: "Química sanguínea de 12 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "12 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel amplio que revisa azúcar, riñones, hígado y grasas en la sangre.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "QS12" },
  { id: "quimica-sanguinea-de-24-elementos", nombre: "Química sanguínea de 24 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "24 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel completo que revisa azúcar, riñones, hígado, grasas y electrolitos.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "QS24" },
  { id: "quimica-sanguinea-de-33-elementos", nombre: "Química sanguínea de 33 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "33 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel completo que revisa azúcar, riñones, hígado, grasas, electrolitos y proteínas.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "QS33" },
  { id: "quimica-sanguinea-de-44-elementos", nombre: "Química sanguínea de 44 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "44 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel muy completo para una revisión general de la salud.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "QS44" },
  { id: "quimica-sanguinea-de-45-elementos", nombre: "Química sanguínea de 45 elementos", categorias: ["Chequeo general y paquetes"], grupo: "quimica-sanguinea", variante: "45 elementos", paquete: true, muestra: "Sangre", descripcion: "Panel muy completo para una revisión general de la salud.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "QS45" },
  { id: "examen-general-de-orina-ego", nombre: "Examen general de orina (EGO)", categorias: ["Chequeo general y paquetes", "Riñón y vías urinarias"], muestra: "Orina", descripcion: "Análisis completo de la orina. Ayuda a detectar infecciones urinarias y problemas de los riñones.", preparacion: "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital.", sinonimos: "EGO, urianálisis" },
  { id: "prenupcial-ii-individual-grupo-y-rh-vdrl-vih", nombre: "Prenupcial II (individual: grupo y Rh, VDRL, VIH)", categorias: ["Chequeo general y paquetes", "Embarazo, fertilidad y salud sexual"], paquete: true, muestra: "Sangre", descripcion: "Estudios que se solicitan para el matrimonio civil: grupo sanguíneo y Rh, VDRL y VIH.", sinonimos: "prenupciales, boda, matrimonio" },

  // ───────── Azúcar y diabetes ─────────
  { id: "curva-de-tolerancia-a-la-glucosa-2-horas", nombre: "Curva de tolerancia a la glucosa (2 horas)", categorias: ["Azúcar y diabetes"], muestra: "Sangre", descripcion: "Mide cómo responde tu cuerpo al azúcar durante 2 horas después de tomar una bebida con glucosa. Ayuda a diagnosticar diabetes.", preparacion: "Ayuno de 8 a 12 horas. El estudio dura unas 2 horas; permanezca en el laboratorio sin comer ni fumar.", sinonimos: "diabetes, azúcar" },
  { id: "glucosa", nombre: "Glucosa", categorias: ["Azúcar y diabetes", "Chequeo general y paquetes"], muestra: "Sangre", descripcion: "Mide el nivel de azúcar en la sangre. Ayuda a detectar y controlar la diabetes.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "azúcar, diabetes, glicemia" },
  { id: "glucosa-a-los-60-minutos", nombre: "Glucosa a los 60 minutos", categorias: ["Azúcar y diabetes"], muestra: "Sangre", sinonimos: "azúcar" },
  { id: "glucosa-postprandial", nombre: "Glucosa postprandial", categorias: ["Azúcar y diabetes"], muestra: "Sangre", descripcion: "Mide el azúcar en la sangre después de comer.", preparacion: "La muestra se toma 2 horas después de comer, según la indicación de su médico.", sinonimos: "azúcar, diabetes" },
  { id: "hemoglobina-glicada-hba1c", nombre: "Hemoglobina glicada (HbA1c)", categorias: ["Azúcar y diabetes"], muestra: "Sangre", descripcion: "Refleja el promedio de azúcar en la sangre de los últimos 3 meses. Se usa para el control de la diabetes.", preparacion: "No requiere ayuno.", sinonimos: "glucosilada, diabetes" },
  { id: "prueba-de-sullivan", nombre: "Prueba de Sullivan", categorias: ["Azúcar y diabetes", "Embarazo, fertilidad y salud sexual"], muestra: "Sangre", descripcion: "Prueba de detección de diabetes durante el embarazo.", preparacion: "No requiere ayuno. Se toma una muestra 1 hora después de tomar una bebida con glucosa.", sinonimos: "embarazo, diabetes gestacional" },
  { id: "resistencia-a-la-insulina-indice-homa", nombre: "Resistencia a la insulina (índice HOMA)", categorias: ["Azúcar y diabetes"], muestra: "Sangre", descripcion: "Calcula, con la glucosa y la insulina en ayuno, qué tan bien responde tu cuerpo a la insulina.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "HOMA, diabetes" },
  { id: "insulina-basal", nombre: "Insulina basal", categorias: ["Azúcar y diabetes", "Otras hormonas"], muestra: "Sangre", descripcion: "Mide la insulina en ayuno. Ayuda a detectar resistencia a la insulina.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "diabetes" },
  { id: "peptido-c", nombre: "Péptido C", categorias: ["Azúcar y diabetes"], muestra: "Sangre", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "diabetes" },
  { id: "glucosa-en-orina", nombre: "Glucosa en orina", categorias: ["Azúcar y diabetes", "Riñón y vías urinarias"], muestra: "Orina", preparacion: "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital.", sinonimos: "azúcar" },

  // ───────── Corazón y colesterol ─────────
  { id: "apolipoproteina-b", nombre: "Apolipoproteína B", categorias: ["Corazón y colesterol"], muestra: "Sangre", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "lípidos" },
  { id: "colesterol", nombre: "Colesterol", categorias: ["Corazón y colesterol"], muestra: "Sangre", descripcion: "Mide el colesterol total en la sangre. Ayuda a valorar el riesgo del corazón.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "lípidos" },
  { id: "colesterol-hdl", nombre: "Colesterol HDL", categorias: ["Corazón y colesterol"], muestra: "Sangre", descripcion: "Mide el colesterol \"bueno\", que ayuda a proteger el corazón.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "lípidos, colesterol bueno" },
  { id: "colesterol-ldl", nombre: "Colesterol LDL", categorias: ["Corazón y colesterol"], muestra: "Sangre", descripcion: "Mide el colesterol \"malo\", que se acumula en las arterias.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "lípidos, colesterol malo" },
  { id: "colesterol-vldl", nombre: "Colesterol VLDL", categorias: ["Corazón y colesterol"], muestra: "Sangre", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "lípidos" },
  { id: "homocisteina", nombre: "Homocisteína", categorias: ["Corazón y colesterol"], muestra: "Sangre", preparacion: "Ayuno de 8 horas. Puede tomar agua natural." },
  { id: "perfil-de-lipidos", nombre: "Perfil de lípidos", categorias: ["Corazón y colesterol", "Chequeo general y paquetes"], paquete: true, muestra: "Sangre", descripcion: "Conjunto de pruebas de colesterol y triglicéridos para valorar el riesgo cardiovascular.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "colesterol, triglicéridos, lipídico" },
  { id: "peptido-natriuretico-cerebral-bnp", nombre: "Péptido natriurético cerebral (BNP)", categorias: ["Corazón y colesterol"], muestra: "Sangre", sinonimos: "corazón" },
  { id: "peptido-natriuretico-pro-cerebral-nt-probnp", nombre: "Péptido natriurético pro-cerebral (NT-proBNP)", categorias: ["Corazón y colesterol"], muestra: "Sangre", sinonimos: "corazón" },
  { id: "trigliceridos", nombre: "Triglicéridos", categorias: ["Corazón y colesterol"], muestra: "Sangre", descripcion: "Mide las grasas de la sangre que provienen principalmente de los alimentos.", preparacion: "Ayuno de 12 horas. Evite alcohol 24 horas antes. Puede tomar agua natural.", sinonimos: "lípidos" },
  { id: "troponina-i", nombre: "Troponina I", categorias: ["Corazón y colesterol"], muestra: "Sangre", descripcion: "Ayuda a detectar daño en el músculo del corazón, como en un infarto.", sinonimos: "corazón, infarto" },
  { id: "proteina-c-reactiva-ultrasensible", nombre: "Proteína C reactiva ultrasensible", categorias: ["Corazón y colesterol", "Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "PCR, inflamación" },

  // ───────── Riñón y vías urinarias ─────────
  { id: "acido-urico", nombre: "Ácido úrico", categorias: ["Riñón y vías urinarias", "Defensas, alergias y reumatología"], muestra: "Sangre", descripcion: "Mide el ácido úrico en la sangre. Ayuda a diagnosticar gota y a vigilar los riñones.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "gota" },
  { id: "cistatina-c", nombre: "Cistatina C", categorias: ["Riñón y vías urinarias"], muestra: "Sangre", sinonimos: "riñón" },
  { id: "creatinina", nombre: "Creatinina", categorias: ["Riñón y vías urinarias", "Chequeo general y paquetes"], muestra: "Sangre", descripcion: "Mide qué tan bien filtran los riñones.", sinonimos: "riñón" },
  { id: "indice-de-filtracion-glomerular", nombre: "Índice de filtración glomerular", categorias: ["Riñón y vías urinarias"], muestra: "Sangre", descripcion: "Calcula qué tan bien filtran los riñones.", sinonimos: "riñón, TFG" },
  { id: "nitrogeno-ureico-bun", nombre: "Nitrógeno ureico (BUN)", categorias: ["Riñón y vías urinarias"], muestra: "Sangre", descripcion: "Mide un desecho que eliminan los riñones. Ayuda a evaluar su funcionamiento.", sinonimos: "BUN, riñón" },
  { id: "urea", nombre: "Urea", categorias: ["Riñón y vías urinarias"], muestra: "Sangre", descripcion: "Mide un desecho que eliminan los riñones. Ayuda a evaluar su funcionamiento.", sinonimos: "riñón" },
  { id: "cloro-serico", nombre: "Cloro sérico", categorias: ["Riñón y vías urinarias"], muestra: "Sangre", sinonimos: "electrolitos" },
  { id: "electrolitos-sericos-na-k-cl", nombre: "Electrolitos séricos (Na, K, Cl)", categorias: ["Riñón y vías urinarias"], grupo: "electrolitos-sericos", variante: "Sodio, potasio y cloro", paquete: true, muestra: "Sangre", descripcion: "Mide sodio, potasio y cloro, que mantienen el equilibrio de líquidos del cuerpo.", sinonimos: "sodio, potasio, cloro" },
  { id: "electrolitos-sericos-na-cl-k-ca", nombre: "Electrolitos séricos (Na, Cl, K, Ca)", categorias: ["Riñón y vías urinarias"], grupo: "electrolitos-sericos", variante: "Sodio, cloro, potasio y calcio", paquete: true, muestra: "Sangre", sinonimos: "sodio, potasio, cloro, calcio" },
  { id: "electrolitos-sericos-6-elementos", nombre: "Electrolitos séricos (6 elementos)", categorias: ["Riñón y vías urinarias"], grupo: "electrolitos-sericos", variante: "6 elementos", paquete: true, muestra: "Sangre" },
  { id: "potasio-serico", nombre: "Potasio sérico", categorias: ["Riñón y vías urinarias"], muestra: "Sangre", descripcion: "Mide el potasio, importante para el corazón y los músculos.", sinonimos: "electrolitos" },
  { id: "sodio-serico", nombre: "Sodio sérico", categorias: ["Riñón y vías urinarias"], muestra: "Sangre", sinonimos: "electrolitos" },
  { id: "albumina-en-orina-de-24-horas-microalbumina", nombre: "Albúmina en orina de 24 horas (microalbúmina)", categorias: ["Riñón y vías urinarias", "Azúcar y diabetes"], muestra: "Orina de 24 horas", preparacion: "Recolecte toda la orina de 24 horas en el recipiente que le da el laboratorio. Pida las indicaciones al recogerlo.", sinonimos: "riñón" },
  { id: "creatinina-en-orina-una-miccion", nombre: "Creatinina en orina (una micción)", categorias: ["Riñón y vías urinarias"], muestra: "Orina", preparacion: "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital.", sinonimos: "riñón" },
  { id: "depuracion-de-creatinina-en-orina-de-24-horas", nombre: "Depuración de creatinina en orina de 24 horas", categorias: ["Riñón y vías urinarias"], muestra: "Orina de 24 horas y sangre", descripcion: "Mide con precisión qué tan bien filtran los riñones.", preparacion: "Recolecte toda la orina de 24 horas en el recipiente que le da el laboratorio. Al entregarla se toma también una muestra de sangre.", sinonimos: "riñón" },
  { id: "electroforesis-de-proteinas-en-orina", nombre: "Electroforesis de proteínas en orina", categorias: ["Riñón y vías urinarias"], muestra: "Orina" },
  { id: "electrolitos-urinarios-3", nombre: "Electrolitos urinarios (3)", categorias: ["Riñón y vías urinarias"], grupo: "electrolitos-urinarios", variante: "Una micción", muestra: "Orina", preparacion: "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital." },
  { id: "electrolitos-urinarios-3-en-orina-de-24-horas", nombre: "Electrolitos urinarios (3) en orina de 24 horas", categorias: ["Riñón y vías urinarias"], grupo: "electrolitos-urinarios", variante: "Orina de 24 horas", muestra: "Orina de 24 horas", preparacion: "Recolecte toda la orina de 24 horas en el recipiente que le da el laboratorio. Pida las indicaciones al recogerlo." },
  { id: "microalbuminuria-en-orina-casual", nombre: "Microalbuminuria en orina casual", categorias: ["Riñón y vías urinarias", "Azúcar y diabetes"], muestra: "Orina", descripcion: "Detecta pequeñas cantidades de proteína en la orina, una señal temprana de daño renal.", preparacion: "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital.", sinonimos: "riñón" },
  { id: "proteinas-en-orina", nombre: "Proteínas en orina", categorias: ["Riñón y vías urinarias"], muestra: "Orina", preparacion: "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital.", sinonimos: "proteinuria" },
  { id: "proteinas-en-orina-de-24-horas", nombre: "Proteínas en orina de 24 horas", categorias: ["Riñón y vías urinarias"], muestra: "Orina de 24 horas", preparacion: "Recolecte toda la orina de 24 horas en el recipiente que le da el laboratorio. Pida las indicaciones al recogerlo.", sinonimos: "proteinuria" },
  { id: "cultivo-de-orina-urocultivo", nombre: "Cultivo de orina (urocultivo)", categorias: ["Riñón y vías urinarias", "Infecciones"], subcategoria: "Otras infecciones", muestra: "Orina", descripcion: "Identifica la bacteria que causa una infección urinaria y los antibióticos que funcionan contra ella.", preparacion: "Primera orina de la mañana, chorro medio, en frasco estéril. Aseo previo de la zona genital. No haber tomado antibióticos en los últimos 5 días.", sinonimos: "urocultivo, infección urinaria" },

  // ───────── Hígado y digestión ─────────
  { id: "alanino-aminotransferasa-tgp-alt", nombre: "Alanino aminotransferasa (TGP/ALT)", categorias: ["Hígado y digestión"], muestra: "Sangre", descripcion: "Enzima del hígado. Valores altos pueden indicar daño hepático.", sinonimos: "hígado, transaminasas" },
  { id: "albumina-serica", nombre: "Albúmina sérica", categorias: ["Hígado y digestión"], muestra: "Sangre" },
  { id: "amilasa", nombre: "Amilasa", categorias: ["Hígado y digestión"], muestra: "Sangre", descripcion: "Enzima del páncreas. Ayuda a diagnosticar pancreatitis.", sinonimos: "páncreas" },
  { id: "aspartato-aminotransferasa-tgo-ast", nombre: "Aspartato aminotransferasa (TGO/AST)", categorias: ["Hígado y digestión"], muestra: "Sangre", descripcion: "Enzima del hígado y de los músculos. Ayuda a evaluar daño en el hígado.", sinonimos: "hígado, transaminasas" },
  { id: "bilirrubinas-total-directa-e-indirecta", nombre: "Bilirrubinas (total, directa e indirecta)", categorias: ["Hígado y digestión"], muestra: "Sangre", descripcion: "Ayuda a evaluar el hígado y las vías biliares, y a estudiar la ictericia (piel amarilla).", sinonimos: "hígado" },
  { id: "colinesterasa", nombre: "Colinesterasa", categorias: ["Hígado y digestión"], muestra: "Sangre" },
  { id: "deshidrogenasa-lactica-dhl", nombre: "Deshidrogenasa láctica (DHL)", categorias: ["Hígado y digestión", "Corazón y colesterol"], muestra: "Sangre", sinonimos: "LDH" },
  { id: "fosfatasa-alcalina", nombre: "Fosfatasa alcalina", categorias: ["Hígado y digestión", "Huesos, vitaminas y minerales"], muestra: "Sangre", descripcion: "Enzima del hígado y los huesos.", sinonimos: "hígado, hueso" },
  { id: "gamma-glutamil-transpeptidasa-ggt", nombre: "Gamma glutamil transpeptidasa (GGT)", categorias: ["Hígado y digestión"], muestra: "Sangre", descripcion: "Enzima del hígado y las vías biliares.", sinonimos: "hígado" },
  { id: "lipasa", nombre: "Lipasa", categorias: ["Hígado y digestión"], muestra: "Sangre", descripcion: "Enzima del páncreas. Ayuda a diagnosticar pancreatitis.", sinonimos: "páncreas" },
  { id: "perfil-hepatico", nombre: "Perfil hepático", categorias: ["Hígado y digestión", "Chequeo general y paquetes"], paquete: true, muestra: "Sangre", descripcion: "Conjunto de pruebas que evalúa el funcionamiento del hígado.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "hígado, PFH, función hepática" },
  { id: "proteinas-totales", nombre: "Proteínas totales", categorias: ["Hígado y digestión"], grupo: "proteinas-totales", variante: "Totales", muestra: "Sangre" },
  { id: "proteinas-totales-y-fraccionadas", nombre: "Proteínas totales y fraccionadas", categorias: ["Hígado y digestión"], grupo: "proteinas-totales", variante: "Totales y fraccionadas", muestra: "Sangre", sinonimos: "albúmina, globulinas" },
  { id: "amiba-en-fresco", nombre: "Amiba en fresco", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", muestra: "Heces", descripcion: "Busca amibas en una muestra de heces recién obtenida.", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes.", sinonimos: "amibas, parásitos" },
  { id: "azucares-reductores", nombre: "Azúcares reductores", categorias: ["Hígado y digestión"], muestra: "Heces", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes." },
  { id: "calprotectina-y-lactoferrina-en-heces", nombre: "Calprotectina y lactoferrina en heces", categorias: ["Hígado y digestión"], muestra: "Heces", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes." },
  { id: "clostridium-difficile-toxina-a-b-gdh", nombre: "Clostridium difficile toxina A + B / GDH", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", muestra: "Heces", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes.", sinonimos: "diarrea" },
  { id: "coproparasitoscopico-muestra-1", nombre: "Coproparasitoscópico muestra 1", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", grupo: "coproparasitoscopico", variante: "Muestra 1", muestra: "Heces", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes.", sinonimos: "CPS, parásitos, copro" },
  { id: "coproparasitoscopico-muestra-2", nombre: "Coproparasitoscópico muestra 2", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", grupo: "coproparasitoscopico", variante: "Muestra 2", muestra: "Heces", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes.", sinonimos: "CPS, parásitos, copro" },
  { id: "coproparasitoscopico-muestra-3", nombre: "Coproparasitoscópico muestra 3", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", grupo: "coproparasitoscopico", variante: "Muestra 3", muestra: "Heces", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes.", sinonimos: "CPS, parásitos, copro" },
  { id: "coproparasitoscopico-3-muestras", nombre: "Coproparasitoscópico (3 muestras)", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", grupo: "coproparasitoscopico", variante: "Serie de 3 muestras", muestra: "Heces", descripcion: "Busca parásitos intestinales en 3 muestras de heces, lo que aumenta la probabilidad de encontrarlos.", preparacion: "Recolecte una muestra de heces por día durante 3 días, en frascos limpios. No use laxantes.", sinonimos: "CPS, parásitos, copro" },
  { id: "helicobacter-pylori-en-heces", nombre: "Helicobacter pylori en heces", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", muestra: "Heces", descripcion: "Detecta la bacteria que causa gastritis y úlceras.", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes.", sinonimos: "gastritis, úlcera" },
  { id: "perfil-coprologico", nombre: "Perfil coprológico", categorias: ["Hígado y digestión"], paquete: true, muestra: "Heces", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes.", sinonimos: "copro" },
  { id: "sangre-oculta-en-heces", nombre: "Sangre oculta en heces", categorias: ["Hígado y digestión", "Detección de cáncer"], muestra: "Heces", descripcion: "Detecta sangre en las heces que no se ve a simple vista.", preparacion: "Muestra de heces en frasco limpio, sin mezclar con orina. No use laxantes." },
  { id: "cultivo-de-heces-coprocultivo", nombre: "Cultivo de heces (coprocultivo)", categorias: ["Hígado y digestión", "Infecciones"], subcategoria: "Digestivas", muestra: "Heces", descripcion: "Identifica bacterias que causan infecciones intestinales y diarrea.", preparacion: "Muestra de heces en frasco estéril, sin mezclar con orina. No haber tomado antibióticos en los últimos 5 días.", sinonimos: "coprocultivo, diarrea" },

  // ───────── Sangre, anemia y coagulación ─────────
  { id: "ferritina", nombre: "Ferritina", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre", descripcion: "Mide las reservas de hierro del cuerpo. Ayuda a detectar anemia por falta de hierro.", sinonimos: "hierro, anemia" },
  { id: "hierro-serico", nombre: "Hierro sérico", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre", descripcion: "Mide el hierro que circula en la sangre. Se usa para estudiar la anemia.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "anemia" },
  { id: "perfil-de-hierro-ii-cinetica-de-hierro", nombre: "Perfil de hierro II (cinética de hierro)", categorias: ["Sangre, anemia y coagulación"], paquete: true, muestra: "Sangre", descripcion: "Conjunto de pruebas que evalúa cuánto hierro tienes, cómo se transporta y cuánto tienes de reserva.", preparacion: "Ayuno de 8 horas. Puede tomar agua natural.", sinonimos: "anemia, ferritina, transferrina" },
  { id: "recuento-de-reticulocitos", nombre: "Recuento de reticulocitos", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre" },
  { id: "transferrina", nombre: "Transferrina", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre", sinonimos: "hierro, anemia" },
  { id: "velocidad-de-sedimentacion-globular-vsg", nombre: "Velocidad de sedimentación globular (VSG)", categorias: ["Sangre, anemia y coagulación", "Defensas, alergias y reumatología"], muestra: "Sangre", descripcion: "Indicador general de inflamación en el cuerpo.", sinonimos: "VSG" },
  { id: "dimero-d", nombre: "Dímero D", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre", descripcion: "Ayuda a descartar la presencia de coágulos en las venas o los pulmones.", sinonimos: "trombosis" },
  { id: "fibrinogeno", nombre: "Fibrinógeno", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre", descripcion: "Mide una proteína necesaria para la coagulación de la sangre." },
  { id: "tiempo-de-protrombina-tp", nombre: "Tiempo de protrombina (TP)", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre", descripcion: "Mide el tiempo que tarda la sangre en coagular. Se usa para vigilar tratamientos con anticoagulantes.", sinonimos: "INR" },
  { id: "tiempo-de-sangrado", nombre: "Tiempo de sangrado", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre" },
  { id: "tiempo-de-trombina-tt", nombre: "Tiempo de trombina (TT)", categorias: ["Sangre, anemia y coagulación"], muestra: "Sangre" },
  { id: "tiempos-de-coagulacion-tp-y-ttp", nombre: "Tiempos de coagulación (TP y TTP)", categorias: ["Sangre, anemia y coagulación"], paquete: true, muestra: "Sangre", descripcion: "Evalúa qué tan bien coagula la sangre. Se pide con frecuencia antes de una cirugía.", sinonimos: "TP, TTP, prequirúrgicos" },
  { id: "acido-folico", nombre: "Ácido fólico", categorias: ["Sangre, anemia y coagulación", "Huesos, vitaminas y minerales"], muestra: "Sangre", descripcion: "Mide el ácido fólico, vitamina importante para la sangre y el embarazo.", sinonimos: "folato, vitamina B9" },
  { id: "vitamina-b12", nombre: "Vitamina B12", categorias: ["Sangre, anemia y coagulación", "Huesos, vitaminas y minerales"], muestra: "Sangre", descripcion: "Mide la vitamina B12, necesaria para la sangre y el sistema nervioso.", sinonimos: "cobalamina" },

  // ───────── Tiroides ─────────
  { id: "ac-anti-peroxidasa-tiroidea-tpo", nombre: "Anticuerpos antiperoxidasa tiroidea (anti-TPO)", categorias: ["Tiroides"], muestra: "Sangre", descripcion: "Detecta anticuerpos contra la tiroides, presentes en enfermedades autoinmunes como la tiroiditis de Hashimoto.", sinonimos: "tiroides, antiperoxidasa, Ac. Anti Peroxidasa tiroidea (TPO)" },
  { id: "ac-anti-receptor-de-tsh", nombre: "Anticuerpos contra el receptor de TSH", categorias: ["Tiroides"], muestra: "Sangre", sinonimos: "tiroides, Ac. Anti receptor de TSH" },
  { id: "ac-anti-tiroglobulina", nombre: "Anticuerpos antitiroglobulina (anti-TG)", categorias: ["Tiroides"], muestra: "Sangre", sinonimos: "tiroides, antitiroglobulina, Ac. Anti Tiroglobulina" },
  { id: "ac-anti-tiroides-tpo-y-tg", nombre: "Anticuerpos antitiroideos (anti-TPO y anti-TG)", categorias: ["Tiroides"], muestra: "Sangre", sinonimos: "tiroides, antiperoxidasa, antitiroglobulina, Ac. Anti Tiroides (TPO y TG)" },
  { id: "hormona-estimulante-de-tiroides-tsh", nombre: "Hormona estimulante de tiroides (TSH)", categorias: ["Tiroides"], muestra: "Sangre", descripcion: "Prueba principal para saber si la tiroides funciona de más o de menos.", sinonimos: "TSH, tirotropina" },
  { id: "perfil-tiroideo-4-elementos", nombre: "Perfil tiroideo (4 elementos)", categorias: ["Tiroides"], grupo: "perfil-tiroideo", variante: "4 elementos", paquete: true, muestra: "Sangre", descripcion: "Conjunto de hormonas que evalúa el funcionamiento de la tiroides.", sinonimos: "tiroides" },
  { id: "perfil-tiroideo-7-elementos", nombre: "Perfil tiroideo (7 elementos)", categorias: ["Tiroides"], grupo: "perfil-tiroideo", variante: "7 elementos", paquete: true, muestra: "Sangre", descripcion: "Conjunto amplio de hormonas que evalúa el funcionamiento de la tiroides.", sinonimos: "tiroides" },
  { id: "perfil-tiroideo-ii", nombre: "Perfil tiroideo II", categorias: ["Tiroides"], grupo: "perfil-tiroideo", variante: "Perfil II", paquete: true, muestra: "Sangre", descripcion: "Conjunto de hormonas que evalúa el funcionamiento de la tiroides.", sinonimos: "tiroides" },
  { id: "tiroglobulina", nombre: "Tiroglobulina", categorias: ["Tiroides"], muestra: "Sangre", sinonimos: "tiroides" },
  { id: "tiroxina-libre-t4l", nombre: "Tiroxina libre (T4L)", categorias: ["Tiroides"], muestra: "Sangre", descripcion: "Hormona de la tiroides. Se interpreta junto con la TSH.", sinonimos: "tiroides, T4 libre" },
  { id: "tiroxina-total-t4", nombre: "Tiroxina total (T4)", categorias: ["Tiroides"], muestra: "Sangre", sinonimos: "tiroides" },
  { id: "triyodotironina-libre-t3l", nombre: "Triyodotironina libre (T3L)", categorias: ["Tiroides"], muestra: "Sangre", sinonimos: "tiroides, T3 libre" },
  { id: "triyodotironina-total-t3", nombre: "Triyodotironina total (T3)", categorias: ["Tiroides"], muestra: "Sangre", sinonimos: "tiroides" },

  // ───────── Embarazo, fertilidad y salud sexual ─────────
  { id: "estradiol", nombre: "Estradiol", categorias: ["Embarazo, fertilidad y salud sexual", "Otras hormonas"], muestra: "Sangre", descripcion: "Principal hormona femenina. Se usa para estudiar el ciclo menstrual, la fertilidad y la menopausia.", preparacion: "Su médico puede indicarle el día del ciclo menstrual en que debe tomarse la muestra.", sinonimos: "estrógenos" },
  { id: "hormona-antimulleriana-amh", nombre: "Hormona antimülleriana (AMH)", categorias: ["Embarazo, fertilidad y salud sexual"], muestra: "Sangre", descripcion: "Ayuda a estimar la reserva ovárica (fertilidad).", sinonimos: "fertilidad, reserva ovárica" },
  { id: "hormona-foliculo-estimulante-fsh", nombre: "Hormona folículo estimulante (FSH)", categorias: ["Embarazo, fertilidad y salud sexual", "Otras hormonas"], muestra: "Sangre", descripcion: "Hormona que regula el ciclo menstrual y la fertilidad.", preparacion: "Su médico puede indicarle el día del ciclo menstrual en que debe tomarse la muestra.", sinonimos: "FSH" },
  { id: "hormona-gonadotropina-corionica-humana-hcg", nombre: "Hormona gonadotropina coriónica humana (hCG)", categorias: ["Embarazo, fertilidad y salud sexual"], muestra: "Sangre", descripcion: "Detecta y mide la hormona del embarazo en la sangre.", sinonimos: "embarazo, beta, HGC, hCG" },
  { id: "hormona-luteinizante-lh", nombre: "Hormona luteinizante (LH)", categorias: ["Embarazo, fertilidad y salud sexual", "Otras hormonas"], muestra: "Sangre", descripcion: "Hormona que regula la ovulación y la fertilidad.", preparacion: "Su médico puede indicarle el día del ciclo menstrual en que debe tomarse la muestra.", sinonimos: "LH" },
  { id: "perfil-ovarico", nombre: "Perfil ovárico", categorias: ["Embarazo, fertilidad y salud sexual"], paquete: true, muestra: "Sangre", preparacion: "Su médico puede indicarle el día del ciclo menstrual en que debe tomarse la muestra." },
  { id: "progesterona", nombre: "Progesterona", categorias: ["Embarazo, fertilidad y salud sexual", "Otras hormonas"], muestra: "Sangre", descripcion: "Hormona que prepara el útero para el embarazo. Ayuda a confirmar la ovulación.", preparacion: "Su médico puede indicarle el día del ciclo menstrual en que debe tomarse la muestra." },
  { id: "prolactina", nombre: "Prolactina", categorias: ["Embarazo, fertilidad y salud sexual", "Otras hormonas"], muestra: "Sangre", descripcion: "Hormona que produce la leche materna. Se estudia en alteraciones de la menstruación y la fertilidad.", preparacion: "Ayuno de 8 horas. Llegue con calma y evite el ejercicio antes del estudio." },
  { id: "prueba-inmunologica-de-embarazo", nombre: "Prueba inmunológica de embarazo", categorias: ["Embarazo, fertilidad y salud sexual"], muestra: "Orina", descripcion: "Detecta la hormona del embarazo en la orina.", preparacion: "De preferencia, primera orina de la mañana.", sinonimos: "embarazo" },
  { id: "cultivo-de-exudado-cervicovaginal", nombre: "Cultivo de exudado cervicovaginal", categorias: ["Embarazo, fertilidad y salud sexual", "Infecciones"], subcategoria: "Transmisión sexual", muestra: "Exudado cervicovaginal", descripcion: "Identifica microorganismos que causan infecciones vaginales.", preparacion: "No tener relaciones sexuales 48 horas antes, no usar óvulos, cremas ni duchas vaginales 3 días antes y no estar menstruando.", sinonimos: "vaginal" },
  { id: "cultivo-de-semen-espermocultivo", nombre: "Cultivo de semen (espermocultivo)", categorias: ["Embarazo, fertilidad y salud sexual", "Infecciones"], subcategoria: "Transmisión sexual", muestra: "Semen", preparacion: "Abstinencia sexual de 2 a 7 días. La muestra se obtiene por masturbación en frasco estéril.", sinonimos: "espermocultivo" },
  { id: "espermatobioscopia-directa", nombre: "Espermatobioscopia directa", categorias: ["Embarazo, fertilidad y salud sexual"], muestra: "Semen", descripcion: "Analiza la cantidad, el movimiento y la forma de los espermatozoides. Se usa para estudiar la fertilidad.", preparacion: "Abstinencia sexual de 2 a 7 días. La muestra se obtiene por masturbación en frasco estéril.", sinonimos: "espermograma, fertilidad" },
  { id: "papanicolaou", nombre: "Papanicolaou", categorias: ["Embarazo, fertilidad y salud sexual", "Detección de cáncer"], muestra: "Citología cervical", descripcion: "Estudio de células del cuello del útero para la detección oportuna de cáncer cervicouterino.", preparacion: "No tener relaciones sexuales 48 horas antes, no usar óvulos, cremas ni duchas vaginales 3 días antes y no estar menstruando.", sinonimos: "PAP, citología" },

  // ───────── Otras hormonas ─────────
  { id: "androstenediona", nombre: "Androstenediona", categorias: ["Otras hormonas"], muestra: "Sangre" },
  { id: "cortisol-matutino", nombre: "Cortisol matutino", categorias: ["Otras hormonas"], muestra: "Sangre", descripcion: "Hormona del estrés que produce la glándula suprarrenal.", preparacion: "Acudir por la mañana, de preferencia antes de las 9:00 am." },
  { id: "cortisol-urinario", nombre: "Cortisol urinario", categorias: ["Otras hormonas"], muestra: "Orina" },
  { id: "dehidroepiandrosterona-dhea", nombre: "Dehidroepiandrosterona (DHEA)", categorias: ["Otras hormonas"], muestra: "Sangre" },
  { id: "dehidroepiandrosterona-sulfato-dhea-s", nombre: "Dehidroepiandrosterona sulfato (DHEA-S)", categorias: ["Otras hormonas"], muestra: "Sangre" },
  { id: "dihidrotestosterona", nombre: "Dihidrotestosterona", categorias: ["Otras hormonas"], muestra: "Sangre" },
  { id: "globulina-fijadora-de-hormona-sexual-shbg", nombre: "Globulina fijadora de hormona sexual (SHBG)", categorias: ["Otras hormonas"], muestra: "Sangre" },
  { id: "hormona-adrenocorticotropica-acth", nombre: "Hormona adrenocorticotrópica (ACTH)", categorias: ["Otras hormonas"], muestra: "Sangre" },
  { id: "perfil-hormonal", nombre: "Perfil hormonal", categorias: ["Otras hormonas", "Embarazo, fertilidad y salud sexual"], paquete: true, muestra: "Sangre", preparacion: "Su médico puede indicarle el día del ciclo menstrual en que debe tomarse la muestra." },
  { id: "testosterona-total", nombre: "Testosterona total", categorias: ["Otras hormonas", "Embarazo, fertilidad y salud sexual"], grupo: "testosterona", variante: "Total", muestra: "Sangre", descripcion: "Principal hormona masculina; también se mide en mujeres." },
  { id: "testosterona-libre", nombre: "Testosterona libre", categorias: ["Otras hormonas", "Embarazo, fertilidad y salud sexual"], grupo: "testosterona", variante: "Libre", muestra: "Sangre" },

  // ───────── Huesos, vitaminas y minerales ─────────
  { id: "c-telopeptidos", nombre: "C-telopéptidos", categorias: ["Huesos, vitaminas y minerales"], muestra: "Sangre", sinonimos: "hueso, osteoporosis" },
  { id: "vitamina-d-25-hidroxi", nombre: "Vitamina D (25-hidroxi)", categorias: ["Huesos, vitaminas y minerales"], muestra: "Sangre", descripcion: "Mide las reservas de vitamina D, importante para los huesos." },
  { id: "calcio-serico", nombre: "Calcio sérico", categorias: ["Huesos, vitaminas y minerales"], muestra: "Sangre", descripcion: "Mide el calcio, importante para huesos, músculos y nervios." },
  { id: "fosforo-serico", nombre: "Fósforo sérico", categorias: ["Huesos, vitaminas y minerales"], muestra: "Sangre" },
  { id: "magnesio-serico", nombre: "Magnesio sérico", categorias: ["Huesos, vitaminas y minerales"], muestra: "Sangre", descripcion: "Mide el magnesio, importante para músculos y nervios." },
  { id: "zinc-serico", nombre: "Zinc sérico", categorias: ["Huesos, vitaminas y minerales"], muestra: "Sangre" },
  { id: "parathormona-pth", nombre: "Parathormona (PTH)", categorias: ["Huesos, vitaminas y minerales", "Otras hormonas"], muestra: "Sangre", sinonimos: "PTH" },

  // ───────── Infecciones ─────────
  { id: "procalcitonina", nombre: "Procalcitonina", categorias: ["Infecciones"], subcategoria: "Otras infecciones", muestra: "Sangre", descripcion: "Ayuda a identificar infecciones bacterianas graves.", sinonimos: "infección" },
  { id: "ac-anti-brucella-2-mercaptoetanol", nombre: "Brucella (anticuerpos, prueba de 2-mercaptoetanol)", categorias: ["Infecciones"], subcategoria: "Fiebre", muestra: "Sangre", sinonimos: "brucelosis, Ac. Anti Brucella 2-mercaptoetanol" },
  { id: "ac-anti-chlamydia-pneumoniae-iga-igg-igm", nombre: "Chlamydia pneumoniae (anticuerpos IgA, IgG e IgM)", categorias: ["Infecciones"], subcategoria: "Respiratorias", muestra: "Sangre", sinonimos: "clamidia, Ac. Anti Chlamydia pneumoniae IgA, IgG, IgM" },
  { id: "ac-anti-chlamydia-trachomatis-iga", nombre: "Chlamydia trachomatis (anticuerpos IgA)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "chlamydia-trachomatis", variante: "IgA", muestra: "Sangre", sinonimos: "clamidia, Ac. Anti Chlamydia trachomatis IgA" },
  { id: "ac-anti-chlamydia-trachomatis-igg", nombre: "Chlamydia trachomatis (anticuerpos IgG)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "chlamydia-trachomatis", variante: "IgG", muestra: "Sangre", sinonimos: "clamidia, Ac. Anti Chlamydia trachomatis IgG" },
  { id: "ac-anti-chlamydia-trachomatis-igm", nombre: "Chlamydia trachomatis (anticuerpos IgM)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "chlamydia-trachomatis", variante: "IgM", muestra: "Sangre", sinonimos: "clamidia, Ac. Anti Chlamydia trachomatis IgM" },
  { id: "ac-anti-citomegalovirus-igg", nombre: "Citomegalovirus (anticuerpos IgG)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Durante el embarazo", grupo: "citomegalovirus", variante: "IgG", muestra: "Sangre", sinonimos: "CMV, Ac. Anti Citomegalovirus IgG" },
  { id: "ac-anti-citomegalovirus-igm", nombre: "Citomegalovirus (anticuerpos IgM)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Durante el embarazo", grupo: "citomegalovirus", variante: "IgM", muestra: "Sangre", sinonimos: "CMV, Ac. Anti Citomegalovirus IgM" },
  { id: "ac-anti-dengue-duo-y-ns1", nombre: "Dengue (anticuerpos Duo y antígeno NS1)", categorias: ["Infecciones"], subcategoria: "Fiebre", muestra: "Sangre", descripcion: "Ayuda a diagnosticar dengue, tanto en los primeros días como en etapas posteriores.", sinonimos: "Ac. Anti Dengue Duo y NS1" },
  { id: "ac-anti-epstein-barr-igg-capside", nombre: "Epstein-Barr (anticuerpos IgG contra la cápside)", categorias: ["Infecciones"], subcategoria: "Fiebre", grupo: "epstein-barr", variante: "IgG", muestra: "Sangre", sinonimos: "mononucleosis, Ac. Anti Epstein Barr IgG (cápside)" },
  { id: "ac-anti-epstein-barr-igm-capside", nombre: "Epstein-Barr (anticuerpos IgM contra la cápside)", categorias: ["Infecciones"], subcategoria: "Fiebre", grupo: "epstein-barr", variante: "IgM", muestra: "Sangre", sinonimos: "mononucleosis, Ac. Anti Epstein Barr IgM (cápside)" },
  { id: "ac-anti-helicobacter-pylori-igm", nombre: "Helicobacter pylori (anticuerpos IgM)", categorias: ["Infecciones", "Hígado y digestión"], subcategoria: "Digestivas", muestra: "Sangre", descripcion: "Ayuda a detectar infección por la bacteria que causa gastritis y úlceras.", sinonimos: "gastritis, úlcera, Ac. Anti Helicobacter pylori IgM" },
  { id: "ac-anti-herpes-i-igg", nombre: "Herpes tipo 1 (anticuerpos IgG)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "herpes", variante: "Tipo 1 · IgG", muestra: "Sangre", sinonimos: "herpes, Ac. Anti Herpes I IgG" },
  { id: "ac-anti-herpes-i-igg-igm", nombre: "Herpes tipo 1 (anticuerpos IgG e IgM)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "herpes", variante: "Tipo 1 · IgG e IgM", muestra: "Sangre", sinonimos: "herpes, Ac. Anti Herpes I IgG, IgM" },
  { id: "ac-anti-herpes-ii-igg", nombre: "Herpes tipo 2 (anticuerpos IgG)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "herpes", variante: "Tipo 2 · IgG", muestra: "Sangre", sinonimos: "herpes, Ac. Anti Herpes II IgG" },
  { id: "ac-anti-herpes-ii-igg-igm", nombre: "Herpes tipo 2 (anticuerpos IgG e IgM)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "herpes", variante: "Tipo 2 · IgG e IgM", muestra: "Sangre", sinonimos: "herpes, Ac. Anti Herpes II IgG, IgM" },
  { id: "ac-anti-herpes-virus-1-y-2-igm", nombre: "Herpes tipos 1 y 2 (anticuerpos IgM)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", grupo: "herpes", variante: "Tipos 1 y 2 · IgM", muestra: "Sangre", sinonimos: "herpes, Ac. Anti Herpes virus 1 y 2 (IgM)" },
  { id: "ac-anti-rubeola-igg", nombre: "Rubéola (anticuerpos IgG)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Durante el embarazo", grupo: "rubeola", variante: "IgG", muestra: "Sangre", sinonimos: "rubeola, Ac. Anti Rubéola IgG" },
  { id: "ac-anti-rubeola-igm", nombre: "Rubéola (anticuerpos IgM)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Durante el embarazo", grupo: "rubeola", variante: "IgM", muestra: "Sangre", sinonimos: "rubeola, Ac. Anti Rubéola IgM" },
  { id: "ac-anti-toxoplasma-igg", nombre: "Toxoplasma (anticuerpos IgG)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Durante el embarazo", grupo: "toxoplasma", variante: "IgG", muestra: "Sangre", descripcion: "Indica si has tenido contacto con toxoplasmosis. Frecuente en el control del embarazo.", sinonimos: "toxoplasmosis, Ac. Anti Toxoplasma IgG" },
  { id: "ac-anti-toxoplasma-igm", nombre: "Toxoplasma (anticuerpos IgM)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Durante el embarazo", grupo: "toxoplasma", variante: "IgM", muestra: "Sangre", descripcion: "Ayuda a detectar una infección reciente por toxoplasmosis.", sinonimos: "toxoplasmosis, Ac. Anti Toxoplasma IgM" },
  { id: "ac-anti-treponema-pallidum", nombre: "Sífilis (anticuerpos contra Treponema pallidum)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", muestra: "Sangre", sinonimos: "sífilis, Ac. Anti Treponema pallidum" },
  { id: "anticuerpos-anti-vih-1-2-cuantitativo", nombre: "Anticuerpos anti-VIH 1/2 cuantitativo", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", muestra: "Sangre", sinonimos: "VIH, HIV, sida" },
  { id: "antigeno-covid-19-prueba-rapida", nombre: "Antígeno COVID-19 (prueba rápida)", categorias: ["Infecciones"], subcategoria: "Respiratorias", muestra: "Exudado nasofaríngeo", descripcion: "Detecta el virus de COVID-19 en una muestra de nariz y garganta.", sinonimos: "covid, coronavirus" },
  { id: "antigeno-covid-19-influenza-a-y-b", nombre: "Antígeno COVID-19 + Influenza A y B", categorias: ["Infecciones"], subcategoria: "Respiratorias", muestra: "Exudado nasofaríngeo", descripcion: "Detecta COVID-19 e influenza A y B en una sola muestra.", sinonimos: "covid, gripe, coronavirus" },
  { id: "antigeno-de-superficie-de-hepatitis-b-hbsag", nombre: "Antígeno de superficie de hepatitis B (HBsAg)", categorias: ["Infecciones", "Hígado y digestión"], subcategoria: "Hepatitis", muestra: "Sangre", descripcion: "Detecta infección por el virus de la hepatitis B.", sinonimos: "hepatitis" },
  { id: "hepatitis-a-igg", nombre: "Hepatitis A IgG", categorias: ["Infecciones", "Hígado y digestión"], subcategoria: "Hepatitis", grupo: "hepatitis-a", variante: "IgG", muestra: "Sangre" },
  { id: "hepatitis-a-igm", nombre: "Hepatitis A IgM", categorias: ["Infecciones", "Hígado y digestión"], subcategoria: "Hepatitis", grupo: "hepatitis-a", variante: "IgM", muestra: "Sangre" },
  { id: "hepatitis-b-core-anti-hbc-igm", nombre: "Hepatitis B core (anti-HBc IgM)", categorias: ["Infecciones", "Hígado y digestión"], subcategoria: "Hepatitis", muestra: "Sangre" },
  { id: "hepatitis-b-marcadores-igg-e-igm", nombre: "Hepatitis B, marcadores IgG e IgM", categorias: ["Infecciones", "Hígado y digestión"], subcategoria: "Hepatitis", muestra: "Sangre" },
  { id: "hepatitis-c-anticuerpos-anti-vhc", nombre: "Hepatitis C (anticuerpos anti-VHC)", categorias: ["Infecciones", "Hígado y digestión"], subcategoria: "Hepatitis", muestra: "Sangre", descripcion: "Detecta contacto con el virus de la hepatitis C.", sinonimos: "HCV" },
  { id: "influenza-tipo-a-y-b-prueba-rapida", nombre: "Influenza tipo A y B (prueba rápida)", categorias: ["Infecciones"], subcategoria: "Respiratorias", muestra: "Exudado nasofaríngeo", descripcion: "Detecta el virus de la influenza (gripe).", sinonimos: "gripe" },
  { id: "reacciones-febriles", nombre: "Reacciones febriles", categorias: ["Infecciones"], subcategoria: "Fiebre", paquete: true, muestra: "Sangre", descripcion: "Ayuda a identificar infecciones como tifoidea, paratifoidea y brucelosis.", sinonimos: "tifoidea, Widal, brucelosis" },
  { id: "rosa-de-bengala", nombre: "Rosa de Bengala", categorias: ["Infecciones"], subcategoria: "Fiebre", muestra: "Sangre", sinonimos: "brucelosis" },
  { id: "vdrl", nombre: "VDRL", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", muestra: "Sangre", descripcion: "Prueba de detección de sífilis.", sinonimos: "sífilis" },
  { id: "vih-1-y-2", nombre: "VIH 1 y 2", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", muestra: "Sangre", descripcion: "Prueba de detección del virus de inmunodeficiencia humana. Resultado confidencial.", sinonimos: "VIH, HIV, sida" },
  { id: "western-blot-vih-1", nombre: "Western blot (VIH 1)", categorias: ["Infecciones", "Embarazo, fertilidad y salud sexual"], subcategoria: "Transmisión sexual", muestra: "Sangre", sinonimos: "VIH, HIV" },
  { id: "baciloscopia", nombre: "Baciloscopia", categorias: ["Infecciones"], subcategoria: "Respiratorias", grupo: "baciloscopia", variante: "Una muestra", muestra: "Esputo", descripcion: "Busca la bacteria de la tuberculosis en una muestra de flema.", preparacion: "Primera expectoración de la mañana, en ayunas y después de enjuagarse la boca con agua, en frasco estéril. No debe ser saliva.", sinonimos: "tuberculosis, BAAR" },
  { id: "baciloscopia-3-muestras", nombre: "Baciloscopia (3 muestras)", categorias: ["Infecciones"], subcategoria: "Respiratorias", grupo: "baciloscopia", variante: "Serie de 3 muestras", muestra: "Esputo", preparacion: "Primera expectoración de la mañana durante 3 días, en ayunas y después de enjuagarse la boca con agua, en frascos estériles. No debe ser saliva.", sinonimos: "tuberculosis, BAAR" },
  { id: "cultivo-bacteriologico", nombre: "Cultivo bacteriológico", categorias: ["Infecciones"], subcategoria: "Otras infecciones", muestra: "Según el sitio a estudiar", sinonimos: "cultivo" },
  { id: "cultivo-de-esputo", nombre: "Cultivo de esputo", categorias: ["Infecciones"], subcategoria: "Respiratorias", muestra: "Esputo", preparacion: "Primera expectoración de la mañana, en ayunas y después de enjuagarse la boca con agua, en frasco estéril. No debe ser saliva.", sinonimos: "flema" },
  { id: "cultivo-de-exudado-faringeo", nombre: "Cultivo de exudado faríngeo", categorias: ["Infecciones"], subcategoria: "Respiratorias", muestra: "Exudado faríngeo", descripcion: "Identifica bacterias que causan infecciones de garganta.", preparacion: "Acudir en ayuno, sin lavarse los dientes ni usar enjuague bucal. No haber tomado antibióticos en los últimos 5 días.", sinonimos: "garganta" },
  { id: "cultivo-de-exudado-nasal", nombre: "Cultivo de exudado nasal", categorias: ["Infecciones"], subcategoria: "Respiratorias", muestra: "Exudado nasal", preparacion: "No usar gotas ni aerosoles nasales el día del estudio. No haber tomado antibióticos en los últimos 5 días.", sinonimos: "nariz" },
  { id: "cultivo-de-lesion", nombre: "Cultivo de lesión", categorias: ["Infecciones"], subcategoria: "Otras infecciones", muestra: "Lesión", preparacion: "No aplique cremas ni antisépticos en la lesión antes de la toma. No haber tomado antibióticos en los últimos 5 días.", sinonimos: "herida" },

  // ───────── Defensas, alergias y reumatología ─────────
  { id: "ac-anti-beta-2-glucoproteina-iga", nombre: "Anticuerpos anti-beta 2 glucoproteína IgA", categorias: ["Defensas, alergias y reumatología"], grupo: "beta-2-glucoproteina", variante: "IgA", muestra: "Sangre", sinonimos: "Ac. Anti Beta 2 glucoproteína IgA" },
  { id: "ac-anti-beta-2-glucoproteina-igg", nombre: "Anticuerpos anti-beta 2 glucoproteína IgG", categorias: ["Defensas, alergias y reumatología"], grupo: "beta-2-glucoproteina", variante: "IgG", muestra: "Sangre", sinonimos: "Ac. Anti Beta 2 glucoproteína IgG" },
  { id: "ac-anti-beta-2-glucoproteina-igm", nombre: "Anticuerpos anti-beta 2 glucoproteína IgM", categorias: ["Defensas, alergias y reumatología"], grupo: "beta-2-glucoproteina", variante: "IgM", muestra: "Sangre", sinonimos: "Ac. Anti Beta 2 glucoproteína IgM" },
  { id: "ac-anti-cardiolipinas-igg-e-igm", nombre: "Anticuerpos anticardiolipinas IgG e IgM", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "Ac. Anti Cardiolipinas IgG e IgM" },
  { id: "ac-anti-peptido-ciclico-citrulinado-ccp", nombre: "Anticuerpos antipéptido cíclico citrulinado (anti-CCP)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "artritis, Ac. Anti Péptido cíclico citrulinado (CCP)" },
  { id: "ac-anti-dna-de-doble-cadena-dsdna", nombre: "Anticuerpos anti-DNA de doble cadena (anti-dsDNA)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "lupus, Ac. Anti-DNA de doble cadena (dsDNA)" },
  { id: "ac-antinucleares-ana", nombre: "Anticuerpos antinucleares (ANA)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", descripcion: "Prueba inicial para estudiar enfermedades autoinmunes como el lupus.", sinonimos: "ANA, lupus, Ac. Antinucleares (ANA)" },
  { id: "antiestreptolisinas-aso", nombre: "Antiestreptolisinas (ASO)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", descripcion: "Detecta una infección reciente por estreptococo, como en algunas infecciones de garganta.", sinonimos: "ASO, estreptococo" },
  { id: "antigeno-hla-b27-deteccion", nombre: "Antígeno HLA-B27 (detección)", categorias: ["Defensas, alergias y reumatología"], grupo: "hla-b27", variante: "Detección", muestra: "Sangre", sinonimos: "HLA B27" },
  { id: "antigeno-hla-b27-deteccion-por-pcr", nombre: "Antígeno HLA-B27 (detección por PCR)", categorias: ["Defensas, alergias y reumatología"], grupo: "hla-b27", variante: "Detección por PCR", muestra: "Sangre", sinonimos: "HLA B27" },
  { id: "c-anca-pr3-proteinasa-3", nombre: "c-ANCA / PR3 (proteinasa 3)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "ANCA" },
  { id: "complemento-c3", nombre: "Complemento C3", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre" },
  { id: "complemento-c4", nombre: "Complemento C4", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre" },
  { id: "factor-reumatoide", nombre: "Factor reumatoide", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", descripcion: "Ayuda a diagnosticar artritis reumatoide.", sinonimos: "FR, artritis" },
  { id: "inmunoglobulina-a-iga", nombre: "Inmunoglobulina A (IgA)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "IgA" },
  { id: "inmunoglobulina-e-ige", nombre: "Inmunoglobulina E (IgE)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "IgE, alergia" },
  { id: "inmunoglobulina-g-igg", nombre: "Inmunoglobulina G (IgG)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "IgG" },
  { id: "p-anca-mpo-mieloperoxidasa", nombre: "p-ANCA / MPO (mieloperoxidasa)", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", sinonimos: "ANCA" },
  { id: "perfil-antifosfolipidos", nombre: "Perfil antifosfolípidos", categorias: ["Defensas, alergias y reumatología"], paquete: true, muestra: "Sangre" },
  { id: "perfil-reumatico-completo", nombre: "Perfil reumático completo", categorias: ["Defensas, alergias y reumatología"], paquete: true, muestra: "Sangre", descripcion: "Conjunto de pruebas para estudiar enfermedades reumáticas e inflamatorias.", sinonimos: "artritis, reumatoide" },
  { id: "proteina-c-reactiva", nombre: "Proteína C reactiva", categorias: ["Defensas, alergias y reumatología"], muestra: "Sangre", descripcion: "Indicador de inflamación o infección en el cuerpo.", sinonimos: "PCR, inflamación" },
  { id: "eosinofilos-en-moco-nasal", nombre: "Eosinófilos en moco nasal", categorias: ["Defensas, alergias y reumatología"], grupo: "eosinofilos-moco-nasal", variante: "Una muestra", muestra: "Moco nasal", preparacion: "No usar gotas ni aerosoles nasales el día del estudio. No haber tomado antibióticos en los últimos 5 días.", sinonimos: "alergia" },
  { id: "eosinofilos-en-moco-nasal-2-narinas", nombre: "Eosinófilos en moco nasal (2 narinas)", categorias: ["Defensas, alergias y reumatología"], grupo: "eosinofilos-moco-nasal", variante: "Ambas narinas", muestra: "Moco nasal", preparacion: "No usar gotas ni aerosoles nasales el día del estudio. No haber tomado antibióticos en los últimos 5 días.", sinonimos: "alergia" },

  // ───────── Detección de cáncer ─────────
  { id: "alfafetoproteina-afp", nombre: "Alfafetoproteína (AFP)", categorias: ["Detección de cáncer"], muestra: "Sangre", sinonimos: "AFP" },
  { id: "antigeno-ca-125", nombre: "Antígeno CA 125", categorias: ["Detección de cáncer"], muestra: "Sangre", descripcion: "Marcador que se usa en el seguimiento de enfermedades del ovario, según indicación médica.", sinonimos: "ovario" },
  { id: "antigeno-ca-15-3", nombre: "Antígeno CA 15-3", categorias: ["Detección de cáncer"], muestra: "Sangre", sinonimos: "mama" },
  { id: "antigeno-ca-19-9", nombre: "Antígeno CA 19-9", categorias: ["Detección de cáncer"], muestra: "Sangre", sinonimos: "páncreas" },
  { id: "antigeno-ca-21-1-cyfra", nombre: "Antígeno CA 21-1 (CYFRA)", categorias: ["Detección de cáncer"], muestra: "Sangre", sinonimos: "pulmón, cyfra" },
  { id: "antigeno-carcinoembrionario-cea", nombre: "Antígeno carcinoembrionario (CEA)", categorias: ["Detección de cáncer"], muestra: "Sangre", descripcion: "Marcador que se usa en el seguimiento de algunos tipos de cáncer, según indicación médica.", sinonimos: "CEA, ACE" },
  { id: "antigeno-he4", nombre: "Antígeno HE4", categorias: ["Detección de cáncer"], grupo: "he4", variante: "Antígeno HE4", muestra: "Sangre", sinonimos: "ovario, HE4" },
  { id: "proteina-4-del-epididimo-humano-he4", nombre: "Proteína 4 del epidídimo humano (HE4)", categorias: ["Detección de cáncer"], grupo: "he4", variante: "Proteína HE4", muestra: "Sangre", sinonimos: "ovario" },
  { id: "proteina-he4-con-indice-roma", nombre: "Proteína HE4 con índice ROMA", categorias: ["Detección de cáncer"], grupo: "he4", variante: "Con índice ROMA", muestra: "Sangre", sinonimos: "ovario, ROMA" },
  { id: "antigeno-prostatico-especifico-psa", nombre: "Antígeno prostático específico (PSA)", categorias: ["Detección de cáncer"], grupo: "antigeno-prostatico", variante: "PSA total", muestra: "Sangre", descripcion: "Prueba de detección para enfermedades de la próstata.", preparacion: "No tener relaciones sexuales ni andar en bicicleta o motocicleta 48 horas antes.", sinonimos: "próstata, APE" },
  { id: "antigeno-prostatico-libre", nombre: "Antígeno prostático libre", categorias: ["Detección de cáncer"], grupo: "antigeno-prostatico", variante: "PSA libre", muestra: "Sangre", preparacion: "No tener relaciones sexuales ni andar en bicicleta o motocicleta 48 horas antes.", sinonimos: "próstata, PSA" },
  { id: "psa-libre", nombre: "% PSA libre", categorias: ["Detección de cáncer"], grupo: "antigeno-prostatico", variante: "% de PSA libre", muestra: "Sangre", preparacion: "No tener relaciones sexuales ni andar en bicicleta o motocicleta 48 horas antes.", sinonimos: "antígeno prostático, próstata" },
  { id: "perfil-prostatico-especifico-total-y-libre", nombre: "Perfil prostático específico (total y libre)", categorias: ["Detección de cáncer"], grupo: "antigeno-prostatico", variante: "Perfil total y libre", paquete: true, muestra: "Sangre", descripcion: "Mide el PSA total y libre para evaluar la próstata con más detalle.", preparacion: "No tener relaciones sexuales ni andar en bicicleta o motocicleta 48 horas antes.", sinonimos: "próstata, PSA" },
  { id: "perfil-de-antigeno-prostatico", nombre: "Perfil de antígeno prostático", categorias: ["Detección de cáncer"], grupo: "antigeno-prostatico", variante: "Perfil de antígeno prostático", paquete: true, muestra: "Sangre", preparacion: "No tener relaciones sexuales ni andar en bicicleta o motocicleta 48 horas antes.", sinonimos: "próstata, PSA" },
  { id: "fosfatasa-acida-prostatica", nombre: "Fosfatasa ácida prostática", categorias: ["Detección de cáncer"], muestra: "Sangre", preparacion: "No tener relaciones sexuales ni andar en bicicleta o motocicleta 48 horas antes.", sinonimos: "próstata" },
  { id: "fosfatasa-acida-total-y-fraccion-prostatica", nombre: "Fosfatasa ácida total y fracción prostática", categorias: ["Detección de cáncer"], muestra: "Sangre", preparacion: "No tener relaciones sexuales ni andar en bicicleta o motocicleta 48 horas antes.", sinonimos: "próstata" },

  // ───────── Otros servicios ─────────
  { id: "litio-serico", nombre: "Litio sérico", categorias: ["Otros servicios"], muestra: "Sangre", preparacion: "Tome la muestra 12 horas después de la última dosis de litio, salvo otra indicación de su médico." },
  { id: "antidoping-5-parametros", nombre: "Antidoping 5 parámetros", categorias: ["Otros servicios"], muestra: "Orina", descripcion: "Detecta en orina 5 tipos de drogas.", preparacion: "Muestra de orina. Informe al personal los medicamentos que toma.", sinonimos: "drogas, toxicológico" },
  { id: "biopsia-de-hemorroidectomia", nombre: "Biopsia de hemorroidectomía", categorias: ["Otros servicios"], muestra: "Tejido", sinonimos: "patología" },
];
