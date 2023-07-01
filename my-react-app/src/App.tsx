import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './layout';
import { AppStore } from './store/AppStore';
import Routes from './routes';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <AppStore>
    <ToastContainer />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes />
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  </AppStore>
);

export default App;
