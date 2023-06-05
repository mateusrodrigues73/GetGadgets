import { Outlet } from 'react-router-dom';

import Toast from './styles/Toast';

import { SupabaseProvider } from './contexts/SupabaseProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { UserProvider } from './contexts/UserProvider';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <SupabaseProvider>
    <AuthProvider>
      <UserProvider>
        <Toast />
        <Header />
        <Outlet />
        <Footer />
      </UserProvider>
    </AuthProvider>
  </SupabaseProvider>
);

export default App;
