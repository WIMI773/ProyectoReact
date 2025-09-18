import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const productoExistente = prev.find((item) => item.nombre === producto.nombre);
      if (productoExistente) {
        return prev.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      } else {
        return [...prev, producto];
      }
    });
  };

  const eliminarDelCarrito = (nombre) => {
    setCarrito((prev) => prev.filter((item) => item.nombre !== nombre));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        mostrarCarrito,
        setMostrarCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        totalCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// 🔹 Hook personalizado que sí se puede importar con { useCarrito }
export const useCarrito = () => useContext(CarritoContext);
