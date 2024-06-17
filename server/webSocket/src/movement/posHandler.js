const THREE = require('three');

const { wayCubeLand } = require('../objects/wayCubeLand');
const { createScene } = require('../scene/createScene');

// Scene


// Curve


let time = 0;
let moveingInterval;

function busMovement(busState, broadcastBusState) {
    const scene = createScene();
    const curve = wayCubeLand(scene);

    // Update bus position
    function updateBusPosition() {
        // Time
        let actualDate = new Date();
        let actualMin = actualDate.getMinutes();
        let actualSec = actualDate.getSeconds();
        let actualMil = actualDate.getMilliseconds();

        // Speed
        time += 0.01;
        const t = (time % 97) / 97;

        if (( actualMin % 2 == 0 && actualSec == 24 && actualMil >= 500  ) ||
            ( actualMin % 2 == 0 && actualSec == 52 ) ||
            ( actualMin % 2 == 1 && actualSec == 26 && actualMil >= 100 ) ||
            ( actualMin % 2 == 1 && actualSec == 53 )) {
            console.log('autobus parado');
            clearInterval(moveingInterval);
            setTimeout(() => {
                moveingInterval = setInterval(updateBusPosition, 10);
            }, 5000)
        }

        if ( actualMin % 2 == 0 && actualSec <= 1 && actualMil < 4 ) {
                clearInterval(moveingInterval);
                time = 0;
                moveingInterval = setInterval(updateBusPosition, 10);
        }

        // Send position
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t);

        if (point && tangent) {
            busState.position.set(point.x, point.y, point.z);

            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

            busState.quaternion.copy(quaternion);
        } else {
            time = 0;
        }
    broadcastBusState();   
    }
    moveingInterval = setInterval(updateBusPosition, 10);
}

module.exports = {
    busMovement
}