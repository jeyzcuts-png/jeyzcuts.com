import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import ProdNotFoundPage from './pages/_404';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/index';
import JeyzDripPage from './pages/jeyzdrip';
import ProductosPage from './pages/productos';

const NotFoundPage = import.meta.env.DEV
  ? lazy(() => import('../dev-tools/src/PageNotFound'))
  : ProdNotFoundPage;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/jeyzdrip',
    element: <JeyzDripPage />,
  },
  {
    path: '/productos',
    element: <ProductosPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export type Path = '/' | '/login' | '/dashboard' | '/jeyzdrip' | '/productos';
export type Params = Record<string, string | undefined>;
