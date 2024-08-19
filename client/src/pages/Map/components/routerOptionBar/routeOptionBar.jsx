import './style.scss';
import { useState, useEffect } from 'react';
import { startHour } from '../../webSocket/startHour';

function RouteOptionBar() {
    const [busTime, setBusTime] = useState({});
    const [hideStop1, setHideStop1] = useState(false);

    useEffect(() => {
        const cleanup = startHour(setBusTime);
        return () => cleanup();
    }, []);

    const formatTime = (hour, minute, second) => {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    }

    let stop1Time = {}
    let stop2Time = {}
    let stop3Time = {}
    let stop4Time = {}
    let stop5Time = {}

    if (busTime.stop1) {
        const { hour, minute, second } = busTime.stop1;
        stop1Time = {
            arrival1: formatTime(hour, minute, second),
            arrival2: formatTime(hour, minute + 2, second),
            arrival3: formatTime(hour, minute + 4, second),
            arrival4: formatTime(hour, minute + 6, second),
            arrival5: formatTime(hour, minute + 8, second)
        }
    }

    if (busTime.stop2) {
        const { hour, minute, second } = busTime.stop2;
        stop2Time = {
            arrival1: formatTime(hour, minute, second),
            arrival2: formatTime(hour, minute + 2, second),
            arrival3: formatTime(hour, minute + 4, second),
            arrival4: formatTime(hour, minute + 6, second),
            arrival5: formatTime(hour, minute + 8, second)
        }
    }

    if (busTime.stop3) {
        const { hour, minute, second } = busTime.stop3;
        stop3Time = {
            arrival1: formatTime(hour, minute, second),
            arrival2: formatTime(hour, minute + 2, second),
            arrival3: formatTime(hour, minute + 4, second),
            arrival4: formatTime(hour, minute + 6, second),
            arrival5: formatTime(hour, minute + 8, second)
        }
    }

    if (busTime.stop4) {
        const { hour, minute, second } = busTime.stop4;
        stop4Time = {
            arrival1: formatTime(hour, minute, second),
            arrival2: formatTime(hour, minute + 2, second),
            arrival3: formatTime(hour, minute + 4, second),
            arrival4: formatTime(hour, minute + 6, second),
            arrival5: formatTime(hour, minute + 8, second)
        }
    }

    if (busTime.stop5) {
        const { hour, minute, second } = busTime.stop5;
        stop5Time = {
            arrival1: formatTime(hour, minute, second),
            arrival2: formatTime(hour, minute + 2, second),
            arrival3: formatTime(hour, minute + 4, second),
            arrival4: formatTime(hour, minute + 6, second),
            arrival5: formatTime(hour, minute + 8, second)
        }
    }

    function stopCanger(number) {

        const visibleElement = document.getElementById(`stop${number}`);

        // Hide all stop elements
        for (let i = 1; i <= 5; i++) {
            const element = document.getElementById(`stop${i}`);
            if (element) {
                element.style.display = 'none';
            }
        }

        // Show the current stop element
        if (visibleElement) {
            visibleElement.style.display = 'flex';
        }
    }

    return (
        <div id="container">
            {/* City */}
            <section>
                <p className='title1'>City</p>
                <div id='mapButtons'>
                    <button className='maps'>CubeLand</button>|
                    <button className='maps'>OtroMas</button>
                </div>
            </section>
            <hr />

            {/* Date */}
            <section>
                <p className='title1'>Date</p>
                <div id='date'><input type="date" /></div>
            </section>

            {/* Hour */}
            <section>
                <p className='title1'>Hour</p>
                <div id='hour'><input type="time" /></div>
            </section>
            <hr />

            <button onClick={() => stopCanger(1)}>Parada 1</button>
            <button onClick={() => stopCanger(2)}>Parada 2</button>
            <button onClick={() => stopCanger(3)}>Parada 3</button>
            <button onClick={() => stopCanger(4)}>Parada 4</button>
            <button onClick={() => stopCanger(5)}>Parada 5</button>

            {/* Prediction */}
            <section id='predictionContainer'>
                <div id='stop1'>
                   <p className='title1'>Stop 1</p>
                    <h2>Next 5 arrivals</h2>
                    <p>{stop1Time.arrival1 || "Waiting for start time..."}</p>
                    <p>{stop1Time.arrival2 || "Waiting for start time..."}</p>
                    <p>{stop1Time.arrival3 || "Waiting for start time..."}</p>
                    <p>{stop1Time.arrival4 || "Waiting for start time..."}</p>
                    <p>{stop1Time.arrival5 || "Waiting for start time..."}</p>
                </div>
                
                <div id='stop2'>
                    <p className='title1'>Stop 2</p>
                    <h2>Next 5 arrivals</h2>
                    <p>{stop2Time.arrival1 || "Waiting for start time..."}</p>
                    <p>{stop2Time.arrival2 || "Waiting for start time..."}</p>
                    <p>{stop2Time.arrival3 || "Waiting for start time..."}</p>
                    <p>{stop2Time.arrival4 || "Waiting for start time..."}</p>
                    <p>{stop2Time.arrival5 || "Waiting for start time..."}</p>
                </div>
                
                <div id='stop3'>
                    <p className='title1'>Stop 3</p>
                    <h2>Next 5 arrivals</h2>
                    <p>{stop3Time.arrival1 || "Waiting for start time..."}</p>
                    <p>{stop3Time.arrival2 || "Waiting for start time..."}</p>
                    <p>{stop3Time.arrival3 || "Waiting for start time..."}</p>
                    <p>{stop3Time.arrival4 || "Waiting for start time..."}</p>
                    <p>{stop3Time.arrival5 || "Waiting for start time..."}</p>
                </div>

                <div id='stop4'>
                    <p className='title1'>Stop 4</p>
                    <h2>Next 5 arrivals</h2>
                    <p>{stop4Time.arrival1 || "Waiting for start time..."}</p>
                    <p>{stop4Time.arrival2 || "Waiting for start time..."}</p>
                    <p>{stop4Time.arrival3 || "Waiting for start time..."}</p>
                    <p>{stop4Time.arrival4 || "Waiting for start time..."}</p>
                    <p>{stop4Time.arrival5 || "Waiting for start time..."}</p>
                </div>

                <div id='stop5'>
                    <p className='title1'>Stop 5</p>
                    <h2>Next 5 arrivals</h2>
                    <p>{stop5Time.arrival1 || "Waiting for start time..."}</p>
                    <p>{stop5Time.arrival2 || "Waiting for start time..."}</p>
                    <p>{stop5Time.arrival3 || "Waiting for start time..."}</p>
                    <p>{stop5Time.arrival4 || "Waiting for start time..."}</p>
                    <p>{stop5Time.arrival5 || "Waiting for start time..."}</p>
                </div>
                
            </section>

            {/* Payment */}
            <section id='payContainer'>
                <p className='title1'>PreMo</p>
                <button id='buy'>Buy</button>
            </section>
        </div>
    );
}

export default RouteOptionBar;
