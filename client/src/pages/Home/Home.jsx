import './Home.scss'
import { useNavigate } from 'react-router-dom';
import DotBackground from '../../components/dotBackground/DotBackground';

function Home() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/map');
  };

  return (
    <body>
      <main>
        <button id='continue' onClick={handleClick}>Continue</button>
        <DotBackground/>
      </main>
    </body>
  )
}

export default Home
