import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import { db } from '../../firebase'
import Order from './Order'
import './Orders.css'

function Orders() {
  const [orders, setOrders] = useState([])
  const [{ cart, user }, dispatch] = useStateValue()

  useEffect(() => {
    if (user) {
      //pulling oreders from firebase database
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          )
        })
    } else {
      setOrders([])
    }
  }, [])

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__container">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  )
}

export default Orders
