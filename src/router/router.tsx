import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { ErrorComponent } from '../components/Error/ErrorComponent';
import { MainPage } from '../pages/Main/MainPage';
import { Detail } from '../components/Details/Detail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        element: <MainPage />,
        errorElement: <ErrorComponent />
      },
      {
        path: '/search/:page',
        element: <MainPage />,
        errorElement: <ErrorComponent />,
        children: [
          {
            path: 'details/:id',
            element: <Detail />
          }
        ]
      },
      {
        path: '/:page',
        element: <MainPage />,
        errorElement: <ErrorComponent />,
        children: [
          {
            path: 'details/:id',
            element: <Detail />
          }
        ]
      }
    ]
  }
]);
