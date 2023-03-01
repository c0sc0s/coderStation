import React from 'react'

// hooks
import { useSelector } from 'react-redux'

// antd
import { Avatar, Button, List, Popover, Image } from 'antd';
import { UserOutlined } from "@ant-design/icons"

// css
import styles from "../css/AvatorAndLogin.module.css"

export default function AvatorAndLogin(props) {
  let { isLogin, userInfo } = useSelector(state => state.user);
  let view = null;
  const listClickHandle = item => {
    (item === "退出登陆") && props.signOutHandle();
  }

  if (isLogin) {
    const popoverContent = (
      <List
        dataSource={["个人中心", "退出登陆"]}
        size="large"
        renderItem={(item) => {
          return (
            <List.Item style={{ cursor: "pointer" }} onClick={() => listClickHandle(item)}>{item}</List.Item>
          )
        }}
      />)
    view = (
      <Popover content={popoverContent} trigger="hover" placement="bottom">
        <div className={styles.avatarContainer}>
          <Avatar src={<Image src={userInfo?.data?.avatar} preview="false" />} size={'large'} icon={<UserOutlined />} />
        </div>
      </Popover>
    )
  } else {
    view = <Button type='primary' size='large' onClick={props.loginHandle}>登陆/注册</Button>
  }

  return (
    <div>
      {view}
    </div>
  )
}
