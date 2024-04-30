import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditOrder = () => {
  const [order, setOrder] = useState({
    productName: '',
    quantity: '',
    district: '',
    city: '',
    deliveryAddress: '',
    orderedDate: ''
  });

  const [districtCities, setDistrictCities] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchOrder();
    // Set district cities once on component mount
    setDistrictCities({
      "Ampara": ["Ampara", "Kalmunai", "Sainthamaruthu"],
      "Anuradhapura": ["Anuradhapura", "Kekirawa", "Talawa"],
      // Add more districts and cities as needed
    });
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/getorders/${id}`);
      const orderData = response.data;
      setOrder(orderData);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3001/updateorders/${id}`, order);
      navigate('/order');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setOrder({ ...order, district: selectedDistrict, city: '' });
  };

  return (
    <div className="container-fluid mt-2 mb-2" style={{ marginTop: "100px", marginLeft: "150px", marginRight: "150px" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Edit Order</h5>
              <div style={{ marginBottom: '20px' }}></div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="text"
                      label="Product Name"
                      name="productName"
                      value={order.productName}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="number"
                      label="Quantity"
                      name="quantity"
                      value={order.quantity}
                      onChange={handleChange}
                      fullWidth
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>District</InputLabel>
                      <Select
                        value={order.district}
                        onChange={handleDistrictChange}
                      >
                        {Object.keys(districtCities).map((districtName, index) => (
                          <MenuItem key={index} value={districtName}>{districtName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>City</InputLabel>
                      <Select
                        value={order.city}
                        onChange={handleChange}
                        name="city"
                      >
                        {districtCities[order.district] && districtCities[order.district].map((cityName, index) => (
                          <MenuItem key={index} value={cityName}>{cityName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Delivery Address"
                      name="deliveryAddress"
                      value={order.deliveryAddress}
                      onChange={handleChange}
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditOrder;
