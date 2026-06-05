import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([
    // Yeh aapka pehle ka static data backup hai
    {
      id: 'ORD-001',
      date: '2026-05-20',
      total: 'Rs. 12,500',
      status: 'Delivered',
      items: ['Laptop Case', 'USB Cable'],
      progress: 100,
    },
    {
      id: 'ORD-002',
      date: '2026-05-18',
      total: 'Rs. 8,300',
      status: 'In Transit',
      items: ['Wireless Mouse', 'Keyboard'],
      progress: 75,
    }
  ]);

  // Cart page se is function ko call karenge
  const addOrder = (cartItems, totalAmount) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, // Random Unique ID
      date: new Date().toISOString().split('T')[0], // Aaj ki date
      total: `Rs. ${totalAmount.toLocaleString()}`,
      status: 'Processing',
      items: cartItems,
      progress: 20,
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]); // Naya order top par dikhega
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);