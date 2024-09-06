"use client";

import StopListComponent from "./stopListComponent/StopListComponent"
import startHour from "./startHour"

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

interface BusTimeState {
    [key: string]: StopTimeProps | undefined;
}

const formatTime = ({hour, minute, second}: StopTimeProps) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}


// Principal function
export default function RouterOptionBar({color1, color2}: colorProps) {

    const [busTime, setBusTime] = useState<BusTimeState>({});
    const [stops, setStops] = useState<string[]>([]);

    // UseEffects
    useEffect(() => {
        const cleanup = startHour(setBusTime);
        return () => cleanup();
    }, []);

    useEffect(() => {
        const newStops: string[] = [];
        for (let i = 1; i <= 5; i++) {
          const stop = busTime[`stop${i}`];
          if (stop) {
            const stopTime = generateArrivalTime(stop);
            newStops.push(...stopTime);
          }
        }
        setStops(newStops);
      }, [busTime]);

    // Functions
    function generateArrivalTime(stop: StopTimeProps): string[] {
        return [
            formatTime(stop),
            formatTime({ ...stop, minute: stop.minute + 2 }),
            formatTime({ ...stop, minute: stop.minute + 4 }),
            formatTime({ ...stop, minute: stop.minute + 6 }),
            formatTime({ ...stop, minute: stop.minute + 8 })
        ];
    }

    function stopChanger(number: number) {

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

    function resetDisplayF() {
        for (let i = 0; i < 5; i++) {
            const elements = document.getElementsByClassName(`firstTime${i}`);
            for (let i = 0; i < elements.length; i++) {
                (elements[i] as HTMLElement).style.display = 'flex';
            }
        }
        
    }

    function getHour(number: number, arrival: number): string {
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
            restMinutes += 2;
        }

        if ( stop.minute == fechaActual.getMinutes() && stop.second == fechaActual.getSeconds()) {
            resetDisplayF()
        }


        const formattedSeconds = restSeconds.toString().padStart(2, '0');
    
        return `${restMinutes}:${formattedSeconds}`
    }

    // Button style
    function colorBlue(button: number) {
        // for (let i = 1; i <= 5; i++) {
        //     const actualButton = document.getElementsByClassName(`button${i}`);
        //     const actualButtonHtml = actualButton[0] as HTMLElement;

        //     if (actualButtonHtml instanceof HTMLElement) {
        //         const actualButtonComputed = window.getComputedStyle(actualButtonHtml).color;
        //         if (actualButton) {
        //             if (actualButtonComputed === 'rgb(255, 255, 255)') {
        //                 actualButtonHtml.style.backgroundColor = 'white';
        //                 actualButtonHtml.style.border = '2px solid rgba(165, 165, 165, 0.5)';
        //                 actualButtonHtml.style.color = 'black';
        //             }
        //         }
        //     }
        // }
    
        // const Button = document.getElementsByClassName(`button${button}`);
        // const ButtonHtml = Button[0] as HTMLElement;
        // if (Button) {
        //     if (window.getComputedStyle(ButtonHtml).color !== 'rgb(255, 255, 255)') {
        //         ButtonHtml.style.backgroundColor = 'rgba(48, 78, 255, 1)';
        //         ButtonHtml.style.border = '2px solid rgba(48, 78, 255, 1)';
        //         ButtonHtml.style.color = 'white';
        //     }
        // }

        

        for ( let i = 0; i <= 5; i++ ) {
            const elements = document.getElementsByClassName(`button${i}`)[0] as HTMLElement;

            if (elements) {
                const color = window.getComputedStyle(elements).color;
                if (color === 'rgb(255, 255, 255)') {
                    elements.style.backgroundColor = 'white';
                    elements.style.border = '2px solid rgba(165, 165, 165, 0.5)';
                    elements.style.color = 'black';
                }
            }

            const changedElement = document.getElementsByClassName(`button${button}`)[0] as HTMLElement

            console.log(document.getElementsByClassName(`button${button}`))

            if (changedElement) {
                changedElement.style.backgroundColor = 'white';
                changedElement.style.border = '2px solid rgba(165, 165, 165, 0.5)';
                changedElement.style.color = 'black';
            }
        }

    }

    // HTML
    return (
        <div className={style.container} style={{"--gradient-color1": `var(${color1})`, "--gradient-color2": color2} as React.CSSProperties }>
            {/* City */}
            <p>Cubeland</p>

            {/* Buttons */}
            <div className={style.contentContainer}>
                <div className={style.buttonContainer}>
                    <button className={`${style.stopButton} ${style.button1}`} onClick={() => {stopChanger(1), colorBlue(1)}}>Parada 1</button>
                    <button className={`${style.stopButton} ${style.button2}`} onClick={() => {stopChanger(2), colorBlue(2)}}>Parada 2</button>
                    <button className={`${style.stopButton} ${style.button3}`} onClick={() => {stopChanger(3), colorBlue(3)}}>Parada 3</button>
                    <button className={`${style.stopButton} ${style.button4}`} onClick={() => {stopChanger(4), colorBlue(4)}}>Parada 4</button>
                    <button className={`${style.stopButton} ${style.button5}`} onClick={() => {stopChanger(5), colorBlue(5)}}>Parada 5</button>
                </div>
                

                {/* Prediction */}
                <section className={style.predictionContainer}>

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