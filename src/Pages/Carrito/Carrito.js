import { useNavigate } from "react-router-dom";
import { useCarrito } from "../components/CarritoContext";

function Carrito() {
  const { carrito, totalCarrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="mb-4">Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                <div>
                  {item.nombre} - {item.cantidad} x{" "}
                  {item.precio.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </div>
                <button
                  className="btn btn-danger btn-sm"
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
            onClick={() => navigate("/Checkout")}
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
  );
}

export default Carrito;
