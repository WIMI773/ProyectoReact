import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../components/CarritoContext";
import { db, auth } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";

function Checkout() {
  const { carrito, totalCarrito, vaciarCarrito } = useCarrito();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();

  const confirmarPedido = async () => {
    if (!auth.currentUser) {
      Swal.fire("Debes iniciar sesión", "", "warning");
      return;
    }

    if (!nombre || !direccion || !telefono) {
      Swal.fire("Completa todos los campos", "", "error");
      return;
    }

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

      // 🔹 Número del supermercado con código de país (sin +)
      const numeroSupermercado = "573153197362"; // Cambia por el número real

      // 🔹 Abrir WhatsApp
      window.open(
        `https://wa.me/${numeroSupermercado}?text=${mensaje}`,
        "_blank"
      );

      vaciarCarrito();
      Swal.fire("Pedido confirmado", "Tu pedido fue registrado y enviado ✅", "success");
      navigate("/MisPedidos");
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
      Swal.fire("Error", "No se pudo registrar el pedido", "error");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Datos para Pago Contraentrega</h2>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          className="form-control"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={confirmarPedido}>
        Confirmar Pedido ✅
      </button>
    </div>
  );
}

export default Checkout;
