import {
  kApiUrlEndpoint,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_WRONG_CREDENTIALS,
  API_TIMEOUT,
} from "../config/WebServices";
import { create } from "apisauce";

const api = create({
  baseURL: kApiUrlEndpoint,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: API_TIMEOUT,
});

class ApiHelper {
  async post(url, data, headers) {
    const response = await api.post(url, data, { headers: headers });

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async get(url, data, headers) {
    const response = await api.get(url, data, { headers: headers });

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  async delete(url, data, headers) {}
  async put(url, data, headers) {}
  async postImage(url, data, headers) {}

  handlePromise = (resolve, reject, response) => {
    if (response.error) {
      if (response.error.code === "LOGIN_FAILED") {
        reject(ERROR_WRONG_CREDENTIALS);
      } else {
        reject(response.error);
      }
    } else {
      resolve(response);
    }
  };
}

export default new ApiHelper();
