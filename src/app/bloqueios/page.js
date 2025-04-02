"use client";
import { useState } from "react";
import styles from "./bloqueios.module.css";
import ProtectedRoute from '@/components/ProtectedRoute';

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
        <div className={styles.centro}>



          <input
            className={styles.pesquisa}
            value={busca}
            type="text"
            onChange={(ev) => setBusca(ev.target.value)}
            placeholder="Pesquisar contato bloqueado"
          />


          <div className={styles.arruma3}>

            {/* Campo de entrada para o novo nome */}
            <input
              className={styles.busca}
              type="text"
              value={novoNome}
              onChange={(ev) => setNovoNome(ev.target.value)}
              placeholder="Digite o contato"
            />
            {/* Botão para adicionar nome */}
            <button className={styles.adiciona} onClick={adicionarNome}>Bloquear</button>

          </div>

          <div className={styles.lista}>
            <ul className={styles.arruma}>
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
    </ProtectedRoute>
  );
}