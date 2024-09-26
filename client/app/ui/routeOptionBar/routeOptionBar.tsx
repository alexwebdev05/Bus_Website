"use client";

import SButton from "./stopButton/sButton";
import Time from "./stopListComponent/time";

import { useState } from "react";

import style from "./style.module.css";

// Interfaces
interface colorProps {
    color1: string;
    color2: string;
}

let actualStop = 1;

// Principal function
export default function RouterOptionBar({ color1, color2 }: colorProps) {
    const [isActive, setIsActive] = useState<number>(0);

    // Display arrive times
    function handleActivate(index: number) {
        setIsActive(index);
        actualStop = index + 1;
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
                    <Time number={actualStop} />
                </section>

            </div>
        </div>
    );
}
