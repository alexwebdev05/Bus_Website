"use client";
import { useEffect, useState } from "react";
import style from "./style.module.css";

const lapTime = 2; // Time of the route

interface indexProps {
    number: number;
}

export default function Time({ number }: indexProps) {
    const [time, setTime] = useState<string[] | null>(null);
    const [countdown, setCountdown] = useState<string[] | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3010");

        // Send message every 0.1 second
        ws.onopen = () => {
            setInterval(() => {
                ws.send("getTimesCubeLand");
            }, 100);
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "busTimes") {
                const { hour, minute, second } = message[`stop${number}`];

                // Tops times formatter
                const formattedTime = [
                    `${hour}:${minute}:${second}`,
                    `${hour}:${(minute + lapTime)}:${second}`,
                    `${hour}:${minute + lapTime * 2}:${second}`,
                    `${hour}:${minute + lapTime * 3}:${second}`,
                    `${hour}:${minute + lapTime * 4}:${second}`,
                ];
                setTime(formattedTime);

                const updateCountdown = () => {
                    const now = new Date();

                    const formattedCountdown = formattedTime.map((t) => {
                        const [busHour, busMinute, busSecond] = t.split(":").map(Number);
                        const busTime = new Date();
                        busTime.setHours(busHour, busMinute, busSecond);

                        const remainingTime = Math.floor((busTime.getTime() - now.getTime()) / 1000);

                        const remainingMinutes = Math.floor(remainingTime / 60);
                        let remainingSeconds = remainingTime % 60;

                        if (remainingSeconds < 0) {
                            remainingSeconds += 60;
                        }

                        // Give format to the time
                        return `${remainingMinutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
                    });

                    setCountdown(formattedCountdown);
                };

                updateCountdown();
                setInterval(updateCountdown, 100);
            }
        };

        return () => {
            ws.close();
        };
    }, [number]);

    return (
        <section className={style.flex}>
            {/* Arrival hours */}
            <div className={style.margin}>
                {time ? time.map((t, index) => <div key={index}>{t}</div>) : "Cargando..."}
            </div>

            {/* Arrival countdowns */}
            <div className={style.margin}>
                {countdown ? countdown.map((t, index) => <div key={index}>{t}</div>) : "Cargando..."}
            </div>
        </section>
    );
}
