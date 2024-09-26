import WebSocket from "ws";
import dotenv from "dotenv";

dotenv.config();

interface timeProps {
    hour: number;
    minute: number;
    second: number;
}

export function getEndTimes() {
    const timeWs = new WebSocket(`ws://localhost:${process.env.PORT_TIMER}`);
    timeWs.onmessage = (event) => {
        try {
            const dataString = typeof event.data === "string" ? event.data : event.data.toString();
            const message = JSON.parse(dataString);
            // console.log(message);
            const endTimeDate = new Date(message.endTime);

            const endTime = {
                type: "busTimes",
                stop1: adjustTime({
                    hour: endTimeDate.getHours(),
                    minute: endTimeDate.getMinutes(),
                    second: endTimeDate.getSeconds()
                }),
                stop2: adjustTime({
                    hour: endTimeDate.getHours(),
                    minute: endTimeDate.getMinutes(),
                    second: endTimeDate.getSeconds() + 29
                }),
                stop3: adjustTime({
                    hour: endTimeDate.getHours(),
                    minute: endTimeDate.getMinutes(),
                    second: endTimeDate.getSeconds() + 56
                }),
                stop4: adjustTime({
                    hour: endTimeDate.getHours(),
                    minute: endTimeDate.getMinutes() + 1,
                    second: endTimeDate.getSeconds() + 11
                }),
                stop5: adjustTime({
                    hour: endTimeDate.getHours(),
                    minute: endTimeDate.getMinutes() + 1,
                    second: endTimeDate.getSeconds() + 32
                })
            };
            // console.log(endTime);
            return endTime;
        } catch (error) {
            console.error("Error parsing JSON message from secondary WebSocket:", error);
        }

    };

    // const startTime = new Date();

    function adjustTime({hour, minute, second}: timeProps) {

        // Adjust seconds
        if (second >= 60) {
            const extraMinutes = Math.floor(second / 60);
            second = second % 60;
            minute += extraMinutes;
        }

        // Ajust minutes
        if (minute >= 60) {
            const extraHours = Math.floor(minute / 60);
            minute = minute % 60;
            hour += extraHours;
        }

        return { hour, minute, second };
    }
}
