import { Outlet } from 'react-router-dom';

import Toast from './styles/Toast';

import { SupabaseProvider } from './contexts/SupabaseProvider';
import { AuthProvider } from './contexts/AuthProvider';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <SupabaseProvider>
    <AuthProvider>
      <Toast />
      <Header />
      <Outlet />
      <Footer />
    </AuthProvider>
  </SupabaseProvider>
);

export default App;
