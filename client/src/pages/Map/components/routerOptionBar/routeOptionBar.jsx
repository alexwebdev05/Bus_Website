import './style.scss'

function RouteOptionBar() {
    return (
        <div id="container">

            {/* City */}
            <section>
                <p className='title1'>City</p>
                <div id='mapButtons'>
                    <button className='maps'>CubeLand</button>|
                    <button className='maps'>OtroMas</button>
                </div>
            </section>
            <hr></hr>

            {/* Date */}
            <section>
                <p className='title1'>Date</p>
                <div id='date'><input type="date" /></div>
            </section>

            {/* Hour */}
            <section>
                <p className='title1'>Hour</p>
                <div id='hour'><input type="time" /></div>
            </section>
            <hr></hr>

            {/* Prediction */}
            <section id='predictionContainer'>
                <p className='title1'>Next 5 buses</p>
                <div id='prediction'></div>
            </section>

            {/* Payment */}
            <section id='payContainer'>
                <p className='title1'>PreMo</p>
                <button id='buy'>Buy</button>
            </section>

        </div>
    )
}

export default RouteOptionBar