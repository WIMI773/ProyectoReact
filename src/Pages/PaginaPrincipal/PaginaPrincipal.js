import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ← Link agregado
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
        navigate('/'); // Ruta a tu login
      }
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: '#FFD600' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            LaAmistad
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Inicio
                </Link>
              </li>
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
                  <li><Link className="dropdown-item" to="/Frutas">Frutas</Link></li>
                  <li><Link className="dropdown-item" to="/Carnes">Carnes</Link></li>
                  <li><Link className="dropdown-item" to="/Lacteos">Lácteos</Link></li>
                  <li><Link className="dropdown-item" to="/Alcohol">Alcohol</Link></li>
                  <li><Link className="dropdown-item" to="/Medicamentos">Medicamentos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/ver-todos">Ver todos</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ofertas">Ofertas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ListUsersPage">Usuarios</Link>
              </li>
            </ul>
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-warning" type="submit">
                Buscar
              </button>
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
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-4">Bienvenido a LaAmistad</h1>
          <p className="lead">Tus compras diarias, ahora más fáciles y rápidas.</p>
          <img src="https://via.placeholder.com/800x300" alt="Supermercado" className="img-fluid mt-4 rounded" />
        </div>
      </header>

      {/* Destacados */}
      <section className="container py-5">
        <h2 className="mb-4 text-center">Productos Destacados</h2>
        <div className="row">
          {[{desc:"Ron viejo de caldas 1000ml",src:"/imagenesProductos/ron.png", nombre:"Ron caldas"},
            {desc:"",src:"/imagenesProductos/antioqueño.png"}].map((prod, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <div className="card h-100">
                <img
                  src={prod.src}
                  className="card-img-top"
                  alt={`Producto ${i}`}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title"> {prod.nombre}</h5>
                  <p className="card-text"> {prod.desc}.</p>
                  <div className="mt-auto">
                    <span className="fw-bold">$ {(10 * i).toFixed(2)}</span>
                    <button className="btn btn-warning btn-sm float-end">Agregar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section className="bg-warning py-5 text-center">
        <div className="container">
          <h2>Ofertas de la Semana</h2>
          <p className="lead">Ahorra hasta un 30% en productos seleccionados.</p>
          <button className="btn btn-danger">Ver Ofertas</button>
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

export default PaginaPrincipal;