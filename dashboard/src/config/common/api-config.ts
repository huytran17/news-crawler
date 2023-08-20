import { HttpMethod } from "../enums";

const api_config: RequestInit = {
  method: HttpMethod.POST,
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
};

export { api_config };
