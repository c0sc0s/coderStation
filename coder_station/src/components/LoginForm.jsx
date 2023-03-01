import React, { useEffect, useRef, useState } from 'react'
import { Modal, Radio, Form, Input, Button, Row, Col, Checkbox, message } from "antd";
import styles from "../css/LoginForm.module.css"
import { getCaptcha, checkIdIsExit, addUser, userLogin, getUserById } from '../api/user';
import { changeLoginStatus, initUserInfo } from '../redux/userSlice';
import { useDispatch } from 'react-redux';


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
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const handleOK = () => {

  }

  const cancelHandle = () => {
    setLoginInfo({
      loginId: "",
      loginPwd: "",
      captcha: "",
      remember: false,
    });
    setRegisterInfo({
      loginId: "",
      nickname: "",
      captcha: "",
    })
    form.resetFields();
    props.closeModalHandle();
  }

  const changeHandle = e => {
    setValue(e.target.value);
  }

  const login = (userData) => {
    dispatch(changeLoginStatus(true));
    dispatch(initUserInfo(userData));
    cancelHandle();
    message.success("登陆成功")
  }


  const loginHandle = async () => {
    const res = await userLogin(loginInfo);

    if (!res.data) {
      message.warning("验证码错误");
      captchaClickHandle();
      return;
    }

    const { data } = res.data;

    if (data) {
      if (!data.enabled) {
        message.warning("账户已冻结，请联系管理员");
        return;
      }

      const user = await getUserById(data._id);
      if (loginInfo.remember) localStorage.userToken = res.data.token;
      login(user);
    } else {
      message.warning("密码或账号错误")
      return;
    }
  }

  const registerHandle = async () => {
    const { data } = await addUser(registerInfo);
    if (data) {
      message.success("注册成功，默认密码为123456");
      login(data);
    } else {
      message.warning("验证码错误，请重新输入")
      captchaClickHandle();
    }
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

  const checkLoginIdIsExist = async () => {
    if (registerInfo.loginId) {
      const { data } = await checkIdIsExit(registerInfo.loginId)
      return data && Promise.reject("该用户已经注册")
    }
  }
  const handleRest = () => {
    form.resetFields();
  }

  const container = value === 1
    ?
    (<div className={styles.container}>
      <Form
        form={form}
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
            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
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
          <Button type="primary" htmlType="submit" onClick={handleRest}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>)
    :
    (<div className={styles.container}>
      <Form
        form={form}
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
            { validator: checkLoginIdIsExist },
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
          <Button type="primary" htmlType="submit" onClick={handleRest}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
    )

  useEffect(() => {
    captchaClickHandle();
  }, [props.isShow, value])

  return (
    <div>
      <Modal title="登陆 / 注册 " open={props.isShow} onCancel={cancelHandle} onOk={handleOK} >
        <Radio.Group value={value} onChange={changeHandle} className={styles.radioGroup} buttonStyle="solid">
          <Radio.Button value={1} className={styles.radioButton}>登陆</Radio.Button>
          <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
        </Radio.Group>
        {container}
      </Modal >
    </div >
  )
}
