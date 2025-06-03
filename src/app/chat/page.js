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

  const [chatID, setChatID] = useState(JSON.parse(Cookies.get('chatID')))
  console.log("ID:", chatID.id, "Nome:", chatID.nome, "Foto:", chatID.foto);

  const [nomes, setNomes] = useState([]);
  const [busca, setBusca] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const listaRef = useRef(null);

  const nomesBusca = nomes.filter((nome) =>
    nome.toLowerCase().includes(busca.toLowerCase())
  );

  const adicionarNome = () => {
    if (novoNome.trim() !== '') {
      setNomes([...nomes, novoNome]);
      setNovoNome('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      adicionarNome();
    }
  };


  useEffect(() => {
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [nomes]);


  const [data, setData] = useState({
    "key": `${Cookies.get('key')}`,
    "nome": ``,
    "mensagem": "Oitava? mensagem por outro protocolo",
    "chatID": 1
  })

  //socket.emit("addMessage", data);

  const [response, setResponse] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("argumento", (data) => {
      setResponse(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("teste", { mensagem: "Olá, servidor!" });
  };

  return (
    <ProtectedRoute>
      <ChatRoute>

        <div>
          <button onClick={sendMessage}>Enviar mensagem</button>
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
                    {nomesBusca.map((nome, i) => (
                      <li className={styles.conversa} key={i}>
                        {nome}
                        <img className={styles.img} src="/images/human.png" alt={nome} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.arruma3}>
                <input
                  className={styles.busca}
                  type="text"
                  value={novoNome}
                  onChange={(ev) => setNovoNome(ev.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mensagem"
                />
                <button className={styles.adiciona} onClick={adicionarNome}>
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
