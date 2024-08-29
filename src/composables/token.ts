import { Base64 } from "js-base64";
import { disableLoader, enableLoader } from "../helpers/event";
import Notify from "../helpers/notify";

export default function useToken() {
  const setToken = async (token: any) => {
    sessionStorage.setItem("token", JSON.stringify(token));
  };

  const getToken = async () => {
    return JSON.parse(sessionStorage.getItem("token") || "");
  };

  const checkExpiredToken = async () => {
    const token = await getToken();
    if (!token) {
      Notify.error("Token tidak ditemukan");
      return;
    }

    const decodedString = Base64.decode(token.access.split(".")[1]);
    const decoded = JSON.parse(decodedString);
    const expired = new Date(decoded.exp * 1000);
    if (new Date() > expired) {
      await refreshToken();
      return true;
    }
    return false;
  };

  const refreshToken = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Notify.error("Token tidak ditemukan");
        return;
      }
      const response = await fetch(import.meta.env.VITE_API + "/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: token.refresh }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal refresh token");
      }
      setToken(data.data);
      return data.data.access;
    } catch (error: any) {
      Notify.error(error.message);
    }
  }

  const decodeToken = async () => {
    try {
      enableLoader();
      const exp = await checkExpiredToken();
      if (exp) {
        await refreshToken();
      }
      const token = await getToken();
      const response = await fetch(import.meta.env.VITE_API + "/auth/whoami", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal mendapatkan data");
      }
      disableLoader();
      return data.data;
    } catch (error) {
      disableLoader();
    }
  };

  return {
    setToken,
    getToken,
    decodeToken,
    refreshToken,
    checkExpiredToken
  };
}
