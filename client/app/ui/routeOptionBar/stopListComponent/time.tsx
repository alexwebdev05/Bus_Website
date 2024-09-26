import { useEffect, useState } from "react";
import style from "./style.module.css";

const lapTime = 2; // Time of the route

interface indexProps {
  number: number;
}

export default function Time({ number }: indexProps) {
    // The five stops times
    const [time, setTime] = useState<string[] | null>(null);

    // The countdown to know when the bus will arrive
    const [countdown, setCountdown] = useState<string[] | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3010");
        let countdownInterval: NodeJS.Timeout | null = null;

        // Sends the message every 0.1 seconds
        ws.onopen = () => {
            setInterval(() => {
                ws.send("getTimesCubeLand");
            }, 100);
        };

        // Data manager
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            if (message.type === "busTimes") {
                const { hour, minute, second } = message[`stop${number}`];

                // Manage the times to display 5 stops
                const formattedTime = [
                    `${hour}:${minute}:${second}`,
                    `${hour}:${minute + lapTime}:${second}`,
                    `${hour}:${minute + lapTime * 2}:${second}`,
                    `${hour}:${minute + lapTime * 3}:${second}`,
                    `${hour}:${minute + lapTime * 4}:${second}`,
                ];

                setTime(formattedTime);

                // Clear every interval before creating a new one
                if (countdownInterval) {
                    clearInterval(countdownInterval);
                }

                // Countdown updater
                const updateCountdown = () => {
                    const now = new Date();

                    const formattedCountdown = formattedTime
                        .map((t) => {
                            const [busHour, busMinute, busSecond] = t.split(":").map(Number);
                            const busTime = new Date();
                            busTime.setHours(busHour, busMinute, busSecond);

                            // Remaining seconds
                            const remainingTime = Math.floor(
                                (busTime.getTime() - now.getTime()) / 1000
                            );

                            // Remaining minutes
                            const remainingMinutes = Math.floor(remainingTime / 60);
                            const remainingSeconds = remainingTime % 60;

                            // Filter out negative times
                            if (remainingMinutes < 0 || remainingSeconds < 0) {
                                return null; // Exclude negative times
                            }

                            // Format the remaining time in minutes and seconds
                            return `${remainingMinutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
                        })
                        .filter((t) => t !== null);

                    setCountdown(formattedCountdown as string[]);
                };

                updateCountdown();

                // Update the countdown every second
                countdownInterval = setInterval(updateCountdown, 1000);
            }
        };

        // Clear any active interval related to the websocket
        return () => {
            ws.close();
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        };
    }, [number]);

    return (
        <section>
            <h2>Next arrivals</h2>

            <div className={style.contentContainer}>
                {/* Five arrivals */}
                <div className={style.margin}>
                    {time && countdown
                        ? time.map((t, index) => {
                            // Past times filter
                            if (countdown[index]) {
                                return <div key={index}>{t}</div>;
                            }
                            return null;
                        })
                        : "Cargando..."}
                </div>

                {/* Countdowns */}
                <div className={style.margin}>
                    {countdown
                        ? countdown.map((t, index) => {
                        // Past times filter
                            if (time && time[index]) {
                                return <div key={index}>{t}</div>;
                            }
                            return null;
                        })
                        : "Cargando..."}
                </div>
            </div>
        </section>
    );
}
