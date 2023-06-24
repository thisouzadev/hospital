import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout';
import { AppStore } from './store/AppStore';
import Routes from './routes';

const App: React.FC = () => (
  <AppStore>
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  </AppStore>
);

export default App;
