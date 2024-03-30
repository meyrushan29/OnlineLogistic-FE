import React from 'react';

const UpdateClient = () => {
  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
        <form action="">
          <h2 className="text-lg font-semibold mb-4">Update User</h2>
          <div className="mb-4">
            <label htmlFor="clientId" className="block mb-1">Client ID</label>
            <input type="text" id="clientId" placeholder="Enter Client ID" className="form-control" />
          </div>
          <div className="mb-4">
            <label htmlFor="clientName" className="block mb-1">Client Name</label>
            <input type="text" id="clientName" placeholder="Enter Client Name" className="form-control" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">E-mail</label>
            <input type="text" id="email" placeholder="Enter E-mail Address" className="form-control" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input type="text" id="phone" placeholder="Enter Phone Number" className="form-control" />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">Address</label>
            <input type="text" id="address" placeholder="Enter Address" className="form-control" />
          </div>
          <div>
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClient;
