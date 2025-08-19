import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import Recuperar from './Pages/Recuperar/Recuperar';
import Registrar from './Pages/Registrar/Registrar';
import PaginaPrincipal from './Pages/PaginaPrincipal/PaginaPrincipal'; 
import UseStateExample from './Playground/UseStateExample';
import UseEffectExample from './Playground/useEffectExample';
import ProtectedRoute from './Pages/components/ProtectedRoute';
import NotFoundPage from './Pages/components/NotFoundPage';
import ListUsersPage from './Pages/ListUsers/ListUsersPage';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Frutas from './Pages/Productos/Frutas';
import Carnes from './Pages/Productos/Carnes';
import Lacteos from './Pages/Productos/Lacteos';
import Aseo from './Pages/Productos/Aseo';
import Alcohol from './Pages/Productos/Alcohol';
import Verduras from './Pages/Productos/Verduras';
import Medicamentos from './Pages/Productos/Medicamentos';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Contacto from './Pages/Contacto/contacto';
import Ofertas from './Pages/ofertas/ofertas.js';
import { CarritoProvider } from './Pages/components/CarritoContext.js';
import Perfil from './Pages/perfil/perfil.js';

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider> {/* ← AQUÍ está el CarritoProvider envolviendo todas las rutas */}
        <Routes>
          {/*Rutas Publicas*/}
          <Route path="/" element={<LoginPage />} />
          <Route path="/Recuperar" element={<Recuperar />} />
          <Route path="/Registrar" element={<Registrar />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ofertas" element={<Ofertas/>} />
          <Route path="/Frutas" element={<Frutas />} />
          <Route path="/Aseo" element={<Aseo />} />
          <Route path="/Carnes" element={<Carnes />} />
          <Route path="/Lacteos" element={<Lacteos />} />
          <Route path="/Alcohol" element={<Alcohol />}/> 
          <Route path="/Verduras" element={<Verduras />}/> 
          <Route path="/contacto" element={<Contacto />}/> 
          <Route path="/Medicamentos" element={<Medicamentos />}/> 

          {/*Rutas Privadas*/}
          <Route path="/PaginaPrincipal" element={<ProtectedRoute> <PaginaPrincipal /> </ProtectedRoute>} />
          <Route path="/ListUsersPage" element={<ProtectedRoute> <ListUsersPage /> </ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute> <Perfil/> </ProtectedRoute>} />

          {/*Rutas no encontradas*/}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/UseStateExample" element={<UseStateExample />} />
          <Route path="/UseEffectExample" element={<UseEffectExample />} />
        </Routes>
      </CarritoProvider>
    </BrowserRouter>
  );
}

export default App;