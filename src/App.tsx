import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/layout/Layout';

import './wabiz/css/fonts/NotoSansKR/NotoSansKR.css';
import './wabiz/css/common.css';
import './wabiz/css/layout.css';
import './wabiz/css/plugin.css';

import './wabiz/css/ReactDatePicker.css';

import MenuRouters from './route/MenuRoute';

function App() {
  return (
    <>
      <MenuRouters />
    </>
  );
}

export default App;
