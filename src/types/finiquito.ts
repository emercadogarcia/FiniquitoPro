export type MotivoRetiro = 
  | 'despido'        // Despido Forzoso / Intempestivo (Con Desahucio)
  | 'voluntario'      // Retiro Voluntario (Sin Desahucio)
  | 'conclusion'      // Conclusión de Contrato a Plazo Fijo
  | 'justificado';    // Despido Justificado (Art. 16 LGT)

export interface FiniquitoParams {
  nombreTrabajador: string;
  ciTrabajador: string;
  cargoTrabajador: string;
  razonSocial: string;

  fechaIngreso: string;
  fechaRetiro: string;
  motivoRetiro: MotivoRetiro;
  quinquenios: number;

  sueldo1: number;
  sueldo2: number;
  sueldo3: number;

  vacConsolidadas: number;
  vacDuodecimas: number;
  diasMesRetiro: number;
  otrosDescuentos: number;

  saldoRcIva: number;
}

export interface AntiguedadCalculada {
  anios: number;
  meses: number;
  dias: number;
  aniosComputables: number;
  fIngresoFormateada: string;
  fRetiroFormateada: string;
}

export interface LiquidacionResult {
  promedio: number;
  diario: number;
  antiguedad: AntiguedadCalculada;

  desahucio: number;
  indemnizacion: number;
  indemnizacionAnios: number;
  indemnizacionMeses: number;
  indemnizacionDias: number;

  aguinaldo: number;
  totalDiasVac: number;
  pagoVacaciones: number;

  devengado: number;
  totalBruto: number;

  aporteSIP: number;
  retencionEfectivaRcIva: number;
  rcIvaCubiertoPorSaldo: boolean;
  impuestoDeterminado: number;
  otrosDescuentos: number;
  totalDeducciones: number;

  liquido: number;
  liquidoLiteral: string;

  // D.S. 28699 Art. 9 (15 días calendario y multa 30%)
  diasDesdeRetiro: number;
  plazoExcedido: boolean;
  diasRestantesPlazo: number;
  multa30Porciento: number;
  totalConMulta30: number;
}
