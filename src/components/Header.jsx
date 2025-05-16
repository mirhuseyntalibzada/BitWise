import logo from "../assets/images/BitWise.svg"
import { FaRegCompass } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { RiExchangeFundsLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { HamMenuContext } from "../contexts/HamMenuContext";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {

  const [hamMenu, setHamMenu] = useContext(HamMenuContext);
  const location = useLocation();

  const triggerMenu = () => {
    setHamMenu(!hamMenu)
  }

  return (
    <>
      <header className={hamMenu ? `open` : 'close'}>
        <div className="container">
          <li className="hamburger-menu-mobile">
            <GiHamburgerMenu className="ham-icon" onClick={triggerMenu} color="white" size={20} />
          </li>
          <div className='logo-container'>
            <Link to="/">
              <img src={logo} alt="BitWise Logo" />
            </Link>
          </div>
          <div className='user-img'>
            <CgProfile color="white" size={30} />
          </div>
        </div>
      </header>
      <nav className={hamMenu ? `open` : 'close'}>
        <div className="searchbar">
          <input placeholder="Search..." type="text" />
        </div>
        <div className="navbar">
          <div className="container">
            <div className="nav-container">
              <ul>
                <li className="hamburger-menu-desktop">
                  <GiHamburgerMenu className="ham-icon" onClick={triggerMenu} color="white" size={20} />
                </li>
                <li className={`list-item ${location.pathname === '/' ? 'active' : ''}`}>
                  <Link to="/">
                    <FaRegCompass color="white" size={20} />
                    <span>Home</span>
                  </Link>
                </li>
                <li className={`list-item ${location.pathname === '/exchange' ? 'active' : ''}`}>
                  <Link to="/exchange">
                    <RiExchangeFundsLine color="white" size={20} />
                    <span>Exchange</span>
                  </Link>
                </li>
                <li className="list-item">
                  <a href="#">
                    <MdOutlineVerifiedUser color="white" size={20} />
                    <span>Privacy Policy</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>

  )
}

export default Header