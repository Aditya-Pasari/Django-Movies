import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({
  baseURL: "http://13.127.43.173:8000",
});


export default instance;
