import { useState } from 'react';
import Swal from 'sweetalert2';
import { auth, googleProvider, db, signOut } from '../../Firebase';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './LoginPage.css';
import carrito from '../../images/carrito.png'; // ✅ Ajusta según tu estructura

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // LOGIN CON EMAIL/PASSWORD
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Campos vacíos", "Por favor llena todos los campos.", "warning");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Opcional: verificar si existe documento en Firestore
      const userDocRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.estado === "Inactivo") {
          Swal.fire("Acceso denegado", "Tu cuenta está inactiva. Contacta al administrador.", "error");
          return;
        }
      }

      Swal.fire({
        title: "¡Bienvenido!",
        text: `Sesión iniciada como ${user.email}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "/PaginaPrincipal";
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Credenciales incorrectas o usuario no existe.", "error");
    }
  };

  // LOGIN CON GOOGLE
  const handleGoogleLogin = async () => {
    try {
      const googleResult = await signInWithPopup(auth, googleProvider);
      const user = googleResult.user;

      // Verificar si ya existía ese correo con otro método
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.includes('password')) {
        // Si existe por password hay que vincularlo
        const password = await solicitarPassword();
        if (!password) {
          Swal.fire("Cancelado", "Operación cancelada.", "info");
          return;
        }

        // Crear credential de email/password
        const credential = EmailAuthProvider.credential(user.email, password);
        await linkWithCredential(user, credential);
      }

      Swal.fire({
        title: "¡Bienvenido!",
        text: `Sesión iniciada con Google: ${user.email}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "/PaginaPrincipal";
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
    }
  };

  const solicitarPassword = async () => {
    const result = await Swal.fire({
      title: "Contraseña requerida",
      input: "password",
      inputLabel: "Introduce tu contraseña para vincular cuentas",
      inputPlaceholder: "Tu contraseña",
      showCancelButton: true,
      confirmButtonText: "Vincular",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed && result.value) {
      return result.value;
    }
    return null;
  };


  return (
    <div className="login-container">
      <div className='font-login'>
        <div className="card p-4 shadow-sm login-card">

          {/* Logo del carrito + título */}
          <div className="text-center mb-3">
            <img
              src={carrito}
              alt="Logo Carrito"
              style={{ width: '60px', marginBottom: '10px' }}
            />
            <h3 className="card-title text" style={{ color: '#FFD600' }}>La Amistad</h3>
            <h3 className="card-title text" style={{ color: '#FFD600' }}>Iniciar Sesión</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: 'white' }}>Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: 'white' }}>Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberCheck"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberCheck" style={{ color: 'white' }}>Recuérdame</label>
            </div>

            <div className="card-footer text-center">
              <button type="submit" className="btn btn w-100 mb-2" style={{ backgroundColor: '#FFD600' }}> Entrar</button>
            </div>
          </form>

          <div>
            <button
              type="button"
              className='btn btn-dark w-100'
              style={{ backgroundColor: 'white', color: '#E42310' }}
              onClick={handleGoogleLogin}
            >
              Iniciar Sesión con Google
            </button>
          </div>

          <div className="card-footer text-center mt-3">
            <small className="text" style={{ color: 'white' }}>
              ¿Olvidaste tu contraseña? <a href="/Recuperar">Reestablece</a>
            </small>
          </div>

          <div className="card-footer text-center mt-2">
            <small className="text" style={{ color: 'white' }}>
              ¿No tienes cuenta? <a href="/Registrar">Regístrate</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
