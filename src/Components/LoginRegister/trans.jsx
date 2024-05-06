import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';
function TransTable() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/transaction_table');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="table-container">
            <h1>User Transaction</h1>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Token Address1</th>
                        <th>Token Address1</th>
                        <th>Token Amount1</th>
                        <th>Token Amount2</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.trans_id }</td>
                            <td>{user.token1_address}</td>
                            <td>{user.token2_address}</td>
                            <td>{user.token_amount1 }</td>
                            <td>{user.token_amount2 }</td>
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

export default TransTable;
