import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import nequi from '../../images/nequi.png';
import tarjeta from '../../images/tarjeta.avif';
import pagocontra from '../../images/pagocontra.png';
import banco from '../../images/banco.png';

const MetodosPagos = () => {
  const [metodoPago, setMetodoPago] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
    }).then(() => {
      navigate('/');
    });
  };

  const handleMetodoChange = (e) => {
    const metodo = e.target.value;
    setMetodoPago(metodo);

    if (metodo === 'Nequi') navigate('/PagosNequi');
    else if (metodo === 'Tarjeta de crédito') navigate('/pago-tarjeta');
    else if (metodo === 'Bancolombia') navigate('/pago-bancolombia');
    else if (metodo === 'Pago contra entrega') navigate('/pago-efectivo');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#FFD600' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/PaginaPrincipal">LaAmistad</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" to="/PaginaPrincipal">Inicio</Link></li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="productosDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Productos
                </a>
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

            {/* Buscador */}
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

            {/* Dropdown usuario */}
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                style={{ backgroundColor: '#F44336', color: 'black' }}
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido formulario */}
      <div className="container py-5">
        <h2 className="mb-4 text-center">Elige tu método de pago</h2>

        <form>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            {/* Tarjeta */}
            <label
              htmlFor="tarjeta"
              className={`payment-box ${metodoPago === 'Tarjeta de crédito' ? 'selected' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="metodoPago"
                id="tarjeta"
                value="Tarjeta de crédito"
                onChange={handleMetodoChange}
                style={{ display: 'none' }}
              />
              <img src={tarjeta} alt="Tarjeta" style={{ width: '60px', height: 'auto', marginBottom: '10px' }} />
              <div>Tarjeta de crédito</div>
            </label>

            {/* Nequi */}
            <label
              htmlFor="nequi"
              className={`payment-box ${metodoPago === 'Nequi' ? 'selected' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="metodoPago"
                id="nequi"
                value="Nequi"
                onChange={handleMetodoChange}
                style={{ display: 'none' }}
              />
              <img src={nequi} alt="Nequi" style={{ width: '60px', height: 'auto', marginBottom: '10px' }} />
              <div>Nequi</div>
            </label>

            {/* Bancolombia */}
            <label
              htmlFor="bancolombia"
              className={`payment-box ${metodoPago === 'Bancolombia' ? 'selected' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="metodoPago"
                id="bancolombia"
                value="Bancolombia"
                onChange={handleMetodoChange}
                style={{ display: 'none' }}
              />
              <img src={banco} alt="Bancolombia" style={{ width: '60px', height: 'auto', marginBottom: '10px' }} />
              <div>Bancolombia</div>
            </label>

            {/* Pago contra entrega */}
            <label
              htmlFor="efectivo"
              className={`payment-box ${metodoPago === 'Pago contra entrega' ? 'selected' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="metodoPago"
                id="efectivo"
                value="Pago contra entrega"
                onChange={handleMetodoChange}
                style={{ display: 'none' }}
              />
              <img src={pagocontra} alt="Pago contra entrega" style={{ width: '60px', height: 'auto', marginBottom: '10px' }} />
              <div>Pago contra entrega</div>
            </label>
          </div>
        </form>

        {/* Slider con descripción dinámica */}
        {metodoPago && (
          <div
            id="paymentDescriptionCarousel"
            className="carousel slide mt-5"
            data-bs-ride="carousel"
            style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <div className="carousel-inner text-center p-4 bg-light rounded shadow-sm">
              <div className={`carousel-item ${metodoPago === 'Tarjeta de crédito' ? 'active' : ''}`}>
                <img src={tarjeta} alt="Tarjeta de crédito" style={{ width: '80px', marginBottom: '15px' }} />
                <h5>Tarjeta de crédito</h5>
                <p>Paga con tarjeta de crédito de forma segura y rápida.</p>
              </div>
              <div className={`carousel-item ${metodoPago === 'Nequi' ? 'active' : ''}`}>
                <img src={nequi} alt="Nequi" style={{ width: '80px', marginBottom: '15px' }} />
                <h5>Nequi</h5>
                <p>Usa Nequi para pagos rápidos y sin comisiones adicionales.</p>
              </div>
              <div className={`carousel-item ${metodoPago === 'Bancolombia' ? 'active' : ''}`}>
                <img src={banco} alt="Bancolombia" style={{ width: '80px', marginBottom: '15px' }} />
                <h5>Bancolombia</h5>
                <p>Realiza tu pago directamente desde tu cuenta Bancolombia.</p>
              </div>
              <div className={`carousel-item ${metodoPago === 'Pago contra entrega' ? 'active' : ''}`}>
                <img src={pagocontra} alt="Pago contra entrega" style={{ width: '80px', marginBottom: '15px' }} />
                <h5>Pago contra entrega</h5>
                <p>Paga en efectivo cuando recibas tu pedido en casa.</p>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#paymentDescriptionCarousel"
              data-bs-slide="prev"
              style={{ filter: 'invert(1)' }}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#paymentDescriptionCarousel"
              data-bs-slide="next"
              style={{ filter: 'invert(1)' }}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        )}

        {/* Botón Volver al inicio */}
        <div className="d-flex justify-content-center mt-4">
          <button
            type="button"
            className="btn btn"
            style={{ backgroundColor: '#e4e4e4ff' }}
            onClick={() => navigate('/PaginaPrincipal')}
          >
            Volver al inicio
          </button>

          
        </div>
      </div>

      

      {/* Estilos CSS mejorados pero con letras originales */}
      <style>{`
        .payment-box {
          border: 2px solid #FFD600;
          border-radius: 10px;
          padding: 20px;
          width: 150px;
          text-align: center;
          transition: border-color 0.3s, background-color 0.3s, box-shadow 0.3s, transform 0.3s;
          user-select: none;
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          cursor: pointer;
        }
        .payment-box:hover {
          border-color: #28a745;
          background-color: #e6ffe6;
          box-shadow: 0 8px 15px rgba(40, 167, 69, 0.3);
          transform: translateY(-4px);
        }
        .payment-box.selected {
          border-color: #28a745;
          background-color: #d4edda;
          box-shadow: 0 0 12px rgba(40, 167, 69, 0.6);
          transform: translateY(-6px);
        }
      `}</style>
    </>
  );
};

export default MetodosPagos;
