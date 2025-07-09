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
    const [dados, setDados] = useState(Cookies.get('userData'));
    const [pedidosFreq, setPedidosFreq] = useState([]);

    const rota1 = "https://apiconcord.dev.vilhena.ifro.edu.br";
    //const rota1 = "http://localhost:9000";

    const getUsuarios = async () => {
        const conteudo = await fetch(`${rota1}/buscar/${Cookies.get('key')}`);
        if (!conteudo.ok) {
            throw new Error('Erro ao buscar:' + conteudo.statusText);
        }
        const data = await conteudo.json();
        setFiltro(data.filtros);
        setUsuarios(data.usuarios);

    };

    function splitKEY(key) {
        const [id, ...rest] = key.split("-");
        const after = rest.join("-");
        const [email, ...rest2] = after.split("-");
        const senha = rest2.join('-');

        return [id, email, senha];
    }

    const adicionar = async (id, key, userNome) => {
        const data = JSON.parse(dados);


        console.log(`{ \"key\" : ${splitKEY(key)[0]}, \"nome\" : ${data.nome}, \"foto\" : ${data.foto}, \"descricao\" : ${data.descricao} }`);

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": id,
                "tipo": 2,
                "conteudo": `{ \"key\" : ${splitKEY(key)[0]}, \"nome\" : \"${data.nome}\", \"foto\" : ${data.foto}, \"descricao\" : \"${data.descricao}\", \"userNome\" : \"${userNome}\" }`
            })
        }

        const conteudo = await fetch(`${rota1}/notific/${key}`, requestOptions)
        if (!conteudo.ok) {



            const data = await conteudo.json();


            alert(data.response)
        } 
    }

    useEffect(() => {
        setDados(Cookies.get('userData'))

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


    function adicionarAmigo(id, userNome) {
        //se o id existe dentro dos pedidosFreq, não faz nada
        if (pedidosFreq.includes(id)) {

            alert("Você já enviou um pedido de amizade para esse usuário.");
            return;
        }



        setPedidosFreq(prev => [...prev, id]);

        const key = Cookies.get('key')
        if (!key) {
            console.error("Chave não encontrada.");
        } else {
            adicionar(id, key, userNome);
        }

    }

    return (
        <ProtectedRoute >
            <div className={styles.cor}>
                <div className={styles.cabecalho}>
                    <Link className={styles.link2} href="./contatos"><Image className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>
                </div>
                <div className={styles.centro}>
                    <div className={styles.pes_filtro}>
                        <div className={styles.organiza}>


                            <input
                                className={styles.pesquisa2}
                                value={busca2}
                                type="text"
                                onChange={(ev) => setBusca2(ev.target.value)}
                                placeholder="Pesquisar filtro"
                            />
                            <div className={styles.filtros}>
                                <ul className={styles.osfil}>
                                    {filtroBusca.map((f, index) => (
                                        <li key={index} className={styles.itemFiltro}>
                                            <label className={styles.radioLabel}>
                                                <input
                                                    className={styles.filtro}
                                                    type="checkbox"
                                                    id="custom-checkbox"
                                                    style={{ display: 'none' }}
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
                                    <Link href={{ pathname: "/perfil", query: { id: usuario.id } }}>
                                        <Image className={styles.img} src={usuario.foto === 0 ? "/images/human.png" : `/images/eclipse${usuario.foto}.png`} alt={usuario.nome} width={50} height={50} />
                                    </Link>
                                    {/* Só aparece uma parte do nome do usuário */}
                                    <p className={styles.nomeUsuario}>{usuario.nome.length > 20 ? usuario.nome.slice(0, 20) + '...' : usuario.nome}</p>
                                    {/* se o usuario estiver na lista de pedidos frequentes, esse botão aqui some */}
                                    {!pedidosFreq.includes(usuario.id) && (
                                        <button
                                            className={styles.adicioarAmigo}
                                            onClick={() => { adicionarAmigo(usuario.id, usuario.nome) }}
                                        >
                                            <Image alt="img" src="/images/amizade.png" width={50} height={50} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>



                </div>
            </div>
        </ProtectedRoute>
    );
}
