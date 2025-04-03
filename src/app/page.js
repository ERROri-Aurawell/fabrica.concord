'use client'
import styles from "./page.module.css";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const LoginPage = () => {

  //Cookies.remove('key');
  //Cookies.remove('newAccount');
  //console.log(Cookies.get());

  return (
    <div className={styles.container}>

      
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
          Ainda não tem conta? <Link className={styles.link2} href="./cadastrar">Cadastre-se</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;