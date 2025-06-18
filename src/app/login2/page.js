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
                                <div className={styles.fil_sele}>
                                    <select onChange={(e) => console.log(e.target.value)}>
                                    <option value="todos">Todos</option>
                                    <option value="emAndamento">Em andamento</option>
                                    <option value="naoIniciados">Não iniciados</option>
                                    <option value="encerrados">Encerrados</option>
                                    <option value="favoritos">Favoritos</option>
                                    <option value="removido">Removido da visualização</option>
                                    </select>
        </div>
 

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