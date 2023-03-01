import request from "./request";

export const getCaptcha = () => (
  request({
    url: "/res/captcha",
    method: "GET"
  })
)

