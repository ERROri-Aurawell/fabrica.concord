'use client'
import styles from "./login2.module.css";
import { useState, useEffect } from "react";
import React from 'react';
import Image from "next/image";
import Cookies from 'js-cookie';

const Login2 = () => {
    const [busca2, setBusca2] = useState('');
    const [filtro, setFiltro] = useState([]);
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [dropdownAberto, setDropdownAberto] = useState(false);

    const getUsuarios = async () => {
        const conteudo = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/buscar/${Cookies.get('key')}`);
        if (!conteudo.ok) {
            throw new Error('Erro ao buscar:' + conteudo.statusText);
        }
        const data = await conteudo.json();
        setFiltro(data.filtros);
    };

    const filtroBusca = filtro.filter(f => f?.filtro?.toLowerCase().includes(busca2.toLowerCase()));

    const toggleFiltro = (id) => {
        setFiltrosSelecionados(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <div className={styles.divSu}>
            <div className={styles.organiza}></div>

            <div className={styles.miniperfil}>
                <section className={styles.mainCN}>
                    <div className={styles.dFundoCN}>
                        <section className={styles.sectionCN}>
                            <form className={styles.formCN} action="/submit" method="post">
                                <label className={styles.labelCN}>Nome:</label>
                                <input className={styles.input} type="text" id="nome" name="nome" required />

                                <label className={styles.labelCN}>Descrição:</label>
                                <input className={styles.input} type="text" id="descricao" name="descricao" required />

                                <label className={styles.labelCN}>Filtros:</label>

                                <div className={styles.dropdown}>
                                    <button type="button" onClick={() => setDropdownAberto(!dropdownAberto)} className={styles.botaoDropdown}>
                                        Selecione os filtros ▼
                                    </button>

                                    {dropdownAberto && (
                                        <div className={styles.menuDropdown}>
                                            <div className={styles.filtrosContainer}>
                                                {filtroBusca.map((item, index) => (
                                                    <div key={index}>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={filtrosSelecionados.includes(item.filtro)}
                                                            onChange={() => toggleFiltro(item.filtro)} 
                                                        />
                                                        <span className={styles.textoFiltro}>{item.filtro}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.selecionados}>
                                    Filtros selecionados: <strong>{filtrosSelecionados.join(", ")}</strong>
                                </div>

                                <input type="submit" className={`${styles.botaoCN} ${styles.buttonAtualizarPerfil}`} value="Atualizar seu perfil" />
                            </form>
                        </section>
                        <Image className={styles.img} alt="img" src="/images/i6.png" width={700} height={700} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Login2;
