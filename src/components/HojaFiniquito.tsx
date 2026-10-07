import React from 'react';
import { Send, FileText, Download, Copy, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { FiniquitoParams, LiquidacionResult } from '../types/finiquito';

interface HojaFiniquitoProps {
  params: FiniquitoParams;
  res: LiquidacionResult;
  mostrarLeyes: boolean;
  onAbrirWhatsApp: () => void;
  onDescargarMD: () => void;
  onExportarPDF: () => void;
  onCopiarMD: () => void;
  copiado: boolean;
}

export const HojaFiniquito: React.FC<HojaFiniquitoProps> = ({
  params,
  res,
  mostrarLeyes,
  onAbrirWhatsApp,
  onDescargarMD,
  onExportarPDF,
  onCopiarMD,
  copiado,
}) => {
  const fmt = (n: number) =>
    n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const motTexto = params.motivoRetiro === 'despido'
    ? 'DESPIDO FORZOSO / INTEMPESTIVO'
    : params.motivoRetiro === 'voluntario'
    ? 'RETIRO VOLUNTARIO'
    : params.motivoRetiro === 'conclusion'
    ? 'CONCLUSIÓN DE CONTRATO'
    : 'DESPIDO JUSTIFICADO (ART. 16 LGT)';

  return (
    <div className="space-y-4">
      {/* Barra de Acciones de Exportación */}
      <div className="flex flex-wrap items-center justify-between bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm gap-2 transition-colors">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
          Cálculo Exacto de Ley
        </span>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onAbrirWhatsApp}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition flex items-center space-x-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar a WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onCopiarMD}
            className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition flex items-center space-x-1.5"
            title="Copiar en formato Markdown"
          >
            {copiado ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiado ? 'Copiado' : 'Copiar .MD'}</span>
          </button>

          <button
            type="button"
            onClick={onDescargarMD}
            className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Descargar .MD</span>
          </button>

          <button
            type="button"
            onClick={onExportarPDF}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Documento Formulario Finiquito (Formato Oficial) */}
      <div
        id="hojaFiniquito"
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm font-mono text-[11px] leading-relaxed text-slate-900 dark:text-slate-100 transition-colors"
      >
        {/* Encabezado Oficial */}
        <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
          <h1 className="font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
            Ministerio de Trabajo, Empleo y Previsión Social
          </h1>
          <h2 className="font-bold text-sm tracking-widest mt-0.5 text-slate-900 dark:text-white">
            FORMULARIO DE FINIQUITO
          </h2>
          <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-1">
            Liquidación Oficial de Beneficios Sociales y Derechos Adquiridos
          </p>
        </div>

        {/* I. Datos Generales */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
          <div className="font-bold text-[10px] text-slate-600 dark:text-slate-400 uppercase mb-1">
            I. DATOS GENERALES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            <div>
              <span className="text-slate-500 dark:text-slate-400">EMPRESA:</span>{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {params.razonSocial || <span className="text-slate-400 italic">[Nombre de la Empresa]</span>}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">TRABAJADOR:</span>{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {params.nombreTrabajador || <span className="text-slate-400 italic">[Nombre del Trabajador]</span>}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">CARGO:</span>{' '}
              <span>{params.cargoTrabajador || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">C.I.:</span>{' '}
              <span>{params.ciTrabajador || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">FECHA INGRESO:</span>{' '}
              <span>{res.antiguedad.fIngresoFormateada}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">FECHA RETIRO:</span>{' '}
              <span>{res.antiguedad.fRetiroFormateada}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400">MOTIVO:</span>{' '}
              <span className="font-semibold text-rose-700 dark:text-rose-400">{motTexto}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400">TIEMPO TOTAL SERVICIO:</span>{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {res.antiguedad.anios} Años, {res.antiguedad.meses} Meses, {res.antiguedad.dias} Días
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 dark:text-slate-400">TIEMPO INDEMNIZABLE (Deduciendo Quinquenios):</span>{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {res.antiguedad.aniosComputables} Años, {res.antiguedad.meses} Meses, {res.antiguedad.dias} Días
              </span>
            </div>
          </div>
        </div>

        {/* II. Remuneración Promedio */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
          <div className="flex flex-wrap justify-between items-center mb-1 gap-1">
            <span className="font-bold text-[10px] text-slate-600 dark:text-slate-400 uppercase">
              II. REMUNERACIÓN PROMEDIO INDEMNIZABLE
            </span>
            {mostrarLeyes && (
              <span className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                Art. 19 LGT &bull; D.S. 1592 (Base promedio 3 últimos meses)
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-1 text-[10px]">
            <div>Mes 1: Bs. <span>{fmt(params.sueldo1)}</span></div>
            <div>Mes 2: Bs. <span>{fmt(params.sueldo2)}</span></div>
            <div>Mes 3: Bs. <span>{fmt(params.sueldo3)}</span></div>
          </div>
          <div className="flex justify-between font-semibold bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded">
            <span>SUELDO PROMEDIO INDEMNIZABLE:</span>
            <span>Bs. <span>{fmt(res.promedio)}</span></span>
          </div>
        </div>

        {/* III. Beneficios Sociales y Conceptos a Liquidar */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
          <div className="font-bold text-[10px] text-slate-600 dark:text-slate-400 uppercase mb-2">
            III. BENEFICIOS SOCIALES Y CONCEPTOS A LIQUIDAR
          </div>
          <table className="w-full text-left">
            <tbody className="space-y-1">
              <tr className="border-b border-dotted border-slate-200 dark:border-slate-800">
                <td className="py-1">
                  A. Desahucio (3 meses de sueldo)
                  {mostrarLeyes && (
                    <div className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                      Art. 12 y 13 LGT; D.S. 110 (100% exento de SIP y RC-IVA)
                    </div>
                  )}
                </td>
                <td className="text-right py-1 font-semibold whitespace-nowrap">
                  Bs. <span>{fmt(res.desahucio)}</span>
                </td>
              </tr>
              <tr className="border-b border-dotted border-slate-200 dark:border-slate-800">
                <td className="py-1">
                  B. Indemnización por tiempo de servicios
                  {mostrarLeyes && (
                    <div className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                      Art. 13 LGT; D.S. 110; D.S. 522 (1 sueldo por año y duodécimas)
                    </div>
                  )}
                </td>
                <td className="text-right py-1 font-semibold whitespace-nowrap">
                  Bs. <span>{fmt(res.indemnizacion)}</span>
                </td>
              </tr>
              <tr className="border-b border-dotted border-slate-200 dark:border-slate-800">
                <td className="py-1">
                  C. Aguinaldo de Navidad (Duodécimas de gestión)
                  {mostrarLeyes && (
                    <div className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                      Ley 18/12/1944; D.S. 229 (Exento de impuestos y aportes)
                    </div>
                  )}
                </td>
                <td className="text-right py-1 font-semibold whitespace-nowrap">
                  Bs. <span>{fmt(res.aguinaldo)}</span>
                </td>
              </tr>
              <tr className="border-b border-dotted border-slate-200 dark:border-slate-800">
                <td className="py-1">
                  D. Vacaciones no gozadas ({res.totalDiasVac.toFixed(2)} días)
                  {mostrarLeyes && (
                    <div className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                      Art. 33 D.R. LGT; D.S. 12059; D.S. 28699 Art. 8 (Gravado RC-IVA)
                    </div>
                  )}
                </td>
                <td className="text-right py-1 font-semibold whitespace-nowrap">
                  Bs. <span>{fmt(res.pagoVacaciones)}</span>
                </td>
              </tr>
              <tr className="border-b border-dotted border-slate-200 dark:border-slate-800">
                <td className="py-1">
                  E. Sueldo devengado mes de retiro ({params.diasMesRetiro} días)
                  {mostrarLeyes && (
                    <div className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                      Art. 52 y 53 LGT (Sujeto a aportes SIP y gravado RC-IVA)
                    </div>
                  )}
                </td>
                <td className="text-right py-1 font-semibold whitespace-nowrap">
                  Bs. <span>{fmt(res.devengado)}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between font-bold text-slate-800 dark:text-white mt-2 pt-1 border-t border-slate-200 dark:border-slate-700">
            <span>TOTAL BENEFICIOS Y HABERES:</span>
            <span>Bs. <span>{fmt(res.totalBruto)}</span></span>
          </div>
        </div>

        {/* IV. Deducciones */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
          <div className="font-bold text-[10px] text-slate-600 dark:text-slate-400 uppercase mb-1">
            IV. DEDUCCIONES Y RETENCIONES DE LEY
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-300 py-0.5">
            <div>
              <span>1. Aportes Laborales SIP / Pensiones sobre haber devengado</span>
              {mostrarLeyes && (
                <div className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                  Ley 065: 10% Vejez + 1.71% Riesgo + 0.5% Comisión + 0.5% Solidario (+ ANS si aplica)
                </div>
              )}
            </div>
            <span className="font-semibold whitespace-nowrap">Bs. <span>{fmt(res.aporteSIP)}</span></span>
          </div>

          <div className="flex justify-between text-slate-600 dark:text-slate-300 py-0.5">
            <span>2. Otros cargos / Descuentos autorizados:</span>
            <span className="font-semibold whitespace-nowrap">Bs. <span>{fmt(res.otrosDescuentos)}</span></span>
          </div>

          <div className="flex justify-between text-slate-600 dark:text-slate-300 py-0.5">
            <div>
              <span>3. Retención RC-IVA (Sueldo + Vacaciones)</span>
              {mostrarLeyes && (
                <div className="text-[9px] text-blue-600 dark:text-blue-400 font-sans">
                  Ley 843; D.S. 21531. Descontado contra saldo a favor presentado.
                </div>
              )}
            </div>
            <div className="text-right">
              <span className="font-semibold whitespace-nowrap">Bs. <span>{fmt(res.retencionEfectivaRcIva)}</span></span>
              {res.rcIvaCubiertoPorSaldo && (
                <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-sans font-medium">
                  Cubierto con saldo a favor (Saldo: Bs. {fmt(params.saldoRcIva)})
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between font-semibold mt-1 pt-1 border-t border-slate-200 dark:border-slate-700">
            <span>TOTAL DEDUCCIONES:</span>
            <span>Bs. <span>{fmt(res.totalDeducciones)}</span></span>
          </div>
        </div>

        {/* V. Líquido Pagable */}
        <div className="bg-slate-900 text-white dark:bg-slate-800 p-3.5 rounded-lg mb-4 flex justify-between items-center shadow-xs">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400">Total Líquido Pagable</div>
            <div className="font-bold text-sm">A FAVOR DEL TRABAJADOR</div>
            <div className="text-[10px] text-slate-300 italic mt-0.5 max-w-sm">
              SON: {res.liquidoLiteral}
            </div>
          </div>
          <div className="text-right font-bold text-base sm:text-lg tracking-tight text-emerald-400 tabular-nums">
            Bs. <span>{fmt(res.liquido)}</span>
          </div>
        </div>

        {/* Alerta Legal D.S. 28699 Art. 9 */}
        {res.plazoExcedido ? (
          <div className="p-3 mb-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 text-[10px] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>ALERTA D.S. 28699 Art. 9: PLAZO DE 15 DÍAS VENCIDO (+{res.diasDesdeRetiro - 15} DÍAS MORA)</span>
            </div>
            <p>
              El empleador se encuentra en mora patronal. Corresponde aplicar la{' '}
              <strong>Multa del 30%</strong> sobre el total del finiquito:{' '}
              <strong className="font-mono">Bs. {fmt(res.multa30Porciento)}</strong>.
            </p>
            <div className="pt-1 border-t border-rose-200 dark:border-rose-900/60 flex justify-between items-center font-bold">
              <span>TOTAL EXIGIBLE EN MORA (Finiquito + Multa 30% más UFVs):</span>
              <span className="font-mono text-xs text-rose-700 dark:text-rose-300">
                Bs. {fmt(res.totalConMulta30)}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-2.5 mb-4 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Plazo Legal D.S. 28699: En curso ({res.diasRestantesPlazo} días restantes de 15 calendario).</span>
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Sin Mora</span>
          </div>
        )}

        {/* Firmas */}
        <div className="grid grid-cols-2 gap-8 text-center pt-6 border-t border-slate-200 dark:border-slate-800 text-[9px] text-slate-500 dark:text-slate-400">
          <div>
            <div className="border-b border-slate-300 dark:border-slate-700 w-4/5 mx-auto mb-1"></div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              {params.nombreTrabajador || 'TRABAJADOR'}
            </p>
            <p>C.I. <span>{params.ciTrabajador || '-'}</span></p>
          </div>
          <div>
            <div className="border-b border-slate-300 dark:border-slate-700 w-4/5 mx-auto mb-1"></div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              {params.razonSocial || 'EMPLEADOR'}
            </p>
            <p>FIRMA Y SELLO PATRONAL</p>
          </div>
        </div>

        {/* Advertencia de Ley */}
        <div className="mt-6 text-[8px] text-slate-400 dark:text-slate-500 text-center leading-normal">
          <strong>Plazo Legal de Cancelación:</strong> De acuerdo con el Art. 9 del D.S. N° 28699, el empleador debe cancelar el presente finiquito en el plazo perentorio de 15 días calendario a partir del retiro, bajo apercibimiento de multa del 30% más mantenimiento de valor en UFVs.
        </div>
      </div>
    </div>
  );
};
