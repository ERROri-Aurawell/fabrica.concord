"use client";
import { useState, useEffect } from "react";
import styles from "./pesquisa.module.css";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Cookies from 'js-cookie';

export default function filtro() {

  const [usuarios, setUsuarios] = useState([])

  const getUsuarios = async () => {
    const conteudo = await fetch(`http://localhost:9000/buscar/${Cookies.get('key')}`);
    if (!conteudo.ok) {
        throw new Error('Erro ao buscar:' + conteudo.statusText);
    }
    const data = await conteudo.json();
    setUsuarios(data)
}

useEffect(() => {
  getUsuarios();
}, [])


  return (
    <ProtectedRoute>
      <div className={styles.cor}>
        <div className={styles.centro}>


          <div className={styles.lista}>
            <div className={styles.arruma2}>

              {/* 
                <div className={styles.pes_filtro}>

                    <input
                    className={styles.pesquisa2}
                    value={busca2}
                    type="text"
                    onChange={(ev) => setBusca2(ev.target.value)}
                    placeholder="Pesquisar filtro"
                    />
                    

                    <div className={styles.fil_sele}>
                        <p className={styles.texfil}>Filtros selecionados: <strong>{filtrosSelecionados.length > 0 ? filtrosSelecionados.join(", ") : "Nenhum"}</strong></p>
                    </div>
                    

                </div>   
                

                <div className={styles.filtros}>
                    <ul className={styles.fil}>
                    
                    {filtroBusca.map((filtro, index) => (
                        <li key={index} className={styles.itemFiltro}>
                        <label className={styles.radioLabel}>
                            <input
                            className={styles.filtro}
                            type="checkbox"
                            value={filtro}
                            checked={filtrosSelecionados.includes(filtro)}
                            onChange={() => toggleFiltro(filtro)}
                            />
                            {filtro}
                        </label>
                        </li>
                    ))}
                    
                    </ul>
                </div>
                */}



            </div>
          </div>
{/*
          <input
            className={styles.pesquisa}
            value={busca}
            type="text"
            onChange={(ev) => setBusca(ev.target.value)}
            placeholder="Pesquisar usuário"
          />
*/}

          <ul className={styles.arruma}>
            {usuarios.map(usuario => (
              <li key={usuario.id}>

                <p>{usuario.foto} </p> 
                <Link href="perfil" >{usuario.nome}</Link>

              </li>
            ))}
          </ul>



        </div>
      </div>
    </ProtectedRoute>
  );
}