import { Base64 } from "js-base64";
import { disableLoader, enableLoader } from "../helpers/event";
import Notify from "../helpers/notify";
import router from "../routes";
import {useSession} from "../stores/session";

export default function useToken() {
  const session = useSession();
  const setToken = async (token: any) => {
    sessionStorage.setItem("token", JSON.stringify(token));
  };

  const getToken = () => {
    const token = JSON.parse(sessionStorage.getItem("token") || "null");
    return token.token;
  };

  const checkExpiredToken = async () => {
    const token = getToken();
    if (!token) {
      Notify.error("Token tidak ditemukan");
      return;
    }

    const decodedString = Base64.decode(token.split(".")[1]);
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
      const response = await fetch(import.meta.env.VITE_API + "/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token: getToken().refresh }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal refresh token");
      }
      setToken(data.data.token);
      return data.data.token;
    } catch (error: any) {
      Notify.error(error.message);
    }
  }

  const decodeToken = async () => {
    try {
      enableLoader();
      const exp = await checkExpiredToken();
      if (exp) {
        session.$reset();
        router.push({ name: "Login" });
        sessionStorage.clear();
        Notify.error("Token Kadaluarsa");
      }
      const response = await fetch(import.meta.env.VITE_API + "/auth/whoami", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
