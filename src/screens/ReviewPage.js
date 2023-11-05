import React, { useState } from 'react';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    comment: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle review submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="review-form">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="5">5 (Excellent)</option>
            <option value="4">4 (Very Good)</option>
            <option value="3">3 (Good)</option>
            <option value="2">2 (Fair)</option>
            <option value="1">1 (Poor)</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Review about our website</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="1"
            cols="5"
            required
          />
        </div>
        
      </form>
    </div>
  );
};

export default ReviewForm;
