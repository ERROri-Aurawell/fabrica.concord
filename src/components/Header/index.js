'use client'
import styles from "./Header.module.css"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from "next/image"
export default function Header() {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={`${styles.header} ${menuOpen ? styles.menuOpen : ''}`}>
            <div >

                {<Image className={styles.img} src='/images/logo.png' alt="Concord" width={40} height={40}/>}
                
            </div>
            <div className={styles.dConcord}>
                    <h1 className= {styles.h1}>Con<span className={styles.span}>cord</span></h1>
                    <p className={styles.paragráfo}>Chat online</p>
                </div>
    


        
        </header>
    );
}
