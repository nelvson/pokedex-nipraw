import { RouteProps } from 'react-router-dom';

import { Landing, List, Detail, Filter, Compare } from '../screens';

const commonRoutes = [
  {
    path: '/',
    exact: true,
    component: Landing,
  },
  {
    path: '/list',
    exact: true,
    component: List,
  },
  {
    path: '/detail/:id',
    exact: true,
    component: Detail,
  },
  {
    path: '/filter',
    exact: true,
    component: Filter,
  },
  {
    path: '/compare',
    exact: true,
    component: Compare,
  },
];

export const routes: Array<RouteProps> = [...commonRoutes];
