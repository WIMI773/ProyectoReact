import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.email.trim() || !formData.asunto.trim() || !formData.mensaje.trim()) {
      Swal.fire('Atención', 'Por favor completa todos los campos.', 'warning');
      return;
    }

    Swal.fire(
      '¡Mensaje enviado!',
      'Gracias por contactarnos, pronto te responderemos.',
      'success'
    );

    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <section className="container py-5" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center fw-bold" style={{ color: '#212529' }}>Contáctanos</h2>

      <p className="text-center mb-5" style={{ color: '#555' }}>
        Estamos aquí para ayudarte. Completa el formulario y responderemos lo antes posible.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-semibold">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="tuemail@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="asunto" className="form-label fw-semibold">Asunto</label>
          <input
            type="text"
            className="form-control"
            id="asunto"
            placeholder="Motivo del contacto"
            value={formData.asunto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mensaje" className="form-label fw-semibold">Mensaje</label>
          <textarea
            className="form-control"
            id="mensaje"
            rows="5"
            placeholder="Escribe tu mensaje aquí..."
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100 fw-semibold mb-3"
          style={{ backgroundColor: '#FFD600', borderColor: '#FFD600' }}
        >
          Enviar
        </button>

        {/* Botón para ir al inicio */}
        <Link
          to="/PaginaPrincipal"
          className="btn btn-secondary w-100 fw-semibold"
        >
          Ir al inicio
        </Link>
      </form>

      {/* Mapa */}
      <div className="my-5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1754408439726!5m2!1ses-419!2sco!6m8!1m7!1s3Vw05HtDyFNqu9Ce4NaF6w!2m2!1d8.23161342769544!2d-73.34933782221967!3f129.91606938420477!4f-1.742002660381445!5f0.4000000000000002"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Supermercado La Amistad"
        />
      </div>

      <hr className="my-5" />

      <div className="text-center" style={{ color: '#212529' }}>
        <p><strong>Teléfono:</strong> +57 3153197363</p>
        <p><strong>Email:</strong> contacto@laamistad.com.co</p>
        <p><strong>Dirección:</strong> Carrera 10A #16-02, Ocaña, Norte de Santander, Colombia</p>
        <p><strong>Horario:</strong> Lunes a Domingo, 6:30 am - 9:30 pm</p>
      </div>
    </section>
  );
}

export default Contacto;
