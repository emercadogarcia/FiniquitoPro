import React from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  const url =
    'https://wa.me/59170203103?text=Hola%20Edgar,%20estoy%20utilizando%20la%20Calculadora%20de%20Finiquitos%20de%203MGLabs%20y%20deseo%20hacer%20una%20consulta.';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-40"
      title="Consultar asesoría con Edgar Mercado G."
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.419-.101.824z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:pl-2">
        Consultar con Edgar
      </span>
    </a>
  );
};
