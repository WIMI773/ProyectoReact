import React from 'react';
import { useCarrito } from '../components/CarritoContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CarritoPagos = () => {
  const { carrito, totalCarrito } = useCarrito();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  const handleConfirmarCompra = (e) => {
    e.preventDefault();

    Swal.fire({
      title: '¿Confirmas que quieres proceder a elegir el método de pago?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/MetodosPagos');
      }
    });
  };

  return (
    <>
      <div className="container py-5">
        <h2 className="mb-4 text-center">Resumen de tu compra</h2>

        {carrito.length === 0 ? (
          <div className="alert alert-warning text-center">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="row g-3">
              {carrito.map((item, index) => (
                <div key={index} className="col-12">
                  <div className="card shadow-sm">
                    <div className="row g-0 align-items-center">
                      <div className="col-md-2 text-center p-2">
                        <img
                          src={item.src}
                          alt={item.nombre}
                          className="img-fluid rounded"
                          style={{ maxHeight: '80px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="col-md-10">
                        <div className="card-body d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title mb-1">{item.nombre}</h5>
                            <p className="mb-0">Cantidad: {item.cantidad}</p>
                            <p className="mb-0 text-muted">
                              Precio unitario:{' '}
                              {item.precio.toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                              })}
                            </p>
                          </div>
                          <div className="text-end">
                            <strong>Total:</strong>
                            <div>
                              {(item.cantidad * item.precio).toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total y botones */}
            <div className="mt-5">
              <h4 className="text-end">
                Total a pagar:&nbsp;
                <span className="text-success">
                  {totalCarrito.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                  })}
                </span>
              </h4>

              <hr />

              <form onSubmit={handleConfirmarCompra}>
                <button type="submit" className="btn btn w-100 mb-3" style={{backgroundColor: '#FFD600'}}>
                  Confirmar compra
                </button>
              </form>

              <button
                type="button"
                className="btn btn w-100" style={{backgroundColor: '#e4e4e4ff'}}
                onClick={() => navigate('/Frutas')}
              >
                Volver
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarritoPagos;
