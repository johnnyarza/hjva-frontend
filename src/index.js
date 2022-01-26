import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
// TODO Colocar botão de voltar no card do produto
// TODO Pagina com fotos de obra
// TODO Notificação de corpo de prova para o dia seguinte
ReactDOM.render(
  <>
    <App />
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </>,
  document.getElementById('root')
);
