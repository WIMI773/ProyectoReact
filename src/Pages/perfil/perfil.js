import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";

function Perfil() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/buscar?query=${searchTerm}`);
  };

  if (!user) {
    return (
      <>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#FFD600" }}>
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">LaAmistad</Link>
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
                <li className="nav-item"><Link className="nav-link active" to="/">Inicio</Link></li>
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
              <Link to="/" className="btn btn-danger">Iniciar Sesión</Link>
            </div>
          </div>
        </nav>

        {/* Mensaje de login */}
        <div className="container text-center py-5">
          <div className="alert alert-warning shadow-sm">
            <h4 className="fw-bold">⚠ Debes iniciar sesión</h4>
            <p>Para ver tu perfil necesitas estar autenticado.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
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
                <a className="nav-link dropdown-toggle" href="#" id="productosDropdown" role="button" data-bs-toggle="dropdown">Productos</a>
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
          </div>
        </div>
      </nav>

      {/* PERFIL CON DISEÑO DIFERENTE */}
      <header className="bg-white text-dark text-center py-5 shadow-sm">
        <h1 className="fw-bold">Bienvenido, {user.displayName || "Usuario"}</h1>
        <p className="lead">Aquí puedes administrar tu cuenta</p>
      </header>

      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            <img
              src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Avatar"
              className="rounded-circle shadow"
              style={{ width: "180px", height: "180px", objectFit: "cover", border: "5px solid #FFD600" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card shadow border-0 p-4">
              <h3 className="fw-bold text-dark mb-3">Datos de tu cuenta</h3>
              <p><strong>Nombre:</strong> {user.displayName || "Usuario sin nombre"}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>ID:</strong> <span className="text-muted">{user.uid}</span></p>
              <div className="mt-3">
                <button className="btn btn-outline-dark me-2 bg-warning text-dark">Editar Perfil</button>
                <button className="btn btn-outline-danger">Cambiar Contraseña</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-light py-4 text-center">
        <p>&copy; {new Date().getFullYear()} LaAmistad Supermercado</p>
        <p>
          <a href="#" className="text-warning">Política de privacidad</a> |{" "}
          <a href="#" className="text-warning">Términos y condiciones</a>
        </p>
      </footer>
    </div>
  );
}

export default Perfil;
