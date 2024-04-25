import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MakeOrder = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderIdCounter, setOrderIdCounter] = useState(1); // Initialize order ID counter
  const navigate = useNavigate();

  const districtCities = {
    "Ampara": ["Ampara", "Kalmunai", "Sainthamaruthu"],
    "Anuradhapura": ["Anuradhapura", "Kekirawa", "Talawa"],
    "Badulla": ["Badulla", "Bandarawela", "Haputale"],
    "Batticaloa": ["Batticaloa", "Kattankudy", "Valaichchenai"],
    "Colombo": ["Colombo", "Dehiwala-Mount Lavinia", "Sri Jayawardenepura Kotte"],
    "Galle": ["Galle", "Ambalangoda", "Hikkaduwa"],
    "Gampaha": ["Gampaha", "Negombo", "Kelaniya"],
    "Hambantota": ["Hambantota", "Tangalle", "Ambalantota"],
    "Jaffna": ["Jaffna", "Point Pedro", "Chavakachcheri"],
    "Kalutara": ["Kalutara", "Panadura", "Horana"],
    "Kandy": ["Kandy", "Nuwara Eliya", "Gampola"],
    "Kegalle": ["Kegalle", "Mawanella", "Dehiowita"],
    "Kilinochchi": ["Kilinochchi", "Poonakary", "Pachchilaipalli"],
    "Kurunegala": ["Kurunegala", "Kuliyapitiya", "Narammala"],
    "Mannar": ["Mannar", "Nanaddan", "Musali"],
    "Matale": ["Matale", "Dambulla", "Rattota"],
    "Matara": ["Matara", "Weligama", "Hakmana"],
    "Monaragala": ["Monaragala", "Wellawaya", "Bibile"],
    "Mullaitivu": ["Mullaitivu", "Mulliyawalai", "Puthukkudiyiruppu"],
    "Nuwara Eliya": ["Nuwara Eliya", "Kotagala", "Maskeliya"],
    "Polonnaruwa": ["Polonnaruwa", "Hingurakgoda", "Medirigiriya"],
    "Puttalam": ["Puttalam", "Chilaw", "Anamaduwa"],
    "Ratnapura": ["Ratnapura", "Embilipitiya", "Balangoda"],
    "Trincomalee": ["Trincomalee", "Kinniya", "Thambalagamuwa"],
    "Vavuniya": ["Vavuniya", "Chettikulam", "Nedunkeni"]
    // Add more districts and cities as needed
  };

  const generateProductId = () => {
    // Generate a product ID like "OID-XXXX" where XXXX is orderIdCounter
    return `OID-${(orderIdCounter).toString().padStart(4, '0')}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = new Date().toISOString().split('T')[0];

    const orderData = {
      orderId: generateProductId(),
      productName,
      quantity: parseInt(quantity),
      district,
      city,
      deliveryAddress,
      orderedDate: currentDate,
    };

    try {
      const response = await axios.post('http://localhost:3001/ord/', orderData);

      console.log('Order submitted successfully:', response.data);

      // Increment the order ID counter for the next order
      setOrderIdCounter(orderIdCounter + 1);

      // Reset form fields
      setProductName('');
      setQuantity('');
      setDistrict('');
      setCity('');
      setDeliveryAddress('');

      navigate('/order');
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    // Clear city when district changes
    setCity('');
  };

  return (
    <div className="container-fluid mt-2 mb-2" style={{ marginTop: '100px', marginLeft: '150px', marginRight: '150px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Make Order Form</h5>
              <div style={{ marginBottom: '20px' }}></div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="text"
                      label="Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      type="number"
                      label="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      fullWidth
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>District</InputLabel>
                      <Select
                        value={district}
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        {districtCities[district] && districtCities[district].map((cityName, index) => (
                          <MenuItem key={index} value={cityName}>{cityName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      label="Delivery Address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
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

export default MakeOrder;
