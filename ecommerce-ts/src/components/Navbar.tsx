"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="bg-blue text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Loja Virtual
      </Link>
      <Link href="/cart" className="relative">
        🛒 Carrinho <span>({cart.length})</span> {}
      </Link>
    </nav>
  );
}
