import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [name, setShowName] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => {
                if (res.data.status === "Success") {
                    setShowName(res.data.name);
                } else {
                    alert("Please login");
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, []);

    

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate('/login', { replace: true });

                }else{
                    alert("Error");
                }
            }).catch(err => console.log(err))
            
    };

    return (
        <div>
            <p>Welcome {name}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
