"use client";
import { useState } from "react";
import styles from "./contatos.module.css";
import Link from "next/link";
import Image from "next/image";

export default function filtro() {
  const [nomes, setNomes] = useState(['Miguel', 'João', 'Grupo1', 'Guilherme', 'Caio', 'Ana', 'Grupo2']);
  const [busca, setBusca] = useState(''); 
  const [novoNome, setNovoNome] = useState(''); // Estado para o novo nome

  const nomesBusca = nomes.filter((nome) =>
    nome.toLowerCase().includes(busca.toLowerCase())
  );

  const adicionarNome = () => {
    // Adiciona o novo nome à lista
    setNomes([...nomes, novoNome]);
    setNovoNome(''); // Limpa o campo de entrada
  };

  return (
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

            <div className={styles.ade}>
              <Link className={styles.add_contato} href="./pesquisa">
                <Image className={styles.add} alt="img" src="/images/novoContato.png" width={60} height={50} />
              </Link>
            </div>
            

          </div>
          


          
            <ul className={styles.arruma}>
              {nomesBusca.map((nome, i) => (
                <li key={i}>

                    <p className={styles.visto}>
                      visto há 12m
                    </p>

                  <Link className={styles.link_nome} href="q" >

                    <img className={styles.img} src="/images/human.png" alt={nome} />
                    {nome}
                    
                  </Link>

                </li>
              ))}
            </ul>

              

            <div className={styles.links}>

              <Link className={styles.botoes} href="./bloqueios">

                <Image className={styles.lbotao} alt="img" src="/images/block.png" width={60} height={60}/>
                  
              </Link>
              
              
              <Link className={styles.botoes} href="./configuracoes">

                <Image className={styles.lbotao} alt="img" src="/images/config.png" width={60} height={60}/>
                  
              </Link>
            </div>


        </div>
        

            
      </div>
    </div>
  );
}