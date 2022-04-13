import Header from './components/header/Header'
import './App.css'
import Home from './components/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './components/checkout/Checkout'
import Login from './components/login/Login'
import Payment from './components/payment/Payment'
import Orders from './components/orders/Orders'
import { useEffect } from 'react'
import { auth } from './firebase'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useStateValue } from './StateProvider'

const promise = loadStripe(
  'pk_test_51KmghfSALgQIPyo1oEn627xgv5FLvzGvtAZAwBhRjyc5rJBJEesDKF8tD5vx7VS4M6jjhEOfbVSdwb0koscONwgu00rlhRvsJ0',
)

function App() {
  const [{}, dispatch] = useStateValue()
  useEffect(() => {
    //will only run once when the app components loads.
    auth.onAuthStateChanged((authUser) => {
      //console.log('User is', authUser)

      if (authUser) {
        //the user just logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        //the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={[<Header />, <Home />]} />
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          />
          <Route path="/orders" element={[<Header />, <Orders />]} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
