import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from '../../Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCarrito } from '../components/CarritoContext';

function Lacteos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Contexto carrito
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

  // Lista de productos Lácteos
  const [productos, setProductos] = useState([
    { nombre: "Yox", desc: "Yox caja por 12", src: "/imagenesProductos/yoxx.png", precio: 20230, cantidad: 1 },
    { nombre: "Yogo-yogo fresa", desc: "Yogo-yogo fresa", src: "/imagenesProductos/Yogo-yogo-fresa.jpg", precio: 3200, cantidad: 1 },
    { nombre: "Helado", desc: "Helado Vainilla", src: "/imagenesProductos/Helado.png", precio: 2200, cantidad: 1 },
    { nombre: "Leche Condensada", desc: "Leche Condensada 375mlt", src: "/imagenesProductos/leche condensada.png", precio: 27500, cantidad: 1 },
    { nombre: "Leche Deslactosada", desc: "Leche Deslactosada 1lt", src: "/imagenesProductos/Leche deslactosada.png", precio: 18580, cantidad: 1 },
    { nombre: "Queso crema", desc: "Queso crema", src: "/imagenesProductos/queso-crema.jpg", precio: 6040, cantidad: 1 },
    { nombre: "Queso", desc: "Queso Colanta", src: "/imagenesProductos/queso colanta.jpg", precio: 17300, cantidad: 1 },
    { nombre: "Quesito", desc: "Quesito", src: "/imagenesProductos/quesito.png", precio: 11990, cantidad: 1 },
    { nombre: "Mozzarella", desc: "Mozzarella", src: "/imagenesProductos/mozzarella.jpg", precio: 11250, cantidad: 1 },
    { nombre: "Milo", desc: "Milo", src: "/imagenesProductos/milo.jpg", precio: 37590, cantidad: 1 },
    { nombre: "Mantequilla sin sal", desc: "Mantequilla sin sal", src: "/imagenesProductos/mantequillasinsal.jpg", precio: 13990, cantidad: 1 },
    { nombre: "Queso Campesino", desc: "Queso Campesino 250gr", src: "/imagenesProductos/queso campesino.png", precio: 3350, cantidad: 1 },
    { nombre: "Leche Klim", desc: "Leche Klim", src: "/imagenesProductos/leche-klim.jpg", precio: 43350, cantidad: 1 },
    { nombre: "Leche", desc: "Leche", src: "/imagenesProductos/leche.png", precio: 5500, cantidad: 1 },
    { nombre: "Huevos", desc: "Huevos", src: "/imagenesProductos/huevos.jpg", precio: 15000, cantidad: 1 },
    { nombre: "Kumis", desc: "Kumis", src: "/imagenesProductos/kumis.webp", precio: 5000, cantidad: 1 },
    { nombre: "Mantequilla", desc: "Mantequilla con sal", src: "/imagenesProductos/mantequillaconsal.jpg", precio: 16700, cantidad: 1 },
    { nombre: "Ensure", desc: "Ensure", src: "/imagenesProductos/ensure.jpg", precio: 79000, cantidad: 1 },
    { nombre: "Crema de leche", desc: "Crema de leche", src: "/imagenesProductos/crema de leche.jpg", precio: 5100, cantidad: 1 },
    { nombre: "Bon yurt", desc: "Bon yurt zucaritas", src: "/imagenesProductos/bon-yurt-zucaritas.jpg", precio: 4500, cantidad: 1 },
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

  // Ir a carrito
  const handleIrCarrito = () => {
    if (carrito.length === 0) {
      Swal.fire("Carrito vacío", "Agrega productos antes de pagar", "warning");
      return;
    }
    navigate("/Carrito"); // 👉 lleva a la página Carrito
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
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Productos</a>
                <ul className="dropdown-menu">
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

            {/* Usuario */}
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
                  <li><Link className="dropdown-item" to="/MisPedidos">Mis Pedidos</Link></li>
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

      {/* Productos */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Sección Lácteos</h2>
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

      {/* Botón flotante carrito */}
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

      {/* Carrito flotante */}
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
                  style={{ backgroundColor: '#FFD600', color: 'black' }}
                  onClick={handleIrCarrito}
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

export default Lacteos;
