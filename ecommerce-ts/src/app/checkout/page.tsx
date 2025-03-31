"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
  useEffect(() => {
    async function handleCheckout() {
      try {
        const response = await fetch("/api/checkout", {  // Chamando a API que está na pasta `api/checkout`
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [
              { name: "Produto Teste", price: 1000, quantity: 1 },
            ],
          }),
        });

        const data = await response.json();

        if (data.url) {
          window.location.href = data.url; // Redireciona para o Stripe
        } else {
          console.error("Erro ao processar checkout:", data.error);
        }
      } catch (error) {
        console.error("Erro inesperado:", error);
      }
    }

    handleCheckout();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🛍️ Checkout</h1>
      <p>Redirecionando para o pagamento...</p>
    </div>
  );
}
