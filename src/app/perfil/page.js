import React, { Suspense } from 'react'; 
import ChatCard from "./chatCard";

export default function PerfilPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ChatCard />
    </Suspense>
  );
}
