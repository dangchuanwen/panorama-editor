import { AxiosPromise } from "axios";
import { requestWithToken } from "../../../auth";

export interface Settings {
  showFriends: boolean;
  showPlayground: boolean;
  showSettings: boolean;
  showStudio: boolean;
}
type GetSettings = () => AxiosPromise<Settings>
type UpdateSettings = (settings: Settings) => AxiosPromise;

export const getSettings: GetSettings = () => {
  return requestWithToken.get<Settings>("/settings")
}

export const updateSettings: UpdateSettings = (settings: Settings) => {
  return requestWithToken.put("/settings", settings);
}
