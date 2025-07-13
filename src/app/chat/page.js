"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.css";
import Image from "next/image";
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatRoute from '@/components/chatRoute';
import Link from "next/link";
import Cookies from 'js-cookie';
import socket from "./socket";
import { fetchFriends, addInChat, chatDados } from "./otherThings.js";

export default function Chat() {
  const [dados, setDados] = useState(Cookies.get('userData'));
  const [apaputaquepariu, setVTMNC] = useState(false)
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
  const [visivel2, setVisivel2] = useState(null)


  const adicionarNome = () => {
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    setNomes([...nomes, { mensagem: `${hora} : ${minutos} : ${segundos}`, remetente: "LocalTest" }]);
  };


  socket.on("historico", async (response) => {

    setNomes(response.response);
  });

  socket.on("newMessage", (response) => {

    if (response.response.mensagem != "" && response.response.mensagem != undefined) {
      setNomes([...nomes, response.response]);
    }
  });

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

    socket.connect();


    socket.on("argumento", (data) => {
      setResponse(data.message);
    });

    socket.emit("todas", { key: Cookies.get('key'), chatID: chatID.id });

    socket.on("mensagemEditada", ({ id, novaMensagem, dataEdicao }) => {
      console.log("Recebeu o update ai as " + dataEdicao + " Pra editar o " + id);

      setNomes((prev) =>
        prev.map((msg) =>
          msg.mensageId === id ? { ...msg, mensagem: novaMensagem } : msg
        )
      );
    });

    socket.on("apagarMensagem", ({ id, dataEdicao }) => {
      console.log("Recebeu o update ai as " + dataEdicao + " Pra apagar o " + id);

      setNomes((prev) =>
        prev.filter((msg) => msg.mensageId !== id)
      );
    });


    return () => {
      socket.disconnect();
    };

  }, []);

  useEffect(() => {

    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [nomes]);

  socket.on('disconnect', () => {
    setConectado(false);
  });

  socket.on("reconnect", (attemptNumber) => {
    socket.emit("reconnect", { key: Cookies.get('key'), chatID: chatID.id });

  });

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
      //Cookies.set('chatID', JSON.stringify(response[0]), { expires: 0.05 });

      setChatID(response[0])
      setTipos(response[0].tipo == 1);
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
                  <Image className={styles.concord} src="/images/CONCORD.png" alt="concord" width={60} height={0} onClick={toggleMenu} />
                </div>
                <div className={styles.flow} ref={listaRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <ul className={styles.arruma}>
                    {nomes.map((nome) => (

                      <li className={styles.conversa} key={nome.mensageId}>
                        <p className={nome.remetente != Cookies.get('key').split("-")[0] ? styles.nomeDoCara : styles.nada}>
                          {nome.mensagem}
                          {(nome.remetente == dados.id) &&
                            <button className={styles.butao} onClick={() => { setVisivel(visivel === nome.mensageId ? null : nome.mensageId) }} ><Image src="/images/editar.png" alt="concord editar" width={20} height={20} /></button>
                          }
                          {((nome.remetente == dados.id) || (() => {
                            const valor = dados.id;
                            const array = chatID.adms.split(",").map(Number);
                            if (array.includes(valor)) {
                              return true
                            }

                          })) &&
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
                                    socket.emit("editar", {
                                      key: Cookies.get('key'),
                                      mensagem: e.target.value,
                                      chatID: chatID.id,
                                      menssageID: nome.mensageId
                                    });
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
                                console.log("Deletar o id : " + nome.menssageID);
                                setVisivel2(null);
                                setVisivel(null);
                                //socket.emit("editar", {
                                //key: Cookies.get('key'),
                                //mensagem: e.target.value,
                                //chatID: chatID.id,
                                //menssageID: nome.mensageId
                                //});
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
                </div>
              </div>


              {conectado && <div className={styles.arruma3}>
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
            </div>
          </div>
        </div>
      </ChatRoute>
    </ProtectedRoute >
  );
}

/*
<div>
  <button onClick={() => { socket.disconnect(), setConectado(false) }}>Desconectar do servidor</button>
</div>
*/
/* */