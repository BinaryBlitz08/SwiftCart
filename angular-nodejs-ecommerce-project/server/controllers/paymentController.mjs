import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';
import catchAsync from '../utils/catchAsync.mjs';
import Order from '../models/Order.mjs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = catchAsync(async (req, res, next) => {
  console.log("✅ Received req.body:", req.body);

  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid items sent in request' });
  }

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd', // Change to 'inr' if using Indian account
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round(item.price * 100), // Convert dollars to cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:4200/check-out?success=true',
    cancel_url: 'http://localhost:4200/check-out?cancel=true',
    metadata: {
      userId: req.body.userId,
      address: JSON.stringify(req.body.address),
      cart: JSON.stringify(req.body.items),
      totalPrice: req.body.totalPrice?.toString() || '0',
    },
  });

  res.status(200).json({ url: session.url }); // ✅ This goes after session is created
});