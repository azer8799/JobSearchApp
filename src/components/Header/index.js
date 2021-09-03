import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="nav-bar-large-container">
        <Link to="/">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li className="nav-menu-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>

      <div className="nav-menu-mobile">
        <img
          className="header-website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <AiFillHome className="icon" />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/jobs" className="nav-link">
              <BsFillBriefcaseFill className="icon" />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/login" className="nav-link">
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogout}
              >
                <FiLogOut className="icon" />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)
