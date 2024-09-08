import BookDetails from "../components/BookDetails";
import RecommendedBooks from "../components/RecommendedBooks";
import Rating from "../components/Rating";
import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./OpenBook.css";
import "../index.css";

const OpenBook = ({ cartItems, books, addItemToCart }) => {
    const { id } = useParams();

    const book = books.find((book) => book.id === parseInt(id));

    return (
        <>
            <div className="container">
                <div className="row">
                    <BookDetails book={book} addItemToCart={addItemToCart} cartItems={cartItems} id={id} />
                    <RecommendedBooks books={books} bookId={useParams().id} />
                </div>
            </div>
        </>
    );
};

export default OpenBook;
