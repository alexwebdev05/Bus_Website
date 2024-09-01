import CubeLand from './components/cubeLand/cubeLand';
import RouteOptionBar from './components/routerOptionBar/routeOptionBar'
import DotBackground from '../../components/dotBackground/DotBackground'
import './Map.scss';
import anime from 'animejs'

function Map() {
  
  return (

    <div id='app'>
      <RouteOptionBar />
      <CubeLand />
      <DotBackground/>
    </div>

  );
}

export default Map;