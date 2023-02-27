import React from 'react';
import "./css/App.css";

// antd
import { Layout } from 'antd';

// components
import Footer from './components/Footer';
import NavHeader from './components/NavHeader';

// Routes
import RouteConfig from './router';

const App = () => (
  <div className='App'>
    <Layout>
      <Layout.Header className='header' >
        <NavHeader />
      </Layout.Header>
      <Layout.Content className='content'>
        <RouteConfig />
      </Layout.Content>
      <Layout.Footer className='footer'>
        <Footer />
      </Layout.Footer>
    </Layout>
  </div>
);

export default App;