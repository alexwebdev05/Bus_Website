import * as THREE from "three";
import WebSocket from "ws";
import { wayCubeLand } from "./getPosition/cubeLand/wayCubeland";
import dotenv from "dotenv";

dotenv.config();

interface timeProps {
    hour: number;
    minute: number;
    second: number;
}

// http request manager
export function handlerWebsocket(ws: WebSocket) {
    console.log("[Client] New connection");
    const busState = {
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
    };

    // Update position and quaternion
    function updatePointAndTangent(percentage: number) {
        const point = wayCubeLand().getPointAt(percentage);
        const tangent = wayCubeLand().getTangentAt(percentage);

        if (point && tangent) {
            busState.position.set(point.x, point.y, point.z);

            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

            busState.quaternion.copy(quaternion);

            ws.send(JSON.stringify({
                name: "position",
                data: {
                    position: {
                        x: busState.position.x,
                        y: busState.position.y,
                        z: busState.position.z
                    },
                    quaternion: {
                        x: busState.quaternion.x,
                        y: busState.quaternion.y,
                        z: busState.quaternion.z,
                        w: busState.quaternion.w
                    }
                }
            }));
        } else {
            console.log(`Invalid data at percentage: ${percentage}`);
        }
    }

    // Client message manager
    ws.on("message", (message: WebSocket.RawData) => {
        const messageString = message.toString();

        // Position request
        if (messageString === "getPositionCubeLand") {
            const positionWs = new WebSocket(`ws://localhost:${process.env.PORT_PERCENTAGE}`);

            positionWs.onmessage = (event) => {
                try {
                    const dataString = typeof event.data === "string" ? event.data : event.data.toString();
                    const message = JSON.parse(dataString);
                    updatePointAndTangent(message.percentage);
                } catch (error) {
                    console.error("Error parsing JSON message from secondary WebSocket:", error);
                }

            };

        // Times request
        } else if (messageString === "getTimesCubeLand") {

            function getEndTimes() {
                const timeWs = new WebSocket(`ws://localhost:${process.env.PORT_TIMER}`);
                timeWs.onmessage = (event) => {
                    try {
                        const dataString = typeof event.data === "string" ? event.data : event.data.toString();
                        const message = JSON.parse(dataString);
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
                                minute: endTimeDate.getMinutes() - 2,
                                second: endTimeDate.getSeconds() + 29
                            }),
                            stop3: adjustTime({
                                hour: endTimeDate.getHours(),
                                minute: endTimeDate.getMinutes() - 2,
                                second: endTimeDate.getSeconds() + 56
                            }),
                            stop4: adjustTime({
                                hour: endTimeDate.getHours(),
                                minute: endTimeDate.getMinutes() - 1,
                                second: endTimeDate.getSeconds() + 11
                            }),
                            stop5: adjustTime({
                                hour: endTimeDate.getHours(),
                                minute: endTimeDate.getMinutes() - 1,
                                second: endTimeDate.getSeconds() + 32
                            })
                        };
                        // console.log(endTime);
                        ws.send(JSON.stringify(
                            endTime
                        ));
                    } catch (error) {
                        console.error("Error parsing JSON message from secondary WebSocket:", error);
                    }
                };


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
            getEndTimes();

        // Invalid message
        } else {
            console.log(`Invalid message ${messageString}`);
        }
    });

    ws.on("close", () => {
        console.log("WebSocket closed");
    });
}
