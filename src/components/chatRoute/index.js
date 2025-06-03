
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ChatRoute = ({ children }) => {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(null); 

  useEffect(() => {
    const isLoggedIn = Cookies.get('chatID'); 

    setUserLoggedIn(!!isLoggedIn); 
    if (userLoggedIn === false) {
      router.push('/contatos'); 
    }
  }, [router, userLoggedIn]);

  if (userLoggedIn === null) {
    return null;
  }
  if (userLoggedIn === true) {
    return children;
  }
  return null;
};

export default ChatRoute;