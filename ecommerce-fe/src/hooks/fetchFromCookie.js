import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("authToken");
    const userFromCookie = Cookies.get("ID");

    console.log(tokenFromCookie, "tokenFromCookie");
    console.log(userFromCookie, "userFromCookie");

    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
    if (userFromCookie) {
      setUser(JSON.parse(userFromCookie));
    }
  }, []);

  return { token, user };
};

export default useAuth;
