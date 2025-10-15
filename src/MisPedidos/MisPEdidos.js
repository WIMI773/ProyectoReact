import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../Firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        cargarPedidos(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const cargarPedidos = async (uid) => {
    try {
      const q = query(
        collection(db, "pedidos"),
        where("userId", "==", uid),
        orderBy("fecha", "desc")
      );
      const querySnapshot = await getDocs(q);
      const listaPedidos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPedidos(listaPedidos);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  const eliminarPedido = async (pedidoId) => {
    Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "pedidos", pedidoId));
          setPedidos(pedidos.filter((p) => p.id !== pedidoId));
          Swal.fire("Eliminado", "El pedido fue eliminado correctamente", "success");
        } catch (error) {
          console.error("Error al eliminar pedido:", error);
          Swal.fire("Error", "No se pudo eliminar el pedido", "error");
        }
      }
    });
  };

  const confirmarPedido = async () => {
    if (!user) {
      Swal.fire("Debes iniciar sesión", "Inicia sesión para confirmar un pedido", "warning");
      return;
    }

    try {
      const nuevoPedido = {
        userId: user.uid,
        estado: "Pendiente",
        total: 50000,
        items: [
          {
            nombre: "Producto de ejemplo",
            cantidad: 2,
            precio: 25000,
            src: "https://via.placeholder.com/60",
          },
        ],
        fecha: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "pedidos"), nuevoPedido);

      setPedidos([{ id: docRef.id, ...nuevoPedido }, ...pedidos]);

      Swal.fire("Pedido confirmado", "Tu pedido fue registrado correctamente", "success");

      navigate(`/Checkout/${docRef.id}`);
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
      Swal.fire("Error", "No se pudo confirmar el pedido", "error");
    }
  };

  const badgeEstado = (estado) => {
    switch (estado) {
      case "Pendiente":
        return <span className="badge bg-warning text-dark">{estado}</span>;
      case "En camino":
        return <span className="badge bg-info text-dark">{estado}</span>;
      case "Entregado":
        return <span className="badge bg-success">{estado}</span>;
      case "Cancelado":
        return <span className="badge bg-danger">{estado}</span>;
      default:
        return <span className="badge bg-secondary">{estado}</span>;
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">📦 Mis Pedidos</h2>

      {/* 🔙 Botón de Volver */}
      <div className="text-center mb-4">
        <button
          className="btn btn-secondary fw-bold px-4"
          onClick={() => navigate(-1)} // 👈 vuelve a la página anterior
        >
          ⬅ Volver
        </button>
      </div>

      {pedidos.length === 0 ? (
        <div className="alert alert-info text-center">
          Aún no tienes pedidos registrados.
        </div>
      ) : (
        <div className="row">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="col-md-6 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">Pedido #{pedido.id.slice(0, 6)}</h5>
                    {badgeEstado(pedido.estado)}
                  </div>

                  <p className="mb-1">
                    <strong>Total:</strong>{" "}
                    {pedido.total.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </p>
                  <p className="mb-2">
                    <strong>Fecha:</strong>{" "}
                    {pedido.fecha?.toDate
                      ? pedido.fecha.toDate().toLocaleString()
                      : "Pendiente"}
                  </p>

                  <h6 className="fw-bold mt-3">🛒 Productos</h6>
                  <ul className="list-unstyled">
                    {pedido.items.map((item, i) => (
                      <li key={i} className="d-flex align-items-center mb-2">
                        <img
                          src={item.src || "https://via.placeholder.com/60"}
                          alt={item.nombre}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            marginRight: "10px",
                            borderRadius: "8px",
                          }}
                        />
                        <div>
                          <span className="fw-bold">{item.nombre}</span> <br />
                          {item.cantidad} x{" "}
                          {item.precio.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                          })}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => eliminarPedido(pedido.id)}
                    >
                      🗑 Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisPedidos;
