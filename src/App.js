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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rutas Publicas*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Recuperar" element={<Recuperar />} />
        <Route path="/Registrar" element={<Registrar />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        {/*Rutas Privadas*/}
        <Route path="/PaginaPrincipal" element={<ProtectedRoute> <PaginaPrincipal /> </ProtectedRoute>} />
        <Route path="/ListUsersPage" element={<ProtectedRoute> <ListUsersPage /> </ProtectedRoute>} />

        {/*Rutas no encontradas*/}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/UseStateExample" element={<UseStateExample />} />
        <Route path="/UseEffectExample" element={<UseEffectExample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
