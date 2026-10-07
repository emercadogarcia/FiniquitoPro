/**
 * Convierte un número decimal a su representación literal en castellano,
 * con formato estándar para documentos legales y finiquitos en Bolivia:
 * "SON: VEINTICUATRO MIL QUINIENTOS TREINTA Y 50/100 BOLIVIANOS"
 */

const UNIDADES = [
  '',
  'UN',
  'DOS',
  'TRES',
  'CUATRO',
  'CINCO',
  'SEIS',
  'SIETE',
  'OCHO',
  'NUEVE',
];

const DECENAS = [
  '',
  'DIEZ',
  'VEINTE',
  'TREINTA',
  'CUARENTA',
  'CINCUENTA',
  'SESENTA',
  'SETENTA',
  'OCHENTA',
  'NOVENTA',
];

const DIEZ_A_DIECINUEVE = [
  'DIEZ',
  'ONCE',
  'DOCE',
  'TRECE',
  'CATORCE',
  'QUINCE',
  'DIECISÉIS',
  'DIECISIETE',
  'DIECIOCHO',
  'DIECINUEVE',
];

const VEINTE_A_VEINTINUEVE = [
  'VEINTE',
  'VEINTIÚN',
  'VEINTIDÓS',
  'VEINTITRÉS',
  'VEINTICUATRO',
  'VEINTICINCO',
  'VEINTISÉIS',
  'VEINTISIETE',
  'VEINTIOCHO',
  'VEINTINUEVE',
];

const CENTENAS = [
  '',
  'CIENTO',
  'DOSCIENTOS',
  'TRESCIENTOS',
  'CUATROCIENTOS',
  'QUINIENTOS',
  'SEISCIENTOS',
  'SETECIENTOS',
  'OCHOCIENTOS',
  'NOVECIENTOS',
];

function convertirCentenas(num: number): string {
  if (num === 0) return '';
  if (num === 100) return 'CIEN';

  const c = Math.floor(num / 100);
  const d = Math.floor((num % 100) / 10);
  const u = num % 10;

  let resultado = CENTENAS[c] ? CENTENAS[c] + ' ' : '';

  if (d === 1) {
    resultado += DIEZ_A_DIECINUEVE[u];
  } else if (d === 2) {
    resultado += VEINTE_A_VEINTINUEVE[u];
  } else if (d > 2) {
    resultado += DECENAS[d];
    if (u > 0) {
      resultado += ' Y ' + UNIDADES[u];
    }
  } else if (u > 0) {
    resultado += UNIDADES[u];
  }

  return resultado.trim();
}

function convertirSeccion(num: number, divisor: number, singular: string, plural: string): string {
  const cociente = Math.floor(num / divisor);
  if (cociente === 0) return '';

  let texto = '';
  if (cociente === 1 && divisor === 1000) {
    texto = 'MIL';
  } else if (cociente === 1) {
    texto = convertirCentenas(cociente) + ' ' + singular;
  } else {
    texto = convertirCentenas(cociente) + ' ' + plural;
  }

  return texto.trim();
}

export function numeroALiteralBolivianos(monto: number): string {
  if (isNaN(monto) || monto === 0) {
    return 'CERO CON 00/100 BOLIVIANOS';
  }

  const positivo = Math.abs(monto);
  const parteEntera = Math.floor(positivo);
  const centavos = Math.round((positivo - parteEntera) * 100);
  const centavosStr = centavos.toString().padStart(2, '0') + '/100';

  if (parteEntera === 0) {
    return `CERO CON ${centavosStr} BOLIVIANOS`;
  }

  let millones = Math.floor(parteEntera / 1_000_000);
  let miles = Math.floor((parteEntera % 1_000_000) / 1_000);
  let cientos = parteEntera % 1_000;

  let resultado = '';

  if (millones > 0) {
    if (millones === 1) {
      resultado += 'UN MILLÓN ';
    } else {
      resultado += convertirCentenas(millones) + ' MILLONES ';
    }
  }

  if (miles > 0) {
    if (miles === 1) {
      resultado += 'MIL ';
    } else {
      resultado += convertirCentenas(miles) + ' MIL ';
    }
  }

  if (cientos > 0) {
    resultado += convertirCentenas(cientos) + ' ';
  }

  resultado = resultado.trim();
  return `${resultado} CON ${centavosStr} BOLIVIANOS`;
}
