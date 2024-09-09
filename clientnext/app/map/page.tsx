import style from "./style.module.css"

// Ui
import RouterOptionBar from "../ui/routeOptionBar/routeOptionBar"
import CubeLand from "../ui/cubeLand/cubeLand"
import HomeButton from "../ui/homeButton/hombeButton"
import DotBackground from "../ui/dotBackground/DotBackground"

export default function Map() {
    return (
        <section className={style.container}>
            <HomeButton text="Home" url="/" backgroundColor="--main-color" />
            <RouterOptionBar color1="--main-color" color2="#049CC4"/>
            <CubeLand />
            <DotBackground backgroundColor="--main-color"/>
        </section>
    )
}