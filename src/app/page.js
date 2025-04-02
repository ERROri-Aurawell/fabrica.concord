'use client'
import styles from "./page.module.css";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

const LoginPage = () => {

  Cookies.remove('key');
  Cookies.remove('newAccount');
  console.log(Cookies.get());

  return (
    <div className={styles.container}>

      
      <main className={styles.main_content}> 
        <h1  className={styles.title}>Bem-vindo ao Concord</h1>
        <p className={styles.description}>
<<<<<<< HEAD
        Estamos felizes por ter você aqui! O Concord é um
         espaço criado  para conectar
          pessoas,</p>
       <p className={styles.description_para}> e 
          tornar a comunicação mais dinâmica e interativa.
          Você encontrará um ambiente acolhedor.</p>
    
        <div className="image-container">
        <Image className={styles.img} alt="img" src="/images/i4.jpg" width={700} height={700} />
      </div>
  
=======
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

>>>>>>> 10ad8471c8662b3a349f4d838cd9c73e8471b8cd
        <p className={styles.link}>
          Ainda não tem conta? <Link className={styles.link2} href="./cadastrar">Cadastre-se</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;