import { FiniquitoParams, LiquidacionResult } from '../types/finiquito';

export function generarFiniquitoMarkdown(
  params: FiniquitoParams,
  res: LiquidacionResult,
  mostrarLeyes: boolean = true
): string {
  const fmt = (n: number) =>
    n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const t = params.nombreTrabajador || 'TRABAJADOR';
  const ci = params.ciTrabajador || '-';
  const e = params.razonSocial || 'EMPLEADOR';
  const cargo = params.cargoTrabajador || '-';
  const fIng = res.antiguedad.fIngresoFormateada;
  const fRet = res.antiguedad.fRetiroFormateada;
  const mot = params.motivoRetiro === 'despido'
    ? 'DESPIDO FORZOSO / INTEMPESTIVO'
    : params.motivoRetiro === 'voluntario'
    ? 'RETIRO VOLUNTARIO'
    : params.motivoRetiro === 'conclusion'
    ? 'CONCLUSIÓN DE CONTRATO A PLAZO FIJO'
    : 'DESPIDO JUSTIFICADO (ART. 16 LGT)';

  let md = `# MINISTERIO DE TRABAJO, EMPLEO Y PREVISIÓN SOCIAL\n`;
  md += `## FORMULARIO DE FINIQUITO DE BENEFICIOS SOCIALES\n`;
  md += `*Generado por FiniquitoPro - 3MGLabs.com (Dirigido por Edgar Mercado G.)*\n\n`;

  md += `### I. DATOS GENERALES\n`;
  md += `- **Empresa:** ${e}\n`;
  md += `- **Trabajador:** ${t} (C.I.: ${ci})\n`;
  md += `- **Cargo:** ${cargo}\n`;
  md += `- **Fecha Ingreso:** ${fIng} | **Fecha Retiro:** ${fRet}\n`;
  md += `- **Motivo:** ${mot}\n`;
  md += `- **Tiempo de Servicio Total:** ${res.antiguedad.anios} Años, ${res.antiguedad.meses} Meses, ${res.antiguedad.dias} Días\n`;
  md += `- **Tiempo Computable Indemnización (Deduciendo Quinquenios):** ${res.antiguedad.aniosComputables} Años, ${res.antiguedad.meses} Meses, ${res.antiguedad.dias} Días\n\n`;

  md += `### II. REMUNERACIÓN PROMEDIO INDEMNIZABLE\n`;
  if (mostrarLeyes) {
    md += `> *Base legal: Art. 19 LGT y D.S. 1592 (Promedio últimos 3 meses).*  \n`;
  }
  md += `- **Mes 1:** Bs. ${fmt(params.sueldo1)} | **Mes 2:** Bs. ${fmt(params.sueldo2)} | **Mes 3:** Bs. ${fmt(params.sueldo3)}\n`;
  md += `- **Sueldo Promedio Indemnizable:** Bs. ${fmt(res.promedio)}\n\n`;

  md += `### III. BENEFICIOS SOCIALES Y CONCEPTOS A LIQUIDAR\n`;
  md += `- **Desahucio (3 meses de sueldo):** Bs. ${fmt(res.desahucio)}`;
  if (mostrarLeyes) md += ` *(Art. 12 y 13 LGT; D.S. 110)*`;
  md += `\n- **Indemnización por tiempo de servicios:** Bs. ${fmt(res.indemnizacion)}`;
  if (mostrarLeyes) md += ` *(Art. 13 LGT; D.S. 110; D.S. 522)*`;
  md += `\n- **Aguinaldo de Navidad (Duodécimas):** Bs. ${fmt(res.aguinaldo)}`;
  if (mostrarLeyes) md += ` *(Ley de 18/12/1944; D.S. 229)*`;
  md += `\n- **Vacaciones no gozadas (${res.totalDiasVac.toFixed(2)} días):** Bs. ${fmt(res.pagoVacaciones)}`;
  if (mostrarLeyes) md += ` *(Art. 33 D.R. LGT; D.S. 12059; D.S. 28699 Art. 8)*`;
  md += `\n- **Sueldo Devengado Mes de Retiro (${params.diasMesRetiro} días):** Bs. ${fmt(res.devengado)}`;
  if (mostrarLeyes) md += ` *(Art. 52 y 53 LGT)*`;
  md += `\n- **TOTAL BENEFICIOS Y HABERES:** **Bs. ${fmt(res.totalBruto)}**\n\n`;

  md += `### IV. DEDUCCIONES Y LÍQUIDO PAGABLE\n`;
  md += `- **Aportes Laborales SIP (Ley 065):** Bs. ${fmt(res.aporteSIP)}`;
  if (mostrarLeyes) md += ` *(12.71% + ANS si aplica)*`;
  md += `\n- **Retención RC-IVA (Ley 843):** Bs. ${fmt(res.retencionEfectivaRcIva)}`;
  if (res.rcIvaCubiertoPorSaldo) md += ` *(Compensado con saldo a favor declarado)*`;
  md += `\n- **Otros Descuentos Autorizados:** Bs. ${fmt(res.otrosDescuentos)}`;
  md += `\n- **TOTAL DEDUCCIONES:** **Bs. ${fmt(res.totalDeducciones)}**\n\n`;

  md += `### V. TOTAL LÍQUIDO A PERCIBIR\n`;
  md += `### **Bs. ${fmt(res.liquido)}**\n`;
  md += `**SON:** *${res.liquidoLiteral}*\n\n`;

  if (res.plazoExcedido) {
    md += `> 🚨 **ALERTA D.S. 28699 Art. 9 - MORA PATRONAL:** Plazo perentorio de 15 días vencido (+${res.diasDesdeRetiro - 15} días). Aplica multa patronal del 30%: **Bs. ${fmt(res.multa30Porciento)}**. Total exigible: **Bs. ${fmt(res.totalConMulta30)}** más mantenimiento de valor en UFVs.\n\n`;
  } else {
    md += `> **Advertencia de Ley:** Conforme al Art. 9 del D.S. N° 28699, el empleador cuenta con un plazo improrrogable de 15 días calendario desde el retiro para cancelar este finiquito (${res.diasRestantesPlazo} días restantes), bajo apercibimiento de multa del 30% más mantenimiento de valor en UFVs.\n\n`;
  }

  md += `\`\`\`\n`;
  md += `____________________________          ____________________________\n`;
  md += `     FIRMA TRABAJADOR                       FIRMA Y SELLO PATRONAL\n`;
  md += ` C.I.: ${ci}                                Empresa: ${e}\n`;
  md += `\`\`\`\n`;

  return md;
}
