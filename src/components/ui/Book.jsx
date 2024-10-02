import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import ShowPrice from "./ShowPrice";

const Book = ({ book, bookId }) => {
    const [img, setImg] = useState();

    const mountedRef = useRef(true);

    useEffect(() => {
        const img = new Image();
        img.src = book.url;
        img.onload = () => {
            setTimeout(() => {
                setImg(img);
            }, 300)
        };
        return () => {
            mountedRef.current = false;
        }
    });

    return (
        <div className="book" key={book.id || bookId}>
            {img ? (
                <>
                    <Link to={`/books/${book.id}`}>
                        <figure className="book__img--wrapper">
                            <img
                                src={book.url}
                                alt="book image"
                                className="book__img"
                            />
                        </figure>
                    </Link>
                    <div className="book__title">
                        <Link to={`${book.id}`} className="book__title--link">
                            {book.title}
                        </Link>
                    </div>
                    <Rating rating={book.rating} />
                    <ShowPrice
                        salePrice={book.salePrice}
                        originalPrice={book.originalPrice}
                    />
                </>
            ) : (
                <>
                    <div className="book__img--skeleton"></div>
                    <div className="skeleton book__title--skeleton"></div>
                    <div className="skeleton book__rating--skeleton"></div>
                    <div className="skeleton book__price--skeleton"></div>
                </>
            )}
        </div>
    );
};

export default Book;
