import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [inventoryId, setInventoryId] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [storageDuration, setStorageDuration] = useState('');
  const [orderId, setOrderId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  // Function to fetch inventory data from the database
  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('your_api_endpoint_here');
      setItems(response.data); // Assuming response.data is an array of inventory items
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  useEffect(() => {
    fetchInventoryData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures it only runs once on mount

  const addItem = () => {
    if (!itemCode || !arrivalDate || !departureDate || !storageDuration || !orderId || !warehouseId) return;

    const newItem = {
      id: Math.random().toString(),
      inventoryId: inventoryId,
      itemCode: itemCode,
      arrivalDate: arrivalDate,
      departureDate: departureDate,
      storageDuration: storageDuration,
      orderId: orderId,
      warehouseId: warehouseId
    };

    setItems([...items, newItem]);
    setInventoryId('');
    setItemCode('');
    setArrivalDate('');
    setDepartureDate('');
    setStorageDuration('');
    setOrderId('');
    setWarehouseId('');
    setEditItemId(null);
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    setEditItemId(null);
  };

  const updateItem = (itemId, updatedItem) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, ...updatedItem };
      }
      return item;
    });

    setItems(updatedItems);
    setEditItemId(null);
  };

  const editItem = (itemId) => {
    setEditItemId(itemId);
    const itemToEdit = items.find(item => item.id === itemId);
    setInventoryId(itemToEdit.inventoryId);
    setItemCode(itemToEdit.itemCode);
    setArrivalDate(itemToEdit.arrivalDate);
    setDepartureDate(itemToEdit.departureDate);
    setStorageDuration(itemToEdit.storageDuration);
    setOrderId(itemToEdit.orderId);
    setWarehouseId(itemToEdit.warehouseId);
  };

  return (
    <div className="container mx-10 px-2 py-8 ml-0" style={{ maxWidth: "1250px", float: "right" }}>
      <h1 className="text-3xl font-bold mb-4">Inventory Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Inventory ID"
          value={inventoryId}
          onChange={(e) => setInventoryId(e.target.value)}
          className="form-control mr-2"
        />
        <input
          type="text"
          placeholder="Item Code"
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
          className="form-control mr-2"
        />
        <input
          type="date"
          placeholder="Arrival Date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          className="form-control mr-2"
        />
        <input
          type="date"
          placeholder="Departure Date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="form-control mr-2"
        />
        <input
          type="text"
          placeholder="Storage Duration"
          value={storageDuration}
          onChange={(e) => setStorageDuration(e.target.value)}
          className="form-control mr-2"
        />
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="form-control mr-2"
        />
        <input
          type="text"
          placeholder="Warehouse ID"
          value={warehouseId}
          onChange={(e) => setWarehouseId(e.target.value)}
          className="form-control mr-2"
        />
        <button onClick={editItemId ? () => updateItem(editItemId, { inventoryId, itemCode, arrivalDate, departureDate, storageDuration, orderId, warehouseId }) : addItem} className="btn btn-primary">{editItemId ? 'Update Item' : 'Add Item'}</button>
        {editItemId && <button onClick={() => setEditItemId(null)} className="btn btn-secondary ml-2">Cancel Edit</button>}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Inventory ID</th>
            <th>Item Code</th>
            <th>Arrival Date</th>
            <th>Departure Date</th>
            <th>Storage Duration</th>
            <th>Order ID</th>
            <th>Warehouse ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.inventoryId}</td>
              <td>{item.itemCode}</td>
              <td>{item.arrivalDate}</td>
              <td>{item.departureDate}</td>
              <td>{item.storageDuration}</td>
              <td>{item.orderId}</td>
              <td>{item.warehouseId}</td>
              <td>
                {editItemId === item.id ?
                  <>
                    <button onClick={() => updateItem(item.id, { inventoryId, itemCode, arrivalDate, departureDate, storageDuration, orderId, warehouseId })} className="btn btn-primary">Save</button>
                    <button onClick={() => setEditItemId(null)} className="btn btn-secondary ml-2">Cancel</button>
                  </>
                  :
                  <>
                    <button onClick={() => editItem(item.id)} className="btn btn-warning">Edit</button>
                    <button onClick={() => deleteItem(item.id)} className="btn btn-danger ml-2">Delete</button>
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
