'use client'
import styles from "./criarGrupo.module.css";
import { useState } from 'react';
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";

function App() {

  return (
    <ProtectedRoute>
      <div>
        <Link className={styles.link2} href="./cadastrar"><Image  className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>
                        
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Criar grupo</h2>
        <div className={styles.input}>
          <section className={styles.section}>
            <form className={styles.form} action="/submit" method="post">

              <label className={styles.label}>Nome do grupo:</label>
              <input type="text" id="nome" name="nome" required />

              <label className={styles.label}>Descrição:</label>
              <input type="descrição" id="descrição" name="descrição" required />

              <button className={styles.button}>
                Criar
              </button>
            </form>
            <Link href='./chat'> ** Use esse link enquanto a API não é implementada **</Link>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;
