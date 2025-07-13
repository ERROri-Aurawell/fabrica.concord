"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import styles from "./config.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Config() {
  const [avatars, setAvatars] = useState([
    "/images/eclipse1.png",
    "/images/eclipse2.png",
    "/images/fotoDoOutro.png",
    "/images/fotoDePerfil.png",
    "/images/eclipse3.png",
    "/images/eclipse4.png",
    "/images/eclipse5.png",
    "/images/eclipse1.png",
    "/images/eclipse2.png",
    "/images/fotoDoOutro.png",
    "/images/fotoDePerfil.png",
    "/images/eclipse3.png",
    "/images/eclipse4.png",
    "/images/eclipse5.png",
    "/images/eclipse1.png",
    "/images/eclipse2.png",
    "/images/fotoDoOutro.png",
    "/images/fotoDePerfil.png",
    "/images/eclipse3.png",
    "/images/eclipse4.png",
    "/images/eclipse5.png",
  ]);

  const [subdiv1, setSubDiv1] = useState(true)
  const [subdiv2, setSubDiv2] = useState(false)

  const mudarDiv2 = (numero) => {
    setSubDiv1(false);
    setSubDiv2(false);

    if (numero === "1") setSubDiv1(true);
    if (numero === "2") setSubDiv2(true);
  };

  const [div1, setDiv1] = useState(false);
  const [div3, setDiv3] = useState(false);
  const [div5, setDiv5] = useState(false);
  const [key, setKey] = useState(Cookies.get("key"));
  const [dadosUsuario, setDadosUsuario] = useState(Cookies.get('userData'))
  const [fotoDePerfil, setFotoDePerfil] = useState(56835458925)
  const [nome, setNome] = useState("Carregando...")
  const [fotoGrande, setFotoGrande] = useState("1")
  const [filtrosMarcados, setFiltrosMarcados] = useState("")
  const [descricao, setDescricao] = useState('Carregando...')

  const [filtro, setFiltro] = useState([]);

  const getUsuarios = async () => {
    const conteudo = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/buscar/${Cookies.get('key')}`);
    if (!conteudo.ok) {
      throw new Error('Erro ao buscar:' + conteudo.statusText);
    }
    const data = await conteudo.json();
    setFiltro(data.filtros);

    console.log(data.filtros)
  };


  function splitKEY(key) {
    const [id, ...rest] = key.split("-");
    const after = rest.join("-");
    const [email, ...rest2] = after.split("-");
    const senha = rest2.join('-');

    return [id, email, senha];
  }

  const [novoNome, setNovoNome] = useState('')
  const [novaDescr, setNovaDescr] = useState("")

  const [busca2, setBusca2] = useState("")

  const filtroBusca = filtro.filter(f => f?.filtro?.toLowerCase().includes(busca2.toLowerCase()));

  const router = useRouter();

  const mudarDiv = (numero) => {
    setDiv1(false);
    setDiv3(false);
    setDiv5(false);

    if (numero === "1") setDiv1(true);
    if (numero === "3") setDiv3(true);
    if (numero === "5") setDiv5(true);
  };

  async function getData() {
    const requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    }
    try {
      const resposta = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/user/${splitKEY(key)[0]}`, requestOptions);
      if (resposta.ok) {
        // mano?
        const data = await resposta.json();
        Cookies.set("userData", JSON.stringify(data))

        setFotoDePerfil(data.foto)
        setNome(data.nome)
        setFiltrosMarcados(data.filtros ? data.filtros.split(",").map(Number) : []);
        setDescricao(data.descricao)

        alert("atualizado!")

      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // { nome, foto, desc, filtros }

  async function updateUser(bodyItens) {
    const rota = "https://apiconcord.dev.vilhena.ifro.edu.br"
    //const rota = "localhost:9000"

    const requestOptions = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyItens)
    }

    try {
      console.log("Opções")
      console.log(requestOptions)

      console.log(`${rota}/updateUser/${key}`, requestOptions)

      const resposta = await fetch(`${rota}/updateUser/${key}`, requestOptions);
      if (resposta.ok) {
        // mano?
        await getData();

      }
    } catch (error) {
      throw new Error(error);
    }
  }


  useEffect(() => {
    getUsuarios()
    const dadosjson = JSON.parse(dadosUsuario)
    setNome(dadosjson.nome)

    console.log(dadosjson)

    setFotoDePerfil(dadosjson.foto)
    setFotoGrande(dadosjson.foto)
    setDescricao(dadosjson.descricao)

    setFiltrosMarcados(dadosjson.filtros ? dadosjson.filtros.split(",").map(Number) : []);

  }, [])

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
            <img width={35} height={35} alt="perfil" src={avatars[fotoDePerfil]} />
            <p>{nome}</p>
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
          {div3 && (
            <div className={styles.divSu}>
              <div className={styles.ladoEsquerdo}>
                <p>Mudar foto</p>



                <section className={styles.sectionCN}>
                  {avatars.map((avatar, i) => (
                    <div key={i} >
                      <button onClick={() => { setFotoGrande(i) }}><Image src={avatar} width={50} height={50} alt="imagem"></Image> </button>
                    </div>
                  ))}
                </section>
              </div>
              <div className={styles.ladoDireito}>
                <div className={styles.divDaImagemGrande}>
                  <Image src={avatars[fotoGrande]} width={150} height={150} alt="imagem"></Image>
                  <button onClick={() => { updateUser({ foto: fotoGrande }) }}>Mudar Avatar</button>
                </div>
              </div>
            </div>
          )}

          {div1 && (
            <div className={styles.divSuMUD}>
              <div className={styles.containerMUD}>
                <div>
                  <button onClick={() => { mudarDiv2("1") }}>Filtros</button>
                  <button onClick={() => { mudarDiv2("2") }}>Nome e descrição</button>

                  {subdiv1 &&
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      updateUser({ filtros: filtrosMarcados.join(",") });
                    }}>

                      <label className={styles.labelCN}>Filtros:</label>

                      <input
                        type="text"
                        placeholder="Buscar filtro..."
                        value={busca2}
                        onChange={(e) => setBusca2(e.target.value)}
                        className={styles.inputBusca}
                      />
                      {/**filtrosMarcados*/}

                      {filtroBusca.map((filtro1) => (

                        <label key={filtro1.id}>
                          <input
                            type="checkbox"
                            id={filtro1.id}
                            checked={filtrosMarcados.includes(filtro1.id)}
                            onChange={(e) => {
                              const { id, checked } = e.target;
                              const idNum = parseInt(id);

                              if (checked) {
                                setFiltrosMarcados([...filtrosMarcados, idNum]);
                              } else {
                                setFiltrosMarcados(filtrosMarcados.filter((f) => f !== idNum));
                              }
                            }}

                          />
                          {filtro1.filtro}
                        </label>
                      ))}

                      <input type="submit" className={`${styles.botaoCN} ${styles.buttonAtualizarPerfil}`} value="Atualizar seu perfil" />
                    </form>
                  }

                  {subdiv2 &&
                    <form onSubmit={(e) => {
                      e.preventDefault();

                      const dadosAtualizados = {};
                      if (novoNome.trim() !== "") dadosAtualizados.nome = novoNome;
                      if (novaDescr.trim() !== "") dadosAtualizados.desc = novaDescr;

                      if (Object.keys(dadosAtualizados).length > 0) {
                        setNovoNome("");
                        setNovaDescr("");
                        updateUser(dadosAtualizados);
                      }
                    }}>
                      <label className={styles.labelCN}>
                        Alterar Nome ou Descrição
                      </label>

                      <input
                        type="text"
                        value={novoNome}
                        placeholder={nome}

                        onChange={(e) => { setNovoNome(e.target.value)}}
                        className={styles.inputBusca}
                      />

                      <input
                        type="text"
                        value={novaDescr}
                        placeholder={descricao}

                        onChange={(e) => { setNovaDescr(e.target.value)}}
                        className={styles.inputBusca}
                      />

                      <input type="submit" className={`${styles.botaoCN} ${styles.buttonAtualizarPerfil}`} value="Atualizar seu perfil" />

                    </form>
                  }
                </div>

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
                        window.location.href = "/";
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
