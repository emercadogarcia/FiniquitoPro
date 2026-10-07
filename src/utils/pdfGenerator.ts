import jsPDF from 'jspdf';
import { FiniquitoParams, LiquidacionResult } from '../types/finiquito';

export function generarFiniquitoPDF(
  params: FiniquitoParams,
  res: LiquidacionResult,
  mostrarLeyes: boolean = false
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });

  const pageWidth = 215.9;
  const margin = 10;
  const contentWidth = pageWidth - margin * 2; // 195.9 mm
  let y = 10;

  const fmt = (num: number) =>
    num.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Marco exterior
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(0.5);
  doc.rect(margin, margin, contentWidth, 259.4);

  // Encabezado Oficial
  doc.setFillColor(245, 247, 250);
  doc.rect(margin, y, contentWidth, 16, 'F');
  doc.setDrawColor(80, 80, 80);
  doc.line(margin, y + 16, margin + contentWidth, y + 16);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('ESTADO PLURINACIONAL DE BOLIVIA', pageWidth / 2, y + 4.5, { align: 'center' });
  doc.setFontSize(8);
  doc.text('MINISTERIO DE TRABAJO, EMPLEO Y PREVISIÓN SOCIAL', pageWidth / 2, y + 8.5, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('FORMULARIO OFICIAL DE FINIQUITO', pageWidth / 2, y + 13.5, { align: 'center' });

  y += 16;

  const drawSectionTitle = (title: string, currentY: number, height = 4.5) => {
    doc.setFillColor(230, 235, 242);
    doc.rect(margin, currentY, contentWidth, height, 'F');
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, currentY + height, margin + contentWidth, currentY + height);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title, margin + 2, currentY + 3.2);
    return currentY + height;
  };

  // I. DATOS GENERALES
  y = drawSectionTitle('I. DATOS GENERALES', y);

  const col1 = margin + 2;
  const col2 = margin + 35;
  const col3 = margin + 102;
  const col4 = margin + 138;
  const rowH = 4.2;

  doc.setFontSize(7);

  // Fila 1
  doc.setFont('helvetica', 'bold');
  doc.text('Empresa / Razón Social:', col1, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text((params.razonSocial || 'N/A').substring(0, 38), col2, y + 3.2);

  doc.setFont('helvetica', 'bold');
  doc.text('Trabajador(a):', col3, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text((params.nombreTrabajador || 'N/A').substring(0, 32), col4, y + 3.2);

  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y + rowH, margin + contentWidth, y + rowH);
  y += rowH;

  // Fila 2
  doc.setFont('helvetica', 'bold');
  doc.text('Cargo / Puesto:', col1, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text((params.cargoTrabajador || 'N/A').substring(0, 38), col2, y + 3.2);

  doc.setFont('helvetica', 'bold');
  doc.text('C.I. Trabajador:', col3, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text(params.ciTrabajador || '-', col4, y + 3.2);

  doc.line(margin, y + rowH, margin + contentWidth, y + rowH);
  y += rowH;

  // Fila 3
  doc.setFont('helvetica', 'bold');
  doc.text('Fecha Ingreso:', col1, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text(res.antiguedad.fIngresoFormateada, col2, y + 3.2);

  doc.setFont('helvetica', 'bold');
  doc.text('Fecha Retiro:', col3, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text(res.antiguedad.fRetiroFormateada, col4, y + 3.2);

  doc.line(margin, y + rowH, margin + contentWidth, y + rowH);
  y += rowH;

  // Fila 4
  const mot = params.motivoRetiro === 'despido'
    ? 'Despido Forzoso / Intempestivo'
    : params.motivoRetiro === 'voluntario'
    ? 'Retiro Voluntario'
    : params.motivoRetiro === 'conclusion'
    ? 'Conclusión de Contrato'
    : 'Despido Justificado (Art. 16)';

  doc.setFont('helvetica', 'bold');
  doc.text('Motivo Retiro:', col1, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text(mot, col2, y + 3.2);

  doc.setFont('helvetica', 'bold');
  doc.text('Tiempo de Servicios:', col3, y + 3.2);
  doc.setFont('helvetica', 'bold');
  doc.text(`${res.antiguedad.anios} Años, ${res.antiguedad.meses} Meses, ${res.antiguedad.dias} Días`, col4, y + 3.2);

  doc.line(margin, y + rowH, margin + contentWidth, y + rowH);
  y += rowH;

  // Fila 5: Quinquenios y Tiempo Computable
  doc.setFont('helvetica', 'bold');
  doc.text('Quinquenios Pagados:', col1, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.text(`${params.quinquenios || 0} (${(params.quinquenios || 0) * 5} años deducidos)`, col2, y + 3.2);

  doc.setFont('helvetica', 'bold');
  doc.text('Tiempo Computable:', col3, y + 3.2);
  doc.setFont('helvetica', 'bold');
  doc.text(`${res.antiguedad.aniosComputables} Años netos, ${res.antiguedad.meses} Meses, ${res.antiguedad.dias} Días`, col4, y + 3.2);

  doc.setDrawColor(100, 100, 100);
  doc.line(margin, y + rowH, margin + contentWidth, y + rowH);
  y += rowH;

  // II. REMUNERACIÓN PROMEDIO INDEMNIZABLE
  y = drawSectionTitle('II. REMUNERACIÓN PROMEDIO INDEMNIZABLE (ÚLTIMOS 3 MESES)', y);

  const tCol1 = margin + 2;
  const tCol2 = margin + 50;
  const tCol3 = margin + 100;
  const tCol4 = margin + 150;

  doc.setFontSize(6.8);
  doc.setFont('helvetica', 'bold');
  doc.text('Mes 1 (Antepenúltimo)', tCol1, y + 3.2);
  doc.text('Mes 2 (Penúltimo)', tCol2, y + 3.2);
  doc.text('Mes 3 (Último mes)', tCol3, y + 3.2);
  doc.text('SUELDO PROMEDIO INDEMNIZABLE', tCol4, y + 3.2);

  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(params.sueldo1)}`, tCol1, y + 6.8);
  doc.text(`Bs. ${fmt(params.sueldo2)}`, tCol2, y + 6.8);
  doc.text(`Bs. ${fmt(params.sueldo3)}`, tCol3, y + 6.8);
  doc.setFont('helvetica', 'bold');
  doc.text(`Bs. ${fmt(res.promedio)}`, tCol4, y + 6.8);

  doc.setDrawColor(100, 100, 100);
  doc.line(margin, y + 8.5, margin + contentWidth, y + 8.5);
  y += 8.5;

  // III & IV: 2 COLUMNAS (BENEFICIOS SOCIALES Y DEDUCCIONES)
  const colWidthHalf = contentWidth / 2;
  const midX = margin + colWidthHalf;

  doc.setFillColor(235, 239, 245);
  doc.rect(margin, y, colWidthHalf, 4.5, 'F');
  doc.rect(midX, y, colWidthHalf, 4.5, 'F');
  doc.line(margin, y + 4.5, margin + contentWidth, y + 4.5);
  doc.line(midX, y, midX, y + 106);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.text('III. BENEFICIOS SOCIALES Y DERECHOS', margin + 2, y + 3.2);
  doc.text('IV. DEDUCCIONES Y RETENCIONES', midX + 2, y + 3.2);
  y += 4.5;

  const startBeneficiosY = y;
  const lineH = 4.2;

  // Columna Izquierda: Beneficios
  const leftX = margin + 2;
  const leftMontoX = midX - 3;
  doc.setFontSize(6.8);

  doc.setFont('helvetica', 'bold');
  doc.text('A. DESAHUCIO (3 MESES):', leftX, y + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.desahucio)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  doc.setFont('helvetica', 'bold');
  doc.text('B. INDEMNIZACIÓN POR TIEMPO:', leftX, y + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.indemnizacion)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  doc.text(`   - ${res.antiguedad.aniosComputables} años computables:`, leftX, y + 3);
  doc.text(`Bs. ${fmt(res.indemnizacionAnios)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  doc.text(`   - ${res.antiguedad.meses} meses (duodécimas):`, leftX, y + 3);
  doc.text(`Bs. ${fmt(res.indemnizacionMeses)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  doc.text(`   - ${res.antiguedad.dias} días (duodécimas):`, leftX, y + 3);
  doc.text(`Bs. ${fmt(res.indemnizacionDias)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  doc.setFont('helvetica', 'bold');
  doc.text('C. AGUINALDO DE NAVIDAD:', leftX, y + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.aguinaldo)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  doc.setFont('helvetica', 'bold');
  doc.text(`D. VACACIONES NO GOZADAS (${res.totalDiasVac.toFixed(2)} d.):`, leftX, y + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.pagoVacaciones)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  doc.setFont('helvetica', 'bold');
  doc.text(`E. SUELDO DEVENGADO (${params.diasMesRetiro} días):`, leftX, y + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.devengado)}`, leftMontoX, y + 3, { align: 'right' });
  y += lineH;

  // Subtotal Beneficios
  y += 2;
  doc.setFillColor(240, 245, 250);
  doc.rect(margin, y, colWidthHalf, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL BENEFICIOS Y HABERES:', leftX, y + 3.8);
  doc.text(`Bs. ${fmt(res.totalBruto)}`, leftMontoX, y + 3.8, { align: 'right' });

  // Columna Derecha: Deducciones
  let rightY = startBeneficiosY;
  const rightX = midX + 2;
  const rightMontoX = margin + contentWidth - 3;

  doc.setFont('helvetica', 'bold');
  doc.text('1. APORTES SIP LEY 065:', rightX, rightY + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.aporteSIP)}`, rightMontoX, rightY + 3, { align: 'right' });
  rightY += lineH;

  doc.setFont('helvetica', 'bold');
  doc.text('2. OTROS DESCUENTOS:', rightX, rightY + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.otrosDescuentos)}`, rightMontoX, rightY + 3, { align: 'right' });
  rightY += lineH;

  doc.setFont('helvetica', 'bold');
  doc.text('3. RETENCIÓN RC-IVA:', rightX, rightY + 3);
  doc.setFont('helvetica', 'normal');
  doc.text(`Bs. ${fmt(res.retencionEfectivaRcIva)}`, rightMontoX, rightY + 3, { align: 'right' });
  rightY += lineH;

  if (res.rcIvaCubiertoPorSaldo) {
    doc.setTextColor(22, 101, 52);
    doc.text('   (Compensado con saldo F-110)', rightX, rightY + 2.8);
    doc.setTextColor(30, 41, 59);
    rightY += lineH;
  }

  // Subtotal Deducciones
  doc.setFillColor(245, 240, 240);
  doc.rect(midX, y, colWidthHalf, 5.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL DEDUCCIONES:', rightX, y + 3.8);
  doc.text(`Bs. ${fmt(res.totalDeducciones)}`, rightMontoX, y + 3.8, { align: 'right' });

  y += 5.5;
  doc.setDrawColor(100, 100, 100);
  doc.line(margin, y, margin + contentWidth, y);

  // V. TOTAL LÍQUIDO PAGABLE
  doc.setFillColor(235, 245, 238);
  doc.rect(margin, y, contentWidth, 12, 'F');
  doc.line(margin, y + 12, margin + contentWidth, y + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('TOTAL LÍQUIDO PAGABLE A FAVOR DEL TRABAJADOR:', margin + 3, y + 4.5);

  doc.setFontSize(10.5);
  doc.setTextColor(22, 101, 52);
  doc.text(`Bs. ${fmt(res.liquido)}`, margin + contentWidth - 4, y + 4.5, { align: 'right' });

  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.text('SON:', margin + 3, y + 9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(res.liquidoLiteral, margin + 12, y + 9.5);

  y += 12;

  // Advertencia Legal D.S. 28699 Art. 9
  doc.setFillColor(254, 243, 199);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(146, 64, 14);

  const statusDS = res.plazoExcedido
    ? `ALERTA D.S. 28699 Art. 9: Plazo de 15 días vencido (+${res.diasDesdeRetiro - 15} días). MULTA 30%: Bs. ${fmt(res.multa30Porciento)} | Total Exigible: Bs. ${fmt(res.totalConMulta30)} (más UFVs)`
    : `D.S. 28699 Art. 9: Plazo perentorio de pago: 15 días calendario (${res.diasRestantesPlazo} días restantes). Pasado este plazo aplica 30% de multa patronal y mantenimiento en UFVs.`;
  doc.text(statusDS, margin + 3, y + 4);

  doc.setDrawColor(100, 100, 100);
  doc.line(margin, y + 6, margin + contentWidth, y + 6);
  y += 6;

  // Firmas
  const firmaBoxW = contentWidth / 2;
  const firmaH = 26;

  doc.line(margin + firmaBoxW, y, margin + firmaBoxW, y + firmaH);
  doc.line(margin, y + firmaH, margin + contentWidth, y + firmaH);

  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);

  // Trabajador
  doc.line(margin + 15, y + 17, margin + firmaBoxW - 15, y + 17);
  doc.setFont('helvetica', 'bold');
  doc.text('FIRMA TRABAJADOR', margin + firmaBoxW / 2, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text(`C.I.: ${params.ciTrabajador || '-'}`, margin + firmaBoxW / 2, y + 23.5, { align: 'center' });

  // Empleador
  doc.line(margin + firmaBoxW + 15, y + 17, margin + contentWidth - 15, y + 17);
  doc.setFont('helvetica', 'bold');
  doc.text('FIRMA Y SELLO PATRONAL', margin + firmaBoxW + firmaBoxW / 2, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text(params.razonSocial || 'EMPLEADOR', margin + firmaBoxW + firmaBoxW / 2, y + 23.5, { align: 'center' });

  // Pie de página
  doc.setFontSize(5.5);
  doc.setTextColor(120, 120, 120);
  doc.text(
    'Formulario Oficial de Finiquito · FiniquitoPro por 3MGLabs.com · Dirigido por Edgar Mercado G. · Ref: LGT, D.S. 110, D.S. 522, D.S. 28699',
    margin + 2,
    margin + 257
  );

  return doc;
}
