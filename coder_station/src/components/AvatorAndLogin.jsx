import React from 'react'

// hooks
import { useSelector } from 'react-redux'

// antd
import { Avatar, Button, List, Popover } from 'antd';
import { UserOutlined } from "@ant-design/icons"

// css
import styles from "../css/AvatorAndLogin.module.css"

export default function AvatorAndLogin() {
  let { isLogin } = useSelector(state => state.user);

  let view = null;
  if (isLogin) {
    const popoverContent = (
      <List
        dataSource={["个人中心", "退出登陆"]}
        size="large"
        renderItem={(item) => {
          return (
            <List.Item style={{ cursor: "pointer" }}>{item}</List.Item>
          )
        }}
      />)
    view = (
      <Popover content={popoverContent} trigger="hover" placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar size={'large'} preview="false" icon={<UserOutlined />} />
        </div>
      </Popover>
    )
  } else {
    view = <Button type='primary' size='large'>登陆/注册</Button>
  }

  return (
    <div>
      {view}
    </div>
  )
}
