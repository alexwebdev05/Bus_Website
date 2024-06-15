function busStop(actualMin, actualSec, moveingInterval, second, busMovement) {
    if ( actualMin % 2 === 0 && actualSec == second ) {
        console.log('autobus parado')
        clearInterval(moveingInterval)
        setTimeout(() => {
            moveingInterval = setInterval(busMovement, 10);
        }, 5000)
    }
}

module.exports = {
    busStop
}