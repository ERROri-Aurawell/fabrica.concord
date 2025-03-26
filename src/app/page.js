'use client'
import styles from "./page.module.css";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className={styles.container}>

      
      <main className={styles.main_content}> 
        <h1  className={styles.title}>Bem-vindo</h1>
        <p className={styles.description}>
        Estamos felizes por ter você aqui! O Concord é um
         espaço criado  para conectar
          pessoas,  facilitar conversas e 
          tornar a comunicação mais dinâmica e interativa.
            Você encontrará um ambiente acolhedor e 
            cheio de possibilidades.</p>
    
        <div className="image-container">
        <Image className={styles.img} alt="img" src="/images/ilus.png" width={700} height={700} />
      </div>
      <button className={styles.button}>
          <Link className={styles.link3} href="./login">Login</Link>
        </button>
        <p className={styles.link}>
          Ainda não tem conta? <Link className={styles.link2} href="./cadastrar">Cadastre-se</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;