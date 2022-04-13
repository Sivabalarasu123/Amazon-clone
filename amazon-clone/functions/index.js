const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const { request, response } = require('express')
const stripe = require('stripe')(
  'sk_test_51KmghfSALgQIPyo1bOBtJDJwPkruDk82RfCe5NGmShwwQEmd1Wz1vmZHkoRRDNHZskkiyRjVkIdU8G6UQVLQsSDR00HU9gtmm1',
)

//API

//App config
const app = express()

//Middleware
app.use(cors({ origin: true }))
app.use(express.json())

// Api route
app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post('/payments/create', async (request, response) => {
  //total query n payment.js
  const total = request.query.total
  console.log('Payment request recieved', total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of currency
    currency: 'inr',
  })
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  }) //everything is OK
})

// Listen command
exports.api = functions.https.onRequest(app)

//example endpoint
//http://localhost:5001/clone-fb65a/us-central1/api
