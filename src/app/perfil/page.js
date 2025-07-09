'use client'
import styles from "./perfil.module.css";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';



const ChatCard = () => {

  const [dados, setDados] = useState({ nome: "Carregando...", foto: 0, descricao: "Carregando..." });

  const searchParams = useSearchParams();
  const id = JSON.parse(searchParams.get('id' || '{}'));

  console.log(id);

  async function fetchChatData() {
    const rota = "https://apiconcord.dev.vilhena.ifro.edu.br";
    // const rota = "http://localhost:9000";
    const response = await fetch(`${rota}/user/${id}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      alert('Erro ao buscar dados do usuário: ' + response.statusText);
    } else {
      const data = await response.json();
      setDados(data);
    }
  }

  useEffect(() => {
    fetchChatData()
      .then(data => {
        console.log("Dados do usuário:", data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados do usuário:", error);
      });
  }, [id]);

  return (

    <ProtectedRoute>



      <div className={styles.card}>
        <div className={styles.cabecalho}>
          <Link className={styles.link2} href="./pesquisa"><Image className={styles.img2} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>
        </div>
        <div className={styles.chat}>
          <div className={styles.section}>
            <h3 className={styles.h3}>{dados.nome}</h3>
            <div className={styles.current}>
              <Image className={styles.img} src={dados.foto === 0 ? "/images/human.png" : `/images/eclipse${dados.foto}.png`} alt={dados.nome} width={120} height={120} />
            </div>
          </div>

          <p className={styles.p}>
            {dados.descricao}
          </p>
        </div>

        <div className={styles.links}>
          <Link className={styles.botoes} href="./bloqueios">
            <Image className={styles.lbotao} alt="img" src="/images/Block.png" width={70} height={70} />
          </Link>

          <Link className={styles.botoes1} href="./bloqueio">
            <Image className={styles.lbotao1} alt="img" src="/images/Siren.png" width={66} height={66} />
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatCard;
