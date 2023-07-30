import {
  kApiUrlEndpoint,
  ERROR_NETWORK_NOT_AVAILABLE,
  API_TIMEOUT,
} from "../config/WebServices";
import { create } from "apisauce";
import utils from "../utils";

const api = create({
  baseURL: kApiUrlEndpoint,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: API_TIMEOUT,
});

class ApiHelper {
  async get(url, data, headers) {
    const response = await api.get(url, data, { headers: headers });

    return new Promise((resolve, reject) => {
      this.handlePromise(resolve, reject, response);
    });
  }

  handlePromise = (resolve, reject, response) => {
    if (response.status == null) {
      console.log(response.problem);
      if (response.problem === "NETWORK_ERROR") {
        utils.showAlertWithDelay(
          ERROR_NETWORK_NOT_AVAILABLE.title,
          ERROR_NETWORK_NOT_AVAILABLE.message
        );
        reject(ERROR_NETWORK_NOT_AVAILABLE);
      } else {
        reject(response.error);
      }
    } else {
      resolve(response);
    }
  };
}

export default new ApiHelper();
