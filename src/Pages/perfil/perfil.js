import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Perfil = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body text-center">
              {/* Imagen de perfil */}
              <img
                src="https://via.placeholder.com/150"
                alt="Foto de perfil"
                className="rounded-circle mb-3 border border-3 border-warning"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />

              {/* Nombre */}
              <h3 className="fw-bold">Juan David Rincón</h3>
              <p className="text-muted">Aprendiz SENA - ADS</p>

              {/* Información */}
              <div className="text-start mt-4">
                <p><strong>Email:</strong> juan.rincon@example.com</p>
                <p><strong>Teléfono:</strong> +57 300 123 4567</p>
                <p><strong>Ciudad:</strong> Ocaña, Norte de Santander</p>
              </div>

              {/* Botones */}
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-warning fw-bold rounded-pill px-4">
                  Editar Perfil
                </button>
                <button className="btn btn-outline-danger fw-bold rounded-pill px-4">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
