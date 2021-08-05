import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';
import Home from 'pages/home/Home';
import Works from 'pages/home/contents-module/works';
import Exhibition from 'pages/home/contents-module/exhibition';
import Friends from 'pages/home/contents-module/friends';

import { IRoute } from 'routes/index';
import { HOCRouteTypes } from 'interface';

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
    children: [
      {
        path: '/',
        exact: true,
        redirect: {
          target: '/works',
        },
      },
      {
        path: '/works',
        component: Works,
      },
      {
        path: '/exhibition',
        component: Exhibition,
      },
      {
        path: '/friends',
        component: Friends,
      },
    ],
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
