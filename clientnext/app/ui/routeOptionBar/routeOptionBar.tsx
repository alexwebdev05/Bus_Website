"use client";

import SButton from "./stopButton/sButton"
import StopListComponent from "./stopListComponent/StopListComponent"
import startHour from "./startHour"

import { useEffect, useState, useRef } from "react";

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

    const [isActive, setIsActive] = useState<number>(0);
    const [busTime, setBusTime] = useState<BusTimeState>({});
    const [stops, setStop] = useState<string[]>([]);

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
        setStop(newStops);
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

    // Display arrive times
    function handleActivate(index: number) {
        setIsActive(index);
    }

    // Button style
    // function colorBlue(button: number) {
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

        

    //     for ( let i = 0; i <= 5; i++ ) {
    //         const buttonRef = useRef<HTMLButtonElement>(null);
    //         const elements = document.getElementsByClassName(`style.button${i}`)[0] as HTMLElement;

    //         if (elements) {
    //             const color = window.getComputedStyle(elements).color;
    //             if (color === 'rgb(255, 255, 255)') {
    //                 elements.style.backgroundColor = 'white';
    //                 elements.style.border = '2px solid rgba(165, 165, 165, 0.5)';
    //                 elements.style.color = 'black';
    //             }
    //         }

    //         const changedElement = document.getElementsByClassName(`style.button${button}`);
    //         let elementHTML = changedElement[0] as HTMLElement

    //         console.log(buttonRef.current)

    //         if (buttonRef.current) {
    //             console.log('color')
    //             buttonRef.current.style.backgroundColor = 'blue';
    //             buttonRef.current.style.border = '2px solid rgba(165, 165, 165, 0.5)';
    //             buttonRef.current.style.color = 'black';
    //         } else {
    //             console.log('elementHTML don not found: ')
    //         }
    //     }

    // }

    // HTML
    return (
        <div className={style.container} style={{"--gradient-color1": `var(${color1})`, "--gradient-color2": color2} as React.CSSProperties }>
            {/* City */}
            <p>Cubeland</p>

            {/* Buttons */}
            <div className={style.contentContainer}>
                <div className={style.buttonContainer}>

                    {Array.from({ length: 5  }, (_, index) => (
                    <SButton
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
                        hour={getHour}
                        number={index}
                    />                
                    ))}
                </section>
            </div>

            
        </div>
    );
}