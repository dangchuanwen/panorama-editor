import { message } from 'antd';
import { getAccessTokenFromLocalStorage } from 'auth/auth';
import axios, { AxiosInstance, AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { Country, Gender, ToolNames } from 'interface';

type HotSpot = {
  pitch: number;
  yaw: number;
  text: string;
  type: 'scene' | 'info';
  sceneId?: string;
  toolName: ToolNames;
};

type Scene = {
  hotSpots: HotSpot[];
  panorama: string;
  type: string;
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
};
export type Work = {
  _id: string;
  workName: string;
  panoramaTourConfig: PanoramaTourConfig;
};
export type PublishedWork = {
  createdTime: Date;
  introduction: string;
  work: Work;
  user: User;
};

type Register = (userName: string, password: string, gender: Gender, country: Country) => AxiosPromise;
type Login = (userName: string, password: string) => AxiosPromise<LoginResult>;
type GetUserWorks = () => AxiosPromise<Work[]>;
type CreateWork = (workName: string) => AxiosPromise;
type GetQiniuToken = () => AxiosPromise<string>;
type GetWorkData = (workID: string) => AxiosPromise<Work>;
type UpdateWork = (workName: string, panoramaTourConfig: PanoramaTourConfig | null) => AxiosPromise<Work>;
type PublishWork = (workID: string, introduction: string) => AxiosPromise;
type GetUserPublishedWorkByWorkID = (workID: string) => AxiosPromise<PublishedWork>;
type GetPublishedWorksBeforeArchorDate = (archorDate: Date) => AxiosPromise<PublishedWork[]>;
type GetUserInformation = () => AxiosPromise<User>;

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
    message.error(err.response?.data);
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

export const getPublishedWorksBeforeArchorDate: GetPublishedWorksBeforeArchorDate = (archorDate: Date) => {
  return request.get<PublishedWork[]>(`/published-works/before/${new Date(archorDate).getTime()}/count/5`);
};

export const getUserInformation: GetUserInformation = () => {
  return request.get<User>(`/users/information`);
};
