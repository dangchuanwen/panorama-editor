import { AxiosPromise } from "axios";
import { requestWithToken } from "../../../auth";

export interface Settings {
  showFriends: boolean;
  showPlayground: boolean;
  showSettings: boolean;
  showStudio: boolean;
}
export interface CultureTheme {
  _id: string;
  name: string;
  desciprtion: string;
  rules: string;
  createdTime: string;
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
