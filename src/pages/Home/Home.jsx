import './Home.scss'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/map');
  };

  return (
    <body>
      <main>
        <p id='title'>Alexwebdev bus routes</p>
        <p id='subTitle'>This is a unreal web page to buy bus tickets what is made with Html, Css, JavaScript and React. I’m Opdudev and I have made this page to show mi skills on web development. The code of this page is published on <a href="https://github.com/Sniffsec" target="_blank">my Github.</a></p>
        <section id='routeCity'>
          <select name="city" id="citySelector">
            <option value="">Select here the city</option>
            <option value="Bilbao">Bilbao</option>
          </select>
          <div id='otherLine'>
            <select name="date" id="routeDate">
              <option value="">date</option>
            </select>
            <select name="date" id="routeHour">
              <option value="">hour</option>
            </select>
            <button id='continue' onClick={handleClick}>Continue</button>
          </div>
        </section>
      </main>
    </body>
  )
}

export default Home
