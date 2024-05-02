
import Register from './Components/LoginRegister/Register';
import Login from './Components/LoginRegister/Login'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
  </Routes>
</BrowserRouter>

    
  )
}

export default App;
