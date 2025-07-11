"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import styles from "./config.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Config() {
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
  const [div1, setDiv1] = useState(false);
  const [div3, setDiv3] = useState(false);
  const [div5, setDiv5] = useState(false);

  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");

  const mudarDiv = (numero) => {
    setDiv1(false);
    setDiv3(false);
    setDiv5(false);

    if (numero === "1") setDiv1(true);
    if (numero === "3") setDiv3(true);
    if (numero === "5") setDiv5(true);
  };

  async function atualizarPerfil({ nome, desc, foto }) {
    try {
      const response = await fetch(
        "https://apiconcord.dev.vilhena.ifro.edu.br/updateUser/1-viniciusavila4080@gmail.com-7db940709d83364a8257d6f361b6e13d21622e40",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, desc, foto }),
        }
      );

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar o perfil.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na conexão com o servidor.");
    }
  }

  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const response = await fetch(
          "https://apiconcord.dev.vilhena.ifro.edu.br/user/1-viniciusavila4080@gmail.com-7db940709d83364a8257d6f361b6e13d21622e40"
        );
        const data = await response.json();
        setNome(data.nome);
        setDesc(data.desc);
        setSelectedAvatar(avatars[data.foto]);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    carregarDadosUsuario();
  }, []);

  return (
    <ProtectedRoute>
      <section className={styles.section}>
        {/* Parte lateral esquerda */}
        <section className={styles.parteVisivel}>
          <div>
            <Link className={styles.link2} href="./cadastrar">
              <Image
                className={styles.img}
                alt="img"
                src="/images/aaaa.png"
                width={40}
                height={40}
              />
            </Link>
          </div>

          <div className={styles.miniPerfil}>
            <img width={35} height={35} alt="perfil" src={selectedAvatar} />
            <p>{nome || "Nome do usuário"}</p>
          </div>

          <div className={styles.Gbotoes}>
            <button onClick={() => mudarDiv("3")} className={styles.botao}>
              Mudar Avatar
            </button>
            <button onClick={() => mudarDiv("1")} className={styles.botao}>
              Atualizar Perfil
            </button>
            <button onClick={() => mudarDiv("5")} className={styles.botao}>
              Excluir usuário
            </button>
          </div>
        </section>

        {/* Parte principal dinâmica */}
        <section className={styles.parteSumivel}>
          {div1 && (
            <div className={styles.divSu}>
              <div className={styles.miniperfil}>
                <img width={90} height={90} alt="perfil" src={selectedAvatar} />
                <p className={styles.nome}>{nome || "Nome"}</p>

                <section className={styles.mainCN}>
                  <div className={styles.dFundoCN}>
                    <section className={styles.sectionCN}>
                      <form
                        className={styles.formCN}
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const nomeForm = e.target.nome.value;
                          const descForm = e.target.desc.value;
                          const foto = avatars.indexOf(selectedAvatar);

                          // Atualiza o estado para exibir nome novo sem recarregar
                          setNome(nomeForm);
                          setDesc(descForm);

                          await atualizarPerfil({
                            nome: nomeForm,
                            desc: descForm,
                            foto,
                          });
                        }}
                      >
                        <h1 className={styles.h1CN}>Atualizar Perfil</h1>

                        <label className={styles.labelCN}>Nome:</label>
                        <input
                          className={styles.input}
                          type="text"
                          id="nome"
                          name="nome"
                          defaultValue={nome}
                          required
                        />
                        <p className={styles.noteCN}>
                          Esse nome será exibido para seus contatos no Concord.
                        </p>

                        <label className={styles.labelCN}>Descrição:</label>
                        <input
                          className={styles.input}
                          type="text"
                          id="desc"
                          name="desc"
                          defaultValue={desc}
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
                        key={index}
                        width={105}
                        src={avatar}
                        alt={`avatar ${index + 1}`}
                        className={`${styles.optionMUD} ${
                          selectedAvatar === avatar ? styles.selectedMUD : ""
                        }`}
                        onClick={() => setSelectedAvatar(avatar)}
                      />
                    ))}
                  </div>
                </div>

                <button
                  className={styles.buttonMUD}
                  onClick={async () => {
                    const foto = avatars.indexOf(selectedAvatar);
                    await atualizarPerfil({ nome, desc, foto });
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
                const confirmar = window.confirm(
                  "Tem certeza que deseja apagar sua conta? Essa ação é irreversível."
                );
                if (confirmar) {
                  try {
                    const response = await fetch(
                      "https://apiconcord.dev.vilhena.ifro.edu.br/deleteUser/5-vviniciusavila4080@gmail.com-7db940709d83364a8257d6f361b6e13d21622e40",
                      { method: "DELETE" }
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











