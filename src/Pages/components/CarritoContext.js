// src/context/CarritoContext.js
// Crea esta carpeta y archivo: src/context/CarritoContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  // Cargar carrito desde localStorage al inicializar
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error('Error al cargar carrito desde localStorage:', error);
      return [];
    }
  });

  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
      console.error('Error al guardar carrito en localStorage:', error);
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.nombre === producto.nombre);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto }]);
    }
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${producto.nombre} agregado al carrito`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const eliminarDelCarrito = (nombre) => {
    setCarrito(carrito.filter((item) => item.nombre !== nombre));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const value = {
    carrito,
    mostrarCarrito,
    setMostrarCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    limpiarCarrito,
    totalCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};