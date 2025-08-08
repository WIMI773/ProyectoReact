import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Carousel } from 'react-bootstrap'; // Importar carrusel
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'; // Flechas bonitas

function Ofertas() {
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

  const productosOferta = [
    {
      nombre: "Ron Caldas",
      desc: "Ron viejo de caldas 1000ml",
      detalle: "Licor premium con 30% de descuento",
      imagen: "/imagenesProductos/ron.png",
      precioAnterior: 70000,
      precioOferta: 49000
    },
    {
      nombre: "Aguardiente Antioqueño",
      desc: "Botella 375ml",
      detalle: "El sabor de siempre, más barato",
      imagen: "/imagenesProductos/antioqueño.png",
      precioAnterior: 40000,
      precioOferta: 32000
    },
    {
      nombre: "Cerveza Poker",
      desc: "Lata 330ml",
      detalle: "Pack especial de verano",
      imagen: "/imagenesProductos/Poker.png",
      precioAnterior: 3500,
      precioOferta: 2800
    },
    {
      nombre: "Cerveza Poker",
      desc: "Lata 330ml",
      detalle: "Pack especial de verano",
      imagen: "/imagenesProductos/Poker.png",
      precioAnterior: 3500,
      precioOferta: 2800
    },
    {
      nombre: "Cerveza Poker",
      desc: "Lata 330ml",
      detalle: "Pack especial de verano",
      imagen: "/imagenesProductos/Poker.png",
      precioAnterior: 3500,
      precioOferta: 2800
    },
    {
      nombre: "Cerveza Poker",
      desc: "Lata 330ml",
      detalle: "Pack especial de verano",
      imagen: "/imagenesProductos/Poker.png",
      precioAnterior: 3500,
      precioOferta: 2800
    }
  ];

  // Agrupar productos en slides de 3 en 3
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const slides = chunkArray(productosOferta, 3);

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#FFD600' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">LaAmistad</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" to="/PaginaPrincipal">Inicio</Link></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="productosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Productos</a>
                <ul className="dropdown-menu" aria-labelledby="productosDropdown">
                  <li><Link className="dropdown-item" to="/Frutas">Frutas</Link></li>
                  <li><Link className="dropdown-item" to="/Carnes">Carnes</Link></li>
                  <li><Link className="dropdown-item" to="/Lacteos">Lácteos</Link></li>
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
            </ul>
            <form className="d-flex me-3" onSubmit={handleSearch}>
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
              <button
                className="btn btn-outline-light dropdown-toggle"
                style={{ backgroundColor: '#F44336', color: 'black' }}
                id="userDropdown"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* SECCIÓN DE OFERTAS EN CARRUSEL */}
      <section className="container py-5">
        <h2 className="mb-4 text-center fw-bold text-warning">🔥 Ofertas Especiales 🔥</h2>
        <p className="text-center text-muted mb-5">
          Aquí encontrarás los precios más bajos y promociones únicas. ¡Corre antes de que se agoten!
        </p>

        <Carousel
          interval={5000}
          indicators={false}
          prevIcon={<BsChevronLeft style={{ fontSize: '2.5rem', color: '#000', marginLeft: '-60px' }} />}
          nextIcon={<BsChevronRight style={{ fontSize: '2.5rem', color: '#000', marginRight: '-60px' }} />}
        >
          {slides.map((grupo, idx) => (
            <Carousel.Item key={idx}>
              <div className="row justify-content-center">
                {grupo.map((producto, i) => (
                  <div className="col-md-4 col-sm-6 mb-4" key={i}>
                    <div className="card text-center shadow-lg border-0 h-100">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="card-img-top p-3"
                        style={{ maxHeight: "180px", objectFit: "contain" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{producto.nombre}</h5>
                        <p className="card-text text-muted">{producto.desc}</p>
                        <p className="card-text fst-italic">{producto.detalle}</p>
                        <p className="mb-1 text-danger text-decoration-line-through">
                          ${producto.precioAnterior.toLocaleString()}
                        </p>
                        <p className="mb-2 text-success fw-bold fs-5">
                          ${producto.precioOferta.toLocaleString()}
                        </p>
                        <button
                          className="btn"
                          style={{
                            backgroundColor: "#FFD54F",
                            fontWeight: "bold",
                            borderRadius: "30px",
                            padding: "8px 20px"
                          }}
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* BLOQUE DESTACADO */}
        <div
          className="mt-5 p-5 text-center text-white rounded-4"
          style={{
            background: "linear-gradient(90deg, #FFC107, #FF9800)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
          }}
        >
          <h2 className="mb-3 fw-bold" style={{ fontSize: "2rem" }}>
            ¡Aprovecha nuestras súper ofertas antes de que se acaben!
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            Los mejores precios, la mejor calidad... y por tiempo limitado.
          </p>
          <Link
            to="/ofertas"
            className="btn btn-lg"
            style={{
              backgroundColor: "#FFEB3B",
              color: "#000",
              fontWeight: "bold",
              padding: "10px 25px",
              borderRadius: "30px",
              boxShadow: "0 3px 6px rgba(0,0,0,0.3)"
            }}
          >
            Ver todas las ofertas
          </Link>
        </div>
      </section>
    </>
  );
}

export default Ofertas;
