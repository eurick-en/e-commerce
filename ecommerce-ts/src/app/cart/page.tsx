"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link"; 

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🛒 Meu Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between p-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg">{item.name}</h2>
                <p className="text-gray-700 font-bold">R$ {item.price.toFixed(2)}</p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeFromCart(item.id)}
              >
                ❌ Remover
              </button>
            </div>
          ))}

          {/* Exibindo o total do carrinho */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-semibold">R$ {totalAmount.toFixed(2)}</span>
          </div>

          {/* Botão de limpar o carrinho */}
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={clearCart}
          >
            🗑 Limpar Carrinho
          </button>

          {/* Botão de pagamento */}
          <div className="mt-6">
            {cart.length > 0 && (
              <Link href="/checkout">
                <button className="w-full py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
                  Pagar e ir para o Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Botão fixo para voltar para a Home */}
      <div className="fixed bottom-4 left-4 w-full max-w-xs">
        <Link href="/">
          <button className="w-full py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition duration-300">
            Voltar para a Home
          </button>
        </Link>
      </div>
    </div>
  );
}
