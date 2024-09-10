import * as THREE from "three"

// Config
let time = 120 // Seconds

export function positionSetter(position: THREE.Object3D) {

    let startTime = new Date().getTime()
    let actualTime: number;
    let endTime = startTime + time * 1000

    function timeCountdown() {
        console.log(endTime - startTime)

        let countdown = time * 1000 - (actualTime - startTime)

        if ( countdown <= 0 ) {
            startTime = new Date().getTime()
        } else {
            return
        }

        timeCountdown()

        
    }

    for (let i = 0; i == 0;) {
        actualTime = new Date().getTime()
        timeCountdown(actualTime)
    }
}