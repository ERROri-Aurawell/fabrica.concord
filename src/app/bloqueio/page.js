import styles from "./bloqueio.module.css"
import Image from "next/image"
import Link from "next/link"

export default function bloqueio() {
    return(
        <selection className={styles.fundo}>
            <section className={styles.comeco}>

                <div className={styles.inicio}>
                    <h1 className={styles.titulo}>
                        Bloquear contato e apagar conversa
                    </h1>
                </div>
                

                <div>
                    <p className={styles.texto}>
                        As últimas mensagems recebidas serão encaminhadas para a equipe Concord. O contato não será notificado.
                    </p>
                </div>

                <div className={styles.botoes}>

                    <Link className={styles.lc} href="./contatos"><input type="submit" className={styles.bc} value="Cancelar"/></Link>

                    <Link className={styles.ld} href="./"><input type="submit" className={styles.bd} value="Denunciar"/></Link>
                    
                </div>

            </section>
        </selection>
        
    )
}