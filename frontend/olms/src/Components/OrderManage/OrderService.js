import React, { useState } from 'react';
import { Button } from '@material-ui/core';

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
        <Button variant="contained" color="primary" onClick={handleNewOrderClick}>New Order</Button>
        <Button variant="contained" color="primary" onClick={handleOrderHistoryClick}>Order History</Button>
      </div>
      {showNewOrderForm && (
        <form onSubmit={handleNewOrderSubmit} className="new-order-form">
          <h2>New Order Form</h2>
          {/* Form fields go here */}
          <div className="form-buttons">
            <Button type="submit" variant="contained" color="primary">Submit</Button>
            <Button type="button" variant="contained" color="secondary" onClick={handleCancelNewOrder}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OrderService;
