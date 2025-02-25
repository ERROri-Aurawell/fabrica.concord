import styles from "./login.module.css"
import Image from "next/image"
import Link from "next/link"

export default function login() {
    return(
        <section className={styles.main}>
            <div className={styles.dFundo}>

                <div className={styles.section}>
                    <div>
                        <form className={styles.form} action="/submit" method="post">

                        <label className={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label className={styles.label}>Senha:</label>
                        <input type="senha" id="senha" name="senha" required />

                        <p className={styles.checkbox}> <input type="checkbox" className={styles.ls}></input> Lembrar senha?</p>

                        <input type="submit" className={styles.botao} value="Entrar"/>
                        </form>
                        <Link href='./contatos'> ** Use esse link enquanto a API não é implementada **</Link>
                    </div>
                    
                    
                    <div className={styles.cadastrar}>
                            <p>Não possui uma conta? <Link className={styles.lc} href="./cadastrar">Cadastrar-se</Link></p>
                        </div>
                        

                    <div className={styles.dVoltar}>
                        <Link className={styles.lv} href="./"><Image className={styles.img} src="/images/return.png" alt="sim" width={30} height={30}/> Voltar</Link>
                    </div>
                </div>

            </div>
        </section>
    )
}