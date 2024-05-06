import React from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
    return (
        <div>
            <h1>Welcome to Admin Page</h1>
            <div>
                <Link to="/user_table">
                    <button>View User Table</button>
                </Link>
                <Link to="/review_table">
                    <button>View User Review</button>
                </Link>
                <Link to="/transaction_table">
                    <button>View Transaction</button>
                </Link>
            </div>
        </div>
    );
}

export default AdminPage;
