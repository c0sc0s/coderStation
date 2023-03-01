import React, { useEffect, useState } from 'react';
import "./css/App.css";
import { getUserById, whoAmI } from './api/user';

// antd
import { Layout, message } from 'antd';

// components
import Footer from './components/Footer';
import NavHeader from './components/NavHeader';

// Routes
import RouteConfig from './router';
import LoginForm from './components/LoginForm';
import { useDispatch } from 'react-redux';

import { changeLoginStatus, initUserInfo } from './redux/userSlice';
const App = () => {

  const [isModelOpen, setModelOpen] = useState(false);
  const dispatch = useDispatch();
  const closeModalHandle = () => {
    setModelOpen(false);
  }

  const loginHandle = () => {
    setModelOpen(true);
  }

  const signOut = () => {
    dispatch(changeLoginStatus(false));
    dispatch(initUserInfo(null));
    localStorage.removeItem("userToken");
    message.warning("已退出");
  }

  useEffect(() => {
    localStorage.getItem("userToken") &&
      (async () => {
        const { data } = await whoAmI();
        if (data) {
          const user = await getUserById(data._id);
          dispatch(changeLoginStatus(true));
          dispatch(initUserInfo(user));
        } else {
          message.warning("登陆已过期，请重新登陆")
          localStorage.removeItem("userToken")
        }
      })()
  })

  return (
    <div className='App'>
      <Layout>
        <Layout.Header className='header' >
          <NavHeader signOutHandle={signOut} loginHandle={loginHandle} />
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