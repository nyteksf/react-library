import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import img from "../assets/emptycart-raw.jpg";

const Cart = ({
  cartItems,
  removeItemFromCart,
  updateItemQuantity,
}) => {
  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.quantity * (item.salePrice || item.originalPrice);
  }, 0);

  const taxRate = 0.08; // 8% TAX RATE
  const tax   = subtotal * taxRate;
  const total = subtotal + tax;

  // Render individual cart item
  const renderCart = (item) => {
    const { url, title, originalPrice, salePrice, id, quantity } = item;
    const itemPrice = salePrice || originalPrice;
    const itemTotalPrice = (itemPrice * quantity).toFixed(2);

    return (
      <div className="cart-item--wrapper" key={id}>
        <div className="item__descrip">
          <figure className="book-img--wrapper">
            <Link to={`/books/${id}`}>
              <img src={url} alt={title} />
            </Link>
          </figure>
          <div className="item-descrip__text">
            <h5 className="item-descrip__title">{title}</h5>
            <p className="item-descrip__price">
              ${itemPrice.toFixed(2)}
            </p>
            <span
              className="item-descrip__removeItemLink"
              onClick={() => removeItemFromCart(id)}
            >
              { (quantity > 1) ? "Remove Items" : "Remove Item" }
            </span>
          </div>
        </div>
        <div className="item__quantity">
          <input
            type="number"
            className="item__quantity--display"
            min="1"
            max="20"
            step="1"
            value={quantity}
            onChange={(e) =>
              updateItemQuantity(
                id,
                Math.max(1, Math.min(20, parseInt(e.target.value) || 1))
              )
            }
          />
        </div>
        <div className="item__price">
          ${itemTotalPrice}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img src={img} className="img-empty-cart" alt="empty cart" />
            <h2 className="empty-cart__message">Your cart is currently empty.</h2>
            <Link to="/books" className="btn btn__continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart__grid-top">
              <h2 className="cart-title">Cart</h2>
              <div className="grid-top--labels">
                <h5>Book</h5> <h5>Quantity</h5> <h5>Price</h5>
              </div>
            </div>
            <div className="cart__grid">
              {cartItems.map(renderCart)}
            </div>
            <div className="show-tax-and-totals">
              <div className="taxtotal__row">
                <h5>Subtotal</h5>
                <span className="total--num">${subtotal.toFixed(2)}</span>
              </div>
              <div className="taxtotal__row">
                <h5>Tax (8%)</h5>
                <span className="total--num">${tax.toFixed(2)}</span>
              </div>
              <div className="taxtotal__row taxtotal__row--final">
                <h5 className="total-amt">
                  <strong>TOTAL</strong>
                </h5>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <button className="btn btn__checkout">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
