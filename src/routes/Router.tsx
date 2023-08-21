import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../components/App';

import Index from './Index';
import AddBook from './AddBook';
import BorrowBook from './BorrowBook';
import ReturnBook from './ReturnBook';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: 'add-book', element: <AddBook /> },
      { path: 'borrow-book', element: <BorrowBook /> },
      { path: 'return-book', element: <ReturnBook /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
