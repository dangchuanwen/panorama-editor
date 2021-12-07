import { message } from 'antd';
import { getAccessTokenFromLocalStorage } from 'auth/auth';
import axios, { AxiosInstance, AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { Country, Gender, ToolNames } from 'interface';
import { LanguageNames } from 'language';
import { WebsiteTexts } from 'language/interface';

type HotSpot = {
  pitch: number;
  yaw: number;
  text: string;
  type: 'scene' | 'info';
  sceneId?: string;
  fontContent?: string;
  toolName: ToolNames;
};

type Scene = {
  hotSpots: HotSpot[];
  panorama: string;
  type: string;
  yaw: number;
  pitch: number;
  hfov: number;
};
export type LoginResult = { access_token: string; user: User };
export type PanoramaTourConfig = {
  default: {
    firstScene: string;
  };
  scenes: {
    [key: string]: Scene;
  };
};
export type User = {
  userName: string;
  gender: Gender;
  country: Country;
  introductionVideoLink: string;
  introductionTextLink: string;
  avatarUrl: string;
  group: string;
};
export type CultureTheme = {
  _id: string;
  name: string;
  description: string;
  rules: string;
};
export type Work = {
  _id: string;
  user: User;
  workName: string;
  workTheme: CultureTheme;
  panoramaTourConfig: PanoramaTourConfig;
};
export type Comment = {
  _id: string;
  publisher: User;
  content: string;
  createdTime: Date;
};
export type PublishedWork = {
  _id: string;
  createdTime: Date;
  introduction: string;
  work: Work;
  author: User;
  comments: Comment[];
};

export type SwitchNames = 'showFriends' | 'showPlayground' | 'showSettings' | 'showStudio';
export type Settings = {
  [key in SwitchNames]: boolean;
} & {
  grouped: boolean;
  qiniuFilePrefix: string;
};
export interface TaskProcessStep {
  _id: string;
  name: string;
  order: number;
  done: boolean;
  description: string;
}

type Register = (userName: string, password: string, gender: Gender, country: Country) => AxiosPromise;
type Login = (userName: string, password: string) => AxiosPromise<LoginResult>;
type GetUserWorks = () => AxiosPromise<Work[]>;
type CreateWork = (workName: string) => AxiosPromise;
type GetQiniuToken = () => AxiosPromise<string>;
type GetWorkData = (workID: string) => AxiosPromise<Work>;
type UpdateWork = (workName: string, panoramaTourConfig: PanoramaTourConfig | null) => AxiosPromise<Work>;
type PublishWork = (workID: string, introduction: string) => AxiosPromise;
type GetUserPublishedWorkByWorkID = (workID: string) => AxiosPromise<PublishedWork>;
type GetPublishedWorksBeforeArchorDate = (
  archorDate: Date,
  cultureThemesNames: string[],
) => AxiosPromise<PublishedWork[]>;
type GetUserInformation = () => AxiosPromise<User>;
type GetPublishedWorksOfGroupMembers = () => AxiosPromise<PublishedWork[]>;
type AddComment = (commentContent: string, commentedPublishedWorkID: string) => AxiosPromise;
type DeleteComment = (commentID: string) => AxiosPromise;
type GetCommentsOfPublishedWork = (publishedWorkID: string) => AxiosPromise<Comment[]>;
type GetLanguagePackage = (languageName: LanguageNames) => AxiosPromise<WebsiteTexts>;
type RemoveWork = (workID: string) => AxiosPromise;
type GetCultureThemes = () => AxiosPromise<CultureTheme[]>;
type UpdatePreferCultureThemes = (cultureThemesNames: string[]) => AxiosPromise;
type GetSettings = () => AxiosPromise<Settings>;
type UpdateProfile = (profile: User) => AxiosPromise;
type GetGroupMembers = () => AxiosPromise<User[]>;
type GetTasksProcess = () => AxiosPromise<TaskProcessStep[]>;

const request: AxiosInstance = axios.create();
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${getAccessTokenFromLocalStorage()}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export const HttpErrorMessage: Map<number, string> = new Map();
HttpErrorMessage.set(409, '已存在');

export const showHttpError: (err: AxiosError, prefix?: string) => void = (err: AxiosError, prefix = '') => {
  if (err.response?.status && HttpErrorMessage.has(err.response?.status)) {
    message.warn(prefix + HttpErrorMessage.get(err.response?.status));
  } else {
    message.error(err.response?.data.message);
  }
};

export const register: Register = async (userName: string, password: string, gender: Gender, country: Country) => {
  return request.post('/users', { userName, password, gender, country });
};

export const login: Login = async (userName: string, password: string) => {
  return request.post<LoginResult>('/users/login', { userName, password });
};

export const getUserWorks: GetUserWorks = async () => {
  return request.get<Work[]>('/works');
};

export const createWork: CreateWork = async (workName: string) => {
  return request.post('/works', { workName });
};

export const getQiniuToken: GetQiniuToken = async () => {
  return request.get('/qiniu/token');
};

export const getWorkData: GetWorkData = async (workID: string) => {
  return request.get(`/works/${workID}`);
};

export const updateWork: UpdateWork = async (workID: string, panoramaTourConfig: PanoramaTourConfig | null) => {
  return request.put('/works', {
    workID,
    panoramaTourConfig: panoramaTourConfig || null,
  });
};

export const publishWork: PublishWork = async (workID: string, introduction: string) => {
  return request.post('/published-works', { workID, introduction });
};

export const getUserPublishedWorkByWorkID: GetUserPublishedWorkByWorkID = async (workID: string) => {
  return request.get(`/published-works/${workID}`);
};

export const getPublishedWorksBeforeArchorDate: GetPublishedWorksBeforeArchorDate = (
  archorDate: Date,
  cultureThemesNames: string[],
) => {
  return request.post<PublishedWork[]>(`/published-works/before/${archorDate.getTime()}/count/10`, {
    cultureThemesNames,
  });
};

export const getUserInformation: GetUserInformation = () => {
  return request.get<User>(`/users/information`);
};

export const getPublishedWorksOfGroupMembers: GetPublishedWorksOfGroupMembers = () => {
  return request.get<PublishedWork[]>(`/published-works/group`);
};

export const addComment: AddComment = (content: string, commentedPublishedWorkID: string) => {
  return request.post('/comments', {
    content,
    commentedPublishedWorkID,
  });
};

export const deleteComment: DeleteComment = (commentID: string) => {
  return request.delete(`/comments/${commentID}`);
};

export const getLanguagePackage: GetLanguagePackage = (languageName: LanguageNames) => {
  return request.get(`/languages/${languageName}`);
};

export const removeWork: RemoveWork = (workID: string) => {
  return request.delete(`/works/${workID}`);
};

export const getCultureThemes: GetCultureThemes = () => {
  return request.get('/cultureThemes');
};

export const updatePreferCultureThemes: UpdatePreferCultureThemes = (cultureThemesNames: string[]) => {
  return request.put('/cultureThemes/user', {
    cultureThemesNames,
  });
};

export const getSettings: GetSettings = () => {
  return request.get<Settings>('/settings');
};

export const updateProfile: UpdateProfile = (profile: User) => {
  return request.put('/users', profile);
};

export const getGroupMembers: GetGroupMembers = () => {
  return request.get<User[]>('/users/members');
};

export const getTasksProcess: GetTasksProcess = () => {
  return request.get('/tasks-process');
};

export const getCommentsOfPublishedWork: GetCommentsOfPublishedWork = (publishedWorkID: string) => {
  return request.get(`/comments?publishedWorkID=${publishedWorkID}`);
};
