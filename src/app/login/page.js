"use client"
import styles from "./login.module.css"
import Image from "next/image"
import Link from "next/link"
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function login() {
    const [afterLogin, setAfterLogin] = useState(null);
    const [temKey, setTemKey] = useState('');
    const router = useRouter();

    const rotaDev = "http://localhost:9000"
    const rotaProd = "https://apiconcord.dev.vilhena.ifro.edu.br"
    const URL = process.env.NODE_ENV === "development" ? rotaDev : rotaProd;

    async function search(formData) {
        const dados = [formData.get("email"), formData.get("senha"), formData.get("caxinhaDoDiabo")]

        adicionar(dados)
    }

    async function getData() {
        const requestOptions = {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }
        try {
            const resposta = await fetch(`${URL}/user/${temKey}`, requestOptions);
            if (resposta.ok) {
                // mano?
                const data = await resposta.json();
                Cookies.set("userData", JSON.stringify(data))

            }


        } catch (error) {
            throw new Error(error);
        }
    }

    async function adicionar(dados) {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": `${dados[0]}`,
                "senha": `${dados[1]}`
            })
        }

        try {
            const resposta = await fetch(`${URL}/login`, requestOptions);

            if (resposta.ok) {
                // mano?
                const data = await resposta.json();
                //console.log(data.key)

                if (dados[4] == "on") {
                    Cookies.set('key', JSON.stringify(data.key))
                    setTemKey(data.key.id);
                } else {
                    Cookies.set('key', JSON.stringify(data.key), { expires: 1 })
                    setTemKey(data.key.id);
                }

                setAfterLogin(data.newAccount);
            }


        } catch (Error) {
            throw new Error(Error.message);
        }


    }

    useEffect(() => {
        if (temKey != '') {
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

            <h1>Bem vindo de volta!</h1>
            <div className={styles.dFundo}>

                <div className={styles.section}>
                    <div>
                        <form className={styles.form} action={search}>
                            <label className={styles.label}>Email:</label>
                            <input type="email" id="email" name="email" required />

                            <label className={styles.label}>Senha:</label>
                            <input type="senha" id="senha" name="senha" required />

                            <p className={styles.checkbox}> <input name="caxinhaDoDiabo" type="checkbox" className={styles.ls}></input> Manter conectado?</p>
                            <input type="submit" className={styles.botao} value="Entrar" />

                        </form>

                    </div>


                    <div className={styles.cadastrar}>
                        <p>Não possui uma conta? <Link className={styles.lc} href="./cadastrar">Cadastrar-se</Link></p>
                    </div>


                    <div className={styles.dVoltar}>
                        <Link className={styles.lv} href="./contatos"><Image className={styles.img} src="/images/return.png" alt="sim" width={30} height={30} /> Voltar</Link>
                    </div>
                </div>

            </div>
        </section>
    )
}