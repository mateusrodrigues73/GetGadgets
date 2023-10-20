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
import UserProfile from './pages/UserProfile';
import UserProducts from './pages/UserProducts';
import UserProductEdit from './pages/UserProductEdit';
import ProductAdPosting from './pages/ProductAdPosting';
import ProductPage from './pages/ProductPage';
import ShoppingCart from './pages/ShoppingCart';
import AdvancedSearch from './pages/AdvancedSearch';
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
        path: '/atualizar-senha/:confirmacao?',
        element: <UpdatePassword />,
      },
      {
        path: '/perfil',
        element: <UserProfile />,
      },
      {
        path: '/seus-anuncios',
        element: <UserProducts />,
      },
      {
        path: '/editar-anuncio/:id',
        element: <UserProductEdit />,
      },
      {
        path: '/anunciar-produto',
        element: <ProductAdPosting />,
      },
      {
        path: '/produto/:id',
        element: <ProductPage />,
      },
      {
        path: '/carrinho-de-compras',
        element: <ShoppingCart />,
      },
      {
        path: '/busca-avancada',
        element: <AdvancedSearch />,
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
