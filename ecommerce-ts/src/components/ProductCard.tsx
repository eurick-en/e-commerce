"use client";

import { useCartStore } from "@/store/cart";
import Image from "next/image";

type ProductProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, name, price, image }: ProductProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    alert(`Produto adicionado ao carrinho: ${name}`);
    console.log(`✅ Produto adicionado ao carrinho: ${name}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Atualizando para usar next/image */}
      <div className="relative w-full h-40">
        <Image src={image} alt={name} layout="fill" objectFit="cover" className="rounded-md" />
      </div>
      
      <h2 className="text-red-700">{name}</h2>
      <p className="text-black font-bold">R$ {price.toFixed(2)}</p>
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={handleAddToCart}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
