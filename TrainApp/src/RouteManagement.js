// src/components/RouteManagement.js

import React, { useState, useEffect } from 'react';
import { GetTrainRoutes, AddTrainRoute, DeleteTrainRoute, ModifyTrainRoute } from '../services/TrainRouteService';
import TrainMap from './TrainMap';

function RouteManagement() {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ start: '', end: '', cost: '', distanceInKm: '' });
  const [editingRoute, setEditingRoute] = useState(null);

  const updateRoutes = async () => {
    let newRoutes = await GetTrainRoutes();
    setRoutes(newRoutes);
  };

  useEffect(() => {
    updateRoutes();
  }, []);

  const handleDeleteRoute = async (routeId) => {
    const canDelete = await canDeleteRoute(routeId);
    if (canDelete) {
      await DeleteTrainRoute(routeId);
      updateRoutes();
    } else {
      alert('No se puede eliminar la ruta porque tiene tiquetes activos');
    }
  };

  const handleModifyRoute = (routeId) => {
    const route = routes.find(r => r.id === routeId);
    setEditingRoute(route);
    setNewRoute(route);
  };

  const handleSaveRoute = async () => {
    if (editingRoute) {
      await ModifyTrainRoute(editingRoute.id, newRoute);
    } else {
      await AddTrainRoute(newRoute);
    }
    setEditingRoute(null);
    setNewRoute({ start: '', end: '', cost: '', distanceInKm: '' });
    updateRoutes();
  };

  const canDeleteRoute = async (routeId) => {
    // Implementa tu lógica aquí
    return true;
  };

  return (
    <div>
      <h2>Gestión de Rutas</h2>
      <div>
        <input 
          type="text" 
          placeholder="Start" 
          value={newRoute.start} 
          onChange={(e) => setNewRoute({ ...newRoute, start: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="End" 
          value={newRoute.end} 
          onChange={(e) => setNewRoute({ ...newRoute, end: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Cost" 
          value={newRoute.cost} 
          onChange={(e) => setNewRoute({ ...newRoute, cost: e.target.value })} 
        />
        <input 
          type="number" 
          placeholder="Distance" 
          value={newRoute.distanceInKm} 
          onChange={(e) => setNewRoute({ ...newRoute, distanceInKm: e.target.value })} 
        />
        <button onClick={handleSaveRoute}>
          {editingRoute ? 'Modificar' : 'Agregar'}
        </button>
      </div>
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
      <div className="train-map-container">
        <TrainMap routes={routes} />
      </div>
    </div>
  );
}

export default RouteManagement;
