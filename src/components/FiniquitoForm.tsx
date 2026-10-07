import React from 'react';
import { Calculator, RotateCcw, Calendar, HelpCircle } from 'lucide-react';
import { FiniquitoParams, MotivoRetiro } from '../types/finiquito';

interface FiniquitoFormProps {
  params: FiniquitoParams;
  onChange: <K extends keyof FiniquitoParams>(field: K, value: FiniquitoParams[K]) => void;
  onCalcular: () => void;
  onCargarEjemplo?: (tipo: 'despido' | 'renuncia' | 'mora') => void;
  onLimpiar?: () => void;
}

export const FiniquitoForm: React.FC<FiniquitoFormProps> = ({
  params,
  onChange,
  onCalcular,
  onCargarEjemplo,
  onLimpiar,
}) => {
  const setHoyRetiro = () => {
    const hoy = new Date().toISOString().split('T')[0];
    onChange('fechaRetiro', hoy);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Parámetros de Liquidación
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ingresa los datos para computar los importes conforme a ley.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {onLimpiar && (
            <button
              type="button"
              onClick={onLimpiar}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1"
              title="Limpiar todos los campos del formulario"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Limpiar</span>
            </button>
          )}

          {onCargarEjemplo && (
            <>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline ml-1">Ejemplos:</span>
              <button
                type="button"
                onClick={() => onCargarEjemplo('despido')}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="Cargar ejemplo con despido forzoso y 3 meses de desahucio"
              >
                Despido
              </button>
              <button
                type="button"
                onClick={() => onCargarEjemplo('renuncia')}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="Cargar ejemplo de renuncia voluntaria con quinquenio cancelado"
              >
                Renuncia
              </button>
              <button
                type="button"
                onClick={() => onCargarEjemplo('mora')}
                className="text-[10px] px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 transition"
                title="Cargar ejemplo con plazo vencido mayor a 15 días (multa 30%)"
              >
                Mora 30%
              </button>
            </>
          )}
        </div>
      </div>

      <form
        id="finiquitoForm"
        className="space-y-4 text-xs"
        onSubmit={(e) => {
          e.preventDefault();
          onCalcular();
        }}
      >
        {/* Identificación General */}
        <div className="space-y-3">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
            Identificación General
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Nombre Trabajador</label>
              <input
                type="text"
                id="nombreTrabajador"
                value={params.nombreTrabajador}
                onChange={(e) => onChange('nombreTrabajador', e.target.value)}
                placeholder="Ej: Juan Carlos Pérez Mamani"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">C.I.</label>
              <input
                type="text"
                id="ciTrabajador"
                value={params.ciTrabajador}
                onChange={(e) => onChange('ciTrabajador', e.target.value)}
                placeholder="Ej: 4543848 LP"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Cargo / Puesto</label>
              <input
                type="text"
                id="cargoTrabajador"
                value={params.cargoTrabajador}
                onChange={(e) => onChange('cargoTrabajador', e.target.value)}
                placeholder="Ej: Coordinador de Desarrollo"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Empresa / Razón Social</label>
              <input
                type="text"
                id="razonSocial"
                value={params.razonSocial}
                onChange={(e) => onChange('razonSocial', e.target.value)}
                placeholder="Ej: PROMEDICAL S.A."
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Relación Laboral */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
            Relación Laboral y Tiempo
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Fecha Ingreso</label>
              <input
                type="date"
                id="fechaIngreso"
                value={params.fechaIngreso}
                onChange={(e) => onChange('fechaIngreso', e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-slate-600 dark:text-slate-400">Fecha Retiro</label>
                <button
                  type="button"
                  onClick={setHoyRetiro}
                  className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                  title="Fijar con fecha actual de hoy"
                >
                  Hoy
                </button>
              </div>
              <input
                type="date"
                id="fechaRetiro"
                value={params.fechaRetiro}
                onChange={(e) => onChange('fechaRetiro', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Motivo Desvinculación</label>
              <select
                id="motivoRetiro"
                value={params.motivoRetiro}
                onChange={(e) => onChange('motivoRetiro', e.target.value as MotivoRetiro)}
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="despido">Despido Forzoso / Intempestivo (Con Desahucio)</option>
                <option value="voluntario">Retiro Voluntario (Sin Desahucio)</option>
                <option value="conclusion">Conclusión de Contrato (Sin Desahucio)</option>
                <option value="justificado">Despido Justificado Art. 16 LGT</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Quinquenios Pagados</label>
              <input
                type="number"
                id="quinquenios"
                min="0"
                max="8"
                value={params.quinquenios === 0 ? '' : params.quinquenios}
                onChange={(e) => onChange('quinquenios', parseInt(e.target.value) || 0)}
                placeholder="Ej: 0 (o número pagado)"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Remuneración */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
            Total Ganado Últimos 3 Meses (Para Promedio)
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Mes 1 (Bs)</label>
              <input
                type="number"
                step="0.01"
                id="sueldo1"
                value={params.sueldo1 === 0 ? '' : params.sueldo1}
                onChange={(e) => onChange('sueldo1', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 8500.00"
                className="w-full px-2 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Mes 2 (Bs)</label>
              <input
                type="number"
                step="0.01"
                id="sueldo2"
                value={params.sueldo2 === 0 ? '' : params.sueldo2}
                onChange={(e) => onChange('sueldo2', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 8500.00"
                className="w-full px-2 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Mes 3 (Bs)</label>
              <input
                type="number"
                step="0.01"
                id="sueldo3"
                value={params.sueldo3 === 0 ? '' : params.sueldo3}
                onChange={(e) => onChange('sueldo3', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 8800.00"
                className="w-full px-2 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Vacaciones y Días Trabajados */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
            Vacaciones y Días Trabajados
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Días Saldo Consolidado</label>
              <input
                type="number"
                step="0.01"
                id="vacConsolidadas"
                value={params.vacConsolidadas === 0 ? '' : params.vacConsolidadas}
                onChange={(e) => onChange('vacConsolidadas', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 5.00 (saldo acumulado)"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Días Duodécima Actual</label>
              <input
                type="number"
                step="0.01"
                id="vacDuodecimas"
                value={params.vacDuodecimas === 0 ? '' : params.vacDuodecimas}
                onChange={(e) => onChange('vacDuodecimas', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 2.50 (duodécima fracción)"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Días Trabajados Mes Retiro</label>
              <input
                type="number"
                min="0"
                max="30"
                id="diasMesRetiro"
                value={params.diasMesRetiro === 0 ? '' : params.diasMesRetiro}
                onChange={(e) => onChange('diasMesRetiro', parseInt(e.target.value) || 0)}
                placeholder="Ej: 15 (días del mes)"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-400 mb-1">Otros Descuentos Autorizados (Bs)</label>
              <input
                type="number"
                step="0.01"
                id="otrosDescuentos"
                value={params.otrosDescuentos === 0 ? '' : params.otrosDescuentos}
                onChange={(e) => onChange('otrosDescuentos', parseFloat(e.target.value) || 0)}
                placeholder="Ej: 0.00 (anticipos/préstamos)"
                className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Régimen Tributario RC-IVA */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
            Información Impositiva (RC-IVA)
          </h3>
          <div>
            <label className="block text-slate-600 dark:text-slate-400 mb-1">
              Saldo a Favor RC-IVA del Trabajador (Bs)
            </label>
            <input
              type="number"
              step="0.01"
              id="saldoRcIva"
              value={params.saldoRcIva === 0 ? '' : params.saldoRcIva}
              onChange={(e) => onChange('saldoRcIva', parseFloat(e.target.value) || 0)}
              placeholder="Ej: 250.00 (saldo F-110 a favor)"
              className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-1 focus:ring-blue-500 outline-none font-mono"
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              Saldo en cuenta corriente para compensar retención de vacaciones y sueldo pendiente.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCalcular}
          className="w-full py-2.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white rounded-xl font-medium transition flex items-center justify-center space-x-2 shadow-sm text-sm"
        >
          <Calculator className="w-4 h-4" />
          <span>Calcular Finiquito</span>
        </button>
      </form>
    </div>
  );
};
