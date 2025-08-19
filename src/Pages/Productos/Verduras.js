import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCarrito } from '../components/CarritoContext';

function Verduras() {
  const [searchTerm, setSearchTerm] = useState('');
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

  // Productos disponibles
  const [productos, setProductos] = useState([
    { nombre: "Mazorca", desc: "Mazorca fresca", src: "/imagenesProductos/mazorca.webp", precio: 1200, cantidad: 1 },
    { nombre: "Lechuga", desc: "Lechuga crocante", src: "/imagenesProductos/lechuga.webp", precio: 2000, cantidad: 1 },
    { nombre: "Zanahoria", desc: "Zanahoria fresca", src: "/imagenesProductos/zanahoria.webp", precio: 3500, cantidad: 1 },
    { nombre: "Yuca", desc: "Yuca blanca", src: "/imagenesProductos/yuca.png", precio: 2500, cantidad: 1 },
    { nombre: "Tomate", desc: "Tomate chonto", src: "/imagenesProductos/tomate.png", precio: 6000, cantidad: 1 },
    { nombre: "Cebolla", desc: "Cebolla cabezona", src: "/imagenesProductos/cebolla.png", precio: 4200, cantidad: 1 },
    { nombre: "Pepino", desc: "Pepino cohombro", src: "/imagenesProductos/pepino.png", precio: 4000, cantidad: 1 },
    { nombre: "Cilantro", desc: "Cilantro fresco", src: "/imagenesProductos/cilantro.png", precio: 500, cantidad: 1 },
    { nombre: "Ahuyama", desc: "Ahuyama amarilla", src: "/imagenesProductos/auyama.png", precio: 2500, cantidad: 1 },
    { nombre: "Apio", desc: "Apio verde", src: "/imagenesProductos/apio.png", precio: 8000, cantidad: 1 },
    { nombre: "Pimenton", desc: "Pimentón rojo", src: "/imagenesProductos/pimenton.png", precio: 8000, cantidad: 1 },
    { nombre: "Remolacha", desc: "Remolacha morada", src: "/imagenesProductos/remo.webp", precio: 6000, cantidad: 1 },
    { nombre: "Ajo", desc: "Ajo fresco", src: "/imagenesProductos/ajo.png", precio: 1400, cantidad: 1 },
    { nombre: "Brocoli", desc: "Brócoli verde", src: "/imagenesProductos/brocoli.webp", precio: 14000, cantidad: 1 },
    { nombre: "Papa", desc: "Papa criolla", src: "/imagenesProductos/papa.png", precio: 3800, cantidad: 1 },
    { nombre: "Platano", desc: "Plátano maduro", src: "/imagenesProductos/platano.png", precio: 4700, cantidad: 1 },
  ]);

  // 🔍 Filtrar productos
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Cambiar cantidad siempre >= 1
  const handleCantidadChange = (index, nuevaCantidad) => {
    const productosActualizados = [...productos];
    const cantidadValida = Math.max(1, parseInt(nuevaCantidad) || 1);
    productosActualizados[index].cantidad = cantidadValida;
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

      {/* Sección Verduras */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Sección Verduras</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((prod, i) => (
              <div key={i} className="col">
                <div className="card h-100 shadow-sm d-flex flex-column">
                  <img src={prod.src} className="card-img-top" alt={`Imagen de ${prod.nombre}`} style={{ height: '180px', objectFit: 'contain' }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{prod.nombre}</h5>
                    <p className="card-text">{prod.desc}</p>
                    <div className="mb-2">
                      <strong>Precio:</strong>{" "}
                      {prod.precio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                    </div>
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
                      <button 
                        className="btn btn-warning btn-sm" 
                        onClick={() => agregarAlCarrito({ ...prod })}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No se encontraron productos para tu búsqueda.</p>
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
          <h5 className="text-center">Carrito De Compras</h5>
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
                  <button 
                    className="btn btn-sm btn-dark" 
                    onClick={() => eliminarDelCarrito(item.nombre)} 
                    style={{backgroundColor: '#FFD600'}}
                  >
                    🗑
                  </button>
                </div>
              ))}
              <div className="mt-3">
                <h6>Total: {totalCarrito.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</h6>
                <button className="btn btn-dark w-100" style={{backgroundColor:'#FFD600', color:'black'}}>Pagar</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Verduras;
