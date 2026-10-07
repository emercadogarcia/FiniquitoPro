/**
 * Manual Oficial Paso a Paso para el Cálculo Correcto del Finiquito en Bolivia
 * Conforme a la LGT, D.S. 110, D.S. 522, D.S. 28699, Ley 065 y Ley 843
 * Creado por 3MGLabs.com | Dirigido por Edgar Mercado G.
 */

export function generarManualMarkdown(): string {
  return `# 📘 MANUAL OFICIAL PASO A PASO: GUÍA PARA EL CÁLCULO Y LIQUIDACIÓN CORRECTA DE FINIQUITOS EN BOLIVIA

> **Plataforma:** FiniquitoPro · Solución LegalTech  
> **Desarrollado y mantenido por:** [3MGLabs.com](https://3mglabs.com)  
> **Dirección del Proyecto:** Edgar Mercado G.  
> **Legislación:** Ley General del Trabajo (LGT), D.S. 224, D.S. 110, D.S. 522, D.S. 28699, Ley 065 y Ley 843.

---

## 📌 INTRODUCCIÓN

El **Finiquito** es el documento oficial y vinculante mediante el cual se formaliza la extinción de la relación laboral y la liquidación definitiva de los beneficios sociales y derechos adquiridos de la trabajadora o trabajador. En Bolivia, el formulario está regulado por el **Ministerio de Trabajo, Empleo y Previsión Social**.

Este manual tiene como objetivo guiar paso a paso a trabajadores, profesionales de Recursos Humanos, contadores y asesores legales para garantizar que cada rubro sea computado con exactitud matemática y pleno respaldo jurídico.

---

## 📑 DOCUMENTACIÓN PREVIA REQUERIDA

Antes de iniciar el cálculo, reúna los siguientes antecedentes:
1. **Contrato de Trabajo** (para verificar fecha exacta de ingreso y tipo de contrato).
2. **Carta de Desvinculación o Renuncia** con sello de recepción (para fijar la fecha de retiro y causal).
3. **Tres (3) últimas papeletas de pago o boletas de sueldo** anteriores al mes de desvinculación.
4. **Kardex de Asistencia y Registro de Vacaciones** (para verificar días pendientes y consolidados).
5. **Formulario 110 (F-110) y extracto del Saldo RC-IVA** a favor del dependiente.
6. **Comprobantes de Quinquenios previos** cancelados (si existieron).

---

## 🛠️ GUÍA PASO A PASO

---

### PASO 1: IDENTIFICACIÓN GENERAL DE LAS PARTES
1. **Razón Social de la Empresa:** Ingrese el nombre legal o comercial registrado ante SEPREC / Fundempresa y el NIT.
2. **Nombre Completo del Trabajador:** Tal como figura en su Cédula de Identidad.
3. **Cédula de Identidad (C.I.):** Número de documento y departamento de emisión (ej: \`4543848 LP\`).
4. **Cargo / Puesto:** Función desempeñada al momento del cese de funciones.

---

### PASO 2: RELACIÓN LABORAL Y CÓMPUTO DE ANTIGÜEDAD

#### A. Fechas Clave
* **Fecha de Ingreso:** Primer día efectivo de trabajo ininterrumpido.
* **Fecha de Retiro:** Último día laborado de la relación laboral.

#### B. Cómputo Comercial Laboral
En la práctica laboral boliviana, el tiempo de servicio se computa en:
* **Años:** Periodos de 360 días (o 365 días calendario).
* **Meses:** Fracciones de 30 días comerciales.
* **Días:** Días calendario exactos transcurridos.

#### C. Motivo de Desvinculación y Consecuencias Legales
* **Despido Forzoso / Intempestivo (Sin Causa Justificada):**
  * Genera el pago de **Desahucio** (3 sueldos íntegros) conforme al **D.S. N° 110**.
  * Genera el pago de **Indemnización** y todos los derechos adquiridos.
* **Retiro Voluntario (Renuncia):**
  * **NO** genera Desahucio.
  * **SÍ** genera Indemnización siempre que el trabajador haya superado los **90 días de trabajo continuo** (D.S. N° 110 de 1 de mayo de 2009).
* **Conclusión de Contrato a Plazo Fijo:**
  * Al término del plazo acordado, no genera desahucio; genera indemnización si corresponde.
* **Despido Justificado (Art. 16 de la LGT y Art. 9 de su D.R.):**
  * Por causales comprobadas (hurto, robo, injurias, abandono injustificado > 6 días). Pierde desahucio e indemnización, pero **conserva derechos adquiridos** (Aguinaldo duodécimas, Vacaciones pendientes y Sueldo devengado).

#### D. Deducción de Quinquenios Cancelados (D.S. N° 522)
* El Decreto Supremo 522 de 26 de mayo de 2010 autoriza el cobro del quinquenio (cada 5 años continuos).
* Si el trabajador ya cobró 1 quinquenio, se deben deducir **5 años** de la antigüedad acumulada para la indemnización.
* Si cobró 2 quinquenios, se deducen **10 años**, evitando así el pago duplicado.

---

### PASO 3: DETERMINACIÓN DEL SUELDO PROMEDIO INDEMNIZABLE

Conforme al **Artículo 19 de la Ley General del Trabajo** y el **D.S. N° 1592**, la base de cálculo es el **promedio de las remuneraciones percibidas en los últimos tres (3) meses trabajados**:

$$\\text{Sueldo Promedio} = \\frac{\\text{Mes 1} + \\text{Mes 2} + \\text{Mes 3}}{3}$$

$$\\text{Salario Diario} = \\frac{\\text{Sueldo Promedio}}{30}$$

* **Conceptos que SÍ entran al promedio:** Sueldo básico, bono de antigüedad, horas extras habituales, comisiones y recargos nocturnos.
* **Conceptos que NO entran al promedio:** Aguinaldo de Navidad, viáticos con rendición de cuentas, subsidios de maternidad/familiares, primas anuales de utilidades.

---

### PASO 4: LIQUIDACIÓN DE BENEFICIOS SOCIALES Y CONCEPTOS A FAVOR

#### 1. Desahucio (D.S. 110)
* Aplica únicamente en caso de despido forzoso o cierre/quiebra de empresa:
  $$\\text{Desahucio} = 3 \\times \\text{Sueldo Promedio}$$
* **Nota tributaria:** El desahucio está 100% exento de aportes SIP y de RC-IVA.

#### 2. Indemnización por Tiempo de Servicios (LGT Art. 13, D.S. 110 y D.S. 522)
Se computa sobre los años netos (descontando quinquenios):
* **Por Años:** $\\text{Años Computables} \\times \\text{Sueldo Promedio}$
* **Por Meses (Duodécimas):** $\\text{Meses} \\times \\left(\\frac{\\text{Sueldo Promedio}}{12}\\right)$
* **Por Días (Duodécimas):** $\\text{Días} \\times \\left(\\frac{\\text{Sueldo Promedio}}{360}\\right)$

#### 3. Aguinaldo de Navidad (Ley de 18/12/1944 y D.S. 229)
* Se computa por duodécimas desde el 1 de enero del año del retiro hasta la fecha de desvinculación:
  $$\\text{Aguinaldo} = \\text{Meses del año} \\times \\left(\\frac{\\text{Sueldo Promedio}}{12}\\right) + \\text{Días del mes} \\times \\left(\\frac{\\text{Sueldo Promedio}}{360}\\right)$$
* Es un derecho consolidado e inembargable (100% exento de SIP y RC-IVA).

#### 4. Vacaciones No Gozadas (D.S. 224 Art. 33 y D.S. 28699 Art. 8)
* **Escala Legal de Vacaciones (LGT):**
  * De 1 a 5 años de servicio: 15 días hábiles anuales.
  * De 5 a 10 años de servicio: 20 días hábiles anuales.
  * De 10 años en adelante: 30 días hábiles anuales.
* **Cálculo:**
  $$\\text{Pago Vacaciones} = (\\text{Días Consolidados Pendientes} + \\text{Días Duodécimas}) \\times \\text{Salario Diario}$$
* Conforme al D.S. 28699, las vacaciones no gozadas son compensables en dinero y generan duodécimas de la última fracción trabajada.
* **Nota impositiva:** La compensación de vacaciones no está sujeta a aportes SIP, pero **SÍ está gravada por el RC-IVA**.

#### 5. Sueldo Devengado del Mes de Salida (LGT Art. 52 y 53)
* Remuneración por los días efectivamente laborados en el mes en que ocurrió el retiro:
  $$\\text{Devengado} = \\left(\\frac{\\text{Último Sueldo Ganado}}{30}\\right) \\times \\text{Días Trabajados en el Mes}$$
* **Nota:** El sueldo devengado **SÍ está sujeto a aportes laborales al SIP (12.71% / 13.04%) y al RC-IVA**.

---

### PASO 5: DEDUCCIONES Y RETENCIONES DE LEY

#### 1. Aportes Laborales a la Seguridad Social (SIP / Gestora Pública - Ley 065)
Se aplican **exclusivamente sobre el sueldo devengado**:
* **10.00%:** Aporte a la cuenta personal previsional (Vejez).
* **1.71%:** Prima por Riesgo Común.
* **0.50%:** Aporte Solidario del Asegurado.
* **0.50%:** Comisión de administración de la Gestora Pública.
* **Base total:** **12.71%** (o 13.04% con comisiones integradas).
* **Aporte Nacional Solidario (ANS):** Si el haber del mes supera Bs. 13.000 se aplica 1% sobre el excedente; si supera Bs. 25.000 se aplica 5% sobre el excedente.

#### 2. Régimen Complementario al IVA (RC-IVA - Ley 843 y D.S. 21531)
* **Base Imponible:** $(\\text{Sueldo Devengado} - \\text{Aportes SIP}) + \\text{Compensación de Vacaciones}$.
* **Exención legal:** 2 Salarios Mínimos Nacionales (SMN) como mínimo no imponible y el 13% de 2 SMN como pago a cuenta.
* **Compensación con Saldo a Favor del Dependiente:** Si el trabajador presentó su Formulario 110 y cuenta con saldo a favor acumulado, dicho saldo se descuenta directamente contra el impuesto determinado. Si el saldo cubre el impuesto, la retención efectiva es **Bs. 0,00**.

#### 3. Otros Descuentos Autorizados
* Anticipos de sueldo recibidos durante el mes.
* Préstamos patronales pendientes.
* Retención judicial por asistencia familiar ordenada por juez.

---

### PASO 6: TOTAL LÍQUIDO PAGABLE Y ALERTA LEGAL D.S. 28699

$$\\text{TOTAL LÍQUIDO PAGABLE} = \\text{TOTAL BENEFICIOS Y HABERES} - \\text{TOTAL DEDUCCIONES}$$

#### ⚠️ Control Perentorio del Artículo 9 del D.S. 28699
* El empleador tiene un **plazo perentorio de quince (15) días calendario** computables desde la fecha de desvinculación para pagar el finiquito.
* **Vencido el plazo de 15 días calendario:**
  * Corre de pleno derecho la **MULTA PATRONAL DEL 30%** sobre el total de la liquidación.
  * Corre el **mantenimiento de valor en base a las Unidades de Fomento a la Vivienda (UFV)** emitidas por el Banco Central de Bolivia.
  $$\\text{Total Exigible con Multa} = \\text{Líquido Pagable} \\times 1.30 + \\text{Reajuste UFV}$$

---

### PASO 7: EMISIÓN, FIRMAS Y VISACIÓN MINISTERIAL

1. **Emisión de Documentos:** Genere tres (3) ejemplares del finiquito oficial (en FiniquitoPro puede exportar directamente en PDF vectorial o Markdown).
2. **Firmas:**
   * Firma del Trabajador (en señal de conformidad).
   * Firma y Sello Patronal (Representante Legal).
3. **Visación en la Jefatura Departamental de Trabajo:**
   * Presentar los 3 formularios firmados.
   * Adjuntar fotocopia de C.I. del trabajador y del empleador.
   * Adjuntar fotocopia de las 3 últimas boletas de pago.
   * Acreditar el pago efectivo mediante cheque o transferencia bancaria a nombre del trabajador.
   * Presentar comprobante del depósito de la tasa ministerial.

---

## 💡 EJEMPLO PRÁCTICO RESUMIDO

| Parámetro | Valor de Ejemplo |
| :--- | :--- |
| **Fecha Ingreso** | 01/03/2021 |
| **Fecha Retiro** | 15/06/2026 |
| **Motivo** | Despido Intempestivo (Con Desahucio) |
| **Antigüedad Computada** | 5 Años, 3 Meses, 15 Días |
| **Quinquenios Cobrados** | 0 (Tiempo computable: 5 Años netos) |
| **Sueldo Mes 1, 2, 3** | Bs. 8.500,00 / Bs. 8.500,00 / Bs. 8.800,00 |
| **Promedio Indemnizable** | **Bs. 8.600,00** (Diario: Bs. 286,67) |
| **A. Desahucio (3 meses)** | Bs. 25.800,00 |
| **B. Indemnización (5a 3m 15d)** | Bs. 43.000,00 (años) + Bs. 2.150,00 (meses) + Bs. 358,33 (días) = Bs. 45.508,33 |
| **C. Aguinaldo de Navidad** | 5 meses y 15 días = Bs. 3.941,67 |
| **D. Vacaciones No Gozadas** | 7.5 días = Bs. 2.150,00 |
| **E. Sueldo Devengado Mes** | 15 días trabajados = Bs. 4.400,00 |
| **TOTAL BENEFICIOS BRUTO** | **Bs. 81.800,00** |
| **Deducción SIP Gestora (12.71%)** | -Bs. 559,24 (solo sobre sueldo devengado) |
| **TOTAL LÍQUIDO A PAGAR** | **Bs. 81.240,76** |

---

## 📬 CONTACTO Y ASESORÍA TÉCNICA

* **Plataforma:** [3MGLabs.com](https://3mglabs.com)
* **Líder de Proyecto:** Edgar Mercado G.
* **Correo Electrónico:** contacto@3mglabs.com
* **WhatsApp Directo:** +591 70203103

---
*FiniquitoPro © 3MGLabs.com · Documento técnico de apoyo legal laboral.*
`;
}

export function descargarManualMarkdown(): void {
  const md = generarManualMarkdown();
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Manual_Calculo_Finiquito_Bolivia_3MGLabs.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
