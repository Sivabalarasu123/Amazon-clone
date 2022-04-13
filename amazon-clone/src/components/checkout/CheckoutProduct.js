import React from 'react'
import { useStateValue } from '../../StateProvider'

import './CheckoutProduct.css'

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ cart }, dispatch] = useStateValue()
  const removeFromCart = () => {
    //remove cart item
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: id,
    })
  }

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <strong>₹{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromCart}>Remove from Cart</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
