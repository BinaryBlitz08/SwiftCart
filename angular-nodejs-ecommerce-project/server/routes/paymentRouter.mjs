import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.mjs';

const router = express.Router();

// Route to create Stripe checkout session
router.post('/create-checkout-session', createCheckoutSession);

export default router;