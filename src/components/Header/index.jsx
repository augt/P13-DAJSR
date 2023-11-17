import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav class="main-nav">
        <Link class="main-nav-logo" to="/">
          <img
            class="main-nav-logo-image"
            src="../img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 class="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link class="main-nav-item" to="/login">
            <i class="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
