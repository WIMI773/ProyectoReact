import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PagosNequi.css';

const PagosNequi = () => {
  const [telefono, setTelefono] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const telefonoValido = /^\d{10}$/.test(telefono);
    const montoValido = monto && Number(monto) > 0;

    if (!telefonoValido) {
      return Swal.fire('Número inválido', 'Debe tener 10 dígitos numéricos.', 'error');
    }

    if (!montoValido) {
      return Swal.fire('Monto inválido', 'Ingresa un monto mayor a 0.', 'error');
    }

    const result = await Swal.fire({
      title: '¿Confirmar pago?',
      html: `
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Monto:</strong> $${Number(monto).toLocaleString()}</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      await Swal.fire('¡Pago realizado!', 'Gracias por usar Nequi.', 'success');
      navigate('/PaginaPrincipal');
    }
  };

  return (
    <div className="nequi-wrapper">
      <div className="nequi-card">
        <h2 className="nequi-title">Pago con Nequi</h2>

        <form onSubmit={handleSubmit} className="nequi-form">
          <label htmlFor="telefono" style={{color:'#390352'}}>Teléfono Nequi</label>
          <input
            type="tel"
            id="telefono"
            maxLength={10}
            placeholder="3001234567"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ''))}
            required
          />

          <label htmlFor="monto" style={{color:'#390352'}}>Monto a pagar</label>
          <input
            type="number"
            id="monto"
            placeholder="50000"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            min="1"
            required
          />

          <button type="submit" className="nequi-button">Pagar</button>
        </form>

        <Link to="/MetodosPagos" className="nequi-back">← Volver</Link>
      </div>
    </div>
  );
};

export default PagosNequi;
