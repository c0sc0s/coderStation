import React, { useState } from 'react';
import "./css/App.css";

// antd
import { Layout } from 'antd';

// components
import Footer from './components/Footer';
import NavHeader from './components/NavHeader';

// Routes
import RouteConfig from './router';
import LoginForm from './components/LoginForm';

const App = () => {

  const [isModelOpen, setModelOpen] = useState(false);

  const closeModalHandle = () => {
    setModelOpen(false);
  }

  const loginHandle = () => {
    setModelOpen(true);
  }


  return (
    <div className='App'>
      <Layout>
        <Layout.Header className='header' >
          <NavHeader loginHandle={loginHandle} />
        </Layout.Header>
        <Layout.Content className='content'>
          <RouteConfig />
        </Layout.Content>
        <Layout.Footer className='footer'>
          <Footer />
        </Layout.Footer>
      </Layout>

      {/* 登陆弹窗 */}
      <LoginForm isShow={isModelOpen} closeModalHandle={closeModalHandle} loginHandle={loginHandle} />
    </div>
  )
};

export default App;