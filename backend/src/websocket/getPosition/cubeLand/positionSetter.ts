// Config
let time = 120 // Seconds

let percentage: number;

export function positionSetter() {

    // Clock config
    const time = 120 // Seconds
    const startTime = new Date().getTime()
    const stopTime = startTime + time * 1000

    // Update actual time
    for (let i = 0; i == 0; i = 0) {
        let countdown = clock();
        console.log(countdown)
    }

    // Calculate percentage
    function clock() {
        let actualTime = new Date().getTime()
        let leftover = stopTime - actualTime

        percentage = (100000 - leftover / 120 * 100) / 1000
        // console.log(percentage)
        return percentage
        
    }
    
}