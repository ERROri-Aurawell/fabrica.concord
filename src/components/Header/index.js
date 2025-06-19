'use client'
import styles from "./Header.module.css"
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import Image from "next/image"
import Cookies from "js-cookie";
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [notific, setNotific] = useState(false)
    const [ntfcs, setNtfcs] = useState([])
    const [userData, setUserData] = useState(Cookies.get("userData"));
    const [isLoggedIn, setIsLogged] = useState(Cookies.get("key"))

    async function addFriend(conteudo) {
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
        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        try {
            const resposta = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/user/${splitKEY(isLoggedIn)[0]}`, requestOptions);
            if (resposta.ok) {
                // mano?
                const data = await resposta.json();
                Cookies.set("userData", JSON.stringify(data))

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
                console.log(data)
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



    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (isLoggedIn == undefined) {
            setNotific(false)
        } else {
            try {
                if (userData == undefined && isLoggedIn != undefined) {
                    const func = async () => { await getData() };
                    func();
                }


                const [a, b, c] = splitKEY(isLoggedIn)

                if (!Number.isNaN(a), validateEmail(b), c.length > 1) {
                    setNotific(true)

                    adicionar();
                }
            } catch {
                Cookies.remove('key');
                //throw new Error("Tem algum erro na Key");

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
                        <button onClick={refresh}><Image src="/images/refresh.256x256.png" width={25} height={25} alt="Refresh"></Image> </button>
                    </div>

                    <div>
                        {ntfcs.map((mensagem, id) => (
                            <div key={id}>
                                {mensagem.tipo == 1 && <p>{mensagem.conteudo}</p>}
                                {mensagem.tipo == 2 &&
                                    <div className={styles.notificacaoAmigo}>
                                        {(() => {
                                            let conteudoObj;
                                            try {
                                                conteudoObj = JSON.parse(mensagem.conteudo);
                                                console.log(conteudoObj);
                                            } catch {
                                                conteudoObj = { erro: "Conteúdo inválido" };
                                            }
                                            return (
                                                <div>
                                                    <p>Nome: {conteudoObj.nome}</p>
                                                    <p>Foto: {conteudoObj.foto}</p>
                                                    <p>Descrição: {conteudoObj.descricao}</p>
                                                    {/* Adicione outros campos conforme necessário */}
                                                    <button onClick={() => addFriend(mensagem.conteudo)}>Adicionar Amigo</button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                }
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