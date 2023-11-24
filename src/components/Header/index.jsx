import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
        <div className="main-nav-items-group">
          <div>
            <i className="fa fa-user-circle"></i>
            <Link className="main-nav-item" to="/login">
              Sign In
            </Link>
          </div>
          <div>
            <i className="fa fa-sign-out"></i>
            <a className="main-nav-item" href="./index.html">
              Sign Out
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
