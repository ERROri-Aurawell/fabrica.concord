"use client";
import { useState } from "react";
import styles from "./pesquisa.module.css";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function filtro() {

  const [nomes, setNomes] = useState(['Usuario 01', 'Usuario 02', 'Usuario 03', 'Usuario 04']);
  const [busca, setBusca] = useState(''); 
  const [filtro, setFiltro] = useState(['Alto', 'Baixo', 'Moreno', 'Homem', 'Mulher', 'Negro', 'Pardo', 'Branco' ])
  const [busca2, setBusca2] = useState('');
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);

  const nomesBusca = nomes.filter((nome) =>
    nome.toLowerCase().includes(busca.toLowerCase())
  );

  const filtroBusca = filtro.filter((filtro) =>
    filtro.toLocaleLowerCase().includes(busca2.toLocaleLowerCase())
    );

    const toggleFiltro = (filtro) => {
        setFiltrosSelecionados((prev) =>
          prev.includes(filtro) ? prev.filter((f) => f !== filtro) : [...prev, filtro]
        );
    };

  return (
    <ProtectedRoute>
    <div className={styles.cor}>
      <div className={styles.centro}>

        
        <div className={styles.lista}>
            <div className={styles.arruma2}>


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


           
            
            </div>
        </div>

            <input
                className={styles.pesquisa}
                value={busca}
                type="text"
                onChange={(ev) => setBusca(ev.target.value)}
                placeholder="Pesquisar usuário"
                />

          
            <ul className={styles.arruma}>
              {nomesBusca.map((nome, i) => (
                <li key={i}>

                    
                    <img className={styles.img} src="/images/human.png" alt={nome} />
                    <Link href="perfil" >{nome}</Link>
                    
                </li>
              ))}
            </ul>

              
            
      </div>
    </div>
    </ProtectedRoute>
  );
}