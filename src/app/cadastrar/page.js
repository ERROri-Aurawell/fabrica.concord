"Use Client"
import styles from "./cadastrar.module.css";
export default function cadastrar() {
    return (
        <section className={styles.main}>
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

                    <div className={styles.dVoltar}>
                        <p>Você já possui conta? <a href="./login">Fazer login</a></p>
                    </div>
                </section>
            </div>
        </section>
    )
}