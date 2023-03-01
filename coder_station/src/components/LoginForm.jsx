import React, { useEffect, useRef, useState } from 'react'
import { Modal, Radio, Form, Input, Button, Row, Col, Checkbox } from "antd";
import styles from "../css/LoginForm.module.css"

// api
import { getCaptcha } from '../api/user';

export default function LoginForm(props) {

  const [value, setValue] = useState(1);
  const loginFormRef = useRef();
  const registerFormRef = useRef();
  const [loginInfo, setLoginInfo] = useState({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  })
  const [registerInfo, setRegisterInfo] = useState({
    loginId: "",
    nickname: "",
    captcha: "",
  })
  const [captcha, setCaptcha] = useState(null);

  const handleOK = () => {

  }

  const changeHandle = e => {
    setValue(e.target.value);
  }

  const loginHandle = () => {

  }

  const registerHandle = () => {

  }

  const updateInfo = (preInfo, newContent, key, setInfo) => {
    const newInfo = { ...preInfo };
    newInfo[key] = newContent;
    setInfo(newInfo);
  }

  const captchaClickHandle = async () => {
    const result = await getCaptcha();
    setCaptcha(result);
  }

  useEffect(() => {
    captchaClickHandle();
  }, [props.isShow, value])


  let container = null;
  if (value === 1) {
    container = (
      <div className={styles.container}>     <Form
        name="basic1"
        autoComplete="off"
        onFinish={loginHandle}
        ref={loginFormRef}
      >
        <Form.Item
          label="登录账号"
          name="loginId"
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
          ]}
        >
          <Input
            placeholder="请输入你的登录账号"
            value={loginInfo.loginId}
            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
          />
        </Form.Item>

        <Form.Item
          label="登录密码"
          name="loginPwd"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入你的登录密码，新用户默认为123456"
            value={loginInfo.loginPwd}
            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
          />
        </Form.Item>

        {/* 验证码 */}
        <Form.Item
          name="logincaptcha"
          label="验证码"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        >
          <Row align="middle">
            <Col span={16}>
              <Input
                placeholder="请输入验证码"
                value={loginInfo.captcha}
                onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
              />
            </Col>
            <Col span={6}>
              <div
                className={styles.captchaImg}
                onClick={captchaClickHandle}
                danger="true" dangerouslySetInnerHTML={{ __html: captcha }}
              ></div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="remember"
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Checkbox
            // onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
            checked={loginInfo.remember}
          >记住我</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20 }}
          >
            登录
          </Button>
          <Button type="primary" htmlType="submit">
            重置
          </Button>
        </Form.Item>
      </Form>
      </div>
    )
  } else {
    container = (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
        >
          <Form.Item
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              // { validator: checkLoginIdIsExist },
            ]}
            validateTrigger='onBlur'
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
            />
          </Form.Item>

          <Form.Item
            label="用户昵称"
            name="nickname"
          >
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
            />
          </Form.Item>

          <Form.Item
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  return (
    <div>
      <Modal title="登陆 / 注册 " open={props.isShow} onCancel={props.closeModalHandle} onOk={handleOK} >
        <Radio.Group value={value} onChange={changeHandle} className={styles.radioGroup} buttonStyle="solid">
          <Radio.Button value={1} className={styles.radioButton}>登陆</Radio.Button>
          <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
        </Radio.Group>
        {container}
      </Modal >
    </div >
  )
}
