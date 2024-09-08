import React, { useEffect, useState } from 'react';
import style from "./style.module.css";

interface timesProps {
    stops?: string[];
    hour?: (number: number, arrival: number) => string;
    number: number;
    isActive: boolean;
}

export default function StopListComponent({ stops = [], hour, number, isActive }: timesProps) {
    const [showTime, setShowTime] = useState(true);

    useEffect(() => {
        setShowTime(number !== 0);
    }, [number]);

    

    return (
        <div className={`${style.container} ${isActive ? style.active : style.inactive}`}>
            <h2>Next arrivals</h2>
            <section className={style.timesContainer}>
                <div className={style.awaitTime}>
                    <p>Hour {number}</p>
                    {stops.length === 0 ? (
                        <>
                            <p className={`firstTime${number}`}>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                        </>
                    ) : (
                        <>
                            <p className={`firstTime${number}`}>{stops[0]}</p>
                            <p>{stops[1]}</p>
                            <p>{stops[2]}</p>
                            <p>{stops[3]}</p>
                            <p>{stops[4]}</p>
                        </>
                    )}
                </div>
                <div className={style.awaitTime}>
                    <p>Time</p>
                    {stops.length === 0 ? (
                        <>
                            <p className={`firstTime${number}`}>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                        </>
                    ) : (
                        <>
                            {hour && (
                                <>
                                    <p className={`firstTime${number}`}>{hour(number + 1, 0)}</p>
                                    <p>{hour(number + 1, 2)}</p>
                                    <p>{hour(number + 1, 4)}</p>
                                    <p>{hour(number + 1, 6)}</p>
                                    <p>{hour(number + 1, 8)}</p>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
