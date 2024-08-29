import React, { useState } from 'react';
import '../App.css';
import axios from 'axios'; // Import Axios for making API requests



function ReviewForm({ productId, user, existingReview, onUpdateReview }) {
  const [review, setReview] = useState(existingReview ? existingReview.review : '');
  const [stars, setStars] = useState(existingReview ? existingReview.stars : 0);
  const [isEditing, setIsEditing] = useState(existingReview ? true : false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        productId: productId,
        userId: user.id, // Assuming user object has an id property
        review: review,
        stars: stars
      };

      if (isEditing) {
        // If editing existing review, send PUT request
        await axios.put(`/api/reviews/${existingReview.id}`, reviewData);
        onUpdateReview(); // Update UI after editing
      } else {
        // If creating new review, send POST request
        await axios.post('/api/reviews', reviewData);
      }

      // Reset form fields
      setReview('');
      setStars(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/reviews/${existingReview.id}`);
      onUpdateReview(); // Update UI after deleting
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Review' : 'Leave a Review'}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review (maximum 100 words)"
          maxLength={100}
          required
        />
        <label>
          Stars:
          <select
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button type="submit">{isEditing ? 'Update Review' : 'Submit Review'}</button>
      </form>
      {isEditing && (
        <button onClick={handleDelete}>Delete Review</button>
      )}
    </div>
  );
}

export default ReviewForm;
