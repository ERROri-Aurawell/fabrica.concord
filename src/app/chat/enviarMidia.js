import React, { useState } from "react";
import socket from "./socket";

function EnviarMidia({ prop }) {
    const { key, chatID } = prop;
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const enviarArquivo = () => {
        if (!file || file.size > 3 * 1024 * 1024) {
            alert("Selecione um arquivo até 3MB.");
            return;
        }

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
            <input type="file" onChange={handleChange} />
            <button onClick={enviarArquivo}>Enviar Mídia</button>
        </div>
    );
}

export default EnviarMidia;
