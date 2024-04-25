import React, { useState } from 'react'; // Import useState from React
import axios from 'axios'; // Import Axios
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';

import {Link,useNavigate} from 'react-router-dom'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleRegister = (e) => { // Pass event object as parameter
    e.preventDefault(); // Prevent default form submission behavior
    axios.post('http://localhost:3001/register/', { name, email, password })
      .then(res => {
        navigate('/login')
      })
      .catch(err => console.error(err));
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-10 mx-80 mb-0' style={{ borderRadius: '10px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              {/* Corrected className */}
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user" size='lg' className="me-3" /> {/* Corrected className */}
                {/* Added value and onChange props */}
                <MDBInput label='Your Name' id='form1' type='text' className='w-100' value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope" size='lg' className="me-3" /> {/* Corrected className */}
                {/* Added value and onChange props */}
                <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock" size='lg' className="me-3" /> {/* Corrected className */}
                {/* Added value and onChange props */}
                <MDBInput label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <MDBBtn onClick={handleRegister}>Register</MDBBtn> {/* Added onClick event handler */}
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
