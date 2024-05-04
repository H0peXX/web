import react, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home(){
    const[name, setShowName] = useState('')
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then( res => {
            if(res.data.valid){
                setShowName(res.data.username);
            }else{
                navigate('/login')
            }
        })
        .catch(err => console.log(err))

    },[])
    
    return(
        <div>Welcome {name}</div>
    )
}
export default Home