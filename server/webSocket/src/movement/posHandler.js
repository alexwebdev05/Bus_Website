const THREE = require('three');

const { wayCubeLand } = require('../objects/wayCubeLand');
const { createScene } = require('../scene/createScene');

const scene = createScene();
const curve = wayCubeLand(scene);

const tripTime = 2;
const tripTimeMil = tripTime * 60000;
let moveInterval;

function busMovement(busState, broadcastBusState) {
    
    let startTime = new Date();
    let endTime = new Date(startTime.getTime() + tripTimeMil);
    let percentage = 0;

    function adjustTime(hour, minute, second) {
        // Ajustar los segundos
        if (second >= 60) {
            let extraMinutes = Math.floor(second / 60);
            second = second % 60;
            minute += extraMinutes;
        }
        
        // Ajustar los minutos
        if (minute >= 60) {
            let extraHours = Math.floor(minute / 60);
            minute = minute % 60;
            hour += extraHours;
        }
    
        return { hour, minute, second };
    }

    let hour = {
        stop1: adjustTime(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds()),
        stop2: adjustTime(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds() + 29),
        stop3: adjustTime(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds() + 56),
        stop4: adjustTime(startTime.getHours(), startTime.getMinutes() + 1, startTime.getSeconds() + 11),
        stop5: adjustTime(startTime.getHours(), startTime.getMinutes() + 1, startTime.getSeconds() + 32)
    };
    
    // Update bus position
    function updateBusPosition() {

        let actualTime = Date.now();

        if ( actualTime >= endTime ) {
            clearInterval(moveInterval);
            busMovement(busState, broadcastBusState);
            return;
        } else {

            let spaceTime = actualTime - startTime;
            percentage = spaceTime / tripTimeMil;

        }

        // Send position
        const point = curve.getPointAt(percentage);
        const tangent = curve.getTangentAt(percentage);

        if (point && tangent) {
            busState.position.set(point.x, point.y, point.z);

            const quaternion = new THREE.Quaternion();
            quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

            busState.quaternion.copy(quaternion);
        } else {
            time = 0;
        }

        
    broadcastBusState(hour);   
    }
    moveInterval = setInterval(updateBusPosition, 10);
}

module.exports = {
    busMovement
}