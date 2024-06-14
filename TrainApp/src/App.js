import React, { useEffect, useState } from 'react';
import './App.css';
import { GetTrainRoutes, AddTrainRoute, DeleteTrainRoute, ModifyTrainRoute } from './services/TrainRouteService';
import TrainMap from './TrainMap';

function App() {
  const [routes, setRoutes] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newRoute, setNewRoute] = useState({ start: '', end: '', cost: '', distanceInKm: '' });

  const updateRoutes = async () => {
    let newRoutes = await GetTrainRoutes();
    setRoutes(newRoutes);
  };

  useEffect(() => {
    updateRoutes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleAddRoute = async () => {
    const route = { ...newRoute, cost: newRoute.distanceInKm * 25 };
    await AddTrainRoute(route);
    updateRoutes();
    setNewRoute({ start: '', end: '', cost: '', distanceInKm: '' });
  };

  const handleDeleteRoute = async (routeId) => {
    await DeleteTrainRoute(routeId);
    updateRoutes();
  };

  const handleModifyRoute = async (routeId) => {
    const newDistance = prompt('Nueva distancia (km):');
    const newCost = newDistance * 25;
    if (newCost !== null && newDistance !== null) {
      await ModifyTrainRoute(routeId, { cost: newCost, distanceInKm: newDistance });
      updateRoutes();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="header">
          <h2>Admin Login</h2>
          <input 
            type="text" 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="main-content">
          <h1>Train Routes</h1>
          <table>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Cost</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((element, index) =>
                <tr key={index}>
                  <td>{element.start}</td>
                  <td>{element.end}</td>
                  <td>{element.cost}</td>
                  <td>{element.distanceInKm}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="train-map-container">
            <TrainMap routes={routes} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h2>Gestión de Rutas</h2>
        <table>
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
              <th>Cost</th>
              <th>Distance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((element, index) => (
              <tr key={index}>
                <td>{element.start}</td>
                <td>{element.end}</td>
                <td>{element.cost}</td>
                <td>{element.distanceInKm}</td>
                <td>
                  <button onClick={() => handleDeleteRoute(element.id)}>Eliminar</button>
                  <button onClick={() => handleModifyRoute(element.id)}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h3>Agregar Nueva Ruta</h3>
          <input 
            type="text" 
            placeholder="Inicio" 
            value={newRoute.start} 
            onChange={(e) => setNewRoute({ ...newRoute, start: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Fin" 
            value={newRoute.end} 
            onChange={(e) => setNewRoute({ ...newRoute, end: e.target.value })} 
          />
          <input 
            type="number" 
            placeholder="Distancia (km)" 
            value={newRoute.distanceInKm} 
            onChange={(e) => setNewRoute({ ...newRoute, distanceInKm: e.target.value })} 
          />
          <button onClick={handleAddRoute}>Agregar Ruta</button>
        </div>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }
}

export default App;
