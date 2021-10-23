import { AxiosPromise } from 'axios';
import { Country, Gender } from 'interface';
import React, { createContext, useEffect, useState } from 'react';
import * as requests from '../requests/requests';

interface Auth {
  user: requests.User | null;
  authenticated: boolean;
  register: (userName: string, password: string, gender: Gender, country: Country) => AxiosPromise;
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
  const [user, setUser] = useState<requests.User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInformation = async () => {
      const res = await requests.getUserInformation();
      const user: requests.User = res.data;
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };
    fetchUserInformation();
  }, []);

  const register: Auth['register'] = async (userName: string, password: string, gender: Gender, country: Country) => {
    return requests.register(userName, password, gender, country);
  };
  const login = async (userName: string, password: string) => {
    try {
      const res = await requests.login(userName, password);
      saveAccessTokenToLocalStorage(res && res.data && res.data.access_token);
      setAuthenticated(true);
      setTimeout(() => {
        setUser(res.data.user);
      }, 100);
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
    user,
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
