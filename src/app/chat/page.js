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

  const chatIDCookie = Cookies.get('chatID');
  const [chatID, setChatID] = useState(chatIDCookie ? JSON.parse(chatIDCookie) : null);
  const [nomes, setNomes] = useState([]);
  const [busca, setBusca] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const listaRef = useRef(null);

  const [data, setData] = useState({})

  //const nomesBusca = nomes;

  const adicionarNome = () => {
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    const segundos = data.getSeconds();
    setNomes([...nomes, { mensagem: `${hora} : ${minutos} : ${segundos}`, remetente: "LocalTest" }]);
  };

  /*
    .filter((nome) =>
      nome.toLowerCase().includes(busca.toLowerCase())
    )
  */

  socket.on("historico", async (response) => {
    console.log("Nova mensagem recebida:", response.response);
    setNomes(response.response);
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

  const [response, setResponse] = useState("");

  useEffect(() => {
    console.log("ID:", chatID.id, "Nome:", chatID.nome, "Foto:", chatID.foto);

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

  const sendMessage = () => {
    socket.emit("teste", { mensagem: "Olá, servidor!" });
  };

  useEffect(() => {
    console.log("Adicionando nome:", nomes);
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [nomes]);

  return (
    <ProtectedRoute>
      <ChatRoute className={styles.divsao}>

        <div>
          <button onClick={sendMessage}>Enviar mensagem</button>
          <button onClick={adicionarNome}> Test Button</button>
          <p>Resposta do servidor: {response}</p>
        </div>


        <div>
          <Link className={styles.link2} href="./cadastrar"><Image className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>

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
                        {nome.mensagem} {/* or another property like nome.remetente */}
                        <img className={styles.img} src="/images/human.png" alt={nome.remetente} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>


              <div className={styles.arruma3}>
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
              </div>
            </div>
          </div>
        </div>
      </ChatRoute>
    </ProtectedRoute>
  );
}
