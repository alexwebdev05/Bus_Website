export function timeGetter() {

    const ws = new WebSocket("ws://localhost:3010");
    ws.onopen = () => {
        ws.send("getTimesCubeLand");
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "busTimes") {
            console.log(message);
            return message;
        }
    };

}
