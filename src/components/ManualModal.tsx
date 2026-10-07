import React, { useState } from 'react';
import { BookOpen, Download, Copy, Check, X, ArrowDown, FileText, CheckCircle2 } from 'lucide-react';
import { generarManualMarkdown, descargarManualMarkdown } from '../utils/manualGenerator';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [copiado, setCopiado] = useState(false);

  if (!isOpen) return null;

  const handleCopiar = async () => {
    try {
      const md = generarManualMarkdown();
      await navigator.clipboard.writeText(md);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch (e) {
      console.error(e);
    }
  };

  const pasos = [
    {
      numero: '01',
      titulo: 'Identificación Legal de las Partes',
      desc: 'Ingrese el Nombre Completo y Cédula de Identidad (C.I.) del trabajador, su cargo oficial, y la Razón Social o Empresa empleadora.',
      tips: 'Ejemplo: Edgar Mercado Garcia · C.I. 4543848 LP · PROMEDICAL S.A.',
    },
    {
      numero: '02',
      titulo: 'Relación Laboral y Cómputo de Antigüedad',
      desc: 'Registre la Fecha de Ingreso y Fecha de Retiro. Seleccione el motivo de desvinculación (Despido forzoso genera 3 meses de desahucio; retiro voluntario no genera desahucio pero sí indemnización si superó 90 días). Si cobró quinquenios previos bajo el D.S. 522, indíquelos para deducir los años ya pagados.',
      tips: 'Base comercial: 360 días por año y 30 días por mes. 1 quinquenio = 5 años deducidos.',
    },
    {
      numero: '03',
      titulo: 'Total Ganado Últimos 3 Meses (Sueldo Promedio)',
      desc: 'Conforme al Art. 19 de la LGT y D.S. 1592, registre el total ganado de los tres meses anteriores al cese para obtener el Sueldo Promedio Indemnizable y el Salario Diario (Promedio / 30).',
      tips: 'Incluye sueldo básico, bono de antigüedad y horas extras. No incluye aguinaldos ni viáticos con rendición.',
    },
    {
      numero: '04',
      titulo: 'Liquidación de Beneficios Sociales y Derechos',
      desc: 'El sistema computa automáticamente: Desahucio (3 sueldos si es forzoso), Indemnización (1 mes por año y duodécimas), Aguinaldo (duodécimas desde el 1 de enero), Vacaciones no gozadas (días consolidados + duodécimas D.S. 28699) y Sueldo devengado del mes en curso.',
      tips: 'Las vacaciones y aguinaldos son derechos adquiridos e irrenunciables, exigibles en cualquier causal de retiro.',
    },
    {
      numero: '05',
      titulo: 'Deducciones de Ley y Régimen Impositivo (RC-IVA)',
      desc: 'Se descuentan los aportes laborales obligatorios al SIP / Gestora Pública (12.71% sobre el sueldo devengado). Para el RC-IVA, si el trabajador tiene saldo a favor acumulado en su cuenta fiscal (F-110), dicho saldo compensa automáticamente la retención.',
      tips: 'La compensación de vacaciones no lleva aporte a la Gestora, pero sí está alcanzada por el RC-IVA.',
    },
    {
      numero: '06',
      titulo: 'Total Líquido Pagable y Alerta de Plazo Fatal (15 Días)',
      desc: 'Verifique el importe líquido a percibir tanto en cifras como en su transcripción literal oficial. Conforme al Art. 9 del D.S. 28699, el empleador tiene un plazo fatal de 15 días calendario; en caso de mora, corre de pleno derecho la Multa Patronal del 30% más reajuste en UFVs.',
      tips: 'El indicador dinámico le alertará si el trámite se encuentra dentro del plazo o si ha incurrido en mora patronal.',
    },
    {
      numero: '07',
      titulo: 'Exportación y Trámite de Visación Ministerial',
      desc: 'Descargue el Formulario Oficial en PDF vectorial (imprimible en 1 hoja limpia) o en formato Markdown estructurado. Se deben imprimir 3 ejemplares para la firma del trabajador y del empleador, y su posterior presentación ante la Jefatura Departamental de Trabajo para su visado legal.',
      tips: 'Adjunte fotocopia de C.I., 3 últimas boletas de pago y comprobante del depósito o cheque bancario a nombre del trabajador.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        {/* Header Modal */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-850">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Manual Oficial: Paso a Paso para el Cálculo de Finiquitos</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guía técnica y procedimental de 3MGLabs.com conforme a la normativa laboral de Bolivia
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCopiar}
              title="Copiar texto del manual en formato Markdown"
              className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition flex items-center space-x-1"
            >
              {copiado ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiado ? 'Copiado' : 'Copiar .MD'}</span>
            </button>

            <button
              type="button"
              onClick={descargarManualMarkdown}
              title="Descargar manual completo en archivo .md"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Manual (.MD)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-600 dark:text-slate-300">
          {/* Banner de inicio */}
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 text-blue-900 dark:text-blue-200 space-y-1">
            <div className="font-semibold text-sm text-blue-950 dark:text-blue-100 flex items-center gap-1.5">
              <span>¿Cómo utilizar esta calculadora para emitir un Finiquito legalmente válido?</span>
            </div>
            <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-300">
              Siga los 7 pasos secuenciales detallados a continuación. Cada rubro cuenta con validación matemática
              automática que aplica las deducciones y beneficios exactos de la Ley General del Trabajo y decretos conexos.
            </p>
          </div>

          {/* Pasos Grid */}
          <div className="space-y-4">
            {pasos.map((paso) => (
              <div
                key={paso.numero}
                className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 space-y-2 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center font-mono text-xs shrink-0 shadow-xs">
                    {paso.numero}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Paso {paso.numero}: {paso.titulo}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 pl-10">
                  {paso.desc}
                </p>
                <div className="pl-10 pt-1">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span className="font-bold text-blue-600 dark:text-blue-400">Guía Práctica: </span>
                    {paso.tips}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Documentos a presentar ante el Ministerio */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-850 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Checklist de Documentos para la Visación Oficial</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li>Tres (3) ejemplares originales del Finiquito impresos y debidamente firmados.</li>
              <li>Fotocopia simple de la Cédula de Identidad del trabajador y del Representante Legal.</li>
              <li>Fotocopia de las 3 últimas boletas de pago de haberes.</li>
              <li>Comprobante de depósito bancario, transferencia o cheque a nombre del trabajador.</li>
              <li>Boleta de depósito de la tasa ministerial correspondiente para visación.</li>
            </ul>
          </div>
        </div>

        {/* Footer Modal con acción de descarga */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Created by <strong>3MGLabs.com</strong> &bull; Dirigido por Edgar Mercado G.
          </span>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={descargarManualMarkdown}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition flex items-center space-x-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Manual Completo (.MD)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
