import logo from "../assets/images/BitWise.svg"
import { FaRegCompass } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { HamMenuContext } from "../contexts/HamMenuContext";
import { useContext } from "react";

const Header = () => {

  const [hamMenu, setHamMenu] = useContext(HamMenuContext);

  const triggerMenu = () => {
    setHamMenu(!hamMenu)
  }

  return (
    <>
      <header>
        <div className="container">
          <div className='logo-container'>
            <img src={logo} alt="" />
          </div>
          <div className='user-img'>
            <CgProfile color="white" size={30} />
          </div>
        </div>
      </header>
      <nav className={hamMenu ? `open` : 'close'}>
        <div className="navbar">
          <div className="container">
            <div className="nav-container">
              <ul>
                <li>
                  <GiHamburgerMenu className="ham-icon" onClick={triggerMenu} color="white" size={20} />
                </li>
                <li className="list-item">
                  <a href="#">
                    <FaRegCompass color="white" size={20} />
                    <span>testaasdfghjklkjhgfddfghj</span>
                  </a>
                </li>
                <li className="list-item">
                  <a href="#">
                    <MdOutlineVerifiedUser color="white" size={20} />
                    <span>test</span>
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