import CubeLand from './components/cubeLand/cubeLand';
import RouteOptionBar from './components/routerOptionBar/routeOptionBar'
import './Map.scss';

function Map() {
  return (

    <div id='app'>
      <RouteOptionBar />
      <CubeLand />
    </div>

  );
}

export default Map;