import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCarrito } from '../components/CarritoContext';

function Alcohol() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Usar el contexto del carrito en lugar del estado local
  const { 
    carrito, 
    mostrarCarrito, 
    setMostrarCarrito, 
    agregarAlCarrito, 
    eliminarDelCarrito, 
    totalCarrito 
  } = useCarrito();

  const [productos, setProductos] = useState([
    { nombre: "Ron Caldas", desc: "Ron Caldas", src: "/imagenesProductos/ron caldas.png", precio: 110000, cantidad: 1 },
    { nombre: "Aguardiente", desc: "Aguardiente", src: "/imagenesProductos/aguardiente.png", precio: 100000, cantidad: 1 },
    { nombre: "Buchanans Master", desc: "Buchanans Master", src: "/imagenesProductos/buchanas master.webp", precio: 200000, cantidad: 1 },
    { nombre: "Jose Cuervo", desc: "Jose Cuervo", src: "/imagenesProductos/jose cuervo.png", precio: 77000, cantidad: 1 },
    { nombre: "Aguardiente Amarillo", desc: "Aguardiente Amarillo", src: "/imagenesProductos/amarillos.png", precio: 50000, cantidad: 1 },
    { nombre: "Red Label", desc: "Red Label", src: "/imagenesProductos/red label.webp", precio: 95000, cantidad: 1 },
    { nombre: "Blue Label", desc: "Blue Label", src: "/imagenesProductos/Blue label.png", precio: 150000, cantidad: 1 },
    { nombre: "Black y White", desc: "Black y White", src: "/imagenesProductos/black y white.webp", precio: 3200, cantidad: 1 },
    { nombre: "Coronita", desc: "Coronita", src: "/imagenesProductos/coronitass.png", precio: 20000, cantidad: 1 },
    { nombre: "Bulveiser", desc: "Bulveiser", src: "/imagenesProductos/bulveiser.png", precio: 19000, cantidad: 1 },
    { nombre: "Aguila", desc: "Aguila", src: "/imagenesProductos/aguilaa.png", precio: 18000, cantidad: 1 },
    { nombre: "Poker", desc: "Poker", src: "/imagenesProductos/poker.png", precio: 19500, cantidad: 1 },
    { nombre: "Andina Dorada", desc: "Andina Dorada", src: "/imagenesProductos/andina.png", precio: 10000, cantidad: 1 },
    { nombre: "Costeña", desc: "Costeña", src: "/imagenesProductos/costeña.webp", precio: 17000, cantidad: 1 },
    { nombre: "Four Loko", desc: "Four Loko", src: "/imagenesProductos/four loco.webp", precio: 20000, cantidad: 1 },
    { nombre: "Heiniken", desc: "Heineken", src: "/imagenesProductos/heineken.webp", precio: 16000, cantidad: 1 },
    { nombre: "Don Julio Blanco", desc: "Don Julio Blanco", src: "/imagenesProductos/don julio blanco.png", precio: 240000, cantidad: 1 },
    { nombre: "J.S Chenet", desc: "J.S Chenet", src: "/imagenesProductos/j.s chenet.png", precio: 70000, cantidad: 1 },
    { nombre: "Moet Chandon", desc: "Moet Chandon", src: "/imagenesProductos/moet chandon.jpg", precio: 52000, cantidad: 1 },
    { nombre: "1800 Tequila", desc: "1800 Tequila", src: "/imagenesProductos/1800.webp", precio: 163000, cantidad: 1 },
    { nombre: "Absolut Vodka", desc: "Absolut Vodka", src: "/imagenesProductos/absolut vodka.webp", precio: 92000, cantidad: 1 },
    { nombre: "Chivas Regal", desc: "Chivas Regal", src: "/imagenesProductos/chivas regal.webp", precio: 120000, cantidad: 1 },
    { nombre: "Clase Azul Tequila", desc: "Clase Azul Tequila", src: "/imagenesProductos/clase azul tequila.png", precio: 4494000, cantidad: 1 },
  ]);

  // 🔍 Filtrar productos en base al searchTerm
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm); // ya filtra directo, no hace falta Swal
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
          <Link className="navbar-brand fw-bold" to="/PaginaPrincipal">
            LaAmistad
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Links de navegación */}
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

      {/* Sección Alcohol */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Sección Alcohol</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod, i) => (
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
            ))
          ) : (
            <p className="text-center">No se encontraron productos</p>
          )}
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

export default Alcohol;
