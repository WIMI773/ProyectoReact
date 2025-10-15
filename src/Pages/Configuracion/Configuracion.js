import { useState, useEffect } from "react";
import { auth, db } from "../../Firebase";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Configuracion() {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [fotoURL, setFotoURL] = useState("");
  const navigate = useNavigate();

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/");
        return;
      }

      setUser(currentUser);
      setNombre(currentUser.displayName || "");
      setCorreo(currentUser.email || "");
      setFotoURL(currentUser.photoURL || "");

      try {
        const userRef = doc(db, "usuarios", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.nombre) setNombre(data.nombre);
          if (data.fotoURL) setFotoURL(data.fotoURL);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Actualizar datos del perfil
  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Actualizar en Firebase Auth
      await updateProfile(user, {
        displayName: nombre,
        photoURL: fotoURL,
      });

      // Si cambió el correo
      if (correo !== user.email) {
        await updateEmail(user, correo);
      }

      // Si escribió una nueva contraseña
      if (nuevaContrasena.trim() !== "") {
        await updatePassword(user, nuevaContrasena);
      }

      // Guardar en Firestore
      const userRef = doc(db, "usuarios", user.uid);
      await setDoc(
        userRef,
        { nombre, correo, fotoURL },
        { merge: true } // no borra otros campos
      );

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Tu perfil ha sido actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar:", error);
      let mensaje = "Ocurrió un error al actualizar tu perfil.";

      // Mensajes más claros según el tipo de error
      if (error.code === "auth/requires-recent-login") {
        mensaje = "Debes volver a iniciar sesión para actualizar tu cuenta.";
      } else if (error.code === "auth/email-already-in-use") {
        mensaje = "El correo ingresado ya está en uso por otro usuario.";
      } else if (error.code === "auth/invalid-email") {
        mensaje = "El formato del correo no es válido.";
      } else if (error.code === "auth/weak-password") {
        mensaje = "La nueva contraseña debe tener al menos 6 caracteres.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje,
      });
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center text-warning fw-bold">
        Configuración de Cuenta
      </h2>

      <form onSubmit={handleActualizar}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Nueva Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Deja vacío si no deseas cambiarla"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Foto de Perfil (URL)</label>
          <input
            type="url"
            className="form-control"
            placeholder="https://..."
            value={fotoURL}
            onChange={(e) => setFotoURL(e.target.value)}
          />
        </div>

        {fotoURL && (
          <div className="text-center mb-3">
            <img
              src={fotoURL}
              alt="Vista previa"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        {/* Botones centrados */}
        <div className="text-center mt-4">
          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-warning fw-bold px-4">
              Guardar Cambios
            </button>

            <button
              type="button"
              className="btn btn-secondary fw-bold px-4"
              onClick={() => navigate(-1)}
            >
              Volver
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Configuracion;
