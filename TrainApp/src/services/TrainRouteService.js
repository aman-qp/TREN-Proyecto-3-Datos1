export function GetTrainRoutes() {
    return fetch('http://localhost:5134/api/routes')
        .then(response => response.json())
        .then(data => data);
}

//export const GetTrainRoutes = async () => {
    // Implementa tu lógica para obtener las rutas
    // Ejemplo:
    // return fetch('/api/routes').then(response => response.json());
// };
  
 // export const AddTrainRoute = async (route) => {
    // Implementa tu lógica para agregar una nueva ruta
    // Ejemplo:
    // return fetch('/api/routes', {
    //   method: 'POST',
    //   body: JSON.stringify(route),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  //};
  
  //export const DeleteTrainRoute = async (routeId) => {
    // Implementa tu lógica para eliminar una ruta
    // Ejemplo:
    // return fetch(`/api/routes/${routeId}`, { method: 'DELETE' });
 // };
  
  //export const ModifyTrainRoute = async (routeId, newRouteData) => {
    // Implementa tu lógica para modificar una ruta existente
    // Ejemplo:
    // return fetch(`/api/routes/${routeId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(newRouteData),
    //   headers: { 'Content-Type': 'application/json' },
    // });
 // };