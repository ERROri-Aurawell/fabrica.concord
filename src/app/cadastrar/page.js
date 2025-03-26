"use client"
import styles from "./cadastrar.module.css";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function Cadastrar() {
    const [afterLogin, setAfterLogin] = useState(null);
    
    const router = useRouter();

    async function adicionar(response) {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential })
        }

        try {
            const resposta = await fetch('http://localhost:9000/cadastrar', requestOptions);

            const data = await resposta.json();
            Cookies.set('newAccount', data.newAccount, { expires: 1 });
            Cookies.set('IsLogged', true);
            Cookies.set('email, ')

            setAfterLogin(data.newAccount);

        } catch (error) {
            throw new Error(error);
        }


    }

    useEffect(() => {
        console.log(Cookies.get());

        const IsLogged = !!Cookies.get('IsLogged');
        const newAccount = Cookies.get('newAccount');
        if (afterLogin == null) {

            if (IsLogged == true) {
                router.push('/contatos');
            }

        } else {
            if (newAccount == "true") {
                router.push('/perfil'); //MUDAR ESSA ROTA QUE TÁ ERRADO PELO AMOR DE dEUS
                
            } else{
                router.push('/contatos');
            }
        }

    }, [afterLogin])

    return (
        <section className={styles.main}>
            <h1>Crie sua conta</h1>
            <div className={styles.dFundo}>
                <section className={styles.section}>

                    <React.StrictMode>
                        <GoogleOAuthProvider clientId="427290146113-nv1kvo2d9e9iqk0g62n6pkkjoq2rp387.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={(response) => { adicionar(response) }}
                                onError={() => { console.log("Login Failed.") }}
                            />
                        </GoogleOAuthProvider>
                    </React.StrictMode>

                </section>
            </div>
        </section>
    )
}