"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const products = [
  { id: 1, name: "Camisa Nike", price: 49.99, image: "/img/OIP.jpeg" },
  { id: 2, name: "Relógio Smart", price: 79.99, image: "/img/relogio_nike.jpeg" },
  { id: 3, name: "Tênis Nike", price: 99.99, image: "/img/tenis_nikee.jpeg" },
  { id: 4, name: "Boné Adidas", price: 39.99, image: "/img/bone_adidas.jpeg" },
  { id: 5, name: "Mochila Puma", price: 89.99, image: "/img/mochila_puma.jpeg" },
  { id: 6, name: "Óculos Esportivo", price: 59.99, image: "/img/oculos_sport.jpeg" }
];

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">🛍 Loja Virtual</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
}
