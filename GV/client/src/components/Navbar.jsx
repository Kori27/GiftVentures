import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {
  const {logout} = useLogout()
  const { user } = useAuthContext()
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = (e) => {
    e.preventDefault()
    setDropdownVisible(true);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault()
    setDropdownVisible(false);
  };

  const handleClick = () => {
    logout()
    setDropdownVisible(false);
  }

  return (
    <header>
      <div className='container'>
        <Link to={"/"}>
          <h1 id='main'>GiftVentures</h1>
        </Link>
        <nav>
        <Link to={"/"}>
          <h1>Főoldal</h1>
        </Link>
        <Link to={"/"}>
          <h1>Programok</h1>
        </Link>
        <Link to={"/about "}>
          <h1>Rólunk</h1>
        </Link>
          {user && (
            <>
              <div className='profile'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
                <img src={require("../IMG/user.png")} alt="aa" />
                <i class={isDropdownVisible? 'arrow up' : 'arrow down'}></i>
                {isDropdownVisible && (
                <div className='dropdown-menu' 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                  <div>
                    <Link to='/profile'>Profil</Link>
                    <Link>Mentett Programjaim</Link>
                  </div>
                  <button id='signout' onClick={handleClick}>Kijelentkezés</button>
                </div>
              )}
              </div>
            </>
          )}
          {!user && (
          <div className='signupContainer'>
            <Link to= "/signup"><button className='register'>Regisztráció</button></Link>
            <Link to="/login" className='login'>vagy bejelentkezés</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar