import axios from "axios";
import { AxiosResponse } from "axios";
import { Context, createContext, FC, useEffect, useState } from "react";

const TOKEN: string = "token";
const saveTokenToLocal: (token: string) => void = (token: string) => {
  localStorage.setItem(TOKEN, token);
};
export const getTokenFromLocal: () => string = () => {
  return localStorage.getItem(TOKEN) || "";
};
export const requestWithToken = axios.create({
  headers: {
    Authorization: `Bearer ${getTokenFromLocal()}`,
  },
});
export const requestWithoutToken = axios.create();

type LoginDto = {
  userName: string;
  password: string;
};
type LoginResult = {
  access_token: string;
};
type AuthState = {
  authenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
};
const defaultAuthState: AuthState = {
  authenticated: false,
  login: async (u: string, p: string) => {},
};
const useAuth: () => AuthState = () => {
  const [authenticated, setAuthenticated] =
    useState<AuthState["authenticated"]>(false);

  const login: AuthState["login"] = async (
    username: string,
    password: string
  ) => {
    const httpRes = await requestWithoutToken.post<
      LoginResult,
      AxiosResponse<LoginResult>,
      LoginDto
    >("/users/admin/login", {
      userName: username,
      password,
    });

    const data: LoginResult = httpRes.data;
    saveTokenToLocal(data.access_token);
    setAuthenticated(true);
  };

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        await requestWithToken.get("/users/information");
        setAuthenticated(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserInformation();
  }, []);

  return { authenticated, login };
};

export const AuthContext: Context<AuthState> =
  createContext<AuthState>(defaultAuthState);

type AuthWrapperProps = {
  children: JSX.Element | JSX.Element[];
};
export const AuthWrapper: FC<AuthWrapperProps> = ({
  children,
}: AuthWrapperProps) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};
