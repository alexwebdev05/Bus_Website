import React from 'react';
import { useEffect, useState } from 'react';

function StopListComponent({ stops, hour, number }) {
    const [showTime, setShowTime] = useState(true);

    useEffect(() => {
        if (number === 0) {
            setShowTime(false);
        } else {
            setShowTime(true);
        }
    }, [number]);

    return (
        <div id={`stop${number + 1}`}>
            <h2>Next arrivals</h2>
            <section id='timesContainer'>
                <div className='awaitTime'>
                    <p>Hour</p>
                    {showTime ? (
                        <p className={`firstTime${number}`}>{stops[number]?.arrival1 || "Waiting for start time..."}</p>
                    ): null}    

                    <p>{stops[number]?.arrival2 || "Waiting for start time..."}</p>
                    <p>{stops[number]?.arrival3 || "Waiting for start time..."}</p>
                    <p>{stops[number]?.arrival4 || "Waiting for start time..."}</p>
                    <p>{stops[number]?.arrival5 || "Waiting for start time..."}</p>
                </div>

                <div className='awaitTime'>
                    <p>Time</p>
                    {showTime ? (
                        <p className={`firstTime${number}`}>{hour(number + 1, 0) || "Waiting for start time..."}</p>
                    ): null}  
                    <p>{hour(number + 1, 2) || "Waiting for start time..."}</p>
                    <p>{hour(number + 1, 4) || "Waiting for start time..."}</p>
                    <p>{hour(number + 1, 6) || "Waiting for start time..."}</p>
                    <p>{hour(number + 1, 8) || "Waiting for start time..."}</p>
                </div>
            </section>
        </div>
    );
}

export default StopListComponent;
