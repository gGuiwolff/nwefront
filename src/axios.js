import axios from "axios";

var instance = axios.create({
    baseURL: "https://vegiw.herokuapp.com",
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token",
});

export default instance;
