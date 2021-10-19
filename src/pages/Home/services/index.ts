import { AxiosPromise } from "axios";
import { requestWithToken } from "../../../auth";
export enum Gender {
  Male,
  Female,
}
export enum Country {
  China,
  Uzbekistan,
  Indonesia,
}
export interface CultureTheme {
  _id: string;
  name: string;
  desciprtion: string;
  rules: string;
  createdTime: string;
}
export interface User {
  _id: string;
  userName: string;
  gender: Gender;
  country: Country;
  group: string;
  introductionVideoLink: string;
  avatarUrl: string;
  preferCultureThemes: CultureTheme[];
}

export interface Settings {
  showFriends: boolean;
  showPlayground: boolean;
  showSettings: boolean;
  showStudio: boolean;
}

type GetSettings = () => AxiosPromise<Settings>;
type UpdateSettings = (settings: Settings) => AxiosPromise;
type GetCultureThemes = () => AxiosPromise<CultureTheme[]>;
type CreateCultureThemes = (culture: CultureTheme) => AxiosPromise;
type UpdateCultureTheme = (
  id: string,
  cultureTheme: CultureTheme
) => AxiosPromise;
type RemoveCultureTheme = (id: string) => AxiosPromise;
type GetAllUserPreferCultureThemes = () => AxiosPromise<User[]>;
type RemoveUser = (id: string) => AxiosPromise;
type UpdateUserGroup = (id: string, group: string) => AxiosPromise;
type UpdateUserPassword = (id: string, password: string) => AxiosPromise;

export const getSettings: GetSettings = () => {
  return requestWithToken.get<Settings>("/settings");
};

export const updateSettings: UpdateSettings = (settings: Settings) => {
  return requestWithToken.put(`/settings`, settings);
};

export const getCultureThemes: GetCultureThemes = () => {
  return requestWithToken.get<CultureTheme[]>("/cultureThemes");
};

export const createCultureThemes: CreateCultureThemes = (
  cultureTheme: CultureTheme
) => {
  return requestWithToken.post("/cultureThemes", cultureTheme);
};

export const updateCultureTheme: UpdateCultureTheme = (
  id: string,
  cultureTheme: CultureTheme
) => {
  return requestWithToken.put(`/cultureThemes/${id}`, cultureTheme);
};

export const removeCultureTheme: RemoveCultureTheme = (id: string) => {
  return requestWithToken.delete(`/cultureThemes/${id}`);
};

export const getAllUserPreferCultureThemes: GetAllUserPreferCultureThemes =
  () => {
    return requestWithToken.get("/users/preferCultureThemes/all");
  };

export const removeUser: RemoveUser = (userID: string) => {
  return requestWithToken.delete(`/users/${userID}`);
};

export const updateUserGroup: UpdateUserGroup = (id: string, group: string) => {
  return requestWithToken.put(`/users/${id}/group`, { group });
};

export const updateUserPassword: UpdateUserPassword = (
  id: string,
  password: string
) => {
  return requestWithToken.put(`/users/${id}/password`, { password });
};
