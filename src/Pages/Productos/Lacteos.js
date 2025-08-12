import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCarrito } from '../components/CarritoContext';

function Lacteos() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const {
    carrito,
    mostrarCarrito,
    setMostrarCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    totalCarrito
  } = useCarrito();

  const [productos, setProductos] = useState([
    { nombre: "6 pax yox", desc: "6 pax yox", src: "/imagenesProductos/Yogurt-yox.jpg", precio: 20230, cantidad: 1 },
    { nombre: "yogo-yogo fresa", desc: "yogo-yogo fresa", src: "/imagenesProductos/Yogo-yogo-fresa.jpg", precio: 3200, cantidad: 1 },
    { nombre: "salchichon", desc: "salchichon", src: "/imagenesProductos/salchichon.jpg", precio: 22850, cantidad: 1 },
    { nombre: "salchicharanchera", desc: "salchicharanchera", src: "/imagenesProductos/salchicharanchera.jpg", precio: 27500, cantidad: 1 },
    { nombre: "salchicha", desc: "salchicha", src: "/imagenesProductos/sachicha.jpg", precio: 18580, cantidad: 1 },
    { nombre: "queso crema", desc: "queso crema", src: "/imagenesProductos/queso-crema.jpg", precio: 6040, cantidad: 1 },
    { nombre: "queso", desc: "queso", src: "/imagenesProductos/queso colanta.jpg", precio: 17300, cantidad: 1 },
    { nombre: "quesito", desc: "quesito", src: "/imagenesProductos/quesito.png", precio: 11990, cantidad: 1 },
    { nombre: "mozzarella", desc: "mozzarella", src: "/imagenesProductos/mozzarella.jpg", precio: 11250, cantidad: 1 },
    { nombre: "Milo", desc: "Milo", src: "/imagenesProductos/milo.jpg", precio: 37590, cantidad: 1 },
    { nombre: "mantequilla sin sal", desc: "mantequilla sin sal", src: "/imagenesProductos/mantequillasinsal.jpg", precio: 13990, cantidad: 1 },
    { nombre: "lecherita", desc: "lecherita", src: "/imagenesProductos/lecherita.jpg", precio: 3350, cantidad: 1 },
    { nombre: "leche klim", desc: "leche klim", src: "/imagenesProductos/leche-klim.jpg", precio: 43350, cantidad: 1 },
    { nombre: "leche", desc: "leche", src: "/imagenesProductos/leche.png", precio: 5500, cantidad: 1 },
    { nombre: "huevos", desc: "huevos", src: "/imagenesProductos/huevos.jpg", precio: 20000, cantidad: 1 },
    { nombre: "kumis", desc: "kumis", src: "/imagenesProductos/kumis.webp", precio: 9010, cantidad: 1 },
    { nombre: "mantequilla", desc: "mantequilla", src: "/imagenesProductos/mantequillaconsal.jpg", precio: 16700, cantidad: 1 },
    { nombre: "ensure", desc: "ensure", src: "/imagenesProductos/ensure.jpg", precio: 79000, cantidad: 1 },
    { nombre: "crema de leche", desc: "crema de leche", src: "/imagenesProductos/crema de leche.jpg", precio: 5100, cantidad: 1 },
    { nombre: "bon yurt zucaritas", desc: "bon yurt zucaritas", src: "/imagenesProductos/bon-yurt-zucaritas.jpg", precio: 16650, cantidad: 1 },
  ]);

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

  const handleCantidadChange = (index, nuevaCantidad) => {
    const productosActualizados = [...productos];
    productosActualizados[index].cantidad = parseInt(nuevaCantidad);
    setProductos(productosActualizados);
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
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input className="form-control me-2" type="search" placeholder="Buscar productos" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

      {/* Sección Lácteos */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Sección Lácteos</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productos.map((prod, i) => (
            <div key={i} className="col">
              <div className="card h-100 shadow-sm d-flex flex-column">
                <img src={prod.src} className="card-img-top" alt={prod.nombre} style={{ height: '180px', objectFit: 'contain' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{prod.nombre}</h5>
                  <p className="card-text">{prod.desc}</p>
                  <div className="mb-2"><strong>Precio:</strong> {prod.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</div>
                  <div className="d-flex align-items-center mb-2">
                    <label htmlFor={`cantidad-${i}`} className="me-2">Cantidad:</label>
                    <input
                      id={`cantidad-${i}`}
                      type="number"
                      min="1"
                      value={prod.cantidad}
                      onChange={(e) => handleCantidadChange(i, e.target.value)}
                      className="form-control form-control-sm w-50"
                    />
                  </div>
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-warning btn-sm" onClick={() => agregarAlCarrito(prod)}>Agregar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botón flotante del carrito */}
      <button
        className="btn btn-dark rounded-circle shadow-lg position-fixed"
        style={{ bottom: '20px', right: '20px', width: '60px', height: '60px', zIndex: 1000, backgroundColor: '#FFD600'}}
        onClick={() => setMostrarCarrito(!mostrarCarrito)}
      >
        🛒
        {carrito.length > 0 && (
          <span className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle">
            {carrito.length}
          </span>
        )}
      </button>

      {/* Carrito flotante */}
      {mostrarCarrito && (
        <div
          className="position-fixed bg-light border p-3 shadow-lg"
          style={{
            bottom: '90px',
            right: '20px',
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            borderRadius: '10px',
            zIndex: 1000
          }}
        >
          <h5 className="text-center"> Carrito De Compras</h5>
          {carrito.length === 0 ? (
            <p className="text-center">Carrito vacío</p>
          ) : (
            <>
              {carrito.map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <div>
                    <strong>{item.nombre}</strong>
                    <br />
                    {item.cantidad} x {item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                  </div>
                  <button className="btn btn-sm btn-dark" onClick={() => eliminarDelCarrito(item.nombre)} style={{backgroundColor: '#FFD600'}}>🗑</button>
                </div>
              ))}
              <div className="mt-3">
                <h6>Total: {totalCarrito.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</h6>
                <button className="btn btn-dark w-100" style={{backgroundColor:'#FFd600', color:'black'}}>Pagar</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Lacteos;
