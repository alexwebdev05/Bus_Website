import Html5Websocket from 'html5-websocket';
import ReconnectingWebSocket from 'reconnecting-websocket';

export function busMovement(bus) {

    let host = 'localhost'
    let port = '8080'
    const options = { constructor: Html5Websocket }
    const rec_ws = new ReconnectingWebSocket('ws://' + host + ':' + port + '/ws', undefined, options);
    rec_ws.timeout = 1000;

    function animate() {

        // Websocket
        rec_ws.addEventListener('open', () => {
            console.log('[Client] Connected to websocket.')
            rec_ws.send('Client is getting bus position.')
        })

        rec_ws.addEventListener('message', (event) => {
            try {
                const message = JSON.parse(event.data);
                
                if (message.type === 'busState') {
                const position = message.data.position;
                const quaternion = message.data.quaternion;
                
                bus.position.set(position[0], position[1], position[2]);
                bus.quaternion.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                console.error('Mensaje que causó el error:', event.data);
            }
        })

        rec_ws.addEventListener('close', () => {
            console.log('[Client] Connection closed.')
        })

        rec_ws.onerror = (err) => {
            if ( err.code == 'EHOSTDOWN' ) {
            console.log('[Client] Error: Server is down.')
            }
        }
    }
    animate()
}