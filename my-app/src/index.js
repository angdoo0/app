import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';   
import reportWebVitals from './reportWebVitals';
//'./' 랑 확장자 없는 이유 : react랑 react.dom에 pakage.json에 export에 key랑 value로 축약해서 쓸 수 있게 해놨다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
