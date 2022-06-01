import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const instance = axios.create({
  baseURL: "http://3.110.183.172",
});


export default instance;
