import React from 'react'

// router
import { NavLink } from 'react-router-dom'

// antd
import { Input, Select } from "antd";

// components
import AvatorAndLogin from './AvatorAndLogin';

export default function NavHeader(props) {
  return (
    <div className="headerContainer">
      {/* 头部 logo */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      {/* 头部导航 */}
      <nav className="navContainer">
        <NavLink to="/" className="navigation">问答</NavLink>
        <NavLink to="/books" className="navigation">书籍</NavLink>
        <NavLink to="/interviews" className="navigation">面试题</NavLink>
        <a
          href="https://duyi.ke.qq.com/"
          className="navigation"
          target="_blank"
          rel="noreferrer"
        >视频教程</a>
      </nav>
      {/* 搜索框 */}
      <div className="searchContainer">
        <Input.Group compact>
          <Select defaultValue="issue" size="large" style={{ width: "20%" }}>
            <Select.Option value="issue">问答</Select.Option>
            <Select.Option value="book">书籍</Select.Option>
          </Select>
          <Input
            placeholder="请输入要搜索的内容"
            allowClear
            enterbutton="搜索"
            size="large"
            style={{
              width: "80%"
            }}
          />
        </Input.Group>
      </div>
      {/* 登录按钮 */}
      <div className="loginBtnContainer">
        <AvatorAndLogin signOutHandle={props.signOutHandle} loginHandle={props.loginHandle}></AvatorAndLogin>
      </div>
    </div>
  )
}
