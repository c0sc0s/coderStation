import request from "./request";

export const getCaptcha = () => {
  return request({
    url: "/res/captcha",
    method: "GET"
  })
}

export const checkIdIsExit = (loginId) => {
  return request({
    url: `/api/user/userIsExist/${loginId}`,
    method: "GET"
  })
}

export const addUser = (userInfo) => {
  return request({
    url: "/api/user",
    data: userInfo,
    method: "POST"
  })
}

export const userLogin = data => {
  return request({
    url: "/api/user/login",
    method: "POST",
    data
  })
}

export const getUserById = userId => {
  return request({
    url: `/api/user/${userId}`,
    method: "GET"
  })
}

export const whoAmI = () => {
  return request({
    url: "/api/user/whoami",
    method: "GET"
  })
}