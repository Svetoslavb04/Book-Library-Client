import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../components/App';

import Index from './Index/Index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Index /> }],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
