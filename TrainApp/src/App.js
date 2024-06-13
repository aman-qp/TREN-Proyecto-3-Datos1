import './App.css';
import { GetTrainRoutes } from './services/TrainRouteService';
import { useEffect, useState } from 'react';
import TrainMap from './TrainMap';

function App() {
  const [routes, setRoutes] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date().toLocaleString());

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

  return (
    <div className="App">
      {currentTime}
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
        <svg id="train-map" width="1200" height="1500"></svg>
      </div>
    </div>
  );
}

export default App;
