import WebSocket from "ws";
import { cubeLandPosition } from "./getPosition/cubeLand/index";

export function handlerWebsocket(ws: WebSocket, percentage: any) {
    console.log("[Client] New connection");

    // Get message
    ws.on('message', (message: WebSocket.RawData) => {
        const messageString = message.toString();
        console.log(percentage)
        // Send Position
        if (messageString === "getPositionCubeLand") {
            const position = cubeLandPosition()
            //console.log(position)
            ws.send(JSON.stringify({
                type: "Type",
                data: {
                    x:  "x",
                    y:  "y",
                    z:  "z"
                }
            }));
        } else {
            console.log(`Invalid message ${messageString}`);
        }
    });
}

//import { positionSetter } from "./getPosition/cubeLand/positionSetter";

// const percentage = positionSetter();
// console.log(percentage);

// export function handleWebSocket(request: Request): Response {

//     const [client, server] = Object.values(new WebSocketPair());

//     // Accept connection
//     server.accept();
//     console.log("[Client] New connection")

//     server.addEventListener("message", (event) => {
//         const message = event.data
//         console.log("[Client] Message: ", message)

//         // Send position
//         if (message === "getPositionCubeLand") {
//             const position = cubeLandPosition()
//             server.send(JSON.stringify({
//                 type: position.type,
//                 data: {
//                     x:  position.data.x,
//                     y:  position.data.y,
//                     z:  position.data.z
//                 }
//             }));
//         // Send hour
//         } else if ( message === "getTimes" ) {
//             server.send(JSON.stringify({
//                 type: "times",
//                 data: {
//                     soon: "Available soon"
//                 }
//             }));
//         // Over parametres request
//         } else {
//             server.send("Invalid request");
//         }
//     });

//     // Client disconnected
//     server.addEventListener("close", (event) => {
//         console.log("[Client] Disconnected", event.code, event.reason);
//     });

//     // Error report
//     server.addEventListener("error", (event) => {
//         console.error("Error en WebSocket:", event.error);
//     });

//     return new Response(null, { status: 101, webSocket: client });
// }