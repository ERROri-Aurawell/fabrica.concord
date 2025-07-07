"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.css";
import Image from "next/image";
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatRoute from '@/components/chatRoute';
import Link from "next/link";
import Cookies from 'js-cookie';
import socket from "./socket";
import { fetchFriends } from "./otherThings.js";

export default function Chat() {
  const [apaputaquepariu, setVTMNC] = useState(false)
  const [conectado, setConectado] = useState(true);
  const chatIDCookie = Cookies.get('chatID');
  const [chatID, setChatID] = useState(chatIDCookie ? JSON.parse(chatIDCookie) : null);
  const [nomes, setNomes] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const listaRef = useRef(null);

  const [friends, setFriends] = useState([]);

  const [data, setData] = useState({})


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
    if (!chatID) {
      console.error("Chat ID não encontrado. Redirecionando para contatos.");
      window.location.href = "/contatos"; // Redireciona para a página de contatos
      return;
    }


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

  useEffect(() => {
    const fetchFriendsData = async () => {
      try {
        const friendsData = await fetchFriends();
        //console.log(friendsData)
        setFriends(friendsData);
      } catch (error) {
        console.error("Erro ao buscar amigos:", error);
      }
    };

    fetchFriendsData();
  }, []);

  useEffect(() => {
    console.log("Amigos:", friends);
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
                      <p>Editar informações</p>

                      <div>
                        <p>Adicionar membros</p>
                        <div>
                          {friends.map((amigo) => (
                            <div key={amigo.id}>
                              <p>{amigo.nome}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <Image className={styles.concord} src="/images/CONCORD.png" alt="concord" width={60} height={0} onClick={toggleMenu} />
                </div>
                <div className={styles.flow} ref={listaRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <ul className={styles.arruma}>
                    {nomes.map((nome, i) => (

                      <li className={styles.conversa} key={i}>
                        <p className={nome.remetente != Cookies.get('key').split("-")[0] ? styles.nomeDoCara : styles.nada}>
                          {nome.mensagem}
                        </p>

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
    </ProtectedRoute>
  );
}

/*
<div>
  <button onClick={() => { socket.disconnect(), setConectado(false) }}>Desconectar do servidor</button>
</div>
*/