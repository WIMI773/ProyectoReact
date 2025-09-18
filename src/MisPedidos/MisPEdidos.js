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
import { db } from "../Firebase";
import { auth } from "../Firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";  // ✅ Importar hook de navegación

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ Inicializar navegación

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

  // 🔴 Eliminar pedido con confirmación
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

  // 🟢 Confirmar y guardar un pedido en Firestore
  const confirmarPedido = async () => {
    if (!user) {
      Swal.fire("Debes iniciar sesión", "Inicia sesión para confirmar un pedido", "warning");
      return;
    }

    try {
      const nuevoPedido = {
        userId: user.uid,
        estado: "Pendiente",
        total: 50000, // 🔴 aquí puedes poner el total real
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

      // ✅ Redirigir automáticamente al Checkout con el id del pedido
      navigate(`/Checkout/${docRef.id}`);

    } catch (error) {
      console.error("Error al confirmar pedido:", error);
      Swal.fire("Error", "No se pudo confirmar el pedido", "error");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Mis Pedidos</h2>

      {/* 🔹 Botón para confirmar un nuevo pedido */}
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={confirmarPedido}>
          Confirmar Pedido 🛒
        </button>
      </div>

      {pedidos.length === 0 ? (
        <p className="text-center">No tienes pedidos aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>Pedido ID: {pedido.id}</h5>
              <p>Estado: {pedido.estado}</p>
              <p>
                Total:{" "}
                {pedido.total.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })}
              </p>
              <p>Productos:</p>
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
                      {item.nombre} - {item.cantidad} x{" "}
                      {item.precio.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </div>
                  </li>
                ))}
              </ul>
              <p>
                Fecha:{" "}
                {pedido.fecha?.toDate
                  ? pedido.fecha.toDate().toLocaleString()
                  : "Pendiente"}
              </p>

              {/* Botón Eliminar */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarPedido(pedido.id)}
              >
                Eliminar Pedido 🗑
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MisPedidos;
