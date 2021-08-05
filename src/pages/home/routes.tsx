import { IRoute } from 'routes';
import Exhibition from './contents-module/exhibition';
import Friends from './contents-module/friends';
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
];

export default routes;
