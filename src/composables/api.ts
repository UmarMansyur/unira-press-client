import { disableLoader, enableLoader } from "../helpers/event";
import Notify from "../helpers/notify";

export default function useApi() {
  const tryFetch = async (url: string, method: string, body?: any) => {
    try {
      enableLoader();
      const response = await fetch(import.meta.env.VITE_API + url, {
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      disableLoader();
      return data;
    } catch (error: any) {
      Notify.error(error.message);
      disableLoader();
    }
  };

  const getResource = async (url: string) => {
    return await tryFetch(url, "GET");
  };

  const postResource = async (url: string, body: any) => {
    return await tryFetch(url, "POST", body);
  };

  const putResource = async (url: string, body: any) => {
    return await tryFetch(url, "PUT", body);
  };

  const deleteResource = async (url: string) => {
    return await tryFetch(url, "DELETE");
  };

  const postResourceFormData = async (url: string, body: any) => {
    try {
      enableLoader();
      const formData = new FormData();
      for (const key in body) {
        formData.append(key, body[key]);
      }
      const response = await fetch(import.meta.env.VITE_API + url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(sessionStorage.getItem("token") || "").access
          }`,
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      disableLoader();
      return data;
    } catch (error: any) {
      Notify.error(error.message);
      disableLoader();
    }
  };

  return {
    getResource,
    postResource,
    putResource,
    deleteResource,
    postResourceFormData,
  };
}
