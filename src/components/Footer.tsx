import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-12 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            Created by{' '}
            <a
              href="https://3mglabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              3MGLabs.com
            </a>{' '}
            &bull; Dirigido por Edgar Mercado G.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            Soluciones de Software, LegalTech y Consultoría de Negocios.
          </p>
        </div>
        <div className="flex flex-wrap items-center space-x-4 sm:space-x-6 text-[11px]">
          <span>
            <strong className="text-slate-600 dark:text-slate-300">Contacto:</strong>{' '}
            <a href="tel:+59170203103" className="hover:text-blue-600 dark:hover:text-blue-400 font-mono">
              +591 70203103
            </a>
          </span>
          <span>
            <strong className="text-slate-600 dark:text-slate-300">Correo:</strong>{' '}
            <a
              href="mailto:contacto@3mglabs.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              contacto@3mglabs.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
