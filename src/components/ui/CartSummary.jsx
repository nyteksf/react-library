import React, { useRef } from "react";

const CartSummary = ({
    CartItems,
    isDisabled,
    formRef,
    title,
    isReadyToPay,
    setIsReadyToPay,
    formSubmit,
    stepNumber,
}) => {
    const submitForm = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    function countCartItems() {
        let totalItems = 0;

        CartItems.forEach((item) => {
            totalItems += item.quantity;
        });
        return totalItems;
    }

    function sumCartItemPrice() {
        let totalPrice = 0;

        CartItems.forEach((item) => {
            totalPrice +=
                item.quantity * (item.salePrice || item.originalPrice);
        });

        return totalPrice.toFixed(2);
    }

    function handleClick() {
        if (stepNumber === "one" && isReadyToPay) {
            console.log("THIS IS FIRST STEP")
            // RETRIEVE PASSED PROP OBJECT: CONTAINS CUSTOMER INFO. STORE IN SESSIONSTORAGE, LOAD /PAYMENT PAGE. MOVE LOGIC TO HERE FROM OTHER PAGE.
            formSubmit();
        }
        else if (stepNumber === "two" && isReadyToPay) {
            console.log("Loading next step...");
            // DO NOTHING, I THINK. STEP 2 IS BILLING INFO ONLY.
             // PROBABLY CAN REMOVE THIS STEP AFTER
        } else if (stepNumber === "three" && isReadyToPay) {
            console.log("Firing modal...");
            // LAUNCH MY CONTACT MODAL HERE: THE TWO DOORS THAT SLAM TOGETHER ONE.
        }
    }

    return (
        <div className="cart__summary billing-info--container">
            <h2 className="cart__summary--title">Cart Summary</h2>
            <div className="cart-summary--details">
                {/* RENDER CART INFO HERE */}
                <p className="cart-summary__item-count cart-summary__item">
                    Subtotal ({countCartItems()}{" "}
                    {countCartItems() > 1 ? "Items" : "Item"}):
                    <span className="cart-summary--item">
                        ${sumCartItemPrice()}
                    </span>
                </p>
                <p className="cart-summary__item-tax cart-summary__item">
                    Tax (8%):{" "}
                    <span className="cart-summary--item">
                        ${(sumCartItemPrice() * 0.08).toFixed(2)}
                    </span>
                </p>
                <p className="cart-summary__item-shipping cart-summary__item">
                    S & H (FedEx Ground):{" "}
                    <span className="cart-summary--item cart-summary--item-s-and-h">
                        $8.95
                    </span>
                </p>
                <p className="cart-summary__item-total cart-summary__item">
                    Total:{" "}
                    <span className="cart-summary--item cart-summary--item-final">
                        $
                        {(
                            +sumCartItemPrice() +
                            8.95 +
                            sumCartItemPrice() * 0.08
                        ).toFixed(2)}
                    </span>
                </p>
                <button
                    type="button"
                    className={`btn btn__checkout ${
                        isReadyToPay === false ? "disabled" : ""
                    }`}
                    isDisabled={isDisabled}
                    onClick={() => handleClick()}
                >
                    {title}
                </button>
            </div>
        </div>
    );
};

export default CartSummary;
