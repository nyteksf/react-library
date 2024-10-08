import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LibraryLogo from "../assets/Library.svg";

const Nav = ({ numberOfItems }) => {
    const location = useLocation();

    const isHome  = location.pathname === "/";
    const isCart  = location.pathname === "/cart";
    const isBooks = location.pathname === "/books";

    function openMenu() {
        document.body.classList += " menu--open";
    }

    function closeMenu() {
        document.body.classList.remove("menu--open");
    }

    if (isCart) {
        const navLinks = document.getElementsByClassName("nav__link");

        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove("nav__link--active");
        }
    }

    return (
        <nav className={isHome ? "navbar--home" : ""}>
            <div className="nav__container">
                <Link to="/">
                    <img src={LibraryLogo} alt="Library Logo" className="logo" />
                </Link>
                <ul className="nav__links">
                    <li className="nav__list">
                        <Link to="/" className={isHome ? "nav__link nav__link--active" : "nav__link"}>
                            Home
                        </Link>
                    </li>
                    <li className="nav__list">
                        <Link to="/books" className={isBooks ? "nav__link nav__link--active" : "nav__link" }>
                            Books
                        </Link>
                    </li>
                    <button className="btn__menu" onClick={() => { openMenu() }}>
                        <FontAwesomeIcon icon="bars" />
                    </button>
                    <li className="nav__icon">
                        <Link to="/cart" className="nav__link">
                            <FontAwesomeIcon icon="shopping-cart" />
                        </Link>
                        {
                            (numberOfItems() > 0 ) && (
                                <span className="cart__length">{numberOfItems()}</span>
                            )
                        }
                    </li>
                </ul>
                <div className="menu__backdrop">
                    <button className="btn__menu btn__menu--close" onClick={ () => { closeMenu() }}> 
                        <FontAwesomeIcon icon="times" />
                    </button>
                    <ul className="menu__links">
                        <li className="menu__list">
                            <Link to="/" className="menu__link">
                                Home
                            </Link>
                            <Link to="/books" className="menu__link">
                                Books
                            </Link>
                            <Link to="/cart" className="menu__link">
                                Cart
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
