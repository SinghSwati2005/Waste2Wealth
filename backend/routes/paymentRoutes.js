const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.sk_test_Your_Secret_Key); // Replace with your secret key
const nodemailer = require('nodemailer');

//email 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // youremail@gmail.com
    pass: process.env.EMAIL_PASS   // Gmail app password
  }
});

const sendDummyEmail = async (to, transactionId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: '🧾 Your Payment Receipt (Dummy)',
    html: `
      <h3>Thank you for your payment!</h3>
      <p>This is a dummy email confirming your payment with Transaction ID: <strong>${transactionId}</strong>.</p>
      <p>We're always here to help!</p>
    `
  };
  await transporter.sendMail(mailOptions);
};









router.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.listingId.title,
          },
          unit_amount: Math.round(item.listingId.price * 100), // price in paise
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe checkout failed' });
  }
});

router.get('/transaction/:sessionId', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId, {
      expand: ['payment_intent', 'customer'],
    });

    res.json({
      userId: req.body.userId, 
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      payment_status: session.payment_status,
      created: session.created,
    });
     // 👇 Send dummy email if email is found
     if (session.customer_email) {
      await sendDummyEmail(session.customer_email, session.id);
    }

  
  } catch (err) {
    console.error('Stripe fetch error:', err);
    res.status(500).json({ error: 'Unable to fetch transaction' });
  }
});

module.exports = router;
