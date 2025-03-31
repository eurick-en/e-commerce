"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const router = useRouter(); // Hook para navegação

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      try {
        const response = await fetch(`/api/session?session_id=${sessionId}`);
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Erro ao buscar sessão:", error);
      }
      setLoading(false);
    };

    fetchSession();

    // Redireciona para a página inicial após 5 segundos
    setTimeout(() => {
      router.push("/"); // Navega para a home
    }, 5000); // 5 segundos
  }, [sessionId, router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🎉 Compra realizada com sucesso!</h1>
      {loading ? (
        <p>Voltando para Home...</p>
      ) : session ? (
        <div>
          <p>Obrigado pela sua compra!</p>
          <p>ID da transação: {session.id}</p>
          <p>Total pago: R$ {(session.amount_total / 100).toFixed(2)}</p>
        </div>
      ) : (
        <p>Não foi possível encontrar detalhes da compra.</p>
      )}
    </div>
  );
}
