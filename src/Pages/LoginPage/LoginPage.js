import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../Firebase';
import { signInWithPopup } from 'firebase/auth';
import './LoginPage.css';
import Swal from 'sweetalert2';

const usuarios = [
  { email: "juan@correo.com", password: "jua123" },
  { email: "maria@correo.com", password: "mar123" },
];

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioValido = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioValido) {
      console.log('Inicio de sesión correcto');
      if (remember) {
        localStorage.setItem('usuario', JSON.stringify(usuarioValido));
      }
      navigate('/PaginaPrincipal');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await Swal.fire({
        title: "¡Bienvenido!",
        text: `Sesión iniciada con Google: ${user.email}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/PaginaPrincipal');
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
    }
  };


  return (
    <div className="login-container">
      <div className='font-login'>
        <div className="card p-4 shadow-sm login-card" >
          <h3 className="card-title text-center mb-4 text-danger" >Iniciar Sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{color: 'white'}}>Correo electrónico</label>
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
              <label htmlFor="password" className="form-label " style={{color:'white'}}>Contraseña</label>
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
              <label className="form-check-label" style={{color:'white'}} htmlFor="rememberCheck">Recuérdame</label>
            </div>

            <div className="card-footer text-center">
              <button type="submit" className="btn btn-danger w-100 mb-2">Entrar</button>
            </div>
          </form>

          <div>
            <button type="button" className='btn btn-dark w-100' style={{backgroundColor:'white', color: 'black'}} onClick={handleGoogleLogin}>
              Iniciar Sesión con Google
            </button>
          </div>

          <div className="card-footer text-center mt-3">
            <small className="text" style={{color: 'white'}}>
              ¿Olvidaste tu contraseña? <a href="/Recuperar">Reestablece</a>
            </small>
          </div>

          <div className="card-footer text-center mt-2">
            <small className="text" style={{color: 'white'}}>
              ¿No tienes cuenta? <a href="/Registrar">Regístrate</a>
            </small>
          </div>
        </div>
      </div>
      </div>
      );
}

      export default LoginPage;
