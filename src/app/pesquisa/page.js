"use client";
import { useState, useEffect } from "react";
import styles from "./pesquisa.module.css";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cookies from 'js-cookie';
import Image from "next/image";

export default function Filtro() {
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
        setUsuarios(data.usuarios);

        console.log(data.filtros)
    };


    const adicionar = async (id, key) => {
        const conteudo = await fetch('')
        if (!conteudo.ok) {
            throw new Error('Erro ao adicionar:' + conteudo.statusText);
        }
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const nomesBusca = usuarios.filter(usuario =>
        (busca === '' || usuario.nome.toLowerCase().includes(busca.toLowerCase())) &&
        (filtrosSelecionados.length === 0 ||
            filtrosSelecionados.every(f => usuario.filtros.includes(f)))
    );

    const filtroBusca = filtro.filter(f => f?.filtro?.toLowerCase().includes(busca2.toLowerCase()));

    const toggleFiltro = (id) => {
        setFiltrosSelecionados(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };


    function adicionarAmigo(id) {
        console.log(`vou tentar adicionar o caba com id ${id}`)
        const key = Cookies.get('key')

        adicionar(id, key);
    }

    return (
        <ProtectedRoute>
            <div className={styles.cor}>
            <div>
          <Link className={styles.link2} href="./cadastrar"><Image  className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>
                        
        </div>
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
                                Filtros selecionados: <strong>
                                    {filtrosSelecionados.length > 0
                                        ? filtrosSelecionados
                                            .map(id => filtro.find(f => f.id === id)?.filtro || id)
                                            .join(", ")
                                        : "Nenhum"}
                                </strong>
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
                                            value={f.id}
                                            checked={filtrosSelecionados.includes(f.id)}
                                            onChange={() => toggleFiltro(f.id)}
                                        />
                                        {f.filtro}
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
                        <div className={styles.arruma2}>

                        {nomesBusca.map(usuario => (
                                <div className={styles.divDosUsuarios} key={usuario.id}>
                                    <button className={styles.adicioarAmigo} onClick={() => { adicionarAmigo(usuario.id) }}></button>
                                    <p>{usuario.nome}</p>
                                </div>
                        ))}

                        </div>
                            
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
