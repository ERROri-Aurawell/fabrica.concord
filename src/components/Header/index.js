import styles from "./Header.module.css"
import Image from "next/image"
export default function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.titulo}>

                <div className={styles.dImg}>
                    <Image src="/images/Rectangle 15.png" alt="logo" width={85} height={70}/>
                </div>

                <div className={styles.dConcord}>
                    <h1>Con<span className={styles.span}>cord</span></h1>
                    <p className={styles.paragráfo}>Chat online</p>
                </div>

            </div>

            <div className={styles.dVoltar}>
                <a href="./"> <Image id="img2" src="/images/Vector.png" alt="voltar" width={40} height={40}/></a>
            </div>
        </header>
    )
}