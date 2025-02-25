"Use Client"
import styles from "./cadastrar.module.css";
import Link from "next/link";
export default function cadastrar() {
    return (
        <section className={styles.main}>
            <h1>Crie sua conta</h1>
            <div className={styles.dFundo}>
                <section className={styles.section}>

                    <form className={styles.form} action="/submit" method="post">
                        <label className={styles.label}>Nome:</label>
                        <input type="text" id="nome" name="nome" required />

                        <label className={styles.label}>Senha:</label>
                        <input type="senha" id="senha" name="senha" required />
                        <label className={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label className={styles.label} htmlFor="celular">Celular:</label>
                        <input type="celular" id="celular" name="celular" required />

                        <input type="submit" className={styles.botao} value="Entrar"/>
                    </form>
                    <Link href='./contatos'> ** Use esse link enquanto a API não é implementada **</Link>

                    <div className={styles.dVoltar}>
                        <p>Você já possui conta? <Link href="./login">Fazer login</Link></p>
                    </div>
                </section>
            </div>
        </section>
    )
}