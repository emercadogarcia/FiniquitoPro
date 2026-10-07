import React from 'react';
import { BookOpen, FileText, CheckCircle2 } from 'lucide-react';

export const LegalGuideModal: React.FC = () => {
  const normativas = [
    {
      titulo: 'Decreto Supremo 28699 (1 de Mayo de 2006)',
      subtitulo: 'Plazo perentorio de 15 días calendario y Multa Patronal del 30%',
      articulos: [
        {
          num: 'Artículo 9 (Multa y Plazo de Finiquito)',
          texto:
            'En caso de producirse el despido del trabajador, el empleador deberá cancelar el finiquito en el plazo perentorio de quince (15) días calendario a partir de la fecha de desvinculación. Pasados los quince (15) días calendario, el empleador deberá pagar el monto total de la liquidación con una multa del treinta por ciento (30%) y el mantenimiento de valor en base a la Unidad de Fomento a la Vivienda (UFV).',
        },
        {
          num: 'Artículo 2 (Vacaciones y Duodécimas)',
          texto:
            'Las vacaciones no gozadas deberán ser canceladas en dinero al momento de la extinción de la relación laboral. Corresponde además el pago de duodécimas de vacación por la fracción del último año trabajado, calculadas sobre el salario promedio.',
        },
      ],
      tag: 'Crítico / Sancionatorio',
      badgeColor: 'border-rose-300 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300',
    },
    {
      titulo: 'Decreto Supremo 110 (1 de Mayo de 2009)',
      subtitulo: 'Indemnización a partir de 90 días y Desahucio por Despido Intempestivo',
      articulos: [
        {
          num: 'Artículo 1 y 2 (Indemnización por Tiempo de Servicios)',
          texto:
            'Garantiza el pago de la indemnización por tiempo de servicios a las trabajadoras y trabajadores, luego de haber cumplido más de noventa (90) días de trabajo continuo, tanto en caso de despido forzoso como de retiro voluntario (renuncia). La base de cálculo es un mes de sueldo por cada año de trabajo continuo y las duodécimas por meses y días.',
        },
        {
          num: 'Artículo 3 (Desahucio)',
          texto:
            'Si el empleador retira intempestivamente al trabajador sin causa legal justificada, está obligado al pago de tres (3) meses de sueldo íntegro por concepto de Desahucio.',
        },
      ],
      tag: 'Beneficios Básicos',
      badgeColor: 'border-emerald-300 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
    },
    {
      titulo: 'Decreto Supremo 522 (26 de Mayo de 2010)',
      subtitulo: 'Pago y Consolidación de Quinquenios',
      articulos: [
        {
          num: 'Artículo 1 al 4 (Cobro del Quinquenio)',
          texto:
            'Los trabajadores que hayan cumplido cinco (5) años continuos de trabajo en la misma empresa tienen el derecho exigible de solicitar la consolidación y pago de su quinquenio. El cobro del quinquenio no interrumpe la continuidad laboral ni la antigüedad para efectos de vacaciones o bono de antigüedad; únicamente se deduce de los años de indemnización acumulada a fin de evitar doble cobro.',
        },
      ],
      tag: 'Antigüedad Consolidada',
      badgeColor: 'border-blue-300 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300',
    },
    {
      titulo: 'Ley General del Trabajo (LGT) y D.S. 224',
      subtitulo: 'Régimen de Vacaciones, Salarios y Causales de Despido Justificado',
      articulos: [
        {
          num: 'Art. 33 del D.S. 224 (Escala de Vacaciones)',
          texto:
            'De 1 a 5 años de antigüedad: 15 días hábiles de vacación anual remunerada. De 5 a 10 años: 20 días hábiles. De 10 años en adelante: 30 días hábiles.',
        },
        {
          num: 'Artículo 16 LGT y Art. 9 del D.R.',
          texto:
            'Establece las causales de despido legal justificado (perjuicio material intencional, revelación de secretos, robo, injurias graves, abandono de trabajo por más de 6 días consecutivos sin justificación). En estos casos se pierde desahucio e indemnización, pero los derechos adquiridos (aguinaldo, vacaciones ganadas y sueldo devengado) son irrenunciables.',
        },
      ],
      tag: 'Marco General',
      badgeColor: 'border-purple-300 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300',
    },
    {
      titulo: 'Ley 065 de Pensiones y Gestora Pública',
      subtitulo: 'Retención Obligatoria del 12.71% / 13.04% sobre Sueldos Devengados',
      articulos: [
        {
          num: 'Estructura de Retención Laboral al SIP',
          texto:
            'Sobre todo sueldo devengado se retiene: 10% Aporte a la cuenta personal previsional + 1.71% Prima de riesgo común + 0.5% Aporte solidario del asegurado + 0.5% Comisión de administración de la Gestora Pública. Total = 12.71% a 13.04%. Los beneficios sociales (indemnización, desahucio, aguinaldo) son 100% exentos de aportes previsionales y RC-IVA.',
        },
      ],
      tag: 'Seguridad Social',
      badgeColor: 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Compendio Jurídico Laboral de Bolivia
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Base legal técnica aplicada en la liquidación de finiquitos ante el Ministerio de Trabajo, Empleo y Previsión Social
          del Estado Plurinacional de Bolivia.
        </p>
      </div>

      {/* Normativas Grid */}
      <div className="space-y-4">
        {normativas.map((norm, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  {norm.titulo}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {norm.subtitulo}
                </p>
              </div>
              <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${norm.badgeColor}`}>
                {norm.tag}
              </span>
            </div>

            <div className="space-y-2.5">
              {norm.articulos.map((art, aIdx) => (
                <div
                  key={aIdx}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-lg p-3 space-y-1"
                >
                  <h4 className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{art.num}</span>
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-5">
                    {art.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Requisitos Oficiales del Visado */}
      <div className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2.5">
          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Requisitos para la Visación Oficial del Finiquito en el Ministerio de Trabajo</span>
        </h3>
        <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
          <li>Impresión de tres (3) ejemplares del formulario de finiquito oficial debidamente firmados.</li>
          <li>Fotocopia simple de la Cédula de Identidad del trabajador y del representante legal.</li>
          <li>Fotocopia de las tres últimas boletas de pago que acrediten el sueldo promedio indemnizable.</li>
          <li>Comprobante de pago o depósito bancario / cheque a nombre del trabajador.</li>
          <li>Boleta de depósito bancario de la tasa ministerial vigente para visación.</li>
        </ul>
      </div>
    </div>
  );
};
