import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './Pages/LoginPage/LoginPage';
import Recuperar from './Pages/Recuperar/Recuperar';
import Registrar from './Pages/Registrar/Registrar';
import PaginaPrincipal from './Pages/PaginaPrincipal/PaginaPrincipal';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/Recuperar" element={<Recuperar/>}/>
      <Route path="/Registrar" element={<Registrar/>}/>
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;


















/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
