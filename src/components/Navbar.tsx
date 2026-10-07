import React from 'react';
import { Sun, Moon, BookOpen, HelpCircle } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  mostrarLeyes: boolean;
  onToggleLeyes: () => void;
  onOpenManual: () => void;
  onOpenLegalCompendio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  mostrarLeyes,
  onToggleLeyes,
  onOpenManual,
  onOpenLegalCompendio,
}) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Lockup - Matching image.png */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm select-none shrink-0">
            3M
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white tracking-tight text-lg">
              Finiquito<span className="text-blue-600 dark:text-blue-400">Pro</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 hidden sm:inline">
              Legislación Laboral Boliviana
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Botón Manual Paso a Paso */}
          <button
            type="button"
            onClick={onOpenManual}
            title="Abrir Manual de Usuario Paso a Paso (Descargable en Markdown)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Manual Paso a Paso</span>
            <span className="sm:hidden">Manual</span>
          </button>

          {/* Switch de Referencias Legales */}
          <label className="flex items-center cursor-pointer select-none text-xs text-slate-600 dark:text-slate-300 space-x-2 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              id="toggleLeyes"
              checked={mostrarLeyes}
              onChange={onToggleLeyes}
              className="sr-only"
            />
            <div
              className={`w-7 h-4 rounded-full transition-colors relative ${
                mostrarLeyes ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform shadow-xs ${
                  mostrarLeyes ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="font-medium text-[11px] text-slate-700 dark:text-slate-200 whitespace-nowrap hidden sm:inline">
              Mostrar Base Legal
            </span>
            <span className="font-medium text-[11px] text-slate-700 dark:text-slate-200 whitespace-nowrap sm:hidden">
              Leyes
            </span>
          </label>

          {/* Switch de Modo Claro / Oscuro */}
          <button
            onClick={onToggleTheme}
            type="button"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema claro u oscuro"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
