import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import "./Checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import DeliveryPriceCalculator from "../components/DeliveryPriceCalculator";

const Checkout = ({ CartItems }) => {
    const [isChecked, setIsChecked] = useState(true);
    const [inputs, setInputs] = useState(["", "", "", "", "", "", ""]);
    let isDisabled = true;

    // Determine if all inputs are valid (non-empty)
    const allInputsValid = inputs.every((value) => value.length > 0);

    const formRef = useRef(null);

    const submitForm = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    function formSubmit(evt) {
        evt.preventDefault();
        // Perform checkout logic here
        console.log("Submitting checkout form");

        const email = document.querySelector("#email").value;
        const firstName = document.querySelector(".firstName").value;
        const lastName = document.querySelector(".lastName").value;
        const address1 = document.querySelector(".address1").value;
        const address2 = document.querySelector(".address2").value;
        const city = document.querySelector(".city").value;
        const state = document.querySelector(".stateSelect").value;
        const zipCode = document.querySelector(".zipCode").value;
        const country = document.querySelector(".selectCountry").value;
        const phone = document.querySelector(".phone").value;

        if (document.querySelector(".showShipping").checked) {
            // BILLING ADDRESS IS SAME AS SHIPPING
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("address1", address1);
            sessionStorage.setItem("address2", address2);
            sessionStorage.setItem("city", city);
            sessionStorage.setItem("state", state);
            sessionStorage.setItem("zipCode", zipCode);
            sessionStorage.setItem("country", country);
            sessionStorage.setItem("phone", phone);
        } else {
            // BILLING ADDRESS IS DIFFERENT
            const billingFirstName =
                document.querySelector(".billingFirstName").value;
            const billingLastName =
                document.querySelector(".billingLastName").value;
            const billingAddress1 =
                document.querySelector(".billingAddress1").value;
            const billingAddress2 =
                document.querySelector(".billingAddress2").value;
            const billingCity = document.querySelector(".billingCity").value;
            const billingZip = document.querySelector(".billingZipCode").value;
            const billingState = document.querySelector(
                ".billingStateSelect"
            ).value;
            const billingSelectCountry = document.querySelector(
                ".billingSelectCountry"
            ).value;
            const billingPhone = document.querySelector(".billingPhone").value;

            sessionStorage.setItem("email", email);
            sessionStorage.setItem("firstName", firstName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("address1", address1);
            sessionStorage.setItem("address2", address2);
            sessionStorage.setItem("city", city);
            sessionStorage.setItem("state", state);
            sessionStorage.setItem("zipCode", zipCode);
            sessionStorage.setItem("country", country);
            sessionStorage.setItem("phone", phone);

            sessionStorage.setItem("billingFirstName", billingFirstName);
            sessionStorage.setItem("billingLastName", billingLastName);
            sessionStorage.setItem("billingAddress1", billingAddress1);
            sessionStorage.setItem("billingAddress2", billingAddress2);
            sessionStorage.setItem("billingCity", billingCity);
            sessionStorage.setItem("billingState", billingState);
            sessionStorage.setItem("billingZipCode", billingZip);
        }

        {
            setTimeout(() => {
                // Redirect to /finalize
                window.location.href = "/finalize";
            }, 500);
        }
    }

    useEffect(() => {
        // Ensure the form is selected
        const form = document.querySelector(".submitCustInfo");

        if (form) {
            form.addEventListener("submit", function (event) {
                // event.preventDefault(); // Prevent default submission
                console.log("Form submitted");
            });
        } else {
            console.log("Form not found");
        }
    }, []); // Empty dependency array

    const handleToggle = () => {
        setIsChecked((prevState) => !prevState);
    };

    // Handle input changes for text inputs and select
    const handleInputChange = (index) => (e) => {
        const newInputs = [...inputs];
        newInputs[index] = e.target.value; // Update value for the specific input/select
        setInputs(newInputs); // Update the state with new inputs
    };

    // Determine if the button should be disabled
    isDisabled = !allInputsValid;

    /* 
    
        BLOCK USERS FROM VIEWING EMPTY CHECKOUT PAGE:
        DETECT CURRENT URL, REDIRECT BACK TO EMPTY CART IF NEEDED.
    
    */

    const history = useHistory();
    const location = useLocation();

    // Redirect to /cart if the user tries to access /checkout without having items in the cart
    {
        /*
    useEffect(() => {
        // Check if the user is on the /checkout page and if cartItems are less than 1
        if (pathname === "/checkout" && CartItems.length < 1) {
            history.push("/cart"); // Redirect to /cart
        }
    }, [pathname, CartItems, history]);
*/
    }

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

    return (
        <div className="container container-checkout">
            <div className="row">
                <div className="checkout-title--wrapper">
                    <span className="lock-icon">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <h2 className="checkout-title">Checkout</h2>
                </div>
                <div className="progress-tracker--wrapper">
                        <div className="progress-tracker--progress">
                            <div className="progress-bar" />
                        </div>
                        <div className="progress-tracker-step--nums">
                            <div className="step-num active-num">1</div>
                            <div className="step-num">2</div>
                            <div className="step-num">3</div>
                        </div>
                        <div className="progress-tracker--steps">
                            <div className="step step--left">Shipping</div>
                            <div className="step step--center">Payment and Billing</div>
                            <div className="step step--right">Review and Place Order</div>
                        </div>
                    </div>
                <div className="shipping-info__container">
                    <div className="ship-info--title">
                        <h2 className="checkout-title checkout-section-title">
                            Ship To
                        </h2>
                    </div>
                    <div className="checkout-info--wrapper">
                        <div className="ship-info--form-body">
                            <form
                                ref={formRef}
                                className="submitCustInfo"
                                onSubmit={(event) => formSubmit(event)}
                            >
                                <label className="email-label" htmlFor="email">
                                    <span className="red">*</span> Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="email"
                                    name="email"
                                    value={inputs[0]}
                                    onChange={handleInputChange(0)}
                                    required
                                />
                                <div className="checkout-info-blob">
                                    <div className="blob--left">
                                        <label htmlFor="firstname">
                                            <span className="red">*</span> First
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            className="firstName"
                                            value={inputs[1]}
                                            onChange={handleInputChange(1)}
                                        />
                                    </div>
                                    <div className="blob--right">
                                        <label htmlFor="lastname">
                                            <span className="red">*</span> Last
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            className="lastName"
                                            value={inputs[2]}
                                            onChange={handleInputChange(2)}
                                        />
                                    </div>
                                </div>
                                <div className="checkout-info-blob">
                                    <div className="blob--left">
                                        <label htmlFor="address1">
                                            <span className="red">* </span>
                                            Address Line 1:
                                        </label>
                                        <input
                                            type="text"
                                            name="address1"
                                            className="address1"
                                            value={inputs[3]}
                                            onChange={handleInputChange(3)}
                                        />
                                    </div>
                                    <div className="blob--right">
                                        <label htmlFor="address2">
                                            Address Line 2:
                                        </label>
                                        <input
                                            type="text"
                                            name="address2"
                                            className="address2"
                                        />
                                    </div>
                                </div>
                                <div className="checkout-info-blob">
                                    <div className="blob--left">
                                        <label htmlFor="city">
                                            <span className="red">*</span> City:
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="city"
                                            value={inputs[4]}
                                            onChange={handleInputChange(4)}
                                        />
                                    </div>
                                    <div className="blob--right">
                                        <label htmlFor="stateSelect">
                                            <span className="red">* </span>
                                            State:
                                        </label>
                                        <select
                                            className="stateSelect"
                                            name="stateSelect"
                                            value={inputs[5]}
                                            onChange={handleInputChange(5)}
                                        >
                                            <option value="">
                                                Choose State
                                            </option>
                                            <option value="AL">Alabama</option>
                                            <option value="AK">Alaska</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">
                                                California
                                            </option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">
                                                Connecticut
                                            </option>
                                            <option value="DE">Delaware</option>
                                            <option value="DC">
                                                District Of Columbia
                                            </option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="HI">Hawaii</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">
                                                Louisiana
                                            </option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">
                                                Massachusetts
                                            </option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">
                                                Minnesota
                                            </option>
                                            <option value="MS">
                                                Mississippi
                                            </option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">
                                                New Hampshire
                                            </option>
                                            <option value="NJ">
                                                New Jersey
                                            </option>
                                            <option value="NM">
                                                New Mexico
                                            </option>
                                            <option value="NY">New York</option>
                                            <option value="NC">
                                                North Carolina
                                            </option>
                                            <option value="ND">
                                                North Dakota
                                            </option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">
                                                Pennsylvania
                                            </option>
                                            <option value="RI">
                                                Rhode Island
                                            </option>
                                            <option value="SC">
                                                South Carolina
                                            </option>
                                            <option value="SD">
                                                South Dakota
                                            </option>
                                            <option value="TN">
                                                Tennessee
                                            </option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">
                                                Washington
                                            </option>
                                            <option value="WV">
                                                West Virginia
                                            </option>
                                            <option value="WI">
                                                Wisconsin
                                            </option>
                                            <option value="WY">Wyoming</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="checkout-info-blob">
                                    <div className="blob--left">
                                        <label htmlFor="zip">
                                            <span className="red">*</span> Zip
                                            Code:
                                        </label>
                                        <input
                                            type="text"
                                            className="zipCode"
                                            name="zip"
                                            value={inputs[6]}
                                            onChange={handleInputChange(6)}
                                        />
                                    </div>
                                    <div className="blob--right">
                                        <label htmlFor="selectCountry">
                                            <span className="red">* </span>
                                            Country:
                                        </label>
                                        <select
                                            name="selectCountry"
                                            className="selectCountry"
                                            defaultValue="US"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="checkout-info-blob">
                                    <div className="blob--left">
                                        <label htmlFor="mobile">
                                            Mobile Phone:
                                        </label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            className="phone"
                                        />
                                    </div>
                                    <div className="blob--right blob--right-final">
                                        <label htmlFor="shipping-info">
                                            <p className="shipping-title-small">
                                                Use as billing address
                                            </p>
                                        </label>
                                        <input
                                            type="checkbox"
                                            className="showShipping"
                                            checked={isChecked}
                                            onChange={handleToggle}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="cart__summary">
                            <h2 className="cart__summary--title">
                                Cart Summary
                            </h2>
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
                                        $
                                        {(sumCartItemPrice() * 0.08).toFixed(2)}
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
                                {/*<Link to={isDisabled ? "#" : "/finalize"}> */}
                                <button
                                    type="submit"
                                    className={`btn btn__checkout ${
                                        isDisabled ? "disabled" : ""
                                    }`}
                                    disabled={isDisabled}
                                    onClick={submitForm}
                                >
                                    Enter Payment Details
                                </button>
                                {/*</Link>*/}
                            </div>
                        </div>
                    </div>
                </div>
                {!isChecked && (
                    <div className="shipping-info__container shipping-info__container--last">
                        <div className="ship-info--title">
                            <h2 className="checkout-title checkout-section-title">
                                Billing Address
                            </h2>
                        </div>
                        <div className="checkout-info--wrapper">
                            <div className="ship-info--form-body">
                                <form
                                    className="submitCustInfo2"
                                    action="/finalize"
                                >
                                    <div className="checkout-info-blob">
                                        <div className="blob--left">
                                            <label htmlFor="billingFirstName">
                                                First Name:
                                            </label>
                                            <input
                                                type="text"
                                                className="billingFirstName"
                                                name="billingFirstName"
                                            />
                                        </div>
                                        <div className="blob--right">
                                            <label htmlFor="billingLastName">
                                                Last Name:
                                            </label>
                                            <input
                                                type="text"
                                                name="billingLastName"
                                                className="billingLastName"
                                            />
                                        </div>
                                    </div>
                                    <div className="checkout-info-blob">
                                        <div className="blob--left">
                                            <label htmlFor="billingAddress1">
                                                Address Line 1:
                                            </label>
                                            <input
                                                type="text"
                                                name="billingAddress1"
                                                className="billingAddress1"
                                            />
                                        </div>
                                        <div className="blob--right">
                                            <label htmlFor="address2">
                                                Address Line 2:
                                            </label>
                                            <input
                                                type="text"
                                                name="address2"
                                                className="billingAddress2"
                                            />
                                        </div>
                                    </div>
                                    <div className="checkout-info-blob">
                                        <div className="blob--left">
                                            <label htmlFor="city">City:</label>
                                            <input
                                                type="text"
                                                className="billingCity"
                                                name="city"
                                            />
                                        </div>
                                        <div className="blob--right">
                                            <label htmlFor="stateSelect">
                                                State:
                                            </label>
                                            <select
                                                name="stateSelect"
                                                className="billingStateSelect"
                                            >
                                                <option value="">
                                                    Choose State
                                                </option>
                                                <option value="AL">
                                                    Alabama
                                                </option>
                                                <option value="AK">
                                                    Alaska
                                                </option>
                                                <option value="AZ">
                                                    Arizona
                                                </option>
                                                <option value="AR">
                                                    Arkansas
                                                </option>
                                                <option value="CA">
                                                    California
                                                </option>
                                                <option value="CO">
                                                    Colorado
                                                </option>
                                                <option value="CT">
                                                    Connecticut
                                                </option>
                                                <option value="DE">
                                                    Delaware
                                                </option>
                                                <option value="DC">
                                                    District Of Columbia
                                                </option>
                                                <option value="FL">
                                                    Florida
                                                </option>
                                                <option value="GA">
                                                    Georgia
                                                </option>
                                                <option value="HI">
                                                    Hawaii
                                                </option>
                                                <option value="ID">
                                                    Idaho
                                                </option>
                                                <option value="IL">
                                                    Illinois
                                                </option>
                                                <option value="IN">
                                                    Indiana
                                                </option>
                                                <option value="IA">Iowa</option>
                                                <option value="KS">
                                                    Kansas
                                                </option>
                                                <option value="KY">
                                                    Kentucky
                                                </option>
                                                <option value="LA">
                                                    Louisiana
                                                </option>
                                                <option value="ME">
                                                    Maine
                                                </option>
                                                <option value="MD">
                                                    Maryland
                                                </option>
                                                <option value="MA">
                                                    Massachusetts
                                                </option>
                                                <option value="MI">
                                                    Michigan
                                                </option>
                                                <option value="MN">
                                                    Minnesota
                                                </option>
                                                <option value="MS">
                                                    Mississippi
                                                </option>
                                                <option value="MO">
                                                    Missouri
                                                </option>
                                                <option value="MT">
                                                    Montana
                                                </option>
                                                <option value="NE">
                                                    Nebraska
                                                </option>
                                                <option value="NV">
                                                    Nevada
                                                </option>
                                                <option value="NH">
                                                    New Hampshire
                                                </option>
                                                <option value="NJ">
                                                    New Jersey
                                                </option>
                                                <option value="NM">
                                                    New Mexico
                                                </option>
                                                <option value="NY">
                                                    New York
                                                </option>
                                                <option value="NC">
                                                    North Carolina
                                                </option>
                                                <option value="ND">
                                                    North Dakota
                                                </option>
                                                <option value="OH">Ohio</option>
                                                <option value="OK">
                                                    Oklahoma
                                                </option>
                                                <option value="OR">
                                                    Oregon
                                                </option>
                                                <option value="PA">
                                                    Pennsylvania
                                                </option>
                                                <option value="RI">
                                                    Rhode Island
                                                </option>
                                                <option value="SC">
                                                    South Carolina
                                                </option>
                                                <option value="SD">
                                                    South Dakota
                                                </option>
                                                <option value="TN">
                                                    Tennessee
                                                </option>
                                                <option value="TX">
                                                    Texas
                                                </option>
                                                <option value="UT">Utah</option>
                                                <option value="VT">
                                                    Vermont
                                                </option>
                                                <option value="VA">
                                                    Virginia
                                                </option>
                                                <option value="WA">
                                                    Washington
                                                </option>
                                                <option value="WV">
                                                    West Virginia
                                                </option>
                                                <option value="WI">
                                                    Wisconsin
                                                </option>
                                                <option value="WY">
                                                    Wyoming
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="checkout-info-blob">
                                        <div className="blob--left">
                                            <label htmlFor="zip">
                                                Zip Code:
                                            </label>
                                            <input
                                                type="text"
                                                name="zip"
                                                className="billingZipCode"
                                            />
                                        </div>
                                        <div className="blob--right">
                                            <label htmlFor="selectCountry">
                                                Country:
                                            </label>
                                            <select
                                                name="selectCountry"
                                                className="billingSelectCountry"
                                                defaultValue="US"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="checkout-info-blob">
                                        <div className="blob--left">
                                            <label htmlFor="mobile">
                                                Mobile Phone:
                                            </label>
                                            <input
                                                type="text"
                                                name="mobile"
                                                className="billingPhone"
                                            />
                                        </div>
                                        <div className="blob--right"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
