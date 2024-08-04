import { disableLoader, enableLoader } from "../helpers/event";
import Notify from "../helpers/notify";
import router from "../routes";
import useSession from "../stores/session";

export default function useToken() {
  const session = useSession();
  const setToken = (token: string) => {
    sessionStorage.setItem("token", token);
  };

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const checkExpiredToken = () => {
    const token = getToken();
    if (!token) {
      return true;
    }
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const expired = new Date(decoded.exp * 1000);
    if (new Date() > expired) {
      return true;
    }
    return false;
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API + "/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token: getToken() }),
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
      const exp = checkExpiredToken();
      if (exp) {
        session.$reset();
        router.push({ name: "Login" });
        sessionStorage.removeItem("token");
        Notify.error("Token Kadaluarsa");
      }
      const response = await fetch(import.meta.env.VITE_API + "/auth/saya", {
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
      console.log(error);
    }
  };

  return {
    setToken,
    getToken,
    decodeToken,
    refreshToken
  };
}
