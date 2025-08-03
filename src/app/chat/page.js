"use client";
import { useState, useRef, useEffect, use } from "react";
import styles from "./chat.module.css";
import Image from "next/image";
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatRoute from '@/components/chatRoute';
import Link from "next/link";
import Cookies from 'js-cookie';
import socket from "./socket";
import { fetchFriends, addInChat, chatDados } from "./otherThings.js";
import EnviarMidia from "./enviarMidia";

export default function Chat() {
  const [apaputaquepariu, setVTMNC] = useState(false)
  const [dados, setDados] = useState(Cookies.get('userData'));
  const [conectado, setConectado] = useState(true);
  const chatIDCookie = Cookies.get('chatID');
  const [chatID, setChatID] = useState(chatIDCookie ? JSON.parse(chatIDCookie) : null);
  const [nomes, setNomes] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const listaRef = useRef(null);
  const [tipos, setTipos] = useState([false])
  const [friends, setFriends] = useState([]);
  const [filterFriend, setFilterFriend] = useState([])
  const [data, setData] = useState({})
  const [visivel, setVisivel] = useState(null);
  const [adm, setAdm] = useState(false)
  const [visivel2, setVisivel2] = useState(null)
  const [chatType, setChatType] = useState("msg");
  const [mediaChatOpened, setMediaChatOpened] = useState(false);
  const [medias, setMedias] = useState([]);
  const [inMediaChat, setInMediaChat] = useState(false);
  const [carregado, setCarregado] = useState(false);

  const adicionarNome = () => {
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    setNomes([...nomes, { mensagem: `${hora} : ${minutos} : ${segundos}`, remetente: "LocalTest" }]);
  };

  function changeChatType() {
    chatType === "msg" ? setChatType("media") : setChatType("msg");
  }

  useEffect(() => {
    if (medias.length > 0) {
      setCarregado(true);
    }
  }, [medias])

  useEffect(() => {
    const handleHistorico = (response) => setNomes(response.response);
    const handleMediaChatOpened = (response) => {
      socket.emit("isMediaChatOpen", { key: Cookies.get('key'), chatID: chatID.id });
    };
    const handleNewMessage = (response) => {
      if (response.response?.mensagem) {
        setNomes((prev) => [...prev, response.response]);
      }
    };
    const handleMediaChatStatus = (response) => {
      setMediaChatOpened(response.isOpen);
    };
    const handleDelete = (data) => {
      const { mensagem } = data;
      setNomes(prev => prev.filter(nome => nome.mensageId !== mensagem));
    };
    const handleEdit = (data) => {
      const { mensagem, mensagemNova } = data;
      setNomes((prev) =>
        prev.map((msg) =>
          msg.mensageId === mensagem ? { ...msg, mensagem: mensagemNova } : msg
        )
      );
    };
    const handleDisconnect = () => setConectado(false);
    const handleReconnect = () => {
      socket.emit("reconnect", { key: Cookies.get('key'), chatID: chatID.id });
    };
    const handleMediaHistory = (data) => {
      setMedias([]);

      for (const media of data.response) {
        // Reconstruir buffer → Blob
        const byteArray = new Uint8Array(media.conteudo);
        const blob = new Blob([byteArray], { type: media.tipo });

        // Gerar URL temporária para exibir
        const url = URL.createObjectURL(blob);

        setMedias((prev) => [...prev, { nome: media.nome, mensageId: media.mensageId, url, tipo: media.tipo, foto: media.foto, arquivoNome: media.arquivoNome, remetente: media.remetente, criadoEm: media.criadoEm, membros: media.membros }]);
      }

      //setMedias(data.response);
      const primeira = data.response[0]
      const membros = primeira.membros.split(",");
      // se o seu id estiver na lista de membros, então você está no chat de mídia
      if (membros.includes(Cookies.get('key').split("-")[0])) {
        setInMediaChat(true);
      } else {
        setInMediaChat(false);
      }
    }

    const handleNewMedia = (data) => {
      console.log("Nova mídia recebida:", data);
      const media = data.response;
        // Reconstruir buffer → Blob
        const byteArray = new Uint8Array(media.conteudo);
        const blob = new Blob([byteArray], { type: media.tipo });

        // Gerar URL temporária para exibir
        const url = URL.createObjectURL(blob);

        setMedias((prev) => [...prev, { nome: media.nome, mensageId: media.mensageId, url, tipo: media.tipo, foto: media.foto, arquivoNome: media.arquivoNome, remetente: media.remetente, criadoEm: media.criadoEm, membros: media.membros }]);
    }

    // Registrar listeners
    socket.on("historico", handleHistorico);
    socket.on("mediaChatOpened", handleMediaChatOpened);
    socket.on("newMessage", handleNewMessage);
    socket.on("mediaChatStatus", handleMediaChatStatus);
    socket.on("deletar", handleDelete);
    socket.on("editar", handleEdit);
    socket.on("disconnect", handleDisconnect);
    socket.on("newMedia", handleNewMedia)

    socket.on("disconnect", (reason) => {
      console.warn("Socket desconectado:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("Erro de conexão:", err.message);
    });

    socket.on("reconnect", handleReconnect);
    socket.on("mediaHistory", handleMediaHistory);

    // Limpar ao desmontar
    return () => {
      socket.off("historico", handleHistorico);
      socket.off("mediaChatOpened", handleMediaChatOpened);
      socket.off("newMessage", handleNewMessage);
      socket.off("mediaChatStatus", handleMediaChatStatus);
      socket.off("deletar", handleDelete);
      socket.off("editar", handleEdit);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect", handleReconnect);
      socket.off("mediaHistory", handleMediaHistory);
      socket.off("newMedia", handleNewMedia)
    };
  }, [chatID]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      enviarMensagem();
    }
  };

  function enviarMensagem() {
    data.mensagem = mensagens;
    if (data.mensagem.trim() !== '') {
      socket.emit("addMessage", data);

      setMensagens("");
      setData({
        ...data,
        mensagem: ""
      });
    }
  }

  function openMediaChat(key, chatID) {
    socket.emit("openMediaChat", { key: key, chatID: chatID });
  }

  // Verifica se o chatID está definido, caso contrário redireciona para a página de contatos

  useEffect(() => {
    if (!chatID || chatID == undefined) {
      console.error("Chat ID não encontrado. Redirecionando para contatos.");
      window.location.href = "/contatos"; // Redireciona para a página de contatos
      return;
    }
    setDados(JSON.parse(dados))

    setData({
      "key": `${Cookies.get('key')}`,
      "mensagem": "",
      "chatID": chatID.id
    })

    // Conecta ao socket

    socket.connect();
    socket.emit("todas", { key: Cookies.get('key'), chatID: chatID.id });
    socket.emit("isMediaChatOpen", { key: Cookies.get('key'), chatID: chatID.id });
    const desconectar = () => {
      socket.disconnect();
    };

    const argumentoHandler = (data) => {
      // lógica do handler
      setResponse(data.message);
    };
    const deletarHandler = (data) => {
      // lógica do handler
      const { mensagem, dataDeletado } = data;
      setNomes(prev => {
        //for(const i of prev){
        //console.log(i)
        //}
        console.log("-----------")
        const novo = prev.filter(nome => { if (nome.mensageId != mensagem) return nome });
        return novo;
      });
    };

    const editarHandler = (data) => {
      // lógica do handler
      const { mensagem, dataEdicao, mensagemNova } = data
      setNomes((prev) =>
        prev.map((msg) =>
          msg.mensageId === mensagem ? { ...msg, mensagem: mensagemNova } : msg
        )
      );
    };

    socket.on("editar", editarHandler);

    socket.on("argumento", argumentoHandler);

    socket.on("deletar", deletarHandler);

    window.addEventListener("beforeunload", desconectar);

    return () => {
      window.removeEventListener("beforeunload", desconectar);
      socket.off("argumento", argumentoHandler);
      socket.off("deletar", deletarHandler);
      socket.off("editar", editarHandler);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [nomes]);

  const [menuAberto, setMenuAberto] = useState(false);
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  async function check(id, id2) {
    const response = await addInChat(id, id2);
    if (response) {
      window.location.reload();
    }
  }

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendsData = await fetchFriends();
        setFriends(friendsData);
      } catch (error) {
        console.error("Erro ao buscar amigos:", error);
      }
    };

    fetchFriendsData();
    const func = async () => {
      const response = await chatDados(chatID.id);
      setChatID(response[0])
      setTipos(response[0].tipo == 1);
      if (await response[0].tipo == 2) { // Se o chat for privado, não contém admins
        return
      }
      const valor = JSON.parse(dados).id;
      const array = response[0].adms.split(",").map(Number);

      if (array.includes(valor)) {
        setAdm(true)
      }
    }
    func()
  }, []);

  useEffect(() => {
    const atuais = chatID.membros.split(",")
    setFilterFriend(friends.filter(obj => !atuais.includes(String(obj.id))))
  }, [friends])

  return (
    <ProtectedRoute>
      <ChatRoute className={styles.divsao}>
        {!conectado && (
          <div>
            <p> A conexão com o servidor foi perdida. </p>
            <p> Por favor, reconecte-se para continuar usando o chat. </p>
            <button
              onClick={() => {
                window.location.reload(); // Recarrega a página para tentar reconectar
              }}
            >
              Reconectar
            </button>
            <p> a</p>
          </div>
        )}
        <div>
          <Link className={styles.link2} href="./contatos"><Image className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>

        </div>
        <div className={styles.cor}>
          <div className={styles.centro}>
            <div className={styles.funciona}>
              <div className={styles.lista}>
                <div className={styles.img_concord} >
                  {menuAberto && (
                    <div className={styles.menuEditar}>
                      <div>
                        <button className={styles.buttonGrande} onClick={() => { toggleMenu() }}> &lt; </button>
                      </div>
                      {tipos &&
                        <div>
                          <p>Adicionar membros</p>
                          <div className={styles.divDasPessoas}>
                            {filterFriend.map((amigo) => (
                              <div key={amigo.id} className={styles.divAmigosEditar}>
                                <img className={styles.img} src={amigo.foto == 0 ? "/images/human.png" : `/images/eclipse${amigo.foto}.png`} alt={amigo.nome} />
                                <p>{amigo.nome}</p>
                                <button onClick={() => { check(amigo.id, chatID.id) }} >Adicionar</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      }

                    </div>
                  )}
                  <Image className={styles.concord} src="/images/concord.png" alt="concord" width={60} height={0} onClick={toggleMenu} />
                </div>

                <button onClick={() => { changeChatType() }} >MudarChat</button>

                {(chatType === "msg") && <div className={styles.flow} ref={listaRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <ul className={styles.arruma}>
                    {nomes.map((nome) => (

                      <li className={styles.conversa} key={nome.mensageId}>
                        <p className={nome.remetente != Cookies.get('key').split("-")[0] ? styles.nomeDoCara : styles.nada}>
                          {nome.mensagem}
                          {(nome.remetente == dados.id) &&
                            <button className={styles.butao} onClick={() => { setVisivel(visivel === nome.mensageId ? null : nome.mensageId) }} ><Image src="/images/editar.png" alt="concord editar" width={20} height={20} /></button>
                          }
                          {((nome.remetente == dados.id) || (adm)) &&
                            <button className={styles.butao} onClick={() => { setVisivel2(visivel2 === nome.mensageId ? null : nome.mensageId) }} ><Image src="/images/deletar.png" alt="concord deletar" width={20} height={20} /></button>
                          }
                        </p>
                        {visivel === nome.mensageId && (
                          <div>
                            <div className={styles.popUp}>
                              <input
                                type="text"
                                defaultValue={nome.mensagem}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    console.log("Enviar o update")
                                    // key, mensagem, chatID, menssageID
                                    socket.emit("editar", {
                                      key: Cookies.get('key'),
                                      mensagem: e.target.value,
                                      chatID: chatID.id,
                                      menssageID: nome.mensageId
                                    })
                                    setVisivel(null);
                                    setVisivel2(null);
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {visivel2 === nome.mensageId && (
                          <div>
                            <div className={styles.popUp}>
                              <button onClick={() => {
                                console.log("Deletar o id : " + nome.mensageId);
                                setVisivel2(null);
                                setVisivel(null);
                                socket.emit("deletar", {
                                  key: Cookies.get('key'),
                                  chatID: chatID.id,
                                  menssageID: nome.mensageId
                                })
                              }
                              }
                              >Deletar</button>
                            </div>
                          </div>
                        )}

                        <div className={styles.flowPodcast}>
                          <img className={styles.img} src={nome.foto == 0 ? "/images/human.png" : `/images/eclipse${nome.foto}.png`} alt={nome.nome} />
                          <p className={styles.nomeDoUsuario}>
                            {nome.nome.length > 10 ? nome.nome.slice(0, 10) + "..." : nome.nome}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>}
                {(chatType === "media") && <div className={styles.flow} ref={listaRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <ul className={styles.arruma}>
                    {!mediaChatOpened && (
                      <div className={styles.mediaChat}>
                        <p>Chat de mídia desligado. Ative agora!</p>

                        <button onClick={() => { openMediaChat(Cookies.get("key"), chatID.id) }} > <Image width={50} height={50} alt="Abrir!" src="/images/openMedia.png" ></Image> </button>

                        {/* Aqui você pode adicionar a lógica para exibir os arquivos de mídia */}
                      </div>
                    )}
                    {mediaChatOpened && (
                      <div>
                        {!inMediaChat && (
                          <div>
                            <p>Você não está no chat de mídia. Entre agora!</p>
                            <button onClick={() => { console.log("Não fiz ainda, perai") }} > <Image width={50} height={50} alt="Abrir!" src="/images/openMedia.png" ></Image> </button>
                          </div>

                        )}
                        {inMediaChat && (
                          <div>
                            {medias.map((media) => (
                              <li className={styles.conversa} key={media.mensageId}>
                                {media.tipo.startsWith("image/") && <img src={media.url} alt={media.arquivoNome} width={200} />}
                                {media.tipo.startsWith("video/") && (
                                  <video controls width={300}>
                                    <source src={media.url} type={media.tipo} />
                                  </video>
                                )}
                                {media.tipo.startsWith("audio/") && (
                                  <audio controls>
                                    <source src={media.url} type={media.tipo} />
                                  </audio>
                                )}
                                {!media.tipo.startsWith("image/") &&
                                  !media.tipo.startsWith("video/") &&
                                  !media.tipo.startsWith("audio/") && (
                                    <a href={media.url} download={media.arquivoNome}>
                                      Baixar {media.arquivoNome}
                                    </a>
                                  )}

                                <div className={styles.flowPodcast}>
                                  <img className={styles.img} src={media.foto == 0 ? "/images/human.png" : `/images/eclipse${media.foto}.png`} alt={media.nome} />
                                  <p className={styles.nomeDoUsuario}>
                                    {media.nome.length > 10 ? media.nome.slice(0, 10) + "..." : media.nome}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </ul>

                </div>}

              </div>


              {(conectado && chatType == "msg") && <div className={styles.arruma3}>
                <input
                  className={styles.busca}
                  type="text"
                  value={mensagens}
                  onChange={(ev) => setMensagens(ev.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mensagem"
                />
                <button className={styles.adiciona} onClick={enviarMensagem}>
                  <Image className={styles.enviar} src="/images/enviar.png" width={70} height={65} alt="sim" />
                </button>
              </div>}

              {(carregado && conectado && chatType == "media") && <div className={styles.arruma3}>
                <EnviarMidia prop={{ chatID: chatID.id, key: Cookies.get("key") }} />
              </div>}

            </div>
          </div>
        </div>
      </ChatRoute>
    </ProtectedRoute>
  );
}

/*
<div>
  <button onClick={() => { socket.disconnect(), setConectado(false) }}>Desconectar do servidor</button>
</div>
*/