import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { getCartTotal } from '../../Reducer'
import { useStateValue } from '../../StateProvider'
import { useNavigate } from 'react-router-dom'
import './Subtotal.css'

function Subtotal() {
  const [{ cart }, dispatch] = useStateValue()
  const navigate = useNavigate()
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({cart.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        // value={getCartTotal(cart)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'₹​'}
      />
      <button onClick={(e) => navigate('/payment')}>Proceed to Checkout</button>
      <h6>*Kindly Don't refresh the page</h6>
    </div>
  )
}

export default Subtotal
