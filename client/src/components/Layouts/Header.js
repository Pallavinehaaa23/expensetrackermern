import React ,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [login,setLogin]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      setLogin(user);
    }
  },[])
  const logouthandler=()=>{
    localStorage.removeItem('user');
    navigate('/login');
  }
  return (
 <>
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a className="navbar-brand" href="#">Hidden brand</a>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <p>{login && login.name}</p>{" "}
        </li>
        <li className="nav-item">
          <button onClick={logouthandler} className='btn btn-primary'>LogOut</button>
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>

 </>
  )
}

export default Header