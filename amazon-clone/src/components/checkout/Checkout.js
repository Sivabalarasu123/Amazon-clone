import Subtotal from '../subtotal/Subtotal'
import CheckoutProduct from './CheckoutProduct'
import './Checkout.css'
import { Link } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'

function Checkout() {
  const [{ cart, user }, dispatch] = useStateValue()
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className=" checkout__ad"
          src="https://static.toiimg.com/thumb/msid-79134641,width-665,resizemode-4/79134641.jpg"
          alt=""
        />
        <div>
          {user && <h4>Hello, {user?.email}</h4>}
          {!user && (
            <h4>
              Please , <Link to="/login">Sign In</Link> to add products into the
              Cart
            </h4>
          )}

          <h2 className="checkout__title">Your Cart</h2>
          {cart.map((item) => (
            <CheckoutProduct
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}

          {/* Checkout product*/}
          {/* Checkout product */}
          {/* Checkout product*/}
        </div>
      </div>

      <div className="checkout__right">
        {/* Subtotal */}
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
