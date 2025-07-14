"use client";
import { useState, useEffect } from "react";
import styles from "./bloqueios.module.css";
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from "next/link";
import Image from "next/image";
import Cookies from 'js-cookie';

export default function filtro() {

  const [nomes, setNomes] = useState([]);
  const [key, setKey] = useState(Cookies.get('key'));


async function remover(id) {
  console.log(id)
}

    async function pegarAmigos() {
      const requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }

    try {
      const rota = "https://apiconcord.dev.vilhena.ifro.edu.br/"
      //const rota = "http://localhost:9000/";
      const resposta = await fetch(`${rota}friends/${key}`, requestOptions);


      if (resposta.ok) {
        const data = await resposta.json();
        setNomes(data)
        console.log(data)
      }


    } catch (error) {
      throw new Error(error);
    }
    }

    useEffect(() => {pegarAmigos()}, [] )


  
    async function banido(id) {
      const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"idBloqueado" : id})
    }

    try {
      const rota = "https://apiconcord.dev.vilhena.ifro.edu.br/"
      //const rota = "http://localhost:9000/";
      const resposta = await fetch(`${rota}block/${key}`, requestOptions);


      if (resposta.ok) {
        const data = await resposta.json();
        console.log(data)
      }else{const data = await resposta.json();
        console.log(data)}
      

      pegarAmigos()


    } catch (error) {
      throw new Error(error);
    }
    }

  return (
    <ProtectedRoute>
      <div className={styles.cor}>
        <div>
          <Link className={styles.link2} href="./contatos"><Image  className={styles.img} alt="img" src="z/images/aaaa.png" width={40} height={40}></Image></Link>
                        
        </div>

          <div className={styles.centro}>
            
            <div className={styles.borda}>
              <div className={styles.lista}>
                <ul className={styles.arruma2}>
                  {nomes.map((nome, i) => (
                    <li key={i} className={styles.bloqueados}>

                      <img className={styles.img} src={nome.foto == 0 ? "/images/human.png" : `/images/eclipse${nome.foto}.png`} alt={nome.foto} />
                      {nome.nome}

                      <button className={styles.butao} onClick={()=>{banido(nome.id)}}><Image alt="block" src="/images/bloc.png" width={60} height={60} /></button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
          </div>
       
      </div>
    </ProtectedRoute>
  );
}