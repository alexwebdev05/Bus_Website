"use client";

import SButton from "./stopButton/sButton";
import StopListComponent from "./stopListComponent/StopListComponent";
import startHour from "./startHour";

import { useEffect, useState } from "react";

import style from "./style.module.css";

// Interfaces
interface colorProps {
    color1: string;
    color2: string;
}

interface StopTimeProps {
    hour: number;
    minute: number;
    second: number;
}

interface Stop {
    number: number;
    isActive: boolean;
}

interface BusTimeState {
    [key: string]: StopTimeProps | undefined;
}

const formatTime = ({ hour, minute, second }: StopTimeProps) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}

// Principal function
export default function RouterOptionBar({ color1, color2 }: colorProps) {
    const [isActive, setIsActive] = useState<number>(0);
    const [timeActive, setTimeActive] = useState<number>();
    const [busTime, setBusTime] = useState<BusTimeState>({});
    const [stops, setStop] = useState<string[][]>([]);

    // UseEffects
    useEffect(() => {
        const cleanup = startHour(setBusTime);
        return () => cleanup();
    }, []);

    useEffect(() => {
        const newStops: string[][] = [];
        for (let i = 1; i <= 5; i++) {
            const stop = busTime[`stop${i}`];
            if (stop) {
                const stopTimes = getHour(stop, i);
                newStops.push(stopTimes);
            }
        }
        setStop(newStops);
    }, [busTime]);

    // Functions
    function getHour(stop: StopTimeProps, number: number): string[] {
        return [
            formatTime(stop),
            formatTime({ ...stop, minute: stop.minute + 2 }),
            formatTime({ ...stop, minute: stop.minute + 4 }),
            formatTime({ ...stop, minute: stop.minute + 6 }),
            formatTime({ ...stop, minute: stop.minute + 8 })
        ];
    }
    

    function getTime(number: number, arrival: number): string {
        const fechaActual = new Date();

        const stop = busTime[`stop${number}`];
        if (!busTime || !stop || typeof stop.minute === 'undefined') {
            return "Hora no disponible";;
        }

        // Get the hour
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();

        let restMinutes: number = stop.minute - minutos + arrival;
        let restSeconds: number = stop.second - segundos;

        if ( restSeconds < 0 ) {
            restMinutes -= 1
            restSeconds += 60
        }

        if (restMinutes < 0) {
            const elements = document.getElementsByClassName(`firstTime${number - 1}`);

            for (let i = 0; i < elements.length; i++) {
                (elements[i] as HTMLElement).style.display = 'none';
            }
        }

        if ( stop.minute == fechaActual.getMinutes() && stop.second == fechaActual.getSeconds()) {
            resetDisplayF(number)
        }


        const formattedSeconds = restSeconds.toString().padStart(2, '0');
    
        return `${restMinutes}:${formattedSeconds}`
    }

        function resetDisplayF(index: number) {
        for (let i = 0; i < 5; i++) {
            const elements = document.getElementsByClassName(`firstTime${i}`);
            for (let j = 0; j < elements.length; j++) {
                setTimeActive(index)
            }
        }
    }

    // Display arrive times
    function handleActivate(index: number) {
        setIsActive(index);
    }

    // HTML
    return (
        <div className={style.container} style={{ "--gradient-color1": `var(${color1})`, "--gradient-color2": color2 } as React.CSSProperties}>
            {/* City */}
            <p>Cubeland</p>

            {/* Buttons */}
            <div className={style.contentContainer}>
                <div className={style.buttonContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <SButton
                            isActive={isActive === index}
                            key={`client-${index}`}
                            index={index}
                            onClick={handleActivate}
                        />
                    ))}
                </div>

                {/* Prediction */}
                <section className={style.predictionContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <StopListComponent
                            isActive={isActive === index}
                            key={index}
                            stops={stops}
                            time={getTime}
                            number={index}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
}
