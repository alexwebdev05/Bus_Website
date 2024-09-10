import style from "./style.module.css"

interface footerProps {
    footerColor: string;
}

export default function Footer({footerColor}: footerProps) {
    return (
        <div className={style.footerContainer} style={{'--footer-color': `var(${footerColor})`} as React.CSSProperties}>Footer</div>
    )
}