import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();

    const resizeListener = () => {
      showButton();
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            SOIL
            <i className='fa-solid fa-seedling' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/specialdeals' className='nav-links' onClick={closeMobileMenu}>
                Special Deals
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/homegarden'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Garden Tips
              </Link>
            </li>
            {props.user && ( // Display the Reviews link only if user is logged in
              <li className='nav-item'>
                <Link
                  to='/reviews'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Reviews
                </Link>
              </li>
            )}
            <li className='nav-item'>
              <Link
                to='/cart'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Cart
              </Link>
            </li>
          </ul>
          {button && (
            props.user ? (
              <>
                <Button buttonStyle='btn--outline' path='/profile'>PROFILE</Button>
                <Button buttonStyle='btn--outline' path='/login' onClick={props.logoutUser}>LOGOUT</Button>
              </>
            ) : (
              <Button buttonStyle='btn--outline' path='/signup'>SIGN UP</Button>
            )
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
