import Nav from "./components/Nav";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Footer from "./components/Footer";
import OpenBook from "./pages/OpenBook";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import PageNotFound from "./pages/PageNotFound";
import Img404 from "./assets/404.png";
import DeliveryPriceCalculator from "./components/DeliveryPriceCalculator";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { books } from "./data";

function App() {
    const [cartItems, setCartItems] = useState([]);

    function addItemToCart(newBook) {
        setCartItems((prevCartItems) => {
            // Check if the item already exists in the cart
            const itemIndex = prevCartItems.findIndex(
                (item) => item.id === newBook.id
            );

            if (itemIndex > -1) {
                // If item exists, update the quantity
                const updatedCartItems = [...prevCartItems];
                updatedCartItems[itemIndex].quantity += 1; // Increment by 1

                return updatedCartItems;
            } else {
                // If item does not exist, add it to the cart with an initial quantity of 1

                return [...prevCartItems, { ...newBook, quantity: 1 }];
            }
        });
    }

    function removeItemFromCart(bookId) {
        setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== bookId)
        );
    }

    function updateItemQuantity(bookId, quantity) {
        setCartItems((prevCartItems) => {
            // Find the item index
            const itemIndex = prevCartItems.findIndex(
                (item) => item.id === bookId
            );

            if (itemIndex > -1) {
                // Update quantity if item is found
                const updatedCartItems = [...prevCartItems];
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or less

                    return updatedCartItems.filter(
                        (item) => item.id !== bookId
                    );
                } else {
                    // Update the item quantity
                    updatedCartItems[itemIndex].quantity = quantity;

                    return updatedCartItems;
                }
            }
            return prevCartItems; // No change if item is not found
        });
    }

    function numberOfItems() {
        let itemCount = 0;
        cartItems.forEach((item) => (itemCount += item.quantity));

        return itemCount;
    }

    return (
        <Router>
            <div className="App">
                <Nav numberOfItems={numberOfItems} />
                <Switch>
                    <Route path="/" exact render={() => <Home />} />
                    <Route
                        path="/books"
                        exact
                        render={() => <Books books={books} />}
                    />
                    <Route
                        path="/books/:id"
                        render={() => (
                            <OpenBook
                                cartItems={cartItems}
                                books={books}
                                addItemToCart={addItemToCart}
                            />
                        )}
                    />
                    <Route
                        path="/cart"
                        render={() => (
                            <Cart
                                cartItems={cartItems}
                                addItemToCart={addItemToCart}
                                removeItemFromCart={removeItemFromCart}
                                updateItemQuantity={updateItemQuantity}
                            />
                        )}
                    />
                    <Route
                        path="/checkout"
                        render={(props) => (
                            <Checkout
                                {...props}
                                CartItems={cartItems}
                                DeliveryPriceCalculator={
                                    DeliveryPriceCalculator
                                }
                            />
                        )}
                    />
                    <Route
                        path="/payment"
                        render={(props) => (
                            <Payment {...props} CartItems={cartItems} />
                        )}
                    />
                    <Route
                        path="*"
                        render={(props) => (
                            <PageNotFound {...props} Img404={Img404} />
                        )}
                    />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
