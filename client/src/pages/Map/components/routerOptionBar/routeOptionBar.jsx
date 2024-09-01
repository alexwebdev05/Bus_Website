import './style.scss';
import { useState, useEffect } from 'react';
import { startHour } from '../../webSocket/startHour';

import StopListComponent from './components/StopListComponent';

function RouteOptionBar() {
    const [busTime, setBusTime] = useState({});
    const [stops, setStops] = useState([]);


    useEffect(() => {
        const cleanup = startHour(setBusTime);
        return () => cleanup();
    }, []);

    const formatTime = (hour, minute, second) => {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    }

    function generateArrivalTime(hour, minute, second) {
        return {
            arrival1: formatTime(hour, minute, second),
            arrival2: formatTime(hour, minute + 2, second),
            arrival3: formatTime(hour, minute + 4, second),
            arrival4: formatTime(hour, minute + 6, second),
            arrival5: formatTime(hour, minute + 8, second)
        }
    }

    useEffect(() => {
        const newStops = [];
        for (let i = 1; i <= 5; i++) {
          const stop = busTime[`stop${i}`];
          if (stop) {
            const { hour, minute, second } = stop;
            const stopTime = generateArrivalTime(hour, minute, second);
            newStops.push(stopTime);
          }
        }
        setStops(newStops);
      }, [busTime]);

    // Display arrive times
    function stopCanger(number) {

        const visibleElement = document.getElementById(`stop${number}`);

        for (let i = 1; i <= 5; i++) {
            const element = document.getElementById(`stop${i}`);
            if (element) {
                element.style.display = 'none';
            }
        }

        if (visibleElement) {
            visibleElement.style.display = 'flex';
        }
    }

    // Button style
    function colorBlue(button) {
        for (let i = 1; i <= 5; i++) {
            const actualButton = document.getElementById(`button${i}`);
            if (actualButton) {
                if (window.getComputedStyle(actualButton).color === 'rgb(255, 255, 255)') {
                    actualButton.style.backgroundColor = 'white';
                    actualButton.style.border = '2px solid rgba(165, 165, 165, 0.5)';
                    actualButton.style.color = 'black';
                }
            }
        }
    
        const Button = document.getElementById(`button${button}`);
        if (Button) {
            if (window.getComputedStyle(Button).color !== 'rgb(255, 255, 255)') {
                Button.style.backgroundColor = 'rgba(48, 78, 255, 1)';
                Button.style.border = '2px solid rgba(48, 78, 255, 1)';
                Button.style.color = 'white';
            }
        }
    }

    function getHour(number, arrival) {
        const fechaActual = new Date();

        const stop = busTime[`stop${number}`];
        if (!busTime || !stop || typeof stop.minute === 'undefined') {
            return;
        }

        // Get the hour
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();

        
        let restMinutes = stop.minute - minutos + arrival;
        let restSeconds = stop.second - segundos;

        if ( restSeconds < 0 ) {
            restMinutes -= 1
            restSeconds += 60
        }

        if (restMinutes < 0) {
            const elements = document.getElementsByClassName(`firstTime${number - 1}`);

            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            }
            restMinutes += 2;
        }

        if ( stop.minute == fechaActual.getMinutes() & stop.second == fechaActual.getSeconds()) {
            resetDisplayF()
        }


        restSeconds = String(restSeconds).padStart(2, '0');
    
        return `${restMinutes}:${restSeconds}`
    }

    function resetDisplayF() {
        for (let i = 0; i < 5; i++) {
            const elements = document.getElementsByClassName(`firstTime${i}`);
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = 'flex';
            }
        }
        
    }

    return (
        <div id="container">
            {/* City */}
            <p className='title1'>Cubeland</p>

            <div id='contentContainer'>
                <div id='buttonContainer'>
                    <button className='stopButton' id='button1' onClick={() => {stopCanger(1), colorBlue(1)}}>Parada 1</button>
                    <button className='stopButton' id='button2' onClick={() => {stopCanger(2), colorBlue(2)}}>Parada 2</button>
                    <button className='stopButton' id='button3' onClick={() => {stopCanger(3), colorBlue(3)}}>Parada 3</button>
                    <button className='stopButton' id='button4' onClick={() => {stopCanger(4), colorBlue(4)}}>Parada 4</button>
                    <button className='stopButton' id='button5' onClick={() => {stopCanger(5), colorBlue(5)}}>Parada 5</button>
                </div>
                

                {/* Prediction */}
                <section id='predictionContainer'>

                    <StopListComponent stops={stops} hour={getHour} number={0} />
                    <StopListComponent stops={stops} hour={getHour} number={1} />
                    <StopListComponent stops={stops} hour={getHour} number={2} />
                    <StopListComponent stops={stops} hour={getHour} number={3} />
                    <StopListComponent stops={stops} hour={getHour} number={4} />

                </section>
            </div>

            
        </div>
    );
}

export default RouteOptionBar;
