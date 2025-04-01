import axios from "axios";

type HTTPMethod = "GET" | "POST";

type RequestType = {
  method: HTTPMethod;
  url: string;
  params?: { [key: string]: string };
  data?: object | string;
};

export const request = async ({ method, url, params, data }: RequestType) => {
  return axios({
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    method,
    url,
    data,
    params,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
