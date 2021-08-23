import { AxiosPromise } from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import * as requests from '../requests/requests';

interface Auth {
  authenticated: boolean;
  register: (userName: string, password: string) => AxiosPromise;
  login: (userName: string, password: string) => AxiosPromise<requests.LoginResult>;
  logout: () => Promise<void>;
}
interface IAuthProviderProps {
  children?: JSX.Element | JSX.Element[];
}
interface IUseAuth {
  AuthProvider: React.FC<IAuthProviderProps>;
  authContext: React.Context<Auth>;
}

const ACCESS_TOKEN = 'access_token';
const saveAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem(ACCESS_TOKEN, access_token);
};
export const getAccessTokenFromLocalStorage: () => string = () => {
  return localStorage.getItem(ACCESS_TOKEN) || '';
};

const createAuth: () => Auth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const access_token: string = getAccessTokenFromLocalStorage();
    if (access_token) {
      setAuthenticated(true);
    }
  }, []);

  const register = async (userName: string, password: string) => {
    return requests.register(userName, password);
  };
  const login = async (userName: string, password: string) => {
    try {
      const res = await requests.login(userName, password);
      saveAccessTokenToLocalStorage(res && res.data && res.data.access_token);
      setAuthenticated(true);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  const logout = async () => {
    saveAccessTokenToLocalStorage('');
    setAuthenticated(false);
  };
  return {
    authenticated,
    register,
    login,
    logout,
  };
};

const authContext = createContext<Auth>({} as Auth);
const AuthProvider: React.FC<IAuthProviderProps> = ({ children }: IAuthProviderProps) => {
  const auth: Auth = createAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth: () => IUseAuth = () => {
  return {
    authContext,
    AuthProvider,
  };
};
