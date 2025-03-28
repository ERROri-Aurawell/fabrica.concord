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
        <h1  className={styles.title}>Bem-vindo ao Concord</h1>
        <p className={styles.description}>
          Onde as Conversas Ganham Vida! Aqui, cada mensagem é uma nova conexão. 
        </p>
        <p className={styles.description}>
        Faça novos amigos e descubra diferentes pontos de vista. 
        </p>
        <p className={styles.description}>
        Seja para um bate-papo descontraído ou uma discussão mais profunda, este é o seu espaço para se expressar e se conectar.
        </p>
        <button className={styles.button}>
          <Link href="./login">Login</Link>
        </button>

        <p className={styles.link}>
          Ainda não tem conta? <Link href="./cadastrar">Cadastre-se</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;