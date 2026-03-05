import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Import pages
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import ComoFunciona from './pages/ComoFunciona';
import CabildoDigital from './pages/CabildoDigital';
import Observatorio from './pages/Observatorio';
import Participa from './pages/Participa';
import AvisoLegal from './pages/AvisoLegal';

// Phase 2 Pages
import Login from './pages/Login';
import Miembro from './pages/Miembro';
import Votaciones from './pages/Votaciones';
import Iniciativas from './pages/Iniciativas';
import Representantes from './pages/Representantes';
import ResetPassword from './pages/ResetPassword';
import Donaciones from './pages/Donaciones';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="como-funciona" element={<ComoFunciona />} />
        <Route path="cabildo-digital" element={<CabildoDigital />} />
        <Route path="observatorio" element={<Observatorio />} />
        <Route path="participa" element={<Participa />} />
        <Route path="aviso-legal" element={<AvisoLegal />} />
        <Route path="login" element={<Login />} />
        <Route path="representantes" element={<Representantes />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="donaciones" element={<Donaciones />} />
        <Route path="contacto" element={<Contacto />} />


        {/* Private Routes */}
        <Route path="miembro" element={
          <PrivateRoute><Miembro /></PrivateRoute>
        } />
        <Route path="votaciones" element={
          <PrivateRoute><Votaciones /></PrivateRoute>
        } />
        <Route path="iniciativas" element={
          <PrivateRoute><Iniciativas /></PrivateRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
