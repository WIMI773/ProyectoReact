import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function PaginaPrincipal() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      Swal.fire('Atención', 'Por favor ingresa un término para buscar.', 'info');
      return;
    }
    Swal.fire(`Buscando productos para: "${searchTerm}"`);
  };

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

  const productos = [
    {
      nombre: "Ron Caldas",
      desc: "Ron viejo de caldas 1000ml",
      src: "/imagenesProductos/ron.png",
      precio: 70000
    },
    {
      nombre: "Aguardiente Antioqueño",
      desc: "Aguardiente Antioqueño 375ml",
      src: "/imagenesProductos/antioqueño.png",
      precio: 40000
    },
    {
      nombre: "Cerveza Poker",
      desc: "Cerveza Poker lata 330ml",
      src: "/imagenesProductos/poker.png",
      precio: 3500
    },
    {
      nombre: "Cerveza Aguila",
      desc: "Cerveza Aguila botella 330ml",
      src: "/imagenesProductos/aguila.png",
      precio: 1800
    },
    
    {
      nombre: "Leche Entera Alpina",
      desc: "Leche en bolsa 1 litro",
      src: "/imagenesProductos/alpina.png",
      precio: 8000
    },
    {
      nombre: "Arroz Diana",
      desc: "Bolsa de arroz 5 kilos",
      src: "/imagenesProductos/arroz.png",
      precio: 15000
    }
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#FFD600' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">LaAmistad</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" to="/">Inicio</Link></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="productosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Productos</a>
                <ul className="dropdown-menu" aria-labelledby="productosDropdown">
                  <li><Link className="dropdown-item" to="/Frutas">Frutas</Link></li>
                  <li><Link className="dropdown-item" to="/Carnes">Carnes</Link></li>
                  <li><Link className="dropdown-item" to="/Lacteos">Lácteos</Link></li>
                  <li><Link className="dropdown-item" to="/Alcohol">Alcohol</Link></li>
                  <li><Link className="dropdown-item" to="/Medicamentos">Medicamentos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/ver-todos">Ver todos</Link></li>
                </ul>
              </li>
              <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/ListUsersPage">Usuarios</Link></li>
            </ul>
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar productos"
              />
              <button className="btn btn-warning" type="submit">Buscar</button>
            </form>
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

      {/* Sección de bienvenida */}
      <header
        className="text-center py-5"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="container">
          <h1
            className="fw-bold mb-3"
            style={{ fontSize: '2.5rem', color: '#212529' }}
          >
            Bienvenido a <span style={{ color: '#FFD600' }}>LaAmistad</span>
          </h1>
          <p
            className="mb-4"
            style={{ fontSize: '1.2rem', color: '#000000ff' }}
          >
            Calidad y confianza en cada compra para ti y tu familia.
          </p>
          <button
            className="btn btn-warning btn-lg fw-semibold"
            style={{
              borderRadius: '8px',
              padding: '12px 28px',
              boxShadow: '0 4px 10px rgba(255, 214, 0, 0.6)',
              backgroundColor: '#ffd600',
              color: 'black',
              border: 'none',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => navigate('/contacto')}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#b3a700ff')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffd600')}
          >
            Contáctanos
          </button>
        </div>
      </header>

      {/* Carrusel de productos */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Productos Destacados</h2>

        <div id="carouselProductos" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {Array.from({ length: Math.ceil(productos.length / 4) }, (_, i) => (
              <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
                <div className="row justify-content-center">
                  {productos.slice(i * 4, i * 4 + 4).map((prod, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                      <div className="card h-100">
                        <img
                          src={prod.src}
                          className="card-img-top"
                          alt={prod.nombre}
                          style={{ height: '200px', objectFit: 'contain' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{prod.nombre}</h5>
                          <p className="card-text">{prod.desc}</p>
                          <p className="fw-bold">${prod.precio.toLocaleString('es-CO')}</p>
                          <button className="btn btn-warning btn-sm mt-auto">Agregar</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Flechas amarillas personalizadas */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselProductos"
            data-bs-slide="prev"
            style={{ width: '5%' }}
          >
            <span
              style={{
                color: '#FFD600',
                fontSize: '3rem',
                fontWeight: 'bold',
                lineHeight: '1',
              }}
              aria-hidden="true"
            >
              ❮
            </span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselProductos"
            data-bs-slide="next"
            style={{ width: '5%' }}
          >
            <span
              style={{
                color: '#FFD600',
                fontSize: '3rem',
                fontWeight: 'bold',
                lineHeight: '1',
              }}
              aria-hidden="true"
            >
              ❯
            </span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </section>

      <section className="bg-warning py-5 text-center">
        <div className="container">
          <h2>Ofertas de la Semana</h2>
          <p className="lead">Ahorra hasta un 30% en productos seleccionados.</p>
          <button className="btn btn-danger">Ver Ofertas</button>
        </div>
      </section>

      <footer className="bg-dark text-light py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} LaAmistad Supermercado</p>
          <p>
            <Link to="#" className="text-warning">Política de privacidad</Link> |{' '}
            <Link to="#" className="text-warning">Términos y condiciones</Link>
          </p>
        </div>
      </footer>
    </>
  );
}

export default PaginaPrincipal;