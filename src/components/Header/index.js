'use client'
import styles from "./Header.module.css"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from "next/image"
import Cookies from "js-cookie";
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [notific, setNotific] = useState(false)
    const [ntfcs, setNtfcs] = useState([])
    const [isLoggedIn, setIsLogged] = useState(Cookies.get("key"))

    async function addFriend(conteudo, id) {
        await deletarNotificacao(id);
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "conteudo": conteudo
            })
        }
        try {
            const resposta = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/addfriend/${isLoggedIn}`, requestOptions);
            if (resposta.ok) {
                // mano?

            }


        } catch (error) {
            throw new Error(error);
        }
    }

    async function getData() {
        const data = Cookies.get('userData');
        if (data == undefined) {
            await getTheData()
            window.location.reload();
        } else {
            //Cookies.remove('userData', { path: '/pesquisa' })
        }
    }

    async function getTheData() {
        try {
            const id = isLoggedIn.split("-")[0];
            const resposta = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/user/${id}`);
            if (resposta.ok) {
                const data = await resposta.json();


                Cookies.set('userData', JSON.stringify(data), { expires: 5, path: '/pesquisa' })
            }


        } catch (error) {
            throw new Error(error);
        }
    }

    async function deletarNotificacao(id) {
        const requestOptions = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": id
            })
        }
        try {
            const resposta = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/notific/${isLoggedIn}`, requestOptions);
            if (resposta.ok) {
                refresh();
                // mano?
            }


        } catch (error) {
            throw new Error(error);
        }
    }


    async function adicionar() {
        try {
            const resposta = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/notific/${isLoggedIn}`);
            if (resposta.ok) {
                // mano?
                const data = await resposta.json();

                setNtfcs(data)



            }
        } catch (error) {
            throw new Error(error);
        }
    }

    function refresh() {
        adicionar();
    }

    function splitKEY(key) {
        const [id, ...rest] = key.split("-");
        const after = rest.join("-");
        const [email, ...rest2] = after.split("-");
        const senha = rest2.join('-');

        return [id, email, senha];
    }

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    useEffect(() => {
        if (isLoggedIn == undefined) {
            setNotific(false)
        } else {
            try {
                getData()

                const [a, b, c] = splitKEY(isLoggedIn)

                if (!Number.isNaN(a), validateEmail(b), c.length > 1) {
                    setNotific(true)

                    adicionar();
                }
            } catch {
                //Cookies.remove('key');
                window.location.reload();
                throw new Error("Tem algum erro na Key");
            }
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {



    }, [notific])

    return (
        <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ''}`}>
            <div className={styles.arrumaAi}>
                <div >

                    {<Image className={styles.img} src='/images/logo.png' alt="Concord" width={40} height={40} />}

                </div>
                <div className={styles.dConcord}>
                    <h1 className={styles.h1}>Con<span className={styles.span}>cord</span></h1>
                    <p className={styles.paragráfo}>Chat online</p>
                </div>
            </div>
            {notific &&
                <section className={styles.menu}>
                    <div>
                        <button className={styles.refreshNotfc} onClick={refresh}><Image src="/images/refresh.256x256.png" width={25} height={25} alt="Refresh"></Image> </button>
                    </div>

                    <div className={styles.menuLinks}>
                        {ntfcs.map((mensagem, id) => (
                            <div key={id} className={styles.notificacao}>
                                {mensagem.tipo == 1 && <p>{mensagem.conteudo}</p>}
                                {mensagem.tipo == 2 &&
                                    <div className={styles.notificacaoAmigo}>
                                        {(() => {
                                            let conteudoObj;
                                            try {
                                                conteudoObj = JSON.parse(mensagem.conteudo);
                                            } catch {
                                                conteudoObj = { erro: "Conteúdo inválido" };
                                            }
                                            return (
                                                <div>
                                                    <div className={styles.imgContainer}>
                                                        <p>{conteudoObj.nome}</p>
                                                        <img className={styles.img} src={conteudoObj.foto == 0 ? "/images/human.png" : `/images/eclipse${conteudoObj.foto}.png`} alt={conteudoObj.nome} />
                                                    </div>
                                                    <p>Descrição: {conteudoObj.descricao}</p>
                                                    <p>Você recebeu uma solicitação de amizade</p>
                                                    {/* Adicione outros campos conforme necessário */}
                                                    <div className={styles.buttonsContainer}>
                                                        <button className={styles.botaoAceitar} onClick={() => addFriend(mensagem.conteudo, mensagem.id)}>Adicionar Amigo</button>
                                                        <button className={styles.botaoIgnorar} onClick={() => { deletarNotificacao(mensagem.id) }}>Ignorar</button>
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                }
                                {mensagem.tipo == 3 && <p>Você recebeu uma solicitação de chat</p>}
                                {mensagem.tipo == 4 && <p>{mensagem.conteudo}</p>}


                            </div>
                        ))}
                    </div>

                </section>
            }

        </header>
    );
}


//Tipos: 1-MSG; 2-Friend request; 3-Chat request; 4-Server MSG;
// ID : Quem recebe
// conteudo : O que vai ser enviado 