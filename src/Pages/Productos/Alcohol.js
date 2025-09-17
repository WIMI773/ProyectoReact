import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Alcohol() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Detectar usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      Swal.fire('Atención', 'Por favor ingresa un término para buscar.', 'info');
      return;
    }
    Swal.fire(`Buscando bebidas: "${searchTerm}"`);
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
        auth.signOut();
        navigate('/');
      }
    });
  };

  const productos = [
    { nombre: "Ron Caldas", desc: "Ron viejo de caldas 1000ml", src: "/imagenesProductos/ron.png", precio: 70000 },
    { nombre: "Aguardiente Antioqueño", desc: "Aguardiente Antioqueño 375ml", src: "/imagenesProductos/antioqueño.png", precio: 40000 },
    { nombre: "Whisky Buchanans", desc: "Buchanans Master 750ml", src: "/imagenesProductos/buchanas master.webp", precio: 200000 },
    { nombre: "Tequila Jose Cuervo", desc: "Botella 700ml", src: "/imagenesProductos/jose cuervo.png", precio: 77000 },
    { nombre: "Cerveza Poker", desc: "Lata 330ml", src: "/imagenesProductos/poker.png", precio: 3500 },
    { nombre: "Cerveza Aguila", desc: "Botella 330ml", src: "/imagenesProductos/aguila.png", precio: 1800 },
    { nombre: "Cerveza Corona", desc: "Coronita 355ml", src: "/imagenesProductos/coronitass.png", precio: 20000 },
    { nombre: "Red Label", desc: "Whisky Johnnie Walker Red Label", src: "/imagenesProductos/red label.webp", precio: 95000 }
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#FFD600' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">LaAmistad</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
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
                placeholder="Buscar bebidas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-warning" type="submit">Buscar</button>
            </form>

            {/* Usuario */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  style={{ backgroundColor: '#F44336', color: 'black' }}
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
                    />
                  ) : (
                    <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', marginRight: '8px' }}></i>
                  )}
                  {user.displayName || "Usuario"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
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

      {/* Encabezado sección alcohol */}
      <header className="text-center py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h1 className="fw-bold mb-3">Sección de <span style={{ color: '#FFD600' }}>Alcohol</span></h1>
          <p className="mb-4" style={{ fontSize: '1.2rem', color: '#000000ff' }}>
            Descubre nuestras mejores bebidas y licores.
          </p>
        </div>
      </header>

      {/* Productos de alcohol */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Bebidas disponibles</h2>
        <div className="row">
          {productos.map((prod, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img src={prod.src} className="card-img-top" alt={prod.nombre} style={{ height: '200px', objectFit: 'contain' }} />
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
      </section>

      {/* Footer */}
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

export default Alcohol;
