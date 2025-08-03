import React, { useState } from "react";
import socket from "./socket";

function EnviarMidia({ prop }) {
    const { key, chatID } = prop;
    const [carregado, setCarregado] = useState(false);
    const [file, setFile] = useState(null);
    const [cooldown, setCooldown] = useState(false);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const enviarArquivo = () => {
        let tempoEnvio = 5000; // Tempo de espera em segundos
        if (!file || file.size > 4 * 1024 * 1024) {
            alert("Selecione um arquivo até 4MB.");
            return;
        }
        if (cooldown) {
            alert("Aguarde antes de enviar outro arquivo.");
            return;
        }
        if (file.size >= 2.5 * 1024 * 1024) {
            alert("Seu arquivo é grande, aguarde um momento até enviar.");
            tempoEnvio = 10000; // Aumenta o tempo de espera para 10 segundos
        }
        setCooldown(true);
        setTimeout(() => setCooldown(false), tempoEnvio); // tempo de cooldown

        const reader = new FileReader();
        reader.onload = () => {
            const buffer = new Uint8Array(reader.result);

            socket.emit("addMedia", {
                chatID,
                key,
                mediaData: {
                    nome: file.name,
                    tipo: file.type,
                    conteudo: Array.from(buffer), // array serializável
                }
            });
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" id="upload" onChange={handleChange} />
            <label htmlFor="upload">Escolher arquivo</label>
            <button onClick={enviarArquivo} disabled={cooldown || !file}>Enviar Mídia</button>
        </div>
    );
}

export default EnviarMidia;
