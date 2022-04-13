import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Header.css'
import { useStateValue } from '../../StateProvider'

import { auth } from '../../firebase'

function Header() {
  const [{ cart, user }, dispatch] = useStateValue()

  const AuthenticationHandler = () => {
    if (user) {
      auth.signOut()
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://rdwgroup.com/wp-content/uploads/2013/08/Amazon-800x450-1.jpg"
          alt="Amazon logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />

        <FontAwesomeIcon icon={faSearch} className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={AuthenticationHandler} className="header__option">
            <span className="header__optionLineOne">
              {!user && 'Hello Guest'}
              {user && 'Hello' + ' ' + `${user.email}`}
            </span>
            <span className="header__optionLineTwo">
              {user && 'Sign Out'}

              {!user && 'Sign in'}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime </span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="header__optionLineTwo header__basketCount">
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
