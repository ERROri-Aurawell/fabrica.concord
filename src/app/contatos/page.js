"use client";
import { useState } from "react";
import styles from "./contatos.module.css";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function filtro() {

  const [nomes, setNomes] = useState(['Miguel', 'João', 'Grupo1', 'Guilherme', 'Caio', 'Ana', 'Grupo2']);
  const [busca, setBusca] = useState('');
  const [novoNome, setNovoNome] = useState(''); // Estado para o novo nome

  const nomesBusca = nomes.filter((nome) =>
    nome.toLowerCase().includes(busca.toLowerCase())
  );

  const [links, setLinks] = useState(false);

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
              <Image className={styles.logo} alt="logo" src="/images/logo.png" width={70} height={60}/>
            </div>


            <div className={styles.principal}>
            
              <div className={styles.SCROLADIABO}>
                <ul className={styles.arruma}>
                  {nomesBusca.map((nome, i) => (
                    <li key={i}>

                      <Link className={styles.link_nome} href="./chat" >

                        <img className={styles.img} src="/images/human.png" alt={nome} />
                        {nome}

                      </Link>

                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.lateral}>

                <div className={`${styles.botoesDenovo} ${links ? styles.expanded : styles.collapsed}`}>

                    <button className={styles.butao} onClick={() => setLinks(!links)}>
                      <Image src="/images/logo.png" alt="sim" width={70} height={70} />
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