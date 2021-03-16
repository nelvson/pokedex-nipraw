import { RouteProps } from 'react-router-dom';

import { Landing, List } from '../screens';

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
];

export const routes: Array<RouteProps> = [...commonRoutes];
