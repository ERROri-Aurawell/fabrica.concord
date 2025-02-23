'use client'
import styles from "./deletarConta.module.css";
import React, { useState } from 'react';
import Link from "next/link";

const DeleteAccount = () => {
    return (
        <div className={styles.tabela_medic}>
            <h2 className={styles.h2}>Apagar conta</h2>

            <div className={styles.warning}>
                <span className={styles.icon}>⚠</span>
                <span className={styles.text}>Ao apagar essa conta:</span>
            </div>
            <p className={styles.p}>A conta será apagada do Concord e removida de todos os dispositivos.</p>
            <p className={styles.p}>Seu histórico de mensagens será apagado.</p>
            <p className={styles.p}>Você sairá de todos os grupos.</p>
            <button className={styles.delete}>
                <Link href="./"> Apagar conta </Link>
            </button>
        </div>
    );
};

export default DeleteAccount;
