'use client'
import styles from "./perfil.module.css";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";

const ChatCard = () => {

  return (
    <ProtectedRoute>
      <div className={styles.card}>
        <div className={styles.chat}>
          <div className={styles.section}>
            <h3 className={styles.h3}>Loren</h3>
            <div className={styles.current}>
              <Image className={styles.img} alt="img" src="/images/fotoDoOutro.png" width={120} height={120} />
            </div>
          </div>

          <p className={styles.p}>
            Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit         </p>
        </div>

        <div className={styles.links}>
          <Link className={styles.botoes} href="./bloqueios">
            <Image className={styles.lbotao} alt="img" src="/images/Block.png" width={60} height={60} />
          </Link>

          <Link className={styles.botoes1} href="./bloqueio">
            <Image className={styles.lbotao1} alt="img" src="/images/Siren.png" width={56} height={56} />
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatCard;
