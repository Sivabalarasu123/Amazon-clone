import React from 'react'
import { useStateValue } from '../../StateProvider'
import './Product.css'

function Product({ id, title, image, price, rating }) {
  const [{ cart }, dispatch] = useStateValue()

  const addToCart = () => {
    //dispatch some actions to add cart
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: id,
        price: price,
        title: title,
        image: image,
        rating: rating,
      },
    })
  }
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <strong>&#x20B9;</strong>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt="the lean startup Book" />

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}

export default Product
