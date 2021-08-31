import {
  faFistRaised,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Router from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const router = useRouter();
  const { cart } = useContext(AppContext);

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link href="/" passHref>
          <a className="navbar-brand">
            GNP <FontAwesomeIcon icon={faFistRaised} />
          </a>
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav d-flex">
            <Link href="/" passHref>
              <li className="nav-item">
                <button
                  className={
                    path === "/"
                      ? "btn btn-info text-dark nav-link"
                      : "btn btn-primary bg-primary nav-link"
                  }
                >
                  Home
                </button>
              </li>
            </Link>
            <Link href="/search" passHref>
              <li className="nav-item">
                <button
                  className={
                    path === "/search"
                      ? "btn btn-info text-dark nav-link"
                      : "btn btn-primary bg-primary nav-link"
                  }
                >
                  Store
                </button>
              </li>
            </Link>
          </ul>
        </div>
        <Link href="/cart" passHref>
          <button className="btn ml-auto">
            <span className="text-dark bg-light p-2 m-2 rounded">
              {cart ? cart.lineItems.length : "0"}
            </span>
            Cart <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </Link>
        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
