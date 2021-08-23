import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import { IHOCRoute, HOCRouteTypes } from 'interface';
import PublicRoute from 'HOCRoute/public.route';
import ProtectedRoute from 'HOCRoute/protected.route';

import { routes } from 'routes/config';

export interface IRedirect {
  target: string;
}

export interface IRoute extends RouteProps {
  HOCRouteType?: HOCRouteTypes;
  children?: IRoute[];
  redirect?: IRedirect;
  component?: React.FC;
}

const HOCRoutes = new Map<HOCRouteTypes, IHOCRoute>();
HOCRoutes.set(HOCRouteTypes.public, PublicRoute);
HOCRoutes.set(HOCRouteTypes.protected, ProtectedRoute);

const searchRoutesByPath: (routes: IRoute[], path: string | null) => IRoute[] = (
  routes: IRoute[],
  path: string | null,
) => {
  if (path === null) return routes;
  for (const route of routes) {
    if (route.path === path) {
      return route?.children || [];
    } else if (route.children) {
      return searchRoutesByPath(route.children, path);
    }
  }
  return [];
};

export const renderRoutes: (path: string | null) => React.ReactNode = (path: string | null) => {
  const matchedRoutes: IRoute[] = searchRoutesByPath(routes, path);
  const pathPrefix = path || '';
  const Routes: React.ReactNode = matchedRoutes.map((route, index) => {
    let RouteComponent: IHOCRoute | typeof Route = Route;
    if (route.redirect) {
      return (
        <Route key={index} exact={Boolean(route.exact)} path={pathPrefix + route.path}>
          <Redirect to={pathPrefix + route.redirect.target} />
        </Route>
      );
    }

    if (route.HOCRouteType !== undefined) {
      RouteComponent = HOCRoutes.get(route.HOCRouteType) || Route;
    }
    return (
      <RouteComponent
        component={route.component}
        exact={Boolean(route.exact)}
        path={pathPrefix + route.path}
        key={index}
      ></RouteComponent>
    );
  });
  return <Switch>{Routes}</Switch>;
};
