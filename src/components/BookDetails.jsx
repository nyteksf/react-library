import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Rating from "./Rating";
import ShowPrice from "./ui/ShowPrice";
import { Link } from "react-router-dom";

const BookDetails = ({ book, addItemToCart, cartItems, id }) => {
    const bookIsInCart = checkCartForBook();

    function checkCartForBook() {

        return cartItems.find((book) => book.id === +id);
    }

    function printSummary(book) {
        const summary = book.summary.split("\n").map((paragraph, index) => (
            <p key={index} className="summary__para">
                {paragraph}
            </p>
        ));

        return summary;
    }

    return (
        <div className="book--wrapper">
            <div className="book-page__navbar">
                <Link to="/books" className="book-page__navbar-back">
                    <FontAwesomeIcon icon={faArrowLeft} /> Books
                </Link>
            </div>
            <div className="book-img-info">
                <figure className="book-img-left">
                    <img src={book.url} alt={book.title} />
                </figure>
                <div className="book-info-right">
                    <h2 className="book-info__title">{book.title}</h2>
                    <div className="book-rating">
                        <Rating rating={book.rating} />
                    </div>
                    <div className="book-price">
                        <ShowPrice
                            salePrice={book.salePrice}
                            originalPrice={book.originalPrice}
                        />
                    </div>
                    <h3 className="summary__para--title">Summary</h3>
                    <div className="summary__para">
                        {printSummary(book)}
                    </div>
                    {bookIsInCart ? (
                        <Link to="/cart" className="book__link">
                            <button className="cartButton btn">View Cart</button>
                        </Link>
                    ) : (
                        <button
                            className="cartButton btn"
                            onClick={() => {
                                addItemToCart(book);
                            }}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
