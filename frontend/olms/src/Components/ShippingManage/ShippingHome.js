import React from 'react';
import { useNavigate } from 'react-router-dom';

function ShippingHome() {
    const navigate = useNavigate();

    const handleFirstButtonClick = () => {
        // Navigate to the first route
        navigate('/createshipping');
    };

    const handleSecondButtonClick = () => {
        // Navigate to the second route
        navigate('/shipping');
    };

    return (
        
            <div className='layove' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', zIndex: '1' }}>
                <h1>Welcome to Shipping management</h1>
                <h3>Store your data here</h3>
                <div style={{ marginTop: '3mm' }}>
                    <button className="btn btn-primary" onClick={handleFirstButtonClick}>Add Shipping</button>
                    <button className="btn btn-primary ms-3" onClick={handleSecondButtonClick}>Edit/Delete</button>
                </div>
            </div>
    );
}

export default ShippingHome;