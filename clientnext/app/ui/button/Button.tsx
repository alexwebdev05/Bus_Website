import Link from "next/link";
import style from "./style.module.css";

interface ButtonProps {
    url: string;
    text: string;
    backgroundColor: string;   
}

export default function Button({url, text, backgroundColor}: ButtonProps) {
    return (
        <Link
            className={style.button} style={{'--background-color': `var(${backgroundColor})`} as React.CSSProperties }
            href={url}
        >
            {text}
        </Link>
    )
}