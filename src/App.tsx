import React, { useState, useEffect, useMemo } from 'react';
import { FiniquitoParams } from './types/finiquito';
import { calcularFiniquito } from './utils/calculator';
import { generarFiniquitoMarkdown } from './utils/markdownGenerator';
import { generarFiniquitoPDF } from './utils/pdfGenerator';
import { 
  EMPTY_FINIQUITO_PARAMS, 
  CASO_DESPIDO_INTEMPESTIVO, 
  CASO_RETIRO_VOLUNTARIO, 
  CASO_MORA_DS28699 
} from './utils/sampleData';

import { Navbar } from './components/Navbar';
import { FiniquitoForm } from './components/FiniquitoForm';
import { HojaFiniquito } from './components/HojaFiniquito';
import { ModalWhatsApp } from './components/ModalWhatsApp';
import { ManualModal } from './components/ManualModal';
import { LegalGuideModal } from './components/LegalGuideModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

export default function App() {
  // 1. Estado de Tema (Claro / Oscuro)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('finiquito_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('finiquito_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 2. Estado de Switch de Base Legal
  const [mostrarLeyes, setMostrarLeyes] = useState(false);
  const toggleLeyes = () => setMostrarLeyes((prev) => !prev);

  // 3. Estado de Parámetros del Finiquito (inicia limpio y vacío con placeholders de guía)
  const [params, setParams] = useState<FiniquitoParams>(EMPTY_FINIQUITO_PARAMS);

  // 4. Modales y Notificaciones
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // 5. Cómputo Reactivo en Vivo
  const res = useMemo(() => {
    return calcularFiniquito(params);
  }, [params]);

  const handleParamChange = <K extends keyof FiniquitoParams>(
    field: K,
    value: FiniquitoParams[K]
  ) => {
    setParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Limpiar formulario
  const handleLimpiar = () => {
    setParams(EMPTY_FINIQUITO_PARAMS);
    showToast('Formulario vaciado. Ingrese los datos de su caso.');
  };

  // Cargar presets de ejemplo
  const handleCargarEjemplo = (tipo: 'despido' | 'renuncia' | 'mora') => {
    if (tipo === 'despido') {
      setParams(CASO_DESPIDO_INTEMPESTIVO);
      showToast('Cargado ejemplo: Despido Forzoso (con Desahucio)');
    } else if (tipo === 'renuncia') {
      setParams(CASO_RETIRO_VOLUNTARIO);
      showToast('Cargado ejemplo: Retiro Voluntario (con Quinquenio previo)');
    } else if (tipo === 'mora') {
      setParams(CASO_MORA_DS28699);
      showToast('Cargado ejemplo: Mora D.S. 28699 (Multa 30% patronal)');
    }
  };

  // Exportar PDF
  const handleExportarPDF = () => {
    try {
      const doc = generarFiniquitoPDF(params, res, mostrarLeyes);
      const ci = params.ciTrabajador || 'Liquidacion';
      doc.save(`Finiquito_${ci}.pdf`);
      showToast('PDF generado exitosamente');
    } catch (err) {
      console.error(err);
      showToast('Error al generar PDF');
    }
  };

  // Descargar Markdown
  const handleDescargarMD = () => {
    try {
      const md = generarFiniquitoMarkdown(params, res, mostrarLeyes);
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      const ci = params.ciTrabajador || 'Liquidacion';
      link.download = `Finiquito_${ci}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      showToast('Archivo Markdown (.md) descargado');
    } catch (err) {
      console.error(err);
      showToast('Error al descargar Markdown');
    }
  };

  // Copiar Markdown al portapapeles
  const handleCopiarMD = async () => {
    try {
      const md = generarFiniquitoMarkdown(params, res, mostrarLeyes);
      await navigator.clipboard.writeText(md);
      setCopiado(true);
      showToast('¡Copiado al portapapeles!');
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error(err);
      showToast('Error al copiar');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Header Minimalista con Switch de Leyes, Manual y Tema */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        mostrarLeyes={mostrarLeyes}
        onToggleLeyes={toggleLeyes}
        onOpenManual={() => setIsManualModalOpen(true)}
        onOpenLegalCompendio={() => setIsLegalModalOpen(true)}
      />

      {/* Contenedor Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Formulario de Entrada (5 cols) */}
          <div className="lg:col-span-5">
            <FiniquitoForm
              params={params}
              onChange={handleParamChange}
              onCalcular={() => {
                showToast('Finiquito recalculado conforme a ley');
              }}
              onCargarEjemplo={handleCargarEjemplo}
              onLimpiar={handleLimpiar}
            />
          </div>

          {/* Columna Derecha: Vista Previa y Acciones (7 cols) */}
          <div className="lg:col-span-7">
            <HojaFiniquito
              params={params}
              res={res}
              mostrarLeyes={mostrarLeyes}
              onAbrirWhatsApp={() => setIsWhatsAppModalOpen(true)}
              onDescargarMD={handleDescargarMD}
              onExportarPDF={handleExportarPDF}
              onCopiarMD={handleCopiarMD}
              copiado={copiado}
            />
          </div>
        </div>
      </main>

      {/* Modal Enviar a WhatsApp */}
      <ModalWhatsApp
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        params={params}
        res={res}
        mostrarLeyes={mostrarLeyes}
      />

      {/* Modal Manual Paso a Paso (Descargable en Markdown) */}
      <ManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />

      {/* Modal Compendio Legal Completo */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Compendio Jurídico Laboral de Bolivia
              </h3>
              <button
                onClick={() => setIsLegalModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800"
              >
                Cerrar
              </button>
            </div>
            <LegalGuideModal />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-slate-800 text-white text-xs px-4 py-2 rounded-full shadow-lg border border-slate-700 animate-in fade-in duration-200">
          {toastMessage}
        </div>
      )}

      {/* Footer Profesional 3MGLabs */}
      <Footer />

      {/* Botón Flotante WhatsApp para Soporte / Asesoría */}
      <WhatsAppFloatingButton />
    </div>
  );
}
