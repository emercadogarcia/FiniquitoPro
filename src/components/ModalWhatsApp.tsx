import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { FiniquitoParams, LiquidacionResult } from '../types/finiquito';

interface ModalWhatsAppProps {
  isOpen: boolean;
  onClose: () => void;
  params: FiniquitoParams;
  res: LiquidacionResult;
  mostrarLeyes: boolean;
}

export const ModalWhatsApp: React.FC<ModalWhatsAppProps> = ({
  isOpen,
  onClose,
  params,
  res,
  mostrarLeyes,
}) => {
  const [numero, setNumero] = useState('59170203103');

  if (!isOpen) return null;

  const fmt = (n: number) =>
    n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleEnviar = () => {
    const cleanNum = numero.replace(/\D/g, '');
    if (!cleanNum) {
      return;
    }

    const t = params.nombreTrabajador || 'TRABAJADOR';
    const ci = params.ciTrabajador || '-';
    const e = params.razonSocial || 'EMPLEADOR';
    const liq = fmt(res.liquido);
    const mot = params.motivoRetiro === 'despido' ? 'DESPIDO FORZOSO / INTEMPESTIVO' : 'RETIRO VOLUNTARIO';
    const ind = fmt(res.indemnizacion);
    const des = fmt(res.desahucio);
    const vac = fmt(res.pagoVacaciones);

    let msg = `*RESUMEN OFICIAL DE FINIQUITO LABORAL (Bolivia)*\n`;
    msg += `*3MGLabs.com - Plataforma LegalTech*\n\n`;
    msg += `👤 *Trabajador:* ${t} (CI: ${ci})\n`;
    msg += `🏢 *Empresa:* ${e}\n`;
    msg += `📌 *Motivo:* ${mot}\n\n`;
    msg += `💵 *Desahucio:* Bs. ${des}\n`;
    msg += `💼 *Indemnización:* Bs. ${ind}\n`;
    msg += `🏖️ *Vacaciones no gozadas:* Bs. ${vac}\n`;
    msg += `💰 *TOTAL LÍQUIDO A PERCIBIR:* *Bs. ${liq}*\n\n`;

    if (mostrarLeyes) {
      msg += `⚖️ *Normativa:* Ley General del Trabajo, D.S. 110, D.S. 522 y D.S. 28699 (Plazo perentorio de 15 días calendario bajo sanción de 30% de multa patronal).\n\n`;
    }

    msg += `_Generado mediante FiniquitoPro de 3MGLabs.com (Dirigido por Edgar Mercado G.)_`;

    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Enviar Finiquito por WhatsApp
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ingresa el número destinatario
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
            Número de Celular (con código de país)
          </label>
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden focus-within:ring-1 focus-within:ring-emerald-500">
            <span className="bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700">
              +
            </span>
            <input
              type="text"
              id="numWhatsappDestino"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="59170203103"
              className="w-full px-2.5 py-1.5 text-xs outline-none bg-white dark:bg-slate-850 dark:text-white font-mono"
            />
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            Ejemplo: 59170203103 (Bolivia)
          </p>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleEnviar}
            className="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium shadow-sm transition"
          >
            Enviar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};
