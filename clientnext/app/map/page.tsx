// Ui
import RouterOptionBar from "../ui/routeOptionBar/routeOptionBar"
import DotBackground from "../ui/dotBackground/DotBackground"

export default function Map() {
    return (
        <section>
            <RouterOptionBar color1="--main-color" color2="#049CC4"/>
            <DotBackground backgroundColor="--main-color"/>
        </section>
    )
}