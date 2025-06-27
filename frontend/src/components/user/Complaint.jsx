import axios from 'axios';
import React, { useState } from 'react';

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userComplaint, setUserComplaint] = useState({
    userId: user._id,
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id } = user;
      await axios.post(`https://caseresolve.onrender.com/Complaint/${_id}`, userComplaint);
      alert('Your complaint has been submitted!');
      handleClear();
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4 text-primary">Register Your Complaint</h3>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input name="name" value={userComplaint.name} onChange={handleChange} type="text" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label htmlFor="address" className="form-label">Address</label>
            <input name="address" value={userComplaint.address} onChange={handleChange} type="text" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">City</label>
            <input name="city" value={userComplaint.city} onChange={handleChange} type="text" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label htmlFor="state" className="form-label">State</label>
            <input name="state" value={userComplaint.state} onChange={handleChange} type="text" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label htmlFor="pincode" className="form-label">Pincode</label>
            <input name="pincode" value={userComplaint.pincode} onChange={handleChange} type="text" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label htmlFor="status" className="form-label">Status</label>
            <input name="status" placeholder="e.g., Pending" value={userComplaint.status} onChange={handleChange} type="text" className="form-control" required />
          </div>

          <div className="col-12">
            <label htmlFor="comment" className="form-label">Description</label>
            <textarea name="comment" value={userComplaint.comment} onChange={handleChange} className="form-control" rows="4" required></textarea>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success mt-2 px-4">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
