import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCarrito } from "../components/CarritoContext";
import { auth } from "../../Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

function Carrito() {
  const { 
    carrito, 
    totalCarrito, 
    eliminarDelCarrito, 
    vaciarCarrito,
    actualizarCantidad,
    abrirCarrito, 
    cerrarCarrito, 
    toggleCarrito // 👈 ahora usamos estas funciones
  } = useCarrito();

  const navigate = useNavigate();

  // 🔍 Buscador
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/buscar?query=${searchTerm}`);
  };

  // 👤 Usuario autenticado
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "#FFD600" }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/PaginaPrincipal">
            LaAmistad
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/PaginaPrincipal">
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
                <ul
                  className="dropdown-menu"
                  aria-labelledby="productosDropdown"
                >
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

            {/* 🔍 Buscador */}
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

            {/* 👤 Menú de usuario */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  style={{ backgroundColor: "#ffffffff", color: "black" }}
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "8px",
                      }}
                    />
                  ) : (
                    <i
                      className="bi bi-person-circle"
                      style={{ fontSize: "1.5rem", marginRight: "8px" }}
                    ></i>
                  )}
                  {user.displayName || "Usuario"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/mis-pedidos">Mis Pedidos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/" className="btn btn-danger">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 🛒 Contenido del carrito */}
      <div className="container py-5">
        <h2 className="mb-4">Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <p>No tienes productos en el carrito.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {carrito.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    {/* 🖼️ Imagen del producto */}
                    <img
                      src={item.src || "/assets/default.jpg"}
                      alt={item.nombre}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "15px",
                        borderRadius: "8px",
                      }}
                    />
                    <div>
                      <strong>{item.nombre}</strong> <br />
                      {item.precio.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </div>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() =>
                        actualizarCantidad(item.nombre, Math.max(item.cantidad - 1, 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.cantidad}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() =>
                        actualizarCantidad(item.nombre, item.cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => eliminarDelCarrito(item.nombre)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <h4>
              Total:{" "}
              {totalCarrito.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </h4>

            {/* ✅ Redirigir al checkout */}
            <button
              className="btn btn-success mt-3"
              onClick={() => {
                cerrarCarrito(); // 👈 cerramos el carrito al confirmar
                navigate("/Checkout");
              }}
            >
              Confirmar Pedido ✅
            </button>

            <button
              className="btn btn-secondary mt-3 ms-2"
              onClick={vaciarCarrito}
            >
              Vaciar Carrito 🗑
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Carrito;
