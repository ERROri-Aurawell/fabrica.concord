'use client'
import styles from "./login2.module.css";
import { useState, useEffect } from "react";
import React from 'react';
import Image from "next/image";
import Cookies from 'js-cookie';

const login2 = () => {
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState([]);
    const [busca2, setBusca2] = useState('');
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const getUsuarios = async () => {
        const conteudo = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/buscar/${Cookies.get('key')}`);
        if (!conteudo.ok) {
            throw new Error('Erro ao buscar:' + conteudo.statusText);
        }
        const data = await conteudo.json();
        setFiltro(data.filtros);


        console.log(data.filtros)
    }
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
            <div className={styles.organiza}>

<input
    className={styles.pesquisa2}
    value={busca2}
    type="text"
    onChange={(ev) => setBusca2(ev.target.value)}
    placeholder="Pesquisar filtro"
/>

    <div className={styles.filtros}>
        <ul className={styles.fil}>
            {filtroBusca.map((f, index) => (
                <li key={index} className={styles.itemFiltro}>
                    <label className={styles.radioLabel}>
                        <input
                            className={styles.filtro}
                            type="checkbox"
                            id="custom-checkbox"
                            style={{display: 'none'}}
                            value={f.id}
                            checked={filtrosSelecionados.includes(f.id)}
                            onChange={() => toggleFiltro(f.id)}
                        />
                        <label htmlFor="custom-checkbox" style={{ cursor: 'pointer' }}>
                        
                        </label>
                        {f.filtro}
                    </label>
                    
                </li>
            ))}
        </ul>
    </div>

    <div className={styles.fil_sele}>
        <p className={styles.text_fil}>
            Filtros selecionados: <strong className={styles.fil_cor}>
                {filtrosSelecionados.length > 0
                    ? filtrosSelecionados
                        .map(id => filtro.find(f => f.id === id)?.filtro || id)
                        .join(", ")
                    : "Nenhum"}
            </strong>
        </p>
    </div>

</div>
            <div className={styles.miniperfil}>

                <section className={styles.mainCN}>
                    <div className={styles.dFundoCN}>
                        <section className={styles.sectionCN}>
                            <form className={styles.formCN} action="/submit" method="post">

                                <label className={styles.labelCN}>Nome:</label>
                                <input className={styles.input} type="text" id="nome" name="nome" required />


                                <label className={styles.labelCN}>Descrição:</label>
                                <input className={styles.input} type="descrição" id="descrição" name="descrição" required />


                                <label className={styles.labelCN} htmlFor="celular">Filtros:</label>
                                <input className={styles.input} type="celular" id="celular" name="celular" required />

                                <input type="submit" className={styles.botaoCN} value="Atualizar seu perfil" />
                            </form>
                        </section>
                        <Image className={styles.img} alt="img" src="/images/i6.png" width={700} height={700} />
                    </div>
                </section>
            </div>
        </div>


    )
};
export default login2;