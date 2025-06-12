"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.css";
import Image from "next/image";
import ProtectedRoute from '@/components/ProtectedRoute';
import ChatRoute from '@/components/chatRoute';
import Link from "next/link";
import Cookies from 'js-cookie';
import socket from "./socket";

export default function Chat() {
  const [conectado, setConectado] = useState(true);
  const chatIDCookie = Cookies.get('chatID');
  const [chatID, setChatID] = useState(chatIDCookie ? JSON.parse(chatIDCookie) : null);
  const [nomes, setNomes] = useState([]);
  const [mensagens, setMensagens] = useState([]);
  const listaRef = useRef(null);

  const [data, setData] = useState({})


  const adicionarNome = () => {
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    setNomes([...nomes, { mensagem: `${hora} : ${minutos} : ${segundos}`, remetente: "LocalTest" }]);
  };


  socket.on("historico", async (response) => {
    console.log("Nova mensagem recebida:", response.response);
    setNomes(response.response);
  });

  socket.on("newMessage", (response) => {
    console.log("Nova mensagem recebida:", response.response);
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
      console.log("Mensagem enviada:", data);
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
    console.log("ID:", chatID.id, "Nome:", chatID.nome, "Foto:", chatID.foto);

    setData({
      "key": `${Cookies.get('key')}`,
      "mensagem": "",
      "chatID": chatID.id
    })

    socket.connect();
    console.log("Conectado ao servidor Socket.IO");

    socket.on("argumento", (data) => {
      setResponse(data.message);
    });

    socket.emit("todas", { key: Cookies.get('key'), chatID: chatID.id });

    return () => {
      socket.disconnect();
    };
    
  }, []);

  useEffect(() => {
    console.log("Adicionando nome:", nomes);
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [nomes]);

  socket.on('disconnect', () => {
    setConectado(false);
  });

  socket.on("reconnect", (attemptNumber) => {
    socket.emit("reconnect", { key: Cookies.get('key'), chatID: chatID.id });
    console.log("Evento 'reconnect' emitido automaticamente após reconexão", attemptNumber);
  });

  return (
    <ProtectedRoute>
      <ChatRoute className={styles.divsao}>
        <div>
          <button onClick={() => { socket.disconnect(), setConectado(false) }}>Desconectar do servidor</button>
        </div>


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
          </div>
        )}
        <div>
          <Link className={styles.link2} href="./contatos"><Image className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>

        </div>
        <div className={styles.cor}>
          <div className={styles.centro}>
            <div className={styles.funciona}>
              <div className={styles.lista}>
                <div className={styles.img_concord}>
                  <Image className={styles.concord} src="/images/CONCORD.png" alt="concord" width={60} height={0} />
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
