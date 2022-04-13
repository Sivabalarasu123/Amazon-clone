import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import CheckoutProduct from '../checkout/CheckoutProduct'
import { getCartTotal } from '../../Reducer'
import CurrencyFormat from 'react-currency-format'
// import instance from '../../axios'
import axios from '../../axios'
import { db } from '../../firebase'
import './Payment.css'

function Payment() {
  const [{ cart, user }, dispatch] = useStateValue()

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState('')
  const [clientSecret, setClientSecret] = useState(true)

  console.log('person ====>', user)

  useEffect(() => {
    //generate the spl stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //stripe expects the total in a currencies subunits, so only *100
        url: `/payments/create?total=${getCartTotal(cart)} `,
      })
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  }, [cart])

  console.log('The secret key is ', clientSecret)

  const submitHandler = async (event) => {
    //stripe
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        //nosql data collection
        db.collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          })

        setSucceeded(true)
        setError(null)
        setProcessing(false)
        dispatch({
          type: 'EMPTY_CART',
        })
        navigate('/orders')
      })
  }
  //card number -- 424242424242
  //date - 04/24
  //cvv - 242
  //zip - 424

  const changeHandler = (event) => {
    //listen  for changing in the card element
    //and display any error at the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{cart?.length} items</Link>)
        </h1>
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user.email}</p>
            <p>Muhilankudieruppu</p>
            <p>Agastheeswaram</p>
            <p>Kanyakumari 629701</p>
          </div>
        </div>

        {/* Payment section-review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {/* products in the cart */}
            {cart.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic */}
            <form onSubmit={submitHandler}>
              <CardElement onChange={changeHandler} />
              <div className="payment__pricecontainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h4>Order Total: {value}</h4>
                    </>
                  )}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  // value={getCartTotal(cart)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'₹​'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {/* error*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
