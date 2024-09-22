interface timeProps {
    hour: number;
    minute: number;
    second: number;
}

export function getTime() {

    const startTime = new Date();

    function adjustTime({hour, minute, second}: timeProps) {

        // Adjust seconds
        if (second >= 60) {
            const extraMinutes = Math.floor(second / 60);
            second = second % 60;
            minute += extraMinutes;
        }

        // Ajust minutes
        if (minute >= 60) {
            const extraHours = Math.floor(minute / 60);
            minute = minute % 60;
            hour += extraHours;
        }

        return { hour, minute, second };
    }

    const hour = {
        type: "busTimes",
        stop1: adjustTime({
            hour: startTime.getHours(),
            minute: startTime.getMinutes(),
            second: startTime.getSeconds()
        }),
        stop2: adjustTime({
            hour: startTime.getHours(),
            minute: startTime.getMinutes(),
            second: startTime.getSeconds() + 29}),
        stop3: adjustTime({
            hour: startTime.getHours(),
            minute: startTime.getMinutes(),
            second: startTime.getSeconds() + 56}),
        stop4: adjustTime({
            hour: startTime.getHours(),
            minute: startTime.getMinutes() + 1,
            second: startTime.getSeconds() + 11}),
        stop5: adjustTime({
            hour: startTime.getHours(),
            minute: startTime.getMinutes() + 1,
            second: startTime.getSeconds() + 32})
    };

    return hour;
}
