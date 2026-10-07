# 💼 FiniquitoPro

> Solución LegalTech moderna, minimalista y reactiva para el cálculo transparente y la generación oficial de formularios de finiquito conforme a la legislación laboral del Estado Plurinacional de Bolivia.

Desarrollado y mantenido por **[3MGLabs.com](https://3mglabs.com)**  
**Dirección del Proyecto:** Edgar Mercado G.

---

## 📌 Descripción

**FiniquitoPro** es una herramienta de liquidación de beneficios sociales diseñada para trabajadores, departamentos de Recursos Humanos/Nóminas, profesionales contables y estudiantes de Derecho Laboral. Automatiza el cómputo exacto de beneficios sociales, deducciones de ley y retenciones tributarias, permitiendo emitir el documento con validez técnica en formatos vectoriales y estructurados con un solo clic.

---

## ⚖️ Marco Normativo y Reglas de Negocio Incorporadas

La plataforma implementa la normativa laboral y tributaria vigente en Bolivia:

* **Ley General del Trabajo (Art. 13 y 19) y D.S. 1592:** Promedio indemnizable de los últimos 3 meses y cómputo de indemnización por años, meses y días (base 360 días).
* **Decreto Supremo N° 110:** Desahucio automático equivalente a 3 meses de sueldo en caso de despido intempestivo/forzoso (exento de aportes y retenciones).
* **Decreto Supremo N° 522:** Descuento preciso de quinquenios previamente cancelados.
* **Ley de 18/12/1944 y D.S. 229:** Duodécimas proporcionales de Aguinaldo de Navidad desde el 1 de enero.
* **Art. 33 D.R. LGT, D.S. 12059 y D.S. 28699 (Art. 8):** Liquidación pecuniaria de vacaciones consolidadas pendientes y duodécimas no gozadas.
* **Ley N° 065 de Pensiones:** Aportes laborales a la seguridad social (12.71% base + Aporte Nacional Solidario) aplicados exclusivamente sobre el haber devengado.
* **Ley 843 y D.S. 21531 (RC-IVA):** Tratamiento tributario de ingresos alcanzados (vacaciones y sueldo) con compensación directa mediante saldo a favor acumulado del dependiente (evitando retenciones indebidas).
* **Decreto Supremo N° 28699 (Art. 9):** Alerta legal del plazo perentorio de 15 días calendario de pago bajo sanción patronal de 30% de multa y actualización en UFVs.

---

## ✨ Características Principales

* ⚡ **Cómputo en Tiempo Real:** Interfaz SPA reactiva que recalcula montos al instante ante cualquier cambio de fechas, sueldos o saldos.
* 🎓 **Modo Pedagógico / Referencias Legales:** Interruptor interactivo que añade la cita normativa exacta a cada concepto liquidado (ideal para capacitación y auditoría).
* 📄 **Exportación a PDF Oficial:** Renderizado vectorial estructurado según el Formulario de Finiquito del Ministerio de Trabajo, Empleo y Previsión Social.
* 📝 **Descarga en Markdown (.md):** Exportación en texto estructurado para integración rápida en minutas, sistemas internos o documentación.
* 📲 **Integración Directa con WhatsApp:** Modal de envío rápido para compartir resúmenes ejecutivos directamente a cualquier número con formato conversacional.
* 🎨 **Diseño Minimalista & Responsive:** Construido bajo una estética limpia tipo SaaS con Tailwind CSS y tipografía optimizada.

---

## 🛠️ Stack Tecnológico

* **Core:** HTML5 Semántico, JavaScript Moderno (Vanilla ES6+).
* **Estilos:** Tailwind CSS CDN (Layouts flexibles, tipografía Inter y monoespaciada JetBrains Mono).
* **Iconografía:** Lucide Icons.
* **Motor PDF:** `html2pdf.js` (Canvas + jsPDF) para salida vectorial.

---

## 🚀 Instalación y Uso Rápido

Al ser una arquitectura *zero-build* / *client-side*:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/finiquitoPro.git
   ```
2. Abre el archivo index.html directamente en tu navegador o levántalo con un servidor estático local:
   ```bash
   npx serve .
   ```

---

## 📬 Contacto y Soporte

* **Entidad:** 3MGLabs.com
* **Líder de Proyecto:** Edgar Mercado G.
* **Correo Electrónico:** contacto@3mglabs.com
* **WhatsApp / Teléfono:** +591 70203103

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo LICENSE para más información.
