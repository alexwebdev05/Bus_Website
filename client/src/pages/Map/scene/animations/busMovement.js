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
                // console.error('Error parsing JSON:', error);
                // console.error('Mensaje que causó el error:', event.data);
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
// Usa la API WebSocket nativa del navegador
// export function busMovement(bus) {
    
//     const ws = new WebSocket('ws://localhost:8080/ws');

//     // Maneja la apertura de la conexión
//     ws.addEventListener('open', () => {
//         console.log('[Client] Connected to websocket.');
//         ws.send('Client is getting bus position.');
//     });

//     // Maneja la recepción de mensajes
//     ws.addEventListener('message', async (event) => {
//         try {
//             const message = JSON.parse(event.data);
//             console.log(event.data)
//            if (message.type === 'busState') {
//                const position = message.data.position;
//                 const quaternion = message.data.quaternion;
                
//                bus.position.set(position[0], position[1], position[2]);
//                bus.quaternion.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
//            }
//        } catch (error) {
//            console.log('Error parsing JSON:', error);
//        }
//    });

//     // Maneja el cierre de la conexión
//     ws.addEventListener('close', () => {
//         console.log('[Client] Connection closed.');
//     });

//     // Maneja los errores
//     ws.addEventListener('error', (err) => {
//         console.log('[Client] WebSocket error:', err);
//     });
// }

// import Html5Websocket from 'html5-websocket';
// import ReconnectingWebSocket from 'reconnecting-websocket';

// export function busMovement(bus) {
//     const host = 'localhost';
//     const port = '8080';
//     const options = { constructor: Html5Websocket };
//     const rec_ws = new ReconnectingWebSocket(`ws://${host}:${port}/ws`, undefined, options);
//     rec_ws.timeout = 1000;

//     rec_ws.addEventListener('open', () => {
//         console.log('[Client] Connected to websocket.');
//         rec_ws.send('Client is getting bus position.');
//     });

//     rec_ws.addEventListener('message', (event) => {
//         try {
//             console.log('Received message:', event.data); // Asegúrate de ver el contenido recibido
//             const message = JSON.parse(event.data);

//             if (message.type === 'busState') {
//                 const position = message.data.position;
//                 const quaternion = message.data.quaternion;
//                 bus.position.set(position[0], position[1], position[2]);
//                 bus.quaternion.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3]);
//                 console.log(message.type)
//             }
//         } catch (error) {
//             console.error('Error parsing JSON:', error);
//             console.error('Mensaje que causó el error:', event.data);
//         }
//     });

//     rec_ws.addEventListener('close', () => {
//         console.log('[Client] Connection closed.');
//     });

//     rec_ws.onerror = (err) => {
//         console.error('[Client] WebSocket error:', err);
//         if (err.code === 'EHOSTDOWN') {
//             console.log('[Client] Error: Server is down.');
//         }
//     };
// }
