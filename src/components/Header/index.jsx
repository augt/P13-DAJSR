import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isConnected } = useSelector((state) => state.user);

  function onlogoutClick() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="../img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {!isConnected && (
          <div className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <Link className="main-nav-item" to="/login">
              Sign In
            </Link>
          </div>
        )}
        {isConnected && (
          <div className="main-nav-item" onClick={onlogoutClick}>
            <i className="fa fa-sign-out"></i>
            <div>Sign Out</div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
