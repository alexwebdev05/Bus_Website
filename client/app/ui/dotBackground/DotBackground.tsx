import styles from "./style.module.css"

interface colorProps {
    backgroundColor: string;
}

export default function DotBackground ({backgroundColor}: colorProps) {
    return (
        <section className={styles.background} style={{"--background-color1": `var(${backgroundColor})`} as React.CSSProperties}>
            <div  className={styles.dots}></div>
        </section>
    )
}