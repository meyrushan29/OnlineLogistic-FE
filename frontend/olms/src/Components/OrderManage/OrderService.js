import React, { useState } from 'react';
import './OrderService.css'; // Import CSS file for component styling

const OrderService = () => {
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  
  const handleNewOrderClick = () => {
    setShowNewOrderForm(true);
  };

  const handleOrderHistoryClick = () => {
    // Handle navigation to order history page or display order history
    console.log('Navigate to order history');
  };

  const handleCancelNewOrder = () => {
    setShowNewOrderForm(false);
  };

  const handleNewOrderSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('New order submitted');
  };

  return (
    <div className="order-service-container">
      <h1>Order Service Page</h1>
      <div className="button-container">
        <button onClick={handleNewOrderClick}>New Order</button>
        <button onClick={handleOrderHistoryClick}>Order History</button>
      </div>
      {showNewOrderForm && (
        <form onSubmit={handleNewOrderSubmit} className="new-order-form">
          <h2>New Order Form</h2>
          {/* Form fields go here */}
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancelNewOrder}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrderService;
