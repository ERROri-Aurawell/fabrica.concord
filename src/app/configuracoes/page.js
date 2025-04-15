"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import styles from "./config.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Config() {

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [messageSounds, setMessageSounds] = useState(true);
    const [messageVibration, setMessageVibration] = useState(true);
    const [groupSounds, setGroupSounds] = useState(true);
    const [groupVibration, setGroupVibration] = useState(true);

    const avatars = [
        "/images/eclipse1.png",
        "/images/eclipse2.png",
        "/images/fotoDoOutro.png",
        "/images/fotoDePerfil.png",
        "/images/eclipse3.png",
        "/images/eclipse4.png",
        "/images/eclipse5.png",

    ];

    const [selectedAvatar, setSelectedAvatar] = useState(avatars[6]);

    let tm = 35;

    const [div1, setDiv1] = useState(false);
    const [div2, setDiv2] = useState(false);
    const [div3, setDiv3] = useState(false);
    const [div4, setDiv4] = useState(false);
    const [div5, setDiv5] = useState(false);
    const [div6, setDiv6] = useState(false);

    const [vistoPorUltimo, setVistoPorUltimo] = useState("todos");
    const [onlineVisivel, setOnlineVisivel] = useState("todos");

    const mudardiv = (numero) => {
        setDiv1(false);
        setDiv2(false);
        setDiv3(false);
        setDiv4(false);
        setDiv5(false);
        setDiv6(false);

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
            case "6":
                setDiv6(true);
                break;
        }
    };

    return (
        <ProtectedRoute>
            <section className={styles.section}>
                <section className={styles.parteVisivel}>
                    <div className={styles.miniPerfil}>
                        <img width={tm} height={tm} alt="perfil" src={selectedAvatar}></img>
                        <p>Nome do usuário</p>
                    </div>

                    <div className={styles.Gbotoes}>
                        <button onClick={() => mudardiv("3")} className={styles.botao}>
                            Mudar Avatar
                        </button>
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

                        <button onClick={() => mudardiv("4")} className={styles.botao}>
                            Notificações
                        </button>
                    </div>
                    <div className={styles.Gbotoes}>

                        <button onClick={() => mudardiv('5')} className={styles.botao}>
                            Deletar usuário
                        </button>
                    </div>
                </section>

                <section className={styles.parteSumivel}>


                    {div1 && (
                        <div className={styles.divSu}>
                            <div className={styles.miniperfil}>
                                <img width={90} height={90} alt="perfil" src={selectedAvatar}></img>
                                <p className={styles.p}>Nome</p>
                            
                                <section className={styles.mainCN}>
                                    <div className={styles.dFundoCN}>
                                        <section className={styles.sectionCN}>
                                            <form className={styles.formCN} action="/submit" method="post">

                                                <h1 className={styles.h1CN}>Conta</h1>
                                                <label className={styles.labelCN}>Nome:</label>
                                                <input type="text" id="nome" name="nome" required />
                                                <p className={styles.noteCN}>Esse não é seu nome de usuário nem seu PIN. Esse nome será exibido para seus contatos Concord.</p>

                                                <label className={styles.labelCN}>Descrição:</label>
                                                <input type="descrição" id="descrição" name="descrição" required />
                                                <label className={styles.labelCN}>Email:</label>
                                                <input type="email" id="email" name="email" required />

                                                <label className={styles.labelCN} htmlFor="celular">Celular:</label>
                                                <input type="celular" id="celular" name="celular" required />

                                                <input type="submit" className={styles.botaoCN} value="Atualizar seu perfil" />
                                            </form>
                                        </section>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    {div2 && (
                        <div className={styles.divSu}>
                            <h1>Visto por Último</h1>
                            <h3>Quem pode ver meu "visto por último"?</h3>
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

                            <h2>Quem pode ver quando está online?</h2>
                            
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
                        <div className={styles.divSuMUD}>
                            <div className={styles.containerMUD}>
                                <div className={styles.headerMUD}>
                                </div>

                                <div className={styles.sectionMUD}>
                                    <h3 className={styles.h3MUD}>Avatar atual</h3>
                                    <div className={styles.currentMUD}>
                                        <img src={selectedAvatar} alt="Avatar Atual" />
                                    </div>
                                </div>

                                <div className={styles.sectionMUD}>
                                    <h3 className={styles.h3MUD}>Alterar avatar</h3>
                                    <div className={styles.gridMUD}>
                                        {avatars.map((avatar, index) => (
                                            <img
                                                width={105}
                                                key={index}
                                                src={avatar}
                                                alt={`avatar ${index + 1}`}
                                                className={`option ${selectedAvatar === avatar ? "selected" : ""}`}
                                                onClick={() => setSelectedAvatar(avatar)}
                                            />
                                        ))}

                                    </div>
                                </div>
                                <button className={styles.buttonMUD}> Atualizar avatar</button>

                            </div>
                        </div>
                    )}

                    {div4 && (
                        <div className={styles.divSu}>
                            <h1>Notificações</h1>
                            <h2>Mensagens</h2>
                            <label className={styles.label}>
                                <input className={styles.label}
                                    type="radio"
                                    name="vistoPorUltimo"
                                    value="todos"
                                    checked={vistoPorUltimo === "todos"}
                                    onChange={() => setVistoPorUltimo("todos")}
                                />
                                Sons de Notifição
                            </label>
                            <label className={styles.label}>
                                <input className={styles.label}
                                    type="radio"
                                    name="vistoPorUltimo"
                                    value="contatos"
                                    checked={vistoPorUltimo === "contatos"}
                                    onChange={() => setVistoPorUltimo("contatos")}
                                />
                                Vibração
                            </label>

                            <hr />

                            <h2>Grupos</h2>
                           
                            <label className={styles.label}>
                                <input className={styles.label}
                                    type="radio"
                                    name="onlineVisivel"
                                    value="todos"
                                    checked={onlineVisivel === "todos"}
                                    onChange={() => setOnlineVisivel("todos")}
                                />
                                Sons de Notifição
                            </label>
                            <label className={styles.label}>
                                <input className={styles.label}
                                    type="radio"
                                    name="onlineVisivel"
                                    value="mesmosVistoUltimo"
                                    checked={onlineVisivel === "mesmosVistoUltimo"}
                                    onChange={() => setOnlineVisivel("mesmosVistoUltimo")}
                                />
                                Vibração
                            </label>
                        </div>
                    )}
                    {div5 && (
                        <div className={styles.divSu}>
                            <div className={styles.tabela_medicDL}>
                                <h2 className={styles.h2DL}>Apagar conta</h2>

                                <div className={styles.warningDL}>
                                    <span className={styles.iconDL}>⚠</span>
                                    <span className={styles.textDL}>Ao apagar essa conta:</span>
                                </div>
                                <p className={styles.pDL}>A conta será apagada do Concord e removida de todos os dispositivos.</p>
                                <p className={styles.pDL}>Seu histórico de mensagens será apagado.</p>
                                <p className={styles.pDL}>Você sairá de todos os grupos.</p>
                                <button className={styles.deleteDL}>
                                    <Link href="./"> Apagar conta </Link>
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </section>
        </ProtectedRoute>
    );
}

