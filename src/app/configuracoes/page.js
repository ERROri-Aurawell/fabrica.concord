"use client";

import Image from "next/image";
import styles from "./config.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Config() {
    let tm = 35;

    const [div1, setDiv1] = useState(false);
    const [div2, setDiv2] = useState(false);
    const [div3, setDiv3] = useState(false);
    const [div4, setDiv4] = useState(false);
    const [div5, setDiv5] = useState(false);

    const [vistoPorUltimo, setVistoPorUltimo] = useState("todos");
    const [onlineVisivel, setOnlineVisivel] = useState("todos");

    const mudardiv = (numero) => {
        setDiv1(false);
        setDiv2(false);
        setDiv3(false);
        setDiv4(false);
        setDiv5(false);

        switch (numero) {
            case "1":
                setDiv1(true);
                break;
            case "2":
                setDiv2(true);
                break;
            case "3":
                setDiv3(true);
                break;
            case "4":
                setDiv4(true);
                break;
            case "5":
                setDiv5(true);
                break;
        }
    };

    return (
        <section className={styles.section}>
            <section className={styles.parteVisivel}>
                <div>
           
                    <p>Nome do usuário</p>
                </div>
                <div className={styles.Gbotoes}>
       
                    <button onClick={() => mudardiv("1")} className={styles.botao}>
                        Conta
                    </button>
                </div>
                <div className={styles.Gbotoes}>
     
                    <button onClick={() => mudardiv("2")} className={styles.botao}>
                        Privacidade
                    </button>
                </div>

                <div className={styles.Gbotoes}>
                
                    <button className={styles.botao}>
                        <Link href="./notificacao">Notificações </Link>
                    </button>
                </div>
                <div className={styles.Gbotoes}>
                  
                    <button className={styles.botao}>
                      <Link href="./deletarConta">Deletar usuário </Link>  
                    </button>
                </div>
            </section>

            <section className={styles.parteSumivel}>
                {div1 && (
                    <div className={styles.divSu}>
                        <p>Configurações da Conta</p>
                    </div>
                )}

                {div2 && (
                    <div className={styles.divSu}>
                        <h2>Visto por Último</h2>
                        <p>Quem pode ver meu "visto por último"?</p>
                        <label className={styles.label}>
                            <input className={styles.label}
                                type="radio" 
                                name="vistoPorUltimo" 
                                value="todos" 
                                checked={vistoPorUltimo === "todos"} 
                                onChange={() => setVistoPorUltimo("todos")} 
                            />
                            Todos
                        </label>
                        <label className={styles.label}>
                            <input className={styles.label}
                                type="radio" 
                                name="vistoPorUltimo" 
                                value="contatos" 
                                checked={vistoPorUltimo === "contatos"} 
                                onChange={() => setVistoPorUltimo("contatos")} 
                            />
                            Meus contatos
                        </label>
                        <label className={styles.label}>
                            <input className={styles.label}
                                type="radio" 
                                name="vistoPorUltimo" 
                                value="ninguem" 
                                checked={vistoPorUltimo === "ninguem"} 
                                onChange={() => setVistoPorUltimo("ninguem")} 
                            />
                            Ninguém
                        </label >

                        <hr />

                        <h2>Quem pode ver quando está online</h2>
                        <p>Quem pode ver quando está online?</p>
                        <label className={styles.label}>
                            <input className={styles.label}
                                type="radio" 
                                name="onlineVisivel" 
                                value="todos" 
                                checked={onlineVisivel === "todos"} 
                                onChange={() => setOnlineVisivel("todos")} 
                            />
                            Todos
                        </label>
                        <label className={styles.label}>
                            <input className={styles.label}
                                type="radio" 
                                name="onlineVisivel" 
                                value="mesmosVistoUltimo" 
                                checked={onlineVisivel === "mesmosVistoUltimo"} 
                                onChange={() => setOnlineVisivel("mesmosVistoUltimo")} 
                            />
                            Mesmo que "Visto por Último"
                        </label>
                    </div>
                )}

                {div3 && (
                    <div className={styles.divSu}>
                        <p>Favoritos</p>
                    </div>
                )}

                {div4 && (
                    <div className={styles.divSu}>
                        <p>Notificações</p>
                    </div>
                )}

                {div5 && (
                    <div className={styles.divSu}>
                        <p>⚠️ Tem certeza que deseja excluir sua conta?</p>
                    </div>
                )}
            </section>
        </section>
    );
}

