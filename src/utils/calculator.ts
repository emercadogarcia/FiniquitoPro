import { FiniquitoParams, LiquidacionResult } from '../types/finiquito';
import { numeroALiteralBolivianos } from './numberToWords';

export function calcularFiniquito(params: FiniquitoParams): LiquidacionResult {
  const {
    fechaIngreso,
    fechaRetiro,
    motivoRetiro,
    quinquenios = 0,
    sueldo1 = 0,
    sueldo2 = 0,
    sueldo3 = 0,
    vacConsolidadas = 0,
    vacDuodecimas = 0,
    diasMesRetiro = 0,
    otrosDescuentos = 0,
    saldoRcIva = 0,
  } = params;

  // 1. Promedio Salarial Últimos 3 Meses
  const s1 = Number(sueldo1) || 0;
  const s2 = Number(sueldo2) || 0;
  const s3 = Number(sueldo3) || 0;
  const sumaSueldos = s1 + s2 + s3;
  const promedio = sumaSueldos > 0 ? sumaSueldos / 3 : 0;
  const diario = promedio / 30;

  // 2. Antigüedad y Tiempos Computables
  let totalAnios = 0;
  let mesesRestantes = 0;
  let diasRestantes = 0;
  let aniosComputables = 0;
  let fIngresoFormateada = '-';
  let fRetiroFormateada = '-';
  let diasDesdeRetiro = 0;

  if (fechaIngreso && fechaRetiro) {
    const dIngreso = new Date(fechaIngreso + 'T00:00:00');
    const dRetiro = new Date(fechaRetiro + 'T00:00:00');

    fIngresoFormateada = !isNaN(dIngreso.getTime())
      ? dIngreso.toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : fechaIngreso;
    fRetiroFormateada = !isNaN(dRetiro.getTime())
      ? dRetiro.toLocaleDateString('es-BO', { day: '2-digit', month: '2-digit', year: 'numeric' })
      : fechaRetiro;

    const diffTime = Math.max(0, dRetiro.getTime() - dIngreso.getTime());
    const totalDiasDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    totalAnios = Math.floor(totalDiasDiff / 365.25);
    mesesRestantes = Math.floor((totalDiasDiff % 365.25) / 30.4375);
    diasRestantes = Math.floor((totalDiasDiff % 365.25) % 30.4375);

    aniosComputables = Math.max(0, totalAnios - (Number(quinquenios) || 0) * 5);

    // Cómputo de mora respecto a fecha de retiro y hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const diffHoyMs = hoy.getTime() - dRetiro.getTime();
    diasDesdeRetiro = Math.max(0, Math.floor(diffHoyMs / (1000 * 60 * 60 * 24)));
  }

  // 3. Beneficios Sociales
  // A. Desahucio (Art. 12 y 13 LGT; D.S. 110)
  const aplicaDesahucio = motivoRetiro === 'despido';
  const desahucio = aplicaDesahucio ? promedio * 3 : 0;

  // B. Indemnización (Art. 13 LGT; D.S. 110; D.S. 522)
  const pierdeIndemnizacion = motivoRetiro === 'justificado';
  let indemnizacionAnios = 0;
  let indemnizacionMeses = 0;
  let indemnizacionDias = 0;

  if (!pierdeIndemnizacion) {
    indemnizacionAnios = aniosComputables * promedio;
    indemnizacionMeses = mesesRestantes * (promedio / 12);
    indemnizacionDias = diasRestantes * (promedio / 360);
  }
  const indemnizacion = indemnizacionAnios + indemnizacionMeses + indemnizacionDias;

  // C. Aguinaldo (Ley 18/12/1944; D.S. 229)
  let aguinaldo = 0;
  if (fechaRetiro) {
    const dRet = new Date(fechaRetiro + 'T00:00:00');
    const mesesAguinaldo = dRet.getMonth(); // Enero = 0
    const diasAguinaldo = dRet.getDate();
    aguinaldo = (mesesAguinaldo * (promedio / 12)) + (diasAguinaldo * (promedio / 360));
  }

  // D. Vacaciones no gozadas (Art. 33 D.R. LGT; D.S. 12059; D.S. 28699 Art. 8)
  const totalDiasVac = (Number(vacConsolidadas) || 0) + (Number(vacDuodecimas) || 0);
  const pagoVacaciones = totalDiasVac * diario;

  // E. Sueldo devengado mes de retiro (Art. 52 y 53 LGT)
  const baseUltimoSueldo = s3 > 0 ? s3 : promedio;
  const devengado = (baseUltimoSueldo / 30) * (Number(diasMesRetiro) || 0);

  const totalBruto = desahucio + indemnizacion + aguinaldo + pagoVacaciones + devengado;

  // 4. Deducciones de Ley y Tributarias
  // Aportes Laborales SIP Ley 065 (12.71% base)
  let aporteSIP = devengado * 0.1271;
  if (devengado > 13000) {
    aporteSIP += (devengado - 13000) * 0.01;
  }
  if (devengado > 25000) {
    aporteSIP += (devengado - 25000) * 0.05;
  }

  // Cómputo RC-IVA sobre ingresos gravados (Devengado neto de SIP + Compensación de Vacaciones)
  const baseImponibleRcIva = Math.max(0, devengado - aporteSIP) + pagoVacaciones;
  const smnBolivia = 2500; // Salario Mínimo Nacional referencial vigente
  const dosSMN = smnBolivia * 2;

  let impuestoDeterminado = 0;
  if (baseImponibleRcIva > dosSMN) {
    const sujetaImpuesto = baseImponibleRcIva - dosSMN;
    const impuestoBruto = sujetaImpuesto * 0.13;
    const pagoACuenta = dosSMN * 0.13;
    impuestoDeterminado = Math.max(0, impuestoBruto - pagoACuenta);
  }

  // Aplicación del Saldo a Favor RC-IVA del Trabajador
  const saldoIva = Number(saldoRcIva) || 0;
  let retencionEfectivaRcIva = 0;
  let rcIvaCubiertoPorSaldo = false;

  if (impuestoDeterminado > 0) {
    if (saldoIva >= impuestoDeterminado) {
      retencionEfectivaRcIva = 0;
      rcIvaCubiertoPorSaldo = true;
    } else {
      retencionEfectivaRcIva = impuestoDeterminado - saldoIva;
      rcIvaCubiertoPorSaldo = false;
    }
  } else if (saldoIva > 0) {
    rcIvaCubiertoPorSaldo = true;
  }

  const otrosDesc = Number(otrosDescuentos) || 0;
  const totalDeducciones = aporteSIP + otrosDesc + retencionEfectivaRcIva;
  const liquido = Math.max(0, totalBruto - totalDeducciones);
  const liquidoLiteral = numeroALiteralBolivianos(liquido);

  // 5. Advertencia D.S. 28699 Art. 9 (15 días calendario)
  const plazoExcedido = diasDesdeRetiro > 15;
  const diasRestantesPlazo = Math.max(0, 15 - diasDesdeRetiro);
  const multa30Porciento = plazoExcedido ? liquido * 0.30 : 0;
  const totalConMulta30 = liquido + multa30Porciento;

  return {
    promedio,
    diario,
    antiguedad: {
      anios: totalAnios,
      meses: mesesRestantes,
      dias: diasRestantes,
      aniosComputables,
      fIngresoFormateada,
      fRetiroFormateada,
    },
    desahucio,
    indemnizacion,
    indemnizacionAnios,
    indemnizacionMeses,
    indemnizacionDias,
    aguinaldo,
    totalDiasVac,
    pagoVacaciones,
    devengado,
    totalBruto,
    aporteSIP,
    retencionEfectivaRcIva,
    rcIvaCubiertoPorSaldo,
    impuestoDeterminado,
    otrosDescuentos: otrosDesc,
    totalDeducciones,
    liquido,
    liquidoLiteral,
    diasDesdeRetiro,
    plazoExcedido,
    diasRestantesPlazo,
    multa30Porciento,
    totalConMulta30,
  };
}
