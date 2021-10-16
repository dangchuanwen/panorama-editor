import { IRoute } from 'routes';
import Exhibition from './contents-module/exhibition';
import Friends from './contents-module/friends';
import Settings from './contents-module/settings';
import Works from './contents-module/works';

const routes: IRoute[] = [
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
  {
    path: '/settings',
    component: Settings,
  },
];

export default routes;
