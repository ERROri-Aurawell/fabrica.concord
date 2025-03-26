'use client'
import styles from "./page.module.css";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.h1} >CON<span className={styles.span}>CORD</span></h1>
      <Image className={styles.img} alt="img" src="/images/Rectangle 15.png" width={140} height={140} />
      </header>
      
      <main className={styles.main_content}> 
        <h1  className={styles.title}>Bem-vindo</h1>
        <p className={styles.description}>
        Estamos felizes por ter você aqui! O Concord é um espaço criado para conectar</p>
        <p className={styles.description}>
          pessoas, facilitar conversas e tornar a comunicação mais dinâmica e interativa.
          </p>
            Você encontrará um ambiente acolhedor e cheio de possibilidades.        
        <button className={styles.button}>
          <Link href="./login">Login</Link>
        </button>
        <div className="image-container">
        <Image className={styles.img} alt="img" src="/images/ilus.png" width={300} height={300} />
      </div>
        <p className={styles.link}>
          Ainda não tem conta? <Link href="./cadastrar">Cadastre-se</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;