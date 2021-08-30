import SignIn from 'pages/signin';
import SignUp from 'pages/signup';
import Home from 'pages/home';
import HomePageRoutes from 'pages/home/routes';
import Studio from 'pages/studio';
import Play from 'pages/play';

import { IRoute } from 'routes/index';
import { HOCRouteTypes } from 'interface';

export interface StudioPageParams {
  workID: string;
}

export const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    redirect: {
      target: '/dashboard',
    },
  },
  {
    path: '/dashboard',
    component: Home,
    HOCRouteType: HOCRouteTypes.protected,
    children: HomePageRoutes,
  },
  {
    path: '/studio/:workID',
    component: Studio,
  },
  {
    path: '/play/:workID',
    component: Play,
  },
  {
    path: '/signin',
    component: SignIn,
    HOCRouteType: HOCRouteTypes.public,
  },
  {
    path: '/signup',
    component: SignUp,
    HOCRouteType: HOCRouteTypes.public,
  },
];
