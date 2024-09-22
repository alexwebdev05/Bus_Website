function startHour(setBusTime) {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
        console.log("[Client] Connected to WebSocket");
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "busState" && message.data.startTime) {
            setBusTime(message.data.startTime);
        }
    };

    ws.onclose = () => {
        console.log("[Client] WebSocket connection closed");
    };

    // ws.onerror = (error) => {
    //     console.error("[Client] WebSocket error:", error);
    // };

    return () => {
        ws.close();
    };
}

export default startHour;


// const ws = new WebSocket("ws://localhost:3010");
// ws.onopen = () => {
//     ws.send("getTimesCubeLand");
// };

// ws.onmessage = (event) => {
//     const message = JSON.parse(event.data);

//     if (message.type === "busTimes") {
//         console.log(message);
//         return message;
//     }
// };
