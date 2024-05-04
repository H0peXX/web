
import Register from './Components/LoginRegister/Register';
import Login from './Components/LoginRegister/Login'
import Home from './Components/LoginRegister/home'
import Admin from './Components/LoginRegister/admin'


import { BrowserRouter, Routes , Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/admin' element={<Admin />} />

  </Routes>
</BrowserRouter>

    
  )
}

export default App;
