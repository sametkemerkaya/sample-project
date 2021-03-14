import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import React, { Suspense }  from 'react';
import App from './App'; 
 
import './assets/scss/App.scss';

import './helper/i18next';

ReactDOM.render(
  <Suspense fallback={ (<div>Loading</div>) }>
  <BrowserRouter>
        <App />  
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);

