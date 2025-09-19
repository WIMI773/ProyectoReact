import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCarrito } from "../components/CarritoContext";
import { db, auth } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Checkout() {
  const { carrito, totalCarrito, vaciarCarrito } = useCarrito();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // 🔹 Verificar sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire("Sesión cerrada", "", "info");
      navigate("/Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar/${searchTerm}`);
    }
  };

  const validarFormulario = () => {
    if (!nombre.trim() || !direccion.trim() || !telefono.trim()) {
      Swal.fire("Completa todos los campos", "", "error");
      return false;
    }

    if (nombre.length < 3) {
      Swal.fire("El nombre debe tener al menos 3 caracteres", "", "warning");
      return false;
    }

    if (direccion.length < 5) {
      Swal.fire("La dirección debe ser más detallada", "", "warning");
      return false;
    }

    if (!/^\d{10,13}$/.test(telefono)) {
      Swal.fire("Ingresa un número de teléfono válido", "", "warning");
      return false;
    }

    if (carrito.length === 0) {
      Swal.fire("Tu carrito está vacío", "", "error");
      return false;
    }

    return true;
  };

  const confirmarPedido = async () => {
    if (!auth.currentUser) {
      Swal.fire("Debes iniciar sesión", "", "warning");
      return;
    }

    if (!validarFormulario()) return;

    setLoading(true);

    try {
      // 🔹 Guardar en Firestore
      const docRef = await addDoc(collection(db, "pedidos"), {
        userId: auth.currentUser.uid,
        estado: "Pendiente",
        total: totalCarrito,
        items: carrito,
        nombre,
        direccion,
        telefono,
        fecha: serverTimestamp(),
      });

      // 🔹 Preparar mensaje de WhatsApp
      const mensaje = encodeURIComponent(
        `📦 *Nuevo Pedido*\n\n🆔 Pedido ID: ${docRef.id}\n\n👤 Cliente: ${nombre}\n📍 Dirección: ${direccion}\n📞 Teléfono: ${telefono}\n\n🛒 Productos:\n${carrito
          .map(
            (item) =>
              `- ${item.nombre} x${item.cantidad} = ${(
                item.precio * item.cantidad
              ).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}`
          )
          .join("\n")}\n\n💰 Total: ${totalCarrito.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        })}`
      );

      const numeroSupermercado = "573153197362"; // Cambiar por el real
      window.open(`https://wa.me/${numeroSupermercado}?text=${mensaje}`, "_blank");

      vaciarCarrito();
      setNombre("");
      setDireccion("");
      setTelefono("");

      Swal.fire(
        "Pedido confirmado ✅",
        "Tu pedido fue registrado y enviado con éxito",
        "success"
      );

      navigate("/MisPedidos");
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
      Swal.fire("Error", "No se pudo registrar el pedido", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#FFD600" }}>
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

            {/* Usuario */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                  style={{ backgroundColor: "#fff", color: "black" }}
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Avatar"
                      style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "8px" }}
                    />
                  ) : (
                    <i className="bi bi-person-circle" style={{ fontSize: "1.5rem", marginRight: "8px" }}></i>
                  )}
                  {user.displayName || "Usuario"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><Link className="dropdown-item" to="/perfil">Mi Perfil</Link></li>
                  <li><Link className="dropdown-item" to="/MisPedidos">Mis Pedidos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <Link className="btn btn-dark" to="/Login">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </nav>

      {/* 🔹 Formulario Checkout */}
      <div className="container py-5">
        <h2 className="mb-4">Datos para Pago Contraentrega</h2>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Escribe tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ej: Calle 123 #45-67, Barrio Centro"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Ej: 3101234567"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={confirmarPedido}
          disabled={loading}
        >
          {loading ? "Confirmando pedido..." : "Confirmar Pedido ✅"}
        </button>
      </div>
    </>
  );
}

export default Checkout;
