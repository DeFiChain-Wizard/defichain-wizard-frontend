import { createContext, useContext, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated?: (isAuthenticated: boolean) => void;
}

const defaultState = {
  isAuthenticated: false,
};

const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticationState] = useState(
    defaultState.isAuthenticated
  );

  const setIsAuthenticated = (state: boolean) => {
    setAuthenticationState(state);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
