import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';
function ReviewTable() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/review_table');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="table-container">
            <h1>User Review</h1>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rating</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.rating}</td>
                            <td>{user.review}</td>
                            <td>{user.create_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admin">
                <button>Go back Admin page.</button>
            </Link>
        </div>
    );
}

export default ReviewTable;
