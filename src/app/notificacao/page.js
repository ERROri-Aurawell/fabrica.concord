'use client'
import styles from "./page.module.css";
import React, { useState } from 'react';
import Link from "next/link";

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [messageSounds, setMessageSounds] = useState(true);
  const [messageVibration, setMessageVibration] = useState(true);
  const [groupSounds, setGroupSounds] = useState(true);
  const [groupVibration, setGroupVibration] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="./configuracoes" className={styles.arrow}>←</Link> Ativar Notificações
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      <div className={styles.section}>
        <h3>Mensagens</h3>
        <div className={styles.option}>
          Sons de Notificação
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={messageSounds}
              onChange={() => setMessageSounds(!messageSounds)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.option}>
          Vibração
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={messageVibration}
              onChange={() => setMessageVibration(!messageVibration)}
            />
            <span className={styles.lider}></span>
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Grupos</h3>
        <div className={styles.option}>
          Sons de Notificação
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={groupSounds}
              onChange={() => setGroupSounds(!groupSounds)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.option}>
          Vibração
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={groupVibration}
              onChange={() => setGroupVibration(!groupVibration)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;



