import Cookies from 'js-cookie';  
  
export async function fetchFriends() {
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