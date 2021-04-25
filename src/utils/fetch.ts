import sleep from "./sleep";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

const TEST_FOR_LOADING: boolean = false;

let hostUrl: string;

// Must call setHostUrl for each client at their start up
export const setHostUrl = (host: string): void => {
  hostUrl = host;
};

export const getHostUrl = (): string => {
  return hostUrl;
};

const _fetch = async (url: string, data: any, method: Method): Promise<any> => {
  if (TEST_FOR_LOADING) {
    await sleep(2000);
  }
  let completeUrl: string = url;
  if (url && !url.startsWith(getHostUrl())) {
    completeUrl = `${getHostUrl()}${url}`;
  }
  const headers: any = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const options: AxiosRequestConfig = {
    url: completeUrl,
    method: method,
    headers: headers,
    withCredentials: true,
  };

  if (method === "GET") {
    options.params = data;
  } else {
    options.data = data;
  }

  return axios(options)
    .then(
      (response: AxiosResponse): Promise<any> => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject({
            isAxiosError: true,
            config: response.config,
            response: response,
          } as AxiosError);
        }
      }
    )
    .catch(
      (error: AxiosError): Promise<any> => {
        const response: AxiosResponse | undefined = error.response;
        if (!response) {
          return Promise.reject({ name: "Unknown error!" });
        }
        return Promise.reject({
          name: `${response.status} ${response.statusText}`,
          message: response.data.message,
        } as Error);
      }
    );
};

export default _fetch;
