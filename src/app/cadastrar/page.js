"use client"
import styles from "./cadastrar.module.css";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function Cadastrar() {
    const [rotacao, setRotacao] = useState(0);
    const [rotacaoGoogle, setRotacaoGoogle] = useState(0);
    const [rotacaoForm, setRotacaoForm] = useState(0);
    const [usarOgoogle, setUsarGoogle] = useState(false);
    const [afterLogin, setAfterLogin] = useState(null);
    const [textoBotao, setTextoBotao] = useState("Usar Google");
    const [temKey , setTemKey] = useState('');

    const girar = () => {
        setTextoBotao((prev) => prev === "Usar Google" ? "Usar Formulário" : "Usar Google");
        handleGoogleLogin();
        setRotacao((prev) => prev - 180);
        setRotacaoGoogle(rotacaoGoogle + 180);
        setRotacaoForm((prev) => prev + 180);
    };

    const handleGoogleLogin = () => {
        setUsarGoogle(!usarOgoogle);
    };

    const router = useRouter();

    async function search(formData) {
        if (formData.get("Csenha") != formData.get("senha")) {
            alert("As senhas não coincidem!");
            return;
        }

        const dados = [formData.get("nome"), formData.get("email"), formData.get("senha"), formData.get("caxinhaDoDiabo")]

        adicionar2(dados)
    }

    async function adicionar2(dados) {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "nome": `${dados[0]}`,
                "email": `${dados[1]}`,
                "senha": `${dados[2]}`
            })
        }

        try {
            const resposta = await fetch('https://apiconcord.dev.vilhena.ifro.edu.br/cadastrar', requestOptions);
            if (resposta.ok) {
                const data = await resposta.json();
                if (dados[3] == "on") {
                    Cookies.set('key', data.key)
                    setTemKey(data.key);
                } else {
                    Cookies.set('key', data.key, { expires: 1 })
                    setTemKey(data.key);
                }

                

                setAfterLogin(data.newAccount);
            }


        } catch (error) {
            console.log(error);
            throw new Error(error);
        }


    }

    function splitKEY(key) {
        const [id, ...rest] = key.split("-");
        const after = rest.join("-");
        const [email, ...rest2] = after.split("-");
        const senha = rest2.join('-');

        return [id, email, senha];
    }

    async function getData() {
        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        try {
            const resposta = await fetch(`https://apiconcord.dev.vilhena.ifro.edu.br/user/${splitKEY(temKey)[0]}`, requestOptions);
            if (resposta.ok) {
                // mano?
                const data = await resposta.json();
                Cookies.set("userData", JSON.stringify(data))

            }


        } catch (error) {
            throw new Error(error);
        }
    }

    async function adicionar(response) {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential })
        }

        try {
            //Mandei essa porra atualizar
            const rota = "https://apiconcord.dev.vilhena.ifro.edu.br"
            //const rota = "http://localhost:9000"

            const resposta = await fetch(`${rota}/cadastrar/google`, requestOptions);
            if (resposta.ok) {
                // mano?
                const data = await resposta.json();
                Cookies.set('newAccount', data.newAccount, { expires: 1 });
                Cookies.set('key', data.key)

                setTemKey(data.key);

                setAfterLogin(data.newAccount);
            }


        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        if (temKey !== '') {
            getData();
        }

    }, [temKey])

    useEffect(() => {
        const IsLogged = !!Cookies.get('key');
        const newAccount = Cookies.get('newAccount');
        if (afterLogin == null) {

            if (IsLogged == true) {
                router.push('/contatos');
            }

        } else {
            if (newAccount == "true") {
                router.push('/login2');

            } else {
                router.push('/contatos');
            }
        }

    }, [afterLogin])

    return (
        <section className={styles.main}>
            <h1>Crie sua conta</h1>
            <div className={styles.dFundo}>
                <section className={styles.section}>

                    <button onClick={girar} className={styles.button}>{textoBotao}</button>

                    <section style={{
                        transform: `rotate(${rotacao}deg)`,
                        transition: "transform 0.3s ease",
                    }}>

                        {usarOgoogle && <div style={{
                            transform: `rotate(${rotacaoGoogle}deg)`,
                            transition: "transform 0.3s ease",
                            margin: "none",
                            border: "none",
                            padding: "none"

                        }}>
                            <React.StrictMode>
                                <GoogleOAuthProvider clientId="427290146113-nv1kvo2d9e9iqk0g62n6pkkjoq2rp387.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={(response) => { adicionar(response) }}
                                        onError={() => { console.log("Login Failed.") }}
                                    />
                                </GoogleOAuthProvider>
                            </React.StrictMode>
                        </div>}

                        {!usarOgoogle && <form className={styles.form} action={search} style={{
                            transform: `rotate(${rotacaoForm}deg)`,
                            transition: "transform 0.3s ease",
                        }}>

                            <label className={styles.label}>Nome:</label>
                            <input type="name" id="nome" name="nome" required />

                            <label className={styles.label}>Email:</label>
                            <input type="email" id="email" name="email" required />

                            <label className={styles.label}>Senha:</label>
                            <input type="password" id="senha" name="senha" required />

                            <label className={styles.label}>Confirmar senha:</label>
                            <input type="password" id="Csenha" name="Csenha" required />

                            <p className={styles.checkbox}> <input name="caxinhaDoDiabo" type="checkbox" className={styles.ls}></input> Manter conectado?</p>
                            <input type="submit" className={styles.botao} value="Entrar" />

                        </form>}


                    </section>
                        <p>Já possui conta? <Link href="./login" > Faça login </Link></p>
                </section>

            </div>
        </section>
    )
}