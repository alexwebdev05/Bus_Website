import style from "./style.module.css";

interface timesProps {
    stops: string[][];
    time: (number: number, arrival: number) => string;
    number: number;
    isActive: boolean;
    timeActive?: boolean;
}

export default function StopListComponent({ stops, time, number, isActive, timeActive }: timesProps) {

    const currentStopTimes = stops[number] || [];


    const firstTimeValue = currentStopTimes[0] ? time(number + 1, 0) : "";
    const isFirstTimeVisible = parseFloat(firstTimeValue) >= 0;

    return (
        <div className={`${style.container} ${isActive ? style.active : style.inactive}`}>
            <h2>Next arrivals</h2>
            <section className={style.timesContainer}>
                <div className={style.awaitTime}>
                    <p>Hour</p>
                    {currentStopTimes.length === 0 ? (
                        <>
                            <p className={`firstTime${number}`}>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                        </>
                    ) : (
                        <>
                            {currentStopTimes.map((time, index) => {
                                const timeValue = time;
                                return (index === 0 ? isFirstTimeVisible : true) && <p key={index}>{timeValue}</p>;
                            })}
                        </>
                    )}
                </div>
                <div className={style.awaitTime}>
                    <p>Time</p>
                    {currentStopTimes.length === 0 ? (
                        <>
                            <p style={{ display: timeActive ? "block" : "none" }}>
                                Waiting for start time...
                            </p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                            <p>Waiting for start time...</p>
                        </>
                    ) : (
                        <>
                            {currentStopTimes.map((_, index) => {
                                const timeValue = time(number + 1, index * 2);
                                const timeNumber = parseFloat(timeValue);
                                return (index === 0 ? isFirstTimeVisible : timeNumber >= 0) ? <p key={index}>{timeValue}</p> : null;
                            })}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
