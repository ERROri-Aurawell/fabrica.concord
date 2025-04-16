'use client'
import styles from "./login2.module.css";
import React from 'react';
import Image from "next/image";
const login2 = () => {
       return(
            <div className={styles.divSu}>
                <div className={styles.miniperfil}>
                
                    <section className={styles.mainCN}>
                        <div className={styles.dFundoCN}>
                            <section className={styles.sectionCN}>
                                <form className={styles.formCN} action="/submit" method="post">

                                    <label className={styles.labelCN}>Nome:</label>
                                    <input className={styles.input} type="text" id="nome" name="nome" required />
                                    <p className={styles.noteCN}>Esse não é seu nome de usuário nem seu PIN. Esse nome será exibido para seus contatos Concord.</p>

                                    <label className={styles.labelCN}>Descrição:</label>
                                    <input className={styles.input} type="descrição" id="descrição" name="descrição" required />
                                    <label className={styles.labelCN}>Email:</label>
                                    <input className={styles.input} type="email" id="email" name="email" required />

                                    <label className={styles.labelCN} htmlFor="celular">Filtros:</label>
                                    <input className={styles.input} type="celular" id="celular" name="celular" required />

                                    <input  type="submit" className={styles.botaoCN} value="Atualizar seu perfil" />
                                </form>
                            </section>
                            <Image className={styles.img} alt="img" src="/images/i6.png" width={700} height={700} />
                        </div>
                    </section>
                </div>
            </div>
        
    )};
export default login2;