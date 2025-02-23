'use client'
import styles from "./avatar.module.css";
import React, { useState } from 'react';


const avatars = [
  "/images/eclipse1.png",
  "/images/eclipse2.png",
  "/images/fotoDoOutro.png",
  "/images/fotoDePerfil.png",
  "/images/eclipse3.png",
  "/images/eclipse4.png",
  "/images/eclipse5.png",

];

const AvatarSelector = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[6]); // Avatar padrão

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      </div>

      <div className={styles.section}>
        <h3 className={styles.h3}>Avatar atual</h3>
        <div className={styles.current}>
          <img src={selectedAvatar} alt="Avatar Atual"/>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.h3}>Alterar avatar</h3>
        <div className={styles.grid}>
          {avatars.map((avatar, index) => (
            <img
                width={105}
              key={index}
              src={avatar}
              alt={`avatar ${index + 1}`}
              className={`option ${selectedAvatar === avatar ? "selected" : ""}`}
              onClick={() => setSelectedAvatar(avatar)}
            />
          ))}
          
        </div>
      </div>
      <button className={styles.button}> Atualizar avatar</button>

    </div>
  );
};

export default AvatarSelector;
