"use client";
import { useState, useEffect, use } from "react";
import styles from "./contatos.module.css";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function filtro() {

  const [amigos, setAmigos] = useState([]);
  const [key, setKey] = useState(Cookies.get('key'));
  const [busca, setBusca] = useState('');
  const [links, setLinks] = useState(false);
  const [amigosOriginal, setAmigosOriginal] = useState([]); // Store the original list

  async function adicionar() {

    const requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }

    try {
      const rota = "https://apiconcord.dev.vilhena.ifro.edu.br"
      //const rota = "http://localhost:9000";
      const resposta = await fetch(`${rota}/chats/${key}`, requestOptions);
      if (resposta.ok) {
        const data = await resposta.json();
        console.log(data)
        setAmigos(data);
        setAmigosOriginal(data); // Store the original data

      }


    } catch (error) {
      throw new Error(error);
    }


  }

  useEffect(() => {
    adicionar();
  }, []);

  useEffect(() => {
    async function filterAmigos() {
      if (amigosOriginal.length > 0) {
        const nomesBusca = amigosOriginal.filter((nome) =>
          nome.nome.toLowerCase().includes(busca.toLowerCase())
        );
        setAmigos(nomesBusca);
      } else {
        setAmigos([]); // Ensure amigos is empty when original is empty
      }
    }

    filterAmigos();
  }, [busca]);

  return (
    <ProtectedRoute>
      <div className={styles.cor}>
        <div className={styles.centro}>


          <div className={styles.lista}>
            <div className={styles.arruma2}>
              <input
                className={styles.pesquisa}
                value={busca}
                type="text"
                onChange={(ev) => setBusca(ev.target.value)}
                placeholder="Pesquisar contato"
              />
              <Image className={styles.logo} alt="logo" src="/images/logo.png" width={70} height={60} />
            </div>


            <div className={styles.principal}>

              <div className={styles.SCROLADIABO}>
                <ul className={styles.arruma}>

                  {amigos.map((nome) => (
                    <li key={nome.id}>

                      <Link className={styles.link_nome} href="./chat" onClick={() => {
                        // Set the cookie as a JSON string
                        Cookies.set('chatID', JSON.stringify({ id: nome.id, nome: nome.chatNome, foto: nome.foto }), { expires: 0.05 });

                        // Get and parse the cookie
                        const chatID = JSON.parse(Cookies.get('chatID'));
                        console.log("ID:", chatID.id, "Nome:", chatID.chatNome, "Foto:", chatID.foto);
                      }} >

                        <img className={styles.img}  src={nome.foto == 0 ? "/images/human.png" : `/images/eclipse${nome.foto}.png`} alt={nome.chatNome} />
                        {nome.chatNome}

                      </Link>

                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.lateral}>

                <div className={`${styles.botoesDenovo} ${links ? styles.expanded : styles.collapsed}`}>

                  <button className={styles.butao} onClick={() => setLinks(!links)}>
                    <Image src="/images/logo.png" alt="sim" width={90} height={80} />
                  </button>


                  <div className={`${styles.nav} ${links ? styles.show : styles.hide}`}>

                    <ul className={styles.lis_bot}>

                      <Link className={styles.botoes} href="./pesquisa">
                        <Image className={styles.add} alt="img" src="/images/novoContato.png" width={70} height={65} />
                      </Link>

                      <Link className={styles.botoes} href="./criarGrupo">
                        <Image className={styles.lbotao} alt="criarGrupo" src="/images/contatos.png" width={70} height={70} ></Image>
                      </Link>

                      <Link className={styles.botoes} href="./bloqueios">
                        <Image className={styles.lbotao} alt="img" src="/images/block.png" width={70} height={70} />
                      </Link>

                      <Link className={styles.botoes} href="./configuracoes">
                        <Image className={styles.lbotao} alt="img" src="/images/config.png" width={70} height={70} />
                      </Link>

                    </ul>

                  </div>



                </div>
              </div>

            </div>



          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}