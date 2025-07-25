"use client";
import { useState, useEffect } from "react";
import styles from "./contatos.module.css";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function filtro() {

  const [amigos, setAmigos] = useState([]);
  const [vazio, setVazio] = useState(false);
  const [key, setKey] = useState(Cookies.get('key'));
  const [busca, setBusca] = useState('');
  const [links, setLinks] = useState(false);
  const [dados, setDados] = useState(Cookies.get('userData'));
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


        if (data.response == "Nenhum chat encontrado.") {
          setAmigos([]);
          setAmigosOriginal([]);
          setVazio(true);
          return;
        }

        setAmigos(data);
        setAmigosOriginal(data); // Store the original data

      }


    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    adicionar();
    setDados(Cookies.get('userData'));
  }, []);

  useEffect(() => {
    async function filterAmigos() {
      if (amigosOriginal.length > 0) {
        const nomesBusca = amigosOriginal.filter((nome) =>
          nome.chatNome.toLowerCase().includes(busca.toLowerCase())
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

                  {vazio &&
                    <div className={styles.vazio}>
                      <Image className={styles.imgVazio} src="/images/copo vazio.jpg" alt="vazio" width={500} height={500} />
                      <p className={styles.pVazio}>Nenhum contato encontrado</p>
                    </div>
                  }
                  {amigos.map((nome) => {
                    let displayName = nome.chatNome;

                    if (nome.tipo == 2) { // Se for um contato normal
                      // Separa "[\"1\"",\"2\""]" em [1,2] e pega o nome que é diferente do próprio
                      try {
                        const membros = JSON.parse(nome.chatNome);
                        const userNome = JSON.parse(dados).nome;
                        const filtrado = membros.filter(item => item !== userNome); // Filtra o nome do usuário atual
                        displayName = filtrado[0]; // Pega o primeiro nome filtrado

                      } catch (error) {
                        console.error("Erro ao processar o nome:", error);
                      }
                    } else {

                      const userNome = JSON.parse(nome.chatNome);

                      displayName = userNome[0]
                    }
                    return (
                      <li key={nome.id}>
                        <Link
                          className={styles.link_nome}
                          href="./chat"
                          onClick={() => {
                            console.log(nome)
                            Cookies.set('chatID', JSON.stringify({ id: nome.id, nome: nome.chatNome, foto: nome.foto, membros: nome.membros }), { expires: 0.05 });
                          }}
                        >
                          <img
                            className={styles.img}
                            src={nome.foto == 0 ? "/images/human.png" : `/images/eclipse${nome.foto}.png`}
                            alt={displayName}
                          />
                          {displayName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className={styles.lateral}>

                <div className={`${styles.botoesDenovo} ${links ? styles.expanded : styles.collapsed}`}>

                  <div className={`${styles.nav} ${links ? styles.show : styles.hide}`}>

                    <ul className={styles.lis_bot}>


                      <Link className={styles.botoes} href="./pesquisa">
                        <Image className={styles.add} alt="img" src="/images/novoContato.png" width={70} height={65} />
                      </Link>

                      <Link className={styles.botoes} href="./criarGrupo">
                        <Image className={styles.lbotao} alt="criarGrupo" src="/images/contatos.png" width={70} height={70} ></Image>
                      </Link>

                      <Link className={styles.botoes} href="./bloqueios">
                        <Image className={styles.lbotao} alt="bloqueios" src="/images/blouqueio.png" width={70} height={70} />
                      </Link>

                      <Link className={styles.botoes} href="./configuracoes">
                        <Image className={styles.lbotao} alt="config" src="/images/config.png" width={70} height={70} />
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