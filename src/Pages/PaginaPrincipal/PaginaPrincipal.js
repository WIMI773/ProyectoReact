// PaginaPrincipal.js
import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Table, Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { auth, db } from '../../Firebase';
import { signOut } from 'firebase/auth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './PaginaPrincipal.css';

function PaginaPrincipal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [auxiliares, setAuxiliares] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAux, setSelectedAux] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuxiliares = async () => {
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const auxList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAuxiliares(auxList);
    };
    fetchAuxiliares();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    Swal.fire(`Buscando productos para: "${searchTerm}"`);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "¿Estás seguro de que quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth);
        navigate('/');
      }
    });
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedAux(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const auxRef = doc(db, 'usuarios', selectedAux.id);
      await updateDoc(auxRef, {
        nombres: selectedAux.nombres,
        apellidos: selectedAux.apellidos,
        cedula: selectedAux.cedula,
        telefono: selectedAux.telefono,
        email: selectedAux.email,
        fechaNacimiento: selectedAux.fechaNacimiento,
        sexo: selectedAux.sexo,
        estado: selectedAux.estado
      });
      setAuxiliares(auxiliares.map(a => a.id === selectedAux.id ? selectedAux : a));
      setShowModal(false);
      Swal.fire('Actualizado', 'Los datos fueron actualizados.', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo actualizar.', 'error');
    }
  };

  const handleEdit = (aux) => {
    setSelectedAux(aux);
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'usuarios', id));
        setAuxiliares(auxiliares.filter(a => a.id !== id));
        Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
      }
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#">LaAmistad</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarResponsive" />
          <Navbar.Collapse id="navbarResponsive">
            <Nav className="me-auto">
              <Nav.Link href="#">Inicio</Nav.Link>
              <Nav.Link href="#">Productos</Nav.Link>
              <Nav.Link href="#">Ofertas</Nav.Link>
              <Nav.Link href="#">Contacto</Nav.Link>
            </Nav>
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Buscar productos"
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-light" type="submit">Buscar</Button>
            </Form>
            <Button variant="outline-light" onClick={handleLogout}>Cerrar Sesión</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-5">
        <div className="text-center">
          <h1>Bienvenido</h1>
          <p className="lead">Los mejores productos al mejor precio.</p>
        </div>
      </Container>

      <Container className="mt-4">
        <h2 className="text-center mb-4">AUXILIARES DE SERVICIOS REGISTRADOS EN BRILLA</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Fecha Nacimiento</th>
              <th>Sexo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {auxiliares.map(aux => (
              <tr key={aux.id}>
                <td>{aux.nombres}</td>
                <td>{aux.apellidos}</td>
                <td>{aux.cedula}</td>
                <td>{aux.telefono}</td>
                <td>{aux.email}</td>
                <td>{aux.fechaNacimiento || '-'}</td>
                <td>{aux.sexo || '-'}</td>
                <td>{aux.estado || 'Pendiente'}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(aux)}>
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleEliminar(aux.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Auxiliar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAux && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" name="nombres" value={selectedAux.nombres} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" name="apellidos" value={selectedAux.apellidos} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Cédula</Form.Label>
                <Form.Control type="text" name="cedula" value={selectedAux.cedula} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" name="telefono" value={selectedAux.telefono} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={selectedAux.email} disabled />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control type="date" name="fechaNacimiento" value={selectedAux.fechaNacimiento || ''} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Sexo</Form.Label>
                <Form.Select name="sexo" value={selectedAux.sexo || ''} onChange={handleModalChange}>
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Estado</Form.Label>
                <Form.Select name="estado" value={selectedAux.estado || 'Pendiente'} onChange={handleModalChange}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PaginaPrincipal;
