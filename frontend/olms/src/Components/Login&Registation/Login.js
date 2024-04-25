import React, { useState } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Login() {
const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate

  axios.defaults.withCredentials = true;
  
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        if(res.data.Status === "Success"){
            navigate('/home')
        }
      })
      .catch(err => {
        console.error(err);
      })
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-10 mx-80 mb-0' style={{ borderRadius: '10px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Your Email' id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Password' id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <MDBBtn onClick={handleLogin}>Login</MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
