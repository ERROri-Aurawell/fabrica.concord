'use client'
import styles from "./login2.module.css";
import { useState, useEffect } from "react";
import React from 'react';
import Image from "next/image";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Login2 = () => {

    const router = useRouter();

    const [busca2, setBusca2] = useState('');
    const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
    const [dropdownAberto, setDropdownAberto] = useState(false);
    
    
    const [filtro, setFiltro] = useState([]);
    const getUsuarios = async () => {
        const conteudo = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/buscar/${Cookies.get('key')}`);
        if (!conteudo.ok) {
            throw new Error('Erro ao buscar:' + conteudo.statusText);
        }
        const data = await conteudo.json();
        setFiltro(data.filtros);
    };

    const filtroBusca = filtro.filter(f => f?.filtro?.toLowerCase().includes(busca2.toLowerCase()));


    async function atualizarPerfil(event) {
        event.preventDefault();
        const nome = event.target.nome.value;
        const descricao = event.target.descricao.value;
        const filtros = filtrosSelecionados.join(", ");

        if (filtrosSelecionados.length === 0) {
            alert('Por favor, selecione pelo menos um filtro.');
            return;
        }

        const requestOptions = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, "desc": descricao, filtros })
        };
        const rota = "https://apiconcord.dev.vilhena.ifro.edu.br";
        // const rota = "http://localhost:9000";


        const response = await fetch(`${rota}/updateUser/${Cookies.get('key')}`, requestOptions);
        if (!response.ok) {
            alert('Erro ao atualizar perfil: ' + response.statusText);
        }
        else {
            alert('Perfil atualizado com sucesso!');
            router.push('/contatos');
        }

    }



    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <div className={styles.divSu}>
            <section className={styles.sectionCN}>
                <form className={styles.formCN} onSubmit={atualizarPerfil}>
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

                                <input
                                    type="text"
                                    placeholder="Buscar filtro..."
                                    value={busca2}
                                    onChange={(e) => setBusca2(e.target.value)}
                                    className={styles.inputBusca}
                                />

                                <div className={styles.filtrosContainer}>
                                    {filtroBusca.map((item) => (
                                        <div key={item.id}>
                                            <input
                                                type="checkbox"
                                                id={`filtro-${item.id}`}
                                                name="filtro"
                                                value={item.id}
                                                onChange={(e) => {
                                                    const valor = e.target.value;
                                                    setFiltrosSelecionados((prev) => {
                                                        if (prev.includes(valor)) {
                                                            return prev.filter((f) => f !== valor);
                                                        } else {
                                                            return [...prev, valor];
                                                        }
                                                    });
                                                }}
                                                checked={filtrosSelecionados.includes(String(item.id))}
                                                className={styles.checkboxFiltro}

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
    );
};

export default Login2;
