import { Outlet } from 'react-router-dom';

import Toast from './styles/Toast';

import { AuthProvider } from './contexts/AuthProvider';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <AuthProvider>
    <Toast />
    <Header />
    <Outlet />
    <Footer />
  </AuthProvider>
);

export default App;
