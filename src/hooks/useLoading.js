import { createContext, useContext, useState } from "react";
import Loading from "../components/Loading";


const LoadingContext = createContext({});

export function LoadingProvider({children}) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{setLoading}}>
      <Loading loading={loading} />
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext);
  
  return context;
}