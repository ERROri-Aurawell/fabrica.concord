"use client";
import styles from "./test.module.css";
import { useState, useEffect } from "react";

export default function Filtro() {
    const [busca, setBusca] = useState(''); 
    const [filtro, setFiltro] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    const [busca2, setBusca2] = useState('');
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);

    const arrayTeste = [
        { id: 1, nome: "quadrado", filtros: ['1', '4', '7'] },
        { id: 2, nome: "retangulo", filtros: ['9', '2', '8'] },
        { id: 3, nome: "circulo", filtros: ['4', '5', '7'] }
    ];

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        setUsuarios(arrayTeste);
    }, []);

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
    );
}