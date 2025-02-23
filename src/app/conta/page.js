'use client'
import styles from "./conta.module.css";
import React, { useState } from 'react';
export default function conta() {
    return (
        <section className={styles.main}>
        <div className={styles.dFundo}>
            <section className={styles.section}>
            <form className={styles.form} action="/submit" method="post">
                    <h1 className={styles.h1}>Conta</h1>
                    <label className={styles.label}>Nome:</label>
                    <input type="text" id="nome" name="nome" required />
                    <p className={styles.note}>Esse não é seu nome de usuário nem seu PIN. Esse nome será exibido para seus contatos Concord.</p>

                    <label className={styles.label}>Descrição:</label>
                    <input type="descrição" id="descrição" name="descrição" required />
                    <label className={styles.label}>Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label className={styles.label} htmlFor="celular">Celular:</label>
                    <input type="celular" id="celular" name="celular" required />

                    <input type="submit" className={styles.botao} value="Atualizar seu perfil"/>
            </form>
            </section>
        </div>
        </section>
    )
}
