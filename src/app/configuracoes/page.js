"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import styles from "./config.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
  const [busca2, setBusca2] = useState("");
  const [filtro, setFiltro] = useState([]);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [sucessoAvatar, setSucessoAvatar] = useState(false);

  const router = useRouter();

  const mudarDiv = (numero) => {
    setDiv1(false);
    setDiv3(false);
    setDiv5(false);

    if (numero === "1") setDiv1(true);
    if (numero === "3") setDiv3(true);
    if (numero === "5") setDiv5(true);
  };

  const getUsuarios = async () => {
    const key = Cookies.get("key");
    if (!key) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/buscar/${key}`);
      if (!response.ok) throw new Error("Erro ao buscar dados do usuário.");

      const data = await response.json();
      setFiltro(data.filtros);
      setNome(data.nome || "");
      setDesc(data.desc || "");
      setSelectedAvatar(avatars[data.foto] || avatars[0]);
      setFiltrosSelecionados(data.filtrosSelecionados || []);
    } catch (error) {
      console.error("Erro ao buscar filtros:", error);
    }
  };

  const filtroBusca = filtro.filter((f) =>
    f?.filtro?.toLowerCase().includes(busca2.toLowerCase())
  );

  const atualizarPerfilSubmit = async (event) => {
    event.preventDefault();
    const nome = event.target.nome.value;
    const descricao = event.target.desc.value;
    const filtros = filtrosSelecionados.join(", ");
    const foto = selectedAvatar;

    if (filtrosSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um filtro.");
      return;
    }

    try {
      const response = await fetch(
        `https://apiconcord.dev.vilhena.ifro.edu.br/updateUser/${Cookies.get("key")}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, desc: descricao, filtros, foto }),
        }
      );

      if (!response.ok) {
        alert("Erro ao atualizar perfil: " + response.statusText);
      } else {
        alert("Perfil atualizado com sucesso!");
        router.push("/contatos");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao se conectar com o servidor.");
    }
  };

  const atualizarAvatar = async (fotoPath) => {
    const key = Cookies.get("key");
    if (!key) {
      alert("Sessão expirada. Faça login novamente.");
      router.push("/login");
      return;
    }

    try {
      const fileName = fotoPath.split("/").pop(); // Apenas o nome do arquivo

      const response = await fetch(
        `https://apiconcord.dev.vilhena.ifro.edu.br/updateAvatar/${key}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ foto: fileName }),
        }
      );

      const textoResposta = await response.text();
      console.log("Resposta da API:", response.status, textoResposta);

      if (response.ok) {
        setSucessoAvatar(true);
      } else {
        alert("Erro ao atualizar avatar.");
      }
    } catch (err) {
      console.error("Erro ao atualizar avatar:", err);
      alert("Erro ao conectar com o servidor.");
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <ProtectedRoute>
      <section className={styles.section}>
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
                      <form className={styles.formCN} onSubmit={atualizarPerfilSubmit}>
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

                        <label className={styles.labelCN}>Filtros:</label>
                        <div className={styles.dropdown}>
                          <button
                            type="button"
                            onClick={() => setDropdownAberto(!dropdownAberto)}
                            className={styles.botaoDropdown}
                          >
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
                                        setFiltrosSelecionados((prev) =>
                                          prev.includes(valor)
                                            ? prev.filter((f) => f !== valor)
                                            : [...prev, valor]
                                        );
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
                {sucessoAvatar && (
                  <div className={styles.headerDL}>
                    <span className={styles.logoDL}>✅ Avatar atualizado com sucesso!</span>
                  </div>
                )}
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
                        alt={`avatar-${index + 1}`}
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
                    await atualizarAvatar(selectedAvatar);
                  }}
                >
                  Atualizar avatar
                </button>
              </div>
            </div>
          )}

          {div5 && (
            <div className={styles.divDeleteWrapper}>
              <h2 className={styles.titulo}>Apagar conta</h2>
              <div className={styles.alerta}>
                <p className={styles.tituloAlerta}>⚠️ <span>Ao apagar essa conta:</span></p>
                <p>A conta será apagada do Concord e removida de todos os dispositivos.</p>
                <p>Seu histórico de mensagens será apagado.</p>
                <p>Você sairá de todos os grupos.</p>
              </div>
              <button
                className={styles.botaoApagar}
                onClick={async () => {
                  const confirmar = window.confirm(
                    "Tem certeza que deseja apagar sua conta? Essa ação é irreversível."
                  );
                  if (confirmar) {
                    try {
                      const response = await fetch(
                        `https://apiconcord.dev.vilhena.ifro.edu.br/deleteUser/${Cookies.get("key")}`,
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
            </div>
          )}
        </section>
      </section>
    </ProtectedRoute>
  );
}
