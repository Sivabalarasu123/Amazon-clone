import React from 'react'
import moment from 'moment'
import './Order.css'
import CheckoutProduct from '../checkout/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal } from '../../Reducer'

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      {/* moment - for parsing any timestamp */}
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY,h:mma')}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.cart?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order__total">Order Total:{value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount}
        // value={getCartTotal(cart)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₹​'}
      />
    </div>
  )
}

export default Order
