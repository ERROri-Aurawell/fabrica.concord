"use client";
import { useState, useEffect } from "react";
import styles from "./pesquisa.module.css";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cookies from 'js-cookie';

export default function filtro() {
  const [busca, setBusca] = useState(''); 
  const [filtro, setFiltro] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  const [busca2, setBusca2] = useState('');
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
  const [usuarios, setUsuarios] = useState([])

  const getUsuarios = async () => {
    const conteudo = await fetch(`http://localhost:9000/buscar/${Cookies.get('key')}`);
    if (!conteudo.ok) {
        throw new Error('Erro ao buscar:' + conteudo.statusText);
    }
    const data = await conteudo.json();
    setUsuarios(data)
}

useEffect(() => {
  getUsuarios();
}, [])


const nomesBusca = usuarios.filter(usuario =>
  (busca === '' || usuario.nome.toLowerCase().includes(busca.toLowerCase())) &&
  (filtrosSelecionados.length === 0 ||
  filtrosSelecionados.every(filtro => usuario.filtros.includes(filtro)))
);

const filtroBusca = filtro.filter(f => f.includes(busca2));

const toggleFiltro = (filtro) => {
  setFiltrosSelecionados(prev =>
      prev.includes(filtro) ? prev.filter(f => f !== filtro) : [...prev, filtro]
  );
};

  return (
    <ProtectedRoute>
 <div className={styles.cor}>
            <div className={styles.centro}>
                <div className={styles.pes_filtro}>
                    <input
                        className={styles.pesquisa2}
                        value={busca2}
                        type="text"
                        onChange={(ev) => setBusca2(ev.target.value)}
                        placeholder="Pesquisar filtro"
                    />
                    <div className={styles.fil_sele}>
                        <p className={styles.texfil}>
                            Filtros selecionados: <strong>{filtrosSelecionados.length > 0 ? filtrosSelecionados.join(", ") : "Nenhum"}</strong>
                        </p>
                    </div>
                </div>   
                <div className={styles.filtros}>
                    <ul className={styles.fil}>
                        {filtroBusca.map((f, index) => (
                            <li key={index} className={styles.itemFiltro}>
                                <label className={styles.radioLabel}>
                                    <input
                                        className={styles.filtro}
                                        type="checkbox"
                                        value={f}
                                        checked={filtrosSelecionados.includes(f)}
                                        onChange={() => toggleFiltro(f)}
                                    />
                                    {f}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.lista}>
                    <input
                        className={styles.pesquisa}
                        value={busca}
                        type="text"
                        onChange={(ev) => setBusca(ev.target.value)}
                        placeholder="Pesquisar usuário"
                    />
                    <div className={styles.arruma2}></div>
                    <ul className={styles.arruma}>
                        {nomesBusca.map(usuario => (
                            <li key={usuario.id}>
                                <p>{usuario.nome}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </ProtectedRoute>
  );
}