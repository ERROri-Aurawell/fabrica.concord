import Cookies from 'js-cookie';
const rota = "https://apiconcord.dev.vilhena.ifro.edu.br";
// const rota = "http://localhost:9000";
const key = Cookies.get('key');

export async function fetchFriends() {
  const requestOptions = {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  };
  try {
    const response = await fetch(`${rota}/friends/${key}`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      //console.log("Amigos:", data);

      if (data.length === 0) {
        return []; // Return an empty array if no friends found
      } else {
        return data; // Return the list of friends
      }
    } else {
      console.error("Failed to fetch friends:", response);
    }
  }
  catch (error) {
    console.error("Error fetching friends:", error);
  }
}

export async function addInChat(pessoaId, chatId) {
  console.log(`Adicionar o ${pessoaId} no chat_${chatId}`);

  const requestOptions = {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "userID": pessoaId, "chatID": chatId })
  };
  try {
    const response = await fetch(`${rota}/addInChat/${key}`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log("Amigos:", data);

      return true

    } else {
      const data = await response.json();
      alert(data.response +" : err "+ response.status)
    }
  }
  catch (error) {
    console.error("Error :", error);
  }
}

export async function chatDados(chatId) {
  const response = await fetch(`${rota}/chatInfo/${key}/${chatId}`)
  if (response.ok) {
    const data = await response.json();

    console.log("-------------\ndados do grupo : ")
    console.log(data)

    return data
  } else {
    return []
  }
}