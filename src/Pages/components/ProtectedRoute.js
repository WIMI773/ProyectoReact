import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const [fakeLoading, setFakeLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !fakeLoading && !user) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso restringido',
        text: 'Debes iniciar sesión para acceder a esta página.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/', { replace: true });
      });
    }
  }, [loading, fakeLoading, user, navigate]);

  // 🟡 Mientras carga, devolvemos algo válido (un spinner o texto)
  if (loading || fakeLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // 🔴 Si no hay usuario, evitamos renderizar hijos inválidos
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Si hay usuario, renderizamos la página protegida
  return children;
}

export default ProtectedRoute;
