import { Link } from "react-router-dom";
import Rating from "./Rating";
import ShowPrice from "./ui/ShowPrice";

function RecommendedBooks({ books, renderStarRating, bookId }) {
    return (
        <div className="recommended-books">
            <h2 className="recommended-books">Recommended Books</h2>
            <div className="books__container">
                {books
                    .filter((book) => book.id != bookId)
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 4)
                    .map((book) => (
                        <>
                            <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                                <img src={book.url} alt={book.title} />
                                <h3 className="book-title">{book.title}</h3>
                                <div className="book-rating--recommended">
                                    <Rating rating={book.rating} />
                                </div>
                                <ShowPrice salePrice={book.salePrice} originalPrice={book.originalPrice} />
                            </Link>
                        </>
                    ))}
            </div>
        </div>
    );
}

export default RecommendedBooks;
