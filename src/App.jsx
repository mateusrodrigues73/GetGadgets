import { Outlet } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthProvider';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <AuthProvider>
    <Header />
    <Outlet />
    <Footer />
  </AuthProvider>
);

export default App;
