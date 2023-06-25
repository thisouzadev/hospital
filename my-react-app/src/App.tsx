import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './layout';
import { AppStore } from './store/AppStore';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

const App: React.FC = () => (
  <AppStore>
    <ToastContainer />
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  </AppStore>
);

export default App;
