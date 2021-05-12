import { decode } from "jsonwebtoken";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router";
import { useLoading } from "./useLoading";
import { toast } from "react-toastify";
import api from "../services/api";
import { UserAuthenticate } from "../services/userService";

const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const history = useHistory();

   const { setLoading } = useLoading();

  const [user, setUser] = useState(() => {
    const storagedUser = localStorage.getItem("@Seuphone::user");

    if (storagedUser) {
      return JSON.parse(storagedUser);
    }

    return null;
  });

  const [token, setToken] = useState(() => {
    const storagedToken = localStorage.getItem("@Seuphone::token");

    if (storagedToken) {
      return JSON.parse(storagedToken);
    }

    return null;
  });

     

  function Authenticate(form) {
    setLoading(true);
    UserAuthenticate(form).then(
      (resp) => {
        const token = resp.data;

        const userInfo = {
          token,
          decodedToken: decode(token),
        };

        setUser(userInfo);
        api.defaults.headers.Authorization = `Bearer ${token}`;

        toast.success(
          "Usuário autenticado, redirecionando para página inicial"
        );

        history.push("/");

        localStorage.setItem("@Seuphone::token", token);
        localStorage.setItem("@Seuphone::user", JSON.stringify(userInfo));

        setLoading(false);
      },
      (error) => {
        const erro = error.response.data;
        toast.error(erro);
        setLoading(false);
      }
    );
  }

  function Logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("@Seuphone::user");
    localStorage.removeItem("@Seuphone::token");
    history.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Authenticate, Logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
