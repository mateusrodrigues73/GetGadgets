import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';

import GlobalStyle from './styles/Global';
import Theme from './styles/Theme';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassWord from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/entrar/:confirmacao?',
        element: <Login />,
      },
      {
        path: '/cadastro',
        element: <SignUp />,
      },
      {
        path: '/recuperar-senha',
        element: <ForgotPassWord />,
      },
      {
        path: '/atualizar-senha',
        element: <UpdatePassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
