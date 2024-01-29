import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/home-page';
import AuthPage from '../pages/auth-page';

const RouteConfiguration = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <App />,
      errorElement: <div>error</div>,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
      ],
    },
    {
      path: '/auth',
      element: <AuthPage />,
      errorElement: <div>error</div>,
    },
  ];

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default RouteConfiguration;
