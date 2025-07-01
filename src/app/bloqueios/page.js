"use client";
import { useState } from "react";
import styles from "./bloqueios.module.css";
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from "next/link";
import Image from "next/image";

export default function filtro() {

  const [nomes, setNomes] = useState(['Miguel', 'João', 'Caleb', 'Guilherme', 'Gabriel', 'Caio', 'Ana', 'Eduardo']);
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
    <ProtectedRoute>
      <div className={styles.cor}>
        <div>
          <Link className={styles.link2} href="./cadastrar"><Image  className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>
                        
        </div>


          <div className={styles.centro}>

            <div className={styles.coluna}>

              <p className={styles.comentario}>Pesquise o contato <span className={styles.span}>Bloqueado</span></p>

              <input
                className={styles.pesquisa}
                value={busca}
                type="text"
                onChange={(ev) => setBusca(ev.target.value)}
                placeholder="Pesquisar contato bloqueado"
              />

              <p className={styles.comentario}> Digite o contado que deseja <span className={styles.span}>BLOQUEAR</span></p>

              <div className={styles.arruma}>

                {/* Campo de entrada para o novo nome */}
                
                <input
                  className={styles.busca}
                  type="text"
                  value={novoNome}
                  onChange={(ev) => setNovoNome(ev.target.value)}
                  placeholder="Digite o contato"
                />
                {/* Botão para adicionar nome */}
                <button className={styles.bloquear} onClick={adicionarNome}><Image alt="bloqueio" 
                src="/images/Block.png" width={60} height={60}/></button>

              </div>

            </div>
            
            <div className={styles.borda}>
              <div className={styles.lista}>
                <ul className={styles.arruma2}>
                  {nomesBusca.map((nome, i) => (
                    <li key={i}>
                      <img className={styles.img} src="/images/human.png" alt={nome} />
                      {nome}
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