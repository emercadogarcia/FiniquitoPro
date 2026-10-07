import { FiniquitoParams } from '../types/finiquito';

/**
 * Estado inicial limpio: todos los campos vacíos con guías y placeholders
 */
export const EMPTY_FINIQUITO_PARAMS: FiniquitoParams = {
  nombreTrabajador: '',
  ciTrabajador: '',
  cargoTrabajador: '',
  razonSocial: '',

  fechaIngreso: '',
  fechaRetiro: new Date().toISOString().split('T')[0], // Fecha actual por defecto
  motivoRetiro: 'despido',
  quinquenios: 0,

  sueldo1: 0,
  sueldo2: 0,
  sueldo3: 0,

  vacConsolidadas: 0,
  vacDuodecimas: 0,
  diasMesRetiro: 0,
  otrosDescuentos: 0,

  saldoRcIva: 0,
};

export const INITIAL_FINIQUITO_PARAMS: FiniquitoParams = EMPTY_FINIQUITO_PARAMS;

export const CASO_DESPIDO_INTEMPESTIVO: FiniquitoParams = {
  nombreTrabajador: 'Edgar Mercado Garcia',
  ciTrabajador: '4543848 LP',
  cargoTrabajador: 'Coordinador de Desarrollo',
  razonSocial: 'PROMEDICAL S.A.',

  fechaIngreso: '2021-03-01',
  fechaRetiro: new Date().toISOString().split('T')[0],
  motivoRetiro: 'despido',
  quinquenios: 0,

  sueldo1: 8500,
  sueldo2: 8500,
  sueldo3: 8800,

  vacConsolidadas: 5,
  vacDuodecimas: 2.5,
  diasMesRetiro: 15,
  otrosDescuentos: 0,

  saldoRcIva: 250,
};

export const CASO_RETIRO_VOLUNTARIO: FiniquitoParams = {
  nombreTrabajador: 'Ana Patricia Justiniano Roca',
  ciTrabajador: '6129403 SC',
  cargoTrabajador: 'Jefa de Contabilidad',
  razonSocial: 'COMERCIAL ORIENTE S.A.',

  fechaIngreso: '2018-02-15',
  fechaRetiro: new Date().toISOString().split('T')[0],
  motivoRetiro: 'voluntario',
  quinquenios: 1, // 1 quinquenio cobrado previamente (5 años deducidos)

  sueldo1: 7200,
  sueldo2: 7200,
  sueldo3: 7500,

  vacConsolidadas: 10,
  vacDuodecimas: 1.67,
  diasMesRetiro: 20,
  otrosDescuentos: 0,

  saldoRcIva: 0,
};

export const CASO_MORA_DS28699: FiniquitoParams = {
  nombreTrabajador: 'Gonzalo David Claros Zambrana',
  ciTrabajador: '5284091 CB',
  cargoTrabajador: 'Supervisor de Obra',
  razonSocial: 'CONSTRUCTORA DEL VALLE S.R.L.',

  fechaIngreso: '2022-01-10',
  fechaRetiro: '2026-08-01', // Retiro con más de 15 días transcurridos
  motivoRetiro: 'despido',
  quinquenios: 0,

  sueldo1: 6500,
  sueldo2: 6500,
  sueldo3: 6500,

  vacConsolidadas: 7,
  vacDuodecimas: 0,
  diasMesRetiro: 1,
  otrosDescuentos: 0,

  saldoRcIva: 0,
};
