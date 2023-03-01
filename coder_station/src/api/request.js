import axios from "axios";

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(config => {
  // 请求前的回调

  return config;
}, err => {
  console.log("请求错误", err)
});
service.interceptors.response.use(resp => {
  const { data } = resp;
  return data;
}, err => {
  console.log("响应错误", err)
});

export default service;