import React, { useState } from 'react';
import { useCarrito } from '../components/CarritoContext';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CarritoPagos = () => {
  const { carrito, totalCarrito } = useCarrito();
  const [searchTerm, setSearchTerm] = useState('');
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
      // si cancela, no hace nada
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#FFD600' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/PaginaPrincipal">LaAmistad</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" to="/PaginaPrincipal">Inicio</Link></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="productosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Productos</a>
                <ul className="dropdown-menu" aria-labelledby="productosDropdown">
                  <li><Link className="dropdown-item" to="/frutas">Frutas</Link></li>
                  <li><Link className="dropdown-item" to="/carnes">Carnes</Link></li>
                  <li><Link className="dropdown-item" to="/lacteos">Lácteos</Link></li>
                  <li><Link className="dropdown-item" to="/Alcohol">Alcohol</Link></li>
                  <li><Link className="dropdown-item" to="/Medicamentos">Medicamentos</Link></li>
                  <li><Link className="dropdown-item" to="/Aseo">Aseo</Link></li>
                  <li><Link className="dropdown-item" to="/Verduras">Verduras</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/ver-todos">Ver todos</Link></li>
                </ul>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/ListUsersPage">Usuarios</Link></li>
            </ul>
            <form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-warning" type="submit">Buscar</button>
            </form>
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle d-flex align-items-center" style={{ backgroundColor: '#F44336', color: 'black' }} type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido */}
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
                              Precio unitario: {item.precio.toLocaleString('es-CO', {
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

            {/* Total y botón para confirmar */}
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

              {/* Botón solo */}
              <form onSubmit={handleConfirmarCompra}>
                <button type="submit" className="btn btn-success w-100">
                  Confirmar compra
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarritoPagos;
