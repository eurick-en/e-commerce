import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// A chave secreta do Stripe (substitua com a chave correta)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

// Função para lidar com a requisição POST
export async function POST(req: Request) {
  try {
    // Recupera os itens do corpo da requisição
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Nenhum item no carrinho' }, { status: 400 });
    }

    // Cria a sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: 'brl',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 0.1 ), // Convertendo para centavos
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    // Retorna a URL do Stripe para o frontend
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de pagamento:', error);
    return NextResponse.json({ error: 'Erro ao criar sessão de pagamento' }, { status: 500 });
  }
}
