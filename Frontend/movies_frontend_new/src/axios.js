import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({
  baseURL: "http://3.86.245.190:8000",
});


export default instance;
