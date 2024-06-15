import logo from './logo.svg';
import './App.css';
import Homepg from './pages/Homepg';
import Login from './pages/Login';
import Register from './pages/Register';
import {Routes,Route, Navigate} from 'react-router-dom'
function App() {
  return (
    <>
   <Routes>
    <Route path='/' element={<ProtectedRoutes><Homepg/></ProtectedRoutes>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
   </Routes>
   </>
  );
}
export function ProtectedRoutes(props){
  if(localStorage.getItem('user'))return props.children
  else
  return <Navigate to="/login"/>
}

export default App;
