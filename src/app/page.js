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
        Estamos felizes por ter você aqui! O Concord é um
         espaço criado  para conectar
          pessoas,</p>
       <p className={styles.description_para}> e 
          tornar a comunicação mais dinâmica e interativa.
          Você encontrará um ambiente acolhedor.</p>
    
        <div className="image-container">
        <Image className={styles.img} alt="img" src="/images/i4.jpg" width={700} height={700} />
      </div>
  
        <p className={styles.link}>
          Ainda não tem conta? <Link className={styles.link2} href="./cadastrar">Cadastre-se</Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;