import { decode } from "jsonwebtoken";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router";
import { useLoading } from "./useLoading";
import { toast } from "react-toastify";
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
        // api.defaults.headers.Authorization = `Bearer ${token}`;

        toast.success(
          "Usuário autenticado, redirecionando para página inicial"
        );

        history.push("/");

        localStorage.setItem("@Seuphone::user", JSON.stringify(userInfo));

        setLoading(false);
      },
      (error) => {
        setLoading(false);
        try {
          const erro = error.response.data;
          if (erro !== undefined) {
            if (typeof erro.errors === "object") {
              Object.values(erro.errors).forEach((e) => {
                toast.error(e[0]);
              });
            } else {
              toast.error(erro);
            }
          } else {
            toast.error("Não foi possível carregar os dados.");
          }
        } catch (e) {
          toast.error("Ocorreu um erro interno.");
        }
      }
    );
  }

  function Logout() {
    setUser(null);
    localStorage.removeItem("@Seuphone::user");
    history.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Authenticate, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
