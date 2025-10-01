import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // 👉 Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.nombre === producto.nombre);
      if (existe) {
        return prev.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: producto.cantidad || 1 }];
    });
  };

  // 👉 Eliminar producto
  const eliminarDelCarrito = (nombre) => {
    setCarrito((prev) => prev.filter((item) => item.nombre !== nombre));
  };

  // 👉 Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  // 👉 Actualizar cantidad
  const actualizarCantidad = (nombre, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.nombre === nombre ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  // 👉 Calcular total
  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        mostrarCarrito,
        // ✅ en lugar de pasar "setMostrarCarrito" directo, pasamos funciones controladas:
        abrirCarrito: () => setMostrarCarrito(true),
        cerrarCarrito: () => setMostrarCarrito(false),
        toggleCarrito: () => setMostrarCarrito((prev) => !prev),

        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        actualizarCantidad,
        totalCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);
