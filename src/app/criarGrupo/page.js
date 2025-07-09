'use client'
import styles from "./criarGrupo.module.css";
import { useState, useEffect } from 'react';
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
function App() {
  const [busca, setBusca] = useState('');
  const [friendList, setFriendList] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const router = useRouter();

  const nomesBusca = friendList.filter(friend =>
    friend.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function handleSubmit(event) {
    event.preventDefault();
    const groupName = event.target.groupName.value;
    // membros do grupo salvos como "1,2,3,4"
    const selectedFriends = Array.from(event.target.friends)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    const selectedFriendsString = selectedFriends.join(',');

    if (groupName && selectedFriendsString.length > 0) {
      console.log(groupName, selectedFriendsString);
      createChat(selectedFriendsString, groupName);
    } else {
      alert("Por favor, preencha o nome do grupo e selecione pelo menos um amigo\
  para adicionar ao grupo.");
    }


    event.target.reset();
  }

  async function createChat(usersID, name) {
    const rota = "https://apiconcord.dev.vilhena.ifro.edu.br";
    // const rota = "http://localhost:9000";
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "usersID": usersID,
        "type": 1,
        "name": name
      })
    };
    try {
      const key = Cookies.get('key');
      const response = await fetch(`${rota}/createChat/${key}`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        if (data.response) {
          console.log("Grupo criado com sucesso:", data.response);
          // Redirecionar para a página de contatos ou onde for necessário
          router.push('/contatos');
        } else {
          console.error("Erro ao criar grupo:", data);
          alert("Erro ao criar grupo. Tente novamente.");
        }
      }
      else {
        console.error("Failed to create group:", response);
      // se 401, grupo contem usuário bloqueado
        if (response.status === 401) {
          alert("Você não pode criar um grupo com usuários bloqueados.");
        }
        else if (response.status === 403) {
          alert("Você não tem permissão para criar grupos.");
        }
        else if (response.status === 400) {
          alert("Dados inválidos. Verifique o nome do grupo e os amigos selecionados.");
        }
        else if (response.status === 500) {
          alert("Erro interno do servidor. Tente novamente mais tarde.");
        }
        else {
        alert("Erro ao criar grupo. Verifique os dados e tente novamente.");
        }
      }
    }
    catch (error) {
      console.error("Error creating group:", error);
      alert("Erro ao criar grupo. Verifique a conexão e tente novamente.");
    }
  }


  async function fetchFriends() {
    const rota = "https://apiconcord.dev.vilhena.ifro.edu.br";
    // const rota = "http://localhost:9000";

    const key = Cookies.get('key');
    const requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch(`${rota}/friends/${key}`, requestOptions);
      if (response.ok) {
        const data = await response.json();
        if (data.response == []) {
          setFriendList([]);
        } else {
          setFriendList(data);
        }
      } else {
        console.error("Failed to fetch friends:", response);
      }
    }
    catch (error) {
      console.error("Error fetching friends:", error);
    }
  }

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <ProtectedRoute className={styles.contatos_lista}>
      <section className={styles.contatos_lista}>
        <div>
          <Link className={styles.link2} href="./contatos"><Image className={styles.img} alt="img" src="/images/aaaa.png" width={40} height={40}></Image></Link>
        </div>

        <div className={styles.container}>
          <h1 className={styles.title}>Criar Grupo</h1>

          <div className={styles.formContainer}>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="groupName">Nome do Grupo:</label>
              <input className={styles.input} type="text" id="groupName" name="groupName" required />

              <label className={styles.label} htmlFor="friends">Adicionar Amigos:</label>
              {/**O trecho onde mostra os amigos do usuario deve mostrar .nome .foto e ser um campo com caixas de marcação*/}
              <div className={styles.friendsList}>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Buscar amigos..."
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                    setFilteredFriends(nomesBusca);
                  }}
                />
                {friendList.length > 0 ? (
                  nomesBusca.map((friend) => (
                    <div key={friend.id} className={styles.friendItem}>
                      <input className={styles.butao} type="checkbox" id={`friend-${friend.id}`} name="friends" value={friend.id} />
                      <label className={styles.cont} htmlFor={`friend-${friend.id}`}>
                        <Image className={styles.friendImage} src={friend.foto == 0 ? "/images/human.png" : `/images/eclipse${friend.foto}.png`} alt={friend.nome} width={40} height={40} />
                        {friend.nome}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Nenhum amigo encontrado.</p>
                )}
              </div>

              <button className={styles.button} type="submit">Criar Grupo</button>
            </form>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}

export default App;
