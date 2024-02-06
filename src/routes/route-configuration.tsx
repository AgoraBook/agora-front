import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/home-page';
import AuthPage from '../pages/auth-page';
import { SignupPage } from '../pages/signup-page';

const RouteConfiguration = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      //  여기에 경로보호 HOC 혹은 컴포넌트로 감싸기
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
    {
      path: '/signup',
      element: <SignupPage />,
      errorElement: <div>error</div>,
    },
  ];

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default RouteConfiguration;
