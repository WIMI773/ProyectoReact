import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { auth } from '../../Firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function PaginaPrincipal() {
  const navigate = useNavigate();

  const handleLogoutConfirm = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás seguro de que quieres salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/');
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo cerrar sesión.", "error");
      }
    }
  };

  return (
    <main data-bs-theme="auto">
      {/* Navbar 1 - Dark */}
      <nav className="navbar navbar-dark bg-dark" aria-label="Dark offcanvas navbar">
        <div className="container-fluid">
          <h5 className="offcanvas-title text-danger" id="offcanvasNavbarDarkLabel">REAL HASTA LA MUERTE</h5>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-danger" id="offcanvasNavbarDarkLabel">MENU</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item"><a className="nav-link active" href="/">Inicio</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Canciones</a></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Álbumes</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                {/* Botón de cerrar sesión */}
                <div>
                  <button type='button' className='btn btn-danger w-10' onClick={handleLogoutConfirm}>
                    Cerrar Sesion
                  </button>
                </div>
              </ul>
              <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar 3 - Responsive dark */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Offcanvas navbar large">
        <div className="container-fluid">
          <h5 className="offcanvas-title text-danger" id="offcanvasNavbarDarkLabel">INICIO</h5>

          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item"><a className="nav-link active" href="/">Inicio</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Canciones</a></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Dropdown</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex mt-3 mt-lg-0" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" />
                <button className="btn btn-outline-danger" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container my-5">
        <div className="bg-body-tertiary p-5 rounded">
          <div className="col-sm-8 py-5 mx-auto">
            <h1 className="display-5 fw-normal">REAL HASTA LA MUERTE</h1>
            <p className="fs-5">
              Anuel AA el Dios Del Trap
            </p>
            <p>
              Mejor que Bad Bunny
            </p>
            <p>
              <a className="btn btn-danger" href="/Registrar" role="button">
                Regístrate para ser un Real Hasta La Muerte &raquo;
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaginaPrincipal;
