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

    async function search(formData) {
        const dados = [ formData.get("nome"), formData.get("descrição")]
        console.log(dados)
    }

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
                    <div>
                        <Link className={styles.link2} href="./cadastrar"><Image  className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>
                        
                    </div>
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
                            Atualizar Perfil
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
                        <img width={90} height={90} alt="perfil" src={selectedAvatar} />
                        <p className={styles.nome}>Nome</p>

                        <section className={styles.mainCN}>
                        <div className={styles.dFundoCN}>
                            <section className={styles.sectionCN}>
                            <form
                                className={styles.formCN}
                                onSubmit={async (e) => {
                                e.preventDefault();

                                const nome = e.target.nome.value;
                                const desc = e.target.desc.value;
                                const foto = getFotoNumber();

                                try {
                                    const response = await fetch(
                                    "https://apiconcord.dev.vilhena.ifro.edu.br/updateUser/1-viniciusavila4080@gmail.com-7db940709d83364a8257d6f361b6e13d21622e40",
                                    {
                                        method: "PATCH",
                                        headers: {
                                        "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ nome, foto, desc }),
                                    }
                                    );

                                    if (response.ok) {
                                    const data = await response.json();
                                    console.log("Resposta da API:", data);
                                    alert("Perfil atualizado com sucesso!");
                                    } else {
                                    alert("Erro ao atualizar o perfil.");
                                    }
                                } catch (error) {
                                    console.error("Erro:", error);
                                    alert("Erro de conexão com o servidor.");
                                }
                                }}
                            >
                                <h1 className={styles.h1CN}>Atualizar Perfil</h1>

                                <label className={styles.labelCN}>Nome:</label>
                                <input
                                className={styles.input}
                                type="text"
                                id="nome"
                                name="nome"
                                required
                                />
                                <p className={styles.noteCN}>
                                Esse não é seu nome de usuário nem seu PIN. Esse nome será exibido para seus contatos Concord.
                                </p>

                                <label className={styles.labelCN}>Descrição:</label>
                                <input
                                className={styles.input}
                                type="text"
                                id="desc"
                                name="desc"
                                required
                                />

                                <input
                                type="submit"
                                className={styles.botaoCN}
                                value="Atualizar seu perfil"
                                />
                            </form>
                            </section>
                        </div>
                        </section>
                    </div>
                    </div>
                    )}


                {div3 && (
                    <div className={styles.divSuMUD}>
                    <div className={styles.containerMUD}>
                        <div className={styles.headerMUD}></div>

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

                        <button
                        className={styles.buttonMUD}
                        onClick={async () => {
                            const foto = getFotoNumber();

                            try {
                            const response = await fetch(
                                "https://apiconcord.dev.vilhena.ifro.edu.br/updateUser/1-viniciusavila4080@gmail.com-7db940709d83364a8257d6f361b6e13d21622e40",
                                {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ foto }),
                                }
                            );

                            if (response.ok) {
                                const data = await response.json();
                                console.log("Avatar atualizado:", data);
                                alert("Avatar atualizado com sucesso!");
                            } else {
                                alert("Erro ao atualizar avatar.");
                            }
                            } catch (error) {
                            console.error("Erro:", error);
                            alert("Erro na conexão com o servidor.");
                            }
                        }}
                        >
                        Atualizar avatar
                        </button>
                    </div>
                    </div>
                )}

                   
                    {div5 && (
                        <button
                            className={styles.deleteDL}
                            onClick={async () => {
                            const confirmar = window.confirm("Tem certeza que deseja apagar sua conta? Essa ação é irreversível.");
                        
                            if (confirmar) {
                            try {
                                const response = await fetch(
                                    "https://apiconcord.dev.vilhena.ifro.edu.br/deleteUser/5-vviniciusavila4080@gmail.com-7db940709d83364a8257d6f361b6e13d21622e40",
                                    {
                                    method: "DELETE",
                                    }
                                );
                        
                            if (response.ok) {
                                alert("Conta apagada com sucesso!");
                                window.location.href = "/login";
                                } else {
                                     alert("Erro ao apagar a conta. Tente novamente.");
                                }
                                } catch (error) {
                                    console.error("Erro:", error);
                                    alert("Erro ao se conectar ao servidor.");
                                }
                                }
                                }}
                                >
                                    Apagar conta
                                </button>
                            )}
                            </section>
                            </section>
                            </ProtectedRoute>
    );
}

