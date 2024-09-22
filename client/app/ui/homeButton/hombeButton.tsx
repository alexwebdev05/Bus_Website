import Link from "next/link";
import style from "./style.module.css";

interface buttonProps {
    text: string;
    url: string;
    backgroundColor: string;
}

export default function HomeButton({text,url, backgroundColor}: buttonProps) {
    return (
        <Link
            className={style.container}
            href={url}
            style={{"--main": `var(${backgroundColor})`} as React.CSSProperties}
        >
            {text}
        </Link>
    );
}
