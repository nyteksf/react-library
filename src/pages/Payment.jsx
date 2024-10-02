import React, { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ProgressTracker from "../components/ui/ProgressTracker";
import Modal from "../components/ui/Modal";
import DisplayBillingInfo from "../components/ui/DisplayBillingInfo";
import CartSummary from "../components/ui/CartSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faTruck,
    faPlus,
    faLock,
    faMinus,
} from "@fortawesome/free-solid-svg-icons";
import Error401 from "../assets/error401.png";
import affirmLogo from "../assets/affirm.png";
import klarnaLogo from "../assets/klarna.png";
import payPalLogo from "../assets/paypal-logo.png";
import creditCardLogo from "../assets/creditcard-logo.png";
import geoTrustCert from "../assets/geotrustcert.png";
import cvvCodeImg from "../assets/cvvcode.png";
import padlockIcon from "../assets/padlock.png";
import klarnaBtn from "../assets/klarna-white-btn.png";
import affirmBtn from "../assets/affirm-white-btn.png";
import payPalBtn from "../assets/paypal-logo-bw.png";
import creditCardBadges from "../assets/creditcardbadges.png";
import CheckoutSectionTitle from "../components/ui/CheckoutSectionTitle";
import "./Payment.css";

const Payment = ({ CartItems, setCartItems }) => {
    const formRef = useRef(null); // DECLARE formRef
    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isReadyToPay, setIsReadyToPay] = useState(false);
    const [isPlus, setIsPlus] = useState([true, true, true, true]);
    const [isPseudoPlus, setIsPseudoPlus] = useState(false);
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [stepNumber, setStepNumber] = useState("two");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const history = useHistory();
    const pathname = useLocation().pathname;
    const isDisabled = true;

    function toggleIcon(index) {
        setIsPlus((prevState) =>
            prevState.map((iconState, i) =>
                i === index ? !iconState : iconState
            )
        );
    }

    function togglePseudo() {
        setIsPseudoPlus((prevState) => !prevState);
    }

    const submitForm = () => {
        if (formRef.current) {
            formRef.current.requestSubmit(); // ENSURE formRef CORRECTLY FORWARDED
        }
    };

    function getFutureDate(daysAhead) {
        const options = { weekday: "short", month: "short", day: "numeric" };
        const today = new Date();

        // ADD SPECIFIED NUMBER OF DAYS TO CURRENT DATE
        today.setDate(today.getDate() + daysAhead);

        // FORMAT DATE AS "WEEKDAY, MON. DD"
        return today.toLocaleDateString("en-US", options).replace(".", "");
    }

    // CALCULATE DATE FIVE DAYS INTO FUTURE
    const etaDate = getFutureDate(5);

    useEffect(() => {
        if (
            cardNumber.length === 19 && // 16 DIGITS + 3 SPACED
            cvv.length === 3 &&
            expiryMonth.length >= 1 &&
            expiryMonth.length <= 2 &&
            expiryYear.length === 4
        ) {
            // ENABLE SUBMIT PAYMENT BTN, PROGRESS TO STEP 3
            setIsReadyToPay(true);
            setStepNumber("three");
        } else {
            // DISABLE SUBMIT PAYMENT BTN, RETURN TO STEP 2
            setIsReadyToPay(false);
            setStepNumber("two");
        }
    }, [cardNumber, cvv, expiryMonth, expiryYear]);

    // HANDLE CARD NUMBER INPUT
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // REMOVE ALL NON-DIGIT CHARACTERS
        if (value.length > 16) {
            value = value.slice(0, 16); // LIMIT TO 16 DIGITS
        }
        value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // ADD SPACE AFTER EVERY 4 DIGITS
        setCardNumber(value);
    };

    // HANDLE CVV INPUT
    const handleCvvChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); 
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    // HANDLE EXPIRY MONTH INPUT
    const handleExpiryMonthChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); 
        if (value.length <= 2) {
            setExpiryMonth(value);
        }
    };

    // HANDLE EXPIRY YEAR INPUT
    const handleExpiryYearChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            setExpiryYear(value);
        }
    };

    const handleMonthChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); 
        if (value.length > 2) {
            value = value.slice(0, 2);
        }
        setMonth(value);
    };

    const handleYearChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) {
            value = value.slice(0, 4);
        }
        setYear(value);
    };

    /* 
    
        BLOCK USERS FROM VIEWING EMPTY CHECKOUT PAGE:
        DETECT CURRENT URL, REDIRECT BACK TO EMPTY CART IF NEEDED.
    
    */

    const location = useLocation();

    // REDIRECT USER BACK TO EMPTY /cart PAGE IF USER TRIED TO ACCESS /payment WITHOUT HAVING ITEMS IN SAID CART
    /*
    {
        useEffect(() => {
            // CHECK IF USER IS ON /payment page and if CartItems.length IS LESS THAN ONE
            if (pathname === "/payment" && CartItems.length < 1) {
                history.push("/cart"); // REDIRECT TO /cart
            }
        }, [pathname, CartItems, history]);
    }
    */

    return (
        <>
            {CartItems.length === 0 ? (
                <>
                    <div className="empty-cart">
                        <img
                            src={Error401}
                            alt="error 401 unauthorized access"
                            className="error-401"
                        />
                        <div className="error-body">
                            <h2 className="error-body--title">401 Error</h2>
                            <p className="error-body--para">Unauthorized</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="container container-checkout">
                        <div className="row">
                            <div className="checkout-title--wrapper">
                                <span className="lock-icon">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <h2 className="checkout-title">Checkout</h2>
                            </div>
                            <ProgressTracker stepNumber={stepNumber} />
                            <CheckoutSectionTitle title="Payment and Billing" />
                            <div className="payment--wrapper">
                                <div className="left-side">
                                    <div className="estimated-payment--wrapper">
                                        <div className="eta--wrapper">
                                            <div className="eta-left">
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                </span>
                                                <h2 className="estimated-payment--title">
                                                    Estimated delivery
                                                </h2>
                                            </div>
                                            <div className="eta--right">
                                                <FontAwesomeIcon
                                                    icon={faTruck}
                                                />
                                                <h3 className="shippingETA">
                                                    {etaDate} (FedEx)
                                                </h3>
                                            </div>
                                            <FontAwesomeIcon
                                                icon={
                                                    isPseudoPlus
                                                        ? faPlus
                                                        : faMinus
                                                }
                                                onClick={() => {
                                                    togglePseudo();
                                                }}
                                            />
                                        </div>
                                        <div className="display-cart-items">
                                            {CartItems.map((item, index) => {

                                                return (
                                                    <div
                                                        className="payment-cart-item"
                                                        key={index}
                                                    >
                                                        <div className="cart-item--img">
                                                            <img
                                                                src={item.url}
                                                                className="payment-cart--img"
                                                                alt={item.title}
                                                            />
                                                        </div>
                                                        <div className="cart-item--descrip">
                                                            <h3 className="payment-cart-item--title">
                                                                {item.title}
                                                            </h3>
                                                            <p className="cart-item--price">
                                                                {item.salePrice
                                                                    ? `$${item.salePrice.toFixed(
                                                                          2
                                                                      )}` ||
                                                                      `$${item.originalPrice.toFixed(
                                                                          2
                                                                      )}`
                                                                    : `$${item.originalPrice.toFixed(
                                                                          2
                                                                      )}`}
                                                            </p>
                                                            <p className="cart-item--quantity">
                                                                ({item.quantity}
                                                                )
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="payment-method">
                                        <h2 className="payment-method__text">
                                            Payment method
                                        </h2>
                                        <div className="payment-methods--wrapper">
                                            <div className="option option--paypal">
                                                <div className="option__img">
                                                    <img
                                                        src={payPalLogo}
                                                        alt="paypal logo"
                                                    />
                                                    <span className="option__text">
                                                        Pay with PayPal
                                                    </span>
                                                </div>
                                                <div
                                                    className="option__toggle"
                                                    onClick={() =>
                                                        toggleIcon(0)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            isPlus[0]
                                                                ? faPlus
                                                                : faMinus
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="option__body option__body--paypal"
                                                style={{
                                                    overflow: "hidden",
                                                    maxHeight: isPlus[0]
                                                        ? "0"
                                                        : "500px",
                                                    transition:
                                                        "max-height 450ms ease-in-out",
                                                }}
                                            >
                                                <p className="option__body--text">
                                                    You will be redirected to
                                                    PayPal to login to your
                                                    account and return here to
                                                    complete your order.
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setStepNumber("three");
                                                        setIsReadyToPay(true);
                                                    }}
                                                    className="btn btn__option btn--payPal"
                                                >
                                                    <img
                                                        src={payPalBtn}
                                                        style={{
                                                            filter: "grayscale(100%)",
                                                        }}
                                                        className="payPalBtn"
                                                        alt="paypal button icon"
                                                    />
                                                </button>
                                            </div>
                                            <div className="option option--affirm">
                                                <div className="option__img">
                                                    <img
                                                        src={affirmLogo}
                                                        alt="affirm logo"
                                                    />
                                                    <div className="option__text--wrapper">
                                                        <span className="option__text option__text--dual">
                                                            Pay with Affirm
                                                            <br />
                                                            <span className="option__sub-title">
                                                                4 payments,
                                                                every two weeks
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="option__toggle"
                                                    onClick={() =>
                                                        toggleIcon(1)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            isPlus[1]
                                                                ? faPlus
                                                                : faMinus
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="option__body option__body--affirm"
                                                style={{
                                                    overflow: "hidden",
                                                    maxHeight: isPlus[1]
                                                        ? "0"
                                                        : "500px",
                                                    transition:
                                                        "max-height 450ms ease-in-out",
                                                }}
                                            >
                                                <p className="option__body--text">
                                                    You will be redirected to
                                                    Affirm to login to your
                                                    account and return here to
                                                    complete your order.
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setStepNumber("three");
                                                        setIsReadyToPay(true);
                                                    }}
                                                    className="btn btn__option btn--affirm"
                                                >
                                                    <img
                                                        className="affirmBtn"
                                                        src={affirmBtn}
                                                        alt="affirm logo"
                                                    />
                                                </button>
                                            </div>

                                            <div className="option option--klarna">
                                                <div className="option__img">
                                                    <img
                                                        src={klarnaLogo}
                                                        alt="klarna logo"
                                                    />
                                                    <div className="option__text--wrapper">
                                                        <span className="option__text option__text--dual">
                                                            Pay with Klarna
                                                            <br />
                                                            <span className="option__sub-title">
                                                                4 payments,
                                                                every two weeks
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="option__toggle"
                                                    onClick={() =>
                                                        toggleIcon(2)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            isPlus[2]
                                                                ? faPlus
                                                                : faMinus
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="option__body option__body--klarna"
                                                style={{
                                                    overflow: "hidden",
                                                    maxHeight: isPlus[2]
                                                        ? "0"
                                                        : "500px",
                                                    transition:
                                                        "max-height 450ms ease-in-out",
                                                }}
                                            >
                                                <p className="option__body--text">
                                                    You will be redirected to
                                                    Klarna to login to your
                                                    account and return here to
                                                    complete your order.
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        setStepNumber("three");
                                                        setIsReadyToPay(true);
                                                    }}
                                                    className="btn btn__option btn--klarna"
                                                >
                                                    <img
                                                        className="klarnaBtn"
                                                        src={klarnaBtn}
                                                        alt="klarna logo"
                                                    />
                                                </button>
                                            </div>

                                            <div className="option option--cardpay">
                                                <div className="option__img">
                                                    <img
                                                        src={creditCardLogo}
                                                        alt="credit card logo"
                                                    />
                                                    <span className="option__text">
                                                        Pay with credit card
                                                    </span>
                                                </div>
                                                <div
                                                    className="option__toggle"
                                                    onClick={() =>
                                                        toggleIcon(3)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            isPlus[3]
                                                                ? faPlus
                                                                : faMinus
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="option__body option__body--cardpay"
                                                style={{
                                                    overflow: "hidden",
                                                    maxHeight: isPlus[3]
                                                        ? "0"
                                                        : "500px",
                                                    transition:
                                                        "max-height 450ms ease-in-out",
                                                }}
                                            >
                                                <div className="cardpay--wrapper">
                                                    <div className="left-side-cardpay">
                                                        <img
                                                            src={padlockIcon}
                                                            className="padlockIcon"
                                                            alt="padlock icon"
                                                        />
                                                        <div className="option__body--header-left">
                                                            <h2 className="option__body--title">
                                                                Secure Credit
                                                                Card Payment
                                                            </h2>
                                                            <p className="option__body--sub-title">
                                                                This is a secure
                                                                128-bit SSL
                                                                encrypted
                                                                payment.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="option__body--header-right">
                                                        <img
                                                            src={geoTrustCert}
                                                            className="geoTrustCertificate"
                                                            alt="geotrust ssl certificate"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="cardnumber-input">
                                                    <label
                                                        className="cardNumLabel"
                                                        htmlFor="cardpay__input"
                                                    >
                                                        <span className="red">
                                                            *
                                                        </span>{" "}
                                                        <h3 className="cardnumber-input--title">
                                                            Credit Card Number
                                                        </h3>
                                                    </label>
                                                    <p className="cardpay__input--sub-title">
                                                        The 16 digits on the
                                                        front of your card.
                                                    </p>
                                                    <div className="input--wrapper">
                                                        <input
                                                            type="text"
                                                            name="cardpay__input"
                                                            value={cardNumber}
                                                            className="cardpay__input"
                                                            maxLength="19"
                                                            onChange={
                                                                handleCardNumberChange
                                                            }
                                                            required
                                                        />
                                                        <img
                                                            src={
                                                                creditCardBadges
                                                            }
                                                            className="credit-card-badges"
                                                            alt="credit card badges"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="exp-date-input">
                                                    <label
                                                        className="expDateLabel"
                                                        htmlFor="expDateLabel"
                                                    >
                                                        <span className="red">
                                                            *
                                                        </span>{" "}
                                                        <h3 className="cardnumber-input--title">
                                                            Expiration Date
                                                        </h3>
                                                        <p className="cardpay__input--sub-title">
                                                            The date your card
                                                            expires. This is
                                                            located on the front
                                                            of your card.
                                                        </p>
                                                    </label>
                                                    <div className="credit-card-expiration">
                                                        <input
                                                            type="number"
                                                            className="month"
                                                            name="month"
                                                            placeholder="MM"
                                                            min="1"
                                                            max="12"
                                                            value={expiryMonth}
                                                            onChange={
                                                                handleExpiryMonthChange
                                                            }
                                                            required
                                                        />
                                                        <span className="date-separator">
                                                            /
                                                        </span>
                                                        <input
                                                            type="number"
                                                            className="year"
                                                            name="year"
                                                            placeholder="YYYY"
                                                            min="2023"
                                                            max="2035"
                                                            value={expiryYear}
                                                            onChange={
                                                                handleExpiryYearChange
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="security-code-input">
                                                    <label
                                                        className="cvv-code-label"
                                                        htmlFor="cvv-code"
                                                    >
                                                        <span className="red">
                                                            *
                                                        </span>{" "}
                                                        <h3 className="cardnumber-input--title">
                                                            Security code{" "}
                                                            <span className="cardnumber-input--sub-title">
                                                                (or "CVC", or
                                                                "CVV")
                                                            </span>
                                                        </h3>
                                                        <div className="cardpay--inner-wrapper">
                                                            <p className="cardpay__input--sub-title">
                                                                The last three
                                                                digits displayed
                                                                on the back of
                                                                your card.
                                                            </p>
                                                            <img
                                                                src={cvvCodeImg}
                                                                className="cvvCode"
                                                                alt="cvv code"
                                                            />
                                                        </div>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="cvv-code"
                                                        name="cvv"
                                                        placeholder="CVV"
                                                        maxLength="3"
                                                        pattern="\d{3}"
                                                        value={cvv}
                                                        onChange={
                                                            handleCvvChange
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="customer-data--wrapper">
                                    {" "}
                                    <DisplayBillingInfo />
                                    <br />
                                    <CartSummary
                                        CartItems={CartItems}
                                        isDisabled={isDisabled}
                                        formRef={formRef} // ENSURE formRef PASSED
                                        title={"Place Your Order"}
                                        isReadyToPay={isReadyToPay}
                                        stepNumber={stepNumber}
                                        setIsReadyToPay={setIsReadyToPay}
                                        setStepNumber={setStepNumber}
                                        setShowModal={setShowModal}
                                        setIsVisible={setIsVisible}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {isVisible && (
                        <Modal
                            setShowModal={setShowModal}
                            showModal={showModal}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            setCartItems={setCartItems}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default Payment;
