import React, { useState } from 'react';
import './Recuperar.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Recuperar() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire('Error', 'Por favor ingresa un correo electrónico.', 'error');
      return;
    }

    const auth = getAuth();

    try {
      Swal.fire({
        title: 'Enviando correo...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
      });

      await sendPasswordResetEmail(auth, email);

      Swal.fire('¡Correo enviado!', 'Revisa tu bandeja de entrada (y spam).', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="background-recuperar d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm my-reset" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4" style={{ color: '#FFD600' }}>Recuperar Contraseña</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label" style={{ color: 'white' }}>Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="usuario@ejemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="card-footer text-center">
              <button type="submit" className="btn w-100" style={{ backgroundColor: '#FFD600' }}>
                Enviar Correo
              </button>
            </div>

            <div className="card-footer text-center mt-2">
              <button
                type="button"
                className="btn btn-outline-light w-100"
                onClick={handleBack}
              >
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recuperar;
