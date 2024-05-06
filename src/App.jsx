
import Register from './Components/LoginRegister/Register';
import Login from './Components/LoginRegister/Login'
import Home from './Components/LoginRegister/home'
import UserTable from './Components/LoginRegister/user_table'
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Review from './Components/LoginRegister/review';
import AdminPage from './Components/LoginRegister/admin';
import ReviewTable from './Components/LoginRegister/Review_table';
import TransTable from './Components/LoginRegister/trans';
function App() {
  return (
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/user_table' element={<UserTable />} />
    <Route path='/review' element={<Review />} />
    <Route path='/admin' element={<AdminPage />} />
    <Route path='/review_table' element={<ReviewTable />} />  
    <Route path='/transaction_table' element={<TransTable/>}/>


  </Routes>
</BrowserRouter>

    
  )
}

export default App;
