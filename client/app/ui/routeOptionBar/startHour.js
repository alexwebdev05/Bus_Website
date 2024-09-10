export default function startHour(setBusTime) {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('[Client] Connected to WebSocket');
    };

    ws.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);

            if (message.type === 'busState' && message.data.startTime) {

                setBusTime(message.data.startTime)

            }
        } catch (error) {
            // console.error('Error parsing JSON:', error);
            // console.error('Message that caused the error:', event.data);
        }
    };

    ws.onclose = () => {
        console.log('[Client] WebSocket connection closed');
    };

    ws.onerror = (error) => {
        // console.error('[Client] WebSocket error:', error);
    };

    return () => {
        ws.close();
    };
}
