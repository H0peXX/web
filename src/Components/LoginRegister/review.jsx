import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import axios from 'axios';
import { FaStar } from 'react-icons/fa'; // Importing star icon
import './review.css'; // Importing CSS file for styling

function Review() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const navigate = useNavigate();

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/review', { rating, review })
            .then(result => {
                if (result.data === "ReviewSuccess") {
                    navigate('/');
                }
                else if (result.data === "Fail") {
                    navigate('/review');
                } else {
                    console.log("Fail");
                }
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <div className='form-register'>
                <form onSubmit={handleSubmit}>
                    <h1>Review us</h1>

                    <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <span key={value} onClick={() => handleStarClick(value)}>
                                <FaStar
                                    className={value <= rating ? 'star-filled' : 'star-empty'}
                                />
                            </span>
                        ))}
                    </div>

                    <div>
                        <input type='text' placeholder='Review' value={review} onChange={(e) => setReview(e.target.value)} />
                    </div>

                    <button type='submit' className='btn btn-primary'>Submit Review</button>

                </form>
                <p>Go back home?</p>
                <Link to='/'><button className='btn btn-primary'>Home</button></Link>
            </div>
        </div>
    );
}

export default Review;
