import './App.css';
import {NavLink,Routes,Route, useNavigate} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { CreatePost } from './components/CreatePost.js'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/slice/authSlice';
import { useEffect } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './img/logo.png'

function App() {
  
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const signoff=()=>{
    dispatch(logout())
    


  }
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user])
  return (
    <>
    <div className='navbar'>
    <h1>Blog</h1>
    <img src={logo} alt='Logo' className='logo' />
    <div className='links'>
      {user?<> <NavLink to="/me">{user.name}</NavLink> <NavLink className='addPost' to='/create'>add post</NavLink> <button onClick={signoff} >logout</button></>:<>
      <NavLink to="/register">register</NavLink>
   
      </>}
   
    </div>
    </div>
    <div className='content'>
    <Routes>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/me" element={<Dashboard></Dashboard>}></Route>
      <Route path='/create' element={<CreatePost/>}></Route>
    </Routes>
    </div>
    
    <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
