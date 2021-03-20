import { RouteProps } from 'react-router-dom';

import { Landing, List, Detail, Filter } from '../screens';

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
];

export const routes: Array<RouteProps> = [...commonRoutes];
