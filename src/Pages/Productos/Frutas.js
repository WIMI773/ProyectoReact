import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from '../../Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCarrito } from '../components/CarritoContext';

function Frutas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Contexto del carrito
  const {
    carrito,
    mostrarCarrito,
    setMostrarCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    totalCarrito
  } = useCarrito();

  // Detectar usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Productos
  const [productos, setProductos] = useState([
    { nombre: "Banano", desc: "Banano", src: "/imagenesProductos/banano.png", precio: 1000, cantidad: 1 },
    { nombre: "Fresa", desc: "Fresa", src: "/imagenesProductos/fresa.png", precio: 2500, cantidad: 1 },
    { nombre: "Sandia", desc: "Sandia", src: "/imagenesProductos/sandia.png", precio: 5000, cantidad: 1 },
    { nombre: "Durazno", desc: "Durazno", src: "/imagenesProductos/durazno.png", precio: 3000, cantidad: 1 },
    { nombre: "Melon", desc: "Melon", src: "/imagenesProductos/melones.png", precio: 4000, cantidad: 1 },
    { nombre: "Uva", desc: "Uva", src: "/imagenesProductos/uva.png", precio: 3500, cantidad: 1 },
    { nombre: "Pera", desc: "Pera", src: "/imagenesProductos/pera.webp", precio: 2800, cantidad: 1 },
    { nombre: "Limon", desc: "Limon", src: "/imagenesProductos/limon.png", precio: 1500, cantidad: 1 },
    { nombre: "Mango", desc: "Mango", src: "/imagenesProductos/maracaton.webp", precio: 3200, cantidad: 1 },
    { nombre: "Coco", desc: "Coco", src: "/imagenesProductos/coco.webp", precio: 3700, cantidad: 1 },
    { nombre: "Piña", desc: "Piña", src: "/imagenesProductos/piña.webp", precio: 2900, cantidad: 1 },
    { nombre: "Naranja", desc: "Naranja", src: "/imagenesProductos/naranja.webp", precio: 2600, cantidad: 1 },
    { nombre: "Papaya", desc: "Papaya", src: "/imagenesProductos/papaya.png", precio: 3000, cantidad: 1 },
    { nombre: "Cereza", desc: "Cereza", src: "/imagenesProductos/cereza.webp", precio: 4500, cantidad: 1 },
    { nombre: "Aguacate", desc: "Aguacate", src: "/imagenesProductos/aguacate.webp", precio: 3800, cantidad: 1 },
    { nombre: "Maracuya", desc: "Maracuya", src: "/imagenesProductos/maracuyaa.png", precio: 3300, cantidad: 1 },
    { nombre: "Zapote", desc: "Zapote", src: "/imagenesProductos/sapote.png", precio: 3100, cantidad: 1 },
    { nombre: "Kiwi", desc: "Kiwi", src: "/imagenesProductos/kiwi.png", precio: 4700, cantidad: 1 },
    { nombre: "Granadilla", desc: "Granadilla", src: "/imagenesProductos/granadilla.webp", precio: 3600, cantidad: 1 },
    { nombre: "Ciruela", desc: "Ciruela", src: "/imagenesProductos/ciruela.png", precio: 3400, cantidad: 1 },
    { nombre: "Gananbana", desc: "Gananbana", src: "/imagenesProductos/ganabana.jpg", precio: 3000, cantidad: 1 },
    { nombre: "Nispero", desc: "Nispero", src: "/imagenesProductos/nispero.png", precio: 2000, cantidad: 1 },
    { nombre: "Manzana", desc: "Manzana", src: "/imagenesProductos/manzana.webp", precio: 3200, cantidad: 1 },
    { nombre: "Tamarindo", desc: "Tamarindo", src: "/imagenesProductos/tamarindo.png", precio: 3000, cantidad: 1 },
  ]);

  // Filtrar productos
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cerrar sesión
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
        signOut(auth).then(() => navigate('/'));
      }
    });
  };

  // Cambiar cantidad
  const handleCantidadChange = (index, nuevaCantidad) => {
    const productosActualizados = [...productos];
    productosActualizados[index].cantidad = parseInt(nuevaCantidad);
    setProductos(productosActualizados);
  };

  return (
    <>
      {/* 🔝 Navbar */}
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
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Productos</a>
                <ul className="dropdown-menu">
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

            {/* 🔍 Buscador */}
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

            {/* 👤 Usuario */}
            {user ? (
              <div className="dropdown">
                <button className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  style={{ backgroundColor: '#fff', color: 'black' }}
                  type="button" data-bs-toggle="dropdown">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }} />
                  ) : (
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', marginRight: '8px' }}></i>
                  )}
                  {user.displayName || "Usuario"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/mis-pedidos">Mis Pedidos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/" className="btn btn-danger">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </nav>

      {/* 🍎 Sección Frutas */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Sección Frutas</h2>
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

      {/* 🛒 Botón flotante carrito */}
      <button
        className="btn btn-dark rounded-circle shadow-lg position-fixed"
        style={{ bottom: '20px', right: '20px', width: '60px', height: '60px', zIndex: 1000, backgroundColor: '#FFD600' }}
        onClick={() => setMostrarCarrito(!mostrarCarrito)}
      >
        🛒
        {carrito.length > 0 && (
          <span className="badge bg-warning text-dark position-absolute top-0 start-100 translate-middle">
            {carrito.length}
          </span>
        )}
      </button>

      {/* 🛍 Carrito */}
      {mostrarCarrito && (
        <div className="position-fixed bg-light border p-3 shadow-lg"
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
                  <div className="d-flex align-items-center">
                    <img
                      src={item.src}
                      alt={item.nombre}
                      style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px', borderRadius: '6px' }}
                    />
                    <div>
                      <strong>{item.nombre}</strong>
                      <br />
                      {item.cantidad} x {item.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </div>
                  </div>
                  <button className="btn btn-sm btn-dark" onClick={() => eliminarDelCarrito(item.nombre)} style={{ backgroundColor: '#FFD600' }}>🗑</button>
                </div>
              ))}
              <div className="mt-3">
                <h6>Total: {totalCarrito.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</h6>
                <button
                  className="btn btn-dark w-100"
                  style={{ backgroundColor: '#FFd600', color: 'black' }}
                  onClick={() => navigate('/CarritoPagos')}
                >
                  Pagar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Frutas;
